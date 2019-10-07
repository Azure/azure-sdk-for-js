# Release History

## 4.0.0-preview.7 (2019-10-07)
- Added @azure/eslint-plugin-azure-sdk.
- Added a "Deploy to Azure" button to the README.
- Updated README examples to latest API changes.
- API Change: Nested classes are now flattened into a "properties" property.
- API Change: createCertificate now receives any of the flattened properties as the third parameter.
- API Change: The Certificate type now can have an optional policy property, which replaces the CertificateWithPolicy type.

## 4.0.0-preview.6 (2019-09-17)
- Fixed the path of the main TypeScript types. Issue: https://github.com/Azure/azure-sdk-for-js/issues/5166

## 4.0.0-preview.5 (2019-09-11)
- Released keyvault-certificates.
