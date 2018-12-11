import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { QueueURL } from "../lib/QueueURL";
import { getQSU, getUniqueName } from "./utils";

describe("QueueURL", () => {
  const serviceURL = getQSU();
  let queueName = getUniqueName("queue");
  let queueURL = QueueURL.fromServiceURL(serviceURL, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await queueURL.setMetadata(Aborter.none, metadata);

    const result = await queueURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties with default/all parameters", async () => {
    const result = await queueURL.getProperties(Aborter.none);
    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", done => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters", async () => {
    const qURL = QueueURL.fromServiceURL(serviceURL, getUniqueName(queueName));
    const metadata = { key: "value" };
    await qURL.create(Aborter.none, { metadata });
    const result = await qURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", done => {
    // delete() with default parameters has been tested in afterEach
    done();
  });
});
