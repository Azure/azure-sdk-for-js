// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { ArtifactListTest } from "./listArtifacts.spec";
import { RepositoryListTest } from "./listRepositories.spec";

const perfProgram = createPerfProgram(RepositoryListTest, ArtifactListTest);
perfProgram.run();
