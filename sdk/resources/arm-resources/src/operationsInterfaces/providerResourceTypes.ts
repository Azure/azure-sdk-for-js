import {
  ProviderResourceTypesListOptionalParams,
  ProviderResourceTypesListResponse
} from "../models";

/** Interface representing a ProviderResourceTypes. */
export interface ProviderResourceTypes {
  /**
   * List the resource types for a specified resource provider.
   * @param resourceProviderNamespace The namespace of the resource provider.
   * @param options The options parameters.
   */
  list(
    resourceProviderNamespace: string,
    options?: ProviderResourceTypesListOptionalParams
  ): Promise<ProviderResourceTypesListResponse>;
}
