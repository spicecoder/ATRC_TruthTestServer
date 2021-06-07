const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const config = require("./config");
const { PORT } = config;
// routes
const WordPhraseRoutes = require("./routes/wordphrase");
const DomainAnchorRoute = require("./routes/DomainAnchor");
const DomainRoute = require("./routes/Domain");
const ContextRoute = require("./routes/Context");
const AuthUserRoute = require("./routes/AuthUser");
const testRoute = require("./test/testRoutes");

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();
app.use(cors());
app.use(express.json());
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/", WordPhraseRoutes);
app.use("/", DomainAnchorRoute);
app.use("/domain/", DomainRoute);
app.use("/resolution-pattern/", ContextRoute);
app.use("/", AuthUserRoute);
app.use("/", testRoute);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
