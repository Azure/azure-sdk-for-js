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
    ? "63d7a4ea-5ee9-46de-acf4-76945d2760c9"
    : "e7b22cf8-773d-4d4e-bcce-c3796e722394";
  let principalId = isNode
    ? "126a182d-42fe-444d-9855-dbec15594bfc"
    : "cb3a6666-3467-4455-8de4-2159465409f2";
  let scope = "workspaces/joheredisyn";
  const roleId = "2a385764-43e8-416c-9825-7b18d05a2c4b";

  beforeEach(async function() {
    console.log(JSON.stringify(this.currentTest?.title))
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
