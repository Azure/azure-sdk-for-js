// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectionContext } from "../../src/connectionContext.js";
import { openCbsSession } from "../../src/withAuth.js";
import { CbsClient, StandardAbortMessage } from "@azure/core-amqp";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createContext } from "../utils/clients.js";
import { assert } from "../utils/chai.js";

describe("openCbsSession", function () {
  let context: ConnectionContext;
  let cbsClient: CbsClient;

  beforeEach(async function () {
    context = createContext().context;
    cbsClient = context.cbsSession;
  });

  afterEach(async function () {
    await context.close();
  });

  it("opens the CBS session", async function () {
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
    await openCbsSession(cbsClient, 1000);
    assert.isTrue(cbsClient.isOpen(), "Expected the CBS session to be open");
  });

  it("can be aborted", async function () {
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
    const aborter = new AbortController();
    const sessionOpening = openCbsSession(cbsClient, 1000, { abortSignal: aborter.signal });
    aborter.abort();
    await assert.isRejected(sessionOpening, StandardAbortMessage);
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open");
  });
});
