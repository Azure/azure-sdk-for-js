import { Installation, mapResponseToInstallation } from "./installation";
import {
  createPipelineFromOptions,
  HttpMethods,
  HttpOperationResponse,
  OperationOptions,
  PipelineOptions,
  RequestPrepareOptions,
  RestError,
  ServiceClient,
  signingPolicy,
  URLBuilder,
  WebResource
} from "@azure/core-http";
import { logger, parseConnectionString } from "@azure/core-amqp";
import { v4 as uuidv4 } from "uuid";
import { RegistrationDescription } from "./registrationDescription";
import { SasServiceClientCredentials } from "./util/sasServiceClientCredentials";
import * as Constants from "./util/constants";
import { createSpan, getCanonicalCode } from "./util/tracing";
import {
  NativeNotification,
  NotificationOptions,
  NotificationOutcome,
  NotificationOutcomeState,
  transformAdmNotification,
  transformAppleNotification,
  transformBaidiuNotificaiton,
  transformFcmLegacyNotificaiton,
  transformWindowsNotification
} from "./notification";

const USER_AGENT = "NHub/2020-06 (api-origin=JavaScriptSDK)";

export interface ETagOperationOptions extends OperationOptions {
  eTag?: string;
}

export interface NativeRegistrationOptions extends OperationOptions {
  tags?: Iterable<string>;
  platformType?: string;
  registrationType?: string;
}

export interface TemplateRegistrationOptions extends NativeRegistrationOptions {
  bodyTemplate: string;
}

export type UpdateOperationType = "add" | "remove" | "replace";

export interface PartialUpdateOperation {
  op: UpdateOperationType;
  path: string;
  value: string;
}

export interface InstallationResponse extends Installation {
  _response: HttpOperationResponse;
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

  async createOrUpdateInstallation(
    installation: Installation,
    options: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
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

      return response;
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

  async deleteInstallation(
    installationId: string,
    options: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
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

      return response;
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

  async patchInstallation(
    installationId: string,
    operations: PartialUpdateOperation[],
    options: OperationOptions = {}
  ): Promise<HttpOperationResponse> {
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

      return response;
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

  private async createRegistration(
    registrationXml: string,
    options: OperationOptions = {}
  ): Promise<RegistrationDescription> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-createRegistration",
      options
    );

    const url = this.getUrl(`${this._hubName}/registrations/`);

    try {
      const webResource = this.createWebResource(url, "POST", updatedOperationOptions);

      webResource.headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
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

  async createAdmNativeRegistration(
    admRegistrationId: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createAdmTemplateRegistration(
    admRegistrationId: string,
    bodyTemplate: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createAppleNativeRegistration(
    deviceToken: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createAppleTemplateRegistration(
    deviceToken: string,
    bodyTemplate: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createBaiduNativeRegistration(
    userId: string,
    channelId: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createBaiduTemplateRegistration(
    userId: string,
    channelId: string,
    bodyTemplate: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createFcmLegacyNativeRegistration(
    fcmRegistrationId: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createFcmLegacyTemplateRegistration(
    fcmRegistrationId: string,
    bodyTemplate: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async createMpnsNativeRegistration(
    channelUri: string,
    options?: NativeRegistrationOptions
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  createMpnsTemplateRegistration(
    channelUri: string,
    bodyTemplate: string,
    options: NativeRegistrationOptions = {}
  ): Promise<RegistrationDescription> {
    // TODO: Turn into XML
    const xmlRegistration = "";
    return this.createRegistration(xmlRegistration, options);
  }

  async deleteRegistration(registrationId: string, options?: ETagOperationOptions): Promise<void> {
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

  async updateRegistration<TRegistration extends RegistrationDescription>(
    registration: TRegistration,
    options?: OperationOptions
  ): Promise<TRegistration> {
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

  async sendNotification(
    notification: NativeNotification,
    options: NotificationOptions = {}
  ): Promise<NotificationOutcome> {
    const { span, updatedOperationOptions } = createSpan(
      "NotificationHubClient-sendNotification",
      options
    );

    let params: { [key: string]: string } | undefined;
    if (options.deviceHandle) {
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

    if (options.deviceHandle) {
      notification.headers[Constants.HEADER_DEVICE_HANDLE] = options.deviceHandle;
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

    try {
      const webResource = this.createWebResource(url, "POST", updatedOperationOptions);

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

      const trackingId = webResource.headers.get("TrackingId");

      if (this._debugSend) {
        // TODO: XML Parse
        return {
          state: NotificationOutcomeState.Enqueued,
          trackingId: trackingId!,
          success: 0,
          failure: 0,
          _response: response
        };
      } else {
        return {
          state: NotificationOutcomeState.Enqueued,
          trackingId: trackingId!,
          location: response.headers.get("Location"),
          success: 0,
          failure: 0,
          _response: response
        };
      }
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
