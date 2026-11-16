targetScope = 'resourceGroup'

resource queryPack 'Microsoft.OperationalInsights/queryPacks@2026-03-01' = {
  name: 'my-querypack'
  location: 'eastus'
  properties: {}
}

resource query 'Microsoft.OperationalInsights/queryPacks/queries@2026-03-01' = {
  name: 'a449f8af-8e64-4b3a-9b16-5a7165ff98c4'
  parent: queryPack
  properties: {
    body: 'let newExceptionsTimeRange = 1d;\nlet timeRangeToCheckBefore = 7d;\nexceptions\n| where timestamp < ago(timeRangeToCheckBefore)\n| summarize count() by problemId\n| join kind= rightanti (\nexceptions\n| where timestamp >= ago(newExceptionsTimeRange)\n| extend stack = tostring(details[0].rawStack)\n| summarize count(), dcount(user_AuthenticatedId), min(timestamp), max(timestamp), any(stack) by problemId  \n) on problemId \n| order by  count_ desc\n'
    description: 'my description'
    displayName: 'Exceptions - New in the last 24 hours'
    related: {
      categories: [
        'analytics'
      ]
    }
    tags: {
      'my-label': [
        'label1'
      ]
      'my-other-label': [
        'label2'
      ]
    }
  }
}
