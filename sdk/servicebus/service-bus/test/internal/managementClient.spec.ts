// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ManagementClient } from "../../src/core/managementClient";
import { createConnectionContextForTests } from "./unit/unittestUtils";
import { delay } from "rhea-promise";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("ManagementClient unit tests", () => {
  it("actionAfterTimeout throws error that can be caught on timeout", async () => {
    const connectionContext = createConnectionContextForTests();

    const mgmtClient = new ManagementClient(
      connectionContext,
      connectionContext.config.entityPath || ""
    );
    try {
      mgmtClient["_init"] = async () => {
        // To make sure _init is in progress by the time actionAfterTimeout is invoked
        await delay(1);
      };

      // Error thrown from the actionAfterTimeout triggered by the setTimeout (0 seconds)
      await mgmtClient["initWithUniqueReplyTo"]({
        timeoutInMs: 0,
      });

      chai.assert.fail("_makeManagementRequest should have failed");
    } catch (error: any) {
      chai.assert.equal(
        error.message,
        "The management request with timed out. Please try again later."
      );
    }
    await mgmtClient.close();
  });
});
