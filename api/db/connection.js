import mongoose from 'mongoose';
// const dbURL ='mongodb://localhost:27017/ecommerce-mobile-app';
const dbURL = 'mongodb+srv://nileshlachheta1995:AXsZ1YfTGAxkfR3M@cluster0.g06hr8l.mongodb.net/E_com?retryWrites=true&w=majority&appName=Cluster0'
var connection = mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch(err => {
    console.log('Error While Database Connection', err);
  });

export default connection;

