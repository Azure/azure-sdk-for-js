// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkflowArtifacts } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebAppsListWorkflowsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetWorkflowOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceWorkflowsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceWorkflowSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListWebJobsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListWebJobsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListTriggeredWebJobHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetTriggeredWebJobHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListTriggeredWebJobHistorySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetTriggeredWebJobHistorySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRunTriggeredWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListTriggeredWebJobsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteTriggeredWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetTriggeredWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRunTriggeredWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListTriggeredWebJobsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteTriggeredWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetTriggeredWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSourceControlOptionalParams extends OperationOptions {
  additionalFlags?: string;
}

/** Optional parameters. */
export interface WebAppsUpdateSourceControlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSourceControlOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetSourceControlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSourceControlSlotOptionalParams extends OperationOptions {
  additionalFlags?: string;
}

/** Optional parameters. */
export interface WebAppsUpdateSourceControlSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSourceControlSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetSourceControlSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteExtensionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSiteExtensionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsInstallSiteExtensionSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetSiteExtensionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteExtensionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSiteExtensionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsInstallSiteExtensionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetSiteExtensionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteContainersSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSiteContainerSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSiteContainerSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSiteContainerSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteContainersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSiteContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSiteContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSiteContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublicCertificatesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePublicCertificateSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdatePublicCertificateSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPublicCertificateSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublicCertificatesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePublicCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdatePublicCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPublicCertificateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsPutPrivateAccessVnetSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPrivateAccessSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsPutPrivateAccessVnetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPrivateAccessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePremierAddOnSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdatePremierAddOnSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsAddPremierAddOnSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPremierAddOnSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePremierAddOnOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdatePremierAddOnOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsAddPremierAddOnOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPremierAddOnOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListNetworkFeaturesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListNetworkFeaturesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSwiftVirtualNetworkSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSwiftVirtualNetworkConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteSwiftVirtualNetworkOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSwiftVirtualNetworkConnectionWithCheckOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSwiftVirtualNetworkConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetMigrateMySqlStatusSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetMigrateMySqlStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessModulesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessModuleSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessModulesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessModuleSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessModulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessModuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessModulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessModuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessThreadsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessDumpSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteProcessSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessThreadsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessDumpSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteInstanceProcessSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessThreadsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessDumpOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListProcessesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteProcessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProcessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessThreadsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessDumpOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceProcessesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteInstanceProcessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceProcessOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceIdentifiersSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceInfoSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceIdentifiersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteRelayServiceConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateRelayServiceConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateRelayServiceConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetRelayServiceConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteRelayServiceConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateRelayServiceConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateRelayServiceConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetRelayServiceConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHostNameBindingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHostNameBindingSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHostNameBindingSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetHostNameBindingSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHostNameBindingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHostNameBindingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHostNameBindingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetHostNameBindingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListFunctionSecretsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListFunctionKeysSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteFunctionSecretSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateFunctionSecretSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListInstanceFunctionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteInstanceFunctionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateInstanceFunctionSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetInstanceFunctionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListFunctionSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListFunctionKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteFunctionSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateFunctionSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListFunctionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteFunctionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateFunctionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetFunctionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceMSDeployLogSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateInstanceMSDeployOperationSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetInstanceMsDeployStatusSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetMSDeployLogSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateMSDeployOperationSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetMSDeployStatusSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetInstanceMSDeployLogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateInstanceMSDeployOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetInstanceMsDeployStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetMSDeployLogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateMSDeployOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetMSDeployStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDomainOwnershipIdentifiersSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteDomainOwnershipIdentifierSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateDomainOwnershipIdentifierSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDomainOwnershipIdentifierSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDomainOwnershipIdentifiersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteDomainOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateDomainOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateDomainOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDomainOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDeploymentLogSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDeploymentsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteDeploymentSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateDeploymentSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDeploymentSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDeploymentLogOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListDeploymentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSlotSiteDeploymentStatusesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSlotSiteDeploymentStatusSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListProductionSiteDeploymentStatusesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetProductionSiteDeploymentStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsStopContinuousWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartContinuousWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListContinuousWebJobsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteContinuousWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetContinuousWebJobSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopContinuousWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartContinuousWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListContinuousWebJobsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteContinuousWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetContinuousWebJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRecoverSiteConfigurationSnapshotSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConfigurationsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetConfigurationSnapshotSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConfigurationSnapshotInfoSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRecoverSiteConfigurationSnapshotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConfigurationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetConfigurationSnapshotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConfigurationSnapshotInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateSlotConfigurationNamesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSlotConfigurationNamesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateDiagnosticLogsConfigSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDiagnosticLogsConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateDiagnosticLogsConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetDiagnosticLogsConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteConnectionStringKeyVaultReferencesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListAppSettingsKeyVaultReferencesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAppSettingKeyVaultReferenceSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteConnectionStringKeyVaultReferencesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSiteConnectionStringKeyVaultReferenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListAppSettingsKeyVaultReferencesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAppSettingKeyVaultReferenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsV2SlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAuthSettingsV2SlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsV2WithoutSecretsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAuthSettingsV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateScmAllowedSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetScmAllowedSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListBasicPublishingCredentialsPoliciesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateFtpAllowedSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetFtpAllowedSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateScmAllowedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetScmAllowedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListBasicPublishingCredentialsPoliciesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateFtpAllowedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetFtpAllowedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRestoreSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListBackupStatusSecretsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListBackupsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteBackupSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetBackupStatusSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListBackupStatusSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListBackupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetBackupStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListWorkflowsConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeployWorkflowArtifactsOptionalParams extends OperationOptions {
  /** Application settings and files of the workflow. */
  workflowArtifacts?: WorkflowArtifacts;
}

/** Optional parameters. */
export interface WebAppsListUsagesOptionalParams extends OperationOptions {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  filter?: string;
}

/** Optional parameters. */
export interface WebAppsSyncFunctionTriggersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSyncRepositoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopNetworkTraceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartNetworkTraceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSnapshotsFromDRSecondaryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSnapshotsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSwapSlotWithProductionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListSlotDifferencesFromProductionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRestoreSnapshotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestoreFromDeletedAppOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestoreFromBackupBlobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestartOptionalParams extends OperationOptions {
  /** Specify true to apply the configuration settings and restarts the app only if necessary. By default, the API always restarts and reprovisions the app. */
  softRestart?: boolean;
  /** Specify true to block until the app is restarted. By default, it is set to false, and the API responds immediately (asynchronous). */
  synchronous?: boolean;
}

/** Optional parameters. */
export interface WebAppsResetProductionSlotConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublishingProfileXmlWithSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPremierAddOnsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSitePhpErrorLogFlagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPerfMonCountersOptionalParams extends OperationOptions {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  filter?: string;
}

/** Optional parameters. */
export interface WebAppsGenerateNewSitePublishingPasswordOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTracesV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTraceOperationV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTracesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopWebSiteNetworkTraceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartWebSiteNetworkTraceOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsStartWebSiteNetworkTraceOptionalParams extends OperationOptions {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsGetNetworkTraceOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsMigrateMySqlOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsMigrateStorageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsUpdateMachineKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSyncFunctionTriggersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteBackupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsIsCloneableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListRelayServiceConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHybridConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHostSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHostSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSyncFunctionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSyncStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHostKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetFunctionsAdminTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOneDeployOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetOneDeployStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDiscoverBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetContainerLogsZipOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetWebSiteContainerLogsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSitePushSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateSitePushSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublishingCredentialsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListMetadataOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateMetadataOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConnectionStringsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateConnectionStringsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetBackupConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteBackupConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateBackupConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListAzureStorageAccountsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAzureStorageAccountsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAuthSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListApplicationSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateApplicationSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsBackupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsApplySlotConfigToProductionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsAnalyzeCustomHostnameOptionalParams extends OperationOptions {
  /** Custom hostname. */
  hostName?: string;
}

/** Optional parameters. */
export interface WebAppsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteOptionalParams extends OperationOptions {
  /** If true, web app metrics are also deleted. */
  deleteMetrics?: boolean;
  /** Specify false if you want to keep empty App Service plan. By default, empty App Service plan is deleted. */
  deleteEmptyServerFarm?: boolean;
}

/** Optional parameters. */
export interface WebAppsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateVnetConnectionGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateVnetConnectionGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetVnetConnectionGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateVnetConnectionGatewaySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateVnetConnectionGatewaySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetVnetConnectionGatewaySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListVnetConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteVnetConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateVnetConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateVnetConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetVnetConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListVnetConnectionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteVnetConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateVnetConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateVnetConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetVnetConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHybridConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateHybridConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHybridConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetHybridConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetHybridConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPrivateEndpointConnectionListSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePrivateEndpointConnectionSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetPrivateEndpointConnectionSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPrivateEndpointConnectionListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeletePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsApproveOrRejectPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetPrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListWorkflowsConnectionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeployWorkflowArtifactsSlotOptionalParams extends OperationOptions {
  /** Application settings and files of the workflow. */
  workflowArtifacts?: WorkflowArtifacts;
}

/** Optional parameters. */
export interface WebAppsListUsagesSlotOptionalParams extends OperationOptions {
  /** Return only information specified in the filter (using OData syntax). For example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  filter?: string;
}

/** Optional parameters. */
export interface WebAppsSyncFunctionTriggersSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSyncRepositorySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopNetworkTraceSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartNetworkTraceSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsStartSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSnapshotsFromDRSecondarySlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSnapshotsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSwapSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListSlotDifferencesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsRestoreSnapshotSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestoreFromDeletedAppSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestoreFromBackupBlobSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsRestartSlotOptionalParams extends OperationOptions {
  /** Specify true to apply the configuration settings and restarts the app only if necessary. By default, the API always restarts and reprovisions the app. */
  softRestart?: boolean;
  /** Specify true to block until the app is restarted. By default, it is set to false, and the API responds immediately (asynchronous). */
  synchronous?: boolean;
}

/** Optional parameters. */
export interface WebAppsResetSlotConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublishingProfileXmlWithSecretsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetPrivateLinkResourcesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPremierAddOnsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetSitePhpErrorLogFlagSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPerfMonCountersSlotOptionalParams extends OperationOptions {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  filter?: string;
}

/** Optional parameters. */
export interface WebAppsGenerateNewSitePublishingPasswordSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTracesSlotV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTraceOperationSlotV2OptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetNetworkTracesSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStopWebSiteNetworkTraceSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsStartWebSiteNetworkTraceOperationSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsStartWebSiteNetworkTraceSlotOptionalParams extends OperationOptions {
  /** The duration to keep capturing in seconds. */
  durationInSeconds?: number;
  /** The maximum frame length in bytes (Optional). */
  maxFrameLength?: number;
  /** The Blob URL to store capture file. */
  sasUrl?: string;
}

/** Optional parameters. */
export interface WebAppsGetNetworkTraceOperationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSyncFunctionTriggersSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSiteBackupsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsIsCloneableSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListRelayServiceConnectionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHybridConnectionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteHostSecretSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateHostSecretSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsSyncFunctionsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSyncStatusSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListHostKeysSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetFunctionsAdminTokenSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDiscoverBackupSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetContainerLogsZipSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetWebSiteContainerLogsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSitePushSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateSitePushSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListPublishingCredentialsSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsListMetadataSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateMetadataSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListConnectionStringsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateConnectionStringsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetBackupConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsDeleteBackupConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateBackupConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListAzureStorageAccountsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAzureStorageAccountsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsGetAuthSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateAuthSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListApplicationSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsUpdateApplicationSettingsSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsBackupSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsApplySlotConfigurationSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsAnalyzeCustomHostnameSlotOptionalParams extends OperationOptions {
  /** Custom hostname. */
  hostName?: string;
}

/** Optional parameters. */
export interface WebAppsListByResourceGroupOptionalParams extends OperationOptions {
  /** Specify <strong>true</strong> to include deployment slots in results. The default is false, which only gives you the production slot of all apps. */
  includeSlots?: boolean;
}

/** Optional parameters. */
export interface WebAppsDeleteSlotOptionalParams extends OperationOptions {
  /** If true, web app metrics are also deleted. */
  deleteMetrics?: boolean;
  /** Specify false if you want to keep empty App Service plan. By default, empty App Service plan is deleted. */
  deleteEmptyServerFarm?: boolean;
}

/** Optional parameters. */
export interface WebAppsUpdateSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsCreateOrUpdateSlotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebAppsGetSlotOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebAppsListSlotsOptionalParams extends OperationOptions {}
