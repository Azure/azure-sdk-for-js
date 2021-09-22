// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { ContainerRegistryClient } from "@azure/container-registry";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class ContainerRegistryTest<TOptions> extends PerfStressTest<TOptions> {
  client: ContainerRegistryClient;

  constructor() {
    super();
    this.client = new ContainerRegistryClient(getEnvVar("CONTAINER_REGISTRY_ENDPOINT"));
  }
}

export type ContainerRegistryTestOptions = Record<string, unknown>;
