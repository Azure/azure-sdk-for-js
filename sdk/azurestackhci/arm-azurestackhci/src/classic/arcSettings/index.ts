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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use initializeDisableProcess instead */
  beginInitializeDisableProcess: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsInitializeDisableProcessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use initializeDisableProcess instead */
  beginInitializeDisableProcessAndWait: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsInitializeDisableProcessOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use reconcile instead */
  beginReconcile: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
    options?: ArcSettingsReconcileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArcSetting>, ArcSetting>>;
  /** @deprecated use reconcile instead */
  beginReconcileAndWait: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
    options?: ArcSettingsReconcileOptionalParams,
  ) => Promise<ArcSetting>;
  /** Create Aad identity for arc settings. */
  createIdentity: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsCreateIdentityOptionalParams,
  ) => PollerLike<OperationState<ArcIdentityResponse>, ArcIdentityResponse>;
  /** @deprecated use createIdentity instead */
  beginCreateIdentity: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsCreateIdentityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArcIdentityResponse>, ArcIdentityResponse>>;
  /** @deprecated use createIdentity instead */
  beginCreateIdentityAndWait: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsCreateIdentityOptionalParams,
  ) => Promise<ArcIdentityResponse>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    arcSettingName: string,
    options?: ArcSettingsDeleteOptionalParams,
  ) => Promise<void>;
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
    beginInitializeDisableProcess: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsInitializeDisableProcessOptionalParams,
    ) => {
      const poller = initializeDisableProcess(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInitializeDisableProcessAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsInitializeDisableProcessOptionalParams,
    ) => {
      return await initializeDisableProcess(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        options,
      );
    },
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
    beginReconcile: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
      options?: ArcSettingsReconcileOptionalParams,
    ) => {
      const poller = reconcile(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        reconcileArcSettingsRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      reconcileArcSettingsRequest: ReconcileArcSettingsRequest,
      options?: ArcSettingsReconcileOptionalParams,
    ) => {
      return await reconcile(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        reconcileArcSettingsRequest,
        options,
      );
    },
    createIdentity: (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsCreateIdentityOptionalParams,
    ) => createIdentity(context, resourceGroupName, clusterName, arcSettingName, options),
    beginCreateIdentity: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsCreateIdentityOptionalParams,
    ) => {
      const poller = createIdentity(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateIdentityAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsCreateIdentityOptionalParams,
    ) => {
      return await createIdentity(context, resourceGroupName, clusterName, arcSettingName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, arcSettingName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      arcSettingName: string,
      options?: ArcSettingsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, arcSettingName, options);
    },
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
