const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes/ForumRoute");
const routesAuth = require("./routes/AuthRoute");
const routesAgreg = require("./routes/AgregRoute");
const routesTheme = require("./routes/ThemeRoute");

const routesBrands = require("./routes/BrandsRoute");
const routesSeasons = require("./routes/SeasonsRoute");
const routesProducts = require("./routes/ProductsRoute");

const routesUsers = require("./routes/UsersRoute");
const routesDisputes = require("./routes/DisputesRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongoose Connect..."))
  .catch((err) => console.log.error(err));

app.use("/api/forum", routes);
app.use("/api/auth", routesAuth);
app.use("/api/agreg", routesAgreg);
app.use("/api/theme", routesTheme);

app.use("/api/brands", routesBrands);
app.use("/api/seasons", routesSeasons);
app.use("/api/products", routesProducts);

app.use("/api/users", routesUsers);
app.use("/api/disputes", routesDisputes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
