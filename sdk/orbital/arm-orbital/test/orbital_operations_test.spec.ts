import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureOrbital } from "../src/azureOrbital";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id"
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("orbital test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: AzureOrbital;
  let location: string;
  let resourceGroup: string;
  let resourcename: string;
  let resourcename1: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new AzureOrbital(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "westus2";
    resourceGroup = "myjstest";
    resourcename = "resourcetest";
    resourcename1 = "resourcetest1";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("contactProfiles create test", async function () {
    //need to create a virtualnetwork "myvirtualnetwork" and a subnet "testsubnets". Then set SUBNET DELEGATION to"Microsoft.Orbital/orbitalGateways"
    const res = await client.contactProfiles.beginCreateOrUpdateAndWait(
      resourceGroup,
      resourcename,
      location,
      {
        "subnetId": "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/Microsoft.Network/virtualNetworks/myvirtualnetwork/subnets/testsubnets"
      },
      [
        {
          "name": "contoso-uplink",
          "polarization": "LHCP",
          "direction": "Uplink",
          "gainOverTemperature": 0,
          "eirpdBW": 45,
          "channels": [
            {
              "name": "contoso-uplink-channel",
              "centerFrequencyMHz": 2250.0,
              "bandwidthMHz": 2.0,
              "endPoint": {
                "ipAddress": "10.1.0.4",
                "endPointName": "ContosoTest_Uplink",
                "port": "50000",
                "protocol": "TCP"
              }
            }
          ]
        },
        {
          "name": "contoso-downlink",
          "polarization": "RHCP",
          "direction": "Downlink",
          "gainOverTemperature": 25.0,
          "eirpdBW": 0.0,
          "channels": [
            {
              "name": "contoso-downlink-channel",
              "centerFrequencyMHz": 8160.0,
              "bandwidthMHz": 15.0,
              "endPoint": {
                "ipAddress": "10.1.0.5",
                "endPointName": "ContosoTest_Downlink",
                "port": "50001",
                "protocol": "UDP"
              }
            }
          ]
        }
      ],
      testPollingOptions);
    assert.equal(res.name, resourcename);
  });

  it("contactProfiles get test", async function () {
    const res = await client.contactProfiles.get(resourceGroup, resourcename);
    assert.equal(res.name, resourcename);
  });

  it("contactProfiles list test", async function () {
    const resArray = new Array();
    for await (let item of client.contactProfiles.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("contactProfiles delete test", async function () {
    const resArray = new Array();
    const res = await client.contactProfiles.beginDeleteAndWait(resourceGroup, resourcename, testPollingOptions)
    for await (let item of client.contactProfiles.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("spacecrafts create test", async function () {
    const titleLine = "CONTOSO_SAT";
    const tleLine1 = "1 27424U 02022A   22167.05119303  .00000638  00000+0  15103-3 0  9994";
    const tleLine2 = "2 27424  98.2477 108.9546 0000928  92.9194 327.0802 14.57300770 69982";
    const links = [
      {
        "name": "uplink_lhcp1",
        "centerFrequencyMHz": 2250.0,
        "bandwidthMHz": 2.0,
        "direction": "Uplink",
        "polarization": "LHCP"
      },
      {
        "name": "downlink_rhcp1",
        "centerFrequencyMHz": 8160.0,
        "bandwidthMHz": 15.0,
        "direction": "Downlink",
        "polarization": "RHCP"
      }
    ];
    const res = await client.spacecrafts.beginCreateOrUpdateAndWait(
      resourceGroup,
      resourcename1,
      location,
      titleLine,
      tleLine1,
      tleLine2,
      links,
      testPollingOptions);
    assert.equal(res.name, resourcename1);
  });

  it("spacecrafts get test", async function () {
    const res = await client.spacecrafts.get(resourceGroup, resourcename1);
    assert.equal(res.name, resourcename1);
  });

  it("spacecrafts list test", async function () {
    const resArray = new Array();
    for await (let item of client.spacecrafts.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("spacecrafts delete test", async function () {
    const resArray = new Array();
    const res = await client.spacecrafts.beginDeleteAndWait(resourceGroup, resourcename1, testPollingOptions)
    for await (let item of client.spacecrafts.list(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
})
