// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { parseIntOrThrow } from "../../src/blobCheckpointStore";
import chai from "chai";
const should = chai.should();

describe("Blob Checkpoint Store", function(): void {
  it("parseIntOrThrow", () => {
    parseIntOrThrow("blobname", "fieldname", "1").should.equal(1);

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", ""),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number"
    );
    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", "hello"),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number"
    );

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", undefined),
      "Missing metadata property 'fieldname' on blob 'blobname'"
    );
  });
});
