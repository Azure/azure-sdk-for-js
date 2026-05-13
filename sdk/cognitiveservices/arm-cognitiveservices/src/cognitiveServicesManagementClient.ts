// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CognitiveServicesManagementContext,
  CognitiveServicesManagementClientOptionalParams,
} from "./api/index.js";
import { createCognitiveServicesManagement } from "./api/index.js";
import {
  calculateModelCapacity,
  checkDomainAvailability,
  checkSkuAvailability,
} from "./api/operations.js";
import type {
  CalculateModelCapacityOptionalParams,
  CheckDomainAvailabilityOptionalParams,
  CheckSkuAvailabilityOptionalParams,
} from "./api/options.js";
import type { AccountCapabilityHostsOperations } from "./classic/accountCapabilityHosts/index.js";
import { _getAccountCapabilityHostsOperations } from "./classic/accountCapabilityHosts/index.js";
import type { AccountConnectionsOperations } from "./classic/accountConnections/index.js";
import { _getAccountConnectionsOperations } from "./classic/accountConnections/index.js";
import type { AccountsOperations } from "./classic/accounts/index.js";
import { _getAccountsOperations } from "./classic/accounts/index.js";
import type { AgentApplicationsOperations } from "./classic/agentApplications/index.js";
import { _getAgentApplicationsOperations } from "./classic/agentApplications/index.js";
import type { AgentDeploymentsOperations } from "./classic/agentDeployments/index.js";
import { _getAgentDeploymentsOperations } from "./classic/agentDeployments/index.js";
import type { CommitmentPlansOperations } from "./classic/commitmentPlans/index.js";
import { _getCommitmentPlansOperations } from "./classic/commitmentPlans/index.js";
import type { CommitmentTiersOperations } from "./classic/commitmentTiers/index.js";
import { _getCommitmentTiersOperations } from "./classic/commitmentTiers/index.js";
import type { ComputeOperationsOperations } from "./classic/computeOperations/index.js";
import { _getComputeOperationsOperations } from "./classic/computeOperations/index.js";
import type { DefenderForAISettingsOperations } from "./classic/defenderForAISettings/index.js";
import { _getDefenderForAISettingsOperations } from "./classic/defenderForAISettings/index.js";
import type { DeletedAccountsOperations } from "./classic/deletedAccounts/index.js";
import { _getDeletedAccountsOperations } from "./classic/deletedAccounts/index.js";
import type { DeploymentsOperations } from "./classic/deployments/index.js";
import { _getDeploymentsOperations } from "./classic/deployments/index.js";
import type { EncryptionScopesOperations } from "./classic/encryptionScopes/index.js";
import { _getEncryptionScopesOperations } from "./classic/encryptionScopes/index.js";
import type { LocationBasedModelCapacitiesOperations } from "./classic/locationBasedModelCapacities/index.js";
import { _getLocationBasedModelCapacitiesOperations } from "./classic/locationBasedModelCapacities/index.js";
import type { ManagedNetworkProvisionsOperations } from "./classic/managedNetworkProvisions/index.js";
import { _getManagedNetworkProvisionsOperations } from "./classic/managedNetworkProvisions/index.js";
import type { ManagedNetworkSettingsOperations } from "./classic/managedNetworkSettings/index.js";
import { _getManagedNetworkSettingsOperations } from "./classic/managedNetworkSettings/index.js";
import type { ModelCapacitiesOperations } from "./classic/modelCapacities/index.js";
import { _getModelCapacitiesOperations } from "./classic/modelCapacities/index.js";
import type { ModelsOperations } from "./classic/models/index.js";
import { _getModelsOperations } from "./classic/models/index.js";
import type { NetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { _getNetworkSecurityPerimeterConfigurationsOperations } from "./classic/networkSecurityPerimeterConfigurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { OutboundRuleOperations } from "./classic/outboundRule/index.js";
import { _getOutboundRuleOperations } from "./classic/outboundRule/index.js";
import type { OutboundRulesOperations } from "./classic/outboundRules/index.js";
import { _getOutboundRulesOperations } from "./classic/outboundRules/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { ProjectCapabilityHostsOperations } from "./classic/projectCapabilityHosts/index.js";
import { _getProjectCapabilityHostsOperations } from "./classic/projectCapabilityHosts/index.js";
import type { ProjectConnectionsOperations } from "./classic/projectConnections/index.js";
import { _getProjectConnectionsOperations } from "./classic/projectConnections/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { QuotaTiersOperations } from "./classic/quotaTiers/index.js";
import { _getQuotaTiersOperations } from "./classic/quotaTiers/index.js";
import type { RaiBlocklistItemsOperations } from "./classic/raiBlocklistItems/index.js";
import { _getRaiBlocklistItemsOperations } from "./classic/raiBlocklistItems/index.js";
import type { RaiBlocklistsOperations } from "./classic/raiBlocklists/index.js";
import { _getRaiBlocklistsOperations } from "./classic/raiBlocklists/index.js";
import type { RaiContentFiltersOperations } from "./classic/raiContentFilters/index.js";
import { _getRaiContentFiltersOperations } from "./classic/raiContentFilters/index.js";
import type { RaiExternalSafetyProviderOperations } from "./classic/raiExternalSafetyProvider/index.js";
import { _getRaiExternalSafetyProviderOperations } from "./classic/raiExternalSafetyProvider/index.js";
import type { RaiExternalSafetyProvidersOperations } from "./classic/raiExternalSafetyProviders/index.js";
import { _getRaiExternalSafetyProvidersOperations } from "./classic/raiExternalSafetyProviders/index.js";
import type { RaiPoliciesOperations } from "./classic/raiPolicies/index.js";
import { _getRaiPoliciesOperations } from "./classic/raiPolicies/index.js";
import type { RaiToolLabelsOperations } from "./classic/raiToolLabels/index.js";
import { _getRaiToolLabelsOperations } from "./classic/raiToolLabels/index.js";
import type { RaiTopicsOperations } from "./classic/raiTopics/index.js";
import { _getRaiTopicsOperations } from "./classic/raiTopics/index.js";
import type { ResourceSkusOperations } from "./classic/resourceSkus/index.js";
import { _getResourceSkusOperations } from "./classic/resourceSkus/index.js";
import type { SubscriptionRaiPolicyOperations } from "./classic/subscriptionRaiPolicy/index.js";
import { _getSubscriptionRaiPolicyOperations } from "./classic/subscriptionRaiPolicy/index.js";
import type { TestRaiExternalSafetyProviderOperations } from "./classic/testRaiExternalSafetyProvider/index.js";
import { _getTestRaiExternalSafetyProviderOperations } from "./classic/testRaiExternalSafetyProvider/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type {
  SkuAvailabilityListResult,
  DomainAvailability,
  CalculateModelCapacityResult,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { CognitiveServicesManagementClientOptionalParams } from "./api/cognitiveServicesManagementContext.js";

export class CognitiveServicesManagementClient {
  private _client: CognitiveServicesManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Cognitive Services Management Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CognitiveServicesManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCognitiveServicesManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.modelCapacities = _getModelCapacitiesOperations(this._client);
    this.locationBasedModelCapacities = _getLocationBasedModelCapacitiesOperations(this._client);
    this.models = _getModelsOperations(this._client);
    this.commitmentTiers = _getCommitmentTiersOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.resourceSkus = _getResourceSkusOperations(this._client);
    this.agentDeployments = _getAgentDeploymentsOperations(this._client);
    this.managedNetworkProvisions = _getManagedNetworkProvisionsOperations(this._client);
    this.outboundRules = _getOutboundRulesOperations(this._client);
    this.managedNetworkSettings = _getManagedNetworkSettingsOperations(this._client);
    this.outboundRule = _getOutboundRuleOperations(this._client);
    this.accountCapabilityHosts = _getAccountCapabilityHostsOperations(this._client);
    this.accountConnections = _getAccountConnectionsOperations(this._client);
    this.raiExternalSafetyProviders = _getRaiExternalSafetyProvidersOperations(this._client);
    this.raiExternalSafetyProvider = _getRaiExternalSafetyProviderOperations(this._client);
    this.testRaiExternalSafetyProvider = _getTestRaiExternalSafetyProviderOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.computeOperations = _getComputeOperationsOperations(this._client);
    this.agentApplications = _getAgentApplicationsOperations(this._client);
    this.quotaTiers = _getQuotaTiersOperations(this._client);
    this.projectCapabilityHosts = _getProjectCapabilityHostsOperations(this._client);
    this.projectConnections = _getProjectConnectionsOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.defenderForAISettings = _getDefenderForAISettingsOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.raiContentFilters = _getRaiContentFiltersOperations(this._client);
    this.raiToolLabels = _getRaiToolLabelsOperations(this._client);
    this.raiTopics = _getRaiTopicsOperations(this._client);
    this.raiBlocklists = _getRaiBlocklistsOperations(this._client);
    this.raiBlocklistItems = _getRaiBlocklistItemsOperations(this._client);
    this.subscriptionRaiPolicy = _getSubscriptionRaiPolicyOperations(this._client);
    this.raiPolicies = _getRaiPoliciesOperations(this._client);
    this.encryptionScopes = _getEncryptionScopesOperations(this._client);
    this.commitmentPlans = _getCommitmentPlansOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.deletedAccounts = _getDeletedAccountsOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Model capacity calculator. */
  calculateModelCapacity(
    options: CalculateModelCapacityOptionalParams = { requestOptions: {} },
  ): Promise<CalculateModelCapacityResult> {
    return calculateModelCapacity(this._client, options);
  }

  /** Check whether a domain is available. */
  checkDomainAvailability(
    subdomainName: string,
    typeParam: string,
    options: CheckDomainAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<DomainAvailability> {
    return checkDomainAvailability(this._client, subdomainName, typeParam, options);
  }

  /** Check available SKUs. */
  checkSkuAvailability(
    location: string,
    skus: string[],
    typeParam: string,
    kind: string,
    options: CheckSkuAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<SkuAvailabilityListResult> {
    return checkSkuAvailability(this._client, location, skus, typeParam, kind, options);
  }

  /** The operation groups for modelCapacities */
  public readonly modelCapacities: ModelCapacitiesOperations;
  /** The operation groups for locationBasedModelCapacities */
  public readonly locationBasedModelCapacities: LocationBasedModelCapacitiesOperations;
  /** The operation groups for models */
  public readonly models: ModelsOperations;
  /** The operation groups for commitmentTiers */
  public readonly commitmentTiers: CommitmentTiersOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for resourceSkus */
  public readonly resourceSkus: ResourceSkusOperations;
  /** The operation groups for agentDeployments */
  public readonly agentDeployments: AgentDeploymentsOperations;
  /** The operation groups for managedNetworkProvisions */
  public readonly managedNetworkProvisions: ManagedNetworkProvisionsOperations;
  /** The operation groups for outboundRules */
  public readonly outboundRules: OutboundRulesOperations;
  /** The operation groups for managedNetworkSettings */
  public readonly managedNetworkSettings: ManagedNetworkSettingsOperations;
  /** The operation groups for outboundRule */
  public readonly outboundRule: OutboundRuleOperations;
  /** The operation groups for accountCapabilityHosts */
  public readonly accountCapabilityHosts: AccountCapabilityHostsOperations;
  /** The operation groups for accountConnections */
  public readonly accountConnections: AccountConnectionsOperations;
  /** The operation groups for raiExternalSafetyProviders */
  public readonly raiExternalSafetyProviders: RaiExternalSafetyProvidersOperations;
  /** The operation groups for raiExternalSafetyProvider */
  public readonly raiExternalSafetyProvider: RaiExternalSafetyProviderOperations;
  /** The operation groups for testRaiExternalSafetyProvider */
  public readonly testRaiExternalSafetyProvider: TestRaiExternalSafetyProviderOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for computeOperations */
  public readonly computeOperations: ComputeOperationsOperations;
  /** The operation groups for agentApplications */
  public readonly agentApplications: AgentApplicationsOperations;
  /** The operation groups for quotaTiers */
  public readonly quotaTiers: QuotaTiersOperations;
  /** The operation groups for projectCapabilityHosts */
  public readonly projectCapabilityHosts: ProjectCapabilityHostsOperations;
  /** The operation groups for projectConnections */
  public readonly projectConnections: ProjectConnectionsOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for defenderForAISettings */
  public readonly defenderForAISettings: DefenderForAISettingsOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for raiContentFilters */
  public readonly raiContentFilters: RaiContentFiltersOperations;
  /** The operation groups for raiToolLabels */
  public readonly raiToolLabels: RaiToolLabelsOperations;
  /** The operation groups for raiTopics */
  public readonly raiTopics: RaiTopicsOperations;
  /** The operation groups for raiBlocklists */
  public readonly raiBlocklists: RaiBlocklistsOperations;
  /** The operation groups for raiBlocklistItems */
  public readonly raiBlocklistItems: RaiBlocklistItemsOperations;
  /** The operation groups for subscriptionRaiPolicy */
  public readonly subscriptionRaiPolicy: SubscriptionRaiPolicyOperations;
  /** The operation groups for raiPolicies */
  public readonly raiPolicies: RaiPoliciesOperations;
  /** The operation groups for encryptionScopes */
  public readonly encryptionScopes: EncryptionScopesOperations;
  /** The operation groups for commitmentPlans */
  public readonly commitmentPlans: CommitmentPlansOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for deletedAccounts */
  public readonly deletedAccounts: DeletedAccountsOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
