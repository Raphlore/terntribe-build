import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import causesRoute from "./route/causesRoute.js"

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())

app.use('/api', causesRoute);


app.get('/', (req, res) => {
  res.send('CRUD Operations for social causes and contribution!');
});

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
