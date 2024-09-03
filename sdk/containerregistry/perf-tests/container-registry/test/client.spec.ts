// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import { ContainerRegistryClient } from "@azure/container-registry";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class ContainerRegistryTest<TOptions> extends PerfTest<TOptions> {
  client: ContainerRegistryClient;

  constructor() {
    super();
    this.client = new ContainerRegistryClient(getEnvVar("CONTAINER_REGISTRY_ENDPOINT"));
  }
}

export type ContainerRegistryTestOptions = Record<string, unknown>;
