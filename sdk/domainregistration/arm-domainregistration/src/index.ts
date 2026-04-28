// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DomainRegistrationManagementClient } from "./domainRegistrationManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
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
  KnownResourceNotRenewableReason,
  ResourceNotRenewableReason,
  DnsType,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
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
  KnownVersions,
} from "./models/index.js";
export { DomainRegistrationManagementClientOptionalParams } from "./api/index.js";
export { DomainRegistrationProviderListOperationsOptionalParams } from "./api/domainRegistrationProvider/index.js";
export {
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
export {
  TopLevelDomainsListAgreementsOptionalParams,
  TopLevelDomainsListOptionalParams,
  TopLevelDomainsGetOptionalParams,
} from "./api/topLevelDomains/index.js";
export {
  DomainRegistrationProviderOperations,
  DomainsOperations,
  TopLevelDomainsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
