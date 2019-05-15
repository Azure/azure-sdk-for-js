import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { ISignedIdentifier, ShareClient } from "../../src/ShareClient";
import { getBSU, getUniqueName } from "./../utils";

describe("ShareClient", () => {
  const serviceClient = getBSU();
  let shareName: string = getUniqueName("share");
  let shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);
  });

  afterEach(async () => {
    await shareClient.delete(Aborter.none);
  });

  it("setAccessPolicy", async () => {
    const yesterday = new Date();
    const tomorrow = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const identifiers: ISignedIdentifier[] = [
      {
        accessPolicy: {
          expiry: tomorrow,
          permission: "rwd",
          start: yesterday
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    await shareClient.setAccessPolicy(Aborter.none, identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy(Aborter.none);

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.expiry.getTime(),
      identifiers[0].accessPolicy.expiry.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.start.getTime(),
      identifiers[0].accessPolicy.start.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.permission,
      identifiers[0].accessPolicy.permission
    );
  });

  it("getAccessPolicy", (done) => {
    // create() with default parameters has been tested in setAccessPolicy
    done();
  });
});
