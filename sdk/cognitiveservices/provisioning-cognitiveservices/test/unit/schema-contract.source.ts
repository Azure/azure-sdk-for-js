// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-cognitiveservices.
 * provisioning API: @azure/provisioning-cognitiveservices/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AccountPropertiesInput,
  AgentReferencePropertiesInput,
  AgenticApplicationPropertiesInput,
  ApiPropertiesInput,
  ApplicationTrafficRoutingPolicyInput,
  AssignedIdentityInput,
  CapabilityHostPropertiesInput,
  CommitmentPeriodInput,
  CommitmentPlanAccountAssociationPropertiesInput,
  CommitmentPlanPropertiesInput,
  CustomBlocklistConfigInput,
  DeploymentCapacitySettingsInput,
  DeploymentModelInput,
  DeploymentPropertiesInput,
  DeploymentRoutingInput,
  DeploymentScaleSettingsInput,
  EncryptionInput,
  EncryptionScopePropertiesInput,
  IpRuleInput,
  KeyVaultPropertiesInput,
  ManagedNetworkProvisionStatusInput,
  ManagedNetworkSettingsExInput,
  MultiRegionSettingsInput,
  NetworkInjectionInput,
  NetworkRuleSetInput,
  PrivateLinkServiceConnectionStateInput,
  ProjectCapabilityHostPropertiesInput,
  ProjectPropertiesInput,
  QuotaTierPropertiesInput,
  RaiBlocklistItemPropertiesInput,
  RaiBlocklistPropertiesInput,
  RaiExternalSafetyProviderSchemaPropertiesInput,
  RaiMonitorConfigInput,
  RaiPolicyContentFilterInput,
  RaiPolicyPropertiesInput,
  RaiToolLabelPropertiesInput,
  RaiTopicPropertiesInput,
  RegionSettingInput,
  SafetyProviderConfigInput,
  SkuInput,
  TrafficRoutingRuleInput,
  UserOwnedAmlWorkspaceInput,
  UserOwnedStorageInput,
  VirtualNetworkRuleInput,
} from "@azure/provisioning-cognitiveservices/types";

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> AccountPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const accountPropertiesAccounts6694e339ccd5b9f53602FromBicep: AccountPropertiesInput = {
  allowedFqdnList: [],
  allowProjectManagement: true,
  associatedProjects: [],
  customSubDomainName: "string",
  defaultProject: "string",
  disableLocalAuth: true,
  dynamicThrottlingEnabled: true,
  migrationToken: "string",
  networkInjections: [],
  publicNetworkAccess: "Disabled",
  restore: true,
  restrictOutboundNetworkAccess: true,
  storedCompletionsDisabled: true,
  userOwnedStorage: [],
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/applications -> AgentReferencePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/applications?pivots=deployment-language-bicep
export const agentReferencePropertiesAccountsProjectsApplications687edf6618b0f357e100FromBicep: AgentReferencePropertiesInput =
  {
    agentId: "string",
    agentName: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/applications -> AgenticApplicationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/applications?pivots=deployment-language-bicep
export const agenticApplicationPropertiesAccountsProjectsApplications687edf6618783994942cFromBicep: AgenticApplicationPropertiesInput =
  {
    agents: [],
    baseUrl: "string",
    description: "string",
    displayName: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> ApiPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const apiPropertiesAccounts6694e339ccd21dfac8b3FromBicep: ApiPropertiesInput = {
  aadClientId: "string",
  aadTenantId: "string",
  eventHubConnectionString: "string",
  qnaAzureSearchEndpointId: "string",
  qnaAzureSearchEndpointKey: "string",
  qnaRuntimeEndpoint: "string",
  statisticsEnabled: true,
  storageAccountConnectionString: "string",
  superUser: "string",
  websiteName: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/applications -> ApplicationTrafficRoutingPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/applications?pivots=deployment-language-bicep
export const applicationTrafficRoutingPolicyAccountsProjectsApplications687edf66186c6545fb8bFromBicep: ApplicationTrafficRoutingPolicyInput =
  {
    protocol: "FixedRatio",
    rules: [],
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/applications -> AssignedIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/applications?pivots=deployment-language-bicep
export const assignedIdentityAccountsProjectsApplications687edf66188bbe18769bFromBicep: AssignedIdentityInput =
  {
    clientId: "string",
    kind: "AgentBlueprint",
    principalId: "string",
    subject: "string",
    tenantId: "string",
    type: "None",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/capabilityHosts -> CapabilityHostPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/capabilityhosts?pivots=deployment-language-bicep
export const capabilityHostPropertiesAccountsCapabilityhosts030c99d218d9a9640224FromBicep: CapabilityHostPropertiesInput =
  {
    aiServicesConnections: [],
    capabilityHostKind: "Agents",
    customerSubnet: "string",
    description: "string",
    enablePublicHostingEnvironment: true,
    storageConnections: [],
    threadStorageConnections: [],
    vectorStoreConnections: [],
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/commitmentPlans -> CommitmentPeriodInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/commitmentplans?pivots=deployment-language-bicep
export const commitmentPeriodAccountsCommitmentplansd1ce7110be0c30360c6cFromBicep: CommitmentPeriodInput =
  {
    count: 0,
    tier: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/commitmentPlans -> CommitmentPeriodInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/commitmentplans?pivots=deployment-language-bicep
export const commitmentPeriodCommitmentplansfd2c7f462068563435cfFromBicep: CommitmentPeriodInput = {
  count: 0,
  tier: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/commitmentPlans/accountAssociations -> CommitmentPlanAccountAssociationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/commitmentplans/accountassociations?pivots=deployment-language-bicep
export const commitmentPlanAccountAssociationPropertiesCommitmentplansAccountassociations06b1dd7361208f29aa10FromBicep: CommitmentPlanAccountAssociationPropertiesInput =
  {
    accountId: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/commitmentPlans -> CommitmentPlanPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/commitmentplans?pivots=deployment-language-bicep
export const commitmentPlanPropertiesAccountsCommitmentplansd1ce7110beb69cb9a6ebFromBicep: CommitmentPlanPropertiesInput =
  {
    autoRenew: true,
    commitmentPlanGuid: "string",
    hostingModel: "ConnectedContainer",
    planType: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/commitmentPlans -> CommitmentPlanPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/commitmentplans?pivots=deployment-language-bicep
export const commitmentPlanPropertiesCommitmentplansfd2c7f4620624f233735FromBicep: CommitmentPlanPropertiesInput =
  {
    autoRenew: true,
    commitmentPlanGuid: "string",
    hostingModel: "ConnectedContainer",
    planType: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiPolicies -> CustomBlocklistConfigInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raipolicies?pivots=deployment-language-bicep
export const customBlocklistConfigAccountsRaipolicies9a07f982931621011e87FromBicep: CustomBlocklistConfigInput =
  {
    blocking: true,
    blocklistName: "string",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/raiPolicy -> CustomBlocklistConfigInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/raipolicy?pivots=deployment-language-bicep
export const customBlocklistConfigRaipolicy728f52b272a7de392a6aFromBicep: CustomBlocklistConfigInput =
  {
    blocking: true,
    blocklistName: "string",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> DeploymentCapacitySettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const deploymentCapacitySettingsAccountsDeployments5d5a67af67e1c752817cFromBicep: DeploymentCapacitySettingsInput =
  {
    designatedCapacity: 0,
    priority: 0,
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> DeploymentModelInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const deploymentModelAccountsDeployments5d5a67af6744a0b2f6c8FromBicep: DeploymentModelInput =
  {
    format: "string",
    name: "string",
    publisher: "string",
    source: "string",
    sourceAccount: "string",
    version: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> DeploymentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const deploymentPropertiesAccountsDeployments5d5a67af674315a934b0FromBicep: DeploymentPropertiesInput =
  {
    currentCapacity: 0,
    deploymentState: "Paused",
    parentDeploymentName: "string",
    raiPolicyName: "string",
    serviceTier: "Default",
    spilloverDeploymentName: "string",
    versionUpgradeOption: "NoAutoUpgrade",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> DeploymentRoutingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const deploymentRoutingAccountsDeployments5d5a67af671146bde842FromBicep: DeploymentRoutingInput =
  {
    mode: "balanced",
    models: [],
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> DeploymentScaleSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const deploymentScaleSettingsAccountsDeployments5d5a67af67e8521654e8FromBicep: DeploymentScaleSettingsInput =
  {
    capacity: 0,
    scaleType: "Manual",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> EncryptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const encryptionAccounts6694e339ccb92937a1b3FromBicep: EncryptionInput = {
  keySource: "Microsoft.CognitiveServices",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/encryptionScopes -> EncryptionScopePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/encryptionscopes?pivots=deployment-language-bicep
export const encryptionScopePropertiesAccountsEncryptionscopes03e71e2c227516723c39FromBicep: EncryptionScopePropertiesInput =
  {
    keySource: "Microsoft.CognitiveServices",
    state: "Disabled",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> IpRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const ipRuleAccounts6694e339cc5617a936b1FromBicep: IpRuleInput = {
  value: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> KeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const keyVaultPropertiesAccounts6694e339ccf3ad57652aFromBicep: KeyVaultPropertiesInput = {
  identityClientId: "string",
  keyName: "string",
  keyVaultUri: "string",
  keyVersion: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/encryptionScopes -> KeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/encryptionscopes?pivots=deployment-language-bicep
export const keyVaultPropertiesAccountsEncryptionscopes03e71e2c22478a9ece02FromBicep: KeyVaultPropertiesInput =
  {
    identityClientId: "string",
    keyName: "string",
    keyVaultUri: "string",
    keyVersion: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/managedNetworks -> ManagedNetworkProvisionStatusInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/managednetworks?pivots=deployment-language-bicep
export const managedNetworkProvisionStatusAccountsManagednetworks4e77616382cc6657fbfbFromBicep: ManagedNetworkProvisionStatusInput =
  {
    status: "Active",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/managedNetworks -> ManagedNetworkSettingsExInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/managednetworks?pivots=deployment-language-bicep
export const managedNetworkSettingsExAccountsManagednetworks4e77616382ca4233e1c0FromBicep: ManagedNetworkSettingsExInput =
  {
    firewallSku: "Basic",
    isolationMode: "AllowInternetOutbound",
    managedNetworkKind: "V1",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> MultiRegionSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const multiRegionSettingsAccounts6694e339cca9fd1b4b30FromBicep: MultiRegionSettingsInput = {
  regions: [],
  routingMethod: "Performance",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> NetworkInjectionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const networkInjectionAccounts6694e339cc3f5a07be76FromBicep: NetworkInjectionInput = {
  scenario: "agent",
  subnetArmId: "string",
  useMicrosoftManagedNetwork: true,
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> NetworkRuleSetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const networkRuleSetAccounts6694e339ccba5c0cd108FromBicep: NetworkRuleSetInput = {
  bypass: "AzureServices",
  defaultAction: "Allow",
  ipRules: [],
  virtualNetworkRules: [],
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/privateEndpointConnections -> PrivateLinkServiceConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/privateendpointconnections?pivots=deployment-language-bicep
export const privateLinkServiceConnectionStateAccountsPrivateendpointconnections6e93600570f20f1de86cFromBicep: PrivateLinkServiceConnectionStateInput =
  {
    actionsRequired: "string",
    description: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/capabilityHosts -> ProjectCapabilityHostPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/capabilityhosts?pivots=deployment-language-bicep
export const projectCapabilityHostPropertiesAccountsProjectsCapabilityhostsa7c1445c0cf4a4c5d099FromBicep: ProjectCapabilityHostPropertiesInput =
  {
    aiServicesConnections: [],
    storageConnections: [],
    threadStorageConnections: [],
    vectorStoreConnections: [],
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects -> ProjectPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects?pivots=deployment-language-bicep
export const projectPropertiesAccountsProjects61954e09b8c5d175f622FromBicep: ProjectPropertiesInput =
  {
    description: "string",
    displayName: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/quotaTiers -> QuotaTierPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/quotatiers?pivots=deployment-language-bicep
export const quotaTierPropertiesQuotatiersae05d54589ab30b7c6aaFromBicep: QuotaTierPropertiesInput =
  {
    tierUpgradePolicy: "NoAutoUpgrade",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems -> RaiBlocklistItemPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raiblocklists/raiblocklistitems?pivots=deployment-language-bicep
export const raiBlocklistItemPropertiesAccountsRaiblocklistsRaiblocklistitems24201394a41ee23a8fb8FromBicep: RaiBlocklistItemPropertiesInput =
  {
    isRegex: true,
    pattern: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiBlocklists -> RaiBlocklistPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raiblocklists?pivots=deployment-language-bicep
export const raiBlocklistPropertiesAccountsRaiblocklistsd18c194dc5928b3f7535FromBicep: RaiBlocklistPropertiesInput =
  {
    description: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider -> RaiExternalSafetyProviderSchemaPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/testraiexternalsafetyprovider?pivots=deployment-language-bicep
export const raiExternalSafetyProviderSchemaPropertiesAccountsTestraiexternalsafetyproviderb8dfe1e8efb4bf67752fFromBicep: RaiExternalSafetyProviderSchemaPropertiesInput =
  {
    keyVaultUri: "string",
    managedIdentity: "string",
    mode: "string",
    providerId: "string",
    providerName: "string",
    secretName: "string",
    url: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/raiExternalSafetyProviders -> RaiExternalSafetyProviderSchemaPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/raiexternalsafetyproviders?pivots=deployment-language-bicep
export const raiExternalSafetyProviderSchemaPropertiesRaiexternalsafetyproviders3f5fcbf31782d37e612fFromBicep: RaiExternalSafetyProviderSchemaPropertiesInput =
  {
    keyVaultUri: "string",
    managedIdentity: "string",
    mode: "string",
    providerId: "string",
    providerName: "string",
    secretName: "string",
    url: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> RaiMonitorConfigInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const raiMonitorConfigAccounts6694e339cc235f5b0e42FromBicep: RaiMonitorConfigInput = {
  adxStorageResourceId: "string",
  identityClientId: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiPolicies -> RaiPolicyContentFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raipolicies?pivots=deployment-language-bicep
export const raiPolicyContentFilterAccountsRaipolicies9a07f98293c53dc24d59FromBicep: RaiPolicyContentFilterInput =
  {
    action: "ANNOTATING",
    blocking: true,
    enabled: true,
    name: "string",
    severityThreshold: "High",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/raiPolicy -> RaiPolicyContentFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/raipolicy?pivots=deployment-language-bicep
export const raiPolicyContentFilterRaipolicy728f52b27284bbc81241FromBicep: RaiPolicyContentFilterInput =
  {
    action: "ANNOTATING",
    blocking: true,
    enabled: true,
    name: "string",
    severityThreshold: "High",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiPolicies -> RaiPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raipolicies?pivots=deployment-language-bicep
export const raiPolicyPropertiesAccountsRaipolicies9a07f982933b34f6fa30FromBicep: RaiPolicyPropertiesInput =
  {
    basePolicyName: "string",
    contentFilters: [],
    customBlocklists: [],
    mode: "Asynchronous_filter",
    safetyProviders: [],
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/raiPolicy -> RaiPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/raipolicy?pivots=deployment-language-bicep
export const raiPolicyPropertiesRaipolicy728f52b2724e50cfc34aFromBicep: RaiPolicyPropertiesInput = {
  basePolicyName: "string",
  contentFilters: [],
  customBlocklists: [],
  mode: "Asynchronous_filter",
  safetyProviders: [],
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiToolLabels -> RaiToolLabelPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raitoollabels?pivots=deployment-language-bicep
export const raiToolLabelPropertiesAccountsRaitoollabelsbc9da5c28113331dcfeeFromBicep: RaiToolLabelPropertiesInput =
  {
    projectScopes: [],
    toolConnectionName: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raitopics -> RaiTopicPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raitopics?pivots=deployment-language-bicep
export const raiTopicPropertiesAccountsRaitopics620fea83b4dd8e8392eaFromBicep: RaiTopicPropertiesInput =
  {
    description: "string",
    failedReason: "string",
    sampleBlobUrl: "string",
    status: "string",
    topicId: "string",
    topicName: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> RegionSettingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const regionSettingAccounts6694e339cc9c985b5437FromBicep: RegionSettingInput = {
  customsubdomain: "string",
  name: "string",
  value: 0,
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/raiPolicies -> SafetyProviderConfigInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/raipolicies?pivots=deployment-language-bicep
export const safetyProviderConfigAccountsRaipolicies9a07f98293c8a42df61dFromBicep: SafetyProviderConfigInput =
  {
    blocking: true,
    safetyProviderName: "string",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/raiPolicy -> SafetyProviderConfigInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/raipolicy?pivots=deployment-language-bicep
export const safetyProviderConfigRaipolicy728f52b2721b978e0138FromBicep: SafetyProviderConfigInput =
  {
    blocking: true,
    safetyProviderName: "string",
    source: "Completion",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const skuAccounts6694e339ccbdbc6db359FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/commitmentPlans -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/commitmentplans?pivots=deployment-language-bicep
export const skuAccountsCommitmentplansd1ce7110be93fc031335FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/deployments -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/deployments?pivots=deployment-language-bicep
export const skuAccountsDeployments5d5a67af67925c8170d0FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/commitmentPlans -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/commitmentplans?pivots=deployment-language-bicep
export const skuCommitmentplansfd2c7f4620d3832c9262FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts/projects/applications -> TrafficRoutingRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts/projects/applications?pivots=deployment-language-bicep
export const trafficRoutingRuleAccountsProjectsApplications687edf6618f9affb0f2cFromBicep: TrafficRoutingRuleInput =
  {
    deploymentId: "string",
    description: "string",
    ruleId: "string",
    trafficPercentage: 0,
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> UserOwnedAmlWorkspaceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const userOwnedAmlWorkspaceAccounts6694e339cc559158da54FromBicep: UserOwnedAmlWorkspaceInput =
  {
    identityClientId: "string",
    resourceId: "string",
  };

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> UserOwnedStorageInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const userOwnedStorageAccounts6694e339cc45f2e13768FromBicep: UserOwnedStorageInput = {
  identityClientId: "string",
  resourceId: "string",
};

// Accepted Bicep contract: Microsoft.CognitiveServices/accounts -> VirtualNetworkRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.cognitiveservices/2026-07-01/accounts?pivots=deployment-language-bicep
export const virtualNetworkRuleAccounts6694e339ccbd80f652fdFromBicep: VirtualNetworkRuleInput = {
  id: "string",
  ignoreMissingVnetServiceEndpoint: true,
  state: "string",
};
