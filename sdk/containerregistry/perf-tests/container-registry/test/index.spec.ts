// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { ArtifactListTest } from "./listArtifacts.spec";
import { RepositoryListTest } from "./listRepositories.spec";
console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([RepositoryListTest, ArtifactListTest])
);
perfStressProgram.run();
