# Azure AI Content Understanding client library for JavaScript

Azure AI Content Understanding is a multimodal AI service that extracts semantic content from documents, video, audio, and image files. It transforms unstructured content into structured, machine-readable data optimized for retrieval-augmented generation (RAG) and automated workflows.

Use the client library for Azure AI Content Understanding to:

- **Extract document content** - Extract text, tables, figures, layout information, and structured markdown from documents (PDF, images with text or hand-written text, Office documents and more)
- **Transcribe and analyze audio** - Convert audio content into searchable transcripts with speaker diarization and timing information
- **Analyze video content** - Extract visual frames, transcribe audio tracks, and generate structured summaries from video files
- **Leverage prebuilt analyzers** - Use production-ready prebuilt analyzers across industries including finance and tax (invoices, receipts, tax forms), identity verification (passports, driver's licenses), mortgage and lending (loan applications, appraisals), procurement and contracts (purchase orders, agreements), and utilities (billing statements)
- **Create custom analyzers** - Build domain-specific analyzers for specialized content extraction needs across all four modalities (documents, video, audio, and images)
- **Classify documents and video** - Automatically categorize and extract information from documents and video by type

If you have encountered issues or want to suggest features, please [file an issue][file_issue].

[Source code][source_code] | [Package (NPM)][npm_package] | [API reference documentation][api_reference] | [Product documentation][product_docs] | [Samples][samples_directory] | [Changelog][changelog]

## Table of Contents

- [Getting started](#getting-started)
  - [Currently supported environments](#currently-supported-environments)
  - [Prerequisites](#prerequisites)
  - [Install the `@azure/ai-content-understanding` package](#install-the-azure-ai-content-understanding-package)
  - [Configure your Microsoft Foundry resource](#configure-your-microsoft-foundry-resource)
  - [Service API versions](#service-api-versions)
  - [Authenticate the client](#authenticate-the-client)
  - [JavaScript Bundle](#javascript-bundle)
- [Key concepts](#key-concepts)
  - [Prebuilt analyzers](#prebuilt-analyzers)
  - [Custom analyzers](#custom-analyzers)
  - [Content types](#content-types)
  - [Asynchronous operations](#asynchronous-operations)
  - [Main classes](#main-classes)
  - [Thread safety](#thread-safety)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Testing](#testing)
- [GitHub Copilot Skills](#github-copilot-skills)
  - [Available Skills](#available-skills)
  - [Using Skills in VS Code](#using-skills-in-vs-code)
  - [Troubleshooting Skill Selection](#troubleshooting-skill-selection)
- [Next steps](#next-steps)
- [Contributing](#contributing)
- [Related projects](#related-projects)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub]
- A [Microsoft Foundry resource][cu_quickstart] created in a [supported region][cu_region_support]

### Install the `@azure/ai-content-understanding` package

This README documents the current beta package (`1.2.0-beta.3`), which adds support for service API version `2026-06-01-preview` and the preview-only APIs listed below. Install that beta package with `npm`:

```bash
npm install @azure/ai-content-understanding@next
```

To use only the latest generally available package (`1.1.0`, service API `2025-11-01`):

```bash
npm install @azure/ai-content-understanding
```

> **Note:** Capabilities available only in `2026-06-01-preview` require this beta package (`1.2.0-beta.3` or later). A plain `npm install @azure/ai-content-understanding` installs the latest stable package (`1.1.0`), which serves the GA `2025-11-01` API and does not include the preview capabilities. For the preview capability inventory and links to samples, see the [`1.2.0-beta.3` changelog entry][changelog].

### Configure your Microsoft Foundry resource

Before using the Content Understanding SDK, you need to set up a Microsoft Foundry resource and deploy supported generative models. The service periodically adds support for more models, including the latest gpt-5.x models such as gpt-5.2, gpt-5.4-mini, gpt-5.5, and others. The examples in this README use **gpt-5.2** and **text-embedding-3-large**.

- Current supported and deprecated models: [Supported generative models][supported_generative_models]
- Models being retired: [Foundry model retirement schedule][model_retirement_schedule]
- Deployment guidance: [Content Understanding model deployments guidance][cu_models_deployments]

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

**Important:** Prebuilt and custom analyzers require generative model deployments. Deploy models that Content Understanding currently supports; the supported set grows over time (for example, gpt-5.x models such as gpt-5.2, gpt-5.4-mini, and gpt-5.5). This README uses the following examples:

- **gpt-5.2**
- **text-embedding-3-large**

See [Supported generative models][supported_generative_models] for the current list, including models being deprecated.

To deploy a model:

1. In Microsoft Foundry, go to **Deployments** > **Deploy model** > **Deploy base model**
2. Search for and select a [supported generative model][supported_generative_models] (this guide uses `gpt-5.2` and `text-embedding-3-large` as examples)
3. Complete the deployment with your preferred settings
4. Note the deployment name you chose (by convention, use the model name as the deployment name, e.g., `gpt-5.2` for the `gpt-5.2` model). You can use any deployment name you prefer, but you'll need to note it for use in Step 3 when configuring model deployments.

Repeat this process for each model your analyzers need.

For more information on deploying models, see [Create model deployments in Microsoft Foundry portal][deploy_models_docs].

> **Note on model retirement:** Azure OpenAI / Foundry models are subject to a [model retirement schedule][model_retirement_schedule]. When a model is retired, redeploy to a still-supported model and update your Content Understanding defaults. Review the retirement schedule regularly so you can plan migrations before support ends.

#### Step 3: Configure model deployments (required for prebuilt analyzers)

> **IMPORTANT:** This is a **one-time setup per Microsoft Foundry resource** that maps your deployed models to those required by the prebuilt analyzers and custom models. If you have multiple Microsoft Foundry resources, you need to configure each one separately.

You need to configure the default model mappings in your Microsoft Foundry resource. This can be done programmatically using the SDK. The configuration maps your deployed models (for example, gpt-5.2 and text-embedding-3-large) to the model names and aliases required by prebuilt analyzers.

Prebuilt analyzers reference model aliases in addition to concrete model names. Most prebuilt analyzers, including `prebuilt-invoice`, use `prebuilt-analyzer-completion`; `prebuilt-*Search` analyzers use `prebuilt-analyzer-completion-mini`; and analyzers requiring embeddings use `prebuilt-analyzer-embedding`. Configure all three aliases even when they map to the same deployments as your example models. See [Supported generative models][supported_generative_models] and [Content Understanding model deployments guidance][cu_models_deployments] for current requirements.

To configure model deployments using code, see the [Update Defaults sample][sample_update_defaults] for a complete example. Here's a quick overview:

```typescript snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());

// The model NAMES have sensible defaults; only the DEPLOYMENT names are required.
const completionModel = process.env["CU_COMPLETION_MODEL"] || "gpt-5.2";
const miniCompletionModel = process.env["CU_COMPLETION_MODEL_MINI"] || completionModel;
const embeddingModel = process.env["CU_EMBEDDING_MODEL"] || "text-embedding-3-large";
const completionDeployment = process.env["CU_COMPLETION_MODEL_DEPLOYMENT"]!;
const miniCompletionDeployment =
  process.env["CU_COMPLETION_MINI_DEPLOYMENT"] || completionDeployment;
const embeddingDeployment = process.env["CU_EMBEDDING_DEPLOYMENT"]!;

// Map your deployed models to the models required by prebuilt analyzers
const modelDeployments: Record<string, string> = {
  [completionModel]: completionDeployment,
  [embeddingModel]: embeddingDeployment,
  "prebuilt-analyzer-completion": completionDeployment,
  "prebuilt-analyzer-completion-mini": miniCompletionDeployment,
  "prebuilt-analyzer-embedding": embeddingDeployment,
};
if (miniCompletionModel !== completionModel) {
  modelDeployments[miniCompletionModel] = miniCompletionDeployment;
}

const updatedDefaults = await client.updateDefaults({
  modelDeployments: { additionalProperties: modelDeployments },
});

console.log("Model deployments configured successfully!");
```

> **Note:** The configuration is persisted in your Microsoft Foundry resource, so you only need to run this once per resource (or whenever you change your deployment names).

### Service API versions

This package supports multiple Azure Content Understanding service API versions. You can use the same `@azure/ai-content-understanding` package with either the latest generally available (GA) service API or a newer preview service API by passing the corresponding `apiVersion` value to `ContentUnderstandingClient`.

The package supports the following service API versions:

| SDK version | Supported service API versions | Default service API version |
|-------------|--------------------------------|-----------------------------|
| `1.1.0` | `2025-11-01` | `2025-11-01` |
| `1.2.0-beta.3` | `2025-11-01`, `2026-06-01-preview` | `2026-06-01-preview` |

If you don't specify a service version, the beta package uses the latest preview API version by default.

#### Choose a service API version

When deciding which service API version to use:

- Use `2025-11-01` when you want the latest GA service API.
- Use `2026-06-01-preview` when you want to try preview capabilities added after the GA release.
- If you are following sample code or documentation for preview-only features, create the client with the preview service version explicitly.

#### Use the latest GA service API version

Use the latest GA service API version when you want stable, generally available service behavior:

```ts snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContentUnderstandingClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  { apiVersion: "2025-11-01" },
);
```

#### Use the latest preview service API version

Use the preview service API version when you need preview capabilities that are not available in `2025-11-01`. The beta package defaults to the latest preview, so specifying `apiVersion` is optional:

```ts snippet:ignore
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

// Implicit: the beta package uses "2026-06-01-preview" by default.
const client = new ContentUnderstandingClient("<endpoint>", new DefaultAzureCredential());

// Explicit — equivalent to the above:
const clientExplicit = new ContentUnderstandingClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  { apiVersion: "2026-06-01-preview" },
);
```

> **Note:** Some service capabilities are available only in `2026-06-01-preview`, including:
>
> - Inline analysis (`analyzeInline` / `analyzeBinaryInline`) — see [analyzeInline.ts][sample_analyze_inline] and [analyzeBinaryInline.ts][sample_analyze_binary_inline]
> - Semantic chunking (`SemanticChunkingStrategy` / `DocumentChunk`) — see [analyzeChunking.ts][sample_analyze_chunking]
> - Analyzer workflows (`ContentAnalyzerWorkflow`) — see [createAnalyzerWorkflow.ts][sample_create_analyzer_workflow]
> - Signature detection (`DocumentSignature`) — see [analyzeConfigs.ts][sample_analyze_configs] and [detectSignatures.ts][sample_detect_signatures]
> - In-page segmentation (`allowInPageSegments`) — see [classifyInPageSegments.ts][sample_classify_in_page_segments]
> - Embedded document metadata (`AnalysisContent.metadata`) — see [extractDocumentMetadata.ts][sample_extract_document_metadata]
> - Analysis-result metadata in `toLlmInput` front matter — see [toLlmInput.ts][sample_to_llm_input]

### Authenticate the client

In order to interact with the Content Understanding service, you'll need to create an instance of the `ContentUnderstandingClient` class. To authenticate the client, you need your Microsoft Foundry resource endpoint and credentials. You can use either an API key or Microsoft Entra ID authentication.

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

- **RAG analyzers** - Optimized for retrieval-augmented generation scenarios with semantic analysis and markdown extraction. These analyzers return markdown and a one-paragraph `Summary` for each content item:
  - **`prebuilt-documentSearch`** - Extracts content from documents (PDF, images, Office documents) with layout preservation, table detection, figure analysis, and structured markdown output. Optimized for RAG scenarios.
  - **`prebuilt-imageSearch`** - Analyzes standalone images and returns a one-paragraph description of the image content. Optimized for image understanding and search scenarios. For images that contain text (including hand-written text), use `prebuilt-documentSearch`.
  - **`prebuilt-audioSearch`** - Transcribes audio content with speaker diarization, timing information, and conversation summaries. Supports multilingual transcription.
  - **`prebuilt-videoSearch`** - Analyzes video content with visual frame extraction, audio transcription, and structured summaries. Provides temporal alignment of visual and audio content and can return multiple segments per video.
- **Content extraction analyzers** - Focus on OCR and layout analysis (e.g., `prebuilt-read`, `prebuilt-layout`)
- **Base analyzers** - Fundamental content processing capabilities used as parent analyzers for custom analyzers (e.g., `prebuilt-document`, `prebuilt-image`, `prebuilt-audio`, `prebuilt-video`)
- **Domain-specific analyzers** - Preconfigured analyzers for common document categories including financial documents (invoices, receipts, bank statements), identity documents (passports, driver's licenses), tax forms, mortgage documents, and contracts, and utilities (billing statements)
- **Utility analyzers** - Specialized tools for schema generation and field extraction (e.g., `prebuilt-documentFieldSchema`, `prebuilt-documentFields`)

For a complete list of available prebuilt analyzers and their capabilities, see the [Prebuilt analyzers documentation][prebuilt_analyzers_docs].

### Custom analyzers

You can create custom analyzers with specific field schemas for multi-modal content processing (documents, images, audio, video). Custom analyzers allow you to extract domain-specific information tailored to your use case.

### Content types

The API returns different content types based on the input:

- **`document`** - For document files (PDF, HTML, images, Office documents such as Word, Excel, PowerPoint, and more). Provides basic information such as page count and MIME type. Retrieve detailed information including pages, tables, figures, paragraphs, and many others.
- **`audioVisual`** - For audio and video files. Provides basic information such as timing information (start/end times) and frame dimensions (for video). Retrieve detailed information including transcript phrases, timing information, and for video, key frame references and more.

### Asynchronous operations

Content Understanding operations are asynchronous long-running operations. The workflow is:

1. **Begin Analysis** - Start the analysis operation (returns immediately with an operation location)
2. **Poll for Results** - Poll the operation location until the analysis completes
3. **Process Results** - Extract and display the structured results

The SDK provides poller types that handle polling automatically when using `pollUntilDone()`. For analysis operations, the SDK returns a poller that provides access to the operation ID. This operation ID can be used with `getResultFile` and `deleteResult` methods.

### Main classes

- **`ContentUnderstandingClient`** - The main client for analyzing content, as well as creating, managing, and configuring analyzers
- **`AnalysisResult`** - Contains the structured results of an analysis operation, including content elements, markdown, and metadata

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

- **Configuration** - Configure model deployment defaults for prebuilt analyzers and custom analyzers
- **Document Content Extraction** - Extract structured markdown content from PDFs and images using `prebuilt-documentSearch`, optimized for RAG (Retrieval-Augmented Generation) applications
- **Multi-Modal Content Analysis** - Analyze content from URLs across all modalities: extract markdown and summaries from documents, images, audio, and video using `prebuilt-documentSearch`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, and `prebuilt-videoSearch`
- **Domain-Specific Analysis** - Extract structured fields from invoices using `prebuilt-invoice`
- **Advanced Document Features** - Extract charts, hyperlinks, formulas, and annotations from documents
- **Custom Analyzers** - Create custom analyzers with field schemas for specialized extraction needs
- **Document Classification** - Create and use classifiers to categorize documents
- **Analyzer Management** - Get, list, update, copy, and delete analyzers
- **Result Management** - Retrieve result files from video analysis and delete analysis results

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

### Convert results to LLM-ready text

> **Note:** `toLlmInput()` is currently in preview and may change in future releases.
> We welcome feedback — please [file an issue][file_issue].

Use the `toLlmInput()` helper to convert any analysis result into a text format that LLMs
can consume directly — YAML front matter with extracted fields followed by the markdown body.
This works with all content types (documents, images, audio, video) and handles multi-segment
results and classification hierarchies automatically.

````typescript snippet:ignore
import * as fs from "fs";
import { ContentUnderstandingClient, toLlmInput } from "@azure/ai-content-understanding";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"]!;
const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());

// Analyze a document with text, tables, and charts using prebuilt-documentSearch (CU's primary RAG analyzer)
const pdfBytes = fs.readFileSync("sample_files/sample_document_features.pdf");
const poller = client.analyzeBinary("prebuilt-documentSearch", pdfBytes, "application/pdf");
const result = await poller.pollUntilDone();

// One line to get LLM-ready text
const text = toLlmInput(result);
console.log(text);
// Output:
//   ---
//   contentType: document
//   pages: 1
//   fields:
//     Summary: The document provides an overview of Latin, includes a sample
//       table with names and corporate affiliations, presents a bar chart
//       figure illustrating monthly values, and describes the AI Document
//       Intelligence service...
//   ---
//   <!-- InputPageNumber: 1 -->
//   # ==This is title==
//   ## 1. Text
//   [Latin](https://en.wikipedia.org/wiki/Latin) refers to an ancient Italic language...
//   ## 2. Page Objects
//   ### 2.1 Table
//   <table><caption>Table 1: This is a dummy table</caption>...</table>
//   ### 2.2. Figure
//   ![Values...](figures/1.1 "Bar chart with six bars: Jan=200, Feb=300...")
//   ```chart
//   {"type":"bar","data":{"labels":["Jan","Feb",...],...}}
//   ```
//   ...
````

> **About `<!-- InputPageNumber: N -->`**
>
> The helper emits `<!-- InputPageNumber: N -->` markers at page boundaries in
> the markdown body. `N` is the **original 1-based page number from the source
> document** (i.e., the page index in the analyzed PDF), not a counter that
> restarts at 1 for each call. Downstream consumers (RAG indexers, page-citation
> prompts) can rely on the marker value to cite the correct source page even
> when only a subset of pages was analyzed.
>
> **Why this matters when a page range is specified**
>
> Use `contentRange` on the analyze input to analyze only a subset of pages in
> a multi-page document. The markers in the rendered output preserve the
> original page identity:
>
> ```ts snippet:ignore
> // Analyze pages 2-3 and page 5 of a 10-page PDF.
> const poller = client.analyze("prebuilt-documentSearch", [
>   { url: multiPageUrl, contentRange: "2-3,5" },
> ]);
> const result = await poller.pollUntilDone();
> const text = toLlmInput(result);
> // Output contains markers for the *original* page numbers, not 1, 2, 3:
> //   pages: 2-3, 5
> //   ...
> //   <!-- InputPageNumber: 2 -->
> //   ...page 2 content...
> //   <!-- InputPageNumber: 3 -->
> //   ...page 3 content...
> //   <!-- InputPageNumber: 5 -->
> //   ...page 5 content...
> ```
>
> An LLM or RAG indexer can therefore cite "see page 5" with the correct page
> number, even though page 5 is the *third* segment in the response.

See the [advanced sample][js_cu_sample_to_llm_input] for output options (fields-only, markdown-only, custom metadata), preview metadata from analysis result, multi-page content ranges, and multi-segment video.

## Troubleshooting

### Common issues

**Error: "Access denied due to invalid subscription key or wrong API endpoint"**

- Verify your endpoint URL is correct and includes the trailing slash
- Ensure your API key is valid or that your Microsoft Entra ID credentials have the correct permissions
- Make sure you have the **Cognitive Services User** role assigned to your account

**Error: "Model deployment not found" or "Default model deployment not configured"**

- Ensure you have deployed [supported generative models][supported_generative_models] (this guide uses gpt-5.2 and text-embedding-3-large as examples) in Microsoft Foundry
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

## GitHub Copilot Skills

This package includes [GitHub Copilot][github_copilot] skills under `.github/skills/` that provide interactive, AI-assisted workflows for common tasks. In VS Code, Copilot can use these skills to help with environment setup, running samples, and understanding the service.

### Available Skills

| Skill | Description | How to Use |
|-------|-------------|------------|
| [**cu-sdk-setup**][cu_sdk_setup_skill] | Interactive environment setup — installs the SDK, configures `.env` with endpoint and credentials, and runs the one-time `updateDefaults.js` model configuration | In VS Code Copilot Chat, ask: *"Set up my JavaScript environment for Content Understanding"* or reference the skill directly |
| [**cu-sdk-sample-run**][cu_sdk_sample_run_skill] | Guided sample runner — helps you choose and run specific JavaScript samples with Node.js | Ask: *"Run analyzeUrl sample"* or *"Run the invoice analysis sample"* |
| [**cu-sdk-common-knowledge**][cu_sdk_common_knowledge_skill] | Domain knowledge reference — answers questions about Content Understanding concepts, analyzers, field schemas, API operations, and JavaScript SDK usage | Ask: *"What prebuilt analyzers are available?"* or *"How do I create a custom analyzer?"* |

### Using Skills in VS Code

1. In VS Code, open the package folder `sdk/contentunderstanding/ai-content-understanding` (File → Open Folder). This is required for VS Code to discover the skills in `.github/skills/`.
2. Ensure [GitHub Copilot][github_copilot] is installed and activated
3. Open Copilot Chat from the Chat view or Command Palette
4. Ask a question related to Content Understanding; Copilot can use the relevant skill when appropriate

**Example prompts:**
- *"Set up my JS environment for Content Understanding"* → likely uses `cu-sdk-setup`
- *"Run analyzeInvoice.js"* → likely uses `cu-sdk-sample-run`
- *"Explain how custom analyzers work"* → likely uses `cu-sdk-common-knowledge`

### Troubleshooting Skill Selection

If Copilot does not use the expected skill, try the following:

1. Be explicit about intent and context in one prompt (for example: *"Use cu-sdk-sample-run to run analyzeUrl"*).
2. Include your goal and current state (for example: *"My `.env` is configured; help me run analyzeInvoice.js"*).
3. Ask for a step-by-step interactive flow when needed (for example: *"Guide me step by step to set up my environment"*).
4. For build or runtime errors, mention the exact error text so Copilot can apply the right troubleshooting path.

## Next steps

- [Update Defaults sample][sample_update_defaults] - Required one-time setup to configure model deployments for prebuilt and custom analyzers
- Explore the [samples directory][samples_directory] for complete code examples
- Read the [Azure AI Content Understanding documentation][product_docs] for detailed service information

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

<!-- LINKS -->

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding
[npm_package]: https://www.npmjs.com/package/@azure/ai-content-understanding
[api_reference]: https://learn.microsoft.com/javascript/api/@azure/ai-content-understanding
[changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/CHANGELOG.md
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[product_docs]: https://learn.microsoft.com/azure/ai-services/content-understanding/
[cu_quickstart]: https://learn.microsoft.com/azure/ai-services/content-understanding/quickstart/use-rest-api?tabs=portal%2Cdocument
[cu_region_support]: https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support
[cu_models_deployments]: https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/models-deployments
[model_retirement_schedule]: https://learn.microsoft.com/azure/foundry/openai/concepts/model-retirement-schedule
[supported_generative_models]: https://learn.microsoft.com/azure/ai-services/content-understanding/service-limits#supported-generative-models
[deploy_models_docs]: https://learn.microsoft.com/azure/ai-studio/how-to/deploy-models-openai
[prebuilt_analyzers_docs]: https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/prebuilt-analyzers
[samples_directory]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples
[js_cu_sample_to_llm_input]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/toLlmInput.ts
[sample_update_defaults]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/updateDefaults.ts
[sample_analyze_inline]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/analyzeInline.ts
[sample_analyze_binary_inline]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/analyzeBinaryInline.ts
[sample_analyze_chunking]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/analyzeChunking.ts
[sample_create_analyzer_workflow]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/createAnalyzerWorkflow.ts
[sample_analyze_configs]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/analyzeConfigs.ts
[sample_detect_signatures]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/detectSignatures.ts
[sample_classify_in_page_segments]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/classifyInPageSegments.ts
[sample_extract_document_metadata]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/extractDocumentMetadata.ts
[sample_to_llm_input]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/samples-dev/toLlmInput.ts
[client_options]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/pipelineoptions?view=azure-node-latest
[accessing_response]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/pipelineresponse?view=azure-node-latest
[long_running_operations]: https://learn.microsoft.com/javascript/api/@azure/core-lro?view=azure-node-latest
[handling_failures]: https://learn.microsoft.com/javascript/api/@azure/core-rest-pipeline/resterror?view=azure-node-latest
[diagnostics]: https://learn.microsoft.com/javascript/api/@azure/logger?view=azure-node-latest
[client_lifetime]: https://learn.microsoft.com/azure/developer/javascript/sdk/use-azure-sdk
[github_copilot]: https://github.com/features/copilot
[cu_sdk_setup_skill]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/.github/skills/cu-sdk-setup
[cu_sdk_sample_run_skill]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/.github/skills/cu-sdk-sample-run
[cu_sdk_common_knowledge_skill]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentunderstanding/ai-content-understanding/.github/skills/cu-sdk-common-knowledge
[file_issue]: https://github.com/Azure/azure-sdk-for-js/issues/new?labels=Cognitive%20-%20Content%20Understanding&title=[ContentUnderstanding]%20&body=%23%23%20Library%20Version%0A%0A%23%23%20Repro%20Steps%0A%0A%23%23%20Expected%20Result%0A%0A%23%23%20Actual%20Result
