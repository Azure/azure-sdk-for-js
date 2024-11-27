param baseName string = resourceGroup().name
param location string = resourceGroup().location
param testApplicationOid string
param dataCollectionEndpointName string = 'azmonitordce'
param dataCollectionRuleName string = 'azmonitordcr'

var logReaderRoleId = '73c42c96-874c-492b-b04d-ab87d138a893'
var metricPublisherRoleId = '3913510d-42f4-4e42-8a64-420c390055eb'
var workspaceName = '${baseName}-logs'
var secondaryWorkspaceName = '${baseName}-logs2'
var appInsightsName = '${baseName}-ai'

// Create Log Analytics Workspace
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    features: {
      searchVersion: 1
      legacy: 0
      enableLogAccessUsingOnlyResourcePermissions: true
    }
  }
}

// Create Secondary Log Analytics Workspace
resource secondaryLogAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: secondaryWorkspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    features: {
      searchVersion: 1
      legacy: 0
      enableLogAccessUsingOnlyResourcePermissions: true
    }
  }
}

// Create Application Insights
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// Assign Log Reader Role
resource logReaderRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, testApplicationOid, logReaderRoleId)
  dependsOn: [
    logAnalyticsWorkspace
  ]
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', logReaderRoleId)
    principalId: testApplicationOid
  }
}

// Assign Metric Publisher Role
resource metricPublisherRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, testApplicationOid, metricPublisherRoleId)
  dependsOn: [
    logAnalyticsWorkspace
  ]
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', metricPublisherRoleId)
    principalId: testApplicationOid
  }
}

// Create Data Collection Endpoint
resource dataCollectionEndpoint 'Microsoft.Insights/dataCollectionEndpoints@2023-03-11' = {
  name: dataCollectionEndpointName
  location: location
  properties: {
    networkAcls: {
      publicNetworkAccess: 'Enabled'
    }
  }
}

// Create Data Collection Rule
resource dataCollectionRule 'Microsoft.Insights/dataCollectionRules@2023-03-11' = {
  name: dataCollectionRuleName
  location: location
  dependsOn: [
    table
  ]
  properties: {
    dataCollectionEndpointId: dataCollectionEndpoint.id
    streamDeclarations: {
      'Custom-MyTableRawData': {
        columns: [
          {
            name: 'Time'
            type: 'datetime'
          }
          {
            name: 'Computer'
            type: 'string'
          }
          {
            name: 'AdditionalContext'
            type: 'string'
          }
        ]
      }
    }
    destinations: {
      logAnalytics: [
        {
          workspaceResourceId: logAnalyticsWorkspace.id
          name: 'clv2ws1'
        }
      ]
    }
    dataFlows: [
      {
        streams: ['Custom-MyTableRawData']
        destinations: ['clv2ws1']
        transformKql: 'source | extend jsonContext = parse_json(AdditionalContext) | project TimeGenerated = Time, Computer, AdditionalContext = jsonContext, ExtendedColumn=tostring(jsonContext.CounterName)'
        outputStream: 'Custom-MyTable_CL'
      }
    ]
  }
}

// Create Log Analytics Workspace Table
resource table 'Microsoft.OperationalInsights/workspaces/tables@2022-10-01' = {
  name: 'MyTable_CL'
  parent: logAnalyticsWorkspace
  properties: {
    totalRetentionInDays: 30
    plan: 'Analytics'
    schema: {
      name: 'MyTable_CL'
      columns: [
        {
          name: 'TimeGenerated'
          type: 'datetime'
          description: 'The time at which the data was generated'
        }
        {
          name: 'AdditionalContext'
          type: 'dynamic'
          description: 'Additional message properties'
        }
        {
          name: 'ExtendedColumn'
          type: 'string'
          description: 'An additional column extended at ingestion time'
        }
      ]
    }
    retentionInDays: 30
  }
}

// Outputs
output APPLICATION_ID string = appInsights.properties.AppId
output MONITOR_WORKSPACE_ID string = logAnalyticsWorkspace.properties.customerId
output MONITOR_SECONDARY_WORKSPACE_ID string = secondaryLogAnalyticsWorkspace.properties.customerId
output METRICS_RESOURCE_ID string = logAnalyticsWorkspace.id
output LOGS_RESOURCE_ID string = logAnalyticsWorkspace.id
output METRICS_RESOURCE_NAMESPACE string = 'Microsoft.OperationalInsights/workspaces'
output APPLICATIONINSIGHTS_CONNECTION_STRING string = appInsights.properties.ConnectionString
output MQ_APPLICATIONINSIGHTS_CONNECTION_STRING string = appInsights.properties.ConnectionString
output LOGS_INGESTION_ENDPOINT string = dataCollectionEndpoint.properties.logsIngestion.endpoint
output DATA_COLLECTION_RULE_ID string = dataCollectionRule.properties.immutableId
