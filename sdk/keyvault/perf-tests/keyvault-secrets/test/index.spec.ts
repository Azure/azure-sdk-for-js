import { createPerfProgram } from "@azure-tools/test-perf";
import { GetSecretTest } from "./getSecret.spec.js";
import { ListSecretsTest } from "./listSecrets.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(GetSecretTest, ListSecretsTest);

perfProgram.run();
