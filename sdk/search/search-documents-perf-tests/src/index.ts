// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { AutoCompleteTest } from "./autoCompleteTest.spec.js";
import { IndexDocumentsTest } from "./indexDocumentsTest.spec.js";
import { SearchDocumentsTest } from "./searchDocumentsTest.spec.js";
import { SuggestTest } from "./suggestTest.spec.js";
import "dotenv/config";

const perfProgram = createPerfProgram(
  AutoCompleteTest,
  IndexDocumentsTest,
  SearchDocumentsTest,
  SuggestTest,
);

perfProgram.run();
