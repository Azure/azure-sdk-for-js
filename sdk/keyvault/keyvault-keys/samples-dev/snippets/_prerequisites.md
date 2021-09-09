To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

If creating the Key Vault manually using the Azure Portal, be aware that the samples require that the soft-delete feature be enabled. Our template above will enable this feature automatically, but it is possible to enable it manually using the Azure CLI. See [the documentation for enabling soft-delete in Key Vault](https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli) for more information.
