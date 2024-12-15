// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientSecretCredentialPersistenceTest } from "./ClientSecretCredential/persistence.spec.js";
import { createPerfProgram } from "@azure-tools/test-perf";
import "dotenv/config";

const perfProgram = createPerfProgram(ClientSecretCredentialPersistenceTest);

perfProgram.run();
