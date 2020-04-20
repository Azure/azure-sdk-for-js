# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The environment variables you will need to properly assign to run the live test of this project are the following:

- `AZURE_CLIENT_ID`: The Client ID of your Azure account.
- `AZURE_CLIENT_SECRET`: The secret of your Azure account.
- `AZURE_TENANT_ID`: The Tenant ID of your Azure account.
- `KEYVAULT_NAME`: The name of the KeyVault to use.

## Setup for running tests that use AAD based authentication

Go through the following setup in order to correctly setup the AAD credentials for tests that require it.

**Register a new application in AAD**

- Follow [Documentation to register a new application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory(in the azure-portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

**Assign owner role to the registered application**

- In the azure-portal, go to your keyvault-namespace and assign the **Owner** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your keyvault-namespace in the azure-portal)<br>
  _Doing this would allow the registered application manage the namespace, i.e., entity creation, deletion, etc.,_<br>
- For more information on securing your KeyVault - [Learn more](hhttps://docs.microsoft.com/en-us/azure/key-vault/general/secure-your-key-vault)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-secrets%2Ftest%2FREADME.png)
