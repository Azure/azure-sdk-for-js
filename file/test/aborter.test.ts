import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName } from "./utils";

// tslint:disable:no-empty
describe("Aborter", () => {
  const serviceURL = getBSU();
  let shareName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
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
