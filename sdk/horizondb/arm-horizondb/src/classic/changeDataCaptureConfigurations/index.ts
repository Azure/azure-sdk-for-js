// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  list,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/changeDataCaptureConfigurations/operations.js";
import type {
  ChangeDataCaptureConfigurationsListOptionalParams,
  ChangeDataCaptureConfigurationsDeleteOptionalParams,
  ChangeDataCaptureConfigurationsUpdateOptionalParams,
  ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
  ChangeDataCaptureConfigurationsGetOptionalParams,
} from "../../api/changeDataCaptureConfigurations/options.js";
import type {
  ChangeDataCaptureConfiguration,
  ChangeDataCaptureConfigurationCreateOrUpdate,
  ChangeDataCaptureConfigurationForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ChangeDataCaptureConfigurations operations. */
export interface ChangeDataCaptureConfigurationsOperations {
  /** Lists change data capture configurations in a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ChangeDataCaptureConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ChangeDataCaptureConfiguration>;
  /** Deletes a change data capture configuration after destination-side replication has been stopped or detached. This operation never deletes the Microsoft Fabric mirrored-database item. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates mutable change data capture configuration properties. Omitted properties preserve their current values. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
    options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
    options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
    options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
  ) => Promise<ChangeDataCaptureConfiguration>;
  /** Creates or replaces a change data capture configuration that enrolls a PostgreSQL database for Microsoft Fabric Mirroring. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    resource: ChangeDataCaptureConfigurationCreateOrUpdate,
    options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    resource: ChangeDataCaptureConfigurationCreateOrUpdate,
    options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ChangeDataCaptureConfiguration>, ChangeDataCaptureConfiguration>
  >;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    resource: ChangeDataCaptureConfigurationCreateOrUpdate,
    options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
  ) => Promise<ChangeDataCaptureConfiguration>;
  /** Gets a change data capture configuration. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    configurationName: string,
    options?: ChangeDataCaptureConfigurationsGetOptionalParams,
  ) => Promise<ChangeDataCaptureConfiguration>;
}

function _getChangeDataCaptureConfigurations(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ChangeDataCaptureConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ChangeDataCaptureConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, configurationName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
      options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, configurationName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
      options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      properties: ChangeDataCaptureConfigurationForPatchUpdateUpdate,
      options?: ChangeDataCaptureConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        properties,
        options,
      );
    },
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      resource: ChangeDataCaptureConfigurationCreateOrUpdate,
      options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        resource,
        options,
      ),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      resource: ChangeDataCaptureConfigurationCreateOrUpdate,
      options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      resource: ChangeDataCaptureConfigurationCreateOrUpdate,
      options?: ChangeDataCaptureConfigurationsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      configurationName: string,
      options?: ChangeDataCaptureConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, configurationName, options),
  };
}

export function _getChangeDataCaptureConfigurationsOperations(
  context: HorizonDbContext,
): ChangeDataCaptureConfigurationsOperations {
  return {
    ..._getChangeDataCaptureConfigurations(context),
  };
}
