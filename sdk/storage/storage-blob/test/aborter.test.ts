import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { ContainerURL } from "../src/ContainerURL";
import { getBSU } from "./utils";
import { record } from "./utils/nock-recorder";
import * as dotenv from "dotenv";
dotenv.config({path:"../.env"});

// tslint:disable:no-empty
describe("Aborter", function() {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  });

  afterEach(async () => {
    recorder.stop();
  })

  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });

  it("Should not abort after calling abort()", async () => {
    await containerURL.create(Aborter.none);
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = Aborter.none;
    const response = containerURL.create(aborter);
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = Aborter.none;
    await containerURL.create(aborter);
    aborter.abort();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await containerURL.create(Aborter.timeout(1));
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after father aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = containerURL.create(aborter.withTimeout(10 * 60 * 1000));
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after father aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = containerURL.create(aborter.withTimeout(10 * 60 * 1000));
      await response;
      assert.fail();
    } catch (err) {}
  });
});
