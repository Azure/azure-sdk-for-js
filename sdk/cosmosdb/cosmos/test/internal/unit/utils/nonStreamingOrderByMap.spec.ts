// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { NonStreamingOrderByMap } from "../../../../src/utils/nonStreamingOrderByMap";

describe("NonStreamingOrderByMap", () => {
  it("should insert items", () => {
    const map = new NonStreamingOrderByMap<number>((a, b) => b - a);
    map.set("1", 1);
    map.set("2", 2);
    map.set("3", 3);
    assert.equal(map.size(), 3);
  });

  it("should update entry according to order", () => {
    // order is ascending, should update entry if new item is smaller
    const map = new NonStreamingOrderByMap<number>((a, b) => b - a);
    map.set("1", 1);
    map.set("2", 2);
    map.set("2", 0);
    assert.equal(map.size(), 2);
    assert.equal(map.get("2"), 0);

    // order is ascending, should not update entry if new item is bigger
    const map2 = new NonStreamingOrderByMap<number>((a, b) => b - a);
    map2.set("1", 1);
    map2.set("2", 2);
    map2.set("2", 3);
    assert.equal(map2.size(), 2);
    assert.equal(map2.get("2"), 2);

    // order is descending, should update entry if new item is bigger
    const map3 = new NonStreamingOrderByMap<number>((a, b) => a - b);
    map3.set("1", 1);
    map3.set("2", 2);
    map3.set("2", 3);
    assert.equal(map3.size(), 2);
    assert.equal(map3.get("2"), 3);

    // order is ascending, should not update entry if new item is smaller
    const map4 = new NonStreamingOrderByMap<number>((a, b) => a - b);
    map4.set("1", 1);
    map4.set("2", 2);
    map4.set("2", 0);
    assert.equal(map4.size(), 2);
    assert.equal(map4.get("2"), 2);
  });

  it("should return all the values", () => {
    const map = new NonStreamingOrderByMap<number>((a, b) => b - a);
    map.set("1", 1);
    map.set("2", 2);
    map.set("3", 3);
    assert.equal(map.size(), 3);
    const allValues = map.getAllValues();

    const expectedRes = [1, 2, 3];
    for (let i = 0; i < 3; i++) {
      assert.strictEqual(allValues[i], expectedRes[i]);
    }
  });
});
