# Azure Abort Controller library for JS

The `@azure/abort-controller` package provides `AbortController` and `AbortSignal` classes that are compatible
with the `AbortController` built into modern browsers and the `AbortSignal` used by `fetch`.
These classes are provided for use with APIs in the Azure SDK for JavaScript that accept an `AbortSignalLike`
parameter to cancel an operation.

## Getting started

### Installation

- Installing this library

```
npm install @azure/abort-controller
```

## Key Concepts

Use the `AbortController` to create an `AbortSignal` which can then be passed to Azure SDK operations to cancel
pending work. The `AbortSignal` can be accessed via the `signal` property on an instantiated `AbortController`.
An `AbortSignal` can also be returned directly from a static method, e.g. `AbortController.timeout(100)`.
that is cancelled after 100 milliseconds.

Calling `abort()` on the instantiated `AbortController` updates the associated `AbortSignal`.
Any subsequent calls to `abort()` on the same controller will have no effect.

The `AbortSignal.none` static property returns an `AbortSignal` that can not be aborted.
Provde this to an Azure SDK method that requires an `abortSignal` if you don't wish to add custom abort logic.

`AbortSignals` can also be linked so that when `abort()` is called on parent signal,
it also fires on all child signals.
This relationship is one-way, meaning that a parent signal can affect a child signal, but not the other way around.
To create a parent-child relationship, pass in any parent signals to the `AbortController` constructor.

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
import { AbortController } from "@azure/abort-controller";

const signal = AbortController.timeout(1000);
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
