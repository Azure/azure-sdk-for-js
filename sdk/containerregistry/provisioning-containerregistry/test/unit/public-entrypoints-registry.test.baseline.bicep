targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest08'
  identity: {
    type: 'SystemAssigned'
  }
  location: 'eastus'
  properties: {
    adminUserEnabled: false
    anonymousPullEnabled: false
    dataEndpointEnabled: true
    publicNetworkAccess: 'Enabled'
    networkRuleBypassOptions: 'AzureServices'
    networkRuleBypassAllowedForTasks: false
    networkRuleSet: {
      defaultAction: 'Allow'
      ipRules: [
        {
          action: 'Allow'
          value: '10.0.0.0/24'
        }
      ]
    }
    policies: {
      exportPolicy: {
        status: 'enabled'
      }
      quarantinePolicy: {
        status: 'disabled'
      }
      retentionPolicy: {
        days: 7
        status: 'enabled'
      }
      trustPolicy: {
        type: 'Notary'
        status: 'disabled'
      }
      azureADAuthenticationAsArmPolicy: {
        status: 'enabled'
      }
    }
    roleAssignmentMode: 'LegacyRegistryPermissions'
    zoneRedundancy: 'Disabled'
  }
  sku: {
    name: 'Premium'
  }
  tags: {
    scenario: 'public-entrypoints'
  }
}

resource cacheRule 'Microsoft.ContainerRegistry/registries/cacheRules@2025-11-01' = {
  name: 'cache01'
  parent: registry
  properties: {
    credentialSetResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.ContainerRegistry/registries/crtest08/credentialSets/credset01'
    sourceRepository: 'docker.io/library/hello-world'
    targetRepository: 'hello-world'
  }
}

resource credentialSet 'Microsoft.ContainerRegistry/registries/credentialSets@2025-11-01' = {
  name: 'credset01'
  parent: registry
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    loginServer: 'docker.io'
    authCredentials: [
      {
        name: 'Credential1'
        usernameSecretIdentifier: 'https://crtest08vault.vault.azure.net/secrets/username'
        passwordSecretIdentifier: 'https://crtest08vault.vault.azure.net/secrets/password'
      }
    ]
  }
}

resource scopeMap 'Microsoft.ContainerRegistry/registries/scopeMaps@2025-11-01' = {
  name: 'scope01'
  parent: registry
  properties: {
    description: 'Scope map for public entrypoint coverage.'
    actions: [
      'repositories/hello-world/content/read'
      'repositories/hello-world/metadata/read'
    ]
  }
}

resource token 'Microsoft.ContainerRegistry/registries/tokens@2025-11-01' = {
  name: 'token01'
  parent: registry
  properties: {
    scopeMapId: scopeMap.id
    status: 'enabled'
    credentials: {
      certificates: [
        {
          name: 'certificate1'
          encodedPemCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t'
        }
      ]
      passwords: [
        {
          name: 'password1'
          expiry: '2027-01-01T00:00:00.000Z'
        }
      ]
    }
  }
}

resource connectedRegistry 'Microsoft.ContainerRegistry/registries/connectedRegistries@2025-11-01' = {
  name: 'connected02'
  parent: registry
  properties: {
    mode: 'ReadOnly'
    clientTokenIds: [
      token.id
    ]
    notificationsList: [
      'hello-world:*'
    ]
    logging: {
      auditLogStatus: 'Enabled'
      logLevel: 'Information'
    }
    garbageCollection: {
      enabled: true
      schedule: '0 0 * * *'
    }
    parent: {
      id: registry.id
      syncProperties: {
        tokenId: token.id
        schedule: '0 0 * * *'
        syncWindow: 'PT3H'
        messageTtl: 'P1D'
      }
    }
  }
}

resource privateLinkResource 'Microsoft.ContainerRegistry/registries/privateLinkResources@2025-11-01' existing = {
  name: 'registry'
  parent: registry
}

resource privateEndpointConnection 'Microsoft.ContainerRegistry/registries/privateEndpointConnections@2025-11-01' = {
  name: 'pec02'
  parent: registry
  properties: {
    privateEndpoint: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Network/privateEndpoints/pe02'
    }
    privateLinkServiceConnectionState: {
      status: 'Pending'
      description: 'Pending private endpoint connection.'
      actionsRequired: 'None'
    }
  }
}

resource replication 'Microsoft.ContainerRegistry/registries/replications@2025-11-01' = {
  name: 'westus'
  parent: registry
  location: 'westus'
  properties: {
    regionEndpointEnabled: true
    zoneRedundancy: 'Disabled'
  }
  tags: {
    scenario: 'public-entrypoints'
  }
}

resource webhook 'Microsoft.ContainerRegistry/registries/webhooks@2025-11-01' = {
  name: 'webhook02'
  parent: registry
  location: 'eastus'
  properties: {
    actions: [
      'push'
      'delete'
    ]
    customHeaders: {
      'X-Test': 'containerregistry'
    }
    scope: 'hello-world:*'
    serviceUri: 'https://webhook.example/notify'
    status: 'enabled'
  }
  tags: {
    scenario: 'public-entrypoints'
  }
}
