# Bridge of Prosperity Backend

You can find the deployed project at https://bridges-b-api.herokuapp.com/

You can find a demo video of codebase at https://www.youtube.com/watch?v=PARd7apawNM&feature=youtu.be

## Contributors

|                                                            [Cody Solomon](https://github.com/CodyFlys)                                                            |                                        [Robert Misch](https://github.com/RobertMisch)                                         |                                                           [Xavier Hoskins](https://github.com/xavierhoskins)                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars2.githubusercontent.com/u/60758834?s=460&u=e9fd1bd445778f124a4107689c839b624a4ad217&v=4" width = "200" />](https://github.com/CodyFlys) |   [<img src="https://avatars0.githubusercontent.com/u/24370208?s=400&v=4" width = "200" />](https://github.com/RobertMisch)   | [<img src="https://avatars1.githubusercontent.com/u/59076433?s=460&u=7d6b6c0d420aec9596603733d2760b4912015f9d&v=4" width = "200" />](https://github.com/xavierhoskins) |
|                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/CodyFlys)                                       |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/RobertMisch)                    |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/xavierhoskins)                                       |
|                   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/robert-misch/)                   | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/cody-solomon/) |                    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/xavier-hoskins/)                     |

<br>
<br>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

Trello Board: https://trello.com/b/x1iIzJdj/labs25bridgesjessica

Back end: https://bridges-b-api.herokuapp.com/built

Tech Stack: Node.js, Express, Knex, PostgreSql, Docker

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

```
DS_API_URL=
DS_API_TOKEN=
DATABASE_URL=
OKTA_URL_ISSUER=
```

# Installation Instructions

- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `docker-compose up` * Will start PostgresSQL DB and take a little while * (after installing Docker.) 
    *** If this step keeps recylcing, as in won't stay connected at all, you may want to free up some space on your computer by deleting uneeded files or old projects ***
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

<br/>

## API Documentation

<br/>

### Bridges Endpoints

<br/>
GET REQUEST TO:

https://bridges-b-api.herokuapp.com/data/bridges

Returns:

```
{
        "id": 1,
        "country": "Rwanda",
        "district_id": 37,
        "province": "Western Province",
        "district": "Nyamasheke",
        "sector": "Kanjongo",
        "sector_id": "3706",
        "cell": "Kibogora",
        "cell_id": "370601",
        "village": "Kagarama",
        "village_id": "37060104",
        "bridge_site_name": "Kagarama",
        "project_stage": "Complete",
        "sub_stage": "In Service",
        "project_code": "1007325",
        "bridge_type": "Suspension",
        "span": 48,
        "lat": -2.322534,
        "long": 29.141945,
        "individuals_directly_served": "0",
        "communities_served": [
            "unavailable"
        ],
        "form_name": "Project Assessment - 2017.7.12",
        "casesafeid_form": "a1if1000002NJhdAAG",
        "bridge_opportunity_id": "006f100000a82Qz",
        "bridge_image": "https://farm5.staticflickr.com/4829/44946210045_874f324731_k.jpg"
    },
    {
        "id": 2,
        "country": "Rwanda",
        "district_id": 57,
        "province": "Eastern Province",
        "district": "Bugesera",
        "sector": "Juru",
        "sector_id": "5702",
        "cell": "Kabukuba",
        "cell_id": "570202",
        "village": "Gikana",
        "village_id": "57020201",
        "bridge_site_name": "Gikana",
        "project_stage": "Rejected",
        "sub_stage": "Technical",
        "project_code": "1007327",
        "bridge_type": "?",
        "span": 140,
        "lat": -2.072628,
        "long": 30.204382,
        "individuals_directly_served": "0",
        "communities_served": [
            "unavailable"
        ],
        "form_name": "Project Assessment - 2018.11.30",
        "casesafeid_form": "a1if1000002hTA9AAM",
        "bridge_opportunity_id": "006f100000a86Cp",
        "bridge_image": null
    },
    {
        "id": 3,
        "country": "Rwanda",
        "district_id": 13,
        "province": "Kigali",
        "district": "Kicukiro",
        "sector": "Juru-Masaka",
        "sector_id": "1308",
        "cell": "Rusheshe",
        "cell_id": "130806",
        "village": "Cyankongi",
        "village_id": "13080601",
        "bridge_site_name": "Cyankongi",
        "project_stage": "Rejected",
        "sub_stage": "Technical",
        "project_code": "1007328",
        "bridge_type": "?",
        "span": 100,
        "lat": -2.048451,
        "long": 30.191277,
        "individuals_directly_served": "0",
        "communities_served": [
            "unavailable"
        ],
        "form_name": "Project Assessment - 2018.11.30",
        "casesafeid_form": "a1if1000002hT9pAAE",
        "bridge_opportunity_id": "006f100000a86Cq",
        "bridge_image": null
    }...

    ETC
```

<br/>

GET REQUEST TO:

https://bridges-b-api.herokuapp.com/bridges/:id (Ex. 13)

Returns:

```
{
        "id": 13,
        "country": "Rwanda",
        "district_id": 42,
        "province": "Northern Province",
        "district": "Gakenke",
        "sector": "Mataba-Minazi",
        "sector_id": "4210",
        "cell": "Gitwa-Gitwa-Nyundo-Mwanza",
        "cell_id": "421003",
        "village": "Mwanza",
        "village_id": "42100307",
        "bridge_site_name": "Gitwa",
        "project_stage": "Identified",
        "sub_stage": "Identified in Needs Assessment",
        "project_code": "1007340",
        "bridge_type": "Suspended",
        "span": 50,
        "lat": -1.738888,
        "long": 29.755278,
        "individuals_directly_served": "0",
        "communities_served": [
            "Gitwa",
            "Muhororo",
            "Mwanza"
        ],
        "form_name": "Project Assessment - 2018.8.17",
        "casesafeid_form": "a1if1000002Vi9TAAS",
        "bridge_opportunity_id": "006f100000a86D2",
        "bridge_image": null
    },
```

<br/>

PUT REQUEST TO:

https://bridges-b-api.herokuapp.com/bridges/:id (Ex. 13)

Returns:

```
{
        "id": 13,
        "country": "Rwanda",
        "district_id": 42,
        "province": "Northern Province",
        "district": "Gakenke",
        "sector": "Mataba-Minazi",
        "sector_id": "4210",
        "cell": "Gitwa-Gitwa-Nyundo-Mwanza",
        "cell_id": "421003",
        "village": "Mwanza",
        "village_id": "42100307",
        "bridge_site_name": "Gitwa",
        "project_stage": "Identified",
        "sub_stage": "Identified in Needs Assessment",
        "project_code": "1007340",
        "bridge_type": "Suspended",
        "span": 50,
        "lat": -1.738888,
        "long": 29.755278,
        "individuals_directly_served": "0",
        "communities_served": [
            "Gitwa",
            "Muhororo",
            "Mwanza"
        ],
        "form_name": "Project Assessment - 2018.8.17",
        "casesafeid_form": "a1if1000002Vi9TAAS",
        "bridge_opportunity_id": "006f100000a86D2",
        "bridge_image": null
    },
```

Allows you to edit bridges information.
<br/>
