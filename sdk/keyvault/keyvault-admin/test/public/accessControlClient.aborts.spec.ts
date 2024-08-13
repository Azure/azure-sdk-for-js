// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";

import { KeyVaultAccessControlClient } from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { AbortError } from "@azure/abort-controller";

describe("Aborting KeyVaultAccessControlClient's requests", () => {
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

  // The tests follow

  it("can abort listRoleDefinitions", async function () {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.listRoleDefinitions("/", { abortSignal: controller.signal }).next(),
    ).rejects.toThrow(AbortError);
  });

  it("can abort listRoleAssignments", async function () {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client
        .listRoleAssignments("/", {
          abortSignal: controller.signal,
        })
        .next(),
    ).rejects.toThrow(AbortError);
  });

  it("can abort createRoleAssignment", async function () {
    const roleDefinitionId = generateFakeUUID();
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.createRoleAssignment(
        globalScope,
        name,
        roleDefinitionId,
        assertEnvironmentVariable("CLIENT_OBJECT_ID"),
        {
          abortSignal: controller.signal,
        },
      ),
    ).rejects.toThrow(AbortError);
  });

  it("can abort getRoleAssignment", async function () {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.getRoleAssignment(globalScope, name, {
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(AbortError);
  });

  it("can abort deleteRoleAssignment", async function () {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.deleteRoleAssignment(globalScope, name, {
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(AbortError);
  });
});
