targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' existing = {
  name: 'mongodbdatabase-test'
  parent: databaseAccount
}

resource collection 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2026-03-15' = {
  name: 'collectionName'
  parent: mongodbDatabase
  location: 'West US'
  properties: {
    resource: {
      id: 'collectionName'
      indexes: [
        {
          key: {
            keys: [
              '_ts'
            ]
          }
          options: {
            expireAfterSeconds: 100
            unique: true
          }
        }
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
      ]
      shardKey: {
        testKey: 'Hash'
      }
    }
    options: {}
  }
  tags: {}
}

output resource2Id string = collection.id
