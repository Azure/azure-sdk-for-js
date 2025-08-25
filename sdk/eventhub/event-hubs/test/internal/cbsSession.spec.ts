// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionContext } from "$internal/connectionContext.js";
import { openCbsSession } from "$internal/withAuth.js";
import type { CbsClient } from "@azure/core-amqp";
import { StandardAbortMessage } from "@azure/core-amqp";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createContext } from "../utils/clients.js";
import { assert } from "../utils/chai.js";

describe("openCbsSession", () => {
  let context: ConnectionContext;
  let cbsClient: CbsClient;

  beforeEach(async () => {
    context = createContext().context;
    cbsClient = context.cbsSession;
  });

  afterEach(async () => {
    await context.close();
  });

  it("opens the CBS session", async () => {
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
    await openCbsSession(cbsClient, 1000);
    assert.isTrue(cbsClient.isOpen(), "Expected the CBS session to be open");
  });

  it("can be aborted", async () => {
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
    const aborter = new AbortController();
    const sessionOpening = openCbsSession(cbsClient, 1000, { abortSignal: aborter.signal });
    aborter.abort();
    await assert.isRejected(sessionOpening, StandardAbortMessage);
    assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open");
  });
});
