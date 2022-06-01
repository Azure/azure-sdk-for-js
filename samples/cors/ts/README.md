# CORS considerations for web applications

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the same-origin policy. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. That's where [Cross-Origin Resource Sharing (CORS)][cors] policies become necessary.

While CORS is configurable for some Azure services, other services do not yet support CORS natively. So what can you do if you'd like to integrate with an Azure service from a web application?

Fortunately, there are a few options:

- Use a back end server to route requests to Azure Key Vault.
- Use [Azure API Management][azureapimanagement] to route requests to Azure Key Vault.

> Remember: CORS is a _browser_ restriction, and is not a concern for Node applications.

In this sample we'll use Azure Key Vault - but it can be used as a guideline for any Azure service that does not support CORS natively.

Interested in enabling CORS in Key Vault? [Let us know!](https://feedback.azure.com/d365community/idea/89085b38-f624-ec11-b6e6-000d3a4f0da0)

## Use a back end server

With this approach you'll use a server process (like [ASP.NET][asp] or [Express][express]) to route requests to Azure Key Vault. Since you own the client and server processes you can freely add CORS policies to support your requests.

If your web application already has a back end component this will be the most straightforward approach. You'll simply add a new API endpoint to your server which will be responsible for fetching secrets from Azure Key Vault and returning it to the user. This allows you to have complete control and customization over the security and authorization of calls to Key Vault since all calls will go through a privileged environment (your server).

## Use Azure API Management

But what if you don't have a server in place for your Single Page Application? Thankfully Azure provides a managed API service that can sit between your web application and Azure Key Vault and provide the CORS policy that you need to interact with Azure Key Vault.

It provides all of the same benefits as having your own back end API while avoiding the need to separately deploy, manage, and secure your own server. You can define a single API that is responsible for retrieving secrets and apply best-in-class security to control access to your Key Vault.

# Sample code

This simple example demonstrates how to get started with both of these approaches. In this example, we create a simple [Express][express] application, connect and upload a single test secret, and fetch it via a web application using either our back end server or Azure API Management.

## Security considerations

This sample demonstrates a few alternatives to integrating with Azure Key Vault from the browser, and is purposely kept simple. Remember, the browser is an _insecure_ environment and we encourage you to familiarize yourself with Azure's security policies to avoid leaking credentials to an unauthorized user in a production application. Please refer to Azure Key Vault's [security overview][keyvaultsecurity] to learn more about securing your Key Vault's data.

## Prerequisites

The sample is compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure Key Vault. Please refer to the [Key Vault documentation][keyvault] for additional information on Azure Key Vault.
- An Azure API Management. Please refer to [Azure API Management][azureapimanagement] for additional information on Azure API Management.

To quickly create the necessary resources in Azure and to receive the necessary environment variables for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsamples%2Fcors%2Farm-template.json)

The above template will create the necessary resources for you and the output tab will contain the environment variables you'll need as soon as deployment succeeds. When the deployment is finished, head over to the "outputs" tab and copy the outputs to a local file - you'll need them in the next step.

> Azure API Management can take a while to deploy so we recommend starting the deployment now before reading the rest of this document.

Next, create a service principal for the backend application and configure its access to Azure Key Vault:

```Bash
az ad sp create-for-rbac -n <your-application-name, can be anything unique> --skip-assignment
```

Output:

```json
{
  "appId": "generated-app-ID",
  "displayName": "dummy-app-name",
  "name": "http://dummy-app-name",
  "password": "random-password",
  "tenant": "tenant-ID"
}
```

Save the values returned in a safe location as follows:

```
AZURE_CLIENT_ID=<appId>
AZURE_CLIENT_SECRET=<password>
AZURE_TENANT_ID=<tenant>
```

Take note of the service principal objectId:

```PowerShell
az ad sp show --id <appId> --query objectId
```

Output:

```
"<your-service-principal-object-id>"
```

Grant the above mentioned application authorization to perform key operations on the keyvault:

```Bash
az keyvault set-policy --name <AZURE_KEYVAULT_NAME from deployment outputs tab> --spn <your-service-principal-object-id> --secret-permissions get set
```

## Running the sample

Once the above is created you'll want to ensure the necessary environment variables are set. You'll do this for both the client and server:

### Client environment variables

Copy `client/sample.env` as `client/.env` and provide the `AZURE_API_NAME` environment variable which you should have received from the outputs of the ARM template.

You can find the value of `AZURE_API_NAME` in the outputs tab of your deployment.

### Server environment variables

Copy `server/sample.env` as `server/.env` and provide the necessary environment variables.

The values for `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID` are the values you saved in a previous step.

You can find the value of `AZURE_KEYVAULT_NAME` in the outputs tab of your deployment.

[cors]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[azureapimanagement]: https://docs.microsoft.com/azure/api-management/api-management-key-concepts
[express]: https://expressjs.com/
[keyvaultsecurity]: https://docs.microsoft.com/azure/key-vault/general/security-overview
[asp]: https://dotnet.microsoft.com/apps/aspnet
[freesub]: https://azure.microsoft.com/free
[keyvault]: https://docs.microsoft.com/azure/key-vault/
