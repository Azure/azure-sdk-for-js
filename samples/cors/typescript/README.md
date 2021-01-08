---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-cors-typescript
---

# Using Azure Key Vault in a Web Application

Browser security prevents a web page from making requests to a different domain than the one that served the web page. This restriction is called the same-origin policy. The same-origin policy prevents a malicious site from reading sensitive data from another site. Sometimes, you might want to allow other sites to make cross-origin requests to your app. That's where Cross Origin Resource Sharing (CORS) policies become necessary.

While CORS is configurable for some Azure services, Azure Key Vault does not currently support CORS natively. So what can you do if you'd like to integrate with Azure Key Vault from a web application?

> Rememeber: CORS is a _browser_ restriction, and is not a concern in a Node application.

Fortunately, there are options we can offer - listed below:

- Use a back-end server to route requests to Azure Key Vault
- Use [Azure API Management][azureapimanagement] to route requests to Azure Key Vault
- Use a lightweight proxy to proxy requests to Azure Key Vault

## Use a back-end server

With this approach you'll use a server process (like [Express][express]) to route requests to Azure Key Vault. Since you own the client and server processes you can freely add CORS policies to support your requests. If the server is serving your web application you won't need to setup _any_ CORS policies (same-origin would apply)

If your web application already has a back end component this will be the most straightforward approach. You'll simply add a new API endpoint to your server which will be responsible for fetching a secret from Azure Key Vault and returning it to the user. This allows you to have complete control and customization over the security and authorization of calls to Key Vault since all calls will go through a priviledged environment (your server).

Please refer to this [sample][nodeserversample] for more information on how you might set this up.

## Use Azure API Management

But what if you don't have a server in place for your Single Page Application? Thankfully Azure provides a managed API service that can sit between your web application and Azure Key Vault and provide the CORS policy that you need to interact with Azure Key Vault.

It provides all of the same benefits as having your own back end API while avoiding the need to separately deploy, manage, and secure your own server. You can define a single API that is responsible for retrieving secrets and apply best-in-class security to control access to your secrets. TODO: revise this sentence and add more context here.

Please refer to this [sample][azuresample] for more information on how you would set this up.

## Use a lightweight proxy

Finally, you can use a node process as a proxy, this is a lighter process than setting up your own API server as it simply proxies requests but

[backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/typescript/src/backupAndRestore.ts
[deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/typescript/src/deleteAndRecover.ts
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/typescript/src/helloWorld.ts
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/typescript/src/listOperations.ts
[purgeallsecrets]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/typescript/src/purgeAllSecrets.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-secrets
[azkeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[kvsoftdelete]: https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
