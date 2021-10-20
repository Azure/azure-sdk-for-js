import { AccessControlRestClient } from "../../src/accessControl";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder, getWorkspaceName } from "./utils/recordedClient";
import { v4 as uuid } from "uuid";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlRestClient;
  let roleAssignmentId = "262381d6-b22f-45a4-a40d-8d10e6996b54";
  let principalId = "c582486c-3066-4c6a-b657-82f998581fc5";
  let scope = "workspaces/xysynapsetest";
  const roleId = "2a385764-43e8-416c-9825-7b18d05a2c4b";

  before(() => {
    if (isLiveMode()) {
      roleAssignmentId = uuid();
      principalId = uuid();
      scope = getWorkspaceName();
    }
  });

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async () => {
    const result = await client.path("/roleDefinitions").get();

    if (result.status !== "200") {
      assert.fail(`Unexpected status ${result.status}`);
    }

    assert.isTrue(result.body.length > 0);
  });

  it("should list RBAC scopes", async () => {
    const result = await client.path("/rbacScopes").get();

    if (result.status !== "200") {
      assert.fail(`Unexpected status ${result.status}`);
    }

    assert.isTrue(result.body.length > 0);
  });

  describe("Role Assignments", () => {
    it("should create a role assignment", async () => {
      const result = await client
        .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
        .put({
          body: {
            principalId,
            scope,
            roleId
          }
        });

      if (result.status !== "200") {
        assert.fail(`Unexpected status ${result.status}\n ${JSON.stringify(result.body)}`);
      }

      assert.equal(result.body.id, roleAssignmentId);
    });

    it("should get role assignment", async () => {
      const result = await client
        .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
        .get();

      if (result.status !== "200") {
        assert.fail(`Unexpected status ${result.status}`);
      }

      assert.equal(result.body.id, roleAssignmentId);
    });

    it("should list Role Assignments", async () => {
      const result = await client.path("/roleAssignments").get();

      if (result.status !== "200") {
        assert.fail(`Unexpected status ${result.status}`);
      }
      assert.isTrue(result.body.value?.some((v) => v.id === roleAssignmentId));
    });

    it("should delete role assignment", async () => {
      const result = await client
        .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
        .delete();

      assert.include(["204", "200"], result.status);
    });
  });
});
