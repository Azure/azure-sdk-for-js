import * as coreClient from "@azure/core-client";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import { DeviceUpdateImpl, DeviceManagementImpl } from "./operations";
import { DeviceUpdate, DeviceManagement } from "./operationsInterfaces";
import { DeviceUpdateClientOptionalParams } from "./models";

export class DeviceUpdateClient extends coreClient.ServiceClient {
  endpoint: string;
  instanceId: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the DeviceUpdateClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint Account endpoint.
   * @param instanceId Account instance identifier.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    endpoint: string,
    instanceId: string,
    options?: DeviceUpdateClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }
    if (instanceId === undefined) {
      throw new Error("'instanceId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: DeviceUpdateClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials
    };

    const packageDetails = `azsdk-js-device-update/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri: options.endpoint ?? options.baseUri ?? "https://{endpoint}"
    };
    super(optionsWithDefaults);
    // Parameter assignments
    this.endpoint = endpoint;
    this.instanceId = instanceId;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2022-07-01-preview";
    this.deviceUpdate = new DeviceUpdateImpl(this);
    this.deviceManagement = new DeviceManagementImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return item.replace(/(?<==).*$/, apiVersion);
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      }
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  deviceUpdate: DeviceUpdate;
  deviceManagement: DeviceManagement;
}
