targetScope = 'resourceGroup'

resource workbooktemplate 'Microsoft.Insights/workbooktemplates@2020-11-20' = {
  name: 'template01'
  location: 'eastus'
  properties: {
    galleries: [
      {
        name: 'Simple Template'
        type: 'tsg'
        category: 'Failures'
        order: 100
        resourceType: 'microsoft.insights/components'
      }
    ]
    templateData: {
      version: 'Notebook/1.0'
    }
  }
}
