import { env, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { Recorder } from "@azure/test-utils-recorder";
import { ComputeManagementClient } from "../src";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    SUBSCRIPTION_ID: "azure_subscription_id"
  },
  customizationsOnRecordings: [
    (recording: any): any =>
      recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
  ],
  queryParametersToSkip: []
};

describe("My test", () => {
  let recorder: Recorder;
  let client: ComputeManagementClient;
  let subscriptionId: string;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    subscriptionId = env.SUBSCRIPTION_ID;

    // This is an example of how the environment variables are used
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    client = new ComputeManagementClient(credential, subscriptionId);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it.only("sample test", async function() {
    console.log("Hi, I'm a test!");
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
