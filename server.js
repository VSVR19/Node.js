// https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15064896#questions/8228876

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
