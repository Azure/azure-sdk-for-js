# Authentication Events Trigger for Azure Functions client library for Node

Authentication Event Trigger for Azure Functions handles all the backend processing, (e.g. token/json schema validation) for incoming Http requests for Authentication events. And provides the developer with a strongly typed, versioned object model to work with, meaning the developer need not have any prior knowledge of the request and response json payloads.

This project framework provides the following features:

* Token validation for securing the API call
* Object model, typing, and IDE intellisense
* Inbound and outbound validation of the API request and response schemas
* Versioning
* No need for boilerplate code.

## Getting started

### Install the npm package

```console
npm install @azure/functions-authentication-events 
```

### Prerequisites

* [Azure function tools](https://github.com/Azure/azure-functions-core-tools)
* [Azure Function Core Tools](https://github.com/Azure/azure-functions-core-tools#installing)
* If using Visual Studio Code the following extensions:
  * [ms-azuretools.vscode-azurefunctions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
  * [ms-dotnettools.csharp](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

### Authenticate the Client

When Azure AD authentication events service calls your custom extension, it will send an `Authorization` header with a `Bearer {token}`. This token will represent a [service to service authentication](https://review.docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow) in which:

* The '**resource**', also known as the **audience**, is the application that you register to represent your API. This is represented by the `aud` claim in the token.
* The '**client**' is a Microsoft application that represents the Azure AD authentication events service. It has an `appId` value of `99045fe1-7639-4a75-9d4a-577b6ca3810f`. This is represented by:
  * The `azp` claim in the token if your application `accessTokenAcceptedVersion` property is set to `2`.
  * The `appid` claim in the token if your resource application's `accessTokenAcceptedVersion` property is set to `1` or `null`.

There are three approaches to dealing with the token. You can customize the behavior using [application settings](https://docs.microsoft.com/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal#settings) as shown below or via the [local.settings.json](https://docs.microsoft.com/azure/azure-functions/functions-develop-local#local-settings-file) file in local environments.

#### Validate tokens using Azure Functions Azure AD authentication integration

When running your function in production, it is **highly recommended** to use the [Azure Functions Azure AD authentication integration](https://docs.microsoft.com/azure/app-service/configure-authentication-provider-aad#-option-2-use-an-existing-registration-created-separately) for validating incoming tokens.

1. Go to the "Authentication" tab in your Function App
2. Click on "Add identity provider"
3. Select "Microsoft" as the identity provider
4. Select "Provide the details of an existing app registration"
5. Enter the `Application ID` of the app that represents your API in Azure AD

The issuer and allowed audience depends on the [`accessTokenAcceptedVersion`](https://review.docs.microsoft.com/azure/active-directory/develop/access-tokens) property of your application (can be found in the "Manifest" of the application).

If the `accessTokenAcceptedVersion` property is set to `2`:
6. Set the `Issuer URL to "https://login.microsoftonline.com/{tenantId}/v2.0"
7. Set an 'Allowed Audience' to the Application ID (`appId`)

If the `accessTokenAcceptedVersion` property is set to `1` or `null`:
6. Set the `Issuer URL to "https://sts.windows.net/{tenantId}/"
7. Set an 'Allowed Audience' to the Application ID URI (also known as`identifierUri`). It should be in the format of`api://{azureFunctionAppName}.azurewebsites.net/{resourceApiAppId}` or `api://{FunctionAppFullyQualifiedDomainName}/{resourceApiAppId}` if using a [custom domain name](https://docs.microsoft.com/azure/dns/dns-custom-domain#:~:text=Azure%20Function%20App%201%20Navigate%20to%20Function%20App,Custom%20domain%20text%20field%20and%20select%20Validate.%20).

By default, the Authentication event trigger will validate that Azure Function authentication integration is configured and it will check that the **client** in the token is set to `99045fe1-7639-4a75-9d4a-577b6ca3810f` (via the `azp` or `appid` claims in the token).

If you want to test your API against some other client that is not Azure AD authentication events service, like using Postman, you can configure an _optional_ application setting:

* **AuthenticationEvents__CustomCallerAppId** - the guid of your desired client. If not provided, `99045fe1-7639-4a75-9d4a-577b6ca3810f` is assumed.

#### Have the trigger validate the token

In local environments or environments that aren't hosted in the Azure Function service, the trigger can do the token validation. Set the following application settings:

* **AuthenticationEvents__TenantId** - your tenant ID
* **AuthenticationEvents__AudienceAppId** - the same value as "Allowed audience" in option 1.
* **AuthenticationEvents__CustomCallerAppId** (_optional_) - the guid of your desired client. If not provided, `99045fe1-7639-4a75-9d4a-577b6ca3810f` is assumed.

An example `local.settings.json` file:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "AuthenticationEvents__TenantId": "8615397b-****-****-****-********06c8",
    "AuthenticationEvents__AudienceAppId": "api://46f98993-****-****-****-********0038",
    "AuthenticationEvents__CustomCallerAppId": "46f98993-****-****-****-********0038"
  }
}
```

#### No token validation

If you would like to _not_ authenticate the token while in local development, set the following application setting:

* **AuthenticationEvents__BypassTokenValidation** - value of `true` will make the trigger not check for a validation of the token.

### Quickstart

* Visual Studio Code
  * Start Visual Studio Code
  * Run the terminal command `func init . --worker-runtime node` via the command palette
  * Run the terminal command `func new` via the command palette
  * Follow the project creation prompts
  * Run the terminal command `npm install @azure/functions-authentication-events` via the command palette
  * Run the terminal command `npm install` via the command palette
  * Run the terminal command `npm run-script build` via the command palette
* For development purpose turn of token validation for testing:
* Add the **AuthenticationEvents__BypassTokenValidation** application key to the "Values" section in the local.settings.json file and set it's value to **true**.  If you do not have a local.settings.json file in your local environment, create one in the root of your Function App.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AuthenticationEvents__BypassTokenValidation": true
  }
}
```

* Once the project is loaded, you can run the sample code and you should see the Azure functions developer's application load your end point.

## Key concepts

Key concepts of the Azure .NET SDK can be found [here](https://azure.github.io/azure-sdk/dotnet_introduction.html)

## Documentation

* One the function has been published, there's some good reading about logging and metrics that can be found [here](https://docs.microsoft.com/azure/azure-functions/functions-monitor-log-analytics?tabs=csharp)

* For API Documentation, please see the (Link TBD)
* Once this moves to preview, we except no breaking changes and would be as simple as removing the the nuget source that points to the private preview.

## Examples

To Test Token Augmentation, please do the following.

* Open the project that was created in the prior step. (QuickStart)
* Run the Application. `func host start`
* Once the Azure functions developer's application has started, copy the listening url that is displayed with the application starts up.
* Note: All Authentication functions are listed, in the case we have one function listener registered called "**OnTokenIssuanceStart**"
* Your function endpoint will then be a combination of the listening url and function, for example: "http://localhost:7071/runtime/webhooks/AuthenticationEvents?code=(YOUR_CODE)&function=OnTokenIssuanceStart"
* Post the following payload using something like Postman or Fiddler.
* Steps for using Postman can be found (Link TBD)

```json
{
    "type": "microsoft.graph.authenticationEvent.tokenIssuanceStart",
    "source": "/tenants/00000001-0000-0ff1-ce00-000000000000/applications/ef9e995c-efdb-4e76-97a9-8cdfc6e06afc",
    "data": {
        "@odata.type": "microsoft.graph.onTokenIssuanceStartCalloutData",
        "tenantId": "00000001-0000-0ff1-ce00-000000000000",
        "authenticationEventListenerId": "f2390d57-9664-4dde-b625-f0115925e1e2",
        "customAuthenticationExtensionId": "9cc1c1ed-5f04-4fdf-85c0-94a7c6ea819c",
        "authenticationContext": {
            "correlationId": "f4bd1870-b774-4fa5-ba78-e08ac6be14c0",
            "client": {
                "ip": "127.0.0.1",
                "locale": "en-us",
                "market": "en-us"
            },
            "protocol": "OAUTH2.0",
            "clientServicePrincipal": {
                "id": "eedfddb9-304e-4d62-aa83-24700a0bcf0e",
                "appId": "ef9e995c-efdb-4e76-97a9-8cdfc6e06afc",
                "appDisplayName": "",
                "displayName": "Test application"
            },
            "resourceServicePrincipal": {
                "id": "eedfddb9-304e-4d62-aa83-24700a0bcf0e",
                "appId": "ef9e995c-efdb-4e76-97a9-8cdfc6e06afc",
                "appDisplayName": "",
                "displayName": "Test application"
            },
            "user": {
                "companyName": "Evo Sts Test",
                "country": "",
                "id": "69d24544-c420-4721-a4bf-106f2378d9f6",
                "mail": "testadmin@evostsoneboxtest.com",
                "onPremisesSamAccountName": "testadmin",
                "onPremisesSecurityIdentifier": "testadmin",
                "preferredDataLocation": "",
                "userPrincipalName": "testadmin@evostsoneboxtest.com"
            }
        }
    }
}
```

* You should see this response:

```json
{
    "data": {
        "@odata.type": "microsoft.graph.onTokenIssuanceStartResponseData",
        "actions": [
            {
                "@odata.type": "ProvideClaimsForToken",
                "claims": [
                    {
                        "DateOfBirth": "01/01/2000"
                    },
                    {
                        "CustomRoles": [
                            "Writer",
                            "Editor"
                        ]
                    }
                ]
            }
        ]
    }
}
```

## Troubleshooting

* Visual Studio Code
  * If running in Visual Studio Code, you get an error along the lines of the local Azure Storage Emulator is unavailable, you can start the emulator manually.! (Note: Azure Storage emulator is now deprecated and the suggested replacement is [Azurite](https://docs.microsoft.com/azure/storage/common/storage-use-azurite?tabs=visual-studio))
  * If using Visual Studio Code on Mac please use [Azurite](https://docs.microsoft.com/azure/storage/common/storage-use-azurite?tabs=visual-studio)
  * If you see the following error on Windows (it's a bug) when trying to run the created projected.
  * This can be resolved by executing this command in powershell `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope LocalMachine` more info on this can be found [here](https://github.com/Azure/azure-functions-core-tools/issues/1821) and [here](https://docs.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7)

## Next steps

For more information on Azure SDK, please refer to [this website](https://azure.github.io/azure-sdk/)

## Publish

* Follow the instruction here to create and publish your Azure Application. <https://docs.microsoft.com/azure/azure-functions/functions-develop-vs?tabs=in-process#publish-to-azure>
* To determine your published posting endpoint, combine the azure function endpoint you created, route to the listener and listener code, the listen code can be found by navigating to your azure function application, selecting "App Keys" and copying the value of AuthenticationEvents_extension.
* For example: "https://azureautheventstriggerdemo.azurewebsites.net/runtime/webhooks/AuthenticationEvents?code=(AuthenticationEvents_extension_key)&function=OnTokenIssuanceStart"
* Make sure your production environment has the correct application settings for token authentication.
* Once again you can test the published function by posting the above payload to the new endpoint.

## Contributing

For details on contributing to this repository, see the [contributing
guide][cg].

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring
that you have the right to, and actually do, grant us the rights to use
your contribution. For details, visit <https://cla.microsoft.com>.

When you submit a pull request, a CLA-bot will automatically determine
whether you need to provide a CLA and decorate the PR appropriately
(e.g., label, comment). Simply follow the instructions provided by the
bot. You will only need to do this once across all repositories using
our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][coc]. For
more information see the [Code of Conduct FAQ][coc_faq] or contact
<opencode@microsoft.com> with any additional questions or comments.

<!-- LINKS -->
[cg]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/resourcemanager/Azure.ResourceManager/docs/CONTRIBUTING.md
[coc]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
