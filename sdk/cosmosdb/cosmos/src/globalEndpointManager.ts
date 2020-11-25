// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType, ResourceType, isReadRequest } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { Location, DatabaseAccount, defaultConnectionPolicy, ConnectionPolicy } from "./documents";
import { RequestOptions } from "./index";
import { ResourceResponse } from "./request";

/**
 * @hidden
 * This internal class implements the logic for endpoint management for geo-replicated database accounts.
 * @property {bool} enableEndpointDiscovery        - Flag to enable/disable automatic redirecting of requests
 *                                                   based on read/write operations.
 */
export class GlobalEndpointManager {
  public enableEndpointDiscovery: boolean;

  private defaultEndpoint: string;
  private isRefreshing: boolean;
  private connectionPolicy: Required<ConnectionPolicy>;
  private writeableLocations?: Location[];
  private readableLocations?: Location[];

  /**
   * @constructor GlobalEndpointManager
   * @param {object} options                          - The document client instance.
   */
  constructor(
    options: CosmosClientOptions,
    private readDatabaseAccount: (
      opts: RequestOptions
    ) => Promise<ResourceResponse<DatabaseAccount>>
  ) {
    this.defaultEndpoint = options.endpoint;
    this.connectionPolicy = { ...defaultConnectionPolicy, ...options.connectionPolicy };
    this.enableEndpointDiscovery = this.connectionPolicy.enableEndpointDiscovery;
    this.isRefreshing = false;
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
    return this.readableLocations?.map((loc) => loc.databaseAccountEndpoint) ?? [];
  }

  public async getWriteEndpoints(): Promise<ReadonlyArray<string>> {
    return this.writeableLocations?.map((loc) => loc.databaseAccountEndpoint) ?? [];
  }

  public async markCurrentLocationUnavailableForRead(endpoint: string) {
    await this.refreshEndpointList();
    const location = this.readableLocations?.find(
      (loc) => loc.databaseAccountEndpoint === endpoint
    );
    if (location) {
      location.unavailable = true;
    }
  }

  public async markCurrentLocationUnavailableForWrite(endpoint: string) {
    await this.refreshEndpointList();
    const location = this.writeableLocations?.find(
      (loc) => loc.databaseAccountEndpoint === endpoint
    );
    if (location) {
      location.unavailable = true;
    }
  }

  public canUseMultipleWriteLocations(
    resourceType?: ResourceType,
    operationType?: OperationType
  ): boolean {
    let canUse = this.connectionPolicy.useMultipleWriteLocations;

    if (resourceType) {
      canUse =
        canUse &&
        (resourceType === ResourceType.item ||
          (resourceType === ResourceType.sproc && operationType === OperationType.Execute));
    }

    return canUse;
  }

  public async resolveServiceEndpoint(resourceType: ResourceType, operationType: OperationType) {
    // If endpoint discovery is disabled, always use the user provided endpoint
    if (!this.connectionPolicy.enableEndpointDiscovery) {
      return this.defaultEndpoint;
    }

    // If getting the database account, always use the user provided endpoint
    if (resourceType === ResourceType.none) {
      return this.defaultEndpoint;
    }

    if (!this.readableLocations || !this.writeableLocations) {
      const { resource: databaseAccount } = await this.readDatabaseAccount({
        urlConnection: this.defaultEndpoint
      });
      this.writeableLocations = databaseAccount?.writableLocations;
      this.readableLocations = databaseAccount?.readableLocations;
    }

    const locations = isReadRequest(operationType)
      ? this.readableLocations
      : this.writeableLocations;

    let location;
    // If we have preferred locations, try each one in order and use the first available one
    for (const preferredLocation of this.connectionPolicy.preferredLocations) {
      location = locations?.find(
        (loc) =>
          loc.unavailable !== true &&
          normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation)
      );
      if (location) {
        break;
      }
    }

    // If no preferred locations or one did not match, just grab the first one that is available
    if (!location) {
      location = locations?.find((loc) => {
        return loc.unavailable !== true;
      });
    }

    return location ? location.databaseAccountEndpoint : this.defaultEndpoint;
  }

  /**
   * Refreshes the endpoint list by retrieving the writable and readable locations
   *  from the geo-replicated database account and then updating the locations cache.
   *   We skip the refreshing if enableEndpointDiscovery is set to False
   */
  public async refreshEndpointList(): Promise<void> {
    if (!this.isRefreshing && this.connectionPolicy.enableEndpointDiscovery) {
      this.isRefreshing = true;
      const databaseAccount = await this.getDatabaseAccountFromAnyEndpoint();
      if (databaseAccount) {
        this.refreshEndpoints(databaseAccount);
      }

      this.isRefreshing = false;
    }
  }

  private refreshEndpoints(databaseAccount: DatabaseAccount) {
    for (const location of databaseAccount.writableLocations) {
      const existingLocation = this.writeableLocations?.find((loc) => loc.name === location.name);
      if (!existingLocation) {
        if (!this.writeableLocations) {
          this.writeableLocations = [];
        }
        this.writeableLocations.push(location);
      }
    }
    for (const location of databaseAccount.writableLocations) {
      const existingLocation = this.readableLocations?.find((loc) => loc.name === location.name);
      if (!existingLocation) {
        if (!this.readableLocations) {
          this.readableLocations = [];
        }
        this.readableLocations.push(location);
      }
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
  private async getDatabaseAccountFromAnyEndpoint(): Promise<DatabaseAccount> {
    try {
      const options = { urlConnection: this.defaultEndpoint };
      const { resource: databaseAccount } = await this.readDatabaseAccount(options);
      if (databaseAccount) {
        return databaseAccount;
      }
      // If for any reason(non - globaldb related), we are not able to get the database
      // account from the above call to readDatabaseAccount,
      // we would try to get this information from any of the preferred locations that the user
      // might have specified (by creating a locational endpoint)
      // and keeping eating the exception until we get the database account and return None at the end,
      // if we are not able to get that info from any endpoints
    } catch (err) {
      // TODO: Tracing
    }
    for (const location of this.connectionPolicy.preferredLocations) {
      try {
        const locationalEndpoint = GlobalEndpointManager.getLocationalEndpoint(
          this.defaultEndpoint,
          location
        );
        const options = { urlConnection: locationalEndpoint ?? undefined };
        const { resource: databaseAccount } = await this.readDatabaseAccount(options);
        if (databaseAccount) {
          return databaseAccount;
        }
      } catch (err) {
        // TODO: Tracing
      }
    }
    throw new Error("could not find the database account");
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

function normalizeEndpoint(endpoint: string) {
  return endpoint
    .split(" ")
    .join("")
    .toLowerCase();
}
