// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { IoTFirmwareDefenseClient } from "./ioTFirmwareDefenseClient.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Firmware,
  FirmwareProperties,
  KnownStatus,
  Status,
  StatusMessage,
  KnownProvisioningState,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
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
  KnownExecutableClass,
  ExecutableClass,
  CryptoCertificateResource,
  CryptoCertificate,
  CryptoCertificateEntity,
  KnownCertificateUsage,
  CertificateUsage,
  PairedKey,
  CryptoKeyResource,
  CryptoKey,
  KnownCryptoKeyType,
  CryptoKeyType,
  CveResource,
  CveResult,
  CvssScore,
  CveLink,
  PasswordHashResource,
  PasswordHash,
  SbomComponentResource,
  SbomComponent,
  SummaryResource,
  SummaryResourceProperties,
  SummaryResourcePropertiesUnion,
  KnownSummaryType,
  SummaryType,
  FirmwareSummary,
  CveSummary,
  BinaryHardeningSummaryResource,
  CryptoCertificateSummaryResource,
  CryptoKeySummaryResource,
  UsageMetric,
  UsageMetricProperties,
  KnownVersions,
} from "./models/index.js";
export { IoTFirmwareDefenseClientOptionalParams } from "./api/index.js";
export { BinaryHardeningListByFirmwareOptionalParams } from "./api/binaryHardening/index.js";
export { CryptoCertificatesListByFirmwareOptionalParams } from "./api/cryptoCertificates/index.js";
export { CryptoKeysListByFirmwareOptionalParams } from "./api/cryptoKeys/index.js";
export { CvesListByFirmwareOptionalParams } from "./api/cves/index.js";
export {
  FirmwaresListByWorkspaceOptionalParams,
  FirmwaresDeleteOptionalParams,
  FirmwaresUpdateOptionalParams,
  FirmwaresCreateOptionalParams,
  FirmwaresGetOptionalParams,
} from "./api/firmwares/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { PasswordHashesListByFirmwareOptionalParams } from "./api/passwordHashes/index.js";
export { SbomComponentsListByFirmwareOptionalParams } from "./api/sbomComponents/index.js";
export {
  SummariesListByFirmwareOptionalParams,
  SummariesGetOptionalParams,
} from "./api/summaries/index.js";
export {
  UsageMetricsListByWorkspaceOptionalParams,
  UsageMetricsGetOptionalParams,
} from "./api/usageMetrics/index.js";
export {
  WorkspacesGenerateUploadUrlOptionalParams,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export {
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
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
