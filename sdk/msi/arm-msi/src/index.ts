// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ManagedServiceIdentityClient } from "./managedServiceIdentityClient.js";
export type {
  Operation,
  OperationDisplay,
  CloudError,
  CloudErrorBody,
  SystemAssignedIdentity,
  SystemAssignedIdentityProperties,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  FederatedIdentityCredential,
  FederatedIdentityCredentialProperties,
  ClaimsMatchingExpression,
  ProxyResource,
  Identity,
  UserAssignedIdentityProperties,
  IsolationScope,
  AssignmentRestrictions,
  TrackedResource,
  IdentityUpdate,
} from "./models/index.js";
export { KnownCreatedByType, KnownIsolationScope, KnownVersions } from "./models/index.js";
export type { ManagedServiceIdentityClientOptionalParams } from "./api/index.js";
export type {
  FederatedIdentityCredentialsListOptionalParams,
  FederatedIdentityCredentialsDeleteOptionalParams,
  FederatedIdentityCredentialsCreateOrUpdateOptionalParams,
  FederatedIdentityCredentialsGetOptionalParams,
} from "./api/federatedIdentityCredentials/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { SystemAssignedIdentitiesGetByScopeOptionalParams } from "./api/systemAssignedIdentities/index.js";
export type {
  UserAssignedIdentitiesListBySubscriptionOptionalParams,
  UserAssignedIdentitiesListByResourceGroupOptionalParams,
  UserAssignedIdentitiesDeleteOptionalParams,
  UserAssignedIdentitiesUpdateOptionalParams,
  UserAssignedIdentitiesCreateOrUpdateOptionalParams,
  UserAssignedIdentitiesGetOptionalParams,
} from "./api/userAssignedIdentities/index.js";
export type {
  FederatedIdentityCredentialsOperations,
  OperationsOperations,
  SystemAssignedIdentitiesOperations,
  UserAssignedIdentitiesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
