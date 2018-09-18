import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { DnsManagementClientContext } from "../dnsManagementClientContext";
/** Class representing a RecordSets. */
export declare class RecordSets {
    private readonly client;
    /**
     * Create a RecordSets.
     * @param {DnsManagementClientContext} client Reference to the service client.
     */
    constructor(client: DnsManagementClientContext);
    /**
     * Updates a record set within a DNS zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {string} relativeRecordSetName The name of the record set, relative to the name of the
     * zone.
     *
     * @param {RecordType} recordType The type of DNS record in this record set. Possible values
     * include: 'A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
     *
     * @param {RecordSet} parameters Parameters supplied to the Update operation.
     *
     * @param {RecordSetsUpdateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet): Promise<Models.RecordSetsUpdateResponse>;
    update(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, options: Models.RecordSetsUpdateOptionalParams): Promise<Models.RecordSetsUpdateResponse>;
    update(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    update(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, options: Models.RecordSetsUpdateOptionalParams, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    /**
     * Creates or updates a record set within a DNS zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {string} relativeRecordSetName The name of the record set, relative to the name of the
     * zone.
     *
     * @param {RecordType} recordType The type of DNS record in this record set. Record sets of type
     * SOA can be updated but not created (they are created when the DNS zone is created). Possible
     * values include: 'A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
     *
     * @param {RecordSet} parameters Parameters supplied to the CreateOrUpdate operation.
     *
     * @param {RecordSetsCreateOrUpdateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet): Promise<Models.RecordSetsCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, options: Models.RecordSetsCreateOrUpdateOptionalParams): Promise<Models.RecordSetsCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    createOrUpdate(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, parameters: Models.RecordSet, options: Models.RecordSetsCreateOrUpdateOptionalParams, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    /**
     * Deletes a record set from a DNS zone. This operation cannot be undone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {string} relativeRecordSetName The name of the record set, relative to the name of the
     * zone.
     *
     * @param {RecordType} recordType The type of DNS record in this record set. Record sets of type
     * SOA cannot be deleted (they are deleted when the DNS zone is deleted). Possible values include:
     * 'A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
     *
     * @param {RecordSetsDeleteMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType): Promise<msRest.RestResponse>;
    deleteMethod(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, options: Models.RecordSetsDeleteMethodOptionalParams): Promise<msRest.RestResponse>;
    deleteMethod(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, callback: msRest.ServiceCallback<void>): void;
    deleteMethod(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, options: Models.RecordSetsDeleteMethodOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * Gets a record set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {string} relativeRecordSetName The name of the record set, relative to the name of the
     * zone.
     *
     * @param {RecordType} recordType The type of DNS record in this record set. Possible values
     * include: 'A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType): Promise<Models.RecordSetsGetResponse>;
    get(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, options: msRest.RequestOptionsBase): Promise<Models.RecordSetsGetResponse>;
    get(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    get(resourceGroupName: string, zoneName: string, relativeRecordSetName: string, recordType: Models.RecordType, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecordSet>): void;
    /**
     * Lists the record sets of a specified type in a DNS zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {RecordType} recordType The type of record sets to enumerate. Possible values include:
     * 'A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT'
     *
     * @param {RecordSetsListByTypeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listByType(resourceGroupName: string, zoneName: string, recordType: Models.RecordType): Promise<Models.RecordSetsListByTypeResponse>;
    listByType(resourceGroupName: string, zoneName: string, recordType: Models.RecordType, options: Models.RecordSetsListByTypeOptionalParams): Promise<Models.RecordSetsListByTypeResponse>;
    listByType(resourceGroupName: string, zoneName: string, recordType: Models.RecordType, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listByType(resourceGroupName: string, zoneName: string, recordType: Models.RecordType, options: Models.RecordSetsListByTypeOptionalParams, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    /**
     * Lists all record sets in a DNS zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {RecordSetsListByDnsZoneOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listByDnsZone(resourceGroupName: string, zoneName: string): Promise<Models.RecordSetsListByDnsZoneResponse>;
    listByDnsZone(resourceGroupName: string, zoneName: string, options: Models.RecordSetsListByDnsZoneOptionalParams): Promise<Models.RecordSetsListByDnsZoneResponse>;
    listByDnsZone(resourceGroupName: string, zoneName: string, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listByDnsZone(resourceGroupName: string, zoneName: string, options: Models.RecordSetsListByDnsZoneOptionalParams, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    /**
     * Lists all record sets in a DNS zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {RecordSetsListAllByDnsZoneOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAllByDnsZone(resourceGroupName: string, zoneName: string): Promise<Models.RecordSetsListAllByDnsZoneResponse>;
    listAllByDnsZone(resourceGroupName: string, zoneName: string, options: Models.RecordSetsListAllByDnsZoneOptionalParams): Promise<Models.RecordSetsListAllByDnsZoneResponse>;
    listAllByDnsZone(resourceGroupName: string, zoneName: string, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listAllByDnsZone(resourceGroupName: string, zoneName: string, options: Models.RecordSetsListAllByDnsZoneOptionalParams, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    /**
     * Lists the record sets of a specified type in a DNS zone.
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
    listByTypeNext(nextPageLink: string): Promise<Models.RecordSetsListByTypeNextResponse>;
    listByTypeNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.RecordSetsListByTypeNextResponse>;
    listByTypeNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listByTypeNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    /**
     * Lists all record sets in a DNS zone.
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
    listByDnsZoneNext(nextPageLink: string): Promise<Models.RecordSetsListByDnsZoneNextResponse>;
    listByDnsZoneNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.RecordSetsListByDnsZoneNextResponse>;
    listByDnsZoneNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listByDnsZoneNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    /**
     * Lists all record sets in a DNS zone.
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
    listAllByDnsZoneNext(nextPageLink: string): Promise<Models.RecordSetsListAllByDnsZoneNextResponse>;
    listAllByDnsZoneNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.RecordSetsListAllByDnsZoneNextResponse>;
    listAllByDnsZoneNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
    listAllByDnsZoneNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecordSetListResult>): void;
}
//# sourceMappingURL=recordSets.d.ts.map