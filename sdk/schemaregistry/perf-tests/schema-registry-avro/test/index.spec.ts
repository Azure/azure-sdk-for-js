// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SerializeTest } from "./serialize.spec.js";
import { DeserializeTest } from "./deserialize.spec.js";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(SerializeTest, DeserializeTest);

perfProgram.run();
