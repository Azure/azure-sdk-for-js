// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { AutoCompleteTest } from "./autoCompleteTest.spec";
import { IndexDocumentsTest } from "./indexDocumentsTest.spec";
import { SearchDocumentsTest } from "./searchDocumentsTest.spec";
import { SuggestTest } from "./suggestTest.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(
  AutoCompleteTest,
  IndexDocumentsTest,
  SearchDocumentsTest,
  SuggestTest,
);

perfProgram.run();
