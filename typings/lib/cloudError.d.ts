/**
 * @class
 * Provides additional information about an http error response returned from a Microsoft Azure service.
 */
export interface CloudError extends Error {
    /**
     * @property {string} code The error code parsed from the body of the http error response.
     */
    code: string;
    /**
     * @property {string} message The error message parsed from the body of the http error response.
     */
    message: string;
    /**
     * @property {string} [target] The target of the error.
     */
    target?: string;
    /**
     * @property {Array<CloudError>} [details] An array of CloudError objects specifying the details.
     */
    details?: Array<CloudError>;
}
export declare const CloudErrorMapper: {
    required: boolean;
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            message: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            target: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                };
            };
            details: {
                required: boolean;
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        required: boolean;
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
