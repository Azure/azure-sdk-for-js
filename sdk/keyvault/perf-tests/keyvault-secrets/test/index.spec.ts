import { createPerfProgram } from "@azure/test-utils-perf";
import { GetSecretTest } from "./getSecret.spec";
import { ListSecretsTest } from "./listSecrets.spec";

const perfProgram = createPerfProgram(GetSecretTest, ListSecretsTest);

perfProgram.run();
