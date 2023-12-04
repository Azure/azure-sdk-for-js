export interface ConnectionString {
    instrumentationkey?: string;
    ingestionendpoint?: string;
    liveendpoint?: string;
    location?: string;
    endpointsuffix?: string;
    aadaudience?: string;
    authorization?: string;

    // Note: this is a node types backcompat equivalent to
    // type ConnectionString = { [key in ConnectionStringKey]?: string }
}

export type ConnectionStringKey = "instrumentationkey" | "ingestionendpoint" | "liveendpoint" | "location"| "endpointsuffix" | "aadaudience" | "authorization";
export const DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
export const DEFAULT_LIVEMETRICS_ENDPOINT = "https://rt.services.visualstudio.com";

export class ConnectionStringParser {
    private static _FIELDS_SEPARATOR = ";";
    private static _FIELD_KEY_VALUE_SEPARATOR = "=";

    public static parse(connectionString?: string): ConnectionString {
        if (!connectionString) {
            return {};
        }

        const kvPairs = connectionString.split(ConnectionStringParser._FIELDS_SEPARATOR);

        const result: ConnectionString = kvPairs.reduce((fields: ConnectionString, kv: string) => {
            const kvParts = kv.split(ConnectionStringParser._FIELD_KEY_VALUE_SEPARATOR);

            if (kvParts.length === 2) { // only save fields with valid formats
                const key = kvParts[0].toLowerCase() as ConnectionStringKey;
                const value = kvParts[1];
                fields[key] = value as string;
            }
            return fields;
        }, {});

        if (Object.keys(result).length > 0) {
            // this is a valid connection string, so parse the results

            if (result.endpointsuffix) {
                // use endpoint suffix where overrides are not provided
                const locationPrefix = result.location ? result.location + "." : "";
                result.ingestionendpoint = result.ingestionendpoint || ("https://" + locationPrefix + "dc." + result.endpointsuffix);
                result.liveendpoint = result.liveendpoint || ("https://" + locationPrefix + "live." + result.endpointsuffix);
            }

            // apply the default endpoints
            result.ingestionendpoint = result.ingestionendpoint || DEFAULT_BREEZE_ENDPOINT;
            result.liveendpoint = result.liveendpoint || DEFAULT_LIVEMETRICS_ENDPOINT;
        }

        return result;
    }

    public static isIkeyValid(iKey: string): boolean {
        if (!iKey || iKey == "") return false;
        const UUID_Regex = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
        const regexp = new RegExp(UUID_Regex);
        return regexp.test(iKey);
    }
}
