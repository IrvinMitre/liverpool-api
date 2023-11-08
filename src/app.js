const express = require("express");
const app = express();
require("dotenv").config();
const connectToDatabase = require("./database/index");
const routes = require("./routes/v0/orders");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const cors = require("cors"); 


app.use(cors())
app.use(express.json());
connectToDatabase();
app.use("/v0/orders", routes);

app.get("/", (_req, res) => {
  res.send("<h2>Hello Liverpool Team!</h2>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
