// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { ArtifactListTest } from "./listArtifacts.spec";
import { RepositoryListTest } from "./listRepositories.spec";

const perfProgram = createPerfProgram(RepositoryListTest, ArtifactListTest);
perfProgram.run();
