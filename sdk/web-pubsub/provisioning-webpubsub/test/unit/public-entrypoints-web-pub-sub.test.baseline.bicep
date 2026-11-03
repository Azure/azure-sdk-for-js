targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' = {
  name: 'wps-public-api'
  location: 'eastus'
  properties: {
    disableAadAuth: false
    disableLocalAuth: false
    publicNetworkAccess: 'Enabled'
    tls: {
      clientCertEnabled: false
    }
  }
  sku: {
    capacity: 1
    name: 'Standard_S1'
    tier: 'Standard'
  }
}

resource customCertificate 'Microsoft.SignalRService/webPubSub/customCertificates@2025-12-01-preview' = {
  name: 'public-cert'
  parent: webPubSub
  properties: {
    keyVaultBaseUri: 'https://public-vault.vault.azure.net/'
    keyVaultSecretName: 'public-cert'
  }
}

resource customDomain 'Microsoft.SignalRService/webPubSub/customDomains@2025-12-01-preview' = {
  name: 'public-domain'
  parent: webPubSub
  properties: {
    customCertificate: {
      id: customCertificate.id
    }
    domainName: 'public.example.com'
  }
}

resource hub 'Microsoft.SignalRService/webPubSub/hubs@2025-12-01-preview' = {
  name: 'public-hub'
  parent: webPubSub
  properties: {
    anonymousConnectPolicy: 'deny'
    eventListeners: []
  }
}

resource persistentStorage 'Microsoft.SignalRService/webPubSub/persistentStorages@2025-12-01-preview' = {
  name: 'public-storage'
  parent: webPubSub
  properties: {
    storageAccount: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/publicstorage'
    }
  }
}

resource privateEndpointConnection 'Microsoft.SignalRService/webPubSub/privateEndpointConnections@2025-12-01-preview' = {
  name: 'public-pec'
  parent: webPubSub
  properties: {
    privateLinkServiceConnectionState: {
      description: 'Public entrypoint coverage'
      status: 'Approved'
    }
  }
}

resource replica 'Microsoft.SignalRService/webPubSub/replicas@2025-12-01-preview' = {
  name: 'public-replica'
  parent: webPubSub
  location: 'westus'
  properties: {
    regionEndpointEnabled: 'Enabled'
  }
  sku: {
    capacity: 1
    name: 'Standard_S1'
  }
}

resource sharedPrivateLinkResource 'Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources@2025-12-01-preview' = {
  name: 'public-replica-link'
  parent: replica
  properties: {
    groupId: 'sites'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Web/sites/public-app'
  }
}

resource sharedPrivateLinkResource2 'Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources@2025-12-01-preview' = {
  name: 'public-link'
  parent: webPubSub
  properties: {
    groupId: 'vault'
    privateLinkResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.KeyVault/vaults/public-vault'
  }
}
