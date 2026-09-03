// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CodeSigningClient } from "./codeSigningClient.js";
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
  CodeSigningAccount,
  CodeSigningAccountProperties,
  AccountSku,
  SkuName,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  CodeSigningAccountPatch,
  CodeSigningAccountPatchProperties,
  AccountSkuPatch,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  NameUnavailabilityReason,
  CertificateProfile,
  CertificateProfileProperties,
  ProfileType,
  CertificateProfileStatus,
  Certificate,
  CertificateStatus,
  Revocation,
  RevocationStatus,
  ProxyResource,
  RevokeCertificateList,
  RevokeCertificate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownSkuName,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownNameUnavailabilityReason,
  KnownProfileType,
  KnownCertificateProfileStatus,
  KnownCertificateStatus,
  KnownRevocationStatus,
  KnownVersions,
} from "./models/index.js";
export type { CodeSigningClientOptionalParams } from "./api/index.js";
export type {
  CertificateProfilesRevokeCertificatesOptionalParams,
  CertificateProfilesListByCodeSigningAccountOptionalParams,
  CertificateProfilesDeleteOptionalParams,
  CertificateProfilesCreateOptionalParams,
  CertificateProfilesGetOptionalParams,
} from "./api/certificateProfiles/index.js";
export type {
  CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  CodeSigningAccountsListBySubscriptionOptionalParams,
  CodeSigningAccountsListByResourceGroupOptionalParams,
  CodeSigningAccountsDeleteOptionalParams,
  CodeSigningAccountsUpdateOptionalParams,
  CodeSigningAccountsCreateOptionalParams,
  CodeSigningAccountsGetOptionalParams,
} from "./api/codeSigningAccounts/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  CertificateProfilesOperations,
  CodeSigningAccountsOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
