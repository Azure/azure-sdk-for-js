targetScope = 'resourceGroup'

resource component 'Microsoft.Insights/components@2020-02-02' = {
  name: 'my-component'
  kind: 'web'
  location: 'South Central US'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    Request_Source: 'rest'
    WorkspaceResourceId: '/subscriptions/subid/resourcegroups/my-resource-group/providers/microsoft.operationalinsights/workspaces/my-workspace'
  }
}
