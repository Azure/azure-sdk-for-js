import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { ShareURL } from "../src/ShareURL";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Aborter", () => {
  const serviceURL = getBSU();
  let shareName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  });

  it("should set value and get value successfully", async () => {
    const aborter = Aborter.none.withValue("mykey", "myvalue");
    assert.deepStrictEqual(aborter.getValue("mykey"), "myvalue");
  });

  it("Should not abort after calling abort()", async () => {
    await shareURL.create(Aborter.none);
    await shareURL.delete(Aborter.none);
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = Aborter.none;
    const response = shareURL.create(aborter);
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = Aborter.none;
    await shareURL.create(aborter);
    aborter.abort();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await shareURL.create(Aborter.timeout(1));
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = shareURL.create(aborter.withTimeout(10 * 60 * 1000));
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after parent aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = shareURL.create(aborter.withTimeout(10 * 60 * 1000));
      await response;
      assert.fail();
    } catch (err) {}
  });
});
