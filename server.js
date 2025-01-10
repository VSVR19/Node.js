// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15064896#questions/8228876
// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065060#questions/20891886
// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065066#questions/19273136

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

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 297,
//   rating: 4.2,
// });

// testTour
//   .save()
//   .then((document) => {
//     console.log(document);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
