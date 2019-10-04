# Azure Logger library for JS

The `@azure/logger` package can be used to enable logging in the Azure SDKs for JavaScript.

Logging can be enabled for the Azure SDK in the following ways:

- Setting the AZURE_LOG_LEVEL environment variable
- Calling setLogLevel imported from "@azure/logger"
- Calling enable() on specific loggers
- Using the `DEBUG` environment variable.

Note that AZURE_LOG_LEVEL, if set, takes precedence over DEBUG. Only use DEBUG without specifying AZURE_LOG_LEVEL or calling setLogLevel.

## Getting started

### Installation

Install this libray using npm as follows

```
npm install @azure/logger
```

## Key Concepts

The `@azure/logger` package supports the following log levels
specified in order of most verbose to least verbose:

- verbose
- info
- warning
- error

When setting a log level, either programmitcally or via the `AZURE_LOG_LEVEL` environment variable,
any logs that are written using a log level equal to or less than the one you choose
will be emitted.

For example, setting the log level to `warning` will cause all logs that have the log
level `warning` or `error` to be emitted.

## Examples

### Example 1 - basic usage

```js
const { EventHubClient } = require('@azure/event-hubs');

const logger = require('@azure/logger');
logger.setLogLevel('info');

// operations will now emit info, warning, and error logs
const client = new EventHubClient(/* params */);
client.getPartitionIds()
  .then(ids => { /* do work */ })
  .catch(e => { /* do work */ });
});
```

### Example 2 - redirect log ouput

```js
const { AzureLogger, setLogLevel } = require('@azure/logger');

setLogLevel("verbose");

// override logging to output to console.log (default location is stderr)
AzureLogger.log = (...args) => {
  console.log(...args);
};
```

Using `AzureLogger`, it is possible to redirect the logging output from the Azure SDKs by
overriding the `AzureLogger.log` method. This may be useful if you want to redirect logs to
a location other than stderr.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor
License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your
contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and
decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot.
You will only need to do this once across all repos using our CLA.

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

This project has adopted the Microsoft Open Source Code of Conduct.
For more information see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional
questions or comments.
