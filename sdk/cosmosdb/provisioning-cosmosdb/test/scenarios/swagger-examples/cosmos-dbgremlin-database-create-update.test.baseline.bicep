targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' = {
  name: 'gremlindatabase-test'
  parent: databaseAccount
  location: 'West US'
  properties: {
    resource: {
      id: 'databaseName'
    }
    options: {}
  }
  tags: {}
}

output resource1Id string = gremlinDatabase.id
