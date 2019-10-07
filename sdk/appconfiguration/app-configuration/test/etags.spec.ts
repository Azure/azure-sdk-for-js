import { AppConfigurationClient } from "../src";
import {
  getConnectionStringFromEnvironment,
  deleteKeyCompletely,
  assertThrowsRestError
} from "./testHelpers";
import * as assert from "assert";
import { ResponseBodyNotFoundError } from "@azure/core-http";

describe("etags", () => {
  let client: AppConfigurationClient;
  const key = `etags-${Date.now()}`;

  before(async () => {
    client = new AppConfigurationClient(getConnectionStringFromEnvironment());
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

  // etag usage is 'opt-in' via the ifMatch/ifNoneMatch options for certain calls
  // by default no etags are used.
  it("Get and set by default doesn't use etags", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    // by default - ignores the etag in 'addedSetting.etag' so last one in
    // wins
    addedSetting.value = "some new value!";
    await client.setConfigurationSetting(addedSetting);
  });

  it("Get and set, enabling etag checking using ifMatch", async () => {
    const addedSetting = await client.getConfigurationSetting({ key });

    addedSetting.value = "some new value!";

    await client.setConfigurationSetting(addedSetting, { ifMatch: addedSetting.etag });
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
          ifMatch: addedSetting.etag
        }),
      412,
      "Old etag will result in a failed update and error"
    );
  });

  it("get using ifNoneMatch to only get the setting if it's changed", async () => {
    const originalSetting = await client.setConfigurationSetting({
      key: key,
      value: "world"
    });

    // only get the setting if it changed (it hasn't)
    try {
      await client.getConfigurationSetting({ key }, {
        ifNoneMatch: originalSetting.etag
      });
    } catch (err) {
      assert.ok(err instanceof ResponseBodyNotFoundError);
      assert.equal("The requested setting's value has not changed since the last request.", err.message);
      assert.equal("Resource same as remote", err.code);
      assert.equal(304, err.statusCode);
    }

    // let's update it and then try again
    await client.setConfigurationSetting({ key: key, value: "new world" });

    const updatedSetting = await client.getConfigurationSetting({ key });
    assert.notEqual(
      originalSetting.etag,
      updatedSetting.etag,
      "New content, new update, etags shouldn't match"
    );

    // only get the setting if it changed (it has!)
    const configurationSetting = await client.getConfigurationSetting({ key }, {
      ifNoneMatch: originalSetting.etag
    });

    // now our retrieved setting matches what's on the server
    assert.equal("new world", configurationSetting.value);
    assert.equal(updatedSetting.etag, configurationSetting.etag);
  });
});
