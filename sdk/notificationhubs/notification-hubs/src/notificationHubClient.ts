import { Installation, InstallationResponse, mapResponseToInstallation } from "./installation";
import {
  createPipelineFromOptions,
  HttpMethods,
  HttpOperationResponse,
  OperationOptions,
  parseXML,
  PipelineOptions,
  RequestPrepareOptions,
  RestError,
  ServiceClient,
  signingPolicy,
  stringifyXML,
  URLBuilder,
  WebResource
} from "@azure/core-http";
import { logger, parseConnectionString } from "@azure/core-amqp";
import { v4 as uuidv4 } from "uuid";
import {
  NativeRegistrationOptions,
  RegistrationDescription,
  RegistrationRequest,
  RegistrationUpdateRequest
} from "./registrationDescription";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import * as Constants from "./util/constants";
import { createSpan, getCanonicalCode } from "./util/tracing";
import {
  NotificationLike,
  NotificationOptions,
  NotificationOutcome,
  NotificationOutcomeState,
  RegistrationResult,
  ScheduledNotification,
  transformAdmNotification,
  transformAppleNotification,
  transformBaidiuNotificaiton,
  transformFcmLegacyNotificaiton,
  transformWindowsNotification
} from "./notification";
import * as url from "url";
import { NotificationHubOperationResponse } from "./interfaces";
import { serializeToAtomXmlRequest } from "./util/atomXmlHelper";
import { parseUrl } from "./util/parseUrl";

const USER_AGENT = "NHub/2020-06 (api-origin=JavaScriptSDK)";

export interface ETagOperationOptions extends OperationOptions {
  eTag?: string;
}

export type UpdateOperationType = "add" | "remove" | "replace";

export interface PartialUpdateOperation {
  op: UpdateOperationType;
  path: string;
  value: string;
}

export class NotificationHubClient extends ServiceClient {
  private _hubName: string;
  private _endpoint: string;
  private _credentials: SasServiceClientCredentials;
  private _debugSend: boolean;

  constructor(hubName: string, connectionString: string, options: PipelineOptions) {
    const conn = parseConnectionString(connectionString) as any;
    if (!conn.Endpoint) {
      throw new Error("Missing Endpoint in connection string.");
    }

    const fullyQualifiedNamespace = conn.Endpoint.match(".*://([^/]*)")[1];
    if (!fullyQualifiedNamespace) {
      throw new Error("Endpoint in the connection string is not valid.");
    }

    const credentials = new SasServiceClientCredentials(
      conn.SharedAccessKeyName!,
      conn.SharedAccessKey!
    );
    const authPolicy = signingPolicy(credentials);
    const serviceClientOptions = createPipelineFromOptions({ ...options }, authPolicy);

    super(credentials, serviceClientOptions);
    this._hubName = hubName;
    this._endpoint = fullyQualifiedNamespace;
    this._credentials = credentials;
    this._debugSend = false;
  }

  get debugSend() {
    return this._debugSend;
  }
  set debugSend(value: boolean) {
    this._debugSend = value;
  }

  /**
   *
   *
   * @param {Installation} installation
   * @param {OperationOptions} [options={}]
   * @returns {Promise<NotificationHubOperationResponse>}
   * @memberof NotificationHubClient
   */
  async createOrUpdateInstallation(
    installation: Installation,
    options: OperationOptions = {}
  ): Promise<NotificationHubOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-createOrUpdateInstallation",
      options
    );

    const url = this.getUrl(`${this._hubName}/installations/${installation.installationId}`);

    try {
      const webResource = this.createWebResource(url, "PUT", updatedOperationOptions);

      webResource.headers.set("Content-Type", "application/json");
      webResource.body = JSON.stringify(installation);
      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 200) {
        throw new RestError(
          `Error creating/updating installation for installation ID ${installation.installationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      return {
        _response: response
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *
   *
   * @param {string} installationId
   * @param {OperationOptions} [options={}]
   * @returns {Promise<NotificationHubOperationResponse>}
   * @memberof NotificationHubClient
   */
  async deleteInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<NotificationHubOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-deleteInstallation",
      options
    );

    const url = this.getUrl(`${this._hubName}/installations/${installationId}`);

    try {
      const webResource = this.createWebResource(url, "DELETE", updatedOperationOptions);

      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 204) {
        throw new RestError(
          `Error deleting installation for installation ID ${installationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      return {
        _response: response
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *
   *
   * @param {string} installationId
   * @param {OperationOptions} [options={}]
   * @returns {Promise<InstallationResponse>}
   * @memberof NotificationHubClient
   */
  async getInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<InstallationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-getInstallation",
      options
    );

    const url = this.getUrl(`${this._hubName}/installations/${installationId}`);

    try {
      const webResource = this.createWebResource(url, "GET", updatedOperationOptions);

      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 200) {
        throw new RestError(
          `Error getting installation for installation ID ${installationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      logger.verbose(`Received JSON based HTTP response: ${response.bodyAsText}`);

      if (!response.parsedBody) {
        throw new RestError(
          `Error getting installation for installation ID ${installationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      const installation = mapResponseToInstallation(response.parsedBody);

      return Object.assign(installation, {
        _response: response
      });
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *
   *
   * @param {string} installationId
   * @param {PartialUpdateOperation[]} operations
   * @param {OperationOptions} [options={}]
   * @returns {Promise<NotificationHubOperationResponse>}
   * @memberof NotificationHubClient
   */
  async patchInstallation(
    installationId: string,
    operations: PartialUpdateOperation[],
    options: OperationOptions = {}
  ): Promise<NotificationHubOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-patchInstallation",
      options
    );

    const url = this.getUrl(`${this._hubName}/installations/${installationId}`);

    try {
      const webResource = this.createWebResource(url, "PATCH", updatedOperationOptions);

      webResource.body = JSON.stringify(operations);
      webResource.headers.set("Content-Type", "application/json-patch+json");

      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 204) {
        throw new RestError(
          `Error getting installation for installation ID ${installationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      logger.verbose(`Received JSON based HTTP response: ${response.bodyAsText}`);

      return {
        _response: response
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async createRegistrationFromXml(
    registrationXml: string,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-createRegistration",
      options
    );

    const contentType = "application/atom+xml;type=entry;charset=utf-8";
    const url = this.getUrl(`${this._hubName}/registrations/`);

    try {
      const webResource = this.createWebResource(url, "POST", updatedOperationOptions);

      webResource.headers.set("Content-Type", contentType);
      webResource.body = registrationXml;

      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 201) {
        throw new RestError(
          "Error creating registration",
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      // TODO: Map to value coming back
      const xmlResponse = response.parsedBody as RegistrationDescription;
      return Object.assign(xmlResponse, {
        _response: response
      });
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *
   *
   * @param {RegistrationRequest} request
   * @param {NativeRegistrationOptions} [options={}]
   * @returns {Promise<RegistrationDescription>}
   * @memberof NotificationHubClient
   */
  async createRegistration(
    request: RegistrationRequest,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    let tags: string | undefined;
    if (options.tags) {
      tags = options.tags.join(", ");
    }

    let content;
    if (request.platformType === "adm") {
      content = serializeToAtomXmlRequest("AdmRegistrationDescription", {
        AdmRegistrationId: request.admRegistrationId,
        Tags: tags
      });
    } else if (request.platformType === "admtemplate") {
      content = serializeToAtomXmlRequest("AdmTemplateRegistrationDescription", {
        AdmRegistrationId: request.admRegistrationId,
        Tags: tags,
        BodyTemplate: `<![CDATA[${request.bodyTemplate}]] >`
      });
    } else if (request.platformType === "apple") {
      content = serializeToAtomXmlRequest("AppleRegistrationDescription", {
        DeviceToken: request.deviceToken,
        Tags: tags
      });
    } else if (request.platformType === "appletemplate") {
      let apnsHeaders = undefined;
      if (request.apnsHeaders) {
        if (!apnsHeaders) {
          apnsHeaders = "";
        }
        apnsHeaders += "<ApnsHeaders>";

        for (const [key, value] of Object.entries(request.apnsHeaders)) {
          apnsHeaders += `<ApnsHeader><Header>${key}</Header><Value>${value}</Value></ApnsHeader>`;
        }

        apnsHeaders += "<ApnsHeaders>";
      }
      content = serializeToAtomXmlRequest("AppleTemplateRegistrationDescription", {
        DeviceToken: request.deviceToken,
        Tags: tags,
        BodyTemplate: `<![CDATA[${request.bodyTemplate}]] >`
      });
    } else if (request.platformType === "baidu") {
      content = serializeToAtomXmlRequest("BaiduRegistrationDescription", {
        BaiduUserId: request.baiduUserId,
        BaiduChannelId: request.baiduChannelId,
        Tags: tags
      });
    } else if (request.platformType === "baidutemplate") {
      content = serializeToAtomXmlRequest("BaiduTemplateRegistrationDescription", {
        BaiduUserId: request.baiduUserId,
        BaiduChannelId: request.baiduChannelId,
        TemplateName: request.templateName,
        MessageType: request.messageType,
        Tags: tags,
        BodyTemplate: `<![CDATA[${request.bodyTemplate}]] >`
      });
    } else if (request.platformType === "gcm") {
      content = serializeToAtomXmlRequest("GcmRegistrationDescription", {
        GcmRegistrationId: request.fcmRegistrationId,
        Tags: tags
      });
    } else if (request.platformType === "gcmtemplate") {
      content = serializeToAtomXmlRequest("GcmTemplateRegistrationDescription", {
        GcmRegistrationId: request.fcmRegistrationId,
        Tags: tags,
        TemplateName: request.templateName,
        BodyTemplate: `<![CDATA[${request.bodyTemplate}]] >`
      });
    } else if (request.platformType === "windows") {
      content = serializeToAtomXmlRequest("WindowsRegistrationDescription", {
        ChannelUri: request.channelUri,
        SecondaryTileName: request.secondaryTileName,
        Tags: tags
      });
    } else if (request.platformType === "windowstemplate") {
      let wnsHeaders = "";
      if (request.wnsHeaders) {
        wnsHeaders += "<WnsHeaders>";

        for (const [key, value] of Object.entries(request.wnsHeaders)) {
          wnsHeaders += `<WnsHeader><Header>${key}</Header><Value>${value}</Value></WnsHeader>`;
        }

        wnsHeaders += "</WnsHeaders>";
      }
      content = serializeToAtomXmlRequest("WindowsTemplateRegistrationDescription", {
        ChannelUri: request.channelUri,
        SecondaryTileName: request.secondaryTileName,
        TemplateName: request.templateName,
        BodyTemplate: `<![CDATA[${request.bodyTemplate}]] >`,
        Tags: tags,
        WnsHeaders: wnsHeaders
      });
    } else {
      throw new Error("Platform unsupported");
    }

    const xmlRegistration = stringifyXML(content, { rootName: "entry" });
    return this.createRegistrationFromXml(xmlRegistration, options);
  }

  async updateRegistration(
    registration: RegistrationUpdateRequest,
    options?: OperationOptions
  ): Promise<RegistrationDescription> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-createAdmNativeRegistration",
      options
    );

    try {
      throw new Error("Not implemented");
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   *
   *
   * @param {string} registrationId
   * @param {ETagOperationOptions} [options={}]
   * @returns {Promise<NotificationHubOperationResponse>}
   * @memberof NotificationHubClient
   */
  async deleteRegistration(
    registrationId: string,
    options: ETagOperationOptions = {}
  ): Promise<NotificationHubOperationResponse> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-createAdmNativeRegistration",
      options
    );

    if (!options.eTag) {
      options.eTag = "*";
    }

    const contentType = "application/atom+xml;type=entry;charset=utf-8";
    const url = this.getUrl(`${this._hubName}/registrations/${registrationId}`);

    try {
      const webResource = this.createWebResource(url, "DELETE", updatedOperationOptions);
      webResource.headers.set("Content-Type", contentType);
      webResource.headers.set("If-Match", options.eTag);

      const response: HttpOperationResponse = await this.sendRequest(webResource);

      if (response.status !== 200) {
        throw new RestError(
          `Error deleting registration ID ${registrationId}`,
          RestError.REQUEST_SEND_ERROR,
          response.status,
          webResource,
          response
        );
      }

      return {
        _response: response
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async getNotificationResponse(
    notification: NotificationLike,
    deviceHandle?: string,
    options: NotificationOptions = {}
  ): Promise<[WebResource, HttpOperationResponse]> {
    let params: { [key: string]: string } | undefined;
    if (deviceHandle) {
      params = {
        direct: true.toString()
      };
    }

    const url = this.getUrl(`${this._hubName}/messages/`, params);

    if (!notification.headers) {
      notification.headers = {};
    }

    if (options.tags) {
      options.tagExpression = options.tags.join("||");
    }
    if (options.tagExpression) {
      notification.headers[Constants.HEADER_TAGS] = options.tagExpression;
    }

    if (deviceHandle) {
      notification.headers[Constants.HEADER_DEVICE_HANDLE] = deviceHandle;
    }

    if (notification.platform === "adm") {
      transformAdmNotification(notification);
    } else if (notification.platform === "apple") {
      transformAppleNotification(notification);
    } else if (notification.platform == "baidu") {
      transformBaidiuNotificaiton(notification);
    } else if (notification.platform === "gcm") {
      transformFcmLegacyNotificaiton(notification);
    } else if (notification.platform === "windows") {
      transformWindowsNotification(notification);
    } else {
      throw new Error("Unsupported platform type");
    }

    const webResource = this.createWebResource(url, "POST", options);

    webResource.headers.set("Content-Type", notification.contentType!);
    webResource.body = notification.body;
    Object.entries(notification.headers!).forEach(([key, value]) => {
      webResource.headers.set(key, value);
    });

    const response: HttpOperationResponse = await this.sendRequest(webResource);

    if (response.status !== 200) {
      throw new RestError(
        `Error sending notification`,
        RestError.REQUEST_SEND_ERROR,
        response.status,
        webResource,
        response
      );
    }

    return [webResource, response];
  }

  async processResponse(
    webResource: WebResource,
    response: HttpOperationResponse
  ): Promise<NotificationOutcome> {
    const trackingId = webResource.headers.get("TrackingId");
    let notificationId = "";
    const location = response.headers.get("Location");
    if (location) {
      const u = parseUrl(location);
      const splitUrl = u.pathname.split("/");
      notificationId = splitUrl[splitUrl.length - 1];
    }

    if (this._debugSend) {
      const responseXml = await parseXML(response.bodyAsText!, { includeRoot: true });

      const responses: RegistrationResult[] = [];
      if (responseXml.Results) {
        for (const resultItem of responseXml.Results) {
          responses.push({
            applicationPlatform: resultItem.ApplicationPlatform,
            pnsHandle: resultItem.PnsHandle,
            registrationId: resultItem.RegistrationId,
            outcome: resultItem.Outcome
          });
        }
      }

      return {
        state: NotificationOutcomeState.DetailedStateAvailable,
        trackingId: trackingId!,
        notificationId: notificationId,
        success: responseXml.Success,
        failure: responseXml.Failure,
        results: responses,
        _response: response
      };
    } else {
      return {
        state: NotificationOutcomeState.Enqueued,
        trackingId: trackingId!,
        notificationId: notificationId,
        success: 0,
        failure: 0,
        _response: response
      };
    }
  }

  async sendNotification(
    notification: NotificationLike,
    options: NotificationOptions = {}
  ): Promise<NotificationOutcome> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-sendNotification",
      options
    );

    try {
      const [webResource, response] = await this.getNotificationResponse(
        notification,
        undefined,
        updatedOperationOptions
      );
      return await this.processResponse(webResource, response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  async sendDirectNotification(
    notification: NotificationLike,
    deviceHandle: string,
    options: NotificationOptions = {}
  ): Promise<NotificationOutcome> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-sendNotification",
      options
    );

    try {
      const [webResource, response] = await this.getNotificationResponse(
        notification,
        deviceHandle,
        updatedOperationOptions
      );
      return await this.processResponse(webResource, response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  async scheduleNotification(
    notification: NotificationLike,
    scheduleTime: Date,
    options: NotificationOptions = {}
  ): Promise<ScheduledNotification> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-scheduleNotification",
      options
    );

    if (!notification.headers) {
      notification.headers = {};
    }

    notification.headers[Constants.HEADER_SCHEDULE] = scheduleTime.toISOString();

    try {
      const [webResource, response] = await this.getNotificationResponse(
        notification,
        undefined,
        updatedOperationOptions
      );

      const trackingId = webResource.headers.get("TrackingId");
      let notificationId = "";
      const location = response.headers.get("Location");
      if (location) {
        const u = parseUrl(location);
        const splitUrl = u.pathname.split("/");
        notificationId = splitUrl[splitUrl.length - 1];
      }

      return {
        trackingId: trackingId!,
        scheduledNotificationId: notificationId,
        payload: notification,
        tags: options.tagExpression,
        _response: response
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  createWebResource(url: string, method: HttpMethods, options: OperationOptions): WebResource {
    let webResource: WebResource = new WebResource(url, method);
    const token = this._credentials.getToken(this._endpoint).token;
    webResource.headers.set("Authorization", token);
    webResource.headers.set("User-Agent", USER_AGENT);
    webResource.headers.set("x-ms-version", Constants.CURRENT_API_VERSION);
    webResource.headers.set("TrackingId", uuidv4());

    const reqPrepareOptions: RequestPrepareOptions = {
      ...webResource,
      headers: options.requestOptions?.customHeaders,
      onUploadProgress: options.requestOptions?.onUploadProgress,
      onDownloadProgress: options.requestOptions?.onDownloadProgress,
      abortSignal: options.abortSignal,
      spanOptions: options.tracingOptions?.spanOptions
    };

    webResource = webResource.prepare(reqPrepareOptions);
    webResource.timeout = options.requestOptions?.timeout || 0;

    return webResource;
  }

  private getUrl(path: string, queryParams?: { [key: string]: string }): string {
    const baseUri = `https://${this._endpoint}/${path}`;

    const requestUrl: URLBuilder = URLBuilder.parse(baseUri);
    requestUrl.setQueryParameter(Constants.API_VERSION_QUERY_KEY, Constants.CURRENT_API_VERSION);

    if (queryParams) {
      for (const key of Object.keys(queryParams)) {
        requestUrl.setQueryParameter(key, queryParams[key]);
      }
    }

    return requestUrl.toString();
  }
}
