// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { CommunicationIdentityClient } from "../src";
import { createRecordedCommunicationIdentityClientWithToken } from "./utils/recordedClient";

describe("CommunicationIdentityClientWithToken [Playback/Live]", function() {
  let recorder: Recorder;
  let client: CommunicationIdentityClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedCommunicationIdentityClientWithToken(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully issues a token for a user [single scope]", async function() {
    let user = await client.createUser();
    const { token, expiresOn, user: receivedUser } = await client.issueToken(user, ["chat"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
    assert.deepEqual(receivedUser, user);
  });

  it("successfully issues a token for a user [multiple scopes]", async function() {
    let user = await client.createUser();
    const { token, expiresOn, user: receivedUser } = await client.issueToken(user, [
      "chat",
      "pstn"
    ]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
    assert.deepEqual(receivedUser, user);
  });
});
