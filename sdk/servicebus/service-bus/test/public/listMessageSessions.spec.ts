// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusSender } from "../../src/index.js";
import type { EntityName, ServiceBusClientForTests } from "./utils/testutils2.js";
import {
  createServiceBusClientForTests,
  getRandomTestClientTypeWithSessions,
} from "./utils/testutils2.js";
import { describe, it, afterEach, beforeEach } from "vitest";
import { expect } from "./utils/chai.js";

describe("listMessageSessions", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let entityNames: EntityName;
  const testClientType = getRandomTestClientTypeWithSessions();

  beforeEach(async () => {
    serviceBusClient = createServiceBusClientForTests();
    entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!),
    );
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    await serviceBusClient.close();
  });

  it("returns sessions with active messages", async () => {
    // Send messages to distinct sessions
    const sessionIds = ["list-session-1", "list-session-2", "list-session-3"];
    for (const sessionId of sessionIds) {
      await sender.sendMessages({
        body: `test message for ${sessionId}`,
        sessionId,
      });
    }

    // List sessions
    let result: string[];
    if (entityNames.queue) {
      result = await serviceBusClient.listMessageSessions(entityNames.queue);
    } else {
      result = await serviceBusClient.listMessageSessions(
        entityNames.topic!,
        entityNames.subscription!,
      );
    }

    // All 3 sessions should be returned
    expect(result).to.be.an("array");
    for (const id of sessionIds) {
      expect(result).to.include(id);
    }
  });

  it("returns empty array when no active sessions", async () => {
    // Don't send any messages; entity should have no active sessions
    let result: string[];
    if (entityNames.queue) {
      result = await serviceBusClient.listMessageSessions(entityNames.queue);
    } else {
      result = await serviceBusClient.listMessageSessions(
        entityNames.topic!,
        entityNames.subscription!,
      );
    }

    expect(result).to.be.an("array").that.is.empty;
  });

  it("updatedAfter filters to recently updated sessions", async () => {
    const beforeSend = new Date();

    // Send a message to create a session
    await sender.sendMessages({
      body: "message with timestamp filter",
      sessionId: "time-filter-session",
    });

    // List with updatedAfter = beforeSend should include the session
    let result: string[];
    if (entityNames.queue) {
      result = await serviceBusClient.listMessageSessions(entityNames.queue, {
        updatedAfter: beforeSend,
      });
    } else {
      result = await serviceBusClient.listMessageSessions(
        entityNames.topic!,
        entityNames.subscription!,
        { updatedAfter: beforeSend },
      );
    }

    expect(result).to.include("time-filter-session");
  });
});
