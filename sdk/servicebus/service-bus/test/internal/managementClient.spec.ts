// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementClient } from "../../src/core/managementClient.js";
import { createConnectionContextForTests, retryableErrorForTests } from "./unit/unittestUtils.js";
import { delay } from "rhea-promise";
import { describe, it } from "vitest";
import { assert } from "../public/utils/chai.js";

describe("ManagementClient unit tests", () => {
  it("retries sendability before dispatching delete messages once", async () => {
    const connectionContext = createConnectionContextForTests();
    const mgmtClient = new ManagementClient(
      connectionContext,
      connectionContext.config.entityPath || "",
    );
    let sendabilityAttempts = 0;
    let dispatchAttempts = 0;
    mgmtClient["initWithUniqueReplyTo"] = async (options = {}) => options;
    mgmtClient["_waitForManagementRequestSendable"] = async (_, options = {}) => {
      sendabilityAttempts++;
      if (sendabilityAttempts === 1) {
        throw retryableErrorForTests;
      }
      return options;
    };
    mgmtClient["_sendManagementRequest"] = async () => {
      dispatchAttempts++;
      return {
        application_properties: { statusCode: 200 },
        body: { "message-count": 1 },
      };
    };

    const deletedCount = await mgmtClient.deleteMessages(1, undefined, undefined, {
      retryOptions: { maxRetries: 1, retryDelayInMs: 0 },
    });

    assert.equal(deletedCount, 1);
    assert.equal(sendabilityAttempts, 2);
    assert.equal(dispatchAttempts, 1);
  });

  it("does not dispatch delete messages after preparation exhausts the timeout", async () => {
    const connectionContext = createConnectionContextForTests();
    const mgmtClient = new ManagementClient(
      connectionContext,
      connectionContext.config.entityPath || "",
    );
    let dispatchAttempts = 0;
    mgmtClient["initWithUniqueReplyTo"] = async (options = {}) => options;
    mgmtClient["_waitForManagementRequestSendable"] = async () => ({ timeoutInMs: 0 });
    mgmtClient["_sendManagementRequest"] = async () => {
      dispatchAttempts++;
      return { body: {}, application_properties: {} };
    };

    await assert.isRejected(
      mgmtClient.deleteMessages(1),
      /batch delete operation timed out before dispatch/i,
    );
    assert.equal(dispatchAttempts, 0);
  });

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

      assert.fail("_makeManagementRequest should have failed");
    } catch (error: any) {
      assert.equal(
        error.message,
        "The initialization of management client timed out. Please try again later.",
      );
    }
    await mgmtClient.close();
  });
});
