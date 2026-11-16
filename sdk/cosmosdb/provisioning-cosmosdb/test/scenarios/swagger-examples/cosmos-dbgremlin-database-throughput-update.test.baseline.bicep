targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' existing = {
  name: 'gremlindatabase-test'
  parent: databaseAccount
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: gremlinDatabase
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource2Id string = throughputSetting.id
