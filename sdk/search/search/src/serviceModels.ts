// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { AccessCondition, AnalyzeRequest } from "./generated/service/models";

/**
 * Options for a list indexes operation.
 */
export interface ListIndexesOptions extends OperationOptions {
  /**
   * Selects which top-level properties of the index definitions to retrieve. Specified as a
   * comma-separated list of JSON property names, or '*' for all properties. The default is all
   * properties.
   */
  select?: string;
}

export type GetIndexOptions = OperationOptions;

export type GetIndexStatisticsOptions = OperationOptions;

export type CreateIndexOptions = OperationOptions;

export interface ETagOperationOptions {
  /**
   * ETag parameters
   */
  accessCondition?: AccessCondition;
}

export interface CreateOrUpdateIndexOptions extends OperationOptions, ETagOperationOptions {
  /**
   * Allows new analyzers, tokenizers, token filters, or char filters to be added to an index by
   * taking the index offline for at least a few seconds. This temporarily causes indexing and
   * query requests to fail. Performance and write availability of the index can be impaired for
   * several minutes after the index is updated, or longer for very large indexes.
   */
  allowIndexDowntime?: boolean;
}

export type DeleteIndexOptions = OperationOptions & ETagOperationOptions;

export type AnalyzeTextOptions = OperationOptions & AnalyzeRequest;
