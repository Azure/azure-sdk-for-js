targetScope = 'resourceGroup'

resource registry 'Microsoft.ContainerRegistry/registries@2025-11-01' = {
  name: 'crtest02'
  location: 'eastus'
  properties: {
    adminUserEnabled: false
    anonymousPullEnabled: false
    dataEndpointEnabled: true
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
    name: 'Premium'
  }
}

resource scopeMap 'Microsoft.ContainerRegistry/registries/scopeMaps@2025-11-01' = {
  name: 'scopemap01'
  parent: registry
  properties: {
    actions: [
      'repositories/hello-world/content/delete'
      'repositories/hello-world/content/read'
      'repositories/hello-world/content/write'
      'repositories/hello-world/metadata/read'
      'repositories/hello-world/metadata/write'
      'gateway/connected01/config/read'
      'gateway/connected01/config/write'
      'gateway/connected01/message/read'
      'gateway/connected01/message/write'
    ]
    description: ''
  }
}

resource token 'Microsoft.ContainerRegistry/registries/tokens@2025-11-01' = {
  name: 'token01'
  parent: registry
  properties: {
    scopeMapId: scopeMap.id
    status: 'enabled'
  }
}

resource connectedRegistry 'Microsoft.ContainerRegistry/registries/connectedRegistries@2025-11-01' = {
  name: 'connected01'
  parent: registry
  properties: {
    logging: {
      auditLogStatus: 'Disabled'
      logLevel: 'None'
    }
    mode: 'ReadWrite'
    parent: {
      syncProperties: {
        messageTtl: 'P1D'
        schedule: '* * * * *'
        syncWindow: 'PT0S'
        tokenId: token.id
      }
    }
  }
}
