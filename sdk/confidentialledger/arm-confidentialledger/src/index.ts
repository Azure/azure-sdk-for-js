// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConfidentialLedgerClient } from "./confidentialLedgerClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ResourceProviderOperationDefinition,
  ResourceProviderOperationDisplay,
  ConfidentialLedger,
  LedgerProperties,
  RunningState,
  LedgerType,
  ProvisioningState,
  LedgerSku,
  AADBasedSecurityPrincipal,
  LedgerRoleName,
  CertBasedSecurityPrincipal,
  EnclavePlatform,
  ApplicationType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ConfidentialLedgerFilesExport,
  ConfidentialLedgerFilesExportResponse,
} from "./models/index.js";
export {
  KnownCheckNameAvailabilityReason,
  KnownRunningState,
  KnownLedgerType,
  KnownProvisioningState,
  KnownLedgerSku,
  KnownLedgerRoleName,
  KnownEnclavePlatform,
  KnownApplicationType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type {
  ConfidentialLedgerClientOptionalParams,
  CheckNameAvailabilityOptionalParams,
} from "./api/index.js";
export type {
  LedgerFilesExportOptionalParams,
  LedgerListBySubscriptionOptionalParams,
  LedgerListByResourceGroupOptionalParams,
  LedgerDeleteOptionalParams,
  LedgerUpdateOptionalParams,
  LedgerCreateOptionalParams,
  LedgerGetOptionalParams,
} from "./api/ledger/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { LedgerOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
