const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const jsdocConfig = require('../config/jsdoc');
const dotenv = require('dotenv');
const config_result = dotenv.config();
const dsModel = require('./dsService/dsModel');
const bridgeModel = require('./bridge/bridgeModel');
if (process.env.NODE_ENV != 'production' && config_result.error) {
  throw config_result.error;
}

const swaggerSpec = swaggerJSDoc(jsdocConfig);
const swaggerUIOptions = {
  explorer: true,
};

//###[  Routers ]###
const indexRouter = require('./index/indexRouter');
const profileRouter = require('./profile/profileRouter');
const dsRouter = require('./dsService/dsRouter');
const bridgeRouter = require('./bridge/bridgeRouter');
const watchlistRouter = require('./watchlist/watchlistRouter');

const app = express();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// docs would need to be built and committed
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use(['/profile', '/profiles'], profileRouter);
app.use('/bridges', bridgeRouter);
app.use('/data', dsRouter);
app.use('/watchlist', watchlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof createError.HttpError) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  console.error(err);
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

// Set interval will run every 24 hours

const updateBridgesFromDS = async () => {
  try {
    const dsBridges = await dsModel.bridgeData();
    const bridges = (await bridgeModel.getAllProjectCodes()).map((b) => {
      return b['project_code'];
    });
    const newBridges = Object.values(dsBridges.data).filter((dsBridge) => {
      return !bridges.includes(dsBridge['project_code']);
    });
    const newBridgesTransformed = newBridges.map((bridge) => {
      return {
        country: bridge['country'],
        province: bridge['province'],
        district: bridge['district'],
        district_id: bridge['district_id'],
        sector: bridge['sector'],
        sector_id: bridge['sector_id'],
        village: bridge['village'],
        village_id: bridge['village_id'],
        cell: bridge['cell'],
        cell_id: bridge['cell_id'],
        bridge_site_name: bridge['name'],
        project_stage: bridge['stage'],
        sub_stage: bridge['sub_stage'],
        project_code: bridge['project_code'],
        bridge_type: bridge['type'],
        span: bridge['span'],
        lat: bridge['lat'],
        long: bridge['long'],
        individuals_directly_served: bridge['Individuals_directly_served'],
        communities_served:
          '{"' + bridge['communities_served'].join('","') + '"}',
        form_name: bridge['form'],
        casesafeid_form: bridge['case_safe_id'],
        bridge_opportunity_id: bridge['opportunity_id'],
      };
    });

    await bridgeModel.addBridge(newBridgesTransformed);
  } catch (error) {
    console.log(error);
  }
};

setInterval(updateBridgesFromDS, 1000 * 60 * 60 * 24);

if (process.env.NODE_ENV !== 'test') {
  updateBridgesFromDS();
}

module.exports = app;
