import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "../../src"
import { TestServiceClient } from "./testServiceClient";
import { makeNonCancellableOperation, TestOperation, TestOperationProperties } from "./testOperation"

export class TestNonCancellablePoller extends Poller<TestOperationProperties, string> {
  public intervalInMs: number;

  constructor(
    client: TestServiceClient,
    manual: boolean = false,
    intervalInMs: number = 10,
    requestOptions?: RequestOptionsBase,
    baseOperation?: TestOperation
  ) {
    let state: PollOperationState = {};
    let properties: TestOperationProperties | undefined = undefined;

    if (baseOperation) {
      state = baseOperation.state;
      properties = baseOperation.properties;
    }
 
    const operation = makeNonCancellableOperation(state, {
      ...properties,
      client,
      requestOptions,
    });

    super(
      operation,
      manual,
    );

    this.intervalInMs = intervalInMs;
  }

  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  async getResult(): Promise<string> {
    if (!this.isDone()) {
      return "Not done";
    }
    return "Done!";
  }
}
