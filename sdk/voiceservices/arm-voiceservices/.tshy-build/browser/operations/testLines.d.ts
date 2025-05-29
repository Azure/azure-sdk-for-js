import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TestLines } from "../operationsInterfaces/index.js";
import { MicrosoftVoiceServices } from "../microsoftVoiceServices.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { TestLine, TestLinesListByCommunicationsGatewayOptionalParams, TestLinesGetOptionalParams, TestLinesGetResponse, TestLinesCreateOrUpdateOptionalParams, TestLinesCreateOrUpdateResponse, TestLinesDeleteOptionalParams, TestLineUpdate, TestLinesUpdateOptionalParams, TestLinesUpdateResponse } from "../models/index.js";
/** Class containing TestLines operations. */
export declare class TestLinesImpl implements TestLines {
    private readonly client;
    /**
     * Initialize a new instance of the class TestLines class.
     * @param client Reference to the service client
     */
    constructor(client: MicrosoftVoiceServices);
    /**
     * List TestLine resources by CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param options The options parameters.
     */
    listByCommunicationsGateway(resourceGroupName: string, communicationsGatewayName: string, options?: TestLinesListByCommunicationsGatewayOptionalParams): PagedAsyncIterableIterator<TestLine>;
    private listByCommunicationsGatewayPagingPage;
    private listByCommunicationsGatewayPagingAll;
    /**
     * List TestLine resources by CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param options The options parameters.
     */
    private _listByCommunicationsGateway;
    /**
     * Get a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param options The options parameters.
     */
    get(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, options?: TestLinesGetOptionalParams): Promise<TestLinesGetResponse>;
    /**
     * Create a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param resource Resource create parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, resource: TestLine, options?: TestLinesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<TestLinesCreateOrUpdateResponse>, TestLinesCreateOrUpdateResponse>>;
    /**
     * Create a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param resource Resource create parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, resource: TestLine, options?: TestLinesCreateOrUpdateOptionalParams): Promise<TestLinesCreateOrUpdateResponse>;
    /**
     * Delete a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, options?: TestLinesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, options?: TestLinesDeleteOptionalParams): Promise<void>;
    /**
     * Update a TestLine
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param testLineName Unique identifier for this test line
     * @param properties The resource properties to be updated.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, communicationsGatewayName: string, testLineName: string, properties: TestLineUpdate, options?: TestLinesUpdateOptionalParams): Promise<TestLinesUpdateResponse>;
    /**
     * ListByCommunicationsGatewayNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param nextLink The nextLink from the previous successful call to the ListByCommunicationsGateway
     *                 method.
     * @param options The options parameters.
     */
    private _listByCommunicationsGatewayNext;
}
//# sourceMappingURL=testLines.d.ts.map