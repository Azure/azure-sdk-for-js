// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestOptionsBase } from "@azure/core-http";
import { TestNonCancellablePoller } from "./testNonCancellablePoller";
import { TestOperationState } from "./testOperation";
import { TestPoller } from "./testPoller";
import { TestServiceClient } from "./testServiceClient";

interface StartLROOptions {
  intervalInMs?: number;
  requestOptions?: RequestOptionsBase;
  baseOperation?: string;
  onProgress?: (state: TestOperationState) => void;
}

export class TestClient extends TestServiceClient {
  public async startLRO(options: StartLROOptions = {}): Promise<TestPoller> {
    const poller = new TestPoller(
      this,
      options.intervalInMs,
      options.requestOptions,
      options.baseOperation,
      options.onProgress
    );
    await poller.poll(); // Initial request
    return poller;
  }

  public async startNonCancellableLRO(
    options: StartLROOptions = {}
  ): Promise<TestNonCancellablePoller> {
    const poller = new TestNonCancellablePoller(
      this,
      options.intervalInMs,
      options.requestOptions,
      options.baseOperation,
      options.onProgress
    );
    await poller.poll(); // Initial request
    return poller;
  }
}
