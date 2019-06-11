# Azure Abort Controller library for JS

`AborterController` is used by the Azure SDK for JavaScript to abort pending work based on timeouts or other signals.
`AbortSignal` is compatible with the `AbortSignal` used by the `fetch` API built into modern browsers.

## Getting started

### Installation

- Installing this library

```
npm install @azure/abort-controller
```

## Key Concepts

This library contains the `AbortController` and `AbortSignal` classes which are used by the Azure SDK for JavaScript
to abort pending work based on timeouts or other signals.
The `AbortSignal` class contains some static methods to simplify common use-cases, such as calling abort after a timeout.

## Examples

### Example 1 - basic usage

```js
import { AbortController } from "@azure/abort-controller";

const controller = new AbortController();
doAsyncWork({ abortSignal: controller.signal });

// at some point later
controller.abort();
```

### Example 2 - Aborting with timeout

```js
import { AbortSignal } from "@azure/abort-controller";

const signal = AbortSignal.timeout(1000);
doAsyncWork({ abortSignal: signal });
```

### Example 3 - Aborting sub-tasks

```js
import { AbortController } from "@azure/abort-controller";

const allTasksController = new AbortController();

const subTask1 = new AbortController(allTasksController.signal);
const subtask2 = new AbortController(allTasksController.signal);

allTasksController.abort(); // aborts allTasksSignal, subTask1, subTask2
subTask1.abort(); // aborts only subTask1
```

## Next Steps

Please take a look at the Examples section above to use this package.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor
License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your
contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and
decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot.
You will only need to do this once across all repos using our CLA.

This project has adopted the Microsoft Open Source Code of Conduct.
For more information see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional
questions or comments.
