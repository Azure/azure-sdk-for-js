import { Constants, OperationType, ResourceType, sleep } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DatabaseAccount } from "./documents";
import { RequestOptions } from "./index";
import { LocationCache } from "./LocationCache";
import { ResourceResponse } from "./request";
import { RequestContext } from "./request/RequestContext";

/**
 * @hidden
 * This internal class implements the logic for endpoint management for geo-replicated database accounts.
 * @property {object} client                       - The document client instance.
 * @property {string} defaultEndpoint              - The endpoint used to create the client instance.
 * @property {bool} enableEndpointDiscovery        - Flag to enable/disable automatic redirecting of requests
 *                                                   based on read/write operations.
 * @property {Array} preferredLocations            - List of azure regions to be used as preferred locations
 *                                                   for read requests.
 * @property {bool} isEndpointCacheInitialized     - Flag to determine whether the endpoint cache is initialized or not.
 */
export class GlobalEndpointManager {
  private defaultEndpoint: string;
  public enableEndpointDiscovery: boolean;
  private isEndpointCacheInitialized: boolean;
  private locationCache: LocationCache;
  private isRefreshing: boolean;
  private readonly backgroundRefreshTimeIntervalInMS: number;
  private initPromise: Promise<void>;

  /**
   * @constructor GlobalEndpointManager
   * @param {object} options                          - The document client instance.
   */
  constructor(
    options: CosmosClientOptions,
    private readDatabaseAccount: (opts: RequestOptions) => Promise<ResourceResponse<DatabaseAccount>>
  ) {
    this.defaultEndpoint = options.endpoint;
    this.enableEndpointDiscovery = options.connectionPolicy.enableEndpointDiscovery;
    this.isEndpointCacheInitialized = false;
    this.locationCache = new LocationCache(options);
    this.isRefreshing = false;
    this.backgroundRefreshTimeIntervalInMS = Constants.DefaultUnavailableLocationExpirationTimeMS;
  }

  /**
   * Gets the current read endpoint from the endpoint cache.
   */
  public async getReadEndpoint(): Promise<string> {
    if (!this.isEndpointCacheInitialized) {
      await this.init();
    }
    return this.locationCache.getReadEndpoint();
  }

  /**
   * Gets the current write endpoint from the endpoint cache.
   */
  public async getWriteEndpoint(): Promise<string> {
    if (!this.isEndpointCacheInitialized) {
      await this.init();
    }
    return this.locationCache.getWriteEndpoint();
  }

  public async getReadEndpoints(): Promise<ReadonlyArray<string>> {
    if (!this.isEndpointCacheInitialized) {
      await this.init();
    }
    return this.locationCache.getReadEndpoints();
  }

  public async getWriteEndpoints(): Promise<ReadonlyArray<string>> {
    if (!this.isEndpointCacheInitialized) {
      await this.init();
    }
    return this.locationCache.getWriteEndpoints();
  }

  public markCurrentLocationUnavailableForRead(endpoint: string) {
    this.locationCache.markCurrentLocationUnavailableForRead(endpoint);
  }

  public markCurrentLocationUnavailableForWrite(endpoint: string) {
    this.locationCache.markCurrentLocationUnavailableForWrite(endpoint);
  }

  public canUseMultipleWriteLocations(resourceType?: ResourceType, operationType?: OperationType) {
    return this.locationCache.canUseMultipleWriteLocations(resourceType, operationType);
  }

  public async resolveServiceEndpoint(request: RequestContext) {
    if (!this.isEndpointCacheInitialized && request.resourceType !== ResourceType.none) {
      await this.init();
    }
    return this.locationCache.resolveServiceEndpoint(request);
  }

  /**
   * Refreshes the endpoint list by retrieving the writable and readable locations
   *  from the geo-replicated database account and then updating the locations cache.
   *   We skip the refreshing if enableEndpointDiscovery is set to False
   */
  public async refreshEndpointList(): Promise<void> {
    if (!this.isRefreshing && this.enableEndpointDiscovery) {
      this.isRefreshing = true;
      let shouldRefresh = false;
      const databaseAccount = await this.getDatabaseAccountFromAnyEndpoint();
      if (databaseAccount) {
        this.locationCache.onDatabaseAccountRead(databaseAccount);
      }

      ({ shouldRefresh } = this.locationCache.shouldRefreshEndpoints());
      if (shouldRefresh) {
        this.backgroundRefresh();
        return;
      } else {
        this.isRefreshing = false;
        this.isEndpointCacheInitialized = true;
      }
    }
  }

  private async init(): Promise<void> {
    if (this.initPromise === undefined) {
      this.initPromise = this.refreshEndpointList().catch((error: any) => error); // Without this catch, node reports an unhandled rejection. So we stash the promise as resolved even if it errored.
    }
    return this.initPromise;
  }

  private backgroundRefresh() {
    process.nextTick(async () => {
      this.isRefreshing = true;
      let shouldRefresh = false;
      try {
        do {
          const databaseAccount = await this.getDatabaseAccountFromAnyEndpoint();
          if (databaseAccount) {
            this.locationCache.onDatabaseAccountRead(databaseAccount);
          }

          ({ shouldRefresh } = this.locationCache.shouldRefreshEndpoints());
          if (!shouldRefresh) {
            break;
          }
          await sleep(this.backgroundRefreshTimeIntervalInMS);
        } while (shouldRefresh);
      } catch (err) {
        /* swallow error */
        // TODO: Tracing
      }
      this.isRefreshing = false;
      this.isEndpointCacheInitialized = true;
    });
  }

  /**
   * Gets the database account first by using the default endpoint, and if that doesn't returns
   * use the endpoints for the preferred locations in the order they are specified to get
   * the database account.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {function} callback        - The callback function which takes databaseAccount(object) as an argument.
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
    } catch (err) {
      // TODO: Tracing
    }

    if (this.locationCache.prefferredLocations) {
      for (const location of this.locationCache.prefferredLocations) {
        try {
          const locationalEndpoint = GlobalEndpointManager.getLocationalEndpoint(this.defaultEndpoint, location);
          const options = { urlConnection: locationalEndpoint };
          const { resource: databaseAccount } = await this.readDatabaseAccount(options);
          if (databaseAccount) {
            return databaseAccount;
          }
        } catch (err) {
          // TODO: Tracing
        }
      }
    }
  }

  /**
   * Gets the locational endpoint using the location name passed to it using the default endpoint.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {string} defaultEndpoint - The default endpoint to use for the endpoint.
   * @param {string} locationName    - The location name for the azure region like "East US".
   */
  private static getLocationalEndpoint(defaultEndpoint: string, locationName: string) {
    // For defaultEndpoint like 'https://contoso.documents.azure.com:443/' parse it to generate URL format
    // This defaultEndpoint should be global endpoint(and cannot be a locational endpoint)
    // and we agreed to document that
    const endpointUrl = new URL(defaultEndpoint);

    // hostname attribute in endpointUrl will return 'contoso.documents.azure.com'
    if (endpointUrl.hostname) {
      const hostnameParts = endpointUrl.hostname
        .toString()
        .toLowerCase()
        .split(".");
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
