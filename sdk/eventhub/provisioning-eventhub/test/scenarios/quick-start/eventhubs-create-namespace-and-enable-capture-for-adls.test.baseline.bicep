targetScope = 'resourceGroup'

resource namespace 'Microsoft.EventHub/namespaces@2026-01-01' = {
  name: 'quickadlsns'
  location: 'eastus'
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
}

resource eventhub 'Microsoft.EventHub/namespaces/eventhubs@2026-01-01' = {
  name: 'quick-adls-hub'
  parent: namespace
  properties: {
    captureDescription: {
      enabled: true
      skipEmptyArchives: false
      encoding: 'Avro'
      intervalInSeconds: 300
      sizeLimitInBytes: 314572800
      destination: {
        name: 'EventHubArchive.AzureDataLake'
        properties: {
          dataLakeSubscriptionId: '00000000-0000-0000-0000-000000000000'
          dataLakeAccountName: 'capturelake'
          dataLakeFolderPath: '/eventhub-captures'
          archiveNameFormat: '{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}'
        }
      }
    }
  }
}
