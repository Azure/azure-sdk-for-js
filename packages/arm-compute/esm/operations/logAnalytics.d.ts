import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a LogAnalytics. */
export declare class LogAnalytics {
    private readonly client;
    /**
     * Create a LogAnalytics.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Export logs that show Api requests made by this subscription in the given time window to show
     * throttling activities.
     *
     * @param {RequestRateByIntervalInput} parameters Parameters supplied to the LogAnalytics
     * getRequestRateByInterval Api.
     *
     * @param {string} location The location upon which virtual-machine-sizes is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    exportRequestRateByInterval(parameters: Models.RequestRateByIntervalInput, location: string, options?: msRest.RequestOptionsBase): Promise<Models.LogAnalyticsExportRequestRateByIntervalResponse>;
    /**
     * Export logs that show total throttled Api requests for this subscription in the given time
     * window.
     *
     * @param {ThrottledRequestsInput} parameters Parameters supplied to the LogAnalytics
     * getThrottledRequests Api.
     *
     * @param {string} location The location upon which virtual-machine-sizes is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    exportThrottledRequests(parameters: Models.ThrottledRequestsInput, location: string, options?: msRest.RequestOptionsBase): Promise<Models.LogAnalyticsExportThrottledRequestsResponse>;
    /**
     * Export logs that show Api requests made by this subscription in the given time window to show
     * throttling activities.
     *
     * @param {RequestRateByIntervalInput} parameters Parameters supplied to the LogAnalytics
     * getRequestRateByInterval Api.
     *
     * @param {string} location The location upon which virtual-machine-sizes is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginExportRequestRateByInterval(parameters: Models.RequestRateByIntervalInput, location: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Export logs that show total throttled Api requests for this subscription in the given time
     * window.
     *
     * @param {ThrottledRequestsInput} parameters Parameters supplied to the LogAnalytics
     * getThrottledRequests Api.
     *
     * @param {string} location The location upon which virtual-machine-sizes is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginExportThrottledRequests(parameters: Models.ThrottledRequestsInput, location: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
}
//# sourceMappingURL=logAnalytics.d.ts.map