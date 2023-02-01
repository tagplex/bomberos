const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require("express-session");
const MemoryStore = require('memorystore')(session)
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");


const app = express();

app.use(session({
  secret: "laboratorio", //Debe cambiar
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));

app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
/* app.use(cors()); */

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

const mainRouter = require("./routes/main");
/* const resultsRouter = require("./routes/result"); */
const userRouter = require("./routes/user");
/* const patientRouter = require("./routes/patient"); */

app.use('/', mainRouter); //Rutas del menu principal
/* app.use('/results', resultsRouter); // Ruta para resultados */
app.use('/users', userRouter);
/* app.use('/patients', patientRouter); */

app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000")
})

