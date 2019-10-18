import { AppConfigurationClient } from "../src";
import {
  createAppConfigurationClientForTests,
  deleteKeyCompletely,
  assertThrowsRestError
} from "./testHelpers";
import * as assert from "assert";

describe("etags", () => {
  let client: AppConfigurationClient;
  const key = `etags-${Date.now()}`;

  before(function () {
    client = createAppConfigurationClientForTests() || this.skip();
  });

  beforeEach(async () => {
    await client.addConfigurationSetting({
      key: key,
      value: "some value"
    });
  });

  afterEach(async () => {
    await deleteKeyCompletely([key], client);
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

    const newlyUpdatedSetting = await client.setConfigurationSetting(addedSetting, { onlyIfUnchanged: true });
    assert.equal(newlyUpdatedSetting.value, addedSetting.value);
  });

  it("set with an old etag will throw RestError", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    addedSetting.value = "some new value!";

    // sneaky process B comes in and does an update (ie, does NOT
    // enable the etag)
    await client.setConfigurationSetting({
      ...addedSetting,
      value: "sneaky user updated the field"
    });

    // the value (and thus the etag) was changed behind our backs
    // so now this update (with the original etag) will throw.
    await assertThrowsRestError(
      () =>
        client.setConfigurationSetting(addedSetting, {
          onlyIfUnchanged: true
        }),
      412,
      "Old etag will result in a failed update and error"
    );
  });

  it("get using ifNoneMatch to only get the setting if it's changed (ie: safe GET)", async () => {
    const originalSetting = await client.setConfigurationSetting({
      key: key,
      value: "world"
    });

    // only get the setting if it changed (it hasn't)
    const response = await client.getConfigurationSetting(originalSetting, {
      onlyIfChanged: true
    });

    // to keep 'key' a required field we fill this out (but set all the other properties to undefined)
    assert.equal(response.key, key);
    assert.equal(response._response.status, 304);
    assert.equal(response.statusCode, 304);    

    assert.ok(!response.contentType);
    assert.ok(!response.etag);    
    assert.ok(!response.label);
    assert.ok(!response.lastModified);
    assert.ok(!response.locked);
    assert.ok(!response.tags);
    assert.ok(!response.value);

    // let's update it and then try again
    await client.setConfigurationSetting({ key: key, value: "new world" });

    const updatedSetting = await client.getConfigurationSetting({ key });
    
    assert.notEqual(
      originalSetting.etag,
      updatedSetting.etag,
      "New content, new update, etags shouldn't match"
    );

    assert.equal(200, updatedSetting.statusCode);

    // only get the setting if it changed (it has!)
    const configurationSetting = await client.getConfigurationSetting(originalSetting, {
      onlyIfChanged: true
    });

    // now our retrieved setting matches what's on the server
    assert.equal("new world", configurationSetting.value);
    assert.equal(updatedSetting.etag, configurationSetting.etag);
  });
});
