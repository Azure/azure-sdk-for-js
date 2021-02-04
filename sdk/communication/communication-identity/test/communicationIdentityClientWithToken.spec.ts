// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { CommunicationIdentityClient } from "../src";
import { createRecordedCommunicationIdentityClientWithToken } from "./utils/recordedClient";

describe("CommunicationIdentityClientWithToken [Playback/Live]", function() {
  let recorder: Recorder;
  let client: CommunicationIdentityClient;
  let shouldSkip = false;

  beforeEach(function() {
    const recordedClient = createRecordedCommunicationIdentityClientWithToken(this);
    if (!recordedClient) {
      shouldSkip = true;
    } else {
      client = recordedClient.client;
      recorder = recordedClient.recorder;
    }
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully issues a token for a user [single scope]", async function() {
    if (shouldSkip) {
      this.skip();
    }

    const user = await client.createUser();
    const { token, expiresOn } = await client.issueToken(user, ["chat"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
  });

  it("successfully issues a token for a user [multiple scopes]", async function() {
    if (shouldSkip) {
      this.skip();
    }

    const user = await client.createUser();
    const { token, expiresOn } = await client.issueToken(user, ["chat", "voip"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
  });
});
