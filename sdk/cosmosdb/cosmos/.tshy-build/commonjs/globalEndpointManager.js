"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEndpointManager = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("./common/index.js");
const constants_js_1 = require("./common/constants.js");
const CosmosDiagnostics_js_1 = require("./CosmosDiagnostics.js");
const diagnostics_js_1 = require("./utils/diagnostics.js");
/**
 * @hidden
 * This internal class implements the logic for endpoint management for geo-replicated database accounts.
 */
class GlobalEndpointManager {
    /**
     * @param options - The document client instance.
     * @internal
     */
    constructor(options, readDatabaseAccount) {
        this.readDatabaseAccount = readDatabaseAccount;
        this.writeableLocations = [];
        this.readableLocations = [];
        this.unavailableReadableLocations = [];
        this.unavailableWriteableLocations = [];
        this.options = options;
        this.defaultEndpoint = options.endpoint;
        this.enableEndpointDiscovery = options.connectionPolicy.enableEndpointDiscovery;
        this.isRefreshing = false;
        this.preferredLocations = this.options.connectionPolicy.preferredLocations;
        this.preferredLocationsCount = this.preferredLocations ? this.preferredLocations.length : 0;
    }
    /**
     * Gets the current read endpoint from the endpoint cache.
     */
    async getReadEndpoint(diagnosticNode) {
        return this.resolveServiceEndpoint(diagnosticNode, index_js_1.ResourceType.item, index_js_1.OperationType.Read);
    }
    /**
     * Gets the current write endpoint from the endpoint cache.
     */
    async getWriteEndpoint(diagnosticNode) {
        return this.resolveServiceEndpoint(diagnosticNode, index_js_1.ResourceType.item, index_js_1.OperationType.Replace);
    }
    async getReadEndpoints() {
        return this.readableLocations.map((loc) => loc.databaseAccountEndpoint);
    }
    async getWriteEndpoints() {
        return this.writeableLocations.map((loc) => loc.databaseAccountEndpoint);
    }
    async markCurrentLocationUnavailableForRead(diagnosticNode, endpoint) {
        await this.refreshEndpointList(diagnosticNode);
        const location = this.readableLocations.find((loc) => loc.databaseAccountEndpoint === endpoint);
        if (location) {
            location.unavailable = true;
            location.lastUnavailabilityTimestampInMs = Date.now();
            this.unavailableReadableLocations.push(location);
        }
    }
    async markCurrentLocationUnavailableForWrite(diagnosticNode, endpoint) {
        await this.refreshEndpointList(diagnosticNode);
        const location = this.writeableLocations.find((loc) => loc.databaseAccountEndpoint === endpoint);
        if (location) {
            location.unavailable = true;
            location.lastUnavailabilityTimestampInMs = Date.now();
            this.unavailableWriteableLocations.push(location);
        }
    }
    canUseMultipleWriteLocations(resourceType, operationType) {
        let canUse = this.options.connectionPolicy.useMultipleWriteLocations;
        if (resourceType) {
            canUse =
                canUse &&
                    (resourceType === index_js_1.ResourceType.item ||
                        (resourceType === index_js_1.ResourceType.sproc && operationType === index_js_1.OperationType.Execute));
        }
        return canUse;
    }
    async resolveServiceEndpoint(diagnosticNode, resourceType, operationType, startServiceEndpointIndex = 0) {
        // If endpoint discovery is disabled, always use the user provided endpoint
        if (!this.options.connectionPolicy.enableEndpointDiscovery) {
            diagnosticNode.addData({ readFromCache: true }, "default_endpoint");
            diagnosticNode.recordEndpointResolution(this.defaultEndpoint);
            return this.defaultEndpoint;
        }
        // If getting the database account, always use the user provided endpoint
        if (resourceType === index_js_1.ResourceType.none) {
            diagnosticNode.addData({ readFromCache: true }, "none_resource");
            diagnosticNode.recordEndpointResolution(this.defaultEndpoint);
            return this.defaultEndpoint;
        }
        if (this.readableLocations.length === 0 || this.writeableLocations.length === 0) {
            const resourceResponse = await (0, diagnostics_js_1.withMetadataDiagnostics)(async (metadataNode) => {
                return this.readDatabaseAccount(metadataNode, {
                    urlConnection: this.defaultEndpoint,
                });
            }, diagnosticNode, CosmosDiagnostics_js_1.MetadataLookUpType.DatabaseAccountLookUp);
            this.writeableLocations = resourceResponse.resource.writableLocations;
            this.readableLocations = resourceResponse.resource.readableLocations;
        }
        const locations = (0, index_js_1.isReadRequest)(operationType)
            ? this.readableLocations
            : this.writeableLocations;
        let location;
        // If we have preferred locations, try each one in order and use the first available one
        if (this.preferredLocations &&
            this.preferredLocations.length > 0 &&
            startServiceEndpointIndex < this.preferredLocations.length) {
            for (let i = startServiceEndpointIndex; i < this.preferredLocations.length; i++) {
                const preferredLocation = this.preferredLocations[i];
                location = locations.find((loc) => loc.unavailable !== true &&
                    normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation));
                if (location) {
                    break;
                }
            }
        }
        // If no preferred locations or one did not match, just grab the first one that is available
        if (!location) {
            const startIndexValid = startServiceEndpointIndex >= 0 && startServiceEndpointIndex < locations.length;
            const locationsToSearch = startIndexValid
                ? locations.slice(startServiceEndpointIndex)
                : locations;
            location = locationsToSearch.find((loc) => {
                return loc.unavailable !== true;
            });
        }
        location = location ? location : { name: "", databaseAccountEndpoint: this.defaultEndpoint };
        diagnosticNode.recordEndpointResolution(location.databaseAccountEndpoint);
        return location.databaseAccountEndpoint;
    }
    /**
     * Refreshes the endpoint list by clearning stale unavailability and then
     *  retrieving the writable and readable locations from the geo-replicated database account
     *  and then updating the locations cache.
     *  We skip the refreshing if enableEndpointDiscovery is set to False
     */
    async refreshEndpointList(diagnosticNode) {
        if (!this.isRefreshing && this.enableEndpointDiscovery) {
            this.isRefreshing = true;
            const databaseAccount = await this.getDatabaseAccountFromAnyEndpoint(diagnosticNode);
            if (databaseAccount) {
                this.refreshStaleUnavailableLocations();
                this.refreshEndpoints(databaseAccount);
            }
            this.isRefreshing = false;
        }
    }
    refreshEndpoints(databaseAccount) {
        for (const location of databaseAccount.writableLocations) {
            const existingLocation = this.writeableLocations.find((loc) => loc.name === location.name);
            if (!existingLocation) {
                this.writeableLocations.push(location);
            }
        }
        for (const location of databaseAccount.readableLocations) {
            const existingLocation = this.readableLocations.find((loc) => loc.name === location.name);
            if (!existingLocation) {
                this.readableLocations.push(location);
            }
        }
    }
    refreshStaleUnavailableLocations() {
        const now = Date.now();
        this.updateLocation(now, this.unavailableReadableLocations, this.readableLocations);
        this.unavailableReadableLocations = this.cleanUnavailableLocationList(now, this.unavailableReadableLocations);
        this.updateLocation(now, this.unavailableWriteableLocations, this.writeableLocations);
        this.unavailableWriteableLocations = this.cleanUnavailableLocationList(now, this.unavailableWriteableLocations);
    }
    /**
     * update the locationUnavailability to undefined if the location is available again
     * @param now - current time
     * @param unavailableLocations - list of unavailable locations
     * @param allLocations - list of all locations
     */
    updateLocation(now, unavailableLocations, allLocations) {
        for (const location of unavailableLocations) {
            const unavaialableLocation = allLocations.find((loc) => loc.name === location.name);
            if (unavaialableLocation &&
                now - unavaialableLocation.lastUnavailabilityTimestampInMs >
                    constants_js_1.Constants.LocationUnavailableExpirationTimeInMs) {
                unavaialableLocation.unavailable = false;
            }
        }
    }
    cleanUnavailableLocationList(now, unavailableLocations) {
        return unavailableLocations.filter((loc) => {
            if (loc &&
                now - loc.lastUnavailabilityTimestampInMs >= constants_js_1.Constants.LocationUnavailableExpirationTimeInMs) {
                return false;
            }
            return true;
        });
    }
    /**
     * Gets the database account first by using the default endpoint, and if that doesn't returns
     * use the endpoints for the preferred locations in the order they are specified to get
     * the database account.
     */
    async getDatabaseAccountFromAnyEndpoint(diagnosticNode) {
        try {
            const options = { urlConnection: this.defaultEndpoint };
            const { resource: databaseAccount } = await this.readDatabaseAccount(diagnosticNode, options);
            return databaseAccount;
            // If for any reason(non - globaldb related), we are not able to get the database
            // account from the above call to readDatabaseAccount,
            // we would try to get this information from any of the preferred locations that the user
            // might have specified (by creating a locational endpoint)
            // and keeping eating the exception until we get the database account and return None at the end,
            // if we are not able to get that info from any endpoints
        }
        catch (err) {
            // TODO: Tracing
        }
        if (this.preferredLocations) {
            for (const location of this.preferredLocations) {
                try {
                    const locationalEndpoint = GlobalEndpointManager.getLocationalEndpoint(this.defaultEndpoint, location);
                    const options = { urlConnection: locationalEndpoint };
                    const { resource: databaseAccount } = await this.readDatabaseAccount(diagnosticNode, options);
                    if (databaseAccount) {
                        return databaseAccount;
                    }
                }
                catch (err) {
                    // TODO: Tracing
                }
            }
        }
    }
    /**
     * Gets the locational endpoint using the location name passed to it using the default endpoint.
     *
     * @param defaultEndpoint - The default endpoint to use for the endpoint.
     * @param locationName    - The location name for the azure region like "East US".
     */
    static getLocationalEndpoint(defaultEndpoint, locationName) {
        // For defaultEndpoint like 'https://contoso.documents.azure.com:443/' parse it to generate URL format
        // This defaultEndpoint should be global endpoint(and cannot be a locational endpoint)
        // and we agreed to document that
        const endpointUrl = new URL(defaultEndpoint);
        // hostname attribute in endpointUrl will return 'contoso.documents.azure.com'
        if (endpointUrl.hostname) {
            const hostnameParts = endpointUrl.hostname.toString().toLowerCase().split(".");
            if (hostnameParts) {
                // globalDatabaseAccountName will return 'contoso'
                const globalDatabaseAccountName = hostnameParts[0];
                // Prepare the locationalDatabaseAccountName as contoso-EastUS for location_name 'East US'
                const locationalDatabaseAccountName = globalDatabaseAccountName + "-" + locationName.replace(" ", "");
                // Replace 'contoso' with 'contoso-EastUS' and
                // return locationalEndpoint as https://contoso-EastUS.documents.azure.com:443/
                const locationalEndpoint = defaultEndpoint
                    .toLowerCase()
                    .replace(globalDatabaseAccountName, locationalDatabaseAccountName);
                return locationalEndpoint;
            }
        }
        return null;
    }
}
exports.GlobalEndpointManager = GlobalEndpointManager;
function normalizeEndpoint(endpoint) {
    return endpoint.split(" ").join("").toLowerCase();
}
//# sourceMappingURL=globalEndpointManager.js.map