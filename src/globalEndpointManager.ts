import * as url from "url";
import { RequestOptions } from ".";
import { Response } from ".";
import { Constants } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DatabaseAccount, LocationsType } from "./documents";

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
  private readEndpoint: string;
  private writeEndpoint: string;
  public enableEndpointDiscovery: boolean;
  private preferredLocations: string[];
  private isEndpointCacheInitialized: boolean;

  /**
   * @constructor GlobalEndpointManager
   * @param {object} options                          - The document client instance.
   */
  constructor(
    options: CosmosClientOptions,
    private readDatabaseAccount: (opts: RequestOptions) => Promise<Response<DatabaseAccount>>
  ) {
    this.defaultEndpoint = options.endpoint;
    this.readEndpoint = options.endpoint;
    this.writeEndpoint = options.endpoint;
    this.enableEndpointDiscovery = options.connectionPolicy.EnableEndpointDiscovery;
    this.preferredLocations = options.connectionPolicy.PreferredLocations;
    this.isEndpointCacheInitialized = false;
  }

  /**
   * Gets the current read endpoint from the endpoint cache.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {function} callback        - The callback function which takes readEndpoint(string) as an argument.
   */
  public async getReadEndpoint() {
    if (!this.isEndpointCacheInitialized) {
      await this.refreshEndpointList();
      return this.readEndpoint;
    } else {
      return this.readEndpoint;
    }
  }

  /**
   * Sets the current read endpoint.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {string} readEndpoint        - The endpoint to be set as readEndpoint.
   */
  public setReadEndpoint(readEndpoint: string) {
    this.readEndpoint = readEndpoint;
  }

  /**
   * Gets the current write endpoint from the endpoint cache.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {function} callback        - The callback function which takes writeEndpoint(string) as an argument.
   */
  public async getWriteEndpoint() {
    if (!this.isEndpointCacheInitialized) {
      await this.refreshEndpointList();
      return this.writeEndpoint;
    } else {
      return this.writeEndpoint;
    }
  }

  /**
   * Sets the current write endpoint.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {string} writeEndpoint        - The endpoint to be set as writeEndpoint.
   */
  public setWriteEndpoint(writeEndpoint: string) {
    this.writeEndpoint = writeEndpoint;
  }

  /**
   * Refreshes the endpoint list by retrieving the writable and readable locations
   *  from the geo-replicated database account and then updating the locations cache.
   *   We skip the refreshing if EnableEndpointDiscovery is set to False
   * @memberof GlobalEndpointManager
   * @instance
   */
  public async refreshEndpointList() {
    let writableLocations: LocationsType = [];
    let readableLocations: LocationsType = [];
    let databaseAccount: DatabaseAccount;

    if (this.enableEndpointDiscovery) {
      databaseAccount = await this._getDatabaseAccount();
      if (databaseAccount) {
        writableLocations = databaseAccount.WritableLocations;
        readableLocations = databaseAccount.ReadableLocations;
      }

      // Read and Write endpoints will be initialized to default endpoint if we were not able
      // to get the database account info
      [this.writeEndpoint, this.readEndpoint] = await this._updateLocationsCache(writableLocations, readableLocations);
      this.isEndpointCacheInitialized = true;
      return [this.writeEndpoint, this.readEndpoint];
    } else {
      return [this.writeEndpoint, this.readEndpoint];
    }
  }

  /**
   * Gets the database account first by using the default endpoint, and if that doesn't returns
   * use the endpoints for the preferred locations in the order they are specified to get
   * the database account.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {function} callback        - The callback function which takes databaseAccount(object) as an argument.
   */
  private async _getDatabaseAccount(): Promise<DatabaseAccount> {
    const options = { urlConnection: this.defaultEndpoint };
    try {
      const { result: databaseAccount } = await this.readDatabaseAccount(options);
      return databaseAccount;
      // If for any reason(non - globaldb related), we are not able to get the database
      // account from the above call to readDatabaseAccount,
      // we would try to get this information from any of the preferred locations that the user
      // might have specified(by creating a locational endpoint)
      // and keeping eating the exception until we get the database account and return None at the end,
      // if we are not able to get that info from any endpoints
    } catch (err) {
      // TODO: error handling? Maybe at least tracing? Do we continue on all errors?
    }

    for (const location of this.preferredLocations) {
      try {
        const locationalEndpoint = GlobalEndpointManager._getLocationalEndpoint(this.defaultEndpoint, location);
        const innerOptions = { urlConnection: locationalEndpoint }; // TODO: code smell inner options is hacky
        const { result: databaseAccount } = await this.readDatabaseAccount(innerOptions);
        if (databaseAccount) {
          return databaseAccount;
        }
      } catch (err) {
        // TODO: probably need error handling here?
      }
    }
  }

  /**
   * Gets the locational endpoint using the location name passed to it using the default endpoint.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {string} defaultEndpoint - The default endpoint to use for teh endpoint.
   * @param {string} locationName    - The location name for the azure region like "East US".
   */
  private static _getLocationalEndpoint(defaultEndpoint: string, locationName: string) {
    // For defaultEndpoint like 'https://contoso.documents.azure.com:443/' parse it to generate URL format
    // This defaultEndpoint should be global endpoint(and cannot be a locational endpoint)
    // and we agreed to document that
    const endpointUrl = url.parse(defaultEndpoint, true, true);

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

  /**
   * Updates the read and write endpoints from the passed-in readable and writable locations.
   * @memberof GlobalEndpointManager
   * @instance
   * @param {Array} writableLocations     - The list of writable locations for the geo-enabled database account.
   * @param {Array} readableLocations     - The list of readable locations for the geo-enabled database account.
   * @param {function} callback           - The function to be called as callback after executing this method.
   */
  private async _updateLocationsCache(
    writableLocations: LocationsType,
    readableLocations: LocationsType
  ): Promise<[string, string]> {
    let writeEndpoint;
    let readEndpoint;
    // Use the default endpoint as Read and Write endpoints if EnableEndpointDiscovery
    // is set to False.
    if (!this.enableEndpointDiscovery) {
      writeEndpoint = this.defaultEndpoint;
      readEndpoint = this.defaultEndpoint;
      return [writeEndpoint, readEndpoint];
    }

    // Use the default endpoint as Write endpoint if there are no writable locations, or
    // first writable location as Write endpoint if there are writable locations
    writeEndpoint =
      writableLocations.length === 0 ? this.defaultEndpoint : writableLocations[0][Constants.DatabaseAccountEndpoint];
    // Why where we trying to access this like a dictionary? ;

    // Use the Write endpoint as Read endpoint if there are no readable locations
    if (readableLocations.length === 0) {
      readEndpoint = writeEndpoint;
      return [writeEndpoint, readEndpoint];
    } else {
      // Use the writable location as Read endpoint if there are no preferred locations or
      // none of the preferred locations are in read or write locations
      readEndpoint = writeEndpoint;

      if (!this.preferredLocations) {
        return [writeEndpoint, readEndpoint];
      }

      for (const preferredLocation of this.preferredLocations) {
        // Use the first readable location as Read endpoint from the preferred locations
        for (const readLocation of readableLocations) {
          if (readLocation[Constants.Name] === preferredLocation) {
            readEndpoint = readLocation[Constants.DatabaseAccountEndpoint];
            return [writeEndpoint, readEndpoint];
          }
        }
        // Else, use the first writable location as Read endpoint from the preferred locations
        for (const writeLocation of writableLocations) {
          if (writeLocation[Constants.Name] === preferredLocation) {
            readEndpoint = writeLocation[Constants.DatabaseAccountEndpoint];
            return [writeEndpoint, readEndpoint];
          }
        }
      }

      return [writeEndpoint, readEndpoint];
    }
  }
}
