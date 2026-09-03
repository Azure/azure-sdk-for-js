// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { RelationshipsClient } from "./relationshipsClient.js";
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
  DependencyOfRelationshipCreateOrUpdate,
  DependencyOfRelationshipPropertiesCreateOrUpdate,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  DependencyOfRelationship,
  DependencyOfRelationshipProperties,
  RelationshipOriginInformation,
  RelationshipOrigins,
  RelationshipMetadata,
  ProvisioningState,
  ServiceGroupMemberRelationshipCreateOrUpdate,
  ServiceGroupMemberRelationshipPropertiesCreateOrUpdate,
  ServiceGroupMemberRelationship,
  ServiceGroupMemberRelationshipProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownRelationshipOrigins,
  KnownProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { RelationshipsClientOptionalParams } from "./api/index.js";
export type {
  DependencyOfRelationshipsDeleteOptionalParams,
  DependencyOfRelationshipsGetOptionalParams,
  DependencyOfRelationshipsCreateOrUpdateOptionalParams,
} from "./api/dependencyOfRelationships/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ServiceGroupMemberRelationshipsDeleteOptionalParams,
  ServiceGroupMemberRelationshipsGetOptionalParams,
  ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
} from "./api/serviceGroupMemberRelationships/index.js";
export type {
  DependencyOfRelationshipsOperations,
  OperationsOperations,
  ServiceGroupMemberRelationshipsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
