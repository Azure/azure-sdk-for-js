# Azure Core AMQP client library for JavaScript

The `@azure/core-amqp` package provides common functionality for **Azure** JavaScript
libraries that use the [AMQP protocol](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-protocol-guide)
like the ones for Azure Service Bus and Azure Event Hubs.

## Getting started

### Installation

Install this library using npm as follows:

```bash
npm install @azure/core-amqp
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## Key concepts

Some of the key features of Azure Core AMQP library are:

- [Claims based Authorization](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-protocol-guide#claims-based-authorization)
- Request-Response link for [sending request and receiving response over AMQP](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-protocol-guide#amqp-management)
- Error translation of AMQP error codes along with errors specific to Azure Service Bus and Azure Event Hubs.
- RetryPolicy for retrying a given operation if a retryable error was encountered.

## Next steps

You can build and run the tests locally by executing `rushx test`. Explore the `test` folder to see advanced usage and behavior of the public classes.

## Troubleshooting

The core-amqp library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, and for sending and receiving events over the [AMQP](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Logging

You can set the `AZURE_LOG_LEVEL` environment variable to one of the following values to enable logging to `stderr`:

- verbose
- info
- warning
- error

You can also set the log level programmatically by importing the
[@azure/logger](https://www.npmjs.com/package/@azure/logger) package and calling the
`setLogLevel` function with one of the log level values.
For example, when you set the log level to `info`, the logs that are written for levels
`warning` and `error` are also emitted.
This SDK follows the Azure SDK for TypeScript [guidelines](https://azure.github.io/azure-sdk/typescript_implementation.html#general-logging)
when determining which level to log to.

When setting a log level either programmatically or via the `AZURE_LOG_LEVEL` environment variable,
any logs that are written using a log level equal to or less than the one you choose will be emitted.

You can alternatively set the `DEBUG` environment variable to get logs when using this library.
This can be useful if you also want to emit logs from the dependencies `rhea-promise` and `rhea` as well.

**Note:** AZURE_LOG_LEVEL, if set, takes precedence over DEBUG.
Do not specify any `azure` libraries via DEBUG when also specifying
AZURE_LOG_LEVEL or calling setLogLevel.

- Getting only info level debug logs from the core-amqp library.

```bash
export DEBUG=azure:core-amqp:info
```

- Getting debug logs from the core-amqp and the protocol level library.

```bash
export DEBUG=azure:core-amqp:*,rhea*
```

- If you are **not interested in viewing the raw event data** (which consumes a large amount of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:core-amqp:*,rhea*,-rhea:raw,-rhea:message
```

- If you are interested only in **errors** and SDK **warnings**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:core-amqp:(error|warning),rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

#### Logging to a file

- Set the `DEBUG` environment variable as shown above and then run your test script as follows:
  - Logging statements from you test script go to `out.log` and logging statement from the sdk go to `debug.log`.
    ```bash
    node your-test-script.js > out.log 2>debug.log
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
    ```bash
    node your-test-script.js >out.log 2>&1
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log`.
    ```bash
    node your-test-script.js &> out.log
    ```

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-amqp%2FREADME.png)
