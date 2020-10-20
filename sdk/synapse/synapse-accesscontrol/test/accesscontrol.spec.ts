// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AccessControlClient } from "../src/AccessControlClient";
import { assert } from "chai";
import { authenticate } from "./utils/testAuthentication";
import { Recorder } from "@azure/test-utils-recorder";
import { getRollId, getPrincipalId } from "./utils/utils.common";

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
    for await (const roleDefinition of client.listRoleDefinitions()) {
      list.push(roleDefinition.id!);
    }
    assert.include(
      list,
      roleId,
      "Failed to fetch expected role definitions by listRoleDefinitions."
    );
  });

  it("successfully create role assignment", async function() {
    let createResult = await client.createRoleAssignment(roleId, principalId);
    assert.equal(
      createResult.roleId,
      roleId,
      "Failed to create expected role assignment by createRoleAssignment."
    );
    assert.isNotNull(
      createResult.id,
      "Failed to create expected role assignment by createRoleAssignment."
    );
    roleAssignmentId = createResult.id as string;
  });

  it("successfully get role assignment", async function() {
    let getResult = await client.getRoleAssignmentById(roleAssignmentId);
    assert.equal(
      getResult.roleId,
      roleId,
      "Failed to get expected role assignment by getRoleAssignmentById."
    );
  });

  it("successfully list role assignment", async function() {
    let listResult = await client.listRoleAssignments(roleId);
    const list: string[] = [];
    for (const roleAssignment of listResult) {
      list.push(roleAssignment.id!);
    }
    assert.include(
      list,
      roleAssignmentId,
      "Failed to fetch expected role assignments by listRoleDefinitions."
    );
  });

  it("successfully list caller's role assignment", async function() {
    let listResult = await client.getCallerRoleAssignments();
    const list: string[] = [];
    for (const roleAssignment of listResult) {
      list.push(roleAssignment);
    }
    assert.include(
      list,
      getRollId(),
      "Failed to fetch expected role definition by getCallerRoleAssignments."
    );
  });

  it("successfully delete role assignment", async function() {
    await client.deleteRoleAssignmentById(roleAssignmentId);
  });
});
