// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  getOperationResult,
  getOperationStatus,
} from "../../api/staticSitesAsyncOperations/operations.js";
import type {
  StaticSitesAsyncOperationsGetOperationResultOptionalParams,
  StaticSitesAsyncOperationsGetOperationStatusOptionalParams,
} from "../../api/staticSitesAsyncOperations/options.js";
import type { StaticSitesOperationStatus } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StaticSitesAsyncOperations operations. */
export interface StaticSitesAsyncOperationsOperations {
  /** Gets the result of a static site async operation. */
  getOperationResult: (
    location: string,
    operationId: string,
    options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use getOperationResult instead */
  beginGetOperationResult: (
    location: string,
    operationId: string,
    options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use getOperationResult instead */
  beginGetOperationResultAndWait: (
    location: string,
    operationId: string,
    options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
  ) => Promise<void>;
  /** Gets the status of a static site async operation. */
  getOperationStatus: (
    location: string,
    operationId: string,
    options?: StaticSitesAsyncOperationsGetOperationStatusOptionalParams,
  ) => Promise<StaticSitesOperationStatus>;
}

function _getStaticSitesAsyncOperations(context: WebSiteManagementContext) {
  return {
    getOperationResult: (
      location: string,
      operationId: string,
      options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
    ) => getOperationResult(context, location, operationId, options),
    beginGetOperationResult: async (
      location: string,
      operationId: string,
      options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
    ) => {
      const poller = getOperationResult(context, location, operationId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetOperationResultAndWait: async (
      location: string,
      operationId: string,
      options?: StaticSitesAsyncOperationsGetOperationResultOptionalParams,
    ) => {
      return await getOperationResult(context, location, operationId, options);
    },
    getOperationStatus: (
      location: string,
      operationId: string,
      options?: StaticSitesAsyncOperationsGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, location, operationId, options),
  };
}

export function _getStaticSitesAsyncOperationsOperations(
  context: WebSiteManagementContext,
): StaticSitesAsyncOperationsOperations {
  return {
    ..._getStaticSitesAsyncOperations(context),
  };
}
