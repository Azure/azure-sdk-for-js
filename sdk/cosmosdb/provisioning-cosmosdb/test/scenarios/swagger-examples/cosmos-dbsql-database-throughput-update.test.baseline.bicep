targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' existing = {
  name: 'sqldatabase-test'
  parent: databaseAccount
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: sqlDatabase
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource2Id string = throughputSetting.id
