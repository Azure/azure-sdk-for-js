import { Resource } from "../Resource";

export interface PermissionBody {
  /** System generated resource token for the particular resource and user */
  _token: string;
}
