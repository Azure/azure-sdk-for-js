# Azure Tools - Test Credential

This library provides the credential for testing.

## Getting started

### Installation

Add this library as a dev dependency in your project.

> rush add -p @azure-tools/identity-extensions --dev

## Key concepts

This library provides the credential to be used in the tests

In playback mode

- returns the `NoOpCredential` (helps bypass the AAD traffic)
- `NoOpCredential` is defined in `@azure-tools/test-recorder-new`

In record/live modes

- returns the `ClientSecretCredential` (expects AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in your environment or in the .env file)
- AAD traffic won't be recorded if this credential is used.
- `ClientSecretCredential` is coming from `@azure/identity`

## Next steps

Try out this package in your application and provide feedback!

## Troubleshooting

Log an issue at https://github.com/Azure/azure-sdk-for-js/issues

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Ftest-utils-identity%2FREADME.png)
