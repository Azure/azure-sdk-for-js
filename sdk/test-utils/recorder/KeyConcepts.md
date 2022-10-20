For the convenience of the developers and readability, the documentation is split into the following.
- [README.md](./README.md) -> landing page
- [RecorderForTests.md](./RecorderForTests.md)
- [RecorderForPublic.md](./RecorderForPublic.md)
- [KeyConcepts.md](./KeyConcepts.md)

If you're a developer working on an SDK inside the `azure-sdk-for-js` repository, and want to use recorder in your tests

- Go to [RecorderForTests.md](./RecorderForTests.md)

If you're a developer depending on the Azure SDKs(published to npm) for JS, and want to test (Azure SDK) clients in your applications with minimal live Azure resources

- Go to [RecorderForPublic.md](./RecorderForPublic.md)

## Index

- [Key concepts](#key-concepts)

## Key concepts

- To **record** means to intercept any HTTP request, store it in a file, then store the response received from the live resource that was originally targeted. We leverage the unified out-of-process test proxy server that is built for this use case.
  - If being used inside the `azure-sdk-for-js` repo for SDK tests, the output files are stored in `recordings/node/*` and in `recordings/browsers/*`, which are relative to the root of the project you're working on.
  - Else, based on the file path that you provide, the recording files are generated (Examples below. #TODO )
- To **playback** means to intercept any HTTP request and to respond it with the stored response of a previously recorded matching request.
- **Sensitive information** means content that should not be shared publicly. Content like passwords, unique identifiers or personal information should be cleaned up from the recordings. Some functionality is provided to fix this problem. You can read more at [securing sensitive data](#securing-sensitive-data).
