# Azure Tools - Test Credential

**Note: This project is a test utility that assits with testing the packages maintained at the Azure SDK for JavaScript repository. This is not intended for the public utilization.**

This library provides a `TokenCredential` implementation for testing Azure SDK packages. This library is supposed to be utilized along with the `@azure-tools/test-recorder` library for testing Azure SDKs.

## Getting started

### Installation

Add this library as a dev dependency in your project.

> rush add -p @azure-tools/test-credential --dev

## Key concepts

### Usage

```ts
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();
```

This library provides the credential to be used in the tests

In playback mode

- returns a `NoOpCredential` (does not make a request to AAD and produces a fake access_token)

In record/live modes

- returns a `ClientSecretCredential` from `@azure/identity` (expects AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in your environment or in the .env file)
- AAD traffic won't be recorded if this credential is used.

## Next steps

Try out this package in your application and provide feedback!

## Troubleshooting

Log an issue at https://github.com/Azure/azure-sdk-for-js/issues

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Ftest-credential%2FREADME.png)
