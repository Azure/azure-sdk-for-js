// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PeeringManagementContext,
  PeeringManagementClientOptionalParams,
} from "./api/index.js";
import { createPeeringManagement } from "./api/index.js";
import { checkServiceProviderAvailability } from "./api/operations.js";
import type { CheckServiceProviderAvailabilityOptionalParams } from "./api/options.js";
import type { CdnPeeringPrefixesOperations } from "./classic/cdnPeeringPrefixes/index.js";
import { _getCdnPeeringPrefixesOperations } from "./classic/cdnPeeringPrefixes/index.js";
import type { ConnectionMonitorTestsOperations } from "./classic/connectionMonitorTests/index.js";
import { _getConnectionMonitorTestsOperations } from "./classic/connectionMonitorTests/index.js";
import type { LegacyPeeringsOperations } from "./classic/legacyPeerings/index.js";
import { _getLegacyPeeringsOperations } from "./classic/legacyPeerings/index.js";
import type { LookingGlassOperations } from "./classic/lookingGlass/index.js";
import { _getLookingGlassOperations } from "./classic/lookingGlass/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PeerAsnsOperations } from "./classic/peerAsns/index.js";
import { _getPeerAsnsOperations } from "./classic/peerAsns/index.js";
import type { PeeringLocationsOperations } from "./classic/peeringLocations/index.js";
import { _getPeeringLocationsOperations } from "./classic/peeringLocations/index.js";
import type { PeeringServiceCountriesOperations } from "./classic/peeringServiceCountries/index.js";
import { _getPeeringServiceCountriesOperations } from "./classic/peeringServiceCountries/index.js";
import type { PeeringServiceLocationsOperations } from "./classic/peeringServiceLocations/index.js";
import { _getPeeringServiceLocationsOperations } from "./classic/peeringServiceLocations/index.js";
import type { PeeringServiceProvidersOperations } from "./classic/peeringServiceProviders/index.js";
import { _getPeeringServiceProvidersOperations } from "./classic/peeringServiceProviders/index.js";
import type { PeeringServicesOperations } from "./classic/peeringServices/index.js";
import { _getPeeringServicesOperations } from "./classic/peeringServices/index.js";
import type { PeeringsOperations } from "./classic/peerings/index.js";
import { _getPeeringsOperations } from "./classic/peerings/index.js";
import type { PrefixesOperations } from "./classic/prefixes/index.js";
import { _getPrefixesOperations } from "./classic/prefixes/index.js";
import type { ReceivedRoutesOperations } from "./classic/receivedRoutes/index.js";
import { _getReceivedRoutesOperations } from "./classic/receivedRoutes/index.js";
import type { RegisteredAsnsOperations } from "./classic/registeredAsns/index.js";
import { _getRegisteredAsnsOperations } from "./classic/registeredAsns/index.js";
import type { RegisteredPrefixesOperations } from "./classic/registeredPrefixes/index.js";
import { _getRegisteredPrefixesOperations } from "./classic/registeredPrefixes/index.js";
import type { RpUnbilledPrefixesOperations } from "./classic/rpUnbilledPrefixes/index.js";
import { _getRpUnbilledPrefixesOperations } from "./classic/rpUnbilledPrefixes/index.js";
import type {
  CheckServiceProviderAvailabilityInput,
  CheckServiceProviderAvailabilityResponse,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PeeringManagementClientOptionalParams } from "./api/peeringManagementContext.js";

export class PeeringManagementClient {
  private _client: PeeringManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PeeringManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PeeringManagementClientOptionalParams,
  );
  /** Peering Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PeeringManagementClientOptionalParams,
    options?: PeeringManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPeeringManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.peeringServiceProviders = _getPeeringServiceProvidersOperations(this._client);
    this.peeringServiceLocations = _getPeeringServiceLocationsOperations(this._client);
    this.peeringServiceCountries = _getPeeringServiceCountriesOperations(this._client);
    this.peeringLocations = _getPeeringLocationsOperations(this._client);
    this.lookingGlass = _getLookingGlassOperations(this._client);
    this.legacyPeerings = _getLegacyPeeringsOperations(this._client);
    this.cdnPeeringPrefixes = _getCdnPeeringPrefixesOperations(this._client);
    this.prefixes = _getPrefixesOperations(this._client);
    this.registeredPrefixes = _getRegisteredPrefixesOperations(this._client);
    this.rpUnbilledPrefixes = _getRpUnbilledPrefixesOperations(this._client);
    this.receivedRoutes = _getReceivedRoutesOperations(this._client);
    this.registeredAsns = _getRegisteredAsnsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.peeringServices = _getPeeringServicesOperations(this._client);
    this.connectionMonitorTests = _getConnectionMonitorTestsOperations(this._client);
    this.peerings = _getPeeringsOperations(this._client);
    this.peerAsns = _getPeerAsnsOperations(this._client);
  }

  /** Checks if the peering service provider is present within 1000 miles of customer's location */
  checkServiceProviderAvailability(
    checkServiceProviderAvailabilityInput: CheckServiceProviderAvailabilityInput,
    options: CheckServiceProviderAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<CheckServiceProviderAvailabilityResponse> {
    return checkServiceProviderAvailability(
      this._client,
      checkServiceProviderAvailabilityInput,
      options,
    );
  }

  /** The operation groups for peeringServiceProviders */
  public readonly peeringServiceProviders: PeeringServiceProvidersOperations;
  /** The operation groups for peeringServiceLocations */
  public readonly peeringServiceLocations: PeeringServiceLocationsOperations;
  /** The operation groups for peeringServiceCountries */
  public readonly peeringServiceCountries: PeeringServiceCountriesOperations;
  /** The operation groups for peeringLocations */
  public readonly peeringLocations: PeeringLocationsOperations;
  /** The operation groups for lookingGlass */
  public readonly lookingGlass: LookingGlassOperations;
  /** The operation groups for legacyPeerings */
  public readonly legacyPeerings: LegacyPeeringsOperations;
  /** The operation groups for cdnPeeringPrefixes */
  public readonly cdnPeeringPrefixes: CdnPeeringPrefixesOperations;
  /** The operation groups for prefixes */
  public readonly prefixes: PrefixesOperations;
  /** The operation groups for registeredPrefixes */
  public readonly registeredPrefixes: RegisteredPrefixesOperations;
  /** The operation groups for rpUnbilledPrefixes */
  public readonly rpUnbilledPrefixes: RpUnbilledPrefixesOperations;
  /** The operation groups for receivedRoutes */
  public readonly receivedRoutes: ReceivedRoutesOperations;
  /** The operation groups for registeredAsns */
  public readonly registeredAsns: RegisteredAsnsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for peeringServices */
  public readonly peeringServices: PeeringServicesOperations;
  /** The operation groups for connectionMonitorTests */
  public readonly connectionMonitorTests: ConnectionMonitorTestsOperations;
  /** The operation groups for peerings */
  public readonly peerings: PeeringsOperations;
  /** The operation groups for peerAsns */
  public readonly peerAsns: PeerAsnsOperations;
}
