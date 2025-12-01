# Azure AI Projects client library for JavaScript

The AI Projects client library provides easy access to resources in your Microsoft Foundry project.
Use it to:

- **Create and run Agents** using the `.agents` property on the client.
- **Get an OpenAI client** using the `.getOpenAIClient.` method.
- **Enumerate AI Models** deployed to your Foundry Project using the `.deployments` operations.
- **Enumerate connected Azure resources** in your Foundry project using the `.connections` operations.
- **Upload documents and create Datasets** to reference them using the `.datasets` operations.
- **Upload, retrieve, list, and delete files** using the OpenAI client obtained from `.getOpenAIClient()`. upload files to be used for fine-tuning and other AI model operations.
- **Create and enumerate Search Indexes** using the `.indexes` operations.

The client library uses version `2025-11-15-preview` of the Microsoft Foundry [data plane REST APIs](https://aka.ms/azsdk/azure-ai-projects/rest-api-reference).

[Product documentation](https://aka.ms/azsdk/azure-ai-projects/product-doc)
| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples)
| [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects)
| [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme?view=azure-node-v1)
| [SDK source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisite](#prerequisite)
  - [Authorization](#authorization)
  - [Install the package](#install-the-package)
- [Key concepts](#key-concepts)
  - [Create and authenticate the client](#create-and-authenticate-the-client)
- [Examples](#examples)
  - [Performing Responses operations using OpenAI client](#performing-responses-operations-using-openai-client)
  - [Performing Agent operations](#performing-agent-operations)
  - [Deployments operations](#deployments-operations)
  - [Connections operations](#connections-operations)
  - [Dataset operations](#dataset-operations)
  - [Files operations](#files-operations)
  - [Indexes operations](#indexes-operations)
- [Tracing](#tracing)
- [Troubleshooting](#troubleshooting)
  - [Exceptions](#exceptions)
  - [Reporting issues](#reporting-issues)
- [Next steps](#next-steps)
- [Contributing](#contributing)

## Getting started

### Prerequisite

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- An [Azure subscription][azure_sub].
- A [project in Microsoft Foundry](https://learn.microsoft.com/azure/ai-studio/how-to/create-projects?tabs=ai-studio).

### Authorization

- [Entra ID][entra_id] is needed to authenticate the client. Your application needs an object that implements the [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential) interface. Code samples here use [DefaultAzureCredential][default_azure_credential]. To get that working, you will need:
  - The `Contributor` role. Role assigned can be done via the "Access Control (IAM)" tab of your Azure AI Project resource in the Azure portal. Learn more about role assignments [here](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
  - You are logged into your Azure account by running `az login`.
  - Note that if you have multiple Azure subscriptions, the subscription that contains your Azure AI Project resource must be your default subscription. Run `az account list --output table` to list all your subscription and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

### Install the package

```bash
npm install @azure/ai-projects @azure/identity
```

## Key concepts

### Create and authenticate the client

To construct an `AIProjectsClient`, the `projectEndpoint` can be fetched from [projectEndpoint][ai_project_client_endpoint]. Below we will assume the environment variable `AZURE_AI_PROJECT_ENDPOINT` was defined to hold this value:

```ts snippet:setup
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const client = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
```

The client uses API version `2025-11-15-preview`, refer to the [API documentation][ai_foundry_data_plane_rest_apis] to learn more about the supported features.

## Examples

### Performing Responses operations using OpenAI client

Your Microsoft Foundry project may have one or more OpenAI models deployed that support chat completions. Use the code below to get an authenticated [OpenAI](https://github.com/openai/openai-python?tab=readme-ov-file#microsoft-azure-openai) from the [openai](https://pypi.org/project/openai/) package, and execute a chat completions call.

Run the code below. Here we assume `deploymentName` (str) is defined. It's the deployment name of an AI model in your Foundry Project. As shown in the "Models + endpoints" tab, under the "Name" column.

Update the `api_version` value with one found in the "Data plane - inference" row [in this table](https://learn.microsoft.com/azure/ai-foundry/openai/reference#api-specs)..

For openai logging, please refer [OpenAI Logging](https://github.com/openai/openai-node/tree/master?tab=readme-ov-file#logging).

```ts snippet:openAI
const openAIClient = await project.getOpenAIClient();
const response = await openAIClient.responses.create({
  model: deploymentName,
  input: "What is the size of France in square miles?",
});
console.log("response = ", JSON.stringify(response, null, 2));
```

See the "responses" folder in the [package samples][samples] for additional samples, including streaming responses.

### Performing Agent operations

The `.agents` property on the `AIProjectsClient` gives you access to all Agent operations. Agents use an extension of the
OpenAI Responses protocol, so you will likely need to get an `OpenAI` client to do Agent operations, as shown in the example below.

```ts snippet:agents
const openAIClient = await project.getOpenAIClient();
const agent = await project.agents.createVersion("my-agent-basic", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant that answers general questions",
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
const conversation = await openAIClient.conversations.create({
  items: [
    { type: "message", role: "user", content: "What is the size of France in square miles?" },
  ],
});
console.log(`Created conversation with initial user message (id: ${conversation.id})`);
// Generate response using the agent
console.log("\nGenerating response...");
const response = await openAIClient.responses.create(
  {
    conversation: conversation.id,
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response output: ${response.output_text}`);
// Add a second user message to the conversation
console.log("\nAdding a second user message to the conversation...");
await openAIClient.conversations.items.create(conversation.id, {
  items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
});
console.log("Added a second user message to the conversation");
// Generate second response
console.log("\nGenerating second response...");
const response2 = await openAIClient.responses.create(
  {
    conversation: conversation.id,
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response output: ${response2.output_text}`);
// Clean up
console.log("\nCleaning up resources...");
await openAIClient.conversations.delete(conversation.id);
console.log("Conversation deleted");
await project.agents.deleteVersion(agent.name, agent.version);
console.log("Agent deleted");
```

### Deployments operations

The code below shows some Deployments operations, which allow you to enumerate the AI models deployed to your Microsoft Foundry Projects. These models can be seen in the "Models + endpoints" tab in your Microsoft Foundry Project. Full samples can be found under the "deployment" folder in the [package samples][samples].

```ts snippet:deployments
import { ModelDeployment } from "@azure/ai-projects";

const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";
console.log("List all deployments:");
const deployments: ModelDeployment[] = [];
const properties: Array<Record<string, string>> = [];

for await (const deployment of project.deployments.list()) {
  // Check if this is a ModelDeployment (has the required properties)
  if (
    deployment.type === "ModelDeployment" &&
    "modelName" in deployment &&
    "modelPublisher" in deployment &&
    "modelVersion" in deployment
  ) {
    deployments.push(deployment);
    properties.push({
      name: deployment.name,
      modelPublisher: deployment.modelPublisher,
      modelName: deployment.modelName,
    });
  }
}
console.log(`Retrieved deployments: ${JSON.stringify(properties, null, 2)}`);

// List all deployments by a specific model publisher (assuming we have one from the list)
console.log(`List all deployments by the model publisher '${modelPublisher}':`);
const filteredDeployments: ModelDeployment[] = [];
for await (const deployment of project.deployments.list({
  modelPublisher,
})) {
  // Check if this is a ModelDeployment
  if (
    deployment.type === "ModelDeployment" &&
    "modelName" in deployment &&
    "modelPublisher" in deployment &&
    "modelVersion" in deployment
  ) {
    filteredDeployments.push(deployment);
  }
}
console.log(
  `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
);

// Get a single deployment by name
if (deployments.length > 0) {
  const deploymentName = deployments[0].name;
  console.log(`Get a single deployment named '${deploymentName}':`);
  const singleDeployment = await project.deployments.get(deploymentName);
  console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment, null, 2)}`);
}
```

### Connections operations

The code below shows some Connection operations, which allow you to enumerate the Azure Resources connected to your Microsoft Foundry Projects. These connections can be seen in the "Management Center", in the "Connected resources" tab in your Microsoft Foundry Project. Full samples can be found under the "connections" folder in the [package samples][samples].

```ts snippet:connections
import { Connection } from "@azure/ai-projects";

// List the details of all the connections
const connections: Connection[] = [];
const connectionNames: string[] = [];
for await (const connection of project.connections.list()) {
  connections.push(connection);
  connectionNames.push(connection.name);
}
console.log(`Retrieved connections: ${connectionNames}`);

// Get the details of a connection, without credentials
const connectionName = connections[0].name;
const connection = await project.connections.get(connectionName);
console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);

const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
console.log(
  `Retrieved connection with credentials ${JSON.stringify(connectionWithCredentials, null, 2)}`,
);

// List all connections of a specific type
const azureAIConnections: Connection[] = [];
for await (const azureOpenAIConnection of project.connections.list({
  connectionType: "AzureOpenAI",
  defaultConnection: true,
})) {
  azureAIConnections.push(azureOpenAIConnection);
}
console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);

// Get the details of a default connection
const defaultConnection = await project.connections.getDefault("AzureOpenAI", true);
console.log(`Retrieved default connection ${JSON.stringify(defaultConnection, null, 2)}`);
```

### Dataset operations

The code below shows some Dataset operations. Full samples can be found under the "datasets"
folder in the [package samples][samples].

```ts snippet:datasets
import { DatasetVersionUnion } from "@azure/ai-projects";

const VERSION1 = "1.0";
const VERSION2 = "2.0";
const VERSION3 = "3.0";

// sample files to use in the demonstration
const sampleFolder = "sample_folder";
// Create a unique dataset name for this sample run
const datasetName = `sample-dataset-basic`;
console.log("Upload a single file and create a new Dataset to reference the file.");
console.log("Here we explicitly specify the dataset version.");

const dataset1 = await project.datasets.uploadFile(
  datasetName,
  VERSION1,
  path.join(__dirname, sampleFolder, "sample_file1.txt"),
);
console.log("Dataset1 created:", JSON.stringify(dataset1, null, 2));

const credential = project.datasets.getCredentials(dataset1.name, dataset1.version, {});
console.log("Credential for the dataset:", credential);
console.log(
  "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
);
console.log("Here again we explicitly specify a new dataset version");
const dataset2 = await project.datasets.uploadFolder(
  datasetName,
  VERSION2,
  path.join(__dirname, sampleFolder),
);
console.log("Dataset2 created:", JSON.stringify(dataset2, null, 2));
console.log(
  "Upload a single file to the existing dataset, while letting the service increment the version",
);
const dataset3 = await project.datasets.uploadFile(
  datasetName,
  VERSION3,
  path.join(__dirname, sampleFolder, "sample_file2.txt"),
);
console.log("Dataset3 created:", JSON.stringify(dataset3, null, 2));

console.log("Get an existing Dataset version `1`:");
const datasetVersion1 = await project.datasets.get(datasetName, VERSION1);
console.log("Dataset version 1:", JSON.stringify(datasetVersion1, null, 2));
console.log(`Listing all versions of the Dataset named '${datasetName}':`);
const datasetVersions = await project.datasets.listVersions(datasetName);
for await (const version of datasetVersions) {
  console.log("List versions:", version);
}
console.log("List latest versions of all Datasets:");
const latestDatasets = project.datasets.list();
for await (const dataset of latestDatasets) {
  console.log("List datasets:", dataset);
}
// List the details of all the datasets
const datasets = project.datasets.listVersions(datasetName);
const allDatasets: DatasetVersionUnion[] = [];
for await (const dataset of datasets) {
  allDatasets.push(dataset);
}
console.log(`Retrieved ${allDatasets.length} datasets`);
console.log("Delete all Datasets created above:");
await project.datasets.delete(datasetName, VERSION1);
await project.datasets.delete(datasetName, VERSION2);
await project.datasets.delete(datasetName, dataset3.version);
console.log("All specified Datasets have been deleted.");
```

### Files operations

The code below shows some Files operations using the OpenAI client, which allow you to upload, retrieve, list, and delete files. These operations are useful for working with files that can be used for fine-tuning and other AI model operations. Full samples can be found under the "files" folder in the [package samples][samples].

```ts snippet:files
const openAIClient = await project.getOpenAIClient();
console.log("Uploading file");
const created = await openAIClient.files.create({
  file: fs.createReadStream(filePath),
  purpose: "fine-tune",
});
console.log(`Uploaded file with ID: ${created.id}`);
const uploadedFile = await openAIClient.files.retrieve(created.id);
console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));
console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
const contentResponse = await openAIClient.files.content(uploadedFile.id);
const buf = Buffer.from(await contentResponse.arrayBuffer());
console.log(buf.toString("utf-8"));
// 4) List all files
console.log("Listing all files:");
const filesList = await openAIClient.files.list();
for (const f of filesList.data ?? []) {
  console.log(JSON.stringify(f));
}
// 5) Delete the file
console.log(`Deleting file with ID: ${uploadedFile.id}`);
const deleted = await openAIClient.files.delete(uploadedFile.id);
console.log(
  `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(deleted?.deleted ?? true)}`,
);
```

### Indexes operations

The code below shows some Indexes operations. Full samples can be found under the "indexes"
folder in the [package samples][samples].

```ts snippet:indexes
import { AzureAISearchIndex } from "@azure/ai-projects";

const indexName = "sample-index";
const version = "1";
const azureAIConnectionConfig: AzureAISearchIndex = {
  name: indexName,
  type: "AzureSearch",
  version,
  indexName,
  connectionName: "sample-connection",
};

// Create a new Index
const newIndex = await project.indexes.createOrUpdate(indexName, version, azureAIConnectionConfig);
console.log("Created a new Index:", newIndex);
console.log(`Get an existing Index version '${version}':`);
const index = await project.indexes.get(indexName, version);
console.log(index);
console.log(`Listing all versions of the Index named '${indexName}':`);
const indexVersions = project.indexes.listVersions(indexName);
for await (const indexVersion of indexVersions) {
  console.log(indexVersion);
}
console.log("List all Indexes:");
const allIndexes = project.indexes.list();
for await (const i of allIndexes) {
  console.log("Index:", i);
}
console.log("Delete the Index versions created above:");
await project.indexes.delete(indexName, version);
```

## Tracing

**Note:** Tracing functionality is in preliminary preview and is subject to change. Spans, attributes, and events may be modified in future versions.

You can add an Application Insights Azure resource to your Microsoft Foundry project. See the Tracing tab in your Microsoft Foundry project. If one was enabled, you can get the Application Insights connection string, configure your AI Projects client, and observe the full execution path through Azure Monitor. Typically, you might want to start tracing before you create a client or Agent.

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [RestError](https://learn.microsoft.com/javascript/api/%40azure/core-rest-pipeline/resterror) for a non-success HTTP status code response from the service. The exception's `code` will hold the HTTP response status code. The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```ts snippet:exceptions
import { isRestError } from "@azure/core-rest-pipeline";

try {
  const result = await project.connections.list();
} catch (e) {
  if (isRestError(e)) {
    console.log(`Status code: ${e.code}`);
    console.log(e.message);
  } else {
    console.error(e);
  }
}
```

For example, when you provide wrong credentials:

```text
Status code: 401 (Unauthorized)
Operation returned an invalid status 'Unauthorized'
```

### Reporting issues

To report issues with the client library, or request additional features, please open a GitHub issue [here](https://github.com/Azure/azure-sdk-for-js/issues)

## Next steps

Have a look at the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples) folder, containing fully runnable code.

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution.
For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only
need to do this once across all repos using our CLA.

This project has adopted the
[Microsoft Open Source Code of Conduct][code_of_conduct]. For more information,
see the Code of Conduct FAQ or contact opencode@microsoft.com with any
additional questions or comments.

<!-- LINKS -->

[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[entra_id]: https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/configure-entra-id?tabs=javascript&pivots=ai-foundry-portal
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_sub]: https://azure.microsoft.com/free/
[evaluators]: https://learn.microsoft.com/azure/ai-studio/how-to/develop/evaluate-sdk
[evaluator_library]: https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app#view-and-manage-the-evaluators-in-the-evaluator-library
[ai_foundry_data_plane_rest_apis]: https://learn.microsoft.com/rest/api/aifoundry/aiprojects/operation-groups?view=rest-aifoundry-aiprojects-v1
[ai_project_client_endpoint]: https://learn.microsoft.com/azure/ai-foundry/how-to/develop/sdk-overview?tabs=sync&pivots=programming-language-javascript
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples
