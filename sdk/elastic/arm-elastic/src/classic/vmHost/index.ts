// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/vmHost/operations.js";
import type { VMHostListOptionalParams } from "../../api/vmHost/options.js";
import type { VMResources } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VMHost operations. */
export interface VMHostOperations {
  /** List all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: VMHostListOptionalParams,
  ) => PagedAsyncIterableIterator<VMResources>;
}

function _getVMHost(context: MicrosoftElasticContext) {
  return {
    list: (resourceGroupName: string, monitorName: string, options?: VMHostListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
  };
}

export function _getVMHostOperations(context: MicrosoftElasticContext): VMHostOperations {
  return {
    ..._getVMHost(context),
  };
}
