import { Constants, Helper, ResourceType } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DatabaseAccount, Location } from "./documents";
import { LocationInfo } from "./LocationInfo";
import { LocationRouting } from "./request/LocationRouting";
import { RequestContext } from "./request/RequestContext";

/**
 * @private
 * @hidden
 */
enum EndpointOperationType {
  None = "None",
  Read = "Read",
  Write = "Write"
}

/**
 * @private
 * @hidden
 */
interface LocationUnavailabilityInfo {
  lastUnavailablityCheckTimeStamp: Date;
  operationTypes: Set<keyof typeof EndpointOperationType>;
}

/**
 * Implements the abstraction to resolve target location for geo-replicated Database Account
 * with multiple writable and readable locations.
 * @private
 * @hidden
 */
export class LocationCache {
  private locationUnavailabilityInfoByEndpoint: Map<string, LocationUnavailabilityInfo> = new Map();
  private locationInfo: LocationInfo;
  private lastCacheUpdateTimestamp: Date = new Date(0);
  private defaultEndpoint: string;
  private enableMultipleWritableLocations: boolean;

  public constructor(private options: CosmosClientOptions) {
    this.defaultEndpoint = options.endpoint;
    this.locationInfo = new LocationInfo(options.connectionPolicy.PreferredLocations, options.endpoint);
  }

  public get prefferredLocations(): string[] {
    return this.options.connectionPolicy.PreferredLocations;
  }

  public getWriteEndpoint(): string {
    return this.getWriteEndpoints()[0];
  }

  public getReadEndpoint(): string {
    return this.getReadEndpoints()[0];
  }

  /**
   * Gets list of write endpoints ordered by
   * 1. Preferred location
   * 2. Endpoint availability
   */
  public getWriteEndpoints(): ReadonlyArray<string> {
    if (this.locationUnavailabilityInfoByEndpoint.size > 0 && this.canUpdateCache(this.lastCacheUpdateTimestamp)) {
      this.updateLocationCache();
    }
    return this.locationInfo.writeEndpoints;
  }

  /**
   * Gets list of read endpoints ordered by
   * 1. Preferred location
   * 2. Endpoint availability
   */
  public getReadEndpoints(): ReadonlyArray<string> {
    if (this.locationUnavailabilityInfoByEndpoint.size > 0 && this.canUpdateCache(this.lastCacheUpdateTimestamp)) {
      this.updateLocationCache();
    }
    return this.locationInfo.readEndpoints;
  }

  public markCurrentLocationUnavailableForRead(endpoint: string) {
    this.markEndpointUnavailable(endpoint, EndpointOperationType.Read);
  }

  public markCurrentLocationUnavailableForWrite(endpoint: string) {
    this.markEndpointUnavailable(endpoint, EndpointOperationType.Write);
  }

  /**
   * Invoked when {@link DatabaseAccount} is read
   * @param databaseAccount The DatabaseAccount read
   */
  public onDatabaseAccountRead(databaseAccount: DatabaseAccount) {
    this.updateLocationCache(
      databaseAccount.writableLocations,
      databaseAccount.readableLocations,
      databaseAccount.enableMultipleWritableLocations
    );
  }

  public resolveServiceEndpoint(request: RequestContext): string {
    request.locationRouting = request.locationRouting || new LocationRouting();

    let locationIndex = request.locationRouting.locationIndexToRoute || 0;

    if (!this.options.connectionPolicy.EnableEndpointDiscovery) {
      return this.defaultEndpoint;
    }

    if (request.locationRouting.locationEndpointToRoute) {
      return request.locationRouting.locationEndpointToRoute;
    }

    // If we're ignoring preferred locations, or if it's a write request that can't use multiple locations
    // then default to the first two write locations, alternating (or the default endpoint)
    if (
      request.locationRouting.ignorePreferredLocation ||
      (!Helper.isReadRequest(request) && !this.canUseMultipleWriteLocations(request))
    ) {
      const currentInfo = this.locationInfo;
      if (currentInfo.orderedWriteLocations.length > 0) {
        locationIndex = Math.min(locationIndex % 2, currentInfo.orderedWriteLocations.length - 1);
        const writeLocation = currentInfo.orderedWriteLocations[locationIndex];
        return currentInfo.availableWriteEndpointByLocation.get(LocationCache.normalizeLocationName(writeLocation));
      } else {
        return this.defaultEndpoint;
      }
    } else {
      // If we're using preferred regions, then choose the correct endpoint based on the location index
      const endpoints = Helper.isReadRequest(request)
        ? this.locationInfo.readEndpoints
        : this.locationInfo.writeEndpoints;
      return endpoints[locationIndex % endpoints.length];
    }
  }

  public shouldRefreshEndpoints(): { shouldRefresh: boolean; canRefreshInBackground: boolean } {
    let canRefreshInBackground = true;
    const currentInfo = this.locationInfo;

    const mostPreferredLocation: string = LocationCache.normalizeLocationName(
      currentInfo.preferredLocations ? currentInfo.preferredLocations[0] : null
    );

    if (this.options.connectionPolicy.EnableEndpointDiscovery) {
      // Refresh if client opts-in to use multiple write locations, but it's not enabled on the server.
      const shouldRefresh =
        this.options.connectionPolicy.UseMultipleWriteLocations && !this.enableMultipleWritableLocations;

      if (mostPreferredLocation) {
        if (currentInfo.availableReadEndpointByLocation.size > 0) {
          const mostPreferredReadEndpoint = currentInfo.availableReadEndpointByLocation.get(mostPreferredLocation);
          if (mostPreferredReadEndpoint) {
            if (mostPreferredReadEndpoint !== currentInfo.readEndpoints[0]) {
              return { shouldRefresh: true, canRefreshInBackground };
            }
          } else {
            return { shouldRefresh: true, canRefreshInBackground };
          }
        }

        if (!this.canUseMultipleWriteLocations()) {
          if (this.isEndpointUnavailable(currentInfo.writeEndpoints[0], EndpointOperationType.Write)) {
            canRefreshInBackground = currentInfo.writeEndpoints.length > 1;
            return { shouldRefresh: true, canRefreshInBackground };
          } else {
            return { shouldRefresh, canRefreshInBackground };
          }
        } else if (mostPreferredLocation) {
          const mostPreferredWriteEndpoint = currentInfo.availableWriteEndpointByLocation.get(mostPreferredLocation);
          if (mostPreferredWriteEndpoint) {
            return {
              shouldRefresh: shouldRefresh || mostPreferredWriteEndpoint !== currentInfo.writeEndpoints[0],
              canRefreshInBackground
            };
          } else {
            return { shouldRefresh, canRefreshInBackground };
          }
        }
      }
    }
    return { shouldRefresh: false, canRefreshInBackground };
  }

  public canUseMultipleWriteLocations(request?: RequestContext): boolean {
    let canUse = this.options.connectionPolicy.UseMultipleWriteLocations && this.enableMultipleWritableLocations;

    if (request) {
      canUse =
        canUse &&
        (request.resourceType === ResourceType.item ||
          (request.resourceType === ResourceType.sproc && request.operationType === Constants.OperationTypes.Execute));
    }

    return canUse;
  }

  private clearStaleEndpointUnavailabilityInfo() {
    if (this.locationUnavailabilityInfoByEndpoint.size > 0) {
      for (const [endpoint, info] of this.locationUnavailabilityInfoByEndpoint.entries()) {
        if (info && this.canUpdateCache(info.lastUnavailablityCheckTimeStamp)) {
          this.locationUnavailabilityInfoByEndpoint.delete(endpoint);
        }
      }
    }
  }
  private isEndpointUnavailable(endpoint: string, expectedAvailableOperations: EndpointOperationType) {
    const unavailabilityInfo = this.locationUnavailabilityInfoByEndpoint.get(endpoint);

    if (
      expectedAvailableOperations === EndpointOperationType.None ||
      unavailabilityInfo == null ||
      !unavailabilityInfo.operationTypes.has(expectedAvailableOperations)
    ) {
      return false;
    } else {
      if (this.canUpdateCache(unavailabilityInfo.lastUnavailablityCheckTimeStamp)) {
        return false;
      } else {
        return true;
      }
    }
  }

  private markEndpointUnavailable(unavailableEndpoint: string, unavailableOperationType: EndpointOperationType) {
    const unavailabilityInfo = this.locationUnavailabilityInfoByEndpoint.get(unavailableEndpoint);
    const now = new Date(Date.now());
    if (unavailabilityInfo == null) {
      this.locationUnavailabilityInfoByEndpoint.set(unavailableEndpoint, {
        lastUnavailablityCheckTimeStamp: now,
        operationTypes: new Set<keyof typeof EndpointOperationType>([unavailableOperationType])
      });
    } else {
      const unavailableOperations = new Set<keyof typeof EndpointOperationType>([unavailableOperationType]);
      for (const op of unavailabilityInfo.operationTypes) {
        unavailableOperations.add(op);
      }
      this.locationUnavailabilityInfoByEndpoint.set(unavailableEndpoint, {
        lastUnavailablityCheckTimeStamp: now,
        operationTypes: unavailableOperations
      });
    }

    this.updateLocationCache();
  }

  private updateLocationCache(
    writeLocations?: Location[],
    readLocations?: Location[],
    enableMultipleWritableLocations?: boolean
  ) {
    if (enableMultipleWritableLocations) {
      this.enableMultipleWritableLocations = enableMultipleWritableLocations;
    }

    this.clearStaleEndpointUnavailabilityInfo();

    // TODO: To sstay consistent with .NET, grab a local copy of the locationInfo

    if (this.options.connectionPolicy.EnableEndpointDiscovery) {
      if (readLocations) {
        ({
          endpointsByLocation: this.locationInfo.availableReadEndpointByLocation,
          orderedLocations: this.locationInfo.orderedReadLocations
        } = this.getEndpointByLocation(readLocations));
      }

      if (writeLocations) {
        ({
          endpointsByLocation: this.locationInfo.availableWriteEndpointByLocation,
          orderedLocations: this.locationInfo.orderedWriteLocations
        } = this.getEndpointByLocation(writeLocations));
      }
    }

    this.locationInfo.writeEndpoints = this.getPreferredAvailableEndpoints(
      this.locationInfo.availableWriteEndpointByLocation,
      this.locationInfo.orderedWriteLocations,
      EndpointOperationType.Write,
      this.defaultEndpoint
    );

    this.locationInfo.readEndpoints = this.getPreferredAvailableEndpoints(
      this.locationInfo.availableReadEndpointByLocation,
      this.locationInfo.orderedReadLocations,
      EndpointOperationType.Read,
      this.defaultEndpoint
    );

    this.lastCacheUpdateTimestamp = new Date();
  }

  private getPreferredAvailableEndpoints(
    endpointsByLocation: ReadonlyMap<string, string>,
    orderedLocations: ReadonlyArray<string>,
    expectedAvailableOperation: EndpointOperationType,
    fallbackEndpoint: string
  ): string[] {
    const endpoints = [];

    if (this.options.connectionPolicy.EnableEndpointDiscovery && endpointsByLocation && endpointsByLocation.size > 0) {
      if (this.canUseMultipleWriteLocations() || expectedAvailableOperation === EndpointOperationType.Read) {
        const unavailableEndpoints: string[] = [];
        if (this.options.connectionPolicy.PreferredLocations) {
          for (const location of this.options.connectionPolicy.PreferredLocations) {
            const endpoint = endpointsByLocation.get(LocationCache.normalizeLocationName(location));
            if (endpoint) {
              if (this.isEndpointUnavailable(endpoint, expectedAvailableOperation)) {
                unavailableEndpoints.push(endpoint);
              } else {
                endpoints.push(endpoint);
              }
            }
          }
        }

        if (endpoints.length === 0) {
          endpoints.push(fallbackEndpoint);
        }
      } else {
        for (const location of orderedLocations) {
          const normalizedLocationName = LocationCache.normalizeLocationName(location);
          if (endpointsByLocation.has(normalizedLocationName)) {
            endpoints.push(endpointsByLocation.get(normalizedLocationName));
          }
        }
      }
    }

    if (endpoints.length === 0) {
      endpoints.push(fallbackEndpoint);
    }

    return endpoints;
  }

  private getEndpointByLocation(
    locations: Location[]
  ): { endpointsByLocation: Map<string, string>; orderedLocations: string[] } {
    const endpointsByLocation: Map<string, string> = new Map();
    const orderedLocations: string[] = [];

    for (const location of locations) {
      if (!location) {
        continue;
      }
      const normalizedLocationName = LocationCache.normalizeLocationName(location.name);
      endpointsByLocation.set(normalizedLocationName, location.databaseAccountEndpoint);
      orderedLocations.push(normalizedLocationName);
    }
    return { endpointsByLocation, orderedLocations };
  }

  private canUpdateCache(timestamp: Date): boolean {
    return new Date(Date.now() - Constants.DefaultUnavailableLocationExpirationTimeMS) > timestamp;
  }

  private static normalizeLocationName(location: string): string {
    return location ? location.toLowerCase().replace(/ /g, "") : null;
  }
}
