"use strict";

const assert = require("chai").assert;
const POIService = require("./POI-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
  let newPOI = fixtures.newPOI;

  const poiService = new POIService(fixtures.POIService);

  setup(async function () {
    poiService.deleteAllPOIs();
  });

  teardown(async function () {});

  test("create a POI", async function () {
    await poiService.addPOI(pois);
    const getPOI = await poiService.getPOI(pois)
    assert.equal(getPOI.length, 1);
    //assert(_.some([getPOIs[0]], pois[0]), "returned donation must be a superset of donation");
  });



  test("delete all pois", async function () {
    const returnedPOI = await poiService.addPOI(pois);
    for (var i = 0; i < pois.length; i++) {
    }

    const d1 = await poiService.getPOI(returnedPOI._id);
    assert.equal(d1.length, pois.length);
    await poiService.deleteAllPOIs();
    console.log(d1.length)
  });

});
