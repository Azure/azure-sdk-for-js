param location string = resourceGroup().location
param baseName string = resourceGroup().name
param testApplicationOid string
param metricsAdvisorName string = '${baseName}-metrics-advisor'

var metricsAdvisorAdminRoleId = 'cb43c632-a144-4ec5-977c-e80c4affc34a'

resource metricsAdvisorAccount 'Microsoft.CognitiveServices/accounts@2024-04-01-preview' = {
  name: metricsAdvisorName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'MetricsAdvisor'
  properties: {
    apiProperties: {}
    customSubDomainName: metricsAdvisorName
    publicNetworkAccess: 'Enabled'
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(metricsAdvisorAccount.id, 'MetricsAdvisorContributor')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', metricsAdvisorAdminRoleId)
    principalId: testApplicationOid
  }
}

output METRICS_ADVISOR_ENDPOINT string = metricsAdvisorAccount.properties.endpoint
