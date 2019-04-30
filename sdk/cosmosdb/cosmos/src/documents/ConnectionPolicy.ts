import { ConnectionMode, MediaReadMode } from ".";
import { RetryOptions } from "../retry";
/**
 * Represents the Connection policy associated with a CosmosClient in the Azure Cosmos DB database service.
 */
export class ConnectionPolicy {
  private static readonly defaultRequestTimeout: number = 60000;
  private static readonly defaultMediaRequestTimeout: number = 300000;

  /** Determines which mode to connect to Cosmos with. (Currently only supports Gateway option) */
  public ConnectionMode = ConnectionMode.Gateway;
  /** Attachment content (aka media) download mode. Should be one of the values of {@link MediaReadMode} */
  public MediaReadMode: keyof typeof MediaReadMode = MediaReadMode.Buffered;

  /** Time to wait for response from network peer for attachment content (aka media) operations. Represented in milliseconds. */
  public MediaRequestTimeout = ConnectionPolicy.defaultMediaRequestTimeout;
  /** Request timeout (time to wait for response from network peer). Represented in milliseconds. */
  public RequestTimeout = ConnectionPolicy.defaultRequestTimeout;
  /** Flag to enable/disable automatic redirecting of requests based on read/write operations. */
  public EnableEndpointDiscovery = true;
  /** List of azure regions to be used as preferred locations for read requests. */
  public PreferredLocations: string[] = [];
  /** RetryOptions instance which defines several configurable properties used during retry. */
  public RetryOptions = new RetryOptions();
  /**
   * Flag to disable SSL verification for the requests. SSL verification is enabled by default. Don't set this when targeting production endpoints.
   * This is intended to be used only when targeting emulator endpoint to avoid failing your requests with SSL related error.
   */
  public DisableSSLVerification = false;
  /** Http/Https proxy url */
  public ProxyUrl = "";
  /**
   * The flag that enables writes on any locations (regions) for geo-replicated database accounts in the Azure Cosmos DB service.
   * Default is `false`.
   */
  public UseMultipleWriteLocations: boolean = false;
}
