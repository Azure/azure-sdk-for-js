targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickcapturens'
  location: 'eastus'
  properties: {
    isAutoInflateEnabled: true
    maximumThroughputUnits: 10
  }
  sku: {
    name: 'Standard'
    tier: 'Standard'
    capacity: 1
  }
  tags: {
    tag1: 'value1'
    tag2: 'value2'
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'quick-capture-hub'
  parent: namespace
  properties: {
    messageRetentionInDays: 1
    partitionCount: 4
    captureDescription: {
      enabled: true
      skipEmptyArchives: false
      encoding: 'Avro'
      intervalInSeconds: 300
      sizeLimitInBytes: 314572800
      destination: {
        name: 'EventHubArchive.AzureBlockBlob'
        properties: {
          storageAccountResourceId: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/capturestore'
          blobContainer: 'captures'
          archiveNameFormat: '{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}'
        }
      }
    }
  }
}
