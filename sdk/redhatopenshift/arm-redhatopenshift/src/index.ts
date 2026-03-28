// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureRedHatOpenShiftClient } from "./azureRedHatOpenShiftClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  Display,
  CloudError,
  CloudErrorBody,
  OpenShiftVersion,
  OpenShiftVersionProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  PlatformWorkloadIdentityRoleSet,
  PlatformWorkloadIdentityRoleSetProperties,
  PlatformWorkloadIdentityRole,
  OpenShiftCluster,
  OpenShiftClusterProperties,
  ProvisioningState,
  ClusterProfile,
  FipsValidatedModules,
  ConsoleProfile,
  ServicePrincipalProfile,
  PlatformWorkloadIdentityProfile,
  PlatformWorkloadIdentity,
  NetworkProfile,
  OutboundType,
  LoadBalancerProfile,
  ManagedOutboundIPs,
  EffectiveOutboundIP,
  PreconfiguredNSG,
  MasterProfile,
  EncryptionAtHost,
  WorkerProfile,
  APIServerProfile,
  Visibility,
  IngressProfile,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  OpenShiftClusterUpdate,
  OpenShiftClusterAdminKubeconfig,
  OpenShiftClusterCredentials,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownProvisioningState,
  KnownFipsValidatedModules,
  KnownOutboundType,
  KnownPreconfiguredNSG,
  KnownEncryptionAtHost,
  KnownVisibility,
  KnownManagedServiceIdentityType,
  KnownVersions,
} from "./models/index.js";
export type { AzureRedHatOpenShiftClientOptionalParams } from "./api/index.js";
export type {
  OpenShiftClustersListCredentialsOptionalParams,
  OpenShiftClustersListAdminCredentialsOptionalParams,
  OpenShiftClustersListOptionalParams,
  OpenShiftClustersListByResourceGroupOptionalParams,
  OpenShiftClustersDeleteOptionalParams,
  OpenShiftClustersUpdateOptionalParams,
  OpenShiftClustersCreateOrUpdateOptionalParams,
  OpenShiftClustersGetOptionalParams,
} from "./api/openShiftClusters/index.js";
export type {
  OpenShiftVersionsListOptionalParams,
  OpenShiftVersionsGetOptionalParams,
} from "./api/openShiftVersions/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { PlatformWorkloadIdentityRoleSetGetOptionalParams } from "./api/platformWorkloadIdentityRoleSet/index.js";
export type { PlatformWorkloadIdentityRoleSetsListOptionalParams } from "./api/platformWorkloadIdentityRoleSets/index.js";
export type {
  OpenShiftClustersOperations,
  OpenShiftVersionsOperations,
  OperationsOperations,
  PlatformWorkloadIdentityRoleSetOperations,
  PlatformWorkloadIdentityRoleSetsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
