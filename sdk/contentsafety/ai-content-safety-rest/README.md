# Azure AI Content Safety REST client library for JavaScript/TypeScript

[Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) detects harmful user-generated and AI-generated content in applications and services. Content Safety includes text and image APIs that allow you to detect material that is harmful.

* Text Analysis API: Scans text for sexual content, violence, hate, and self-harm with multi-severity levels.
* Image Analysis API: Scans images for sexual content, violence, hate, and self-harm with multi-severity levels.
* Text Blocklist Management APIs: The default AI classifiers are sufficient for most content safety needs; however, you might need to screen for terms that are specific to your use case. You can create blocklists of terms to use with the Text API.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-content-safety)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/ai-content-safety?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You need an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- An [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) resource, if no existing resource, you could [create a new one](https://aka.ms/acs-create).

### Install the `@azure-rest/ai-content-safety` package

Install the Azure AI Content Safety REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-content-safety
```

### Create and authenticate a `ContentSafetyClient`

#### Get the endpoint
You can find the endpoint for your Azure AI Content Safety service resource using the [Azure Portal](https://ms.portal.azure.com/#home) or [Azure CLI](https://learn.microsoft.com/cli/azure/cognitiveservices/account?view=azure-cli-latest#az-cognitiveservices-account-show):

```bash
# Get the endpoint for the Azure AI Content Safety service resource
az cognitiveservices account show --name "resource-name" --resource-group "resource-group-name" --query "properties.endpoint"
```

#### Create a ContentSafetyClient with AzureKeyCredential

- Step 1: Get the API key

The API key can be found in the [Azure Portal](https://ms.portal.azure.com/#home) or by running the following [Azure CLI](https://learn.microsoft.com/cli/azure/cognitiveservices/account?view=azure-cli-latest#az-cognitiveservices-account-show) command:

```bash
az cognitiveservices account keys list --name "<resource-name>" --resource-group "<resource-group-name>"
```

- Step 2: Create a ContentSafetyClient with AzureKeyCredential

To use an API key as the `credential` parameter, pass the key as a string into an instance of `AzureKeyCredential`.

```typescript
import ContentSafetyClient from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";
const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);
```

#### Create a ContentSafetyClient with Microsoft Entra ID (formerly Azure Active Directory (AAD)) token credential

- Step 1: Enable Microsoft Entra ID for your resource
  Please refer to this Cognitive Services authentication document [Authenticate with Microsoft Entra ID](https://learn.microsoft.com/azure/ai-services/authentication?tabs=powershell#authenticate-with-microsoft-entra-id). for the steps to enable AAD for your resource.

  The main steps are:
    - Create resource with a custom subdomain.
    - Create Service Principal and assign Cognitive Services User role to it.

- Step 2: Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity). After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

```typescript
import ContentSafetyClient from "@azure-rest/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
const client = ContentSafetyClient(endpoint, new DefaultAzureCredential());
```

## Key concepts

### Available features
There are different types of analysis available from this service. The following table describes the currently available APIs.

| Feature                        | Description                                                                                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text Analysis API              | Scans text for sexual content, violence, hate, and self-harm with multi-severity levels.                                                                                                                              |
| Image Analysis API             | Scans images for sexual content, violence, hate, and self-harm with multi-severity levels.                                                                                                                            |
| Text Blocklist Management APIs | The default AI classifiers are sufficient for most content safety needs. However, you might need to screen for terms that are specific to your use case. You can create blocklists of terms to use with the Text API. |

### Harm categories
Content Safety recognizes four distinct categories of objectionable content.

| Category  | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hate      | Hate refers to any content that attacks or uses pejorative or discriminatory language in reference to a person or identity group based on certain differentiating attributes of that group. This includes but is not limited to race, ethnicity, nationality, gender identity and expression, sexual orientation, religion, immigration status, ability status, personal appearance, and body size. |
| Sexual    | Sexual describes content related to anatomical organs and genitals, romantic relationships, acts portrayed in erotic or affectionate terms, pregnancy, physical sexual acts—including those acts portrayed as an assault or a forced sexual violent act against one’s will—, prostitution, pornography, and abuse.                                                                                  |
| Violence  | Violence describes content related to physical actions intended to hurt, injure, damage, or kill someone or something. It also includes weapons, guns and related entities, such as manufacturers, associations, legislation, and similar.                                                                                                                                                          |
| Self-harm | Self-harm describes content related to physical actions intended to purposely hurt, injure, or damage one’s body or kill oneself.                                                                                                                                                                                                                                                                   |

Classification can be multi-labeled. For example, when a text sample goes through the text moderation model, it could be classified as both Sexual content and Violence.

### Severity levels

Every harm category the service applies also comes with a severity level rating. The severity level is meant to indicate the severity of the consequences of showing the flagged content.

**Text**: The current version of the text model supports the **full 0-7 severity scale**. By default, the response will output 4 values: 0, 2, 4, and 6. Each two adjacent levels are mapped to a single level. Users could use "outputType" in request and set it as "EightSeverityLevels" to get 8 values in output: 0,1,2,3,4,5,6,7. You can refer [text content severity levels definitions](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/harm-categories?tabs=definitions#text-content) for details.

- [0,1] -> 0
- [2,3] -> 2
- [4,5] -> 4
- [6,7] -> 6

**Image**: The current version of the image model supports the **trimmed version of the full 0-7 severity scale**. The classifier only returns severities 0, 2, 4, and 6; each two adjacent levels are mapped to a single level. You can refer [image content severity levels definitions](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/harm-categories?tabs=definitions#image-content) for details.

- [0,1] -> 0
- [2,3] -> 2
- [4,5] -> 4
- [6,7] -> 6

### Text blocklist management
Following operations are supported to manage your text blocklist:
- Create or modify a blocklist
- List all blocklists
- Get a blocklist by blocklistName
- Add blockItems to a blocklist
- Remove blockItems from a blocklist
- List all blockItems in a blocklist by blocklistName
- Get a blockItem in a blocklist by blockItemId and blocklistName
- Delete a blocklist and all of its blockItems

You can set the blocklists you want to use when analyze text, then you can get blocklist match result from returned response.

## Examples

The following section provides several code snippets covering some of the most common Content Safety service tasks in both **TypeScript** and **JavaScript**, including:

- [Analyze text](#analyze-text)
- [Analyze image](#analyze-image)
- [Manage text blocklist](#manage-text-blocklist)

### Analyze text

#### Analyze text without blocklists

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

async function main() {
  const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
  const key = "<api_key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const text = "This is a sample text";
  const analyzeTextOption = { text: text };
  const analyzeTextParameters = { body: analyzeTextOption };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(textCategoriesAnalysisOutput.category, " severity: ", textCategoriesAnalysisOutput.severity)
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

async function main() {
  const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
  const key = "<api_key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const text = "This is a sample text";
  const analyzeTextOption = { text: text };
  const analyzeTextParameters = { body: analyzeTextOption };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(
      textCategoriesAnalysisOutput.category,
      " severity: ",
      textCategoriesAnalysisOutput.severity
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Analyze text with blocklists

TypeScript

```typescript
import ContentSafetyClient, { CreateOrUpdateTextBlocklistParameters, isUnexpected } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters: CreateOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    }
  }

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist created or updated: Name", result.body.blocklistName, ", Description: ", result.body.description);
}

async function addBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText1
        },
        {
          description: "Test block item 2",
          text: blockItemText2
        }
      ]
    }
  };

  const result = await client.path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName).post(addOrUpdateBlocklistItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.blocklistItems) {
    for (const blockItem of result.body.blocklistItems) {
      console.log("BlockItemId: ", blockItem.blocklistItemId, ", Text: ", blockItem.text, ", Description: ", blockItem.description);
    }
  }
}

async function analyzeTextWithBlocklists() {
  const blocklistName = "TestBlocklist";
  const inputText = "This is a sample to test text with blocklist.";
  const analyzeTextParameters = {
    body: {
      text: inputText,
      blocklistNames: [blocklistName],
      haltOnBlocklistHit: false
    }
  };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist match results: ");
  if (result.body.blocklistsMatch) {
    for (const blocklistMatchResult of result.body.blocklistsMatch) {
      console.log("BlocklistName: ", blocklistMatchResult.blocklistName, ", BlockItemId: ", blocklistMatchResult.blocklistItemId, ", BlockItemText: ", blocklistMatchResult.blocklistItemText);
    }
  }
}

(async () => {
  await createOrUpdateTextBlocklist();
  await addBlockItems();
  await analyzeTextWithBlocklists();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}", blocklistName)
    .patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log(
    "Blocklist created or updated: Name",
    result.body.blocklistName,
    ", Description: ",
    result.body.description
  );
}

async function addBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText1,
        },
        {
          description: "Test block item 2",
          text: blockItemText2,
        },
      ],
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(addOrUpdateBlocklistItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.blocklistItems) {
    for (const blockItem of result.body.blocklistItems) {
      console.log(
        "BlockItemId: ",
        blockItem.blocklistItemId,
        ", Text: ",
        blockItem.text,
        ", Description: ",
        blockItem.description
      );
    }
  }
}

async function analyzeTextWithBlocklists() {
  const blocklistName = "TestBlocklist";
  const inputText = "This is a sample to test text with blocklist.";
  const analyzeTextParameters = {
    body: {
      text: inputText,
      blocklistNames: [blocklistName],
      haltOnBlocklistHit: false,
    },
  };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist match results: ");
  if (result.body.blocklistsMatch) {
    for (const blocklistMatchResult of result.body.blocklistsMatch) {
      console.log(
        "BlocklistName: ",
        blocklistMatchResult.blocklistName,
        ", BlockItemId: ",
        blocklistMatchResult.blocklistItemId,
        ", BlockItemText: ",
        blocklistMatchResult.blocklistItemText
      );
    }
  }
}

(async () => {
  await createOrUpdateTextBlocklist();
  await addBlockItems();
  await analyzeTextWithBlocklists();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Analyze image

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "fs";
import path from "path";

async function main() {
  const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
  const key = "<api_key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./samples-dev/example-data/image.png");

  const imageBuffer = fs.readFileSync(image_path);
  const base64Image = imageBuffer.toString("base64");
  const analyzeImageOption = { image: { content: base64Image } };
  const analyzeImageParameters = { body: analyzeImageOption };

  const result = await client.path("/image:analyze").post(analyzeImageParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const imageCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(imageCategoriesAnalysisOutput.category, " severity: ", imageCategoriesAnalysisOutput.severity)
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");
const path = require("path");

async function main() {
  const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
  const key = "<api_key>";

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const image_path = path.resolve(__dirname, "./samples-dev/example-data/image.png");

  const imageBuffer = fs.readFileSync(image_path);
  const base64Image = imageBuffer.toString("base64");
  const analyzeImageOption = { image: { content: base64Image } };
  const analyzeImageParameters = { body: analyzeImageOption };

  const result = await client.path("/image:analyze").post(analyzeImageParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const imageCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(
      imageCategoriesAnalysisOutput.category,
      " severity: ",
      imageCategoriesAnalysisOutput.severity
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Manage text blocklist

#### Create or update text blocklist

TypeScript

```typescript
import ContentSafetyClient, { CreateOrUpdateTextBlocklistParameters, isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
  
const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters: CreateOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    }
  }

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist created or updated: Name", result.body.blocklistName, ", Description: ", result.body.description);
}

(async () => {
  await createOrUpdateTextBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}", blocklistName)
    .patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log(
    "Blocklist created or updated: Name",
    result.body.blocklistName,
    ", Description: ",
    result.body.description
  );
}

(async () => {
  await createOrUpdateTextBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### List text blocklists

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
  
const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function listTextBlocklists() {
  const result = await client.path("/text/blocklists").get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List blocklists: ");
  if (result.body.value) {
    for (const blocklist of result.body.value) {
      console.log("BlocklistName: ", blocklist.blocklistName, ", Description: ", blocklist.description);
    }
  }
}

(async () => {
  await listTextBlocklists();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function listTextBlocklists() {
  const result = await client.path("/text/blocklists").get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List blocklists: ");
  if (result.body.value) {
    for (const blocklist of result.body.value) {
      console.log(
        "BlocklistName: ",
        blocklist.blocklistName,
        ", Description: ",
        blocklist.description
      );
    }
  }
}

(async () => {
  await listTextBlocklists();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Get text blocklist

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function getTextBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Get blocklist: ");
  console.log("Name: ", result.body.blocklistName, ", Description: ", result.body.description);
}

(async () => {
  await getTextBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function getTextBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Get blocklist: ");
  console.log("Name: ", result.body.blocklistName, ", Description: ", result.body.description);
}

(async () => {
  await getTextBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Delete text blocklist

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function deleteBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).delete();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Deleted blocklist: ", blocklistName);
}

(async () => {
  await deleteBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function deleteBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).delete();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Deleted blocklist: ", blocklistName);
}

(async () => {
  await deleteBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Add blockItems

TypeScript

```typescript
import ContentSafetyClient, { CreateOrUpdateTextBlocklistParameters, isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters: CreateOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    }
  }

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist created or updated: Name", result.body.blocklistName, ", Description: ", result.body.description);
}

async function addBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText1
        },
        {
          description: "Test block item 2",
          text: blockItemText2
        }
      ]
    }
  };

  const result = await client.path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName).post(addOrUpdateBlocklistItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.blocklistItems) {
    for (const blockItem of result.body.blocklistItems) {
      console.log("BlockItemId: ", blockItem.blocklistItemId, ", Text: ", blockItem.text, ", Description: ", blockItem.description);
    }
  }
}

(async () => {
  await createOrUpdateTextBlocklist();
  await addBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}", blocklistName)
    .patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log(
    "Blocklist created or updated: Name",
    result.body.blocklistName,
    ", Description: ",
    result.body.description
  );
}

async function addBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText1,
        },
        {
          description: "Test block item 2",
          text: blockItemText2,
        },
      ],
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(addOrUpdateBlocklistItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.blocklistItems) {
    for (const blockItem of result.body.blocklistItems) {
      console.log(
        "BlockItemId: ",
        blockItem.blocklistItemId,
        ", Text: ",
        blockItem.text,
        ", Description: ",
        blockItem.description
      );
    }
  }
}

(async () => {
  await createOrUpdateTextBlocklist();
  await addBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### List blockItems

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function listBlockItems() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName).get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List block items: ");
  if (result.body.value) {
    for (const blockItem of result.body.value) {
      console.log("BlockItemId: ", blockItem.blocklistItemId, ", Text: ", blockItem.text, ", Description: ", blockItem.description);
    }
  }
}

(async () => {
  await listBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function listBlockItems() {
  const blocklistName = "TestBlocklist";

  const result = await client
    .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
    .get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List block items: ");
  if (result.body.value) {
    for (const blockItem of result.body.value) {
      console.log(
        "BlockItemId: ",
        blockItem.blocklistItemId,
        ", Text: ",
        blockItem.text,
        ", Description: ",
        blockItem.description
      );
    }
  }
}

(async () => {
  await listBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Get blockItem

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function getBlockItem() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText
        }
      ]
    }
  };
  const result = await client.path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName).post(addOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const blockItem = await client.path("/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}", blocklistName, blockItemId).get();

  if (isUnexpected(blockItem)) {
    throw blockItem;
  }

  console.log("Get blockitem: ");
  console.log("BlockItemId: ", blockItem.body.blocklistItemId, ", Text: ", blockItem.body.text, ", Description: ", blockItem.body.description);
}

(async () => {
  await getBlockItem();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function getBlockItem() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText,
        },
      ],
    },
  };
  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(addOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const blockItem = await client
    .path(
      "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}",
      blocklistName,
      blockItemId
    )
    .get();

  if (isUnexpected(blockItem)) {
    throw blockItem;
  }

  console.log("Get blockitem: ");
  console.log(
    "BlockItemId: ",
    blockItem.body.blocklistItemId,
    ", Text: ",
    blockItem.body.text,
    ", Description: ",
    blockItem.body.description
  );
}

(async () => {
  await getBlockItem();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

#### Remove blockItems

TypeScript

```typescript
import ContentSafetyClient, { isUnexpected  } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function removeBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText
        }
      ]
    }
  };
  const result = await client.path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName).post(addOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const removeBlocklistItemsParameters = {
    body: {
      blocklistItemIds: [blockItemId]
    }
  };
  const removeBlockItem = await client.path("/text/blocklists/{blocklistName}:removeBlocklistItems", blocklistName).post(removeBlocklistItemsParameters);

  if (isUnexpected(removeBlockItem)) {
    throw removeBlockItem;
  }

  console.log("Removed blockItem: ", blockItemText);
}

(async () => {
  await removeBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

JavaScript

```javascript
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
const key = "<api_key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function removeBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const addOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText,
        },
      ],
    },
  };
  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(addOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const removeBlocklistItemsParameters = {
    body: {
      blocklistItemIds: [blockItemId],
    },
  };
  const removeBlockItem = await client
    .path("/text/blocklists/{blocklistName}:removeBlocklistItems", blocklistName)
    .post(removeBlocklistItemsParameters);

  if (isUnexpected(removeBlockItem)) {
    throw removeBlockItem;
  }

  console.log("Removed blockItem: ", blockItemText);
}

(async () => {
  await removeBlockItems();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

### Additional documentation

For more extensive documentation on Azure Content Safety, see the [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) on docs.microsoft.com.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.
