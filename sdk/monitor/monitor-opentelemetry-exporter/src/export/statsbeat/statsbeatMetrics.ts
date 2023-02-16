// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpMethods,
} from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import {
  AIMS_API_VERSION,
  AIMS_FORMAT,
  AIMS_URI,
  EU_CONNECTION_STRING,
  EU_ENDPOINTS,
  NON_EU_CONNECTION_STRING,
  StatsbeatResourceProvider,
  VirtualMachineInfo,
} from "./types";

const os = require("os");

export class StatsbeatMetrics {
  protected _resourceProvider: string = StatsbeatResourceProvider.unknown;
  protected _vmInfo: VirtualMachineInfo = {};
  protected _os: string = os.type();
  protected _resourceIdentifier = "";

  protected async _getResourceProvider(): Promise<void> {
    // Check resource provider
    this._resourceProvider = StatsbeatResourceProvider.unknown;
    if (process.env.WEBSITE_SITE_NAME) {
      // Web apps
      this._resourceProvider = StatsbeatResourceProvider.appsvc;
    } else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
      // Function apps
      this._resourceProvider = StatsbeatResourceProvider.functions;
    } else if (await this.getAzureComputeMetadata()) {
      this._resourceProvider = StatsbeatResourceProvider.vm;
      this._resourceIdentifier = this._vmInfo.id + "/" + this._vmInfo.subscriptionId;
      // Overrride OS as VM info have higher precedence
      if (this._vmInfo.osType) {
        this._os = this._vmInfo.osType;
      }
    } else {
      this._resourceProvider = StatsbeatResourceProvider.unknown;
    }
  }

  public async getAzureComputeMetadata(): Promise<boolean> {
    const httpClient = createDefaultHttpClient();
    const method: HttpMethods = "GET";

    const options = {
      url: `${AIMS_URI}?${AIMS_API_VERSION}&${AIMS_FORMAT}`,
      timeout: 5000, // 5 seconds
      method: method,
      allowInsecureConnection: true,
    };
    const request = createPipelineRequest(options);

    await httpClient
      .sendRequest(request)
      .then((res: any) => {
        if (res.status === 200) {
          // Success; VM
          this._vmInfo.isVM = true;
          let virtualMachineData = "";
          res.on("data", (data: any) => {
            virtualMachineData += data;
          });
          res.on("end", () => {
            try {
              let data = JSON.parse(virtualMachineData);
              this._vmInfo.id = data["vmId"] || "";
              this._vmInfo.subscriptionId = data["subscriptionId"] || "";
              this._vmInfo.osType = data["osType"] || "";
            } catch (error) {
              diag.debug("Failed to parse JSON: ", error);
            }
          });
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
    return false;
  }

  protected _getConnectionString(endpointUrl: string) {
    let currentEndpoint = endpointUrl;
    for (let i = 0; i < EU_ENDPOINTS.length; i++) {
      if (currentEndpoint.includes(EU_ENDPOINTS[i])) {
        return EU_CONNECTION_STRING;
      }
    }
    return NON_EU_CONNECTION_STRING;
  }
}
