import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { ContainerClient } from "../src/ContainerClient";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Aborter", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);
  });

  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });

  it("Should not abort after calling abort()", async () => {
    await containerClient.create({abortSignal: Aborter.none});
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = Aborter.none;
    const response = containerClient.create({abortSignal: aborter});
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = Aborter.none;
    await containerClient.create({abortSignal: aborter});
    aborter.abort();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await containerClient.create({abortSignal: Aborter.timeout(1)});
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after father aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = containerClient.create({abortSignal: aborter.withTimeout(10 * 60 * 1000)});
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after father aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = containerClient.create({abortSignal: aborter.withTimeout(10 * 60 * 1000)});
      await response;
      assert.fail();
    } catch (err) {}
  });
});
