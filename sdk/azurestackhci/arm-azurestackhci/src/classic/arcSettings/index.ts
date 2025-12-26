// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  initializeDisableProcess,
  consentAndInstallDefaultExtensions,
  reconcile,
  createIdentity,
  generatePassword,
  listByCluster,
  $delete,
  update,
  create,
  get,
} from "../../api/arcSettings/operations.js";
import type {
  ArcSettingsInitializeDisableProcessOptionalParams,
  ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams,
  ArcSettingsReconcileOptionalParams,
  ArcSettingsCreateIdentityOptionalParams,
  ArcSettingsGeneratePasswordOptionalParams,
  ArcSettingsListByClusterOptionalParams,
  ArcSettingsDeleteOptionalParams,
  ArcSettingsUpdateOptionalParams,
  ArcSettingsCreateOptionalParams,
  ArcSettingsGetOptionalParams,
} from "../../api/arcSettings/options.js";
import type {
  ArcSetting,
  ArcSettingsPatch,
  PasswordCredential,
  ArcIdentityResponse,
  ReconcileArcSettingsRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ArcSettings operations. */
export interface ArcSettingsOperations {
  /** Initializes ARC Disable process on the cluster */
  initializeDisableProcess: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsInitializeDisableProcessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Add consent time for default extensions and initiate extensions installation */
  consentAndInstallDefaultExtensions: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams,
  ) => Promise<ArcSetting>;
  /** Reconcile Arc Settings with information related to all nodes. */
  reconcile: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
    options?: ArcSettingsReconcileOptionalParams,
  ) => PollerLike<OperationState<ArcSetting>, ArcSetting>;
  /** Create Aad identity for arc settings. */
  createIdentity: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsCreateIdentityOptionalParams,
  ) => PollerLike<OperationState<ArcIdentityResponse>, ArcIdentityResponse>;
  /** Generate password for arc settings. */
  generatePassword: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsGeneratePasswordOptionalParams,
  ) => Promise<PasswordCredential>;
  /** Get ArcSetting resources of HCI Cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ArcSettingsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<ArcSetting>;
  /** Delete ArcSetting resource details of HCI Cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update ArcSettings for HCI cluster. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    arcSetting: ArcSettingsPatch,
    options?: ArcSettingsUpdateOptionalParams,
  ) => Promise<ArcSetting>;
  /** Create ArcSetting for HCI cluster. */
  create: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    arcSetting: ArcSetting,
    options?: ArcSettingsCreateOptionalParams,
  ) => Promise<ArcSetting>;
  /** Get ArcSetting resource details of HCI Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsGetOptionalParams,
  ) => Promise<ArcSetting>;
}

function _getArcSettings(context: AzureStackHCIContext) {
  return {
    initializeDisableProcess: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsInitializeDisableProcessOptionalParams,
    ) => initializeDisableProcess(context, resourceGroupName, clusterName, arcSettingName, options),
    consentAndInstallDefaultExtensions: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsConsentAndInstallDefaultExtensionsOptionalParams,
    ) =>
      consentAndInstallDefaultExtensions(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        options,
      ),
    reconcile: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
      options?: ArcSettingsReconcileOptionalParams,
    ) =>
      reconcile(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        reconcileArcSettingsRequest,
        options,
      ),
    createIdentity: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsCreateIdentityOptionalParams,
    ) => createIdentity(context, resourceGroupName, clusterName, arcSettingName, options),
    generatePassword: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsGeneratePasswordOptionalParams,
    ) => generatePassword(context, resourceGroupName, clusterName, arcSettingName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ArcSettingsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, arcSettingName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      arcSetting: ArcSettingsPatch,
      options?: ArcSettingsUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, arcSettingName, arcSetting, options),
    create: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      arcSetting: ArcSetting,
      options?: ArcSettingsCreateOptionalParams,
    ) => create(context, resourceGroupName, clusterName, arcSettingName, arcSetting, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, arcSettingName, options),
  };
}

export function _getArcSettingsOperations(context: AzureStackHCIContext): ArcSettingsOperations {
  return {
    ..._getArcSettings(context),
  };
}
