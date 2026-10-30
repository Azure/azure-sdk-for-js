// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext, ContainerAppsAPIClientOptionalParams } from "./api/index.js";
import { createContainerAppsAPI } from "./api/index.js";
import { jobExecution, getCustomDomainVerificationId } from "./api/operations.js";
import type {
  JobExecutionOptionalParams,
  GetCustomDomainVerificationIdOptionalParams,
} from "./api/options.js";
import type { AvailableEnvironmentModesOperations } from "./classic/availableEnvironmentModes/index.js";
import { _getAvailableEnvironmentModesOperations } from "./classic/availableEnvironmentModes/index.js";
import type { AvailableWorkloadProfilesOperations } from "./classic/availableWorkloadProfiles/index.js";
import { _getAvailableWorkloadProfilesOperations } from "./classic/availableWorkloadProfiles/index.js";
import type { BillingMetersOperations } from "./classic/billingMeters/index.js";
import { _getBillingMetersOperations } from "./classic/billingMeters/index.js";
import type { CertificatesOperations } from "./classic/certificates/index.js";
import { _getCertificatesOperations } from "./classic/certificates/index.js";
import type { ConnectedEnvironmentsOperations } from "./classic/connectedEnvironments/index.js";
import { _getConnectedEnvironmentsOperations } from "./classic/connectedEnvironments/index.js";
import type { ConnectedEnvironmentsCertificatesOperations } from "./classic/connectedEnvironmentsCertificates/index.js";
import { _getConnectedEnvironmentsCertificatesOperations } from "./classic/connectedEnvironmentsCertificates/index.js";
import type { ConnectedEnvironmentsDaprComponentsOperations } from "./classic/connectedEnvironmentsDaprComponents/index.js";
import { _getConnectedEnvironmentsDaprComponentsOperations } from "./classic/connectedEnvironmentsDaprComponents/index.js";
import type { ConnectedEnvironmentsStoragesOperations } from "./classic/connectedEnvironmentsStorages/index.js";
import { _getConnectedEnvironmentsStoragesOperations } from "./classic/connectedEnvironmentsStorages/index.js";
import type { ContainerAppPrivateEndpointConnectionsOperations } from "./classic/containerAppPrivateEndpointConnections/index.js";
import { _getContainerAppPrivateEndpointConnectionsOperations } from "./classic/containerAppPrivateEndpointConnections/index.js";
import type { ContainerAppPrivateLinkResourcesOperations } from "./classic/containerAppPrivateLinkResources/index.js";
import { _getContainerAppPrivateLinkResourcesOperations } from "./classic/containerAppPrivateLinkResources/index.js";
import type { ContainerAppsOperations } from "./classic/containerApps/index.js";
import { _getContainerAppsOperations } from "./classic/containerApps/index.js";
import type { ContainerAppsAuthConfigsOperations } from "./classic/containerAppsAuthConfigs/index.js";
import { _getContainerAppsAuthConfigsOperations } from "./classic/containerAppsAuthConfigs/index.js";
import type { ContainerAppsDiagnosticsOperations } from "./classic/containerAppsDiagnostics/index.js";
import { _getContainerAppsDiagnosticsOperations } from "./classic/containerAppsDiagnostics/index.js";
import type { ContainerAppsFunctionsOperations } from "./classic/containerAppsFunctions/index.js";
import { _getContainerAppsFunctionsOperations } from "./classic/containerAppsFunctions/index.js";
import type { ContainerAppsLabelHistoryOperations } from "./classic/containerAppsLabelHistory/index.js";
import { _getContainerAppsLabelHistoryOperations } from "./classic/containerAppsLabelHistory/index.js";
import type { ContainerAppsRevisionFunctionsOperations } from "./classic/containerAppsRevisionFunctions/index.js";
import { _getContainerAppsRevisionFunctionsOperations } from "./classic/containerAppsRevisionFunctions/index.js";
import type { ContainerAppsRevisionReplicasOperations } from "./classic/containerAppsRevisionReplicas/index.js";
import { _getContainerAppsRevisionReplicasOperations } from "./classic/containerAppsRevisionReplicas/index.js";
import type { ContainerAppsRevisionsOperations } from "./classic/containerAppsRevisions/index.js";
import { _getContainerAppsRevisionsOperations } from "./classic/containerAppsRevisions/index.js";
import type { ContainerAppsSessionPoolsOperations } from "./classic/containerAppsSessionPools/index.js";
import { _getContainerAppsSessionPoolsOperations } from "./classic/containerAppsSessionPools/index.js";
import type { ContainerAppsSourceControlsOperations } from "./classic/containerAppsSourceControls/index.js";
import { _getContainerAppsSourceControlsOperations } from "./classic/containerAppsSourceControls/index.js";
import type { DaprComponentResiliencyPoliciesOperations } from "./classic/daprComponentResiliencyPolicies/index.js";
import { _getDaprComponentResiliencyPoliciesOperations } from "./classic/daprComponentResiliencyPolicies/index.js";
import type { DaprComponentsOperations } from "./classic/daprComponents/index.js";
import { _getDaprComponentsOperations } from "./classic/daprComponents/index.js";
import type { DotNetComponentsOperations } from "./classic/dotNetComponents/index.js";
import { _getDotNetComponentsOperations } from "./classic/dotNetComponents/index.js";
import type { FunctionsExtensionOperations } from "./classic/functionsExtension/index.js";
import { _getFunctionsExtensionOperations } from "./classic/functionsExtension/index.js";
import type { HttpRouteConfigOperations } from "./classic/httpRouteConfig/index.js";
import { _getHttpRouteConfigOperations } from "./classic/httpRouteConfig/index.js";
import type { JavaComponentsOperations } from "./classic/javaComponents/index.js";
import { _getJavaComponentsOperations } from "./classic/javaComponents/index.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { JobsExecutionsOperations } from "./classic/jobsExecutions/index.js";
import { _getJobsExecutionsOperations } from "./classic/jobsExecutions/index.js";
import type { LogicAppsOperations } from "./classic/logicApps/index.js";
import { _getLogicAppsOperations } from "./classic/logicApps/index.js";
import type { MaintenanceConfigurationsOperations } from "./classic/maintenanceConfigurations/index.js";
import { _getMaintenanceConfigurationsOperations } from "./classic/maintenanceConfigurations/index.js";
import type { ManagedCertificatesOperations } from "./classic/managedCertificates/index.js";
import { _getManagedCertificatesOperations } from "./classic/managedCertificates/index.js";
import type { ManagedEnvironmentDiagnosticsOperations } from "./classic/managedEnvironmentDiagnostics/index.js";
import { _getManagedEnvironmentDiagnosticsOperations } from "./classic/managedEnvironmentDiagnostics/index.js";
import type { ManagedEnvironmentPrivateEndpointConnectionsOperations } from "./classic/managedEnvironmentPrivateEndpointConnections/index.js";
import { _getManagedEnvironmentPrivateEndpointConnectionsOperations } from "./classic/managedEnvironmentPrivateEndpointConnections/index.js";
import type { ManagedEnvironmentPrivateLinkResourcesOperations } from "./classic/managedEnvironmentPrivateLinkResources/index.js";
import { _getManagedEnvironmentPrivateLinkResourcesOperations } from "./classic/managedEnvironmentPrivateLinkResources/index.js";
import type { ManagedEnvironmentUsagesOperations } from "./classic/managedEnvironmentUsages/index.js";
import { _getManagedEnvironmentUsagesOperations } from "./classic/managedEnvironmentUsages/index.js";
import type { ManagedEnvironmentsOperations } from "./classic/managedEnvironments/index.js";
import { _getManagedEnvironmentsOperations } from "./classic/managedEnvironments/index.js";
import type { ManagedEnvironmentsDiagnosticsOperations } from "./classic/managedEnvironmentsDiagnostics/index.js";
import { _getManagedEnvironmentsDiagnosticsOperations } from "./classic/managedEnvironmentsDiagnostics/index.js";
import type { ManagedEnvironmentsStoragesOperations } from "./classic/managedEnvironmentsStorages/index.js";
import { _getManagedEnvironmentsStoragesOperations } from "./classic/managedEnvironmentsStorages/index.js";
import type { NamespacesOperations } from "./classic/namespaces/index.js";
import { _getNamespacesOperations } from "./classic/namespaces/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SandboxGroupsOperations } from "./classic/sandboxGroups/index.js";
import { _getSandboxGroupsOperations } from "./classic/sandboxGroups/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VnetConnectionsOperations } from "./classic/vnetConnections/index.js";
import { _getVnetConnectionsOperations } from "./classic/vnetConnections/index.js";
import type { JobExecution, GetCustomDomainVerificationIdResponse } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerAppsAPIClientOptionalParams } from "./api/containerAppsAPIContext.js";

export class ContainerAppsAPIClient {
  private _client: ContainerAppsAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ContainerAppsAPIClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ContainerAppsAPIClientOptionalParams,
  );
  /** Functions is an extension resource to revisions and the api listed is used to proxy the call from Web RP to the function app's host process, this api is not exposed to users and only Web RP is allowed to invoke functions extension resource. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ContainerAppsAPIClientOptionalParams,
    options?: ContainerAppsAPIClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createContainerAppsAPI(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.managedEnvironmentUsages = _getManagedEnvironmentUsagesOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.billingMeters = _getBillingMetersOperations(this._client);
    this.availableEnvironmentModes = _getAvailableEnvironmentModesOperations(this._client);
    this.availableWorkloadProfiles = _getAvailableWorkloadProfilesOperations(this._client);
    this.managedEnvironmentDiagnostics = _getManagedEnvironmentDiagnosticsOperations(this._client);
    this.jobsExecutions = _getJobsExecutionsOperations(this._client);
    this.httpRouteConfig = _getHttpRouteConfigOperations(this._client);
    this.managedEnvironmentPrivateEndpointConnections =
      _getManagedEnvironmentPrivateEndpointConnectionsOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.connectedEnvironmentsCertificates = _getConnectedEnvironmentsCertificatesOperations(
      this._client,
    );
    this.containerAppsRevisionFunctions = _getContainerAppsRevisionFunctionsOperations(
      this._client,
    );
    this.managedEnvironmentsDiagnostics = _getManagedEnvironmentsDiagnosticsOperations(
      this._client,
    );
    this.containerAppsDiagnostics = _getContainerAppsDiagnosticsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.managedEnvironmentsStorages = _getManagedEnvironmentsStoragesOperations(this._client);
    this.maintenanceConfigurations = _getMaintenanceConfigurationsOperations(this._client);
    this.daprComponentResiliencyPolicies = _getDaprComponentResiliencyPoliciesOperations(
      this._client,
    );
    this.managedEnvironmentPrivateLinkResources =
      _getManagedEnvironmentPrivateLinkResourcesOperations(this._client);
    this.containerAppPrivateLinkResources = _getContainerAppPrivateLinkResourcesOperations(
      this._client,
    );
    this.containerAppPrivateEndpointConnections =
      _getContainerAppPrivateEndpointConnectionsOperations(this._client);
    this.managedCertificates = _getManagedCertificatesOperations(this._client);
    this.connectedEnvironmentsStorages = _getConnectedEnvironmentsStoragesOperations(this._client);
    this.daprComponents = _getDaprComponentsOperations(this._client);
    this.connectedEnvironmentsDaprComponents = _getConnectedEnvironmentsDaprComponentsOperations(
      this._client,
    );
    this.managedEnvironments = _getManagedEnvironmentsOperations(this._client);
    this.certificates = _getCertificatesOperations(this._client);
    this.connectedEnvironments = _getConnectedEnvironmentsOperations(this._client);
    this.containerAppsAuthConfigs = _getContainerAppsAuthConfigsOperations(this._client);
    this.logicApps = _getLogicAppsOperations(this._client);
    this.javaComponents = _getJavaComponentsOperations(this._client);
    this.dotNetComponents = _getDotNetComponentsOperations(this._client);
    this.containerAppsRevisionReplicas = _getContainerAppsRevisionReplicasOperations(this._client);
    this.containerAppsLabelHistory = _getContainerAppsLabelHistoryOperations(this._client);
    this.functionsExtension = _getFunctionsExtensionOperations(this._client);
    this.containerAppsRevisions = _getContainerAppsRevisionsOperations(this._client);
    this.containerAppsFunctions = _getContainerAppsFunctionsOperations(this._client);
    this.containerApps = _getContainerAppsOperations(this._client);
    this.containerAppsSourceControls = _getContainerAppsSourceControlsOperations(this._client);
    this.vnetConnections = _getVnetConnectionsOperations(this._client);
    this.sandboxGroups = _getSandboxGroupsOperations(this._client);
    this.containerAppsSessionPools = _getContainerAppsSessionPoolsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Get details of a single job execution */
  jobExecution(
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options: JobExecutionOptionalParams = { requestOptions: {} },
  ): Promise<JobExecution> {
    return jobExecution(this._client, resourceGroupName, jobName, jobExecutionName, options);
  }

  /** Get the verification id of a subscription used for verifying custom domains */
  getCustomDomainVerificationId(
    options: GetCustomDomainVerificationIdOptionalParams = { requestOptions: {} },
  ): Promise<GetCustomDomainVerificationIdResponse> {
    return getCustomDomainVerificationId(this._client, options);
  }

  /** The operation groups for managedEnvironmentUsages */
  public readonly managedEnvironmentUsages: ManagedEnvironmentUsagesOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for billingMeters */
  public readonly billingMeters: BillingMetersOperations;
  /** The operation groups for availableEnvironmentModes */
  public readonly availableEnvironmentModes: AvailableEnvironmentModesOperations;
  /** The operation groups for availableWorkloadProfiles */
  public readonly availableWorkloadProfiles: AvailableWorkloadProfilesOperations;
  /** The operation groups for managedEnvironmentDiagnostics */
  public readonly managedEnvironmentDiagnostics: ManagedEnvironmentDiagnosticsOperations;
  /** The operation groups for jobsExecutions */
  public readonly jobsExecutions: JobsExecutionsOperations;
  /** The operation groups for httpRouteConfig */
  public readonly httpRouteConfig: HttpRouteConfigOperations;
  /** The operation groups for managedEnvironmentPrivateEndpointConnections */
  public readonly managedEnvironmentPrivateEndpointConnections: ManagedEnvironmentPrivateEndpointConnectionsOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for connectedEnvironmentsCertificates */
  public readonly connectedEnvironmentsCertificates: ConnectedEnvironmentsCertificatesOperations;
  /** The operation groups for containerAppsRevisionFunctions */
  public readonly containerAppsRevisionFunctions: ContainerAppsRevisionFunctionsOperations;
  /** The operation groups for managedEnvironmentsDiagnostics */
  public readonly managedEnvironmentsDiagnostics: ManagedEnvironmentsDiagnosticsOperations;
  /** The operation groups for containerAppsDiagnostics */
  public readonly containerAppsDiagnostics: ContainerAppsDiagnosticsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for managedEnvironmentsStorages */
  public readonly managedEnvironmentsStorages: ManagedEnvironmentsStoragesOperations;
  /** The operation groups for maintenanceConfigurations */
  public readonly maintenanceConfigurations: MaintenanceConfigurationsOperations;
  /** The operation groups for daprComponentResiliencyPolicies */
  public readonly daprComponentResiliencyPolicies: DaprComponentResiliencyPoliciesOperations;
  /** The operation groups for managedEnvironmentPrivateLinkResources */
  public readonly managedEnvironmentPrivateLinkResources: ManagedEnvironmentPrivateLinkResourcesOperations;
  /** The operation groups for containerAppPrivateLinkResources */
  public readonly containerAppPrivateLinkResources: ContainerAppPrivateLinkResourcesOperations;
  /** The operation groups for containerAppPrivateEndpointConnections */
  public readonly containerAppPrivateEndpointConnections: ContainerAppPrivateEndpointConnectionsOperations;
  /** The operation groups for managedCertificates */
  public readonly managedCertificates: ManagedCertificatesOperations;
  /** The operation groups for connectedEnvironmentsStorages */
  public readonly connectedEnvironmentsStorages: ConnectedEnvironmentsStoragesOperations;
  /** The operation groups for daprComponents */
  public readonly daprComponents: DaprComponentsOperations;
  /** The operation groups for connectedEnvironmentsDaprComponents */
  public readonly connectedEnvironmentsDaprComponents: ConnectedEnvironmentsDaprComponentsOperations;
  /** The operation groups for managedEnvironments */
  public readonly managedEnvironments: ManagedEnvironmentsOperations;
  /** The operation groups for certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for connectedEnvironments */
  public readonly connectedEnvironments: ConnectedEnvironmentsOperations;
  /** The operation groups for containerAppsAuthConfigs */
  public readonly containerAppsAuthConfigs: ContainerAppsAuthConfigsOperations;
  /** The operation groups for logicApps */
  public readonly logicApps: LogicAppsOperations;
  /** The operation groups for javaComponents */
  public readonly javaComponents: JavaComponentsOperations;
  /** The operation groups for dotNetComponents */
  public readonly dotNetComponents: DotNetComponentsOperations;
  /** The operation groups for containerAppsRevisionReplicas */
  public readonly containerAppsRevisionReplicas: ContainerAppsRevisionReplicasOperations;
  /** The operation groups for containerAppsLabelHistory */
  public readonly containerAppsLabelHistory: ContainerAppsLabelHistoryOperations;
  /** The operation groups for functionsExtension */
  public readonly functionsExtension: FunctionsExtensionOperations;
  /** The operation groups for containerAppsRevisions */
  public readonly containerAppsRevisions: ContainerAppsRevisionsOperations;
  /** The operation groups for containerAppsFunctions */
  public readonly containerAppsFunctions: ContainerAppsFunctionsOperations;
  /** The operation groups for containerApps */
  public readonly containerApps: ContainerAppsOperations;
  /** The operation groups for containerAppsSourceControls */
  public readonly containerAppsSourceControls: ContainerAppsSourceControlsOperations;
  /** The operation groups for vnetConnections */
  public readonly vnetConnections: VnetConnectionsOperations;
  /** The operation groups for sandboxGroups */
  public readonly sandboxGroups: SandboxGroupsOperations;
  /** The operation groups for containerAppsSessionPools */
  public readonly containerAppsSessionPools: ContainerAppsSessionPoolsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
