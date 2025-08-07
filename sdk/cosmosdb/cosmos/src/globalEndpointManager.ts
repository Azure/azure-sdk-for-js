// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OperationType, ResourceType, isReadRequest } from "./common/index.js";
import type { CosmosClientOptions } from "./CosmosClientOptions.js";
import type { Location, DatabaseAccount } from "./documents/index.js";
import type { RequestOptions } from "./index.js";
import { Constants } from "./common/constants.js";
import type { ResourceResponse } from "./request/index.js";
import { MetadataLookUpType } from "./CosmosDiagnostics.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
import { withMetadataDiagnostics } from "./utils/diagnostics.js";
import { normalizeEndpoint } from "./utils/checkURL.js";
import { canApplyExcludedLocations } from "./common/helper.js";

/**
 * @hidden
 * This internal class implements the logic for endpoint management for geo-replicated database accounts.
 */
export class GlobalEndpointManager {
  /**
   * The endpoint used to create the client instance.
   */
  private defaultEndpoint: string;
  /**
   * Flag to enable/disable automatic redirecting of requests based on read/write operations.
   */
  public enableEndpointDiscovery: boolean;
  private isRefreshing: boolean;
  private options: CosmosClientOptions;
  /**
   * List of azure regions to be used as preferred locations for read requests.
   */
  private preferredLocations: string[];
  private writeableLocations: Location[] = [];
  private readableLocations: Location[] = [];
  private unavailableReadableLocations: Location[] = [];
  private unavailableWriteableLocations: Location[] = [];
  private enableMultipleWriteLocations: boolean;
  private clientLevelExcludedLocations: Set<string>;

  public preferredLocationsCount: number;
  /**
   * @param options - The document client instance.
   * @internal
   */
  constructor(
    options: CosmosClientOptions,
    private readDatabaseAccount: (
      diagnosticNode: DiagnosticNodeInternal,
      opts: RequestOptions,
    ) => Promise<ResourceResponse<DatabaseAccount>>,
  ) {
    this.options = options;
    this.defaultEndpoint = options.endpoint;
    this.enableEndpointDiscovery = options.connectionPolicy.enableEndpointDiscovery;
    this.isRefreshing = false;
    this.preferredLocations = this.options.connectionPolicy.preferredLocations;
    this.preferredLocationsCount = this.preferredLocations ? this.preferredLocations.length : 0;
    this.clientLevelExcludedLocations = new Set(
      (options.connectionPolicy?.excludedLocations || []).map((loc) => normalizeEndpoint(loc)),
    );
  }

  /**
   * Gets the current read endpoint from the endpoint cache.
   */
  public async getReadEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.resolveServiceEndpoint(diagnosticNode, ResourceType.item, OperationType.Read);
  }

  /**
   * Gets the current write endpoint from the endpoint cache.
   */
  public async getWriteEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.resolveServiceEndpoint(diagnosticNode, ResourceType.item, OperationType.Replace);
  }

  public async getReadEndpoints(): Promise<ReadonlyArray<string>> {
    return this.readableLocations.map((loc) => loc.databaseAccountEndpoint);
  }

  public async getWriteEndpoints(): Promise<ReadonlyArray<string>> {
    return this.writeableLocations.map((loc) => loc.databaseAccountEndpoint);
  }

  /**
   * Gets the read locations from the endpoint cache.
   */
  public async getReadLocations(): Promise<ReadonlyArray<Location>> {
    return this.readableLocations;
  }

  public async markCurrentLocationUnavailableForRead(
    diagnosticNode: DiagnosticNodeInternal,
    endpoint: string,
  ): Promise<void> {
    await this.refreshEndpointList(diagnosticNode);
    const location = this.readableLocations.find((loc) => loc.databaseAccountEndpoint === endpoint);
    if (location) {
      location.unavailable = true;
      location.lastUnavailabilityTimestampInMs = Date.now();
      this.unavailableReadableLocations.push(location);
    }
  }

  public async markCurrentLocationUnavailableForWrite(
    diagnosticNode: DiagnosticNodeInternal,
    endpoint: string,
  ): Promise<void> {
    await this.refreshEndpointList(diagnosticNode);
    const location = this.writeableLocations.find(
      (loc) => loc.databaseAccountEndpoint === endpoint,
    );
    if (location) {
      location.unavailable = true;
      location.lastUnavailabilityTimestampInMs = Date.now();
      this.unavailableWriteableLocations.push(location);
    }
  }

  public canUseMultipleWriteLocations(
    resourceType?: ResourceType,
    operationType?: OperationType,
  ): boolean {
    let canUse =
      this.options.connectionPolicy.useMultipleWriteLocations && this.enableMultipleWriteLocations;

    if (resourceType) {
      canUse =
        canUse &&
        (resourceType === ResourceType.item ||
          (resourceType === ResourceType.sproc && operationType === OperationType.Execute));
    }

    return canUse;
  }

  private getEffectiveExcludedLocations(
    requestOptions: RequestOptions | undefined,
    resourceType: ResourceType,
  ): Set<string> {
    if (!canApplyExcludedLocations(resourceType)) {
      return new Set<string>();
    }

    if (
      !requestOptions ||
      !Object.prototype.hasOwnProperty.call(requestOptions, "excludedLocations") ||
      requestOptions.excludedLocations === undefined ||
      requestOptions.excludedLocations === null
    ) {
      return this.clientLevelExcludedLocations;
    }

    if (requestOptions.excludedLocations.length === 0) {
      return new Set<string>();
    }

    return new Set(requestOptions.excludedLocations.map((loc) => normalizeEndpoint(loc)));
  }

  private filterExcludedLocations(
    preferredLocations: string[],
    excludedLocations?: Set<string>,
  ): string[] {
    if (excludedLocations.size === 0) {
      return preferredLocations;
    }
    const filteredLocations = preferredLocations.filter(
      (location) => !excludedLocations.has(normalizeEndpoint(location)),
    );
    return filteredLocations.length > 0 ? filteredLocations : preferredLocations;
  }

  public async resolveServiceEndpoint(
    diagnosticNode: DiagnosticNodeInternal,
    resourceType: ResourceType,
    operationType: OperationType,
    startServiceEndpointIndex: number = 0, // Represents the starting index for selecting servers.
    requestOptions?: RequestOptions, // add to support request-level excluded region(location) overrides
  ): Promise<string> {
    // If endpoint discovery is disabled, always use the user provided endpoint

    if (!this.options.connectionPolicy.enableEndpointDiscovery) {
      diagnosticNode.addData({ readFromCache: true }, "default_endpoint");
      diagnosticNode.recordEndpointResolution(this.defaultEndpoint);
      return this.defaultEndpoint;
    }

    // If getting the database account, always use the user provided endpoint
    if (resourceType === ResourceType.none) {
      diagnosticNode.addData({ readFromCache: true }, "none_resource");
      diagnosticNode.recordEndpointResolution(this.defaultEndpoint);
      return this.defaultEndpoint;
    }
    if (this.readableLocations.length === 0 || this.writeableLocations.length === 0) {
      const resourceResponse = await withMetadataDiagnostics(
        async (metadataNode: DiagnosticNodeInternal) => {
          return this.readDatabaseAccount(metadataNode, {
            urlConnection: this.defaultEndpoint,
          });
        },
        diagnosticNode,
        MetadataLookUpType.DatabaseAccountLookUp,
      );

      this.writeableLocations = resourceResponse.resource.writableLocations;
      this.readableLocations = resourceResponse.resource.readableLocations;
      this.enableMultipleWriteLocations = resourceResponse.resource.enableMultipleWritableLocations;
    }

    const locations = isReadRequest(operationType)
      ? this.readableLocations
      : this.writeableLocations;

    // Get effective excluded locations (request-level overrides client-level)
    const excludedLocations = this.getEffectiveExcludedLocations(requestOptions, resourceType);

    // Filter locations based on exclusions
    const availableLocations = this.filterExcludedLocations(
      this.preferredLocations,
      excludedLocations,
    );

    let location;
    // If we have preferred locations, try each one in order and use the first available one
    if (
      availableLocations &&
      availableLocations.length > 0 &&
      startServiceEndpointIndex < availableLocations.length
    ) {
      this.preferredLocationsCount = availableLocations.length;

      for (let i = startServiceEndpointIndex; i < availableLocations.length; i++) {
        const preferredLocation = availableLocations[i];
        location = locations.find(
          (loc) =>
            loc.unavailable !== true &&
            normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation),
        );
        if (location) {
          break;
        }
      }
    }

    // If no preferred locations or one did not match, just grab the first one that is available
    if (!location) {
      const startIndexValid =
        startServiceEndpointIndex >= 0 && startServiceEndpointIndex < locations.length;
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
  public async refreshEndpointList(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
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

  private refreshEndpoints(databaseAccount: DatabaseAccount): void {
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

  private refreshStaleUnavailableLocations(): void {
    const now = Date.now();
    this.updateLocation(now, this.unavailableReadableLocations, this.readableLocations);
    this.unavailableReadableLocations = this.cleanUnavailableLocationList(
      now,
      this.unavailableReadableLocations,
    );

    this.updateLocation(now, this.unavailableWriteableLocations, this.writeableLocations);
    this.unavailableWriteableLocations = this.cleanUnavailableLocationList(
      now,
      this.unavailableWriteableLocations,
    );
  }

  /**
   * update the locationUnavailability to undefined if the location is available again
   * @param now - current time
   * @param unavailableLocations - list of unavailable locations
   * @param allLocations - list of all locations
   */
  private updateLocation(
    now: number,
    unavailableLocations: Location[],
    allLocations: Location[],
  ): void {
    for (const location of unavailableLocations) {
      const unavaialableLocation = allLocations.find((loc) => loc.name === location.name);
      if (
        unavaialableLocation &&
        now - unavaialableLocation.lastUnavailabilityTimestampInMs >
          Constants.LocationUnavailableExpirationTimeInMs
      ) {
        unavaialableLocation.unavailable = false;
      }
    }
  }

  private cleanUnavailableLocationList(now: number, unavailableLocations: Location[]): Location[] {
    return unavailableLocations.filter((loc) => {
      if (
        loc &&
        now - loc.lastUnavailabilityTimestampInMs >= Constants.LocationUnavailableExpirationTimeInMs
      ) {
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
  private async getDatabaseAccountFromAnyEndpoint(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<DatabaseAccount> {
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
    } catch (err: any) {
      // TODO: Tracing
    }

    if (this.preferredLocations) {
      for (const location of this.preferredLocations) {
        try {
          const locationalEndpoint = GlobalEndpointManager.getLocationalEndpoint(
            this.defaultEndpoint,
            location,
          );
          const options = { urlConnection: locationalEndpoint };
          const { resource: databaseAccount } = await this.readDatabaseAccount(
            diagnosticNode,
            options,
          );
          if (databaseAccount) {
            return databaseAccount;
          }
        } catch (err: any) {
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
  private static getLocationalEndpoint(defaultEndpoint: string, locationName: string): string {
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
        const locationalDatabaseAccountName =
          globalDatabaseAccountName + "-" + locationName.replace(" ", "");

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
