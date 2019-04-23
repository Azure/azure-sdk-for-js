import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { QueueURL } from "../../src/QueueURL";
import { getQSU } from "../utils";
import { record } from "../utils/nock-recorder";

describe("QueueURL Node", function() {
  const serviceURL = getQSU();
  let queueName: string;
  let queueURL: QueueURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
    queueName = recorder.getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
    recorder.stop();
  });

  it("getAccessPolicy", async () => {
    const result = await queueURL.getAccessPolicy(Aborter.none);
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

    await queueURL.setAccessPolicy(Aborter.none, queueAcl);
    const result = await queueURL.getAccessPolicy(Aborter.none);
    assert.deepEqual(result.signedIdentifiers, queueAcl);
  });
});
