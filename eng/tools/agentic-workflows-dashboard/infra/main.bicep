// Agentic Workflows Dashboard - Azure Monitor Infrastructure
// 
// Deploys:
// - Log Analytics Workspace
// - Data Collection Endpoint (DCE)
// - Data Collection Rule (DCR) with WorkflowRuns_CL and WorkflowAudit_CL tables
// - User-assigned Managed Identity with GitHub OIDC federation
// - Role assignments for ingestion

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Environment name (dev, staging, prod)')
param environment string = 'prod'

@description('Unique suffix for resource names')
param nameSuffix string = uniqueString(resourceGroup().id)

@description('GitHub organization for OIDC federation')
param githubOrg string = 'Azure'

@description('GitHub repository for OIDC federation')
param githubRepo string = 'azure-sdk-tools'

@description('Optional: Additional principal IDs to grant Monitoring Metrics Publisher role (e.g., for local testing)')
param additionalPublisherPrincipalIds array = []

// Resource naming
var workspaceName = 'law-agentic-workflows-${environment}-${nameSuffix}'
var dceName = 'dce-agentic-workflows-${environment}-${nameSuffix}'
var dcrName = 'dcr-agentic-workflows-${environment}'
var identityName = 'id-agentic-workflows-${environment}'

// Log Analytics Workspace
resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 90
    features: {
      enableLogAccessUsingOnlyResourcePermissions: true
    }
  }
}

// Custom table for workflow runs (inventory data from collector)
resource workflowRunsTable 'Microsoft.OperationalInsights/workspaces/tables@2022-10-01' = {
  parent: workspace
  name: 'WorkflowRuns_CL'
  properties: {
    schema: {
      name: 'WorkflowRuns_CL'
      columns: [
        { name: 'TimeGenerated', type: 'datetime', description: 'Ingestion timestamp' }
        { name: 'SchemaVersion', type: 'string', description: 'Schema version' }
        { name: 'CollectorVersion', type: 'string', description: 'Collector version' }
        { name: 'Repository', type: 'string', description: 'GitHub repository (owner/name)' }
        { name: 'WorkflowName', type: 'string', description: 'Workflow name without extension' }
        { name: 'WorkflowId', type: 'long', description: 'GitHub workflow ID' }
        { name: 'RunId', type: 'long', description: 'GitHub run ID' }
        { name: 'RunAttempt', type: 'int', description: 'Run attempt number' }
        { name: 'UpdatedAt', type: 'datetime', description: 'Last update time from GitHub' }
        { name: 'Status', type: 'string', description: 'Run status (queued, in_progress, completed)' }
        { name: 'Conclusion', type: 'string', description: 'Run conclusion (success, failure, etc.)' }
        { name: 'CreatedAt', type: 'datetime', description: 'Run creation time' }
        { name: 'StartedAt', type: 'datetime', description: 'Run start time' }
        { name: 'CompletedAt', type: 'datetime', description: 'Run completion time' }
        { name: 'QueueTime_s', type: 'real', description: 'Queue time in seconds' }
        { name: 'Duration_s', type: 'real', description: 'Execution duration in seconds' }
        { name: 'TriggerEvent', type: 'string', description: 'Trigger event type' }
        { name: 'Actor', type: 'string', description: 'GitHub actor username' }
        { name: 'ActorType', type: 'string', description: 'Actor type (User, Bot)' }
        { name: 'HeadBranch', type: 'string', description: 'Branch name' }
        { name: 'HeadSha', type: 'string', description: 'Commit SHA' }
        { name: 'HeadRepo', type: 'string', description: 'Head repository full name' }
        { name: 'IsFromFork', type: 'string', description: 'Fork status: true, false, or unknown' }
        { name: 'PullRequestNumber', type: 'int', description: 'PR number if applicable' }
        { name: 'RunUrl', type: 'string', description: 'URL to workflow run' }
      ]
    }
    retentionInDays: 90
    totalRetentionInDays: 90
  }
}

// Separate table for audit/enrichment data (token usage, turns, tools)
resource workflowAuditTable 'Microsoft.OperationalInsights/workspaces/tables@2022-10-01' = {
  parent: workspace
  name: 'WorkflowAudit_CL'
  properties: {
    schema: {
      name: 'WorkflowAudit_CL'
      columns: [
        { name: 'TimeGenerated', type: 'datetime', description: 'Ingestion timestamp' }
        { name: 'RunId', type: 'long', description: 'GitHub run ID (join key)' }
        { name: 'RunAttempt', type: 'int', description: 'Run attempt number' }
        { name: 'Repository', type: 'string', description: 'GitHub repository' }
        { name: 'WorkflowName', type: 'string', description: 'Workflow name' }
        { name: 'CreatedAt', type: 'datetime', description: 'Run creation time' }
        { name: 'CompletedAt', type: 'datetime', description: 'Run completion time (canonical timestamp)' }
        { name: 'PullRequestNumber', type: 'int', description: 'PR number if applicable' }
        { name: 'InputTokens', type: 'long', description: 'Input tokens used' }
        { name: 'OutputTokens', type: 'long', description: 'Output tokens generated' }
        { name: 'CacheReadTokens', type: 'long', description: 'Tokens read from cache' }
        { name: 'CacheWriteTokens', type: 'long', description: 'Tokens written to cache' }
        { name: 'CacheHitRate', type: 'real', description: 'Cache hit rate percentage' }
        { name: 'CacheEfficiency', type: 'real', description: 'Cache efficiency from firewall' }
        { name: 'Turns', type: 'int', description: 'Number of agent turns' }
        { name: 'ToolCalls', type: 'int', description: 'Number of tool calls' }
        { name: 'ErrorCount', type: 'int', description: 'Number of errors' }
        { name: 'WarningCount', type: 'int', description: 'Number of warnings' }
        { name: 'ModelId', type: 'string', description: 'Model identifier (e.g. claude-sonnet-4.6)' }
        { name: 'RequestCount', type: 'int', description: 'Number of LLM requests' }
        { name: 'DurationMs', type: 'long', description: 'Total LLM duration in milliseconds' }
        { name: 'EstimatedCostUSD', type: 'real', description: 'Estimated cost using model-specific rates' }
        { name: 'EstimatedSavingsUSD', type: 'real', description: 'Estimated savings from cache (model-specific)' }
        { name: 'GitHubApiRequests', type: 'int', description: 'GitHub API requests made' }
        { name: 'IsPrimaryModel', type: 'boolean', description: 'True if this is the primary model for the run' }
        // v7: Coverage tracking fields
        { name: 'HasTokenData', type: 'boolean', description: 'True if run had token usage data' }
        { name: 'AuditStatus', type: 'string', description: 'Audit status: success, no_firewall, zero_tokens, audit_failed' }
        // v8: Schema versioning for reprocessing stale data
        { name: 'AuditVersion', type: 'int', description: 'Audit schema version (current: 23)' }
      ]
    }
    retentionInDays: 90
    totalRetentionInDays: 90
  }
}

// Data Collection Endpoint
resource dce 'Microsoft.Insights/dataCollectionEndpoints@2023-03-11' = {
  name: dceName
  location: location
  kind: 'Linux'
  properties: {
    networkAcls: {
      publicNetworkAccess: 'Enabled'
    }
  }
}

// Data Collection Rule - supports both WorkflowRuns_CL and WorkflowAudit_CL streams
resource dcr 'Microsoft.Insights/dataCollectionRules@2023-03-11' = {
  name: dcrName
  location: location
  properties: {
    dataCollectionEndpointId: dce.id
    streamDeclarations: {
      'Custom-WorkflowRuns_CL': {
        columns: [
          { name: 'TimeGenerated', type: 'datetime' }
          { name: 'SchemaVersion', type: 'string' }
          { name: 'CollectorVersion', type: 'string' }
          { name: 'Repository', type: 'string' }
          { name: 'WorkflowName', type: 'string' }
          { name: 'WorkflowId', type: 'long' }
          { name: 'RunId', type: 'long' }
          { name: 'RunAttempt', type: 'int' }
          { name: 'UpdatedAt', type: 'datetime' }
          { name: 'Status', type: 'string' }
          { name: 'Conclusion', type: 'string' }
          { name: 'CreatedAt', type: 'datetime' }
          { name: 'StartedAt', type: 'datetime' }
          { name: 'CompletedAt', type: 'datetime' }
          { name: 'QueueTime_s', type: 'real' }
          { name: 'Duration_s', type: 'real' }
          { name: 'TriggerEvent', type: 'string' }
          { name: 'Actor', type: 'string' }
          { name: 'ActorType', type: 'string' }
          { name: 'HeadBranch', type: 'string' }
          { name: 'HeadSha', type: 'string' }
          { name: 'HeadRepo', type: 'string' }
          { name: 'IsFromFork', type: 'string' }
          { name: 'PullRequestNumber', type: 'int' }
          { name: 'RunUrl', type: 'string' }
        ]
      }
      'Custom-WorkflowAudit_CL': {
        columns: [
          { name: 'TimeGenerated', type: 'datetime' }
          { name: 'RunId', type: 'long' }
          { name: 'RunAttempt', type: 'int' }
          { name: 'Repository', type: 'string' }
          { name: 'WorkflowName', type: 'string' }
          { name: 'CreatedAt', type: 'datetime' }
          { name: 'CompletedAt', type: 'datetime' }
          { name: 'PullRequestNumber', type: 'int' }
          { name: 'InputTokens', type: 'long' }
          { name: 'OutputTokens', type: 'long' }
          { name: 'CacheReadTokens', type: 'long' }
          { name: 'CacheWriteTokens', type: 'long' }
          { name: 'CacheHitRate', type: 'real' }
          { name: 'CacheEfficiency', type: 'real' }
          { name: 'Turns', type: 'int' }
          { name: 'ToolCalls', type: 'int' }
          { name: 'ErrorCount', type: 'int' }
          { name: 'WarningCount', type: 'int' }
          { name: 'ModelId', type: 'string' }
          { name: 'RequestCount', type: 'int' }
          { name: 'DurationMs', type: 'long' }
          { name: 'EstimatedCostUSD', type: 'real' }
          { name: 'EstimatedSavingsUSD', type: 'real' }
          { name: 'GitHubApiRequests', type: 'int' }
          { name: 'IsPrimaryModel', type: 'boolean' }
          // v7: Coverage tracking fields
          { name: 'HasTokenData', type: 'boolean' }
          { name: 'AuditStatus', type: 'string' }
          // v8: Schema versioning
          { name: 'AuditVersion', type: 'int' }
        ]
      }
    }
    destinations: {
      logAnalytics: [
        {
          workspaceResourceId: workspace.id
          name: 'lawDestination'
        }
      ]
    }
    dataFlows: [
      {
        streams: ['Custom-WorkflowRuns_CL']
        destinations: ['lawDestination']
        transformKql: 'source'
        outputStream: 'Custom-WorkflowRuns_CL'
      }
      {
        streams: ['Custom-WorkflowAudit_CL']
        destinations: ['lawDestination']
        transformKql: 'source'
        outputStream: 'Custom-WorkflowAudit_CL'
      }
    ]
  }
  dependsOn: [workflowRunsTable, workflowAuditTable]
}

// User-assigned Managed Identity
resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: identityName
  location: location
}

// Federated credential for GitHub Actions OIDC (main branch)
resource federatedCredentialMain 'Microsoft.ManagedIdentity/userAssignedIdentities/federatedIdentityCredentials@2023-01-31' = {
  parent: identity
  name: 'github-actions-main'
  properties: {
    issuer: 'https://token.actions.githubusercontent.com'
    subject: 'repo:${githubOrg}/${githubRepo}:ref:refs/heads/main'
    audiences: ['api://AzureADTokenExchange']
  }
}

// Federated credential for GitHub Actions OIDC (scheduled workflows)
// NOTE: Deployed sequentially to avoid concurrent write errors
resource federatedCredentialSchedule 'Microsoft.ManagedIdentity/userAssignedIdentities/federatedIdentityCredentials@2023-01-31' = {
  parent: identity
  name: 'github-actions-schedule'
  properties: {
    issuer: 'https://token.actions.githubusercontent.com'
    subject: 'repo:${githubOrg}/${githubRepo}:environment:production'
    audiences: ['api://AzureADTokenExchange']
  }
  dependsOn: [federatedCredentialMain]
}

// Role assignment: Monitoring Metrics Publisher on DCR for managed identity
resource metricsPublisherRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(dcr.id, identity.id, 'Monitoring Metrics Publisher')
  scope: dcr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Role assignment: Log Analytics Contributor on workspace for managed identity
// Required for DCR-based ingestion to work
resource logAnalyticsContributorRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(workspace.id, identity.id, 'Log Analytics Contributor')
  scope: workspace
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '92aaf0da-9dab-42b6-94a3-d43ce8d16293')
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Role assignments for additional principals (e.g., local testing users)
resource additionalPublisherRoles 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for (principalId, i) in additionalPublisherPrincipalIds: {
  name: guid(dcr.id, principalId, 'Monitoring Metrics Publisher Additional')
  scope: dcr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: principalId
    principalType: 'User'
  }
}]

// Log Analytics Contributor for additional principals
resource additionalLogAnalyticsRoles 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for (principalId, i) in additionalPublisherPrincipalIds: {
  name: guid(workspace.id, principalId, 'Log Analytics Contributor Additional')
  scope: workspace
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '92aaf0da-9dab-42b6-94a3-d43ce8d16293')
    principalId: principalId
    principalType: 'User'
  }
}]

// Workbook for dashboard visualization
var workbookContent = {
  version: 'Notebook/1.0'
  items: [
    // ===== HEADER =====
    {
      type: 1
      content: {
        json: '# 🤖 Agentic Workflows Dashboard\n\nMonitoring GitHub Copilot agentic workflows across Azure SDK repositories.'
      }
      name: 'header'
    }
    {
      type: 9
      content: {
        version: 'KqlParameterItem/1.0'
        parameters: [
          {
            id: 'timeRange'
            version: 'KqlParameterItem/1.0'
            name: 'TimeRange'
            type: 4
            isRequired: true
            value: { durationMs: 604800000 }
            typeSettings: {
              selectableValues: [
                { durationMs: 3600000, displayName: 'Last hour' }
                { durationMs: 86400000, displayName: 'Last 24 hours' }
                { durationMs: 604800000, displayName: 'Last 7 days' }
                { durationMs: 2592000000, displayName: 'Last 30 days' }
              ]
            }
            label: 'Time Range'
          }
          {
            id: 'repository'
            version: 'KqlParameterItem/1.0'
            name: 'Repository'
            type: 2
            isRequired: false
            multiSelect: true
            quote: '"'
            delimiter: ','
            query: 'WorkflowRuns_CL | where Repository != "test/repo" | distinct Repository | order by Repository asc'
            typeSettings: { additionalResourceOptions: ['value::all'], showDefault: false }
            defaultValue: 'value::all'
            label: 'Repository'
            queryType: 0
            resourceType: 'microsoft.operationalinsights/workspaces'
          }
        ]
      }
      name: 'parameters'
    }
    // ===== SECTION: OVERVIEW =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '📊 Overview'
        items: [
          // v23: Data freshness indicator
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let collectorLast = WorkflowRuns_CL | summarize LastCollector=max(TimeGenerated); let auditLast = WorkflowAudit_CL | summarize LastAudit=max(TimeGenerated); collectorLast | join kind=fullouter auditLast on TimeGenerated | project CollectorAge=format_timespan(now()-LastCollector, "d.hh:mm"), AuditAge=format_timespan(now()-coalesce(LastAudit, datetime(1970-01-01)), "d.hh:mm"), CollectorStale=iff(now()-LastCollector > 2h, "⚠️ STALE", "✓ Fresh"), AuditStale=iff(coalesce(LastAudit, datetime(1970-01-01)) < ago(25h), "⚠️ STALE", "✓ Fresh")'
              size: 4
              title: 'Pipeline Health'
              queryType: 0
              visualization: 'tiles'
              tileSettings: { titleContent: { columnMatch: 'CollectorStale' }, subtitleContent: { columnMatch: 'CollectorAge' } }
              noDataMessage: 'No data ingested yet. Run: npm run collect'
            }
            customWidth: '20'
            name: 'pipelineHealth'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure"), Cancelled=countif(Conclusion=="cancelled") | extend SuccessRate=round(100.0*Success/Total, 1) | project Total, Success, Failures, Cancelled, SuccessRate'
              size: 0
              title: 'Summary'
              queryType: 0
              visualization: 'table'
              noDataMessage: 'No matching data for current filters/time range.'
            }
            customWidth: '35'
            name: 'kpiTiles'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success") by bin(CompletedAt, 1d) | extend SuccessRate=round(100.0*Success/Total, 1) | project Day=CompletedAt, SuccessRate | order by Day asc'
              size: 0
              title: 'Success Rate Trend'
              queryType: 0
              visualization: 'linechart'
              chartSettings: { xAxis: 'Day', yAxis: ['SuccessRate'], yAxisMaximum: 100, seriesLabelSettings: [{ seriesName: 'SuccessRate', color: 'green' }] }
              noDataMessage: 'No matching data for current filters/time range.'
            }
            customWidth: '45'
            name: 'successTrend'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Runs=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure"), Cancelled=countif(Conclusion=="cancelled") by Repository | extend SuccessRate=round(100.0*Success/Runs, 1) | project Repository, Runs, Success, Failures, Cancelled, SuccessRate | order by Runs desc'
              size: 0
              title: 'By Repository'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'SuccessRate', formatter: 8, formatOptions: { palette: 'greenRed', min: 0, max: 100 } }, { columnMatch: 'Failures', formatter: 8, formatOptions: { palette: 'red' } } ] }
              noDataMessage: 'No matching data for current filters/time range.'
            }
            name: 'volumeByRepo'
          }
        ]
      }
      name: 'overviewSection'
    }
    // ===== SECTION: WORKFLOW PERFORMANCE =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '⚡ Workflow Performance'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where Duration_s > 0 | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize P50=round(percentile(Duration_s, 50)/60, 1), P90=round(percentile(Duration_s, 90)/60, 1), Runs=count() by WorkflowName | project WorkflowName, Runs, P50, P90 | order by P90 desc'
              size: 0
              title: 'Duration by Workflow (minutes)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'P90', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'No completed workflow runs found.'
            }
            customWidth: '50'
            name: 'durationStats'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure") by WorkflowName | extend SuccessRate=round(100.0*Success/Total, 1) | project WorkflowName, Total, SuccessRate, Failures | order by Total desc'
              size: 0
              title: 'Success Rate by Workflow'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'SuccessRate', formatter: 8, formatOptions: { palette: 'greenRed', min: 0, max: 100 } }, { columnMatch: 'Failures', formatter: 8, formatOptions: { palette: 'red' } } ] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '50'
            name: 'successByWorkflow'
          }
        ]
      }
      name: 'performanceSection'
    }
    // ===== SECTION: FAILURES =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '🔴 Failures & Issues'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by bin(CompletedAt, 1d) | order by CompletedAt asc'
              size: 0
              title: 'Failures Over Time'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Failures', color: 'redBright' }] }
              noDataMessage: 'No failures in selected time range.'
            }
            customWidth: '50'
            name: 'failuresOverTime'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v8: Sort by CompletedAt (failure time), not TimeGenerated (ingestion time)
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | project CompletedAt, Repository, WorkflowName, Actor, RunUrl | order by CompletedAt desc | take 10'
              size: 0
              title: 'Recent Failures'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'RunUrl', formatter: 7, formatOptions: { linkTarget: 'Url', linkLabel: 'View' } } ] }
              noDataMessage: 'No failures in selected time range.'
            }
            customWidth: '50'
            name: 'recentFailures'
          }
        ]
      }
      name: 'failuresSection'
    }
    // ===== SECTION: FORK ANALYSIS =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '🍴 Fork vs Main Repository'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where TriggerEvent in ("pull_request", "pull_request_target") | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), FromFork=countif(IsFromFork == "true"), FromMain=countif(IsFromFork == "false"), Unknown=countif(IsFromFork == "unknown") by Repository | project Repository, Total, FromFork, FromMain, Unknown | order by FromFork desc'
              size: 0
              title: 'PR Source by Repository (includes unknown)'
              queryType: 0
              visualization: 'table'
              noDataMessage: 'No pull request runs found.'
            }
            customWidth: '60'
            name: 'forkTable'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where TriggerEvent in ("pull_request", "pull_request_target") | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Runs=count() by IsFromFork | extend Source=case(IsFromFork=="true", "Fork", IsFromFork=="false", "Main Repo", "Unknown")'
              size: 0
              title: 'PR Distribution (all sources)'
              queryType: 0
              visualization: 'piechart'
              noDataMessage: 'No pull request runs found.'
            }
            customWidth: '40'
            name: 'forkPie'
          }
        ]
      }
      name: 'forkSection'
    }
    // ===== SECTION: AGENT INTELLIGENCE =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '🧠 Agent Intelligence'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v7: Fixed ToolCalls - use max() since it's run-level data duplicated on model rows
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; let runLevel = audits | summarize RunCost=sum(EstimatedCostUSD), RunTurns=max(Turns), RunTools=max(ToolCalls) by Repository, WorkflowName, RunId, RunAttempt; runLevel | summarize Runs=count(), AvgTurns=round(avg(RunTurns), 1), AvgTools=round(avg(RunTools), 0), TotalCost=round(sum(RunCost), 2), AvgCost=round(avg(RunCost), 4) by Repository, WorkflowName | project Repository, WorkflowName, Runs, AvgTurns, AvgTools, TotalCost, AvgCost | order by TotalCost desc'
              size: 0
              title: 'Workflow Complexity & Cost by Repository'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } }, { columnMatch: 'AvgTurns', formatter: 8, formatOptions: { palette: 'turquoise' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '60'
            name: 'agentComplexity'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where Turns > 0 | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; audits | project Turns, ToolCalls, WorkflowName | where ToolCalls > 0'
              size: 0
              title: 'Turns vs Tool Calls'
              queryType: 0
              visualization: 'scatterchart'
              chartSettings: { xAxis: 'Turns', yAxis: 'ToolCalls', group: 'WorkflowName' }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '40'
            name: 'turnsVsTools'
          }
          // v22: Split token and cost trends into separate charts (different units)
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | summarize TotalInput=sum(InputTokens)/1000000, TotalOutput=sum(OutputTokens)/1000000 by bin(CompletedAt, 1d) | project Day=CompletedAt, InputM=round(TotalInput, 2), OutputM=round(TotalOutput, 2) | order by Day asc'
              size: 0
              title: 'Daily Token Usage (millions)'
              queryType: 0
              visualization: 'linechart'
              chartSettings: { yAxis: ['InputM', 'OutputM'], seriesLabelSettings: [{ seriesName: 'InputM', label: 'Input (M)', color: 'blue' }, { seriesName: 'OutputM', label: 'Output (M)', color: 'purple' }] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '30'
            name: 'tokenTrend'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | summarize TotalCost=round(sum(EstimatedCostUSD), 2) by bin(CompletedAt, 1d) | project Day=CompletedAt, CostUSD=TotalCost | order by Day asc'
              size: 0
              title: 'Daily Cost (USD)'
              queryType: 0
              visualization: 'linechart'
              chartSettings: { yAxis: ['CostUSD'], seriesLabelSettings: [{ seriesName: 'CostUSD', label: 'Cost ($)', color: 'green' }] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '30'
            name: 'costTrend'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v7: Fixed to sum tokens across models, use max for run-level fields
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; let runLevel = audits | summarize TotalCost=sum(EstimatedCostUSD), TotalInput=sum(InputTokens), TotalOutput=sum(OutputTokens), Turns=max(Turns), ToolCalls=max(ToolCalls), Repository=take_any(Repository), WorkflowName=take_any(WorkflowName) by RunId, RunAttempt; runLevel | top 10 by TotalCost desc | project Repository, WorkflowName, Turns, ToolCalls, TotalInput, TotalOutput, TotalCost=round(TotalCost, 4)'
              size: 0
              title: 'Top 10 Most Expensive Runs'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '40'
            name: 'expensiveRuns'
          }
        ]
      }
      name: 'agentSection'
    }
    // ===== SECTION: COST ANALYSIS =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '💰 Cost Analysis'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v6: Two-stage aggregation - sum to run-level first, then avg per workflow
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; let runLevel = audits | summarize RunCost=sum(EstimatedCostUSD), RunInput=sum(InputTokens), RunOutput=sum(OutputTokens) by Repository, WorkflowName, RunId, RunAttempt; runLevel | summarize Runs=count(), TotalInput=sum(RunInput), TotalOutput=sum(RunOutput), TotalCost=round(sum(RunCost), 2), AvgCost=round(avg(RunCost), 4) by Repository, WorkflowName | project Repository, WorkflowName, Runs, TotalInput, TotalOutput, TotalCost, AvgCost | order by TotalCost desc'
              size: 0
              title: 'Cost by Workflow (per-model rates)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '50'
            name: 'costByWorkflow'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true and PullRequestNumber > 0 | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | extend RunKey = strcat(tostring(RunId), ":", tostring(RunAttempt)) | summarize TotalCost=round(sum(EstimatedCostUSD), 4), Runs=dcount(RunKey), TotalInput=sum(InputTokens), TotalOutput=sum(OutputTokens) by PullRequestNumber, Repository | top 20 by TotalCost desc | project Repository, PullRequestNumber, Runs, TotalInput, TotalOutput, TotalCost'
              size: 0
              title: 'Top 20 Most Expensive PRs'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '50'
            name: 'expensivePRs'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v7: Aggregate to run-level first (sum across models), then compute workflow averages
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; let runLevel = audits | summarize RunInput=sum(InputTokens), RunCached=sum(CacheReadTokens) by Repository, WorkflowName, RunId, RunAttempt | extend RunCacheRate=iff(RunInput > 0, 100.0 * RunCached / RunInput, 0.0); runLevel | summarize TotalInput=sum(RunInput), TotalCached=sum(RunCached), AvgCacheHitRate=round(avg(RunCacheRate), 1) by Repository, WorkflowName | where TotalInput > 0 | project Repository, WorkflowName, TotalInput, TotalCached, AvgCacheHitRate | order by AvgCacheHitRate desc'
              size: 0
              title: 'Cache Hit Rate by Workflow'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'AvgCacheHitRate', formatter: 8, formatOptions: { palette: 'blue' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '50'
            name: 'cacheHitRate'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | summarize TotalInput=sum(InputTokens), TotalOutput=sum(OutputTokens), TotalCached=sum(CacheReadTokens), TotalCost=sum(EstimatedCostUSD), TotalSavings=sum(EstimatedSavingsUSD) | extend AvgCacheRate=iff(TotalInput > 0, round(100.0 * TotalCached / TotalInput, 1), 0.0) | project TotalInput, TotalOutput, TotalCached, AvgCacheRate, TotalCost=round(TotalCost, 2), SavedCostUSD=round(TotalSavings, 2)'
              size: 0
              title: 'Overall Cost & Cache Savings'
              queryType: 0
              visualization: 'table'
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '50'
            name: 'cacheSavings'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v9: Perf - project only needed columns before arg_max to reduce scan cost
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | project TimeGenerated, RunId, RunAttempt, ModelId, EstimatedCostUSD | summarize arg_max(TimeGenerated, EstimatedCostUSD) by RunId, RunAttempt, ModelId; audits | summarize TotalCost=round(sum(EstimatedCostUSD), 2), Runs=dcount(strcat(tostring(RunId), ":", tostring(RunAttempt))) by ModelId | project ModelId, Runs, TotalCost | order by TotalCost desc'
              size: 0
              title: 'Cost by Model'
              queryType: 0
              visualization: 'piechart'
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '50'
            name: 'costByModel'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v21: Use max(toint(HasTokenData)) to handle mixed per-model statuses correctly
              // v22: Update currentVersion to 22
              query: 'let currentVersion = 23; let repos = dynamic([{Repository}]); let auditableConclusions = dynamic(["success", "failure", "cancelled", "timed_out", "neutral", "action_required"]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion in (auditableConclusions) | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | project TimeGenerated, RunId, RunAttempt, Repository | summarize arg_max(RunAttempt, Repository) by RunId | project RunId, RunAttempt, Repository; let audits = WorkflowAudit_CL | where Repository != "test/repo" | where CompletedAt {TimeRange} | where AuditVersion >= currentVersion | where array_length(repos) == 0 or Repository in (repos) | summarize HasTokenData=max(toint(HasTokenData)) by RunId, RunAttempt, Repository | extend HasTokenData=HasTokenData == 1; let joined = runs | join kind=leftouter audits on RunId, RunAttempt; let discovered = joined | summarize DiscoveredRuns=count() by Repository; let auditAttempted = joined | where isnotempty(HasTokenData) | summarize AttemptedRuns=count() by Repository; let auditSuccess = joined | where HasTokenData == true | summarize SuccessRuns=count() by Repository; discovered | join kind=leftouter auditAttempted on Repository | join kind=leftouter auditSuccess on Repository | extend AttemptedRuns=coalesce(AttemptedRuns, 0), SuccessRuns=coalesce(SuccessRuns, 0) | extend AttemptedPct=round(100.0 * AttemptedRuns / DiscoveredRuns, 1), TokenPct=round(100.0 * SuccessRuns / DiscoveredRuns, 1) | project Repository, DiscoveredRuns, AttemptedRuns, AttemptedPct, SuccessRuns, TokenPct | order by TokenPct asc'
              size: 0
              title: 'Audit Coverage (Attempted vs Token Data)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'AttemptedPct', formatter: 8, formatOptions: { palette: 'blue', min: 0, max: 100 } }, { columnMatch: 'TokenPct', formatter: 8, formatOptions: { palette: 'greenRed', min: 0, max: 100 } } ] }
              noDataMessage: 'Run both collector and audit enrichment.'
            }
            customWidth: '50'
            name: 'auditCoverage'
          }
          // v22: Renamed and improved Audit Outcome chart with status legend
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v22: Use summarize with iff() to pick best AuditStatus (success > zero_tokens > others)
              query: 'let currentVersion = 23; let repos = dynamic([{Repository}]); WorkflowAudit_CL | where Repository != "test/repo" | where CompletedAt {TimeRange} | where AuditVersion >= currentVersion | where array_length(repos) == 0 or Repository in (repos) | summarize AuditStatus=iff(countif(AuditStatus == "success") > 0, "success", iff(countif(AuditStatus == "zero_tokens") > 0, "zero_tokens", iff(countif(AuditStatus == "no_firewall") > 0, "no_firewall", "audit_failed"))) by RunId, RunAttempt | summarize Count=count() by AuditStatus | extend Description=case(AuditStatus == "success", "✓ Token data present", AuditStatus == "zero_tokens", "⏭ Completed, no billable usage", AuditStatus == "no_firewall", "⚠ Missing firewall section", AuditStatus == "audit_failed", "❌ Audit command failed", "Unknown") | project AuditStatus, Description, Count | order by Count desc'
              size: 0
              title: 'Audit Outcome by Run'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'Count', formatter: 8, formatOptions: { palette: 'blue' } } ] }
              noDataMessage: 'Run audit enrichment: npm run audit'
            }
            customWidth: '50'
            name: 'auditStatusBreakdown'
          }
        ]
      }
      name: 'costSection'
    }
    // ===== SECTION: OPERATIONAL METRICS =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '⏱️ Operational Metrics'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where QueueTime_s > 0 | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize P50=round(percentile(QueueTime_s, 50), 1), P90=round(percentile(QueueTime_s, 90), 1), P99=round(percentile(QueueTime_s, 99), 1), AvgQueue=round(avg(QueueTime_s), 1) by WorkflowName | project WorkflowName, AvgQueue, P50, P90, P99 | order by P90 desc'
              size: 0
              title: 'Queue Time by Workflow (seconds)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'P90', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'No queue time data available.'
            }
            customWidth: '50'
            name: 'queueTime'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | extend Hour=hourofday(CompletedAt) | summarize Runs=count() by Hour | order by Hour asc'
              size: 0
              title: 'Peak Usage by Hour (UTC)'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Runs', color: 'blue' }] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '50'
            name: 'peakUsageHour'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | extend DayNum=toint(dayofweek(CompletedAt)/1d) | summarize Runs=count() by DayNum | order by DayNum asc | extend Day=case(DayNum==0, "Sun", DayNum==1, "Mon", DayNum==2, "Tue", DayNum==3, "Wed", DayNum==4, "Thu", DayNum==5, "Fri", "Sat") | project Day, Runs'
              size: 0
              title: 'Peak Usage by Day'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Runs', color: 'green' }] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '50'
            name: 'peakUsageDay'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v11: Fixed concurrent runs using mv-expand bins per run (robust approach)
              // Expands each run to all bins it overlaps, then counts distinct runs per bin
              // Handles: runs spanning into window, runs starting and ending in same bin
              query: 'let repos = dynamic([{Repository}]); let rangeStart = {TimeRange:start}; let rangeEnd = {TimeRange:end}; let binSize = 5m; let runs = WorkflowRuns_CL | where Repository != "test/repo" | where isnotempty(StartedAt) | where StartedAt < rangeEnd and coalesce(CompletedAt, now()) > rangeStart | where array_length(repos) == 0 or Repository in (repos) | project TimeGenerated, RunId, RunAttempt, StartedAt, CompletedAt | summarize arg_max(TimeGenerated, StartedAt, CompletedAt) by RunId, RunAttempt | extend StartBin=bin(StartedAt, binSize), EndBin=bin(coalesce(CompletedAt, now()), binSize) | extend BinCount=toint((EndBin - StartBin) / binSize) + 1 | mv-expand BinOffset=range(0, BinCount - 1) to typeof(int) | extend ts=StartBin + (BinOffset * binSize) | where ts >= bin(rangeStart, binSize) and ts <= bin(rangeEnd, binSize) | summarize Concurrent=dcount(strcat(tostring(RunId), ":", tostring(RunAttempt))) by ts | join kind=rightouter (range ts from bin(rangeStart, binSize) to bin(rangeEnd, binSize) step binSize | mv-expand ts to typeof(datetime)) on ts | extend Concurrent=coalesce(Concurrent, 0) | project Timestamp=ts1, Concurrent | order by Timestamp asc'
              size: 0
              title: 'Concurrent Runs (5-minute bins)'
              queryType: 0
              visualization: 'linechart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Concurrent', color: 'purple' }] }
              noDataMessage: 'No concurrent run data available.'
            }
            customWidth: '50'
            name: 'concurrentRuns'
          }
        ]
      }
      name: 'operationalSection'
    }
    // ===== SECTION: ERROR ANALYSIS =====
    {
      type: 12
      content: {
        version: 'NotebookGroup/1.0'
        groupType: 'editable'
        title: '🐛 Error Analysis'
        items: [
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by WorkflowName | order by Failures desc'
              size: 0
              title: 'Failures by Workflow'
              queryType: 0
              visualization: 'piechart'
            }
            customWidth: '50'
            name: 'failuresByWorkflow'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by Repository | order by Failures desc'
              size: 0
              title: 'Failures by Repository'
              queryType: 0
              visualization: 'piechart'
            }
            customWidth: '50'
            name: 'failuresByRepo'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by Actor | top 10 by Failures | order by Failures desc'
              size: 0
              title: 'Top 10 Actors with Failures'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'Failures', formatter: 8, formatOptions: { palette: 'red' } } ] }
            }
            customWidth: '50'
            name: 'failuresByActor'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository != "test/repo" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by TriggerEvent | order by Failures desc'
              size: 0
              title: 'Failures by Trigger Event'
              queryType: 0
              visualization: 'table'
            }
            customWidth: '50'
            name: 'failuresByTrigger'
          }
        ]
      }
      name: 'errorSection'
    }
  ]
  fallbackResourceIds: [workspace.id]
}
resource workbook 'Microsoft.Insights/workbooks@2023-06-01' = {
  name: guid(resourceGroup().id, 'agentic-workflows-dashboard')
  location: location
  kind: 'shared'
  properties: {
    displayName: 'Agentic Workflows Dashboard'
    category: 'workbook'
    sourceId: workspace.id
    serializedData: string(workbookContent)
  }
}

// Outputs for collector configuration
output workspaceId string = workspace.properties.customerId
output workspaceName string = workspace.name
output dceEndpoint string = dce.properties.logsIngestion.endpoint
output dcrImmutableId string = dcr.properties.immutableId
output dcrName string = dcr.name
output streamName string = 'Custom-WorkflowRuns_CL'
output auditStreamName string = 'Custom-WorkflowAudit_CL'
output identityClientId string = identity.properties.clientId
output identityPrincipalId string = identity.properties.principalId
output tenantId string = tenant().tenantId
output subscriptionId string = subscription().subscriptionId
output workbookId string = workbook.id

// Output connection info for GitHub Actions secrets
output githubActionsConfig object = {
  // Secrets to configure in GitHub repository
  AZURE_CLIENT_ID: identity.properties.clientId
  AZURE_TENANT_ID: tenant().tenantId
  AZURE_SUBSCRIPTION_ID: subscription().subscriptionId
  AZURE_MONITOR_DCE_ENDPOINT: dce.properties.logsIngestion.endpoint
  AZURE_MONITOR_DCR_ID: dcr.properties.immutableId
  AZURE_MONITOR_STREAM_NAME: 'Custom-WorkflowRuns_CL'
  AZURE_MONITOR_AUDIT_STREAM_NAME: 'Custom-WorkflowAudit_CL'
}
