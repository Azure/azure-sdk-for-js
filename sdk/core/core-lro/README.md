# Azure Core LRO client library for JS

Azure's Core LRO is a JavaScript library that provides an API that aims to
allow the azure-sdk-for-js public libraries to implement fully featured pollers
to manage long running operations with the Azure services.

core-lro is made following our guidelines, here: https://azure.github.io/azure-sdk/typescript_design.html#ts-lro

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-lro)

## Getting started

### Install the package

Since this package is intended to be consumed by developers of the azure-sdk-for-js repository,
you'll need to manually add the following entry to your package.json's dependencies:

```json
{
  // ...
  "dependencies": {
    // ...
    "@azure/core-lro": "1.0.0-preview.1",
    // ...
  }
}
```

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your
tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`,
`allowSyntheticDefaultImports` is enabled by default. See [TypeScript's
compiler options
handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
for more information.

## Key concepts

- Whenever we talk about an **operation**, we mean the static representation of a Long Running Operation.
  Any operation will have a definition of a state, which has a defined set of
  properties plus any property the implementations would like to add. Any
  operation will have three basic functionalities:
    1. An update() method that will generate a new operation that might or might
      not include changes to its state.
    2. A cancel() method, which will tell the service that the operation is no longer needed.
    3. A toString() method, that will output a serialized version of the operation.
- A **Poller** is an object who's main function is to interact with an operation until one of three things happen:
    1. The poller is stopped.
    2. The operation finishes, either by succeeding or failing.
    3. The operation is cancelled.

Now we'll examine how to set up an implementation of an operation and a poller.

## Examples

You will be able to find some working examples of an implementation of an operation and a poller both in
our test files: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-lro/test
as well as in the azure-sdk-for-js libraries that might be currently using core-lro, which can be found here: 
https://github.com/Azure/azure-sdk-for-js/search?q="from+%40azure%5C%2Fcore-lro"&unscoped_q="from+%40azure%5C%2Fcore-lro"

### Implementing an operation

First, you'll need to import the definitions of a poll operation and its state, as follows:

```typescript
import { PollOperationState, PollOperation } from "@azure/core-lro";
```

A **PollOperation** requires implementing its state. We recommend extending the PollOperationState we provide.
An example can be:

```typescript
export interface MyOperationState extends PollOperationState<string> {
  serviceClient: any; // You define all of these properties
  myCustomString: string;
  startedAt: Date;
  finishedAt: Date;
  // ... and so on
}
```

Now, to be able to create your custom operations, you'll need to extend the
PollOperation class with both your operation's state and the final result
value. For this example, we'll think on the final result value to be a string,
but it can be any type.

```typescript
export interface MyPollOperation extends PollOperation<MyOperationState, string> {}
```

Now you can make a utility function to create new instances of your operation, as follows:

```typescript
function makeOperation(
  state: MyOperationState,
): MyOperation {
  return {
    // We recommend you to create copies of the given state,
    // just to make sure that no references are left or manipulated by mistake.
    state: {
      ...state,
    },
    update,
    cancel,
    toString
  };
}
```

Keep in mind that you'll need to have implemented these three functions: `update`, `cancel` and `toString`
on order to successfully create an operation. Ideas of how you might do so follow:

#### Your operation's update method

```typescript
async function update(
  this: MyOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: MyOperationState) => void;
  } = {}
): Promise<MyOperation> {
  let isDone: boolean = false;
  let doFireProgress: boolean = false;

  // Asyncrhonously call your service client...

  // You might also update the operation's state
  if (isDone) {
    this.state.completed = true;
    this.state.result = "Done";
  }

  // You can also arbitrarily report progress
  if (doFireProgress) {
    options.fireProgress(state);
  }

  return makeOperation(this.state);
}
```

#### Your operation's cancel method

```typescript
async function cancel(
  this: MyOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<MyOperation> {
  // Reach out to your service to trigger the cancellation of the operation

  return makeOperation(
    {
      ...this.state,
      cancelled: true
    }
  );
}
```

#### Your operation's toString method

```typescript
function toString(this: MyOperation): string {
  return JSON.stringify({
    state: {
      ...this.state,
      // Only the plain text properties, for examle
    }
  });
}
```
 
### Implementing a poller

To implement a poller, you must pull in the definitions of your operation and extend core-lro's poller, as follows:

```typescript
import { Poller } from "@azure/core-lro";
import { makeOperation, MyOperation, MyOperationState } from "./myOperation";

// See that "string" here is the type of the result
export class MyPoller extends Poller<MyOperationState, string> {
  constructor(
    baseOperation?: MyOperation,
    onProgress?: (state: MyOperationState) => void
  ) {
    let state: MyOperationState = {};

    if (baseOperation) {
      state = baseOperation.state;
    }

    const operation = makeOperation(state);

    super(operation);

    // Setting up the poller to call progress when the operation decides.
    // This ties to the operation's update method, which receives a
    // fireProgress method in the optional properties.
    if (onProgress) {
      this.onProgress(onProgress);
    }
  }

  async delay(): Promise<void> {
    // Your own implementation of a delay
  }
}
```

### Using your poller

Here's one simple examle of your poller in action. More examples can be found in the test folder near this README.

```typescript
const poller = new MyPoller();

// Waiting until the operation completes
const result = await poller.pollUntilDone();
const state = poller.getOperationState();

console.log(state.completed);
```

## Troubleshooting

### Enable logs

TODO.

## Next steps

TODO.

## Contributing

This project welcomes contributions and suggestions. Please read the
[contributing guidelines](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md)
for detailed information about how to contribute and what to expect while contributing.

### Testing

To run our tests, first install the dependencies (with `npm install` or `rush install`),
then run the unit tests with: `npm run unit-test`.

### Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/core/core-lro/README.png)
