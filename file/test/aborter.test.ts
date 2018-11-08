import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ContainerURL } from "../lib/ContainerURL";
import { getBSU, getUniqueName } from "./utils";

// tslint:disable:no-empty
describe("Aborter", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
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
