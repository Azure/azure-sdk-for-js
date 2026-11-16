targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' existing = {
  name: 'mongodbdatabase-test'
  parent: databaseAccount
}

resource collection 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2026-03-15' existing = {
  name: 'collection-test'
  parent: mongodbDatabase
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: collection
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource3Id string = throughputSetting.id
