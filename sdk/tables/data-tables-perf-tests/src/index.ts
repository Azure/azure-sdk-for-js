// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { CreateSimpleEntityTest } from "./createSimpleEntity.spec.js";
import { CreateSimpleEntityBatchTest } from "./createSimpleEntityBatchTest.spec.js";
import { CreateComplexEntityTest } from "./createComplexEntity.spec.js";
import { CreateComplexEntityBatchTest } from "./createComplexEntityBatchTest.spec.js";
import { ListSimpleEntitiesTest } from "./listSimpleEntities.spec.js";
import { ListComplexEntitiesTest } from "./listComplexEntities.spec.js";
import "dotenv/config";

const perfProgram = createPerfProgram(
  CreateSimpleEntityTest,
  CreateSimpleEntityBatchTest,
  CreateComplexEntityTest,
  CreateComplexEntityBatchTest,
  ListSimpleEntitiesTest,
  ListComplexEntitiesTest,
);

perfProgram.run();
