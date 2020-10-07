const db = require('../../data/db-config');

const findAll = async () => {
  return await db('bridges').orderBy('id');
};

const getBridgeById = async (id) => {
  return db('bridges').where({ 'bridges.id': id });
};

const getAllProjectCodes = async () => {
  return await db('bridges').select('project_code');
};

const addBridge = async (newBridge) => {
  console.log(newBridge);

  return db('bridges').insert(newBridge);
};

const updateBridge = async (id, changes) => {
  return db('bridges').where({ 'bridges.id': id }).update(changes);
};

const findbyStage = async (stage) => {
  console.log(stage);
  return await db('bridges').where({ 'bridges.stage': stage });
};

module.exports = {
  findAll,
  getBridgeById,
  findbyStage,
  addBridge,
  getAllProjectCodes,
  updateBridge,
};
