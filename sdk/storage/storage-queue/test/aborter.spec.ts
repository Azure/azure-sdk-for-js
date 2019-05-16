import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { QueueClient } from "../src/QueueClient";
import { getQSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Aborter", () => {
  const queueServiceClient = getQSU();
  let queueName: string = getUniqueName("queue");
  let queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);
  });

  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });

  it("should not abort after calling abort()", async () => {
    const cResp = await queueClient.create(Aborter.none);
    assert.ok(cResp.date);
    await queueClient.delete(Aborter.none);
  });

  it("should abort when calling abort() before request finishes", async () => {
    const aborter = Aborter.none;
    const response = queueClient.create(aborter);
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("should not abort when calling abort() after request finishes", async () => {
    const aborter = Aborter.none;
    await queueClient.create(aborter);
    aborter.abort();
    await queueClient.delete(Aborter.none);
  });

  it("should abort after aborter timeout", async () => {
    try {
      await queueClient.create(Aborter.timeout(1));
      assert.fail();
    } catch (err) {}
  });

  it("should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = queueClient.create(aborter.withTimeout(10 * 60 * 1000));
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("should abort after parent aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = queueClient.create(aborter.withTimeout(10 * 60 * 1000));
      await response;
      assert.fail();
    } catch (err) {}
  });
});
