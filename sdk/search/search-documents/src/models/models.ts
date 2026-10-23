// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type {
  KnowledgeBaseRetrievalStartedStreamEvent,
  KnowledgeBaseActivityStartedStreamEvent,
  KnowledgeBaseActivityCompletedStreamEvent,
  KnowledgeBaseAnswerCompletedStreamEvent,
  KnowledgeBaseReferencesCompletedStreamEvent,
  KnowledgeBaseErrorStreamEvent,
  KnowledgeBaseResponseCompletedStreamEvent,
} from "./azure/search/documents/knowledgeBases/models.js";
import type { NodeReadableStream } from "@azure/core-rest-pipeline";

/** Enum describing allowed operation states. */
export enum KnownOperationState {
  /** The operation has not started. */
  NotStarted = "NotStarted",
  /** The operation is in progress. */
  Running = "Running",
  /** The operation has completed successfully. */
  Succeeded = "Succeeded",
  /** The operation has failed. */
  Failed = "Failed",
  /** The operation has been canceled by the user. */
  Canceled = "Canceled",
}

/**
 * Enum describing allowed operation states. \
 * {@link KnownOperationState} can be used interchangeably with OperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The operation has not started. \
 * **Running**: The operation is in progress. \
 * **Succeeded**: The operation has completed successfully. \
 * **Failed**: The operation has failed. \
 * **Canceled**: The operation has been canceled by the user.
 */
export type OperationState = string;

/**
 * The set of server-sent events emitted while streaming a knowledge base retrieval, added in
 * version 2026-08-01-preview. Each event's `data:` payload is JSON-encoded using the type
 * associated with its event name below. The stream ends after the terminal `response.completed`
 * event (or an `error` event, if the retrieval fails before completing).
 */
export type KnowledgeBaseRetrievalStreamEvents =
  | KnowledgeBaseRetrievalStartedStreamEvent
  | KnowledgeBaseActivityStartedStreamEvent
  | KnowledgeBaseActivityCompletedStreamEvent
  | KnowledgeBaseAnswerCompletedStreamEvent
  | KnowledgeBaseReferencesCompletedStreamEvent
  | KnowledgeBaseErrorStreamEvent
  | KnowledgeBaseResponseCompletedStreamEvent;

export function knowledgeBaseRetrievalStreamEventsDeserializer(
  item: any,
): KnowledgeBaseRetrievalStreamEvents {
  return item;
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
  /** The 2026-08-01-preview API version. */
  V20260801Preview = "2026-08-01-preview",
  /** The 2026-10-01 API version. */
  V20261001 = "2026-10-01",
  /** The 2026-11-01-preview API version. */
  V20261101Preview = "2026-11-01-preview",
}

/** Platform-specific raw response returned by the protocol streaming retrieval operation. */
export type RetrieveStreamResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
