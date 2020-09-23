// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUser } from "@azure/communication-common";
import { assert } from "chai";
import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { CommunicationIdentityClient } from "../src";
import { createRecordedCommunicationIdentityClient } from "./utils/recordedClient";

describe("CommunicationIdentityClient [Playback/Live]", function() {
  let user: CommunicationUser;
  let recorder: Recorder;
  let client: CommunicationIdentityClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedCommunicationIdentityClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully creates a user", async function() {
    user = await client.createUser();
    assert.isString(user.communicationUserId);
  });

  it("successfully issues a token for a user [single scope]", async function() {
    const { token, expiresOn, user: receivedUser } = await client.issueToken(user, ["chat"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
    assert.deepEqual(receivedUser, user);
  });

  it("successfully issues a token for a user [multiple scopes]", async function() {
    const { token, expiresOn, user: receivedUser } = await client.issueToken(user, [
      "chat",
      "pstn"
    ]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
    assert.deepEqual(receivedUser, user);
  });

  it("successfully revokes tokens issued for a user", async function() {
    const { _response: response } = await client.revokeTokens(
      user,
      // Must set tokensValidFrom if in playback mode so date strings will match
      // when Nock searches for requests
      isPlaybackMode() ? new Date("2020-10-10T00:00:00.000Z") : undefined
    );
    assert.equal(response.status, 204);
    const { tokensValidFrom } = JSON.parse(response.request.body);
    assert.isNotNaN(Date.parse(tokensValidFrom));
  });

  it("successfully deletes a user", async function() {
    const { _response: response } = await client.deleteUser(user);
    assert.equal(response.status, 204);
  }).timeout(20000);
});
