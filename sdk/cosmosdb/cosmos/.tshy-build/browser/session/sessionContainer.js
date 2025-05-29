// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import atob from "../utils/atob.js";
import { Constants, getContainerLink, OperationType, trimSlashes } from "../common/index.js";
import { VectorSessionToken } from "./VectorSessionToken.js";
/** @hidden */
export class SessionContainer {
    constructor(collectionNameToCollectionResourceId = new Map(), collectionResourceIdToSessionTokens = new Map()) {
        this.collectionNameToCollectionResourceId = collectionNameToCollectionResourceId;
        this.collectionResourceIdToSessionTokens = collectionResourceIdToSessionTokens;
    }
    get(request) {
        if (!request) {
            throw new Error("request cannot be null");
        }
        const collectionName = getContainerLink(trimSlashes(request.resourceAddress));
        const rangeIdToTokenMap = this.getPartitionKeyRangeIdToTokenMap(collectionName);
        return SessionContainer.getCombinedSessionTokenString(rangeIdToTokenMap);
    }
    remove(request) {
        let collectionResourceId;
        const resourceAddress = trimSlashes(request.resourceAddress);
        const collectionName = getContainerLink(resourceAddress);
        if (collectionName) {
            collectionResourceId = this.collectionNameToCollectionResourceId.get(collectionName);
            this.collectionNameToCollectionResourceId.delete(collectionName);
        }
        if (collectionResourceId !== undefined) {
            this.collectionResourceIdToSessionTokens.delete(collectionResourceId);
        }
    }
    set(request, resHeaders) {
        // TODO: we check the master logic a few different places. Might not need it.
        if (!resHeaders ||
            SessionContainer.isReadingFromMaster(request.resourceType, request.operationType)) {
            return;
        }
        const sessionTokenString = resHeaders[Constants.HttpHeaders.SessionToken];
        if (!sessionTokenString) {
            return;
        }
        const containerName = this.getContainerName(request, resHeaders);
        const ownerId = !request.isNameBased
            ? request.resourceId
            : resHeaders[Constants.HttpHeaders.OwnerId] || request.resourceId;
        if (!ownerId) {
            return;
        }
        if (containerName && this.validateOwnerID(ownerId)) {
            if (!this.collectionResourceIdToSessionTokens.has(ownerId)) {
                this.collectionResourceIdToSessionTokens.set(ownerId, new Map());
            }
            if (!this.collectionNameToCollectionResourceId.has(containerName)) {
                this.collectionNameToCollectionResourceId.set(containerName, ownerId);
            }
            const containerSessionContainer = this.collectionResourceIdToSessionTokens.get(ownerId);
            SessionContainer.compareAndSetToken(sessionTokenString, containerSessionContainer);
        }
    }
    validateOwnerID(ownerId) {
        // If ownerId contains exactly 8 bytes it represents a unique database+collection identifier. Otherwise it represents another resource
        // The first 4 bytes are the database. The last 4 bytes are the collection.
        // Cosmos rids potentially contain "-" which is an invalid character in the browser atob implementation
        // See https://en.wikipedia.org/wiki/Base64#Filenames
        return atob(ownerId.replace(/-/g, "/")).length === 8;
    }
    getPartitionKeyRangeIdToTokenMap(collectionName) {
        let rangeIdToTokenMap = null;
        if (collectionName && this.collectionNameToCollectionResourceId.has(collectionName)) {
            rangeIdToTokenMap = this.collectionResourceIdToSessionTokens.get(this.collectionNameToCollectionResourceId.get(collectionName));
        }
        return rangeIdToTokenMap;
    }
    static getCombinedSessionTokenString(tokens) {
        if (!tokens || tokens.size === 0) {
            return SessionContainer.EMPTY_SESSION_TOKEN;
        }
        let result = "";
        for (const [range, token] of tokens.entries()) {
            result +=
                range +
                    SessionContainer.SESSION_TOKEN_PARTITION_SPLITTER +
                    token.toString() +
                    SessionContainer.SESSION_TOKEN_SEPARATOR;
        }
        return result.slice(0, -1);
    }
    static compareAndSetToken(newTokenString, containerSessionTokens) {
        if (!newTokenString) {
            return;
        }
        const partitionsParts = newTokenString.split(SessionContainer.SESSION_TOKEN_SEPARATOR);
        for (const partitionPart of partitionsParts) {
            const newTokenParts = partitionPart.split(SessionContainer.SESSION_TOKEN_PARTITION_SPLITTER);
            if (newTokenParts.length !== 2) {
                return;
            }
            const range = newTokenParts[0];
            const newToken = VectorSessionToken.create(newTokenParts[1]);
            const tokenForRange = !containerSessionTokens.get(range)
                ? newToken
                : containerSessionTokens.get(range).merge(newToken);
            containerSessionTokens.set(range, tokenForRange);
        }
    }
    // TODO: have a assert if the type doesn't mastch known types
    static isReadingFromMaster(resourceType, operationType) {
        if (resourceType === Constants.Path.OffersPathSegment ||
            resourceType === Constants.Path.DatabasesPathSegment ||
            resourceType === Constants.Path.UsersPathSegment ||
            resourceType === Constants.Path.PermissionsPathSegment ||
            resourceType === Constants.Path.TopologyPathSegment ||
            resourceType === Constants.Path.DatabaseAccountPathSegment ||
            resourceType === Constants.Path.PartitionKeyRangesPathSegment ||
            (resourceType === Constants.Path.CollectionsPathSegment &&
                operationType === OperationType.Query)) {
            return true;
        }
        return false;
    }
    getContainerName(request, headers) {
        let ownerFullName = headers[Constants.HttpHeaders.OwnerFullName];
        if (!ownerFullName) {
            ownerFullName = trimSlashes(request.resourceAddress);
        }
        return getContainerLink(ownerFullName);
    }
}
SessionContainer.EMPTY_SESSION_TOKEN = "";
SessionContainer.SESSION_TOKEN_SEPARATOR = ",";
SessionContainer.SESSION_TOKEN_PARTITION_SPLITTER = ":";
//# sourceMappingURL=sessionContainer.js.map