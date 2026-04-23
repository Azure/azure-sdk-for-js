# Azure AI Content Understanding client library for JavaScript

Azure AI Content Understanding is a multimodal AI service that extracts semantic content from documents, video, audio, and image files. It transforms unstructured content into structured, machine-readable data optimized for retrieval-augmented generation (RAG) and automated workflows.

Use the client library for Azure AI Content Understanding to:

* **Extract document content** - Extract text, tables, figures, layout information, and structured markdown from documents (PDF, images with text or hand-written text, Office documents and more)
* **Transcribe and analyze audio** - Convert audio content into searchable transcripts with speaker diarization and timing information
* **Analyze video content** - Extract visual frames, transcribe audio tracks, and generate structured summaries from video files
* **Leverage prebuilt analyzers** - Use production-ready prebuilt analyzers across industries including finance and tax (invoices, receipts, tax forms), identity verification (passports, driver's licenses), mortgage and lending (loan applications, appraisals), procurement and contracts (purchase orders, agreements), and utilities (billing statements)
* **Create custom analyzers** - Build domain-specific analyzers for specialized content extraction needs across all four modalities (documents, video, audio, and images)
* **Classify documents and video** - Automatically categorize and extract information from documents and video by type

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding)
- Package (NPM)
- [Product documentation][product_docs]
- [Samples][samples_directory]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub]
- A [Microsoft Foundry resource][cu_quickstart] created in a [supported region][cu_region_support]

### Install the `@azure/ai-content-understanding` package

Install the Azure Content Understanding client library for JavaScript with `npm`:

```bash
npm install @azure/ai-content-understanding
```

### Configure your Microsoft Foundry resource

Before using the Content Understanding SDK, you need to set up a Microsoft Foundry resource and deploy the required large language models. Content Understanding currently uses OpenAI GPT models (such as gpt-4.1, gpt-4.1-mini, and text-embedding-3-large).

#### Step 1: Create Microsoft Foundry resource

> **Important:** You must create your Microsoft Foundry resource in a region that supports Content Understanding. For a list of available regions, see [Azure Content Understanding region and language support][cu_region_support].

1. Follow the steps in the [Azure Content Understanding quickstart][cu_quickstart] to create a Microsoft Foundry resource in the Azure portal
2. Get your Foundry resource's endpoint URL from Azure Portal:
   - Go to [Azure Portal][azure_portal]
   - Navigate to your Microsoft Foundry resource
   - Go to **Resource Management** > **Keys and Endpoint**
   - Copy the **Endpoint** URL (typically `https://<your-resource-name>.services.ai.azure.com/`)

**Important: Grant Required Permissions**

After creating your Microsoft Foundry resource, you must grant yourself the **Cognitive Services User** role to enable API calls for setting default model deployments:

1. Go to [Azure Portal][azure_portal]
2. Navigate to your Microsoft Foundry resource
3. Go to **Access Control (IAM)** in the left menu
4. Click **Add** > **Add role assignment**
5. Select the **Cognitive Services User** role
6. Assign it to yourself (or the user/service principal that will run the application)

> **Note:** This role assignment is required even if you are the owner of the resource. Without this role, you will not be able to call the Content Understanding API to configure model deployments for prebuilt analyzers.

#### Step 2: Deploy required models

**Important:** The prebuilt and custom analyzers require large language model deployments. You must deploy at least these models before using prebuilt analyzers and custom analyzers:
- `prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch` require **gpt-4.1-mini** and **text-embedding-3-large**
- Other prebuilt analyzers like `prebuilt-invoice`, `prebuilt-receipt` require **gpt-4.1** and **text-embedding-3-large**

To deploy a model:

1. In Microsoft Foundry, go to **Deployments** > **Deploy model** > **Deploy base model**
2. Search for and select the model you want to deploy. Currently, prebuilt analyzers require models such as `gpt-4.1`, `gpt-4.1-mini`, and `text-embedding-3-large`
3. Complete the deployment with your preferred settings
4. Note the deployment name you chose (by convention, use the model name as the deployment name, e.g., `gpt-4.1` for the `gpt-4.1` model)

Repeat this process for each model required by your prebuilt analyzers.

For more information on deploying models, see [Create model deployments in Microsoft Foundry portal][deploy_models_docs].

#### Step 3: Configure model deployments (required for prebuilt analyzers)

> **IMPORTANT:** This is a **one-time setup per Microsoft Foundry resource** that maps your deployed models to those required by the prebuilt analyzers and custom models. If you have multiple Microsoft Foundry resources, you need to configure each one separately.

You need to configure the default model mappings in your Microsoft Foundry resource. This can be done programmatically using the SDK. The configuration maps your deployed models (currently gpt-4.1, gpt-4.1-mini, and text-embedding-3-large) to the large language models required by prebuilt analyzers.

To configure model deployments using code, see the [Update Defaults sample][sample_update_defaults] for a complete example. Here's a quick overview:

```typescript snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());

// Map your deployed models to the models required by prebuilt analyzers
const updatedDefaults = await client.updateDefaults({
  modelDeployments: {
    "gpt-4.1": process.env["GPT_4_1_DEPLOYMENT"]!,
    "gpt-4.1-mini": process.env["GPT_4_1_MINI_DEPLOYMENT"]!,
    "text-embedding-3-large": process.env["TEXT_EMBEDDING_3_LARGE_DEPLOYMENT"]!,
  },
});

console.log("Model deployments configured successfully!");
```

> **Note:** The configuration is persisted in your Microsoft Foundry resource, so you only need to run this once per resource (or whenever you change your deployment names).

### Authenticate the client

To authenticate the client, you need your Microsoft Foundry resource endpoint and credentials. You can use either an API key or Microsoft Entra ID authentication.

#### Using DefaultAzureCredential

The simplest way to authenticate is using `DefaultAzureCredential`, which supports multiple authentication methods and works well in both local development and production environments.

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContentUnderstandingClient("<endpoint>", new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new ContentUnderstandingClient("<endpoint>", credential);
```

#### Using API key

You can also authenticate using an API key from your Microsoft Foundry resource:

```typescript snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const apiKey = process.env["CONTENTUNDERSTANDING_KEY"]!;
const client = new ContentUnderstandingClient(endpoint, new AzureKeyCredential(apiKey));
```

To get your API key:
1. Go to [Azure Portal][azure_portal]
2. Navigate to your Microsoft Foundry resource
3. Go to **Resource Management** > **Keys and Endpoint**
4. Copy one of the **Keys** (Key1 or Key2)

For more information on authentication, see [Azure Identity client library][azure_identity].

### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### Prebuilt analyzers

Content Understanding provides a rich set of prebuilt analyzers that are ready to use without any configuration. These analyzers are powered by knowledge bases of thousands of real-world document examples, enabling them to understand document structure and adapt to variations in format and content.

Prebuilt analyzers are organized into several categories:

* **RAG analyzers** - Optimized for retrieval-augmented generation scenarios with semantic analysis and markdown extraction. These analyzers return markdown and a one-paragraph `Summary` for each content item:
  * **`prebuilt-documentSearch`** - Extracts content from documents (PDF, images, Office documents) with layout preservation, table detection, figure analysis, and structured markdown output. Optimized for RAG scenarios.
  * **`prebuilt-imageSearch`** - Analyzes standalone images and returns a one-paragraph description of the image content. Optimized for image understanding and search scenarios. For images that contain text (including hand-written text), use `prebuilt-documentSearch`.
  * **`prebuilt-audioSearch`** - Transcribes audio content with speaker diarization, timing information, and conversation summaries. Supports multilingual transcription.
  * **`prebuilt-videoSearch`** - Analyzes video content with visual frame extraction, audio transcription, and structured summaries. Provides temporal alignment of visual and audio content and can return multiple segments per video.
* **Content extraction analyzers** - Focus on OCR and layout analysis (e.g., `prebuilt-read`, `prebuilt-layout`)
* **Base analyzers** - Fundamental content processing capabilities used as parent analyzers for custom analyzers (e.g., `prebuilt-document`, `prebuilt-image`, `prebuilt-audio`, `prebuilt-video`)
* **Domain-specific analyzers** - Preconfigured analyzers for common document categories including financial documents (invoices, receipts, bank statements), identity documents (passports, driver's licenses), tax forms, mortgage documents, and contracts, and utilities (billing statements)
* **Utility analyzers** - Specialized tools for schema generation and field extraction (e.g., `prebuilt-documentFieldSchema`, `prebuilt-documentFields`)

For a complete list of available prebuilt analyzers and their capabilities, see the [Prebuilt analyzers documentation][prebuilt_analyzers_docs].

### Custom analyzers

You can create custom analyzers with specific field schemas for multi-modal content processing (documents, images, audio, video). Custom analyzers allow you to extract domain-specific information tailored to your use case.

### Content types

The API returns different content types based on the input:

* **`document`** - For document files (PDF, HTML, images, Office documents such as Word, Excel, PowerPoint, and more). Provides basic information such as page count and MIME type. Retrieve detailed information including pages, tables, figures, paragraphs, and many others.
* **`audioVisual`** - For audio and video files. Provides basic information such as timing information (start/end times) and frame dimensions (for video). Retrieve detailed information including transcript phrases, timing information, and for video, key frame references and more.

### Asynchronous operations

Content Understanding operations are asynchronous long-running operations. The workflow is:

1. **Begin Analysis** - Start the analysis operation (returns immediately with an operation location)
2. **Poll for Results** - Poll the operation location until the analysis completes
3. **Process Results** - Extract and display the structured results

The SDK provides poller types that handle polling automatically when using `pollUntilDone()`. For analysis operations, the SDK returns a poller that provides access to the operation ID. This operation ID can be used with `getResultFile` and `deleteResult` methods.

### Main classes

* **`ContentUnderstandingClient`** - The main client for analyzing content, as well as creating, managing, and configuring analyzers
* **`AnalysisResult`** - Contains the structured results of an analysis operation, including content elements, markdown, and metadata

### Thread safety

We guarantee that all client instance methods are thread-safe and independent of each other. This ensures that the recommendation of reusing client instances is always safe, even across threads.

### Additional concepts

[Client options][client_options] |
[Accessing the response][accessing_response] |
[Long-running operations][long_running_operations] |
[Handling failures][handling_failures] |
[Diagnostics][diagnostics] |
[Client lifetime][client_lifetime]

## Examples

You can familiarize yourself with different APIs using [Samples][samples_directory].

The samples demonstrate:

* **Configuration** - Configure model deployment defaults for prebuilt analyzers and custom analyzers
* **Document Content Extraction** - Extract structured markdown content from PDFs and images using `prebuilt-documentSearch`, optimized for RAG (Retrieval-Augmented Generation) applications
* **Multi-Modal Content Analysis** - Analyze content from URLs across all modalities: extract markdown and summaries from documents, images, audio, and video using `prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, and `prebuilt-videoSearch`
* **Domain-Specific Analysis** - Extract structured fields from invoices using `prebuilt-invoice`
* **Advanced Document Features** - Extract charts, hyperlinks, formulas, and annotations from documents
* **Custom Analyzers** - Create custom analyzers with field schemas for specialized extraction needs
* **Document Classification** - Create and use classifiers to categorize documents
* **Analyzer Management** - Get, list, update, copy, and delete analyzers
* **Result Management** - Retrieve result files from video analysis and delete analysis results

### Extract markdown content from documents

Use the `prebuilt-documentSearch` analyzer to extract markdown content from documents:

```typescript snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());

const documentUrl = "https://example.com/sample_invoice.pdf";

// Analyze document using prebuilt-documentSearch
const poller = client.analyze("prebuilt-documentSearch", [{ url: documentUrl }]);
const result = await poller.pollUntilDone();

// Extract markdown content
if (result.contents && result.contents.length > 0) {
  const content = result.contents[0];
  console.log("Markdown Content:");
  console.log(content.markdown);

  // Access document-specific properties
  if (content.kind === "document") {
    console.log(`Pages: ${content.startPageNumber} - ${content.endPageNumber}`);
  }
}
```

### Extract structured fields from invoices

Use the `prebuilt-invoice` analyzer to extract structured invoice fields:

```typescript snippet:ignore
import {
  ContentUnderstandingClient,
  type DocumentContent,
  type ContentFieldUnion,
} from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());

const invoiceUrl = "https://example.com/invoice.pdf";

// Analyze invoice using prebuilt-invoice analyzer
const poller = client.analyze("prebuilt-invoice", [{ url: invoiceUrl }]);
const result = await poller.pollUntilDone();

if (result.contents && result.contents.length > 0) {
  const content = result.contents[0] as DocumentContent;

  // Helper function to extract field values
  const getFieldValue = (field: ContentFieldUnion | undefined): string | undefined => {
    if (!field) return undefined;
    if ("valueString" in field) return field.valueString;
    if ("valueDate" in field) return field.valueDate;
    if ("valueNumber" in field) return String(field.valueNumber);
    return undefined;
  };

  // Extract invoice fields
  const customerName = getFieldValue(content.fields?.["CustomerName"]);
  const invoiceTotal = getFieldValue(content.fields?.["InvoiceTotal"]);
  const invoiceDate = getFieldValue(content.fields?.["InvoiceDate"]);

  console.log(`Customer Name: ${customerName ?? "(None)"}`);
  console.log(`Invoice Total: ${invoiceTotal ?? "(None)"}`);
  console.log(`Invoice Date: ${invoiceDate ?? "(None)"}`);
}
```

See the [samples directory][samples_directory] for complete examples.

## Troubleshooting

### Common issues

**Error: "Access denied due to invalid subscription key or wrong API endpoint"**
- Verify your endpoint URL is correct and includes the trailing slash
- Ensure your API key is valid or that your Microsoft Entra ID credentials have the correct permissions
- Make sure you have the **Cognitive Services User** role assigned to your account

**Error: "Model deployment not found" or "Default model deployment not configured"**
- Ensure you have deployed the required models (gpt-4.1, gpt-4.1-mini, text-embedding-3-large) in Microsoft Foundry
- Verify you have configured the default model deployments (see [Configure Model Deployments](#step-3-configure-model-deployments-required-for-prebuilt-analyzers))
- Check that your deployment names match what you configured in the defaults

**Error: "Operation failed" or timeout**
- Content Understanding operations are asynchronous and may take time to complete
- Ensure you are properly polling for results using `pollUntilDone()` on the poller object
- Check the operation status for more details about the failure

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Testing

This SDK includes comprehensive tests that can be run in different modes.

### Quick start

```bash
# Install dependencies
pnpm install

# Build the SDK
npx turbo build --filter=@azure/ai-content-understanding...

# Run tests in playback mode (no Azure resources needed)
pnpm test
```

### Test modes

- **Playback Mode** (default): Uses pre-recorded HTTP interactions, no Azure resources required
- **Record Mode**: Runs against live Azure services and records interactions for future playback
- **Live Mode**: Runs against live Azure services without recording

### Setting up the environment for live/record tests

1. Copy `test/sample.env` to `test/.env`:

   ```bash
   cp test/sample.env test/.env
   ```

2. Edit `test/.env` and fill in your actual values:
   - `CONTENTUNDERSTANDING_ENDPOINT`: Your Microsoft Foundry resource endpoint
   - `CONTENTUNDERSTANDING_KEY`: Your API key (optional if using DefaultAzureCredential)
   - Model deployment names (required for prebuilt analyzers)

### Run tests in record mode

To record new test interactions or update existing ones:

```bash
# Run tests in record mode
TEST_MODE=record pnpm test
```

### Run tests in playback mode

To run tests without Azure resources (using pre-recorded interactions):

```bash
# Simply run tests (playback is the default mode)
pnpm test

# Or explicitly set playback mode
TEST_MODE=playback pnpm test
```

### Package-scoped / faster workflows

- Build only this package and its dependencies:

  ```bash
  npx turbo build --filter=@azure/ai-content-understanding... --token 1
  ```

- Run only Node tests for faster iteration (skip browser tests):

  ```bash
  TEST_MODE=record pnpm test:node   # or TEST_MODE=playback pnpm test:node
  ```

### Environment variables

You can set credentials in multiple ways:

1. **Preferred**: Create `test/.env` by copying `test/sample.env` and filling your values
2. **Fallback**: Place a `.env` at the package root (same directory as `package.json`)
3. **Shell export**: Export credentials directly in your shell:

   ```bash
   export CONTENTUNDERSTANDING_ENDPOINT="https://<your-resource>.services.ai.azure.com/"
   export CONTENTUNDERSTANDING_KEY="<your_key_here>"
   TEST_MODE=record pnpm test:node
   ```

### Debug tips

When running tests in record mode, watch for debug lines printed by the test setup:

```
DEBUG ENV ENDPOINT DEFINED: true
DEBUG ENV KEY DEFINED: true
```

> **Important:** Do NOT commit real keys. Keep `test/sample.env` as the template and ensure `test/.env` is in your `.gitignore`.

### Troubleshooting tests

- **"key must be a non-empty string"**: The test process couldn't find your `CONTENTUNDERSTANDING_KEY`. Ensure `test/.env` or package-root `.env` is present and contains the key (or export it in your shell) before running tests.
- **"Invalid request" LRO errors**: Ensure your service/region supports the analyzer used by the tests and that network access is available for URL-based inputs.

### Running Samples Locally

The samples directories are excluded from the pnpm workspace to avoid dependency conflicts. To run samples with the local development version of the package:

> **Note:** Running `pnpm link` and `pnpm install` inside the samples folders will update local files like `package.json` and `pnpm-lock.yaml` under the samples directories. These changes are only for local testing and should not be checked in. If you accidentally modify them, use `git restore <path>` to revert.

1. Build the package:

   ```bash
   npx turbo build --filter=@azure/ai-content-understanding...
   ```

2. Link the local package in the samples directories:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript
   pnpm link ../../../
   cd ../javascript
   pnpm link ../../../
   ```

3. Install dependencies in the samples directories:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript
   pnpm install
   cd ../javascript
   pnpm install
   ```

#### Alternative (no package.json/lockfile changes)

If you want to use the local package without modifying sample `package.json` or `pnpm-lock.yaml`, install from a packed tarball without saving:

1. Build the package:

   ```bash
   npx turbo build --filter=@azure/ai-content-understanding...
   ```

2. Create a local tarball:

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding
   pnpm pack --pack-destination /tmp
   ```

3. Install the tarball in the samples (no save, no lockfile):

   ```bash
   cd sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript
   npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz
   cd ../javascript
   npm install --no-save --no-package-lock /tmp/azure-ai-content-understanding-*.tgz
   ```

#### Running a sample

After installing dependencies, you can run individual samples.

**Setting up environment variables:**

Copy the `sample.env` file to create a `.env` file in the sample directory root. Run the following commands from the package root (`sdk/contentunderstanding/ai-content-understanding`):

```bash
# For TypeScript samples
cp sample.env samples/v1/typescript/.env

# For JavaScript samples
cp sample.env samples/v1/javascript/.env
```

Then edit the `.env` file and fill in your actual values:

```bash
CONTENTUNDERSTANDING_ENDPOINT=https://<your-resource>.services.ai.azure.com/
CONTENTUNDERSTANDING_KEY=<your-api-key>
```

> **Note:** The `.env` file should be at the sample folder root (same level as `package.json`), not inside `src/` or `dist/`.

**TypeScript samples:**

```bash
cd samples/v1/typescript
npm run build
node dist/analyzeBinary.js
```

**JavaScript samples:**

```bash
cd samples/v1/javascript
node analyzeBinary.js
```

For full setup instructions and available samples, see:

- [TypeScript samples README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/typescript/README.md)
- [JavaScript samples README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples/v1/javascript/README.md)

## Next steps

* Explore the [samples directory][samples_directory] for complete code examples
* Read the [Azure AI Content Understanding documentation][product_docs] for detailed service information

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

<!-- LINKS -->
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[product_docs]: https://learn.microsoft.com/azure/ai-services/content-understanding/
[cu_quickstart]: https://learn.microsoft.com/azure/ai-services/content-understanding/quickstart/use-rest-api?tabs=portal%2Cdocument
[cu_region_support]: https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support
[deploy_models_docs]: https://learn.microsoft.com/azure/ai-studio/how-to/deploy-models-openai
[prebuilt_analyzers_docs]: https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/prebuilt-analyzers
[samples_directory]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples
[sample_update_defaults]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/updateDefaults.ts
[client_options]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/pipelineoptions?view=azure-node-latest
[accessing_response]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/pipelineresponse?view=azure-node-latest
[long_running_operations]: https://learn.microsoft.com/javascript/api/@azure/core-lro?view=azure-node-latest
[handling_failures]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/resterror?view=azure-node-latest
[diagnostics]: https://learn.microsoft.com/javascript/api/@azure/logger?view=azure-node-latest
[client_lifetime]: https://learn.microsoft.com/azure/developer/javascript/sdk/use-azure-sdk
