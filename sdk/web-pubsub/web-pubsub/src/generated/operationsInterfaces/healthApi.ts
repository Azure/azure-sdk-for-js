import { HealthApiGetServiceStatusOptionalParams } from "../models";

/** Interface representing a HealthApi. */
export interface HealthApi {
  /**
   * Get service health status.
   * @param options The options parameters.
   */
  getServiceStatus(
    options?: HealthApiGetServiceStatusOptionalParams
  ): Promise<void>;
}
