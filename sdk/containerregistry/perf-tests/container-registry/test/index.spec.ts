// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { ManifestListTest } from "./listManifests.spec";
import { RepositoryListTest } from "./listRepositories.spec";
import { TagListTest } from "./listTags.spec";
console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([RepositoryListTest, ManifestListTest, TagListTest])
);
perfStressProgram.run();
