// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/vMHost/operations.js";
import type { vMHostListOptionalParams } from "../../api/vMHost/options.js";
import type { VMResources } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a vMHost operations. */
export interface vMHostOperations {
  /** List all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: vMHostListOptionalParams,
  ) => PagedAsyncIterableIterator<VMResources>;
}

function _getvMHost(context: MicrosoftElasticContext) {
  return {
    list: (resourceGroupName: string, monitorName: string, options?: vMHostListOptionalParams) =>
      list(context, resourceGroupName, monitorName, options),
  };
}

export function _getvMHostOperations(context: MicrosoftElasticContext): vMHostOperations {
  return {
    ..._getvMHost(context),
  };
}
