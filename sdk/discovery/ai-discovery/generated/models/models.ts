// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  KnowledgeBase,
  knowledgeBaseArrayDeserializer,
} from "./microsoft/discovery/bookshelf/models.js";
import {
  Investigation,
  investigationArrayDeserializer,
  workingMemoryEntryArrayDeserializer,
  WorkingMemoryEntry,
  Conversation,
  conversationArrayDeserializer,
  RunResult,
  runResultDeserializer,
  operationArrayDeserializer,
  Operation,
  Task,
  taskArrayDeserializer,
} from "./microsoft/discovery/workspace/models.js";
import { ErrorModel } from "@azure-rest/core-client";

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

/** Paged collection of Investigation items */
export interface PagedInvestigation {
  /** The Investigation items on this page */
  value: Investigation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedInvestigationDeserializer(item: any): PagedInvestigation {
  return {
    value: investigationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of WorkingMemoryEntry items */
export interface PagedWorkingMemoryEntry {
  /** The WorkingMemoryEntry items on this page */
  value: WorkingMemoryEntry[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedWorkingMemoryEntryDeserializer(item: any): PagedWorkingMemoryEntry {
  return {
    value: workingMemoryEntryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of Conversation items */
export interface PagedConversation {
  /** The Conversation items on this page */
  value: Conversation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedConversationDeserializer(item: any): PagedConversation {
  return {
    value: conversationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Provides status details for long running operations. */
export interface OperationStatusRunResultError {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: RunResult;
}

export function operationStatusRunResultErrorDeserializer(
  item: any,
): OperationStatusRunResultError {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : runResultDeserializer(item["result"]),
  };
}

/** Paged collection of Operation items */
export interface PagedOperation {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function pagedOperationDeserializer(item: any): PagedOperation {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of Task items */
export interface _PagedTask {
  /** The Task items on this page */
  value: Task[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTaskDeserializer(item: any): _PagedTask {
  return {
    value: taskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of KnowledgeBase items */
export interface _PagedKnowledgeBase {
  /** The KnowledgeBase items on this page */
  value: KnowledgeBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedKnowledgeBaseDeserializer(item: any): _PagedKnowledgeBase {
  return {
    value: knowledgeBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Repeatability Result header options */
export type RepeatabilityResult = "accepted" | "rejected";
