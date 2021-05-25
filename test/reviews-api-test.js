"use strict";

const assert = require("chai").assert;
const POIService = require("./POI-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Review API tests", function () {
  let reviews = fixtures.reviews;
  let newReview = fixtures.reviews;

  const poiService = new POIService(fixtures.POIService);

  setup(async function () {
    await poiService.deleteAllReviews();
  });

  teardown(async function () {
    await poiService.deleteAllReviews();
  });

  test("create a review", async function () {
    const returnedReview = await poiService.createReview(newReview);
    assert.isDefined(returnedReview._id);
  });

  test("get a review", async function () {
    const u1 = await poiService.createReview(newReview);
    const u2 = await poiService.getReview(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid review", async function () {
    const u1 = await poiService.getReview("1234");
    assert.isNull(u1);
    const u2 = await poiService.getReview("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a review", async function () {
    let u = await poiService.createReview(newReview);
    assert(u._id != null);
    await poiService.deleteOneReview(u._id);
    u = await poiService.getReview(u._id);
    assert(u == null);
  });

  test("get all reviews", async function () {
    for (let u of reviews) {
      await poiService.createReview(u);
    }

    const allReviews = await poiService.getReviews();
    assert.equal(allReviews.length, reviews.length);
  });

  test("get review detail", async function () {
    for (let u of reviews) {
      await poiService.createReview(u);
    }

    const allReviews = await poiService.getReviews();
    for (var i = 0; i < reviews.length; i++) {
      assert(_.some([allReviews[i]], reviews[i]), "returned Review must be a superset of newUser");
    }
  });

  test("get all reviews empty", async function () {
    const allReviews = await poiService.getReviews();
    assert.equal(allReviews.length, 0);
  });
});
