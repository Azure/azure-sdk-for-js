// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { AutoCompleteTest } from "./autoCompleteTest.spec"
import { IndexDocumentsTest } from "./indexDocumentsTest.spec";
import { SearchDocumentsTest } from "./searchDocumentsTest.spec";
import { SuggestTest } from "./suggestTest.spec";

import dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([AutoCompleteTest, IndexDocumentsTest, SearchDocumentsTest, SuggestTest]));

perfStressProgram.run();
