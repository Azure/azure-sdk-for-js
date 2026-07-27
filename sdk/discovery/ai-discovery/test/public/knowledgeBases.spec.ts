// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for KnowledgeBases operations (BookshelfClient) — GA surface.
 *
 * Mirrors the Python suite (test_knowledge_bases.py) in the SAME order, because
 * later tests depend on resources seeded by earlier ones. Within a single spec
 * file vitest runs `it` blocks top-to-bottom, which preserves that ordering.
 *
 *   1. createOrUpdate (LRO)   — seeds KNOWLEDGE_BASE_NAME for the read tests
 *   2. list
 *   3. get
 *   4. startIndexing (LRO)
 *   5. search (LRO)           — drives indexing to Succeeded, then searches
 *   6. cancelIndexing (LRO)   — after search, so search never hits a Canceled KB
 *   7. getOperationStatus
 *   8. delete (LRO)           — uses a sacrificial KB, preserves the fixture
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import { isRestError } from "@azure/core-rest-pipeline";
import type { BookshelfClient, KnowledgeBase } from "../../src/index.js";
import {
  captureOperationId,
  createBookshelfClient,
  createRecorder,
  testEnv,
} from "./utils/recordedClient.js";

const terminalStates = new Set(["succeeded", "failed", "canceled"]);

function seedKnowledgeBase(): KnowledgeBase {
  return {
    description: testEnv("KNOWLEDGE_BASE_DESCRIPTION"),
    copilotInstruction: testEnv("KNOWLEDGE_BASE_COPILOT_INSTRUCTION"),
    storageAssetReferences: [
      {
        id: testEnv("STORAGE_ASSET_ID"),
        userAssignedIdentity: testEnv("USER_ASSIGNED_IDENTITY"),
      },
    ],
  } as KnowledgeBase;
}

async function sleep(ms: number): Promise<void> {
  if (isLiveMode()) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

describe("KnowledgeBases operations (BookshelfClient)", () => {
  let recorder: Recorder;
  let client: BookshelfClient;
  const kbName = testEnv("KNOWLEDGE_BASE_NAME");

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createBookshelfClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  /**
   * Start (or reuse) an indexing run and return its operation id. The service
   * permits only one indexing run per KnowledgeBase at a time and rejects a
   * concurrent start with 409 ConcurrencyConflict; when a run is already in
   * progress we reuse it (its id is the KB's lastIndexingRun.runId).
   */
  async function startIndexingOperationId(): Promise<string> {
    const capture = captureOperationId();
    try {
      const poller = client.knowledgeBases.startIndexing(kbName, {
        onResponse: capture.onResponse,
      });
      await poller.submitted();
    } catch (error) {
      const message = isRestError(error) ? `${error.code} ${error.message}` : String(error);
      if (!message.includes("ConcurrencyConflict") && !message.includes("already in progress")) {
        throw error;
      }
      const kb = await client.knowledgeBases.get(kbName);
      const runId = kb.lastIndexingRun?.runId;
      assert.ok(runId, "Indexing already in progress but no lastIndexingRun id is available");
      return runId;
    }
    return capture.operationId();
  }

  it("createOrUpdate upserts a knowledge base (LRO) and returns the resource", async () => {
    const poller = client.knowledgeBases.createOrUpdate(kbName, seedKnowledgeBase());
    const kb = await poller.pollUntilDone();
    assert.isDefined(kb);
    assert.equal(kb.name, kbName);
    assert.isDefined(kb.provisioningState);
  });

  it("list returns knowledge bases with the expected read-visible fields", async () => {
    let count = 0;
    for await (const kb of client.knowledgeBases.list()) {
      count++;
      assert.isDefined(kb.name);
      assert.isAtMost(kb.name.length, 24); // @maxLength(24)
      assert.isDefined(kb.bookshelfName);
      assert.isDefined(kb.provisioningState);
      assert.isDefined(kb.status);
    }
    assert.isAtLeast(count, 1);
  });

  it("get returns a specific knowledge base by name", async () => {
    const kb = await client.knowledgeBases.get(kbName);
    assert.isDefined(kb);
    assert.equal(kb.name, kbName);
    assert.isDefined(kb.bookshelfName);
    assert.isDefined(kb.provisioningState);
    assert.isArray(kb.storageAssetReferences);
  });

  it("startIndexing kicks off an indexing LRO and yields an operation id", async () => {
    const operationId = await startIndexingOperationId();
    assert.ok(operationId);
  });

  it("search drives indexing to Succeeded then runs a search LRO to completion", async () => {
    const overallDeadline = Date.now() + 2400_000; // 40 minutes across retries
    let opStatus: string | undefined;
    let attempts = 0;

    while (Date.now() < overallDeadline && attempts < 3) {
      attempts++;
      const operationId = await startIndexingOperationId();
      while (Date.now() < overallDeadline) {
        const op = await client.knowledgeBases.getOperationStatus(kbName, operationId);
        opStatus = String(op.status).toLowerCase();
        if (terminalStates.has(opStatus)) {
          break;
        }
        await sleep(10_000);
      }
      if (opStatus === "succeeded") {
        break;
      }
      await sleep(10_000);
    }

    assert.equal(opStatus, "succeeded", `indexing did not reach Succeeded (last: ${opStatus})`);

    // The KB needs an extra window to become search-ready (KB.status Succeeded).
    const readyDeadline = Date.now() + 600_000;
    while (Date.now() < readyDeadline) {
      const kb = await client.knowledgeBases.get(kbName);
      if (String(kb.status).toLowerCase() === "succeeded") {
        break;
      }
      await sleep(15_000);
    }

    // Search, retrying while the KB is still becoming ready.
    let searched = false;
    while (Date.now() < readyDeadline) {
      try {
        const poller = client.knowledgeBases.search(kbName, {
          query: "What are common drug interactions?",
        });
        await poller.pollUntilDone();
        assert.equal(poller.operationState?.status, "succeeded");
        searched = true;
        break;
      } catch (error) {
        const message = isRestError(error) ? error.message : String(error);
        if (message.includes("KnowledgeBaseNotReady")) {
          await sleep(15_000);
          continue;
        }
        throw error;
      }
    }
    assert.ok(searched, "KnowledgeBase did not become search-ready within the deadline");
  }, 2400_000);

  it("cancelIndexing cancels an in-flight indexing run", async () => {
    await startIndexingOperationId();
    const cancelPoller = client.knowledgeBases.cancelIndexing(kbName);
    await cancelPoller.submitted();
    assert.isDefined(cancelPoller);
  });

  it("getOperationStatus returns status for a knowledge-base LRO", async () => {
    const operationId = await startIndexingOperationId();
    const status = await client.knowledgeBases.getOperationStatus(kbName, operationId);
    assert.isDefined(status);
    assert.isDefined(status.id);
    assert.isDefined(status.status);

    // Cleanup: cancel the indexing run we started.
    const cancelPoller = client.knowledgeBases.cancelIndexing(kbName);
    await cancelPoller.submitted();
  });

  it("delete removes a sacrificial knowledge base (LRO)", async () => {
    const sacrificialName = "sdk-test-delete-kb";

    // Create the KB we will delete (delete requires a terminal provisioningState).
    await client.knowledgeBases
      .createOrUpdate(sacrificialName, {
        description: "Sacrificial KB for delete test",
        copilotInstruction: testEnv("KNOWLEDGE_BASE_COPILOT_INSTRUCTION"),
        storageAssetReferences: [
          {
            id: testEnv("STORAGE_ASSET_ID"),
            userAssignedIdentity: testEnv("USER_ASSIGNED_IDENTITY"),
          },
        ],
      } as KnowledgeBase)
      .pollUntilDone();

    const poller = client.knowledgeBases.delete(sacrificialName);
    await poller.pollUntilDone();
    assert.equal(poller.operationState?.status, "succeeded");

    // The resource must no longer be retrievable.
    let notFound = false;
    try {
      await client.knowledgeBases.get(sacrificialName);
    } catch (error) {
      notFound = isRestError(error) && error.statusCode === 404;
    }
    assert.ok(notFound, "expected the deleted knowledge base to return 404");
  }, 2400_000);
});
