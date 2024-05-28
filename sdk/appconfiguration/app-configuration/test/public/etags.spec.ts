// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, testPollingOptions } from "@azure-tools/test-recorder";
import {
  assertThrowsRestError,
  createAppConfigurationClientForTests,
  deleteKeyCompletely,
  startRecorder,
} from "./utils/testHelpers";
import { AppConfigurationClient } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";

describe("etags", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  let key: string;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    key = recorder.variable("etags", `etags${Math.floor(Math.random() * 1000)}`);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    await client.addConfigurationSetting({
      key: key,
      value: "some value",
    });
  });

  afterEach(async function () {
    // <sync-token> values differ, request <zAJw6V16=Nzo1IzI1OTI0MTE=>, record <zAJw6V16=Nzo1IzI1OTI0MTM=>
    await deleteKeyCompletely([key], client);
    await recorder.stop();
  });

  // etag usage is 'opt-in' via the onlyIfChanged/onlyIfUnchanged options for certain calls
  // by default no etags are used.
  it("Get and set by default doesn't use etags", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    // by default - ignores the etag in 'addedSetting.etag' so last one in
    // wins
    addedSetting.value = "some new value!";
    await client.setConfigurationSetting(addedSetting);
  });

  it("Get and set, enabling etag checking using onlyIfUnchanged", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    addedSetting.value = "some new value!";

    // etag of the remote setting matches what we have so we're okay to update
    const newlyUpdatedSetting = await client.setConfigurationSetting(addedSetting, {
      onlyIfUnchanged: true,
    });
    assert.equal(newlyUpdatedSetting.value, addedSetting.value);

    const badEtagSetting = {
      ...addedSetting,
      etag: "bogus",
    };

    // trying to save with a non-matching etag (when we specifically said to only save if
    // nothing has changed) will result in a 412 (precondition failed)
    await assertThrowsRestError(
      () => client.setConfigurationSetting(badEtagSetting, { onlyIfUnchanged: true }),
      412,
    );
  });

  it("set with an old etag will throw RestError", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    addedSetting.value = "some new value!";

    // sneaky process B comes in and does an update (ie, does NOT
    // enable the etag)
    await client.setConfigurationSetting({
      ...addedSetting,
      value: "sneaky user updated the field",
    });

    // the value (and thus the etag) was changed behind our backs
    // so now this update (with the original etag) will throw.
    await assertThrowsRestError(
      () =>
        client.setConfigurationSetting(addedSetting, {
          onlyIfUnchanged: true,
        }),
      412,
      "Old etag will result in a failed update and error",
    );
  });

  it("get using ifNoneMatch to only get the setting if it's changed (ie: safe GET)", async () => {
    const originalSetting = await client.setConfigurationSetting({
      key: key,
      value: "world",
    });

    // only get the setting if it changed (it hasn't)
    const response = await client.getConfigurationSetting(originalSetting, {
      onlyIfChanged: true,
    });

    // to keep 'key' a required field we fill this out (but set all the other properties to undefined)
    assert.equal(response.key, key);
    assert.equal(response.statusCode, 304);

    assert.ok(!response.contentType);
    assert.ok(!response.etag);
    assert.ok(!response.label);
    assert.ok(!response.lastModified);
    assert.ok(!response.isReadOnly);
    assert.ok(!response.tags);
    assert.ok(!response.value);

    // let's update it and then try again
    await client.setConfigurationSetting({ key: key, value: "new world" });

    const updatedSetting = await client.getConfigurationSetting({ key });

    assert.notEqual(
      originalSetting.etag,
      updatedSetting.etag,
      "New content, new update, etags shouldn't match",
    );

    assert.equal(200, updatedSetting.statusCode);

    // only get the setting if it changed (it has!)
    const configurationSetting = await client.getConfigurationSetting(originalSetting, {
      onlyIfChanged: true,
    });

    // now our retrieved setting matches what's on the server
    assert.equal("new world", configurationSetting.value);
    assert.equal(updatedSetting.etag, configurationSetting.etag);
  });

  it("(set|clear)readonly using etags", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    const badEtagSetting = {
      ...addedSetting,
      etag: "bogus",
    };

    // etag won't match so we get a precondition failed
    await assertThrowsRestError(
      () =>
        client.setReadOnly(badEtagSetting, true, {
          onlyIfUnchanged: true,
        }),
      412,
    );

    let actualSetting = await client.getConfigurationSetting(badEtagSetting);
    // should not be read-only since it didn't match
    assert.ok(!actualSetting.isReadOnly);

    // and now that the etag matches we should be able to set the
    // key's value to read-onlly
    await client.setReadOnly(addedSetting, true, { onlyIfUnchanged: true });
    actualSetting = await client.getConfigurationSetting(addedSetting);
    assert.ok(actualSetting.isReadOnly);

    // now let's try to clear it (using a bogus etag so it won't match)
    await assertThrowsRestError(
      () =>
        client.setReadOnly(badEtagSetting, false, {
          onlyIfUnchanged: true,
        }),
      412,
    );

    // ...still readOnly
    actualSetting = await client.getConfigurationSetting(addedSetting);
    assert.ok(actualSetting.isReadOnly);

    // now we'll use the right etag (from the setting we just retrieved)
    await client.setReadOnly(actualSetting, false, {
      onlyIfUnchanged: true,
    });

    // and now it's no longer readOnly
    actualSetting = await client.getConfigurationSetting(addedSetting);
    assert.ok(!actualSetting.isReadOnly);
  });

  it("delete using etags", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    const badEtagSetting = {
      ...addedSetting,
      etag: "bogus",
    };

    await assertThrowsRestError(
      () => client.deleteConfigurationSetting(badEtagSetting, { onlyIfUnchanged: true }),
      412,
    );

    // obviously the setting is still there (or else this would throw)
    await client.getConfigurationSetting({ key });

    // this time we'll pass in the proper setting with the right etag
    await client.deleteConfigurationSetting(addedSetting, { onlyIfUnchanged: true });

    // and now the setting isn't found
    await assertThrowsRestError(() => client.getConfigurationSetting({ key }), 404);
  });

  it("archive and recover using etags", async () => {
    const snapshot1 = {
      name: recorder.variable("snapshot", `snapshot${Math.floor(Math.random() * 1000)}`),
      retentionPeriodInSeconds: 2592000,
      filters: [{ keyFilter: key, valueFilter: "some value" }],
    };
    const newSnapshot = await client.beginCreateSnapshotAndWait(snapshot1, testPollingOptions);
    await assertThrowsRestError(
      () => client.archiveSnapshot(newSnapshot.name, { etag: "badEtag" }),
      412,
    );
    await client.archiveSnapshot(newSnapshot.name, { etag: newSnapshot.etag });

    await assertThrowsRestError(
      () => client.recoverSnapshot(newSnapshot.name, { etag: "badEtag" }),
      412,
    );
  });
});
