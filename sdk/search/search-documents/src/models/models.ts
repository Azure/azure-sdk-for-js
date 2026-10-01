// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  searchIndexResponseArrayDeserializer,
  SearchIndexResponse,
} from "./azure/search/documents/indexes/models.js";
import {
  KnowledgeBaseActivityRecordUnion,
  KnowledgeBaseReferenceUnion,
  KnowledgeBaseRetrievalStartedEvent,
  KnowledgeBaseActivityStartedEvent,
  KnowledgeBaseAnswerCompletedEvent,
  KnowledgeBaseStreamErrorEvent,
  KnowledgeBaseResponseCompletedEvent,
} from "./azure/search/documents/knowledgeBases/models.js";
import { NodeReadableStream } from "@azure/core-rest-pipeline";

/** Response from a List Indexes request. If successful, it includes the full definitions of all indexes. */
export interface _ListIndexesSelectedResult {
  /** The total count of indexes in the service, or null if the count was not requested. */
  readonly count?: number;
  /** The indexes in the Search service. */
  readonly value: SearchIndexResponse[];
  /** The URL that can be used to fetch the next set of results. */
  readonly nextLink?: string;
}

export function _listIndexesSelectedResultDeserializer(item: any): _ListIndexesSelectedResult {
  return {
    count: item["@odata.count"],
    value: searchIndexResponseArrayDeserializer(item["value"]),
    nextLink: item["@odata.nextLink"],
  };
}

/**
 * The set of server-sent events emitted while streaming a knowledge base retrieval, added in
 * version 2026-08-01-preview. Each event's `data:` payload is JSON-encoded using the type
 * associated with its event name below. The stream ends after the terminal `response.completed`
 * event (or an `error` event, if the retrieval fails before completing).
 */
export type KnowledgeBaseRetrievalStreamEvents =
  | KnowledgeBaseRetrievalStartedEvent
  | KnowledgeBaseActivityStartedEvent
  | KnowledgeBaseActivityRecordUnion
  | KnowledgeBaseAnswerCompletedEvent
  | KnowledgeBaseReferenceUnion[]
  | KnowledgeBaseStreamErrorEvent
  | KnowledgeBaseResponseCompletedEvent;

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
