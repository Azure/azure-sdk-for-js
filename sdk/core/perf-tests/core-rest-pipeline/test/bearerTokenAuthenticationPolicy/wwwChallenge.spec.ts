import { PerfStressTest } from "@azure/test-utils-perfstress";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

export class BearerTokenAuthenticationPolicyWWWChallenge extends PerfStressTest {
  options = {};

  constructor() {
    super();
  }

  async globalSetup(): Promise<void> {
  }

  async runAsync(): Promise<void> {
  }
}
