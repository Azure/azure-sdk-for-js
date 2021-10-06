// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

import { KeyVaultAccessControlClient } from "../../src";
import { assertThrowsAbortError } from "../utils/common";
import { authenticate } from "../utils/authentication";

describe("Aborting KeyVaultAccessControlClient's requests", () => {
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

  it("can abort listRoleDefinitions", async function() {
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client
        .listRoleDefinitions("/", {
          abortSignal: controller.signal
        })
        .next();
    });
  });

  it("can abort listRoleAssignments", async function() {
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client
        .listRoleAssignments("/", {
          abortSignal: controller.signal
        })
        .next();
    });
  });

  it("can abort createRoleAssignment", async function() {
    const roleDefinitionId = generateFakeUUID();
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.createRoleAssignment(globalScope, name, roleDefinitionId, env.CLIENT_OBJECT_ID, {
        abortSignal: controller.signal
      });
    });
  });

  it("can abort getRoleAssignment", async function() {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.getRoleAssignment(globalScope, name, {
        abortSignal: controller.signal
      });
    });
  });

  it("can abort deleteRoleAssignment", async function() {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.deleteRoleAssignment(globalScope, name, {
        abortSignal: controller.signal
      });
    });
  });
});
