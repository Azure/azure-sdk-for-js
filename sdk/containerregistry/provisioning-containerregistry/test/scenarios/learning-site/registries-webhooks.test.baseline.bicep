targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest07'
  location: 'eastus'
  properties: {
    adminUserEnabled: false
    anonymousPullEnabled: false
    dataEndpointEnabled: false
    encryption: {
      status: 'disabled'
    }
    networkRuleBypassOptions: 'AzureServices'
    policies: {
      exportPolicy: {
        status: 'enabled'
      }
      quarantinePolicy: {
        status: 'disabled'
      }
      retentionPolicy: {
        status: 'disabled'
      }
      trustPolicy: {
        status: 'disabled'
      }
    }
    publicNetworkAccess: 'Enabled'
    zoneRedundancy: 'Disabled'
  }
  sku: {
    name: 'Standard'
  }
}

resource webhook 'Microsoft.ContainerRegistry/registries/webhooks@2025-11-01' = {
  name: 'webhook01'
  parent: registry
  location: 'eastus'
  properties: {
    actions: [
      'push'
    ]
    customHeaders: {}
    scope: ''
    serviceUri: 'https://mywebhookreceiver.example/mytag'
    status: 'enabled'
  }
}
