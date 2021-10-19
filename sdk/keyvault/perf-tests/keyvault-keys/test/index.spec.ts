import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { GetKeyTest } from "./keys/get.spec";
import { DecryptTest } from "./cryptography/decrypt.spec";
import { SignTest } from "./cryptography/sign.spec";
import { UnwrapKeyTest } from "./cryptography/unwrapKey.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([GetKeyTest, DecryptTest, SignTest, UnwrapKeyTest])
);

perfProgram.run();
