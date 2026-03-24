// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  getAzureAsyncOperationStatus,
  $delete,
  get,
  create,
  disableAzureMonitorAgent,
  getAzureMonitorAgentStatus,
  enableAzureMonitorAgent,
  disableAzureMonitor,
  getAzureMonitorStatus,
  enableAzureMonitor,
  disableMonitoring,
  getMonitoringStatus,
  enableMonitoring,
} from "../../api/extensions/operations.js";
import type {
  ExtensionsGetAzureAsyncOperationStatusOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsGetOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsDisableAzureMonitorAgentOptionalParams,
  ExtensionsGetAzureMonitorAgentStatusOptionalParams,
  ExtensionsEnableAzureMonitorAgentOptionalParams,
  ExtensionsDisableAzureMonitorOptionalParams,
  ExtensionsGetAzureMonitorStatusOptionalParams,
  ExtensionsEnableAzureMonitorOptionalParams,
  ExtensionsDisableMonitoringOptionalParams,
  ExtensionsGetMonitoringStatusOptionalParams,
  ExtensionsEnableMonitoringOptionalParams,
} from "../../api/extensions/options.js";
import type {
  AsyncOperationResult,
  ClusterMonitoringRequest,
  ClusterMonitoringResponse,
  AzureMonitorRequest,
  AzureMonitorResponse,
  Extension,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Extensions operations. */
export interface ExtensionsOperations {
  /** Gets the async operation status. */
  getAzureAsyncOperationStatus: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    operationId: string,
    options?: ExtensionsGetAzureAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Deletes the specified extension for HDInsight cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets the extension properties for the specified HDInsight cluster extension. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    options?: ExtensionsGetOptionalParams,
  ) => Promise<ClusterMonitoringResponse>;
  /** Creates an HDInsight cluster extension. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    parameters: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    parameters: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    extensionName: string,
    parameters: Extension,
    options?: ExtensionsCreateOptionalParams,
  ) => Promise<void>;
  /** Disables the Azure Monitor Agent on the HDInsight cluster. */
  disableAzureMonitorAgent: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disableAzureMonitorAgent instead */
  beginDisableAzureMonitorAgent: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disableAzureMonitorAgent instead */
  beginDisableAzureMonitorAgentAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
  ) => Promise<void>;
  /** Gets the status of Azure Monitor Agent on the HDInsight cluster. */
  getAzureMonitorAgentStatus: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsGetAzureMonitorAgentStatusOptionalParams,
  ) => Promise<AzureMonitorResponse>;
  /** Enables the Azure Monitor Agent on the HDInsight cluster. */
  enableAzureMonitorAgent: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use enableAzureMonitorAgent instead */
  beginEnableAzureMonitorAgent: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use enableAzureMonitorAgent instead */
  beginEnableAzureMonitorAgentAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
  ) => Promise<void>;
  /** Disables the Azure Monitor on the HDInsight cluster. */
  disableAzureMonitor: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disableAzureMonitor instead */
  beginDisableAzureMonitor: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disableAzureMonitor instead */
  beginDisableAzureMonitorAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableAzureMonitorOptionalParams,
  ) => Promise<void>;
  /** Gets the status of Azure Monitor on the HDInsight cluster. */
  getAzureMonitorStatus: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsGetAzureMonitorStatusOptionalParams,
  ) => Promise<AzureMonitorResponse>;
  /** Enables the Azure Monitor on the HDInsight cluster. */
  enableAzureMonitor: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use enableAzureMonitor instead */
  beginEnableAzureMonitor: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use enableAzureMonitor instead */
  beginEnableAzureMonitorAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: AzureMonitorRequest,
    options?: ExtensionsEnableAzureMonitorOptionalParams,
  ) => Promise<void>;
  /** Disables the Operations Management Suite (OMS) on the HDInsight cluster. */
  disableMonitoring: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableMonitoringOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disableMonitoring instead */
  beginDisableMonitoring: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableMonitoringOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disableMonitoring instead */
  beginDisableMonitoringAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsDisableMonitoringOptionalParams,
  ) => Promise<void>;
  /** Gets the status of Operations Management Suite (OMS) on the HDInsight cluster. */
  getMonitoringStatus: (
    resourceGroupName: string,
    clusterName: string,
    options?: ExtensionsGetMonitoringStatusOptionalParams,
  ) => Promise<ClusterMonitoringResponse>;
  /** Enables the Operations Management Suite (OMS) on the HDInsight cluster. */
  enableMonitoring: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterMonitoringRequest,
    options?: ExtensionsEnableMonitoringOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use enableMonitoring instead */
  beginEnableMonitoring: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterMonitoringRequest,
    options?: ExtensionsEnableMonitoringOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use enableMonitoring instead */
  beginEnableMonitoringAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterMonitoringRequest,
    options?: ExtensionsEnableMonitoringOptionalParams,
  ) => Promise<void>;
}

function _getExtensions(context: HDInsightManagementContext) {
  return {
    getAzureAsyncOperationStatus: (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      operationId: string,
      options?: ExtensionsGetAzureAsyncOperationStatusOptionalParams,
    ) =>
      getAzureAsyncOperationStatus(
        context,
        resourceGroupName,
        clusterName,
        extensionName,
        operationId,
        options,
      ),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, extensionName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, extensionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, extensionName, options);
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      options?: ExtensionsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, extensionName, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      parameters: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, extensionName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      parameters: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        clusterName,
        extensionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      extensionName: string,
      parameters: Extension,
      options?: ExtensionsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        clusterName,
        extensionName,
        parameters,
        options,
      );
    },
    disableAzureMonitorAgent: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
    ) => disableAzureMonitorAgent(context, resourceGroupName, clusterName, options),
    beginDisableAzureMonitorAgent: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
    ) => {
      const poller = disableAzureMonitorAgent(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableAzureMonitorAgentAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorAgentOptionalParams,
    ) => {
      return await disableAzureMonitorAgent(context, resourceGroupName, clusterName, options);
    },
    getAzureMonitorAgentStatus: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsGetAzureMonitorAgentStatusOptionalParams,
    ) => getAzureMonitorAgentStatus(context, resourceGroupName, clusterName, options),
    enableAzureMonitorAgent: (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
    ) => enableAzureMonitorAgent(context, resourceGroupName, clusterName, parameters, options),
    beginEnableAzureMonitorAgent: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
    ) => {
      const poller = enableAzureMonitorAgent(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableAzureMonitorAgentAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorAgentOptionalParams,
    ) => {
      return await enableAzureMonitorAgent(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
    },
    disableAzureMonitor: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorOptionalParams,
    ) => disableAzureMonitor(context, resourceGroupName, clusterName, options),
    beginDisableAzureMonitor: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorOptionalParams,
    ) => {
      const poller = disableAzureMonitor(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableAzureMonitorAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableAzureMonitorOptionalParams,
    ) => {
      return await disableAzureMonitor(context, resourceGroupName, clusterName, options);
    },
    getAzureMonitorStatus: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsGetAzureMonitorStatusOptionalParams,
    ) => getAzureMonitorStatus(context, resourceGroupName, clusterName, options),
    enableAzureMonitor: (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorOptionalParams,
    ) => enableAzureMonitor(context, resourceGroupName, clusterName, parameters, options),
    beginEnableAzureMonitor: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorOptionalParams,
    ) => {
      const poller = enableAzureMonitor(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableAzureMonitorAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: AzureMonitorRequest,
      options?: ExtensionsEnableAzureMonitorOptionalParams,
    ) => {
      return await enableAzureMonitor(context, resourceGroupName, clusterName, parameters, options);
    },
    disableMonitoring: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableMonitoringOptionalParams,
    ) => disableMonitoring(context, resourceGroupName, clusterName, options),
    beginDisableMonitoring: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableMonitoringOptionalParams,
    ) => {
      const poller = disableMonitoring(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableMonitoringAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsDisableMonitoringOptionalParams,
    ) => {
      return await disableMonitoring(context, resourceGroupName, clusterName, options);
    },
    getMonitoringStatus: (
      resourceGroupName: string,
      clusterName: string,
      options?: ExtensionsGetMonitoringStatusOptionalParams,
    ) => getMonitoringStatus(context, resourceGroupName, clusterName, options),
    enableMonitoring: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterMonitoringRequest,
      options?: ExtensionsEnableMonitoringOptionalParams,
    ) => enableMonitoring(context, resourceGroupName, clusterName, parameters, options),
    beginEnableMonitoring: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterMonitoringRequest,
      options?: ExtensionsEnableMonitoringOptionalParams,
    ) => {
      const poller = enableMonitoring(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableMonitoringAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterMonitoringRequest,
      options?: ExtensionsEnableMonitoringOptionalParams,
    ) => {
      return await enableMonitoring(context, resourceGroupName, clusterName, parameters, options);
    },
  };
}

export function _getExtensionsOperations(
  context: HDInsightManagementContext,
): ExtensionsOperations {
  return {
    ..._getExtensions(context),
  };
}
