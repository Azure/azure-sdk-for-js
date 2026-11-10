// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  KnowledgeBaseRetrievalStartedStreamEvent,
  KnowledgeBaseActivityStartedStreamEvent,
  KnowledgeBaseActivityCompletedStreamEvent,
  KnowledgeBaseAnswerCompletedStreamEvent,
  KnowledgeBaseReferencesCompletedStreamEvent,
  KnowledgeBaseErrorStreamEvent,
  KnowledgeBaseResponseCompletedStreamEvent,
} from "./azure/search/documents/knowledgeBases/models.js";

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
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
  /** The 2026-10-01 API version. */
  V20261001 = "2026-10-01",
}
