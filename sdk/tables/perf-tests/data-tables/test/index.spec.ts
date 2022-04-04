import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { CreateSimpleEntityTest } from "./createSimpleEntity.spec";
import { CreateSimpleEntityBatchTest } from "./createSimpleEntityBatchTest.spec";
import { CreateComplexEntityTest } from "./createComplexEntity.spec";
import { CreateComplexEntityBatchTest } from "./createComplexEntityBatchTest.spec";
import { ListSimpleEntitiesTest } from "./listSimpleEntities.spec";
import { ListComplexEntitiesTest } from "./listComplexEntities.spec";

// Expects the .env file at the same level
import * as dotenv from "dotenv";

dotenv.config();

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([
    CreateSimpleEntityTest,
    CreateSimpleEntityBatchTest,
    CreateComplexEntityTest,
    CreateComplexEntityBatchTest,
    ListSimpleEntitiesTest,
    ListComplexEntitiesTest,
  ])
);

perfProgram.run();
