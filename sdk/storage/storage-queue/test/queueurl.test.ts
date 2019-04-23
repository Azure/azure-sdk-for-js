import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { QueueURL } from "../src/QueueURL";
import { getQSU } from "./utils";
import { record } from "./utils/nock-recorder";
import * as dotenv from "dotenv";
dotenv.config({ path:"../.env" });

describe("QueueURL", function() {
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

  it("getProperties negative", async () => {
    const queueName2 = recorder.getUniqueName("queue", "queue2");
    const queueURL2 = QueueURL.fromServiceURL(serviceURL, queueName2)
    let error;
    try {
      await queueURL2.getProperties(Aborter.none);
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(error.statusCode);
    assert.deepEqual(error.statusCode, 404)
    assert.ok(error.response)
    assert.ok(error.response.body)
    assert.ok(error.response.body.includes("QueueNotFound"))
  })

  it("create with default parameters", done => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters", async () => {
    const qURL = QueueURL.fromServiceURL(serviceURL, recorder.getUniqueName(queueName));
    const metadata = { key: "value" };
    await qURL.create(Aborter.none, { metadata });
    const result = await qURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  // create with invalid queue name
  it("create negative", async() => {
    const qURL = QueueURL.fromServiceURL(serviceURL, "");
    let error;
    try {
      await qURL.create(Aborter.none);
    } catch(err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(error.statusCode);
    assert.deepEqual(error.statusCode, 400)
    assert.ok(error.response)
    assert.ok(error.response.body)
    assert.ok(error.response.body.includes("InvalidResourceName"))
  });

  it("delete", done => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  // getAccessPolicy and setAccessPolicy is in node's cases.
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
    assert.ok(error); // For browser, permission denied; For node, invalid permission
  });
});
