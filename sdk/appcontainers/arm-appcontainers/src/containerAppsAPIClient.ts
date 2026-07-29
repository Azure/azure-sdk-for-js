// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContainerAppsAPIContext,
  ContainerAppsAPIClientOptionalParams,
  createContainerAppsAPI,
} from "./api/index.js";
import { jobExecution, getCustomDomainVerificationId } from "./api/operations.js";
import {
  JobExecutionOptionalParams,
  GetCustomDomainVerificationIdOptionalParams,
} from "./api/options.js";
import {
  AppResiliencyOperations,
  _getAppResiliencyOperations,
} from "./classic/appResiliency/index.js";
import {
  AvailableWorkloadProfilesOperations,
  _getAvailableWorkloadProfilesOperations,
} from "./classic/availableWorkloadProfiles/index.js";
import {
  BillingMetersOperations,
  _getBillingMetersOperations,
} from "./classic/billingMeters/index.js";
import {
  BuildAuthTokenOperations,
  _getBuildAuthTokenOperations,
} from "./classic/buildAuthToken/index.js";
import { BuildersOperations, _getBuildersOperations } from "./classic/builders/index.js";
import { BuildsOperations, _getBuildsOperations } from "./classic/builds/index.js";
import {
  BuildsByBuilderResourceOperations,
  _getBuildsByBuilderResourceOperations,
} from "./classic/buildsByBuilderResource/index.js";
import {
  CertificatesOperations,
  _getCertificatesOperations,
} from "./classic/certificates/index.js";
import {
  ConnectedEnvironmentsOperations,
  _getConnectedEnvironmentsOperations,
} from "./classic/connectedEnvironments/index.js";
import {
  ConnectedEnvironmentsCertificatesOperations,
  _getConnectedEnvironmentsCertificatesOperations,
} from "./classic/connectedEnvironmentsCertificates/index.js";
import {
  ConnectedEnvironmentsDaprComponentsOperations,
  _getConnectedEnvironmentsDaprComponentsOperations,
} from "./classic/connectedEnvironmentsDaprComponents/index.js";
import {
  ConnectedEnvironmentsStoragesOperations,
  _getConnectedEnvironmentsStoragesOperations,
} from "./classic/connectedEnvironmentsStorages/index.js";
import {
  ContainerAppsOperations,
  _getContainerAppsOperations,
} from "./classic/containerApps/index.js";
import {
  ContainerAppsAuthConfigsOperations,
  _getContainerAppsAuthConfigsOperations,
} from "./classic/containerAppsAuthConfigs/index.js";
import {
  ContainerAppsBuildsOperations,
  _getContainerAppsBuildsOperations,
} from "./classic/containerAppsBuilds/index.js";
import {
  ContainerAppsBuildsByContainerAppOperations,
  _getContainerAppsBuildsByContainerAppOperations,
} from "./classic/containerAppsBuildsByContainerApp/index.js";
import {
  ContainerAppsDiagnosticsOperations,
  _getContainerAppsDiagnosticsOperations,
} from "./classic/containerAppsDiagnostics/index.js";
import {
  ContainerAppsFunctionsOperations,
  _getContainerAppsFunctionsOperations,
} from "./classic/containerAppsFunctions/index.js";
import {
  ContainerAppsLabelHistoryOperations,
  _getContainerAppsLabelHistoryOperations,
} from "./classic/containerAppsLabelHistory/index.js";
import {
  ContainerAppsPatchesOperations,
  _getContainerAppsPatchesOperations,
} from "./classic/containerAppsPatches/index.js";
import {
  ContainerAppsRevisionFunctionsOperations,
  _getContainerAppsRevisionFunctionsOperations,
} from "./classic/containerAppsRevisionFunctions/index.js";
import {
  ContainerAppsRevisionReplicasOperations,
  _getContainerAppsRevisionReplicasOperations,
} from "./classic/containerAppsRevisionReplicas/index.js";
import {
  ContainerAppsRevisionsOperations,
  _getContainerAppsRevisionsOperations,
} from "./classic/containerAppsRevisions/index.js";
import {
  ContainerAppsSessionPoolsOperations,
  _getContainerAppsSessionPoolsOperations,
} from "./classic/containerAppsSessionPools/index.js";
import {
  ContainerAppsSourceControlsOperations,
  _getContainerAppsSourceControlsOperations,
} from "./classic/containerAppsSourceControls/index.js";
import {
  DaprComponentResiliencyPoliciesOperations,
  _getDaprComponentResiliencyPoliciesOperations,
} from "./classic/daprComponentResiliencyPolicies/index.js";
import {
  DaprComponentsOperations,
  _getDaprComponentsOperations,
} from "./classic/daprComponents/index.js";
import {
  DaprSubscriptionsOperations,
  _getDaprSubscriptionsOperations,
} from "./classic/daprSubscriptions/index.js";
import {
  DotNetComponentsOperations,
  _getDotNetComponentsOperations,
} from "./classic/dotNetComponents/index.js";
import {
  FunctionsExtensionOperations,
  _getFunctionsExtensionOperations,
} from "./classic/functionsExtension/index.js";
import {
  HttpRouteConfigOperations,
  _getHttpRouteConfigOperations,
} from "./classic/httpRouteConfig/index.js";
import {
  JavaComponentsOperations,
  _getJavaComponentsOperations,
} from "./classic/javaComponents/index.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import {
  JobsExecutionsOperations,
  _getJobsExecutionsOperations,
} from "./classic/jobsExecutions/index.js";
import { LogicAppsOperations, _getLogicAppsOperations } from "./classic/logicApps/index.js";
import {
  MaintenanceConfigurationsOperations,
  _getMaintenanceConfigurationsOperations,
} from "./classic/maintenanceConfigurations/index.js";
import {
  ManagedCertificatesOperations,
  _getManagedCertificatesOperations,
} from "./classic/managedCertificates/index.js";
import {
  ManagedEnvironmentDiagnosticsOperations,
  _getManagedEnvironmentDiagnosticsOperations,
} from "./classic/managedEnvironmentDiagnostics/index.js";
import {
  ManagedEnvironmentPrivateEndpointConnectionsOperations,
  _getManagedEnvironmentPrivateEndpointConnectionsOperations,
} from "./classic/managedEnvironmentPrivateEndpointConnections/index.js";
import {
  ManagedEnvironmentPrivateLinkResourcesOperations,
  _getManagedEnvironmentPrivateLinkResourcesOperations,
} from "./classic/managedEnvironmentPrivateLinkResources/index.js";
import {
  ManagedEnvironmentUsagesOperations,
  _getManagedEnvironmentUsagesOperations,
} from "./classic/managedEnvironmentUsages/index.js";
import {
  ManagedEnvironmentsOperations,
  _getManagedEnvironmentsOperations,
} from "./classic/managedEnvironments/index.js";
import {
  ManagedEnvironmentsDiagnosticsOperations,
  _getManagedEnvironmentsDiagnosticsOperations,
} from "./classic/managedEnvironmentsDiagnostics/index.js";
import {
  ManagedEnvironmentsStoragesOperations,
  _getManagedEnvironmentsStoragesOperations,
} from "./classic/managedEnvironmentsStorages/index.js";
import { NamespacesOperations, _getNamespacesOperations } from "./classic/namespaces/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import { JobExecution, GetCustomDomainVerificationIdResponse } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerAppsAPI(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.managedEnvironmentUsages = _getManagedEnvironmentUsagesOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.billingMeters = _getBillingMetersOperations(this._client);
    this.availableWorkloadProfiles = _getAvailableWorkloadProfilesOperations(this._client);
    this.managedEnvironmentDiagnostics = _getManagedEnvironmentDiagnosticsOperations(this._client);
    this.jobsExecutions = _getJobsExecutionsOperations(this._client);
    this.httpRouteConfig = _getHttpRouteConfigOperations(this._client);
    this.managedEnvironmentPrivateEndpointConnections =
      _getManagedEnvironmentPrivateEndpointConnectionsOperations(this._client);
    this.managedEnvironmentPrivateLinkResources =
      _getManagedEnvironmentPrivateLinkResourcesOperations(this._client);
    this.namespaces = _getNamespacesOperations(this._client);
    this.connectedEnvironmentsCertificates = _getConnectedEnvironmentsCertificatesOperations(
      this._client,
    );
    this.buildAuthToken = _getBuildAuthTokenOperations(this._client);
    this.buildsByBuilderResource = _getBuildsByBuilderResourceOperations(this._client);
    this.appResiliency = _getAppResiliencyOperations(this._client);
    this.containerAppsRevisionFunctions = _getContainerAppsRevisionFunctionsOperations(
      this._client,
    );
    this.containerAppsBuildsByContainerApp = _getContainerAppsBuildsByContainerAppOperations(
      this._client,
    );
    this.managedEnvironmentsDiagnostics = _getManagedEnvironmentsDiagnosticsOperations(
      this._client,
    );
    this.containerAppsDiagnostics = _getContainerAppsDiagnosticsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.managedEnvironmentsStorages = _getManagedEnvironmentsStoragesOperations(this._client);
    this.maintenanceConfigurations = _getMaintenanceConfigurationsOperations(this._client);
    this.daprSubscriptions = _getDaprSubscriptionsOperations(this._client);
    this.daprComponentResiliencyPolicies = _getDaprComponentResiliencyPoliciesOperations(
      this._client,
    );
    this.managedCertificates = _getManagedCertificatesOperations(this._client);
    this.connectedEnvironmentsStorages = _getConnectedEnvironmentsStoragesOperations(this._client);
    this.daprComponents = _getDaprComponentsOperations(this._client);
    this.connectedEnvironmentsDaprComponents = _getConnectedEnvironmentsDaprComponentsOperations(
      this._client,
    );
    this.managedEnvironments = _getManagedEnvironmentsOperations(this._client);
    this.certificates = _getCertificatesOperations(this._client);
    this.connectedEnvironments = _getConnectedEnvironmentsOperations(this._client);
    this.builds = _getBuildsOperations(this._client);
    this.builders = _getBuildersOperations(this._client);
    this.containerAppsAuthConfigs = _getContainerAppsAuthConfigsOperations(this._client);
    this.logicApps = _getLogicAppsOperations(this._client);
    this.javaComponents = _getJavaComponentsOperations(this._client);
    this.dotNetComponents = _getDotNetComponentsOperations(this._client);
    this.containerAppsRevisionReplicas = _getContainerAppsRevisionReplicasOperations(this._client);
    this.containerAppsPatches = _getContainerAppsPatchesOperations(this._client);
    this.containerAppsLabelHistory = _getContainerAppsLabelHistoryOperations(this._client);
    this.functionsExtension = _getFunctionsExtensionOperations(this._client);
    this.containerAppsRevisions = _getContainerAppsRevisionsOperations(this._client);
    this.containerAppsFunctions = _getContainerAppsFunctionsOperations(this._client);
    this.containerAppsBuilds = _getContainerAppsBuildsOperations(this._client);
    this.containerApps = _getContainerAppsOperations(this._client);
    this.containerAppsSourceControls = _getContainerAppsSourceControlsOperations(this._client);
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
  /** The operation groups for managedEnvironmentPrivateLinkResources */
  public readonly managedEnvironmentPrivateLinkResources: ManagedEnvironmentPrivateLinkResourcesOperations;
  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for connectedEnvironmentsCertificates */
  public readonly connectedEnvironmentsCertificates: ConnectedEnvironmentsCertificatesOperations;
  /** The operation groups for buildAuthToken */
  public readonly buildAuthToken: BuildAuthTokenOperations;
  /** The operation groups for buildsByBuilderResource */
  public readonly buildsByBuilderResource: BuildsByBuilderResourceOperations;
  /** The operation groups for appResiliency */
  public readonly appResiliency: AppResiliencyOperations;
  /** The operation groups for containerAppsRevisionFunctions */
  public readonly containerAppsRevisionFunctions: ContainerAppsRevisionFunctionsOperations;
  /** The operation groups for containerAppsBuildsByContainerApp */
  public readonly containerAppsBuildsByContainerApp: ContainerAppsBuildsByContainerAppOperations;
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
  /** The operation groups for daprSubscriptions */
  public readonly daprSubscriptions: DaprSubscriptionsOperations;
  /** The operation groups for daprComponentResiliencyPolicies */
  public readonly daprComponentResiliencyPolicies: DaprComponentResiliencyPoliciesOperations;
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
  /** The operation groups for builds */
  public readonly builds: BuildsOperations;
  /** The operation groups for builders */
  public readonly builders: BuildersOperations;
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
  /** The operation groups for containerAppsPatches */
  public readonly containerAppsPatches: ContainerAppsPatchesOperations;
  /** The operation groups for containerAppsLabelHistory */
  public readonly containerAppsLabelHistory: ContainerAppsLabelHistoryOperations;
  /** The operation groups for functionsExtension */
  public readonly functionsExtension: FunctionsExtensionOperations;
  /** The operation groups for containerAppsRevisions */
  public readonly containerAppsRevisions: ContainerAppsRevisionsOperations;
  /** The operation groups for containerAppsFunctions */
  public readonly containerAppsFunctions: ContainerAppsFunctionsOperations;
  /** The operation groups for containerAppsBuilds */
  public readonly containerAppsBuilds: ContainerAppsBuildsOperations;
  /** The operation groups for containerApps */
  public readonly containerApps: ContainerAppsOperations;
  /** The operation groups for containerAppsSourceControls */
  public readonly containerAppsSourceControls: ContainerAppsSourceControlsOperations;
  /** The operation groups for containerAppsSessionPools */
  public readonly containerAppsSessionPools: ContainerAppsSessionPoolsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
