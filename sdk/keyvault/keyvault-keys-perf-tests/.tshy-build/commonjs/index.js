"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const test_perf_1 = require("@azure-tools/test-perf");
const get_spec_js_1 = require("./keys/get.spec.js");
const decrypt_spec_js_1 = require("./cryptography/decrypt.spec.js");
const sign_spec_js_1 = require("./cryptography/sign.spec.js");
const unwrapKey_spec_js_1 = require("./cryptography/unwrapKey.spec.js");
const perfProgram = (0, test_perf_1.createPerfProgram)(get_spec_js_1.GetKeyTest, decrypt_spec_js_1.DecryptTest, sign_spec_js_1.SignTest, unwrapKey_spec_js_1.UnwrapKeyTest);
perfProgram.run();
//# sourceMappingURL=index.js.map