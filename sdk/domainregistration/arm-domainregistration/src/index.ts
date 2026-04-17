// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DomainRegistrationManagementClient } from "./domainRegistrationManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Domain,
  DomainProperties,
  Contact,
  Address,
  DomainStatus,
  ProvisioningState,
  HostName,
  AzureResourceType,
  CustomHostNameDnsRecordType,
  HostNameType,
  DomainPurchaseConsent,
  ResourceNotRenewableReason,
  DnsType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  DefaultErrorResponse,
  DefaultErrorResponseError,
  DefaultErrorResponseErrorDetailsItem,
  DomainPatchResource,
  DomainPatchResourceProperties,
  ProxyOnlyResource,
  DomainOwnershipIdentifier,
  DomainOwnershipIdentifierProperties,
  ProxyResource,
  NameIdentifier,
  DomainAvailabilityCheckResult,
  DomainType,
  DomainControlCenterSsoRequest,
  DomainRecommendationSearchParameters,
  TopLevelDomain,
  TopLevelDomainProperties,
  TopLevelDomainAgreementOption,
  TldLegalAgreement,
  CsmOperationDescription,
  CsmOperationDisplay,
  CsmOperationDescriptionProperties,
  ServiceSpecification,
  MetricSpecification,
  Dimension,
  MetricAvailability,
  LogSpecification,
} from "./models/index.js";
export {
  KnownResourceNotRenewableReason,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { DomainRegistrationManagementClientOptionalParams } from "./api/index.js";
export type { DomainRegistrationProviderListOperationsOptionalParams } from "./api/domainRegistrationProvider/index.js";
export type {
  DomainsListRecommendationsOptionalParams,
  DomainsGetControlCenterSsoRequestOptionalParams,
  DomainsCheckAvailabilityOptionalParams,
  DomainsListOwnershipIdentifiersOptionalParams,
  DomainsDeleteOwnershipIdentifierOptionalParams,
  DomainsUpdateOwnershipIdentifierOptionalParams,
  DomainsCreateOrUpdateOwnershipIdentifierOptionalParams,
  DomainsGetOwnershipIdentifierOptionalParams,
  DomainsTransferOutOptionalParams,
  DomainsRenewOptionalParams,
  DomainsListOptionalParams,
  DomainsListByResourceGroupOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "./api/domains/index.js";
export type {
  TopLevelDomainsListAgreementsOptionalParams,
  TopLevelDomainsListOptionalParams,
  TopLevelDomainsGetOptionalParams,
} from "./api/topLevelDomains/index.js";
export type {
  DomainRegistrationProviderOperations,
  DomainsOperations,
  TopLevelDomainsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
