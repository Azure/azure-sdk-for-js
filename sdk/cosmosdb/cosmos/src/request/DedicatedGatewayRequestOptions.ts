/**
 * Dedicated Gateway Request Options
 */
export interface DedicatedGatewayRequestOptions {
  /**
   * Sets the staleness value associated with the request in the Azure CosmosDB service. For requests where the {@link
   * com.azure.cosmos.ConsistencyLevel} is {@link com.azure.cosmos.ConsistencyLevel#EVENTUAL}, responses from the
   * integrated cache are guaranteed to be no staler than value indicated by this maxIntegratedCacheStaleness.
   *
   * <p>Default value is null</p>
   *
   * <p>Cache Staleness is supported in milliseconds granularity. Anything smaller than milliseconds will be ignored.</p>
   */
  maxIntegratedCacheStaleness?: number;
}
