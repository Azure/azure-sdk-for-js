# Azure Core LRO developer guide and samples

Here we will expand on how to use `@azure/core-lro` by presenting a sample, and exploring on how to use the core concepts to build your own Long Running Operation methods returning pollers.

## Sample

In this folder you will be able to see a simple sample file implementing a `Poller` and a `PollOperation` and then using them from a `main()` function.

The sample file:

- [typescript/samplesClient.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/samples/typescript/samplesClient.ts)

## Guide on implementing a LRO method

The following sections go through the core concepts explaining  how to build Long Running Operation methods returning pollers.

### Implementing an operation

To work with a Long Running Operation, we need to define how to update, cancel and serialize the information related to the remote pending task.

To implement this class for your library or application, you'll need to import the definitions of a poll operation and its state.

```typescript
import { PollOperationState, PollOperation } from "@azure/core-lro";
```

A `PollOperation` is an interface that defines how to update the local reference of the state of the remote long running operation, just as well as how to request the cancellation of the same operation.

Besides updating and cancelling, it also defines how to serialize its information, so that polling can be resumed at any time from a previously serialized operation (more at [Serializing an operation](#serializing-an-operation)).

`PollOperationState` provides a basic state for the poll operation. It contains the minimal set of properties needed to keep track of a long running operation, and it's intended to be extended with any custom property that your program might need. The state can be updated any time, but it should be updated at least in three opportunities: when the operation starts, when it's finished, and when it's cancelled.

To be able to create your custom operations, you'll need to extend the `PollOperation` class with both your operation's state and the final result value. For this example, we'll think on the final result value to be `MyResult`, which can be any type.

```typescript
import { PollOperationState, PollOperation } from "@azure/core-lro";

export interface MyOperationState extends PollOperationState<MyResult> {
  serviceClient: any; // You define all of these properties
  myCustomString: string;
  startedAt: Date;
  finishedAt: Date;
  // ... and so on
}

export interface MyPollOperation extends PollOperation<MyOperationState, MyResult> {}
```

We recommend making a utility function to create new instances of your operation. Just like the following:

```typescript
function makeOperation(
  state: MyOperationState,
): MyOperation {
  return {
    // We recommend creating copies of the given state,
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

To properly define an operation, you will need to have implemented these three functions: `update`, `cancel` and `toString`.

A guide on how to write them follows.

#### Your operation's update method

The `update` method defines how to request the remote service for updates on the status of the long running operation.

It optionally receives an object with an `abortSignal` property, from [@azure/abort-controller](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/abort-controller)'s `AbortSignalLike`.

A more advanced use allows passing in a `fireProgress` function, which, if called, is responsible for triggering the
poller's `onProgress` callbacks.

Here is an example of how to write an update method for your operation:

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

  // Asynchronously call your service client...

  // You might update the operation's state at any point
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

The operation's `cancel` method should attempt to cancel the pending operation, if it's allowed by the remote service. Otherwise, it should throw.

It only optionally receives an object with an `abortSignal` property, from [@azure/abort-controller](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/abort-controller)'s `AbortSignalLike`.

It returns a promise that should be resolved with an updated version of the poller's operation.

```typescript
async function cancel(
  this: MyOperation,
  options: { abortSignal?: AbortSignalLike } = {}
): Promise<MyOperation> {
  // ... Reach out to your service to trigger the cancellation of the operation ...

  return makeOperation(
    {
      ...this.state,
      cancelled: true
    }
  );
}
```

#### Serializing an operation

The operation's method `toString` returns a string with a serialized representation of the operation. It's useful when a poller wants to be resumed from a previously serialized state.

The deserialization of the operation has to be implemented within the constructor of a class that extends the Poller class. You can read more at [Resuming from a previous poller](#resuming-from-a-previous-poller).

```typescript
function toString(this: MyOperation): string {
  return JSON.stringify({
    state: {
      ...this.state,
      // Only the plain text properties, for example
    }
  });
}
```
 
### Implementing a poller

@azure/core-lro's `Poller` is a class that represents the definition of a program that polls through consecutive requests until it reaches a state of completion.

A poller can be executed manually, by polling request by request by calling to the `poll()` method repeatedly, until its operation is completed. It also provides a way to wait until the operation finishes, by calling `pollUntilDone()`, which returns a promise. Pollers can also request the cancellation of the ongoing process (internally using `PollOperation`'s `cancel()` method).

The Poller needs two types to be defined, a type representing the state of the poller, which must include a basic set of properties from `PollOperationState<TResult>` (as mentioned in [Implementing an operation](#implementing-an-operation)), and a return type defined by `TResult`, which can be anything.

To implement a poller, you must pull in the definitions of your operation and extend @azure/core-lro's `Poller` class, as follows:

```typescript
import { Poller } from "@azure/core-lro";
import { makeOperation, MyOperation, MyOperationState } from "./myOperation";

// See that "MyResult" here is the type of the result
export class MyPoller extends Poller<MyOperationState, MyResult> {
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

Once defined, you'll be able to use your poller as shown below:

```ts
const poller = new MyPoller();

// Polling just once:
await poller.poll();

// We can try to cancel the request here, by calling:
//
//     await poller.cancelOperation();
//

// Getting the final result:
const result = await poller.pollUntilDone();
```

The Poller class implements the `PollerLike` interface, which allows poller implementations that avoid having to export the Poller's class directly, and instead only export the already instantiated poller with the `PollerLike` type.

An example of the definition of a client that returns an instantiated poller can be seen below:

```ts
class Client {
  public async makePoller: PollerLike<MyOperationState, MyResult> {
    const poller = new MyPoller({});
    // It might be preferred to return the poller after the first request is made,
    // so that some information can be obtained right away.
    await poller.poll();
    return poller;
  }
}

// No knowledge of the class MyPoller:
const poller: PollerLike<MyOperationState, MyResult> = myClient.makePoller();
```

A poller can be created through its constructor, then it can be polled until it's completed. At any point in time, the state of the poller can be obtained without delay through the getOperationState method. At any point in time, the intermediate forms of the result type can be requested without delay.

Once the underlying operation is marked as completed, the poller will stop and the final value will be returned.

Here's an example usage of your client's poller:

```ts
const poller = myClient.makePoller();
const state: MyOperationState = poller.getOperationState();

// The intermediate result can be obtained at any time.
const result: MyResult | undefined = poller.getResult();

// The final result can only be obtained after the poller finishes.
const result: MyResult = await poller.pollUntilDone();
```

#### Resuming from a previous poller

Pollers by default have a method called `toString` that invokes the operation's `toString` method. It can be used to store the state of a poller indefinitely, to then resume by creating another poller at any time in the future.

If an operation's `toString` method is defined as follows:

```ts
function toString(this: TestOperation): string {
  return JSON.stringify({
    state: this.state
  });
}
```

A custom implementation of a poller can deserialize it by receiving this string and converting it back to JSON, like in the following example:

```ts
export class MyPoller extends Poller<MyOperationState, string> {
  constructor(
    baseOperation: string | undefined
  ) {
    let state: MyOperationState = {};
    if (baseOperation) {
      state = {
        ...JSON.parse(baseOperation).state,
        ...state
      };
    }
    const operation = {
      state,
      // ...
    }
    super(operation);
  }
}
```
