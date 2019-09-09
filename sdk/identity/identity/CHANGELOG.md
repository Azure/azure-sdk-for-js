# Changelog

## 1.0.0-preview.3 - 2019-09-09

- Fixed a ping timeout issue. The timeout is now configurable. ([PR #4941](https://github.com/Azure/azure-sdk-for-js/pull/4941))
- Fixed IMDS endpoint detection false positive ([PR #4909](https://github.com/Azure/azure-sdk-for-js/pull/4909))

## 1.0.0-preview.2 - 2019-08-05

- Introduced the following credential types:
  - [`DeviceCodeCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/devicecodecredential.html)
  - [`InteractiveBrowserCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/interactivebrowsercredential.html)
  - [`UsernamePasswordCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/usernamepasswordcredential.html)
- This library can now be used in the browser!  The following credential types supported in browser builds:
  - `ClientSecretCredential`
  - `UsernamePasswordCredential`
  - `InteractiveBrowserCredential`

## 1.0.0-preview.1 - 2019-06-27

For release notes and more information please visit https://aka.ms/azure-sdk-preview1-js

- Introduced the following credential types:
  - [`DefaultAzureCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/defaultazurecredential.html)
  - [`EnvironmentCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/environmentcredential.html)
  - [`ManagedIdentityCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/managedidentitycredential.html)
  - [`ClientSecretCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/clientsecretcredential.html)
  - [`ClientCertificateCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/clientcertificatecredential.html)
  - [`ChainedTokenCredential`](https://azure.github.io/azure-sdk-for-js/identity/classes/chainedtokencredential.html)
