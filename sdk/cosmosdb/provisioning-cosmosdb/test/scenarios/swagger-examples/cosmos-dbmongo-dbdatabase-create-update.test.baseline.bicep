targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' = {
  name: 'mongodbdatabase-test'
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

output resource1Id string = mongodbDatabase.id
