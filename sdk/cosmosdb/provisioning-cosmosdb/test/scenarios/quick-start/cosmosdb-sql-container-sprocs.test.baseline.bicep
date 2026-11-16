targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = format('sql-{0}', uniqueString(resourceGroup().id))

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The primary region for the Cosmos DB account.')
param primaryRegion string

@description('The default consistency level of the Cosmos DB account.')
@allowed([
  'Eventual'
  'ConsistentPrefix'
  'Session'
  'BoundedStaleness'
  'Strong'
])
param defaultConsistencyLevel string = 'Session'

@description('Max stale requests. Required for BoundedStaleness. Valid ranges, Single Region: 10 to 2147483647. Multi Region: 100000 to 2147483647.')
@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@description('Max lag time (seconds). Required for BoundedStaleness. Valid ranges, Single Region: 5 to 84600. Multi Region: 300 to 86400.')
@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

@description('Enable system managed failover for regions')
param systemManagedFailover bool = true

@description('The name for the database')
param databaseName string = 'database1'

@description('The name for the container')
param containerName string = 'container1'

@description('The throughput for the container')
@minValue(400)
@maxValue(1000000)
param throughput int = 400

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
]

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: toLower(accountName)
  kind: 'GlobalDocumentDB'
  location: location
  properties: {
    consistencyPolicy: defaultConsistencyLevel == 'Eventual' ? consistencyPolicy.Eventual : defaultConsistencyLevel == 'ConsistentPrefix' ? consistencyPolicy.ConsistentPrefix : defaultConsistencyLevel == 'Session' ? consistencyPolicy.Session : defaultConsistencyLevel == 'BoundedStaleness' ? consistencyPolicy.BoundedStaleness : consistencyPolicy.Strong
    locations: locations
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: systemManagedFailover
  }
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' = {
  name: databaseName
  parent: databaseAccount
  properties: {
    resource: {
      id: databaseName
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
    options: {
      throughput: throughput
    }
  }
}

resource storedProcedure 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures@2026-03-15' = {
  name: 'myStoredProcedure'
  parent: container
  properties: {
    resource: {
      id: 'myStoredProcedure'
      body: 'function () { var context = getContext(); var response = context.getResponse(); response.setBody(\'Hello, World\'); }'
    }
  }
}

resource trigger 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers@2026-03-15' = {
  name: 'myPreTrigger'
  parent: container
  properties: {
    resource: {
      id: 'myPreTrigger'
      triggerType: 'Pre'
      triggerOperation: 'Create'
      body: 'function validateToDoItemTimestamp(){var context=getContext();var request=context.getRequest();var itemToCreate=request.getBody();if(!(\'timestamp\'in itemToCreate)){var ts=new Date();itemToCreate[\'timestamp\']=ts.getTime();}request.setBody(itemToCreate);}'
    }
  }
}

resource userDefinedFunction 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions@2026-03-15' = {
  name: 'myUserDefinedFunction'
  parent: container
  properties: {
    resource: {
      id: 'myUserDefinedFunction'
      body: 'function tax(income){if(income==undefined)throw\'no input\';if(income<1000)return income*0.1;else if(income<10000)return income*0.2;else return income*0.4;}'
    }
  }
}

output resource0Id string = databaseAccount.id

output resource1Id string = sqlDatabase.id

output resource2Id string = container.id

output resource3Id string = storedProcedure.id

output resource4Id string = trigger.id

output resource5Id string = userDefinedFunction.id
