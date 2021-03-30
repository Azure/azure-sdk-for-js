import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { GetKeyTest } from "./keys/get.spec";
import { DecryptTest } from "./cryptography/decrypt.spec";
import { SignTest } from "./cryptography/sign.spec";
import { UnwrapKeyTest } from "./cryptography/unwrapKey.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([GetKeyTest, DecryptTest, SignTest, UnwrapKeyTest])
);

perfStressProgram.run();
