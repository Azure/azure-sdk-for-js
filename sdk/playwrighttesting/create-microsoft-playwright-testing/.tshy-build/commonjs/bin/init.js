"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const initialize_js_1 = require("../initialize.js");
const utils_js_1 = require("../utils.js");
const init = async () => {
    const options = (0, utils_js_1.parseCLIArguments)();
    const { config: playwrightConfigFile } = options;
    let playwrightServiceInitConfig;
    if (playwrightConfigFile) {
        playwrightServiceInitConfig = Object.assign({}, (0, utils_js_1.getLanguageAndConfigInfoFromConfigurationFile)(playwrightConfigFile));
    }
    else {
        playwrightServiceInitConfig = Object.assign({}, (0, utils_js_1.getLanguageAndConfigInfoFromDirectory)());
    }
    console.log("");
    const playwrightServiceInitialize = new initialize_js_1.PlaywrightServiceInitialize(playwrightServiceInitConfig);
    await playwrightServiceInitialize.addServiceSupportToTestSuite();
};
exports.init = init;
//# sourceMappingURL=init.js.map