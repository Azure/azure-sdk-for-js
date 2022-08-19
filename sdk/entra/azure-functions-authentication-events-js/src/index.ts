// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export * from "./configurationClient";

/**
 * Abstract base event class to house common event request attributes.
 * @beta
 */
export interface AuthEventRequestBase {
  /** Related Type */
  type: string;
  /** The status of the current request, see RequestStatus. */
  requestStatus: RequestStatus;
  /** A user friendly message (containing errors), that the authentication event returns. */
  statusMessage: string;
  /** A dictionary of query string parameters */
  queryParameters: Record<string, string>;
}

/**
 * Event request class extended the related response and event data (payload) objects.
 * @beta
 */
export interface AuthEventRequest<
  TResponse extends AuthEventResponse,
  TData extends AuthEventData
> extends AuthEventRequestBase {
  /** Related IEventResponse */
  response: TResponse;
  /** Related IEventData */
  payload: TData;
}

/**
 * Event request class extended the related response and event data (payload) objects for cloud events.
 * @beta
 */
export interface CloudEventRequest<
  TResponse extends AuthEventResponse,
  TData extends AuthEventData
> extends AuthEventRequest<TResponse, TData> {
  /** Related Source */
  source: string;
  /** Related \@odata.type */
  oDataType: string;
}

/**
 * Event response class that houses attributes returned from the authentication events trigger.
 * @beta
 */
export interface AuthEventResponse {
  /** A template of the body of the expected response. */
  body: string;
}

/**
 * Event data class pertaining to the expected payload, this class houses the common attributes for data events.
 * @beta
 */
export interface AuthEventData {
  /** Tenant the request is related to. */
  tenantId: string;
  /** Unique Id for the event. */
  authenticationEventListenerId: string;
  /** The unique internal Id of the registered custom extension. */
  customAuthenticationExtensionId: string;
}

/**
 * Class that binds a response that has actions
 * @beta
 */
export interface ActionableResponse<TEventAction extends AuthEventAction>
  extends AuthEventResponse {
  /** Collections of actions pertaining to the event. */
  actions: TEventAction[];
}

export interface ActionableCloudEventResponse<
  TEventAction extends AuthEventAction
> extends ActionableResponse<TEventAction> {
  oDataType: string;
}

/**
 * A class representing an action for an event.
 * @beta
 */
export interface AuthEventAction {
  /** Must be overridden, this will be the 'Name' of the action in the JSON. */
  actionType: string;
}

/**
 * The status of the request.
 * @beta
 */
export type RequestStatus = "Failed" | "TokenInvalid" | "Successful";

/**
 * Return the correctly formatted error
 * @beta
 * */
export interface FailedRequest {
  error: string;
}

/**
 * Helper function to create a files request
 * @param error - string or exception
 * @returns a valid FailedRequest object
 * @beta
 */
export function createFailedRequest(error: string | Error): FailedRequest {
  return {
    error: error instanceof Error ? error.message : error,
  };
}
