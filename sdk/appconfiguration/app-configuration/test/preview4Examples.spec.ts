import { deleteKeyCompletely, getConnectionStringFromEnvironment } from "./testHelpers";
import { AppConfigurationClient } from "../src";
import * as assert from "assert";
import { RestError } from "@azure/core-http";

describe("Preview 4", () => {
    let client: AppConfigurationClient;

    describe("ETag behaviors", () => {
        // suggested scenario - etag usage is opt-in (as options at the function call. 
        // the mere presence of an etag is not enough to trigger optimistic concurrency)
        it("Non-etag flow - get and set", async () => {
            const addedSetting = await client.getConfigurationSetting("hello", {
                label: "production"
            });

            // by default - ignores the etag in 'addedSetting.etag' so last one in
            // wins
            addedSetting.value = "some new value!";
            await client.setConfigurationSetting(addedSetting);
        });

        it("etag flow - get and set", async () => {
            const addedSetting = await client.getConfigurationSetting("hello", {
                label: "production"
            });

            // advanced user enables etag usage
            addedSetting.value = "some new value!";

            await client.setConfigurationSetting(addedSetting, {
                // explicitly enable the etag field
                respectETag: true
            });
        });

        it("etag flow - failures throw RestError's", async () => {
            const addedSetting = await client.getConfigurationSetting("hello", {
                label: "production"
            });

            // advanced user enables etag usage
            addedSetting.value = "some new value!";

            // sneaky process B comes in and does an update (ie, does NOT
            // enable the etag)
            await client.setConfigurationSetting({
                ...addedSetting,
                value: "sneaky user updated the field"
            });

            try {
                // the value (and thus the etag) was changed behind our backs
                // so now this update (with the original etag) will throw.
                await client.setConfigurationSetting(addedSetting, {
                    // explicitly enable the etag field
                    respectETag: true
                });

                assert.fail("WON'T GET HERE")
            } catch (err) {
                assert.ok(err instanceof RestError);
                assert.equal(412, (err as RestError).statusCode);
            }
        });
    });

    describe("New functionality for preview 4", () => {
        it("setReadOnly/clearReadOnly (formerly known as lock/unlock)", async () => {
            const testConfigSetting = { key: "hello", value: "world", label: "some label" };
            
            // before it's set to read only we can set it all we want
            await client.setConfigurationSetting(testConfigSetting);

            // label is optional
            await client.setReadOnly(testConfigSetting.key, "some label");

            // now set throws exceptions
            try {
                // exact same call that just worked before...
                await client.setConfigurationSetting(testConfigSetting);
                assert.fail("WON'T GET HERE");
            } catch (err) {
                assert.ok(err instanceof RestError);
                assert.equal(409, (err as RestError).statusCode);
            }
        });

        it("hasChanged", async () => {
            const setting = await client.getConfigurationSetting("hello", {
                label: "production",
            });

            // nobody's touched it - shouldn't be changed
            let hasChanged = await client.hasChanged(setting);
            assert.ok(!hasChanged);

            // now let's change it
            await client.setConfigurationSetting({
                key: "hello",
                label: "production",
                value: "a new value for hasChanged"
            });

            // and now it definitely has changed
            hasChanged = await client.hasChanged(setting);
            assert.ok(hasChanged);
        })
    });

    describe("Exceptions", () => {
        it("getConfigurationSetting throws exceptions for 404", async () => {
            try {
                await client.getConfigurationSetting("setting that does not exist", {
                    label: "production"
                });
                assert.fail("WON'T GET HERE")
            } catch (err) {
                assert.ok(err instanceof RestError);
                assert.equal(404, (err as RestError).statusCode);
            }
        });

        it("deleteConfigurationSetting does NOT throw if the setting is already gone (or never existed)", async () => {
            await client.deleteConfigurationSetting("hello", { label: "this never existed" });
        });
    });

    before(async () => {
        client = new AppConfigurationClient(getConnectionStringFromEnvironment());
    });

    beforeEach(async () => {
        await deleteKeyCompletely(["hello"], client);

        // the 'no label' value for 'hello'
        await client.addConfigurationSetting({
            key: "hello",
            value: "world"
        });

        // the 'production' labeled value for 'hello'
        await client.addConfigurationSetting({
            key: "hello",
            value: "world",
            label: "production"
        });
 
    });
});
