import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { EventRoutes } from "../operationsInterfaces/index.js";
import { AzureDigitalTwinsAPI } from "../azureDigitalTwinsAPI.js";
import { EventRoute, EventRoutesListOptionalParams, EventRoutesGetByIdOptionalParams, EventRoutesGetByIdResponse, EventRoutesAddOptionalParams, EventRoutesDeleteOptionalParams } from "../models/index.js";
/** Class containing EventRoutes operations. */
export declare class EventRoutesImpl implements EventRoutes {
    private readonly client;
    /**
     * Initialize a new instance of the class EventRoutes class.
     * @param client Reference to the service client
     */
    constructor(client: AzureDigitalTwinsAPI);
    /**
     * Retrieves all event routes.
     * Status codes:
     * * 200 OK
     * @param options The options parameters.
     */
    list(options?: EventRoutesListOptionalParams): PagedAsyncIterableIterator<EventRoute>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves all event routes.
     * Status codes:
     * * 200 OK
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves an event route.
     * Status codes:
     * * 200 OK
     * * 404 Not Found
     *   * EventRouteNotFound - The event route was not found.
     * @param id The id for an event route. The id is unique within event routes and case sensitive.
     * @param options The options parameters.
     */
    getById(id: string, options?: EventRoutesGetByIdOptionalParams): Promise<EventRoutesGetByIdResponse>;
    /**
     * Adds or replaces an event route.
     * Status codes:
     * * 204 No Content
     * * 400 Bad Request
     *   * EventRouteEndpointInvalid - The endpoint provided does not exist or is not active.
     *   * EventRouteFilterInvalid - The event route filter is invalid.
     *   * EventRouteIdInvalid - The event route id is invalid.
     *   * LimitExceeded - The maximum number of event routes allowed has been reached.
     * @param id The id for an event route. The id is unique within event routes and case sensitive.
     * @param eventRoute The event route data
     * @param options The options parameters.
     */
    add(id: string, eventRoute: EventRoute, options?: EventRoutesAddOptionalParams): Promise<void>;
    /**
     * Deletes an event route.
     * Status codes:
     * * 204 No Content
     * * 404 Not Found
     *   * EventRouteNotFound - The event route was not found.
     * @param id The id for an event route. The id is unique within event routes and case sensitive.
     * @param options The options parameters.
     */
    delete(id: string, options?: EventRoutesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=eventRoutes.d.ts.map