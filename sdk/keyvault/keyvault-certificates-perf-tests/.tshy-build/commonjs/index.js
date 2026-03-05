"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const test_perf_1 = require("@azure-tools/test-perf");
const getCertificate_spec_js_1 = require("./getCertificate.spec.js");
const perfProgram = (0, test_perf_1.createPerfProgram)(getCertificate_spec_js_1.GetCertificateTest);
perfProgram.run();
//# sourceMappingURL=index.js.map