# Troubleshooting App Configuration issues

This troubleshooting guide covers failure investigation techniques, common errors for the credential types in the Azure 
App Configuration JavaScript client library, and mitigation steps to resolve these errors.

## Table of Contents

* [General Troubleshooting](#general-troubleshooting)
  * [Enable client logging](#enable-client-logging)
  * [Authentication issues](#authentication-issues)
  * [Limit issues](#limit-issues)
* [Get additional help](#get-additional-help)

## General Troubleshooting

### Enable client logging

To troubleshoot issues with Azure App Configuration library, it is important to first enable logging to monitor the
behavior of the application. The errors and warnings in the logs generally provide useful insights into what went wrong 
and sometimes include corrective actions to fix issues. The Azure SDK client libraries for JavaScript allow you to enable logging with one of the following approaches:

- Through the `AZURE_LOG_LEVEL` environment variable
- At runtime by calling `setLogLevel` in the `@azure/logger` package

#### Logging via environment variable

To see a log of HTTP requests and responses:

 Set the `AZURE_LOG_LEVEL` environment variable to `info`:

  ```text
  // Windows
  set AZURE_LOG_LEVEL = info
  // Linux based
  export AZURE_LOG_LEVEL = info
  ```

#### Logging using setLogLevel

Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

**NOTE**: When logging the body of request and response, ensure they don't contain confidential information. We already sanitize headers like `Authorization` that contain secrets.

For detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Authentication issues

In addition to connection strings, Azure App Configuration supports [role-based access control](https://learn.microsoft.com/azure/role-based-access-control/overview) (RBAC) using Azure Active Directory authentication. You can use the `@azure/identity` dependency to provide a valid credential. For more details on getting started, see the [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appconfiguration/app-configuration) of Azure App Configuration library. 

#### Permission issues

Calls to service clients resulting in an error with HTTP code 401 or 403 often indicate the caller doesn't have sufficient permissions for the specified API. Check the service documentation to determine which RBAC roles are needed for the specific request, and ensure the authenticated user or service principal has been granted the appropriate roles on the resource. More information on App Configuration roles can be found [here](https://learn.microsoft.com/azure/azure-app-configuration/concept-enable-rbac#azure-built-in-roles-for-azure-app-configuration).

For more help with troubleshooting authentication errors, see the Azure Identity client library [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/TROUBLESHOOTING.md).

### Limit Issues
Azure App Configuration service methods throw a RestError or its subclass on failure. The error thrown by the App Configuration client library includes a detailed response error object that provides specific useful insights into what went wrong and includes corrective actions to fix common issues. A common error encountered is HTTP status code 429 for exceeding the limit. Refer to the body of the 429 response for the specific reason why the request failed. The failures often happen under these circumstances:

* Exceeding the daily request limit for a store in the Free tier.
* Exceeding the hourly request limit for a store in the standard tier.
* Momentary throttling due to a large burst of requests†.
* Excessive bandwidth usage.
* Attempting to create or modify a key when the storage quota is exceeded.

To reduce number of requests made to App Configuration service, please check out [this guide](https://learn.microsoft.com/azure/azure-app-configuration/howto-best-practices#reduce-requests-made-to-app-configuration).

## Get additional help

Additional information on ways to reach out for support can be found in the [FAQ](https://learn.microsoft.com/azure/azure-app-configuration/faq) for Azure App Configuration service and common best practice samples can be found in [Best Practice Samples](https://learn.microsoft.com/azure/azure-app-configuration/howto-best-practices).
