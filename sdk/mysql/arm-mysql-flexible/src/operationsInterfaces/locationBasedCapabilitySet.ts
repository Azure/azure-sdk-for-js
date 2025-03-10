/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Capability,
  LocationBasedCapabilitySetListOptionalParams,
  LocationBasedCapabilitySetGetOptionalParams,
  LocationBasedCapabilitySetGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a LocationBasedCapabilitySet. */
export interface LocationBasedCapabilitySet {
  /**
   * Get capabilities at specified location in a given subscription.
   * @param locationName The name of the location.
   * @param options The options parameters.
   */
  list(
    locationName: string,
    options?: LocationBasedCapabilitySetListOptionalParams,
  ): PagedAsyncIterableIterator<Capability>;
  /**
   * Get capabilities at specified location in a given subscription.
   * @param locationName The name of the location.
   * @param capabilitySetName Name of capability set
   * @param options The options parameters.
   */
  get(
    locationName: string,
    capabilitySetName: string,
    options?: LocationBasedCapabilitySetGetOptionalParams,
  ): Promise<LocationBasedCapabilitySetGetResponse>;
}
