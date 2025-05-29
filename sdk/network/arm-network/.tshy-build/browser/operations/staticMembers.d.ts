import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { StaticMembers } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { StaticMember, StaticMembersListOptionalParams, StaticMembersGetOptionalParams, StaticMembersGetResponse, StaticMembersCreateOrUpdateOptionalParams, StaticMembersCreateOrUpdateResponse, StaticMembersDeleteOptionalParams } from "../models/index.js";
/** Class containing StaticMembers operations. */
export declare class StaticMembersImpl implements StaticMembers {
    private readonly client;
    /**
     * Initialize a new instance of the class StaticMembers class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists the specified static member.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, networkGroupName: string, options?: StaticMembersListOptionalParams): PagedAsyncIterableIterator<StaticMember>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the specified static member.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param staticMemberName The name of the static member.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, networkGroupName: string, staticMemberName: string, options?: StaticMembersGetOptionalParams): Promise<StaticMembersGetResponse>;
    /**
     * Creates or updates a static member.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param staticMemberName The name of the static member.
     * @param parameters Parameters supplied to the specify the static member to create
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, networkManagerName: string, networkGroupName: string, staticMemberName: string, parameters: StaticMember, options?: StaticMembersCreateOrUpdateOptionalParams): Promise<StaticMembersCreateOrUpdateResponse>;
    /**
     * Deletes a static member.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param staticMemberName The name of the static member.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, networkManagerName: string, networkGroupName: string, staticMemberName: string, options?: StaticMembersDeleteOptionalParams): Promise<void>;
    /**
     * Lists the specified static member.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param networkGroupName The name of the network group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=staticMembers.d.ts.map