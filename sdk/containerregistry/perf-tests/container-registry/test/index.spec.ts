// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { ArtifactListTest } from "./listArtifacts.spec";
import { RepositoryListTest } from "./listRepositories.spec";
console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([RepositoryListTest, ArtifactListTest]));
perfProgram.run();
