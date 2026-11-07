targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' = {
  name: 'sqldatabase-test'
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

output resource1Id string = sqlDatabase.id
