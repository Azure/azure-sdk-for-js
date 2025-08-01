<!-- dev-tool snippets ignore -->

# Troubleshooting Azure Monitor Query Metrics client library issues

This troubleshooting guide contains instructions to diagnose frequently encountered issues while using the Azure Monitor Query Metrics client library for JavaScript.

## Table of contents

- [General troubleshooting](#general-troubleshooting)
  - [Enable client logging](#enable-client-logging)
  - [Authentication issues with metrics query requests](#authentication-errors)
- [Metrics query](#metrics-query)
  - [Authorization failed error](#authorization-failed-error-for-metrics-query)
  - [Unsupported granularity](#unsupported-granularity-for-metrics-query)

## General troubleshooting

### Enable client logging

To troubleshoot issues with Azure Monitor Query Metrics library, it's important to first enable logging to monitor the behavior of the application. The errors and warnings in the logs generally provide useful insights into what went wrong and sometimes include corrective actions to fix issues. The Azure SDK client libraries for JavaScript allow you to enable logging with one of the following approaches:

- Through the `AZURE_LOG_LEVEL` environment variable
- At runtime by calling `setLogLevel` in the `@azure/logger` package

#### Logging via environment variable

To see a log of HTTP requests and responses:

1. Set the `AZURE_LOG_LEVEL` environment variable to `info` in your _.env_ file:

```text
AZURE_LOG_LEVEL = info
```

2. Add the following code to the app:

```ts snippet:DotEnvSample
import "dotenv/config";
```

#### Logging using setLogLevel

Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

**NOTE**: When logging the body of request and response, ensure they don't contain confidential information. We already sanitize headers like `Authorization` that contain secrets.

For detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Authentication errors

The Azure Monitor Query Metrics library supports Azure Active Directory authentication. The `MetricsClient` has methods to set the credential. To provide a valid credential, you can use the `@azure/identity` dependency. For more details on getting started, see the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/README.md#create-the-client) of Azure Monitor Query Metrics library. You can also refer to the [Azure Identity documentation](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest) for more details on the various credential types supported in `@azure/identity`.

For more help on troubleshooting authentication errors, see the Azure Identity client library [troubleshooting guide](https://aka.ms/azsdk/js/identity/troubleshoot).

## Metrics query

### Authorization failed error for metrics query

If you get an HTTP error with status code 403 (Forbidden), the provided credentials lack sufficient permissions to query the resource.

```json
{
  "name": "RestError",
  "code": "AuthorizationFailed",
  "statusCode": 403,
  "request": {
    "url": "https://management.azure.com//subscriptions/<subscription_id>/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights/metricDefinitions?api-version=2018-01-01",
    "headers": {
      "accept": "application/json",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query-metrics/1.0.0 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "66dbf2ce-390c-4f9a-ae7f-a5ee3869ab8d",
      "authorization": "REDACTED"
    },
    "method": "GET",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "66dbf2ce-390c-4f9a-ae7f-a5ee3869ab8d",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "error": {
      "code": "AuthorizationFailed",
      "message": "The client '<client-id>' with object id '<object-id>' does not have authorization to perform action 'Microsoft.Insights/metricDefinitions/read' over scope '/subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights' or the scope is invalid. If access was recently granted, please refresh your credentials."
    }
  },
  "message": "The client '<client-id>' with object id '<object-id>' does not have authorization to perform action 'Microsoft.Insights/metricDefinitions/read' over scope '/subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights' or the scope is invalid. If access was recently granted, please refresh your credentials."
}
```

1. Check that the application or user making the request has sufficient permissions:
   - You can refer to this document to [manage access to Azure resources](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal)
2. If the user or application is granted sufficient privileges to query the resource, make sure you're authenticating as that user/application. If you're authenticating using the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential), check the logs to verify that the credential used is the one you expected. To enable logging, see the [Enable client logging](#enable-client-logging) section.

### Unsupported granularity for metrics query

If you notice the following exception, this is due to an invalid time granularity in the metrics query request. Your query might look something like the following, where the granularity is set to an unsupported duration.

```json
{
  "name": "RestError",
  "code": "BadRequest",
  "statusCode": 400,
  "request": {
    "url": "https://management.azure.com//subscriptions/<subscription_id>/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights/metrics?timespan=REDACTED&interval=REDACTED&metricnames=REDACTED&api-version=2018-01-01",
    "headers": {
      "accept": "application/json",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query-metrics/1.0.0 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "684a29a9-b01d-41e8-8ba1-98b49a6d6577",
      "authorization": "REDACTED"
    },
    "method": "GET",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "684a29a9-b01d-41e8-8ba1-98b49a6d6577",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "code": "BadRequest",
    "message": "Invalid time grain duration: PT2M, supported ones are: PT1M,PT5M,PT15M,PT30M,PT1H,PT6H,PT12H,P1D,"
  },
  "message": "Invalid time grain duration: PT2M, supported ones are: PT1M,PT5M,PT15M,PT30M,PT1H,PT6H,PT12H,P1D,"
}
```

As documented in the error message, the supported metrics query granularities are:

- 1 minute (PT1M)
- 5 minutes (PT5M)
- 15 minutes (PT15M)
- 30 minutes (PT30M)
- 1 hour (PT1H)
- 6 hours (PT6H)
- 12 hours (PT12H)
- 1 day (P1D)
