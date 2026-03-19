// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CommunicationServiceManagementClient } from "./communicationServiceManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
  CommunicationServiceResource,
  CommunicationServiceProperties,
  CommunicationServicesProvisioningState,
  PublicNetworkAccess,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  CommunicationServiceResourceUpdate,
  CommunicationServiceUpdateProperties,
  TaggedResource,
  LinkNotificationHubParameters,
  LinkedNotificationHub,
  CommunicationServiceKeys,
  RegenerateKeyParameters,
  KeyType,
  NameAvailabilityParameters,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  DomainResource,
  DomainProperties,
  DomainsProvisioningState,
  DomainManagement,
  DomainPropertiesVerificationStates,
  VerificationStatusRecord,
  VerificationStatus,
  DomainPropertiesVerificationRecords,
  DnsRecord,
  UserEngagementTracking,
  UpdateDomainRequestParameters,
  UpdateDomainProperties,
  VerificationParameter,
  VerificationType,
  EmailServiceResource,
  EmailServiceProperties,
  EmailServicesProvisioningState,
  EmailServiceResourceUpdate,
  SenderUsernameResource,
  SenderUsernameProperties,
  ProvisioningState,
  ProxyResource,
  SmtpUsernameResource,
  SmtpUsernameProperties,
  SuppressionListResource,
  SuppressionListProperties,
  SuppressionListAddressResource,
  SuppressionListAddressProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCommunicationServicesProvisioningState,
  KnownPublicNetworkAccess,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownDomainsProvisioningState,
  KnownDomainManagement,
  KnownVerificationStatus,
  KnownUserEngagementTracking,
  KnownVerificationType,
  KnownEmailServicesProvisioningState,
  KnownProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { CommunicationServiceManagementClientOptionalParams } from "./api/index.js";
export type {
  CommunicationServicesCheckNameAvailabilityOptionalParams,
  CommunicationServicesRegenerateKeyOptionalParams,
  CommunicationServicesListKeysOptionalParams,
  CommunicationServicesLinkNotificationHubOptionalParams,
  CommunicationServicesListBySubscriptionOptionalParams,
  CommunicationServicesListByResourceGroupOptionalParams,
  CommunicationServicesDeleteOptionalParams,
  CommunicationServicesUpdateOptionalParams,
  CommunicationServicesCreateOrUpdateOptionalParams,
  CommunicationServicesGetOptionalParams,
} from "./api/communicationServices/index.js";
export type {
  DomainsCancelVerificationOptionalParams,
  DomainsInitiateVerificationOptionalParams,
  DomainsListByEmailServiceResourceOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "./api/domains/index.js";
export type {
  EmailServicesListVerifiedExchangeOnlineDomainsOptionalParams,
  EmailServicesListBySubscriptionOptionalParams,
  EmailServicesListByResourceGroupOptionalParams,
  EmailServicesDeleteOptionalParams,
  EmailServicesUpdateOptionalParams,
  EmailServicesCreateOrUpdateOptionalParams,
  EmailServicesGetOptionalParams,
} from "./api/emailServices/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SenderUsernamesListByDomainsOptionalParams,
  SenderUsernamesDeleteOptionalParams,
  SenderUsernamesCreateOrUpdateOptionalParams,
  SenderUsernamesGetOptionalParams,
} from "./api/senderUsernames/index.js";
export type {
  SmtpUsernamesListOptionalParams,
  SmtpUsernamesDeleteOptionalParams,
  SmtpUsernamesCreateOrUpdateOptionalParams,
  SmtpUsernamesGetOptionalParams,
} from "./api/smtpUsernames/index.js";
export type {
  SuppressionListAddressesListOptionalParams,
  SuppressionListAddressesDeleteOptionalParams,
  SuppressionListAddressesCreateOrUpdateOptionalParams,
  SuppressionListAddressesGetOptionalParams,
} from "./api/suppressionListAddresses/index.js";
export type {
  SuppressionListsListByDomainOptionalParams,
  SuppressionListsDeleteOptionalParams,
  SuppressionListsCreateOrUpdateOptionalParams,
  SuppressionListsGetOptionalParams,
} from "./api/suppressionLists/index.js";
export type {
  CommunicationServicesOperations,
  DomainsOperations,
  EmailServicesOperations,
  OperationsOperations,
  SenderUsernamesOperations,
  SmtpUsernamesOperations,
  SuppressionListAddressesOperations,
  SuppressionListsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
