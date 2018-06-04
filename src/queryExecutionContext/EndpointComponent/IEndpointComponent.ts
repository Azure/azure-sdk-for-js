import { IHeaders } from "..";
import { Response } from "../../request";

export interface IEndpointComponent {
    nextItem: () => Promise<Response<any>>;
    current: () => Promise<Response<any>>;
    hasMoreResults: () => boolean;
    fetchMore?: () => Promise<Response<any>>;
}
