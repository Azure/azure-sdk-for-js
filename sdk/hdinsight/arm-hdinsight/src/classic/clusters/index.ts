// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  executeScriptActions,
  updateIdentityCertificate,
  getAzureAsyncOperationStatus,
  updateGatewaySettings,
  getGatewaySettings,
  rotateDiskEncryptionKey,
  updateAutoScaleConfiguration,
  resize,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/clusters/operations.js";
import type {
  ClustersExecuteScriptActionsOptionalParams,
  ClustersUpdateIdentityCertificateOptionalParams,
  ClustersGetAzureAsyncOperationStatusOptionalParams,
  ClustersUpdateGatewaySettingsOptionalParams,
  ClustersGetGatewaySettingsOptionalParams,
  ClustersRotateDiskEncryptionKeyOptionalParams,
  ClustersUpdateAutoScaleConfigurationOptionalParams,
  ClustersResizeOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOptionalParams,
  ClustersGetOptionalParams,
} from "../../api/clusters/options.js";
import type {
  AsyncOperationResult,
  Cluster,
  ClusterCreateParametersExtended,
  ClusterPatchParameters,
  ClusterResizeParameters,
  AutoscaleConfigurationUpdateParameter,
  ClusterDiskEncryptionParameters,
  GatewaySettings,
  UpdateGatewaySettingsParameters,
  UpdateClusterIdentityCertificateParameters,
  ExecuteScriptActionParameters,
  RoleName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clusters operations. */
export interface ClustersOperations {
  /** Executes script actions on the specified HDInsight cluster. */
  executeScriptActions: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ExecuteScriptActionParameters,
    options?: ClustersExecuteScriptActionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use executeScriptActions instead */
  beginExecuteScriptActions: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ExecuteScriptActionParameters,
    options?: ClustersExecuteScriptActionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use executeScriptActions instead */
  beginExecuteScriptActionsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ExecuteScriptActionParameters,
    options?: ClustersExecuteScriptActionsOptionalParams,
  ) => Promise<void>;
  /** Updates the cluster identity certificate. */
  updateIdentityCertificate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateClusterIdentityCertificateParameters,
    options?: ClustersUpdateIdentityCertificateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateIdentityCertificate instead */
  beginUpdateIdentityCertificate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateClusterIdentityCertificateParameters,
    options?: ClustersUpdateIdentityCertificateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateIdentityCertificate instead */
  beginUpdateIdentityCertificateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateClusterIdentityCertificateParameters,
    options?: ClustersUpdateIdentityCertificateOptionalParams,
  ) => Promise<void>;
  /** The the async operation status. */
  getAzureAsyncOperationStatus: (
    resourceGroupName: string,
    clusterName: string,
    operationId: string,
    options?: ClustersGetAzureAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Configures the gateway settings on the specified cluster. */
  updateGatewaySettings: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateGatewaySettingsParameters,
    options?: ClustersUpdateGatewaySettingsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateGatewaySettings instead */
  beginUpdateGatewaySettings: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateGatewaySettingsParameters,
    options?: ClustersUpdateGatewaySettingsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateGatewaySettings instead */
  beginUpdateGatewaySettingsAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: UpdateGatewaySettingsParameters,
    options?: ClustersUpdateGatewaySettingsOptionalParams,
  ) => Promise<void>;
  /** Gets the gateway settings for the specified cluster. */
  getGatewaySettings: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetGatewaySettingsOptionalParams,
  ) => Promise<GatewaySettings>;
  /** Rotate disk encryption key of the specified HDInsight cluster. */
  rotateDiskEncryptionKey: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterDiskEncryptionParameters,
    options?: ClustersRotateDiskEncryptionKeyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use rotateDiskEncryptionKey instead */
  beginRotateDiskEncryptionKey: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterDiskEncryptionParameters,
    options?: ClustersRotateDiskEncryptionKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use rotateDiskEncryptionKey instead */
  beginRotateDiskEncryptionKeyAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterDiskEncryptionParameters,
    options?: ClustersRotateDiskEncryptionKeyOptionalParams,
  ) => Promise<void>;
  /** Updates the Autoscale Configuration for HDInsight cluster. */
  updateAutoScaleConfiguration: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: AutoscaleConfigurationUpdateParameter,
    options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateAutoScaleConfiguration instead */
  beginUpdateAutoScaleConfiguration: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: AutoscaleConfigurationUpdateParameter,
    options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateAutoScaleConfiguration instead */
  beginUpdateAutoScaleConfigurationAndWait: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: AutoscaleConfigurationUpdateParameter,
    options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
  ) => Promise<void>;
  /** Resizes the specified HDInsight cluster to the specified size. */
  resize: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: ClusterResizeParameters,
    options?: ClustersResizeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resize instead */
  beginResize: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: ClusterResizeParameters,
    options?: ClustersResizeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resize instead */
  beginResizeAndWait: (
    resourceGroupName: string,
    clusterName: string,
    roleName: RoleName,
    parameters: ClusterResizeParameters,
    options?: ClustersResizeOptionalParams,
  ) => Promise<void>;
  /** Lists all the HDInsight clusters under the subscription. */
  list: (options?: ClustersListOptionalParams) => PagedAsyncIterableIterator<Cluster>;
  /** Lists the HDInsight clusters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cluster>;
  /** Deletes the specified HDInsight cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch HDInsight cluster with the specified parameters. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterPatchParameters,
    options?: ClustersUpdateOptionalParams,
  ) => Promise<Cluster>;
  /** Creates a new HDInsight cluster with the specified parameters. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterCreateParametersExtended,
    options?: ClustersCreateOptionalParams,
  ) => PollerLike<OperationState<Cluster>, Cluster>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterCreateParametersExtended,
    options?: ClustersCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Cluster>, Cluster>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ClusterCreateParametersExtended,
    options?: ClustersCreateOptionalParams,
  ) => Promise<Cluster>;
  /** Gets the specified cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ClustersGetOptionalParams,
  ) => Promise<Cluster>;
}

function _getClusters(context: HDInsightManagementContext) {
  return {
    executeScriptActions: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ExecuteScriptActionParameters,
      options?: ClustersExecuteScriptActionsOptionalParams,
    ) => executeScriptActions(context, resourceGroupName, clusterName, parameters, options),
    beginExecuteScriptActions: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ExecuteScriptActionParameters,
      options?: ClustersExecuteScriptActionsOptionalParams,
    ) => {
      const poller = executeScriptActions(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExecuteScriptActionsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ExecuteScriptActionParameters,
      options?: ClustersExecuteScriptActionsOptionalParams,
    ) => {
      return await executeScriptActions(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
    },
    updateIdentityCertificate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateClusterIdentityCertificateParameters,
      options?: ClustersUpdateIdentityCertificateOptionalParams,
    ) => updateIdentityCertificate(context, resourceGroupName, clusterName, parameters, options),
    beginUpdateIdentityCertificate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateClusterIdentityCertificateParameters,
      options?: ClustersUpdateIdentityCertificateOptionalParams,
    ) => {
      const poller = updateIdentityCertificate(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateIdentityCertificateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateClusterIdentityCertificateParameters,
      options?: ClustersUpdateIdentityCertificateOptionalParams,
    ) => {
      return await updateIdentityCertificate(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
    },
    getAzureAsyncOperationStatus: (
      resourceGroupName: string,
      clusterName: string,
      operationId: string,
      options?: ClustersGetAzureAsyncOperationStatusOptionalParams,
    ) =>
      getAzureAsyncOperationStatus(context, resourceGroupName, clusterName, operationId, options),
    updateGatewaySettings: (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateGatewaySettingsParameters,
      options?: ClustersUpdateGatewaySettingsOptionalParams,
    ) => updateGatewaySettings(context, resourceGroupName, clusterName, parameters, options),
    beginUpdateGatewaySettings: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateGatewaySettingsParameters,
      options?: ClustersUpdateGatewaySettingsOptionalParams,
    ) => {
      const poller = updateGatewaySettings(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateGatewaySettingsAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: UpdateGatewaySettingsParameters,
      options?: ClustersUpdateGatewaySettingsOptionalParams,
    ) => {
      return await updateGatewaySettings(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
    },
    getGatewaySettings: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersGetGatewaySettingsOptionalParams,
    ) => getGatewaySettings(context, resourceGroupName, clusterName, options),
    rotateDiskEncryptionKey: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterDiskEncryptionParameters,
      options?: ClustersRotateDiskEncryptionKeyOptionalParams,
    ) => rotateDiskEncryptionKey(context, resourceGroupName, clusterName, parameters, options),
    beginRotateDiskEncryptionKey: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterDiskEncryptionParameters,
      options?: ClustersRotateDiskEncryptionKeyOptionalParams,
    ) => {
      const poller = rotateDiskEncryptionKey(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRotateDiskEncryptionKeyAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterDiskEncryptionParameters,
      options?: ClustersRotateDiskEncryptionKeyOptionalParams,
    ) => {
      return await rotateDiskEncryptionKey(
        context,
        resourceGroupName,
        clusterName,
        parameters,
        options,
      );
    },
    updateAutoScaleConfiguration: (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: AutoscaleConfigurationUpdateParameter,
      options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
    ) =>
      updateAutoScaleConfiguration(
        context,
        resourceGroupName,
        clusterName,
        roleName,
        parameters,
        options,
      ),
    beginUpdateAutoScaleConfiguration: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: AutoscaleConfigurationUpdateParameter,
      options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
    ) => {
      const poller = updateAutoScaleConfiguration(
        context,
        resourceGroupName,
        clusterName,
        roleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAutoScaleConfigurationAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: AutoscaleConfigurationUpdateParameter,
      options?: ClustersUpdateAutoScaleConfigurationOptionalParams,
    ) => {
      return await updateAutoScaleConfiguration(
        context,
        resourceGroupName,
        clusterName,
        roleName,
        parameters,
        options,
      );
    },
    resize: (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: ClusterResizeParameters,
      options?: ClustersResizeOptionalParams,
    ) => resize(context, resourceGroupName, clusterName, roleName, parameters, options),
    beginResize: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: ClusterResizeParameters,
      options?: ClustersResizeOptionalParams,
    ) => {
      const poller = resize(context, resourceGroupName, clusterName, roleName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResizeAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      roleName: RoleName,
      parameters: ClusterResizeParameters,
      options?: ClustersResizeOptionalParams,
    ) => {
      return await resize(context, resourceGroupName, clusterName, roleName, parameters, options);
    },
    list: (options?: ClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: ClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterPatchParameters,
      options?: ClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterCreateParametersExtended,
      options?: ClustersCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterCreateParametersExtended,
      options?: ClustersCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, clusterName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      parameters: ClusterCreateParametersExtended,
      options?: ClustersCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, clusterName, parameters, options);
    },
    get: (resourceGroupName: string, clusterName: string, options?: ClustersGetOptionalParams) =>
      get(context, resourceGroupName, clusterName, options),
  };
}

export function _getClustersOperations(context: HDInsightManagementContext): ClustersOperations {
  return {
    ..._getClusters(context),
  };
}
