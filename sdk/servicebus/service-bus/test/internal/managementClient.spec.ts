// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementClient } from "../../src/core/managementClient.js";
import { createConnectionContextForTests } from "./unit/unittestUtils.js";
import { delay } from "rhea-promise";
import { describe, it, assert } from "vitest";

chai.use(chaiAsPromised);

describe("ManagementClient unit tests", () => {
  it("actionAfterTimeout throws error that can be caught on timeout", async () => {
    const connectionContext = createConnectionContextForTests();

    const mgmtClient = new ManagementClient(
      connectionContext,
      connectionContext.config.entityPath || "",
    );
    try {
      mgmtClient["_init"] = async () => {
        // To make sure _init is in progress
        await delay(50);
      };

      // Error thrown after timeout
      await mgmtClient["initWithUniqueReplyTo"]({
        timeoutInMs: 5,
      });

      chai.assert.fail("_makeManagementRequest should have failed");
    } catch (error: any) {
      chai.assert.equal(
        error.message,
        "The initialization of management client timed out. Please try again later.",
      );
    }
    await mgmtClient.close();
  });
});
