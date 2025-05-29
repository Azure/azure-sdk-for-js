"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSideMetrics = void 0;
class ClientSideMetrics {
    constructor(requestCharge) {
        this.requestCharge = requestCharge;
    }
    /**
     * Adds one or more ClientSideMetrics to a copy of this instance and returns the result.
     */
    add(...clientSideMetricsArray) {
        let requestCharge = this.requestCharge;
        for (const clientSideMetrics of clientSideMetricsArray) {
            if (clientSideMetrics == null) {
                throw new Error("clientSideMetrics has null or undefined item(s)");
            }
            requestCharge += clientSideMetrics.requestCharge;
        }
        return new ClientSideMetrics(requestCharge);
    }
    static createFromArray(...clientSideMetricsArray) {
        if (clientSideMetricsArray == null) {
            throw new Error("clientSideMetricsArray is null or undefined item(s)");
        }
        return this.zero.add(...clientSideMetricsArray);
    }
}
exports.ClientSideMetrics = ClientSideMetrics;
ClientSideMetrics.zero = new ClientSideMetrics(0);
//# sourceMappingURL=clientSideMetrics.js.map