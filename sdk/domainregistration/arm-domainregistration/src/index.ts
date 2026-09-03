// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, type AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DomainRegistrationManagementClient } from "./domainRegistrationManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Domain,
  type DomainProperties,
  type Contact,
  type Address,
  type DomainStatus,
  type ProvisioningState,
  type HostName,
  type AzureResourceType,
  type CustomHostNameDnsRecordType,
  type HostNameType,
  type DomainPurchaseConsent,
  KnownResourceNotRenewableReason,
  type ResourceNotRenewableReason,
  type DnsType,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type DefaultErrorResponse,
  type DefaultErrorResponseError,
  type DefaultErrorResponseErrorDetailsItem,
  type DomainPatchResource,
  type DomainPatchResourceProperties,
  type ProxyOnlyResource,
  type DomainOwnershipIdentifier,
  type DomainOwnershipIdentifierProperties,
  type ProxyResource,
  type NameIdentifier,
  type DomainAvailabilityCheckResult,
  type DomainType,
  type DomainControlCenterSsoRequest,
  type DomainRecommendationSearchParameters,
  type TopLevelDomain,
  type TopLevelDomainProperties,
  type TopLevelDomainAgreementOption,
  type TldLegalAgreement,
  type CsmOperationDescription,
  type CsmOperationDisplay,
  type CsmOperationDescriptionProperties,
  type ServiceSpecification,
  type MetricSpecification,
  type Dimension,
  type MetricAvailability,
  type LogSpecification,
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
export { AzureClouds, type AzureSupportedClouds };
