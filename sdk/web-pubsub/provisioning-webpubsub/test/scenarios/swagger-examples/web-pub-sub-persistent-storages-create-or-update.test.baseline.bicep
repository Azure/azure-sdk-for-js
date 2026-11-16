targetScope = 'resourceGroup'

resource webPubSub 'Microsoft.SignalRService/webPubSub@2025-12-01-preview' existing = {
  name: 'myWebPubSubService'
}

resource persistentStorage 'Microsoft.SignalRService/webPubSub/persistentStorages@2025-12-01-preview' = {
  name: 'myStor'
  parent: webPubSub
  properties: {
    storageAccount: {
      id: '/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount'
    }
  }
}
