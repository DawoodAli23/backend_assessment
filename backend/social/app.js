const express = require("express");
// const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require("./utilities/producer");
// const { connectConsumer } = require('./utilities/consumer');
// const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
// const databaseConfig = require('./database/DatabaseConfig');
const tenantRoutes = require("./routes/tenant.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/tenant", tenantRoutes);
app.use("/user", userRoutes);
// app.use(databaseConfig.initializeDB());

app.use("/", async (req, res) => {
  res.status(200).json({
    message: `App is runninsg on port. ${process.env.PORT || 4000}`,
  });
});

app.listen(process.env.PORT || 4000, async () => {
  console.log("App started at port", process.env.PORT || 4000);
  await initProducer();
});
