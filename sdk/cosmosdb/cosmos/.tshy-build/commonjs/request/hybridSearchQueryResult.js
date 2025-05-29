"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridSearchQueryResult = void 0;
const FieldNames = {
    Rid: "_rid",
    Payload: "payload",
    ComponentScores: "componentScores",
};
class HybridSearchQueryResult {
    constructor(rid, componentScores, data) {
        this.rid = rid;
        this.componentScores = componentScores;
        this.data = data;
    }
    static create(document) {
        const rid = document[FieldNames.Rid];
        if (!rid) {
            throw new Error(`${FieldNames.Rid} must exist.`);
        }
        const outerPayload = document[FieldNames.Payload];
        let componentScores;
        let data;
        if (!outerPayload || typeof outerPayload !== "object") {
            throw new Error(`${FieldNames.Payload} must exist.`);
        }
        const innerPayload = outerPayload[FieldNames.Payload];
        if (innerPayload && typeof innerPayload === "object") {
            // older format without query plan optimization
            componentScores = outerPayload[FieldNames.ComponentScores];
            data = innerPayload;
        }
        else {
            // newer format with the optimization
            componentScores = document[FieldNames.ComponentScores];
            data = outerPayload;
        }
        if (!Array.isArray(componentScores)) {
            throw new Error(`${FieldNames.ComponentScores} must exist.`);
        }
        return new HybridSearchQueryResult(rid, componentScores, data);
    }
}
exports.HybridSearchQueryResult = HybridSearchQueryResult;
//# sourceMappingURL=hybridSearchQueryResult.js.map