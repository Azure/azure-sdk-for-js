import { IHeaders } from ".";
import { Response } from "../request";

export interface IExecutionContext {
    nextItem: () => Promise<Response<any>>;
    current: () => Promise<Response<any>>;
    hasMoreResults: () => boolean;
    fetchMore?: () => Promise<Response<any>>; // TODO: code smell
}
