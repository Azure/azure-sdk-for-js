import { createPerfProgram } from "@azure-tools/test-perf";
import { GetSecretTest } from "./getSecret.spec";
import { ListSecretsTest } from "./listSecrets.spec";

const perfProgram = createPerfProgram(GetSecretTest, ListSecretsTest);

perfProgram.run();
