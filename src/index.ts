import express from "express"
import cors from "cors";

import { AuthentificationRoute } from "./routes/AuthentificationRoute"
import { UserRoute } from "./routes/UserRoute";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 5050

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use((req, res, next)=>
{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})


// Routes List
app.use('/auth', AuthentificationRoute);
app.use('/user', UserRoute);


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  console.log(`Main route is http://localhost:${port}/auth`);
})