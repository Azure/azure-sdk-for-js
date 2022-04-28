// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { env, Recorder } from "@azure-tools/test-recorder";
import { getYieldedValue } from "@azure/test-utils";

import {
  KeyVaultAccessControlClient,
  KeyVaultPermission,
  KeyVaultRoleDefinition,
  KnownKeyVaultDataAction,
} from "../../src";
import { authenticate } from "./utils/authentication";
import { getServiceVersion } from "./utils/common";
import { KnownRoleScope } from "../../src/generated";

describe("KeyVaultAccessControlClient", () => {
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;
  let generateFakeUUID: () => string;
  const globalScope = "/";

  beforeEach(async function () {
    const authentication = await authenticate(this, getServiceVersion());
    client = authentication.accessControlClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("role definitions", function () {
    const permissions: KeyVaultPermission[] = [
      {
        actions: [],
        dataActions: [
          KnownKeyVaultDataAction.StartHsmBackup,
          KnownKeyVaultDataAction.ReadHsmBackupStatus,
        ],
        notActions: [],
        notDataActions: [],
      },
    ];

    it("can list role definitions", async function () {
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

    describe("getRoleDefinition", function () {
      it("returns a role definition by name", async function () {
        const anyRoleDefinition = getYieldedValue(
          await client.listRoleDefinitions(globalScope).next()
        );

        const roleDefinition = await client.getRoleDefinition(globalScope, anyRoleDefinition.name);

        assert.deepEqual(roleDefinition, anyRoleDefinition);
      });

      it("errors when the role definition cannot be found", async function () {
        await assert.isRejected(client.getRoleDefinition(globalScope, "does_not_exist"));
      });
    });

    it("can create, update, and delete a role definition", async function () {
      const name = generateFakeUUID();
      const roleName = "custom role definition name";
      const description = "custom role description";
      let roleDefinition: KeyVaultRoleDefinition = await client.setRoleDefinition(globalScope, {
        roleDefinitionName: name,
        roleName,
        permissions,
        description,
      });

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
        notDataActions: [KnownKeyVaultDataAction.EncryptHsmKey],
      });

      roleDefinition = await client.setRoleDefinition(globalScope, {
        roleDefinitionName: name,
        roleName,
        permissions,
        description,
      });

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

    describe("setRoleDefinition", function () {
      it("errors when name is not a valid guid", async function () {
        await assert.isRejected(
          client.setRoleDefinition(globalScope, {
            roleDefinitionName: "foo unique value",
            roleName: "foo role definition name",
            permissions: [],
          })
        );
      });

      it("errors when updating a built-in role definition", async function () {
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
          client.setRoleDefinition(globalScope, {
            roleDefinitionName: builtInDefinition.name,
            roleName: builtInDefinition.roleName,
            permissions,
          })
        );
      });
    });

    describe("deleteRoleDefinition", function () {
      it("errors when deleting a built-in role definition", async function () {
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

      it("succeeds when deleting a non-existent role definition", async function () {
        await assert.isFulfilled(client.deleteRoleDefinition(globalScope, "foobar"));
      });
    });
  });

  describe("role assignments", async function () {
    it("can list role assignments", async function () {
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

    it("can create, read, and delete role assignments", async function () {
      const assignmentName = generateFakeUUID();
      const roleName = "Managed HSM Crypto Auditor";

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
      assert.equal(assignment.properties.scope, globalScope);

      await client.getRoleAssignment(globalScope, assignmentName);
      assert.equal(assignment.name, assignmentName);
      assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
      assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);
      assert.equal(assignment.properties.scope, globalScope);

      await client.deleteRoleAssignment(globalScope, assignmentName);
      assert.equal(assignment.name, assignmentName);
      assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
      assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

      let error: Error;
      try {
        await client.getRoleAssignment(globalScope, generateFakeUUID());
      } catch (e: any) {
        error = e;
      }
      assert.ok(error!.message.match(/Requested role assignment not found/));
    });

    it("succeeds when deleting a role assignment that doesn't exist", async () => {
      await assert.isFulfilled(client.deleteRoleAssignment(globalScope, generateFakeUUID()));
    });
  });

  describe("tracing", () => {
    it("traces through the various operations", async () => {
      const roleDefinitionName = generateFakeUUID();
      const roleAssignmentName = generateFakeUUID();
      await assert.supportsTracing(
        async (options) => {
          const roleDefinition = await client.setRoleDefinition(KnownRoleScope.Global, {
            roleDefinitionName,
            roleName: roleDefinitionName,
            ...options,
          });
          await client.getRoleDefinition(KnownRoleScope.Global, roleDefinitionName, options);
          await client.createRoleAssignment(
            globalScope,
            roleAssignmentName,
            roleDefinition.id,
            env.CLIENT_OBJECT_ID,
            options
          );
          await client.getRoleAssignment(KnownRoleScope.Global, roleAssignmentName, options);
          await client.listRoleAssignments(KnownRoleScope.Global, options).next();
          await client.listRoleDefinitions(KnownRoleScope.Global, options).next();
          await client.deleteRoleAssignment(KnownRoleScope.Global, roleDefinitionName, options);
          await client.deleteRoleDefinition(KnownRoleScope.Global, roleDefinitionName, options);
        },
        [
          "KeyVaultAccessControlClient.setRoleDefinition",
          "KeyVaultAccessControlClient.getRoleDefinition",
          "KeyVaultAccessControlClient.createRoleAssignment",
          "KeyVaultAccessControlClient.getRoleAssignment",
          "KeyVaultAccessControlClient.listRoleAssignmentsPage",
          "KeyVaultAccessControlClient.listRoleDefinitionsPage",
          "KeyVaultAccessControlClient.deleteRoleAssignment",
          "KeyVaultAccessControlClient.deleteRoleDefinition",
        ]
      );
    });
  });
});
