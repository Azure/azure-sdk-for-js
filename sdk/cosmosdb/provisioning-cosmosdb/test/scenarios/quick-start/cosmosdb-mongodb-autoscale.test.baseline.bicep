targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = toLower(format('mongodb-{0}', uniqueString(resourceGroup().id)))

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The primary replica region for the Cosmos DB account.')
param primaryRegion string

@description('The secondary replica region for the Cosmos DB account.')
param secondaryRegion string

@description('Specifies the MongoDB server version to use.')
@allowed([
  '3.2'
  '3.6'
  '4.0'
  '4.2'
])
param serverVersion string = '4.2'

@description('The default consistency level of the Cosmos DB account.')
@allowed([
  'Eventual'
  'ConsistentPrefix'
  'Session'
  'BoundedStaleness'
  'Strong'
])
param defaultConsistencyLevel string = 'Session'

@description('Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 1000000. Multi Region: 100000 to 1000000.')
@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@description('Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.')
@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

@description('The name for the Mongo DB database')
param databaseName string

@description('The name for the first Mongo DB collection')
param collection1Name string

@description('The name for the second Mongo DB collection')
param collection2Name string

@description('Maximum throughput when using Autoscale Throughput Policy for the Database')
@minValue(1000)
@maxValue(1000000)
param autoscaleMaxThroughput int = 1000

var consistencyPolicy = {
  Eventual: {
    defaultConsistencyLevel: 'Eventual'
  }
  ConsistentPrefix: {
    defaultConsistencyLevel: 'ConsistentPrefix'
  }
  Session: {
    defaultConsistencyLevel: 'Session'
  }
  BoundedStaleness: {
    defaultConsistencyLevel: 'BoundedStaleness'
    maxStalenessPrefix: maxStalenessPrefix
    maxIntervalInSeconds: maxIntervalInSeconds
  }
  Strong: {
    defaultConsistencyLevel: 'Strong'
  }
}

var locations = [
  {
    locationName: primaryRegion
    failoverPriority: 0
    isZoneRedundant: false
  }
  {
    locationName: secondaryRegion
    failoverPriority: 1
    isZoneRedundant: false
  }
]

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: accountName
  kind: 'MongoDB'
  location: location
  properties: {
    consistencyPolicy: defaultConsistencyLevel == 'Eventual' ? consistencyPolicy.Eventual : defaultConsistencyLevel == 'ConsistentPrefix' ? consistencyPolicy.ConsistentPrefix : defaultConsistencyLevel == 'Session' ? consistencyPolicy.Session : defaultConsistencyLevel == 'BoundedStaleness' ? consistencyPolicy.BoundedStaleness : consistencyPolicy.Strong
    locations: locations
    databaseAccountOfferType: 'Standard'
    apiProperties: {
      serverVersion: serverVersion
    }
  }
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' = {
  name: databaseName
  parent: databaseAccount
  properties: {
    resource: {
      id: databaseName
    }
    options: {
      autoscaleSettings: {
        maxThroughput: autoscaleMaxThroughput
      }
    }
  }
}

resource collection 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2026-03-15' = {
  name: collection1Name
  parent: mongodbDatabase
  properties: {
    resource: {
      id: collection1Name
      shardKey: {
        user_id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              '$**'
            ]
          }
        }
        {
          key: {
            keys: [
              'user_id'
              'user_address'
            ]
          }
          options: {
            unique: true
          }
        }
        {
          key: {
            keys: [
              '_ts'
            ]
          }
        }
      ]
    }
  }
}

resource collection2 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2026-03-15' = {
  name: collection2Name
  parent: mongodbDatabase
  properties: {
    resource: {
      id: collection2Name
      shardKey: {
        company_id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              '$**'
            ]
          }
        }
        {
          key: {
            keys: [
              'company_id'
              'company_address'
            ]
          }
          options: {
            unique: true
          }
        }
        {
          key: {
            keys: [
              '_ts'
            ]
          }
        }
      ]
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = mongodbDatabase.id

output resource2Id string = collection.id

output resource3Id string = collection2.id
