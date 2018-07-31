import { PermissionMode } from "../../documents";
import { PermissionDefinition } from "./PermissionDefinition";

export interface PermissionBody extends PermissionDefinition {
  /** System generated property. The resource ID (_rid) is a unique identifier that is also hierarchical per the resource stack on the resource model. It is used internally for placement and navigation of the permission resource. */
  _rid: string;
  /** System generated property. Specifies the last updated timestamp of the resource. The value is a timestamp. */
  _ts: string;
  /** System generated property. The unique addressable URI for the resource. */
  _self: string;
  /** System generated property. Represents the resource etag required for optimistic concurrency control. */
  _etag: string;
  /** System generated resource token for the particular resource and user */
  _token: string;
}
