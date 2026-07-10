// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/monitors/operations.js";
import type {
  MonitorsListOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOptionalParams,
  MonitorsGetOptionalParams,
} from "../../api/monitors/options.js";
import type { ElasticMonitorResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitors operations. */
export interface MonitorsOperations {
  /** List all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup. */
  list: (
    options?: MonitorsListOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticMonitorResource>;
  /** List all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MonitorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticMonitorResource>;
  /** Delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities. */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsUpdateOptionalParams,
  ) => Promise<ElasticMonitorResource>;
  /** Create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic. */
  create: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => PollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsCreateOptionalParams,
  ) => Promise<ElasticMonitorResource>;
  /** Get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetOptionalParams,
  ) => Promise<ElasticMonitorResource>;
}

function _getMonitors(context: MicrosoftElasticContext) {
  return {
    list: (options?: MonitorsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MonitorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, options);
    },
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, options);
    },
    create: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => create(context, resourceGroupName, monitorName, options),
    beginCreate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, monitorName, options);
    },
    get: (resourceGroupName: string, monitorName: string, options?: MonitorsGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitorsOperations(context: MicrosoftElasticContext): MonitorsOperations {
  return {
    ..._getMonitors(context),
  };
}
