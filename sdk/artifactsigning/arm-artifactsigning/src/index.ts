// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CodeSigningClient } from "./codeSigningClient.js";
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
  type CodeSigningAccount,
  type CodeSigningAccountProperties,
  type AccountSku,
  KnownSkuName,
  type SkuName,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type CodeSigningAccountPatch,
  type CodeSigningAccountPatchProperties,
  type AccountSkuPatch,
  type CheckNameAvailability,
  type CheckNameAvailabilityResult,
  KnownNameUnavailabilityReason,
  type NameUnavailabilityReason,
  type CertificateProfile,
  type CertificateProfileProperties,
  KnownProfileType,
  type ProfileType,
  KnownCertificateProfileStatus,
  type CertificateProfileStatus,
  type Certificate,
  KnownCertificateStatus,
  type CertificateStatus,
  type Revocation,
  KnownRevocationStatus,
  type RevocationStatus,
  type ProxyResource,
  type RevokeCertificate,
  KnownVersions,
} from "./models/index.js";
export { type CodeSigningClientOptionalParams } from "./api/index.js";
export {
  type CertificateProfilesRevokeCertificateOptionalParams,
  type CertificateProfilesListByCodeSigningAccountOptionalParams,
  type CertificateProfilesDeleteOptionalParams,
  type CertificateProfilesCreateOptionalParams,
  type CertificateProfilesGetOptionalParams,
} from "./api/certificateProfiles/index.js";
export {
  type CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  type CodeSigningAccountsListBySubscriptionOptionalParams,
  type CodeSigningAccountsListByResourceGroupOptionalParams,
  type CodeSigningAccountsDeleteOptionalParams,
  type CodeSigningAccountsUpdateOptionalParams,
  type CodeSigningAccountsCreateOptionalParams,
  type CodeSigningAccountsGetOptionalParams,
} from "./api/codeSigningAccounts/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type CertificateProfilesOperations,
  type CodeSigningAccountsOperations,
  type OperationsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
