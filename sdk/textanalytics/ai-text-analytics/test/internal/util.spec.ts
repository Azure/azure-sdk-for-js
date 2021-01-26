// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { sortResponseIdObjects, nextLinkToTopAndSkip } from "../../src/util";

describe("util.sortByPreviousOrder", () => {
  it("should sort outputs correctly", () => {
    const input = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const output = [{ id: "3" }, { id: "1" }, { id: "2" }];
    const result = sortResponseIdObjects(input, output);
    assert.deepEqual(result, input);
  });
});

describe("util.nextLinkToTopAndSkip", () => {
  it("should return top and skip correctly", () => {
    const nextLink =
      "https://somehost/text/analytics/v3.2-preview.1/entities/health/jobs/1ef2876d-a815-4927-9fc9-e6d5fbc6ce95?$skip=10&$top=5";
    const result = nextLinkToTopAndSkip(nextLink);
    assert.deepEqual(result, { skip: 10, top: 5 });
  });
});
