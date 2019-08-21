import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { ContainerURL } from "../../src/ContainerURL";
import { PublicAccessType } from "../../src/generated/src/models";
import { getBSU } from "../utils";
import { record } from "../utils/recorder";

describe("ContainerURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("getAccessPolicy", async () => {
    const result = await containerURL.getAccessPolicy(Aborter.none);
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

    await containerURL.setAccessPolicy(Aborter.none, access, containerAcl);
    const result = await containerURL.getAccessPolicy(Aborter.none);
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);
  });
});
