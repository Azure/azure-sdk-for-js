// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * Abstract base event class to house common event request attributes.
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
 * Event request class extended the related response and event data (payload) objects.
 */
export interface AuthenticationEventRequest<
  TResponse extends AuthenticationEventResponse,
  TData extends AuthenticationEventData
> extends AuthenticationEventRequestCommon {
  /** Related IEventResponse */
  response: TResponse;
  /** Related IEventData */
  payload: TData;
}

/**
 * Event request class extended the related response and event data (payload) objects for cloud events.
 */
export interface CloudEventRequest<
  TResponse extends AuthenticationEventResponse,
  TData extends AuthenticationEventData
> extends AuthenticationEventRequest<TResponse, TData> {
  /** Related Source */
  source: string;
  /** Related \@odata.type */
  oDataType: string;
}

/**
 * Event response class that houses attributes returned from the authentication events trigger.
 */
export interface AuthenticationEventResponse {
  /** A template of the body of the expected response. */
  body: string;
}

/**
 * Event data class pertaining to the expected payload, this class houses the common attributes for data events.
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
 * Class that binds a response that has actions
 */
export interface ActionableResponse<TEventAction extends AuthenticationEventAction>
  extends AuthenticationEventResponse {
  /** Collections of actions pertaining to the event. */
  actions: TEventAction[];
}

export interface ActionableCloudEventResponse<TEventAction extends AuthenticationEventAction>
  extends ActionableResponse<TEventAction> {
  oDataType: string;
}

/**
 * A class representing an action for an event.
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
export interface FailedRequest {
  error: string;
}

/**
 * Helper function to create a files request
 * @param error - string or exception
 * @returns a valid FailedRequest object
 */
export function createFailedRequest(error: string | Error): FailedRequest {
  return {
    error: error instanceof Error ? error.message : error,
  };
}
