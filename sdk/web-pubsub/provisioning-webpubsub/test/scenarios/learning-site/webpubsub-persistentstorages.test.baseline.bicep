targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'wps-learn-storage'
}

resource persistentStorage 'Microsoft.SignalRService/webPubSub/persistentStorages@2025-12-01-preview' = {
  name: 'learn-storage'
  parent: webPubSub
  properties: {
    storageAccount: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/learnstorage'
    }
  }
}
