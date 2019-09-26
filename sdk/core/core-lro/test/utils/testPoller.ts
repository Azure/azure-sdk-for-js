import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "../../src"
import { TestServiceClient } from "./testServiceClient";
import { makeOperation, HttpPollProperties } from "./testOperation"

export class TestPoller extends Poller<HttpPollProperties, string> {
  public intervalInMs: number;

  constructor(
    client: TestServiceClient,
    manual: boolean = false,
    intervalInMs: number = 10,
    requestOptions?: RequestOptionsBase,
  ) {
    const operation = makeOperation({}, {
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
    return "Done";
  }
}
