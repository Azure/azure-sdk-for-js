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

    expect(result).to.deep.equal([]);
  });

  it("updatedAfter filters to recently updated sessions", async () => {
    const sessionId = "time-filter-session";

    // Send a message to create the session.
    await sender.sendMessages({
      body: "message with timestamp filter",
      sessionId,
    });

    // The service filters by the LastUpdatedTime of session state entries
    // (MessageSessionStateTable rows), not by message activity. Capture the
    // cutoff before setting state so the new state row is timestamped after it.
    // Subtract 1 second to account for clock skew between client and service:
    // the service stamps state updates with its own clock, so if the service
    // clock is slightly behind the client, the row could otherwise appear
    // updated "before" our filter time.
    const beforeStateUpdate = new Date(Date.now() - 1000);

    // Accept the session and explicitly set state. This guarantees a row in the
    // service's session-state table with a known LastUpdatedTime, which is what
    // the updatedAfter filter queries.
    let sessionReceiver;
    if (entityNames.queue) {
      sessionReceiver = await serviceBusClient.acceptSession(entityNames.queue, sessionId);
    } else {
      sessionReceiver = await serviceBusClient.acceptSession(
        entityNames.topic!,
        entityNames.subscription!,
        sessionId,
      );
    }
    try {
      await sessionReceiver.setSessionState(Buffer.from("filter-test-state"));
    } finally {
      await sessionReceiver.close();
    }

    // List with updatedAfter = beforeStateUpdate should include the session
    // because its state was updated after that cutoff.
    let result: string[];
    if (entityNames.queue) {
      result = await serviceBusClient.listMessageSessions(entityNames.queue, {
        updatedAfter: beforeStateUpdate,
      });
    } else {
      result = await serviceBusClient.listMessageSessions(
        entityNames.topic!,
        entityNames.subscription!,
        { updatedAfter: beforeStateUpdate },
      );
    }

    expect(result).to.include(sessionId);
  });
});
