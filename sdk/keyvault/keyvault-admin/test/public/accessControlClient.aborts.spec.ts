// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertEnvironmentVariable, type Recorder } from "@azure-tools/test-recorder";
import type { KeyVaultAccessControlClient } from "@azure/keyvault-admin";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

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

  it("can abort listRoleDefinitions", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.listRoleDefinitions("/", { abortSignal: controller.signal }).next(),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort listRoleAssignments", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client
        .listRoleAssignments("/", {
          abortSignal: controller.signal,
        })
        .next(),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort createRoleAssignment", async () => {
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
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort getRoleAssignment", async () => {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.getRoleAssignment(globalScope, name, {
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort deleteRoleAssignment", async () => {
    const name = generateFakeUUID();

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.deleteRoleAssignment(globalScope, name, {
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });
});
