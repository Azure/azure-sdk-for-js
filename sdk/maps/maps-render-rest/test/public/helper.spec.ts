// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createPathQuery, positionToTileXY } from "../../src";

it("positionToTileXY", () => {
  const tileIndex = positionToTileXY([52.517, 13.3854], 10, "512");
  assert.equal(tileIndex.x, 550);
  assert.equal(tileIndex.y, 335);
});

describe("createPathQuery", () => {
  it("can create a circular path query", () => {
    const actual = createPathQuery([52.4559, 13.228], 10000, {
      lineColor: "000000",
      lineOpacity: 0.9,
      lineWidth: 2,
    });
    assert.equal(actual, encodeURIComponent("lc000000|la0.9|lw2|ra10000||13.228 52.4559"));
  });

  it("can create a linear path query", () => {
    const actual = createPathQuery(
      [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
      ],
      {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidth: 2,
      }
    );
    assert.equal(
      actual,
      encodeURIComponent("lc000000|la0.9|lw2||13.35 52.577|13.2988 52.6|13.2988 52.32")
    );
  });
  it("can create a polygonal path query", () => {
    const actual = createPathQuery(
      [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
        [52.577, 13.35],
      ],
      {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidth: 2,
        fillColor: "FFFFFF",
        fillOpacity: 0.8,
      }
    );
    assert.equal(
      actual,
      encodeURIComponent(
        "lc000000|la0.9|lw2|fcFFFFFF|fa0.8||13.35 52.577|13.2988 52.6|13.2988 52.32|13.35 52.577"
      )
    );
  });
});
