targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = format('cosmos-{0}', uniqueString(resourceGroup().id))

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The name for the SQL API database')
param databaseName string

@description('The name for the SQL API container')
param containerName string

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: toLower(accountName)
  location: location
  properties: {
    enableFreeTier: true
    databaseAccountOfferType: 'Standard'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
      }
    ]
  }
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' = {
  name: databaseName
  parent: databaseAccount
  properties: {
    resource: {
      id: databaseName
    }
    options: {
      throughput: 1000
    }
  }
}

resource container 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2026-03-15' = {
  name: containerName
  parent: sqlDatabase
  properties: {
    resource: {
      id: containerName
      partitionKey: {
        paths: [
          '/myPartitionKey'
        ]
        kind: 'Hash'
      }
      indexingPolicy: {
        indexingMode: 'consistent'
        includedPaths: [
          {
            path: '/*'
          }
        ]
        excludedPaths: [
          {
            path: '/_etag/?'
          }
        ]
      }
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = sqlDatabase.id

output resource2Id string = container.id

output location string = location

output name string = containerName

output resourceGroupName string = resourceGroup().name

output resourceId string = resourceId('Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers', toLower(accountName), databaseName, containerName)
