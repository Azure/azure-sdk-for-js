"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const test_perf_1 = require("@azure-tools/test-perf");
const getSecret_spec_js_1 = require("./getSecret.spec.js");
const listSecrets_spec_js_1 = require("./listSecrets.spec.js");
const perfProgram = (0, test_perf_1.createPerfProgram)(getSecret_spec_js_1.GetSecretTest, listSecrets_spec_js_1.ListSecretsTest);
perfProgram.run();
//# sourceMappingURL=index.js.map