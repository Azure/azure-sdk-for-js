// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetCertificateTest } from "./getCertificate.spec.js";

const perfProgram = createPerfProgram(GetCertificateTest);

perfProgram.run();
