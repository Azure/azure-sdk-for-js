// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { env, Recorder } from "@azure/test-utils-recorder";

import { KeyVaultAccessControlClient } from "../../src";
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

  // The tests follow

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
      assert.equal(roleDefinition.type, expectedType);
      receivedRoles.push(roleDefinition.roleName!);
    }

    // Roles might change
    assert.ok(receivedRoles.length);
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
      assert.equal(roleAssignment.type, expectedType);
      receivedRoles.push(roleAssignment.name);
    }

    // Roles might change
    assert.ok(receivedRoles.length);
  });

  it.skip("createRoleAssignment, getRoleAssignment and deleteRoleAssignment", async function() {
    // First, deleting any existing assignment, just in case.
    for await (const roleAssignment of client.listRoleAssignments(globalScope)) {
      // Removing all roles from this object ID might kick us out of the system.
      // IMPORTANT: Make sure CLIENT_OBJECT_ID isn't the Object ID of the principal used to authenticate.
      if (roleAssignment.properties.principalId === env.CLIENT_OBJECT_ID) {
        await client.deleteRoleAssignment(globalScope, roleAssignment.name);
      }
    }

    const name = generateFakeUUID();
    const roleDefinition = (await client.listRoleDefinitions(globalScope).next()).value;

    let assignment = await client.createRoleAssignment(
      globalScope,
      name,
      roleDefinition.id!,
      env.CLIENT_OBJECT_ID
    );
    assert.equal(assignment.name, name);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    assignment = await client.getRoleAssignment(globalScope, name);
    assert.equal(assignment.name, name);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    assignment = await client.deleteRoleAssignment(globalScope, name);
    assert.equal(assignment.name, name);
    assert.equal(assignment.properties?.roleDefinitionId, roleDefinition.id);
    assert.equal(assignment.properties?.principalId, env.CLIENT_OBJECT_ID);

    let error: Error;
    try {
      await client.getRoleAssignment(globalScope, name);
    } catch (e) {
      error = e;
    }
    assert.ok(error!.message.match(/Requested role assignment not found/));
  });
});
