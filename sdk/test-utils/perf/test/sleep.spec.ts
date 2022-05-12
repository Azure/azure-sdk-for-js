// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, PerfOptionDictionary } from "../src";
import { delay } from "@azure/core-http";

interface SleepOptions {
  "initial-delay-ms": number;
  "instance-growth-factor": number;
  "iteration-growth-factor": number;
}

// Used for verifying the perf framework correctly computes average throughput across parallel tests of different speed
export class SleepTest extends PerfTest {
  private delayInMs = 0;
  private iterationGrowthFactor = 0;

  public options: PerfOptionDictionary<SleepOptions> = {
    "initial-delay-ms": {
      description: "Initial delay (in milliseconds)",
      defaultValue: 1000,
    },
    "instance-growth-factor": {
      description:
        "Instance growth factor.  The delay of instance N will be (InitialDelayMS * (InstanceGrowthFactor ^ InstanceCount)).",
      defaultValue: 1,
    },
    "iteration-growth-factor": {
      description:
        "Iteration growth factor.  The delay of iteration N will be (InitialDelayMS * (IterationGrowthFactor ^ IterationCount)).",
      defaultValue: 1,
    },
  };

  constructor() {
    super();

    const initialDelayMs = this.parsedOptions["initial-delay-ms"].value as number;
    const instanceGrowthFactor = this.parsedOptions["instance-growth-factor"].value as number;
    this.iterationGrowthFactor = this.parsedOptions["iteration-growth-factor"].value as number;

    this.delayInMs = initialDelayMs * Math.pow(instanceGrowthFactor, this.parallelIndex);
  }

  async run(): Promise<void> {
    await delay(this.delayInMs);
    this.delayInMs *= this.iterationGrowthFactor;
  }
}
