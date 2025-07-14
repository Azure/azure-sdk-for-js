// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetKeyTest } from "./keys/get.spec.js";
import { DecryptTest } from "./cryptography/decrypt.spec.js";
import { SignTest } from "./cryptography/sign.spec.js";
import { UnwrapKeyTest } from "./cryptography/unwrapKey.spec.js";

const perfProgram = createPerfProgram(GetKeyTest, DecryptTest, SignTest, UnwrapKeyTest);

perfProgram.run();
