// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  listWorkflows,
  getWorkflow,
  listInstanceWorkflowsSlot,
  getInstanceWorkflowSlot,
  listWebJobs,
  getWebJob,
  listWebJobsSlot,
  getWebJobSlot,
  listTriggeredWebJobHistory,
  getTriggeredWebJobHistory,
  listTriggeredWebJobHistorySlot,
  getTriggeredWebJobHistorySlot,
  runTriggeredWebJob,
  listTriggeredWebJobs,
  deleteTriggeredWebJob,
  getTriggeredWebJob,
  runTriggeredWebJobSlot,
  listTriggeredWebJobsSlot,
  deleteTriggeredWebJobSlot,
  getTriggeredWebJobSlot,
  deleteSourceControl,
  updateSourceControl,
  createOrUpdateSourceControl,
  getSourceControl,
  deleteSourceControlSlot,
  updateSourceControlSlot,
  createOrUpdateSourceControlSlot,
  getSourceControlSlot,
  listSiteExtensionsSlot,
  deleteSiteExtensionSlot,
  installSiteExtensionSlot,
  getSiteExtensionSlot,
  listSiteExtensions,
  deleteSiteExtension,
  installSiteExtension,
  getSiteExtension,
  listSiteContainersSlot,
  deleteSiteContainerSlot,
  createOrUpdateSiteContainerSlot,
  getSiteContainerSlot,
  listSiteContainers,
  deleteSiteContainer,
  createOrUpdateSiteContainer,
  getSiteContainer,
  listPublicCertificatesSlot,
  deletePublicCertificateSlot,
  createOrUpdatePublicCertificateSlot,
  getPublicCertificateSlot,
  listPublicCertificates,
  deletePublicCertificate,
  createOrUpdatePublicCertificate,
  getPublicCertificate,
  putPrivateAccessVnetSlot,
  getPrivateAccessSlot,
  putPrivateAccessVnet,
  getPrivateAccess,
  deletePremierAddOnSlot,
  updatePremierAddOnSlot,
  addPremierAddOnSlot,
  getPremierAddOnSlot,
  deletePremierAddOn,
  updatePremierAddOn,
  addPremierAddOn,
  getPremierAddOn,
  listNetworkFeaturesSlot,
  listNetworkFeatures,
  deleteSwiftVirtualNetworkSlot,
  updateSwiftVirtualNetworkConnectionWithCheckSlot,
  createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot,
  getSwiftVirtualNetworkConnectionSlot,
  deleteSwiftVirtualNetwork,
  updateSwiftVirtualNetworkConnectionWithCheck,
  createOrUpdateSwiftVirtualNetworkConnectionWithCheck,
  getSwiftVirtualNetworkConnection,
  getMigrateMySqlStatusSlot,
  getMigrateMySqlStatus,
  listProcessModulesSlot,
  getProcessModuleSlot,
  listInstanceProcessModulesSlot,
  getInstanceProcessModuleSlot,
  listProcessModules,
  getProcessModule,
  listInstanceProcessModules,
  getInstanceProcessModule,
  listProcessThreadsSlot,
  getProcessDumpSlot,
  listProcessesSlot,
  deleteProcessSlot,
  getProcessSlot,
  listInstanceProcessThreadsSlot,
  getInstanceProcessDumpSlot,
  listInstanceProcessesSlot,
  deleteInstanceProcessSlot,
  getInstanceProcessSlot,
  listProcessThreads,
  getProcessDump,
  listProcesses,
  deleteProcess,
  getProcess,
  listInstanceProcessThreads,
  getInstanceProcessDump,
  listInstanceProcesses,
  deleteInstanceProcess,
  getInstanceProcess,
  listInstanceIdentifiersSlot,
  getInstanceInfoSlot,
  listInstanceIdentifiers,
  getInstanceInfo,
  deleteRelayServiceConnectionSlot,
  updateRelayServiceConnectionSlot,
  createOrUpdateRelayServiceConnectionSlot,
  getRelayServiceConnectionSlot,
  deleteRelayServiceConnection,
  updateRelayServiceConnection,
  createOrUpdateRelayServiceConnection,
  getRelayServiceConnection,
  listHostNameBindingsSlot,
  deleteHostNameBindingSlot,
  createOrUpdateHostNameBindingSlot,
  getHostNameBindingSlot,
  listHostNameBindings,
  deleteHostNameBinding,
  createOrUpdateHostNameBinding,
  getHostNameBinding,
  listFunctionSecretsSlot,
  listFunctionKeysSlot,
  deleteFunctionSecretSlot,
  createOrUpdateFunctionSecretSlot,
  listInstanceFunctionsSlot,
  deleteInstanceFunctionSlot,
  createInstanceFunctionSlot,
  getInstanceFunctionSlot,
  listFunctionSecrets,
  listFunctionKeys,
  deleteFunctionSecret,
  createOrUpdateFunctionSecret,
  listFunctions,
  deleteFunction,
  createFunction,
  getFunction,
  getInstanceMSDeployLogSlot,
  createInstanceMSDeployOperationSlot,
  getInstanceMsDeployStatusSlot,
  getMSDeployLogSlot,
  createMSDeployOperationSlot,
  getMSDeployStatusSlot,
  getInstanceMSDeployLog,
  createInstanceMSDeployOperation,
  getInstanceMsDeployStatus,
  getMSDeployLog,
  createMSDeployOperation,
  getMSDeployStatus,
  listDomainOwnershipIdentifiersSlot,
  deleteDomainOwnershipIdentifierSlot,
  updateDomainOwnershipIdentifierSlot,
  createOrUpdateDomainOwnershipIdentifierSlot,
  getDomainOwnershipIdentifierSlot,
  listDomainOwnershipIdentifiers,
  deleteDomainOwnershipIdentifier,
  updateDomainOwnershipIdentifier,
  createOrUpdateDomainOwnershipIdentifier,
  getDomainOwnershipIdentifier,
  listDeploymentLogSlot,
  listDeploymentsSlot,
  deleteDeploymentSlot,
  createDeploymentSlot,
  getDeploymentSlot,
  listDeploymentLog,
  listDeployments,
  deleteDeployment,
  createDeployment,
  getDeployment,
  listSlotSiteDeploymentStatusesSlot,
  getSlotSiteDeploymentStatusSlot,
  listProductionSiteDeploymentStatuses,
  getProductionSiteDeploymentStatus,
  stopContinuousWebJobSlot,
  startContinuousWebJobSlot,
  listContinuousWebJobsSlot,
  deleteContinuousWebJobSlot,
  getContinuousWebJobSlot,
  stopContinuousWebJob,
  startContinuousWebJob,
  listContinuousWebJobs,
  deleteContinuousWebJob,
  getContinuousWebJob,
  recoverSiteConfigurationSnapshotSlot,
  listConfigurationsSlot,
  getConfigurationSnapshotSlot,
  listConfigurationSnapshotInfoSlot,
  updateConfigurationSlot,
  createOrUpdateConfigurationSlot,
  getConfigurationSlot,
  recoverSiteConfigurationSnapshot,
  listConfigurations,
  getConfigurationSnapshot,
  listConfigurationSnapshotInfo,
  updateConfiguration,
  createOrUpdateConfiguration,
  getConfiguration,
  updateSlotConfigurationNames,
  listSlotConfigurationNames,
  updateDiagnosticLogsConfigSlot,
  getDiagnosticLogsConfigurationSlot,
  updateDiagnosticLogsConfig,
  getDiagnosticLogsConfiguration,
  listSiteConnectionStringKeyVaultReferencesSlot,
  getSiteConnectionStringKeyVaultReferenceSlot,
  listAppSettingsKeyVaultReferencesSlot,
  getAppSettingKeyVaultReferenceSlot,
  listSiteConnectionStringKeyVaultReferences,
  getSiteConnectionStringKeyVaultReference,
  listAppSettingsKeyVaultReferences,
  getAppSettingKeyVaultReference,
  getAuthSettingsV2Slot,
  updateAuthSettingsV2Slot,
  getAuthSettingsV2WithoutSecretsSlot,
  getAuthSettingsV2,
  updateAuthSettingsV2,
  getAuthSettingsV2WithoutSecrets,
  updateScmAllowedSlot,
  getScmAllowedSlot,
  listBasicPublishingCredentialsPoliciesSlot,
  updateFtpAllowedSlot,
  getFtpAllowedSlot,
  updateScmAllowed,
  getScmAllowed,
  listBasicPublishingCredentialsPolicies,
  updateFtpAllowed,
  getFtpAllowed,
  restoreSlot,
  listBackupStatusSecretsSlot,
  listBackupsSlot,
  deleteBackupSlot,
  getBackupStatusSlot,
  restore,
  listBackupStatusSecrets,
  listBackups,
  deleteBackup,
  getBackupStatus,
  listWorkflowsConnections,
  deployWorkflowArtifacts,
  listUsages,
  syncFunctionTriggers,
  syncRepository,
  stopNetworkTrace,
  stop,
  startNetworkTrace,
  start,
  listSnapshotsFromDRSecondary,
  listSnapshots,
  swapSlotWithProduction,
  listSlotDifferencesFromProduction,
  restoreSnapshot,
  restoreFromDeletedApp,
  restoreFromBackupBlob,
  restart,
  resetProductionSlotConfig,
  listPublishingProfileXmlWithSecrets,
  getPrivateLinkResources,
  listPremierAddOns,
  getSitePhpErrorLogFlag,
  listPerfMonCounters,
  generateNewSitePublishingPassword,
  getNetworkTracesV2,
  getNetworkTraceOperationV2,
  getNetworkTraces,
  stopWebSiteNetworkTrace,
  startWebSiteNetworkTraceOperation,
  startWebSiteNetworkTrace,
  getNetworkTraceOperation,
  migrateMySql,
  migrateStorage,
  updateMachineKey,
  listSyncFunctionTriggers,
  listSiteBackups,
  isCloneable,
  listRelayServiceConnections,
  listHybridConnections,
  deleteHostSecret,
  createOrUpdateHostSecret,
  syncFunctions,
  listSyncStatus,
  listHostKeys,
  getFunctionsAdminToken,
  createOneDeployOperation,
  getOneDeployStatus,
  discoverBackup,
  getContainerLogsZip,
  getWebSiteContainerLogs,
  listSitePushSettings,
  updateSitePushSettings,
  listPublishingCredentials,
  listMetadata,
  updateMetadata,
  listConnectionStrings,
  updateConnectionStrings,
  getBackupConfiguration,
  deleteBackupConfiguration,
  updateBackupConfiguration,
  listAzureStorageAccounts,
  updateAzureStorageAccounts,
  getAuthSettings,
  updateAuthSettings,
  listApplicationSettings,
  updateApplicationSettings,
  backup,
  applySlotConfigToProduction,
  analyzeCustomHostname,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
  updateVnetConnectionGateway,
  createOrUpdateVnetConnectionGateway,
  getVnetConnectionGateway,
  updateVnetConnectionGatewaySlot,
  createOrUpdateVnetConnectionGatewaySlot,
  getVnetConnectionGatewaySlot,
  listVnetConnections,
  deleteVnetConnection,
  updateVnetConnection,
  createOrUpdateVnetConnection,
  getVnetConnection,
  listVnetConnectionsSlot,
  deleteVnetConnectionSlot,
  updateVnetConnectionSlot,
  createOrUpdateVnetConnectionSlot,
  getVnetConnectionSlot,
  deleteHybridConnectionSlot,
  updateHybridConnectionSlot,
  createOrUpdateHybridConnectionSlot,
  getHybridConnectionSlot,
  deleteHybridConnection,
  updateHybridConnection,
  createOrUpdateHybridConnection,
  getHybridConnection,
  listPrivateEndpointConnectionListSlot,
  deletePrivateEndpointConnectionSlot,
  approveOrRejectPrivateEndpointConnectionSlot,
  getPrivateEndpointConnectionSlot,
  listPrivateEndpointConnectionList,
  deletePrivateEndpointConnection,
  approveOrRejectPrivateEndpointConnection,
  getPrivateEndpointConnection,
  listWorkflowsConnectionsSlot,
  deployWorkflowArtifactsSlot,
  listUsagesSlot,
  syncFunctionTriggersSlot,
  syncRepositorySlot,
  stopNetworkTraceSlot,
  stopSlot,
  startNetworkTraceSlot,
  startSlot,
  listSnapshotsFromDRSecondarySlot,
  listSnapshotsSlot,
  swapSlot,
  listSlotDifferencesSlot,
  restoreSnapshotSlot,
  restoreFromDeletedAppSlot,
  restoreFromBackupBlobSlot,
  restartSlot,
  resetSlotConfigurationSlot,
  listPublishingProfileXmlWithSecretsSlot,
  getPrivateLinkResourcesSlot,
  listPremierAddOnsSlot,
  getSitePhpErrorLogFlagSlot,
  listPerfMonCountersSlot,
  generateNewSitePublishingPasswordSlot,
  getNetworkTracesSlotV2,
  getNetworkTraceOperationSlotV2,
  getNetworkTracesSlot,
  stopWebSiteNetworkTraceSlot,
  startWebSiteNetworkTraceOperationSlot,
  startWebSiteNetworkTraceSlot,
  getNetworkTraceOperationSlot,
  listSyncFunctionTriggersSlot,
  listSiteBackupsSlot,
  isCloneableSlot,
  listRelayServiceConnectionsSlot,
  listHybridConnectionsSlot,
  deleteHostSecretSlot,
  createOrUpdateHostSecretSlot,
  syncFunctionsSlot,
  listSyncStatusSlot,
  listHostKeysSlot,
  getFunctionsAdminTokenSlot,
  discoverBackupSlot,
  getContainerLogsZipSlot,
  getWebSiteContainerLogsSlot,
  listSitePushSettingsSlot,
  updateSitePushSettingsSlot,
  listPublishingCredentialsSlot,
  listMetadataSlot,
  updateMetadataSlot,
  listConnectionStringsSlot,
  updateConnectionStringsSlot,
  getBackupConfigurationSlot,
  deleteBackupConfigurationSlot,
  updateBackupConfigurationSlot,
  listAzureStorageAccountsSlot,
  updateAzureStorageAccountsSlot,
  getAuthSettingsSlot,
  updateAuthSettingsSlot,
  listApplicationSettingsSlot,
  updateApplicationSettingsSlot,
  backupSlot,
  applySlotConfigurationSlot,
  analyzeCustomHostnameSlot,
  listByResourceGroup,
  deleteSlot,
  updateSlot,
  createOrUpdateSlot,
  getSlot,
  listSlots,
} from "../../api/webApps/operations.js";
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
} from "../../api/webApps/options.js";
import type {
  Identifier,
  User,
  Site,
  PushSettings,
  Operation,
  PrivateLinkResourcesWrapper,
  CsmUsageQuota,
  RemotePrivateEndpointConnectionARMResource,
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
  FunctionSecrets,
  NetworkTrace,
  PerfMonResponse,
  SitePhpErrorLogFlag,
  PremierAddOn,
  CsmPublishingProfileOptions,
  DeletedAppRestoreRequest,
  SnapshotRestoreRequest,
  SlotDifference,
  Snapshot,
  WorkflowEnvelope,
  VnetInfoResource,
  VnetGateway,
  StorageMigrationOptions,
  StorageMigrationResponse,
  MigrateMySqlRequest,
  CsmPublishingCredentialsPoliciesEntity,
  SiteAuthSettingsV2,
  ApiKVReference,
  SiteLogsConfig,
  SlotConfigNamesResource,
  SiteConfigResource,
  SiteConfigurationSnapshotInfo,
  ContinuousWebJob,
  CsmDeploymentStatus,
  Deployment,
  MSDeployStatus,
  MSDeploy,
  MSDeployLog,
  FunctionEnvelope,
  HostNameBinding,
  WebSiteInstanceStatus,
  ProcessInfo,
  ProcessThreadInfo,
  ProcessModuleInfo,
  MigrateMySqlStatus,
  SwiftVirtualNetwork,
  NetworkFeatures,
  PremierAddOnPatchResource,
  PrivateAccess,
  PublicCertificate,
  SiteContainer,
  SiteExtensionInfo,
  SiteSourceControl,
  TriggeredWebJob,
  TriggeredJobHistory,
  WebJob,
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
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebApps operations. */
export interface WebAppsOperations {
  /** List the workflows for a web site, or a deployment slot. */
  listWorkflows: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListWorkflowsOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowEnvelope>;
  /** Get workflow information by its ID for web site, or a deployment slot. */
  getWorkflow: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    options?: WebAppsGetWorkflowOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** List the workflows for a web site, or a deployment slot. */
  listInstanceWorkflowsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListInstanceWorkflowsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowEnvelope>;
  /** Get workflow information by its ID for web site, or a deployment slot. */
  getInstanceWorkflowSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    workflowName: string,
    options?: WebAppsGetInstanceWorkflowSlotOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Description for List webjobs for an app, or a deployment slot. */
  listWebJobs: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListWebJobsOptionalParams,
  ) => PagedAsyncIterableIterator<WebJob>;
  /** Description for Get webjob information for an app, or a deployment slot. */
  getWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsGetWebJobOptionalParams,
  ) => Promise<WebJob>;
  /** Description for List webjobs for an app, or a deployment slot. */
  listWebJobsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListWebJobsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<WebJob>;
  /** Description for Get webjob information for an app, or a deployment slot. */
  getWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsGetWebJobSlotOptionalParams,
  ) => Promise<WebJob>;
  /** Description for List a triggered web job's history for an app, or a deployment slot. */
  listTriggeredWebJobHistory: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsListTriggeredWebJobHistoryOptionalParams,
  ) => PagedAsyncIterableIterator<TriggeredJobHistory>;
  /** Description for Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
  getTriggeredWebJobHistory: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    id: string,
    options?: WebAppsGetTriggeredWebJobHistoryOptionalParams,
  ) => Promise<TriggeredJobHistory>;
  /** Description for List a triggered web job's history for an app, or a deployment slot. */
  listTriggeredWebJobHistorySlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsListTriggeredWebJobHistorySlotOptionalParams,
  ) => PagedAsyncIterableIterator<TriggeredJobHistory>;
  /** Description for Gets a triggered web job's history by its ID for an app, , or a deployment slot. */
  getTriggeredWebJobHistorySlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    id: string,
    slot: string,
    options?: WebAppsGetTriggeredWebJobHistorySlotOptionalParams,
  ) => Promise<TriggeredJobHistory>;
  /** Description for Run a triggered web job for an app, or a deployment slot. */
  runTriggeredWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsRunTriggeredWebJobOptionalParams,
  ) => Promise<void>;
  /** Description for List triggered web jobs for an app, or a deployment slot. */
  listTriggeredWebJobs: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListTriggeredWebJobsOptionalParams,
  ) => PagedAsyncIterableIterator<TriggeredWebJob>;
  /** Description for Delete a triggered web job by its ID for an app, or a deployment slot. */
  deleteTriggeredWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsDeleteTriggeredWebJobOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a triggered web job by its ID for an app, or a deployment slot. */
  getTriggeredWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsGetTriggeredWebJobOptionalParams,
  ) => Promise<TriggeredWebJob>;
  /** Description for Run a triggered web job for an app, or a deployment slot. */
  runTriggeredWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsRunTriggeredWebJobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for List triggered web jobs for an app, or a deployment slot. */
  listTriggeredWebJobsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListTriggeredWebJobsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<TriggeredWebJob>;
  /** Description for Delete a triggered web job by its ID for an app, or a deployment slot. */
  deleteTriggeredWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsDeleteTriggeredWebJobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a triggered web job by its ID for an app, or a deployment slot. */
  getTriggeredWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsGetTriggeredWebJobSlotOptionalParams,
  ) => Promise<TriggeredWebJob>;
  /** Description for Deletes the source control configuration of an app. */
  deleteSourceControl: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsDeleteSourceControlOptionalParams,
  ) => Promise<void>;
  /** Description for Updates the source control configuration of an app. */
  updateSourceControl: (
    resourceGroupName: string,
    name: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsUpdateSourceControlOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Updates the source control configuration of an app. */
  createOrUpdateSourceControl: (
    resourceGroupName: string,
    name: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
  ) => PollerLike<OperationState<SiteSourceControl>, SiteSourceControl>;
  /** @deprecated use createOrUpdateSourceControl instead */
  beginCreateOrUpdateSourceControl: (
    resourceGroupName: string,
    name: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SiteSourceControl>, SiteSourceControl>>;
  /** @deprecated use createOrUpdateSourceControl instead */
  beginCreateOrUpdateSourceControlAndWait: (
    resourceGroupName: string,
    name: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Gets the source control configuration of an app. */
  getSourceControl: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetSourceControlOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Deletes the source control configuration of an app. */
  deleteSourceControlSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsDeleteSourceControlSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Updates the source control configuration of an app. */
  updateSourceControlSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsUpdateSourceControlSlotOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Updates the source control configuration of an app. */
  createOrUpdateSourceControlSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
  ) => PollerLike<OperationState<SiteSourceControl>, SiteSourceControl>;
  /** @deprecated use createOrUpdateSourceControlSlot instead */
  beginCreateOrUpdateSourceControlSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SiteSourceControl>, SiteSourceControl>>;
  /** @deprecated use createOrUpdateSourceControlSlot instead */
  beginCreateOrUpdateSourceControlSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteSourceControl: SiteSourceControl,
    options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Gets the source control configuration of an app. */
  getSourceControlSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetSourceControlSlotOptionalParams,
  ) => Promise<SiteSourceControl>;
  /** Description for Get list of siteextensions for a web site, or a deployment slot. */
  listSiteExtensionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSiteExtensionsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<SiteExtensionInfo>;
  /** Description for Remove a site extension from a web site, or a deployment slot. */
  deleteSiteExtensionSlot: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    slot: string,
    options?: WebAppsDeleteSiteExtensionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Install site extension on a web site, or a deployment slot. */
  installSiteExtensionSlot: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    slot: string,
    options?: WebAppsInstallSiteExtensionSlotOptionalParams,
  ) => PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>;
  /** @deprecated use installSiteExtensionSlot instead */
  beginInstallSiteExtensionSlot: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    slot: string,
    options?: WebAppsInstallSiteExtensionSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>>;
  /** @deprecated use installSiteExtensionSlot instead */
  beginInstallSiteExtensionSlotAndWait: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    slot: string,
    options?: WebAppsInstallSiteExtensionSlotOptionalParams,
  ) => Promise<SiteExtensionInfo>;
  /** Description for Get site extension information by its ID for a web site, or a deployment slot. */
  getSiteExtensionSlot: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    slot: string,
    options?: WebAppsGetSiteExtensionSlotOptionalParams,
  ) => Promise<SiteExtensionInfo>;
  /** Description for Get list of siteextensions for a web site, or a deployment slot. */
  listSiteExtensions: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSiteExtensionsOptionalParams,
  ) => PagedAsyncIterableIterator<SiteExtensionInfo>;
  /** Description for Remove a site extension from a web site, or a deployment slot. */
  deleteSiteExtension: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    options?: WebAppsDeleteSiteExtensionOptionalParams,
  ) => Promise<void>;
  /** Description for Install site extension on a web site, or a deployment slot. */
  installSiteExtension: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    options?: WebAppsInstallSiteExtensionOptionalParams,
  ) => PollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>;
  /** @deprecated use installSiteExtension instead */
  beginInstallSiteExtension: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    options?: WebAppsInstallSiteExtensionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SiteExtensionInfo>, SiteExtensionInfo>>;
  /** @deprecated use installSiteExtension instead */
  beginInstallSiteExtensionAndWait: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    options?: WebAppsInstallSiteExtensionOptionalParams,
  ) => Promise<SiteExtensionInfo>;
  /** Description for Get site extension information by its ID for a web site, or a deployment slot. */
  getSiteExtension: (
    resourceGroupName: string,
    name: string,
    siteExtensionId: string,
    options?: WebAppsGetSiteExtensionOptionalParams,
  ) => Promise<SiteExtensionInfo>;
  /** Lists all the site containers of a site, or a deployment slot. */
  listSiteContainersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSiteContainersSlotOptionalParams,
  ) => PagedAsyncIterableIterator<SiteContainer>;
  /** Deletes a site container for a site, or a deployment slot. */
  deleteSiteContainerSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    containerName: string,
    options?: WebAppsDeleteSiteContainerSlotOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates a site container for a site, or a deployment slot. */
  createOrUpdateSiteContainerSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    containerName: string,
    request: SiteContainer,
    options?: WebAppsCreateOrUpdateSiteContainerSlotOptionalParams,
  ) => Promise<SiteContainer>;
  /** Gets a site container of a site, or a deployment slot. */
  getSiteContainerSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    containerName: string,
    options?: WebAppsGetSiteContainerSlotOptionalParams,
  ) => Promise<SiteContainer>;
  /** Lists all the site containers of a site, or a deployment slot. */
  listSiteContainers: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSiteContainersOptionalParams,
  ) => PagedAsyncIterableIterator<SiteContainer>;
  /** Deletes a site container for a site, or a deployment slot. */
  deleteSiteContainer: (
    resourceGroupName: string,
    name: string,
    containerName: string,
    options?: WebAppsDeleteSiteContainerOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates a site container for a site, or a deployment slot. */
  createOrUpdateSiteContainer: (
    resourceGroupName: string,
    name: string,
    containerName: string,
    request: SiteContainer,
    options?: WebAppsCreateOrUpdateSiteContainerOptionalParams,
  ) => Promise<SiteContainer>;
  /** Gets a site container of a site, or a deployment slot. */
  getSiteContainer: (
    resourceGroupName: string,
    name: string,
    containerName: string,
    options?: WebAppsGetSiteContainerOptionalParams,
  ) => Promise<SiteContainer>;
  /** Description for Get public certificates for an app or a deployment slot. */
  listPublicCertificatesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPublicCertificatesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<PublicCertificate>;
  /** Description for Deletes a hostname binding for an app. */
  deletePublicCertificateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    publicCertificateName: string,
    options?: WebAppsDeletePublicCertificateSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a hostname binding for an app. */
  createOrUpdatePublicCertificateSlot: (
    resourceGroupName: string,
    name: string,
    publicCertificateName: string,
    slot: string,
    publicCertificate: PublicCertificate,
    options?: WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams,
  ) => Promise<PublicCertificate>;
  /** Description for Get the named public certificate for an app (or deployment slot, if specified). */
  getPublicCertificateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    publicCertificateName: string,
    options?: WebAppsGetPublicCertificateSlotOptionalParams,
  ) => Promise<PublicCertificate>;
  /** Description for Get public certificates for an app or a deployment slot. */
  listPublicCertificates: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPublicCertificatesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicCertificate>;
  /** Description for Deletes a hostname binding for an app. */
  deletePublicCertificate: (
    resourceGroupName: string,
    name: string,
    publicCertificateName: string,
    options?: WebAppsDeletePublicCertificateOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a hostname binding for an app. */
  createOrUpdatePublicCertificate: (
    resourceGroupName: string,
    name: string,
    publicCertificateName: string,
    publicCertificate: PublicCertificate,
    options?: WebAppsCreateOrUpdatePublicCertificateOptionalParams,
  ) => Promise<PublicCertificate>;
  /** Description for Get the named public certificate for an app (or deployment slot, if specified). */
  getPublicCertificate: (
    resourceGroupName: string,
    name: string,
    publicCertificateName: string,
    options?: WebAppsGetPublicCertificateOptionalParams,
  ) => Promise<PublicCertificate>;
  /** Description for Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
  putPrivateAccessVnetSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    access: PrivateAccess,
    options?: WebAppsPutPrivateAccessVnetSlotOptionalParams,
  ) => Promise<PrivateAccess>;
  /** Description for Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
  getPrivateAccessSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetPrivateAccessSlotOptionalParams,
  ) => Promise<PrivateAccess>;
  /** Description for Sets data around private site access enablement and authorized Virtual Networks that can access the site. */
  putPrivateAccessVnet: (
    resourceGroupName: string,
    name: string,
    access: PrivateAccess,
    options?: WebAppsPutPrivateAccessVnetOptionalParams,
  ) => Promise<PrivateAccess>;
  /** Description for Gets data around private site access enablement and authorized Virtual Networks that can access the site. */
  getPrivateAccess: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetPrivateAccessOptionalParams,
  ) => Promise<PrivateAccess>;
  /** Description for Delete a premier add-on from an app. */
  deletePremierAddOnSlot: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    slot: string,
    options?: WebAppsDeletePremierAddOnSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Updates a named add-on of an app. */
  updatePremierAddOnSlot: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    slot: string,
    premierAddOn: PremierAddOnPatchResource,
    options?: WebAppsUpdatePremierAddOnSlotOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Updates a named add-on of an app. */
  addPremierAddOnSlot: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    slot: string,
    premierAddOn: PremierAddOn,
    options?: WebAppsAddPremierAddOnSlotOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Gets a named add-on of an app. */
  getPremierAddOnSlot: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    slot: string,
    options?: WebAppsGetPremierAddOnSlotOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Delete a premier add-on from an app. */
  deletePremierAddOn: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    options?: WebAppsDeletePremierAddOnOptionalParams,
  ) => Promise<void>;
  /** Description for Updates a named add-on of an app. */
  updatePremierAddOn: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    premierAddOn: PremierAddOnPatchResource,
    options?: WebAppsUpdatePremierAddOnOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Updates a named add-on of an app. */
  addPremierAddOn: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    premierAddOn: PremierAddOn,
    options?: WebAppsAddPremierAddOnOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Gets a named add-on of an app. */
  getPremierAddOn: (
    resourceGroupName: string,
    name: string,
    premierAddOnName: string,
    options?: WebAppsGetPremierAddOnOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Gets all network features used by the app (or deployment slot, if specified). */
  listNetworkFeaturesSlot: (
    resourceGroupName: string,
    name: string,
    view: string,
    slot: string,
    options?: WebAppsListNetworkFeaturesSlotOptionalParams,
  ) => Promise<NetworkFeatures>;
  /** Description for Gets all network features used by the app (or deployment slot, if specified). */
  listNetworkFeatures: (
    resourceGroupName: string,
    name: string,
    view: string,
    options?: WebAppsListNetworkFeaturesOptionalParams,
  ) => Promise<NetworkFeatures>;
  /** Description for Deletes a Swift Virtual Network connection from an app (or deployment slot). */
  deleteSwiftVirtualNetworkSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams,
  ) => Promise<void>;
  /**
   * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
   * in use by another App Service Plan other than the one this App is in.
   */
  updateSwiftVirtualNetworkConnectionWithCheckSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    connectionEnvelope: SwiftVirtualNetwork,
    options?: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /**
   * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
   * in use by another App Service Plan other than the one this App is in.
   */
  createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    connectionEnvelope: SwiftVirtualNetwork,
    options?: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Description for Gets a Swift Virtual Network connection. */
  getSwiftVirtualNetworkConnectionSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Description for Deletes a Swift Virtual Network connection from an app (or deployment slot). */
  deleteSwiftVirtualNetwork: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsDeleteSwiftVirtualNetworkOptionalParams,
  ) => Promise<void>;
  /**
   * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
   * in use by another App Service Plan other than the one this App is in.
   */
  updateSwiftVirtualNetworkConnectionWithCheck: (
    resourceGroupName: string,
    name: string,
    connectionEnvelope: SwiftVirtualNetwork,
    options?: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /**
   * Description for Integrates this Web App with a Virtual Network. This requires that 1) "swiftSupported" is true when doing a GET against this resource, and 2) that the target Subnet has already been delegated, and is not
   * in use by another App Service Plan other than the one this App is in.
   */
  createOrUpdateSwiftVirtualNetworkConnectionWithCheck: (
    resourceGroupName: string,
    name: string,
    connectionEnvelope: SwiftVirtualNetwork,
    options?: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Description for Gets a Swift Virtual Network connection. */
  getSwiftVirtualNetworkConnection: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetSwiftVirtualNetworkConnectionOptionalParams,
  ) => Promise<SwiftVirtualNetwork>;
  /** Description for Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
  getMigrateMySqlStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetMigrateMySqlStatusSlotOptionalParams,
  ) => Promise<MigrateMySqlStatus>;
  /** Description for Returns the status of MySql in app migration, if one is active, and whether or not MySql in app is enabled */
  getMigrateMySqlStatus: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetMigrateMySqlStatusOptionalParams,
  ) => Promise<MigrateMySqlStatus>;
  /** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
  listProcessModulesSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    options?: WebAppsListProcessModulesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessModuleInfo>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getProcessModuleSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    baseAddress: string,
    slot: string,
    options?: WebAppsGetProcessModuleSlotOptionalParams,
  ) => Promise<ProcessModuleInfo>;
  /** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
  listInstanceProcessModulesSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessModulesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessModuleInfo>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcessModuleSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    baseAddress: string,
    slot: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessModuleSlotOptionalParams,
  ) => Promise<ProcessModuleInfo>;
  /** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
  listProcessModules: (
    resourceGroupName: string,
    name: string,
    processId: string,
    options?: WebAppsListProcessModulesOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessModuleInfo>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getProcessModule: (
    resourceGroupName: string,
    name: string,
    processId: string,
    baseAddress: string,
    options?: WebAppsGetProcessModuleOptionalParams,
  ) => Promise<ProcessModuleInfo>;
  /** Description for List module information for a process by its ID for a specific scaled-out instance in a web site. */
  listInstanceProcessModules: (
    resourceGroupName: string,
    name: string,
    processId: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessModulesOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessModuleInfo>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcessModule: (
    resourceGroupName: string,
    name: string,
    processId: string,
    baseAddress: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessModuleOptionalParams,
  ) => Promise<ProcessModuleInfo>;
  /** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
  listProcessThreadsSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    options?: WebAppsListProcessThreadsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessThreadInfo>;
  /** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
  getProcessDumpSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    options?: WebAppsGetProcessDumpSlotOptionalParams,
  ) => Promise<WebAppsGetProcessDumpSlotResponse>;
  /** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
  listProcessesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListProcessesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessInfo>;
  /** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
  deleteProcessSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    options?: WebAppsDeleteProcessSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getProcessSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    options?: WebAppsGetProcessSlotOptionalParams,
  ) => Promise<ProcessInfo>;
  /** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
  listInstanceProcessThreadsSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessThreadsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessThreadInfo>;
  /** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcessDumpSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessDumpSlotOptionalParams,
  ) => Promise<WebAppsGetInstanceProcessDumpSlotResponse>;
  /** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
  listInstanceProcessesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessInfo>;
  /** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
  deleteInstanceProcessSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    instanceId: string,
    options?: WebAppsDeleteInstanceProcessSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcessSlot: (
    resourceGroupName: string,
    name: string,
    processId: string,
    slot: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessSlotOptionalParams,
  ) => Promise<ProcessInfo>;
  /** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
  listProcessThreads: (
    resourceGroupName: string,
    name: string,
    processId: string,
    options?: WebAppsListProcessThreadsOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessThreadInfo>;
  /** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
  getProcessDump: (
    resourceGroupName: string,
    name: string,
    processId: string,
    options?: WebAppsGetProcessDumpOptionalParams,
  ) => Promise<WebAppsGetProcessDumpResponse>;
  /** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
  listProcesses: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListProcessesOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessInfo>;
  /** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
  deleteProcess: (
    resourceGroupName: string,
    name: string,
    processId: string,
    options?: WebAppsDeleteProcessOptionalParams,
  ) => Promise<void>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getProcess: (
    resourceGroupName: string,
    name: string,
    processId: string,
    options?: WebAppsGetProcessOptionalParams,
  ) => Promise<ProcessInfo>;
  /** Description for List the threads in a process by its ID for a specific scaled-out instance in a web site. */
  listInstanceProcessThreads: (
    resourceGroupName: string,
    name: string,
    processId: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessThreadsOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessThreadInfo>;
  /** Description for Get a memory dump of a process by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcessDump: (
    resourceGroupName: string,
    name: string,
    processId: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessDumpOptionalParams,
  ) => Promise<WebAppsGetInstanceProcessDumpResponse>;
  /** Description for Get list of processes for a web site, or a deployment slot, or for a specific scaled-out instance in a web site. */
  listInstanceProcesses: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    options?: WebAppsListInstanceProcessesOptionalParams,
  ) => PagedAsyncIterableIterator<ProcessInfo>;
  /** Description for Terminate a process by its ID for a web site, or a deployment slot, or specific scaled-out instance in a web site. */
  deleteInstanceProcess: (
    resourceGroupName: string,
    name: string,
    processId: string,
    instanceId: string,
    options?: WebAppsDeleteInstanceProcessOptionalParams,
  ) => Promise<void>;
  /** Description for Get process information by its ID for a specific scaled-out instance in a web site. */
  getInstanceProcess: (
    resourceGroupName: string,
    name: string,
    processId: string,
    instanceId: string,
    options?: WebAppsGetInstanceProcessOptionalParams,
  ) => Promise<ProcessInfo>;
  /** Description for Gets all scale-out instances of an app. */
  listInstanceIdentifiersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListInstanceIdentifiersSlotOptionalParams,
  ) => PagedAsyncIterableIterator<WebSiteInstanceStatus>;
  /** Description for Gets all scale-out instances of an app. */
  getInstanceInfoSlot: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    slot: string,
    options?: WebAppsGetInstanceInfoSlotOptionalParams,
  ) => Promise<WebSiteInstanceStatus>;
  /** Description for Gets all scale-out instances of an app. */
  listInstanceIdentifiers: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListInstanceIdentifiersOptionalParams,
  ) => PagedAsyncIterableIterator<WebSiteInstanceStatus>;
  /** Description for Gets all scale-out instances of an app. */
  getInstanceInfo: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    options?: WebAppsGetInstanceInfoOptionalParams,
  ) => Promise<WebSiteInstanceStatus>;
  /** Description for Deletes a relay service connection by its name. */
  deleteRelayServiceConnectionSlot: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    slot: string,
    options?: WebAppsDeleteRelayServiceConnectionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
  updateRelayServiceConnectionSlot: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    slot: string,
    connectionEnvelope: RelayServiceConnectionEntity,
    options?: WebAppsUpdateRelayServiceConnectionSlotOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
  createOrUpdateRelayServiceConnectionSlot: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    slot: string,
    connectionEnvelope: RelayServiceConnectionEntity,
    options?: WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Gets a hybrid connection configuration by its name. */
  getRelayServiceConnectionSlot: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    slot: string,
    options?: WebAppsGetRelayServiceConnectionSlotOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Deletes a relay service connection by its name. */
  deleteRelayServiceConnection: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    options?: WebAppsDeleteRelayServiceConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
  updateRelayServiceConnection: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    connectionEnvelope: RelayServiceConnectionEntity,
    options?: WebAppsUpdateRelayServiceConnectionOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Creates a new hybrid connection configuration (PUT), or updates an existing one (PATCH). */
  createOrUpdateRelayServiceConnection: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    connectionEnvelope: RelayServiceConnectionEntity,
    options?: WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Gets a hybrid connection configuration by its name. */
  getRelayServiceConnection: (
    resourceGroupName: string,
    name: string,
    entityName: string,
    options?: WebAppsGetRelayServiceConnectionOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Get hostname bindings for an app or a deployment slot. */
  listHostNameBindingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListHostNameBindingsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<HostNameBinding>;
  /** Description for Deletes a hostname binding for an app. */
  deleteHostNameBindingSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    hostName: string,
    options?: WebAppsDeleteHostNameBindingSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a hostname binding for an app. */
  createOrUpdateHostNameBindingSlot: (
    resourceGroupName: string,
    name: string,
    hostName: string,
    slot: string,
    hostNameBinding: HostNameBinding,
    options?: WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams,
  ) => Promise<HostNameBinding>;
  /** Description for Get the named hostname binding for an app (or deployment slot, if specified). */
  getHostNameBindingSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    hostName: string,
    options?: WebAppsGetHostNameBindingSlotOptionalParams,
  ) => Promise<HostNameBinding>;
  /** Description for Get hostname bindings for an app or a deployment slot. */
  listHostNameBindings: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListHostNameBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<HostNameBinding>;
  /** Description for Deletes a hostname binding for an app. */
  deleteHostNameBinding: (
    resourceGroupName: string,
    name: string,
    hostName: string,
    options?: WebAppsDeleteHostNameBindingOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a hostname binding for an app. */
  createOrUpdateHostNameBinding: (
    resourceGroupName: string,
    name: string,
    hostName: string,
    hostNameBinding: HostNameBinding,
    options?: WebAppsCreateOrUpdateHostNameBindingOptionalParams,
  ) => Promise<HostNameBinding>;
  /** Description for Get the named hostname binding for an app (or deployment slot, if specified). */
  getHostNameBinding: (
    resourceGroupName: string,
    name: string,
    hostName: string,
    options?: WebAppsGetHostNameBindingOptionalParams,
  ) => Promise<HostNameBinding>;
  /** Description for Get function secrets for a function in a web site, or a deployment slot. */
  listFunctionSecretsSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    options?: WebAppsListFunctionSecretsSlotOptionalParams,
  ) => Promise<FunctionSecrets>;
  /** Description for Get function keys for a function in a web site, or a deployment slot. */
  listFunctionKeysSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    options?: WebAppsListFunctionKeysSlotOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Delete a function secret. */
  deleteFunctionSecretSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    keyName: string,
    slot: string,
    options?: WebAppsDeleteFunctionSecretSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Add or update a function secret. */
  createOrUpdateFunctionSecretSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    keyName: string,
    slot: string,
    key: KeyInfo,
    options?: WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams,
  ) => Promise<KeyInfo>;
  /** Description for List the functions for a web site, or a deployment slot. */
  listInstanceFunctionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListInstanceFunctionsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<FunctionEnvelope>;
  /** Description for Delete a function for web site, or a deployment slot. */
  deleteInstanceFunctionSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    options?: WebAppsDeleteInstanceFunctionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Create function for web site, or a deployment slot. */
  createInstanceFunctionSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
  ) => PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>;
  /** @deprecated use createInstanceFunctionSlot instead */
  beginCreateInstanceFunctionSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>>;
  /** @deprecated use createInstanceFunctionSlot instead */
  beginCreateInstanceFunctionSlotAndWait: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
  ) => Promise<FunctionEnvelope>;
  /** Description for Get function information by its ID for web site, or a deployment slot. */
  getInstanceFunctionSlot: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    slot: string,
    options?: WebAppsGetInstanceFunctionSlotOptionalParams,
  ) => Promise<FunctionEnvelope>;
  /** Description for Get function secrets for a function in a web site, or a deployment slot. */
  listFunctionSecrets: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    options?: WebAppsListFunctionSecretsOptionalParams,
  ) => Promise<FunctionSecrets>;
  /** Description for Get function keys for a function in a web site, or a deployment slot. */
  listFunctionKeys: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    options?: WebAppsListFunctionKeysOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Delete a function secret. */
  deleteFunctionSecret: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    keyName: string,
    options?: WebAppsDeleteFunctionSecretOptionalParams,
  ) => Promise<void>;
  /** Description for Add or update a function secret. */
  createOrUpdateFunctionSecret: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    keyName: string,
    key: KeyInfo,
    options?: WebAppsCreateOrUpdateFunctionSecretOptionalParams,
  ) => Promise<KeyInfo>;
  /** Description for List the functions for a web site, or a deployment slot. */
  listFunctions: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListFunctionsOptionalParams,
  ) => PagedAsyncIterableIterator<FunctionEnvelope>;
  /** Description for Delete a function for web site, or a deployment slot. */
  deleteFunction: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    options?: WebAppsDeleteFunctionOptionalParams,
  ) => Promise<void>;
  /** Description for Create function for web site, or a deployment slot. */
  createFunction: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateFunctionOptionalParams,
  ) => PollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>;
  /** @deprecated use createFunction instead */
  beginCreateFunction: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateFunctionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FunctionEnvelope>, FunctionEnvelope>>;
  /** @deprecated use createFunction instead */
  beginCreateFunctionAndWait: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    functionEnvelope: FunctionEnvelope,
    options?: WebAppsCreateFunctionOptionalParams,
  ) => Promise<FunctionEnvelope>;
  /** Description for Get function information by its ID for web site, or a deployment slot. */
  getFunction: (
    resourceGroupName: string,
    name: string,
    functionName: string,
    options?: WebAppsGetFunctionOptionalParams,
  ) => Promise<FunctionEnvelope>;
  /** Description for Get the MSDeploy Log for the last MSDeploy operation. */
  getInstanceMSDeployLogSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    options?: WebAppsGetInstanceMSDeployLogSlotOptionalParams,
  ) => Promise<MSDeployLog>;
  /** Description for Invoke the MSDeploy web app extension. */
  createInstanceMSDeployOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
  ) => PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
  /** @deprecated use createInstanceMSDeployOperationSlot instead */
  beginCreateInstanceMSDeployOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MSDeployStatus>, MSDeployStatus>>;
  /** @deprecated use createInstanceMSDeployOperationSlot instead */
  beginCreateInstanceMSDeployOperationSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the status of the last MSDeploy operation. */
  getInstanceMsDeployStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    instanceId: string,
    options?: WebAppsGetInstanceMsDeployStatusSlotOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the MSDeploy Log for the last MSDeploy operation. */
  getMSDeployLogSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetMSDeployLogSlotOptionalParams,
  ) => Promise<MSDeployLog>;
  /** Description for Invoke the MSDeploy web app extension. */
  createMSDeployOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
  ) => PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
  /** @deprecated use createMSDeployOperationSlot instead */
  beginCreateMSDeployOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MSDeployStatus>, MSDeployStatus>>;
  /** @deprecated use createMSDeployOperationSlot instead */
  beginCreateMSDeployOperationSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the status of the last MSDeploy operation. */
  getMSDeployStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetMSDeployStatusSlotOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the MSDeploy Log for the last MSDeploy operation. */
  getInstanceMSDeployLog: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    options?: WebAppsGetInstanceMSDeployLogOptionalParams,
  ) => Promise<MSDeployLog>;
  /** Description for Invoke the MSDeploy web app extension. */
  createInstanceMSDeployOperation: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
  ) => PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
  /** @deprecated use createInstanceMSDeployOperation instead */
  beginCreateInstanceMSDeployOperation: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MSDeployStatus>, MSDeployStatus>>;
  /** @deprecated use createInstanceMSDeployOperation instead */
  beginCreateInstanceMSDeployOperationAndWait: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the status of the last MSDeploy operation. */
  getInstanceMsDeployStatus: (
    resourceGroupName: string,
    name: string,
    instanceId: string,
    options?: WebAppsGetInstanceMsDeployStatusOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the MSDeploy Log for the last MSDeploy operation. */
  getMSDeployLog: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetMSDeployLogOptionalParams,
  ) => Promise<MSDeployLog>;
  /** Description for Invoke the MSDeploy web app extension. */
  createMSDeployOperation: (
    resourceGroupName: string,
    name: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationOptionalParams,
  ) => PollerLike<OperationState<MSDeployStatus>, MSDeployStatus>;
  /** @deprecated use createMSDeployOperation instead */
  beginCreateMSDeployOperation: (
    resourceGroupName: string,
    name: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MSDeployStatus>, MSDeployStatus>>;
  /** @deprecated use createMSDeployOperation instead */
  beginCreateMSDeployOperationAndWait: (
    resourceGroupName: string,
    name: string,
    msDeploy: MSDeploy,
    options?: WebAppsCreateMSDeployOperationOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Get the status of the last MSDeploy operation. */
  getMSDeployStatus: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetMSDeployStatusOptionalParams,
  ) => Promise<MSDeployStatus>;
  /** Description for Lists ownership identifiers for domain associated with web app. */
  listDomainOwnershipIdentifiersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListDomainOwnershipIdentifiersSlotOptionalParams,
  ) => PagedAsyncIterableIterator<Identifier>;
  /** Description for Deletes a domain ownership identifier for a web app. */
  deleteDomainOwnershipIdentifierSlot: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    slot: string,
    options?: WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
  updateDomainOwnershipIdentifierSlot: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    slot: string,
    domainOwnershipIdentifier: Identifier,
    options?: WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams,
  ) => Promise<Identifier>;
  /** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
  createOrUpdateDomainOwnershipIdentifierSlot: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    slot: string,
    domainOwnershipIdentifier: Identifier,
    options?: WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams,
  ) => Promise<Identifier>;
  /** Description for Get domain ownership identifier for web app. */
  getDomainOwnershipIdentifierSlot: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    slot: string,
    options?: WebAppsGetDomainOwnershipIdentifierSlotOptionalParams,
  ) => Promise<Identifier>;
  /** Description for Lists ownership identifiers for domain associated with web app. */
  listDomainOwnershipIdentifiers: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListDomainOwnershipIdentifiersOptionalParams,
  ) => PagedAsyncIterableIterator<Identifier>;
  /** Description for Deletes a domain ownership identifier for a web app. */
  deleteDomainOwnershipIdentifier: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    options?: WebAppsDeleteDomainOwnershipIdentifierOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
  updateDomainOwnershipIdentifier: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    domainOwnershipIdentifier: Identifier,
    options?: WebAppsUpdateDomainOwnershipIdentifierOptionalParams,
  ) => Promise<Identifier>;
  /** Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier. */
  createOrUpdateDomainOwnershipIdentifier: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    domainOwnershipIdentifier: Identifier,
    options?: WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams,
  ) => Promise<Identifier>;
  /** Description for Get domain ownership identifier for web app. */
  getDomainOwnershipIdentifier: (
    resourceGroupName: string,
    name: string,
    domainOwnershipIdentifierName: string,
    options?: WebAppsGetDomainOwnershipIdentifierOptionalParams,
  ) => Promise<Identifier>;
  /** Description for List deployment log for specific deployment for an app, or a deployment slot. */
  listDeploymentLogSlot: (
    resourceGroupName: string,
    name: string,
    id: string,
    slot: string,
    options?: WebAppsListDeploymentLogSlotOptionalParams,
  ) => Promise<Deployment>;
  /** Description for List deployments for an app, or a deployment slot. */
  listDeploymentsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListDeploymentsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Description for Delete a deployment by its ID for an app, or a deployment slot. */
  deleteDeploymentSlot: (
    resourceGroupName: string,
    name: string,
    id: string,
    slot: string,
    options?: WebAppsDeleteDeploymentSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Create a deployment for an app, or a deployment slot. */
  createDeploymentSlot: (
    resourceGroupName: string,
    name: string,
    id: string,
    slot: string,
    deployment: Deployment,
    options?: WebAppsCreateDeploymentSlotOptionalParams,
  ) => Promise<Deployment>;
  /** Description for Get a deployment by its ID for an app, or a deployment slot. */
  getDeploymentSlot: (
    resourceGroupName: string,
    name: string,
    id: string,
    slot: string,
    options?: WebAppsGetDeploymentSlotOptionalParams,
  ) => Promise<Deployment>;
  /** Description for List deployment log for specific deployment for an app, or a deployment slot. */
  listDeploymentLog: (
    resourceGroupName: string,
    name: string,
    id: string,
    options?: WebAppsListDeploymentLogOptionalParams,
  ) => Promise<Deployment>;
  /** Description for List deployments for an app, or a deployment slot. */
  listDeployments: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListDeploymentsOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Description for Delete a deployment by its ID for an app, or a deployment slot. */
  deleteDeployment: (
    resourceGroupName: string,
    name: string,
    id: string,
    options?: WebAppsDeleteDeploymentOptionalParams,
  ) => Promise<void>;
  /** Description for Create a deployment for an app, or a deployment slot. */
  createDeployment: (
    resourceGroupName: string,
    name: string,
    id: string,
    deployment: Deployment,
    options?: WebAppsCreateDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** Description for Get a deployment by its ID for an app, or a deployment slot. */
  getDeployment: (
    resourceGroupName: string,
    name: string,
    id: string,
    options?: WebAppsGetDeploymentOptionalParams,
  ) => Promise<Deployment>;
  /** List deployment statuses for an app (or deployment slot, if specified). */
  listSlotSiteDeploymentStatusesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<CsmDeploymentStatus>;
  /** Gets the deployment status for an app (or deployment slot, if specified). */
  getSlotSiteDeploymentStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    deploymentStatusId: string,
    options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
  ) => PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>;
  /** @deprecated use getSlotSiteDeploymentStatusSlot instead */
  beginGetSlotSiteDeploymentStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    deploymentStatusId: string,
    options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>>;
  /** @deprecated use getSlotSiteDeploymentStatusSlot instead */
  beginGetSlotSiteDeploymentStatusSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    deploymentStatusId: string,
    options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
  ) => Promise<CsmDeploymentStatus>;
  /** List deployment statuses for an app (or deployment slot, if specified). */
  listProductionSiteDeploymentStatuses: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListProductionSiteDeploymentStatusesOptionalParams,
  ) => PagedAsyncIterableIterator<CsmDeploymentStatus>;
  /** Gets the deployment status for an app (or deployment slot, if specified). */
  getProductionSiteDeploymentStatus: (
    resourceGroupName: string,
    name: string,
    deploymentStatusId: string,
    options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
  ) => PollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>;
  /** @deprecated use getProductionSiteDeploymentStatus instead */
  beginGetProductionSiteDeploymentStatus: (
    resourceGroupName: string,
    name: string,
    deploymentStatusId: string,
    options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CsmDeploymentStatus>, CsmDeploymentStatus>>;
  /** @deprecated use getProductionSiteDeploymentStatus instead */
  beginGetProductionSiteDeploymentStatusAndWait: (
    resourceGroupName: string,
    name: string,
    deploymentStatusId: string,
    options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
  ) => Promise<CsmDeploymentStatus>;
  /** Description for Stop a continuous web job for an app, or a deployment slot. */
  stopContinuousWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsStopContinuousWebJobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Start a continuous web job for an app, or a deployment slot. */
  startContinuousWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsStartContinuousWebJobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for List continuous web jobs for an app, or a deployment slot. */
  listContinuousWebJobsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListContinuousWebJobsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ContinuousWebJob>;
  /** Description for Delete a continuous web job by its ID for an app, or a deployment slot. */
  deleteContinuousWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsDeleteContinuousWebJobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a continuous web job by its ID for an app, or a deployment slot. */
  getContinuousWebJobSlot: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    slot: string,
    options?: WebAppsGetContinuousWebJobSlotOptionalParams,
  ) => Promise<ContinuousWebJob>;
  /** Description for Stop a continuous web job for an app, or a deployment slot. */
  stopContinuousWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsStopContinuousWebJobOptionalParams,
  ) => Promise<void>;
  /** Description for Start a continuous web job for an app, or a deployment slot. */
  startContinuousWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsStartContinuousWebJobOptionalParams,
  ) => Promise<void>;
  /** Description for List continuous web jobs for an app, or a deployment slot. */
  listContinuousWebJobs: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListContinuousWebJobsOptionalParams,
  ) => PagedAsyncIterableIterator<ContinuousWebJob>;
  /** Description for Delete a continuous web job by its ID for an app, or a deployment slot. */
  deleteContinuousWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsDeleteContinuousWebJobOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a continuous web job by its ID for an app, or a deployment slot. */
  getContinuousWebJob: (
    resourceGroupName: string,
    name: string,
    webJobName: string,
    options?: WebAppsGetContinuousWebJobOptionalParams,
  ) => Promise<ContinuousWebJob>;
  /** Description for Reverts the configuration of an app to a previous snapshot. */
  recoverSiteConfigurationSnapshotSlot: (
    resourceGroupName: string,
    name: string,
    snapshotId: string,
    slot: string,
    options?: WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams,
  ) => Promise<void>;
  /** Description for List the configurations of an app */
  listConfigurationsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListConfigurationsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<SiteConfigResource>;
  /** Description for Gets a snapshot of the configuration of an app at a previous point in time. */
  getConfigurationSnapshotSlot: (
    resourceGroupName: string,
    name: string,
    snapshotId: string,
    slot: string,
    options?: WebAppsGetConfigurationSnapshotSlotOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
  listConfigurationSnapshotInfoSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListConfigurationSnapshotInfoSlotOptionalParams,
  ) => PagedAsyncIterableIterator<SiteConfigurationSnapshotInfo>;
  /** Description for Updates the configuration of an app. */
  updateConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteConfig: SiteConfigResource,
    options?: WebAppsUpdateConfigurationSlotOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Updates the configuration of an app. */
  createOrUpdateConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteConfig: SiteConfigResource,
    options?: WebAppsCreateOrUpdateConfigurationSlotOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
  getConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetConfigurationSlotOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Reverts the configuration of an app to a previous snapshot. */
  recoverSiteConfigurationSnapshot: (
    resourceGroupName: string,
    name: string,
    snapshotId: string,
    options?: WebAppsRecoverSiteConfigurationSnapshotOptionalParams,
  ) => Promise<void>;
  /** Description for List the configurations of an app */
  listConfigurations: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListConfigurationsOptionalParams,
  ) => PagedAsyncIterableIterator<SiteConfigResource>;
  /** Description for Gets a snapshot of the configuration of an app at a previous point in time. */
  getConfigurationSnapshot: (
    resourceGroupName: string,
    name: string,
    snapshotId: string,
    options?: WebAppsGetConfigurationSnapshotOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Gets a list of web app configuration snapshots identifiers. Each element of the list contains a timestamp and the ID of the snapshot. */
  listConfigurationSnapshotInfo: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListConfigurationSnapshotInfoOptionalParams,
  ) => PagedAsyncIterableIterator<SiteConfigurationSnapshotInfo>;
  /** Description for Updates the configuration of an app. */
  updateConfiguration: (
    resourceGroupName: string,
    name: string,
    siteConfig: SiteConfigResource,
    options?: WebAppsUpdateConfigurationOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Updates the configuration of an app. */
  createOrUpdateConfiguration: (
    resourceGroupName: string,
    name: string,
    siteConfig: SiteConfigResource,
    options?: WebAppsCreateOrUpdateConfigurationOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Gets the configuration of an app, such as platform version and bitness, default documents, virtual applications, Always On, etc. */
  getConfiguration: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetConfigurationOptionalParams,
  ) => Promise<SiteConfigResource>;
  /** Description for Updates the names of application settings and connection string that remain with the slot during swap operation. */
  updateSlotConfigurationNames: (
    resourceGroupName: string,
    name: string,
    slotConfigNames: SlotConfigNamesResource,
    options?: WebAppsUpdateSlotConfigurationNamesOptionalParams,
  ) => Promise<SlotConfigNamesResource>;
  /** Description for Gets the names of app settings and connection strings that stick to the slot (not swapped). */
  listSlotConfigurationNames: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSlotConfigurationNamesOptionalParams,
  ) => Promise<SlotConfigNamesResource>;
  /** Description for Updates the logging configuration of an app. */
  updateDiagnosticLogsConfigSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteLogsConfig: SiteLogsConfig,
    options?: WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams,
  ) => Promise<SiteLogsConfig>;
  /** Description for Gets the logging configuration of an app. */
  getDiagnosticLogsConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams,
  ) => Promise<SiteLogsConfig>;
  /** Description for Updates the logging configuration of an app. */
  updateDiagnosticLogsConfig: (
    resourceGroupName: string,
    name: string,
    siteLogsConfig: SiteLogsConfig,
    options?: WebAppsUpdateDiagnosticLogsConfigOptionalParams,
  ) => Promise<SiteLogsConfig>;
  /** Description for Gets the logging configuration of an app. */
  getDiagnosticLogsConfiguration: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetDiagnosticLogsConfigurationOptionalParams,
  ) => Promise<SiteLogsConfig>;
  /** Description for Gets the config reference app settings and status of an app */
  listSiteConnectionStringKeyVaultReferencesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ApiKVReference>;
  /** Description for Gets the config reference and status of an app */
  getSiteConnectionStringKeyVaultReferenceSlot: (
    resourceGroupName: string,
    name: string,
    connectionStringKey: string,
    slot: string,
    options?: WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams,
  ) => Promise<ApiKVReference>;
  /** Description for Gets the config reference app settings and status of an app */
  listAppSettingsKeyVaultReferencesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<ApiKVReference>;
  /** Description for Gets the config reference and status of an app */
  getAppSettingKeyVaultReferenceSlot: (
    resourceGroupName: string,
    name: string,
    appSettingKey: string,
    slot: string,
    options?: WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams,
  ) => Promise<ApiKVReference>;
  /** Description for Gets the config reference app settings and status of an app */
  listSiteConnectionStringKeyVaultReferences: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams,
  ) => PagedAsyncIterableIterator<ApiKVReference>;
  /** Description for Gets the config reference and status of an app */
  getSiteConnectionStringKeyVaultReference: (
    resourceGroupName: string,
    name: string,
    connectionStringKey: string,
    options?: WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams,
  ) => Promise<ApiKVReference>;
  /** Description for Gets the config reference app settings and status of an app */
  listAppSettingsKeyVaultReferences: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListAppSettingsKeyVaultReferencesOptionalParams,
  ) => PagedAsyncIterableIterator<ApiKVReference>;
  /** Description for Gets the config reference and status of an app */
  getAppSettingKeyVaultReference: (
    resourceGroupName: string,
    name: string,
    appSettingKey: string,
    options?: WebAppsGetAppSettingKeyVaultReferenceOptionalParams,
  ) => Promise<ApiKVReference>;
  /** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
  getAuthSettingsV2Slot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetAuthSettingsV2SlotOptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Description for Updates site's Authentication / Authorization settings for apps via the V2 format */
  updateAuthSettingsV2Slot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteAuthSettingsV2: SiteAuthSettingsV2,
    options?: WebAppsUpdateAuthSettingsV2SlotOptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Gets site's Authentication / Authorization settings for apps via the V2 format */
  getAuthSettingsV2WithoutSecretsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
  getAuthSettingsV2: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetAuthSettingsV2OptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Description for Updates site's Authentication / Authorization settings for apps via the V2 format */
  updateAuthSettingsV2: (
    resourceGroupName: string,
    name: string,
    siteAuthSettingsV2: SiteAuthSettingsV2,
    options?: WebAppsUpdateAuthSettingsV2OptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Description for Gets site's Authentication / Authorization settings for apps via the V2 format */
  getAuthSettingsV2WithoutSecrets: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams,
  ) => Promise<SiteAuthSettingsV2>;
  /** Description for Updates whether user publishing credentials are allowed on the site or not. */
  updateScmAllowedSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
    options?: WebAppsUpdateScmAllowedSlotOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether Scm basic auth is allowed on the site or not. */
  getScmAllowedSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetScmAllowedSlotOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
  listBasicPublishingCredentialsPoliciesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Updates whether FTP is allowed on the site or not. */
  updateFtpAllowedSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
    options?: WebAppsUpdateFtpAllowedSlotOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether FTP is allowed on the site or not. */
  getFtpAllowedSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetFtpAllowedSlotOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Updates whether user publishing credentials are allowed on the site or not. */
  updateScmAllowed: (
    resourceGroupName: string,
    name: string,
    csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
    options?: WebAppsUpdateScmAllowedOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether Scm basic auth is allowed on the site or not. */
  getScmAllowed: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetScmAllowedOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site. */
  listBasicPublishingCredentialsPolicies: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListBasicPublishingCredentialsPoliciesOptionalParams,
  ) => PagedAsyncIterableIterator<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Updates whether FTP is allowed on the site or not. */
  updateFtpAllowed: (
    resourceGroupName: string,
    name: string,
    csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
    options?: WebAppsUpdateFtpAllowedOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Returns whether FTP is allowed on the site or not. */
  getFtpAllowed: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetFtpAllowedOptionalParams,
  ) => Promise<CsmPublishingCredentialsPoliciesEntity>;
  /** Description for Restores a specific backup to another app (or deployment slot, if specified). */
  restoreSlot: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreSlot instead */
  beginRestoreSlot: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreSlot instead */
  beginRestoreSlotAndWait: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
  listBackupStatusSecretsSlot: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    request: BackupRequest,
    options?: WebAppsListBackupStatusSecretsSlotOptionalParams,
  ) => Promise<BackupItem>;
  /** Description for Gets existing backups of an app. */
  listBackupsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListBackupsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<BackupItem>;
  /** Description for Deletes a backup of an app by its ID. */
  deleteBackupSlot: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    options?: WebAppsDeleteBackupSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a backup of an app by its ID. */
  getBackupStatusSlot: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    slot: string,
    options?: WebAppsGetBackupStatusSlotOptionalParams,
  ) => Promise<BackupItem>;
  /** Description for Restores a specific backup to another app (or deployment slot, if specified). */
  restore: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    request: RestoreRequest,
    options?: WebAppsRestoreOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restore instead */
  beginRestore: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    request: RestoreRequest,
    options?: WebAppsRestoreOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restore instead */
  beginRestoreAndWait: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    request: RestoreRequest,
    options?: WebAppsRestoreOptionalParams,
  ) => Promise<void>;
  /** Description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body. */
  listBackupStatusSecrets: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    request: BackupRequest,
    options?: WebAppsListBackupStatusSecretsOptionalParams,
  ) => Promise<BackupItem>;
  /** Description for Gets existing backups of an app. */
  listBackups: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListBackupsOptionalParams,
  ) => PagedAsyncIterableIterator<BackupItem>;
  /** Description for Deletes a backup of an app by its ID. */
  deleteBackup: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    options?: WebAppsDeleteBackupOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a backup of an app by its ID. */
  getBackupStatus: (
    resourceGroupName: string,
    name: string,
    backupId: string,
    options?: WebAppsGetBackupStatusOptionalParams,
  ) => Promise<BackupItem>;
  /** Lists logic app's connections for web site, or a deployment slot. */
  listWorkflowsConnections: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListWorkflowsConnectionsOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Description for Creates the artifacts for web site, or a deployment slot. */
  deployWorkflowArtifacts: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsDeployWorkflowArtifactsOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the quota usage information of an app (or deployment slot, if specified). */
  listUsages: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<CsmUsageQuota>;
  /** Description for Syncs function trigger metadata to the management database */
  syncFunctionTriggers: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsSyncFunctionTriggersOptionalParams,
  ) => Promise<void>;
  /** Description for Sync web app repository. */
  syncRepository: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsSyncRepositoryOptionalParams,
  ) => Promise<void>;
  /** Description for Stop ongoing capturing network packets for the site. */
  stopNetworkTrace: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStopNetworkTraceOptionalParams,
  ) => Promise<void>;
  /** Description for Stops an app (or deployment slot, if specified). */
  stop: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStopOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site. */
  startNetworkTrace: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartNetworkTraceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startNetworkTrace instead */
  beginStartNetworkTrace: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartNetworkTraceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startNetworkTrace instead */
  beginStartNetworkTraceAndWait: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartNetworkTraceOptionalParams,
  ) => Promise<void>;
  /** Description for Starts an app (or deployment slot, if specified). */
  start: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartOptionalParams,
  ) => Promise<void>;
  /** Description for Returns all Snapshots to the user from DRSecondary endpoint. */
  listSnapshotsFromDRSecondary: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSnapshotsFromDRSecondaryOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Description for Returns all Snapshots to the user. */
  listSnapshots: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSnapshotsOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Description for Swaps two deployment slots of an app. */
  swapSlotWithProduction: (
    resourceGroupName: string,
    name: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotWithProductionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use swapSlotWithProduction instead */
  beginSwapSlotWithProduction: (
    resourceGroupName: string,
    name: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotWithProductionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use swapSlotWithProduction instead */
  beginSwapSlotWithProductionAndWait: (
    resourceGroupName: string,
    name: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotWithProductionOptionalParams,
  ) => Promise<void>;
  /** Description for Get the difference in configuration settings between two web app slots. */
  listSlotDifferencesFromProduction: (
    resourceGroupName: string,
    name: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsListSlotDifferencesFromProductionOptionalParams,
  ) => PagedAsyncIterableIterator<SlotDifference>;
  /** Description for Restores a web app from a snapshot. */
  restoreSnapshot: (
    resourceGroupName: string,
    name: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreSnapshot instead */
  beginRestoreSnapshot: (
    resourceGroupName: string,
    name: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreSnapshot instead */
  beginRestoreSnapshotAndWait: (
    resourceGroupName: string,
    name: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotOptionalParams,
  ) => Promise<void>;
  /** Description for Restores a deleted web app to this web app. */
  restoreFromDeletedApp: (
    resourceGroupName: string,
    name: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreFromDeletedApp instead */
  beginRestoreFromDeletedApp: (
    resourceGroupName: string,
    name: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreFromDeletedApp instead */
  beginRestoreFromDeletedAppAndWait: (
    resourceGroupName: string,
    name: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppOptionalParams,
  ) => Promise<void>;
  /** Description for Restores an app from a backup blob in Azure Storage. */
  restoreFromBackupBlob: (
    resourceGroupName: string,
    name: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreFromBackupBlob instead */
  beginRestoreFromBackupBlob: (
    resourceGroupName: string,
    name: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreFromBackupBlob instead */
  beginRestoreFromBackupBlobAndWait: (
    resourceGroupName: string,
    name: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobOptionalParams,
  ) => Promise<void>;
  /** Description for Restarts an app (or deployment slot, if specified). */
  restart: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsRestartOptionalParams,
  ) => Promise<void>;
  /** Description for Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
  resetProductionSlotConfig: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsResetProductionSlotConfigOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the publishing profile for an app (or deployment slot, if specified). */
  listPublishingProfileXmlWithSecrets: (
    resourceGroupName: string,
    name: string,
    publishingProfileOptions: CsmPublishingProfileOptions,
    options?: WebAppsListPublishingProfileXmlWithSecretsOptionalParams,
  ) => Promise<WebAppsListPublishingProfileXmlWithSecretsResponse>;
  /** Description for Gets the private link resources */
  getPrivateLinkResources: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourcesWrapper>;
  /** Description for Gets the premier add-ons of an app. */
  listPremierAddOns: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPremierAddOnsOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Gets web app's event logs. */
  getSitePhpErrorLogFlag: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetSitePhpErrorLogFlagOptionalParams,
  ) => Promise<SitePhpErrorLogFlag>;
  /** Description for Gets perfmon counters for web app. */
  listPerfMonCounters: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPerfMonCountersOptionalParams,
  ) => PagedAsyncIterableIterator<PerfMonResponse>;
  /** Description for Generates a new publishing password for an app (or deployment slot, if specified). */
  generateNewSitePublishingPassword: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGenerateNewSitePublishingPasswordOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTracesV2: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    options?: WebAppsGetNetworkTracesV2OptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTraceOperationV2: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    options?: WebAppsGetNetworkTraceOperationV2OptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTraces: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    options?: WebAppsGetNetworkTracesOptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Stop ongoing capturing network packets for the site. */
  stopWebSiteNetworkTrace: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStopWebSiteNetworkTraceOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site. */
  startWebSiteNetworkTraceOperation: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startWebSiteNetworkTraceOperation instead */
  beginStartWebSiteNetworkTraceOperation: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startWebSiteNetworkTraceOperation instead */
  beginStartWebSiteNetworkTraceOperationAndWait: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site (To be deprecated). */
  startWebSiteNetworkTrace: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsStartWebSiteNetworkTraceOptionalParams,
  ) => Promise<WebAppsStartWebSiteNetworkTraceResponse>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTraceOperation: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    options?: WebAppsGetNetworkTraceOperationOptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Migrates a local (in-app) MySql database to a remote MySql database. */
  migrateMySql: (
    resourceGroupName: string,
    name: string,
    migrationRequestEnvelope: MigrateMySqlRequest,
    options?: WebAppsMigrateMySqlOptionalParams,
  ) => PollerLike<OperationState<Operation>, Operation>;
  /** @deprecated use migrateMySql instead */
  beginMigrateMySql: (
    resourceGroupName: string,
    name: string,
    migrationRequestEnvelope: MigrateMySqlRequest,
    options?: WebAppsMigrateMySqlOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Operation>, Operation>>;
  /** @deprecated use migrateMySql instead */
  beginMigrateMySqlAndWait: (
    resourceGroupName: string,
    name: string,
    migrationRequestEnvelope: MigrateMySqlRequest,
    options?: WebAppsMigrateMySqlOptionalParams,
  ) => Promise<Operation>;
  /** Description for Restores a web app. */
  migrateStorage: (
    subscriptionName: string,
    resourceGroupName: string,
    name: string,
    migrationOptions: StorageMigrationOptions,
    options?: WebAppsMigrateStorageOptionalParams,
  ) => PollerLike<OperationState<StorageMigrationResponse>, StorageMigrationResponse>;
  /** @deprecated use migrateStorage instead */
  beginMigrateStorage: (
    subscriptionName: string,
    resourceGroupName: string,
    name: string,
    migrationOptions: StorageMigrationOptions,
    options?: WebAppsMigrateStorageOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<StorageMigrationResponse>, StorageMigrationResponse>
  >;
  /** @deprecated use migrateStorage instead */
  beginMigrateStorageAndWait: (
    subscriptionName: string,
    resourceGroupName: string,
    name: string,
    migrationOptions: StorageMigrationOptions,
    options?: WebAppsMigrateStorageOptionalParams,
  ) => Promise<StorageMigrationResponse>;
  /** Updates the machine key of an app. */
  updateMachineKey: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsUpdateMachineKeyOptionalParams,
  ) => Promise<WebAppsUpdateMachineKeyResponse>;
  /** Description for This is to allow calling via powershell and ARM template. */
  listSyncFunctionTriggers: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSyncFunctionTriggersOptionalParams,
  ) => Promise<FunctionSecrets>;
  /** Description for Gets existing backups of an app. */
  listSiteBackups: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSiteBackupsOptionalParams,
  ) => PagedAsyncIterableIterator<BackupItem>;
  /** Description for Shows whether an app can be cloned to another resource group or subscription. */
  isCloneable: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsIsCloneableOptionalParams,
  ) => Promise<SiteCloneability>;
  /** Description for Gets hybrid connections configured for an app (or deployment slot, if specified). */
  listRelayServiceConnections: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListRelayServiceConnectionsOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Retrieves all Service Bus Hybrid Connections used by this Web App. */
  listHybridConnections: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListHybridConnectionsOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Delete a host level secret. */
  deleteHostSecret: (
    resourceGroupName: string,
    name: string,
    keyType: string,
    keyName: string,
    options?: WebAppsDeleteHostSecretOptionalParams,
  ) => Promise<void>;
  /** Description for Add or update a host level secret. */
  createOrUpdateHostSecret: (
    resourceGroupName: string,
    name: string,
    keyType: string,
    keyName: string,
    key: KeyInfo,
    options?: WebAppsCreateOrUpdateHostSecretOptionalParams,
  ) => Promise<KeyInfo>;
  /** Description for Syncs function trigger metadata to the management database */
  syncFunctions: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsSyncFunctionsOptionalParams,
  ) => Promise<void>;
  /** Description for This is to allow calling via powershell and ARM template. */
  listSyncStatus: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSyncStatusOptionalParams,
  ) => Promise<void>;
  /** Description for Get host secrets for a function app. */
  listHostKeys: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListHostKeysOptionalParams,
  ) => Promise<HostKeys>;
  /** Description for Fetch a short lived token that can be exchanged for a master key. */
  getFunctionsAdminToken: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetFunctionsAdminTokenOptionalParams,
  ) => Promise<WebAppsGetFunctionsAdminTokenResponse>;
  /** Description for Invoke the OneDeploy publish web app extension. */
  createOneDeployOperation: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsCreateOneDeployOperationOptionalParams,
  ) => Promise<WebAppsCreateOneDeployOperationResponse>;
  /** Description for Invoke onedeploy status API /api/deployments and gets the deployment status for the site */
  getOneDeployStatus: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetOneDeployStatusOptionalParams,
  ) => Promise<WebAppsGetOneDeployStatusResponse>;
  /** Description for Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
  discoverBackup: (
    resourceGroupName: string,
    name: string,
    request: RestoreRequest,
    options?: WebAppsDiscoverBackupOptionalParams,
  ) => Promise<RestoreRequest>;
  /** Description for Gets the ZIP archived docker log files for the given site */
  getContainerLogsZip: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetContainerLogsZipOptionalParams,
  ) => Promise<WebAppsGetContainerLogsZipResponse>;
  /** Description for Gets the last lines of docker logs for the given site */
  getWebSiteContainerLogs: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetWebSiteContainerLogsOptionalParams,
  ) => Promise<WebAppsGetWebSiteContainerLogsResponse>;
  /** Description for Gets the Push settings associated with web app. */
  listSitePushSettings: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSitePushSettingsOptionalParams,
  ) => Promise<PushSettings>;
  /** Description for Updates the Push settings associated with web app. */
  updateSitePushSettings: (
    resourceGroupName: string,
    name: string,
    pushSettings: PushSettings,
    options?: WebAppsUpdateSitePushSettingsOptionalParams,
  ) => Promise<PushSettings>;
  /** Description for Gets the Git/FTP publishing credentials of an app. */
  listPublishingCredentials: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPublishingCredentialsOptionalParams,
  ) => PollerLike<OperationState<User>, User>;
  /** @deprecated use listPublishingCredentials instead */
  beginListPublishingCredentials: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPublishingCredentialsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<User>, User>>;
  /** @deprecated use listPublishingCredentials instead */
  beginListPublishingCredentialsAndWait: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPublishingCredentialsOptionalParams,
  ) => Promise<User>;
  /** Description for Gets the metadata of an app. */
  listMetadata: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListMetadataOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Replaces the metadata of an app. */
  updateMetadata: (
    resourceGroupName: string,
    name: string,
    metadata: StringDictionary,
    options?: WebAppsUpdateMetadataOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the connection strings of an app. */
  listConnectionStrings: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListConnectionStringsOptionalParams,
  ) => Promise<ConnectionStringDictionary>;
  /** Description for Replaces the connection strings of an app. */
  updateConnectionStrings: (
    resourceGroupName: string,
    name: string,
    connectionStrings: ConnectionStringDictionary,
    options?: WebAppsUpdateConnectionStringsOptionalParams,
  ) => Promise<ConnectionStringDictionary>;
  /** Description for Gets the backup configuration of an app. */
  getBackupConfiguration: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetBackupConfigurationOptionalParams,
  ) => Promise<BackupRequest>;
  /** Description for Deletes the backup configuration of an app. */
  deleteBackupConfiguration: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsDeleteBackupConfigurationOptionalParams,
  ) => Promise<void>;
  /** Description for Updates the backup configuration of an app. */
  updateBackupConfiguration: (
    resourceGroupName: string,
    name: string,
    request: BackupRequest,
    options?: WebAppsUpdateBackupConfigurationOptionalParams,
  ) => Promise<BackupRequest>;
  /** Description for Gets the Azure storage account configurations of an app. */
  listAzureStorageAccounts: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListAzureStorageAccountsOptionalParams,
  ) => Promise<AzureStoragePropertyDictionaryResource>;
  /** Description for Updates the Azure storage account configurations of an app. */
  updateAzureStorageAccounts: (
    resourceGroupName: string,
    name: string,
    azureStorageAccounts: AzureStoragePropertyDictionaryResource,
    options?: WebAppsUpdateAzureStorageAccountsOptionalParams,
  ) => Promise<AzureStoragePropertyDictionaryResource>;
  /** Description for Gets the Authentication/Authorization settings of an app. */
  getAuthSettings: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetAuthSettingsOptionalParams,
  ) => Promise<SiteAuthSettings>;
  /** Description for Updates the Authentication / Authorization settings associated with web app. */
  updateAuthSettings: (
    resourceGroupName: string,
    name: string,
    siteAuthSettings: SiteAuthSettings,
    options?: WebAppsUpdateAuthSettingsOptionalParams,
  ) => Promise<SiteAuthSettings>;
  /** Description for Gets the application settings of an app. */
  listApplicationSettings: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListApplicationSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Replaces the application settings of an app. */
  updateApplicationSettings: (
    resourceGroupName: string,
    name: string,
    appSettings: StringDictionary,
    options?: WebAppsUpdateApplicationSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Creates a backup of an app. */
  backup: (
    resourceGroupName: string,
    name: string,
    request: BackupRequest,
    options?: WebAppsBackupOptionalParams,
  ) => Promise<BackupItem>;
  /** Description for Applies the configuration settings from the target slot onto the current slot. */
  applySlotConfigToProduction: (
    resourceGroupName: string,
    name: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsApplySlotConfigToProductionOptionalParams,
  ) => Promise<void>;
  /** Description for Analyze a custom hostname. */
  analyzeCustomHostname: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsAnalyzeCustomHostnameOptionalParams,
  ) => Promise<CustomHostnameAnalysisResult>;
  /** Description for Get all apps for a subscription. */
  list: (options?: WebAppsListOptionalParams) => PagedAsyncIterableIterator<Site>;
  /** Description for Deletes a web, mobile, or API app, or one of the deployment slots. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsDeleteOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
  update: (
    resourceGroupName: string,
    name: string,
    siteEnvelope: SitePatchResource,
    options?: WebAppsUpdateOptionalParams,
  ) => Promise<Site>;
  /** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    name: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Site>, Site>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    name: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateOptionalParams,
  ) => Promise<Site>;
  /** Description for Gets the details of a web, mobile, or API app. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsGetOptionalParams,
  ) => Promise<Site>;
  /** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
  updateVnetConnectionGateway: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    connectionEnvelope: VnetGateway,
    options?: WebAppsUpdateVnetConnectionGatewayOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
  createOrUpdateVnetConnectionGateway: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    connectionEnvelope: VnetGateway,
    options?: WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Gets an app's Virtual Network gateway. */
  getVnetConnectionGateway: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    options?: WebAppsGetVnetConnectionGatewayOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
  updateVnetConnectionGatewaySlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    slot: string,
    connectionEnvelope: VnetGateway,
    options?: WebAppsUpdateVnetConnectionGatewaySlotOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH). */
  createOrUpdateVnetConnectionGatewaySlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    slot: string,
    connectionEnvelope: VnetGateway,
    options?: WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Gets an app's Virtual Network gateway. */
  getVnetConnectionGatewaySlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    gatewayName: string,
    slot: string,
    options?: WebAppsGetVnetConnectionGatewaySlotOptionalParams,
  ) => Promise<VnetGateway>;
  /** Description for Gets the virtual networks the app (or deployment slot) is connected to. */
  listVnetConnections: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListVnetConnectionsOptionalParams,
  ) => Promise<VnetInfoResource[]>;
  /** Description for Deletes a connection from an app (or deployment slot to a named virtual network. */
  deleteVnetConnection: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    options?: WebAppsDeleteVnetConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
  updateVnetConnection: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    connectionEnvelope: VnetInfoResource,
    options?: WebAppsUpdateVnetConnectionOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
  createOrUpdateVnetConnection: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    connectionEnvelope: VnetInfoResource,
    options?: WebAppsCreateOrUpdateVnetConnectionOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Gets a virtual network the app (or deployment slot) is connected to by name. */
  getVnetConnection: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    options?: WebAppsGetVnetConnectionOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Gets the virtual networks the app (or deployment slot) is connected to. */
  listVnetConnectionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListVnetConnectionsSlotOptionalParams,
  ) => Promise<VnetInfoResource[]>;
  /** Description for Deletes a connection from an app (or deployment slot to a named virtual network. */
  deleteVnetConnectionSlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    slot: string,
    options?: WebAppsDeleteVnetConnectionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
  updateVnetConnectionSlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    slot: string,
    connectionEnvelope: VnetInfoResource,
    options?: WebAppsUpdateVnetConnectionSlotOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Adds a Virtual Network connection to an app or slot (PUT) or updates the connection properties (PATCH). */
  createOrUpdateVnetConnectionSlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    slot: string,
    connectionEnvelope: VnetInfoResource,
    options?: WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Gets a virtual network the app (or deployment slot) is connected to by name. */
  getVnetConnectionSlot: (
    resourceGroupName: string,
    name: string,
    vnetName: string,
    slot: string,
    options?: WebAppsGetVnetConnectionSlotOptionalParams,
  ) => Promise<VnetInfoResource>;
  /** Description for Removes a Hybrid Connection from this site. */
  deleteHybridConnectionSlot: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    slot: string,
    options?: WebAppsDeleteHybridConnectionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new Hybrid Connection using a Service Bus relay. */
  updateHybridConnectionSlot: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    slot: string,
    connectionEnvelope: HybridConnection,
    options?: WebAppsUpdateHybridConnectionSlotOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Creates a new Hybrid Connection using a Service Bus relay. */
  createOrUpdateHybridConnectionSlot: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    slot: string,
    connectionEnvelope: HybridConnection,
    options?: WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
  getHybridConnectionSlot: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    slot: string,
    options?: WebAppsGetHybridConnectionSlotOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Removes a Hybrid Connection from this site. */
  deleteHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: WebAppsDeleteHybridConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new Hybrid Connection using a Service Bus relay. */
  updateHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    connectionEnvelope: HybridConnection,
    options?: WebAppsUpdateHybridConnectionOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Creates a new Hybrid Connection using a Service Bus relay. */
  createOrUpdateHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    connectionEnvelope: HybridConnection,
    options?: WebAppsCreateOrUpdateHybridConnectionOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Retrieves a specific Service Bus Hybrid Connection used by this Web App. */
  getHybridConnection: (
    resourceGroupName: string,
    name: string,
    namespaceName: string,
    relayName: string,
    options?: WebAppsGetHybridConnectionOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Gets the list of private endpoint connections associated with a site */
  listPrivateEndpointConnectionListSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPrivateEndpointConnectionListSlotOptionalParams,
  ) => PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Deletes a private endpoint connection */
  deletePrivateEndpointConnectionSlot: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deletePrivateEndpointConnectionSlot instead */
  beginDeletePrivateEndpointConnectionSlot: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deletePrivateEndpointConnectionSlot instead */
  beginDeletePrivateEndpointConnectionSlotAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Approves or rejects a private endpoint connection */
  approveOrRejectPrivateEndpointConnectionSlot: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
  ) => PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnectionSlot instead */
  beginApproveOrRejectPrivateEndpointConnectionSlot: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RemotePrivateEndpointConnectionARMResource>,
      RemotePrivateEndpointConnectionARMResource
    >
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnectionSlot instead */
  beginApproveOrRejectPrivateEndpointConnectionSlotAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Gets a private endpoint connection */
  getPrivateEndpointConnectionSlot: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    slot: string,
    options?: WebAppsGetPrivateEndpointConnectionSlotOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Gets the list of private endpoint connections associated with a site */
  listPrivateEndpointConnectionList: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListPrivateEndpointConnectionListOptionalParams,
  ) => PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Deletes a private endpoint connection */
  deletePrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Approves or rejects a private endpoint connection */
  approveOrRejectPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnection instead */
  beginApproveOrRejectPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RemotePrivateEndpointConnectionARMResource>,
      RemotePrivateEndpointConnectionARMResource
    >
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnection instead */
  beginApproveOrRejectPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Gets a private endpoint connection */
  getPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: WebAppsGetPrivateEndpointConnectionOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
  /** Lists logic app's connections for web site, or a deployment slot. */
  listWorkflowsConnectionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListWorkflowsConnectionsSlotOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Description for Creates the artifacts for web site, or a deployment slot. */
  deployWorkflowArtifactsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsDeployWorkflowArtifactsSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the quota usage information of an app (or deployment slot, if specified). */
  listUsagesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListUsagesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<CsmUsageQuota>;
  /** Description for Syncs function trigger metadata to the management database */
  syncFunctionTriggersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsSyncFunctionTriggersSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Sync web app repository. */
  syncRepositorySlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsSyncRepositorySlotOptionalParams,
  ) => Promise<void>;
  /** Description for Stop ongoing capturing network packets for the site. */
  stopNetworkTraceSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStopNetworkTraceSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Stops an app (or deployment slot, if specified). */
  stopSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStopSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site. */
  startNetworkTraceSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartNetworkTraceSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startNetworkTraceSlot instead */
  beginStartNetworkTraceSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartNetworkTraceSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startNetworkTraceSlot instead */
  beginStartNetworkTraceSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartNetworkTraceSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Starts an app (or deployment slot, if specified). */
  startSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Returns all Snapshots to the user from DRSecondary endpoint. */
  listSnapshotsFromDRSecondarySlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSnapshotsFromDRSecondarySlotOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Description for Returns all Snapshots to the user. */
  listSnapshotsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSnapshotsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<Snapshot>;
  /** Description for Swaps two deployment slots of an app. */
  swapSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use swapSlot instead */
  beginSwapSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use swapSlot instead */
  beginSwapSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsSwapSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Get the difference in configuration settings between two web app slots. */
  listSlotDifferencesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsListSlotDifferencesSlotOptionalParams,
  ) => PagedAsyncIterableIterator<SlotDifference>;
  /** Description for Restores a web app from a snapshot. */
  restoreSnapshotSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreSnapshotSlot instead */
  beginRestoreSnapshotSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreSnapshotSlot instead */
  beginRestoreSnapshotSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: SnapshotRestoreRequest,
    options?: WebAppsRestoreSnapshotSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Restores a deleted web app to this web app. */
  restoreFromDeletedAppSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreFromDeletedAppSlot instead */
  beginRestoreFromDeletedAppSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreFromDeletedAppSlot instead */
  beginRestoreFromDeletedAppSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    restoreRequest: DeletedAppRestoreRequest,
    options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Restores an app from a backup blob in Azure Storage. */
  restoreFromBackupBlobSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restoreFromBackupBlobSlot instead */
  beginRestoreFromBackupBlobSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restoreFromBackupBlobSlot instead */
  beginRestoreFromBackupBlobSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Restarts an app (or deployment slot, if specified). */
  restartSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsRestartSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Resets the configuration settings of the current slot if they were previously modified by calling the API with POST. */
  resetSlotConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsResetSlotConfigurationSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the publishing profile for an app (or deployment slot, if specified). */
  listPublishingProfileXmlWithSecretsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    publishingProfileOptions: CsmPublishingProfileOptions,
    options?: WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams,
  ) => Promise<WebAppsListPublishingProfileXmlWithSecretsSlotResponse>;
  /** Description for Gets the private link resources */
  getPrivateLinkResourcesSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetPrivateLinkResourcesSlotOptionalParams,
  ) => Promise<PrivateLinkResourcesWrapper>;
  /** Description for Gets the premier add-ons of an app. */
  listPremierAddOnsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPremierAddOnsSlotOptionalParams,
  ) => Promise<PremierAddOn>;
  /** Description for Gets web app's event logs. */
  getSitePhpErrorLogFlagSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetSitePhpErrorLogFlagSlotOptionalParams,
  ) => Promise<SitePhpErrorLogFlag>;
  /** Description for Gets perfmon counters for web app. */
  listPerfMonCountersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPerfMonCountersSlotOptionalParams,
  ) => PagedAsyncIterableIterator<PerfMonResponse>;
  /** Description for Generates a new publishing password for an app (or deployment slot, if specified). */
  generateNewSitePublishingPasswordSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTracesSlotV2: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    slot: string,
    options?: WebAppsGetNetworkTracesSlotV2OptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTraceOperationSlotV2: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    slot: string,
    options?: WebAppsGetNetworkTraceOperationSlotV2OptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTracesSlot: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    slot: string,
    options?: WebAppsGetNetworkTracesSlotOptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for Stop ongoing capturing network packets for the site. */
  stopWebSiteNetworkTraceSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStopWebSiteNetworkTraceSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site. */
  startWebSiteNetworkTraceOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startWebSiteNetworkTraceOperationSlot instead */
  beginStartWebSiteNetworkTraceOperationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startWebSiteNetworkTraceOperationSlot instead */
  beginStartWebSiteNetworkTraceOperationSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Start capturing network packets for the site (To be deprecated). */
  startWebSiteNetworkTraceSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsStartWebSiteNetworkTraceSlotOptionalParams,
  ) => Promise<WebAppsStartWebSiteNetworkTraceSlotResponse>;
  /** Description for Gets a named operation for a network trace capturing (or deployment slot, if specified). */
  getNetworkTraceOperationSlot: (
    resourceGroupName: string,
    name: string,
    operationId: string,
    slot: string,
    options?: WebAppsGetNetworkTraceOperationSlotOptionalParams,
  ) => Promise<NetworkTrace[]>;
  /** Description for This is to allow calling via powershell and ARM template. */
  listSyncFunctionTriggersSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSyncFunctionTriggersSlotOptionalParams,
  ) => Promise<FunctionSecrets>;
  /** Description for Gets existing backups of an app. */
  listSiteBackupsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSiteBackupsSlotOptionalParams,
  ) => PagedAsyncIterableIterator<BackupItem>;
  /** Description for Shows whether an app can be cloned to another resource group or subscription. */
  isCloneableSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsIsCloneableSlotOptionalParams,
  ) => Promise<SiteCloneability>;
  /** Description for Gets hybrid connections configured for an app (or deployment slot, if specified). */
  listRelayServiceConnectionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListRelayServiceConnectionsSlotOptionalParams,
  ) => Promise<RelayServiceConnectionEntity>;
  /** Description for Retrieves all Service Bus Hybrid Connections used by this Web App. */
  listHybridConnectionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListHybridConnectionsSlotOptionalParams,
  ) => Promise<HybridConnection>;
  /** Description for Delete a host level secret. */
  deleteHostSecretSlot: (
    resourceGroupName: string,
    name: string,
    keyType: string,
    keyName: string,
    slot: string,
    options?: WebAppsDeleteHostSecretSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Add or update a host level secret. */
  createOrUpdateHostSecretSlot: (
    resourceGroupName: string,
    name: string,
    keyType: string,
    keyName: string,
    slot: string,
    key: KeyInfo,
    options?: WebAppsCreateOrUpdateHostSecretSlotOptionalParams,
  ) => Promise<KeyInfo>;
  /** Description for Syncs function trigger metadata to the management database */
  syncFunctionsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsSyncFunctionsSlotOptionalParams,
  ) => Promise<void>;
  /** Description for This is to allow calling via powershell and ARM template. */
  listSyncStatusSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSyncStatusSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Get host secrets for a function app. */
  listHostKeysSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListHostKeysSlotOptionalParams,
  ) => Promise<HostKeys>;
  /** Description for Fetch a short lived token that can be exchanged for a master key. */
  getFunctionsAdminTokenSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetFunctionsAdminTokenSlotOptionalParams,
  ) => Promise<WebAppsGetFunctionsAdminTokenSlotResponse>;
  /** Description for Discovers an existing app backup that can be restored from a blob in Azure storage. Use this to get information about the databases stored in a backup. */
  discoverBackupSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: RestoreRequest,
    options?: WebAppsDiscoverBackupSlotOptionalParams,
  ) => Promise<RestoreRequest>;
  /** Description for Gets the ZIP archived docker log files for the given site */
  getContainerLogsZipSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetContainerLogsZipSlotOptionalParams,
  ) => Promise<WebAppsGetContainerLogsZipSlotResponse>;
  /** Description for Gets the last lines of docker logs for the given site */
  getWebSiteContainerLogsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetWebSiteContainerLogsSlotOptionalParams,
  ) => Promise<WebAppsGetWebSiteContainerLogsSlotResponse>;
  /** Description for Gets the Push settings associated with web app. */
  listSitePushSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListSitePushSettingsSlotOptionalParams,
  ) => Promise<PushSettings>;
  /** Description for Updates the Push settings associated with web app. */
  updateSitePushSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    pushSettings: PushSettings,
    options?: WebAppsUpdateSitePushSettingsSlotOptionalParams,
  ) => Promise<PushSettings>;
  /** Description for Gets the Git/FTP publishing credentials of an app. */
  listPublishingCredentialsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPublishingCredentialsSlotOptionalParams,
  ) => PollerLike<OperationState<User>, User>;
  /** @deprecated use listPublishingCredentialsSlot instead */
  beginListPublishingCredentialsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPublishingCredentialsSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<User>, User>>;
  /** @deprecated use listPublishingCredentialsSlot instead */
  beginListPublishingCredentialsSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListPublishingCredentialsSlotOptionalParams,
  ) => Promise<User>;
  /** Description for Gets the metadata of an app. */
  listMetadataSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListMetadataSlotOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Replaces the metadata of an app. */
  updateMetadataSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    metadata: StringDictionary,
    options?: WebAppsUpdateMetadataSlotOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the connection strings of an app. */
  listConnectionStringsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListConnectionStringsSlotOptionalParams,
  ) => Promise<ConnectionStringDictionary>;
  /** Description for Replaces the connection strings of an app. */
  updateConnectionStringsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    connectionStrings: ConnectionStringDictionary,
    options?: WebAppsUpdateConnectionStringsSlotOptionalParams,
  ) => Promise<ConnectionStringDictionary>;
  /** Description for Gets the backup configuration of an app. */
  getBackupConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetBackupConfigurationSlotOptionalParams,
  ) => Promise<BackupRequest>;
  /** Description for Deletes the backup configuration of an app. */
  deleteBackupConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsDeleteBackupConfigurationSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Updates the backup configuration of an app. */
  updateBackupConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: BackupRequest,
    options?: WebAppsUpdateBackupConfigurationSlotOptionalParams,
  ) => Promise<BackupRequest>;
  /** Description for Gets the Azure storage account configurations of an app. */
  listAzureStorageAccountsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListAzureStorageAccountsSlotOptionalParams,
  ) => Promise<AzureStoragePropertyDictionaryResource>;
  /** Description for Updates the Azure storage account configurations of an app. */
  updateAzureStorageAccountsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    azureStorageAccounts: AzureStoragePropertyDictionaryResource,
    options?: WebAppsUpdateAzureStorageAccountsSlotOptionalParams,
  ) => Promise<AzureStoragePropertyDictionaryResource>;
  /** Description for Gets the Authentication/Authorization settings of an app. */
  getAuthSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetAuthSettingsSlotOptionalParams,
  ) => Promise<SiteAuthSettings>;
  /** Description for Updates the Authentication / Authorization settings associated with web app. */
  updateAuthSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteAuthSettings: SiteAuthSettings,
    options?: WebAppsUpdateAuthSettingsSlotOptionalParams,
  ) => Promise<SiteAuthSettings>;
  /** Description for Gets the application settings of an app. */
  listApplicationSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsListApplicationSettingsSlotOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Replaces the application settings of an app. */
  updateApplicationSettingsSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    appSettings: StringDictionary,
    options?: WebAppsUpdateApplicationSettingsSlotOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Creates a backup of an app. */
  backupSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    request: BackupRequest,
    options?: WebAppsBackupSlotOptionalParams,
  ) => Promise<BackupItem>;
  /** Description for Applies the configuration settings from the target slot onto the current slot. */
  applySlotConfigurationSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    slotSwapEntity: CsmSlotEntity,
    options?: WebAppsApplySlotConfigurationSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Analyze a custom hostname. */
  analyzeCustomHostnameSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsAnalyzeCustomHostnameSlotOptionalParams,
  ) => Promise<CustomHostnameAnalysisResult>;
  /** Description for Gets all web, mobile, and API apps in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WebAppsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
  /** Description for Deletes a web, mobile, or API app, or one of the deployment slots. */
  deleteSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsDeleteSlotOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
  updateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteEnvelope: SitePatchResource,
    options?: WebAppsUpdateSlotOptionalParams,
  ) => Promise<Site>;
  /** Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app. */
  createOrUpdateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateSlotOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** @deprecated use createOrUpdateSlot instead */
  beginCreateOrUpdateSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateSlotOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Site>, Site>>;
  /** @deprecated use createOrUpdateSlot instead */
  beginCreateOrUpdateSlotAndWait: (
    resourceGroupName: string,
    name: string,
    slot: string,
    siteEnvelope: Site,
    options?: WebAppsCreateOrUpdateSlotOptionalParams,
  ) => Promise<Site>;
  /** Description for Gets the details of a web, mobile, or API app. */
  getSlot: (
    resourceGroupName: string,
    name: string,
    slot: string,
    options?: WebAppsGetSlotOptionalParams,
  ) => Promise<Site>;
  /** Description for Gets an app's deployment slots. */
  listSlots: (
    resourceGroupName: string,
    name: string,
    options?: WebAppsListSlotsOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
}

function _getWebApps(context: WebSiteManagementContext) {
  return {
    listWorkflows: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListWorkflowsOptionalParams,
    ) => listWorkflows(context, resourceGroupName, name, options),
    getWorkflow: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      options?: WebAppsGetWorkflowOptionalParams,
    ) => getWorkflow(context, resourceGroupName, name, workflowName, options),
    listInstanceWorkflowsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListInstanceWorkflowsSlotOptionalParams,
    ) => listInstanceWorkflowsSlot(context, resourceGroupName, name, slot, options),
    getInstanceWorkflowSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      workflowName: string,
      options?: WebAppsGetInstanceWorkflowSlotOptionalParams,
    ) => getInstanceWorkflowSlot(context, resourceGroupName, name, slot, workflowName, options),
    listWebJobs: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListWebJobsOptionalParams,
    ) => listWebJobs(context, resourceGroupName, name, options),
    getWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsGetWebJobOptionalParams,
    ) => getWebJob(context, resourceGroupName, name, webJobName, options),
    listWebJobsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListWebJobsSlotOptionalParams,
    ) => listWebJobsSlot(context, resourceGroupName, name, slot, options),
    getWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsGetWebJobSlotOptionalParams,
    ) => getWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    listTriggeredWebJobHistory: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsListTriggeredWebJobHistoryOptionalParams,
    ) => listTriggeredWebJobHistory(context, resourceGroupName, name, webJobName, options),
    getTriggeredWebJobHistory: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      id: string,
      options?: WebAppsGetTriggeredWebJobHistoryOptionalParams,
    ) => getTriggeredWebJobHistory(context, resourceGroupName, name, webJobName, id, options),
    listTriggeredWebJobHistorySlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsListTriggeredWebJobHistorySlotOptionalParams,
    ) =>
      listTriggeredWebJobHistorySlot(context, resourceGroupName, name, webJobName, slot, options),
    getTriggeredWebJobHistorySlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      id: string,
      slot: string,
      options?: WebAppsGetTriggeredWebJobHistorySlotOptionalParams,
    ) =>
      getTriggeredWebJobHistorySlot(
        context,
        resourceGroupName,
        name,
        webJobName,
        id,
        slot,
        options,
      ),
    runTriggeredWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsRunTriggeredWebJobOptionalParams,
    ) => runTriggeredWebJob(context, resourceGroupName, name, webJobName, options),
    listTriggeredWebJobs: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListTriggeredWebJobsOptionalParams,
    ) => listTriggeredWebJobs(context, resourceGroupName, name, options),
    deleteTriggeredWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsDeleteTriggeredWebJobOptionalParams,
    ) => deleteTriggeredWebJob(context, resourceGroupName, name, webJobName, options),
    getTriggeredWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsGetTriggeredWebJobOptionalParams,
    ) => getTriggeredWebJob(context, resourceGroupName, name, webJobName, options),
    runTriggeredWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsRunTriggeredWebJobSlotOptionalParams,
    ) => runTriggeredWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    listTriggeredWebJobsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListTriggeredWebJobsSlotOptionalParams,
    ) => listTriggeredWebJobsSlot(context, resourceGroupName, name, slot, options),
    deleteTriggeredWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsDeleteTriggeredWebJobSlotOptionalParams,
    ) => deleteTriggeredWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    getTriggeredWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsGetTriggeredWebJobSlotOptionalParams,
    ) => getTriggeredWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    deleteSourceControl: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsDeleteSourceControlOptionalParams,
    ) => deleteSourceControl(context, resourceGroupName, name, options),
    updateSourceControl: (
      resourceGroupName: string,
      name: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsUpdateSourceControlOptionalParams,
    ) => updateSourceControl(context, resourceGroupName, name, siteSourceControl, options),
    createOrUpdateSourceControl: (
      resourceGroupName: string,
      name: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
    ) => createOrUpdateSourceControl(context, resourceGroupName, name, siteSourceControl, options),
    beginCreateOrUpdateSourceControl: async (
      resourceGroupName: string,
      name: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
    ) => {
      const poller = createOrUpdateSourceControl(
        context,
        resourceGroupName,
        name,
        siteSourceControl,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateSourceControlAndWait: async (
      resourceGroupName: string,
      name: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlOptionalParams,
    ) => {
      return await createOrUpdateSourceControl(
        context,
        resourceGroupName,
        name,
        siteSourceControl,
        options,
      );
    },
    getSourceControl: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetSourceControlOptionalParams,
    ) => getSourceControl(context, resourceGroupName, name, options),
    deleteSourceControlSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsDeleteSourceControlSlotOptionalParams,
    ) => deleteSourceControlSlot(context, resourceGroupName, name, slot, options),
    updateSourceControlSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsUpdateSourceControlSlotOptionalParams,
    ) =>
      updateSourceControlSlot(context, resourceGroupName, name, slot, siteSourceControl, options),
    createOrUpdateSourceControlSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
    ) =>
      createOrUpdateSourceControlSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteSourceControl,
        options,
      ),
    beginCreateOrUpdateSourceControlSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
    ) => {
      const poller = createOrUpdateSourceControlSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteSourceControl,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateSourceControlSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteSourceControl: SiteSourceControl,
      options?: WebAppsCreateOrUpdateSourceControlSlotOptionalParams,
    ) => {
      return await createOrUpdateSourceControlSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteSourceControl,
        options,
      );
    },
    getSourceControlSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetSourceControlSlotOptionalParams,
    ) => getSourceControlSlot(context, resourceGroupName, name, slot, options),
    listSiteExtensionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSiteExtensionsSlotOptionalParams,
    ) => listSiteExtensionsSlot(context, resourceGroupName, name, slot, options),
    deleteSiteExtensionSlot: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      slot: string,
      options?: WebAppsDeleteSiteExtensionSlotOptionalParams,
    ) => deleteSiteExtensionSlot(context, resourceGroupName, name, siteExtensionId, slot, options),
    installSiteExtensionSlot: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      slot: string,
      options?: WebAppsInstallSiteExtensionSlotOptionalParams,
    ) => installSiteExtensionSlot(context, resourceGroupName, name, siteExtensionId, slot, options),
    beginInstallSiteExtensionSlot: async (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      slot: string,
      options?: WebAppsInstallSiteExtensionSlotOptionalParams,
    ) => {
      const poller = installSiteExtensionSlot(
        context,
        resourceGroupName,
        name,
        siteExtensionId,
        slot,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInstallSiteExtensionSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      slot: string,
      options?: WebAppsInstallSiteExtensionSlotOptionalParams,
    ) => {
      return await installSiteExtensionSlot(
        context,
        resourceGroupName,
        name,
        siteExtensionId,
        slot,
        options,
      );
    },
    getSiteExtensionSlot: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      slot: string,
      options?: WebAppsGetSiteExtensionSlotOptionalParams,
    ) => getSiteExtensionSlot(context, resourceGroupName, name, siteExtensionId, slot, options),
    listSiteExtensions: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSiteExtensionsOptionalParams,
    ) => listSiteExtensions(context, resourceGroupName, name, options),
    deleteSiteExtension: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      options?: WebAppsDeleteSiteExtensionOptionalParams,
    ) => deleteSiteExtension(context, resourceGroupName, name, siteExtensionId, options),
    installSiteExtension: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      options?: WebAppsInstallSiteExtensionOptionalParams,
    ) => installSiteExtension(context, resourceGroupName, name, siteExtensionId, options),
    beginInstallSiteExtension: async (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      options?: WebAppsInstallSiteExtensionOptionalParams,
    ) => {
      const poller = installSiteExtension(
        context,
        resourceGroupName,
        name,
        siteExtensionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInstallSiteExtensionAndWait: async (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      options?: WebAppsInstallSiteExtensionOptionalParams,
    ) => {
      return await installSiteExtension(context, resourceGroupName, name, siteExtensionId, options);
    },
    getSiteExtension: (
      resourceGroupName: string,
      name: string,
      siteExtensionId: string,
      options?: WebAppsGetSiteExtensionOptionalParams,
    ) => getSiteExtension(context, resourceGroupName, name, siteExtensionId, options),
    listSiteContainersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSiteContainersSlotOptionalParams,
    ) => listSiteContainersSlot(context, resourceGroupName, name, slot, options),
    deleteSiteContainerSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      containerName: string,
      options?: WebAppsDeleteSiteContainerSlotOptionalParams,
    ) => deleteSiteContainerSlot(context, resourceGroupName, name, slot, containerName, options),
    createOrUpdateSiteContainerSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      containerName: string,
      request: SiteContainer,
      options?: WebAppsCreateOrUpdateSiteContainerSlotOptionalParams,
    ) =>
      createOrUpdateSiteContainerSlot(
        context,
        resourceGroupName,
        name,
        slot,
        containerName,
        request,
        options,
      ),
    getSiteContainerSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      containerName: string,
      options?: WebAppsGetSiteContainerSlotOptionalParams,
    ) => getSiteContainerSlot(context, resourceGroupName, name, slot, containerName, options),
    listSiteContainers: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSiteContainersOptionalParams,
    ) => listSiteContainers(context, resourceGroupName, name, options),
    deleteSiteContainer: (
      resourceGroupName: string,
      name: string,
      containerName: string,
      options?: WebAppsDeleteSiteContainerOptionalParams,
    ) => deleteSiteContainer(context, resourceGroupName, name, containerName, options),
    createOrUpdateSiteContainer: (
      resourceGroupName: string,
      name: string,
      containerName: string,
      request: SiteContainer,
      options?: WebAppsCreateOrUpdateSiteContainerOptionalParams,
    ) =>
      createOrUpdateSiteContainer(
        context,
        resourceGroupName,
        name,
        containerName,
        request,
        options,
      ),
    getSiteContainer: (
      resourceGroupName: string,
      name: string,
      containerName: string,
      options?: WebAppsGetSiteContainerOptionalParams,
    ) => getSiteContainer(context, resourceGroupName, name, containerName, options),
    listPublicCertificatesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPublicCertificatesSlotOptionalParams,
    ) => listPublicCertificatesSlot(context, resourceGroupName, name, slot, options),
    deletePublicCertificateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      publicCertificateName: string,
      options?: WebAppsDeletePublicCertificateSlotOptionalParams,
    ) =>
      deletePublicCertificateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        publicCertificateName,
        options,
      ),
    createOrUpdatePublicCertificateSlot: (
      resourceGroupName: string,
      name: string,
      publicCertificateName: string,
      slot: string,
      publicCertificate: PublicCertificate,
      options?: WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams,
    ) =>
      createOrUpdatePublicCertificateSlot(
        context,
        resourceGroupName,
        name,
        publicCertificateName,
        slot,
        publicCertificate,
        options,
      ),
    getPublicCertificateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      publicCertificateName: string,
      options?: WebAppsGetPublicCertificateSlotOptionalParams,
    ) =>
      getPublicCertificateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        publicCertificateName,
        options,
      ),
    listPublicCertificates: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPublicCertificatesOptionalParams,
    ) => listPublicCertificates(context, resourceGroupName, name, options),
    deletePublicCertificate: (
      resourceGroupName: string,
      name: string,
      publicCertificateName: string,
      options?: WebAppsDeletePublicCertificateOptionalParams,
    ) => deletePublicCertificate(context, resourceGroupName, name, publicCertificateName, options),
    createOrUpdatePublicCertificate: (
      resourceGroupName: string,
      name: string,
      publicCertificateName: string,
      publicCertificate: PublicCertificate,
      options?: WebAppsCreateOrUpdatePublicCertificateOptionalParams,
    ) =>
      createOrUpdatePublicCertificate(
        context,
        resourceGroupName,
        name,
        publicCertificateName,
        publicCertificate,
        options,
      ),
    getPublicCertificate: (
      resourceGroupName: string,
      name: string,
      publicCertificateName: string,
      options?: WebAppsGetPublicCertificateOptionalParams,
    ) => getPublicCertificate(context, resourceGroupName, name, publicCertificateName, options),
    putPrivateAccessVnetSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      access: PrivateAccess,
      options?: WebAppsPutPrivateAccessVnetSlotOptionalParams,
    ) => putPrivateAccessVnetSlot(context, resourceGroupName, name, slot, access, options),
    getPrivateAccessSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetPrivateAccessSlotOptionalParams,
    ) => getPrivateAccessSlot(context, resourceGroupName, name, slot, options),
    putPrivateAccessVnet: (
      resourceGroupName: string,
      name: string,
      access: PrivateAccess,
      options?: WebAppsPutPrivateAccessVnetOptionalParams,
    ) => putPrivateAccessVnet(context, resourceGroupName, name, access, options),
    getPrivateAccess: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetPrivateAccessOptionalParams,
    ) => getPrivateAccess(context, resourceGroupName, name, options),
    deletePremierAddOnSlot: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      slot: string,
      options?: WebAppsDeletePremierAddOnSlotOptionalParams,
    ) => deletePremierAddOnSlot(context, resourceGroupName, name, premierAddOnName, slot, options),
    updatePremierAddOnSlot: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      slot: string,
      premierAddOn: PremierAddOnPatchResource,
      options?: WebAppsUpdatePremierAddOnSlotOptionalParams,
    ) =>
      updatePremierAddOnSlot(
        context,
        resourceGroupName,
        name,
        premierAddOnName,
        slot,
        premierAddOn,
        options,
      ),
    addPremierAddOnSlot: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      slot: string,
      premierAddOn: PremierAddOn,
      options?: WebAppsAddPremierAddOnSlotOptionalParams,
    ) =>
      addPremierAddOnSlot(
        context,
        resourceGroupName,
        name,
        premierAddOnName,
        slot,
        premierAddOn,
        options,
      ),
    getPremierAddOnSlot: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      slot: string,
      options?: WebAppsGetPremierAddOnSlotOptionalParams,
    ) => getPremierAddOnSlot(context, resourceGroupName, name, premierAddOnName, slot, options),
    deletePremierAddOn: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      options?: WebAppsDeletePremierAddOnOptionalParams,
    ) => deletePremierAddOn(context, resourceGroupName, name, premierAddOnName, options),
    updatePremierAddOn: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      premierAddOn: PremierAddOnPatchResource,
      options?: WebAppsUpdatePremierAddOnOptionalParams,
    ) =>
      updatePremierAddOn(context, resourceGroupName, name, premierAddOnName, premierAddOn, options),
    addPremierAddOn: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      premierAddOn: PremierAddOn,
      options?: WebAppsAddPremierAddOnOptionalParams,
    ) => addPremierAddOn(context, resourceGroupName, name, premierAddOnName, premierAddOn, options),
    getPremierAddOn: (
      resourceGroupName: string,
      name: string,
      premierAddOnName: string,
      options?: WebAppsGetPremierAddOnOptionalParams,
    ) => getPremierAddOn(context, resourceGroupName, name, premierAddOnName, options),
    listNetworkFeaturesSlot: (
      resourceGroupName: string,
      name: string,
      view: string,
      slot: string,
      options?: WebAppsListNetworkFeaturesSlotOptionalParams,
    ) => listNetworkFeaturesSlot(context, resourceGroupName, name, view, slot, options),
    listNetworkFeatures: (
      resourceGroupName: string,
      name: string,
      view: string,
      options?: WebAppsListNetworkFeaturesOptionalParams,
    ) => listNetworkFeatures(context, resourceGroupName, name, view, options),
    deleteSwiftVirtualNetworkSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams,
    ) => deleteSwiftVirtualNetworkSlot(context, resourceGroupName, name, slot, options),
    updateSwiftVirtualNetworkConnectionWithCheckSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      connectionEnvelope: SwiftVirtualNetwork,
      options?: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
    ) =>
      updateSwiftVirtualNetworkConnectionWithCheckSlot(
        context,
        resourceGroupName,
        name,
        slot,
        connectionEnvelope,
        options,
      ),
    createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      connectionEnvelope: SwiftVirtualNetwork,
      options?: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams,
    ) =>
      createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot(
        context,
        resourceGroupName,
        name,
        slot,
        connectionEnvelope,
        options,
      ),
    getSwiftVirtualNetworkConnectionSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams,
    ) => getSwiftVirtualNetworkConnectionSlot(context, resourceGroupName, name, slot, options),
    deleteSwiftVirtualNetwork: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsDeleteSwiftVirtualNetworkOptionalParams,
    ) => deleteSwiftVirtualNetwork(context, resourceGroupName, name, options),
    updateSwiftVirtualNetworkConnectionWithCheck: (
      resourceGroupName: string,
      name: string,
      connectionEnvelope: SwiftVirtualNetwork,
      options?: WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
    ) =>
      updateSwiftVirtualNetworkConnectionWithCheck(
        context,
        resourceGroupName,
        name,
        connectionEnvelope,
        options,
      ),
    createOrUpdateSwiftVirtualNetworkConnectionWithCheck: (
      resourceGroupName: string,
      name: string,
      connectionEnvelope: SwiftVirtualNetwork,
      options?: WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams,
    ) =>
      createOrUpdateSwiftVirtualNetworkConnectionWithCheck(
        context,
        resourceGroupName,
        name,
        connectionEnvelope,
        options,
      ),
    getSwiftVirtualNetworkConnection: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetSwiftVirtualNetworkConnectionOptionalParams,
    ) => getSwiftVirtualNetworkConnection(context, resourceGroupName, name, options),
    getMigrateMySqlStatusSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetMigrateMySqlStatusSlotOptionalParams,
    ) => getMigrateMySqlStatusSlot(context, resourceGroupName, name, slot, options),
    getMigrateMySqlStatus: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetMigrateMySqlStatusOptionalParams,
    ) => getMigrateMySqlStatus(context, resourceGroupName, name, options),
    listProcessModulesSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      options?: WebAppsListProcessModulesSlotOptionalParams,
    ) => listProcessModulesSlot(context, resourceGroupName, name, processId, slot, options),
    getProcessModuleSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      baseAddress: string,
      slot: string,
      options?: WebAppsGetProcessModuleSlotOptionalParams,
    ) =>
      getProcessModuleSlot(context, resourceGroupName, name, processId, baseAddress, slot, options),
    listInstanceProcessModulesSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessModulesSlotOptionalParams,
    ) =>
      listInstanceProcessModulesSlot(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    getInstanceProcessModuleSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      baseAddress: string,
      slot: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessModuleSlotOptionalParams,
    ) =>
      getInstanceProcessModuleSlot(
        context,
        resourceGroupName,
        name,
        processId,
        baseAddress,
        slot,
        instanceId,
        options,
      ),
    listProcessModules: (
      resourceGroupName: string,
      name: string,
      processId: string,
      options?: WebAppsListProcessModulesOptionalParams,
    ) => listProcessModules(context, resourceGroupName, name, processId, options),
    getProcessModule: (
      resourceGroupName: string,
      name: string,
      processId: string,
      baseAddress: string,
      options?: WebAppsGetProcessModuleOptionalParams,
    ) => getProcessModule(context, resourceGroupName, name, processId, baseAddress, options),
    listInstanceProcessModules: (
      resourceGroupName: string,
      name: string,
      processId: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessModulesOptionalParams,
    ) =>
      listInstanceProcessModules(context, resourceGroupName, name, processId, instanceId, options),
    getInstanceProcessModule: (
      resourceGroupName: string,
      name: string,
      processId: string,
      baseAddress: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessModuleOptionalParams,
    ) =>
      getInstanceProcessModule(
        context,
        resourceGroupName,
        name,
        processId,
        baseAddress,
        instanceId,
        options,
      ),
    listProcessThreadsSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      options?: WebAppsListProcessThreadsSlotOptionalParams,
    ) => listProcessThreadsSlot(context, resourceGroupName, name, processId, slot, options),
    getProcessDumpSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      options?: WebAppsGetProcessDumpSlotOptionalParams,
    ) => getProcessDumpSlot(context, resourceGroupName, name, processId, slot, options),
    listProcessesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListProcessesSlotOptionalParams,
    ) => listProcessesSlot(context, resourceGroupName, name, slot, options),
    deleteProcessSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      options?: WebAppsDeleteProcessSlotOptionalParams,
    ) => deleteProcessSlot(context, resourceGroupName, name, processId, slot, options),
    getProcessSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      options?: WebAppsGetProcessSlotOptionalParams,
    ) => getProcessSlot(context, resourceGroupName, name, processId, slot, options),
    listInstanceProcessThreadsSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessThreadsSlotOptionalParams,
    ) =>
      listInstanceProcessThreadsSlot(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    getInstanceProcessDumpSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessDumpSlotOptionalParams,
    ) =>
      getInstanceProcessDumpSlot(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    listInstanceProcessesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessesSlotOptionalParams,
    ) => listInstanceProcessesSlot(context, resourceGroupName, name, slot, instanceId, options),
    deleteInstanceProcessSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      instanceId: string,
      options?: WebAppsDeleteInstanceProcessSlotOptionalParams,
    ) =>
      deleteInstanceProcessSlot(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    getInstanceProcessSlot: (
      resourceGroupName: string,
      name: string,
      processId: string,
      slot: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessSlotOptionalParams,
    ) =>
      getInstanceProcessSlot(
        context,
        resourceGroupName,
        name,
        processId,
        slot,
        instanceId,
        options,
      ),
    listProcessThreads: (
      resourceGroupName: string,
      name: string,
      processId: string,
      options?: WebAppsListProcessThreadsOptionalParams,
    ) => listProcessThreads(context, resourceGroupName, name, processId, options),
    getProcessDump: (
      resourceGroupName: string,
      name: string,
      processId: string,
      options?: WebAppsGetProcessDumpOptionalParams,
    ) => getProcessDump(context, resourceGroupName, name, processId, options),
    listProcesses: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListProcessesOptionalParams,
    ) => listProcesses(context, resourceGroupName, name, options),
    deleteProcess: (
      resourceGroupName: string,
      name: string,
      processId: string,
      options?: WebAppsDeleteProcessOptionalParams,
    ) => deleteProcess(context, resourceGroupName, name, processId, options),
    getProcess: (
      resourceGroupName: string,
      name: string,
      processId: string,
      options?: WebAppsGetProcessOptionalParams,
    ) => getProcess(context, resourceGroupName, name, processId, options),
    listInstanceProcessThreads: (
      resourceGroupName: string,
      name: string,
      processId: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessThreadsOptionalParams,
    ) =>
      listInstanceProcessThreads(context, resourceGroupName, name, processId, instanceId, options),
    getInstanceProcessDump: (
      resourceGroupName: string,
      name: string,
      processId: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessDumpOptionalParams,
    ) => getInstanceProcessDump(context, resourceGroupName, name, processId, instanceId, options),
    listInstanceProcesses: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      options?: WebAppsListInstanceProcessesOptionalParams,
    ) => listInstanceProcesses(context, resourceGroupName, name, instanceId, options),
    deleteInstanceProcess: (
      resourceGroupName: string,
      name: string,
      processId: string,
      instanceId: string,
      options?: WebAppsDeleteInstanceProcessOptionalParams,
    ) => deleteInstanceProcess(context, resourceGroupName, name, processId, instanceId, options),
    getInstanceProcess: (
      resourceGroupName: string,
      name: string,
      processId: string,
      instanceId: string,
      options?: WebAppsGetInstanceProcessOptionalParams,
    ) => getInstanceProcess(context, resourceGroupName, name, processId, instanceId, options),
    listInstanceIdentifiersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListInstanceIdentifiersSlotOptionalParams,
    ) => listInstanceIdentifiersSlot(context, resourceGroupName, name, slot, options),
    getInstanceInfoSlot: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      slot: string,
      options?: WebAppsGetInstanceInfoSlotOptionalParams,
    ) => getInstanceInfoSlot(context, resourceGroupName, name, instanceId, slot, options),
    listInstanceIdentifiers: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListInstanceIdentifiersOptionalParams,
    ) => listInstanceIdentifiers(context, resourceGroupName, name, options),
    getInstanceInfo: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      options?: WebAppsGetInstanceInfoOptionalParams,
    ) => getInstanceInfo(context, resourceGroupName, name, instanceId, options),
    deleteRelayServiceConnectionSlot: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      slot: string,
      options?: WebAppsDeleteRelayServiceConnectionSlotOptionalParams,
    ) =>
      deleteRelayServiceConnectionSlot(context, resourceGroupName, name, entityName, slot, options),
    updateRelayServiceConnectionSlot: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      slot: string,
      connectionEnvelope: RelayServiceConnectionEntity,
      options?: WebAppsUpdateRelayServiceConnectionSlotOptionalParams,
    ) =>
      updateRelayServiceConnectionSlot(
        context,
        resourceGroupName,
        name,
        entityName,
        slot,
        connectionEnvelope,
        options,
      ),
    createOrUpdateRelayServiceConnectionSlot: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      slot: string,
      connectionEnvelope: RelayServiceConnectionEntity,
      options?: WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams,
    ) =>
      createOrUpdateRelayServiceConnectionSlot(
        context,
        resourceGroupName,
        name,
        entityName,
        slot,
        connectionEnvelope,
        options,
      ),
    getRelayServiceConnectionSlot: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      slot: string,
      options?: WebAppsGetRelayServiceConnectionSlotOptionalParams,
    ) => getRelayServiceConnectionSlot(context, resourceGroupName, name, entityName, slot, options),
    deleteRelayServiceConnection: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      options?: WebAppsDeleteRelayServiceConnectionOptionalParams,
    ) => deleteRelayServiceConnection(context, resourceGroupName, name, entityName, options),
    updateRelayServiceConnection: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      connectionEnvelope: RelayServiceConnectionEntity,
      options?: WebAppsUpdateRelayServiceConnectionOptionalParams,
    ) =>
      updateRelayServiceConnection(
        context,
        resourceGroupName,
        name,
        entityName,
        connectionEnvelope,
        options,
      ),
    createOrUpdateRelayServiceConnection: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      connectionEnvelope: RelayServiceConnectionEntity,
      options?: WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams,
    ) =>
      createOrUpdateRelayServiceConnection(
        context,
        resourceGroupName,
        name,
        entityName,
        connectionEnvelope,
        options,
      ),
    getRelayServiceConnection: (
      resourceGroupName: string,
      name: string,
      entityName: string,
      options?: WebAppsGetRelayServiceConnectionOptionalParams,
    ) => getRelayServiceConnection(context, resourceGroupName, name, entityName, options),
    listHostNameBindingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListHostNameBindingsSlotOptionalParams,
    ) => listHostNameBindingsSlot(context, resourceGroupName, name, slot, options),
    deleteHostNameBindingSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      hostName: string,
      options?: WebAppsDeleteHostNameBindingSlotOptionalParams,
    ) => deleteHostNameBindingSlot(context, resourceGroupName, name, slot, hostName, options),
    createOrUpdateHostNameBindingSlot: (
      resourceGroupName: string,
      name: string,
      hostName: string,
      slot: string,
      hostNameBinding: HostNameBinding,
      options?: WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams,
    ) =>
      createOrUpdateHostNameBindingSlot(
        context,
        resourceGroupName,
        name,
        hostName,
        slot,
        hostNameBinding,
        options,
      ),
    getHostNameBindingSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      hostName: string,
      options?: WebAppsGetHostNameBindingSlotOptionalParams,
    ) => getHostNameBindingSlot(context, resourceGroupName, name, slot, hostName, options),
    listHostNameBindings: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListHostNameBindingsOptionalParams,
    ) => listHostNameBindings(context, resourceGroupName, name, options),
    deleteHostNameBinding: (
      resourceGroupName: string,
      name: string,
      hostName: string,
      options?: WebAppsDeleteHostNameBindingOptionalParams,
    ) => deleteHostNameBinding(context, resourceGroupName, name, hostName, options),
    createOrUpdateHostNameBinding: (
      resourceGroupName: string,
      name: string,
      hostName: string,
      hostNameBinding: HostNameBinding,
      options?: WebAppsCreateOrUpdateHostNameBindingOptionalParams,
    ) =>
      createOrUpdateHostNameBinding(
        context,
        resourceGroupName,
        name,
        hostName,
        hostNameBinding,
        options,
      ),
    getHostNameBinding: (
      resourceGroupName: string,
      name: string,
      hostName: string,
      options?: WebAppsGetHostNameBindingOptionalParams,
    ) => getHostNameBinding(context, resourceGroupName, name, hostName, options),
    listFunctionSecretsSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      options?: WebAppsListFunctionSecretsSlotOptionalParams,
    ) => listFunctionSecretsSlot(context, resourceGroupName, name, functionName, slot, options),
    listFunctionKeysSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      options?: WebAppsListFunctionKeysSlotOptionalParams,
    ) => listFunctionKeysSlot(context, resourceGroupName, name, functionName, slot, options),
    deleteFunctionSecretSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      keyName: string,
      slot: string,
      options?: WebAppsDeleteFunctionSecretSlotOptionalParams,
    ) =>
      deleteFunctionSecretSlot(
        context,
        resourceGroupName,
        name,
        functionName,
        keyName,
        slot,
        options,
      ),
    createOrUpdateFunctionSecretSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      keyName: string,
      slot: string,
      key: KeyInfo,
      options?: WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams,
    ) =>
      createOrUpdateFunctionSecretSlot(
        context,
        resourceGroupName,
        name,
        functionName,
        keyName,
        slot,
        key,
        options,
      ),
    listInstanceFunctionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListInstanceFunctionsSlotOptionalParams,
    ) => listInstanceFunctionsSlot(context, resourceGroupName, name, slot, options),
    deleteInstanceFunctionSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      options?: WebAppsDeleteInstanceFunctionSlotOptionalParams,
    ) => deleteInstanceFunctionSlot(context, resourceGroupName, name, functionName, slot, options),
    createInstanceFunctionSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
    ) =>
      createInstanceFunctionSlot(
        context,
        resourceGroupName,
        name,
        functionName,
        slot,
        functionEnvelope,
        options,
      ),
    beginCreateInstanceFunctionSlot: async (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
    ) => {
      const poller = createInstanceFunctionSlot(
        context,
        resourceGroupName,
        name,
        functionName,
        slot,
        functionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateInstanceFunctionSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateInstanceFunctionSlotOptionalParams,
    ) => {
      return await createInstanceFunctionSlot(
        context,
        resourceGroupName,
        name,
        functionName,
        slot,
        functionEnvelope,
        options,
      );
    },
    getInstanceFunctionSlot: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      slot: string,
      options?: WebAppsGetInstanceFunctionSlotOptionalParams,
    ) => getInstanceFunctionSlot(context, resourceGroupName, name, functionName, slot, options),
    listFunctionSecrets: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      options?: WebAppsListFunctionSecretsOptionalParams,
    ) => listFunctionSecrets(context, resourceGroupName, name, functionName, options),
    listFunctionKeys: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      options?: WebAppsListFunctionKeysOptionalParams,
    ) => listFunctionKeys(context, resourceGroupName, name, functionName, options),
    deleteFunctionSecret: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      keyName: string,
      options?: WebAppsDeleteFunctionSecretOptionalParams,
    ) => deleteFunctionSecret(context, resourceGroupName, name, functionName, keyName, options),
    createOrUpdateFunctionSecret: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      keyName: string,
      key: KeyInfo,
      options?: WebAppsCreateOrUpdateFunctionSecretOptionalParams,
    ) =>
      createOrUpdateFunctionSecret(
        context,
        resourceGroupName,
        name,
        functionName,
        keyName,
        key,
        options,
      ),
    listFunctions: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListFunctionsOptionalParams,
    ) => listFunctions(context, resourceGroupName, name, options),
    deleteFunction: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      options?: WebAppsDeleteFunctionOptionalParams,
    ) => deleteFunction(context, resourceGroupName, name, functionName, options),
    createFunction: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateFunctionOptionalParams,
    ) => createFunction(context, resourceGroupName, name, functionName, functionEnvelope, options),
    beginCreateFunction: async (
      resourceGroupName: string,
      name: string,
      functionName: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateFunctionOptionalParams,
    ) => {
      const poller = createFunction(
        context,
        resourceGroupName,
        name,
        functionName,
        functionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateFunctionAndWait: async (
      resourceGroupName: string,
      name: string,
      functionName: string,
      functionEnvelope: FunctionEnvelope,
      options?: WebAppsCreateFunctionOptionalParams,
    ) => {
      return await createFunction(
        context,
        resourceGroupName,
        name,
        functionName,
        functionEnvelope,
        options,
      );
    },
    getFunction: (
      resourceGroupName: string,
      name: string,
      functionName: string,
      options?: WebAppsGetFunctionOptionalParams,
    ) => getFunction(context, resourceGroupName, name, functionName, options),
    getInstanceMSDeployLogSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      options?: WebAppsGetInstanceMSDeployLogSlotOptionalParams,
    ) => getInstanceMSDeployLogSlot(context, resourceGroupName, name, slot, instanceId, options),
    createInstanceMSDeployOperationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
    ) =>
      createInstanceMSDeployOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        instanceId,
        msDeploy,
        options,
      ),
    beginCreateInstanceMSDeployOperationSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
    ) => {
      const poller = createInstanceMSDeployOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        instanceId,
        msDeploy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateInstanceMSDeployOperationSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationSlotOptionalParams,
    ) => {
      return await createInstanceMSDeployOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        instanceId,
        msDeploy,
        options,
      );
    },
    getInstanceMsDeployStatusSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      instanceId: string,
      options?: WebAppsGetInstanceMsDeployStatusSlotOptionalParams,
    ) => getInstanceMsDeployStatusSlot(context, resourceGroupName, name, slot, instanceId, options),
    getMSDeployLogSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetMSDeployLogSlotOptionalParams,
    ) => getMSDeployLogSlot(context, resourceGroupName, name, slot, options),
    createMSDeployOperationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
    ) => createMSDeployOperationSlot(context, resourceGroupName, name, slot, msDeploy, options),
    beginCreateMSDeployOperationSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
    ) => {
      const poller = createMSDeployOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        msDeploy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateMSDeployOperationSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationSlotOptionalParams,
    ) => {
      return await createMSDeployOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        msDeploy,
        options,
      );
    },
    getMSDeployStatusSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetMSDeployStatusSlotOptionalParams,
    ) => getMSDeployStatusSlot(context, resourceGroupName, name, slot, options),
    getInstanceMSDeployLog: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      options?: WebAppsGetInstanceMSDeployLogOptionalParams,
    ) => getInstanceMSDeployLog(context, resourceGroupName, name, instanceId, options),
    createInstanceMSDeployOperation: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
    ) =>
      createInstanceMSDeployOperation(
        context,
        resourceGroupName,
        name,
        instanceId,
        msDeploy,
        options,
      ),
    beginCreateInstanceMSDeployOperation: async (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
    ) => {
      const poller = createInstanceMSDeployOperation(
        context,
        resourceGroupName,
        name,
        instanceId,
        msDeploy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateInstanceMSDeployOperationAndWait: async (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateInstanceMSDeployOperationOptionalParams,
    ) => {
      return await createInstanceMSDeployOperation(
        context,
        resourceGroupName,
        name,
        instanceId,
        msDeploy,
        options,
      );
    },
    getInstanceMsDeployStatus: (
      resourceGroupName: string,
      name: string,
      instanceId: string,
      options?: WebAppsGetInstanceMsDeployStatusOptionalParams,
    ) => getInstanceMsDeployStatus(context, resourceGroupName, name, instanceId, options),
    getMSDeployLog: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetMSDeployLogOptionalParams,
    ) => getMSDeployLog(context, resourceGroupName, name, options),
    createMSDeployOperation: (
      resourceGroupName: string,
      name: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationOptionalParams,
    ) => createMSDeployOperation(context, resourceGroupName, name, msDeploy, options),
    beginCreateMSDeployOperation: async (
      resourceGroupName: string,
      name: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationOptionalParams,
    ) => {
      const poller = createMSDeployOperation(context, resourceGroupName, name, msDeploy, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateMSDeployOperationAndWait: async (
      resourceGroupName: string,
      name: string,
      msDeploy: MSDeploy,
      options?: WebAppsCreateMSDeployOperationOptionalParams,
    ) => {
      return await createMSDeployOperation(context, resourceGroupName, name, msDeploy, options);
    },
    getMSDeployStatus: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetMSDeployStatusOptionalParams,
    ) => getMSDeployStatus(context, resourceGroupName, name, options),
    listDomainOwnershipIdentifiersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListDomainOwnershipIdentifiersSlotOptionalParams,
    ) => listDomainOwnershipIdentifiersSlot(context, resourceGroupName, name, slot, options),
    deleteDomainOwnershipIdentifierSlot: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      slot: string,
      options?: WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams,
    ) =>
      deleteDomainOwnershipIdentifierSlot(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        slot,
        options,
      ),
    updateDomainOwnershipIdentifierSlot: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      slot: string,
      domainOwnershipIdentifier: Identifier,
      options?: WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams,
    ) =>
      updateDomainOwnershipIdentifierSlot(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        slot,
        domainOwnershipIdentifier,
        options,
      ),
    createOrUpdateDomainOwnershipIdentifierSlot: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      slot: string,
      domainOwnershipIdentifier: Identifier,
      options?: WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams,
    ) =>
      createOrUpdateDomainOwnershipIdentifierSlot(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        slot,
        domainOwnershipIdentifier,
        options,
      ),
    getDomainOwnershipIdentifierSlot: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      slot: string,
      options?: WebAppsGetDomainOwnershipIdentifierSlotOptionalParams,
    ) =>
      getDomainOwnershipIdentifierSlot(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        slot,
        options,
      ),
    listDomainOwnershipIdentifiers: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListDomainOwnershipIdentifiersOptionalParams,
    ) => listDomainOwnershipIdentifiers(context, resourceGroupName, name, options),
    deleteDomainOwnershipIdentifier: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      options?: WebAppsDeleteDomainOwnershipIdentifierOptionalParams,
    ) =>
      deleteDomainOwnershipIdentifier(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options,
      ),
    updateDomainOwnershipIdentifier: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      domainOwnershipIdentifier: Identifier,
      options?: WebAppsUpdateDomainOwnershipIdentifierOptionalParams,
    ) =>
      updateDomainOwnershipIdentifier(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        domainOwnershipIdentifier,
        options,
      ),
    createOrUpdateDomainOwnershipIdentifier: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      domainOwnershipIdentifier: Identifier,
      options?: WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams,
    ) =>
      createOrUpdateDomainOwnershipIdentifier(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        domainOwnershipIdentifier,
        options,
      ),
    getDomainOwnershipIdentifier: (
      resourceGroupName: string,
      name: string,
      domainOwnershipIdentifierName: string,
      options?: WebAppsGetDomainOwnershipIdentifierOptionalParams,
    ) =>
      getDomainOwnershipIdentifier(
        context,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options,
      ),
    listDeploymentLogSlot: (
      resourceGroupName: string,
      name: string,
      id: string,
      slot: string,
      options?: WebAppsListDeploymentLogSlotOptionalParams,
    ) => listDeploymentLogSlot(context, resourceGroupName, name, id, slot, options),
    listDeploymentsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListDeploymentsSlotOptionalParams,
    ) => listDeploymentsSlot(context, resourceGroupName, name, slot, options),
    deleteDeploymentSlot: (
      resourceGroupName: string,
      name: string,
      id: string,
      slot: string,
      options?: WebAppsDeleteDeploymentSlotOptionalParams,
    ) => deleteDeploymentSlot(context, resourceGroupName, name, id, slot, options),
    createDeploymentSlot: (
      resourceGroupName: string,
      name: string,
      id: string,
      slot: string,
      deployment: Deployment,
      options?: WebAppsCreateDeploymentSlotOptionalParams,
    ) => createDeploymentSlot(context, resourceGroupName, name, id, slot, deployment, options),
    getDeploymentSlot: (
      resourceGroupName: string,
      name: string,
      id: string,
      slot: string,
      options?: WebAppsGetDeploymentSlotOptionalParams,
    ) => getDeploymentSlot(context, resourceGroupName, name, id, slot, options),
    listDeploymentLog: (
      resourceGroupName: string,
      name: string,
      id: string,
      options?: WebAppsListDeploymentLogOptionalParams,
    ) => listDeploymentLog(context, resourceGroupName, name, id, options),
    listDeployments: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListDeploymentsOptionalParams,
    ) => listDeployments(context, resourceGroupName, name, options),
    deleteDeployment: (
      resourceGroupName: string,
      name: string,
      id: string,
      options?: WebAppsDeleteDeploymentOptionalParams,
    ) => deleteDeployment(context, resourceGroupName, name, id, options),
    createDeployment: (
      resourceGroupName: string,
      name: string,
      id: string,
      deployment: Deployment,
      options?: WebAppsCreateDeploymentOptionalParams,
    ) => createDeployment(context, resourceGroupName, name, id, deployment, options),
    getDeployment: (
      resourceGroupName: string,
      name: string,
      id: string,
      options?: WebAppsGetDeploymentOptionalParams,
    ) => getDeployment(context, resourceGroupName, name, id, options),
    listSlotSiteDeploymentStatusesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams,
    ) => listSlotSiteDeploymentStatusesSlot(context, resourceGroupName, name, slot, options),
    getSlotSiteDeploymentStatusSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      deploymentStatusId: string,
      options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
    ) =>
      getSlotSiteDeploymentStatusSlot(
        context,
        resourceGroupName,
        name,
        slot,
        deploymentStatusId,
        options,
      ),
    beginGetSlotSiteDeploymentStatusSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      deploymentStatusId: string,
      options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
    ) => {
      const poller = getSlotSiteDeploymentStatusSlot(
        context,
        resourceGroupName,
        name,
        slot,
        deploymentStatusId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetSlotSiteDeploymentStatusSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      deploymentStatusId: string,
      options?: WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams,
    ) => {
      return await getSlotSiteDeploymentStatusSlot(
        context,
        resourceGroupName,
        name,
        slot,
        deploymentStatusId,
        options,
      );
    },
    listProductionSiteDeploymentStatuses: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListProductionSiteDeploymentStatusesOptionalParams,
    ) => listProductionSiteDeploymentStatuses(context, resourceGroupName, name, options),
    getProductionSiteDeploymentStatus: (
      resourceGroupName: string,
      name: string,
      deploymentStatusId: string,
      options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
    ) =>
      getProductionSiteDeploymentStatus(
        context,
        resourceGroupName,
        name,
        deploymentStatusId,
        options,
      ),
    beginGetProductionSiteDeploymentStatus: async (
      resourceGroupName: string,
      name: string,
      deploymentStatusId: string,
      options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
    ) => {
      const poller = getProductionSiteDeploymentStatus(
        context,
        resourceGroupName,
        name,
        deploymentStatusId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetProductionSiteDeploymentStatusAndWait: async (
      resourceGroupName: string,
      name: string,
      deploymentStatusId: string,
      options?: WebAppsGetProductionSiteDeploymentStatusOptionalParams,
    ) => {
      return await getProductionSiteDeploymentStatus(
        context,
        resourceGroupName,
        name,
        deploymentStatusId,
        options,
      );
    },
    stopContinuousWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsStopContinuousWebJobSlotOptionalParams,
    ) => stopContinuousWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    startContinuousWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsStartContinuousWebJobSlotOptionalParams,
    ) => startContinuousWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    listContinuousWebJobsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListContinuousWebJobsSlotOptionalParams,
    ) => listContinuousWebJobsSlot(context, resourceGroupName, name, slot, options),
    deleteContinuousWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsDeleteContinuousWebJobSlotOptionalParams,
    ) => deleteContinuousWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    getContinuousWebJobSlot: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      slot: string,
      options?: WebAppsGetContinuousWebJobSlotOptionalParams,
    ) => getContinuousWebJobSlot(context, resourceGroupName, name, webJobName, slot, options),
    stopContinuousWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsStopContinuousWebJobOptionalParams,
    ) => stopContinuousWebJob(context, resourceGroupName, name, webJobName, options),
    startContinuousWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsStartContinuousWebJobOptionalParams,
    ) => startContinuousWebJob(context, resourceGroupName, name, webJobName, options),
    listContinuousWebJobs: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListContinuousWebJobsOptionalParams,
    ) => listContinuousWebJobs(context, resourceGroupName, name, options),
    deleteContinuousWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsDeleteContinuousWebJobOptionalParams,
    ) => deleteContinuousWebJob(context, resourceGroupName, name, webJobName, options),
    getContinuousWebJob: (
      resourceGroupName: string,
      name: string,
      webJobName: string,
      options?: WebAppsGetContinuousWebJobOptionalParams,
    ) => getContinuousWebJob(context, resourceGroupName, name, webJobName, options),
    recoverSiteConfigurationSnapshotSlot: (
      resourceGroupName: string,
      name: string,
      snapshotId: string,
      slot: string,
      options?: WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams,
    ) =>
      recoverSiteConfigurationSnapshotSlot(
        context,
        resourceGroupName,
        name,
        snapshotId,
        slot,
        options,
      ),
    listConfigurationsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListConfigurationsSlotOptionalParams,
    ) => listConfigurationsSlot(context, resourceGroupName, name, slot, options),
    getConfigurationSnapshotSlot: (
      resourceGroupName: string,
      name: string,
      snapshotId: string,
      slot: string,
      options?: WebAppsGetConfigurationSnapshotSlotOptionalParams,
    ) => getConfigurationSnapshotSlot(context, resourceGroupName, name, snapshotId, slot, options),
    listConfigurationSnapshotInfoSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListConfigurationSnapshotInfoSlotOptionalParams,
    ) => listConfigurationSnapshotInfoSlot(context, resourceGroupName, name, slot, options),
    updateConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteConfig: SiteConfigResource,
      options?: WebAppsUpdateConfigurationSlotOptionalParams,
    ) => updateConfigurationSlot(context, resourceGroupName, name, slot, siteConfig, options),
    createOrUpdateConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteConfig: SiteConfigResource,
      options?: WebAppsCreateOrUpdateConfigurationSlotOptionalParams,
    ) =>
      createOrUpdateConfigurationSlot(context, resourceGroupName, name, slot, siteConfig, options),
    getConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetConfigurationSlotOptionalParams,
    ) => getConfigurationSlot(context, resourceGroupName, name, slot, options),
    recoverSiteConfigurationSnapshot: (
      resourceGroupName: string,
      name: string,
      snapshotId: string,
      options?: WebAppsRecoverSiteConfigurationSnapshotOptionalParams,
    ) => recoverSiteConfigurationSnapshot(context, resourceGroupName, name, snapshotId, options),
    listConfigurations: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListConfigurationsOptionalParams,
    ) => listConfigurations(context, resourceGroupName, name, options),
    getConfigurationSnapshot: (
      resourceGroupName: string,
      name: string,
      snapshotId: string,
      options?: WebAppsGetConfigurationSnapshotOptionalParams,
    ) => getConfigurationSnapshot(context, resourceGroupName, name, snapshotId, options),
    listConfigurationSnapshotInfo: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListConfigurationSnapshotInfoOptionalParams,
    ) => listConfigurationSnapshotInfo(context, resourceGroupName, name, options),
    updateConfiguration: (
      resourceGroupName: string,
      name: string,
      siteConfig: SiteConfigResource,
      options?: WebAppsUpdateConfigurationOptionalParams,
    ) => updateConfiguration(context, resourceGroupName, name, siteConfig, options),
    createOrUpdateConfiguration: (
      resourceGroupName: string,
      name: string,
      siteConfig: SiteConfigResource,
      options?: WebAppsCreateOrUpdateConfigurationOptionalParams,
    ) => createOrUpdateConfiguration(context, resourceGroupName, name, siteConfig, options),
    getConfiguration: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetConfigurationOptionalParams,
    ) => getConfiguration(context, resourceGroupName, name, options),
    updateSlotConfigurationNames: (
      resourceGroupName: string,
      name: string,
      slotConfigNames: SlotConfigNamesResource,
      options?: WebAppsUpdateSlotConfigurationNamesOptionalParams,
    ) => updateSlotConfigurationNames(context, resourceGroupName, name, slotConfigNames, options),
    listSlotConfigurationNames: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSlotConfigurationNamesOptionalParams,
    ) => listSlotConfigurationNames(context, resourceGroupName, name, options),
    updateDiagnosticLogsConfigSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteLogsConfig: SiteLogsConfig,
      options?: WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams,
    ) =>
      updateDiagnosticLogsConfigSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteLogsConfig,
        options,
      ),
    getDiagnosticLogsConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams,
    ) => getDiagnosticLogsConfigurationSlot(context, resourceGroupName, name, slot, options),
    updateDiagnosticLogsConfig: (
      resourceGroupName: string,
      name: string,
      siteLogsConfig: SiteLogsConfig,
      options?: WebAppsUpdateDiagnosticLogsConfigOptionalParams,
    ) => updateDiagnosticLogsConfig(context, resourceGroupName, name, siteLogsConfig, options),
    getDiagnosticLogsConfiguration: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetDiagnosticLogsConfigurationOptionalParams,
    ) => getDiagnosticLogsConfiguration(context, resourceGroupName, name, options),
    listSiteConnectionStringKeyVaultReferencesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams,
    ) =>
      listSiteConnectionStringKeyVaultReferencesSlot(
        context,
        resourceGroupName,
        name,
        slot,
        options,
      ),
    getSiteConnectionStringKeyVaultReferenceSlot: (
      resourceGroupName: string,
      name: string,
      connectionStringKey: string,
      slot: string,
      options?: WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams,
    ) =>
      getSiteConnectionStringKeyVaultReferenceSlot(
        context,
        resourceGroupName,
        name,
        connectionStringKey,
        slot,
        options,
      ),
    listAppSettingsKeyVaultReferencesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams,
    ) => listAppSettingsKeyVaultReferencesSlot(context, resourceGroupName, name, slot, options),
    getAppSettingKeyVaultReferenceSlot: (
      resourceGroupName: string,
      name: string,
      appSettingKey: string,
      slot: string,
      options?: WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams,
    ) =>
      getAppSettingKeyVaultReferenceSlot(
        context,
        resourceGroupName,
        name,
        appSettingKey,
        slot,
        options,
      ),
    listSiteConnectionStringKeyVaultReferences: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams,
    ) => listSiteConnectionStringKeyVaultReferences(context, resourceGroupName, name, options),
    getSiteConnectionStringKeyVaultReference: (
      resourceGroupName: string,
      name: string,
      connectionStringKey: string,
      options?: WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams,
    ) =>
      getSiteConnectionStringKeyVaultReference(
        context,
        resourceGroupName,
        name,
        connectionStringKey,
        options,
      ),
    listAppSettingsKeyVaultReferences: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListAppSettingsKeyVaultReferencesOptionalParams,
    ) => listAppSettingsKeyVaultReferences(context, resourceGroupName, name, options),
    getAppSettingKeyVaultReference: (
      resourceGroupName: string,
      name: string,
      appSettingKey: string,
      options?: WebAppsGetAppSettingKeyVaultReferenceOptionalParams,
    ) => getAppSettingKeyVaultReference(context, resourceGroupName, name, appSettingKey, options),
    getAuthSettingsV2Slot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetAuthSettingsV2SlotOptionalParams,
    ) => getAuthSettingsV2Slot(context, resourceGroupName, name, slot, options),
    updateAuthSettingsV2Slot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteAuthSettingsV2: SiteAuthSettingsV2,
      options?: WebAppsUpdateAuthSettingsV2SlotOptionalParams,
    ) =>
      updateAuthSettingsV2Slot(context, resourceGroupName, name, slot, siteAuthSettingsV2, options),
    getAuthSettingsV2WithoutSecretsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams,
    ) => getAuthSettingsV2WithoutSecretsSlot(context, resourceGroupName, name, slot, options),
    getAuthSettingsV2: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetAuthSettingsV2OptionalParams,
    ) => getAuthSettingsV2(context, resourceGroupName, name, options),
    updateAuthSettingsV2: (
      resourceGroupName: string,
      name: string,
      siteAuthSettingsV2: SiteAuthSettingsV2,
      options?: WebAppsUpdateAuthSettingsV2OptionalParams,
    ) => updateAuthSettingsV2(context, resourceGroupName, name, siteAuthSettingsV2, options),
    getAuthSettingsV2WithoutSecrets: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams,
    ) => getAuthSettingsV2WithoutSecrets(context, resourceGroupName, name, options),
    updateScmAllowedSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
      options?: WebAppsUpdateScmAllowedSlotOptionalParams,
    ) =>
      updateScmAllowedSlot(
        context,
        resourceGroupName,
        name,
        slot,
        csmPublishingAccessPoliciesEntity,
        options,
      ),
    getScmAllowedSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetScmAllowedSlotOptionalParams,
    ) => getScmAllowedSlot(context, resourceGroupName, name, slot, options),
    listBasicPublishingCredentialsPoliciesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams,
    ) =>
      listBasicPublishingCredentialsPoliciesSlot(context, resourceGroupName, name, slot, options),
    updateFtpAllowedSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
      options?: WebAppsUpdateFtpAllowedSlotOptionalParams,
    ) =>
      updateFtpAllowedSlot(
        context,
        resourceGroupName,
        name,
        slot,
        csmPublishingAccessPoliciesEntity,
        options,
      ),
    getFtpAllowedSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetFtpAllowedSlotOptionalParams,
    ) => getFtpAllowedSlot(context, resourceGroupName, name, slot, options),
    updateScmAllowed: (
      resourceGroupName: string,
      name: string,
      csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
      options?: WebAppsUpdateScmAllowedOptionalParams,
    ) =>
      updateScmAllowed(
        context,
        resourceGroupName,
        name,
        csmPublishingAccessPoliciesEntity,
        options,
      ),
    getScmAllowed: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetScmAllowedOptionalParams,
    ) => getScmAllowed(context, resourceGroupName, name, options),
    listBasicPublishingCredentialsPolicies: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListBasicPublishingCredentialsPoliciesOptionalParams,
    ) => listBasicPublishingCredentialsPolicies(context, resourceGroupName, name, options),
    updateFtpAllowed: (
      resourceGroupName: string,
      name: string,
      csmPublishingAccessPoliciesEntity: CsmPublishingCredentialsPoliciesEntity,
      options?: WebAppsUpdateFtpAllowedOptionalParams,
    ) =>
      updateFtpAllowed(
        context,
        resourceGroupName,
        name,
        csmPublishingAccessPoliciesEntity,
        options,
      ),
    getFtpAllowed: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetFtpAllowedOptionalParams,
    ) => getFtpAllowed(context, resourceGroupName, name, options),
    restoreSlot: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreSlotOptionalParams,
    ) => restoreSlot(context, resourceGroupName, name, backupId, slot, request, options),
    beginRestoreSlot: async (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreSlotOptionalParams,
    ) => {
      const poller = restoreSlot(
        context,
        resourceGroupName,
        name,
        backupId,
        slot,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreSlotOptionalParams,
    ) => {
      return await restoreSlot(context, resourceGroupName, name, backupId, slot, request, options);
    },
    listBackupStatusSecretsSlot: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      request: BackupRequest,
      options?: WebAppsListBackupStatusSecretsSlotOptionalParams,
    ) =>
      listBackupStatusSecretsSlot(
        context,
        resourceGroupName,
        name,
        backupId,
        slot,
        request,
        options,
      ),
    listBackupsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListBackupsSlotOptionalParams,
    ) => listBackupsSlot(context, resourceGroupName, name, slot, options),
    deleteBackupSlot: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      options?: WebAppsDeleteBackupSlotOptionalParams,
    ) => deleteBackupSlot(context, resourceGroupName, name, backupId, slot, options),
    getBackupStatusSlot: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      slot: string,
      options?: WebAppsGetBackupStatusSlotOptionalParams,
    ) => getBackupStatusSlot(context, resourceGroupName, name, backupId, slot, options),
    restore: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      request: RestoreRequest,
      options?: WebAppsRestoreOptionalParams,
    ) => restore(context, resourceGroupName, name, backupId, request, options),
    beginRestore: async (
      resourceGroupName: string,
      name: string,
      backupId: string,
      request: RestoreRequest,
      options?: WebAppsRestoreOptionalParams,
    ) => {
      const poller = restore(context, resourceGroupName, name, backupId, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreAndWait: async (
      resourceGroupName: string,
      name: string,
      backupId: string,
      request: RestoreRequest,
      options?: WebAppsRestoreOptionalParams,
    ) => {
      return await restore(context, resourceGroupName, name, backupId, request, options);
    },
    listBackupStatusSecrets: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      request: BackupRequest,
      options?: WebAppsListBackupStatusSecretsOptionalParams,
    ) => listBackupStatusSecrets(context, resourceGroupName, name, backupId, request, options),
    listBackups: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListBackupsOptionalParams,
    ) => listBackups(context, resourceGroupName, name, options),
    deleteBackup: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      options?: WebAppsDeleteBackupOptionalParams,
    ) => deleteBackup(context, resourceGroupName, name, backupId, options),
    getBackupStatus: (
      resourceGroupName: string,
      name: string,
      backupId: string,
      options?: WebAppsGetBackupStatusOptionalParams,
    ) => getBackupStatus(context, resourceGroupName, name, backupId, options),
    listWorkflowsConnections: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListWorkflowsConnectionsOptionalParams,
    ) => listWorkflowsConnections(context, resourceGroupName, name, options),
    deployWorkflowArtifacts: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsDeployWorkflowArtifactsOptionalParams,
    ) => deployWorkflowArtifacts(context, resourceGroupName, name, options),
    listUsages: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, name, options),
    syncFunctionTriggers: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsSyncFunctionTriggersOptionalParams,
    ) => syncFunctionTriggers(context, resourceGroupName, name, options),
    syncRepository: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsSyncRepositoryOptionalParams,
    ) => syncRepository(context, resourceGroupName, name, options),
    stopNetworkTrace: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStopNetworkTraceOptionalParams,
    ) => stopNetworkTrace(context, resourceGroupName, name, options),
    stop: (resourceGroupName: string, name: string, options?: WebAppsStopOptionalParams) =>
      stop(context, resourceGroupName, name, options),
    startNetworkTrace: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartNetworkTraceOptionalParams,
    ) => startNetworkTrace(context, resourceGroupName, name, options),
    beginStartNetworkTrace: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartNetworkTraceOptionalParams,
    ) => {
      const poller = startNetworkTrace(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartNetworkTraceAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartNetworkTraceOptionalParams,
    ) => {
      return await startNetworkTrace(context, resourceGroupName, name, options);
    },
    start: (resourceGroupName: string, name: string, options?: WebAppsStartOptionalParams) =>
      start(context, resourceGroupName, name, options),
    listSnapshotsFromDRSecondary: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSnapshotsFromDRSecondaryOptionalParams,
    ) => listSnapshotsFromDRSecondary(context, resourceGroupName, name, options),
    listSnapshots: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSnapshotsOptionalParams,
    ) => listSnapshots(context, resourceGroupName, name, options),
    swapSlotWithProduction: (
      resourceGroupName: string,
      name: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotWithProductionOptionalParams,
    ) => swapSlotWithProduction(context, resourceGroupName, name, slotSwapEntity, options),
    beginSwapSlotWithProduction: async (
      resourceGroupName: string,
      name: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotWithProductionOptionalParams,
    ) => {
      const poller = swapSlotWithProduction(
        context,
        resourceGroupName,
        name,
        slotSwapEntity,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwapSlotWithProductionAndWait: async (
      resourceGroupName: string,
      name: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotWithProductionOptionalParams,
    ) => {
      return await swapSlotWithProduction(
        context,
        resourceGroupName,
        name,
        slotSwapEntity,
        options,
      );
    },
    listSlotDifferencesFromProduction: (
      resourceGroupName: string,
      name: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsListSlotDifferencesFromProductionOptionalParams,
    ) =>
      listSlotDifferencesFromProduction(context, resourceGroupName, name, slotSwapEntity, options),
    restoreSnapshot: (
      resourceGroupName: string,
      name: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotOptionalParams,
    ) => restoreSnapshot(context, resourceGroupName, name, restoreRequest, options),
    beginRestoreSnapshot: async (
      resourceGroupName: string,
      name: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotOptionalParams,
    ) => {
      const poller = restoreSnapshot(context, resourceGroupName, name, restoreRequest, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreSnapshotAndWait: async (
      resourceGroupName: string,
      name: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotOptionalParams,
    ) => {
      return await restoreSnapshot(context, resourceGroupName, name, restoreRequest, options);
    },
    restoreFromDeletedApp: (
      resourceGroupName: string,
      name: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppOptionalParams,
    ) => restoreFromDeletedApp(context, resourceGroupName, name, restoreRequest, options),
    beginRestoreFromDeletedApp: async (
      resourceGroupName: string,
      name: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppOptionalParams,
    ) => {
      const poller = restoreFromDeletedApp(
        context,
        resourceGroupName,
        name,
        restoreRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreFromDeletedAppAndWait: async (
      resourceGroupName: string,
      name: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppOptionalParams,
    ) => {
      return await restoreFromDeletedApp(context, resourceGroupName, name, restoreRequest, options);
    },
    restoreFromBackupBlob: (
      resourceGroupName: string,
      name: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobOptionalParams,
    ) => restoreFromBackupBlob(context, resourceGroupName, name, request, options),
    beginRestoreFromBackupBlob: async (
      resourceGroupName: string,
      name: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobOptionalParams,
    ) => {
      const poller = restoreFromBackupBlob(context, resourceGroupName, name, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreFromBackupBlobAndWait: async (
      resourceGroupName: string,
      name: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobOptionalParams,
    ) => {
      return await restoreFromBackupBlob(context, resourceGroupName, name, request, options);
    },
    restart: (resourceGroupName: string, name: string, options?: WebAppsRestartOptionalParams) =>
      restart(context, resourceGroupName, name, options),
    resetProductionSlotConfig: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsResetProductionSlotConfigOptionalParams,
    ) => resetProductionSlotConfig(context, resourceGroupName, name, options),
    listPublishingProfileXmlWithSecrets: (
      resourceGroupName: string,
      name: string,
      publishingProfileOptions: CsmPublishingProfileOptions,
      options?: WebAppsListPublishingProfileXmlWithSecretsOptionalParams,
    ) =>
      listPublishingProfileXmlWithSecrets(
        context,
        resourceGroupName,
        name,
        publishingProfileOptions,
        options,
      ),
    getPrivateLinkResources: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetPrivateLinkResourcesOptionalParams,
    ) => getPrivateLinkResources(context, resourceGroupName, name, options),
    listPremierAddOns: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPremierAddOnsOptionalParams,
    ) => listPremierAddOns(context, resourceGroupName, name, options),
    getSitePhpErrorLogFlag: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetSitePhpErrorLogFlagOptionalParams,
    ) => getSitePhpErrorLogFlag(context, resourceGroupName, name, options),
    listPerfMonCounters: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPerfMonCountersOptionalParams,
    ) => listPerfMonCounters(context, resourceGroupName, name, options),
    generateNewSitePublishingPassword: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGenerateNewSitePublishingPasswordOptionalParams,
    ) => generateNewSitePublishingPassword(context, resourceGroupName, name, options),
    getNetworkTracesV2: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      options?: WebAppsGetNetworkTracesV2OptionalParams,
    ) => getNetworkTracesV2(context, resourceGroupName, name, operationId, options),
    getNetworkTraceOperationV2: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      options?: WebAppsGetNetworkTraceOperationV2OptionalParams,
    ) => getNetworkTraceOperationV2(context, resourceGroupName, name, operationId, options),
    getNetworkTraces: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      options?: WebAppsGetNetworkTracesOptionalParams,
    ) => getNetworkTraces(context, resourceGroupName, name, operationId, options),
    stopWebSiteNetworkTrace: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStopWebSiteNetworkTraceOptionalParams,
    ) => stopWebSiteNetworkTrace(context, resourceGroupName, name, options),
    startWebSiteNetworkTraceOperation: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
    ) => startWebSiteNetworkTraceOperation(context, resourceGroupName, name, options),
    beginStartWebSiteNetworkTraceOperation: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
    ) => {
      const poller = startWebSiteNetworkTraceOperation(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartWebSiteNetworkTraceOperationAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationOptionalParams,
    ) => {
      return await startWebSiteNetworkTraceOperation(context, resourceGroupName, name, options);
    },
    startWebSiteNetworkTrace: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsStartWebSiteNetworkTraceOptionalParams,
    ) => startWebSiteNetworkTrace(context, resourceGroupName, name, options),
    getNetworkTraceOperation: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      options?: WebAppsGetNetworkTraceOperationOptionalParams,
    ) => getNetworkTraceOperation(context, resourceGroupName, name, operationId, options),
    migrateMySql: (
      resourceGroupName: string,
      name: string,
      migrationRequestEnvelope: MigrateMySqlRequest,
      options?: WebAppsMigrateMySqlOptionalParams,
    ) => migrateMySql(context, resourceGroupName, name, migrationRequestEnvelope, options),
    beginMigrateMySql: async (
      resourceGroupName: string,
      name: string,
      migrationRequestEnvelope: MigrateMySqlRequest,
      options?: WebAppsMigrateMySqlOptionalParams,
    ) => {
      const poller = migrateMySql(
        context,
        resourceGroupName,
        name,
        migrationRequestEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateMySqlAndWait: async (
      resourceGroupName: string,
      name: string,
      migrationRequestEnvelope: MigrateMySqlRequest,
      options?: WebAppsMigrateMySqlOptionalParams,
    ) => {
      return await migrateMySql(
        context,
        resourceGroupName,
        name,
        migrationRequestEnvelope,
        options,
      );
    },
    migrateStorage: (
      subscriptionName: string,
      resourceGroupName: string,
      name: string,
      migrationOptions: StorageMigrationOptions,
      options?: WebAppsMigrateStorageOptionalParams,
    ) =>
      migrateStorage(context, subscriptionName, resourceGroupName, name, migrationOptions, options),
    beginMigrateStorage: async (
      subscriptionName: string,
      resourceGroupName: string,
      name: string,
      migrationOptions: StorageMigrationOptions,
      options?: WebAppsMigrateStorageOptionalParams,
    ) => {
      const poller = migrateStorage(
        context,
        subscriptionName,
        resourceGroupName,
        name,
        migrationOptions,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateStorageAndWait: async (
      subscriptionName: string,
      resourceGroupName: string,
      name: string,
      migrationOptions: StorageMigrationOptions,
      options?: WebAppsMigrateStorageOptionalParams,
    ) => {
      return await migrateStorage(
        context,
        subscriptionName,
        resourceGroupName,
        name,
        migrationOptions,
        options,
      );
    },
    updateMachineKey: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsUpdateMachineKeyOptionalParams,
    ) => updateMachineKey(context, resourceGroupName, name, options),
    listSyncFunctionTriggers: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSyncFunctionTriggersOptionalParams,
    ) => listSyncFunctionTriggers(context, resourceGroupName, name, options),
    listSiteBackups: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSiteBackupsOptionalParams,
    ) => listSiteBackups(context, resourceGroupName, name, options),
    isCloneable: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsIsCloneableOptionalParams,
    ) => isCloneable(context, resourceGroupName, name, options),
    listRelayServiceConnections: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListRelayServiceConnectionsOptionalParams,
    ) => listRelayServiceConnections(context, resourceGroupName, name, options),
    listHybridConnections: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListHybridConnectionsOptionalParams,
    ) => listHybridConnections(context, resourceGroupName, name, options),
    deleteHostSecret: (
      resourceGroupName: string,
      name: string,
      keyType: string,
      keyName: string,
      options?: WebAppsDeleteHostSecretOptionalParams,
    ) => deleteHostSecret(context, resourceGroupName, name, keyType, keyName, options),
    createOrUpdateHostSecret: (
      resourceGroupName: string,
      name: string,
      keyType: string,
      keyName: string,
      key: KeyInfo,
      options?: WebAppsCreateOrUpdateHostSecretOptionalParams,
    ) => createOrUpdateHostSecret(context, resourceGroupName, name, keyType, keyName, key, options),
    syncFunctions: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsSyncFunctionsOptionalParams,
    ) => syncFunctions(context, resourceGroupName, name, options),
    listSyncStatus: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSyncStatusOptionalParams,
    ) => listSyncStatus(context, resourceGroupName, name, options),
    listHostKeys: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListHostKeysOptionalParams,
    ) => listHostKeys(context, resourceGroupName, name, options),
    getFunctionsAdminToken: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetFunctionsAdminTokenOptionalParams,
    ) => getFunctionsAdminToken(context, resourceGroupName, name, options),
    createOneDeployOperation: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsCreateOneDeployOperationOptionalParams,
    ) => createOneDeployOperation(context, resourceGroupName, name, options),
    getOneDeployStatus: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetOneDeployStatusOptionalParams,
    ) => getOneDeployStatus(context, resourceGroupName, name, options),
    discoverBackup: (
      resourceGroupName: string,
      name: string,
      request: RestoreRequest,
      options?: WebAppsDiscoverBackupOptionalParams,
    ) => discoverBackup(context, resourceGroupName, name, request, options),
    getContainerLogsZip: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetContainerLogsZipOptionalParams,
    ) => getContainerLogsZip(context, resourceGroupName, name, options),
    getWebSiteContainerLogs: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetWebSiteContainerLogsOptionalParams,
    ) => getWebSiteContainerLogs(context, resourceGroupName, name, options),
    listSitePushSettings: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSitePushSettingsOptionalParams,
    ) => listSitePushSettings(context, resourceGroupName, name, options),
    updateSitePushSettings: (
      resourceGroupName: string,
      name: string,
      pushSettings: PushSettings,
      options?: WebAppsUpdateSitePushSettingsOptionalParams,
    ) => updateSitePushSettings(context, resourceGroupName, name, pushSettings, options),
    listPublishingCredentials: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPublishingCredentialsOptionalParams,
    ) => listPublishingCredentials(context, resourceGroupName, name, options),
    beginListPublishingCredentials: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPublishingCredentialsOptionalParams,
    ) => {
      const poller = listPublishingCredentials(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListPublishingCredentialsAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPublishingCredentialsOptionalParams,
    ) => {
      return await listPublishingCredentials(context, resourceGroupName, name, options);
    },
    listMetadata: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListMetadataOptionalParams,
    ) => listMetadata(context, resourceGroupName, name, options),
    updateMetadata: (
      resourceGroupName: string,
      name: string,
      metadata: StringDictionary,
      options?: WebAppsUpdateMetadataOptionalParams,
    ) => updateMetadata(context, resourceGroupName, name, metadata, options),
    listConnectionStrings: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListConnectionStringsOptionalParams,
    ) => listConnectionStrings(context, resourceGroupName, name, options),
    updateConnectionStrings: (
      resourceGroupName: string,
      name: string,
      connectionStrings: ConnectionStringDictionary,
      options?: WebAppsUpdateConnectionStringsOptionalParams,
    ) => updateConnectionStrings(context, resourceGroupName, name, connectionStrings, options),
    getBackupConfiguration: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetBackupConfigurationOptionalParams,
    ) => getBackupConfiguration(context, resourceGroupName, name, options),
    deleteBackupConfiguration: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsDeleteBackupConfigurationOptionalParams,
    ) => deleteBackupConfiguration(context, resourceGroupName, name, options),
    updateBackupConfiguration: (
      resourceGroupName: string,
      name: string,
      request: BackupRequest,
      options?: WebAppsUpdateBackupConfigurationOptionalParams,
    ) => updateBackupConfiguration(context, resourceGroupName, name, request, options),
    listAzureStorageAccounts: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListAzureStorageAccountsOptionalParams,
    ) => listAzureStorageAccounts(context, resourceGroupName, name, options),
    updateAzureStorageAccounts: (
      resourceGroupName: string,
      name: string,
      azureStorageAccounts: AzureStoragePropertyDictionaryResource,
      options?: WebAppsUpdateAzureStorageAccountsOptionalParams,
    ) =>
      updateAzureStorageAccounts(context, resourceGroupName, name, azureStorageAccounts, options),
    getAuthSettings: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsGetAuthSettingsOptionalParams,
    ) => getAuthSettings(context, resourceGroupName, name, options),
    updateAuthSettings: (
      resourceGroupName: string,
      name: string,
      siteAuthSettings: SiteAuthSettings,
      options?: WebAppsUpdateAuthSettingsOptionalParams,
    ) => updateAuthSettings(context, resourceGroupName, name, siteAuthSettings, options),
    listApplicationSettings: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListApplicationSettingsOptionalParams,
    ) => listApplicationSettings(context, resourceGroupName, name, options),
    updateApplicationSettings: (
      resourceGroupName: string,
      name: string,
      appSettings: StringDictionary,
      options?: WebAppsUpdateApplicationSettingsOptionalParams,
    ) => updateApplicationSettings(context, resourceGroupName, name, appSettings, options),
    backup: (
      resourceGroupName: string,
      name: string,
      request: BackupRequest,
      options?: WebAppsBackupOptionalParams,
    ) => backup(context, resourceGroupName, name, request, options),
    applySlotConfigToProduction: (
      resourceGroupName: string,
      name: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsApplySlotConfigToProductionOptionalParams,
    ) => applySlotConfigToProduction(context, resourceGroupName, name, slotSwapEntity, options),
    analyzeCustomHostname: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsAnalyzeCustomHostnameOptionalParams,
    ) => analyzeCustomHostname(context, resourceGroupName, name, options),
    list: (options?: WebAppsListOptionalParams) => list(context, options),
    delete: (resourceGroupName: string, name: string, options?: WebAppsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      siteEnvelope: SitePatchResource,
      options?: WebAppsUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, siteEnvelope, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, siteEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      name: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, name, siteEnvelope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      name: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, name, siteEnvelope, options);
    },
    get: (resourceGroupName: string, name: string, options?: WebAppsGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
    updateVnetConnectionGateway: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      connectionEnvelope: VnetGateway,
      options?: WebAppsUpdateVnetConnectionGatewayOptionalParams,
    ) =>
      updateVnetConnectionGateway(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        connectionEnvelope,
        options,
      ),
    createOrUpdateVnetConnectionGateway: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      connectionEnvelope: VnetGateway,
      options?: WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams,
    ) =>
      createOrUpdateVnetConnectionGateway(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        connectionEnvelope,
        options,
      ),
    getVnetConnectionGateway: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      options?: WebAppsGetVnetConnectionGatewayOptionalParams,
    ) => getVnetConnectionGateway(context, resourceGroupName, name, vnetName, gatewayName, options),
    updateVnetConnectionGatewaySlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      slot: string,
      connectionEnvelope: VnetGateway,
      options?: WebAppsUpdateVnetConnectionGatewaySlotOptionalParams,
    ) =>
      updateVnetConnectionGatewaySlot(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        slot,
        connectionEnvelope,
        options,
      ),
    createOrUpdateVnetConnectionGatewaySlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      slot: string,
      connectionEnvelope: VnetGateway,
      options?: WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams,
    ) =>
      createOrUpdateVnetConnectionGatewaySlot(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        slot,
        connectionEnvelope,
        options,
      ),
    getVnetConnectionGatewaySlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      gatewayName: string,
      slot: string,
      options?: WebAppsGetVnetConnectionGatewaySlotOptionalParams,
    ) =>
      getVnetConnectionGatewaySlot(
        context,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        slot,
        options,
      ),
    listVnetConnections: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListVnetConnectionsOptionalParams,
    ) => listVnetConnections(context, resourceGroupName, name, options),
    deleteVnetConnection: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      options?: WebAppsDeleteVnetConnectionOptionalParams,
    ) => deleteVnetConnection(context, resourceGroupName, name, vnetName, options),
    updateVnetConnection: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      connectionEnvelope: VnetInfoResource,
      options?: WebAppsUpdateVnetConnectionOptionalParams,
    ) =>
      updateVnetConnection(context, resourceGroupName, name, vnetName, connectionEnvelope, options),
    createOrUpdateVnetConnection: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      connectionEnvelope: VnetInfoResource,
      options?: WebAppsCreateOrUpdateVnetConnectionOptionalParams,
    ) =>
      createOrUpdateVnetConnection(
        context,
        resourceGroupName,
        name,
        vnetName,
        connectionEnvelope,
        options,
      ),
    getVnetConnection: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      options?: WebAppsGetVnetConnectionOptionalParams,
    ) => getVnetConnection(context, resourceGroupName, name, vnetName, options),
    listVnetConnectionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListVnetConnectionsSlotOptionalParams,
    ) => listVnetConnectionsSlot(context, resourceGroupName, name, slot, options),
    deleteVnetConnectionSlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      slot: string,
      options?: WebAppsDeleteVnetConnectionSlotOptionalParams,
    ) => deleteVnetConnectionSlot(context, resourceGroupName, name, vnetName, slot, options),
    updateVnetConnectionSlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      slot: string,
      connectionEnvelope: VnetInfoResource,
      options?: WebAppsUpdateVnetConnectionSlotOptionalParams,
    ) =>
      updateVnetConnectionSlot(
        context,
        resourceGroupName,
        name,
        vnetName,
        slot,
        connectionEnvelope,
        options,
      ),
    createOrUpdateVnetConnectionSlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      slot: string,
      connectionEnvelope: VnetInfoResource,
      options?: WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams,
    ) =>
      createOrUpdateVnetConnectionSlot(
        context,
        resourceGroupName,
        name,
        vnetName,
        slot,
        connectionEnvelope,
        options,
      ),
    getVnetConnectionSlot: (
      resourceGroupName: string,
      name: string,
      vnetName: string,
      slot: string,
      options?: WebAppsGetVnetConnectionSlotOptionalParams,
    ) => getVnetConnectionSlot(context, resourceGroupName, name, vnetName, slot, options),
    deleteHybridConnectionSlot: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      slot: string,
      options?: WebAppsDeleteHybridConnectionSlotOptionalParams,
    ) =>
      deleteHybridConnectionSlot(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        slot,
        options,
      ),
    updateHybridConnectionSlot: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      slot: string,
      connectionEnvelope: HybridConnection,
      options?: WebAppsUpdateHybridConnectionSlotOptionalParams,
    ) =>
      updateHybridConnectionSlot(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        slot,
        connectionEnvelope,
        options,
      ),
    createOrUpdateHybridConnectionSlot: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      slot: string,
      connectionEnvelope: HybridConnection,
      options?: WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams,
    ) =>
      createOrUpdateHybridConnectionSlot(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        slot,
        connectionEnvelope,
        options,
      ),
    getHybridConnectionSlot: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      slot: string,
      options?: WebAppsGetHybridConnectionSlotOptionalParams,
    ) =>
      getHybridConnectionSlot(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        slot,
        options,
      ),
    deleteHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: WebAppsDeleteHybridConnectionOptionalParams,
    ) =>
      deleteHybridConnection(context, resourceGroupName, name, namespaceName, relayName, options),
    updateHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      connectionEnvelope: HybridConnection,
      options?: WebAppsUpdateHybridConnectionOptionalParams,
    ) =>
      updateHybridConnection(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        connectionEnvelope,
        options,
      ),
    createOrUpdateHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      connectionEnvelope: HybridConnection,
      options?: WebAppsCreateOrUpdateHybridConnectionOptionalParams,
    ) =>
      createOrUpdateHybridConnection(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        connectionEnvelope,
        options,
      ),
    getHybridConnection: (
      resourceGroupName: string,
      name: string,
      namespaceName: string,
      relayName: string,
      options?: WebAppsGetHybridConnectionOptionalParams,
    ) => getHybridConnection(context, resourceGroupName, name, namespaceName, relayName, options),
    listPrivateEndpointConnectionListSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPrivateEndpointConnectionListSlotOptionalParams,
    ) => listPrivateEndpointConnectionListSlot(context, resourceGroupName, name, slot, options),
    deletePrivateEndpointConnectionSlot: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
    ) =>
      deletePrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        options,
      ),
    beginDeletePrivateEndpointConnectionSlot: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
    ) => {
      const poller = deletePrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeletePrivateEndpointConnectionSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      options?: WebAppsDeletePrivateEndpointConnectionSlotOptionalParams,
    ) => {
      return await deletePrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        options,
      );
    },
    approveOrRejectPrivateEndpointConnectionSlot: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
    ) =>
      approveOrRejectPrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        privateEndpointWrapper,
        options,
      ),
    beginApproveOrRejectPrivateEndpointConnectionSlot: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
    ) => {
      const poller = approveOrRejectPrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        privateEndpointWrapper,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveOrRejectPrivateEndpointConnectionSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams,
    ) => {
      return await approveOrRejectPrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        privateEndpointWrapper,
        options,
      );
    },
    getPrivateEndpointConnectionSlot: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      slot: string,
      options?: WebAppsGetPrivateEndpointConnectionSlotOptionalParams,
    ) =>
      getPrivateEndpointConnectionSlot(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        slot,
        options,
      ),
    listPrivateEndpointConnectionList: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListPrivateEndpointConnectionListOptionalParams,
    ) => listPrivateEndpointConnectionList(context, resourceGroupName, name, options),
    deletePrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
    ) =>
      deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      ),
    beginDeletePrivateEndpointConnection: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeletePrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: WebAppsDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      return await deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
    },
    approveOrRejectPrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) =>
      approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      ),
    beginApproveOrRejectPrivateEndpointConnection: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveOrRejectPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) => {
      return await approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      );
    },
    getPrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: WebAppsGetPrivateEndpointConnectionOptionalParams,
    ) =>
      getPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      ),
    listWorkflowsConnectionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListWorkflowsConnectionsSlotOptionalParams,
    ) => listWorkflowsConnectionsSlot(context, resourceGroupName, name, slot, options),
    deployWorkflowArtifactsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsDeployWorkflowArtifactsSlotOptionalParams,
    ) => deployWorkflowArtifactsSlot(context, resourceGroupName, name, slot, options),
    listUsagesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListUsagesSlotOptionalParams,
    ) => listUsagesSlot(context, resourceGroupName, name, slot, options),
    syncFunctionTriggersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsSyncFunctionTriggersSlotOptionalParams,
    ) => syncFunctionTriggersSlot(context, resourceGroupName, name, slot, options),
    syncRepositorySlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsSyncRepositorySlotOptionalParams,
    ) => syncRepositorySlot(context, resourceGroupName, name, slot, options),
    stopNetworkTraceSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStopNetworkTraceSlotOptionalParams,
    ) => stopNetworkTraceSlot(context, resourceGroupName, name, slot, options),
    stopSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStopSlotOptionalParams,
    ) => stopSlot(context, resourceGroupName, name, slot, options),
    startNetworkTraceSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartNetworkTraceSlotOptionalParams,
    ) => startNetworkTraceSlot(context, resourceGroupName, name, slot, options),
    beginStartNetworkTraceSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartNetworkTraceSlotOptionalParams,
    ) => {
      const poller = startNetworkTraceSlot(context, resourceGroupName, name, slot, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartNetworkTraceSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartNetworkTraceSlotOptionalParams,
    ) => {
      return await startNetworkTraceSlot(context, resourceGroupName, name, slot, options);
    },
    startSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartSlotOptionalParams,
    ) => startSlot(context, resourceGroupName, name, slot, options),
    listSnapshotsFromDRSecondarySlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSnapshotsFromDRSecondarySlotOptionalParams,
    ) => listSnapshotsFromDRSecondarySlot(context, resourceGroupName, name, slot, options),
    listSnapshotsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSnapshotsSlotOptionalParams,
    ) => listSnapshotsSlot(context, resourceGroupName, name, slot, options),
    swapSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotOptionalParams,
    ) => swapSlot(context, resourceGroupName, name, slot, slotSwapEntity, options),
    beginSwapSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotOptionalParams,
    ) => {
      const poller = swapSlot(context, resourceGroupName, name, slot, slotSwapEntity, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwapSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsSwapSlotOptionalParams,
    ) => {
      return await swapSlot(context, resourceGroupName, name, slot, slotSwapEntity, options);
    },
    listSlotDifferencesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsListSlotDifferencesSlotOptionalParams,
    ) => listSlotDifferencesSlot(context, resourceGroupName, name, slot, slotSwapEntity, options),
    restoreSnapshotSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotSlotOptionalParams,
    ) => restoreSnapshotSlot(context, resourceGroupName, name, slot, restoreRequest, options),
    beginRestoreSnapshotSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotSlotOptionalParams,
    ) => {
      const poller = restoreSnapshotSlot(
        context,
        resourceGroupName,
        name,
        slot,
        restoreRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreSnapshotSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: SnapshotRestoreRequest,
      options?: WebAppsRestoreSnapshotSlotOptionalParams,
    ) => {
      return await restoreSnapshotSlot(
        context,
        resourceGroupName,
        name,
        slot,
        restoreRequest,
        options,
      );
    },
    restoreFromDeletedAppSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
    ) => restoreFromDeletedAppSlot(context, resourceGroupName, name, slot, restoreRequest, options),
    beginRestoreFromDeletedAppSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
    ) => {
      const poller = restoreFromDeletedAppSlot(
        context,
        resourceGroupName,
        name,
        slot,
        restoreRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreFromDeletedAppSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      restoreRequest: DeletedAppRestoreRequest,
      options?: WebAppsRestoreFromDeletedAppSlotOptionalParams,
    ) => {
      return await restoreFromDeletedAppSlot(
        context,
        resourceGroupName,
        name,
        slot,
        restoreRequest,
        options,
      );
    },
    restoreFromBackupBlobSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
    ) => restoreFromBackupBlobSlot(context, resourceGroupName, name, slot, request, options),
    beginRestoreFromBackupBlobSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
    ) => {
      const poller = restoreFromBackupBlobSlot(
        context,
        resourceGroupName,
        name,
        slot,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreFromBackupBlobSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsRestoreFromBackupBlobSlotOptionalParams,
    ) => {
      return await restoreFromBackupBlobSlot(
        context,
        resourceGroupName,
        name,
        slot,
        request,
        options,
      );
    },
    restartSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsRestartSlotOptionalParams,
    ) => restartSlot(context, resourceGroupName, name, slot, options),
    resetSlotConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsResetSlotConfigurationSlotOptionalParams,
    ) => resetSlotConfigurationSlot(context, resourceGroupName, name, slot, options),
    listPublishingProfileXmlWithSecretsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      publishingProfileOptions: CsmPublishingProfileOptions,
      options?: WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams,
    ) =>
      listPublishingProfileXmlWithSecretsSlot(
        context,
        resourceGroupName,
        name,
        slot,
        publishingProfileOptions,
        options,
      ),
    getPrivateLinkResourcesSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetPrivateLinkResourcesSlotOptionalParams,
    ) => getPrivateLinkResourcesSlot(context, resourceGroupName, name, slot, options),
    listPremierAddOnsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPremierAddOnsSlotOptionalParams,
    ) => listPremierAddOnsSlot(context, resourceGroupName, name, slot, options),
    getSitePhpErrorLogFlagSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetSitePhpErrorLogFlagSlotOptionalParams,
    ) => getSitePhpErrorLogFlagSlot(context, resourceGroupName, name, slot, options),
    listPerfMonCountersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPerfMonCountersSlotOptionalParams,
    ) => listPerfMonCountersSlot(context, resourceGroupName, name, slot, options),
    generateNewSitePublishingPasswordSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams,
    ) => generateNewSitePublishingPasswordSlot(context, resourceGroupName, name, slot, options),
    getNetworkTracesSlotV2: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      slot: string,
      options?: WebAppsGetNetworkTracesSlotV2OptionalParams,
    ) => getNetworkTracesSlotV2(context, resourceGroupName, name, operationId, slot, options),
    getNetworkTraceOperationSlotV2: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      slot: string,
      options?: WebAppsGetNetworkTraceOperationSlotV2OptionalParams,
    ) =>
      getNetworkTraceOperationSlotV2(context, resourceGroupName, name, operationId, slot, options),
    getNetworkTracesSlot: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      slot: string,
      options?: WebAppsGetNetworkTracesSlotOptionalParams,
    ) => getNetworkTracesSlot(context, resourceGroupName, name, operationId, slot, options),
    stopWebSiteNetworkTraceSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStopWebSiteNetworkTraceSlotOptionalParams,
    ) => stopWebSiteNetworkTraceSlot(context, resourceGroupName, name, slot, options),
    startWebSiteNetworkTraceOperationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
    ) => startWebSiteNetworkTraceOperationSlot(context, resourceGroupName, name, slot, options),
    beginStartWebSiteNetworkTraceOperationSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
    ) => {
      const poller = startWebSiteNetworkTraceOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartWebSiteNetworkTraceOperationSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams,
    ) => {
      return await startWebSiteNetworkTraceOperationSlot(
        context,
        resourceGroupName,
        name,
        slot,
        options,
      );
    },
    startWebSiteNetworkTraceSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsStartWebSiteNetworkTraceSlotOptionalParams,
    ) => startWebSiteNetworkTraceSlot(context, resourceGroupName, name, slot, options),
    getNetworkTraceOperationSlot: (
      resourceGroupName: string,
      name: string,
      operationId: string,
      slot: string,
      options?: WebAppsGetNetworkTraceOperationSlotOptionalParams,
    ) => getNetworkTraceOperationSlot(context, resourceGroupName, name, operationId, slot, options),
    listSyncFunctionTriggersSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSyncFunctionTriggersSlotOptionalParams,
    ) => listSyncFunctionTriggersSlot(context, resourceGroupName, name, slot, options),
    listSiteBackupsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSiteBackupsSlotOptionalParams,
    ) => listSiteBackupsSlot(context, resourceGroupName, name, slot, options),
    isCloneableSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsIsCloneableSlotOptionalParams,
    ) => isCloneableSlot(context, resourceGroupName, name, slot, options),
    listRelayServiceConnectionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListRelayServiceConnectionsSlotOptionalParams,
    ) => listRelayServiceConnectionsSlot(context, resourceGroupName, name, slot, options),
    listHybridConnectionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListHybridConnectionsSlotOptionalParams,
    ) => listHybridConnectionsSlot(context, resourceGroupName, name, slot, options),
    deleteHostSecretSlot: (
      resourceGroupName: string,
      name: string,
      keyType: string,
      keyName: string,
      slot: string,
      options?: WebAppsDeleteHostSecretSlotOptionalParams,
    ) => deleteHostSecretSlot(context, resourceGroupName, name, keyType, keyName, slot, options),
    createOrUpdateHostSecretSlot: (
      resourceGroupName: string,
      name: string,
      keyType: string,
      keyName: string,
      slot: string,
      key: KeyInfo,
      options?: WebAppsCreateOrUpdateHostSecretSlotOptionalParams,
    ) =>
      createOrUpdateHostSecretSlot(
        context,
        resourceGroupName,
        name,
        keyType,
        keyName,
        slot,
        key,
        options,
      ),
    syncFunctionsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsSyncFunctionsSlotOptionalParams,
    ) => syncFunctionsSlot(context, resourceGroupName, name, slot, options),
    listSyncStatusSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSyncStatusSlotOptionalParams,
    ) => listSyncStatusSlot(context, resourceGroupName, name, slot, options),
    listHostKeysSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListHostKeysSlotOptionalParams,
    ) => listHostKeysSlot(context, resourceGroupName, name, slot, options),
    getFunctionsAdminTokenSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetFunctionsAdminTokenSlotOptionalParams,
    ) => getFunctionsAdminTokenSlot(context, resourceGroupName, name, slot, options),
    discoverBackupSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: RestoreRequest,
      options?: WebAppsDiscoverBackupSlotOptionalParams,
    ) => discoverBackupSlot(context, resourceGroupName, name, slot, request, options),
    getContainerLogsZipSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetContainerLogsZipSlotOptionalParams,
    ) => getContainerLogsZipSlot(context, resourceGroupName, name, slot, options),
    getWebSiteContainerLogsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetWebSiteContainerLogsSlotOptionalParams,
    ) => getWebSiteContainerLogsSlot(context, resourceGroupName, name, slot, options),
    listSitePushSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListSitePushSettingsSlotOptionalParams,
    ) => listSitePushSettingsSlot(context, resourceGroupName, name, slot, options),
    updateSitePushSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      pushSettings: PushSettings,
      options?: WebAppsUpdateSitePushSettingsSlotOptionalParams,
    ) => updateSitePushSettingsSlot(context, resourceGroupName, name, slot, pushSettings, options),
    listPublishingCredentialsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPublishingCredentialsSlotOptionalParams,
    ) => listPublishingCredentialsSlot(context, resourceGroupName, name, slot, options),
    beginListPublishingCredentialsSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPublishingCredentialsSlotOptionalParams,
    ) => {
      const poller = listPublishingCredentialsSlot(context, resourceGroupName, name, slot, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginListPublishingCredentialsSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListPublishingCredentialsSlotOptionalParams,
    ) => {
      return await listPublishingCredentialsSlot(context, resourceGroupName, name, slot, options);
    },
    listMetadataSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListMetadataSlotOptionalParams,
    ) => listMetadataSlot(context, resourceGroupName, name, slot, options),
    updateMetadataSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      metadata: StringDictionary,
      options?: WebAppsUpdateMetadataSlotOptionalParams,
    ) => updateMetadataSlot(context, resourceGroupName, name, slot, metadata, options),
    listConnectionStringsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListConnectionStringsSlotOptionalParams,
    ) => listConnectionStringsSlot(context, resourceGroupName, name, slot, options),
    updateConnectionStringsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      connectionStrings: ConnectionStringDictionary,
      options?: WebAppsUpdateConnectionStringsSlotOptionalParams,
    ) =>
      updateConnectionStringsSlot(
        context,
        resourceGroupName,
        name,
        slot,
        connectionStrings,
        options,
      ),
    getBackupConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetBackupConfigurationSlotOptionalParams,
    ) => getBackupConfigurationSlot(context, resourceGroupName, name, slot, options),
    deleteBackupConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsDeleteBackupConfigurationSlotOptionalParams,
    ) => deleteBackupConfigurationSlot(context, resourceGroupName, name, slot, options),
    updateBackupConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: BackupRequest,
      options?: WebAppsUpdateBackupConfigurationSlotOptionalParams,
    ) => updateBackupConfigurationSlot(context, resourceGroupName, name, slot, request, options),
    listAzureStorageAccountsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListAzureStorageAccountsSlotOptionalParams,
    ) => listAzureStorageAccountsSlot(context, resourceGroupName, name, slot, options),
    updateAzureStorageAccountsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      azureStorageAccounts: AzureStoragePropertyDictionaryResource,
      options?: WebAppsUpdateAzureStorageAccountsSlotOptionalParams,
    ) =>
      updateAzureStorageAccountsSlot(
        context,
        resourceGroupName,
        name,
        slot,
        azureStorageAccounts,
        options,
      ),
    getAuthSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetAuthSettingsSlotOptionalParams,
    ) => getAuthSettingsSlot(context, resourceGroupName, name, slot, options),
    updateAuthSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteAuthSettings: SiteAuthSettings,
      options?: WebAppsUpdateAuthSettingsSlotOptionalParams,
    ) => updateAuthSettingsSlot(context, resourceGroupName, name, slot, siteAuthSettings, options),
    listApplicationSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsListApplicationSettingsSlotOptionalParams,
    ) => listApplicationSettingsSlot(context, resourceGroupName, name, slot, options),
    updateApplicationSettingsSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      appSettings: StringDictionary,
      options?: WebAppsUpdateApplicationSettingsSlotOptionalParams,
    ) =>
      updateApplicationSettingsSlot(context, resourceGroupName, name, slot, appSettings, options),
    backupSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      request: BackupRequest,
      options?: WebAppsBackupSlotOptionalParams,
    ) => backupSlot(context, resourceGroupName, name, slot, request, options),
    applySlotConfigurationSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      slotSwapEntity: CsmSlotEntity,
      options?: WebAppsApplySlotConfigurationSlotOptionalParams,
    ) =>
      applySlotConfigurationSlot(context, resourceGroupName, name, slot, slotSwapEntity, options),
    analyzeCustomHostnameSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsAnalyzeCustomHostnameSlotOptionalParams,
    ) => analyzeCustomHostnameSlot(context, resourceGroupName, name, slot, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WebAppsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    deleteSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsDeleteSlotOptionalParams,
    ) => deleteSlot(context, resourceGroupName, name, slot, options),
    updateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteEnvelope: SitePatchResource,
      options?: WebAppsUpdateSlotOptionalParams,
    ) => updateSlot(context, resourceGroupName, name, slot, siteEnvelope, options),
    createOrUpdateSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateSlotOptionalParams,
    ) => createOrUpdateSlot(context, resourceGroupName, name, slot, siteEnvelope, options),
    beginCreateOrUpdateSlot: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateSlotOptionalParams,
    ) => {
      const poller = createOrUpdateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateSlotAndWait: async (
      resourceGroupName: string,
      name: string,
      slot: string,
      siteEnvelope: Site,
      options?: WebAppsCreateOrUpdateSlotOptionalParams,
    ) => {
      return await createOrUpdateSlot(
        context,
        resourceGroupName,
        name,
        slot,
        siteEnvelope,
        options,
      );
    },
    getSlot: (
      resourceGroupName: string,
      name: string,
      slot: string,
      options?: WebAppsGetSlotOptionalParams,
    ) => getSlot(context, resourceGroupName, name, slot, options),
    listSlots: (
      resourceGroupName: string,
      name: string,
      options?: WebAppsListSlotsOptionalParams,
    ) => listSlots(context, resourceGroupName, name, options),
  };
}

export function _getWebAppsOperations(context: WebSiteManagementContext): WebAppsOperations {
  return {
    ..._getWebApps(context),
  };
}
