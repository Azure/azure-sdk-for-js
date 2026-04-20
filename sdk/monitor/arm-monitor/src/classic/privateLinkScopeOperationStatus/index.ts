// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { get } from "../../api/privateLinkScopeOperationStatus/operations.js";
import type { PrivateLinkScopeOperationStatusGetOptionalParams } from "../../api/privateLinkScopeOperationStatus/options.js";
import type { MicrosoftPrivateLinkScopesOperationStatus } from "../../models/microsoft/privateLinkScopes/models.js";

/** Interface representing a PrivateLinkScopeOperationStatus operations. */
export interface PrivateLinkScopeOperationStatusOperations {
  /** Get the status of an azure asynchronous operation associated with a private link scope operation. */
  get: (
    resourceGroupName: string,
    asyncOperationId: string,
    options?: PrivateLinkScopeOperationStatusGetOptionalParams,
  ) => Promise<MicrosoftPrivateLinkScopesOperationStatus>;
}

function _getPrivateLinkScopeOperationStatus(context: MonitorContext) {
  return {
    get: (
      resourceGroupName: string,
      asyncOperationId: string,
      options?: PrivateLinkScopeOperationStatusGetOptionalParams,
    ) => get(context, resourceGroupName, asyncOperationId, options),
  };
}

export function _getPrivateLinkScopeOperationStatusOperations(
  context: MonitorContext,
): PrivateLinkScopeOperationStatusOperations {
  return {
    ..._getPrivateLinkScopeOperationStatus(context),
  };
}
