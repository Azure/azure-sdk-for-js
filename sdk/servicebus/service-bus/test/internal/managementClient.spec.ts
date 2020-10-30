// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ManagementClient } from "../../src/core/managementClient";
import { createConnectionContextForTests } from "./unittestUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("managementLinkClient unit tests", () => {
  it("getDeferredMessages, empty array", async () => {
    const mgmtClient = new ManagementClient(createConnectionContextForTests(), "entity path");

    try {
      await mgmtClient.receiveDeferredMessages([], "peekLock");
      assert.fail("Should have thrown a validation error");
    } catch (err) {
      assert.deepEqual(
        {
          name: err.name,
          message: err.message
        },
        {
          name: "TypeError",
          message: "At least one sequence number must be specified."
        }
      );
    }
  });
});
