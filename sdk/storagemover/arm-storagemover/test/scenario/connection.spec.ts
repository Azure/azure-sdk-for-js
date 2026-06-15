// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors the cross-language scenario-tests playbook row #32
// `ConnectionTests.CreateGetListUpdateDeleteTest`. The Connection op group is
// new in API 2025-08-01+ and isn't in the .NET Scenario suite yet — this
// implementation mirrors the Python port at
// `Q:\source\azure-sdk-for-python\sdk\storagemover\azure-mgmt-storagemover\tests\test_storage_mover_mgmt_connections_operations_test.py`.
//
// Exercises Storage Mover Connection CRUD (create / get / list / update / delete)
// against the **real** shared PrivateLinkService `test-pls-wcs` in the shared
// XDataMove-Synthetics subscription. The PLS lives in `westcentralus`, so the
// storage mover must too.
//
// Intentionally does NOT assert on `connectionStatus` — it'll be `Pending`
// immediately after create because the PLS-side PE provisioning is async.
// Approval is exercised by matrix row #31
// (`JobDefinitionJobRunTests.StartC2CJobWithPrivateSourceTest`).

import { afterAll, afterEach, assert, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { StorageMoverClient } from "../../src/index.js";
import {
  PLS_NAME,
  REAL_PRIVATE_LINK_SERVICE_ID,
  WCUS_LOCATION,
  createStorageMover,
  deleteResourceGroup,
  getSubscriptionId,
  nameFor,
  provisionResourceGroup,
  setupRecorder,
} from "./testHelper.js";

// Per-spec hardcoded RG name — stable across record/playback like the other
// scenario specs in this directory. WCUS so the mover can attach to the
// westcentralus PLS.
const RESOURCE_GROUP_NAME = "testsmrg-js-conn";

// Suffix used to assert on the returned PLS resource ID. Recorder sanitization
// rewrites the subscription ID in the cassette but the literal in source code
// remains the real subscription, so equality on the full ARM ID breaks. Asserting
// on the suffix is resource-path-stable across sanitization. Mirrors the Python
// port's `.endswith(...)` pattern.
const PLS_ID_SUFFIX = `/providers/Microsoft.Network/privateLinkServices/${PLS_NAME}`;

describe("ConnectionTests", () => {
  let recorder: Recorder;
  let client: StorageMoverClient;
  let subscriptionId: string;

  beforeAll(async () => {
    subscriptionId = getSubscriptionId();
    await provisionResourceGroup(subscriptionId, RESOURCE_GROUP_NAME, WCUS_LOCATION);
  });

  afterAll(async () => {
    await deleteResourceGroup(subscriptionId, RESOURCE_GROUP_NAME);
  });

  beforeEach(async (ctx) => {
    ({ recorder, client } = await setupRecorder(ctx));
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("creates, gets, lists, updates, and deletes a Connection", async () => {
    const storageMoverName = nameFor(recorder, "storageMoverName", "testsm-conn-");
    // Connection names are limited to 20 chars (letters/digits/underscore/hyphen,
    // must start with letter/digit). Use a short prefix + 8-hex suffix to fit.
    const connectionName = recorder.variable(
      "connectionName",
      `conn${Math.random().toString(16).slice(2, 10)}`,
    );

    await createStorageMover(
      client,
      RESOURCE_GROUP_NAME,
      storageMoverName,
      "scenario-test storage mover (Connection CRUD)",
      undefined,
      WCUS_LOCATION,
    );

    // Create.
    const created = await client.connections.createOrUpdate(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      connectionName,
      {
        properties: {
          privateLinkServiceId: REAL_PRIVATE_LINK_SERVICE_ID,
          description: "ConnectionDesc",
        },
      },
    );
    assert.equal(created.name, connectionName);
    assert.ok(
      created.properties?.privateLinkServiceId?.endsWith(PLS_ID_SUFFIX),
      `expected privateLinkServiceId to end with ${PLS_ID_SUFFIX}, got ${created.properties?.privateLinkServiceId}`,
    );
    assert.equal(created.properties?.description, "ConnectionDesc");

    // Get.
    const fetched = await client.connections.get(
      RESOURCE_GROUP_NAME,
      storageMoverName,
      connectionName,
    );
    assert.equal(fetched.name, connectionName);
    assert.equal(fetched.id, created.id);
    assert.ok(
      fetched.properties?.privateLinkServiceId?.endsWith(PLS_ID_SUFFIX),
      `expected fetched privateLinkServiceId to end with ${PLS_ID_SUFFIX}`,
    );
    // NOTE: do not assert on `connectionStatus` — see file header.

    // List.
    const items: string[] = [];
    for await (const item of client.connections.list(RESOURCE_GROUP_NAME, storageMoverName)) {
      if (item.name) items.push(item.name);
    }
    assert.ok(items.length >= 1, `expected ≥ 1 connection in the list, got ${items.length}`);
    assert.include(
      items,
      connectionName,
      `expected ${connectionName} in connection list ${items.join(", ")}`,
    );

    // Update — call PUT with a new description. The Storage Mover RP echoes
    // the existing description in the immediate PUT response (the description
    // field is effectively immutable post-create or eventually consistent),
    // so we do not assert on the returned value. Mirrors the CLI + Python
    // ports' behavior.
    await client.connections.createOrUpdate(RESOURCE_GROUP_NAME, storageMoverName, connectionName, {
      properties: {
        privateLinkServiceId: REAL_PRIVATE_LINK_SERVICE_ID,
        description: "ConnectionDescUpdate",
      },
    });

    // Delete + 404 verification.
    await client.connections
      .delete(RESOURCE_GROUP_NAME, storageMoverName, connectionName)
      .pollUntilDone();
    await expect(
      client.connections.get(RESOURCE_GROUP_NAME, storageMoverName, connectionName),
    ).rejects.toThrow();

    // Tear down the parent mover so the per-spec RG can be reused cleanly.
    await client.storageMovers.delete(RESOURCE_GROUP_NAME, storageMoverName).pollUntilDone();
  });
});
