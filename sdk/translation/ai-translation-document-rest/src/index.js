"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileFromStream = exports.createFile = void 0;
const tslib_1 = require("tslib");
const documentTranslationClient_js_1 = tslib_1.__importDefault(require("./documentTranslationClient.js"));
tslib_1.__exportStar(require("./documentTranslationClient.js"), exports);
tslib_1.__exportStar(require("./parameters.js"), exports);
tslib_1.__exportStar(require("./responses.js"), exports);
tslib_1.__exportStar(require("./clientDefinitions.js"), exports);
tslib_1.__exportStar(require("./isUnexpected.js"), exports);
tslib_1.__exportStar(require("./models.js"), exports);
tslib_1.__exportStar(require("./outputModels.js"), exports);
tslib_1.__exportStar(require("./paginateHelper.js"), exports);
tslib_1.__exportStar(require("./pollingHelper.js"), exports);
var core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
Object.defineProperty(exports, "createFile", { enumerable: true, get: function () { return core_rest_pipeline_1.createFile; } });
Object.defineProperty(exports, "createFileFromStream", { enumerable: true, get: function () { return core_rest_pipeline_1.createFileFromStream; } });
exports.default = documentTranslationClient_js_1.default;
//# sourceMappingURL=index.js.map