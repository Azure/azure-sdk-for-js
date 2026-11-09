targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' existing = {
  name: 'gremlindatabase-test'
  parent: databaseAccount
}

resource graph 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs@2026-03-15' existing = {
  name: 'graph-test'
  parent: gremlinDatabase
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: graph
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource3Id string = throughputSetting.id
