// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType, ResourceType, isReadRequest } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { Location, DatabaseAccount } from "./documents";
import { RequestOptions } from "./index";
import { Constants } from "./common/constants";
import { ResourceResponse } from "./request";

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

  /**
   * @param options - The document client instance.
   */
  constructor(
    options: CosmosClientOptions,
    private readDatabaseAccount: (
      opts: RequestOptions
    ) => Promise<ResourceResponse<DatabaseAccount>>
  ) {
    this.options = options;
    this.defaultEndpoint = options.endpoint;
    this.enableEndpointDiscovery = options.connectionPolicy.enableEndpointDiscovery;
    this.isRefreshing = false;
    this.preferredLocations = this.options.connectionPolicy.preferredLocations;
  }

  /**
   * Gets the current read endpoint from the endpoint cache.
   */
  public async getReadEndpoint(): Promise<string> {
    return this.resolveServiceEndpoint(ResourceType.item, OperationType.Read);
  }

  /**
   * Gets the current write endpoint from the endpoint cache.
   */
  public async getWriteEndpoint(): Promise<string> {
    return this.resolveServiceEndpoint(ResourceType.item, OperationType.Replace);
  }

  public async getReadEndpoints(): Promise<ReadonlyArray<string>> {
    return this.readableLocations.map((loc) => loc.databaseAccountEndpoint);
  }

  public async getWriteEndpoints(): Promise<ReadonlyArray<string>> {
    return this.writeableLocations.map((loc) => loc.databaseAccountEndpoint);
  }

  public async markCurrentLocationUnavailableForRead(endpoint: string): Promise<void> {
    await this.refreshEndpointList();
    const location = this.readableLocations.find((loc) => loc.databaseAccountEndpoint === endpoint);
    if (location) {
      location.unavailable = true;
      location.lastUnavailabilityTimestampInMs = Date.now();
      this.unavailableReadableLocations.push(location);
    }
  }

  public async markCurrentLocationUnavailableForWrite(endpoint: string): Promise<void> {
    await this.refreshEndpointList();
    const location = this.writeableLocations.find(
      (loc) => loc.databaseAccountEndpoint === endpoint
    );
    if (location) {
      location.unavailable = true;
      location.lastUnavailabilityTimestampInMs = Date.now();
      this.unavailableWriteableLocations.push(location);
    }
  }

  public canUseMultipleWriteLocations(
    resourceType?: ResourceType,
    operationType?: OperationType
  ): boolean {
    let canUse = this.options.connectionPolicy.useMultipleWriteLocations;

    if (resourceType) {
      canUse =
        canUse &&
        (resourceType === ResourceType.item ||
          (resourceType === ResourceType.sproc && operationType === OperationType.Execute));
    }

    return canUse;
  }

  public async resolveServiceEndpoint(
    resourceType: ResourceType,
    operationType: OperationType
  ): Promise<string> {
    // If endpoint discovery is disabled, always use the user provided endpoint
    if (!this.options.connectionPolicy.enableEndpointDiscovery) {
      return this.defaultEndpoint;
    }

    // If getting the database account, always use the user provided endpoint
    if (resourceType === ResourceType.none) {
      return this.defaultEndpoint;
    }

    if (this.readableLocations.length === 0 || this.writeableLocations.length === 0) {
      const { resource: databaseAccount } = await this.readDatabaseAccount({
        urlConnection: this.defaultEndpoint,
      });
      this.writeableLocations = databaseAccount.writableLocations;
      this.readableLocations = databaseAccount.readableLocations;
    }

    const locations = isReadRequest(operationType)
      ? this.readableLocations
      : this.writeableLocations;

    let location;
    // If we have preferred locations, try each one in order and use the first available one
    if (this.preferredLocations && this.preferredLocations.length > 0) {
      for (const preferredLocation of this.preferredLocations) {
        location = locations.find(
          (loc) =>
            loc.unavailable !== true &&
            normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation)
        );
        if (location) {
          break;
        }
      }
    }

    // If no preferred locations or one did not match, just grab the first one that is available
    if (!location) {
      location = locations.find((loc) => {
        return loc.unavailable !== true;
      });
    }
    return location ? location.databaseAccountEndpoint : this.defaultEndpoint;
  }

  /**
   * Refreshes the endpoint list by clearning stale unavailability and then
   *  retrieving the writable and readable locations from the geo-replicated database account
   *  and then updating the locations cache.
   *  We skip the refreshing if enableEndpointDiscovery is set to False
   */
  public async refreshEndpointList(): Promise<void> {
    if (!this.isRefreshing && this.enableEndpointDiscovery) {
      this.isRefreshing = true;
      const databaseAccount = await this.getDatabaseAccountFromAnyEndpoint();
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
      this.unavailableReadableLocations
    );

    this.updateLocation(now, this.unavailableWriteableLocations, this.writeableLocations);
    this.unavailableWriteableLocations = this.cleanUnavailableLocationList(
      now,
      this.unavailableWriteableLocations
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
    allLocations: Location[]
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
  private async getDatabaseAccountFromAnyEndpoint(): Promise<DatabaseAccount> {
    try {
      const options = { urlConnection: this.defaultEndpoint };
      const { resource: databaseAccount } = await this.readDatabaseAccount(options);
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
            location
          );
          const options = { urlConnection: locationalEndpoint };
          const { resource: databaseAccount } = await this.readDatabaseAccount(options);
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

function normalizeEndpoint(endpoint: string): string {
  return endpoint.split(" ").join("").toLowerCase();
}
