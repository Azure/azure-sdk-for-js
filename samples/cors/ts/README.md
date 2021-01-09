# Using Azure Key Vault in a Web Application

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the same-origin policy. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. That's where Cross Origin Resource Sharing (CORS) policies become necessary.

While CORS is configurable for some Azure services, Azure Key Vault does not currently support CORS natively. So what can you do if you'd like to integrate with Azure Key Vault from a web application?

> Rememeber: CORS is a _browser_ restriction, and is not a concern in a Node application.

Fortunately, there are a few options:

- Use a back end server to route requests to Azure Key Vault
- Use [Azure API Management][azureapimanagement] to route requests to Azure Key Vault

## Use a back end server

With this approach you'll use a server process (like [Express][express]) to route requests to Azure Key Vault. Since you own the client and server processes you can freely add CORS policies to support your requests.

If your web application already has a back end component this will be the most straightforward approach. You'll simply add a new API endpoint to your server which will be responsible for fetching a secret from Azure Key Vault and returning it to the user. This allows you to have complete control and customization over the security and authorization of calls to Key Vault since all calls will go through a priviledged environment (your server).

## Use Azure API Management

But what if you don't have a server in place for your Single Page Application? Thankfully Azure provides a managed API service that can sit between your web application and Azure Key Vault and provide the CORS policy that you need to interact with Azure Key Vault.

It provides all of the same benefits as having your own back end API while avoiding the need to separately deploy, manage, and secure your own server. You can define a single API that is responsible for retrieving secrets and apply best-in-class security to control access to your secrets. TODO: revise this sentence and add more context here.

# Sample code

This simple example demonstrates how to get started with both of these approaches. In this example, we create a simple [Express][express] application, connect and upload a single test secret, and fetch it via a web application using either our back end server or Azure API Management.

## Prerequisites

The sample is compatible with Node.js >= 8.0.0

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and the following resources created to run this sample:

- An Azure Key Vault. Please refer to the [Key Vault documentation][keyvault] for additional information on Azure Key Vault.
- An Azure API Management. Please refer to [Azure API Management][azureapimanagement] for additional information on Azure API Management.

To quickly create the necessary resources in Azure and to receive the necessary environment variables for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsamples%2Fcors%2Farm-template.json)

The above template will create the necessary resources for you and the output tab will contain the exact environment variables that you'll need as soon as deployment succeeds. When the deployment is finished, head over to the "outputs" tab and copy the outputs to a local file - you'll need them in the next step.

## Running the sample

Once the above is created you'll want to ensure the necessary environment variables are set. You'll do this for both the client and server:

### Client environment variables

Copy `client/sample.env` as `client/.env` and provide the `AZURE_API_NAME` environment variable which you should have received from the outputs of the ARM template.

### Server environment variables

Copy `server/sample.env` as `server/.env` and provide the necessary environment variables.

[azureapimanagement]: https://aka.ms
[express]: https://aka.ms
[sample]: https://aka.ms
