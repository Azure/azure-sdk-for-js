import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { QueueURL } from "../../lib/QueueURL";
import { getQSU, getUniqueName } from "../utils";

describe("QueueURL", () => {
  const serviceURL = getQSU();
  let queueName: string = getUniqueName("queue");
  let queueURL = QueueURL.fromServiceURL(serviceURL, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
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

  it("setAccessPolicy negative", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          expiry: new Date("2018-12-31T11:22:33.4567890Z"),
          permission: "rwdl",
          start: new Date("2017-12-31T11:22:33.4567890Z")
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    let error;
    try {
      await queueURL.setAccessPolicy(Aborter.none, queueAcl);
    } catch (err) {
      error = err;
    }
    assert.ok(error);
  });
});
