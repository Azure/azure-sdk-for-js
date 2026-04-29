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

@description('Unique suffix for resource names (use existing suffix to reuse workspace)')
param nameSuffix string = '54ua3vksrntq4'

@description('GitHub organization for OIDC federation')
param githubOrg string = 'Azure'

@description('GitHub repository for OIDC federation')
param githubRepo string = 'azure-sdk-tools'

@description('Optional: Additional principal IDs to grant Monitoring Metrics Publisher role (e.g., for local testing)')
param additionalPublisherPrincipalIds array = []

@description('Resource owner alias (for EngSys compliance)')
param ownerAlias string = 'dealmaha'

@description('Email address for alert notifications (leave empty to disable)')
param alertEmail string = ''

@description('Repositories to monitor (comma-separated)')
param monitoredRepositories string = 'Azure/azure-sdk-for-js,Azure/azure-sdk-for-python,Azure/azure-sdk-for-net,Azure/azure-sdk-for-java,Azure/azure-sdk-for-go,Azure/azure-sdk-tools,Azure/azure-rest-api-specs'

// Common tags for EngSys compliance
var commonTags = {
  Owners: ownerAlias
  Purpose: 'Agentic Workflows Dashboard - monitors GitHub Copilot usage across Azure SDK repos'
  DoNotDelete: 'true'
}

// Resource naming
var workspaceName = 'law-agentic-workflows-${environment}-${nameSuffix}'
var dceName = 'dce-agentic-workflows-${environment}-${nameSuffix}'
var dcrName = 'dcr-agentic-workflows-${environment}'
var identityName = 'id-agentic-workflows-${environment}'

// Log Analytics Workspace
resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  tags: commonTags
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
        { name: 'Repository', type: 'string', description: 'GitHub repository (owner/name)' }
        { name: 'WorkflowName', type: 'string', description: 'Workflow name without extension' }
        { name: 'WorkflowId', type: 'long', description: 'GitHub workflow ID' }
        { name: 'RunId', type: 'long', description: 'GitHub run ID' }
        { name: 'RunAttempt', type: 'int', description: 'Run attempt number' }
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
        { name: 'PullRequestRepo', type: 'string', description: 'Repo where PR exists (may differ for forks)' }
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
        { name: 'Turns', type: 'int', description: 'Number of agent turns' }
        { name: 'ToolCalls', type: 'int', description: 'Number of tool calls' }
        { name: 'ErrorCount', type: 'int', description: 'Number of errors' }
        { name: 'ModelId', type: 'string', description: 'Model identifier (e.g. claude-sonnet-4.6)' }
        { name: 'RequestCount', type: 'int', description: 'Number of LLM requests' }
        { name: 'DurationMs', type: 'long', description: 'Total LLM duration in milliseconds' }
        { name: 'EstimatedCostUSD', type: 'real', description: 'Estimated cost using model-specific rates' }
        { name: 'EstimatedSavingsUSD', type: 'real', description: 'Estimated savings from cache (model-specific)' }
        { name: 'IsPrimaryModel', type: 'boolean', description: 'True if this is the primary model for the run' }
        { name: 'HasTokenData', type: 'boolean', description: 'True if run had token usage data' }
        { name: 'AuditStatus', type: 'string', description: 'Audit status: success, no_firewall, zero_tokens, audit_failed' }
        { name: 'AuditVersion', type: 'int', description: 'Audit schema version (current: 25)' }
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
  tags: commonTags
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
  tags: commonTags
  properties: {
    dataCollectionEndpointId: dce.id
    streamDeclarations: {
      'Custom-WorkflowRuns_CL': {
        columns: [
          { name: 'TimeGenerated', type: 'datetime' }
          { name: 'Repository', type: 'string' }
          { name: 'WorkflowName', type: 'string' }
          { name: 'WorkflowId', type: 'long' }
          { name: 'RunId', type: 'long' }
          { name: 'RunAttempt', type: 'int' }
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
          { name: 'PullRequestRepo', type: 'string' }
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
          { name: 'Turns', type: 'int' }
          { name: 'ToolCalls', type: 'int' }
          { name: 'ErrorCount', type: 'int' }
          { name: 'ModelId', type: 'string' }
          { name: 'RequestCount', type: 'int' }
          { name: 'DurationMs', type: 'long' }
          { name: 'EstimatedCostUSD', type: 'real' }
          { name: 'EstimatedSavingsUSD', type: 'real' }
          { name: 'IsPrimaryModel', type: 'boolean' }
          { name: 'HasTokenData', type: 'boolean' }
          { name: 'AuditStatus', type: 'string' }
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
  tags: commonTags
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

// Role assignments for additional principals (e.g., local testing users) - on DCR
resource additionalPublisherRoles 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for (principalId, i) in additionalPublisherPrincipalIds: {
  name: guid(dcr.id, principalId, 'Monitoring Metrics Publisher Additional')
  scope: dcr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: principalId
    principalType: 'User'
  }
}]

// Role assignments for additional principals on DCE (required for ingestion)
resource additionalDcePublisherRoles 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for (principalId, i) in additionalPublisherPrincipalIds: {
  name: guid(dce.id, principalId, 'Monitoring Metrics Publisher DCE')
  scope: dce
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
            query: 'WorkflowRuns_CL | where Repository !startswith "Azure/test" | distinct Repository | order by Repository asc'
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
              query: 'let collectorLast = toscalar(WorkflowRuns_CL | summarize max(TimeGenerated)); let auditLast = toscalar(WorkflowAudit_CL | summarize max(TimeGenerated)); print CollectorAge=format_timespan(now()-collectorLast, "d.hh:mm"), AuditAge=format_timespan(now()-coalesce(auditLast, datetime(1970-01-01)), "d.hh:mm"), CollectorStale=iff(now()-collectorLast > 2h, "⚠️ STALE", "✓ Fresh"), AuditStale=iff(coalesce(auditLast, datetime(1970-01-01)) < ago(25h), "⚠️ STALE", "✓ Fresh")'
              size: 4
              title: 'Pipeline Health'
              queryType: 0
              visualization: 'tiles'
              tileSettings: { titleContent: { columnMatch: 'CollectorStale' }, subtitleContent: { columnMatch: 'CollectorAge' } }
              noDataMessage: 'No data ingested yet. Run: npm run collect'
            }
            customWidth: '100'
            name: 'pipelineHealth'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure"), Cancelled=countif(Conclusion=="cancelled") | extend SuccessRate=round(100.0*Success/Total, 1) | project Total, Success, Failures, Cancelled, SuccessRate'
              size: 0
              title: 'Summary'
              queryType: 0
              visualization: 'table'
              noDataMessage: 'No matching data for current filters/time range.'
            }
            customWidth: '100'
            name: 'kpiTiles'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success") by bin(CompletedAt, 1d) | extend SuccessRate=round(100.0*Success/Total, 1) | project Day=CompletedAt, SuccessRate | order by Day asc'
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
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Runs=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure"), Cancelled=countif(Conclusion=="cancelled") by Repository | extend SuccessRate=round(100.0*Success/Runs, 1) | project Repository, Runs, Success, Failures, Cancelled, SuccessRate | order by Runs desc'
              size: 0
              title: 'By Repository'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'SuccessRate', formatter: 8, formatOptions: { palette: 'redGreen', min: 0, max: 100 } }, { columnMatch: 'Failures', formatter: 8, formatOptions: { palette: 'red' } } ] }
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
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where Duration_s > 0 | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize P50=round(percentile(Duration_s, 50)/60, 1), P90=round(percentile(Duration_s, 90)/60, 1), Runs=count() by WorkflowName | project WorkflowName, Runs, P50, P90 | order by P90 desc'
              size: 0
              title: 'Duration by Workflow (minutes)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'P90', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'No completed workflow runs found.'
            }
            customWidth: '100'
            name: 'durationStats'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Total=count(), Success=countif(Conclusion=="success"), Failures=countif(Conclusion=="failure") by WorkflowName | extend SuccessRate=round(100.0*Success/Total, 1) | project WorkflowName, Total, SuccessRate, Failures | order by Total desc'
              size: 0
              title: 'Success Rate by Workflow'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'SuccessRate', formatter: 8, formatOptions: { palette: 'redGreen', min: 0, max: 100 } }, { columnMatch: 'Failures', formatter: 8, formatOptions: { palette: 'red' } } ] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '100'
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
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize Failures=count() by bin(CompletedAt, 1d) | order by CompletedAt asc'
              size: 0
              title: 'Failures Over Time'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Failures', color: 'redBright' }] }
              noDataMessage: 'No failures in selected time range.'
            }
            customWidth: '100'
            name: 'failuresOverTime'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v8: Sort by CompletedAt (failure time), not TimeGenerated (ingestion time)
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where Conclusion == "failure" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | extend AttemptUrl=strcat(RunUrl, "/attempts/", tostring(RunAttempt)) | project CompletedAt, Repository, WorkflowName, Actor, AttemptUrl | order by CompletedAt desc | take 10'
              size: 0
              title: 'Recent Failures'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'AttemptUrl', formatter: 7, formatOptions: { linkTarget: 'Url', linkLabel: 'View' } } ] }
              noDataMessage: 'No failures in selected time range.'
            }
            customWidth: '100'
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
              query: 'let repos = dynamic([{Repository}]); WorkflowRuns_CL | where Repository !startswith "Azure/test" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt | where PullRequestNumber > 0 | extend IsForkPR = isnotempty(PullRequestRepo) and PullRequestRepo != Repository | summarize UniquePRs=dcount(PullRequestNumber), ForkPRs=dcountif(PullRequestNumber, IsForkPR == true), MainPRs=dcountif(PullRequestNumber, IsForkPR == false), Runs=count() by Repository | project Repository, UniquePRs, ForkPRs, MainPRs, Runs | order by UniquePRs desc'
              size: 0
              title: 'Unique PRs by Source (Fork vs Main Repo)'
              queryType: 0
              visualization: 'table'
              noDataMessage: 'No pull request runs found.'
            }
            customWidth: '100'
            name: 'forkTable'
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
            customWidth: '100'
            name: 'agentComplexity'
          }
          // v24: Combined token usage and cost trend into single chart
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | summarize TotalTokens=sum(InputTokens+OutputTokens)/1000000, TotalCost=round(sum(EstimatedCostUSD), 2) by bin(CompletedAt, 1d) | project Day=CompletedAt, TokensM=round(TotalTokens, 2), CostUSD=TotalCost | order by Day asc'
              size: 0
              title: 'Daily Usage: Tokens (M) & Cost ($)'
              queryType: 0
              visualization: 'linechart'
              chartSettings: { yAxis: ['TokensM', 'CostUSD'], seriesLabelSettings: [{ seriesName: 'TokensM', label: 'Tokens (M)', color: 'blue' }, { seriesName: 'CostUSD', label: 'Cost ($)', color: 'green' }] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '100'
            name: 'usageTrend'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              // v7: Fixed to sum tokens across models, use max for run-level fields
              query: 'let repos = dynamic([{Repository}]); let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; let runLevel = audits | summarize TotalCost=sum(EstimatedCostUSD), TotalInput=sum(InputTokens), TotalOutput=sum(OutputTokens), Turns=max(Turns), ToolCalls=max(ToolCalls), Repository=take_any(Repository), WorkflowName=take_any(WorkflowName) by RunId, RunAttempt; runLevel | top 10 by TotalCost desc | extend RunUrl=strcat("https://github.com/", Repository, "/actions/runs/", tostring(RunId)) | project Repository, WorkflowName, Turns, ToolCalls, TotalCost=round(TotalCost, 4), RunUrl'
              size: 0
              title: 'Top 10 Most Expensive Runs'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } }, { columnMatch: 'RunUrl', formatter: 7, formatOptions: { linkTarget: 'Url', linkLabel: 'View' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '100'
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
            customWidth: '100'
            name: 'costByWorkflow'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt | where PullRequestNumber > 0; let audits = WorkflowAudit_CL | where CompletedAt {TimeRange} | where HasTokenData == true | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt, ModelId; audits | join kind=inner (runs | project RunId, RunAttempt, PullRequestNumber, PullRequestRepo, Repository) on RunId, RunAttempt | extend PRRepo = coalesce(PullRequestRepo, Repository1) | extend RunKey = strcat(tostring(RunId), ":", tostring(RunAttempt)) | summarize TotalCost=round(sum(EstimatedCostUSD), 4), Runs=dcount(RunKey), PRRepo=take_any(PRRepo) by PullRequestNumber, Repository1 | top 20 by TotalCost desc | extend PRUrl=strcat("https://github.com/", coalesce(PRRepo, Repository1), "/pull/", tostring(PullRequestNumber)) | project Repository=Repository1, PullRequestNumber, Runs, TotalCost, PRUrl'
              size: 0
              title: 'Top 20 Most Expensive PRs'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'TotalCost', formatter: 8, formatOptions: { palette: 'orange' } }, { columnMatch: 'PRUrl', formatter: 7, formatOptions: { linkTarget: 'Url', linkLabel: 'View' } } ] }
              noDataMessage: 'Run audit enrichment to populate WorkflowAudit_CL.'
            }
            customWidth: '100'
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
            customWidth: '100'
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
            customWidth: '100'
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
            customWidth: '100'
            name: 'costByModel'
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
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where isnotnull(QueueTime_s) | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | summarize P50=round(percentile(QueueTime_s, 50), 1), P90=round(percentile(QueueTime_s, 90), 1), P99=round(percentile(QueueTime_s, 99), 1), AvgQueue=round(avg(QueueTime_s), 1) by WorkflowName | project WorkflowName, AvgQueue, P50, P90, P99 | order by P90 desc'
              size: 0
              title: 'Queue Time by Workflow (seconds)'
              queryType: 0
              visualization: 'table'
              gridSettings: { formatters: [ { columnMatch: 'P90', formatter: 8, formatOptions: { palette: 'orange' } } ] }
              noDataMessage: 'No queue time data available.'
            }
            customWidth: '100'
            name: 'queueTime'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | extend Hour=hourofday(CompletedAt) | summarize Runs=count() by Hour | order by Hour asc'
              size: 0
              title: 'Peak Usage by Hour (UTC)'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Runs', color: 'blue' }] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '100'
            name: 'peakUsageHour'
          }
          {
            type: 3
            content: {
              version: 'KqlItem/1.0'
              query: 'let repos = dynamic([{Repository}]); let runs = WorkflowRuns_CL | where Repository !startswith "Azure/test" | where isnotempty(Conclusion) and Conclusion != "skipped" | where CompletedAt {TimeRange} | where array_length(repos) == 0 or Repository in (repos) | summarize arg_max(TimeGenerated, *) by RunId, RunAttempt; runs | extend DayNum=toint(dayofweek(CompletedAt)/1d) | summarize Runs=count() by DayNum | order by DayNum asc | extend Day=case(DayNum==0, "Sun", DayNum==1, "Mon", DayNum==2, "Tue", DayNum==3, "Wed", DayNum==4, "Thu", DayNum==5, "Fri", "Sat") | project Day, Runs'
              size: 0
              title: 'Peak Usage by Day'
              queryType: 0
              visualization: 'barchart'
              chartSettings: { seriesLabelSettings: [{ seriesName: 'Runs', color: 'green' }] }
              noDataMessage: 'No workflow runs found.'
            }
            customWidth: '100'
            name: 'peakUsageDay'
          }
        ]
      }
      name: 'operationalSection'
    }
  ]
  fallbackResourceIds: [workspace.id]
}
resource workbook 'Microsoft.Insights/workbooks@2023-06-01' = {
  name: guid(resourceGroup().id, 'agentic-workflows-dashboard')
  location: location
  tags: commonTags
  kind: 'shared'
  properties: {
    displayName: 'Agentic Workflows Dashboard'
    category: 'workbook'
    sourceId: workspace.id
    serializedData: string(workbookContent)
  }
}

// Resource lock to prevent accidental deletion
resource workspaceLock 'Microsoft.Authorization/locks@2020-05-01' = {
  name: 'CanNotDelete-AgenticWorkflows'
  scope: workspace
  properties: {
    level: 'CanNotDelete'
    notes: 'Prevents accidental deletion of the Agentic Workflows Dashboard workspace'
  }
}

// ===== AZURE CONTAINER APPS JOB FOR AUTOMATED COLLECTION =====

// Authentication options (choose one, in order of preference):

// Option 1: EngSys Key Vault signing (RECOMMENDED - most secure)
// Uses the shared Azure SDK Automation App with non-exportable key in EngSys Key Vault.
// Private key never leaves Key Vault - only used for signing operations.
// Requires: Key Vault Crypto User role on azuresdkengkeyvault (request from EngSys team)
@description('EngSys Key Vault name for JWT signing (e.g., azuresdkengkeyvault)')
param githubKvName string = ''

@description('EngSys Key Vault key name for JWT signing (e.g., azure-sdk-automation)')
param githubKvKeyName string = ''

@description('GitHub App ID (e.g., 1086291 for Azure SDK Automation)')
param githubAppId string = ''

@description('GitHub org/user to get installation token for (default: Azure)')
param githubInstallationOwner string = 'Azure'

// Option 2: GitHub App with private key (alternative - your own App)
@description('GitHub App Private Key (PEM format) - only if NOT using EngSys KV')
@secure()
param githubAppPrivateKey string = ''

@description('GitHub App Installation ID - only if NOT using EngSys KV')
param githubAppInstallationId string = ''

// Option 3: GitHub PAT (legacy - avoid in production)
@description('GitHub Personal Access Token (legacy - prefer GitHub App)')
@secure()
param githubToken string = ''

@description('Enable Container Apps Job deployment (default: true for production)')
param deployContainerJob bool = true

// Determine auth mode
var useEngSysKv = !empty(githubKvName) && !empty(githubKvKeyName) && !empty(githubAppId)
var useGitHubAppWithKey = !useEngSysKv && !empty(githubAppId) && !empty(githubAppPrivateKey) && !empty(githubAppInstallationId)
var usePat = !useEngSysKv && !useGitHubAppWithKey && !empty(githubToken)

// Key Vault for local secret storage (only needed if NOT using EngSys KV)
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = if (deployContainerJob && !useEngSysKv) {
  name: 'kv-aw-${nameSuffix}'
  location: location
  tags: commonTags
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 7
  }
}

// Store GitHub App private key in Key Vault (Option 2 only)
resource ghAppKeySecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = if (deployContainerJob && useGitHubAppWithKey) {
  parent: keyVault
  name: 'github-app-private-key'
  properties: {
    value: githubAppPrivateKey
    contentType: 'application/x-pem-file'
  }
}

// Store GitHub PAT in Key Vault (Option 3 only)
resource ghTokenSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = if (deployContainerJob && usePat) {
  parent: keyVault
  name: 'github-token'
  properties: {
    value: githubToken
    contentType: 'text/plain'
  }
}

// Grant Container Job identity access to local Key Vault secrets (Options 2 & 3)
resource kvSecretsUserRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (deployContainerJob && !useEngSysKv) {
  name: guid(keyVault.id, containerJobIdentity.id, 'Key Vault Secrets User')
  scope: keyVault
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '4633458b-17de-408a-b874-0445c86b69e6') // Key Vault Secrets User
    principalId: containerJobIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Azure Container Registry for collector image
resource acr 'Microsoft.ContainerRegistry/registries@2023-07-01' = if (deployContainerJob) {
  name: 'acrawcollector${nameSuffix}'
  location: location
  tags: commonTags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
    publicNetworkAccess: 'Enabled'
  }
}

// Container Apps Environment
resource containerEnv 'Microsoft.App/managedEnvironments@2024-03-01' = if (deployContainerJob) {
  name: 'cae-agentic-workflows-${environment}'
  location: location
  tags: commonTags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: workspace.listKeys().primarySharedKey
      }
    }
  }
}

// Storage account for Container Apps Job (state tracking)
resource containerStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = if (deployContainerJob) {
  name: 'stawjob${nameSuffix}'
  location: location
  tags: commonTags
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowSharedKeyAccess: false
    allowBlobPublicAccess: false
  }
}

// User-assigned Managed Identity for Container Job
resource containerJobIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = if (deployContainerJob) {
  name: 'id-aw-collector-job-${environment}'
  location: location
  tags: commonTags
}

// Grant Container Job identity AcrPull role on ACR
resource containerJobAcrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (deployContainerJob) {
  name: guid(acr.id, containerJobIdentity.id, 'AcrPull')
  scope: acr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')
    principalId: containerJobIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Container Apps Job - runs on schedule with gh CLI for auditing
resource collectorJob 'Microsoft.App/jobs@2024-03-01' = if (deployContainerJob) {
  name: 'job-aw-collector-${environment}'
  location: location
  tags: commonTags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${containerJobIdentity.id}': {}
    }
  }
  properties: {
    environmentId: containerEnv.id
    configuration: {
      triggerType: 'Schedule'
      scheduleTriggerConfig: {
        cronExpression: '0 */6 * * *'  // Every 6 hours
        parallelism: 1
        replicaCompletionCount: 1
      }
      replicaTimeout: 1800  // 30 minutes max
      replicaRetryLimit: 1
      registries: [
        {
          server: deployContainerJob ? acr.properties.loginServer : ''
          identity: containerJobIdentity.id
        }
      ]
      // Secrets from Key Vault (only needed for Options 2 & 3, not EngSys KV)
      secrets: useEngSysKv ? [] : (useGitHubAppWithKey ? [
        {
          name: 'github-app-private-key'
          keyVaultUrl: '${keyVault.properties.vaultUri}secrets/github-app-private-key'
          identity: containerJobIdentity.id
        }
      ] : usePat ? [
        {
          name: 'github-token'
          keyVaultUrl: '${keyVault.properties.vaultUri}secrets/github-token'
          identity: containerJobIdentity.id
        }
      ] : [])
    }
    template: {
      containers: [
        {
          name: 'collector'
          image: deployContainerJob ? '${acr.properties.loginServer}/aw-collector:latest' : ''
          resources: {
            cpu: json('1.0')
            memory: '2Gi'
          }
          env: concat([
            {
              name: 'AZURE_MONITOR_DCE_ENDPOINT'
              value: dce.properties.logsIngestion.endpoint
            }
            {
              name: 'AZURE_MONITOR_DCR_ID'
              value: dcr.properties.immutableId
            }
            {
              name: 'STORAGE_ACCOUNT_NAME'
              value: deployContainerJob ? containerStorage.name : ''
            }
            {
              name: 'REPOSITORIES'
              value: monitoredRepositories
            }
            {
              name: 'AZURE_CLIENT_ID'
              value: deployContainerJob ? containerJobIdentity.properties.clientId : ''
            }
          ], useEngSysKv ? [
            // Option 1: EngSys Key Vault signing (most secure)
            {
              name: 'GITHUB_KV_NAME'
              value: githubKvName
            }
            {
              name: 'GITHUB_KV_KEY_NAME'
              value: githubKvKeyName
            }
            {
              name: 'GITHUB_APP_ID'
              value: githubAppId
            }
            {
              name: 'GITHUB_INSTALLATION_OWNER'
              value: githubInstallationOwner
            }
          ] : useGitHubAppWithKey ? [
            // Option 2: GitHub App with private key
            {
              name: 'GITHUB_APP_ID'
              value: githubAppId
            }
            {
              name: 'GITHUB_APP_PRIVATE_KEY'
              secretRef: 'github-app-private-key'
            }
            {
              name: 'GITHUB_APP_INSTALLATION_ID'
              value: githubAppInstallationId
            }
          ] : usePat ? [
            // Option 3: PAT (legacy)
            {
              name: 'GITHUB_TOKEN'
              secretRef: 'github-token'
            }
            {
              name: 'GH_TOKEN'
              secretRef: 'github-token'
            }
          ] : [])
        }
      ]
    }
  }
}

// Storage Blob Data Owner role for Container Job
resource containerJobStorageBlobRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (deployContainerJob) {
  name: guid(containerStorage.id, containerJobIdentity.id, 'Storage Blob Data Owner')
  scope: containerStorage
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b')
    principalId: containerJobIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Monitoring Metrics Publisher role for Container Job (on DCR)
resource containerJobDcrRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (deployContainerJob) {
  name: guid(dcr.id, containerJobIdentity.id, 'Monitoring Metrics Publisher Job')
  scope: dcr
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '3913510d-42f4-4e42-8a64-420c390055eb')
    principalId: containerJobIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Alert for Container Apps Job failures
resource jobFailureAlert 'Microsoft.Insights/scheduledQueryRules@2023-03-15-preview' = if (deployContainerJob) {
  name: 'alert-aw-collector-failure-${environment}'
  location: location
  tags: commonTags
  properties: {
    displayName: 'Agentic Workflows Collector Job Failure'
    description: 'Alerts when the Container Apps Job fails to collect workflow data'
    severity: 2 // Warning
    enabled: true
    evaluationFrequency: 'PT1H'
    scopes: [
      workspace.id
    ]
    windowSize: 'PT6H'
    criteria: {
      allOf: [
        {
          query: '''
            ContainerAppConsoleLogs_CL
            | where ContainerJobName_s == "job-aw-collector-prod"
            | where Log_s contains "[ERROR]" or Log_s contains "Fatal error"
            | summarize ErrorCount = count() by bin(TimeGenerated, 1h)
            | where ErrorCount > 0
          '''
          timeAggregation: 'Count'
          operator: 'GreaterThan'
          threshold: 0
          failingPeriods: {
            numberOfEvaluationPeriods: 1
            minFailingPeriodsToAlert: 1
          }
        }
      ]
    }
    autoMitigate: true
    actions: {
      actionGroups: alertEmail != '' ? [alertActionGroup.id] : []
    }
  }
}

// Action Group for alert notifications (only if email provided)
resource alertActionGroup 'Microsoft.Insights/actionGroups@2023-01-01' = if (deployContainerJob && alertEmail != '') {
  name: 'ag-aw-collector-${environment}'
  location: 'global'
  tags: commonTags
  properties: {
    groupShortName: 'aw-alerts'
    enabled: true
    emailReceivers: [
      {
        name: 'Owner'
        emailAddress: alertEmail
        useCommonAlertSchema: true
      }
    ]
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
output containerJobName string = deployContainerJob ? collectorJob.name : ''
output containerJobIdentityClientId string = deployContainerJob ? containerJobIdentity.properties.clientId : ''
output acrLoginServer string = deployContainerJob ? acr.properties.loginServer : ''
output acrName string = deployContainerJob ? acr.name : ''
output monitoredRepositories string = monitoredRepositories

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
