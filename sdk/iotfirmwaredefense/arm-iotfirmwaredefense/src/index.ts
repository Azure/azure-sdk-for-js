// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { IoTFirmwareDefenseClient } from "./ioTFirmwareDefenseClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type Firmware,
  type FirmwareProperties,
  KnownStatus,
  type Status,
  type StatusMessage,
  KnownProvisioningState,
  type ProvisioningState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type FirmwareUpdateDefinition,
  type Workspace,
  type WorkspaceProperties,
  type Sku,
  type SkuTier,
  type TrackedResource,
  type WorkspaceUpdate,
  type GenerateUploadUrlRequest,
  type UrlToken,
  type BinaryHardeningResource,
  type BinaryHardeningResult,
  type BinaryHardeningFeatures,
  KnownExecutableClass,
  type ExecutableClass,
  type CryptoCertificateResource,
  type CryptoCertificate,
  type CryptoCertificateEntity,
  KnownCertificateUsage,
  type CertificateUsage,
  type PairedKey,
  type CryptoKeyResource,
  type CryptoKey,
  KnownCryptoKeyType,
  type CryptoKeyType,
  type CveResource,
  type CveResult,
  type CveComponent,
  type CvssScore,
  type CveLink,
  type PasswordHashResource,
  type PasswordHash,
  type SbomComponentResource,
  type SbomComponent,
  type SummaryResource,
  type SummaryResourceProperties,
  type SummaryResourcePropertiesUnion,
  KnownSummaryType,
  type SummaryType,
  type FirmwareSummary,
  type CveSummary,
  type BinaryHardeningSummaryResource,
  type CryptoCertificateSummaryResource,
  type CryptoKeySummaryResource,
  type UsageMetric,
  type UsageMetricProperties,
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
export { AzureClouds, type AzureSupportedClouds };
