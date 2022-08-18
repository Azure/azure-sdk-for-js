# Troubleshoot Azure Container Registry client library issues

This troubleshooting guide contains instructions to diagnose frequently encountered issues while using the Azure Container Registry client library for JavaScript and TypeScript.

## General Troubleshooting

Container registry service methods throw [`RestError`] on failure.

### Enable client logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

See the [logger reference documentation][logging reference] for more information on how to configure logging.

## Troubleshooting authentication errors

### HTTP 401 Errors

HTTP 401 errors indicate problems authenticating. Check the exception message or logs for more information.

#### Anonymous access issues

You may see an error similar to the one below. It indicates an attempt to perform an operation that requires authentication without credentials.

```
{"errors":[{"code":"UNAUTHORIZED","message":"authentication required, visit https://aka.ms/acr/authorization for
more information."}]}
```

Unauthorized (anonymous) access can only be enabled for read (pull) operations such as listing repositories, getting properties or tags. Refer to [Anonymous pull access] to learn about the limitations of anonymous access.

### HTTP 403 Errors

HTTP 403 errors indicate that user is not authorized to perform a specific operation in Azure Container Registry.

#### Insufficient permissions

If you see an error similar to the one below, it means that the provided credentials do not have permission to access the registry.

```
RestError: {"errors":[{"code":"DENIED","message":"retrieving permissions failed"}]}
```

To resolve:

1. Check that the application or user that is making the request has sufficient permissions. Check [Troubleshoot registry login] for possible solutions.
1. If the user or application is granted sufficient privileges to query the workspace, make sure you are authenticating as that user/application. If you are authenticating using [DefaultAzureCredential], check the logs to verify that the credential used is the one you expected. To enable logging, see the [Enable client logging] section above.

#### Network access issues

The below error indicates that public access to the Azure Container Registry is disabled or restricted. Refer to [Troubleshoot network issues with registry] for more information.

```
RestError: {"errors":[{"code":"DENIED","message":"client with IP '<your IP address>' is not allowed access. Refer https://aka.m
s/acr/firewall to grant access."}]}
```

<!-- Links -->

[`resterror`]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/src/restError.ts
[azure logger client library]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger
[logging reference]: https://docs.microsoft.com/javascript/api/overview/azure/logger-readme
[anonymous pull access]: https://docs.microsoft.com/azure/container-registry/anonymous-pull-access
[troubleshoot registry login]: https://docs.microsoft.com/azure/container-registry/container-registry-troubleshoot-login
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#authenticating-with-the-defaultazurecredential
[enable client logging]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/TROUBLESHOOTING.md#enable-client-logging
[troubleshoot network issues with registry]: https://docs.microsoft.com/azure/container-registry/container-registry-troubleshoot-access

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcontainerregistry%2Fcontainer-registry%TROUBLESHOOTING.png)
