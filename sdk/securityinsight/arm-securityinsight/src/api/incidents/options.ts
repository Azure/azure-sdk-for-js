// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManualTriggerRequestBody } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IncidentsListEntitiesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncidentsListBookmarksOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncidentsListAlertsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncidentsRunPlaybookOptionalParams extends OperationOptions {
  /** Describes the request body for triggering a playbook on an incident. */
  requestBody?: ManualTriggerRequestBody;
}

/** Optional parameters. */
export interface IncidentsListOptionalParams extends OperationOptions {
  /** Filters the results, based on a Boolean condition. Optional. */
  filter?: string;
  /** Sorts the results. Optional. */
  orderby?: string;
  /** Returns only the first n results. Optional. */
  top?: number;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional. */
  skipToken?: string;
}

/** Optional parameters. */
export interface IncidentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncidentsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IncidentsGetOptionalParams extends OperationOptions {}
