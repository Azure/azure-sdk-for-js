import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { ContainerClient } from "../../src/ContainerClient";
import { getBSU, getUniqueName } from "../utils";
import { PublicAccessType } from "../../src/generated/lib/models/index";

describe("ContainerClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("getAccessPolicy", async () => {
    const result = await containerClient.getAccessPolicy(Aborter.none);
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

    await containerClient.setAccessPolicy(Aborter.none, access, containerAcl);
    const result = await containerClient.getAccessPolicy(Aborter.none);
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);
  });
});
