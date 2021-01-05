# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An [Azure Key Vault](https://docs.microsoft.com/azure/key-vault/general/basic-concepts). Your Azure Active Directory application needs to be added to the Access Policies of the Key Vault. The steps are provided [below](#aad-based-authentication).

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `AZURE_CLIENT_ID`: The client ID of an Azure Active Directory application.
- `AZURE_CLIENT_SECRET`: The client secret of an Azure Active Directory application.
- `AZURE_TENANT_ID`: The Tenant ID of your organization in Azure Active Directory.
- `KEYVAULT_URI`: The name of the key vault to use in the samples.
- `KEYVAULT_NAME`: The name of the KeyVault to use.
- `BLOB_STORAGE_URI`: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated.
- `BLOB_STORAGE_SAS_TOKEN`: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated.
- `CLIENT_OBJECT_ID`: Object ID of the application, tenant or principal to whom the role will be assigned to. These tests add and remove roles to and from this ID. **Do not use the same Object Id of the application, tenant or principal you're using to authenticate the client.**

The live tests in this project will assign access roles to an Azure Key Vault, as well as generate backups and delete backups of an Azure Key Vault.

## AAD based authentication

The following steps will help you setup the AAD credentials.

### Register a new application in AAD

- Follow [Documentation to register a new application](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory (in the Azure portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

### Allow your registered application to access your Key Vault

- In the Azure portal, go to your Azure Key Vault.
- In the left-side-navbar of your Azure Key Vault in the Azure portal, go to the `Access Policies` section, then click the `+ Add Access Policy` button.
- In the `Add access policy` page, select all the permissions for Keys, Secrets and Certificates.
- For the `Select principal` field, click on the `None selected`. A panel will appear at the right of the window. Search for your Azure Active Directory application, click the application on the search results, then click "Select" at the bottom.
- Once your application is selected, click the "Add" button.
- Click the `Save` button at the top of the Access Policies section of your Key Vault.
- For more information on securing your Key Vault: [Learn more](https://docs.microsoft.com/azure/key-vault/general/secure-your-key-vault)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-admin%2Ftest%2FREADME.png)
