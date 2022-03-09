import { AccessControlRestClient } from "../../src/accessControl";
import { paginate } from "../../src/paginateHelper";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder, getWorkspaceName } from "./utils/recordedClient";
import { v4 as uuid } from "uuid";
import { isNode } from "@azure/core-util";
import { RoleAssignmentDetails } from "../../src";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlRestClient;
  // When re-recording tests generate 4 new guids and replace roleAssignmentId and principalId
  let roleAssignmentId = isNode
    ? "50f3ab49-a50e-4e81-bdca-92672423ee03"
    : "fce80a60-785c-4e22-b341-57e3a5171ac0";
  let principalId = isNode
    ? "2c819cbc-ff7b-4ea8-9d69-541281ae2184"
    : "b895aef7-f11e-47bc-9329-bf6a89c59d8b";
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
        .put({ body: { principalId, roleId, scope } });

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
      const initialResponse = await client.path("/roleAssignments").get();

      if (initialResponse.status !== "200") {
        assert.fail(`Unexpected status ${initialResponse.status}`);
      }

      const assignments = paginate(client, initialResponse);

      let testAssignment: RoleAssignmentDetails | undefined;

      for await (const assignment of assignments) {
        if (assignment.id === roleAssignmentId) {
          testAssignment = assignment;
        }
      }

      assert.isDefined(testAssignment);
    });

    it("should delete role assignment", async () => {
      const result = await client
        .path("/roleAssignments/{roleAssignmentId}", roleAssignmentId)
        .delete();

      assert.include(["204", "200"], result.status);
    });
  });
});
