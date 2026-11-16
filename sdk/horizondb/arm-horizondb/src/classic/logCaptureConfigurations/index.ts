// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, update, get } from "../../api/logCaptureConfigurations/operations.js";
import type {
  LogCaptureConfigurationsListOptionalParams,
  LogCaptureConfigurationsUpdateOptionalParams,
  LogCaptureConfigurationsGetOptionalParams,
} from "../../api/logCaptureConfigurations/options.js";
import type {
  LogCaptureConfiguration,
  LogCaptureConfigurationForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LogCaptureConfigurations operations. */
export interface LogCaptureConfigurationsOperations {
  /** Lists the log capture configurations for a HorizonDB cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: LogCaptureConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<LogCaptureConfiguration>;
  /** Updates a log capture configuration. Omitted properties preserve their current values. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    logCaptureConfigurationName: string,
    properties: LogCaptureConfigurationForPatchUpdateUpdate,
    options?: LogCaptureConfigurationsUpdateOptionalParams,
  ) => PollerLike<OperationState<LogCaptureConfiguration>, LogCaptureConfiguration>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    logCaptureConfigurationName: string,
    properties: LogCaptureConfigurationForPatchUpdateUpdate,
    options?: LogCaptureConfigurationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<LogCaptureConfiguration>, LogCaptureConfiguration>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    logCaptureConfigurationName: string,
    properties: LogCaptureConfigurationForPatchUpdateUpdate,
    options?: LogCaptureConfigurationsUpdateOptionalParams,
  ) => Promise<LogCaptureConfiguration>;
  /** Gets a log capture configuration for a HorizonDB cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    logCaptureConfigurationName: string,
    options?: LogCaptureConfigurationsGetOptionalParams,
  ) => Promise<LogCaptureConfiguration>;
}

function _getLogCaptureConfigurations(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: LogCaptureConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      logCaptureConfigurationName: string,
      properties: LogCaptureConfigurationForPatchUpdateUpdate,
      options?: LogCaptureConfigurationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        logCaptureConfigurationName,
        properties,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      logCaptureConfigurationName: string,
      properties: LogCaptureConfigurationForPatchUpdateUpdate,
      options?: LogCaptureConfigurationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        logCaptureConfigurationName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      logCaptureConfigurationName: string,
      properties: LogCaptureConfigurationForPatchUpdateUpdate,
      options?: LogCaptureConfigurationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        logCaptureConfigurationName,
        properties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      logCaptureConfigurationName: string,
      options?: LogCaptureConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, logCaptureConfigurationName, options),
  };
}

export function _getLogCaptureConfigurationsOperations(
  context: HorizonDbContext,
): LogCaptureConfigurationsOperations {
  return {
    ..._getLogCaptureConfigurations(context),
  };
}
