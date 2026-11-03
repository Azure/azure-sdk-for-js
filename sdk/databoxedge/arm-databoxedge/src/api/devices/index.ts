// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
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
} from "./operations.js";
export type {
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
} from "./options.js";
