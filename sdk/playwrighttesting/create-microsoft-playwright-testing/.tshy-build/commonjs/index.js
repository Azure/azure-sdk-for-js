#!/usr/bin/env node
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const init_js_1 = require("./bin/init.js");
(async () => {
    await (0, init_js_1.init)();
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map