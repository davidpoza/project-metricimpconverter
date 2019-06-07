"use strict";

require("dotenv").config();
const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require("cors");
const helmet     = require("helmet");

const apiRoutes        = require("./routes/api.js");
const errorMdw         = require("./middleware/errors");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner           = require("./test-runner");

const app = express();

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({origin: "*"})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/")
    .get(function (req, res) {
        res.sendFile(process.cwd() + "/views/index.html");
    });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//error Middleware
app.use(errorMdw.errorHandler);

//404 Not Found Middleware
app.use(errorMdw.notFoundHandler);

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port " + process.env.PORT);
    if(process.env.NODE_ENV==="test") {
        console.log("Running Tests...");
        setTimeout(function () {
            try {
                runner.run();
            } catch(e) {
                var error = e;
                console.log("Tests are not valid:");
                console.log(error);
            }
        }, 1500);
    }
});

module.exports = app; //for testing
