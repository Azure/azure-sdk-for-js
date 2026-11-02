targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest03'
  location: 'eastus'
  properties: {
    adminUserEnabled: false
    anonymousPullEnabled: false
    dataEndpointEnabled: false
    networkRuleBypassOptions: 'AzureServices'
    policies: {
      exportPolicy: {
        status: 'enabled'
      }
      quarantinePolicy: {
        status: 'disabled'
      }
      retentionPolicy: {}
      trustPolicy: {}
    }
    publicNetworkAccess: 'Enabled'
    zoneRedundancy: 'Disabled'
  }
  sku: {
    name: 'Basic'
  }
}

resource credentialSet 'Microsoft.ContainerRegistry/registries/credentialSets@2025-11-01' = {
  name: 'credset01'
  parent: registry
  properties: {
    authCredentials: [
      {
        name: 'Credential1'
        passwordSecretIdentifier: 'https://crtest03vault.vault.azure.net/secrets/password'
        usernameSecretIdentifier: 'https://crtest03vault.vault.azure.net/secrets/username'
      }
    ]
    loginServer: 'docker.io'
  }
}
