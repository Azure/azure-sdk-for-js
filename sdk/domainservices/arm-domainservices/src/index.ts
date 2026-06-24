// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DomainServicesResourceProvider } from "./domainServicesResourceProvider.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DomainService,
  DomainServiceProperties,
  ReplicaSet,
  HealthMonitor,
  HealthAlert,
  LdapsSettings,
  Ldaps,
  ExternalAccess,
  ResourceForestSettings,
  ForestTrust,
  DomainSecuritySettings,
  NtlmV1,
  TlsV1,
  SyncNtlmPasswords,
  SyncKerberosPasswords,
  SyncOnPremPasswords,
  KerberosRc4Encryption,
  KerberosArmoring,
  LdapSigning,
  ChannelBinding,
  SyncOnPremSamAccountName,
  FilteredSync,
  SyncScope,
  NotificationSettings,
  NotifyGlobalAdmins,
  NotifyDcAdmins,
  MigrationProperties,
  MigrationProgress,
  ConfigDiagnostics,
  ConfigDiagnosticsValidatorResult,
  Status,
  ConfigDiagnosticsValidatorResultIssue,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CloudError,
  CloudErrorBody,
  UnsuspendDomainServiceResponse,
  OperationEntity,
  OperationDisplayInfo,
  OuContainer,
  OuContainerProperties,
  ContainerAccount,
} from "./models/index.js";
export {
  KnownLdaps,
  KnownExternalAccess,
  KnownNtlmV1,
  KnownTlsV1,
  KnownSyncNtlmPasswords,
  KnownSyncKerberosPasswords,
  KnownSyncOnPremPasswords,
  KnownKerberosRc4Encryption,
  KnownKerberosArmoring,
  KnownLdapSigning,
  KnownChannelBinding,
  KnownSyncOnPremSamAccountName,
  KnownFilteredSync,
  KnownSyncScope,
  KnownNotifyGlobalAdmins,
  KnownNotifyDcAdmins,
  KnownStatus,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { DomainServicesResourceProviderOptionalParams } from "./api/index.js";
export type { DomainServiceOperationsListOptionalParams } from "./api/domainServiceOperations/index.js";
export type {
  DomainServicesUnsuspendOptionalParams,
  DomainServicesListOptionalParams,
  DomainServicesListByResourceGroupOptionalParams,
  DomainServicesDeleteOptionalParams,
  DomainServicesUpdateOptionalParams,
  DomainServicesCreateOrUpdateOptionalParams,
  DomainServicesGetOptionalParams,
} from "./api/domainServices/index.js";
export type {
  OuContainerOperationGrpListOptionalParams,
  OuContainerOperationGrpDeleteOptionalParams,
  OuContainerOperationGrpUpdateOptionalParams,
  OuContainerOperationGrpCreateOptionalParams,
  OuContainerOperationGrpGetOptionalParams,
} from "./api/ouContainerOperationGrp/index.js";
export type {
  DomainServiceOperationsOperations,
  DomainServicesOperations,
  OuContainerOperationGrpOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
