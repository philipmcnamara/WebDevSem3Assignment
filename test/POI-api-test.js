"use strict";

const assert = require("chai").assert;
const POIService = require("./POI-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
  let newPOI = fixtures.pois;

  const poiService = new POIService(fixtures.POIService);

  setup(async function () {
    await poiService.deleteAllPOIS();
  });

  teardown(async function () {
    await poiService.deleteAllPOIS();
  });

  test("create a POI", async function () {
    const returnedPOI = await poiService.createPOI(newPOI);
    assert.isDefined(returnedPOI._id);
  });

  test("get POI", async function () {
    const u1 = await poiService.createPOI(newPOI);
    const u2 = await poiService.getPOI(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid POI", async function () {
    const u1 = await poiService.getPOI("1234");
    assert.isNull(u1);
    const u2 = await poiService.getPOI("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a POI", async function () {
    let u = await poiService.createPOI(newPOI);
    assert(u._id != null);
    await poiService.deleteOnePOI(u._id);
    u = await poiService.getPOI(u._id);
    assert(u == null);
  });

  test("get all POIs", async function () {
    for (let u of pois) {
      await poiService.createPOI(u);
    }

    const allPOIs = await poiService.getPOIs();
    assert.equal(allPOIs.length, pois.length);
  });

  test("get POI detail", async function () {
    for (let u of pois) {
      await poiService.createPOI(u);
    }

    const allPOIs = await poiService.getPOIs();
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([allPOIs[i]], pois[i]), "returned Review must be a superset of newUser");
    }
  });

  test("get all POIs empty", async function () {
    const allPOIs = await poiService.getPOIs();
    assert.equal(allPOIs.length, 0);
  });
});
