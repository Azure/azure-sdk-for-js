import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { ISignedIdentifier, ShareURL } from "../../lib/ShareURL";
import { getBSU, getUniqueName } from "./../utils";

describe("ShareURL", () => {
  const serviceURL = getBSU();
  let shareName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
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

    await shareURL.setAccessPolicy(Aborter.none, identifiers);
    const getAccessPolicyResponse = await shareURL.getAccessPolicy(
      Aborter.none
    );

    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].id,
      identifiers[0].id
    );
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

  it("getAccessPolicy", done => {
    // create() with default parameters has been tested in setAccessPolicy
    done();
  });
});
