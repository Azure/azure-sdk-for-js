// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext, AutomationClientOptionalParams } from "./api/index.js";
import { createAutomation } from "./api/index.js";
import { convertGraphRunbookContent } from "./api/operations.js";
import type { ConvertGraphRunbookContentOptionalParams } from "./api/options.js";
import type { ActivityOperations } from "./classic/activity/index.js";
import { _getActivityOperations } from "./classic/activity/index.js";
import type { AgentRegistrationInformationOperations } from "./classic/agentRegistrationInformation/index.js";
import { _getAgentRegistrationInformationOperations } from "./classic/agentRegistrationInformation/index.js";
import type { AutomationAccountOperations } from "./classic/automationAccount/index.js";
import { _getAutomationAccountOperations } from "./classic/automationAccount/index.js";
import type { CertificateOperations } from "./classic/certificate/index.js";
import { _getCertificateOperations } from "./classic/certificate/index.js";
import type { ConnectionOperations } from "./classic/connection/index.js";
import { _getConnectionOperations } from "./classic/connection/index.js";
import type { ConnectionTypeOperations } from "./classic/connectionType/index.js";
import { _getConnectionTypeOperations } from "./classic/connectionType/index.js";
import type { CredentialOperations } from "./classic/credential/index.js";
import { _getCredentialOperations } from "./classic/credential/index.js";
import type { DeletedAutomationAccountsOperations } from "./classic/deletedAutomationAccounts/index.js";
import { _getDeletedAutomationAccountsOperations } from "./classic/deletedAutomationAccounts/index.js";
import type { DscConfigurationOperations } from "./classic/dscConfiguration/index.js";
import { _getDscConfigurationOperations } from "./classic/dscConfiguration/index.js";
import type { DscNodeOperations } from "./classic/dscNode/index.js";
import { _getDscNodeOperations } from "./classic/dscNode/index.js";
import type { DscNodeConfigurationOperations } from "./classic/dscNodeConfiguration/index.js";
import { _getDscNodeConfigurationOperations } from "./classic/dscNodeConfiguration/index.js";
import type { FieldsOperations } from "./classic/fields/index.js";
import { _getFieldsOperations } from "./classic/fields/index.js";
import type { HybridRunbookWorkerGroupOperations } from "./classic/hybridRunbookWorkerGroup/index.js";
import { _getHybridRunbookWorkerGroupOperations } from "./classic/hybridRunbookWorkerGroup/index.js";
import type { HybridRunbookWorkersOperations } from "./classic/hybridRunbookWorkers/index.js";
import { _getHybridRunbookWorkersOperations } from "./classic/hybridRunbookWorkers/index.js";
import type { JobOperations } from "./classic/job/index.js";
import { _getJobOperations } from "./classic/job/index.js";
import type { JobScheduleOperations } from "./classic/jobSchedule/index.js";
import { _getJobScheduleOperations } from "./classic/jobSchedule/index.js";
import type { JobStreamOperations } from "./classic/jobStream/index.js";
import { _getJobStreamOperations } from "./classic/jobStream/index.js";
import type { KeysOperations } from "./classic/keys/index.js";
import { _getKeysOperations } from "./classic/keys/index.js";
import type { LinkedWorkspaceOperations } from "./classic/linkedWorkspace/index.js";
import { _getLinkedWorkspaceOperations } from "./classic/linkedWorkspace/index.js";
import type { ModuleOperations } from "./classic/module/index.js";
import { _getModuleOperations } from "./classic/module/index.js";
import type { NodeCountInformationOperations } from "./classic/nodeCountInformation/index.js";
import { _getNodeCountInformationOperations } from "./classic/nodeCountInformation/index.js";
import type { NodeReportsOperations } from "./classic/nodeReports/index.js";
import { _getNodeReportsOperations } from "./classic/nodeReports/index.js";
import type { ObjectDataTypesOperations } from "./classic/objectDataTypes/index.js";
import { _getObjectDataTypesOperations } from "./classic/objectDataTypes/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PackageOperations } from "./classic/package/index.js";
import { _getPackageOperations } from "./classic/package/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { Python2PackageOperations } from "./classic/python2Package/index.js";
import { _getPython2PackageOperations } from "./classic/python2Package/index.js";
import type { Python3PackageOperations } from "./classic/python3Package/index.js";
import { _getPython3PackageOperations } from "./classic/python3Package/index.js";
import type { RunbookOperations } from "./classic/runbook/index.js";
import { _getRunbookOperations } from "./classic/runbook/index.js";
import type { RunbookDraftOperations } from "./classic/runbookDraft/index.js";
import { _getRunbookDraftOperations } from "./classic/runbookDraft/index.js";
import type { RuntimeEnvironmentsOperations } from "./classic/runtimeEnvironments/index.js";
import { _getRuntimeEnvironmentsOperations } from "./classic/runtimeEnvironments/index.js";
import type { ScheduleOperations } from "./classic/schedule/index.js";
import { _getScheduleOperations } from "./classic/schedule/index.js";
import type { SoftwareUpdateConfigurationMachineRunsOperations } from "./classic/softwareUpdateConfigurationMachineRuns/index.js";
import { _getSoftwareUpdateConfigurationMachineRunsOperations } from "./classic/softwareUpdateConfigurationMachineRuns/index.js";
import type { SoftwareUpdateConfigurationRunsOperations } from "./classic/softwareUpdateConfigurationRuns/index.js";
import { _getSoftwareUpdateConfigurationRunsOperations } from "./classic/softwareUpdateConfigurationRuns/index.js";
import type { SoftwareUpdateConfigurationsOperations } from "./classic/softwareUpdateConfigurations/index.js";
import { _getSoftwareUpdateConfigurationsOperations } from "./classic/softwareUpdateConfigurations/index.js";
import type { SourceControlOperations } from "./classic/sourceControl/index.js";
import { _getSourceControlOperations } from "./classic/sourceControl/index.js";
import type { SourceControlSyncJobOperations } from "./classic/sourceControlSyncJob/index.js";
import { _getSourceControlSyncJobOperations } from "./classic/sourceControlSyncJob/index.js";
import type { SourceControlSyncJobStreamsOperations } from "./classic/sourceControlSyncJobStreams/index.js";
import { _getSourceControlSyncJobStreamsOperations } from "./classic/sourceControlSyncJobStreams/index.js";
import type { StatisticsOperations } from "./classic/statistics/index.js";
import { _getStatisticsOperations } from "./classic/statistics/index.js";
import type { TestJobOperations } from "./classic/testJob/index.js";
import { _getTestJobOperations } from "./classic/testJob/index.js";
import type { TestJobStreamsOperations } from "./classic/testJobStreams/index.js";
import { _getTestJobStreamsOperations } from "./classic/testJobStreams/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VariableOperations } from "./classic/variable/index.js";
import { _getVariableOperations } from "./classic/variable/index.js";
import type { WatcherOperations } from "./classic/watcher/index.js";
import { _getWatcherOperations } from "./classic/watcher/index.js";
import type { WebhookOperations } from "./classic/webhook/index.js";
import { _getWebhookOperations } from "./classic/webhook/index.js";
import type { GraphicalRunbookContent } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AutomationClientOptionalParams } from "./api/automationContext.js";

export class AutomationClient {
  private _client: AutomationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AutomationClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AutomationClientOptionalParams,
  );
  /** Automation Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AutomationClientOptionalParams,
    options?: AutomationClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAutomation(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.deletedAutomationAccounts = _getDeletedAutomationAccountsOperations(this._client);
    this.watcher = _getWatcherOperations(this._client);
    this.variable = _getVariableOperations(this._client);
    this.sourceControlSyncJobStreams = _getSourceControlSyncJobStreamsOperations(this._client);
    this.sourceControlSyncJob = _getSourceControlSyncJobOperations(this._client);
    this.sourceControl = _getSourceControlOperations(this._client);
    this.schedule = _getScheduleOperations(this._client);
    this.testJob = _getTestJobOperations(this._client);
    this.testJobStreams = _getTestJobStreamsOperations(this._client);
    this.runbookDraft = _getRunbookDraftOperations(this._client);
    this.runbook = _getRunbookOperations(this._client);
    this.package = _getPackageOperations(this._client);
    this.fields = _getFieldsOperations(this._client);
    this.activity = _getActivityOperations(this._client);
    this.module = _getModuleOperations(this._client);
    this.jobSchedule = _getJobScheduleOperations(this._client);
    this.jobStream = _getJobStreamOperations(this._client);
    this.hybridRunbookWorkerGroup = _getHybridRunbookWorkerGroupOperations(this._client);
    this.dscNodeConfiguration = _getDscNodeConfigurationOperations(this._client);
    this.dscConfiguration = _getDscConfigurationOperations(this._client);
    this.credential = _getCredentialOperations(this._client);
    this.connectionType = _getConnectionTypeOperations(this._client);
    this.connection = _getConnectionOperations(this._client);
    this.certificate = _getCertificateOperations(this._client);
    this.nodeReports = _getNodeReportsOperations(this._client);
    this.dscNode = _getDscNodeOperations(this._client);
    this.webhook = _getWebhookOperations(this._client);
    this.softwareUpdateConfigurationRuns = _getSoftwareUpdateConfigurationRunsOperations(
      this._client,
    );
    this.softwareUpdateConfigurationMachineRuns =
      _getSoftwareUpdateConfigurationMachineRunsOperations(this._client);
    this.objectDataTypes = _getObjectDataTypesOperations(this._client);
    this.linkedWorkspace = _getLinkedWorkspaceOperations(this._client);
    this.job = _getJobOperations(this._client);
    this.keys = _getKeysOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.statistics = _getStatisticsOperations(this._client);
    this.agentRegistrationInformation = _getAgentRegistrationInformationOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.nodeCountInformation = _getNodeCountInformationOperations(this._client);
    this.automationAccount = _getAutomationAccountOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.runtimeEnvironments = _getRuntimeEnvironmentsOperations(this._client);
    this.python3Package = _getPython3PackageOperations(this._client);
    this.python2Package = _getPython2PackageOperations(this._client);
    this.hybridRunbookWorkers = _getHybridRunbookWorkersOperations(this._client);
    this.softwareUpdateConfigurations = _getSoftwareUpdateConfigurationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Post operation to serialize or deserialize GraphRunbookContent */
  convertGraphRunbookContent(
    resourceGroupName: string,
    automationAccountName: string,
    parameters: GraphicalRunbookContent,
    options: ConvertGraphRunbookContentOptionalParams = { requestOptions: {} },
  ): Promise<GraphicalRunbookContent> {
    return convertGraphRunbookContent(
      this._client,
      resourceGroupName,
      automationAccountName,
      parameters,
      options,
    );
  }

  /** The operation groups for deletedAutomationAccounts */
  public readonly deletedAutomationAccounts: DeletedAutomationAccountsOperations;
  /** The operation groups for watcher */
  public readonly watcher: WatcherOperations;
  /** The operation groups for variable */
  public readonly variable: VariableOperations;
  /** The operation groups for sourceControlSyncJobStreams */
  public readonly sourceControlSyncJobStreams: SourceControlSyncJobStreamsOperations;
  /** The operation groups for sourceControlSyncJob */
  public readonly sourceControlSyncJob: SourceControlSyncJobOperations;
  /** The operation groups for sourceControl */
  public readonly sourceControl: SourceControlOperations;
  /** The operation groups for schedule */
  public readonly schedule: ScheduleOperations;
  /** The operation groups for testJob */
  public readonly testJob: TestJobOperations;
  /** The operation groups for testJobStreams */
  public readonly testJobStreams: TestJobStreamsOperations;
  /** The operation groups for runbookDraft */
  public readonly runbookDraft: RunbookDraftOperations;
  /** The operation groups for runbook */
  public readonly runbook: RunbookOperations;
  /** The operation groups for package */
  public readonly package: PackageOperations;
  /** The operation groups for fields */
  public readonly fields: FieldsOperations;
  /** The operation groups for activity */
  public readonly activity: ActivityOperations;
  /** The operation groups for module */
  public readonly module: ModuleOperations;
  /** The operation groups for jobSchedule */
  public readonly jobSchedule: JobScheduleOperations;
  /** The operation groups for jobStream */
  public readonly jobStream: JobStreamOperations;
  /** The operation groups for hybridRunbookWorkerGroup */
  public readonly hybridRunbookWorkerGroup: HybridRunbookWorkerGroupOperations;
  /** The operation groups for dscNodeConfiguration */
  public readonly dscNodeConfiguration: DscNodeConfigurationOperations;
  /** The operation groups for dscConfiguration */
  public readonly dscConfiguration: DscConfigurationOperations;
  /** The operation groups for credential */
  public readonly credential: CredentialOperations;
  /** The operation groups for connectionType */
  public readonly connectionType: ConnectionTypeOperations;
  /** The operation groups for connection */
  public readonly connection: ConnectionOperations;
  /** The operation groups for certificate */
  public readonly certificate: CertificateOperations;
  /** The operation groups for nodeReports */
  public readonly nodeReports: NodeReportsOperations;
  /** The operation groups for dscNode */
  public readonly dscNode: DscNodeOperations;
  /** The operation groups for webhook */
  public readonly webhook: WebhookOperations;
  /** The operation groups for softwareUpdateConfigurationRuns */
  public readonly softwareUpdateConfigurationRuns: SoftwareUpdateConfigurationRunsOperations;
  /** The operation groups for softwareUpdateConfigurationMachineRuns */
  public readonly softwareUpdateConfigurationMachineRuns: SoftwareUpdateConfigurationMachineRunsOperations;
  /** The operation groups for objectDataTypes */
  public readonly objectDataTypes: ObjectDataTypesOperations;
  /** The operation groups for linkedWorkspace */
  public readonly linkedWorkspace: LinkedWorkspaceOperations;
  /** The operation groups for job */
  public readonly job: JobOperations;
  /** The operation groups for keys */
  public readonly keys: KeysOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for statistics */
  public readonly statistics: StatisticsOperations;
  /** The operation groups for agentRegistrationInformation */
  public readonly agentRegistrationInformation: AgentRegistrationInformationOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for nodeCountInformation */
  public readonly nodeCountInformation: NodeCountInformationOperations;
  /** The operation groups for automationAccount */
  public readonly automationAccount: AutomationAccountOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for runtimeEnvironments */
  public readonly runtimeEnvironments: RuntimeEnvironmentsOperations;
  /** The operation groups for python3Package */
  public readonly python3Package: Python3PackageOperations;
  /** The operation groups for python2Package */
  public readonly python2Package: Python2PackageOperations;
  /** The operation groups for hybridRunbookWorkers */
  public readonly hybridRunbookWorkers: HybridRunbookWorkersOperations;
  /** The operation groups for softwareUpdateConfigurations */
  public readonly softwareUpdateConfigurations: SoftwareUpdateConfigurationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
