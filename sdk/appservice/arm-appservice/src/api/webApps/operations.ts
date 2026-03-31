// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  Identifier,
  _IdentifierCollection,
  User,
  _WebAppCollection,
  Site,
  PushSettings,
  Operation,
  PrivateLinkResourcesWrapper,
  _CsmUsageQuotaCollection,
  CsmUsageQuota,
  RemotePrivateEndpointConnectionARMResource,
  _PrivateEndpointConnectionCollection,
  StringDictionary,
  SitePatchResource,
  CustomHostnameAnalysisResult,
  CsmSlotEntity,
  BackupRequest,
  BackupItem,
  SiteAuthSettings,
  AzureStoragePropertyDictionaryResource,
  ConnectionStringDictionary,
  RestoreRequest,
  HostKeys,
  KeyInfo,
  HybridConnection,
  RelayServiceConnectionEntity,
  SiteCloneability,
  _BackupItemCollection,
  FunctionSecrets,
  NetworkTrace,
  _PerfMonCounterCollection,
  PerfMonResponse,
  SitePhpErrorLogFlag,
  PremierAddOn,
  CsmPublishingProfileOptions,
  DeletedAppRestoreRequest,
  SnapshotRestoreRequest,
  _SlotDifferenceCollection,
  SlotDifference,
  _SnapshotCollection,
  Snapshot,
  WorkflowEnvelope,
  VnetInfoResource,
  VnetGateway,
  StorageMigrationOptions,
  StorageMigrationResponse,
  MigrateMySqlRequest,
  CsmPublishingCredentialsPoliciesEntity,
  _PublishingCredentialsPoliciesCollection,
  SiteAuthSettingsV2,
  ApiKVReference,
  _ApiKVReferenceCollection,
  SiteLogsConfig,
  SlotConfigNamesResource,
  SiteConfigResource,
  _SiteConfigurationSnapshotInfoCollection,
  SiteConfigurationSnapshotInfo,
  _SiteConfigResourceCollection,
  ContinuousWebJob,
  _ContinuousWebJobCollection,
  CsmDeploymentStatus,
  _CsmDeploymentStatusCollection,
  Deployment,
  _DeploymentCollection,
  MSDeployStatus,
  MSDeploy,
  MSDeployLog,
  FunctionEnvelope,
  _FunctionEnvelopeCollection,
  HostNameBinding,
  _HostNameBindingCollection,
  WebSiteInstanceStatus,
  _WebAppInstanceStatusCollection,
  ProcessInfo,
  ProcessThreadInfo,
  ProcessModuleInfo,
  _ProcessInfoCollection,
  _ProcessThreadInfoCollection,
  _ProcessModuleInfoCollection,
  MigrateMySqlStatus,
  SwiftVirtualNetwork,
  NetworkFeatures,
  PremierAddOnPatchResource,
  PrivateAccess,
  PublicCertificate,
  _PublicCertificateCollection,
  SiteContainer,
  _SiteContainerCollection,
  SiteExtensionInfo,
  _SiteExtensionInfoCollection,
  SiteSourceControl,
  TriggeredWebJob,
  _TriggeredWebJobCollection,
  TriggeredJobHistory,
  _TriggeredJobHistoryCollection,
  WebJob,
  _WebJobCollection,
  _WorkflowEnvelopeCollection,
  WebAppsGetProcessDumpSlotResponse,
  WebAppsGetInstanceProcessDumpSlotResponse,
  WebAppsGetProcessDumpResponse,
  WebAppsGetInstanceProcessDumpResponse,
  WebAppsListPublishingProfileXmlWithSecretsResponse,
  WebAppsStartWebSiteNetworkTraceResponse,
  WebAppsUpdateMachineKeyResponse,
  WebAppsGetFunctionsAdminTokenResponse,
  WebAppsCreateOneDeployOperationResponse,
  WebAppsGetOneDeployStatusResponse,
  WebAppsGetContainerLogsZipResponse,
  WebAppsGetWebSiteContainerLogsResponse,
  WebAppsListPublishingProfileXmlWithSecretsSlotResponse,
  WebAppsStartWebSiteNetworkTraceSlotResponse,
  WebAppsGetFunctionsAdminTokenSlotResponse,
  WebAppsGetContainerLogsZipSlotResponse,
  WebAppsGetWebSiteContainerLogsSlotResponse,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  identifierSerializer,
  identifierDeserializer,
  _identifierCollectionDeserializer,
  userDeserializer,
  _webAppCollectionDeserializer,
  siteSerializer,
  siteDeserializer,
  pushSettingsSerializer,
  pushSettingsDeserializer,
  operationDeserializer,
  privateLinkResourcesWrapperDeserializer,
  _csmUsageQuotaCollectionDeserializer,
  remotePrivateEndpointConnectionARMResourceSerializer,
  remotePrivateEndpointConnectionARMResourceDeserializer,
  _privateEndpointConnectionCollectionDeserializer,
  stringDictionarySerializer,
  stringDictionaryDeserializer,
  sitePatchResourceSerializer,
  customHostnameAnalysisResultDeserializer,
  csmSlotEntitySerializer,
  backupRequestSerializer,
  backupRequestDeserializer,
  backupItemDeserializer,
  siteAuthSettingsSerializer,
  siteAuthSettingsDeserializer,
  azureStoragePropertyDictionaryResourceSerializer,
  azureStoragePropertyDictionaryResourceDeserializer,
  connectionStringDictionarySerializer,
  connectionStringDictionaryDeserializer,
  restoreRequestSerializer,
  restoreRequestDeserializer,
  hostKeysDeserializer,
  keyInfoSerializer,
  keyInfoDeserializer,
  hybridConnectionSerializer,
  hybridConnectionDeserializer,
  relayServiceConnectionEntitySerializer,
  relayServiceConnectionEntityDeserializer,
  siteCloneabilityDeserializer,
  _backupItemCollectionDeserializer,
  functionSecretsDeserializer,
  _perfMonCounterCollectionDeserializer,
  sitePhpErrorLogFlagDeserializer,
  premierAddOnSerializer,
  premierAddOnDeserializer,
  csmPublishingProfileOptionsSerializer,
  deletedAppRestoreRequestSerializer,
  snapshotRestoreRequestSerializer,
  _slotDifferenceCollectionDeserializer,
  _snapshotCollectionDeserializer,
  workflowArtifactsSerializer,
  workflowEnvelopeDeserializer,
  vnetInfoResourceSerializer,
  vnetInfoResourceDeserializer,
  vnetGatewaySerializer,
  vnetGatewayDeserializer,
  storageMigrationOptionsSerializer,
  storageMigrationResponseDeserializer,
  migrateMySqlRequestSerializer,
  csmPublishingCredentialsPoliciesEntitySerializer,
  csmPublishingCredentialsPoliciesEntityDeserializer,
  _publishingCredentialsPoliciesCollectionDeserializer,
  siteAuthSettingsV2Serializer,
  siteAuthSettingsV2Deserializer,
  apiKVReferenceDeserializer,
  _apiKVReferenceCollectionDeserializer,
  siteLogsConfigSerializer,
  siteLogsConfigDeserializer,
  slotConfigNamesResourceSerializer,
  slotConfigNamesResourceDeserializer,
  siteConfigResourceSerializer,
  siteConfigResourceDeserializer,
  _siteConfigurationSnapshotInfoCollectionDeserializer,
  _siteConfigResourceCollectionDeserializer,
  continuousWebJobDeserializer,
  _continuousWebJobCollectionDeserializer,
  csmDeploymentStatusDeserializer,
  _csmDeploymentStatusCollectionDeserializer,
  deploymentSerializer,
  deploymentDeserializer,
  _deploymentCollectionDeserializer,
  msDeployStatusDeserializer,
  msDeploySerializer,
  msDeployLogDeserializer,
  functionEnvelopeSerializer,
  functionEnvelopeDeserializer,
  _functionEnvelopeCollectionDeserializer,
  hostNameBindingSerializer,
  hostNameBindingDeserializer,
  _hostNameBindingCollectionDeserializer,
  webSiteInstanceStatusDeserializer,
  _webAppInstanceStatusCollectionDeserializer,
  processInfoDeserializer,
  processModuleInfoDeserializer,
  _processInfoCollectionDeserializer,
  _processThreadInfoCollectionDeserializer,
  _processModuleInfoCollectionDeserializer,
  migrateMySqlStatusDeserializer,
  swiftVirtualNetworkSerializer,
  swiftVirtualNetworkDeserializer,
  networkFeaturesDeserializer,
  premierAddOnPatchResourceSerializer,
  privateAccessSerializer,
  privateAccessDeserializer,
  publicCertificateSerializer,
  publicCertificateDeserializer,
  _publicCertificateCollectionDeserializer,
  siteContainerSerializer,
  siteContainerDeserializer,
  _siteContainerCollectionDeserializer,
  siteExtensionInfoDeserializer,
  _siteExtensionInfoCollectionDeserializer,
  siteSourceControlSerializer,
  siteSourceControlDeserializer,
  triggeredWebJobDeserializer,
  _triggeredWebJobCollectionDeserializer,
  triggeredJobHistoryDeserializer,
  _triggeredJobHistoryCollectionDeserializer,
  webJobDeserializer,
  _webJobCollectionDeserializer,
  _workflowEnvelopeCollectionDeserializer,
  vnetInfoResourceArrayDeserializer,
  networkTraceArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { getBinaryResponse } from "../../static-helpers/serialization/get-binary-response.js";
import { getBinaryStreamResponse } from "../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WebAppsListWorkflowsOptionalParams,
  WebAppsGetWorkflowOptionalParams,
  WebAppsListInstanceWorkflowsSlotOptionalParams,
  WebAppsGetInstanceWorkflowSlotOptionalParams,
  WebAppsListWebJobsOptionalParams,
  WebAppsGetWebJobOptionalParams,
  WebAppsListWebJobsSlotOptionalParams,
  WebAppsGetWebJobSlotOptionalParams,
  WebAppsListTriggeredWebJobHistoryOptionalParams,
  WebAppsGetTriggeredWebJobHistoryOptionalParams,
  WebAppsListTriggeredWebJobHistorySlotOptionalParams,
  WebAppsGetTriggeredWebJobHistorySlotOptionalParams,
  WebAppsRunTriggeredWebJobOptionalParams,
  WebAppsListTriggeredWebJobsOptionalParams,
  WebAppsDeleteTriggeredWebJobOptionalParams,
  WebAppsGetTriggeredWebJobOptionalParams,
  WebAppsRunTriggeredWebJobSlotOptionalParams,
  WebAppsListTriggeredWebJobsSlotOptionalParams,
  WebAppsDeleteTriggeredWebJobSlotOptionalParams,
  WebAppsGetTriggeredWebJobSlotOptionalParams,
  WebAppsDeleteSourceControlOptionalParams,
  WebAppsUpdateSourceControlOptionalParams,
  WebAppsCreateOrUpdateSourceControlOptionalParams,
  WebAppsGetSourceControlOptionalParams,
  WebAppsDeleteSourceControlSlotOptionalParams,
  WebAppsUpdateSourceControlSlotOptionalParams,
  WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
  WebAppsGetSourceControlSlotOptionalParams,
  WebAppsListSiteExtensionsSlotOptionalParams,
  WebAppsDeleteSiteExtensionSlotOptionalParams,
  WebAppsInstallSiteExtensionSlotOptionalParams,
  WebAppsGetSiteExtensionSlotOptionalParams,
  WebAppsListSiteExtensionsOptionalParams,
  WebAppsDeleteSiteExtensionOptionalParams,
  WebAppsInstallSiteExtensionOptionalParams,
  WebAppsGetSiteExtensionOptionalParams,
  WebAppsListSiteContainersSlotOptionalParams,
  WebAppsDeleteSiteContainerSlotOptionalParams,
  WebAppsCreateOrUpdateSiteContainerSlotOptionalParams,
  WebAppsGetSiteContainerSlotOptionalParams,
  WebAppsListSiteContainersOptionalParams,
  WebAppsDeleteSiteContainerOptionalParams,
  WebAppsCreateOrUpdateSiteContainerOptionalParams,
  WebAppsGetSiteContainerOptionalParams,
  WebAppsListPublicCertificatesSlotOptionalParams,
  WebAppsDeletePublicCertificateSlotOptionalParams,
  WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams,
  WebAppsGetPublicCertificateSlotOptionalParams,
  WebAppsListPublicCertificatesOptionalParams,
  WebAppsDeletePublicCertificateOptionalParams,
  WebAppsCreateOrUpdatePublicCertificateOptionalParams,
  WebAppsGetPublicCertificateOptionalParams,
  WebAppsPutPrivateAccessVnetSlotOptionalParams,
  WebAppsGetPrivateAccessSlotOptionalParams,
  WebAppsPutPrivateAccessVnetOptionalParams,
  WebAppsGetPrivateAccessOptionalParams,
  WebAppsDeletePremierAddOnSlotOptionalParams,
  WebAppsUpdatePremierAddOnSlotOptionalParams,
  WebAppsAddPremierAddOnSlotOptionalParams,
  WebAppsGetPremierAddOnSlotOptionalParams,
  WebAppsDeletePremierAddOnOptionalParams,
  WebAppsUpdatePremierAddOnOptionalParams,
  WebAppsAddPremierAddOnOptionalParams,
  WebAppsGetPremierAddOnOptionalParams,
  WebAppsListNetworkFeaturesSlotOptionalParams,
  WebAppsListNetworkFeaturesOptionalParams,
  WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams,
  WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
  WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
  WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams,
  WebAppsDeleteSwiftVirtualNetworkOptionalParams,
  WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
  WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
  WebAppsGetSwiftVirtualNetworkConnectionOptionalParams,
  WebAppsGetMigrateMySqlStatusSlotOptionalParams,
  WebAppsGetMigrateMySqlStatusOptionalParams,
  WebAppsListProcessModulesSlotOptionalParams,
  WebAppsGetProcessModuleSlotOptionalParams,
  WebAppsListInstanceProcessModulesSlotOptionalParams,
  WebAppsGetInstanceProcessModuleSlotOptionalParams,
  WebAppsListProcessModulesOptionalParams,
  WebAppsGetProcessModuleOptionalParams,
  WebAppsListInstanceProcessModulesOptionalParams,
  WebAppsGetInstanceProcessModuleOptionalParams,
  WebAppsListProcessThreadsSlotOptionalParams,
  WebAppsGetProcessDumpSlotOptionalParams,
  WebAppsListProcessesSlotOptionalParams,
  WebAppsDeleteProcessSlotOptionalParams,
  WebAppsGetProcessSlotOptionalParams,
  WebAppsListInstanceProcessThreadsSlotOptionalParams,
  WebAppsGetInstanceProcessDumpSlotOptionalParams,
  WebAppsListInstanceProcessesSlotOptionalParams,
  WebAppsDeleteInstanceProcessSlotOptionalParams,
  WebAppsGetInstanceProcessSlotOptionalParams,
  WebAppsListProcessThreadsOptionalParams,
  WebAppsGetProcessDumpOptionalParams,
  WebAppsListProcessesOptionalParams,
  WebAppsDeleteProcessOptionalParams,
  WebAppsGetProcessOptionalParams,
  WebAppsListInstanceProcessThreadsOptionalParams,
  WebAppsGetInstanceProcessDumpOptionalParams,
  WebAppsListInstanceProcessesOptionalParams,
  WebAppsDeleteInstanceProcessOptionalParams,
  WebAppsGetInstanceProcessOptionalParams,
  WebAppsListInstanceIdentifiersSlotOptionalParams,
  WebAppsGetInstanceInfoSlotOptionalParams,
  WebAppsListInstanceIdentifiersOptionalParams,
  WebAppsGetInstanceInfoOptionalParams,
  WebAppsDeleteRelayServiceConnectionSlotOptionalParams,
  WebAppsUpdateRelayServiceConnectionSlotOptionalParams,
  WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams,
  WebAppsGetRelayServiceConnectionSlotOptionalParams,
  WebAppsDeleteRelayServiceConnectionOptionalParams,
  WebAppsUpdateRelayServiceConnectionOptionalParams,
  WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams,
  WebAppsGetRelayServiceConnectionOptionalParams,
  WebAppsListHostNameBindingsSlotOptionalParams,
  WebAppsDeleteHostNameBindingSlotOptionalParams,
  WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams,
  WebAppsGetHostNameBindingSlotOptionalParams,
  WebAppsListHostNameBindingsOptionalParams,
  WebAppsDeleteHostNameBindingOptionalParams,
  WebAppsCreateOrUpdateHostNameBindingOptionalParams,
  WebAppsGetHostNameBindingOptionalParams,
  WebAppsListFunctionSecretsSlotOptionalParams,
  WebAppsListFunctionKeysSlotOptionalParams,
  WebAppsDeleteFunctionSecretSlotOptionalParams,
  WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams,
  WebAppsListInstanceFunctionsSlotOptionalParams,
  WebAppsDeleteInstanceFunctionSlotOptionalParams,
  WebAppsCreateInstanceFunctionSlotOptionalParams,
  WebAppsGetInstanceFunctionSlotOptionalParams,
  WebAppsListFunctionSecretsOptionalParams,
  WebAppsListFunctionKeysOptionalParams,
  WebAppsDeleteFunctionSecretOptionalParams,
  WebAppsCreateOrUpdateFunctionSecretOptionalParams,
  WebAppsListFunctionsOptionalParams,
  WebAppsDeleteFunctionOptionalParams,
  WebAppsCreateFunctionOptionalParams,
  WebAppsGetFunctionOptionalParams,
  WebAppsGetInstanceMSDeployLogSlotOptionalParams,
  WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
  WebAppsGetInstanceMsDeployStatusSlotOptionalParams,
  WebAppsGetMSDeployLogSlotOptionalParams,
  WebAppsCreateMSDeployOperationSlotOptionalParams,
  WebAppsGetMSDeployStatusSlotOptionalParams,
  WebAppsGetInstanceMSDeployLogOptionalParams,
  WebAppsCreateInstanceMSDeployOperationOptionalParams,
  WebAppsGetInstanceMsDeployStatusOptionalParams,
  WebAppsGetMSDeployLogOptionalParams,
  WebAppsCreateMSDeployOperationOptionalParams,
  WebAppsGetMSDeployStatusOptionalParams,
  WebAppsListDomainOwnershipIdentifiersSlotOptionalParams,
  WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams,
  WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams,
  WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams,
  WebAppsGetDomainOwnershipIdentifierSlotOptionalParams,
  WebAppsListDomainOwnershipIdentifiersOptionalParams,
  WebAppsDeleteDomainOwnershipIdentifierOptionalParams,
  WebAppsUpdateDomainOwnershipIdentifierOptionalParams,
  WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams,
  WebAppsGetDomainOwnershipIdentifierOptionalParams,
  WebAppsListDeploymentLogSlotOptionalParams,
  WebAppsListDeploymentsSlotOptionalParams,
  WebAppsDeleteDeploymentSlotOptionalParams,
  WebAppsCreateDeploymentSlotOptionalParams,
  WebAppsGetDeploymentSlotOptionalParams,
  WebAppsListDeploymentLogOptionalParams,
  WebAppsListDeploymentsOptionalParams,
  WebAppsDeleteDeploymentOptionalParams,
  WebAppsCreateDeploymentOptionalParams,
  WebAppsGetDeploymentOptionalParams,
  WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams,
  WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
  WebAppsListProductionSiteDeploymentStatusesOptionalParams,
  WebAppsGetProductionSiteDeploymentStatusOptionalParams,
  WebAppsStopContinuousWebJobSlotOptionalParams,
  WebAppsStartContinuousWebJobSlotOptionalParams,
  WebAppsListContinuousWebJobsSlotOptionalParams,
  WebAppsDeleteContinuousWebJobSlotOptionalParams,
  WebAppsGetContinuousWebJobSlotOptionalParams,
  WebAppsStopContinuousWebJobOptionalParams,
  WebAppsStartContinuousWebJobOptionalParams,
  WebAppsListContinuousWebJobsOptionalParams,
  WebAppsDeleteContinuousWebJobOptionalParams,
  WebAppsGetContinuousWebJobOptionalParams,
  WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams,
  WebAppsListConfigurationsSlotOptionalParams,
  WebAppsGetConfigurationSnapshotSlotOptionalParams,
  WebAppsListConfigurationSnapshotInfoSlotOptionalParams,
  WebAppsUpdateConfigurationSlotOptionalParams,
  WebAppsCreateOrUpdateConfigurationSlotOptionalParams,
  WebAppsGetConfigurationSlotOptionalParams,
  WebAppsRecoverSiteConfigurationSnapshotOptionalParams,
  WebAppsListConfigurationsOptionalParams,
  WebAppsGetConfigurationSnapshotOptionalParams,
  WebAppsListConfigurationSnapshotInfoOptionalParams,
  WebAppsUpdateConfigurationOptionalParams,
  WebAppsCreateOrUpdateConfigurationOptionalParams,
  WebAppsGetConfigurationOptionalParams,
  WebAppsUpdateSlotConfigurationNamesOptionalParams,
  WebAppsListSlotConfigurationNamesOptionalParams,
  WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams,
  WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams,
  WebAppsUpdateDiagnosticLogsConfigOptionalParams,
  WebAppsGetDiagnosticLogsConfigurationOptionalParams,
  WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams,
  WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams,
  WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams,
  WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams,
  WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams,
  WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams,
  WebAppsListAppSettingsKeyVaultReferencesOptionalParams,
  WebAppsGetAppSettingKeyVaultReferenceOptionalParams,
  WebAppsGetAuthSettingsV2SlotOptionalParams,
  WebAppsUpdateAuthSettingsV2SlotOptionalParams,
  WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams,
  WebAppsGetAuthSettingsV2OptionalParams,
  WebAppsUpdateAuthSettingsV2OptionalParams,
  WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams,
  WebAppsUpdateScmAllowedSlotOptionalParams,
  WebAppsGetScmAllowedSlotOptionalParams,
  WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams,
  WebAppsUpdateFtpAllowedSlotOptionalParams,
  WebAppsGetFtpAllowedSlotOptionalParams,
  WebAppsUpdateScmAllowedOptionalParams,
  WebAppsGetScmAllowedOptionalParams,
  WebAppsListBasicPublishingCredentialsPoliciesOptionalParams,
  WebAppsUpdateFtpAllowedOptionalParams,
  WebAppsGetFtpAllowedOptionalParams,
  WebAppsRestoreSlotOptionalParams,
  WebAppsListBackupStatusSecretsSlotOptionalParams,
  WebAppsListBackupsSlotOptionalParams,
  WebAppsDeleteBackupSlotOptionalParams,
  WebAppsGetBackupStatusSlotOptionalParams,
  WebAppsRestoreOptionalParams,
  WebAppsListBackupStatusSecretsOptionalParams,
  WebAppsListBackupsOptionalParams,
  WebAppsDeleteBackupOptionalParams,
  WebAppsGetBackupStatusOptionalParams,
  WebAppsListWorkflowsConnectionsOptionalParams,
  WebAppsDeployWorkflowArtifactsOptionalParams,
  WebAppsListUsagesOptionalParams,
  WebAppsSyncFunctionTriggersOptionalParams,
  WebAppsSyncRepositoryOptionalParams,
  WebAppsStopNetworkTraceOptionalParams,
  WebAppsStopOptionalParams,
  WebAppsStartNetworkTraceOptionalParams,
  WebAppsStartOptionalParams,
  WebAppsListSnapshotsFromDRSecondaryOptionalParams,
  WebAppsListSnapshotsOptionalParams,
  WebAppsSwapSlotWithProductionOptionalParams,
  WebAppsListSlotDifferencesFromProductionOptionalParams,
  WebAppsRestoreSnapshotOptionalParams,
  WebAppsRestoreFromDeletedAppOptionalParams,
  WebAppsRestoreFromBackupBlobOptionalParams,
  WebAppsRestartOptionalParams,
  WebAppsResetProductionSlotConfigOptionalParams,
  WebAppsListPublishingProfileXmlWithSecretsOptionalParams,
  WebAppsGetPrivateLinkResourcesOptionalParams,
  WebAppsListPremierAddOnsOptionalParams,
  WebAppsGetSitePhpErrorLogFlagOptionalParams,
  WebAppsListPerfMonCountersOptionalParams,
  WebAppsGenerateNewSitePublishingPasswordOptionalParams,
  WebAppsGetNetworkTracesV2OptionalParams,
  WebAppsGetNetworkTraceOperationV2OptionalParams,
  WebAppsGetNetworkTracesOptionalParams,
  WebAppsStopWebSiteNetworkTraceOptionalParams,
  WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
  WebAppsStartWebSiteNetworkTraceOptionalParams,
  WebAppsGetNetworkTraceOperationOptionalParams,
  WebAppsMigrateMySqlOptionalParams,
  WebAppsMigrateStorageOptionalParams,
  WebAppsUpdateMachineKeyOptionalParams,
  WebAppsListSyncFunctionTriggersOptionalParams,
  WebAppsListSiteBackupsOptionalParams,
  WebAppsIsCloneableOptionalParams,
  WebAppsListRelayServiceConnectionsOptionalParams,
  WebAppsListHybridConnectionsOptionalParams,
  WebAppsDeleteHostSecretOptionalParams,
  WebAppsCreateOrUpdateHostSecretOptionalParams,
  WebAppsSyncFunctionsOptionalParams,
  WebAppsListSyncStatusOptionalParams,
  WebAppsListHostKeysOptionalParams,
  WebAppsGetFunctionsAdminTokenOptionalParams,
  WebAppsCreateOneDeployOperationOptionalParams,
  WebAppsGetOneDeployStatusOptionalParams,
  WebAppsDiscoverBackupOptionalParams,
  WebAppsGetContainerLogsZipOptionalParams,
  WebAppsGetWebSiteContainerLogsOptionalParams,
  WebAppsListSitePushSettingsOptionalParams,
  WebAppsUpdateSitePushSettingsOptionalParams,
  WebAppsListPublishingCredentialsOptionalParams,
  WebAppsListMetadataOptionalParams,
  WebAppsUpdateMetadataOptionalParams,
  WebAppsListConnectionStringsOptionalParams,
  WebAppsUpdateConnectionStringsOptionalParams,
  WebAppsGetBackupConfigurationOptionalParams,
  WebAppsDeleteBackupConfigurationOptionalParams,
  WebAppsUpdateBackupConfigurationOptionalParams,
  WebAppsListAzureStorageAccountsOptionalParams,
  WebAppsUpdateAzureStorageAccountsOptionalParams,
  WebAppsGetAuthSettingsOptionalParams,
  WebAppsUpdateAuthSettingsOptionalParams,
  WebAppsListApplicationSettingsOptionalParams,
  WebAppsUpdateApplicationSettingsOptionalParams,
  WebAppsBackupOptionalParams,
  WebAppsApplySlotConfigToProductionOptionalParams,
  WebAppsAnalyzeCustomHostnameOptionalParams,
  WebAppsListOptionalParams,
  WebAppsDeleteOptionalParams,
  WebAppsUpdateOptionalParams,
  WebAppsCreateOrUpdateOptionalParams,
  WebAppsGetOptionalParams,
  WebAppsUpdateVnetConnectionGatewayOptionalParams,
  WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams,
  WebAppsGetVnetConnectionGatewayOptionalParams,
  WebAppsUpdateVnetConnectionGatewaySlotOptionalParams,
  WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams,
  WebAppsGetVnetConnectionGatewaySlotOptionalParams,
  WebAppsListVnetConnectionsOptionalParams,
  WebAppsDeleteVnetConnectionOptionalParams,
  WebAppsUpdateVnetConnectionOptionalParams,
  WebAppsCreateOrUpdateVnetConnectionOptionalParams,
  WebAppsGetVnetConnectionOptionalParams,
  WebAppsListVnetConnectionsSlotOptionalParams,
  WebAppsDeleteVnetConnectionSlotOptionalParams,
  WebAppsUpdateVnetConnectionSlotOptionalParams,
  WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams,
  WebAppsGetVnetConnectionSlotOptionalParams,
  WebAppsDeleteHybridConnectionSlotOptionalParams,
  WebAppsUpdateHybridConnectionSlotOptionalParams,
  WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams,
  WebAppsGetHybridConnectionSlotOptionalParams,
  WebAppsDeleteHybridConnectionOptionalParams,
  WebAppsUpdateHybridConnectionOptionalParams,
  WebAppsCreateOrUpdateHybridConnectionOptionalParams,
  WebAppsGetHybridConnectionOptionalParams,
  WebAppsListPrivateEndpointConnectionListSlotOptionalParams,
  WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
  WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
  WebAppsGetPrivateEndpointConnectionSlotOptionalParams,
  WebAppsListPrivateEndpointConnectionListOptionalParams,
  WebAppsDeletePrivateEndpointConnectionOptionalParams,
  WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
  WebAppsGetPrivateEndpointConnectionOptionalParams,
  WebAppsListWorkflowsConnectionsSlotOptionalParams,
  WebAppsDeployWorkflowArtifactsSlotOptionalParams,
  WebAppsListUsagesSlotOptionalParams,
  WebAppsSyncFunctionTriggersSlotOptionalParams,
  WebAppsSyncRepositorySlotOptionalParams,
  WebAppsStopNetworkTraceSlotOptionalParams,
  WebAppsStopSlotOptionalParams,
  WebAppsStartNetworkTraceSlotOptionalParams,
  WebAppsStartSlotOptionalParams,
  WebAppsListSnapshotsFromDRSecondarySlotOptionalParams,
  WebAppsListSnapshotsSlotOptionalParams,
  WebAppsSwapSlotOptionalParams,
  WebAppsListSlotDifferencesSlotOptionalParams,
  WebAppsRestoreSnapshotSlotOptionalParams,
  WebAppsRestoreFromDeletedAppSlotOptionalParams,
  WebAppsRestoreFromBackupBlobSlotOptionalParams,
  WebAppsRestartSlotOptionalParams,
  WebAppsResetSlotConfigurationSlotOptionalParams,
  WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams,
  WebAppsGetPrivateLinkResourcesSlotOptionalParams,
  WebAppsListPremierAddOnsSlotOptionalParams,
  WebAppsGetSitePhpErrorLogFlagSlotOptionalParams,
  WebAppsListPerfMonCountersSlotOptionalParams,
  WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams,
  WebAppsGetNetworkTracesSlotV2OptionalParams,
  WebAppsGetNetworkTraceOperationSlotV2OptionalParams,
  WebAppsGetNetworkTracesSlotOptionalParams,
  WebAppsStopWebSiteNetworkTraceSlotOptionalParams,
  WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
  WebAppsStartWebSiteNetworkTraceSlotOptionalParams,
  WebAppsGetNetworkTraceOperationSlotOptionalParams,
  WebAppsListSyncFunctionTriggersSlotOptionalParams,
  WebAppsListSiteBackupsSlotOptionalParams,
  WebAppsIsCloneableSlotOptionalParams,
  WebAppsListRelayServiceConnectionsSlotOptionalParams,
  WebAppsListHybridConnectionsSlotOptionalParams,
  WebAppsDeleteHostSecretSlotOptionalParams,
  WebAppsCreateOrUpdateHostSecretSlotOptionalParams,
  WebAppsSyncFunctionsSlotOptionalParams,
  WebAppsListSyncStatusSlotOptionalParams,
  WebAppsListHostKeysSlotOptionalParams,
  WebAppsGetFunctionsAdminTokenSlotOptionalParams,
  WebAppsDiscoverBackupSlotOptionalParams,
  WebAppsGetContainerLogsZipSlotOptionalParams,
  WebAppsGetWebSiteContainerLogsSlotOptionalParams,
  WebAppsListSitePushSettingsSlotOptionalParams,
  WebAppsUpdateSitePushSettingsSlotOptionalParams,
  WebAppsListPublishingCredentialsSlotOptionalParams,
  WebAppsListMetadataSlotOptionalParams,
  WebAppsUpdateMetadataSlotOptionalParams,
  WebAppsListConnectionStringsSlotOptionalParams,
  WebAppsUpdateConnectionStringsSlotOptionalParams,
  WebAppsGetBackupConfigurationSlotOptionalParams,
  WebAppsDeleteBackupConfigurationSlotOptionalParams,
  WebAppsUpdateBackupConfigurationSlotOptionalParams,
  WebAppsListAzureStorageAccountsSlotOptionalParams,
  WebAppsUpdateAzureStorageAccountsSlotOptionalParams,
  WebAppsGetAuthSettingsSlotOptionalParams,
  WebAppsUpdateAuthSettingsSlotOptionalParams,
  WebAppsListApplicationSettingsSlotOptionalParams,
  WebAppsUpdateApplicationSettingsSlotOptionalParams,
  WebAppsBackupSlotOptionalParams,
  WebAppsApplySlotConfigurationSlotOptionalParams,
  WebAppsAnalyzeCustomHostnameSlotOptionalParams,
  WebAppsListByResourceGroupOptionalParams,
  WebAppsDeleteSlotOptionalParams,
  WebAppsUpdateSlotOptionalParams,
  WebAppsCreateOrUpdateSlotOptionalParams,
  WebAppsGetSlotOptionalParams,
  WebAppsListSlotsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listWorkflowsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWorkflowsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/workflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listWorkflowsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowEnvelopeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _workflowEnvelopeCollectionDeserializer(result.body);
}

/** List the workflows for a web site, or a deployment slot. */
export function listWorkflows(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWorkflowsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowEnvelope> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkflowsSend(context, resourceGroupName, name, options),
    _listWorkflowsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getWorkflowSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WebAppsGetWorkflowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getWorkflowDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Get workflow information by its ID for web site, or a deployment slot. */
export async function getWorkflow(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WebAppsGetWorkflowOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _getWorkflowSend(context, resourceGroupName, name, workflowName, options);
  return _getWorkflowDeserialize(result);
}

export function _listInstanceWorkflowsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceWorkflowsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/workflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceWorkflowsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowEnvelopeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _workflowEnvelopeCollectionDeserializer(result.body);
}

/** List the workflows for a web site, or a deployment slot. */
export function listInstanceWorkflowsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceWorkflowsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowEnvelope> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstanceWorkflowsSlotSend(context, resourceGroupName, name, slot, options),
    _listInstanceWorkflowsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceWorkflowSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  workflowName: string,
  options: WebAppsGetInstanceWorkflowSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceWorkflowSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Get workflow information by its ID for web site, or a deployment slot. */
export async function getInstanceWorkflowSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  workflowName: string,
  options: WebAppsGetInstanceWorkflowSlotOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _getInstanceWorkflowSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    workflowName,
    options,
  );
  return _getInstanceWorkflowSlotDeserialize(result);
}

export function _listWebJobsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWebJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/webjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listWebJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webJobCollectionDeserializer(result.body);
}

/** Description for List webjobs for an app, or a deployment slot. */
export function listWebJobs(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWebJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebJobsSend(context, resourceGroupName, name, options),
    _listWebJobsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/webjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getWebJobDeserialize(result: PathUncheckedResponse): Promise<WebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return webJobDeserializer(result.body);
}

/** Description for Get webjob information for an app, or a deployment slot. */
export async function getWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetWebJobOptionalParams = { requestOptions: {} },
): Promise<WebJob> {
  const result = await _getWebJobSend(context, resourceGroupName, name, webJobName, options);
  return _getWebJobDeserialize(result);
}

export function _listWebJobsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListWebJobsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/webjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listWebJobsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webJobCollectionDeserializer(result.body);
}

/** Description for List webjobs for an app, or a deployment slot. */
export function listWebJobsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListWebJobsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebJobsSlotSend(context, resourceGroupName, name, slot, options),
    _listWebJobsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/webjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getWebJobSlotDeserialize(result: PathUncheckedResponse): Promise<WebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return webJobDeserializer(result.body);
}

/** Description for Get webjob information for an app, or a deployment slot. */
export async function getWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<WebJob> {
  const result = await _getWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _getWebJobSlotDeserialize(result);
}

export function _listTriggeredWebJobHistorySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsListTriggeredWebJobHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/history{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listTriggeredWebJobHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggeredJobHistoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _triggeredJobHistoryCollectionDeserializer(result.body);
}

/** Description for List a triggered web job's history for an app, or a deployment slot. */
export function listTriggeredWebJobHistory(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsListTriggeredWebJobHistoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggeredJobHistory> {
  return buildPagedAsyncIterator(
    context,
    () => _listTriggeredWebJobHistorySend(context, resourceGroupName, name, webJobName, options),
    _listTriggeredWebJobHistoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getTriggeredWebJobHistorySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  id: string,
  options: WebAppsGetTriggeredWebJobHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/history/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTriggeredWebJobHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggeredJobHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return triggeredJobHistoryDeserializer(result.body);
}

/** Description for Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export async function getTriggeredWebJobHistory(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  id: string,
  options: WebAppsGetTriggeredWebJobHistoryOptionalParams = { requestOptions: {} },
): Promise<TriggeredJobHistory> {
  const result = await _getTriggeredWebJobHistorySend(
    context,
    resourceGroupName,
    name,
    webJobName,
    id,
    options,
  );
  return _getTriggeredWebJobHistoryDeserialize(result);
}

export function _listTriggeredWebJobHistorySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsListTriggeredWebJobHistorySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/history{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listTriggeredWebJobHistorySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggeredJobHistoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _triggeredJobHistoryCollectionDeserializer(result.body);
}

/** Description for List a triggered web job's history for an app, or a deployment slot. */
export function listTriggeredWebJobHistorySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsListTriggeredWebJobHistorySlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggeredJobHistory> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listTriggeredWebJobHistorySlotSend(
        context,
        resourceGroupName,
        name,
        webJobName,
        slot,
        options,
      ),
    _listTriggeredWebJobHistorySlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getTriggeredWebJobHistorySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  id: string,
  slot: string,
  options: WebAppsGetTriggeredWebJobHistorySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/history/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTriggeredWebJobHistorySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggeredJobHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return triggeredJobHistoryDeserializer(result.body);
}

/** Description for Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
export async function getTriggeredWebJobHistorySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  id: string,
  slot: string,
  options: WebAppsGetTriggeredWebJobHistorySlotOptionalParams = { requestOptions: {} },
): Promise<TriggeredJobHistory> {
  const result = await _getTriggeredWebJobHistorySlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    id,
    slot,
    options,
  );
  return _getTriggeredWebJobHistorySlotDeserialize(result);
}

export function _runTriggeredWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsRunTriggeredWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/run{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runTriggeredWebJobDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Run a triggered web job for an app, or a deployment slot. */
export async function runTriggeredWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsRunTriggeredWebJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runTriggeredWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _runTriggeredWebJobDeserialize(result);
}

export function _listTriggeredWebJobsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListTriggeredWebJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listTriggeredWebJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggeredWebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _triggeredWebJobCollectionDeserializer(result.body);
}

/** Description for List triggered web jobs for an app, or a deployment slot. */
export function listTriggeredWebJobs(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListTriggeredWebJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggeredWebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listTriggeredWebJobsSend(context, resourceGroupName, name, options),
    _listTriggeredWebJobsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteTriggeredWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsDeleteTriggeredWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTriggeredWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a triggered web job by its ID for an app, or a deployment slot. */
export async function deleteTriggeredWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsDeleteTriggeredWebJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTriggeredWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _deleteTriggeredWebJobDeserialize(result);
}

export function _getTriggeredWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetTriggeredWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTriggeredWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggeredWebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return triggeredWebJobDeserializer(result.body);
}

/** Description for Gets a triggered web job by its ID for an app, or a deployment slot. */
export async function getTriggeredWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetTriggeredWebJobOptionalParams = { requestOptions: {} },
): Promise<TriggeredWebJob> {
  const result = await _getTriggeredWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _getTriggeredWebJobDeserialize(result);
}

export function _runTriggeredWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsRunTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/run{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runTriggeredWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Run a triggered web job for an app, or a deployment slot. */
export async function runTriggeredWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsRunTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runTriggeredWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _runTriggeredWebJobSlotDeserialize(result);
}

export function _listTriggeredWebJobsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListTriggeredWebJobsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listTriggeredWebJobsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggeredWebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _triggeredWebJobCollectionDeserializer(result.body);
}

/** Description for List triggered web jobs for an app, or a deployment slot. */
export function listTriggeredWebJobsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListTriggeredWebJobsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriggeredWebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listTriggeredWebJobsSlotSend(context, resourceGroupName, name, slot, options),
    _listTriggeredWebJobsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteTriggeredWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsDeleteTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTriggeredWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a triggered web job by its ID for an app, or a deployment slot. */
export async function deleteTriggeredWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsDeleteTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTriggeredWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _deleteTriggeredWebJobSlotDeserialize(result);
}

export function _getTriggeredWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTriggeredWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggeredWebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return triggeredWebJobDeserializer(result.body);
}

/** Description for Gets a triggered web job by its ID for an app, or a deployment slot. */
export async function getTriggeredWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetTriggeredWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<TriggeredWebJob> {
  const result = await _getTriggeredWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _getTriggeredWebJobSlotDeserialize(result);
}

export function _deleteSourceControlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web{?api%2Dversion,additionalFlags}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      additionalFlags: options?.additionalFlags,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes the source control configuration of an app. */
export async function deleteSourceControl(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteSourceControlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSourceControlSend(context, resourceGroupName, name, options);
  return _deleteSourceControlDeserialize(result);
}

export function _updateSourceControlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsUpdateSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSourceControlSerializer(siteSourceControl),
  });
}

export async function _updateSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Updates the source control configuration of an app. */
export async function updateSourceControl(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsUpdateSourceControlOptionalParams = { requestOptions: {} },
): Promise<SiteSourceControl> {
  const result = await _updateSourceControlSend(
    context,
    resourceGroupName,
    name,
    siteSourceControl,
    options,
  );
  return _updateSourceControlDeserialize(result);
}

export function _createOrUpdateSourceControlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsCreateOrUpdateSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSourceControlSerializer(siteSourceControl),
  });
}

export async function _createOrUpdateSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Updates the source control configuration of an app. */
export function createOrUpdateSourceControl(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsCreateOrUpdateSourceControlOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteSourceControl>, SiteSourceControl> {
  return getLongRunningPoller(
    context,
    _createOrUpdateSourceControlDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateSourceControlSend(
          context,
          resourceGroupName,
          name,
          siteSourceControl,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<SiteSourceControl>, SiteSourceControl>;
}

export function _getSourceControlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Gets the source control configuration of an app. */
export async function getSourceControl(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSourceControlOptionalParams = { requestOptions: {} },
): Promise<SiteSourceControl> {
  const result = await _getSourceControlSend(context, resourceGroupName, name, options);
  return _getSourceControlDeserialize(result);
}

export function _deleteSourceControlSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSourceControlSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web{?api%2Dversion,additionalFlags}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      additionalFlags: options?.additionalFlags,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSourceControlSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes the source control configuration of an app. */
export async function deleteSourceControlSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSourceControlSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSourceControlSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _deleteSourceControlSlotDeserialize(result);
}

export function _updateSourceControlSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsUpdateSourceControlSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSourceControlSerializer(siteSourceControl),
  });
}

export async function _updateSourceControlSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Updates the source control configuration of an app. */
export async function updateSourceControlSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsUpdateSourceControlSlotOptionalParams = { requestOptions: {} },
): Promise<SiteSourceControl> {
  const result = await _updateSourceControlSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteSourceControl,
    options,
  );
  return _updateSourceControlSlotDeserialize(result);
}

export function _createOrUpdateSourceControlSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsCreateOrUpdateSourceControlSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSourceControlSerializer(siteSourceControl),
  });
}

export async function _createOrUpdateSourceControlSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Updates the source control configuration of an app. */
export function createOrUpdateSourceControlSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteSourceControl: SiteSourceControl,
  options: WebAppsCreateOrUpdateSourceControlSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteSourceControl>, SiteSourceControl> {
  return getLongRunningPoller(
    context,
    _createOrUpdateSourceControlSlotDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateSourceControlSlotSend(
          context,
          resourceGroupName,
          name,
          slot,
          siteSourceControl,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<SiteSourceControl>, SiteSourceControl>;
}

export function _getSourceControlSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSourceControlSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSourceControlSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSourceControl> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteSourceControlDeserializer(result.body);
}

/** Description for Gets the source control configuration of an app. */
export async function getSourceControlSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSourceControlSlotOptionalParams = { requestOptions: {} },
): Promise<SiteSourceControl> {
  const result = await _getSourceControlSlotSend(context, resourceGroupName, name, slot, options);
  return _getSourceControlSlotDeserialize(result);
}

export function _listSiteExtensionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteExtensionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteExtensionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteExtensionInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteExtensionInfoCollectionDeserializer(result.body);
}

/** Description for Get list of siteextensions for a web site, or a deployment slot. */
export function listSiteExtensionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteExtensionsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteExtensionInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteExtensionsSlotSend(context, resourceGroupName, name, slot, options),
    _listSiteExtensionsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSiteExtensionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsDeleteSiteExtensionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSiteExtensionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Remove a site extension from a web site, or a deployment slot. */
export async function deleteSiteExtensionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsDeleteSiteExtensionSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSiteExtensionSlotSend(
    context,
    resourceGroupName,
    name,
    siteExtensionId,
    slot,
    options,
  );
  return _deleteSiteExtensionSlotDeserialize(result);
}

export function _installSiteExtensionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsInstallSiteExtensionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _installSiteExtensionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteExtensionInfo> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteExtensionInfoDeserializer(result.body);
}

/** Description for Install site extension on a web site, or a deployment slot. */
export function installSiteExtensionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsInstallSiteExtensionSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo> {
  return getLongRunningPoller(
    context,
    _installSiteExtensionSlotDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _installSiteExtensionSlotSend(
          context,
          resourceGroupName,
          name,
          siteExtensionId,
          slot,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>;
}

export function _getSiteExtensionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsGetSiteExtensionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteExtensionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteExtensionInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteExtensionInfoDeserializer(result.body);
}

/** Description for Get site extension information by its ID for a web site, or a deployment slot. */
export async function getSiteExtensionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  slot: string,
  options: WebAppsGetSiteExtensionSlotOptionalParams = { requestOptions: {} },
): Promise<SiteExtensionInfo> {
  const result = await _getSiteExtensionSlotSend(
    context,
    resourceGroupName,
    name,
    siteExtensionId,
    slot,
    options,
  );
  return _getSiteExtensionSlotDeserialize(result);
}

export function _listSiteExtensionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteExtensionInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteExtensionInfoCollectionDeserializer(result.body);
}

/** Description for Get list of siteextensions for a web site, or a deployment slot. */
export function listSiteExtensions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteExtensionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteExtensionInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteExtensionsSend(context, resourceGroupName, name, options),
    _listSiteExtensionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSiteExtensionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsDeleteSiteExtensionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSiteExtensionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Remove a site extension from a web site, or a deployment slot. */
export async function deleteSiteExtension(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsDeleteSiteExtensionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSiteExtensionSend(
    context,
    resourceGroupName,
    name,
    siteExtensionId,
    options,
  );
  return _deleteSiteExtensionDeserialize(result);
}

export function _installSiteExtensionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsInstallSiteExtensionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _installSiteExtensionDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteExtensionInfo> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteExtensionInfoDeserializer(result.body);
}

/** Description for Install site extension on a web site, or a deployment slot. */
export function installSiteExtension(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsInstallSiteExtensionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo> {
  return getLongRunningPoller(context, _installSiteExtensionDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _installSiteExtensionSend(context, resourceGroupName, name, siteExtensionId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>;
}

export function _getSiteExtensionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsGetSiteExtensionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siteExtensionId: siteExtensionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteExtensionDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteExtensionInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteExtensionInfoDeserializer(result.body);
}

/** Description for Get site extension information by its ID for a web site, or a deployment slot. */
export async function getSiteExtension(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteExtensionId: string,
  options: WebAppsGetSiteExtensionOptionalParams = { requestOptions: {} },
): Promise<SiteExtensionInfo> {
  const result = await _getSiteExtensionSend(
    context,
    resourceGroupName,
    name,
    siteExtensionId,
    options,
  );
  return _getSiteExtensionDeserialize(result);
}

export function _listSiteContainersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteContainersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sitecontainers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteContainersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteContainerCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteContainerCollectionDeserializer(result.body);
}

/** Lists all the site containers of a site, or a deployment slot. */
export function listSiteContainersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteContainersSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteContainersSlotSend(context, resourceGroupName, name, slot, options),
    _listSiteContainersSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSiteContainerSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  options: WebAppsDeleteSiteContainerSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSiteContainerSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a site container for a site, or a deployment slot. */
export async function deleteSiteContainerSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  options: WebAppsDeleteSiteContainerSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSiteContainerSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    containerName,
    options,
  );
  return _deleteSiteContainerSlotDeserialize(result);
}

export function _createOrUpdateSiteContainerSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  request: SiteContainer,
  options: WebAppsCreateOrUpdateSiteContainerSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteContainerSerializer(request),
  });
}

export async function _createOrUpdateSiteContainerSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteContainer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteContainerDeserializer(result.body);
}

/** Creates or Updates a site container for a site, or a deployment slot. */
export async function createOrUpdateSiteContainerSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  request: SiteContainer,
  options: WebAppsCreateOrUpdateSiteContainerSlotOptionalParams = { requestOptions: {} },
): Promise<SiteContainer> {
  const result = await _createOrUpdateSiteContainerSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    containerName,
    request,
    options,
  );
  return _createOrUpdateSiteContainerSlotDeserialize(result);
}

export function _getSiteContainerSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  options: WebAppsGetSiteContainerSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteContainerSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteContainerDeserializer(result.body);
}

/** Gets a site container of a site, or a deployment slot. */
export async function getSiteContainerSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  containerName: string,
  options: WebAppsGetSiteContainerSlotOptionalParams = { requestOptions: {} },
): Promise<SiteContainer> {
  const result = await _getSiteContainerSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    containerName,
    options,
  );
  return _getSiteContainerSlotDeserialize(result);
}

export function _listSiteContainersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteContainersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sitecontainers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteContainerCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteContainerCollectionDeserializer(result.body);
}

/** Lists all the site containers of a site, or a deployment slot. */
export function listSiteContainers(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteContainersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteContainersSend(context, resourceGroupName, name, options),
    _listSiteContainersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSiteContainerSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  options: WebAppsDeleteSiteContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSiteContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a site container for a site, or a deployment slot. */
export async function deleteSiteContainer(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  options: WebAppsDeleteSiteContainerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSiteContainerSend(
    context,
    resourceGroupName,
    name,
    containerName,
    options,
  );
  return _deleteSiteContainerDeserialize(result);
}

export function _createOrUpdateSiteContainerSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  request: SiteContainer,
  options: WebAppsCreateOrUpdateSiteContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteContainerSerializer(request),
  });
}

export async function _createOrUpdateSiteContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteContainer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteContainerDeserializer(result.body);
}

/** Creates or Updates a site container for a site, or a deployment slot. */
export async function createOrUpdateSiteContainer(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  request: SiteContainer,
  options: WebAppsCreateOrUpdateSiteContainerOptionalParams = { requestOptions: {} },
): Promise<SiteContainer> {
  const result = await _createOrUpdateSiteContainerSend(
    context,
    resourceGroupName,
    name,
    containerName,
    request,
    options,
  );
  return _createOrUpdateSiteContainerDeserialize(result);
}

export function _getSiteContainerSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  options: WebAppsGetSiteContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sitecontainers/{containerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteContainerDeserializer(result.body);
}

/** Gets a site container of a site, or a deployment slot. */
export async function getSiteContainer(
  context: Client,
  resourceGroupName: string,
  name: string,
  containerName: string,
  options: WebAppsGetSiteContainerOptionalParams = { requestOptions: {} },
): Promise<SiteContainer> {
  const result = await _getSiteContainerSend(
    context,
    resourceGroupName,
    name,
    containerName,
    options,
  );
  return _getSiteContainerDeserialize(result);
}

export function _listPublicCertificatesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPublicCertificatesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPublicCertificatesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicCertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _publicCertificateCollectionDeserializer(result.body);
}

/** Description for Get public certificates for an app or a deployment slot. */
export function listPublicCertificatesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPublicCertificatesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicCertificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listPublicCertificatesSlotSend(context, resourceGroupName, name, slot, options),
    _listPublicCertificatesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePublicCertificateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publicCertificateName: string,
  options: WebAppsDeletePublicCertificateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePublicCertificateSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a hostname binding for an app. */
export async function deletePublicCertificateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publicCertificateName: string,
  options: WebAppsDeletePublicCertificateSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePublicCertificateSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    publicCertificateName,
    options,
  );
  return _deletePublicCertificateSlotDeserialize(result);
}

export function _createOrUpdatePublicCertificateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  slot: string,
  publicCertificate: PublicCertificate,
  options: WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: publicCertificateSerializer(publicCertificate),
  });
}

export async function _createOrUpdatePublicCertificateSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return publicCertificateDeserializer(result.body);
}

/** Description for Creates a hostname binding for an app. */
export async function createOrUpdatePublicCertificateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  slot: string,
  publicCertificate: PublicCertificate,
  options: WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams = { requestOptions: {} },
): Promise<PublicCertificate> {
  const result = await _createOrUpdatePublicCertificateSlotSend(
    context,
    resourceGroupName,
    name,
    publicCertificateName,
    slot,
    publicCertificate,
    options,
  );
  return _createOrUpdatePublicCertificateSlotDeserialize(result);
}

export function _getPublicCertificateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publicCertificateName: string,
  options: WebAppsGetPublicCertificateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPublicCertificateSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return publicCertificateDeserializer(result.body);
}

/** Description for Get the named public certificate for an app (or deployment slot, if specified). */
export async function getPublicCertificateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publicCertificateName: string,
  options: WebAppsGetPublicCertificateSlotOptionalParams = { requestOptions: {} },
): Promise<PublicCertificate> {
  const result = await _getPublicCertificateSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    publicCertificateName,
    options,
  );
  return _getPublicCertificateSlotDeserialize(result);
}

export function _listPublicCertificatesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPublicCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPublicCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicCertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _publicCertificateCollectionDeserializer(result.body);
}

/** Description for Get public certificates for an app or a deployment slot. */
export function listPublicCertificates(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPublicCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicCertificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listPublicCertificatesSend(context, resourceGroupName, name, options),
    _listPublicCertificatesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePublicCertificateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  options: WebAppsDeletePublicCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePublicCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a hostname binding for an app. */
export async function deletePublicCertificate(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  options: WebAppsDeletePublicCertificateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePublicCertificateSend(
    context,
    resourceGroupName,
    name,
    publicCertificateName,
    options,
  );
  return _deletePublicCertificateDeserialize(result);
}

export function _createOrUpdatePublicCertificateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  publicCertificate: PublicCertificate,
  options: WebAppsCreateOrUpdatePublicCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: publicCertificateSerializer(publicCertificate),
  });
}

export async function _createOrUpdatePublicCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return publicCertificateDeserializer(result.body);
}

/** Description for Creates a hostname binding for an app. */
export async function createOrUpdatePublicCertificate(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  publicCertificate: PublicCertificate,
  options: WebAppsCreateOrUpdatePublicCertificateOptionalParams = { requestOptions: {} },
): Promise<PublicCertificate> {
  const result = await _createOrUpdatePublicCertificateSend(
    context,
    resourceGroupName,
    name,
    publicCertificateName,
    publicCertificate,
    options,
  );
  return _createOrUpdatePublicCertificateDeserialize(result);
}

export function _getPublicCertificateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  options: WebAppsGetPublicCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      publicCertificateName: publicCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPublicCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return publicCertificateDeserializer(result.body);
}

/** Description for Get the named public certificate for an app (or deployment slot, if specified). */
export async function getPublicCertificate(
  context: Client,
  resourceGroupName: string,
  name: string,
  publicCertificateName: string,
  options: WebAppsGetPublicCertificateOptionalParams = { requestOptions: {} },
): Promise<PublicCertificate> {
  const result = await _getPublicCertificateSend(
    context,
    resourceGroupName,
    name,
    publicCertificateName,
    options,
  );
  return _getPublicCertificateDeserialize(result);
}

export function _putPrivateAccessVnetSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  access: PrivateAccess,
  options: WebAppsPutPrivateAccessVnetSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateAccess/virtualNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateAccessSerializer(access),
  });
}

export async function _putPrivateAccessVnetSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateAccess> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Description for Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export async function putPrivateAccessVnetSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  access: PrivateAccess,
  options: WebAppsPutPrivateAccessVnetSlotOptionalParams = { requestOptions: {} },
): Promise<PrivateAccess> {
  const result = await _putPrivateAccessVnetSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    access,
    options,
  );
  return _putPrivateAccessVnetSlotDeserialize(result);
}

export function _getPrivateAccessSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetPrivateAccessSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateAccess/virtualNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateAccessSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateAccess> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Description for Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export async function getPrivateAccessSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetPrivateAccessSlotOptionalParams = { requestOptions: {} },
): Promise<PrivateAccess> {
  const result = await _getPrivateAccessSlotSend(context, resourceGroupName, name, slot, options);
  return _getPrivateAccessSlotDeserialize(result);
}

export function _putPrivateAccessVnetSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  access: PrivateAccess,
  options: WebAppsPutPrivateAccessVnetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateAccess/virtualNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateAccessSerializer(access),
  });
}

export async function _putPrivateAccessVnetDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateAccess> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Description for Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
export async function putPrivateAccessVnet(
  context: Client,
  resourceGroupName: string,
  name: string,
  access: PrivateAccess,
  options: WebAppsPutPrivateAccessVnetOptionalParams = { requestOptions: {} },
): Promise<PrivateAccess> {
  const result = await _putPrivateAccessVnetSend(context, resourceGroupName, name, access, options);
  return _putPrivateAccessVnetDeserialize(result);
}

export function _getPrivateAccessSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetPrivateAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateAccess/virtualNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateAccessDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateAccess> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Description for Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
export async function getPrivateAccess(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetPrivateAccessOptionalParams = { requestOptions: {} },
): Promise<PrivateAccess> {
  const result = await _getPrivateAccessSend(context, resourceGroupName, name, options);
  return _getPrivateAccessDeserialize(result);
}

export function _deletePremierAddOnSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  options: WebAppsDeletePremierAddOnSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePremierAddOnSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a premier add-on from an app. */
export async function deletePremierAddOnSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  options: WebAppsDeletePremierAddOnSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePremierAddOnSlotSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    slot,
    options,
  );
  return _deletePremierAddOnSlotDeserialize(result);
}

export function _updatePremierAddOnSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  premierAddOn: PremierAddOnPatchResource,
  options: WebAppsUpdatePremierAddOnSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: premierAddOnPatchResourceSerializer(premierAddOn),
  });
}

export async function _updatePremierAddOnSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Updates a named add-on of an app. */
export async function updatePremierAddOnSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  premierAddOn: PremierAddOnPatchResource,
  options: WebAppsUpdatePremierAddOnSlotOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _updatePremierAddOnSlotSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    slot,
    premierAddOn,
    options,
  );
  return _updatePremierAddOnSlotDeserialize(result);
}

export function _addPremierAddOnSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  premierAddOn: PremierAddOn,
  options: WebAppsAddPremierAddOnSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: premierAddOnSerializer(premierAddOn),
  });
}

export async function _addPremierAddOnSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Updates a named add-on of an app. */
export async function addPremierAddOnSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  premierAddOn: PremierAddOn,
  options: WebAppsAddPremierAddOnSlotOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _addPremierAddOnSlotSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    slot,
    premierAddOn,
    options,
  );
  return _addPremierAddOnSlotDeserialize(result);
}

export function _getPremierAddOnSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  options: WebAppsGetPremierAddOnSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPremierAddOnSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Gets a named add-on of an app. */
export async function getPremierAddOnSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  slot: string,
  options: WebAppsGetPremierAddOnSlotOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _getPremierAddOnSlotSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    slot,
    options,
  );
  return _getPremierAddOnSlotDeserialize(result);
}

export function _deletePremierAddOnSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  options: WebAppsDeletePremierAddOnOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePremierAddOnDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a premier add-on from an app. */
export async function deletePremierAddOn(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  options: WebAppsDeletePremierAddOnOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deletePremierAddOnSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    options,
  );
  return _deletePremierAddOnDeserialize(result);
}

export function _updatePremierAddOnSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  premierAddOn: PremierAddOnPatchResource,
  options: WebAppsUpdatePremierAddOnOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: premierAddOnPatchResourceSerializer(premierAddOn),
  });
}

export async function _updatePremierAddOnDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Updates a named add-on of an app. */
export async function updatePremierAddOn(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  premierAddOn: PremierAddOnPatchResource,
  options: WebAppsUpdatePremierAddOnOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _updatePremierAddOnSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    premierAddOn,
    options,
  );
  return _updatePremierAddOnDeserialize(result);
}

export function _addPremierAddOnSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  premierAddOn: PremierAddOn,
  options: WebAppsAddPremierAddOnOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: premierAddOnSerializer(premierAddOn),
  });
}

export async function _addPremierAddOnDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Updates a named add-on of an app. */
export async function addPremierAddOn(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  premierAddOn: PremierAddOn,
  options: WebAppsAddPremierAddOnOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _addPremierAddOnSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    premierAddOn,
    options,
  );
  return _addPremierAddOnDeserialize(result);
}

export function _getPremierAddOnSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  options: WebAppsGetPremierAddOnOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      premierAddOnName: premierAddOnName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPremierAddOnDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Gets a named add-on of an app. */
export async function getPremierAddOn(
  context: Client,
  resourceGroupName: string,
  name: string,
  premierAddOnName: string,
  options: WebAppsGetPremierAddOnOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _getPremierAddOnSend(
    context,
    resourceGroupName,
    name,
    premierAddOnName,
    options,
  );
  return _getPremierAddOnDeserialize(result);
}

export function _listNetworkFeaturesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  view: string,
  slot: string,
  options: WebAppsListNetworkFeaturesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkFeatures/{view}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      view: view,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listNetworkFeaturesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFeatures> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkFeaturesDeserializer(result.body);
}

/** Description for Gets all network features used by the app (or deployment slot, if specified). */
export async function listNetworkFeaturesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  view: string,
  slot: string,
  options: WebAppsListNetworkFeaturesSlotOptionalParams = { requestOptions: {} },
): Promise<NetworkFeatures> {
  const result = await _listNetworkFeaturesSlotSend(
    context,
    resourceGroupName,
    name,
    view,
    slot,
    options,
  );
  return _listNetworkFeaturesSlotDeserialize(result);
}

export function _listNetworkFeaturesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  view: string,
  options: WebAppsListNetworkFeaturesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkFeatures/{view}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      view: view,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listNetworkFeaturesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFeatures> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkFeaturesDeserializer(result.body);
}

/** Description for Gets all network features used by the app (or deployment slot, if specified). */
export async function listNetworkFeatures(
  context: Client,
  resourceGroupName: string,
  name: string,
  view: string,
  options: WebAppsListNetworkFeaturesOptionalParams = { requestOptions: {} },
): Promise<NetworkFeatures> {
  const result = await _listNetworkFeaturesSend(context, resourceGroupName, name, view, options);
  return _listNetworkFeaturesDeserialize(result);
}

export function _deleteSwiftVirtualNetworkSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSwiftVirtualNetworkSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export async function deleteSwiftVirtualNetworkSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSwiftVirtualNetworkSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _deleteSwiftVirtualNetworkSlotDeserialize(result);
}

export function _updateSwiftVirtualNetworkConnectionWithCheckSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: swiftVirtualNetworkSerializer(connectionEnvelope),
  });
}

export async function _updateSwiftVirtualNetworkConnectionWithCheckSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/**
 * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export async function updateSwiftVirtualNetworkConnectionWithCheckSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _updateSwiftVirtualNetworkConnectionWithCheckSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    connectionEnvelope,
    options,
  );
  return _updateSwiftVirtualNetworkConnectionWithCheckSlotDeserialize(result);
}

export function _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: swiftVirtualNetworkSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/**
 * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export async function createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotDeserialize(result);
}

export function _getSwiftVirtualNetworkConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSwiftVirtualNetworkConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/** Description for Gets a Swift Virtual Network connection. */
export async function getSwiftVirtualNetworkConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<SwiftVirtualNetwork> {
  const result = await _getSwiftVirtualNetworkConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getSwiftVirtualNetworkConnectionSlotDeserialize(result);
}

export function _deleteSwiftVirtualNetworkSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteSwiftVirtualNetworkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSwiftVirtualNetworkDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a Swift Virtual Network connection from an app (or deployment slot). */
export async function deleteSwiftVirtualNetwork(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteSwiftVirtualNetworkOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSwiftVirtualNetworkSend(context, resourceGroupName, name, options);
  return _deleteSwiftVirtualNetworkDeserialize(result);
}

export function _updateSwiftVirtualNetworkConnectionWithCheckSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: swiftVirtualNetworkSerializer(connectionEnvelope),
  });
}

export async function _updateSwiftVirtualNetworkConnectionWithCheckDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/**
 * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export async function updateSwiftVirtualNetworkConnectionWithCheck(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _updateSwiftVirtualNetworkConnectionWithCheckSend(
    context,
    resourceGroupName,
    name,
    connectionEnvelope,
    options,
  );
  return _updateSwiftVirtualNetworkConnectionWithCheckDeserialize(result);
}

export function _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: swiftVirtualNetworkSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateSwiftVirtualNetworkConnectionWithCheckDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/**
 * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
 * in use by another App Service Plan other than the one this App is in.
 */
export async function createOrUpdateSwiftVirtualNetworkConnectionWithCheck(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionEnvelope: SwiftVirtualNetwork,
  options: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams = {
    requestOptions: {},
  },
): Promise<SwiftVirtualNetwork> {
  const result = await _createOrUpdateSwiftVirtualNetworkConnectionWithCheckSend(
    context,
    resourceGroupName,
    name,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateSwiftVirtualNetworkConnectionWithCheckDeserialize(result);
}

export function _getSwiftVirtualNetworkConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSwiftVirtualNetworkConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSwiftVirtualNetworkConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SwiftVirtualNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return swiftVirtualNetworkDeserializer(result.body);
}

/** Description for Gets a Swift Virtual Network connection. */
export async function getSwiftVirtualNetworkConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSwiftVirtualNetworkConnectionOptionalParams = { requestOptions: {} },
): Promise<SwiftVirtualNetwork> {
  const result = await _getSwiftVirtualNetworkConnectionSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _getSwiftVirtualNetworkConnectionDeserialize(result);
}

export function _getMigrateMySqlStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMigrateMySqlStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/migratemysql/status{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMigrateMySqlStatusSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateMySqlStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return migrateMySqlStatusDeserializer(result.body);
}

/** Description for Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export async function getMigrateMySqlStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMigrateMySqlStatusSlotOptionalParams = { requestOptions: {} },
): Promise<MigrateMySqlStatus> {
  const result = await _getMigrateMySqlStatusSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getMigrateMySqlStatusSlotDeserialize(result);
}

export function _getMigrateMySqlStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMigrateMySqlStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migratemysql/status{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMigrateMySqlStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateMySqlStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return migrateMySqlStatusDeserializer(result.body);
}

/** Description for Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
export async function getMigrateMySqlStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMigrateMySqlStatusOptionalParams = { requestOptions: {} },
): Promise<MigrateMySqlStatus> {
  const result = await _getMigrateMySqlStatusSend(context, resourceGroupName, name, options);
  return _getMigrateMySqlStatusDeserialize(result);
}

export function _listProcessModulesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsListProcessModulesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/modules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessModulesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessModuleInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processModuleInfoCollectionDeserializer(result.body);
}

/** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
export function listProcessModulesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsListProcessModulesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessModuleInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessModulesSlotSend(context, resourceGroupName, name, processId, slot, options),
    _listProcessModulesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getProcessModuleSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  slot: string,
  options: WebAppsGetProcessModuleSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/modules/{baseAddress}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      baseAddress: baseAddress,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getProcessModuleSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessModuleInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processModuleInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getProcessModuleSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  slot: string,
  options: WebAppsGetProcessModuleSlotOptionalParams = { requestOptions: {} },
): Promise<ProcessModuleInfo> {
  const result = await _getProcessModuleSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    baseAddress,
    slot,
    options,
  );
  return _getProcessModuleSlotDeserialize(result);
}

export function _listInstanceProcessModulesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessModulesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/modules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessModulesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessModuleInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processModuleInfoCollectionDeserializer(result.body);
}

/** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
export function listInstanceProcessModulesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessModulesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessModuleInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInstanceProcessModulesSlotSend(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    _listInstanceProcessModulesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceProcessModuleSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessModuleSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/modules/{baseAddress}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      baseAddress: baseAddress,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessModuleSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessModuleInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processModuleInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcessModuleSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessModuleSlotOptionalParams = { requestOptions: {} },
): Promise<ProcessModuleInfo> {
  const result = await _getInstanceProcessModuleSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    baseAddress,
    slot,
    instanceId,
    options,
  );
  return _getInstanceProcessModuleSlotDeserialize(result);
}

export function _listProcessModulesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsListProcessModulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/modules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessModulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessModuleInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processModuleInfoCollectionDeserializer(result.body);
}

/** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
export function listProcessModules(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsListProcessModulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessModuleInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessModulesSend(context, resourceGroupName, name, processId, options),
    _listProcessModulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getProcessModuleSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  options: WebAppsGetProcessModuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/modules/{baseAddress}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      baseAddress: baseAddress,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getProcessModuleDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessModuleInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processModuleInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getProcessModule(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  options: WebAppsGetProcessModuleOptionalParams = { requestOptions: {} },
): Promise<ProcessModuleInfo> {
  const result = await _getProcessModuleSend(
    context,
    resourceGroupName,
    name,
    processId,
    baseAddress,
    options,
  );
  return _getProcessModuleDeserialize(result);
}

export function _listInstanceProcessModulesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsListInstanceProcessModulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/modules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessModulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessModuleInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processModuleInfoCollectionDeserializer(result.body);
}

/** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
export function listInstanceProcessModules(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsListInstanceProcessModulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessModuleInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInstanceProcessModulesSend(
        context,
        resourceGroupName,
        name,
        processId,
        instanceId,
        options,
      ),
    _listInstanceProcessModulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceProcessModuleSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessModuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/modules/{baseAddress}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      baseAddress: baseAddress,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessModuleDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessModuleInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processModuleInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcessModule(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  baseAddress: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessModuleOptionalParams = { requestOptions: {} },
): Promise<ProcessModuleInfo> {
  const result = await _getInstanceProcessModuleSend(
    context,
    resourceGroupName,
    name,
    processId,
    baseAddress,
    instanceId,
    options,
  );
  return _getInstanceProcessModuleDeserialize(result);
}

export function _listProcessThreadsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsListProcessThreadsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/threads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessThreadsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessThreadInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processThreadInfoCollectionDeserializer(result.body);
}

/** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export function listProcessThreadsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsListProcessThreadsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessThreadInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessThreadsSlotSend(context, resourceGroupName, name, processId, slot, options),
    _listProcessThreadsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getProcessDumpSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsGetProcessDumpSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/dump{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}

export async function _getProcessDumpSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetProcessDumpSlotResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export async function getProcessDumpSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsGetProcessDumpSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetProcessDumpSlotResponse> {
  const streamableMethod = _getProcessDumpSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _getProcessDumpSlotDeserialize(result);
}

export function _listProcessesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListProcessesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processInfoCollectionDeserializer(result.body);
}

/** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export function listProcessesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListProcessesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessesSlotSend(context, resourceGroupName, name, slot, options),
    _listProcessesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteProcessSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsDeleteProcessSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteProcessSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export async function deleteProcessSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsDeleteProcessSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteProcessSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    options,
  );
  return _deleteProcessSlotDeserialize(result);
}

export function _getProcessSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsGetProcessSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getProcessSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getProcessSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  options: WebAppsGetProcessSlotOptionalParams = { requestOptions: {} },
): Promise<ProcessInfo> {
  const result = await _getProcessSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    options,
  );
  return _getProcessSlotDeserialize(result);
}

export function _listInstanceProcessThreadsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessThreadsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/threads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessThreadsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessThreadInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processThreadInfoCollectionDeserializer(result.body);
}

/** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export function listInstanceProcessThreadsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessThreadsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessThreadInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInstanceProcessThreadsSlotSend(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    _listInstanceProcessThreadsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceProcessDumpSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessDumpSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/dump{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessDumpSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetInstanceProcessDumpSlotResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcessDumpSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessDumpSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetInstanceProcessDumpSlotResponse> {
  const streamableMethod = _getInstanceProcessDumpSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    instanceId,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _getInstanceProcessDumpSlotDeserialize(result);
}

export function _listInstanceProcessesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processInfoCollectionDeserializer(result.body);
}

/** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export function listInstanceProcessesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsListInstanceProcessesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInstanceProcessesSlotSend(context, resourceGroupName, name, slot, instanceId, options),
    _listInstanceProcessesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteInstanceProcessSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsDeleteInstanceProcessSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteInstanceProcessSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export async function deleteInstanceProcessSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsDeleteInstanceProcessSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteInstanceProcessSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    instanceId,
    options,
  );
  return _deleteInstanceProcessSlotDeserialize(result);
}

export function _getInstanceProcessSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcessSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessSlotOptionalParams = { requestOptions: {} },
): Promise<ProcessInfo> {
  const result = await _getInstanceProcessSlotSend(
    context,
    resourceGroupName,
    name,
    processId,
    slot,
    instanceId,
    options,
  );
  return _getInstanceProcessSlotDeserialize(result);
}

export function _listProcessThreadsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsListProcessThreadsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/threads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessThreadsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessThreadInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processThreadInfoCollectionDeserializer(result.body);
}

/** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export function listProcessThreads(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsListProcessThreadsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessThreadInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessThreadsSend(context, resourceGroupName, name, processId, options),
    _listProcessThreadsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getProcessDumpSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsGetProcessDumpOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/dump{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}

export async function _getProcessDumpDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetProcessDumpResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export async function getProcessDump(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsGetProcessDumpOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetProcessDumpResponse> {
  const streamableMethod = _getProcessDumpSend(
    context,
    resourceGroupName,
    name,
    processId,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _getProcessDumpDeserialize(result);
}

export function _listProcessesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListProcessesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProcessesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processInfoCollectionDeserializer(result.body);
}

/** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export function listProcesses(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListProcessesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listProcessesSend(context, resourceGroupName, name, options),
    _listProcessesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteProcessSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsDeleteProcessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteProcessDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export async function deleteProcess(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsDeleteProcessOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteProcessSend(context, resourceGroupName, name, processId, options);
  return _deleteProcessDeserialize(result);
}

export function _getProcessSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsGetProcessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getProcessDeserialize(result: PathUncheckedResponse): Promise<ProcessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getProcess(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  options: WebAppsGetProcessOptionalParams = { requestOptions: {} },
): Promise<ProcessInfo> {
  const result = await _getProcessSend(context, resourceGroupName, name, processId, options);
  return _getProcessDeserialize(result);
}

export function _listInstanceProcessThreadsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsListInstanceProcessThreadsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/threads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessThreadsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessThreadInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processThreadInfoCollectionDeserializer(result.body);
}

/** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
export function listInstanceProcessThreads(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsListInstanceProcessThreadsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessThreadInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listInstanceProcessThreadsSend(
        context,
        resourceGroupName,
        name,
        processId,
        instanceId,
        options,
      ),
    _listInstanceProcessThreadsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceProcessDumpSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessDumpOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/dump{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "*/*", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessDumpDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetInstanceProcessDumpResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcessDump(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessDumpOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetInstanceProcessDumpResponse> {
  const streamableMethod = _getInstanceProcessDumpSend(
    context,
    resourceGroupName,
    name,
    processId,
    instanceId,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _getInstanceProcessDumpDeserialize(result);
}

export function _listInstanceProcessesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsListInstanceProcessesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceProcessesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProcessInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _processInfoCollectionDeserializer(result.body);
}

/** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
export function listInstanceProcesses(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsListInstanceProcessesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProcessInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstanceProcessesSend(context, resourceGroupName, name, instanceId, options),
    _listInstanceProcessesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteInstanceProcessSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsDeleteInstanceProcessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteInstanceProcessDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
export async function deleteInstanceProcess(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsDeleteInstanceProcessOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteInstanceProcessSend(
    context,
    resourceGroupName,
    name,
    processId,
    instanceId,
    options,
  );
  return _deleteInstanceProcessDeserialize(result);
}

export function _getInstanceProcessSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      processId: processId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceProcessDeserialize(
  result: PathUncheckedResponse,
): Promise<ProcessInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return processInfoDeserializer(result.body);
}

/** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
export async function getInstanceProcess(
  context: Client,
  resourceGroupName: string,
  name: string,
  processId: string,
  instanceId: string,
  options: WebAppsGetInstanceProcessOptionalParams = { requestOptions: {} },
): Promise<ProcessInfo> {
  const result = await _getInstanceProcessSend(
    context,
    resourceGroupName,
    name,
    processId,
    instanceId,
    options,
  );
  return _getInstanceProcessDeserialize(result);
}

export function _listInstanceIdentifiersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceIdentifiersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceIdentifiersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppInstanceStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppInstanceStatusCollectionDeserializer(result.body);
}

/** Description for Gets all scale-out instances of an app. */
export function listInstanceIdentifiersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceIdentifiersSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebSiteInstanceStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstanceIdentifiersSlotSend(context, resourceGroupName, name, slot, options),
    _listInstanceIdentifiersSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceInfoSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  slot: string,
  options: WebAppsGetInstanceInfoSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceInfoSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebSiteInstanceStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return webSiteInstanceStatusDeserializer(result.body);
}

/** Description for Gets all scale-out instances of an app. */
export async function getInstanceInfoSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  slot: string,
  options: WebAppsGetInstanceInfoSlotOptionalParams = { requestOptions: {} },
): Promise<WebSiteInstanceStatus> {
  const result = await _getInstanceInfoSlotSend(
    context,
    resourceGroupName,
    name,
    instanceId,
    slot,
    options,
  );
  return _getInstanceInfoSlotDeserialize(result);
}

export function _listInstanceIdentifiersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListInstanceIdentifiersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceIdentifiersDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppInstanceStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppInstanceStatusCollectionDeserializer(result.body);
}

/** Description for Gets all scale-out instances of an app. */
export function listInstanceIdentifiers(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListInstanceIdentifiersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebSiteInstanceStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstanceIdentifiersSend(context, resourceGroupName, name, options),
    _listInstanceIdentifiersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getInstanceInfoSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<WebSiteInstanceStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return webSiteInstanceStatusDeserializer(result.body);
}

/** Description for Gets all scale-out instances of an app. */
export async function getInstanceInfo(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceInfoOptionalParams = { requestOptions: {} },
): Promise<WebSiteInstanceStatus> {
  const result = await _getInstanceInfoSend(context, resourceGroupName, name, instanceId, options);
  return _getInstanceInfoDeserialize(result);
}

export function _deleteRelayServiceConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  options: WebAppsDeleteRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteRelayServiceConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a relay service connection by its name. */
export async function deleteRelayServiceConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  options: WebAppsDeleteRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRelayServiceConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    entityName,
    slot,
    options,
  );
  return _deleteRelayServiceConnectionSlotDeserialize(result);
}

export function _updateRelayServiceConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsUpdateRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: relayServiceConnectionEntitySerializer(connectionEnvelope),
  });
}

export async function _updateRelayServiceConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export async function updateRelayServiceConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsUpdateRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _updateRelayServiceConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    entityName,
    slot,
    connectionEnvelope,
    options,
  );
  return _updateRelayServiceConnectionSlotDeserialize(result);
}

export function _createOrUpdateRelayServiceConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: relayServiceConnectionEntitySerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateRelayServiceConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export async function createOrUpdateRelayServiceConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _createOrUpdateRelayServiceConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    entityName,
    slot,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateRelayServiceConnectionSlotDeserialize(result);
}

export function _getRelayServiceConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  options: WebAppsGetRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getRelayServiceConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Gets a hybrid connection configuration by its name. */
export async function getRelayServiceConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  slot: string,
  options: WebAppsGetRelayServiceConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _getRelayServiceConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    entityName,
    slot,
    options,
  );
  return _getRelayServiceConnectionSlotDeserialize(result);
}

export function _deleteRelayServiceConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  options: WebAppsDeleteRelayServiceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteRelayServiceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a relay service connection by its name. */
export async function deleteRelayServiceConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  options: WebAppsDeleteRelayServiceConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteRelayServiceConnectionSend(
    context,
    resourceGroupName,
    name,
    entityName,
    options,
  );
  return _deleteRelayServiceConnectionDeserialize(result);
}

export function _updateRelayServiceConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsUpdateRelayServiceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: relayServiceConnectionEntitySerializer(connectionEnvelope),
  });
}

export async function _updateRelayServiceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export async function updateRelayServiceConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsUpdateRelayServiceConnectionOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _updateRelayServiceConnectionSend(
    context,
    resourceGroupName,
    name,
    entityName,
    connectionEnvelope,
    options,
  );
  return _updateRelayServiceConnectionDeserialize(result);
}

export function _createOrUpdateRelayServiceConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: relayServiceConnectionEntitySerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateRelayServiceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
export async function createOrUpdateRelayServiceConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  connectionEnvelope: RelayServiceConnectionEntity,
  options: WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _createOrUpdateRelayServiceConnectionSend(
    context,
    resourceGroupName,
    name,
    entityName,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateRelayServiceConnectionDeserialize(result);
}

export function _getRelayServiceConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  options: WebAppsGetRelayServiceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getRelayServiceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Gets a hybrid connection configuration by its name. */
export async function getRelayServiceConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  entityName: string,
  options: WebAppsGetRelayServiceConnectionOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _getRelayServiceConnectionSend(
    context,
    resourceGroupName,
    name,
    entityName,
    options,
  );
  return _getRelayServiceConnectionDeserialize(result);
}

export function _listHostNameBindingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHostNameBindingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHostNameBindingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_HostNameBindingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _hostNameBindingCollectionDeserializer(result.body);
}

/** Description for Get hostname bindings for an app or a deployment slot. */
export function listHostNameBindingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHostNameBindingsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HostNameBinding> {
  return buildPagedAsyncIterator(
    context,
    () => _listHostNameBindingsSlotSend(context, resourceGroupName, name, slot, options),
    _listHostNameBindingsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteHostNameBindingSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  hostName: string,
  options: WebAppsDeleteHostNameBindingSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHostNameBindingSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a hostname binding for an app. */
export async function deleteHostNameBindingSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  hostName: string,
  options: WebAppsDeleteHostNameBindingSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHostNameBindingSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    hostName,
    options,
  );
  return _deleteHostNameBindingSlotDeserialize(result);
}

export function _createOrUpdateHostNameBindingSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  slot: string,
  hostNameBinding: HostNameBinding,
  options: WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hostNameBindingSerializer(hostNameBinding),
  });
}

export async function _createOrUpdateHostNameBindingSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HostNameBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostNameBindingDeserializer(result.body);
}

/** Description for Creates a hostname binding for an app. */
export async function createOrUpdateHostNameBindingSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  slot: string,
  hostNameBinding: HostNameBinding,
  options: WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams = { requestOptions: {} },
): Promise<HostNameBinding> {
  const result = await _createOrUpdateHostNameBindingSlotSend(
    context,
    resourceGroupName,
    name,
    hostName,
    slot,
    hostNameBinding,
    options,
  );
  return _createOrUpdateHostNameBindingSlotDeserialize(result);
}

export function _getHostNameBindingSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  hostName: string,
  options: WebAppsGetHostNameBindingSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getHostNameBindingSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HostNameBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostNameBindingDeserializer(result.body);
}

/** Description for Get the named hostname binding for an app (or deployment slot, if specified). */
export async function getHostNameBindingSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  hostName: string,
  options: WebAppsGetHostNameBindingSlotOptionalParams = { requestOptions: {} },
): Promise<HostNameBinding> {
  const result = await _getHostNameBindingSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    hostName,
    options,
  );
  return _getHostNameBindingSlotDeserialize(result);
}

export function _listHostNameBindingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHostNameBindingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHostNameBindingsDeserialize(
  result: PathUncheckedResponse,
): Promise<_HostNameBindingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _hostNameBindingCollectionDeserializer(result.body);
}

/** Description for Get hostname bindings for an app or a deployment slot. */
export function listHostNameBindings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHostNameBindingsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HostNameBinding> {
  return buildPagedAsyncIterator(
    context,
    () => _listHostNameBindingsSend(context, resourceGroupName, name, options),
    _listHostNameBindingsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteHostNameBindingSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  options: WebAppsDeleteHostNameBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHostNameBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a hostname binding for an app. */
export async function deleteHostNameBinding(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  options: WebAppsDeleteHostNameBindingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHostNameBindingSend(
    context,
    resourceGroupName,
    name,
    hostName,
    options,
  );
  return _deleteHostNameBindingDeserialize(result);
}

export function _createOrUpdateHostNameBindingSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  hostNameBinding: HostNameBinding,
  options: WebAppsCreateOrUpdateHostNameBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hostNameBindingSerializer(hostNameBinding),
  });
}

export async function _createOrUpdateHostNameBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<HostNameBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostNameBindingDeserializer(result.body);
}

/** Description for Creates a hostname binding for an app. */
export async function createOrUpdateHostNameBinding(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  hostNameBinding: HostNameBinding,
  options: WebAppsCreateOrUpdateHostNameBindingOptionalParams = { requestOptions: {} },
): Promise<HostNameBinding> {
  const result = await _createOrUpdateHostNameBindingSend(
    context,
    resourceGroupName,
    name,
    hostName,
    hostNameBinding,
    options,
  );
  return _createOrUpdateHostNameBindingDeserialize(result);
}

export function _getHostNameBindingSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  options: WebAppsGetHostNameBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hostName: hostName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getHostNameBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<HostNameBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostNameBindingDeserializer(result.body);
}

/** Description for Get the named hostname binding for an app (or deployment slot, if specified). */
export async function getHostNameBinding(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostName: string,
  options: WebAppsGetHostNameBindingOptionalParams = { requestOptions: {} },
): Promise<HostNameBinding> {
  const result = await _getHostNameBindingSend(context, resourceGroupName, name, hostName, options);
  return _getHostNameBindingDeserialize(result);
}

export function _listFunctionSecretsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsListFunctionSecretsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/listsecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listFunctionSecretsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionSecrets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionSecretsDeserializer(result.body);
}

/** Description for Get function secrets for a function in a web site, or a deployment slot. */
export async function listFunctionSecretsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsListFunctionSecretsSlotOptionalParams = { requestOptions: {} },
): Promise<FunctionSecrets> {
  const result = await _listFunctionSecretsSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    slot,
    options,
  );
  return _listFunctionSecretsSlotDeserialize(result);
}

export function _listFunctionKeysSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsListFunctionKeysSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listFunctionKeysSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Get function keys for a function in a web site, or a deployment slot. */
export async function listFunctionKeysSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsListFunctionKeysSlotOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listFunctionKeysSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    slot,
    options,
  );
  return _listFunctionKeysSlotDeserialize(result);
}

export function _deleteFunctionSecretSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  slot: string,
  options: WebAppsDeleteFunctionSecretSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFunctionSecretSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a function secret. */
export async function deleteFunctionSecretSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  slot: string,
  options: WebAppsDeleteFunctionSecretSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteFunctionSecretSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    keyName,
    slot,
    options,
  );
  return _deleteFunctionSecretSlotDeserialize(result);
}

export function _createOrUpdateFunctionSecretSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  slot: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: keyInfoSerializer(key),
  });
}

export async function _createOrUpdateFunctionSecretSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyInfo> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return keyInfoDeserializer(result.body);
}

/** Description for Add or update a function secret. */
export async function createOrUpdateFunctionSecretSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  slot: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams = { requestOptions: {} },
): Promise<KeyInfo> {
  const result = await _createOrUpdateFunctionSecretSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    keyName,
    slot,
    key,
    options,
  );
  return _createOrUpdateFunctionSecretSlotDeserialize(result);
}

export function _listInstanceFunctionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceFunctionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listInstanceFunctionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_FunctionEnvelopeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _functionEnvelopeCollectionDeserializer(result.body);
}

/** Description for List the functions for a web site, or a deployment slot. */
export function listInstanceFunctionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListInstanceFunctionsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FunctionEnvelope> {
  return buildPagedAsyncIterator(
    context,
    () => _listInstanceFunctionsSlotSend(context, resourceGroupName, name, slot, options),
    _listInstanceFunctionsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteInstanceFunctionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsDeleteInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteInstanceFunctionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a function for web site, or a deployment slot. */
export async function deleteInstanceFunctionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsDeleteInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteInstanceFunctionSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    slot,
    options,
  );
  return _deleteInstanceFunctionSlotDeserialize(result);
}

export function _createInstanceFunctionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  functionEnvelope: FunctionEnvelope,
  options: WebAppsCreateInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: functionEnvelopeSerializer(functionEnvelope),
  });
}

export async function _createInstanceFunctionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionEnvelope> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionEnvelopeDeserializer(result.body);
}

/** Description for Create function for web site, or a deployment slot. */
export function createInstanceFunctionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  functionEnvelope: FunctionEnvelope,
  options: WebAppsCreateInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope> {
  return getLongRunningPoller(
    context,
    _createInstanceFunctionSlotDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createInstanceFunctionSlotSend(
          context,
          resourceGroupName,
          name,
          functionName,
          slot,
          functionEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>;
}

export function _getInstanceFunctionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsGetInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceFunctionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionEnvelopeDeserializer(result.body);
}

/** Description for Get function information by its ID for web site, or a deployment slot. */
export async function getInstanceFunctionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  slot: string,
  options: WebAppsGetInstanceFunctionSlotOptionalParams = { requestOptions: {} },
): Promise<FunctionEnvelope> {
  const result = await _getInstanceFunctionSlotSend(
    context,
    resourceGroupName,
    name,
    functionName,
    slot,
    options,
  );
  return _getInstanceFunctionSlotDeserialize(result);
}

export function _listFunctionSecretsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsListFunctionSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/listsecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listFunctionSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionSecrets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionSecretsDeserializer(result.body);
}

/** Description for Get function secrets for a function in a web site, or a deployment slot. */
export async function listFunctionSecrets(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsListFunctionSecretsOptionalParams = { requestOptions: {} },
): Promise<FunctionSecrets> {
  const result = await _listFunctionSecretsSend(
    context,
    resourceGroupName,
    name,
    functionName,
    options,
  );
  return _listFunctionSecretsDeserialize(result);
}

export function _listFunctionKeysSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsListFunctionKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listFunctionKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Get function keys for a function in a web site, or a deployment slot. */
export async function listFunctionKeys(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsListFunctionKeysOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listFunctionKeysSend(
    context,
    resourceGroupName,
    name,
    functionName,
    options,
  );
  return _listFunctionKeysDeserialize(result);
}

export function _deleteFunctionSecretSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  options: WebAppsDeleteFunctionSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/functions/{functionName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFunctionSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a function secret. */
export async function deleteFunctionSecret(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  options: WebAppsDeleteFunctionSecretOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteFunctionSecretSend(
    context,
    resourceGroupName,
    name,
    functionName,
    keyName,
    options,
  );
  return _deleteFunctionSecretDeserialize(result);
}

export function _createOrUpdateFunctionSecretSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateFunctionSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/functions/{functionName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: keyInfoSerializer(key),
  });
}

export async function _createOrUpdateFunctionSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyInfo> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return keyInfoDeserializer(result.body);
}

/** Description for Add or update a function secret. */
export async function createOrUpdateFunctionSecret(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  keyName: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateFunctionSecretOptionalParams = { requestOptions: {} },
): Promise<KeyInfo> {
  const result = await _createOrUpdateFunctionSecretSend(
    context,
    resourceGroupName,
    name,
    functionName,
    keyName,
    key,
    options,
  );
  return _createOrUpdateFunctionSecretDeserialize(result);
}

export function _listFunctionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListFunctionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listFunctionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_FunctionEnvelopeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _functionEnvelopeCollectionDeserializer(result.body);
}

/** Description for List the functions for a web site, or a deployment slot. */
export function listFunctions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListFunctionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FunctionEnvelope> {
  return buildPagedAsyncIterator(
    context,
    () => _listFunctionsSend(context, resourceGroupName, name, options),
    _listFunctionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteFunctionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsDeleteFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFunctionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a function for web site, or a deployment slot. */
export async function deleteFunction(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsDeleteFunctionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteFunctionSend(context, resourceGroupName, name, functionName, options);
  return _deleteFunctionDeserialize(result);
}

export function _createFunctionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  functionEnvelope: FunctionEnvelope,
  options: WebAppsCreateFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: functionEnvelopeSerializer(functionEnvelope),
  });
}

export async function _createFunctionDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionEnvelope> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionEnvelopeDeserializer(result.body);
}

/** Description for Create function for web site, or a deployment slot. */
export function createFunction(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  functionEnvelope: FunctionEnvelope,
  options: WebAppsCreateFunctionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope> {
  return getLongRunningPoller(context, _createFunctionDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createFunctionSend(
        context,
        resourceGroupName,
        name,
        functionName,
        functionEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>;
}

export function _getFunctionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsGetFunctionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getFunctionDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionEnvelopeDeserializer(result.body);
}

/** Description for Get function information by its ID for web site, or a deployment slot. */
export async function getFunction(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionName: string,
  options: WebAppsGetFunctionOptionalParams = { requestOptions: {} },
): Promise<FunctionEnvelope> {
  const result = await _getFunctionSend(context, resourceGroupName, name, functionName, options);
  return _getFunctionDeserialize(result);
}

export function _getInstanceMSDeployLogSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceMSDeployLogSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceMSDeployLogSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployLog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployLogDeserializer(result.body);
}

/** Description for Get the MSDeploy Log for the last MSDeploy operation. */
export async function getInstanceMSDeployLogSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceMSDeployLogSlotOptionalParams = { requestOptions: {} },
): Promise<MSDeployLog> {
  const result = await _getInstanceMSDeployLogSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    instanceId,
    options,
  );
  return _getInstanceMSDeployLogSlotDeserialize(result);
}

export function _createInstanceMSDeployOperationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: msDeploySerializer(msDeploy),
  });
}

export async function _createInstanceMSDeployOperationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Invoke the MSDeploy web app extension. */
export function createInstanceMSDeployOperationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MSDeployStatus>, MSDeployStatus> {
  return getLongRunningPoller(
    context,
    _createInstanceMSDeployOperationSlotDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createInstanceMSDeployOperationSlotSend(
          context,
          resourceGroupName,
          name,
          slot,
          instanceId,
          msDeploy,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
}

export function _getInstanceMsDeployStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceMsDeployStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceMsDeployStatusSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Get the status of the last MSDeploy operation. */
export async function getInstanceMsDeployStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  instanceId: string,
  options: WebAppsGetInstanceMsDeployStatusSlotOptionalParams = { requestOptions: {} },
): Promise<MSDeployStatus> {
  const result = await _getInstanceMsDeployStatusSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    instanceId,
    options,
  );
  return _getInstanceMsDeployStatusSlotDeserialize(result);
}

export function _getMSDeployLogSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMSDeployLogSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMSDeployLogSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployLog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployLogDeserializer(result.body);
}

/** Description for Get the MSDeploy Log for the last MSDeploy operation. */
export async function getMSDeployLogSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMSDeployLogSlotOptionalParams = { requestOptions: {} },
): Promise<MSDeployLog> {
  const result = await _getMSDeployLogSlotSend(context, resourceGroupName, name, slot, options);
  return _getMSDeployLogSlotDeserialize(result);
}

export function _createMSDeployOperationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateMSDeployOperationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: msDeploySerializer(msDeploy),
  });
}

export async function _createMSDeployOperationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Invoke the MSDeploy web app extension. */
export function createMSDeployOperationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateMSDeployOperationSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MSDeployStatus>, MSDeployStatus> {
  return getLongRunningPoller(
    context,
    _createMSDeployOperationSlotDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createMSDeployOperationSlotSend(context, resourceGroupName, name, slot, msDeploy, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
}

export function _getMSDeployStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMSDeployStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMSDeployStatusSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Get the status of the last MSDeploy operation. */
export async function getMSDeployStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetMSDeployStatusSlotOptionalParams = { requestOptions: {} },
): Promise<MSDeployStatus> {
  const result = await _getMSDeployStatusSlotSend(context, resourceGroupName, name, slot, options);
  return _getMSDeployStatusSlotDeserialize(result);
}

export function _getInstanceMSDeployLogSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceMSDeployLogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceMSDeployLogDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployLog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployLogDeserializer(result.body);
}

/** Description for Get the MSDeploy Log for the last MSDeploy operation. */
export async function getInstanceMSDeployLog(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceMSDeployLogOptionalParams = { requestOptions: {} },
): Promise<MSDeployLog> {
  const result = await _getInstanceMSDeployLogSend(
    context,
    resourceGroupName,
    name,
    instanceId,
    options,
  );
  return _getInstanceMSDeployLogDeserialize(result);
}

export function _createInstanceMSDeployOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateInstanceMSDeployOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: msDeploySerializer(msDeploy),
  });
}

export async function _createInstanceMSDeployOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Invoke the MSDeploy web app extension. */
export function createInstanceMSDeployOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateInstanceMSDeployOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MSDeployStatus>, MSDeployStatus> {
  return getLongRunningPoller(
    context,
    _createInstanceMSDeployOperationDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createInstanceMSDeployOperationSend(
          context,
          resourceGroupName,
          name,
          instanceId,
          msDeploy,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
}

export function _getInstanceMsDeployStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceMsDeployStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceMsDeployStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Get the status of the last MSDeploy operation. */
export async function getInstanceMsDeployStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  instanceId: string,
  options: WebAppsGetInstanceMsDeployStatusOptionalParams = { requestOptions: {} },
): Promise<MSDeployStatus> {
  const result = await _getInstanceMsDeployStatusSend(
    context,
    resourceGroupName,
    name,
    instanceId,
    options,
  );
  return _getInstanceMsDeployStatusDeserialize(result);
}

export function _getMSDeployLogSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMSDeployLogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMSDeployLogDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployLog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployLogDeserializer(result.body);
}

/** Description for Get the MSDeploy Log for the last MSDeploy operation. */
export async function getMSDeployLog(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMSDeployLogOptionalParams = { requestOptions: {} },
): Promise<MSDeployLog> {
  const result = await _getMSDeployLogSend(context, resourceGroupName, name, options);
  return _getMSDeployLogDeserialize(result);
}

export function _createMSDeployOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateMSDeployOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: msDeploySerializer(msDeploy),
  });
}

export async function _createMSDeployOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Invoke the MSDeploy web app extension. */
export function createMSDeployOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  msDeploy: MSDeploy,
  options: WebAppsCreateMSDeployOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MSDeployStatus>, MSDeployStatus> {
  return getLongRunningPoller(context, _createMSDeployOperationDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createMSDeployOperationSend(context, resourceGroupName, name, msDeploy, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
}

export function _getMSDeployStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMSDeployStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMSDeployStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<MSDeployStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return msDeployStatusDeserializer(result.body);
}

/** Description for Get the status of the last MSDeploy operation. */
export async function getMSDeployStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetMSDeployStatusOptionalParams = { requestOptions: {} },
): Promise<MSDeployStatus> {
  const result = await _getMSDeployStatusSend(context, resourceGroupName, name, options);
  return _getMSDeployStatusDeserialize(result);
}

export function _listDomainOwnershipIdentifiersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListDomainOwnershipIdentifiersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDomainOwnershipIdentifiersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_IdentifierCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _identifierCollectionDeserializer(result.body);
}

/** Description for Lists ownership identifiers for domain associated with web app. */
export function listDomainOwnershipIdentifiersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListDomainOwnershipIdentifiersSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Identifier> {
  return buildPagedAsyncIterator(
    context,
    () => _listDomainOwnershipIdentifiersSlotSend(context, resourceGroupName, name, slot, options),
    _listDomainOwnershipIdentifiersSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteDomainOwnershipIdentifierSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  options: WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDomainOwnershipIdentifierSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a domain ownership identifier for a web app. */
export async function deleteDomainOwnershipIdentifierSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  options: WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDomainOwnershipIdentifierSlotSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    slot,
    options,
  );
  return _deleteDomainOwnershipIdentifierSlotDeserialize(result);
}

export function _updateDomainOwnershipIdentifierSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _updateDomainOwnershipIdentifierSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export async function updateDomainOwnershipIdentifierSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): Promise<Identifier> {
  const result = await _updateDomainOwnershipIdentifierSlotSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    slot,
    domainOwnershipIdentifier,
    options,
  );
  return _updateDomainOwnershipIdentifierSlotDeserialize(result);
}

export function _createOrUpdateDomainOwnershipIdentifierSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _createOrUpdateDomainOwnershipIdentifierSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export async function createOrUpdateDomainOwnershipIdentifierSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams = {
    requestOptions: {},
  },
): Promise<Identifier> {
  const result = await _createOrUpdateDomainOwnershipIdentifierSlotSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    slot,
    domainOwnershipIdentifier,
    options,
  );
  return _createOrUpdateDomainOwnershipIdentifierSlotDeserialize(result);
}

export function _getDomainOwnershipIdentifierSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  options: WebAppsGetDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDomainOwnershipIdentifierSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Get domain ownership identifier for web app. */
export async function getDomainOwnershipIdentifierSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  slot: string,
  options: WebAppsGetDomainOwnershipIdentifierSlotOptionalParams = { requestOptions: {} },
): Promise<Identifier> {
  const result = await _getDomainOwnershipIdentifierSlotSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    slot,
    options,
  );
  return _getDomainOwnershipIdentifierSlotDeserialize(result);
}

export function _listDomainOwnershipIdentifiersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListDomainOwnershipIdentifiersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDomainOwnershipIdentifiersDeserialize(
  result: PathUncheckedResponse,
): Promise<_IdentifierCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _identifierCollectionDeserializer(result.body);
}

/** Description for Lists ownership identifiers for domain associated with web app. */
export function listDomainOwnershipIdentifiers(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListDomainOwnershipIdentifiersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Identifier> {
  return buildPagedAsyncIterator(
    context,
    () => _listDomainOwnershipIdentifiersSend(context, resourceGroupName, name, options),
    _listDomainOwnershipIdentifiersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteDomainOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  options: WebAppsDeleteDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDomainOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a domain ownership identifier for a web app. */
export async function deleteDomainOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  options: WebAppsDeleteDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDomainOwnershipIdentifierSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    options,
  );
  return _deleteDomainOwnershipIdentifierDeserialize(result);
}

export function _updateDomainOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsUpdateDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _updateDomainOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export async function updateDomainOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsUpdateDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<Identifier> {
  const result = await _updateDomainOwnershipIdentifierSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    domainOwnershipIdentifier,
    options,
  );
  return _updateDomainOwnershipIdentifierDeserialize(result);
}

export function _createOrUpdateDomainOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identifierSerializer(domainOwnershipIdentifier),
  });
}

export async function _createOrUpdateDomainOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
export async function createOrUpdateDomainOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  domainOwnershipIdentifier: Identifier,
  options: WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<Identifier> {
  const result = await _createOrUpdateDomainOwnershipIdentifierSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    domainOwnershipIdentifier,
    options,
  );
  return _createOrUpdateDomainOwnershipIdentifierDeserialize(result);
}

export function _getDomainOwnershipIdentifierSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  options: WebAppsGetDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainOwnershipIdentifierName: domainOwnershipIdentifierName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDomainOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<Identifier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return identifierDeserializer(result.body);
}

/** Description for Get domain ownership identifier for web app. */
export async function getDomainOwnershipIdentifier(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainOwnershipIdentifierName: string,
  options: WebAppsGetDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<Identifier> {
  const result = await _getDomainOwnershipIdentifierSend(
    context,
    resourceGroupName,
    name,
    domainOwnershipIdentifierName,
    options,
  );
  return _getDomainOwnershipIdentifierDeserialize(result);
}

export function _listDeploymentLogSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsListDeploymentLogSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeploymentLogSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for List deployment log for specific deployment for an app, or a deployment slot. */
export async function listDeploymentLogSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsListDeploymentLogSlotOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _listDeploymentLogSlotSend(
    context,
    resourceGroupName,
    name,
    id,
    slot,
    options,
  );
  return _listDeploymentLogSlotDeserialize(result);
}

export function _listDeploymentsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListDeploymentsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeploymentsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _deploymentCollectionDeserializer(result.body);
}

/** Description for List deployments for an app, or a deployment slot. */
export function listDeploymentsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListDeploymentsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsSlotSend(context, resourceGroupName, name, slot, options),
    _listDeploymentsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteDeploymentSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsDeleteDeploymentSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeploymentSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a deployment by its ID for an app, or a deployment slot. */
export async function deleteDeploymentSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsDeleteDeploymentSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeploymentSlotSend(
    context,
    resourceGroupName,
    name,
    id,
    slot,
    options,
  );
  return _deleteDeploymentSlotDeserialize(result);
}

export function _createDeploymentSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  deployment: Deployment,
  options: WebAppsCreateDeploymentSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentSerializer(deployment),
  });
}

export async function _createDeploymentSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for Create a deployment for an app, or a deployment slot. */
export async function createDeploymentSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  deployment: Deployment,
  options: WebAppsCreateDeploymentSlotOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _createDeploymentSlotSend(
    context,
    resourceGroupName,
    name,
    id,
    slot,
    deployment,
    options,
  );
  return _createDeploymentSlotDeserialize(result);
}

export function _getDeploymentSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsGetDeploymentSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeploymentSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for Get a deployment by its ID for an app, or a deployment slot. */
export async function getDeploymentSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  slot: string,
  options: WebAppsGetDeploymentSlotOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _getDeploymentSlotSend(context, resourceGroupName, name, id, slot, options);
  return _getDeploymentSlotDeserialize(result);
}

export function _listDeploymentLogSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsListDeploymentLogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}/log{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeploymentLogDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for List deployment log for specific deployment for an app, or a deployment slot. */
export async function listDeploymentLog(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsListDeploymentLogOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _listDeploymentLogSend(context, resourceGroupName, name, id, options);
  return _listDeploymentLogDeserialize(result);
}

export function _listDeploymentsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListDeploymentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeploymentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _deploymentCollectionDeserializer(result.body);
}

/** Description for List deployments for an app, or a deployment slot. */
export function listDeployments(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListDeploymentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeploymentsSend(context, resourceGroupName, name, options),
    _listDeploymentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteDeploymentSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsDeleteDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeploymentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a deployment by its ID for an app, or a deployment slot. */
export async function deleteDeployment(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsDeleteDeploymentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeploymentSend(context, resourceGroupName, name, id, options);
  return _deleteDeploymentDeserialize(result);
}

export function _createDeploymentSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  deployment: Deployment,
  options: WebAppsCreateDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentSerializer(deployment),
  });
}

export async function _createDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for Create a deployment for an app, or a deployment slot. */
export async function createDeployment(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  deployment: Deployment,
  options: WebAppsCreateDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _createDeploymentSend(
    context,
    resourceGroupName,
    name,
    id,
    deployment,
    options,
  );
  return _createDeploymentDeserialize(result);
}

export function _getDeploymentSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsGetDeploymentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeploymentDeserialize(
  result: PathUncheckedResponse,
): Promise<Deployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return deploymentDeserializer(result.body);
}

/** Description for Get a deployment by its ID for an app, or a deployment slot. */
export async function getDeployment(
  context: Client,
  resourceGroupName: string,
  name: string,
  id: string,
  options: WebAppsGetDeploymentOptionalParams = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _getDeploymentSend(context, resourceGroupName, name, id, options);
  return _getDeploymentDeserialize(result);
}

export function _listSlotSiteDeploymentStatusesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deploymentStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSlotSiteDeploymentStatusesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmDeploymentStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _csmDeploymentStatusCollectionDeserializer(result.body);
}

/** List deployment statuses for an app (or deployment slot, if specified). */
export function listSlotSiteDeploymentStatusesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmDeploymentStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listSlotSiteDeploymentStatusesSlotSend(context, resourceGroupName, name, slot, options),
    _listSlotSiteDeploymentStatusesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSlotSiteDeploymentStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  deploymentStatusId: string,
  options: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deploymentStatus/{deploymentStatusId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      deploymentStatusId: deploymentStatusId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSlotSiteDeploymentStatusSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmDeploymentStatus> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmDeploymentStatusDeserializer(result.body);
}

/** Gets the deployment status for an app (or deployment slot, if specified). */
export function getSlotSiteDeploymentStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  deploymentStatusId: string,
  options: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus> {
  return getLongRunningPoller(
    context,
    _getSlotSiteDeploymentStatusSlotDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getSlotSiteDeploymentStatusSlotSend(
          context,
          resourceGroupName,
          name,
          slot,
          deploymentStatusId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>;
}

export function _listProductionSiteDeploymentStatusesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListProductionSiteDeploymentStatusesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deploymentStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listProductionSiteDeploymentStatusesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmDeploymentStatusCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _csmDeploymentStatusCollectionDeserializer(result.body);
}

/** List deployment statuses for an app (or deployment slot, if specified). */
export function listProductionSiteDeploymentStatuses(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListProductionSiteDeploymentStatusesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmDeploymentStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listProductionSiteDeploymentStatusesSend(context, resourceGroupName, name, options),
    _listProductionSiteDeploymentStatusesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getProductionSiteDeploymentStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  deploymentStatusId: string,
  options: WebAppsGetProductionSiteDeploymentStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deploymentStatus/{deploymentStatusId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      deploymentStatusId: deploymentStatusId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getProductionSiteDeploymentStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmDeploymentStatus> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmDeploymentStatusDeserializer(result.body);
}

/** Gets the deployment status for an app (or deployment slot, if specified). */
export function getProductionSiteDeploymentStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  deploymentStatusId: string,
  options: WebAppsGetProductionSiteDeploymentStatusOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus> {
  return getLongRunningPoller(
    context,
    _getProductionSiteDeploymentStatusDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getProductionSiteDeploymentStatusSend(
          context,
          resourceGroupName,
          name,
          deploymentStatusId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>;
}

export function _stopContinuousWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsStopContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopContinuousWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop a continuous web job for an app, or a deployment slot. */
export async function stopContinuousWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsStopContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopContinuousWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _stopContinuousWebJobSlotDeserialize(result);
}

export function _startContinuousWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsStartContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startContinuousWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start a continuous web job for an app, or a deployment slot. */
export async function startContinuousWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsStartContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startContinuousWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _startContinuousWebJobSlotDeserialize(result);
}

export function _listContinuousWebJobsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListContinuousWebJobsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listContinuousWebJobsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContinuousWebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _continuousWebJobCollectionDeserializer(result.body);
}

/** Description for List continuous web jobs for an app, or a deployment slot. */
export function listContinuousWebJobsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListContinuousWebJobsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContinuousWebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listContinuousWebJobsSlotSend(context, resourceGroupName, name, slot, options),
    _listContinuousWebJobsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteContinuousWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsDeleteContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteContinuousWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a continuous web job by its ID for an app, or a deployment slot. */
export async function deleteContinuousWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsDeleteContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteContinuousWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _deleteContinuousWebJobSlotDeserialize(result);
}

export function _getContinuousWebJobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getContinuousWebJobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ContinuousWebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return continuousWebJobDeserializer(result.body);
}

/** Description for Gets a continuous web job by its ID for an app, or a deployment slot. */
export async function getContinuousWebJobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  slot: string,
  options: WebAppsGetContinuousWebJobSlotOptionalParams = { requestOptions: {} },
): Promise<ContinuousWebJob> {
  const result = await _getContinuousWebJobSlotSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    slot,
    options,
  );
  return _getContinuousWebJobSlotDeserialize(result);
}

export function _stopContinuousWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsStopContinuousWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopContinuousWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop a continuous web job for an app, or a deployment slot. */
export async function stopContinuousWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsStopContinuousWebJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopContinuousWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _stopContinuousWebJobDeserialize(result);
}

export function _startContinuousWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsStartContinuousWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startContinuousWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start a continuous web job for an app, or a deployment slot. */
export async function startContinuousWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsStartContinuousWebJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startContinuousWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _startContinuousWebJobDeserialize(result);
}

export function _listContinuousWebJobsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListContinuousWebJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listContinuousWebJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContinuousWebJobCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _continuousWebJobCollectionDeserializer(result.body);
}

/** Description for List continuous web jobs for an app, or a deployment slot. */
export function listContinuousWebJobs(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListContinuousWebJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContinuousWebJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listContinuousWebJobsSend(context, resourceGroupName, name, options),
    _listContinuousWebJobsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteContinuousWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsDeleteContinuousWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteContinuousWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a continuous web job by its ID for an app, or a deployment slot. */
export async function deleteContinuousWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsDeleteContinuousWebJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteContinuousWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _deleteContinuousWebJobDeserialize(result);
}

export function _getContinuousWebJobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetContinuousWebJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      webJobName: webJobName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getContinuousWebJobDeserialize(
  result: PathUncheckedResponse,
): Promise<ContinuousWebJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return continuousWebJobDeserializer(result.body);
}

/** Description for Gets a continuous web job by its ID for an app, or a deployment slot. */
export async function getContinuousWebJob(
  context: Client,
  resourceGroupName: string,
  name: string,
  webJobName: string,
  options: WebAppsGetContinuousWebJobOptionalParams = { requestOptions: {} },
): Promise<ContinuousWebJob> {
  const result = await _getContinuousWebJobSend(
    context,
    resourceGroupName,
    name,
    webJobName,
    options,
  );
  return _getContinuousWebJobDeserialize(result);
}

export function _recoverSiteConfigurationSnapshotSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  slot: string,
  options: WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots/{snapshotId}/recover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      snapshotId: snapshotId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverSiteConfigurationSnapshotSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Reverts the configuration of an app to a previous snapshot. */
export async function recoverSiteConfigurationSnapshotSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  slot: string,
  options: WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _recoverSiteConfigurationSnapshotSlotSend(
    context,
    resourceGroupName,
    name,
    snapshotId,
    slot,
    options,
  );
  return _recoverSiteConfigurationSnapshotSlotDeserialize(result);
}

export function _listConfigurationsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConfigurationsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConfigurationsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteConfigResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteConfigResourceCollectionDeserializer(result.body);
}

/** Description for List the configurations of an app */
export function listConfigurationsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConfigurationsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteConfigResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationsSlotSend(context, resourceGroupName, name, slot, options),
    _listConfigurationsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getConfigurationSnapshotSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  slot: string,
  options: WebAppsGetConfigurationSnapshotSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots/{snapshotId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      snapshotId: snapshotId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getConfigurationSnapshotSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Gets a snapshot of the configuration of an app at a previous point in time. */
export async function getConfigurationSnapshotSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  slot: string,
  options: WebAppsGetConfigurationSnapshotSlotOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _getConfigurationSnapshotSlotSend(
    context,
    resourceGroupName,
    name,
    snapshotId,
    slot,
    options,
  );
  return _getConfigurationSnapshotSlotDeserialize(result);
}

export function _listConfigurationSnapshotInfoSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConfigurationSnapshotInfoSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConfigurationSnapshotInfoSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteConfigurationSnapshotInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteConfigurationSnapshotInfoCollectionDeserializer(result.body);
}

/** Description for Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export function listConfigurationSnapshotInfoSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConfigurationSnapshotInfoSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteConfigurationSnapshotInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationSnapshotInfoSlotSend(context, resourceGroupName, name, slot, options),
    _listConfigurationSnapshotInfoSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteConfig: SiteConfigResource,
  options: WebAppsUpdateConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteConfigResourceSerializer(siteConfig),
  });
}

export async function _updateConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Updates the configuration of an app. */
export async function updateConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteConfig: SiteConfigResource,
  options: WebAppsUpdateConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _updateConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteConfig,
    options,
  );
  return _updateConfigurationSlotDeserialize(result);
}

export function _createOrUpdateConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteConfig: SiteConfigResource,
  options: WebAppsCreateOrUpdateConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteConfigResourceSerializer(siteConfig),
  });
}

export async function _createOrUpdateConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Updates the configuration of an app. */
export async function createOrUpdateConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteConfig: SiteConfigResource,
  options: WebAppsCreateOrUpdateConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _createOrUpdateConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteConfig,
    options,
  );
  return _createOrUpdateConfigurationSlotDeserialize(result);
}

export function _getConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export async function getConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _getConfigurationSlotSend(context, resourceGroupName, name, slot, options);
  return _getConfigurationSlotDeserialize(result);
}

export function _recoverSiteConfigurationSnapshotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  options: WebAppsRecoverSiteConfigurationSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots/{snapshotId}/recover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      snapshotId: snapshotId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverSiteConfigurationSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Reverts the configuration of an app to a previous snapshot. */
export async function recoverSiteConfigurationSnapshot(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  options: WebAppsRecoverSiteConfigurationSnapshotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _recoverSiteConfigurationSnapshotSend(
    context,
    resourceGroupName,
    name,
    snapshotId,
    options,
  );
  return _recoverSiteConfigurationSnapshotDeserialize(result);
}

export function _listConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteConfigResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteConfigResourceCollectionDeserializer(result.body);
}

/** Description for List the configurations of an app */
export function listConfigurations(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConfigurationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteConfigResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationsSend(context, resourceGroupName, name, options),
    _listConfigurationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getConfigurationSnapshotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  options: WebAppsGetConfigurationSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots/{snapshotId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      snapshotId: snapshotId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getConfigurationSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Gets a snapshot of the configuration of an app at a previous point in time. */
export async function getConfigurationSnapshot(
  context: Client,
  resourceGroupName: string,
  name: string,
  snapshotId: string,
  options: WebAppsGetConfigurationSnapshotOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _getConfigurationSnapshotSend(
    context,
    resourceGroupName,
    name,
    snapshotId,
    options,
  );
  return _getConfigurationSnapshotDeserialize(result);
}

export function _listConfigurationSnapshotInfoSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConfigurationSnapshotInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConfigurationSnapshotInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteConfigurationSnapshotInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _siteConfigurationSnapshotInfoCollectionDeserializer(result.body);
}

/** Description for Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
export function listConfigurationSnapshotInfo(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConfigurationSnapshotInfoOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SiteConfigurationSnapshotInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationSnapshotInfoSend(context, resourceGroupName, name, options),
    _listConfigurationSnapshotInfoDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteConfig: SiteConfigResource,
  options: WebAppsUpdateConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteConfigResourceSerializer(siteConfig),
  });
}

export async function _updateConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Updates the configuration of an app. */
export async function updateConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteConfig: SiteConfigResource,
  options: WebAppsUpdateConfigurationOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _updateConfigurationSend(
    context,
    resourceGroupName,
    name,
    siteConfig,
    options,
  );
  return _updateConfigurationDeserialize(result);
}

export function _createOrUpdateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteConfig: SiteConfigResource,
  options: WebAppsCreateOrUpdateConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteConfigResourceSerializer(siteConfig),
  });
}

export async function _createOrUpdateConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Updates the configuration of an app. */
export async function createOrUpdateConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteConfig: SiteConfigResource,
  options: WebAppsCreateOrUpdateConfigurationOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _createOrUpdateConfigurationSend(
    context,
    resourceGroupName,
    name,
    siteConfig,
    options,
  );
  return _createOrUpdateConfigurationDeserialize(result);
}

export function _getConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteConfigResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteConfigResourceDeserializer(result.body);
}

/** Description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
export async function getConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetConfigurationOptionalParams = { requestOptions: {} },
): Promise<SiteConfigResource> {
  const result = await _getConfigurationSend(context, resourceGroupName, name, options);
  return _getConfigurationDeserialize(result);
}

export function _updateSlotConfigurationNamesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotConfigNames: SlotConfigNamesResource,
  options: WebAppsUpdateSlotConfigurationNamesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/slotConfigNames{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: slotConfigNamesResourceSerializer(slotConfigNames),
  });
}

export async function _updateSlotConfigurationNamesDeserialize(
  result: PathUncheckedResponse,
): Promise<SlotConfigNamesResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return slotConfigNamesResourceDeserializer(result.body);
}

/** Description for Updates the names of application settings and connection string that remain with the slot during swap operation. */
export async function updateSlotConfigurationNames(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotConfigNames: SlotConfigNamesResource,
  options: WebAppsUpdateSlotConfigurationNamesOptionalParams = { requestOptions: {} },
): Promise<SlotConfigNamesResource> {
  const result = await _updateSlotConfigurationNamesSend(
    context,
    resourceGroupName,
    name,
    slotConfigNames,
    options,
  );
  return _updateSlotConfigurationNamesDeserialize(result);
}

export function _listSlotConfigurationNamesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSlotConfigurationNamesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/slotConfigNames{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSlotConfigurationNamesDeserialize(
  result: PathUncheckedResponse,
): Promise<SlotConfigNamesResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return slotConfigNamesResourceDeserializer(result.body);
}

/** Description for Gets the names of app settings and connection strings that stick to the slot (not swapped). */
export async function listSlotConfigurationNames(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSlotConfigurationNamesOptionalParams = { requestOptions: {} },
): Promise<SlotConfigNamesResource> {
  const result = await _listSlotConfigurationNamesSend(context, resourceGroupName, name, options);
  return _listSlotConfigurationNamesDeserialize(result);
}

export function _updateDiagnosticLogsConfigSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteLogsConfig: SiteLogsConfig,
  options: WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/logs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteLogsConfigSerializer(siteLogsConfig),
  });
}

export async function _updateDiagnosticLogsConfigSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteLogsConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteLogsConfigDeserializer(result.body);
}

/** Description for Updates the logging configuration of an app. */
export async function updateDiagnosticLogsConfigSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteLogsConfig: SiteLogsConfig,
  options: WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams = { requestOptions: {} },
): Promise<SiteLogsConfig> {
  const result = await _updateDiagnosticLogsConfigSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteLogsConfig,
    options,
  );
  return _updateDiagnosticLogsConfigSlotDeserialize(result);
}

export function _getDiagnosticLogsConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/logs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDiagnosticLogsConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteLogsConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteLogsConfigDeserializer(result.body);
}

/** Description for Gets the logging configuration of an app. */
export async function getDiagnosticLogsConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<SiteLogsConfig> {
  const result = await _getDiagnosticLogsConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getDiagnosticLogsConfigurationSlotDeserialize(result);
}

export function _updateDiagnosticLogsConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteLogsConfig: SiteLogsConfig,
  options: WebAppsUpdateDiagnosticLogsConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/logs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteLogsConfigSerializer(siteLogsConfig),
  });
}

export async function _updateDiagnosticLogsConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteLogsConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteLogsConfigDeserializer(result.body);
}

/** Description for Updates the logging configuration of an app. */
export async function updateDiagnosticLogsConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteLogsConfig: SiteLogsConfig,
  options: WebAppsUpdateDiagnosticLogsConfigOptionalParams = { requestOptions: {} },
): Promise<SiteLogsConfig> {
  const result = await _updateDiagnosticLogsConfigSend(
    context,
    resourceGroupName,
    name,
    siteLogsConfig,
    options,
  );
  return _updateDiagnosticLogsConfigDeserialize(result);
}

export function _getDiagnosticLogsConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetDiagnosticLogsConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/logs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDiagnosticLogsConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteLogsConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteLogsConfigDeserializer(result.body);
}

/** Description for Gets the logging configuration of an app. */
export async function getDiagnosticLogsConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetDiagnosticLogsConfigurationOptionalParams = { requestOptions: {} },
): Promise<SiteLogsConfig> {
  const result = await _getDiagnosticLogsConfigurationSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _getDiagnosticLogsConfigurationDeserialize(result);
}

export function _listSiteConnectionStringKeyVaultReferencesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/connectionstrings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteConnectionStringKeyVaultReferencesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiKVReferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _apiKVReferenceCollectionDeserializer(result.body);
}

/** Description for Gets the config reference app settings and status of an app */
export function listSiteConnectionStringKeyVaultReferencesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ApiKVReference> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSiteConnectionStringKeyVaultReferencesSlotSend(
        context,
        resourceGroupName,
        name,
        slot,
        options,
      ),
    _listSiteConnectionStringKeyVaultReferencesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteConnectionStringKeyVaultReferenceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStringKey: string,
  slot: string,
  options: WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/connectionstrings/{connectionStringKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      connectionStringKey: connectionStringKey,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteConnectionStringKeyVaultReferenceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiKVReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return apiKVReferenceDeserializer(result.body);
}

/** Description for Gets the config reference and status of an app */
export async function getSiteConnectionStringKeyVaultReferenceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStringKey: string,
  slot: string,
  options: WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams = {
    requestOptions: {},
  },
): Promise<ApiKVReference> {
  const result = await _getSiteConnectionStringKeyVaultReferenceSlotSend(
    context,
    resourceGroupName,
    name,
    connectionStringKey,
    slot,
    options,
  );
  return _getSiteConnectionStringKeyVaultReferenceSlotDeserialize(result);
}

export function _listAppSettingsKeyVaultReferencesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAppSettingsKeyVaultReferencesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiKVReferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _apiKVReferenceCollectionDeserializer(result.body);
}

/** Description for Gets the config reference app settings and status of an app */
export function listAppSettingsKeyVaultReferencesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiKVReference> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAppSettingsKeyVaultReferencesSlotSend(context, resourceGroupName, name, slot, options),
    _listAppSettingsKeyVaultReferencesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getAppSettingKeyVaultReferenceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettingKey: string,
  slot: string,
  options: WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/appsettings/{appSettingKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      appSettingKey: appSettingKey,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAppSettingKeyVaultReferenceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiKVReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return apiKVReferenceDeserializer(result.body);
}

/** Description for Gets the config reference and status of an app */
export async function getAppSettingKeyVaultReferenceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettingKey: string,
  slot: string,
  options: WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams = { requestOptions: {} },
): Promise<ApiKVReference> {
  const result = await _getAppSettingKeyVaultReferenceSlotSend(
    context,
    resourceGroupName,
    name,
    appSettingKey,
    slot,
    options,
  );
  return _getAppSettingKeyVaultReferenceSlotDeserialize(result);
}

export function _listSiteConnectionStringKeyVaultReferencesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/connectionstrings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteConnectionStringKeyVaultReferencesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiKVReferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _apiKVReferenceCollectionDeserializer(result.body);
}

/** Description for Gets the config reference app settings and status of an app */
export function listSiteConnectionStringKeyVaultReferences(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiKVReference> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSiteConnectionStringKeyVaultReferencesSend(context, resourceGroupName, name, options),
    _listSiteConnectionStringKeyVaultReferencesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteConnectionStringKeyVaultReferenceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStringKey: string,
  options: WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/connectionstrings/{connectionStringKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      connectionStringKey: connectionStringKey,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSiteConnectionStringKeyVaultReferenceDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiKVReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return apiKVReferenceDeserializer(result.body);
}

/** Description for Gets the config reference and status of an app */
export async function getSiteConnectionStringKeyVaultReference(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStringKey: string,
  options: WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams = { requestOptions: {} },
): Promise<ApiKVReference> {
  const result = await _getSiteConnectionStringKeyVaultReferenceSend(
    context,
    resourceGroupName,
    name,
    connectionStringKey,
    options,
  );
  return _getSiteConnectionStringKeyVaultReferenceDeserialize(result);
}

export function _listAppSettingsKeyVaultReferencesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListAppSettingsKeyVaultReferencesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAppSettingsKeyVaultReferencesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiKVReferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _apiKVReferenceCollectionDeserializer(result.body);
}

/** Description for Gets the config reference app settings and status of an app */
export function listAppSettingsKeyVaultReferences(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListAppSettingsKeyVaultReferencesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiKVReference> {
  return buildPagedAsyncIterator(
    context,
    () => _listAppSettingsKeyVaultReferencesSend(context, resourceGroupName, name, options),
    _listAppSettingsKeyVaultReferencesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getAppSettingKeyVaultReferenceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettingKey: string,
  options: WebAppsGetAppSettingKeyVaultReferenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/appsettings/{appSettingKey}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      appSettingKey: appSettingKey,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAppSettingKeyVaultReferenceDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiKVReference> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return apiKVReferenceDeserializer(result.body);
}

/** Description for Gets the config reference and status of an app */
export async function getAppSettingKeyVaultReference(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettingKey: string,
  options: WebAppsGetAppSettingKeyVaultReferenceOptionalParams = { requestOptions: {} },
): Promise<ApiKVReference> {
  const result = await _getAppSettingKeyVaultReferenceSend(
    context,
    resourceGroupName,
    name,
    appSettingKey,
    options,
  );
  return _getAppSettingKeyVaultReferenceDeserialize(result);
}

export function _getAuthSettingsV2SlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsV2SlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsV2SlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
export async function getAuthSettingsV2Slot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsV2SlotOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _getAuthSettingsV2SlotSend(context, resourceGroupName, name, slot, options);
  return _getAuthSettingsV2SlotDeserialize(result);
}

export function _updateAuthSettingsV2SlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteAuthSettingsV2: SiteAuthSettingsV2,
  options: WebAppsUpdateAuthSettingsV2SlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteAuthSettingsV2Serializer(siteAuthSettingsV2),
  });
}

export async function _updateAuthSettingsV2SlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Description for Updates site's Authentication / Authorization settings for apps via the V2 format */
export async function updateAuthSettingsV2Slot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteAuthSettingsV2: SiteAuthSettingsV2,
  options: WebAppsUpdateAuthSettingsV2SlotOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _updateAuthSettingsV2SlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteAuthSettingsV2,
    options,
  );
  return _updateAuthSettingsV2SlotDeserialize(result);
}

export function _getAuthSettingsV2WithoutSecretsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsV2WithoutSecretsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Gets site's Authentication / Authorization settings for apps via the V2 format */
export async function getAuthSettingsV2WithoutSecretsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _getAuthSettingsV2WithoutSecretsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getAuthSettingsV2WithoutSecretsSlotDeserialize(result);
}

export function _getAuthSettingsV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsV2Deserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
export async function getAuthSettingsV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsV2OptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _getAuthSettingsV2Send(context, resourceGroupName, name, options);
  return _getAuthSettingsV2Deserialize(result);
}

export function _updateAuthSettingsV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteAuthSettingsV2: SiteAuthSettingsV2,
  options: WebAppsUpdateAuthSettingsV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteAuthSettingsV2Serializer(siteAuthSettingsV2),
  });
}

export async function _updateAuthSettingsV2Deserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Description for Updates site's Authentication / Authorization settings for apps via the V2 format */
export async function updateAuthSettingsV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteAuthSettingsV2: SiteAuthSettingsV2,
  options: WebAppsUpdateAuthSettingsV2OptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _updateAuthSettingsV2Send(
    context,
    resourceGroupName,
    name,
    siteAuthSettingsV2,
    options,
  );
  return _updateAuthSettingsV2Deserialize(result);
}

export function _getAuthSettingsV2WithoutSecretsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsV2WithoutSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettingsV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsV2Deserializer(result.body);
}

/** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
export async function getAuthSettingsV2WithoutSecrets(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettingsV2> {
  const result = await _getAuthSettingsV2WithoutSecretsSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _getAuthSettingsV2WithoutSecretsDeserialize(result);
}

export function _updateScmAllowedSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateScmAllowedSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/scm{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmPublishingCredentialsPoliciesEntitySerializer(csmPublishingAccessPoliciesEntity),
  });
}

export async function _updateScmAllowedSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Updates whether user publishing credentials are allowed on the site or not. */
export async function updateScmAllowedSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateScmAllowedSlotOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _updateScmAllowedSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    csmPublishingAccessPoliciesEntity,
    options,
  );
  return _updateScmAllowedSlotDeserialize(result);
}

export function _getScmAllowedSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetScmAllowedSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/scm{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getScmAllowedSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Returns whether Scm basic auth is allowed on the site or not. */
export async function getScmAllowedSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetScmAllowedSlotOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _getScmAllowedSlotSend(context, resourceGroupName, name, slot, options);
  return _getScmAllowedSlotDeserialize(result);
}

export function _listBasicPublishingCredentialsPoliciesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBasicPublishingCredentialsPoliciesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublishingCredentialsPoliciesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _publishingCredentialsPoliciesCollectionDeserializer(result.body);
}

/** Description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export function listBasicPublishingCredentialsPoliciesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmPublishingCredentialsPoliciesEntity> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBasicPublishingCredentialsPoliciesSlotSend(
        context,
        resourceGroupName,
        name,
        slot,
        options,
      ),
    _listBasicPublishingCredentialsPoliciesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateFtpAllowedSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateFtpAllowedSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/ftp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmPublishingCredentialsPoliciesEntitySerializer(csmPublishingAccessPoliciesEntity),
  });
}

export async function _updateFtpAllowedSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Updates whether FTP is allowed on the site or not. */
export async function updateFtpAllowedSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateFtpAllowedSlotOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _updateFtpAllowedSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    csmPublishingAccessPoliciesEntity,
    options,
  );
  return _updateFtpAllowedSlotDeserialize(result);
}

export function _getFtpAllowedSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetFtpAllowedSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/ftp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getFtpAllowedSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Returns whether FTP is allowed on the site or not. */
export async function getFtpAllowedSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetFtpAllowedSlotOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _getFtpAllowedSlotSend(context, resourceGroupName, name, slot, options);
  return _getFtpAllowedSlotDeserialize(result);
}

export function _updateScmAllowedSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateScmAllowedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/scm{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmPublishingCredentialsPoliciesEntitySerializer(csmPublishingAccessPoliciesEntity),
  });
}

export async function _updateScmAllowedDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Updates whether user publishing credentials are allowed on the site or not. */
export async function updateScmAllowed(
  context: Client,
  resourceGroupName: string,
  name: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateScmAllowedOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _updateScmAllowedSend(
    context,
    resourceGroupName,
    name,
    csmPublishingAccessPoliciesEntity,
    options,
  );
  return _updateScmAllowedDeserialize(result);
}

export function _getScmAllowedSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetScmAllowedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/scm{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getScmAllowedDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Returns whether Scm basic auth is allowed on the site or not. */
export async function getScmAllowed(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetScmAllowedOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _getScmAllowedSend(context, resourceGroupName, name, options);
  return _getScmAllowedDeserialize(result);
}

export function _listBasicPublishingCredentialsPoliciesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListBasicPublishingCredentialsPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBasicPublishingCredentialsPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublishingCredentialsPoliciesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _publishingCredentialsPoliciesCollectionDeserializer(result.body);
}

/** Description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
export function listBasicPublishingCredentialsPolicies(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListBasicPublishingCredentialsPoliciesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmPublishingCredentialsPoliciesEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listBasicPublishingCredentialsPoliciesSend(context, resourceGroupName, name, options),
    _listBasicPublishingCredentialsPoliciesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateFtpAllowedSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateFtpAllowedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/ftp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmPublishingCredentialsPoliciesEntitySerializer(csmPublishingAccessPoliciesEntity),
  });
}

export async function _updateFtpAllowedDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Updates whether FTP is allowed on the site or not. */
export async function updateFtpAllowed(
  context: Client,
  resourceGroupName: string,
  name: string,
  csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
  options: WebAppsUpdateFtpAllowedOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _updateFtpAllowedSend(
    context,
    resourceGroupName,
    name,
    csmPublishingAccessPoliciesEntity,
    options,
  );
  return _updateFtpAllowedDeserialize(result);
}

export function _getFtpAllowedSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetFtpAllowedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/ftp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getFtpAllowedDeserialize(
  result: PathUncheckedResponse,
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return csmPublishingCredentialsPoliciesEntityDeserializer(result.body);
}

/** Description for Returns whether FTP is allowed on the site or not. */
export async function getFtpAllowed(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetFtpAllowedOptionalParams = { requestOptions: {} },
): Promise<CsmPublishingCredentialsPoliciesEntity> {
  const result = await _getFtpAllowedSend(context, resourceGroupName, name, options);
  return _getFtpAllowedDeserialize(result);
}

export function _restoreSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsRestoreSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restoreRequestSerializer(request),
  });
}

export async function _restoreSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a specific backup to another app (or deployment slot, if specified). */
export function restoreSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsRestoreSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreSlotDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSlotSend(context, resourceGroupName, name, backupId, slot, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBackupStatusSecretsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsListBackupStatusSecretsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _listBackupStatusSecretsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export async function listBackupStatusSecretsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsListBackupStatusSecretsSlotOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _listBackupStatusSecretsSlotSend(
    context,
    resourceGroupName,
    name,
    backupId,
    slot,
    request,
    options,
  );
  return _listBackupStatusSecretsSlotDeserialize(result);
}

export function _listBackupsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListBackupsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBackupsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _backupItemCollectionDeserializer(result.body);
}

/** Description for Gets existing backups of an app. */
export function listBackupsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListBackupsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listBackupsSlotSend(context, resourceGroupName, name, slot, options),
    _listBackupsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteBackupSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  options: WebAppsDeleteBackupSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteBackupSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a backup of an app by its ID. */
export async function deleteBackupSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  options: WebAppsDeleteBackupSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBackupSlotSend(
    context,
    resourceGroupName,
    name,
    backupId,
    slot,
    options,
  );
  return _deleteBackupSlotDeserialize(result);
}

export function _getBackupStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  options: WebAppsGetBackupStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBackupStatusSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Gets a backup of an app by its ID. */
export async function getBackupStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  slot: string,
  options: WebAppsGetBackupStatusSlotOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _getBackupStatusSlotSend(
    context,
    resourceGroupName,
    name,
    backupId,
    slot,
    options,
  );
  return _getBackupStatusSlotDeserialize(result);
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  request: RestoreRequest,
  options: WebAppsRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restoreRequestSerializer(request),
  });
}

export async function _restoreDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a specific backup to another app (or deployment slot, if specified). */
export function restore(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  request: RestoreRequest,
  options: WebAppsRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(context, resourceGroupName, name, backupId, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBackupStatusSecretsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  request: BackupRequest,
  options: WebAppsListBackupStatusSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _listBackupStatusSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
export async function listBackupStatusSecrets(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  request: BackupRequest,
  options: WebAppsListBackupStatusSecretsOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _listBackupStatusSecretsSend(
    context,
    resourceGroupName,
    name,
    backupId,
    request,
    options,
  );
  return _listBackupStatusSecretsDeserialize(result);
}

export function _listBackupsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListBackupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBackupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _backupItemCollectionDeserializer(result.body);
}

/** Description for Gets existing backups of an app. */
export function listBackups(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListBackupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listBackupsSend(context, resourceGroupName, name, options),
    _listBackupsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteBackupSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  options: WebAppsDeleteBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteBackupDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a backup of an app by its ID. */
export async function deleteBackup(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  options: WebAppsDeleteBackupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBackupSend(context, resourceGroupName, name, backupId, options);
  return _deleteBackupDeserialize(result);
}

export function _getBackupStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  options: WebAppsGetBackupStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBackupStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Gets a backup of an app by its ID. */
export async function getBackupStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  backupId: string,
  options: WebAppsGetBackupStatusOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _getBackupStatusSend(context, resourceGroupName, name, backupId, options);
  return _getBackupStatusDeserialize(result);
}

export function _listWorkflowsConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWorkflowsConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/listWorkflowsConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listWorkflowsConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Lists logic app's connections for web site, or a deployment slot. */
export async function listWorkflowsConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListWorkflowsConnectionsOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _listWorkflowsConnectionsSend(context, resourceGroupName, name, options);
  return _listWorkflowsConnectionsDeserialize(result);
}

export function _deployWorkflowArtifactsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeployWorkflowArtifactsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployWorkflowArtifacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["workflowArtifacts"]
      ? options["workflowArtifacts"]
      : workflowArtifactsSerializer(options["workflowArtifacts"]),
  });
}

export async function _deployWorkflowArtifactsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Creates the artifacts for web site, or a deployment slot. */
export async function deployWorkflowArtifacts(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeployWorkflowArtifactsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deployWorkflowArtifactsSend(context, resourceGroupName, name, options);
  return _deployWorkflowArtifactsDeserialize(result);
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmUsageQuotaCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _csmUsageQuotaCollectionDeserializer(result.body);
}

/** Description for Gets the quota usage information of an app (or deployment slot, if specified). */
export function listUsages(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmUsageQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsagesSend(context, resourceGroupName, name, options),
    _listUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _syncFunctionTriggersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncFunctionTriggersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/syncfunctiontriggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncFunctionTriggersDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Syncs function trigger metadata to the management database */
export async function syncFunctionTriggers(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncFunctionTriggersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncFunctionTriggersSend(context, resourceGroupName, name, options);
  return _syncFunctionTriggersDeserialize(result);
}

export function _syncRepositorySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncRepositoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncRepositoryDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Sync web app repository. */
export async function syncRepository(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncRepositoryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncRepositorySend(context, resourceGroupName, name, options);
  return _syncRepositoryDeserialize(result);
}

export function _stopNetworkTraceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopNetworkTraceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/stopNetworkTrace{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopNetworkTraceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop ongoing capturing network packets for the site. */
export async function stopNetworkTrace(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopNetworkTraceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopNetworkTraceSend(context, resourceGroupName, name, options);
  return _stopNetworkTraceDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stops an app (or deployment slot, if specified). */
export async function stop(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, resourceGroupName, name, options);
  return _stopDeserialize(result);
}

export function _startNetworkTraceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartNetworkTraceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/startNetworkTrace{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startNetworkTraceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start capturing network packets for the site. */
export function startNetworkTrace(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartNetworkTraceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startNetworkTraceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startNetworkTraceSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Starts an app (or deployment slot, if specified). */
export async function start(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startSend(context, resourceGroupName, name, options);
  return _startDeserialize(result);
}

export function _listSnapshotsFromDRSecondarySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSnapshotsFromDRSecondaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/snapshotsdr{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSnapshotsFromDRSecondaryDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _snapshotCollectionDeserializer(result.body);
}

/** Description for Returns all Snapshots to the user from DRSecondary endpoint. */
export function listSnapshotsFromDRSecondary(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSnapshotsFromDRSecondaryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listSnapshotsFromDRSecondarySend(context, resourceGroupName, name, options),
    _listSnapshotsFromDRSecondaryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSnapshotsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSnapshotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/snapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSnapshotsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _snapshotCollectionDeserializer(result.body);
}

/** Description for Returns all Snapshots to the user. */
export function listSnapshots(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSnapshotsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listSnapshotsSend(context, resourceGroupName, name, options),
    _listSnapshotsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _swapSlotWithProductionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsSwapSlotWithProductionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slotsswap{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _swapSlotWithProductionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Swaps two deployment slots of an app. */
export function swapSlotWithProduction(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsSwapSlotWithProductionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _swapSlotWithProductionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _swapSlotWithProductionSend(context, resourceGroupName, name, slotSwapEntity, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSlotDifferencesFromProductionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsListSlotDifferencesFromProductionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slotsdiffs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _listSlotDifferencesFromProductionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SlotDifferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _slotDifferenceCollectionDeserializer(result.body);
}

/** Description for Get the difference in configuration settings between two web app slots. */
export function listSlotDifferencesFromProduction(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsListSlotDifferencesFromProductionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SlotDifference> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSlotDifferencesFromProductionSend(
        context,
        resourceGroupName,
        name,
        slotSwapEntity,
        options,
      ),
    _listSlotDifferencesFromProductionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _restoreSnapshotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  restoreRequest: SnapshotRestoreRequest,
  options: WebAppsRestoreSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreSnapshot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: snapshotRestoreRequestSerializer(restoreRequest),
  });
}

export async function _restoreSnapshotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a web app from a snapshot. */
export function restoreSnapshot(
  context: Client,
  resourceGroupName: string,
  name: string,
  restoreRequest: SnapshotRestoreRequest,
  options: WebAppsRestoreSnapshotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreSnapshotDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSnapshotSend(context, resourceGroupName, name, restoreRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreFromDeletedAppSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  restoreRequest: DeletedAppRestoreRequest,
  options: WebAppsRestoreFromDeletedAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromDeletedApp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: deletedAppRestoreRequestSerializer(restoreRequest),
  });
}

export async function _restoreFromDeletedAppDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a deleted web app to this web app. */
export function restoreFromDeletedApp(
  context: Client,
  resourceGroupName: string,
  name: string,
  restoreRequest: DeletedAppRestoreRequest,
  options: WebAppsRestoreFromDeletedAppOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreFromDeletedAppDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreFromDeletedAppSend(context, resourceGroupName, name, restoreRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreFromBackupBlobSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: RestoreRequest,
  options: WebAppsRestoreFromBackupBlobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromBackupBlob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restoreRequestSerializer(request),
  });
}

export async function _restoreFromBackupBlobDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores an app from a backup blob in Azure Storage. */
export function restoreFromBackupBlob(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: RestoreRequest,
  options: WebAppsRestoreFromBackupBlobOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreFromBackupBlobDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreFromBackupBlobSend(context, resourceGroupName, name, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restart{?api%2Dversion,softRestart,synchronous}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      softRestart: options?.softRestart,
      synchronous: options?.synchronous,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restarts an app (or deployment slot, if specified). */
export async function restart(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsRestartOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restartSend(context, resourceGroupName, name, options);
  return _restartDeserialize(result);
}

export function _resetProductionSlotConfigSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsResetProductionSlotConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resetSlotConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetProductionSlotConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export async function resetProductionSlotConfig(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsResetProductionSlotConfigOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetProductionSlotConfigSend(context, resourceGroupName, name, options);
  return _resetProductionSlotConfigDeserialize(result);
}

export function _listPublishingProfileXmlWithSecretsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  publishingProfileOptions: CsmPublishingProfileOptions,
  options: WebAppsListPublishingProfileXmlWithSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publishxml{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
    body: csmPublishingProfileOptionsSerializer(publishingProfileOptions),
  });
}

export async function _listPublishingProfileXmlWithSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsListPublishingProfileXmlWithSecretsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Gets the publishing profile for an app (or deployment slot, if specified). */
export async function listPublishingProfileXmlWithSecrets(
  context: Client,
  resourceGroupName: string,
  name: string,
  publishingProfileOptions: CsmPublishingProfileOptions,
  options: WebAppsListPublishingProfileXmlWithSecretsOptionalParams = { requestOptions: {} },
): Promise<WebAppsListPublishingProfileXmlWithSecretsResponse> {
  const streamableMethod = _listPublishingProfileXmlWithSecretsSend(
    context,
    resourceGroupName,
    name,
    publishingProfileOptions,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _listPublishingProfileXmlWithSecretsDeserialize(result);
}

export function _getPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourcesWrapper> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourcesWrapperDeserializer(result.body);
}

/** Description for Gets the private link resources */
export async function getPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourcesWrapper> {
  const result = await _getPrivateLinkResourcesSend(context, resourceGroupName, name, options);
  return _getPrivateLinkResourcesDeserialize(result);
}

export function _listPremierAddOnsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPremierAddOnsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPremierAddOnsDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Gets the premier add-ons of an app. */
export async function listPremierAddOns(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPremierAddOnsOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _listPremierAddOnsSend(context, resourceGroupName, name, options);
  return _listPremierAddOnsDeserialize(result);
}

export function _getSitePhpErrorLogFlagSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSitePhpErrorLogFlagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/phplogging{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSitePhpErrorLogFlagDeserialize(
  result: PathUncheckedResponse,
): Promise<SitePhpErrorLogFlag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return sitePhpErrorLogFlagDeserializer(result.body);
}

/** Description for Gets web app's event logs. */
export async function getSitePhpErrorLogFlag(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetSitePhpErrorLogFlagOptionalParams = { requestOptions: {} },
): Promise<SitePhpErrorLogFlag> {
  const result = await _getSitePhpErrorLogFlagSend(context, resourceGroupName, name, options);
  return _getSitePhpErrorLogFlagDeserialize(result);
}

export function _listPerfMonCountersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPerfMonCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/perfcounters{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPerfMonCountersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PerfMonCounterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _perfMonCounterCollectionDeserializer(result.body);
}

/** Description for Gets perfmon counters for web app. */
export function listPerfMonCounters(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPerfMonCountersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PerfMonResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listPerfMonCountersSend(context, resourceGroupName, name, options),
    _listPerfMonCountersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _generateNewSitePublishingPasswordSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGenerateNewSitePublishingPasswordOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/newpassword{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _generateNewSitePublishingPasswordDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Generates a new publishing password for an app (or deployment slot, if specified). */
export async function generateNewSitePublishingPassword(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGenerateNewSitePublishingPasswordOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _generateNewSitePublishingPasswordSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _generateNewSitePublishingPasswordDeserialize(result);
}

export function _getNetworkTracesV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTracesV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/networkTraces/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTracesV2Deserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTracesV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTracesV2OptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTracesV2Send(
    context,
    resourceGroupName,
    name,
    operationId,
    options,
  );
  return _getNetworkTracesV2Deserialize(result);
}

export function _getNetworkTraceOperationV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTraceOperationV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/networkTraces/current/operationresults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTraceOperationV2Deserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTraceOperationV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTraceOperationV2OptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTraceOperationV2Send(
    context,
    resourceGroupName,
    name,
    operationId,
    options,
  );
  return _getNetworkTraceOperationV2Deserialize(result);
}

export function _getNetworkTracesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTracesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/networkTrace/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTracesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTraces(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTracesOptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTracesSend(
    context,
    resourceGroupName,
    name,
    operationId,
    options,
  );
  return _getNetworkTracesDeserialize(result);
}

export function _stopWebSiteNetworkTraceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopWebSiteNetworkTraceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopWebSiteNetworkTraceDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop ongoing capturing network packets for the site. */
export async function stopWebSiteNetworkTrace(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStopWebSiteNetworkTraceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopWebSiteNetworkTraceSend(context, resourceGroupName, name, options);
  return _stopWebSiteNetworkTraceDeserialize(result);
}

export function _startWebSiteNetworkTraceOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartWebSiteNetworkTraceOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/startOperation{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startWebSiteNetworkTraceOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start capturing network packets for the site. */
export function startWebSiteNetworkTraceOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartWebSiteNetworkTraceOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _startWebSiteNetworkTraceOperationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _startWebSiteNetworkTraceOperationSend(context, resourceGroupName, name, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _startWebSiteNetworkTraceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartWebSiteNetworkTraceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/start{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startWebSiteNetworkTraceDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsStartWebSiteNetworkTraceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Start capturing network packets for the site (To be deprecated). */
export async function startWebSiteNetworkTrace(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsStartWebSiteNetworkTraceOptionalParams = { requestOptions: {} },
): Promise<WebAppsStartWebSiteNetworkTraceResponse> {
  const result = await _startWebSiteNetworkTraceSend(context, resourceGroupName, name, options);
  return _startWebSiteNetworkTraceDeserialize(result);
}

export function _getNetworkTraceOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTraceOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/networkTrace/operationresults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTraceOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTraceOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  options: WebAppsGetNetworkTraceOperationOptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTraceOperationSend(
    context,
    resourceGroupName,
    name,
    operationId,
    options,
  );
  return _getNetworkTraceOperationDeserialize(result);
}

export function _migrateMySqlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  migrationRequestEnvelope: MigrateMySqlRequest,
  options: WebAppsMigrateMySqlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migratemysql{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateMySqlRequestSerializer(migrationRequestEnvelope),
  });
}

export async function _migrateMySqlDeserialize(result: PathUncheckedResponse): Promise<Operation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return operationDeserializer(result.body);
}

/** Description for Migrates a local (in-app) MySql database to a remote MySql database. */
export function migrateMySql(
  context: Client,
  resourceGroupName: string,
  name: string,
  migrationRequestEnvelope: MigrateMySqlRequest,
  options: WebAppsMigrateMySqlOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Operation>, Operation> {
  return getLongRunningPoller(context, _migrateMySqlDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateMySqlSend(context, resourceGroupName, name, migrationRequestEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<Operation>, Operation>;
}

export function _migrateStorageSend(
  context: Client,
  subscriptionName: string,
  resourceGroupName: string,
  name: string,
  migrationOptions: StorageMigrationOptions,
  options: WebAppsMigrateStorageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migrate{?api%2Dversion,subscriptionName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      subscriptionName: subscriptionName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: storageMigrationOptionsSerializer(migrationOptions),
  });
}

export async function _migrateStorageDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageMigrationResponse> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return storageMigrationResponseDeserializer(result.body);
}

/** Description for Restores a web app. */
export function migrateStorage(
  context: Client,
  subscriptionName: string,
  resourceGroupName: string,
  name: string,
  migrationOptions: StorageMigrationOptions,
  options: WebAppsMigrateStorageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageMigrationResponse>, StorageMigrationResponse> {
  return getLongRunningPoller(context, _migrateStorageDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateStorageSend(
        context,
        subscriptionName,
        resourceGroupName,
        name,
        migrationOptions,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<StorageMigrationResponse>, StorageMigrationResponse>;
}

export function _updateMachineKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsUpdateMachineKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/updatemachinekey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _updateMachineKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsUpdateMachineKeyResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Updates the machine key of an app. */
export async function updateMachineKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsUpdateMachineKeyOptionalParams = { requestOptions: {} },
): Promise<WebAppsUpdateMachineKeyResponse> {
  const result = await _updateMachineKeySend(context, resourceGroupName, name, options);
  return _updateMachineKeyDeserialize(result);
}

export function _listSyncFunctionTriggersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSyncFunctionTriggersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/listsyncfunctiontriggerstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSyncFunctionTriggersDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionSecrets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionSecretsDeserializer(result.body);
}

/** Description for This is to allow calling via powershell and ARM template. */
export async function listSyncFunctionTriggers(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSyncFunctionTriggersOptionalParams = { requestOptions: {} },
): Promise<FunctionSecrets> {
  const result = await _listSyncFunctionTriggersSend(context, resourceGroupName, name, options);
  return _listSyncFunctionTriggersDeserialize(result);
}

export function _listSiteBackupsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteBackupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/listbackups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteBackupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _backupItemCollectionDeserializer(result.body);
}

/** Description for Gets existing backups of an app. */
export function listSiteBackups(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSiteBackupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteBackupsSend(context, resourceGroupName, name, options),
    _listSiteBackupsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _isCloneableSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsIsCloneableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/iscloneable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _isCloneableDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteCloneability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteCloneabilityDeserializer(result.body);
}

/** Description for Shows whether an app can be cloned to another resource group or subscription. */
export async function isCloneable(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsIsCloneableOptionalParams = { requestOptions: {} },
): Promise<SiteCloneability> {
  const result = await _isCloneableSend(context, resourceGroupName, name, options);
  return _isCloneableDeserialize(result);
}

export function _listRelayServiceConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListRelayServiceConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listRelayServiceConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Gets hybrid connections configured for an app (or deployment slot, if specified). */
export async function listRelayServiceConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListRelayServiceConnectionsOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _listRelayServiceConnectionsSend(context, resourceGroupName, name, options);
  return _listRelayServiceConnectionsDeserialize(result);
}

export function _listHybridConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHybridConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionRelays{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHybridConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Retrieves all Service Bus Hybrid Connections used by this Web App. */
export async function listHybridConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHybridConnectionsOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _listHybridConnectionsSend(context, resourceGroupName, name, options);
  return _listHybridConnectionsDeserialize(result);
}

export function _deleteHostSecretSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  options: WebAppsDeleteHostSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/host/default/{keyType}/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      keyType: keyType,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHostSecretDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a host level secret. */
export async function deleteHostSecret(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  options: WebAppsDeleteHostSecretOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHostSecretSend(
    context,
    resourceGroupName,
    name,
    keyType,
    keyName,
    options,
  );
  return _deleteHostSecretDeserialize(result);
}

export function _createOrUpdateHostSecretSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateHostSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/host/default/{keyType}/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      keyType: keyType,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: keyInfoSerializer(key),
  });
}

export async function _createOrUpdateHostSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyInfo> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return keyInfoDeserializer(result.body);
}

/** Description for Add or update a host level secret. */
export async function createOrUpdateHostSecret(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateHostSecretOptionalParams = { requestOptions: {} },
): Promise<KeyInfo> {
  const result = await _createOrUpdateHostSecretSend(
    context,
    resourceGroupName,
    name,
    keyType,
    keyName,
    key,
    options,
  );
  return _createOrUpdateHostSecretDeserialize(result);
}

export function _syncFunctionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncFunctionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncFunctionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Syncs function trigger metadata to the management database */
export async function syncFunctions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsSyncFunctionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncFunctionsSend(context, resourceGroupName, name, options);
  return _syncFunctionsDeserialize(result);
}

export function _listSyncStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSyncStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/listsyncstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _listSyncStatusDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for This is to allow calling via powershell and ARM template. */
export async function listSyncStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSyncStatusOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _listSyncStatusSend(context, resourceGroupName, name, options);
  return _listSyncStatusDeserialize(result);
}

export function _listHostKeysSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHostKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHostKeysDeserialize(result: PathUncheckedResponse): Promise<HostKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostKeysDeserializer(result.body);
}

/** Description for Get host secrets for a function app. */
export async function listHostKeys(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListHostKeysOptionalParams = { requestOptions: {} },
): Promise<HostKeys> {
  const result = await _listHostKeysSend(context, resourceGroupName, name, options);
  return _listHostKeysDeserialize(result);
}

export function _getFunctionsAdminTokenSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetFunctionsAdminTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/admin/token{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getFunctionsAdminTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetFunctionsAdminTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Fetch a short lived token that can be exchanged for a master key. */
export async function getFunctionsAdminToken(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetFunctionsAdminTokenOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetFunctionsAdminTokenResponse> {
  const result = await _getFunctionsAdminTokenSend(context, resourceGroupName, name, options);
  return _getFunctionsAdminTokenDeserialize(result);
}

export function _createOneDeployOperationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsCreateOneDeployOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/onedeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOneDeployOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsCreateOneDeployOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Invoke the OneDeploy publish web app extension. */
export async function createOneDeployOperation(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsCreateOneDeployOperationOptionalParams = { requestOptions: {} },
): Promise<WebAppsCreateOneDeployOperationResponse> {
  const result = await _createOneDeployOperationSend(context, resourceGroupName, name, options);
  return _createOneDeployOperationDeserialize(result);
}

export function _getOneDeployStatusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetOneDeployStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/onedeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOneDeployStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetOneDeployStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
export async function getOneDeployStatus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetOneDeployStatusOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetOneDeployStatusResponse> {
  const result = await _getOneDeployStatusSend(context, resourceGroupName, name, options);
  return _getOneDeployStatusDeserialize(result);
}

export function _discoverBackupSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: RestoreRequest,
  options: WebAppsDiscoverBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/discoverbackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: restoreRequestSerializer(request),
  });
}

export async function _discoverBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return restoreRequestDeserializer(result.body);
}

/** Description for Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export async function discoverBackup(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: RestoreRequest,
  options: WebAppsDiscoverBackupOptionalParams = { requestOptions: {} },
): Promise<RestoreRequest> {
  const result = await _discoverBackupSend(context, resourceGroupName, name, request, options);
  return _discoverBackupDeserialize(result);
}

export function _getContainerLogsZipSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetContainerLogsZipOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/containerlogs/zip/download{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/zip", ...options.requestOptions?.headers },
  });
}

export async function _getContainerLogsZipDeserialize(
  result: PathUncheckedResponse & WebAppsGetContainerLogsZipResponse,
): Promise<WebAppsGetContainerLogsZipResponse> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Description for Gets the ZIP archived docker log files for the given site */
export async function getContainerLogsZip(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetContainerLogsZipOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetContainerLogsZipResponse> {
  const streamableMethod = _getContainerLogsZipSend(context, resourceGroupName, name, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getContainerLogsZipDeserialize(result);
}

export function _getWebSiteContainerLogsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetWebSiteContainerLogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/containerlogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/octet-stream", ...options.requestOptions?.headers },
  });
}

export async function _getWebSiteContainerLogsDeserialize(
  result: PathUncheckedResponse & WebAppsGetWebSiteContainerLogsResponse,
): Promise<WebAppsGetWebSiteContainerLogsResponse> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Description for Gets the last lines of docker logs for the given site */
export async function getWebSiteContainerLogs(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetWebSiteContainerLogsOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetWebSiteContainerLogsResponse> {
  const streamableMethod = _getWebSiteContainerLogsSend(context, resourceGroupName, name, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getWebSiteContainerLogsDeserialize(result);
}

export function _listSitePushSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSitePushSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/pushsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSitePushSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<PushSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return pushSettingsDeserializer(result.body);
}

/** Description for Gets the Push settings associated with web app. */
export async function listSitePushSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSitePushSettingsOptionalParams = { requestOptions: {} },
): Promise<PushSettings> {
  const result = await _listSitePushSettingsSend(context, resourceGroupName, name, options);
  return _listSitePushSettingsDeserialize(result);
}

export function _updateSitePushSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  pushSettings: PushSettings,
  options: WebAppsUpdateSitePushSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/pushsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pushSettingsSerializer(pushSettings),
  });
}

export async function _updateSitePushSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<PushSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return pushSettingsDeserializer(result.body);
}

/** Description for Updates the Push settings associated with web app. */
export async function updateSitePushSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  pushSettings: PushSettings,
  options: WebAppsUpdateSitePushSettingsOptionalParams = { requestOptions: {} },
): Promise<PushSettings> {
  const result = await _updateSitePushSettingsSend(
    context,
    resourceGroupName,
    name,
    pushSettings,
    options,
  );
  return _updateSitePushSettingsDeserialize(result);
}

export function _listPublishingCredentialsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPublishingCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/publishingcredentials/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPublishingCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<User> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return userDeserializer(result.body);
}

/** Description for Gets the Git/FTP publishing credentials of an app. */
export function listPublishingCredentials(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPublishingCredentialsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<User>, User> {
  return getLongRunningPoller(
    context,
    _listPublishingCredentialsDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listPublishingCredentialsSend(context, resourceGroupName, name, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<User>, User>;
}

export function _listMetadataSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/metadata/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the metadata of an app. */
export async function listMetadata(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListMetadataOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listMetadataSend(context, resourceGroupName, name, options);
  return _listMetadataDeserialize(result);
}

export function _updateMetadataSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  metadata: StringDictionary,
  options: WebAppsUpdateMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/metadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(metadata),
  });
}

export async function _updateMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Replaces the metadata of an app. */
export async function updateMetadata(
  context: Client,
  resourceGroupName: string,
  name: string,
  metadata: StringDictionary,
  options: WebAppsUpdateMetadataOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _updateMetadataSend(context, resourceGroupName, name, metadata, options);
  return _updateMetadataDeserialize(result);
}

export function _listConnectionStringsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConnectionStringsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/connectionstrings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConnectionStringsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionStringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectionStringDictionaryDeserializer(result.body);
}

/** Description for Gets the connection strings of an app. */
export async function listConnectionStrings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListConnectionStringsOptionalParams = { requestOptions: {} },
): Promise<ConnectionStringDictionary> {
  const result = await _listConnectionStringsSend(context, resourceGroupName, name, options);
  return _listConnectionStringsDeserialize(result);
}

export function _updateConnectionStringsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStrings: ConnectionStringDictionary,
  options: WebAppsUpdateConnectionStringsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/connectionstrings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionStringDictionarySerializer(connectionStrings),
  });
}

export async function _updateConnectionStringsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionStringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectionStringDictionaryDeserializer(result.body);
}

/** Description for Replaces the connection strings of an app. */
export async function updateConnectionStrings(
  context: Client,
  resourceGroupName: string,
  name: string,
  connectionStrings: ConnectionStringDictionary,
  options: WebAppsUpdateConnectionStringsOptionalParams = { requestOptions: {} },
): Promise<ConnectionStringDictionary> {
  const result = await _updateConnectionStringsSend(
    context,
    resourceGroupName,
    name,
    connectionStrings,
    options,
  );
  return _updateConnectionStringsDeserialize(result);
}

export function _getBackupConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetBackupConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBackupConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupRequestDeserializer(result.body);
}

/** Description for Gets the backup configuration of an app. */
export async function getBackupConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetBackupConfigurationOptionalParams = { requestOptions: {} },
): Promise<BackupRequest> {
  const result = await _getBackupConfigurationSend(context, resourceGroupName, name, options);
  return _getBackupConfigurationDeserialize(result);
}

export function _deleteBackupConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteBackupConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteBackupConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes the backup configuration of an app. */
export async function deleteBackupConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteBackupConfigurationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBackupConfigurationSend(context, resourceGroupName, name, options);
  return _deleteBackupConfigurationDeserialize(result);
}

export function _updateBackupConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: BackupRequest,
  options: WebAppsUpdateBackupConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _updateBackupConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupRequestDeserializer(result.body);
}

/** Description for Updates the backup configuration of an app. */
export async function updateBackupConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: BackupRequest,
  options: WebAppsUpdateBackupConfigurationOptionalParams = { requestOptions: {} },
): Promise<BackupRequest> {
  const result = await _updateBackupConfigurationSend(
    context,
    resourceGroupName,
    name,
    request,
    options,
  );
  return _updateBackupConfigurationDeserialize(result);
}

export function _listAzureStorageAccountsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListAzureStorageAccountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/azurestorageaccounts/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAzureStorageAccountsDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureStoragePropertyDictionaryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return azureStoragePropertyDictionaryResourceDeserializer(result.body);
}

/** Description for Gets the Azure storage account configurations of an app. */
export async function listAzureStorageAccounts(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListAzureStorageAccountsOptionalParams = { requestOptions: {} },
): Promise<AzureStoragePropertyDictionaryResource> {
  const result = await _listAzureStorageAccountsSend(context, resourceGroupName, name, options);
  return _listAzureStorageAccountsDeserialize(result);
}

export function _updateAzureStorageAccountsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  azureStorageAccounts: AzureStoragePropertyDictionaryResource,
  options: WebAppsUpdateAzureStorageAccountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/azurestorageaccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureStoragePropertyDictionaryResourceSerializer(azureStorageAccounts),
  });
}

export async function _updateAzureStorageAccountsDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureStoragePropertyDictionaryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return azureStoragePropertyDictionaryResourceDeserializer(result.body);
}

/** Description for Updates the Azure storage account configurations of an app. */
export async function updateAzureStorageAccounts(
  context: Client,
  resourceGroupName: string,
  name: string,
  azureStorageAccounts: AzureStoragePropertyDictionaryResource,
  options: WebAppsUpdateAzureStorageAccountsOptionalParams = { requestOptions: {} },
): Promise<AzureStoragePropertyDictionaryResource> {
  const result = await _updateAzureStorageAccountsSend(
    context,
    resourceGroupName,
    name,
    azureStorageAccounts,
    options,
  );
  return _updateAzureStorageAccountsDeserialize(result);
}

export function _getAuthSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsDeserializer(result.body);
}

/** Description for Gets the Authentication/Authorization settings of an app. */
export async function getAuthSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetAuthSettingsOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettings> {
  const result = await _getAuthSettingsSend(context, resourceGroupName, name, options);
  return _getAuthSettingsDeserialize(result);
}

export function _updateAuthSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteAuthSettings: SiteAuthSettings,
  options: WebAppsUpdateAuthSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteAuthSettingsSerializer(siteAuthSettings),
  });
}

export async function _updateAuthSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsDeserializer(result.body);
}

/** Description for Updates the Authentication / Authorization settings associated with web app. */
export async function updateAuthSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteAuthSettings: SiteAuthSettings,
  options: WebAppsUpdateAuthSettingsOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettings> {
  const result = await _updateAuthSettingsSend(
    context,
    resourceGroupName,
    name,
    siteAuthSettings,
    options,
  );
  return _updateAuthSettingsDeserialize(result);
}

export function _listApplicationSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListApplicationSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/appsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listApplicationSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of an app. */
export async function listApplicationSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListApplicationSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listApplicationSettingsSend(context, resourceGroupName, name, options);
  return _listApplicationSettingsDeserialize(result);
}

export function _updateApplicationSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: WebAppsUpdateApplicationSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _updateApplicationSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Replaces the application settings of an app. */
export async function updateApplicationSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: WebAppsUpdateApplicationSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _updateApplicationSettingsSend(
    context,
    resourceGroupName,
    name,
    appSettings,
    options,
  );
  return _updateApplicationSettingsDeserialize(result);
}

export function _backupSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: BackupRequest,
  options: WebAppsBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _backupDeserialize(result: PathUncheckedResponse): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Creates a backup of an app. */
export async function backup(
  context: Client,
  resourceGroupName: string,
  name: string,
  request: BackupRequest,
  options: WebAppsBackupOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _backupSend(context, resourceGroupName, name, request, options);
  return _backupDeserialize(result);
}

export function _applySlotConfigToProductionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsApplySlotConfigToProductionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/applySlotConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _applySlotConfigToProductionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Applies the configuration settings from the target slot onto the current slot. */
export async function applySlotConfigToProduction(
  context: Client,
  resourceGroupName: string,
  name: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsApplySlotConfigToProductionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _applySlotConfigToProductionSend(
    context,
    resourceGroupName,
    name,
    slotSwapEntity,
    options,
  );
  return _applySlotConfigToProductionDeserialize(result);
}

export function _analyzeCustomHostnameSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsAnalyzeCustomHostnameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/analyzeCustomHostname{?api%2Dversion,hostName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      hostName: options?.hostName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _analyzeCustomHostnameDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomHostnameAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return customHostnameAnalysisResultDeserializer(result.body);
}

/** Description for Analyze a custom hostname. */
export async function analyzeCustomHostname(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsAnalyzeCustomHostnameOptionalParams = { requestOptions: {} },
): Promise<CustomHostnameAnalysisResult> {
  const result = await _analyzeCustomHostnameSend(context, resourceGroupName, name, options);
  return _analyzeCustomHostnameDeserialize(result);
}

export function _listSend(
  context: Client,
  options: WebAppsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_WebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Get all apps for a subscription. */
export function list(
  context: Client,
  options: WebAppsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}{?api%2Dversion,deleteMetrics,deleteEmptyServerFarm}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      deleteMetrics: options?.deleteMetrics,
      deleteEmptyServerFarm: options?.deleteEmptyServerFarm,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a web, mobile, or API app, or one of the deployment slots. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteEnvelope: SitePatchResource,
  options: WebAppsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sitePatchResourceSerializer(siteEnvelope),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export async function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteEnvelope: SitePatchResource,
  options: WebAppsUpdateOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _updateSend(context, resourceGroupName, name, siteEnvelope, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteEnvelope: Site,
  options: WebAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSerializer(siteEnvelope),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  siteEnvelope: Site,
  options: WebAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Site>, Site> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, siteEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<Site>, Site>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Gets the details of a web, mobile, or API app. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsGetOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}

export function _updateVnetConnectionGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsUpdateVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetGatewaySerializer(connectionEnvelope),
  });
}

export async function _updateVnetConnectionGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export async function updateVnetConnectionGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsUpdateVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _updateVnetConnectionGatewaySend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    connectionEnvelope,
    options,
  );
  return _updateVnetConnectionGatewayDeserialize(result);
}

export function _createOrUpdateVnetConnectionGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetGatewaySerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateVnetConnectionGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export async function createOrUpdateVnetConnectionGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _createOrUpdateVnetConnectionGatewaySend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateVnetConnectionGatewayDeserialize(result);
}

export function _getVnetConnectionGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  options: WebAppsGetVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getVnetConnectionGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Gets an app's Virtual Network gateway. */
export async function getVnetConnectionGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  options: WebAppsGetVnetConnectionGatewayOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _getVnetConnectionGatewaySend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    options,
  );
  return _getVnetConnectionGatewayDeserialize(result);
}

export function _updateVnetConnectionGatewaySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsUpdateVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetGatewaySerializer(connectionEnvelope),
  });
}

export async function _updateVnetConnectionGatewaySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export async function updateVnetConnectionGatewaySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsUpdateVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _updateVnetConnectionGatewaySlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    slot,
    connectionEnvelope,
    options,
  );
  return _updateVnetConnectionGatewaySlotDeserialize(result);
}

export function _createOrUpdateVnetConnectionGatewaySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetGatewaySerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateVnetConnectionGatewaySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
export async function createOrUpdateVnetConnectionGatewaySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  connectionEnvelope: VnetGateway,
  options: WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _createOrUpdateVnetConnectionGatewaySlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    slot,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateVnetConnectionGatewaySlotDeserialize(result);
}

export function _getVnetConnectionGatewaySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  options: WebAppsGetVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getVnetConnectionGatewaySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Gets an app's Virtual Network gateway. */
export async function getVnetConnectionGatewaySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  slot: string,
  options: WebAppsGetVnetConnectionGatewaySlotOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _getVnetConnectionGatewaySlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    slot,
    options,
  );
  return _getVnetConnectionGatewaySlotDeserialize(result);
}

export function _listVnetConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListVnetConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listVnetConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceArrayDeserializer(result.body);
}

/** Description for Gets the virtual networks the app (or deployment slot) is connected to. */
export async function listVnetConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListVnetConnectionsOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource[]> {
  const result = await _listVnetConnectionsSend(context, resourceGroupName, name, options);
  return _listVnetConnectionsDeserialize(result);
}

export function _deleteVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: WebAppsDeleteVnetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a connection from an app (or deployment slot to a named virtual network. */
export async function deleteVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: WebAppsDeleteVnetConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    options,
  );
  return _deleteVnetConnectionDeserialize(result);
}

export function _updateVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsUpdateVnetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetInfoResourceSerializer(connectionEnvelope),
  });
}

export async function _updateVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export async function updateVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsUpdateVnetConnectionOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _updateVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    connectionEnvelope,
    options,
  );
  return _updateVnetConnectionDeserialize(result);
}

export function _createOrUpdateVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsCreateOrUpdateVnetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetInfoResourceSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export async function createOrUpdateVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsCreateOrUpdateVnetConnectionOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _createOrUpdateVnetConnectionSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateVnetConnectionDeserialize(result);
}

export function _getVnetConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: WebAppsGetVnetConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getVnetConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Gets a virtual network the app (or deployment slot) is connected to by name. */
export async function getVnetConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: WebAppsGetVnetConnectionOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _getVnetConnectionSend(context, resourceGroupName, name, vnetName, options);
  return _getVnetConnectionDeserialize(result);
}

export function _listVnetConnectionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListVnetConnectionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listVnetConnectionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceArrayDeserializer(result.body);
}

/** Description for Gets the virtual networks the app (or deployment slot) is connected to. */
export async function listVnetConnectionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListVnetConnectionsSlotOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource[]> {
  const result = await _listVnetConnectionsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listVnetConnectionsSlotDeserialize(result);
}

export function _deleteVnetConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  options: WebAppsDeleteVnetConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVnetConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a connection from an app (or deployment slot to a named virtual network. */
export async function deleteVnetConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  options: WebAppsDeleteVnetConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVnetConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    slot,
    options,
  );
  return _deleteVnetConnectionSlotDeserialize(result);
}

export function _updateVnetConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsUpdateVnetConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetInfoResourceSerializer(connectionEnvelope),
  });
}

export async function _updateVnetConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export async function updateVnetConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsUpdateVnetConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _updateVnetConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    slot,
    connectionEnvelope,
    options,
  );
  return _updateVnetConnectionSlotDeserialize(result);
}

export function _createOrUpdateVnetConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetInfoResourceSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateVnetConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
export async function createOrUpdateVnetConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  connectionEnvelope: VnetInfoResource,
  options: WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _createOrUpdateVnetConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    slot,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateVnetConnectionSlotDeserialize(result);
}

export function _getVnetConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  options: WebAppsGetVnetConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getVnetConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Gets a virtual network the app (or deployment slot) is connected to by name. */
export async function getVnetConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  slot: string,
  options: WebAppsGetVnetConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _getVnetConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    slot,
    options,
  );
  return _getVnetConnectionSlotDeserialize(result);
}

export function _deleteHybridConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  options: WebAppsDeleteHybridConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHybridConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Removes a Hybrid Connection from this site. */
export async function deleteHybridConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  options: WebAppsDeleteHybridConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHybridConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    slot,
    options,
  );
  return _deleteHybridConnectionSlotDeserialize(result);
}

export function _updateHybridConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsUpdateHybridConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridConnectionSerializer(connectionEnvelope),
  });
}

export async function _updateHybridConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Creates a new Hybrid Connection using a Service Bus relay. */
export async function updateHybridConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsUpdateHybridConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _updateHybridConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    slot,
    connectionEnvelope,
    options,
  );
  return _updateHybridConnectionSlotDeserialize(result);
}

export function _createOrUpdateHybridConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridConnectionSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateHybridConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Creates a new Hybrid Connection using a Service Bus relay. */
export async function createOrUpdateHybridConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _createOrUpdateHybridConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    slot,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateHybridConnectionSlotDeserialize(result);
}

export function _getHybridConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  options: WebAppsGetHybridConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getHybridConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export async function getHybridConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  slot: string,
  options: WebAppsGetHybridConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _getHybridConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    slot,
    options,
  );
  return _getHybridConnectionSlotDeserialize(result);
}

export function _deleteHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: WebAppsDeleteHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Removes a Hybrid Connection from this site. */
export async function deleteHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: WebAppsDeleteHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    options,
  );
  return _deleteHybridConnectionDeserialize(result);
}

export function _updateHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsUpdateHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridConnectionSerializer(connectionEnvelope),
  });
}

export async function _updateHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Creates a new Hybrid Connection using a Service Bus relay. */
export async function updateHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsUpdateHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _updateHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    connectionEnvelope,
    options,
  );
  return _updateHybridConnectionDeserialize(result);
}

export function _createOrUpdateHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsCreateOrUpdateHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridConnectionSerializer(connectionEnvelope),
  });
}

export async function _createOrUpdateHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Creates a new Hybrid Connection using a Service Bus relay. */
export async function createOrUpdateHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  connectionEnvelope: HybridConnection,
  options: WebAppsCreateOrUpdateHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _createOrUpdateHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    connectionEnvelope,
    options,
  );
  return _createOrUpdateHybridConnectionDeserialize(result);
}

export function _getHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: WebAppsGetHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
export async function getHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: WebAppsGetHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _getHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    options,
  );
  return _getHybridConnectionDeserialize(result);
}

export function _listPrivateEndpointConnectionListSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPrivateEndpointConnectionListSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPrivateEndpointConnectionListSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionCollectionDeserializer(result.body);
}

/** Description for Gets the list of private endpoint connections associated with a site */
export function listPrivateEndpointConnectionListSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPrivateEndpointConnectionListSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listPrivateEndpointConnectionListSlotSend(context, resourceGroupName, name, slot, options),
    _listPrivateEndpointConnectionListSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePrivateEndpointConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  options: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deletePrivateEndpointConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a private endpoint connection */
export function deletePrivateEndpointConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  options: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionSlotDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSlotSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          slot,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _approveOrRejectPrivateEndpointConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remotePrivateEndpointConnectionARMResourceSerializer(privateEndpointWrapper),
  });
}

export async function _approveOrRejectPrivateEndpointConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Approves or rejects a private endpoint connection */
export function approveOrRejectPrivateEndpointConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<RemotePrivateEndpointConnectionARMResource>,
  RemotePrivateEndpointConnectionARMResource
> {
  return getLongRunningPoller(
    context,
    _approveOrRejectPrivateEndpointConnectionSlotDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _approveOrRejectPrivateEndpointConnectionSlotSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          slot,
          privateEndpointWrapper,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
}

export function _getPrivateEndpointConnectionSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  options: WebAppsGetPrivateEndpointConnectionSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateEndpointConnectionSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Gets a private endpoint connection */
export async function getPrivateEndpointConnectionSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  slot: string,
  options: WebAppsGetPrivateEndpointConnectionSlotOptionalParams = { requestOptions: {} },
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const result = await _getPrivateEndpointConnectionSlotSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    slot,
    options,
  );
  return _getPrivateEndpointConnectionSlotDeserialize(result);
}

export function _listPrivateEndpointConnectionListSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPrivateEndpointConnectionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPrivateEndpointConnectionListDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionCollectionDeserializer(result.body);
}

/** Description for Gets the list of private endpoint connections associated with a site */
export function listPrivateEndpointConnectionList(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListPrivateEndpointConnectionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionListSend(context, resourceGroupName, name, options),
    _listPrivateEndpointConnectionListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: WebAppsDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a private endpoint connection */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: WebAppsDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _approveOrRejectPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remotePrivateEndpointConnectionARMResourceSerializer(privateEndpointWrapper),
  });
}

export async function _approveOrRejectPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Approves or rejects a private endpoint connection */
export function approveOrRejectPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RemotePrivateEndpointConnectionARMResource>,
  RemotePrivateEndpointConnectionARMResource
> {
  return getLongRunningPoller(
    context,
    _approveOrRejectPrivateEndpointConnectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _approveOrRejectPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          privateEndpointWrapper,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: WebAppsGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Gets a private endpoint connection */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: WebAppsGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}

export function _listWorkflowsConnectionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListWorkflowsConnectionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/listWorkflowsConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listWorkflowsConnectionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Lists logic app's connections for web site, or a deployment slot. */
export async function listWorkflowsConnectionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListWorkflowsConnectionsSlotOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _listWorkflowsConnectionsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listWorkflowsConnectionsSlotDeserialize(result);
}

export function _deployWorkflowArtifactsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeployWorkflowArtifactsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployWorkflowArtifacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["workflowArtifacts"]
      ? options["workflowArtifacts"]
      : workflowArtifactsSerializer(options["workflowArtifacts"]),
  });
}

export async function _deployWorkflowArtifactsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Creates the artifacts for web site, or a deployment slot. */
export async function deployWorkflowArtifactsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeployWorkflowArtifactsSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deployWorkflowArtifactsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _deployWorkflowArtifactsSlotDeserialize(result);
}

export function _listUsagesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListUsagesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUsagesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmUsageQuotaCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _csmUsageQuotaCollectionDeserializer(result.body);
}

/** Description for Gets the quota usage information of an app (or deployment slot, if specified). */
export function listUsagesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListUsagesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmUsageQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsagesSlotSend(context, resourceGroupName, name, slot, options),
    _listUsagesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _syncFunctionTriggersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncFunctionTriggersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/syncfunctiontriggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncFunctionTriggersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Syncs function trigger metadata to the management database */
export async function syncFunctionTriggersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncFunctionTriggersSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncFunctionTriggersSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _syncFunctionTriggersSlotDeserialize(result);
}

export function _syncRepositorySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncRepositorySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncRepositorySlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Sync web app repository. */
export async function syncRepositorySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncRepositorySlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncRepositorySlotSend(context, resourceGroupName, name, slot, options);
  return _syncRepositorySlotDeserialize(result);
}

export function _stopNetworkTraceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopNetworkTraceSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/stopNetworkTrace{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopNetworkTraceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop ongoing capturing network packets for the site. */
export async function stopNetworkTraceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopNetworkTraceSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopNetworkTraceSlotSend(context, resourceGroupName, name, slot, options);
  return _stopNetworkTraceSlotDeserialize(result);
}

export function _stopSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stops an app (or deployment slot, if specified). */
export async function stopSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSlotSend(context, resourceGroupName, name, slot, options);
  return _stopSlotDeserialize(result);
}

export function _startNetworkTraceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartNetworkTraceSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/startNetworkTrace{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startNetworkTraceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start capturing network packets for the site. */
export function startNetworkTraceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartNetworkTraceSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startNetworkTraceSlotDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startNetworkTraceSlotSend(context, resourceGroupName, name, slot, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Starts an app (or deployment slot, if specified). */
export async function startSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startSlotSend(context, resourceGroupName, name, slot, options);
  return _startSlotDeserialize(result);
}

export function _listSnapshotsFromDRSecondarySlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSnapshotsFromDRSecondarySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/snapshotsdr{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSnapshotsFromDRSecondarySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _snapshotCollectionDeserializer(result.body);
}

/** Description for Returns all Snapshots to the user from DRSecondary endpoint. */
export function listSnapshotsFromDRSecondarySlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSnapshotsFromDRSecondarySlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listSnapshotsFromDRSecondarySlotSend(context, resourceGroupName, name, slot, options),
    _listSnapshotsFromDRSecondarySlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSnapshotsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSnapshotsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/snapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSnapshotsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _snapshotCollectionDeserializer(result.body);
}

/** Description for Returns all Snapshots to the user. */
export function listSnapshotsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSnapshotsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listSnapshotsSlotSend(context, resourceGroupName, name, slot, options),
    _listSnapshotsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _swapSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsSwapSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/slotsswap{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _swapSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Swaps two deployment slots of an app. */
export function swapSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsSwapSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _swapSlotDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _swapSlotSend(context, resourceGroupName, name, slot, slotSwapEntity, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSlotDifferencesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsListSlotDifferencesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/slotsdiffs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _listSlotDifferencesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_SlotDifferenceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _slotDifferenceCollectionDeserializer(result.body);
}

/** Description for Get the difference in configuration settings between two web app slots. */
export function listSlotDifferencesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsListSlotDifferencesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SlotDifference> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSlotDifferencesSlotSend(context, resourceGroupName, name, slot, slotSwapEntity, options),
    _listSlotDifferencesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _restoreSnapshotSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  restoreRequest: SnapshotRestoreRequest,
  options: WebAppsRestoreSnapshotSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreSnapshot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: snapshotRestoreRequestSerializer(restoreRequest),
  });
}

export async function _restoreSnapshotSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a web app from a snapshot. */
export function restoreSnapshotSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  restoreRequest: SnapshotRestoreRequest,
  options: WebAppsRestoreSnapshotSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreSnapshotSlotDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSnapshotSlotSend(context, resourceGroupName, name, slot, restoreRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restoreFromDeletedAppSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  restoreRequest: DeletedAppRestoreRequest,
  options: WebAppsRestoreFromDeletedAppSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromDeletedApp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: deletedAppRestoreRequestSerializer(restoreRequest),
  });
}

export async function _restoreFromDeletedAppSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores a deleted web app to this web app. */
export function restoreFromDeletedAppSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  restoreRequest: DeletedAppRestoreRequest,
  options: WebAppsRestoreFromDeletedAppSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _restoreFromDeletedAppSlotDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _restoreFromDeletedAppSlotSend(
          context,
          resourceGroupName,
          name,
          slot,
          restoreRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _restoreFromBackupBlobSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsRestoreFromBackupBlobSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromBackupBlob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restoreRequestSerializer(request),
  });
}

export async function _restoreFromBackupBlobSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restores an app from a backup blob in Azure Storage. */
export function restoreFromBackupBlobSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsRestoreFromBackupBlobSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _restoreFromBackupBlobSlotDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _restoreFromBackupBlobSlotSend(context, resourceGroupName, name, slot, request, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _restartSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsRestartSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restart{?api%2Dversion,softRestart,synchronous}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      softRestart: options?.softRestart,
      synchronous: options?.synchronous,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Restarts an app (or deployment slot, if specified). */
export async function restartSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsRestartSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restartSlotSend(context, resourceGroupName, name, slot, options);
  return _restartSlotDeserialize(result);
}

export function _resetSlotConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsResetSlotConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resetSlotConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetSlotConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
export async function resetSlotConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsResetSlotConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetSlotConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _resetSlotConfigurationSlotDeserialize(result);
}

export function _listPublishingProfileXmlWithSecretsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publishingProfileOptions: CsmPublishingProfileOptions,
  options: WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publishxml{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/xml", ...options.requestOptions?.headers },
    body: csmPublishingProfileOptionsSerializer(publishingProfileOptions),
  });
}

export async function _listPublishingProfileXmlWithSecretsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsListPublishingProfileXmlWithSecretsSlotResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Gets the publishing profile for an app (or deployment slot, if specified). */
export async function listPublishingProfileXmlWithSecretsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  publishingProfileOptions: CsmPublishingProfileOptions,
  options: WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsListPublishingProfileXmlWithSecretsSlotResponse> {
  const streamableMethod = _listPublishingProfileXmlWithSecretsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    publishingProfileOptions,
    options,
  );
  const result = await getBinaryResponse(streamableMethod);
  return _listPublishingProfileXmlWithSecretsSlotDeserialize(result);
}

export function _getPrivateLinkResourcesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetPrivateLinkResourcesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateLinkResourcesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourcesWrapper> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourcesWrapperDeserializer(result.body);
}

/** Description for Gets the private link resources */
export async function getPrivateLinkResourcesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetPrivateLinkResourcesSlotOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourcesWrapper> {
  const result = await _getPrivateLinkResourcesSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getPrivateLinkResourcesSlotDeserialize(result);
}

export function _listPremierAddOnsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPremierAddOnsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPremierAddOnsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PremierAddOn> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return premierAddOnDeserializer(result.body);
}

/** Description for Gets the premier add-ons of an app. */
export async function listPremierAddOnsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPremierAddOnsSlotOptionalParams = { requestOptions: {} },
): Promise<PremierAddOn> {
  const result = await _listPremierAddOnsSlotSend(context, resourceGroupName, name, slot, options);
  return _listPremierAddOnsSlotDeserialize(result);
}

export function _getSitePhpErrorLogFlagSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSitePhpErrorLogFlagSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/phplogging{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSitePhpErrorLogFlagSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SitePhpErrorLogFlag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return sitePhpErrorLogFlagDeserializer(result.body);
}

/** Description for Gets web app's event logs. */
export async function getSitePhpErrorLogFlagSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSitePhpErrorLogFlagSlotOptionalParams = { requestOptions: {} },
): Promise<SitePhpErrorLogFlag> {
  const result = await _getSitePhpErrorLogFlagSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getSitePhpErrorLogFlagSlotDeserialize(result);
}

export function _listPerfMonCountersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPerfMonCountersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/perfcounters{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPerfMonCountersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_PerfMonCounterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _perfMonCounterCollectionDeserializer(result.body);
}

/** Description for Gets perfmon counters for web app. */
export function listPerfMonCountersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPerfMonCountersSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PerfMonResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listPerfMonCountersSlotSend(context, resourceGroupName, name, slot, options),
    _listPerfMonCountersSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _generateNewSitePublishingPasswordSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/newpassword{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _generateNewSitePublishingPasswordSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Generates a new publishing password for an app (or deployment slot, if specified). */
export async function generateNewSitePublishingPasswordSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _generateNewSitePublishingPasswordSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _generateNewSitePublishingPasswordSlotDeserialize(result);
}

export function _getNetworkTracesSlotV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTracesSlotV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/networkTraces/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTracesSlotV2Deserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTracesSlotV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTracesSlotV2OptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTracesSlotV2Send(
    context,
    resourceGroupName,
    name,
    operationId,
    slot,
    options,
  );
  return _getNetworkTracesSlotV2Deserialize(result);
}

export function _getNetworkTraceOperationSlotV2Send(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTraceOperationSlotV2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/networkTraces/current/operationresults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTraceOperationSlotV2Deserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTraceOperationSlotV2(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTraceOperationSlotV2OptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTraceOperationSlotV2Send(
    context,
    resourceGroupName,
    name,
    operationId,
    slot,
    options,
  );
  return _getNetworkTraceOperationSlotV2Deserialize(result);
}

export function _getNetworkTracesSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTracesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/networkTrace/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTracesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTracesSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTracesSlotOptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTracesSlotSend(
    context,
    resourceGroupName,
    name,
    operationId,
    slot,
    options,
  );
  return _getNetworkTracesSlotDeserialize(result);
}

export function _stopWebSiteNetworkTraceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopWebSiteNetworkTraceSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopWebSiteNetworkTraceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Stop ongoing capturing network packets for the site. */
export async function stopWebSiteNetworkTraceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStopWebSiteNetworkTraceSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopWebSiteNetworkTraceSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _stopWebSiteNetworkTraceSlotDeserialize(result);
}

export function _startWebSiteNetworkTraceOperationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/startOperation{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startWebSiteNetworkTraceOperationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Start capturing network packets for the site. */
export function startWebSiteNetworkTraceOperationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _startWebSiteNetworkTraceOperationSlotDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _startWebSiteNetworkTraceOperationSlotSend(context, resourceGroupName, name, slot, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _startWebSiteNetworkTraceSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartWebSiteNetworkTraceSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/start{?api%2Dversion,durationInSeconds,maxFrameLength,sasUrl}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      durationInSeconds: options?.durationInSeconds,
      maxFrameLength: options?.maxFrameLength,
      sasUrl: options?.sasUrl,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startWebSiteNetworkTraceSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsStartWebSiteNetworkTraceSlotResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Start capturing network packets for the site (To be deprecated). */
export async function startWebSiteNetworkTraceSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsStartWebSiteNetworkTraceSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsStartWebSiteNetworkTraceSlotResponse> {
  const result = await _startWebSiteNetworkTraceSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _startWebSiteNetworkTraceSlotDeserialize(result);
}

export function _getNetworkTraceOperationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTraceOperationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/networkTrace/operationresults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getNetworkTraceOperationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkTrace[]> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkTraceArrayDeserializer(result.body);
}

/** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
export async function getNetworkTraceOperationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  operationId: string,
  slot: string,
  options: WebAppsGetNetworkTraceOperationSlotOptionalParams = { requestOptions: {} },
): Promise<NetworkTrace[]> {
  const result = await _getNetworkTraceOperationSlotSend(
    context,
    resourceGroupName,
    name,
    operationId,
    slot,
    options,
  );
  return _getNetworkTraceOperationSlotDeserialize(result);
}

export function _listSyncFunctionTriggersSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSyncFunctionTriggersSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/listsyncfunctiontriggerstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSyncFunctionTriggersSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<FunctionSecrets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return functionSecretsDeserializer(result.body);
}

/** Description for This is to allow calling via powershell and ARM template. */
export async function listSyncFunctionTriggersSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSyncFunctionTriggersSlotOptionalParams = { requestOptions: {} },
): Promise<FunctionSecrets> {
  const result = await _listSyncFunctionTriggersSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listSyncFunctionTriggersSlotDeserialize(result);
}

export function _listSiteBackupsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteBackupsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/listbackups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSiteBackupsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _backupItemCollectionDeserializer(result.body);
}

/** Description for Gets existing backups of an app. */
export function listSiteBackupsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSiteBackupsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteBackupsSlotSend(context, resourceGroupName, name, slot, options),
    _listSiteBackupsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _isCloneableSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsIsCloneableSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/iscloneable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _isCloneableSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteCloneability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteCloneabilityDeserializer(result.body);
}

/** Description for Shows whether an app can be cloned to another resource group or subscription. */
export async function isCloneableSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsIsCloneableSlotOptionalParams = { requestOptions: {} },
): Promise<SiteCloneability> {
  const result = await _isCloneableSlotSend(context, resourceGroupName, name, slot, options);
  return _isCloneableSlotDeserialize(result);
}

export function _listRelayServiceConnectionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListRelayServiceConnectionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listRelayServiceConnectionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RelayServiceConnectionEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return relayServiceConnectionEntityDeserializer(result.body);
}

/** Description for Gets hybrid connections configured for an app (or deployment slot, if specified). */
export async function listRelayServiceConnectionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListRelayServiceConnectionsSlotOptionalParams = { requestOptions: {} },
): Promise<RelayServiceConnectionEntity> {
  const result = await _listRelayServiceConnectionsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listRelayServiceConnectionsSlotDeserialize(result);
}

export function _listHybridConnectionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHybridConnectionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionRelays{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHybridConnectionsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Retrieves all Service Bus Hybrid Connections used by this Web App. */
export async function listHybridConnectionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHybridConnectionsSlotOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _listHybridConnectionsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listHybridConnectionsSlotDeserialize(result);
}

export function _deleteHostSecretSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  slot: string,
  options: WebAppsDeleteHostSecretSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/host/default/{keyType}/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      keyType: keyType,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHostSecretSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete a host level secret. */
export async function deleteHostSecretSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  slot: string,
  options: WebAppsDeleteHostSecretSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHostSecretSlotSend(
    context,
    resourceGroupName,
    name,
    keyType,
    keyName,
    slot,
    options,
  );
  return _deleteHostSecretSlotDeserialize(result);
}

export function _createOrUpdateHostSecretSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  slot: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateHostSecretSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/sites/{name}/slots/{slot}/host/default/{keyType}/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      keyType: keyType,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: keyInfoSerializer(key),
  });
}

export async function _createOrUpdateHostSecretSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyInfo> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return keyInfoDeserializer(result.body);
}

/** Description for Add or update a host level secret. */
export async function createOrUpdateHostSecretSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyType: string,
  keyName: string,
  slot: string,
  key: KeyInfo,
  options: WebAppsCreateOrUpdateHostSecretSlotOptionalParams = { requestOptions: {} },
): Promise<KeyInfo> {
  const result = await _createOrUpdateHostSecretSlotSend(
    context,
    resourceGroupName,
    name,
    keyType,
    keyName,
    slot,
    key,
    options,
  );
  return _createOrUpdateHostSecretSlotDeserialize(result);
}

export function _syncFunctionsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncFunctionsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncFunctionsSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Syncs function trigger metadata to the management database */
export async function syncFunctionsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsSyncFunctionsSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncFunctionsSlotSend(context, resourceGroupName, name, slot, options);
  return _syncFunctionsSlotDeserialize(result);
}

export function _listSyncStatusSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSyncStatusSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/listsyncstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _listSyncStatusSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for This is to allow calling via powershell and ARM template. */
export async function listSyncStatusSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSyncStatusSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _listSyncStatusSlotSend(context, resourceGroupName, name, slot, options);
  return _listSyncStatusSlotDeserialize(result);
}

export function _listHostKeysSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHostKeysSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listHostKeysSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<HostKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostKeysDeserializer(result.body);
}

/** Description for Get host secrets for a function app. */
export async function listHostKeysSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListHostKeysSlotOptionalParams = { requestOptions: {} },
): Promise<HostKeys> {
  const result = await _listHostKeysSlotSend(context, resourceGroupName, name, slot, options);
  return _listHostKeysSlotDeserialize(result);
}

export function _getFunctionsAdminTokenSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetFunctionsAdminTokenSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/admin/token{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getFunctionsAdminTokenSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<WebAppsGetFunctionsAdminTokenSlotResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Description for Fetch a short lived token that can be exchanged for a master key. */
export async function getFunctionsAdminTokenSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetFunctionsAdminTokenSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetFunctionsAdminTokenSlotResponse> {
  const result = await _getFunctionsAdminTokenSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getFunctionsAdminTokenSlotDeserialize(result);
}

export function _discoverBackupSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsDiscoverBackupSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/discoverbackup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: restoreRequestSerializer(request),
  });
}

export async function _discoverBackupSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<RestoreRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return restoreRequestDeserializer(result.body);
}

/** Description for Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
export async function discoverBackupSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: RestoreRequest,
  options: WebAppsDiscoverBackupSlotOptionalParams = { requestOptions: {} },
): Promise<RestoreRequest> {
  const result = await _discoverBackupSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    request,
    options,
  );
  return _discoverBackupSlotDeserialize(result);
}

export function _getContainerLogsZipSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetContainerLogsZipSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/containerlogs/zip/download{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/zip", ...options.requestOptions?.headers },
  });
}

export async function _getContainerLogsZipSlotDeserialize(
  result: PathUncheckedResponse & WebAppsGetContainerLogsZipSlotResponse,
): Promise<WebAppsGetContainerLogsZipSlotResponse> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Description for Gets the ZIP archived docker log files for the given site */
export async function getContainerLogsZipSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetContainerLogsZipSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetContainerLogsZipSlotResponse> {
  const streamableMethod = _getContainerLogsZipSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getContainerLogsZipSlotDeserialize(result);
}

export function _getWebSiteContainerLogsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetWebSiteContainerLogsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/containerlogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/octet-stream", ...options.requestOptions?.headers },
  });
}

export async function _getWebSiteContainerLogsSlotDeserialize(
  result: PathUncheckedResponse & WebAppsGetWebSiteContainerLogsSlotResponse,
): Promise<WebAppsGetWebSiteContainerLogsSlotResponse> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Description for Gets the last lines of docker logs for the given site */
export async function getWebSiteContainerLogsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetWebSiteContainerLogsSlotOptionalParams = { requestOptions: {} },
): Promise<WebAppsGetWebSiteContainerLogsSlotResponse> {
  const streamableMethod = _getWebSiteContainerLogsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getWebSiteContainerLogsSlotDeserialize(result);
}

export function _listSitePushSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSitePushSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/pushsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSitePushSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PushSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return pushSettingsDeserializer(result.body);
}

/** Description for Gets the Push settings associated with web app. */
export async function listSitePushSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListSitePushSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<PushSettings> {
  const result = await _listSitePushSettingsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listSitePushSettingsSlotDeserialize(result);
}

export function _updateSitePushSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  pushSettings: PushSettings,
  options: WebAppsUpdateSitePushSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/pushsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: pushSettingsSerializer(pushSettings),
  });
}

export async function _updateSitePushSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<PushSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return pushSettingsDeserializer(result.body);
}

/** Description for Updates the Push settings associated with web app. */
export async function updateSitePushSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  pushSettings: PushSettings,
  options: WebAppsUpdateSitePushSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<PushSettings> {
  const result = await _updateSitePushSettingsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    pushSettings,
    options,
  );
  return _updateSitePushSettingsSlotDeserialize(result);
}

export function _listPublishingCredentialsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPublishingCredentialsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/publishingcredentials/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPublishingCredentialsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<User> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return userDeserializer(result.body);
}

/** Description for Gets the Git/FTP publishing credentials of an app. */
export function listPublishingCredentialsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListPublishingCredentialsSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<User>, User> {
  return getLongRunningPoller(
    context,
    _listPublishingCredentialsSlotDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listPublishingCredentialsSlotSend(context, resourceGroupName, name, slot, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<User>, User>;
}

export function _listMetadataSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListMetadataSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/metadata/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMetadataSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the metadata of an app. */
export async function listMetadataSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListMetadataSlotOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listMetadataSlotSend(context, resourceGroupName, name, slot, options);
  return _listMetadataSlotDeserialize(result);
}

export function _updateMetadataSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  metadata: StringDictionary,
  options: WebAppsUpdateMetadataSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/metadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(metadata),
  });
}

export async function _updateMetadataSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Replaces the metadata of an app. */
export async function updateMetadataSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  metadata: StringDictionary,
  options: WebAppsUpdateMetadataSlotOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _updateMetadataSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    metadata,
    options,
  );
  return _updateMetadataSlotDeserialize(result);
}

export function _listConnectionStringsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConnectionStringsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/connectionstrings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConnectionStringsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionStringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectionStringDictionaryDeserializer(result.body);
}

/** Description for Gets the connection strings of an app. */
export async function listConnectionStringsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListConnectionStringsSlotOptionalParams = { requestOptions: {} },
): Promise<ConnectionStringDictionary> {
  const result = await _listConnectionStringsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listConnectionStringsSlotDeserialize(result);
}

export function _updateConnectionStringsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionStrings: ConnectionStringDictionary,
  options: WebAppsUpdateConnectionStringsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/connectionstrings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectionStringDictionarySerializer(connectionStrings),
  });
}

export async function _updateConnectionStringsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionStringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return connectionStringDictionaryDeserializer(result.body);
}

/** Description for Replaces the connection strings of an app. */
export async function updateConnectionStringsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  connectionStrings: ConnectionStringDictionary,
  options: WebAppsUpdateConnectionStringsSlotOptionalParams = { requestOptions: {} },
): Promise<ConnectionStringDictionary> {
  const result = await _updateConnectionStringsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    connectionStrings,
    options,
  );
  return _updateConnectionStringsSlotDeserialize(result);
}

export function _getBackupConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBackupConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupRequestDeserializer(result.body);
}

/** Description for Gets the backup configuration of an app. */
export async function getBackupConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<BackupRequest> {
  const result = await _getBackupConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _getBackupConfigurationSlotDeserialize(result);
}

export function _deleteBackupConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteBackupConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes the backup configuration of an app. */
export async function deleteBackupConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBackupConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _deleteBackupConfigurationSlotDeserialize(result);
}

export function _updateBackupConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsUpdateBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _updateBackupConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupRequestDeserializer(result.body);
}

/** Description for Updates the backup configuration of an app. */
export async function updateBackupConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsUpdateBackupConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<BackupRequest> {
  const result = await _updateBackupConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    request,
    options,
  );
  return _updateBackupConfigurationSlotDeserialize(result);
}

export function _listAzureStorageAccountsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListAzureStorageAccountsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/azurestorageaccounts/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAzureStorageAccountsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureStoragePropertyDictionaryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return azureStoragePropertyDictionaryResourceDeserializer(result.body);
}

/** Description for Gets the Azure storage account configurations of an app. */
export async function listAzureStorageAccountsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListAzureStorageAccountsSlotOptionalParams = { requestOptions: {} },
): Promise<AzureStoragePropertyDictionaryResource> {
  const result = await _listAzureStorageAccountsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listAzureStorageAccountsSlotDeserialize(result);
}

export function _updateAzureStorageAccountsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  azureStorageAccounts: AzureStoragePropertyDictionaryResource,
  options: WebAppsUpdateAzureStorageAccountsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/azurestorageaccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureStoragePropertyDictionaryResourceSerializer(azureStorageAccounts),
  });
}

export async function _updateAzureStorageAccountsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureStoragePropertyDictionaryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return azureStoragePropertyDictionaryResourceDeserializer(result.body);
}

/** Description for Updates the Azure storage account configurations of an app. */
export async function updateAzureStorageAccountsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  azureStorageAccounts: AzureStoragePropertyDictionaryResource,
  options: WebAppsUpdateAzureStorageAccountsSlotOptionalParams = { requestOptions: {} },
): Promise<AzureStoragePropertyDictionaryResource> {
  const result = await _updateAzureStorageAccountsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    azureStorageAccounts,
    options,
  );
  return _updateAzureStorageAccountsSlotDeserialize(result);
}

export function _getAuthSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAuthSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsDeserializer(result.body);
}

/** Description for Gets the Authentication/Authorization settings of an app. */
export async function getAuthSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetAuthSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettings> {
  const result = await _getAuthSettingsSlotSend(context, resourceGroupName, name, slot, options);
  return _getAuthSettingsSlotDeserialize(result);
}

export function _updateAuthSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteAuthSettings: SiteAuthSettings,
  options: WebAppsUpdateAuthSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteAuthSettingsSerializer(siteAuthSettings),
  });
}

export async function _updateAuthSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteAuthSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteAuthSettingsDeserializer(result.body);
}

/** Description for Updates the Authentication / Authorization settings associated with web app. */
export async function updateAuthSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteAuthSettings: SiteAuthSettings,
  options: WebAppsUpdateAuthSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<SiteAuthSettings> {
  const result = await _updateAuthSettingsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteAuthSettings,
    options,
  );
  return _updateAuthSettingsSlotDeserialize(result);
}

export function _listApplicationSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListApplicationSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/appsettings/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listApplicationSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of an app. */
export async function listApplicationSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsListApplicationSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listApplicationSettingsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _listApplicationSettingsSlotDeserialize(result);
}

export function _updateApplicationSettingsSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  appSettings: StringDictionary,
  options: WebAppsUpdateApplicationSettingsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _updateApplicationSettingsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Replaces the application settings of an app. */
export async function updateApplicationSettingsSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  appSettings: StringDictionary,
  options: WebAppsUpdateApplicationSettingsSlotOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _updateApplicationSettingsSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    appSettings,
    options,
  );
  return _updateApplicationSettingsSlotDeserialize(result);
}

export function _backupSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsBackupSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backupRequestSerializer(request),
  });
}

export async function _backupSlotDeserialize(result: PathUncheckedResponse): Promise<BackupItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return backupItemDeserializer(result.body);
}

/** Description for Creates a backup of an app. */
export async function backupSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  request: BackupRequest,
  options: WebAppsBackupSlotOptionalParams = { requestOptions: {} },
): Promise<BackupItem> {
  const result = await _backupSlotSend(context, resourceGroupName, name, slot, request, options);
  return _backupSlotDeserialize(result);
}

export function _applySlotConfigurationSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsApplySlotConfigurationSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/applySlotConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmSlotEntitySerializer(slotSwapEntity),
  });
}

export async function _applySlotConfigurationSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Applies the configuration settings from the target slot onto the current slot. */
export async function applySlotConfigurationSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  slotSwapEntity: CsmSlotEntity,
  options: WebAppsApplySlotConfigurationSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _applySlotConfigurationSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    slotSwapEntity,
    options,
  );
  return _applySlotConfigurationSlotDeserialize(result);
}

export function _analyzeCustomHostnameSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsAnalyzeCustomHostnameSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/analyzeCustomHostname{?api%2Dversion,hostName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      hostName: options?.hostName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _analyzeCustomHostnameSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomHostnameAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return customHostnameAnalysisResultDeserializer(result.body);
}

/** Description for Analyze a custom hostname. */
export async function analyzeCustomHostnameSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsAnalyzeCustomHostnameSlotOptionalParams = { requestOptions: {} },
): Promise<CustomHostnameAnalysisResult> {
  const result = await _analyzeCustomHostnameSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    options,
  );
  return _analyzeCustomHostnameSlotDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WebAppsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites{?api%2Dversion,includeSlots}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      includeSlots: options?.includeSlots,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Gets all web, mobile, and API apps in the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WebAppsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}{?api%2Dversion,deleteMetrics,deleteEmptyServerFarm}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      deleteMetrics: options?.deleteMetrics,
      deleteEmptyServerFarm: options?.deleteEmptyServerFarm,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSlotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a web, mobile, or API app, or one of the deployment slots. */
export async function deleteSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsDeleteSlotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSlotSend(context, resourceGroupName, name, slot, options);
  return _deleteSlotDeserialize(result);
}

export function _updateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteEnvelope: SitePatchResource,
  options: WebAppsUpdateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sitePatchResourceSerializer(siteEnvelope),
  });
}

export async function _updateSlotDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export async function updateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteEnvelope: SitePatchResource,
  options: WebAppsUpdateSlotOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _updateSlotSend(
    context,
    resourceGroupName,
    name,
    slot,
    siteEnvelope,
    options,
  );
  return _updateSlotDeserialize(result);
}

export function _createOrUpdateSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteEnvelope: Site,
  options: WebAppsCreateOrUpdateSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSerializer(siteEnvelope),
  });
}

export async function _createOrUpdateSlotDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
export function createOrUpdateSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  siteEnvelope: Site,
  options: WebAppsCreateOrUpdateSlotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Site>, Site> {
  return getLongRunningPoller(context, _createOrUpdateSlotDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSlotSend(context, resourceGroupName, name, slot, siteEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<Site>, Site>;
}

export function _getSlotSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSlotDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return siteDeserializer(result.body);
}

/** Description for Gets the details of a web, mobile, or API app. */
export async function getSlot(
  context: Client,
  resourceGroupName: string,
  name: string,
  slot: string,
  options: WebAppsGetSlotOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _getSlotSend(context, resourceGroupName, name, slot, options);
  return _getSlotDeserialize(result);
}

export function _listSlotsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSlotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSlotsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Gets an app's deployment slots. */
export function listSlots(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: WebAppsListSlotsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listSlotsSend(context, resourceGroupName, name, options),
    _listSlotsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
