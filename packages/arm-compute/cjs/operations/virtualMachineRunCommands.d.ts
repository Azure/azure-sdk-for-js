import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineRunCommands. */
export declare class VirtualMachineRunCommands {
    private readonly client;
    /**
     * Create a VirtualMachineRunCommands.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Lists all available run commands for a subscription in a location.
     *
     * @param {string} location The location upon which run commands is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(location: string): Promise<Models.VirtualMachineRunCommandsListResponse>;
    list(location: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineRunCommandsListResponse>;
    list(location: string, callback: msRest.ServiceCallback<Models.RunCommandListResult>): void;
    list(location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RunCommandListResult>): void;
    /**
     * Gets specific run command for a subscription in a location.
     *
     * @param {string} location The location upon which run commands is queried.
     *
     * @param {string} commandId The command id.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(location: string, commandId: string): Promise<Models.VirtualMachineRunCommandsGetResponse>;
    get(location: string, commandId: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineRunCommandsGetResponse>;
    get(location: string, commandId: string, callback: msRest.ServiceCallback<Models.RunCommandDocument>): void;
    get(location: string, commandId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RunCommandDocument>): void;
    /**
     * Lists all available run commands for a subscription in a location.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listNext(nextPageLink: string): Promise<Models.VirtualMachineRunCommandsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineRunCommandsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.RunCommandListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RunCommandListResult>): void;
}
//# sourceMappingURL=virtualMachineRunCommands.d.ts.map