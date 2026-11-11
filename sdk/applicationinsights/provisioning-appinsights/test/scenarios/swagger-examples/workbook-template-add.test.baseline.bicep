targetScope = 'resourceGroup'

resource workbooktemplate 'Microsoft.Insights/workbooktemplates@2020-11-20' = {
  name: 'testtemplate2'
  location: 'west us'
  properties: {
    author: 'Contoso'
    galleries: [
      {
        name: 'Simple Template'
        type: 'tsg'
        category: 'Failures'
        order: 100
        resourceType: 'microsoft.insights/components'
      }
    ]
    priority: 1
    templateData: {
      '$schema': 'https://github.com/Microsoft/Application-Insights-Workbooks/blob/master/schema/workbook.json'
      items: [
        {
          name: 'text - 2'
          type: 1
          content: {
            json: '## New workbook. Welcome to your new workbook.'
          }
        }
      ]
      styleSettings: {}
      version: 'Notebook/1.0'
    }
  }
}
