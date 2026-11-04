targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' = {
  name: 'account'
  kind: 'AIServices'
  location: 'eastus'
  properties: {
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    name: 'S0'
  }
}

resource capabilityHost 'Microsoft.CognitiveServices/accounts/capabilityHosts@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    capabilityHostKind: 'Agents'
    enablePublicHostingEnvironment: true
  }
}

resource commitmentPlan 'Microsoft.CognitiveServices/accounts/commitmentPlans@2026-07-01' = {
  name: 'account'
  parent: account
  kind: 'AIServices'
  location: 'eastus'
  properties: {
    autoRenew: true
    hostingModel: 'ConnectedContainer'
  }
  sku: {
    name: 'S0'
  }
}

resource connection 'Microsoft.CognitiveServices/accounts/connections@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    authType: 'None'
    category: 'CustomKeys'
    target: 'https://example.invalid'
  }
}

resource raiPolicy 'Microsoft.CognitiveServices/accounts/raiPolicies@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    basePolicyName: 'Microsoft.Default'
    mode: 'Blocking'
  }
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' = {
  name: 'cognitive-project'
  parent: account
  identity: {
    type: 'SystemAssigned'
  }
  location: 'eastus'
  properties: {
    displayName: 'Cognitive Services project'
    description: 'Project coverage'
  }
}

resource application 'Microsoft.CognitiveServices/accounts/projects/applications@2026-07-01' = {
  name: 'agent-application'
  parent: project
  properties: {
    displayName: 'sample application'
    description: 'Cognitive Services application'
  }
}

resource agentDeployment 'Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments@2026-07-01' = {
  name: 'account'
  parent: application
  properties: {
    deploymentType: 'Hosted'
    displayName: 'sample deployment'
    maxReplicas: 1
    minReplicas: 1
  }
}

resource capabilityHost2 'Microsoft.CognitiveServices/accounts/projects/capabilityHosts@2026-07-01' = {
  name: 'account'
  parent: project
  properties: {
    aiServicesConnections: []
    storageConnections: []
  }
}

resource connection2 'Microsoft.CognitiveServices/accounts/projects/connections@2026-07-01' = {
  name: 'account'
  parent: project
  properties: {
    authType: 'None'
    category: 'CustomKeys'
    target: 'https://example.invalid'
  }
}

resource defenderForAISetting 'Microsoft.CognitiveServices/accounts/defenderForAISettings@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    state: 'Enabled'
  }
}

resource deploymentResource 'Microsoft.CognitiveServices/accounts/deployments@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: '2024-08-06'
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
  sku: {
    name: 'Standard'
    capacity: 1
  }
}

resource encryptionScope 'Microsoft.CognitiveServices/accounts/encryptionScopes@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    state: 'Enabled'
    keySource: 'Microsoft.CognitiveServices'
  }
}

resource managedNetwork 'Microsoft.CognitiveServices/accounts/managedNetworks@2026-07-01' = {
  name: 'default'
  parent: account
  properties: {
    managedNetwork: {
      isolationMode: 'AllowOnlyApprovedOutbound'
      firewallSku: 'Standard'
      managedNetworkKind: 'V1'
    }
  }
}

resource outboundRule 'Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules@2026-07-01' = {
  name: 'account'
  parent: managedNetwork
  properties: {
    type: 'FQDN'
    category: 'UserDefined'
    destination: 'destination.example.com'
  }
}

resource networkSecurityPerimeterConfiguration 'Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations@2026-07-01' existing = {
  name: 'account'
  parent: account
}

resource privateEndpointConnection 'Microsoft.CognitiveServices/accounts/privateEndpointConnections@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    privateLinkServiceConnectionState: {
      status: 'Approved'
      description: 'Approved for package coverage'
    }
  }
}

resource raiBlocklist 'Microsoft.CognitiveServices/accounts/raiBlocklists@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    description: 'Source-backed blocklist coverage'
  }
}

resource raiBlocklistItem 'Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems@2026-07-01' = {
  name: 'account'
  parent: raiBlocklist
  properties: {
    isRegex: true
    pattern: '^[a-z0-9_-]{2,16}$'
  }
}

resource testRaiExternalSafetyProvider 'Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    keyVaultUri: 'https://contoso-vault.vault.azure.net/'
    managedIdentity: 'f3b9c2e7-4aad-4b1f-9d9c-9e9b1e9b1f9b'
    mode: 'sync'
    providerId: '00000000-0000-0000-0000-000000000000'
    providerName: 'safetyProviderName'
    secretName: 'safety-provider-secret'
    url: 'https://example-safety-provider.contoso.com/webhook'
  }
}

resource raiToolLabel 'Microsoft.CognitiveServices/accounts/raiToolLabels@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    toolConnectionName: 'Web_Search'
  }
}

resource raitopic 'Microsoft.CognitiveServices/accounts/raitopics@2026-07-01' = {
  name: 'account'
  parent: account
  properties: {
    description: 'Cognitive Services RAI topic'
    topicName: 'RAI topic'
  }
}
