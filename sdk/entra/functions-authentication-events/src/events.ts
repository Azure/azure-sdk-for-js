// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Abstract base event interface to house common event request attributes.
 */
export interface AuthenticationEventRequestCommon {
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
 * Event request interface extended the related response and event data (payload) objects.
 */
export interface AuthenticationEventRequest<
  TResponse extends AuthenticationEventResponse,
  TData extends AuthenticationEventData,
> extends AuthenticationEventRequestCommon {
  /** Related IEventResponse */
  response: TResponse;
  /** Related IEventData */
  payload: TData;
}

/**
 * Event request interface extended the related response and event data (payload) objects for cloud events.
 */
export interface CloudEventRequest<
  TResponse extends AuthenticationEventResponse,
  TData extends AuthenticationEventData,
> extends AuthenticationEventRequest<TResponse, TData> {
  /** Related Source */
  source: string;
  /** Related \@odata.type */
  oDataType: string;
}

/**
 * Event response interface that houses attributes returned from the authentication events trigger.
 */
export interface AuthenticationEventResponse {
  /** A template of the body of the expected response. */
  body: string;
}

/**
 * Event data interface pertaining to the expected payload, this interface houses the common attributes for data events.
 */
export interface AuthenticationEventData {
  /** Tenant the request is related to. */
  tenantId: string;
  /** Unique Id for the event. */
  authenticationEventListenerId: string;
  /** The unique internal Id of the registered custom extension. */
  customAuthenticationExtensionId: string;
}

/**
 * An interface that binds a response that has actions
 */
export interface ActionableResponse<
  TEventAction extends AuthenticationEventAction,
> extends AuthenticationEventResponse {
  /** Collections of actions pertaining to the event. */
  actions: TEventAction[];
}

/**
 * An interface for any responses that implement an cloud event payload and has actions on it.
 */
export interface ActionableCloudEventResponse<
  TEventAction extends AuthenticationEventAction,
> extends ActionableResponse<TEventAction> {
  /** Gets the Cloud Event \@odata.type. */
  oDataType: string;
}

/**
 * An interface representing an action for an event.
 */
export interface AuthenticationEventAction {
  /** Must be overridden, this will be the 'Name' of the action in the JSON. */
  actionType: string;
}

/**
 * The status of the request.
 */
export type RequestStatus = "Failed" | "TokenInvalid" | "Successful";

/**
 * Return the correctly formatted error
 * */
export interface FailedRequest extends AuthenticationEventResponse {
  //* * The error that caused the request to fail. */
  error: string;
}

/**
 * Helper function to create a files request
 * @param error - string or exception
 * @returns a valid FailedRequest object
 */
export function createFailedRequest(error: unknown): FailedRequest {
  return {
    body: "",
    error: error instanceof Error ? error.message : String(error),
  };
}
