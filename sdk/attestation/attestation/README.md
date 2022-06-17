# Azure Attestation client library for JavaScript

The Microsoft Azure Attestation (MAA) service is a unified solution for remotely verifying the trustworthiness of a platform and integrity of the binaries running inside it. The service supports attestation of the platforms backed by Trusted Platform Modules (TPMs) alongside the ability to attest to the state of Trusted Execution Environments (TEEs) such as Intel(tm) Software Guard Extensions (SGX) enclaves and Virtualization-based Security (VBS) enclaves.

Attestation is a process for demonstrating that software binaries were properly instantiated on a trusted platform. Remote relying parties can then gain confidence that only such intended software is running on trusted hardware. Azure Attestation is a unified customer-facing service and framework for attestation.

Azure Attestation enables cutting-edge security paradigms such as Azure Confidential computing and Intelligent Edge protection. Customers have been requesting the ability to independently verify the location of a machine, the posture of a virtual machine (VM) on that machine, and the environment within which enclaves are running on that VM. Azure Attestation will empower these and many additional customer requests.

Azure Attestation receives evidence from compute entities, turns them into a set of claims, validates them against configurable policies, and produces cryptographic proofs for claims-based applications (for example, relying parties and auditing authorities).

For a more complete view of Azure libraries, see the [azure sdk typescript release](https://aka.ms/azsdk/js/all).

> NOTE: This is a preview SDK for the Microsoft Azure Attestation service. It provides all the essential functionality to access the Azure Attestation service, it should be considered 'as-is" and is subject to changes in the future which may break compatibility with previous versions.

Key links:

- [Source code][source_code]
- [Package (NPM)][attestation_npm]
- [API reference documentation][api_reference]
- [Product documentation](https://docs.microsoft.com/azure/attestation/)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An existing Azure Attestation Instance, or you can use the "shared provider" available in each Azure region. If you need to create an Azure Attestation service instance, you can use the Azure Portal or [Azure CLI][azure_cli].

### Install the @azure/attestation package

Install the Microsoft Azure Attestation client library for JavaScript with [NPM][attestation_npm]:

```Powershell
npm install @azure/attestation
```

### Authenticate the client

In order to interact with the Microsoft Azure Attestation service, you'll need to create an instance of the [Attestation Client][attestation_client] or [Attestation Administration Client][attestation_admin_client] class. You need a **attestation instance url**, which will either be the  "Attest URI"
shown in the portal, or will be one of the shared attestation providers.
You will also need client credentials to use the Attestation Administration Client or call the `attestTpm` API. Client credentials require **(client id, client secret, tenant id)** to instantiate a client object.

In this getting started section, we'll be authenticating using client secret credentials through the [DefaultAzureCredential][defaultazurecredential] provider, but we offer more authentication mechanisms through the [@azure/identity][azure_identity] package. To install the @azure/identity package:

```Powershell
npm install @azure/identity
```

#### Create/Get credentials

Use the [Azure CLI][azure_cli] snippet below to create/get client secret credentials.

- Create a service principal and configure its access to Azure resources:

  ```Powershell
  az ad sp create-for-rbac -n <your-application-name> --skip-assignment
  ```

  Output:

  ```json
  {
    "appId": "generated-app-ID",
    "displayName": "dummy-app-name",
    "name": "http://dummy-app-name",
    "password": "random-password",
    "tenant": "tenant-ID"
  }
  ```

- Take note of the service principal objectId

  ```Powershell
  az ad sp show --id <appId> --query objectId
  ```

  Output:

  ```Powershell
  "<your-service-principal-object-id>"
  ```

- Use the returned credentials above to set **AZURE_CLIENT_ID** (appId), **AZURE_CLIENT_SECRET** (password), and **AZURE_TENANT_ID** (tenant) environment variables. The following example shows a way to do this in Powershell:

```Powershell
    $Env:AZURE_CLIENT_ID="generated-app-ID"
    $Env:AZURE_CLIENT_SECRET="random-password"
    $Env:AZURE_TENANT_ID="tenant-ID"
```

For more information about the Azure Identity APIs and how to use them, see [Azure Identity client library](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity)

## Key concepts

There are four major families of functionality provided in this preview SDK:

- [SGX and TPM enclave attestation.](#attestation)
- [MAA Attestation Token signing certificate discovery and validation.](#attestation-token-signing-certificate-discovery-and-validation)
- [Attestation Policy management.](#policy-management)
- [Attestation policy management certificate management](#policy-management-certificate-management) (yes, policy management management).

The Microsoft Azure Attestation service runs in two separate modes: "Isolated" and "AAD". When the service is running in "Isolated" mode, the customer needs to
provide additional information beyond their authentication credentials to verify that they are authorized to modify the state of an attestation instance.

Finally, each region in which the Microsoft Azure Attestation service is available supports a "shared" instance, which
can be used to attest SGX enclaves which only need verification against the azure baseline (there are no policies applied to the shared provider). TPM attestation is not available in the shared provider.
While the shared instance requires AAD authentication, it does not have any RBAC policies - any customer with a valid AAD bearer token can attest using the shared instance.

### Attestation

SGX or TPM attestation is the process of validating evidence collected from
a trusted execution environment to ensure that it meets both the Azure baseline for that environment and customer defined policies applied to that environment.

### Attestation service token signing certificate discovery and validation

One of the core operational guarantees of the Azure Attestation Service is that the service operates "operationally out of the TCB". In other words, there is no way that a Microsoft operator could tamper with the operation of the service, or corrupt data sent from the client. To ensure this guarantee, the core of the attestation service runs in an Intel(tm) SGX enclave.

To allow customers to verify that operations were actually performed inside the enclave, most responses from the Attestation Service are encoded in a [JSON Web Token][json_web_token], which is signed by a key held within the attestation service's enclave.

This token will be signed by a signing certificate issued by the MAA service for the specified instance.

If the MAA service instance is running in a region where the service runs in an SGX enclave, then
the certificate issued by the server can be verified using the [oe_verify_attestation_certificate API](https://openenclave.github.io/openenclave/api/enclave_8h_a3b75c5638360adca181a0d945b45ad86.html).

The [`AttestationResponse`][attestation_response] object contains two main attributes: `token` and `value`. The `token` attribute contains the complete token returned by the attestation service, the `value` attribute contains the body of the JSON Web Token response.

### Policy Management

Each attestation service instance has a policy applied to it which defines additional criteria which the customer has defined.

For more information on attestation policies, see [Attestation Policy](https://docs.microsoft.com/azure/attestation/author-sign-policy)

### Policy Management certificate management

When an attestation instance is running in "Isolated" mode, the customer who created the instance will have provided
a policy management certificate at the time the instance is created. All policy modification operations require that the customer sign
the policy data with one of the existing policy management certificates. The Policy Management Certificate Management APIs enable
clients to "roll" the policy management certificates.

### Isolated Mode and AAD Mode

Each Microsoft Azure Attestation service instance operates in either "AAD" mode or "Isolated" mode. When an MAA instance is operating in AAD mode, it means that the customer which created the attestation instance allows Azure Active Directory and Azure Role Based Access control policies to verify access to the attestation instance.

### _AttestationType_

The Microsoft Azure Attestation service supports attesting different types of evidence depending on the environment.
Currently, MAA supports the following Trusted Execution environments:

- OpenEnclave - An Intel(tm) Processor running code in an SGX Enclave where the attestation evidence was collected using the OpenEnclave [`oe_get_report`](https://openenclave.io/apidocs/v0.14/enclave_8h_aefcb89c91a9078d595e255bd7901ac71.html#aefcb89c91a9078d595e255bd7901ac71) or [`oe_get_evidence`](https://openenclave.io/apidocs/v0.14/attester_8h_a7d197e42468636e95a6ab97b8e74c451.html#a7d197e42468636e95a6ab97b8e74c451) API.
- SgxEnclave - An Intel(tm) Processor running code in an SGX Enclave where the attestation evidence was collected using the Intel SGX SDK.
- Tpm - A Virtualization Based Security environment where the Trusted Platform Module of the processor is used to provide the attestation evidence.

### Runtime Data and Inittime Data

RuntimeData refers to data which is presented to the Intel SGX Quote generation logic or the `oe_get_report`/`oe_get_evidence` APIs. If the caller to the attest API provided a `runtime_data` attribute, The Azure Attestation service will validate that the first 32 bytes of the `report_data` field in the SGX Quote/OE Report/OE Evidence matches the SHA256 hash of the `runtime_data`.

InitTime data refers to data which is used to configure the SGX enclave being attested.

> Note that InitTime data is not supported on Azure [DCsv2-Series](https://docs.microsoft.com/azure/virtual-machines/dcv2-series) virtual machines.

### Additional concepts

## Examples

- [Create an attestation client instance](#create-client-instance)
- [Attest an SGX enclave](#attest-sgx-enclave)
- [Get attestation policy](#get-attestation-policy)
- [Retrieve token validation certificates](#retrieve-token-certificates)
- [Create an attestation client instance](#create-client-instance)

### Create client instance

Creates an instance of the Attestation Client at uri `endpoint`, using the default
azure credentials (`DefaultAzureCredential`).

```ts
const credentials = new DefaultAzureCredential();
const client = new AttestationClient(endpoint, {credentials: credentials});

// Retrieve the set of attestation policy signers from the attestation client.
const attestationSigners = await client.getAttestationSigners();
```

If you are not calling the `attestTpm` API, you do not need to provide credentials
to access the attestation client. This means a client can be created simply with:

```ts
const client = new AttestationClient(endpoint);

// Retrieve the set of attestation policy signers from the attestation client.
const attestationSigners = await client.getAttestationSigners();
```

Creates an instance of the Attestation Administration Client at uri `endpoint`.

Note that the administration client *requires* Azure credentials.

```ts
  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  // Retrieve the SGX policy from the specified attestation instance.
  const policyResponse = await client.getPolicy(KnownAttestationType.SgxEnclave);

```

### Get attestation policy

The `getPolicy` method retrieves the attestation policy from the service.
Attestation Policies are instanced on a per-attestation type basis, the `AttestationType` parameter defines the type of instance to retrieve.

```js
const policyResult = await adminClient.getPolicy(attestationType);

// The text policy document is available in the `policyResult.body`
// property.

// The actual attestation token returned by the MAA service is available
// in `policyResult.token`.
```

### Set an attestation policy for a specified attestation type

If the attestation service instance is running in Isolated mode, the set_policy API needs to provide a signing certificate (and private key) which can be used to validate that the caller is authorized to modify policy on the attestation instance. If the service instance is running in AAD mode, then the signing certificate and key are optional.

If the service instance is running in AAD mode, the call to setPolicy is as expected:

```js
const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

const newPolicy = `<New Attestation Policy>`;

// Set the new attestation policy. Set the policy as an unsecured policy.
const setPolicyResult = await client.setPolicy(KnownAttestationType.SgxEnclave, newPolicy);
```

If the service instance is running in Isolated mode, the call to setPolicy requires that
the client be able to prove that they have access to one of the policy management private keys
and certificates.

```js
const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

const newPolicy = `<New Policy Document>`;

// Set the new attestation policy. Set the policy as an secured policy.
const privateKey = <Retrieve isolated mode private key from storage>
const certificate = <Retrieve certificate associated with that private key>

const setPolicyResult = await client.setPolicy(
  KnownAttestationType.OpenEnclave,
  newPolicy,
  {
    privateKey: privateKey,
    certificate: certificate
  }
);
```

Under the covers, the setPolicy APIs create a [JSON Web Token][json_web_token] containing on the policy document `certificate` and signed with the `privateKey` which is then sent to the attestation service.

If a client wishes to ensure that the attestation policy document was not modified before the policy document was received by the attestation service's enclave, they can use the properties returned in the [PolicyResult][attestation_policy_result] objct which can be used to verify that the service received the policy document:

- [`policySigner`][attestation_policy_result_parameters] - if the `setPolicy` call included a `certificate`, this value will be the certificate provided at the time of the `setPolicy` call. If no policy signer was set, this will be null.
- [`policyTokenHash`][attestation_policy_result_parameters] - this is the hash of the [JSON Web Signature][json_web_token] sent to the service for the setPolicy API.

To verify the hash, clients can create an attestation policy token (a helper class which represents the token used to set the attestation policy) and verify the hash generated from that token:

```js
const expectedPolicy = createAttestationPolicyToken(
  `<Policy Document>`,
  privateKey,
  certificate);

// Use your favorite SHA256 hash generator function to create a hash of the
// stringized JWS.
const expectedHash = generateSha256Hash(expectedPolicy.serialize());

// The hash returned in expectedHash should match the value in
// `setResult.body.policyTokenHash`.
```

### Attest SGX and Open Enclave

Use the [`attestSgxEnclave`][attest_sgx] method to attest an SGX enclave.

One of the core challenges customers have interacting with encrypted environments is how to ensure that you can securely communicate with the code running in the environment ("enclave code").

One solution to this problem is what is known as "Secure Key Release", which is a pattern that enables secure communication with enclave code.

To implement the "Secure Key Release" pattern, the enclave code generates an ephemeral asymmetric key. It then serializes the public portion of the key to some format (possibly a JSON Web Key, or PEM, or some other serialization format).

The enclave code then calculates the SHA256 value of the public key and passes it as an input to code which generates an SGX Quote (for OpenEnclave, that would be the [oe_get_evidence](https://openenclave.io/apidocs/v0.14/attester_8h_a7d197e42468636e95a6ab97b8e74c451.html#a7d197e42468636e95a6ab97b8e74c451) or [oe_get_report](https://openenclave.io/apidocs/v0.14/enclave_8h_aefcb89c91a9078d595e255bd7901ac71.html#aefcb89c91a9078d595e255bd7901ac71)).

The client then sends the SGX quote and the serialized key to the attestation service. The attestation service will validate the quote and ensure that the hash of the key is present in the quote and will issue an "Attestation Token".

The client can then send that Attestation Token (which contains the serialized key) to a 3rd party "relying party". The relying party then validates that the attestation token was created by the attestation service, and thus the serialized key can be used to encrypt some data held by the "relying party" to send to the service.

This example shows one common pattern of calling into the attestation service to retrieve an attestation token associated with a request.

This example assumes that you have an existing `AttestationClient` object which is configured with the Attest URI for your endpoint. It also assumes that you have an OpenEnclave report (`report`) generated from within the SGX enclave you are attesting, and "Runtime Data" (`binaryRuntimeData`) which is referenced in the SGX Quote.

```ts
const attestationResult = await client.attestOpenEnclave(report, {
  runTimeData: binaryRuntimeData
});
```

It is also possible that the `binaryRuntimeData` sent to the attestation service is
intended to be interpreted as JSON data. In that case, the client should specify `runTimeJson` in
the attest API call:

```ts
const attestationResult = await client.attestOpenEnclave(report, {
  runTimeJson: binaryRuntimeData
});
```

Similarly, if you are using the Intel SDK to generate a "quote", you can validate the quote using:

```ts
const attestationResult = await client.attestSgxEnclave(quote, {
  runTimeData: binaryRuntimeData
});
```

Additional information on how to perform attestation token validation can be found in the [MAA Service Attestation Sample](https://github.com/Azure-Samples/microsoft-azure-attestation).

### Retrieve Token Certificates

Use `getSigningCertificates` to retrieve the certificates which can be used to
validate the token returned from the attestation service. Note that this call
creates a client with azure credentials, that is not needed if you are calling
the `attestSgxEnclave` or `attestOpenEnclave` APIs

```ts
const credentials = new DefaultAzureCredential();
const client = new AttestationClient(endpoint, {credentials: credentials});

const attestationSigners = await client.getAttestationSigners();

console.log(`There are ${attestationSigners.length} signers`);

```

## Troubleshooting

Most Attestation service operations will raise exceptions defined in [Azure Core](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/README.md). The attestation service APIs will throw a `RestError` on failure with helpful error codes. Many of these errors are recoverable.

```ts
try {
  await client.attestSgxEnclave(openEnclaveReport);
} catch (error) {
  console.log(`Exception thrown for invalid request: ${error.message}`);
}
```

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

Additional troubleshooting information for the MAA service can be found [here](https://docs.microsoft.com/azure/attestation/troubleshoot-guide)

## Next steps

For more information about the Microsoft Azure Attestation service, please see our [documentation page](https://docs.microsoft.com/azure/attestation/).

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [the Contributor License Agreement site](https://cla.microsoft.com).

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][microsoft_code_of_conduct]. For more information see the Code of Conduct FAQ or contact <opencode@microsoft.com> with any additional questions or comments.

See [CONTRIBUTING.md][contributing] for details on building, testing, and contributing to these libraries.

## Provide Feedback

If you encounter any bugs or have suggestions, please file an issue in the
[Issues](https://github.com/Azure/azure-sdk-for-js/issues)
section of the project.

<!-- LINKS -->

[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/attestation/attestation
[azure_identity]: https://docs.microsoft.com/javascript/api/@azure/identity
[defaultazurecredential]: https://docs.microsoft.com/javascript/api/@azure/identity/defaultazurecredential
[attestation_policy_result]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-attestation/1.0.0-beta.4/interfaces/policyresult.html
[attestation_client]: https://docs.microsoft.com/javascript/api/@azure/attestation/attestationclient
[attestation_admin_client]: https://docs.microsoft.com/javascript/api/@azure/attestation/attestationadministrationclient
[attestation_response]: https://docs.microsoft.com/javascript/api/@azure/attestation/attestationresponse
[attestation_policy_result_parameters]: https://docs.microsoft.com/javascript/api/@azure/attestation/policyresult#properties
[attest_sgx]: https://docs.microsoft.com/javascript/api/@azure/attestation/attestationclient#attestSgxEnclave_Uint8Array__AttestSgxEnclaveOptions_
[attestation_npm]: https://www.npmjs.com/package/@azure/attestation
[api_reference]: https://docs.microsoft.com/javascript/api/@azure/attestation
[style-guide-msft]: https://docs.microsoft.com/style-guide/capitalization
[style-guide-cloud]: https://aka.ms/azsdk/cloud-style-guide
[microsoft_code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[json_web_token]: https://tools.ietf.org/html/rfc7519
[jwk]: https://tools.ietf.org/html/rfc7517
[base64url_encoding]: https://tools.ietf.org/html/rfc4648#section-5
[contributing]: https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fattestation%2Fattestation%2FREADME.png)
