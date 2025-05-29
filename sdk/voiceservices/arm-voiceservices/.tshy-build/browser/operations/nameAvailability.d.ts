import { NameAvailability } from "../operationsInterfaces/index.js";
import { MicrosoftVoiceServices } from "../microsoftVoiceServices.js";
import { CheckNameAvailabilityRequest, NameAvailabilityCheckLocalOptionalParams, NameAvailabilityCheckLocalResponse } from "../models/index.js";
/** Class containing NameAvailability operations. */
export declare class NameAvailabilityImpl implements NameAvailability {
    private readonly client;
    /**
     * Initialize a new instance of the class NameAvailability class.
     * @param client Reference to the service client
     */
    constructor(client: MicrosoftVoiceServices);
    /**
     * Check whether the resource name is available in the given region.
     * @param location The location in which uniqueness will be verified.
     * @param body The check availability request body.
     * @param options The options parameters.
     */
    checkLocal(location: string, body: CheckNameAvailabilityRequest, options?: NameAvailabilityCheckLocalOptionalParams): Promise<NameAvailabilityCheckLocalResponse>;
}
//# sourceMappingURL=nameAvailability.d.ts.map