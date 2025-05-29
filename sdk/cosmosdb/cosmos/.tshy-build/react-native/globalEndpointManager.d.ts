import { OperationType, ResourceType } from "./common/index.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
/**
 * @hidden
 * This internal class implements the logic for endpoint management for geo-replicated database accounts.
 */
export declare class GlobalEndpointManager {
    private readDatabaseAccount;
    /**
     * The endpoint used to create the client instance.
     */
    private defaultEndpoint;
    /**
     * Flag to enable/disable automatic redirecting of requests based on read/write operations.
     */
    enableEndpointDiscovery: boolean;
    private isRefreshing;
    private options;
    /**
     * List of azure regions to be used as preferred locations for read requests.
     */
    private preferredLocations;
    private writeableLocations;
    private readableLocations;
    private unavailableReadableLocations;
    private unavailableWriteableLocations;
    preferredLocationsCount: number;
    /**
     * Gets the current read endpoint from the endpoint cache.
     */
    getReadEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string>;
    /**
     * Gets the current write endpoint from the endpoint cache.
     */
    getWriteEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string>;
    getReadEndpoints(): Promise<ReadonlyArray<string>>;
    getWriteEndpoints(): Promise<ReadonlyArray<string>>;
    markCurrentLocationUnavailableForRead(diagnosticNode: DiagnosticNodeInternal, endpoint: string): Promise<void>;
    markCurrentLocationUnavailableForWrite(diagnosticNode: DiagnosticNodeInternal, endpoint: string): Promise<void>;
    canUseMultipleWriteLocations(resourceType?: ResourceType, operationType?: OperationType): boolean;
    resolveServiceEndpoint(diagnosticNode: DiagnosticNodeInternal, resourceType: ResourceType, operationType: OperationType, startServiceEndpointIndex?: number): Promise<string>;
    /**
     * Refreshes the endpoint list by clearning stale unavailability and then
     *  retrieving the writable and readable locations from the geo-replicated database account
     *  and then updating the locations cache.
     *  We skip the refreshing if enableEndpointDiscovery is set to False
     */
    refreshEndpointList(diagnosticNode: DiagnosticNodeInternal): Promise<void>;
    private refreshEndpoints;
    private refreshStaleUnavailableLocations;
    /**
     * update the locationUnavailability to undefined if the location is available again
     * @param now - current time
     * @param unavailableLocations - list of unavailable locations
     * @param allLocations - list of all locations
     */
    private updateLocation;
    private cleanUnavailableLocationList;
    /**
     * Gets the database account first by using the default endpoint, and if that doesn't returns
     * use the endpoints for the preferred locations in the order they are specified to get
     * the database account.
     */
    private getDatabaseAccountFromAnyEndpoint;
    /**
     * Gets the locational endpoint using the location name passed to it using the default endpoint.
     *
     * @param defaultEndpoint - The default endpoint to use for the endpoint.
     * @param locationName    - The location name for the azure region like "East US".
     */
    private static getLocationalEndpoint;
}
//# sourceMappingURL=globalEndpointManager.d.ts.map