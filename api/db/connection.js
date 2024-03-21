import mongoose from 'mongoose';
const dbURL =
  'mongodb+srv://nileshlachheta1995:aaccihID0AiXQFxT@cluster0.nhpfyuq.mongodb.net/ECommerce';


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