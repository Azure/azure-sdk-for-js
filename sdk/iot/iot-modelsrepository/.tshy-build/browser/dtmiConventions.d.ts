/**
 * isValidDtmi validates if a given dtmi matches the convention.
 * This is based on the DTMI spec:
 * https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#digital-twin-model-identifier
 *
 * @param dtmi - digital twins model identifier string
 */
export declare function isValidDtmi(dtmi: string): boolean;
/**
 * Given the dtmi and repository uri, will get a fully qualified model uri.
 *
 * @param dtmi - digital twins model identifier string
 * @param repositoryUri - base URI for repository
 * @param expanded - is the Model URI .json or .expanded.json
 */
export declare function getModelUri(dtmi: string, repositoryUri: string, expanded?: boolean): string;
/**
 * convertDtmiToPath converts a given dtmi string to a path.
 *
 * @param dtmi - digital twins model identifier string
 * @param expanded - is the Model URI .json or .expanded.json
 * @internal
 */
export declare function convertDtmiToPath(dtmi: string, expanded: boolean): string;
//# sourceMappingURL=dtmiConventions.d.ts.map