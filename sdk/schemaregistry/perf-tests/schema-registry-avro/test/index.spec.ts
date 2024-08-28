// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SerializeTest } from "./serialize.spec";
import { DeserializeTest } from "./deserialize.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(SerializeTest, DeserializeTest);

perfProgram.run();
