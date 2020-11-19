// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AccessControlClient } from "../src/AccessControlClient";
import { assert } from "chai";
import { authenticate } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";
import { getRollId, getPrincipalId, getScope } from "./utils/utils.common";
import { Guid } from "guid-typescript";

describe("AccessControl Client - get role definition", () => {
  let client: AccessControlClient;
  let recorder: Recorder;
  let roleAssignmentId: string;
  let roleId: string;
  let principalId: string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
    roleId = getRollId();
    principalId = getPrincipalId();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully get role definition by id", async function() {
    let getResult = await client.getRoleDefinitionById(roleId);
    assert.equal(
      getResult.name,
      "Sql Admin",
      "Unexpected name of role definition by getRoleDefinitionById."
    );
  });

  it("successfully list role definitions", async function() {
    const list: string[] = [];
    let listResult = await client.listRoleDefinitions();
    for (const roleDefinition of listResult) {
      list.push(roleDefinition.id!);
    }
    assert.include(
      list,
      roleId,
      "Failed to fetch expected role definitions by listRoleDefinitions."
    );
  });

  it("successfully create role assignment", async function() {
    roleAssignmentId = Guid.create().toString();
    let createResult = await client.createRoleAssignment(
      roleAssignmentId,
      roleId,
      principalId,
      getScope()
    );
    assert.equal(
      createResult.id,
      roleAssignmentId,
      "Failed to create expected role assignment by createRoleAssignment."
    );
  });

  it("successfully get role assignment", async function() {
    let getResult = await client.getRoleAssignmentById(roleAssignmentId);
    assert.equal(
      getResult.roleDefinitionId,
      roleId,
      "Failed to get expected role assignment by getRoleAssignmentById."
    );
  });

  it("successfully list role assignment", async function() {
    let listResult = await client.listRoleAssignments({ roleId });
    const list: string[] = [];
    for (const roleAssignment of listResult.value!) {
      list.push(roleAssignment.id!);
    }
    assert.include(
      list,
      roleAssignmentId,
      "Failed to fetch expected role assignments by listRoleDefinitions."
    );
  });

  it("successfully check principal access", async function() {
    let listResult = await client.checkPrincipalAccess(
      {
        principalId: principalId
      },
      [
        {
          id: "Microsoft.Synapse/workspaces/read",
          isDataAction: true
        }
      ],
      getScope()
    );
    assert.equal(
      listResult.accessDecisions![0].accessDecision,
      "Allowed",
      "Failed to fetch expected access decision by checkPrincipalAccess."
    );
  });

  it("successfully delete role assignment", async function() {
    await client.deleteRoleAssignmentById(roleAssignmentId, { scope: getScope() });
  });
});
