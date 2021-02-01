// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai, { assert } from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { env, Recorder } from "@azure/test-utils-recorder";

import { KeyVaultAccessControlClient, KeyVaultPermission, KeyVaultRoleDefinition } from "../../src";
import { authenticate } from "../utils/authentication";

describe("KeyVaultAccessControlClient", () => {
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;
  let generateFakeUUID: () => string;
  const globalScope = "/";

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.accessControlClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("role definitions", function() {
    const permissions: KeyVaultPermission[] = [
      {
        actions: [],
        dataActions: [
          "Microsoft.KeyVault/managedHsm/backup/start/action",
          "Microsoft.KeyVault/managedHsm/backup/status/action"
        ],
        notActions: [],
        notDataActions: []
      }
    ];

    it("listRoleDefinitions", async function() {
      const expectedType = "Microsoft.Authorization/roleDefinitions";
      let receivedRoles: string[] = [];

      for await (const roleDefinition of client.listRoleDefinitions(globalScope)) {
        // Each role definition will have the shape of:
        //
        //   {
        //     id: 'Microsoft.KeyVault/providers/Microsoft.Authorization/roleDefinitions/<ID>',
        //     name: '<ID>',
        //     type: '<role-type>',
        //     roleName: '<role-name>',
        //     // ...
        //   }
        //
        assert.equal(roleDefinition.kind, expectedType);
        receivedRoles.push(roleDefinition.roleName!);
      }

      // Roles might change
      assert.ok(receivedRoles.length);
    });

    describe("getRoleDefinition", function() {
      it("returns a role definition by name", async function() {
        const anyRoleDefinition = (await client.listRoleDefinitions(globalScope).next()).value;

        const roleDefinition = await client.getRoleDefinition(globalScope, anyRoleDefinition.name);

        assert.deepEqual(roleDefinition, anyRoleDefinition);
      });

      it("errors when the role definition cannot be found", async function() {
        await assert.isRejected(client.getRoleDefinition(globalScope, "does_not_exist"));
      });
    });

    it("can create, update, and delete a role definition (happy path)", async function() {
      const name = generateFakeUUID();
      const description = "custom role description";
      let roleDefinition: KeyVaultRoleDefinition = await client.upsertRoleDefinition(
        globalScope,
        name,
        permissions,
        description
      );

      assert.equal(roleDefinition.name, name);
      assert.equal(roleDefinition.description, description);
      assert.deepEqual(roleDefinition.permissions, permissions);
      assert.equal(roleDefinition.assignableScopes[0], globalScope);
      assert.equal("Microsoft.Authorization/roleDefinitions", roleDefinition.kind);
      assert.equal(roleDefinition.roleType, "CustomRole");

      const id = roleDefinition.id;

      permissions.push({
        actions: [],
        notActions: [],
        dataActions: [],
        notDataActions: ["Microsoft.KeyVault/managedHsm/keys/encrypt/action"]
      });

      roleDefinition = await client.upsertRoleDefinition(
        globalScope,
        name,
        permissions,
        description
      );

      assert.equal(roleDefinition.id, id);
      assert.deepEqual(roleDefinition.permissions, permissions);

      await client.deleteRoleDefinition(globalScope, roleDefinition.name);

      for await (const definition of client.listRoleDefinitions(globalScope)) {
        if (definition.id === roleDefinition.id) {
          assert.fail(
            "expected to successfully delete custom role definition, but it still exists."
          );
        }
      }
    });

    describe("upsertRoleDefinition", function() {
      it.skip("errors when name is not a valid guid", async function() {
        // There's a service issue preventing this test from running.
        // Skipping until ADO 9226405 is resolved
        await assert.isRejected(client.upsertRoleDefinition(globalScope, "foo", []));
      });

      it("errors when updating a built-in role definition", async function() {
        let builtInDefinition: KeyVaultRoleDefinition | undefined = undefined;

        for await (const definition of client.listRoleDefinitions(globalScope)) {
          if (definition.roleType !== "CustomRole") {
            builtInDefinition = definition;
          }
        }

        if (!builtInDefinition) {
          assert.fail("Could not find a built in role definition to test against.");
        }

        await assert.isRejected(
          client.upsertRoleDefinition(globalScope, builtInDefinition.name, permissions)
        );
      });
    });

    describe("deleteRoleDefinition", function() {
      it("errors when deleting a built-in role definition", async function() {
        let builtInDefinition: KeyVaultRoleDefinition | undefined = undefined;

        for await (const definition of client.listRoleDefinitions(globalScope)) {
          if (definition.roleType !== "CustomRole") {
            builtInDefinition = definition;
          }
        }

        if (!builtInDefinition) {
          assert.fail("Could not find a built in role definition to test against.");
        }

        await assert.isRejected(client.deleteRoleDefinition(globalScope, builtInDefinition.name));
      });

      it("errors when deleting a non-existent role definition", async function() {
        await assert.isRejected(client.deleteRoleDefinition(globalScope, "foobar"));
      });
    });
  });

  it("listRoleAssignments", async function() {
    const expectedType = "Microsoft.Authorization/roleAssignments";
    let receivedRoles: string[] = [];

    for await (const roleAssignment of client.listRoleAssignments(globalScope)) {
      // Each role assignment will have the shape of:
      //
      //   {
      //     id: '/providers/Microsoft.Authorization/roleAssignments/<ID>',
      //     name: '<ID>',
      //     type: '<role-type>',
      //     // ...
      //   }
      //
      assert.equal(roleAssignment.kind, expectedType);
      receivedRoles.push(roleAssignment.name);
    }

    // Roles might change
    assert.ok(receivedRoles.length);
  });

  it("createRoleAssignment, getRoleAssignment and deleteRoleAssignment", async function() {
    const assignmentName = generateFakeUUID();
    const roleName = "Managed HSM Crypto User";

    let roleDefinition: KeyVaultRoleDefinition | undefined;

    // Find the right role definition to use
    for await (const definition of client.listRoleDefinitions(globalScope)) {
      if (definition.roleName === roleName) {
        roleDefinition = definition;
      }
    }

    if (!roleDefinition) {
      assert.fail(`Unable to find role definition with name ${roleName}`);
    }

    let assignment = await client.createRoleAssignment(
      globalScope,
      assignmentName,
      roleDefinition.id,
      env.CLIENT_OBJECT_ID
    );
    assert.equal(assignment.name, assignmentName);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    assignment = await client.getRoleAssignment(globalScope, assignmentName);
    assert.equal(assignment.name, assignmentName);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    assignment = await client.deleteRoleAssignment(globalScope, assignmentName);
    assert.equal(assignment.name, assignmentName);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    let error: Error;
    try {
      await client.getRoleAssignment(globalScope, generateFakeUUID());
    } catch (e) {
      error = e;
    }
    assert.ok(error!.message.match(/Requested role assignment not found/));
  });
});
