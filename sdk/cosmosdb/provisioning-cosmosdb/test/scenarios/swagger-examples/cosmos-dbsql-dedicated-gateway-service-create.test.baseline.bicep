targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource service 'Microsoft.DocumentDB/databaseAccounts/services@2026-03-15' = {
  name: 'SqlDedicatedGateway'
  parent: databaseAccount
  properties: {
    instanceSize: 'Cosmos.D4s'
    instanceCount: 1
    serviceType: 'SqlDedicatedGateway'
    dedicatedGatewayType: 'IntegratedCache'
  }
}

output resource1Id string = service.id
