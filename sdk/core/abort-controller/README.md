# Azure Core Aborter library for JS

`Aborter` is used by the Azure SDK for JavaScript to abort pending work based on timeouts or other signals. `Aborter` is compatible with the `AbortSignal` used by the `fetch` API built into modern browsers.

## Getting started

### Installation
 - Installing this library
```
npm install @azure/abort-controller
```

## Key Concepts
This library contains the `Aborter` class which is used by the Azure SDK for JavaScript to abort pending
work based on timeouts or other signales.
`Aborter` is compatible with the `AbortSignal` used by the `fetch` API built into modern browsers.

## Examples

### Example 1 - basic usage

```js
import { Aborter } from "@azure/abort-controller";

const signal = new Aborter();
doAsyncWork({ abortSignal: signal });

// at some point later
signal.abort();
```

### Example 2 - Aborting with timeout

```js
import { Aborter } from "@azure/abort-controller";

const signal = Aborter.timeout(1000);
doAsyncWork({ abortSignal: signal });
```

### Example 3 - Aborting sub-tasks

```js
import { Aborter } from "@azure/abort-controller";

const allTasksSignal = new Aborter();

const subTask1 = allTasksSignal.withValue("key1", "value1");
const subtask2 = allTasksSignal.withValue("key2", "value2");

allTasksSignal.abort(); // aborts allTasksSignal, subTask1, subTask2
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
