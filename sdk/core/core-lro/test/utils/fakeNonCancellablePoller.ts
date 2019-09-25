import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "../../src"
import { FakeServiceClient } from "./fakeServiceClient";
import { FakeNonCancellableOperation, HttpPollProperties } from "./fakeOperation"

export class FakeNonCancellablePoller extends Poller<HttpPollProperties> {
  public intervalInMs: number;

  constructor(
    client: FakeServiceClient,
    requestOptions?: RequestOptionsBase,
    intervalInMs?: number,
    manual?: boolean,
  ) {
    const operation = new FakeNonCancellableOperation({
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
