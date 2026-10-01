// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BatchRequest,
  DocumentFilter,
  Glossary,
  SourceInput,
  StorageInputType,
  TargetInput,
  TranslationStatus,
  TranslationStorageSource,
} from "../../../src/index.js";
import type { OperationState, PollerLike } from "@azure/core-lro";
import { isLiveMode } from "../../utils/injectables.js";

export function createSourceInput(
  sourceUrl: string,
  language?: string,
  storageSource?: TranslationStorageSource,
  filter?: DocumentFilter,
): SourceInput {
  return {
    sourceUrl,
    language,
    storageSource,
    filter,
  };
}

export function createTargetInput(
  targetUrl: string,
  language: string,
  storageSource?: TranslationStorageSource,
  glossaries?: Glossary[],
  category?: string,
): TargetInput {
  return {
    targetUrl,
    language,
    storageSource,
    glossaries,
    category,
  };
}

export function createBatchRequest(
  source: SourceInput,
  targets: Array<TargetInput>,
  storageType?: StorageInputType,
): BatchRequest {
  return {
    source,
    targets,
    storageType,
  };
}

export function getTranslationOperationID(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    return typeof lastSegment === "string" ? lastSegment : "";
  } catch (error) {
    console.error("Invalid Operation-location URL:", error);
    return "";
  }
}

/**
 * Extracts the translation operation id from a running poller.
 *
 * The modular client does not surface the raw `operation-location` response
 * header directly. Instead, the poller's serialized state carries the
 * operation location under `state.config.operationLocation`. This helper waits
 * for the initial request to be submitted, then reads the operation id from the
 * serialized poller state so that callers can inspect / cancel a translation
 * before it has reached a terminal state.
 */
export async function getTranslationIdFromPoller(
  poller: PollerLike<OperationState<TranslationStatus>, TranslationStatus>,
): Promise<string> {
  await poller.submitted();
  let operationLocation = "";
  try {
    const serializedState = await poller.serialize();
    const parsed = JSON.parse(serializedState);
    operationLocation = parsed?.state?.config?.operationLocation ?? "";
  } catch (error) {
    console.error("Failed to read operation location from poller state:", error);
  }
  return getTranslationOperationID(operationLocation);
}

/**
 * Reads a Node.js readable stream (for example the body returned by the single
 * document translate operation) into a string.
 */
export async function streamToString(stream: NodeJS.ReadableStream | undefined): Promise<string> {
  if (!stream) {
    return "";
  }
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : (chunk as Buffer));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, isLiveMode() ? ms : 1));
}
