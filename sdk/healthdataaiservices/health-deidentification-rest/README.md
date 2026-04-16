# Azure Health Data Services de-identification service REST client library for JavaScript

This package contains a client library for the de-identification service in Azure Health Data Services which
enables users to tag, redact, or surrogate health data containing Protected Health Information (PHI).

Use the client library for the de-identification service to:

- Discover PHI in unstructured text
- Replace PHI in unstructured text with placeholder values
- Replace PHI in unstructured text with realistic surrogate values
- Manage asynchronous jobs to de-identify documents in Azure Storage

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library.**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/health-deidentification-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/health-deidentification)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/health-deidentification)
- [Product documentation][product_documentation]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- You need an [Azure subscription][azure_sub] to use this package.
- [Deploy the de-identification service][deid_quickstart].
- [Configure Azure role-based access control (RBAC)][deid_rbac] for the operations you will perform.

### Install the `@azure-rest/health-deidentification` package

Install the library with `npm`:

```bash
npm install @azure-rest/health-deidentification
```

### Create and authenticate a `DeidentificationClient`

You can authenticate with Microsoft Entra ID using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential) can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

You will need a **service URL** to instantiate a client object. You can find the service URL for a particular resource in the [Azure portal][azure_portal], or using the [Azure CLI][azure_cli].
Here's an example of setting an environment variable in Bash using Azure CLI:

```bash
# Get the service URL for the resource
export HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT=$(az deidservice show --name "<resource-name>" --resource-group "<resource-group-name>" --query "properties.serviceUrl")
```

Create a client with the endpoint and credential:

```ts snippet:CreateClient
import { DefaultAzureCredential } from "@azure/identity";
import DeidentificationClient from "@azure-rest/health-deidentification";

const credential = new DefaultAzureCredential();
const serviceEndpoint =
  process.env.HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT || "https://example.api.deid.azure.com";
const client = DeidentificationClient(serviceEndpoint, credential);
```

## Key concepts

### De-identification operations:

Given an input text, the de-identification service can perform three main operations:

- `Tag` returns the category and location within the text of detected PHI entities.
- `Redact` returns output text where detected PHI entities are replaced with placeholder text. For example `John` replaced with `[name]`.
- `Surrogate` returns output text where detected PHI entities are replaced with realistic replacement values. For example, `My name is John Smith` could become `My name is Tom Jones`.
- `SurrogateOnly` returns output text where user-defined PHI entities are replaced with realistic replacement values.

### String Encoding

When using the `Tag` operation, the service will return the locations of PHI entities in the input text. These locations will be represented as offsets and lengths, each of which is a [StringIndex][string_index] containing
three properties corresponding to three different text encodings. **JavaScript applications should use the `utf16` property.**

For more on text encoding, see [Character encoding in .NET][character_encoding].

### Available endpoints

There are two ways to interact with the de-identification service. You can send text directly, or you can create jobs
to de-identify documents in Azure Storage.

You can de-identify text directly using the `DeidentificationClient`:

```ts snippet:DeidentifyText
import { DefaultAzureCredential } from "@azure/identity";
import DeidentificationClient, {
  DeidentificationContent,
  isUnexpected,
} from "@azure-rest/health-deidentification";

const credential = new DefaultAzureCredential();
const serviceEndpoint =
  process.env.HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT || "https://example.api.deid.azure.com";
const client = DeidentificationClient(serviceEndpoint, credential);

const content: DeidentificationContent = {
  inputText: "Hello John!",
};

const response = await client.path("/deid").post({ body: content });

if (isUnexpected(response)) {
  throw response.body.error;
}

console.log(response.body.outputText); // Hello, Tom!
```

To de-identify documents in Azure Storage, you'll need a storage account with a container to which the de-identification service has been granted an appropriate role. See [Tutorial: Configure Azure Storage to de-identify documents][deid_configure_storage] for prerequisites and configuration options. You can upload the files in the [test data folder][test_data] as blobs, like: `https://<storageaccount>.blob.core.windows.net/<container>/example_patient_1/doctor_dictation.txt`.

You can create jobs to de-identify documents in the source Azure Storage account and container with an optional input prefix. If there's no input prefix, all blobs in the container will be de-identified. Azure Storage blobs can use `/` in the blob name to emulate a folder or directory layout. For more on blob naming, see [Naming and Referencing Containers, Blobs, and Metadata][blob_names]. The files you've uploaded can be de-identified by providing `example_patient_1` as the input prefix:

```
<container>/
├── example_patient_1/
       └──doctor_dictation.txt
       └──row-2-data.txt
       └──visit-summary.txt
```

Your target Azure Storage account and container where documents will be written can be the same as the source, or a different account or container. In the examples below, the source and target account and container are the same. You can specify an output prefix to indicate where the job's output documents should be written (defaulting to `_output`). Each document processed by the job will have the same relative blob name with the input prefix replaced by the output prefix:

```
<container>/
├── example_patient_1/
       └──doctor_dictation.txt
       └──row-2-data.txt
       └──visit-summary.txt
├── _output/
       └──doctor_dictation.txt
       └──row-2-data.txt
       └──visit-summary.txt
```

Set the following environment variables, updating the storage account and container with real values:

```bash
export HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION="https://<storageaccount>.blob.core.windows.net/<container>"
export INPUT_PREFIX="example_patient_1"
export OUTPUT_PREFIX="_output"
```

You can create and view job status using the client:

```ts snippet:DeidentifyDocuments
import { DefaultAzureCredential } from "@azure/identity";
import DeidentificationClient, {
  DeidentificationJob,
  DeidentifyDocumentsDefaultResponse,
  isUnexpected,
  getLongRunningPoller,
} from "@azure-rest/health-deidentification";

const credential = new DefaultAzureCredential();
const serviceEndpoint =
  process.env["HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT"] || "https://example.api.deid.azure.com";
const storageLocation =
  process.env["HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION"] ||
  "https://example.blob.core.windows.net/example-container";
const inputPrefix = "example_patient_1";
const outputPrefix = process.env["OUTPUT_PREFIX"] || "_output";

const client = DeidentificationClient(serviceEndpoint, credential);
const jobName = "sample-job-" + new Date().getTime().toString().slice(-8);

const job: DeidentificationJob = {
  operation: "Surrogate",
  sourceLocation: { location: storageLocation, prefix: inputPrefix },
  targetLocation: { location: storageLocation, prefix: outputPrefix },
};
const response = (await client
  .path("/jobs/{name}", jobName)
  .put({ body: job })) as DeidentifyDocumentsDefaultResponse;

if (isUnexpected(response)) {
  throw response.body.error;
}

const poller = await getLongRunningPoller(client, response);
const finalOutput = await poller.pollUntilDone();
console.log(finalOutput.body);
```

## Next steps

Find a bug, or have feedback? Raise an issue with the [Health Deidentification][github_issue_label] label.

## Troubleshooting

- **Unable to Access Source or Target Storage**
  - Ensure you create your de-identification service with a system assigned managed identity
  - Ensure your storage account has given permissions to that managed identity

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

<!-- LINKS -->

[azure_sub]: https://azure.microsoft.com/free/
[deid_quickstart]: https://learn.microsoft.com/azure/healthcare-apis/deidentification/quickstart
[string_index]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/health-deidentification-rest/src/outputModels.ts#L175
[character_encoding]: https://learn.microsoft.com/dotnet/standard/base-types/character-encoding-introduction
[deid_redact]: https://learn.microsoft.com/azure/healthcare-apis/deidentification/redaction-format
[deid_rbac]: https://learn.microsoft.com/azure/healthcare-apis/deidentification/manage-access-rbac
[deid_managed_identity]: https://learn.microsoft.com/azure/healthcare-apis/deidentification/managed-identities
[deid_configure_storage]: https://learn.microsoft.com/azure/healthcare-apis/deidentification/configure-storage
[azure_cli]: https://learn.microsoft.com/cli/azure/healthcareapis/deidservice?view=azure-cli-latest
[azure_portal]: https://ms.portal.azure.com
[github_issue_label]: https://github.com/Azure/azure-sdk-for-js/labels/Health%20Deidentification
