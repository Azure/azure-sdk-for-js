import { Agent, OutgoingHttpHeaders } from "http";
import { RequestOptions } from "https"; // TYPES ONLY
import * as querystring from "querystring";
import { Constants, IHeaders } from "..";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { RetryUtility } from "../retry";
import { bodyFromData, createRequestObject, parse, Response } from "./request";
import { RequestContext } from "./RequestContext";

/** @hidden */
export class RequestHandler {
  public constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private connectionPolicy: ConnectionPolicy,
    private requestAgent: Agent
  ) {}
  public static async createRequestObjectStub(
    connectionPolicy: ConnectionPolicy,
    requestOptions: RequestOptions,
    body: Buffer
  ) {
    return createRequestObject(connectionPolicy, requestOptions, body);
  }

  /**
   *  Creates the request object, call the passed callback when the response is retrieved.
   * @param {object} globalEndpointManager - an instance of GlobalEndpointManager class.
   * @param {object} connectionPolicy - an instance of ConnectionPolicy that has the connection configs.
   * @param {object} requestAgent - the https agent used for send request
   * @param {string} method - the http request method ( 'get', 'post', 'put', .. etc ).
   * @param {String} hostname - The base url for the endpoint.
   * @param {string} path - the path of the requesed resource.
   * @param {Object} data - the request body. It can be either string, buffer, or undefined.
   * @param {Object} queryParams - query parameters for the request.
   * @param {Object} headers - specific headers for the request.
   * @param {function} callback - the callback that will be called when the response is retrieved and processed.
   */
  public static async request(
    globalEndpointManager: GlobalEndpointManager,
    connectionPolicy: ConnectionPolicy,
    requestAgent: Agent,
    method: string,
    hostname: string,
    request: RequestContext,
    data: string | Buffer,
    queryParams: any, // TODO: any query params types
    headers: IHeaders
  ): Promise<Response<any>> {
    // TODO: any
    const path = (request as { path: string }).path === undefined ? request : (request as { path: string }).path;
    let body: any; // TODO: any

    if (data) {
      body = bodyFromData(data);
      if (!body) {
        return {
          result: {
            message: "parameter data must be a javascript object, string, or Buffer"
          },
          headers: undefined
        };
      }
    }

    let buffer;
    if (body) {
      if (Buffer.isBuffer(body)) {
        buffer = body;
      } else if (typeof body === "string") {
        buffer = Buffer.from(body, "utf8");
      } else {
        return {
          result: {
            message: "body must be string or Buffer"
          },
          headers: undefined
        };
      }
    }

    const requestOptions: RequestOptions = parse(hostname);
    requestOptions.method = method;
    requestOptions.path += path;
    requestOptions.headers = headers as OutgoingHttpHeaders;
    requestOptions.agent = requestAgent;
    requestOptions.secureProtocol = "TLSv1_client_method"; // TODO: Should be a constant

    if (connectionPolicy.DisableSSLVerification === true) {
      requestOptions.rejectUnauthorized = false;
    }

    if (queryParams) {
      requestOptions.path += "?" + querystring.stringify(queryParams);
    }

    if (buffer) {
      requestOptions.headers[Constants.HttpHeaders.ContentLength] = buffer.length;
      return RetryUtility.execute(
        globalEndpointManager,
        buffer,
        this.createRequestObjectStub,
        connectionPolicy,
        requestOptions,
        request
      );
    } else {
      return RetryUtility.execute(
        globalEndpointManager,
        null,
        this.createRequestObjectStub,
        connectionPolicy,
        requestOptions,
        request
      );
    }
  }

  /** @ignore */
  public get(urlString: string, request: RequestContext, headers: IHeaders) {
    // TODO: any
    return RequestHandler.request(
      this.globalEndpointManager,
      this.connectionPolicy,
      this.requestAgent,
      "GET",
      urlString,
      request,
      undefined,
      "",
      headers
    );
  }

  /** @ignore */
  public post(urlString: string, request: RequestContext, body: any, headers: IHeaders) {
    // TODO: any
    return RequestHandler.request(
      this.globalEndpointManager,
      this.connectionPolicy,
      this.requestAgent,
      "POST",
      urlString,
      request,
      body,
      "",
      headers
    );
  }

  /** @ignore */
  public put(urlString: string, request: RequestContext, body: any, headers: IHeaders) {
    // TODO: any
    return RequestHandler.request(
      this.globalEndpointManager,
      this.connectionPolicy,
      this.requestAgent,
      "PUT",
      urlString,
      request,
      body,
      "",
      headers
    );
  }

  /** @ignore */
  public head(urlString: string, request: any, headers: IHeaders) {
    // TODO: any
    return RequestHandler.request(
      this.globalEndpointManager,
      this.connectionPolicy,
      this.requestAgent,
      "HEAD",
      urlString,
      request,
      undefined,
      "",
      headers
    );
  }

  /** @ignore */
  public delete(urlString: string, request: RequestContext, headers: IHeaders) {
    return RequestHandler.request(
      this.globalEndpointManager,
      this.connectionPolicy,
      this.requestAgent,
      "DELETE",
      urlString,
      request,
      undefined,
      "",
      headers
    );
  }
}
