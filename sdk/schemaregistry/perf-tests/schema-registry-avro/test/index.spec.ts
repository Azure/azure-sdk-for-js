// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { SerializeTest } from "./serialize.spec";
import { DeserializeTest } from "./deserialize.spec";

import dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([SerializeTest, DeserializeTest]));

perfProgram.run();
