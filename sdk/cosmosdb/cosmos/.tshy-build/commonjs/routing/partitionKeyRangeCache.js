"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionKeyRangeCache = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const CosmosDiagnostics_js_1 = require("../CosmosDiagnostics.js");
const helper_js_1 = require("../common/helper.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
const CollectionRoutingMapFactory_js_1 = require("./CollectionRoutingMapFactory.js");
/** @hidden */
class PartitionKeyRangeCache {
    constructor(clientContext) {
        this.clientContext = clientContext;
        this.collectionRoutingMapByCollectionId = {};
    }
    /**
     * Finds or Instantiates the requested Collection Routing Map
     * @param collectionLink - Requested collectionLink
     * @hidden
     */
    async onCollectionRoutingMap(collectionLink, diagnosticNode, forceRefresh = false) {
        const collectionId = (0, helper_js_1.getIdFromLink)(collectionLink);
        if (this.collectionRoutingMapByCollectionId[collectionId] === undefined || forceRefresh) {
            this.collectionRoutingMapByCollectionId[collectionId] = this.requestCollectionRoutingMap(collectionLink, diagnosticNode);
        }
        return this.collectionRoutingMapByCollectionId[collectionId];
    }
    /**
     * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
     * @hidden
     */
    async getOverlappingRanges(collectionLink, queryRange, diagnosticNode, forceRefresh = false) {
        const crm = await this.onCollectionRoutingMap(collectionLink, diagnosticNode, forceRefresh);
        return crm.getOverlappingRanges(queryRange);
    }
    async requestCollectionRoutingMap(collectionLink, diagnosticNode) {
        const { resources } = await (0, diagnostics_js_1.withMetadataDiagnostics)(async (metadataDiagnostics) => {
            return this.clientContext
                .queryPartitionKeyRanges(collectionLink)
                .fetchAllInternal(metadataDiagnostics);
        }, diagnosticNode, CosmosDiagnostics_js_1.MetadataLookUpType.PartitionKeyRangeLookUp);
        return (0, CollectionRoutingMapFactory_js_1.createCompleteRoutingMap)(resources.map((r) => [r, true]));
    }
}
exports.PartitionKeyRangeCache = PartitionKeyRangeCache;
//# sourceMappingURL=partitionKeyRangeCache.js.map