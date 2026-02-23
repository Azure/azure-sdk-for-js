// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CodeSigningClient } from "./codeSigningClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
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
  CodeSigningAccount,
  CodeSigningAccountProperties,
  AccountSku,
  KnownSkuName,
  SkuName,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  CodeSigningAccountPatch,
  CodeSigningAccountPatchProperties,
  AccountSkuPatch,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
  KnownNameUnavailabilityReason,
  NameUnavailabilityReason,
  CertificateProfile,
  CertificateProfileProperties,
  KnownProfileType,
  ProfileType,
  KnownCertificateProfileStatus,
  CertificateProfileStatus,
  Certificate,
  KnownCertificateStatus,
  CertificateStatus,
  Revocation,
  KnownRevocationStatus,
  RevocationStatus,
  ProxyResource,
  RevokeCertificate,
  KnownVersions,
} from "./models/index.js";
export { CodeSigningClientOptionalParams } from "./api/index.js";
export {
  CertificateProfilesRevokeCertificateOptionalParams,
  CertificateProfilesListByCodeSigningAccountOptionalParams,
  CertificateProfilesDeleteOptionalParams,
  CertificateProfilesCreateOptionalParams,
  CertificateProfilesGetOptionalParams,
} from "./api/certificateProfiles/index.js";
export {
  CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  CodeSigningAccountsListBySubscriptionOptionalParams,
  CodeSigningAccountsListByResourceGroupOptionalParams,
  CodeSigningAccountsDeleteOptionalParams,
  CodeSigningAccountsUpdateOptionalParams,
  CodeSigningAccountsCreateOptionalParams,
  CodeSigningAccountsGetOptionalParams,
} from "./api/codeSigningAccounts/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  CertificateProfilesOperations,
  CodeSigningAccountsOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
