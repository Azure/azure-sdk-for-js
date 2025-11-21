---
page_type: sample
languages:
  - typescript
products:
  - azure-attestation
urlFragment: attestation-typescript
---

# Azure Attestation client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Attestation in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [attestEnclaves.ts][attestenclaves]                                         | Demonstrates attesting evidence from an SGX enclave with evidence collected using the OpenEnclave SDK. FILE: attestEnclaves.ts DESCRIPTION: This sample demonstrates attesting evidence collected using the ://openenclave.io/apidocs/v0.17/enclave_8h_aefcb89c91a9078d595e255bd7901ac71.html#aefcb89c91a9078d595e255bd7901ac71 \| oe_get_report API. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [createAttestationClient.ts][createattestationclient]                       | Demonstrates the creation of a Attestation Client and Attestation Administration Client. FILE: createAttestationClient.ts DESCRIPTION: This sample demonstrates creating a new attestation client. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [getAttestationPolicy.ts][getattestationpolicy]                             | Demonstrates the use of a Attestation Instance to retrieve an attestation policy. FILE: getAttestationPolicy.ts DESCRIPTION: This sample demonstrates using the attestation administration APIs to retrieve attestation policy documents for the various modes of operation of the attestation service. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode. 2) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.                                                                                                                                                                                                                                                                                                                                                                      |
| [getPolicyManagementCertificates.ts][getpolicymanagementcertificates]       | Demonstrates the use of a Attestation Instance to retrieve the set of policy management certificates for the specified policy. FILE: getPolicyManagementCertificates.ts DESCRIPTION: This sample demonstrates using the attestation administration APIs to retrieve attestation the policy management certificates for an isolated Attestation Service instance. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.                                                                                                                                                                                                                                                                                                                                                                                                    |
| [modifyPolicyManagementCertificates.ts][modifypolicymanagementcertificates] | Demonstrates the use of a Attestation Instance to retrieve the set of policy management certificates for the specified policy. FILE: getPolicyManagementCertificates.ts DESCRIPTION: This sample demonstrates using the attestation administration APIs to retrieve attestation the policy management certificates for an isolated Attestation Service instance. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode. 2) ATTESTATION_ISOLATED_SIGNING_CERTIFICATE - A Base64 encoded DER X.509 certificate which is one of the Isolated mode signing certificates. 3) ATTESTATION_ISOLATED_SIGNING_KEY - A Base64 encoded DER RSA Private key which corresponds to the ATTESTATION_ISOLATED_SIGNING_CERTIFICATE. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.                                                                                                         |
| [setAttestationPolicy.ts][setattestationpolicy]                             | Demonstrates the use of a Attestation Instance to set an attestation policy. FILE: setAttestationPolicy.ts DESCRIPTION: This sample demonstrates using the attestation administration APIs to manage attestation policy documents for the various modes of operation of the attestation service. Set the following environment variables with your own values before running the samples: 1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode. 2) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode. 3) ATTESTATION_ISOLATED_SIGNING_CERTIFICATE - A Base64 encoded DER X.509 certificate which is one of the Isolated mode signing certificates. 4) ATTESTATION_ISOLATED_SIGNING_KEY - A Base64 encoded DER RSA Private key which corresponds to the ATTESTATION_ISOLATED_SIGNING_CERTIFICATE. To authorize access to the service, this sample also depends on the following environment variables: AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user. AZURE_CLIENT_ID - AAD Client ID used to authenticate the user. AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client. Note that the shared instances cannot have attestation policies applied to them. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/attestEnclaves.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ATTESTATION_AAD_URL="<attestation aad url>" ATTESTATION_LOCATION_SHORT_NAME="<attestation location short name>" node dist/attestEnclaves.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[attestenclaves]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/attestEnclaves.ts
[createattestationclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/createAttestationClient.ts
[getattestationpolicy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/getAttestationPolicy.ts
[getpolicymanagementcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/getPolicyManagementCertificates.ts
[modifypolicymanagementcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/modifyPolicyManagementCertificates.ts
[setattestationpolicy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/attestation/attestation/samples/v1/typescript/src/setAttestationPolicy.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/attestation
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/attestation/attestation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
