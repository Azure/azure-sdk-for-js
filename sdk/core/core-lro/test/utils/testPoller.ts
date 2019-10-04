import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "../../src";
import { TestServiceClient } from "./testServiceClient";
import { makeOperation, TestOperation, TestOperationProperties } from "./testOperation";

export class TestPoller extends Poller<TestOperationProperties, string> {
  public intervalInMs: number;

  constructor(
    client: TestServiceClient,
    manual: boolean = false,
    intervalInMs: number = 10,
    requestOptions?: RequestOptionsBase,
    baseOperation?: TestOperation,
    onProgress?: (properties: TestOperationProperties) => void
  ) {
    let state: PollOperationState<string> = {};
    let properties: TestOperationProperties | undefined = undefined;

    if (baseOperation) {
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation = makeOperation(state, {
      ...properties,
      client,
      requestOptions
    });

    super(operation, manual);

    if (onProgress) {
      this.onProgress(onProgress);
    }
    this.intervalInMs = intervalInMs;
  }

  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  async getResult(): Promise<string | undefined> {
    if (!this.isDone()) {
      return "Not done";
    }
    return "Done";
  }
}
