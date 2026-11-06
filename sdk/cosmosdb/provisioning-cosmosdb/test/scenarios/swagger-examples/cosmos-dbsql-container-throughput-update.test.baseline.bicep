targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' existing = {
  name: 'sqldatabase-test'
  parent: databaseAccount
}

resource container 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2026-03-15' existing = {
  name: 'container-test'
  parent: sqlDatabase
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: container
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource3Id string = throughputSetting.id
