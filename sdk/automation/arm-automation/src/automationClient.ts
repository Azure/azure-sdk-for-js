// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext, AutomationClientOptionalParams } from "./api/index.js";
import { createAutomation } from "./api/index.js";
import { convertGraphRunbookContent } from "./api/operations.js";
import type { ConvertGraphRunbookContentOptionalParams } from "./api/options.js";
import type { ActivityOperationsOperations } from "./classic/activityOperations/index.js";
import { _getActivityOperationsOperations } from "./classic/activityOperations/index.js";
import type { AgentRegistrationInformationOperations } from "./classic/agentRegistrationInformation/index.js";
import { _getAgentRegistrationInformationOperations } from "./classic/agentRegistrationInformation/index.js";
import type { AutomationAccountOperationsOperations } from "./classic/automationAccountOperations/index.js";
import { _getAutomationAccountOperationsOperations } from "./classic/automationAccountOperations/index.js";
import type { CertificateOperationsOperations } from "./classic/certificateOperations/index.js";
import { _getCertificateOperationsOperations } from "./classic/certificateOperations/index.js";
import type { ConnectionOperationsOperations } from "./classic/connectionOperations/index.js";
import { _getConnectionOperationsOperations } from "./classic/connectionOperations/index.js";
import type { ConnectionTypeOperationsOperations } from "./classic/connectionTypeOperations/index.js";
import { _getConnectionTypeOperationsOperations } from "./classic/connectionTypeOperations/index.js";
import type { CredentialOperationsOperations } from "./classic/credentialOperations/index.js";
import { _getCredentialOperationsOperations } from "./classic/credentialOperations/index.js";
import type { DeletedAutomationAccountsOperations } from "./classic/deletedAutomationAccounts/index.js";
import { _getDeletedAutomationAccountsOperations } from "./classic/deletedAutomationAccounts/index.js";
import type { DscConfigurationOperationsOperations } from "./classic/dscConfigurationOperations/index.js";
import { _getDscConfigurationOperationsOperations } from "./classic/dscConfigurationOperations/index.js";
import type { DscNodeConfigurationOperations } from "./classic/dscNodeConfiguration/index.js";
import { _getDscNodeConfigurationOperations } from "./classic/dscNodeConfiguration/index.js";
import type { DscNodeConfigurationOperationsOperations } from "./classic/dscNodeConfigurationOperations/index.js";
import { _getDscNodeConfigurationOperationsOperations } from "./classic/dscNodeConfigurationOperations/index.js";
import type { DscNodeOperationsOperations } from "./classic/dscNodeOperations/index.js";
import { _getDscNodeOperationsOperations } from "./classic/dscNodeOperations/index.js";
import type { FieldsOperations } from "./classic/fields/index.js";
import { _getFieldsOperations } from "./classic/fields/index.js";
import type { HybridRunbookWorkerGroupOperationsOperations } from "./classic/hybridRunbookWorkerGroupOperations/index.js";
import { _getHybridRunbookWorkerGroupOperationsOperations } from "./classic/hybridRunbookWorkerGroupOperations/index.js";
import type { HybridRunbookWorkersOperations } from "./classic/hybridRunbookWorkers/index.js";
import { _getHybridRunbookWorkersOperations } from "./classic/hybridRunbookWorkers/index.js";
import type { JobOperationsOperations } from "./classic/jobOperations/index.js";
import { _getJobOperationsOperations } from "./classic/jobOperations/index.js";
import type { JobScheduleOperationsOperations } from "./classic/jobScheduleOperations/index.js";
import { _getJobScheduleOperationsOperations } from "./classic/jobScheduleOperations/index.js";
import type { JobStreamOperationsOperations } from "./classic/jobStreamOperations/index.js";
import { _getJobStreamOperationsOperations } from "./classic/jobStreamOperations/index.js";
import type { KeysOperations } from "./classic/keys/index.js";
import { _getKeysOperations } from "./classic/keys/index.js";
import type { LinkedWorkspaceOperationsOperations } from "./classic/linkedWorkspaceOperations/index.js";
import { _getLinkedWorkspaceOperationsOperations } from "./classic/linkedWorkspaceOperations/index.js";
import type { ModuleOperationsOperations } from "./classic/moduleOperations/index.js";
import { _getModuleOperationsOperations } from "./classic/moduleOperations/index.js";
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
import type { RunbookDraftOperationsOperations } from "./classic/runbookDraftOperations/index.js";
import { _getRunbookDraftOperationsOperations } from "./classic/runbookDraftOperations/index.js";
import type { RunbookOperationsOperations } from "./classic/runbookOperations/index.js";
import { _getRunbookOperationsOperations } from "./classic/runbookOperations/index.js";
import type { RuntimeEnvironmentsOperations } from "./classic/runtimeEnvironments/index.js";
import { _getRuntimeEnvironmentsOperations } from "./classic/runtimeEnvironments/index.js";
import type { ScheduleOperationsOperations } from "./classic/scheduleOperations/index.js";
import { _getScheduleOperationsOperations } from "./classic/scheduleOperations/index.js";
import type { SoftwareUpdateConfigurationMachineRunsOperations } from "./classic/softwareUpdateConfigurationMachineRuns/index.js";
import { _getSoftwareUpdateConfigurationMachineRunsOperations } from "./classic/softwareUpdateConfigurationMachineRuns/index.js";
import type { SoftwareUpdateConfigurationRunsOperations } from "./classic/softwareUpdateConfigurationRuns/index.js";
import { _getSoftwareUpdateConfigurationRunsOperations } from "./classic/softwareUpdateConfigurationRuns/index.js";
import type { SoftwareUpdateConfigurationsOperations } from "./classic/softwareUpdateConfigurations/index.js";
import { _getSoftwareUpdateConfigurationsOperations } from "./classic/softwareUpdateConfigurations/index.js";
import type { SourceControlOperationsOperations } from "./classic/sourceControlOperations/index.js";
import { _getSourceControlOperationsOperations } from "./classic/sourceControlOperations/index.js";
import type { SourceControlSyncJobOperationsOperations } from "./classic/sourceControlSyncJobOperations/index.js";
import { _getSourceControlSyncJobOperationsOperations } from "./classic/sourceControlSyncJobOperations/index.js";
import type { SourceControlSyncJobStreamsOperations } from "./classic/sourceControlSyncJobStreams/index.js";
import { _getSourceControlSyncJobStreamsOperations } from "./classic/sourceControlSyncJobStreams/index.js";
import type { StatisticsOperationsOperations } from "./classic/statisticsOperations/index.js";
import { _getStatisticsOperationsOperations } from "./classic/statisticsOperations/index.js";
import type { TestJobOperationsOperations } from "./classic/testJobOperations/index.js";
import { _getTestJobOperationsOperations } from "./classic/testJobOperations/index.js";
import type { TestJobStreamsOperations } from "./classic/testJobStreams/index.js";
import { _getTestJobStreamsOperations } from "./classic/testJobStreams/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VariableOperationsOperations } from "./classic/variableOperations/index.js";
import { _getVariableOperationsOperations } from "./classic/variableOperations/index.js";
import type { WatcherOperationsOperations } from "./classic/watcherOperations/index.js";
import { _getWatcherOperationsOperations } from "./classic/watcherOperations/index.js";
import type { WebhookOperationsOperations } from "./classic/webhookOperations/index.js";
import { _getWebhookOperationsOperations } from "./classic/webhookOperations/index.js";
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
    this.watcherOperations = _getWatcherOperationsOperations(this._client);
    this.variableOperations = _getVariableOperationsOperations(this._client);
    this.sourceControlSyncJobStreams = _getSourceControlSyncJobStreamsOperations(this._client);
    this.sourceControlSyncJobOperations = _getSourceControlSyncJobOperationsOperations(
      this._client,
    );
    this.sourceControlOperations = _getSourceControlOperationsOperations(this._client);
    this.scheduleOperations = _getScheduleOperationsOperations(this._client);
    this.testJobOperations = _getTestJobOperationsOperations(this._client);
    this.testJobStreams = _getTestJobStreamsOperations(this._client);
    this.runbook = _getRunbookOperations(this._client);
    this.runbookDraftOperations = _getRunbookDraftOperationsOperations(this._client);
    this.runbookOperations = _getRunbookOperationsOperations(this._client);
    this.package = _getPackageOperations(this._client);
    this.fields = _getFieldsOperations(this._client);
    this.activityOperations = _getActivityOperationsOperations(this._client);
    this.moduleOperations = _getModuleOperationsOperations(this._client);
    this.jobScheduleOperations = _getJobScheduleOperationsOperations(this._client);
    this.jobStreamOperations = _getJobStreamOperationsOperations(this._client);
    this.hybridRunbookWorkerGroupOperations = _getHybridRunbookWorkerGroupOperationsOperations(
      this._client,
    );
    this.dscNodeConfiguration = _getDscNodeConfigurationOperations(this._client);
    this.dscNodeConfigurationOperations = _getDscNodeConfigurationOperationsOperations(
      this._client,
    );
    this.dscConfigurationOperations = _getDscConfigurationOperationsOperations(this._client);
    this.credentialOperations = _getCredentialOperationsOperations(this._client);
    this.connectionTypeOperations = _getConnectionTypeOperationsOperations(this._client);
    this.connectionOperations = _getConnectionOperationsOperations(this._client);
    this.certificateOperations = _getCertificateOperationsOperations(this._client);
    this.nodeReports = _getNodeReportsOperations(this._client);
    this.dscNodeOperations = _getDscNodeOperationsOperations(this._client);
    this.webhookOperations = _getWebhookOperationsOperations(this._client);
    this.softwareUpdateConfigurationRuns = _getSoftwareUpdateConfigurationRunsOperations(
      this._client,
    );
    this.softwareUpdateConfigurationMachineRuns =
      _getSoftwareUpdateConfigurationMachineRunsOperations(this._client);
    this.objectDataTypes = _getObjectDataTypesOperations(this._client);
    this.linkedWorkspaceOperations = _getLinkedWorkspaceOperationsOperations(this._client);
    this.jobOperations = _getJobOperationsOperations(this._client);
    this.keys = _getKeysOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.statisticsOperations = _getStatisticsOperationsOperations(this._client);
    this.agentRegistrationInformation = _getAgentRegistrationInformationOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.nodeCountInformation = _getNodeCountInformationOperations(this._client);
    this.automationAccountOperations = _getAutomationAccountOperationsOperations(this._client);
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
  /** The operation groups for watcherOperations */
  public readonly watcherOperations: WatcherOperationsOperations;
  /** The operation groups for variableOperations */
  public readonly variableOperations: VariableOperationsOperations;
  /** The operation groups for sourceControlSyncJobStreams */
  public readonly sourceControlSyncJobStreams: SourceControlSyncJobStreamsOperations;
  /** The operation groups for sourceControlSyncJobOperations */
  public readonly sourceControlSyncJobOperations: SourceControlSyncJobOperationsOperations;
  /** The operation groups for sourceControlOperations */
  public readonly sourceControlOperations: SourceControlOperationsOperations;
  /** The operation groups for scheduleOperations */
  public readonly scheduleOperations: ScheduleOperationsOperations;
  /** The operation groups for testJobOperations */
  public readonly testJobOperations: TestJobOperationsOperations;
  /** The operation groups for testJobStreams */
  public readonly testJobStreams: TestJobStreamsOperations;
  /** The operation groups for runbook */
  public readonly runbook: RunbookOperations;
  /** The operation groups for runbookDraftOperations */
  public readonly runbookDraftOperations: RunbookDraftOperationsOperations;
  /** The operation groups for runbookOperations */
  public readonly runbookOperations: RunbookOperationsOperations;
  /** The operation groups for package */
  public readonly package: PackageOperations;
  /** The operation groups for fields */
  public readonly fields: FieldsOperations;
  /** The operation groups for activityOperations */
  public readonly activityOperations: ActivityOperationsOperations;
  /** The operation groups for moduleOperations */
  public readonly moduleOperations: ModuleOperationsOperations;
  /** The operation groups for jobScheduleOperations */
  public readonly jobScheduleOperations: JobScheduleOperationsOperations;
  /** The operation groups for jobStreamOperations */
  public readonly jobStreamOperations: JobStreamOperationsOperations;
  /** The operation groups for hybridRunbookWorkerGroupOperations */
  public readonly hybridRunbookWorkerGroupOperations: HybridRunbookWorkerGroupOperationsOperations;
  /** The operation groups for dscNodeConfiguration */
  public readonly dscNodeConfiguration: DscNodeConfigurationOperations;
  /** The operation groups for dscNodeConfigurationOperations */
  public readonly dscNodeConfigurationOperations: DscNodeConfigurationOperationsOperations;
  /** The operation groups for dscConfigurationOperations */
  public readonly dscConfigurationOperations: DscConfigurationOperationsOperations;
  /** The operation groups for credentialOperations */
  public readonly credentialOperations: CredentialOperationsOperations;
  /** The operation groups for connectionTypeOperations */
  public readonly connectionTypeOperations: ConnectionTypeOperationsOperations;
  /** The operation groups for connectionOperations */
  public readonly connectionOperations: ConnectionOperationsOperations;
  /** The operation groups for certificateOperations */
  public readonly certificateOperations: CertificateOperationsOperations;
  /** The operation groups for nodeReports */
  public readonly nodeReports: NodeReportsOperations;
  /** The operation groups for dscNodeOperations */
  public readonly dscNodeOperations: DscNodeOperationsOperations;
  /** The operation groups for webhookOperations */
  public readonly webhookOperations: WebhookOperationsOperations;
  /** The operation groups for softwareUpdateConfigurationRuns */
  public readonly softwareUpdateConfigurationRuns: SoftwareUpdateConfigurationRunsOperations;
  /** The operation groups for softwareUpdateConfigurationMachineRuns */
  public readonly softwareUpdateConfigurationMachineRuns: SoftwareUpdateConfigurationMachineRunsOperations;
  /** The operation groups for objectDataTypes */
  public readonly objectDataTypes: ObjectDataTypesOperations;
  /** The operation groups for linkedWorkspaceOperations */
  public readonly linkedWorkspaceOperations: LinkedWorkspaceOperationsOperations;
  /** The operation groups for jobOperations */
  public readonly jobOperations: JobOperationsOperations;
  /** The operation groups for keys */
  public readonly keys: KeysOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for statisticsOperations */
  public readonly statisticsOperations: StatisticsOperationsOperations;
  /** The operation groups for agentRegistrationInformation */
  public readonly agentRegistrationInformation: AgentRegistrationInformationOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for nodeCountInformation */
  public readonly nodeCountInformation: NodeCountInformationOperations;
  /** The operation groups for automationAccountOperations */
  public readonly automationAccountOperations: AutomationAccountOperationsOperations;
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
