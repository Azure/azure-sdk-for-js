// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Poller, PollOperation, PollerLike, PollOperationState } from "@azure/core-lro";
import { delay } from "@azure/core-util";

// This sample implements a poller, a client and runs the poller operation until it finishes.

/**
 * The return value of our long running operation.
 */
interface ReturnValue {
  /**
   * Anything can be here. We're choosing a number value to make it easier for this sample.
   */
  value: number;
}

/**
 * This sample's poll operation state.
 * Extends PollOperationState, which has all the required minimal properties to make the poller work.
 */
export interface SamplePollOperationState extends PollOperationState<ReturnValue> {
  /**
   * As part of the operation state, we'll be using a reference to the client.
   * This will let us use the public methods of the client to reach to remote services.
   */
  requestCount: number;
  /**
   * To keep track of the progress we've made so far, we're going to record all the previously received ReturnValues in this array.
   */
  previousResponses: ReturnValue[];
}

/**
 * The definition of our sample's poll operation.
 * It extends PollOperation, which makes sure the shape of the interface remains consistent.
 * It uses the SamplePollOperationState, which allows to use the default properties of a poll operation state,
 * plus the ones we've defined above.
 * It returns an instance of the ReturnValue interface.
 */
interface SamplePollOperation extends PollOperation<SamplePollOperationState, ReturnValue> {}

/**
 * A utility method that builds an instance of the sample poll operation with some default methods.
 */
function makeSamplePollOperation(state: SamplePollOperationState, client: Client): SamplePollOperation {
  return {
    /**
     * To ensure the state is always clean of previously used references, we're making a copy of it.
     */
    state: {
      ...state,
      previousResponses: [...state.previousResponses]
    },
    /**
     * The update method should change the operation's state.
     * In our case, we'll be calling the Client's makeRequest.
     */
    async update(): Promise<SamplePollOperation> {
      const state: SamplePollOperationState = {
        ...this.state
      };

      if (!state.isStarted) {
        state.result = await client.makeRequest(state);
        state.isStarted = true;
      } else if (!state.isCompleted) {
        state.result = await client.makeRequest(state);
        if (client.isDone(state.result!.value)) {
          state.isCompleted = true;
        }
      }

      state.previousResponses.push(state.result!);

      return makeSamplePollOperation(state, client);
    },
    /**
     * The cancel method can be called to send a cancelling signal to the remote service.
     * If cancelling isn't supported, an error can be thrown instead.
     */
    async cancel(): Promise<SamplePollOperation> {
      const state = this.state;

      state.result = await client.cancel();

      state.previousResponses.push(state.result);

      return makeSamplePollOperation(
        { ...state, isCancelled: true },
        client
      );
    },

    /**
     * The toString method serializes the PollOperationState, so that
     * one poller can be stopped and another poller can recover at any time
     * based on a copy of the first one.
     */
    toString(): string {
      return JSON.stringify({
        state: this.state
      });
    }
  };
}

/**
 * Here's our sample's poller.
 * It will work over our SamplePollOperationState.
 * Once the polling is completed, it will return an instance of the ReturnValue interface.
 */
class SamplePoller extends Poller<SamplePollOperationState, ReturnValue> {
  public intervalInMs: number;

  constructor({
    client,
    requestCount,
    intervalInMs = 2000,
    resumeFrom
  }: {
    client: Client;
    requestCount:number;
    intervalInMs?: number;
    resumeFrom?: string;
  }) {
    let state: SamplePollOperationState = {
      requestCount,
      previousResponses: []
    };

    // Here's an example of how to resume from the serialized version of a previously defined poller.
    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    // Making a new instance of the SamplePollOperation
    const operation = makeSamplePollOperation(state, client);

    super(operation);
    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Could be used to get a publicly safe version of the poller state.
   */
  public getOperationState(): SamplePollOperationState {
    return this.operation.state;
  }
}

/**
 * Now it's time to define our Client.
 * Our client will have four public methods:
 * `makeRequest()` attempts to emulate the network request,
 * `cancel()` which portrays how to tell the remote resource to cancel the long running operation,
 * and `beginLongOperation()`, the method that returns the poller.
 */
class Client {
  constructor() {}

  /**
   * We'll keep track of the number of requests through this private property.
   * This is just to demonstrate the poller's behavior.
   */
  private requestCount: number = 1;

  /**
   * isDone is here to represent a way to determine if the response from the service indicates that the long running operation has finished.
   * In this sample we're considering a number value of 3 to be the only indicator that the operation has finished.
   */
  public isDone(value: number): boolean {
    return value === 3;
  }

  /**
   * cancel should reach out to the remote service to indicate that the
   * long running operation should be cancelled. In our case it simply returns a value,
   * the poller will stop nonetheless.
   */
  public async cancel(): Promise<ReturnValue> {
    return {
      value: 0
    };
  }

  /**
   * makeRequest simulates a method that reaches out to a remote resource that responds differently each time
   */
  public async makeRequest(state: SamplePollOperationState): Promise<ReturnValue> {
    // Let's assume the HTTP request happens here.
    await delay(1000);
    return {
      value: state.requestCount++
    };
  }

  public async beginLongOperation(options?: {
    resumeFrom?: string;
  }): Promise<PollerLike<PollOperationState<ReturnValue>, ReturnValue>> {
    const poller = new SamplePoller({
      client: this,
      requestCount: this.requestCount,
      ...options
    });
    await poller.poll();
    return poller;
  }
}

// Now let's see how the client is used.

export async function main(): Promise<void> {
  let client = new Client();
  let poller = await client.beginLongOperation();
  console.log(poller.getResult()); // Should show: { value: 1 }
  let result = await poller.pollUntilDone();
  console.log(result); // Should show: { value: 3 }

  // We can start again and do each call individually
  client = new Client();
  poller = await client.beginLongOperation();
  console.log(poller.getResult()); // Should show: { value: 1 }
  await poller.poll();
  console.log(poller.getResult()); // Should show: { value: 2 }
  await poller.poll();
  console.log(poller.getResult()); // Should show: { value: 3 }
  console.log(poller.isDone()); // Should be: true

  // We can also start it, then serialize it, then resume it with a different poller
  client = new Client();
  poller = await client.beginLongOperation();
  console.log(poller.getResult()); // Should show: { value: 1 }
  const serialized = poller.toString();
  poller = await client.beginLongOperation({ resumeFrom: serialized });
  console.log(poller.getResult()); // Should show: { value: 2 }
  await poller.poll();
  console.log(poller.getResult()); // Should show: { value: 3 }
  console.log(poller.isDone()); // Should be: true
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
