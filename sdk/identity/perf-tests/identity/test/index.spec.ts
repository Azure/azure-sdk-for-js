import { ClientSecretCredentialPersistenceTest } from "./ClientSecretCredential/persistence.spec";
import { createPerfProgram } from "@azure-tools/test-perf";
import * as dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(ClientSecretCredentialPersistenceTest);

perfProgram.run();
