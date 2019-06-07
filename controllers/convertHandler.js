function ConvertHandler() {

    this.getNum = function(input) {
        let result;
        let i=0;
        while(input[i] >= "0" && input[i] <= "9" || input[i] == "." || input[i] == "/"){
            i++;
        }
        result = input.slice(0,i);
        if(result == "")
            return 1;

        //check if it's a fraction
        let fraction_index = result.indexOf("/");
        if( fraction_index != -1 && result.lastIndexOf("/") == fraction_index ){
            let numerator = parseFloat(result.slice(0,fraction_index));
            let denumerator = parseFloat(result.slice(fraction_index+1));
            result = numerator / denumerator;
        }
        else if (result.lastIndexOf("/") != fraction_index)
            throw new Error("Invalid number");

        return parseFloat(result);
    };

    this.getUnit = function(input) {
        let result;
        let i=0;
        while(input[i] >= "0" && input[i] <= "9" || input[i] == "." || input[i] == "/"){
            i++;
        }
        result = input.slice(i).toLowerCase();
        if(["l", "gal", "km", "mi", "lbs", "kg"].indexOf(result) == -1)
            throw new Error("Invalid unit");
        return result;
    };

    this.getReturnUnit = function(initUnit) {
        var result;
        initUnit = initUnit.toLowerCase();
        switch(initUnit){
        case "gal":
            result="l";
            break;
        case "l":
            result="gal";
            break;
        case "lbs":
            result="kg";
            break;
        case "kg":
            result="lbs";
            break;
        case "mi":
            result="km";
            break;
        case "km":
            result="mi";
            break;
        }
        return result;
    };

    this.spellOutUnit = function(unit) {
        var result;
        unit = unit.toLowerCase();
        switch(unit){
        case "l":
            result = "litres";
            break;
        case "gal":
            result = "gallons";
            break;
        case "km":
            result = "kilometers";
            break;
        case "mi":
            result = "miles";
            break;
        case "lbs":
            result = "pounds";
            break;
        case "kg":
            result = "kilograms";
            break;
        }
        return result;
    };

    this.convert = function(initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;

        switch(initUnit.toLowerCase()){
        case "gal":
            result = initNum * galToL;
            break;
        case "l":
            result = initNum / galToL;
            break;
        case "lbs":
            result = initNum * lbsToKg;
            break;
        case "kg":
            result = initNum / lbsToKg;
            break;
        case "mi":
            result = initNum * miToKm;
            break;
        case "km":
            result = initNum / miToKm;
            break;
        }
        return result;
    };


    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        var result;
        result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(2)} ${this.spellOutUnit(returnUnit)}`;
        return result;
    };

}

module.exports = ConvertHandler;
