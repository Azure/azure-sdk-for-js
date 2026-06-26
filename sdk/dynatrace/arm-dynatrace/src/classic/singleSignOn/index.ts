// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservabilityContext } from "../../api/dynatraceObservabilityContext.js";
import { list, createOrUpdate, get } from "../../api/singleSignOn/operations.js";
import {
  SingleSignOnListOptionalParams,
  SingleSignOnCreateOrUpdateOptionalParams,
  SingleSignOnGetOptionalParams,
} from "../../api/singleSignOn/options.js";
import { DynatraceSingleSignOnResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    resource: DynatraceSingleSignOnResource,
    options?: SingleSignOnCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DynatraceSingleSignOnResource>, DynatraceSingleSignOnResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    resource: DynatraceSingleSignOnResource,
    options?: SingleSignOnCreateOrUpdateOptionalParams,
  ) => Promise<DynatraceSingleSignOnResource>;
  /** Get a DynatraceSingleSignOnResource */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: SingleSignOnGetOptionalParams,
  ) => Promise<DynatraceSingleSignOnResource>;
}

function _getSingleSignOn(context: DynatraceObservabilityContext) {
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      resource: DynatraceSingleSignOnResource,
      options?: SingleSignOnCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        monitorName,
        configurationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      resource: DynatraceSingleSignOnResource,
      options?: SingleSignOnCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        monitorName,
        configurationName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: SingleSignOnGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, configurationName, options),
  };
}

export function _getSingleSignOnOperations(
  context: DynatraceObservabilityContext,
): SingleSignOnOperations {
  return {
    ..._getSingleSignOn(context),
  };
}
