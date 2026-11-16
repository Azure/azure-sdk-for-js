targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' existing = {
  name: 'mongodbdatabase-test'
  parent: databaseAccount
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: mongodbDatabase
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource2Id string = throughputSetting.id
