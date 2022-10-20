# Azure @azure-tools/test-recorder library for JavaScript

The Azure SDK for JavaScript is composed of a multitude of libraries that attempt to deliver a common, homogenous SDK to make use of all of the services that Azure can provide. Among the challenges of such a goal, we have some that are specific to tests, some of which we can summarize in the following questions:

- How to write live tests that can work as unit tests?
- How to ensure that tests are as fast as they can be?
- How to avoid writing mocked versions of our HTTP API?
- How to protect sensitive data from our live tests?
- How to write tests that support parallelism?
- How to write isomorphic tests for NodeJS and the Browsers?
- How to test the Azure SDKs(published to npm) in the development phase of user applications with minimal live Azure resources?

Our recorder tool package `@azure-tools/test-recorder` attempts to provide an answer for these questions.

By leveraging the unified out-of-process test proxy server, this library gives the recording and playback capabilities by providing interfaces and helper methods to

- equip the tests of the JS client SDKs in the `azure-sdk-for-js` repo
- allow developers depending on the Azure SDKs(published to npm) for JS/TS to test the (Azure SDK) clients in their applications with minimal live Azure resources.

`@azure-tools/test-recorder`, as part of the Test Utils available in the `azure-sdk-for-js` repository

- Intentional usage of this library is to add as a devDependency to enable tests of the client SDKs with record/playback capabilities.

For the convenience of the developers and readability, the documentation is split into the following.

- [RecorderForTests.md](./RecorderForTests.md)
- [RecorderForPublic.md](./RecorderForPublic.md)
- [KeyConcepts.md](./KeyConcepts.md)

If you're a developer working on an SDK inside the `azure-sdk-for-js` repository, and want to use recorder in your tests

- Go to [RecorderForTests.md](./RecorderForTests.md)

If you're a developer depending on the Azure SDKs(published to npm) for JS, and want to test (Azure SDK) clients in your applications with minimal live Azure resources

- Go to [RecorderForPublic.md](./RecorderForPublic.md)

To keep [RecorderForTests.md](./RecorderForTests.md) and [RecorderForPublic.md](./RecorderForPublic.md) lighter, the key concepts are moved to its own [KeyConcepts.md](./KeyConcepts.md)

## Index

- [Key concepts](#key-concepts)
- [Getting started](#getting-started)
  - [Installing the package](#installing-the-package)
  - [Configuring your project](#configuring-your-project)
  - [TEST_MODE](#test_mode)
- [Using the `Recorder`](#using-the-recorder)
  - [Recorder#variable()](#recordervariable)
  - [Environment Variables](#environment-variables)
  - [`@azure-tools/test-credential` package and the NoOpCredential](#azure-toolstest-credential-package-and-the-noopcredential)
  - [karma.conf - for the browser tests](#karmaconf---for-the-browser-tests)
- [Examples](#examples)
  - [How to record](#how-to-record)
  - [How to playback](#how-to-playback)
  - [Update existing recordings](#update-existing-recordings)
  - [Skipping tests](#skipping-tests)
  - [Securing sensitive data](#securing-sensitive-data)
  - [Supporting parallelism](#supporting-parallelism)
  - [Isomorphic tests](#isomorphic-tests)
  - [Many ways to run the test-proxy tool](#many-ways-to-run-the-test-proxy-tool)
- [Troubleshooting](#troubleshooting)
- [Next steps](#next-steps)
- [Contributing](#contributing)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Frecorder%2FREADME.png)
