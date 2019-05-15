import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { QueueClient } from "../../src/QueueClient";
import { getQSU, getUniqueName } from "../utils";

describe("QueueClient Node", () => {
  const queueServiceClient = getQSU();
  let queueName: string = getUniqueName("queue");
  let queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);
    await queueClient.create(Aborter.none);
  });

  afterEach(async () => {
    await queueClient.delete(Aborter.none);
  });

  it("getAccessPolicy", async () => {
    const result = await queueClient.getAccessPolicy(Aborter.none);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("setAccessPolicy", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          expiry: new Date("2018-12-31T11:22:33.4567890Z"),
          permission: "raup",
          start: new Date("2017-12-31T11:22:33.4567890Z")
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    await queueClient.setAccessPolicy(Aborter.none, queueAcl);
    const result = await queueClient.getAccessPolicy(Aborter.none);
    assert.deepEqual(result.signedIdentifiers, queueAcl);
  });
});
