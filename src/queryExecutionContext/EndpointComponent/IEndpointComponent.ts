import { Response } from "../../request/request";

/** @hidden */
export interface IEndpointComponent {
  nextItem: () => Promise<Response<any>>;
  current: () => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: () => Promise<Response<any>>;
}
