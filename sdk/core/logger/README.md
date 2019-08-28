# Logger for JS

Logging can be enabled for the Azure SDK in the following ways:

* Setting the AZURE_LOG_LEVEL environment variable
* Calling setLogLevel imported from "@azure/logger"
* Calling enable() on specific loggers
* Using the `DEBUG` environment variable.

Note that AZURE_LOG_LEVEL, if set, takes precedence over DEBUG. Only use DEBUG without specifying AZURE_LOG_LEVEL or calling setLogLevel.


## Getting started

### Installation

Install this libray using npm as follows

```
npm install @azure/logger
```

## Key Concepts

## Examples

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
