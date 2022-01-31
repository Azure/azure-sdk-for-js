import { AccessControlRestClient } from "../../src/accessControl";
import { Recorder } from "@azure-tools/test-recorder";
import { RoleAssignmentDetails } from "../../src";
import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-util";
import { paginate } from "../../src/paginateHelper";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlRestClient;
  // When re-recording tests generate 4 new guids and replace roleAssignmentId and principalId
  
  let roleAssignmentId = isNode
    ? "cb9deb8e-6453-4145-9d82-14edf872ebe6"
    : "cc33aa88-5aa7-40e5-b9f5-dd11c471c7e8";
  let principalId = isNode
    ? "cf28f607-5e8c-4d59-b341-f4e3422ec4b9"
    : "6c74c432-9103-435f-83a0-5a6ee264439a";
  let scope = "workspaces/joheredisyn";
  const roleId = "2a385764-43e8-416c-9825-7b18d05a2c4b";

  beforeEach(async function() {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
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
