// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  getUpdateSummary,
  uploadCertificate,
  updateExtendedInformation,
  createOrUpdateSecuritySettings,
  scanForUpdates,
  installUpdates,
  getExtendedInformation,
  generateCertificate,
  downloadUpdates,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  getNetworkSettings,
} from "../../api/devices/operations.js";
import type {
  DevicesGetUpdateSummaryOptionalParams,
  DevicesUploadCertificateOptionalParams,
  DevicesUpdateExtendedInformationOptionalParams,
  DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  DevicesScanForUpdatesOptionalParams,
  DevicesInstallUpdatesOptionalParams,
  DevicesGetExtendedInformationOptionalParams,
  DevicesGenerateCertificateOptionalParams,
  DevicesDownloadUpdatesOptionalParams,
  DevicesListBySubscriptionOptionalParams,
  DevicesListByResourceGroupOptionalParams,
  DevicesDeleteOptionalParams,
  DevicesUpdateOptionalParams,
  DevicesCreateOrUpdateOptionalParams,
  DevicesGetOptionalParams,
  DevicesGetNetworkSettingsOptionalParams,
} from "../../api/devices/options.js";
import type {
  NetworkSettings,
  DataBoxEdgeDevice,
  DataBoxEdgeDevicePatch,
  GenerateCertResponse,
  DataBoxEdgeDeviceExtendedInfo,
  SecuritySettings,
  DataBoxEdgeDeviceExtendedInfoPatch,
  UploadCertificateRequest,
  UploadCertificateResponse,
  UpdateSummary,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Devices operations. */
export interface DevicesOperations {
  /** Gets information about the availability of updates based on the last scan of the device. It also gets information about any ongoing download or install jobs on the device. */
  getUpdateSummary: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetUpdateSummaryOptionalParams,
  ) => Promise<UpdateSummary>;
  /** Uploads registration certificate for the device. */
  uploadCertificate: (
    deviceName: string,
    resourceGroupName: string,
    parameters: UploadCertificateRequest,
    options?: DevicesUploadCertificateOptionalParams,
  ) => Promise<UploadCertificateResponse>;
  /** Gets additional information for the specified Data Box Edge/Data Box Gateway device. */
  updateExtendedInformation: (
    deviceName: string,
    resourceGroupName: string,
    parameters: DataBoxEdgeDeviceExtendedInfoPatch,
    options?: DevicesUpdateExtendedInformationOptionalParams,
  ) => Promise<DataBoxEdgeDeviceExtendedInfo>;
  /** Updates the security settings on a Data Box Edge/Data Box Gateway device. */
  createOrUpdateSecuritySettings: (
    deviceName: string,
    resourceGroupName: string,
    securitySettings: SecuritySettings,
    options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdateSecuritySettings instead */
  beginCreateOrUpdateSecuritySettings: (
    deviceName: string,
    resourceGroupName: string,
    securitySettings: SecuritySettings,
    options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdateSecuritySettings instead */
  beginCreateOrUpdateSecuritySettingsAndWait: (
    deviceName: string,
    resourceGroupName: string,
    securitySettings: SecuritySettings,
    options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
  ) => Promise<void>;
  /** Scans for updates on a Data Box Edge/Data Box Gateway device. */
  scanForUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesScanForUpdatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use scanForUpdates instead */
  beginScanForUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesScanForUpdatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use scanForUpdates instead */
  beginScanForUpdatesAndWait: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesScanForUpdatesOptionalParams,
  ) => Promise<void>;
  /** Installs the updates on the Data Box Edge/Data Box Gateway device. */
  installUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesInstallUpdatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use installUpdates instead */
  beginInstallUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesInstallUpdatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use installUpdates instead */
  beginInstallUpdatesAndWait: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesInstallUpdatesOptionalParams,
  ) => Promise<void>;
  /** Gets additional information for the specified Azure Stack Edge/Data Box Gateway device. */
  getExtendedInformation: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetExtendedInformationOptionalParams,
  ) => Promise<DataBoxEdgeDeviceExtendedInfo>;
  /** Generates certificate for activation key. */
  generateCertificate: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGenerateCertificateOptionalParams,
  ) => Promise<GenerateCertResponse>;
  /** Downloads the updates on a Data Box Edge/Data Box Gateway device. */
  downloadUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDownloadUpdatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use downloadUpdates instead */
  beginDownloadUpdates: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDownloadUpdatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use downloadUpdates instead */
  beginDownloadUpdatesAndWait: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDownloadUpdatesOptionalParams,
  ) => Promise<void>;
  /** Gets all the Data Box Edge/Data Box Gateway devices in a subscription. */
  listBySubscription: (
    options?: DevicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DataBoxEdgeDevice>;
  /** Gets all the Data Box Edge/Data Box Gateway devices in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DevicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataBoxEdgeDevice>;
  /** Deletes the Data Box Edge/Data Box Gateway device. */
  delete: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Modifies a Data Box Edge/Data Box Gateway resource. */
  update: (
    deviceName: string,
    resourceGroupName: string,
    parameters: DataBoxEdgeDevicePatch,
    options?: DevicesUpdateOptionalParams,
  ) => Promise<DataBoxEdgeDevice>;
  /** Creates or updates a Data Box Edge/Data Box Gateway resource. */
  createOrUpdate: (
    deviceName: string,
    resourceGroupName: string,
    dataBoxEdgeDevice: DataBoxEdgeDevice,
    options?: DevicesCreateOrUpdateOptionalParams,
  ) => Promise<DataBoxEdgeDevice>;
  /** Gets the properties of the Data Box Edge/Data Box Gateway device. */
  get: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetOptionalParams,
  ) => Promise<DataBoxEdgeDevice>;
  /** Gets the network settings of the specified Data Box Edge/Data Box Gateway device. */
  getNetworkSettings: (
    deviceName: string,
    resourceGroupName: string,
    options?: DevicesGetNetworkSettingsOptionalParams,
  ) => Promise<NetworkSettings>;
}

function _getDevices(context: DataBoxEdgeManagementContext) {
  return {
    getUpdateSummary: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesGetUpdateSummaryOptionalParams,
    ) => getUpdateSummary(context, deviceName, resourceGroupName, options),
    uploadCertificate: (
      deviceName: string,
      resourceGroupName: string,
      parameters: UploadCertificateRequest,
      options?: DevicesUploadCertificateOptionalParams,
    ) => uploadCertificate(context, deviceName, resourceGroupName, parameters, options),
    updateExtendedInformation: (
      deviceName: string,
      resourceGroupName: string,
      parameters: DataBoxEdgeDeviceExtendedInfoPatch,
      options?: DevicesUpdateExtendedInformationOptionalParams,
    ) => updateExtendedInformation(context, deviceName, resourceGroupName, parameters, options),
    createOrUpdateSecuritySettings: (
      deviceName: string,
      resourceGroupName: string,
      securitySettings: SecuritySettings,
      options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
    ) =>
      createOrUpdateSecuritySettings(
        context,
        deviceName,
        resourceGroupName,
        securitySettings,
        options,
      ),
    beginCreateOrUpdateSecuritySettings: async (
      deviceName: string,
      resourceGroupName: string,
      securitySettings: SecuritySettings,
      options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
    ) => {
      const poller = createOrUpdateSecuritySettings(
        context,
        deviceName,
        resourceGroupName,
        securitySettings,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateSecuritySettingsAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      securitySettings: SecuritySettings,
      options?: DevicesCreateOrUpdateSecuritySettingsOptionalParams,
    ) => {
      return await createOrUpdateSecuritySettings(
        context,
        deviceName,
        resourceGroupName,
        securitySettings,
        options,
      );
    },
    scanForUpdates: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesScanForUpdatesOptionalParams,
    ) => scanForUpdates(context, deviceName, resourceGroupName, options),
    beginScanForUpdates: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesScanForUpdatesOptionalParams,
    ) => {
      const poller = scanForUpdates(context, deviceName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginScanForUpdatesAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesScanForUpdatesOptionalParams,
    ) => {
      return await scanForUpdates(context, deviceName, resourceGroupName, options);
    },
    installUpdates: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesInstallUpdatesOptionalParams,
    ) => installUpdates(context, deviceName, resourceGroupName, options),
    beginInstallUpdates: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesInstallUpdatesOptionalParams,
    ) => {
      const poller = installUpdates(context, deviceName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInstallUpdatesAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesInstallUpdatesOptionalParams,
    ) => {
      return await installUpdates(context, deviceName, resourceGroupName, options);
    },
    getExtendedInformation: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesGetExtendedInformationOptionalParams,
    ) => getExtendedInformation(context, deviceName, resourceGroupName, options),
    generateCertificate: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesGenerateCertificateOptionalParams,
    ) => generateCertificate(context, deviceName, resourceGroupName, options),
    downloadUpdates: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDownloadUpdatesOptionalParams,
    ) => downloadUpdates(context, deviceName, resourceGroupName, options),
    beginDownloadUpdates: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDownloadUpdatesOptionalParams,
    ) => {
      const poller = downloadUpdates(context, deviceName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDownloadUpdatesAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDownloadUpdatesOptionalParams,
    ) => {
      return await downloadUpdates(context, deviceName, resourceGroupName, options);
    },
    listBySubscription: (options?: DevicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DevicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDeleteOptionalParams,
    ) => $delete(context, deviceName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, resourceGroupName, options);
    },
    update: (
      deviceName: string,
      resourceGroupName: string,
      parameters: DataBoxEdgeDevicePatch,
      options?: DevicesUpdateOptionalParams,
    ) => update(context, deviceName, resourceGroupName, parameters, options),
    createOrUpdate: (
      deviceName: string,
      resourceGroupName: string,
      dataBoxEdgeDevice: DataBoxEdgeDevice,
      options?: DevicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, resourceGroupName, dataBoxEdgeDevice, options),
    get: (deviceName: string, resourceGroupName: string, options?: DevicesGetOptionalParams) =>
      get(context, deviceName, resourceGroupName, options),
    getNetworkSettings: (
      deviceName: string,
      resourceGroupName: string,
      options?: DevicesGetNetworkSettingsOptionalParams,
    ) => getNetworkSettings(context, deviceName, resourceGroupName, options),
  };
}

export function _getDevicesOperations(context: DataBoxEdgeManagementContext): DevicesOperations {
  return {
    ..._getDevices(context),
  };
}
