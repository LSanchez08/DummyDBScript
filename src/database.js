const mongoose = require('mongoose');
require('dotenv').config();

const { 
  DB_HOST, 
  DB_NAME, 
  DB_PORT 
} = process.env;

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`✅ Mongodb "${DB_NAME}" is connected now!`))
  .catch((error) => console.log('🚫 An error ocurred:', error));
