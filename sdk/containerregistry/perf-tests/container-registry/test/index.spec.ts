// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { ArtifactListTest } from "./listArtifacts.spec.js";
import { RepositoryListTest } from "./listRepositories.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(RepositoryListTest, ArtifactListTest);
perfProgram.run();
