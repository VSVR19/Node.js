// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15064896#questions/8228876
// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065060#questions/20891886

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<db_password>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DATABASE>', process.env.DATABASE_NAME);

// console.log('******************');
// console.log(DB);

// async function dbConnect() {
//   await mongoose.connect(process.env.DATABASE);
// }
// dbConnect().catch((error) => console.log(error));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    // console.log(connection.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error(err);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 297,
  rating: 4.2,
});

testTour
  .save()
  .then((document) => {
    console.log(document);
  })
  .catch((error) => {
    console.error(error);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
