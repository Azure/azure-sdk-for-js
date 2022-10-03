import { createPerfProgram } from "@azure/test-utils-perf";
import { GetKeyTest } from "./keys/get.spec";
import { DecryptTest } from "./cryptography/decrypt.spec";
import { SignTest } from "./cryptography/sign.spec";
import { UnwrapKeyTest } from "./cryptography/unwrapKey.spec";

const perfProgram = createPerfProgram(GetKeyTest, DecryptTest, SignTest, UnwrapKeyTest);

perfProgram.run();
