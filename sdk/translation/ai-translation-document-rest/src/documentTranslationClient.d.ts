import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { DocumentTranslationClient } from "./clientDefinitions.js";
/**
 * Initialize a new instance of `DocumentTranslationClient`
 * @param endpointParam - Supported document Translation endpoint, protocol and hostname, for example: https://{TranslatorResourceName}.cognitiveservices.azure.com/translator.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(endpointParam: string, credentials: TokenCredential | KeyCredential, options?: ClientOptions): DocumentTranslationClient;
//# sourceMappingURL=documentTranslationClient.d.ts.map