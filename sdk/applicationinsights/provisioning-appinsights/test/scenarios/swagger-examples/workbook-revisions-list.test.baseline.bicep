targetScope = 'resourceGroup'

resource workbook 'Microsoft.Insights/workbooks@2023-06-01' = {
  name: 'deadb33f-5e0d-4064-8ebb-1a4ed0313eb2'
  kind: 'shared'
  location: 'westus'
  properties: {
    category: 'workbook'
    displayName: 'Sample workbook'
    serializedData: null
  }
}

resource revision 'Microsoft.Insights/workbooks/revisions@2023-06-01' existing = {
  name: 'deadb33f-5e0d-4064-8ebb-1a4ed0313eb2'
  parent: workbook
}
