import express from "express"
import { json } from "body-parser"
import cors from "cors";

import { UserRoute } from "./routes/UserRoute";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 5050

app.use(json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use((req, res, next)=>
  {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
      next()
  })

app.use('/user', UserRoute);


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  console.log(`Main route is http://localhost:${port}/user`);
})