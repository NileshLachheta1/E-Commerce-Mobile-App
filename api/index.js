import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
// import connection from './db/connection.js';
import indexrouter from './routes/indexRoute.js';
import userRouter from './routes/userRoute.js';
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// app.use(connection());
app.use("/", indexrouter);
app.use('/user',userRouter);



app.listen(port, () => {
  console.log('Server Running at ', port);
});

