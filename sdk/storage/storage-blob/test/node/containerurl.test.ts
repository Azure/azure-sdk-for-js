import * as assert from "assert";

import { ContainerURL } from "../../src/ContainerURL";
import { getBSU, getUniqueName } from "../utils";
import { PublicAccessType } from "../../src/generated/lib/models/index";

describe("ContainerURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create();
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  it("getAccessPolicy", async () => {
    const result = await containerURL.getAccessPolicy();
    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("setAccessPolicy", async () => {
    const access: PublicAccessType = "blob";
    const containerAcl = [
      {
        accessPolicy: {
          expiry: new Date("2018-12-31T11:22:33.4567890Z"),
          permission: "rwd",
          start: new Date("2017-12-31T11:22:33.4567890Z")
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    await containerURL.setAccessPolicy(access, containerAcl);
    const result = await containerURL.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);
  });
});
