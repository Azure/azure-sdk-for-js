// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetSecretTest } from "./getSecret.spec.js";
import { ListSecretsTest } from "./listSecrets.spec.js";

const perfProgram = createPerfProgram(GetSecretTest, ListSecretsTest);

perfProgram.run();
