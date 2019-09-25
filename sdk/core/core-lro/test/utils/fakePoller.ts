import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "../../src"
import { FakeServiceClient } from "./fakeServiceClient";
import { FakeOperation, HttpPollProperties } from "./fakeOperation"

export class FakePoller extends Poller<HttpPollProperties> {
  public intervalInMs: number;

  constructor(
    client: FakeServiceClient,
    requestOptions?: RequestOptionsBase,
    intervalInMs?: number,
    manual?: boolean,
  ) {
    const operation = new FakeOperation({
      client,
      requestOptions,
    });

    super(
      operation,
      manual,
    );

    this.intervalInMs = intervalInMs || 10;
  }

  public async poll(): Promise<void> {
    while (!this.stopped && !this.done) {
      await this.delay();
      this.operation = await this.operation.update();
    }
  }
 
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
