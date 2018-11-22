import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName } from "./utils";

// tslint:disable:no-empty
describe("Aborter", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, containerName);
  });

  it("Should not abort after calling abort()", async () => {
    await shareURL.create(Aborter.none);
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

  it("Should abort after father aborter calls abort()", async () => {
    try {
      const aborter = Aborter.none;
      const response = shareURL.create(aborter.withTimeout(10 * 60 * 1000));
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after father aborter timeout", async () => {
    try {
      const aborter = Aborter.timeout(1);
      const response = shareURL.create(aborter.withTimeout(10 * 60 * 1000));
      await response;
      assert.fail();
    } catch (err) {}
  });
});
