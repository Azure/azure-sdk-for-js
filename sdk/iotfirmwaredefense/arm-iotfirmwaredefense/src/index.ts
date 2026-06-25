// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { IoTFirmwareDefenseClient } from "./ioTFirmwareDefenseClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Firmware,
  FirmwareProperties,
  Status,
  StatusMessage,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  FirmwareUpdateDefinition,
  Workspace,
  WorkspaceProperties,
  Sku,
  SkuTier,
  TrackedResource,
  WorkspaceUpdate,
  GenerateUploadUrlRequest,
  UrlToken,
  BinaryHardeningResource,
  BinaryHardeningResult,
  BinaryHardeningFeatures,
  ExecutableClass,
  CryptoCertificateResource,
  CryptoCertificate,
  CryptoCertificateEntity,
  CertificateUsage,
  PairedKey,
  CryptoKeyResource,
  CryptoKey,
  CryptoKeyType,
  CveResource,
  CveResult,
  CveComponent,
  CvssScore,
  CveLink,
  PasswordHashResource,
  PasswordHash,
  SbomComponentResource,
  SbomComponent,
  SummaryResource,
  SummaryResourceProperties,
  SummaryResourcePropertiesUnion,
  SummaryType,
  FirmwareSummary,
  CveSummary,
  BinaryHardeningSummaryResource,
  CryptoCertificateSummaryResource,
  CryptoKeySummaryResource,
  UsageMetric,
  UsageMetricProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownStatus,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownExecutableClass,
  KnownCertificateUsage,
  KnownCryptoKeyType,
  KnownSummaryType,
  KnownVersions,
} from "./models/index.js";
export type { IoTFirmwareDefenseClientOptionalParams } from "./api/index.js";
export type { BinaryHardeningListByFirmwareOptionalParams } from "./api/binaryHardening/index.js";
export type { CryptoCertificatesListByFirmwareOptionalParams } from "./api/cryptoCertificates/index.js";
export type { CryptoKeysListByFirmwareOptionalParams } from "./api/cryptoKeys/index.js";
export type { CvesListByFirmwareOptionalParams } from "./api/cves/index.js";
export type {
  FirmwaresListByWorkspaceOptionalParams,
  FirmwaresDeleteOptionalParams,
  FirmwaresUpdateOptionalParams,
  FirmwaresCreateOptionalParams,
  FirmwaresGetOptionalParams,
} from "./api/firmwares/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { PasswordHashesListByFirmwareOptionalParams } from "./api/passwordHashes/index.js";
export type { SbomComponentsListByFirmwareOptionalParams } from "./api/sbomComponents/index.js";
export type {
  SummariesListByFirmwareOptionalParams,
  SummariesGetOptionalParams,
} from "./api/summaries/index.js";
export type {
  UsageMetricsListByWorkspaceOptionalParams,
  UsageMetricsGetOptionalParams,
} from "./api/usageMetrics/index.js";
export type {
  WorkspacesGenerateUploadUrlOptionalParams,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  BinaryHardeningOperations,
  CryptoCertificatesOperations,
  CryptoKeysOperations,
  CvesOperations,
  FirmwaresOperations,
  OperationsOperations,
  PasswordHashesOperations,
  SbomComponentsOperations,
  SummariesOperations,
  UsageMetricsOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
