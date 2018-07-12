import { ConnectionMode, MediaReadMode } from ".";
import { RetryOptions } from "../retry";
/**
 * @global
 * Represents the Connection policy associated with a DocumentClient in the Azure Cosmos DB database service.
 * @property {string} MediaReadMode                - Attachment content (aka media) download mode. \
 *                                                   Should be one of the values of \{@link MediaReadMode}
 * @property {number} MediaRequestTimeout          - \Time to wait for response from network peer for \
 * attachment content (aka media) operations. Represented in milliseconds.
 * @property {number} RequestTimeout               - Request timeout (time to wait for response from \
 * network peer). Represented in milliseconds.
 * @property {bool} EnableEndpointDiscovery        - Flag to enable/disable automatic redirecting of \
 * requests based on read/write operations.
 * @property {Array} PreferredLocations            - List of azure regions to be used as preferred \
 * locations for read requests.
 * @property {RetryOptions} RetryOptions           - RetryOptions instance which defines several \
 * configurable properties used during retry.
 * @property {bool} DisableSSLVerification         - Flag to disable SSL verification for the requests. \
 * SSL verification is enabled by default. Don't set this when targeting production endpoints.
 *                                                   This is intended to be used only when targeting \
 * emulator endpoint to avoid failing your requests with SSL related error.
 * @property {string} ProxyUrl                     - Http/Https proxy url
 */
export class ConnectionPolicy {
  private static readonly defaultRequestTimeout: number = 60000;
  private static readonly defaultMediaRequestTimeout: number = 300000;

  public ConnectionMode = ConnectionMode.Gateway;
  public MediaReadMode = MediaReadMode.Buffered;
  public MediaRequestTimeout = ConnectionPolicy.defaultMediaRequestTimeout;
  public RequestTimeout = ConnectionPolicy.defaultRequestTimeout;
  public EnableEndpointDiscovery = true;
  public PreferredLocations: string[] = [];
  public RetryOptions = new RetryOptions();
  public DisableSSLVerification = false;
  public ProxyUrl = "";
}
