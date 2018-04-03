import { ApiKeyCredentials } from "ms-rest-js";
/**
 * Creates a new CognitiveServicesCredentials object.
 *
 * @constructor
 * @param {string} subscriptionKey   The CognitiveServices subscription key
 */
export declare class CognitiveServicesCredentials extends ApiKeyCredentials {
    constructor(subscriptionKey: string);
}
