/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {

    suite("Routing Tests", function() {

        suite("GET /api/convert => conversion object", function() {

            test("Convert 10L (valid input)", function(done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({input: "10L"})
                    .then(res=>{
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, "l");
                        assert.approximately(res.body.returnNum, 2.64172, 0.1);
                        assert.equal(res.body.returnUnit, "gal");
                        done();
                    })
                    .catch(err=>done(err));
            });

            test("Convert 32g (invalid input unit)", function(done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({input: "30g"})
                    .then(res=>{
                        assert.equal(res.status, 400);
                        assert.equal(res.text, "Invalid unit");
                        done();
                    })
                    .catch(err=>done(err));
            });

            test("Convert 3/7.2/4kg (invalid number)", function(done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({input: "3/7.2/4kg"})
                    .then(res=>{
                        assert.equal(res.status, 400);
                        assert.equal(res.text, "Invalid number");
                        done();
                    })
                    .catch(err=>done(err));
            });

            test("Convert 3/7.2/4kilomegagram (invalid number and unit)", function(done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({input: "3/7.2/4kilogragram"})
                    .then(res=>{
                        assert.equal(res.status, 400);
                        assert.equal(res.text, "Invalid number and unit");
                        done();
                    })
                    .catch(err=>done(err));
            });

            test("Convert kg (no number)", function(done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({input: "kg"})
                    .then(res=>{
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                        assert.equal(res.body.initUnit, "kg");
                        assert.approximately(res.body.returnNum, 2.20462, 0.1);
                        assert.equal(res.body.returnUnit, "lbs");
                        done();
                    })
                    .catch(err=>done(err));
            });

        });

    });

});
