# Azure OpenAI Assistants client library for JavaScript

The Azure OpenAI Assistants client library for JavaScript is an adaptation of OpenAI's REST APIs that provides an idiomatic interface and rich integration with the rest of the Azure SDK ecosystem. It can connect to Azure OpenAI resources or to the non-Azure OpenAI inference endpoint, making it a great choice for even non-Azure OpenAI development.```

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Package (NPM)](https://www.npmjs.com/package/@azure/openai-assistants)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/openai-assistants)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure/openai-assistants` package

Install the Azure Assistants REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure/openai-assistants
```

### Create and authenticate a `AssistantsClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET


## Usage

### Overview

See [OpenAI's "how assistants work"](https://platform.openai.com/docs/assistants/how-it-works) documentation for an
overview of the concepts and relationships used with assistants. This overview closely follows
[OpenAI's overview example](https://platform.openai.com/docs/assistants/overview) to demonstrate the basics of
creating, running, and using assistants and threads.

To get started, create an `AssistantsClient`:
```javascript Snippet:OverviewCreateClient
const assistantsClient = isAzureOpenAI
  ? new AssistantsClient(new Uri(azureResourceUrl), new AzureKeyCredential(azureApiKey))
  : new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));
```

With a client, an assistant can then be created:
```javascript Snippet:OverviewCreateAssistant
const assistant = await assistantsClient.createAssistant({
  model: "gpt-4-1106-preview",
  name: "JS Math Tutor",
  instructions: "You are a personal math tutor. Write and run code to answer math questions.",
  tools: [{ type: "code_interpreter" }]
});
```

Next, create a thread:
```javascript Snippet:OverviewCreateThread
const assistantThread = await assistantsClient.createThread();
```

With a thread created, messages can be created on it:
```javascript Snippet:OverviewCreateMessage
const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
const messageResponse = await assistantsClient.createMessage(assistantThread.id, "user", question);
```

A run can then be started that evaluates the thread against an assistant:
```javascript Snippet:OverviewCreateRun
let runResponse = await assistantsClient.createRun(assistantThread.id, assistant.id, {
   instructions: "Please address the user as Jane Doe. The user has a premium account." 
});
```

Once the run has started, it should then be polled until it reaches a terminal status:
```javascript Snippet:OverviewWaitForRun
do {
  await new Promise(r => setTimeout(r, 500));
  runResponse = await assistantsClient.retrieveRun(assistantThread.id, runResponse.id);
} while (runResponse.status === "queued" || runResponse.status === "in_progress")
```

Assuming the run successfully completed, listing messages from the thread that was run will now reflect new information
added by the assistant:
```javascript Snippet:OverviewListUpdatedMessages
const runMessages = await assistantsClient.listMessages(assistantThread.id);
for (const runMessageDatum of runMessages.data) {
  for (const item of runMessageDatum.content) {
    if (item.type === "text") {
      console.log(item.text.value);
    } else if (item.type === "image_file") {
      console.log(item.image_file.file_id);
    }
  }
}
```

Example output from this sequence:
```
2023-11-14 20:21:23 -  assistant: The solution to the equation \(3x + 11 = 14\) is \(x = 1\).
2023-11-14 20:21:18 -       user: I need to solve the equation `3x + 11 = 14`. Can you help me?
```

### Working with files for retrieval

Files can be uploaded and then referenced by assistants or messages. First, use the generalized upload API with a
purpose of 'assistants' to make a file ID available:
```javascript Snippet:UploadAssistantFilesToUse
const filename = "sample_file_for_upload.txt";
fs.writeFileSync(filename, "The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.");
const uploadAssistantFile = await assistantsClient.uploadFile(fs.readFileSync(filename), "assistants", { filename });
```

Once uploaded, the file ID can then be provided to an assistant upon creation. Note that file IDs will only be used
if an appropriate tool like Code Interpreter or Retrieval is enabled.
```javascript Snippet:CreateAssistantWithFiles
const fileAssistant = await assistantsClient.createAssistant({
  model: "gpt-4-1106-preview",
  name: "JS SDK Test Assistant - Retrieval",
  instructions: "You are a helpful assistant that can help fetch data from files you know about.",
  tools: [{ type: "retrieval" }],
  fileIds: [ uploadAssistantFile.id ]
});
```

With a file ID association and a supported tool enabled, the assistant will then be able to consume the associated
data when running threads.


### Using function tools and parallel function calling

As [described in OpenAI's documentation for assistant tools](https://platform.openai.com/docs/assistants/tools/function-calling),
tools that reference caller-defined capabilities as functions can be provided to an assistant to allow it to
dynamically resolve and disambiguate during a run.

Here, outlined is a simple assistant that "knows how to," via caller-provided functions:

1. Get the user's favorite city
1. Get a nickname for a given city
1. Get the current weather, optionally with a temperature unit, in a city

To do this, begin by defining the functions to use -- the actual implementations here are merely representative stubs.

```javascript Snippet:FunctionsDefineFunctionTools
// Example of a function that defines no parameters
const getFavoriteCity = () => "Atlanta, GA";
const getUserFavoriteCityTool = { 
  type: "function",
  function: {
    name: "getUserFavoriteCity",
    description: "Gets the user's favorite city.",
    parameters: {
      type: "object",
      properties: {}
    }
  }
}; 

// Example of a function with a single required parameter
const getCityNickname = (city) => { 
  switch (city) { 
    case "Atlanta, GA": 
      return "The ATL"; 
    case "Seattle, WA": 
      return "The Emerald City"; 
    case "Los Angeles, CA":
      return "LA"; 
    default: 
      return "Unknown"; 
  }
};

const getCityNicknameTool = { 
  type: "function",
  function: {
    name: "getCityNickname",
    description: "Gets the nickname for a city, e.g. 'LA' for 'Los Angeles, CA'.",
    parameters: { 
      type: "object",
      properties: { 
        city: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA"
        } 
      }
    }
  }
};

// Example of a function with one required and one optional, enum parameter
const getWeatherAtLocation = (location, temperatureUnit = "f") => {
  switch (location) { 
    case "Atlanta, GA": 
      return temperatureUnit === "f" ? "84f" : "26c"; 
    case "Seattle, WA": 
      return temperatureUnit === "f" ? "70f" : "21c"; 
    case "Los Angeles, CA":
      return temperatureUnit === "f" ? "90f" : "28c"; 
    default: 
      return "Unknown"; 
  }
};

const getWeatherAtLocationTool = { 
  type: "function",
  function: {
    name: "getWeatherAtLocation",
    description: "Gets the current weather at a provided location.",
    parameters: { 
      type: "object",
      properties: { 
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA"
        },
        temperatureUnit: {
          type: "string",
          enum: ["f", "c"],
        }
      },
      required: ["location"]
    }
  }
};
```

With the functions defined in their appropriate tools, an assistant can be now created that has those tools enabled:

```javascript Snippet:FunctionsCreateAssistantWithFunctionTools
  const weatherAssistant = await assistantsClient.createAssistant({
  // note: parallel function calling is only supported with newer models like gpt-4-1106-preview
  model: "gpt-4-1106-preview",
  name: "JS SDK Test Assistant - Weather",
  instructions: `You are a weather bot. Use the provided functions to help answer questions.
    Customize your responses to the user's preferences as much as possible and use friendly
    nicknames for cities whenever possible.
  `,
  tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool]
});
```

If the assistant calls tools, the calling code will need to resolve `ToolCall` instances into matching
`ToolOutputSubmission` instances. For convenience, a basic example is extracted here:

```javascript Snippet:FunctionsHandleFunctionCalls
const getResolvedToolOutput = (toolCall) => {
  const toolOutput = { toolCallId: toolCall.id };

  if (toolCall["function"]) {
    const functionCall = toolCall["function"];
    const functionName = functionCall.name;
    const functionArgs = JSON.parse(functionCall["arguments"] ?? {});

    switch (functionName) {
      case "getUserFavoriteCity":
        toolOutput.output = getFavoriteCity();
        break;
      case "getCityNickname":
        toolOutput.output = getCityNickname(functionArgs["city"]);
        break;
      case "getWeatherAtLocation":
        toolOutput.output = getWeatherAtLocation(functionArgs.location, functionArgs.temperatureUnit);
        break;
      default:
        toolOutput.output = `Unknown function: ${functionName}`;
        break;
    }
  }
  return toolOutput;
};
```

To handle user input like "what's the weather like right now in my favorite city?", polling the response for completion
should be supplemented by a `RunStatus` check for `RequiresAction` or, in this case, the presence of the
`RequiredAction` property on the run. Then, the collection of `ToolOutputSubmissions` should be submitted to the
run via the `SubmitRunToolOutputs` method so that the run can continue:

```javascript Snippet:FunctionsHandlePollingWithRequiredAction
const question = "What's the weather like right now in my favorite city?";
let runResponse = await assistantsClient.createThreadAndRun({ 
  assistantId: weatherAssistant.id, 
  thread: { messages: [{ role: "user", content: question }] },
  tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool]
});

do {
  await new Promise(r => setTimeout(r, 500));
  runResponse = await assistantsClient.retrieveRun(runResponse.threadId, runResponse.id);
  
  if (runResponse.status === "requires_action" && runResponse.requiredAction.type === "submit_tool_outputs") {
    const toolOutputs = [];

    for (const toolCall of runResponse.requiredAction.submitToolOutputs.tool_calls) {
      toolOutputs.push(getResolvedToolOutput(toolCall));
    }
    runResponse = await assistantsClient.submitRunToolOutputs(runResponse.threadId, runResponse.id, toolOutputs);
  }
} while (runResponse.status === "queued" || runResponse.status === "in_progress")
```

Note that, when using supported models, the assistant may request that several functions be called in parallel. Older
models may only call one function at a time.

Once all needed function calls have been resolved, the run will proceed normally and the completed messages on the
thread will contain model output supplemented by the provided function tool outputs.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
