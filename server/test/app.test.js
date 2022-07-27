const request = require("supertest");
const assert = require('assert');
const app = require("../app");

describe("API", () => {

    let api;

    beforeAll(() => {
        api = app.listen(3030);
    })

    afterAll((done) => {
        api.close(done);
    })

    it("Responds to a GET request at / with a 200 status", (done) => {
        request(api).get("/").expect(200, done);
    })

    it("Responds to a GET request at /flavours with a 200 status", (done) => {
        request(api).get("/flavours").expect(200, done);
    })

    it("Responds to a GET request at /flavours with a JSON object", (done) => {
        request(api).get("/flavours").expect('Content-Type', /json/, done);
    })

    it("Responds to a GET request at /flavours with a JSON object containing a flavours key", (done) => {

        request(api).get("/flavours").expect(res => {
            if (!('flavours' in res.body)) throw new Error("I am a stupidly-designed library");
        }).end(done)
    })

})

{ flavours: ["strawberry"]}