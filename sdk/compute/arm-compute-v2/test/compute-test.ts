import pkg from "@azure/test-utils-recorder";
const { env, record } = pkg;
import { Recorder } from "@azure/test-utils-recorder";
import { ComputeManagementClient } from "../src";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { Context } from "mocha";

describe("My test", () => {
  let recorder: Recorder;
  let client: ComputeManagementClient;
  let subscriptionId: string;

  beforeEach(async function() {
    recorder = record(this, env);
    subscriptionId = env.SUBSCRIPTION_ID;

    // This is an example of how the environment variables are used
    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    client = new ComputeManagementClient(credential, subscriptionId);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("availability create test", async function() {
    const result = await client.availabilitySets.createOrUpdate("qiaozhatest", "jssdktest", {
      location: "eastuse"
    });
    assert.equal(result.name, "jssdktest");
  });

  it("availability get test", async function() {
    const result = await client.availabilitySets.get("qiaozhatest", "jssdktest");
    assert.equal(result.name, "jssdktest");
  });
});
