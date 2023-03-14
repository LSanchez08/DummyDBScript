require('dotenv').config();
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const { isEmpty } = require('lodash');

const { reply } = require('../helpers/reply');

const { 
  DB_HOST, 
  DB_NAME, 
  DB_PORT 
} = process.env;

const connString = `mongodb://${DB_HOST}:${DB_PORT}`;
const client = new MongoClient(connString, { useNewUrlParser: true });

// Initializating
exports.initialize = async () => {
    await client.connect();
}

exports.exportClient = () => {
  return client;
}

exports.postMethod = async ({ collection, payload }) => {
  try {
    if (!isEmpty(payload)) {
      await client.db(DB_NAME).collection(collection).insertMany(payload.length ? payload: [payload]);

      return reply(200, 'Data inserted correctly', collection, 'POST', payload);
    } else {
      return reply(200, 'No data was sent.', collection, 'POST', payload);
    }
    
    
  } catch (error) {
    return reply(400, error.message, collection, 'POST', payload);
  }
}

exports.getMethod = async ({ collection }) => {
  try {
    const response = await client.db(DB_NAME).collection(collection).find().toArray();

    return reply(200, '', collection, 'GET', null, response)
  } catch (error) {
    return reply(400, error.message, collection, 'GET', null);
  }
}

const ages = [8, 9, 10, 11, 12];
const states = [
	{
		"name": "Distrito Federal",
		"code": "MX-DIF",
		"subdivision": "federal district"
	},
	{
		"name": "Aguascalientes",
		"code": "MX-AGU",
		"subdivision": "state"
	},
	{
		"name": "Baja California",
		"code": "MX-BCN",
		"subdivision": "state"
	},
	{
		"name": "Baja California Sur",
		"code": "MX-BCS",
		"subdivision": "state"
	},
	{
		"name": "Campeche",
		"code": "MX-CAM",
		"subdivision": "state"
	},
	{
		"name": "Chiapas",
		"code": "MX-CHP",
		"subdivision": "state"
	},
	{
		"name": "Chihuahua",
		"code": "MX-CHH",
		"subdivision": "state"
	},
	{
		"name": "Coahuila",
		"code": "MX-COA",
		"subdivision": "state"
	},
	{
		"name": "Colima",
		"code": "MX-COL",
		"subdivision": "state"
	},
	{
		"name": "Durango",
		"code": "MX-DUR",
		"subdivision": "state"
	},
	{
		"name": "Guanajuato",
		"code": "MX-GUA",
		"subdivision": "state"
	},
	{
		"name": "Guerrero",
		"code": "MX-GRO",
		"subdivision": "state"
	},
	{
		"name": "Hidalgo",
		"code": "MX-HID",
		"subdivision": "state"
	},
	{
		"name": "Jalisco",
		"code": "MX-JAL",
		"subdivision": "state"
	},
	{
		"name": "Michoacán",
		"code": "MX-MIC",
		"subdivision": "state"
	},
	{
		"name": "Morelos",
		"code": "MX-MOR",
		"subdivision": "state"
	},
	{
		"name": "México",
		"code": "MX-MEX",
		"subdivision": "state"
	},
	{
		"name": "Nayarit",
		"code": "MX-NAY",
		"subdivision": "state"
	},
	{
		"name": "Nuevo León",
		"code": "MX-NLE",
		"subdivision": "state"
	},
	{
		"name": "Oaxaca",
		"code": "MX-OAX",
		"subdivision": "state"
	},
	{
		"name": "Puebla",
		"code": "MX-PUE",
		"subdivision": "state"
	},
	{
		"name": "Querétaro",
		"code": "MX-QUE",
		"subdivision": "state"
	},
	{
		"name": "Quintana Roo",
		"code": "MX-ROO",
		"subdivision": "state"
	},
	{
		"name": "San Luis Potosí",
		"code": "MX-SLP",
		"subdivision": "state"
	},
	{
		"name": "Sinaloa",
		"code": "MX-SIN",
		"subdivision": "state"
	},
	{
		"name": "Sonora",
		"code": "MX-SON",
		"subdivision": "state"
	},
	{
		"name": "Tabasco",
		"code": "MX-TAB",
		"subdivision": "state"
	},
	{
		"name": "Tamaulipas",
		"code": "MX-TAM",
		"subdivision": "state"
	},
	{
		"name": "Tlaxcala",
		"code": "MX-TLA",
		"subdivision": "state"
	},
	{
		"name": "Veracruz",
		"code": "MX-VER",
		"subdivision": "state"
	},
	{
		"name": "Yucatán",
		"code": "MX-YUC",
		"subdivision": "state"
	},
	{
		"name": "Zacatecas",
		"code": "MX-ZAC",
		"subdivision": "state"
	}
];
const limit = 5000;

exports.execute = async () => {
  try {
    const response = await client.db(DB_NAME).collection('animal').find().project({ _id: 1 }).toArray();
    const mappedIds = response.map(({ _id }) => _id.toString());
    const stateNames = states.map(({ name }) => name);

    for (let i = 0; i < limit; i++) {
      const currentAge = randomIndex(ages);
      const currentState = randomIndex(stateNames);
      const selectedAnimal = randomIndex(mappedIds);

      await client.db(DB_NAME).collection('favorite_animal').insertOne({ 
        age: currentAge, 
        state: currentState, 
        favoriteAnimal: selectedAnimal, 
        date: randomDate('02/15/2023', '03/13/2023') 
      });
    }

    return reply(200, '', 'script', 'GET', null, { message: 'Script Executed Succesfully' });
  } catch (error) {
    console.log(error);

    return reply(400, error.message, 'script', 'GET', null);
  }
}

const randomDate = (dateOne, dateTwo) => {
  const randomValueBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const date1 = new Date(dateOne || '01-01-1970').getTime();
  const date2 = new Date(dateTwo || new Date().toLocaleDateString()).getTime();

  if(date1 > date2) {
      return new Date(randomValueBetween(date2,date1)).toISOString();
  } else {
      return new Date(randomValueBetween(date1, date2)).toISOString();
  }
};

const randomIndex = (data) => data[Math.floor(Math.random() * data.length)];