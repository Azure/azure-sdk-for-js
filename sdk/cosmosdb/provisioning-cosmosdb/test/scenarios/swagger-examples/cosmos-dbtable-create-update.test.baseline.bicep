targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource table 'Microsoft.DocumentDB/databaseAccounts/tables@2026-03-15' = {
  name: 'tableName'
  parent: databaseAccount
  location: 'West US'
  properties: {
    resource: {
      id: 'tableName'
    }
    options: {}
  }
  tags: {}
}

output resource1Id string = table.id
