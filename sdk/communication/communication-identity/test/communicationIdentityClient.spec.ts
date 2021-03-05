// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier
} from "@azure/communication-common";
import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { CommunicationIdentityClient } from "../src";
import { createRecordedCommunicationIdentityClient } from "./utils/recordedClient";

describe("CommunicationIdentityClient [Playback/Live]", function() {
  let user: CommunicationUserIdentifier;
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

  it("successfully creates a user and token", async function() {
    const { user: newUser, token } = await client.createUserAndToken(["voip"]);
    assert.isString(newUser.communicationUserId);
    assert.isString(token);
  });

  it("successfully gets a token for a user [single scope]", async function() {
    const { token, expiresOn } = await client.getToken(user, ["chat"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
  });

  it("successfully gets a token for a user [multiple scopes]", async function() {
    const { token, expiresOn } = await client.getToken(user, ["chat", "voip"]);
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
  });

  it("successfully creates a user and gets a token in a single request", async function() {
    const { user: newUser, token, expiresOn } = await client.createUserAndToken(["chat", "voip"]);
    assert.isTrue(isCommunicationUserIdentifier(newUser));
    assert.isString(token);
    assert.instanceOf(expiresOn, Date);
  });

  it("successfully revokes tokens issued for a user", async function() {
    await client.revokeTokens(user);
  });

  it("successfully deletes a user", async function() {
    await client.deleteUser(user);
  }).timeout(20000);
});
