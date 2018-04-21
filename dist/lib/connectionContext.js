"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const debugModule = require("debug");
const uuid = require("uuid/v4");
const Constants = require("./util/constants");
const _1 = require(".");
const managementClient_1 = require("./managementClient");
const cbs_1 = require("./cbs");
const sas_1 = require("./auth/sas");
const debug = debugModule("azure:event-hubs:connectionContext");
var ConnectionContext;
(function (ConnectionContext) {
    /**
     * @property {string} userAgent The user agent string for the event hub client. Constant value: "/js-event-hubs".
     */
    ConnectionContext.userAgent = "/js-event-hubs";
    function create(config, tokenProvider) {
        _1.ConnectionConfig.validate(config);
        const context = {
            connectionLock: `${Constants.establishConnection}-${uuid()}`,
            negotiateClaimLock: `${Constants.negotiateClaim}-${uuid()}`,
            config: config,
            tokenProvider: tokenProvider || new sas_1.SasTokenProvider(config.endpoint, config.sharedAccessKeyName, config.sharedAccessKey),
            cbsSession: new cbs_1.CbsClient(),
            managementSession: new managementClient_1.ManagementClient(config.entityPath),
            senders: {},
            receivers: {}
        };
        debug("Created connection context: %O", context);
        return context;
    }
    ConnectionContext.create = create;
})(ConnectionContext = exports.ConnectionContext || (exports.ConnectionContext = {}));
//# sourceMappingURL=connectionContext.js.map