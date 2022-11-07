// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { positionToTileXY } from "../../src";

it("positionToTileXY", () => {
  const tileIndex = positionToTileXY([52.517, 13.3854], 10, "512");
  assert.equal(tileIndex.x, 550);
  assert.equal(tileIndex.y, 335);
});
