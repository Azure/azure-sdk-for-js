import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { ISignedIdentifier, ShareURL } from "../../src/ShareURL";
import { getBSU } from "./../utils";
import { record } from "../utils/recorder";

describe("ShareURL Node.js only", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
    recorder.stop();
  });

  it("setAccessPolicy", async () => {
    const yesterday = recorder.newDate();
    const tomorrow = recorder.newDate();
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
    const getAccessPolicyResponse = await shareURL.getAccessPolicy(Aborter.none);

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
