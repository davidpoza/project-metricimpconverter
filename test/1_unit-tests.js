const chai           = require("chai");
const assert         = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
const convertHandler = new ConvertHandler();

suite("Unit Tests", function(){

    suite("Function convertHandler.getNum(input)", function() {

        test("Whole number input", function(done) {
            var input = "32L";
            assert.equal(convertHandler.getNum(input),32);
            done();
        });

        test("Decimal Input", function(done) {
            var input = "30.5L";
            assert.equal(convertHandler.getNum(input),30.5);
            done();
        });

        test("Fractional Input", function(done) {
            var input = "30/2L";
            assert.equal(convertHandler.getNum(input),15);
            done();
        });

        test("Fractional Input w/ Decimal", function(done) {
            var input = "30/0.5L";
            assert.equal(convertHandler.getNum(input),60);

            var input = "0.5/0.5L";
            assert.equal(convertHandler.getNum(input),1);

            done();
        });

        test("Invalid Input (double fraction)", function(done) {
            var input = "30/2/0.5L";
            assert.throws(()=>convertHandler.getNum(input), Error, "Invalid number");
            done();
        });

        test("No Numerical Input", function(done) {
            var input = "L";
            assert.equal(convertHandler.getNum(input),1);
            var input = "mi";
            assert.equal(convertHandler.getNum(input),1);
            done();
        });

    });

    suite("Function convertHandler.getUnit(input)", function() {

        test("For Each Valid Unit Inputs", function(done) {
            var input = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG"];
            input.forEach((ele)=>{
                assert.equal(convertHandler.getUnit(ele),ele.toLocaleLowerCase());
            });
            done();
        });

        test("Unknown Unit Input", function(done) {
            var input = "30 miajas";
            assert.throws(()=>convertHandler.getUnit(input), Error, "Invalid unit");
            done();
        });

    });

    suite("Function convertHandler.getReturnUnit(initUnit)", function() {

        test("For Each Valid Unit Inputs", function(done) {
            var input = ["gal","l","mi","km","lbs","kg"];
            var expect = ["l","gal","km","mi","kg","lbs"];
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite("Function convertHandler.spellOutUnit(unit)", function() {

        test("For Each Valid Unit Inputs", function(done) {
            assert.equal(convertHandler.spellOutUnit("l"), "litres");
            assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
            assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
            assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
            assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
            assert.equal(convertHandler.spellOutUnit("mi"), "miles");

            assert.equal(convertHandler.spellOutUnit("L"), "litres");
            assert.equal(convertHandler.spellOutUnit("GAL"), "gallons");
            assert.equal(convertHandler.spellOutUnit("LBS"), "pounds");
            assert.equal(convertHandler.spellOutUnit("KG"), "kilograms");
            assert.equal(convertHandler.spellOutUnit("KM"), "kilometers");
            assert.equal(convertHandler.spellOutUnit("MI"), "miles");

            assert.equal(convertHandler.spellOutUnit("Gal"), "gallons");
            assert.equal(convertHandler.spellOutUnit("Lbs"), "pounds");
            assert.equal(convertHandler.spellOutUnit("Kg"), "kilograms");
            assert.equal(convertHandler.spellOutUnit("Km"), "kilometers");
            assert.equal(convertHandler.spellOutUnit("Mi"), "miles");
            done();
        });

    });

    suite("Function convertHandler.convert(num, unit)", function() {

        test("Gal to L", function(done) {
            var input = [5, "gal"];
            var expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

        test("L to Gal", function(done) {
            var input = [5, "l"];
            var expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

        test("Mi to Km", function(done) {
            var input = [5, "mi"];
            var expected = 8.04672;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

        test("Km to Mi", function(done) {
            var input = [5, "km"];
            var expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

        test("Lbs to Kg", function(done) {
            var input = [5, "lbs"];
            var expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

        test("Kg to Lbs", function(done) {
            var input = [5, "kg"];
            var expected = 11.0231;
            assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
            done();
        });

    });

});