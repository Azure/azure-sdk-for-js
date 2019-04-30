# Aborter

Aborter is used by the Azure SDK for JavaScript to abort pending work based on timeouts or other signals. Aborter is compatible with the AbortSignal used by the `fetch` API built into modern browsers.

## Getting started

```
npm install @azure/core-aborter
```

```js
import { Aborter } from "@azure/core-aborter";

const signal = new Aborter();
doAsyncWork({ abortSignal: signal });

// at some point later
signal.abort();
```

### Aborting after a timeout

```js
import { Aborter } from "@azure/core-aborter";

const signal = Aborter.timeout(1000);
doAsyncWork({ abortSignal: signal });
```

### Aborting sub-tasks

```js
import { Aborter } from "@azure/core-aborter";

const allTasksSignal = new Aborter();

const subTask1 = new Aborter(allTasksSignal);
const subtask2 = new Aborter(allTasksSignal);

allTasksSignal.abort(); // aborts allTasksSignal, subTask1, subTask2
subTask1.abort(); // aborts only subTask1
```
