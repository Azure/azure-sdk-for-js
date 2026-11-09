targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' = {
  name: 'databaseaccount-test'
  location: 'eastus'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: 'eastus'
        failoverPriority: 0
      }
    ]
  }
}

resource cassandraKeyspace 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces@2026-03-15' = {
  name: 'cassandrakeyspace-test'
  parent: databaseAccount
  properties: {
    resource: {
      id: 'cassandrakeyspace-test'
    }
  }
}

resource table 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables@2026-03-15' = {
  name: 'cassandrakeyspacetab-test'
  parent: cassandraKeyspace
  properties: {
    resource: {
      id: 'cassandrakeyspacetab-test'
    }
  }
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: table
  properties: {
    resource: {}
  }
}

resource throughputSetting2 'Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: cassandraKeyspace
  properties: {
    resource: {}
  }
}

resource cassandraRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments@2026-03-15' = {
  name: 'cassandraroleassignm-test'
  parent: databaseAccount
}

resource cassandraRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions@2026-03-15' = {
  name: 'cassandraroledefinit-test'
  parent: databaseAccount
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' = {
  name: 'sqldatabase-test'
  parent: databaseAccount
  properties: {
    resource: {
      id: 'sqldatabase-test'
    }
  }
}

resource clientEncryptionKey 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys@2026-03-15' = {
  name: 'clientencryptionkey-test'
  parent: sqlDatabase
  properties: {
    resource: {}
  }
}

resource container 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2026-03-15' = {
  name: 'container-test'
  parent: sqlDatabase
  properties: {
    resource: {
      id: 'container-test'
    }
  }
}

resource throughputSetting3 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: container
  properties: {
    resource: {}
  }
}

resource storedProcedure 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures@2026-03-15' = {
  name: 'storedprocedure-test'
  parent: container
  properties: {
    resource: {
      id: 'storedprocedure-test'
    }
  }
}

resource trigger 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers@2026-03-15' = {
  name: 'trigger-test'
  parent: container
  properties: {
    resource: {
      id: 'trigger-test'
    }
  }
}

resource userDefinedFunction 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions@2026-03-15' = {
  name: 'userdefinedfunction-test'
  parent: container
  properties: {
    resource: {
      id: 'userdefinedfunction-test'
    }
  }
}

resource throughputSetting4 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: sqlDatabase
  properties: {
    resource: {}
  }
}

resource mongodbDatabase 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2026-03-15' = {
  name: 'mongodbdatabase-test'
  parent: databaseAccount
  properties: {
    resource: {
      id: 'mongodbdatabase-test'
    }
  }
}

resource collection 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2026-03-15' = {
  name: 'collection-test'
  parent: mongodbDatabase
  properties: {
    resource: {
      id: 'collection-test'
    }
  }
}

resource throughputSetting5 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: collection
  properties: {
    resource: {}
  }
}

resource throughputSetting6 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: mongodbDatabase
  properties: {
    resource: {}
  }
}

resource table2 'Microsoft.DocumentDB/databaseAccounts/tables@2026-03-15' = {
  name: 'databaseaccounttable-test'
  parent: databaseAccount
  properties: {
    resource: {
      id: 'databaseaccounttable-test'
    }
  }
}

resource throughputSetting7 'Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: table2
  properties: {
    resource: {}
  }
}

resource gremlinDatabase 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases@2026-03-15' = {
  name: 'gremlindatabase-test'
  parent: databaseAccount
  properties: {
    resource: {
      id: 'gremlindatabase-test'
    }
  }
}

resource graph 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs@2026-03-15' = {
  name: 'graph-test'
  parent: gremlinDatabase
  properties: {
    resource: {
      id: 'graph-test'
    }
  }
}

resource throughputSetting8 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: graph
  properties: {
    resource: {}
  }
}

resource throughputSetting9 'Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: gremlinDatabase
  properties: {
    resource: {}
  }
}

resource gremlinRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments@2026-03-15' = {
  name: 'gremlinroleassignmen-test'
  parent: databaseAccount
}

resource gremlinRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions@2026-03-15' = {
  name: 'gremlinroledefinitio-test'
  parent: databaseAccount
}

resource mongoMIRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments@2026-03-15' = {
  name: 'mongomiroleassignmen-test'
  parent: databaseAccount
}

resource mongoMIRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions@2026-03-15' = {
  name: 'mongomiroledefinitio-test'
  parent: databaseAccount
}

resource mongodbRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions@2026-03-15' = {
  name: 'mongoroledefinitiong-test'
  parent: databaseAccount
}

resource mongodbUserDefinition 'Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions@2026-03-15' = {
  name: 'mongouserdefinitiong-test'
  parent: databaseAccount
}

resource notebookWorkspace 'Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces@2026-03-15' = {
  name: 'default'
  parent: databaseAccount
}

resource privateEndpointConnection 'Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections@2026-03-15' = {
  name: 'privateendpointconne-test'
  parent: databaseAccount
}

resource privateLinkResource 'Microsoft.DocumentDB/databaseAccounts/privateLinkResources@2026-03-15' existing = {
  name: 'privatelinkresource-test'
  parent: databaseAccount
}

resource service 'Microsoft.DocumentDB/databaseAccounts/services@2026-03-15' = {
  name: 'service-test'
  parent: databaseAccount
}

resource sqlRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments@2026-03-15' = {
  name: 'sqlroleassignment-test'
  parent: databaseAccount
}

resource sqlRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions@2026-03-15' = {
  name: 'sqlroledefinition-test'
  parent: databaseAccount
}

resource tableRoleAssignment 'Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments@2026-03-15' = {
  name: 'tableroleassignment-test'
  parent: databaseAccount
}

resource tableRoleDefinition 'Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions@2026-03-15' = {
  name: 'tableroledefinition-test'
  parent: databaseAccount
}

output resource0Id string = databaseAccount.id

output resource1Id string = cassandraKeyspace.id

output resource2Id string = table.id

output resource3Id string = throughputSetting.id

output resource4Id string = throughputSetting2.id

output resource5Id string = cassandraRoleAssignment.id

output resource6Id string = cassandraRoleDefinition.id

output resource7Id string = sqlDatabase.id

output resource8Id string = clientEncryptionKey.id

output resource9Id string = mongodbDatabase.id

output resource10Id string = collection.id

output resource11Id string = throughputSetting5.id

output resource12Id string = container.id

output resource13Id string = throughputSetting3.id

output resource14Id string = table2.id

output resource15Id string = throughputSetting7.id

output resource16Id string = gremlinDatabase.id

output resource17Id string = graph.id

output resource18Id string = throughputSetting8.id

output resource19Id string = throughputSetting9.id

output resource20Id string = gremlinRoleAssignment.id

output resource21Id string = gremlinRoleDefinition.id

output resource22Id string = mongoMIRoleAssignment.id

output resource23Id string = mongoMIRoleDefinition.id

output resource24Id string = mongodbRoleDefinition.id

output resource25Id string = mongodbUserDefinition.id

output resource26Id string = throughputSetting6.id

output resource27Id string = notebookWorkspace.id

output resource28Id string = privateEndpointConnection.id

output resource29Id string = privateLinkResource.id

output resource30Id string = service.id

output resource31Id string = throughputSetting4.id

output resource32Id string = sqlRoleAssignment.id

output resource33Id string = sqlRoleDefinition.id

output resource34Id string = storedProcedure.id

output resource35Id string = tableRoleAssignment.id

output resource36Id string = tableRoleDefinition.id

output resource37Id string = trigger.id

output resource38Id string = userDefinedFunction.id
