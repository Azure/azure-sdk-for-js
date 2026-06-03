// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityContext } from "../../api/observabilityContext.js";
import { list, createOrUpdate, get } from "../../api/singleSignOn/operations.js";
import type {
  SingleSignOnListOptionalParams,
  SingleSignOnCreateOrUpdateOptionalParams,
  SingleSignOnGetOptionalParams,
} from "../../api/singleSignOn/options.js";
import type { DynatraceSingleSignOnResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SingleSignOn operations. */
export interface SingleSignOnOperations {
  /** List all DynatraceSingleSignOnResource by monitorName */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnListOptionalParams,
  ) => PagedAsyncIterableIterator<DynatraceSingleSignOnResource>;
  /** Create a DynatraceSingleSignOnResource */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    resource: DynatraceSingleSignOnResource,
    options?: SingleSignOnCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DynatraceSingleSignOnResource>, DynatraceSingleSignOnResource>;
  /** Get a DynatraceSingleSignOnResource */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: SingleSignOnGetOptionalParams,
  ) => Promise<DynatraceSingleSignOnResource>;
}

function _getSingleSignOn(context: ObservabilityContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: SingleSignOnListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      resource: DynatraceSingleSignOnResource,
      options?: SingleSignOnCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, monitorName, configurationName, resource, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: SingleSignOnGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, configurationName, options),
  };
}

export function _getSingleSignOnOperations(context: ObservabilityContext): SingleSignOnOperations {
  return {
    ..._getSingleSignOn(context),
  };
}
