"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var logger_1 = require("@azure/logger");
exports.logger = (0, logger_1.createClientLogger)("communication-messages");
