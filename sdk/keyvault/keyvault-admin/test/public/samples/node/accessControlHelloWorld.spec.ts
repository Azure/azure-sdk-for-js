// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses an AccessControlClient to list, create, and assign roles to users.
 */

import type { KeyVaultPermission } from "../../../../src/index.js";
import {
  KeyVaultAccessControlClient,
  KnownKeyVaultDataAction,
  KnownKeyVaultRoleScope,
} from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("accessControlHelloWorld", () => {
  let recorder: Recorder;
  let client: KeyVaultAccessControlClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
        CLIENT_OBJECT_ID: "01ea9a65-813e-4238-8204-bf7328d63fc6",
      },
      removeCentralSanitizers: ["AZSDK3493", "AZSDK3430", "AZSDK3444"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    client = forPublishing(
      new KeyVaultAccessControlClient(
        assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new KeyVaultAccessControlClient(
          process.env["AZURE_MANAGEDHSM_URI"]!,
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("list role assignments", async () => {
    // @snippet ReadmeSampleListRoleAssignments
    for await (const roleAssignment of client.listRoleAssignments("/")) {
      console.log("Role assignment: ", roleAssignment);
    }
    // @snippet-end ReadmeSampleListRoleAssignments
  });

  it("list role definitions", async () => {
    // @snippet ReadmeSampleListRoleDefinitions
    for await (const roleDefinition of client.listRoleDefinitions("/")) {
      console.log("Role definition: ", roleDefinition);
    }
    // @snippet-end ReadmeSampleListRoleDefinitions
  });

  it("get role definition", async () => {
    // @snippet ReadmeSampleGetRoleDefinition
    const { value: firstRoleDefinition } = await client.listRoleDefinitions("/").next();
    const roleDefinition = await client.getRoleDefinition("/", firstRoleDefinition.name);
    console.log(roleDefinition);
    // @snippet-end ReadmeSampleGetRoleDefinition
  });

  it("set role definition", async () => {
    // @snippet ReadmeSampleSetRoleDefinition
    const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
    const roleDefinitionName = forPublishing(
      recorder.variable("setRoleDefName", randomUUID()),
      () => randomUUID(),
    );
    const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
      permissions,
      roleDefinitionName,
      roleName: "Backup Manager",
    });
    console.log(roleDefinition);
    // @snippet-end ReadmeSampleSetRoleDefinition

    await client.deleteRoleDefinition("/", roleDefinition.name);
  });

  it("delete role definition", async () => {
    // @snippet ReadmeSampleDeleteRoleDefinition
    const permissions = [{ dataActions: [KnownKeyVaultDataAction.BackupHsmKeys] }];
    const roleDefinitionName = forPublishing(
      recorder.variable("deleteRoleDefName", randomUUID()),
      () => randomUUID(),
    );
    const roleDefinition = await client.setRoleDefinition(KnownKeyVaultRoleScope.Global, {
      permissions,
      roleDefinitionName,
      roleName: "Backup Manager",
    });
    // @ts-preserve-whitespace
    await client.deleteRoleDefinition("/", roleDefinition.name);
    // @snippet-end ReadmeSampleDeleteRoleDefinition
  });

  it("create role assignment", async () => {
    // @snippet ReadmeSampleCreateRoleAssignment
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    // @ts-preserve-whitespace
    const principalId = forPublishing(
      assertEnvironmentVariable("CLIENT_OBJECT_ID"),
      () => process.env["CLIENT_OBJECT_ID"]!,
    );
    const result = await client.createRoleAssignment(
      "/",
      forPublishing(recorder.variable("createAssignmentName", randomUUID()), () => randomUUID()),
      roleDefinition.id,
      principalId,
    );
    // @snippet-end ReadmeSampleCreateRoleAssignment

    await client.deleteRoleAssignment("/", result.name);
  });

  it("get role assignment", async () => {
    // @snippet ReadmeSampleGetRoleAssignment
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    const principalId = forPublishing(
      assertEnvironmentVariable("CLIENT_OBJECT_ID"),
      () => process.env["CLIENT_OBJECT_ID"]!,
    );
    // @ts-preserve-whitespace
    let roleAssignment = await client.createRoleAssignment(
      "/",
      forPublishing(recorder.variable("getAssignmentName", randomUUID()), () => randomUUID()),
      roleDefinition.id,
      principalId,
    );
    // @ts-preserve-whitespace
    roleAssignment = await client.getRoleAssignment(
      roleAssignment.properties.scope!,
      roleAssignment.name,
    );
    console.log(roleAssignment);
    // @snippet-end ReadmeSampleGetRoleAssignment

    await client.deleteRoleAssignment("/", roleAssignment.name);
  });

  it("delete role assignment", async () => {
    // @snippet ReadmeSampleDeleteRoleAssignment
    const { value: roleDefinition } = await client.listRoleDefinitions("/").next();
    const principalId = forPublishing(
      assertEnvironmentVariable("CLIENT_OBJECT_ID"),
      () => process.env["CLIENT_OBJECT_ID"]!,
    );
    // @ts-preserve-whitespace
    const roleAssignment = await client.createRoleAssignment(
      "/",
      forPublishing(recorder.variable("deleteAssignmentName", randomUUID()), () => randomUUID()),
      roleDefinition.id,
      principalId,
    );
    // @ts-preserve-whitespace
    await client.deleteRoleAssignment(roleAssignment.properties.scope!, roleAssignment.name);
    // @snippet-end ReadmeSampleDeleteRoleAssignment
  });

  it("create and manage role definition (integration)", async () => {
    const globalScope = KnownKeyVaultRoleScope.Global;
    const roleDefinitionName = recorder.variable("roleDefNameInt", randomUUID());
    const permissions: KeyVaultPermission[] = [
      {
        dataActions: [
          KnownKeyVaultDataAction.StartHsmBackup,
          KnownKeyVaultDataAction.StartHsmRestore,
        ],
      },
    ];
    const roleDefinition = await client.setRoleDefinition(globalScope, {
      roleDefinitionName,
      roleName: "Backup Manager",
      permissions,
      description: "Allow backup actions",
    });
    console.log(roleDefinition);

    // Clean up the role definition
    await client.deleteRoleDefinition(globalScope, roleDefinition.name);
  });

  it("create and delete role assignment (integration)", async () => {
    const globalScope = KnownKeyVaultRoleScope.Global;

    // First create a role definition to assign
    const roleDefinitionName = recorder.variable("roleDefAssignInt", randomUUID());
    const permissions: KeyVaultPermission[] = [
      {
        dataActions: [
          KnownKeyVaultDataAction.StartHsmBackup,
          KnownKeyVaultDataAction.StartHsmRestore,
        ],
      },
    ];
    const roleDefinition = await client.setRoleDefinition(globalScope, {
      roleDefinitionName,
      roleName: "Backup Manager",
      permissions,
      description: "Allow backup actions",
    });

    // This sample uses a custom role but you may assign one of the many built-in roles.
    // Please refer to https://learn.microsoft.com/azure/key-vault/managed-hsm/built-in-roles for more information.
    const roleAssignmentName = recorder.variable("roleAssignNameInt", randomUUID());
    const clientObjectId = forPublishing(
      assertEnvironmentVariable("CLIENT_OBJECT_ID"),
      () => process.env["CLIENT_OBJECT_ID"]!,
    );
    let assignment = await client.createRoleAssignment(
      globalScope,
      roleAssignmentName,
      roleDefinition.id,
      clientObjectId,
    );
    console.log(assignment);

    assignment = await client.getRoleAssignment(globalScope, roleAssignmentName);
    console.log(assignment);

    await client.deleteRoleAssignment(globalScope, roleAssignmentName);

    await client.deleteRoleDefinition(globalScope, roleDefinition.name);
  });
});
