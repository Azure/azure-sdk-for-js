# Microsoft.DatabaseWatcher

Azure Database Watcher is a managed monitoring service for database administrators and DevOps engineers who operate Azure SQL databases at scale. It continuously collects performance diagnostics from Azure SQL Database single databases, elastic pools, and managed instances, streaming the data into an Azure Data Explorer (Kusto) datastore for analysis and alerting. Database Watcher enables proactive performance management without requiring customers to build and maintain custom monitoring infrastructure.

## Hero Scenarios

### Scenario 1 — Create a watcher and configure a datastore

**Persona:** A database administrator setting up monitoring for the first time. They need a watcher connected to their Azure Data Explorer cluster to begin collecting data.

**API call sequence:**

​```http
### Step 1 — Create the watcher
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}?api-version=2025-01-02
Content-Type: application/json

{
  "location": "eastus2",
  "identity": {
    "type": "SystemAssigned"
  },
  "properties": {
    "datastore": {
      "adxClusterResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Kusto/clusters/{clusterName}",
      "kustoClusterUri": "https://{clusterName}.eastus2.kusto.windows.net",
      "kustoDataIngestionUri": "https://ingest-{clusterName}.eastus2.kusto.windows.net",
      "kustoDatabaseName": "database-watcher-data",
      "kustoManagementUrl": "https://{clusterName}.eastus2.kusto.windows.net",
      "kustoOfferingType": "adx"
    }
  }
}

HTTP/1.1 201 Created
Azure-AsyncOperation: https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/locations/eastus2/operationStatuses/{operationId}?api-version=2025-01-02
Retry-After: 10

{
  "id": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
  "name": "{watcherName}",
  "type": "Microsoft.DatabaseWatcher/watchers",
  "location": "eastus2",
  "properties": {
    "provisioningState": "Creating",
    "status": "Stopped",
    "datastore": { "..." }
  }
}
​```

​```http
### Step 2 — Poll until provisioning completes
GET /subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/locations/eastus2/operationStatuses/{operationId}?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "id": "{operationId}",
  "status": "Succeeded"
}
​```

​```http
### Step 3 — Verify the watcher
GET /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "properties": {
    "provisioningState": "Succeeded",
    "status": "Stopped",
    "datastore": { "..." }
  }
}
​```

**What the customer gains:** A fully provisioned database watcher with a configured Kusto datastore, ready to have monitoring targets added.

**Cleanup:** `DELETE /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}?api-version=2025-01-02`

---

### Scenario 2 — Add SQL database targets and start monitoring

**Persona:** A DevOps engineer who has a watcher and wants to monitor two Azure SQL databases — a primary and a read replica — then start data collection.

**API call sequence:**

​```http
### Step 1 — Add a SQL Database target
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}?api-version=2025-01-02
Content-Type: application/json

{
  "properties": {
    "targetType": "SqlDb",
    "targetAuthenticationType": "Aad",
    "connectionServerName": "sql-server-prod.database.windows.net",
    "sqlDbResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/servers/sql-server-prod/databases/orders-db",
    "readIntent": false
  }
}

HTTP/1.1 200 OK

{
  "id": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
  "properties": {
    "provisioningState": "Succeeded",
    "targetType": "SqlDb",
    "connectionServerName": "sql-server-prod.database.windows.net",
    "readIntent": false
  }
}
​```

​```http
### Step 2 — Add a read replica target
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{replicaTargetName}?api-version=2025-01-02
Content-Type: application/json

{
  "properties": {
    "targetType": "SqlDb",
    "targetAuthenticationType": "Aad",
    "connectionServerName": "sql-server-prod.database.windows.net",
    "sqlDbResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/servers/sql-server-prod/databases/orders-db",
    "readIntent": true
  }
}

HTTP/1.1 200 OK
​```

​```http
### Step 3 — Start the watcher
POST /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/start?api-version=2025-01-02

HTTP/1.1 202 Accepted
Azure-AsyncOperation: https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/locations/eastus2/operationStatuses/{operationId}?api-version=2025-01-02
Retry-After: 15
​```

​```http
### Step 4 — Confirm watcher is running
GET /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "properties": {
    "status": "Running",
    "provisioningState": "Succeeded"
  }
}
​```

**What the customer gains:** Active performance monitoring on both the primary database and its read replica, with diagnostics streaming into the Kusto datastore.

**Cleanup:**
1. `POST .../watchers/{watcherName}/stop`
2. `DELETE .../watchers/{watcherName}/targets/{replicaTargetName}`
3. `DELETE .../watchers/{watcherName}/targets/{targetName}`

---

### Scenario 3 — Configure alert rules for proactive notification

**Persona:** A site reliability engineer who wants to be notified via Azure Monitor when watched databases exhibit performance anomalies.

**API call sequence:**

​```http
### Step 1 — Set the default alert rule identity on the watcher
PATCH /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}?api-version=2025-01-02
Content-Type: application/merge-patch+json

{
  "properties": {
    "defaultAlertRuleIdentityResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}"
  }
}

HTTP/1.1 200 OK
​```

​```http
### Step 2 — Create an alert rule resource
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleName}?api-version=2025-01-02
Content-Type: application/json

{
  "properties": {
    "alertRuleResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Insights/scheduledQueryRules/{queryRuleName}",
    "createdWithProperties": "CreatedWithActionGroup",
    "creationTime": "2025-01-15T10:00:00Z",
    "alertRuleTemplateId": "high-cpu-utilization",
    "alertRuleTemplateVersion": "1.0"
  }
}

HTTP/1.1 200 OK
​```

​```http
### Step 3 — List all alert rules for the watcher
GET /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "value": [
    {
      "id": ".../{alertRuleName}",
      "properties": {
        "alertRuleResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Insights/scheduledQueryRules/{queryRuleName}",
        "alertRuleTemplateId": "high-cpu-utilization",
        "provisioningState": "Succeeded"
      }
    }
  ]
}
​```

**What the customer gains:** Proactive alerting on database performance issues, routed through Azure Monitor action groups to email, SMS, or webhook endpoints.

**Cleanup:** `DELETE .../watchers/{watcherName}/alertRuleResources/{alertRuleName}`

---

### Scenario 4 — Establish private connectivity via shared private links

**Persona:** A cloud security architect who needs the watcher to connect to a SQL managed instance over a private endpoint, not the public internet.

**API call sequence:**

​```http
### Step 1 — Create a shared private link to the SQL managed instance
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{splName}?api-version=2025-01-02
Content-Type: application/json

{
  "properties": {
    "privateLinkResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/managedInstances/{miName}",
    "groupId": "managedInstance",
    "requestMessage": "Database Watcher monitoring access for production MI",
    "dnsZone": "767d5869f605"
  }
}

HTTP/1.1 201 Created
Azure-AsyncOperation: https://management.azure.com/.../operationStatuses/{operationId}?api-version=2025-01-02
Retry-After: 30
​```

​```http
### Step 2 — Poll until the private link is provisioned
GET /subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/locations/eastus2/operationStatuses/{operationId}?api-version=2025-01-02

HTTP/1.1 200 OK

{ "status": "Succeeded" }
​```

​```http
### Step 3 — Verify the private link status (owner must approve)
GET /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{splName}?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "properties": {
    "privateLinkResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/managedInstances/{miName}",
    "status": "Pending",
    "provisioningState": "Succeeded"
  }
}
​```

​```http
### Step 4 — After resource owner approves, add the MI target
PUT /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{miTargetName}?api-version=2025-01-02
Content-Type: application/json

{
  "properties": {
    "targetType": "SqlMi",
    "targetAuthenticationType": "Aad",
    "connectionServerName": "sql-mi-prod.767d5869f605.database.windows.net",
    "sqlMiResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/managedInstances/{miName}",
    "connectionTcpPort": 1433
  }
}

HTTP/1.1 200 OK
​```

**What the customer gains:** Secure, private network connectivity between the watcher and the SQL managed instance, satisfying enterprise network isolation requirements.

**Cleanup:**
1. `DELETE .../watchers/{watcherName}/targets/{miTargetName}`
2. `DELETE .../watchers/{watcherName}/sharedPrivateLinkResources/{splName}` (async, poll)

---

### Scenario 5 — Run health validation to diagnose connectivity issues

**Persona:** A database administrator whose watcher is running but not collecting data from a target. They want to diagnose the issue.

**API call sequence:**

​```http
### Step 1 — Trigger health validation
POST /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{validationName}/startValidation?api-version=2025-01-02

HTTP/1.1 202 Accepted
Azure-AsyncOperation: https://management.azure.com/.../operationStatuses/{operationId}?api-version=2025-01-02
Retry-After: 10
​```

​```http
### Step 2 — Poll until validation completes
GET /subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/locations/eastus2/operationStatuses/{operationId}?api-version=2025-01-02

HTTP/1.1 200 OK

{ "status": "Succeeded" }
​```

​```http
### Step 3 — Retrieve validation results
GET /subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{validationName}?api-version=2025-01-02

HTTP/1.1 200 OK

{
  "properties": {
    "startTime": "2025-01-15T14:00:00Z",
    "endTime": "2025-01-15T14:02:30Z",
    "status": "Failed",
    "issues": [
      {
        "errorCode": "MissingPermission",
        "errorMessage": "The watcher managed identity does not have the required database role on target sql-server-prod/orders-db.",
        "recommendationMessage": "Grant the watcher identity the 'database_watcher_agent' role on the target database.",
        "recommendationUrl": "https://learn.microsoft.com/azure/database-watcher/configure-permissions",
        "relatedResourceId": "/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.Sql/servers/sql-server-prod/databases/orders-db",
        "relatedResourceType": "Microsoft.Sql/servers/databases"
      }
    ],
    "provisioningState": "Succeeded"
  }
}
​```

**What the customer gains:** A clear, actionable diagnosis of why monitoring is failing — including the specific permission, target resource, and a link to remediation documentation — without needing to manually debug connectivity.

**Cleanup:** Health validations are read-only resources; no cleanup needed.
