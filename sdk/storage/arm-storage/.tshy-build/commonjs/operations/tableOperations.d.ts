import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TableOperations } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { Table, TableListOptionalParams, TableCreateOptionalParams, TableCreateResponse, TableUpdateOptionalParams, TableUpdateResponse, TableGetOptionalParams, TableGetResponse, TableDeleteOptionalParams } from "../models/index.js";
/** Class containing TableOperations operations. */
export declare class TableOperationsImpl implements TableOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class TableOperations class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * Gets a list of all the tables under the specified storage account
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: TableListOptionalParams): PagedAsyncIterableIterator<Table>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates a new table with the specified table name, under the specified account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param tableName A table name must be unique within a storage account and must be between 3 and 63
     *                  characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric
     *                  character.
     * @param options The options parameters.
     */
    create(resourceGroupName: string, accountName: string, tableName: string, options?: TableCreateOptionalParams): Promise<TableCreateResponse>;
    /**
     * Creates a new table with the specified table name, under the specified account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param tableName A table name must be unique within a storage account and must be between 3 and 63
     *                  characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric
     *                  character.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, accountName: string, tableName: string, options?: TableUpdateOptionalParams): Promise<TableUpdateResponse>;
    /**
     * Gets the table with the specified table name, under the specified account if it exists.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param tableName A table name must be unique within a storage account and must be between 3 and 63
     *                  characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric
     *                  character.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, tableName: string, options?: TableGetOptionalParams): Promise<TableGetResponse>;
    /**
     * Deletes the table with the specified table name, under the specified account if it exists.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param tableName A table name must be unique within a storage account and must be between 3 and 63
     *                  characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric
     *                  character.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, accountName: string, tableName: string, options?: TableDeleteOptionalParams): Promise<void>;
    /**
     * Gets a list of all the tables under the specified storage account
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=tableOperations.d.ts.map