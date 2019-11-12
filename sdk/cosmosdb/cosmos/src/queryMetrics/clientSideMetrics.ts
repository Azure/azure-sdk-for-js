// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class ClientSideMetrics {
  constructor(public readonly requestCharge: number) {}

  /**
   * Adds one or more ClientSideMetrics to a copy of this instance and returns the result.
   */
  public add(...clientSideMetricsArray: ClientSideMetrics[]) {
    let requestCharge = this.requestCharge;
    for (const clientSideMetrics of clientSideMetricsArray) {
      if (clientSideMetrics == null) {
        throw new Error("clientSideMetrics has null or undefined item(s)");
      }

      requestCharge += clientSideMetrics.requestCharge;
    }

    return new ClientSideMetrics(requestCharge);
  }

  public static readonly zero = new ClientSideMetrics(0);

  public static createFromArray(...clientSideMetricsArray: ClientSideMetrics[]) {
    if (clientSideMetricsArray == null) {
      throw new Error("clientSideMetricsArray is null or undefined item(s)");
    }

    return this.zero.add(...clientSideMetricsArray);
  }
}
