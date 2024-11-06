// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusSender, ServiceBusMessage } from "../../src/index.js";
import { TestClientType } from "../public/utils/testUtils.js";
import type { ServiceBusClientForTests, EntityName } from "../public/utils/testutils2.js";
import { createServiceBusClientForTests } from "../public/utils/testutils2.js";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import { assert } from "../public/utils/chai.js";

describe(`Tracing for send`, function (): void {
  let sbClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let entityName: EntityName;

  beforeAll(() => {
    sbClient = createServiceBusClientForTests();
  });

  afterAll(() => {
    return sbClient.test.after();
  });

  beforeEach(async () => {
    entityName = await sbClient.test.createTestEntities(TestClientType.UnpartitionedQueue);

    sender = sbClient.test.addToCleanup(
      sbClient.createSender(entityName.queue ?? entityName.topic!),
    );
  });

  it("add messages with tryAdd - can be manually traced", async function (): Promise<void> {
    const list = [{ name: "Albert" }, { name: "Marie" }];

    await assert.supportsTracing(
      async (options) => {
        const batch = await sender.createMessageBatch(options);

        for (let i = 0; i < 2; i++) {
          batch.tryAddMessage({ body: `${list[i].name}` }, options);
        }
        return sender.sendMessages(batch, options);
      },
      ["message", "ServiceBusSender.send"],
    );
  });

  it("array of messages - can be manually traced", async function (): Promise<void> {
    const messages: ServiceBusMessage[] = [];
    for (let i = 0; i < 5; i++) {
      messages.push({ body: `multiple messages - manual trace propagation: ${i}` });
    }

    await assert.supportsTracing(
      (options) => {
        return sender.sendMessages(messages, {
          tracingOptions: options.tracingOptions,
        });
      },
      ["message", "ServiceBusSender.send"],
    );
  });
});
