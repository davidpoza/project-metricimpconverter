"use strict";

let errorTypes     = require("../controllers/error_types");
let ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {

    var convertHandler = new ConvertHandler();

    app.route("/api/convert")
        .get(function (req, res){
            let input = req.query.input;
            let errors = "";

            try {
                var initNum = convertHandler.getNum(input);
            } catch (error){
                errors = error.message;
            }

            try {
                var initUnit = convertHandler.getUnit(input);
            } catch (error) {
                if(error.message == "Invalid unit" && errors == "")
                    errors = "Invalid unit";
                else if(error.message == "Invalid unit" && errors == "Invalid number")
                    errors = "Invalid number and unit";
            }
            if(errors != "")
                throw new errorTypes.Error400(errors);

            let returnNum = convertHandler.convert(initNum, initUnit);
            let returnUnit = convertHandler.getReturnUnit(initUnit);
            let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

            res.json({initNum: initNum, initUnit, returnNum: returnNum, returnUnit, string: toString});
        });

};
