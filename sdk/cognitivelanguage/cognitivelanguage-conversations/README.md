# ConversationAnalysis client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for ConversationAnalysis client.

The language service conversations API is a suite of natural language processing (NLP) skills that can be used to analyze structured conversations (textual or spoken). The synchronous API in this suite accepts a request and mediates among multiple language projects, such as LUIS Generally Available, Question Answering, Conversational Language Understanding, and then calls the best candidate service to handle the request. At last, it returns a response with the candidate service's response as a payload.

 In some cases, this API needs to forward requests and responses between the caller and an upstream service. The asynchronous APIs in this suite enable tasks like Conversation Summarization and Conversational PII detection.

[Package (NPM)](https://www.npmjs.com/package/azure-ai-language-conversations) |

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.


### Install the `azure-ai-language-conversations` package

Install the ConversationAnalysis client library for JavaScript with `npm`:

```bash
npm install azure-ai-language-conversations
```



### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### ConversationAnalysisClient

`ConversationAnalysisClient` is the primary interface for developers using the ConversationAnalysis client library. Explore the methods on this client object to understand the different features of the ConversationAnalysis service that you can access.

