// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { DeviceUpdateRestClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { assert } from "chai";

describe("group and deployment test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateRestClient;


  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("group test", async function() {
    const instanceId = "sdkinstance";
    const groupId = "joegroup";
    const deploymentId = "testdeployment1";

    const listGroupResult = await client.path("/deviceupdate/{instanceId}/management/groups", instanceId).get();
    if (listGroupResult.status !== "200") {
      assert.fail(`GET "/deviceupdate/${instanceId}/management/groups" failed with ${listGroupResult.status}`);
    }

    const createGroupResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}", instanceId, groupId)
      .put({
        body: {
          groupId: groupId,
          "tags": [
            groupId
          ],
          "createdDateTime": "2021-11-17T16:29:56.5770502+00:00",
          "groupType": "DeviceClassIdAndIoTHubTag",
          "deviceClassId": "0919e3ae422a2bfa8c84ff905813e60351e456d1"
        }
      });
    if (createGroupResult.status !== "200") {
      assert.fail(`PUT "/deviceupdate/${instanceId}/management/groups/${groupId}" failed with ${createGroupResult.status}`);
    }

    const getGroupResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}", instanceId, groupId).get();
    if (getGroupResult.status !== "200") {
      assert.fail(`GET "/deviceupdate/${instanceId}/management/groups/${groupId}" failed with ${getGroupResult.status}`);
    }

    const createDeploymentResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}", instanceId, groupId, deploymentId)
      .put({
        body: {
          "deploymentId": "testdeployment1",
          "startDateTime": "2021-09-02T16:29:56.5770502Z",
          "groupId": "joegroup",
          "updateId": {
            "provider": "fabrikam",
            "name": "vacuum",
            "version": " 2021.1117.1036.48"
          }
        }
      });
    if (createDeploymentResult.status !== "200") {
      assert.fail(`PUT "/deviceupdate/${instanceId}/management/groups/${groupId}/deployments/${deploymentId}" failed with ${getGroupResult.status}`);
    }
    
    const getDeploymentResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}", instanceId, groupId, deploymentId)
      .get();
    if (getDeploymentResult.status !== "200") {
      assert.fail(`GET "/deviceupdate/${instanceId}/management/groups/${groupId}/deployments/${deploymentId}" failed with ${getGroupResult.status}`);
    }
    
    const deleteDeploymentResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}/deployments/{deploymentId}", instanceId, groupId, deploymentId)
      .delete();
    if (deleteDeploymentResult.status !== "204") {
      assert.fail(`DELETE "/deviceupdate/${instanceId}/management/groups/${groupId}/deployments/${deploymentId}" failed with ${deleteDeploymentResult.status}`);
    }

    const deleteGroupResult = await client.path("/deviceupdate/{instanceId}/management/groups/{groupId}", instanceId, groupId)
      .delete();
    if (deleteGroupResult.status !== "204") {
      assert.fail(`DELETE "/deviceupdate/${instanceId}/management/groups/${groupId}" failed with ${deleteGroupResult.status}`);
    }


  });
}).timeout(60000000000);
