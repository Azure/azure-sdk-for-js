// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertEnvironmentVariable, env, type Recorder } from "@azure-tools/test-recorder";
import { getYieldedValue, toSupportTracing } from "@azure-tools/test-utils-vitest";

import {
  type KeyVaultAccessControlClient,
  type KeyVaultPermission,
  type KeyVaultRoleDefinition,
  KnownKeyVaultDataAction,
} from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { KnownKeyVaultRoleScope } from "../../src/index.js";
expect.extend({ toSupportTracing });

describe("KeyVaultAccessControlClient", () => {
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;
  let generateFakeUUID: () => string;
  const globalScope = "/";

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
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

    it("can list role definitions", async () => {
      const expectedType = "Microsoft.Authorization/roleDefinitions";
      const receivedRoles: string[] = [];

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
        expect(roleDefinition.kind).toEqual(expectedType);
        receivedRoles.push(roleDefinition.roleName!);
      }

      // Roles might change
      expect(receivedRoles.length).toBeGreaterThan(0);
    });

    describe("getRoleDefinition", function () {
      it("returns a role definition by name", async () => {
        const anyRoleDefinition = getYieldedValue(
          await client.listRoleDefinitions(globalScope).next(),
        );

        const roleDefinition = await client.getRoleDefinition(globalScope, anyRoleDefinition.name);

        expect(roleDefinition).to.deep.equal(anyRoleDefinition);
      });

      it("errors when the role definition cannot be found", async () => {
        await expect(client.getRoleDefinition(globalScope, "does_not_exist")).rejects.toThrow();
      });
    });

    it("can create, update, and delete a role definition", async () => {
      const name = generateFakeUUID();
      const roleName = "custom role definition name";
      const description = "custom role description";
      let roleDefinition: KeyVaultRoleDefinition = await client.setRoleDefinition(globalScope, {
        roleDefinitionName: name,
        roleName,
        permissions,
        description,
      });

      expect(roleDefinition.name).to.equal(name);
      expect(roleDefinition.description).to.equal(description);
      expect(roleDefinition.permissions).to.deep.equal(permissions);
      expect(roleDefinition.assignableScopes[0]).to.equal(globalScope);
      expect(roleDefinition.kind).to.equal("Microsoft.Authorization/roleDefinitions");
      expect(roleDefinition.roleType).to.equal("CustomRole");

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

      expect(roleDefinition.id).to.equal(id);
      expect(roleDefinition.permissions).to.deep.equal(permissions);

      await client.deleteRoleDefinition(globalScope, roleDefinition.name);

      for await (const definition of client.listRoleDefinitions(globalScope)) {
        if (definition.id === roleDefinition.id) {
          expect.fail(
            "expected to successfully delete custom role definition, but it still exists.",
          );
        }
      }
    });

    describe("setRoleDefinition", function () {
      it("errors when name is not a valid guid", async () => {
        await expect(
          client.setRoleDefinition(globalScope, {
            roleDefinitionName: "foo unique value",
            roleName: "foo role definition name",
            permissions: [],
          }),
        ).rejects.toThrow();
      });

      it("errors when updating a built-in role definition", async () => {
        let builtInDefinition: KeyVaultRoleDefinition | undefined = undefined;

        for await (const definition of client.listRoleDefinitions(globalScope)) {
          if (definition.roleType !== "CustomRole") {
            builtInDefinition = definition;
          }
        }

        if (!builtInDefinition) {
          expect.fail("Could not find a built in role definition to test against.");
        }

        await expect(
          client.setRoleDefinition(globalScope, {
            roleDefinitionName: builtInDefinition.name,
            roleName: builtInDefinition.roleName,
            permissions,
          }),
        ).rejects.toThrow();
      });
    });

    describe("deleteRoleDefinition", function () {
      it("errors when deleting a built-in role definition", async () => {
        let builtInDefinition: KeyVaultRoleDefinition | undefined = undefined;

        for await (const definition of client.listRoleDefinitions(globalScope)) {
          if (definition.roleType !== "CustomRole") {
            builtInDefinition = definition;
          }
        }

        if (!builtInDefinition) {
          expect.fail("Could not find a built in role definition to test against.");
        }

        await expect(
          client.deleteRoleDefinition(globalScope, builtInDefinition.name),
        ).rejects.toThrow();
      });

      it("succeeds when deleting a non-existent role definition", async () => {
        await expect(client.deleteRoleDefinition(globalScope, "foobar")).resolves.not.toThrow();
      });
    });
  });

  describe("role assignments", async function () {
    it("can list role assignments", async () => {
      const expectedType = "Microsoft.Authorization/roleAssignments";
      const receivedRoles: string[] = [];

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
        expect(roleAssignment.kind).toEqual(expectedType);
        receivedRoles.push(roleAssignment.name);
      }

      // Roles might change
      expect(receivedRoles.length).toBeGreaterThan(0);
    });

    it("can create, read, and delete role assignments", async () => {
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
        expect.fail(`Unable to find role definition with name ${roleName}`);
      }

      const assignment = await client.createRoleAssignment(
        globalScope,
        assignmentName,
        roleDefinition.id,
        assertEnvironmentVariable("CLIENT_OBJECT_ID"),
      );
      expect(assignment.name).toEqual(assignmentName);
      expect(assignment.properties?.roleDefinitionId).toEqual(roleDefinition.id);
      expect(assignment.properties?.principalId).toEqual(env.CLIENT_OBJECT_ID);
      expect(assignment.properties.scope).toEqual(globalScope);

      await client.getRoleAssignment(globalScope, assignmentName);
      expect(assignment.name).toEqual(assignmentName);
      expect(assignment.properties?.roleDefinitionId).toEqual(roleDefinition.id);
      expect(assignment.properties?.principalId).toEqual(env.CLIENT_OBJECT_ID);
      expect(assignment.properties.scope).toEqual(globalScope);

      await client.deleteRoleAssignment(globalScope, assignmentName);
      expect(assignment.name).toEqual(assignmentName);
      expect(assignment.properties?.roleDefinitionId).toEqual(roleDefinition.id);
      expect(assignment.properties?.principalId).toEqual(env.CLIENT_OBJECT_ID);

      try {
        await client.getRoleAssignment(globalScope, generateFakeUUID());
        expect.fail("Expected an error to be thrown.");
      } catch (e: any) {
        expect(e.message).toMatch(/Requested role assignment not found/);
      }
    });

    it("succeeds when deleting a role assignment that doesn't exist", async () => {
      await expect(
        client.deleteRoleAssignment(globalScope, generateFakeUUID()),
      ).resolves.not.toThrow();
    });
  });

  describe("tracing", () => {
    it("traces through the various operations", async () => {
      const roleDefinitionName = generateFakeUUID();
      const roleAssignmentName = generateFakeUUID();
      await expect(async (options: any) => {
        const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
          roleDefinitionName,
          roleName: roleDefinitionName,
          ...options,
        });
        await client.getRoleDefinition(KnownKeyVaultRoleScope.Global, roleDefinitionName, options);
        await client.createRoleAssignment(
          globalScope,
          roleAssignmentName,
          roleDefinition.id,
          assertEnvironmentVariable("CLIENT_OBJECT_ID"),
          options,
        );
        await client.getRoleAssignment(KnownKeyVaultRoleScope.Global, roleAssignmentName, options);
        await client.deleteRoleAssignment(
          KnownKeyVaultRoleScope.Global,
          roleDefinitionName,
          options,
        );
        await client.deleteRoleDefinition(
          KnownKeyVaultRoleScope.Global,
          roleDefinitionName,
          options,
        );
      }).toSupportTracing([
        "KeyVaultAccessControlClient.setRoleDefinition",
        "KeyVaultAccessControlClient.getRoleDefinition",
        "KeyVaultAccessControlClient.createRoleAssignment",
        "KeyVaultAccessControlClient.getRoleAssignment",
        "KeyVaultAccessControlClient.deleteRoleAssignment",
        "KeyVaultAccessControlClient.deleteRoleDefinition",
      ]);
    });
  });
});
