// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates typed server-sent event iteration for knowledge
 * retrieval. The sample consumes one connection with `for await`, correlates
 * activity IDs, accepts 200/206 completion, handles terminal errors and
 * cancellation, and distinguishes JSON preflight errors from stream events.
 * Heartbeats and unknown transport events are ignored by the typed iterator;
 * the service does not emit token-delta events through this API.
 *
 * Set `ENDPOINT` and `KNOWLEDGE_BASE_NAME` to an existing knowledge base.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  isRestError,
  KnowledgeRetrievalClient,
  KnownKnowledgeBaseRetrievalStatusCode,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const knowledgeBaseName = process.env.KNOWLEDGE_BASE_NAME || "";

function assertSample(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function consumeStream(client: KnowledgeRetrievalClient): Promise<void> {
  const activities = new Map<number, string>();
  let requestId: string | undefined;
  let terminal = false;

  // One call creates one SSE connection. Heartbeats are handled internally and
  // do not appear in the typed event union.
  const events = await client.retrieveStream({
    intents: [{ type: "semantic", search: "Summarize the indexed information." }],
    includeActivity: true,
    retrievalReasoningEffort: { kind: "auto" },
  });

  for await (const event of events) {
    switch (event.event) {
      case "retrieval.started":
        requestId = event.data.requestId;
        console.log(
          `Retrieval ${requestId} started with ${event.data.reasoningEffort.kind} effort`,
        );
        break;
      case "activity.started":
        activities.set(event.data.id, event.data.type);
        break;
      case "activity.completed":
        assertSample(
          activities.has(event.data.id),
          `activity.completed ${event.data.id} must have a matching activity.started event`,
        );
        activities.delete(event.data.id);
        console.log(`Activity ${event.data.id} completed in ${event.data.elapsedInMs ?? 0} ms`);
        break;
      case "answer.completed":
        console.log(`Answer message ${event.data.messageIndex} completed`);
        break;
      case "references.completed":
        console.log(`Received ${event.data.length} references`);
        break;
      case "error":
        throw new Error(event.data.error.message ?? "The retrieval stream failed");
      case "response.completed":
        assertSample(
          event.data.statusCode === KnownKnowledgeBaseRetrievalStatusCode.OK ||
            event.data.statusCode === KnownKnowledgeBaseRetrievalStatusCode.PartialContent,
          `unexpected completion status ${event.data.statusCode}`,
        );
        terminal = true;
        console.log(
          `Retrieval ${requestId ?? "<unknown>"} completed with ${event.data.statusCode}`,
        );
        break;
    }
  }

  assertSample(terminal, "the stream should end with response.completed or error");
  assertSample(activities.size === 0, "all started activities should complete");
}

async function demonstrateCancellation(client: KnowledgeRetrievalClient): Promise<void> {
  const controller = new AbortController();
  const events = await client.retrieveStream(
    { intents: [{ type: "semantic", search: "Start a cancellable retrieval." }] },
    { abortSignal: controller.signal },
  );

  try {
    for await (const event of events) {
      if (event.event === "retrieval.started") {
        controller.abort();
      }
    }
  } catch (error) {
    if (!controller.signal.aborted) {
      throw error;
    }
    console.log("Retrieval stream cancelled after retrieval.started");
  }
}

async function demonstratePreflightError(credential: DefaultAzureCredential): Promise<void> {
  const invalidClient = new KnowledgeRetrievalClient(
    endpoint,
    "missing-knowledge-base",
    credential,
  );
  try {
    await invalidClient.retrieveStream({
      intents: [{ type: "semantic", search: "This request should fail before SSE starts." }],
    });
    throw new Error("Expected the missing knowledge base request to fail");
  } catch (error) {
    if (!isRestError(error)) {
      throw error;
    }
    console.log(`Preflight JSON error received with status ${error.statusCode}`);
  }
}

async function main(): Promise<void> {
  if (!endpoint || !knowledgeBaseName) {
    console.log("Set ENDPOINT and KNOWLEDGE_BASE_NAME before running this sample.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new KnowledgeRetrievalClient(endpoint, knowledgeBaseName, credential);
  await consumeStream(client);
  await demonstrateCancellation(client);
  await demonstratePreflightError(credential);
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
});
