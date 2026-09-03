// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A container holding only the Tags for a resource, allowing the user to update the tags on a WebTest instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** The kind of workbook. Only valid value is shared. */
export enum KnownWorkbookSharedTypeKind {
  /** shared */
  Shared = "shared",
}

/**
 * The kind of workbook. Only valid value is shared. \
 * {@link KnownWorkbookSharedTypeKind} can be used interchangeably with WorkbookSharedTypeKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **shared**: shared
 */
export type WorkbookSharedTypeKind = string;

/** model interface ErrorResponseLinkedStorage */
export interface ErrorResponseLinkedStorage {
  /** Error response indicates Insights service is not able to process the incoming request. The reason is provided in the error message. */
  error?: ErrorResponseLinkedStorageError;
}

export function errorResponseLinkedStorageDeserializer(item: any): ErrorResponseLinkedStorage {
  return {
    error: !item["error"]
      ? item["error"]
      : errorResponseLinkedStorageErrorDeserializer(item["error"]),
  };
}

/** Error response indicates Insights service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponseLinkedStorageError {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorResponseLinkedStorageErrorDeserializer(
  item: any,
): ErrorResponseLinkedStorageError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Known values of {@link CategoryType} that the service accepts. */
export enum KnownCategoryType {
  /** workbook */
  Workbook = "workbook",
  /** TSG */
  TSG = "TSG",
  /** performance */
  Performance = "performance",
  /** retention */
  Retention = "retention",
}

/** Type of CategoryType */
export type CategoryType = string;
