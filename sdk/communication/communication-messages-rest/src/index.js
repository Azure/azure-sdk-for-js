"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var azureCommunicationMessagesServiceClient_1 = require("./azureCommunicationMessagesServiceClient");
__exportStar(require("./azureCommunicationMessagesServiceClient"), exports);
__exportStar(require("./parameters"), exports);
__exportStar(require("./responses"), exports);
__exportStar(require("./clientDefinitions"), exports);
__exportStar(require("./isUnexpected"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./outputModels"), exports);
__exportStar(require("./paginateHelper"), exports);
exports.default = azureCommunicationMessagesServiceClient_1.default;
