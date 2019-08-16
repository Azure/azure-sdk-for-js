import { AppConfigCredential } from "./appConfigCredential";
import { TokenCredential } from "@azure/core-http";
import { ConfigurationClient } from "./generated/configurationClient";

import * as Models from "./generated/models";

const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
  json: ["application/vnd.microsoft.appconfig.kvset+json"]
}

export class AppConfigurationClient {
  private client: ConfigurationClient;

  constructor(connectionString: string);
  constructor(uri: string, credential: TokenCredential);
  constructor(uriOrConnectionString: string, credential?: TokenCredential) {
    const regexMatch = uriOrConnectionString.match(ConnectionStringRegex);
    if (regexMatch) {
      const credential = new AppConfigCredential(regexMatch[2], regexMatch[3])
      this.client = new ConfigurationClient(credential, {
        baseUri: regexMatch[1],
        deserializationContentTypes
      })
    } else if (credential && credential.constructor.name === "ManagedIdentityCredential") {
      this.client = new ConfigurationClient(credential, {
        baseUri: uriOrConnectionString,
        deserializationContentTypes
      })
    } else {
      throw new Error("You must provide either a connection string or a URL and a ManagedIdentityCredential.")
    }
  }

  listConfigurationSettings(options?: Models.ConfigurationClientListConfigurationSettingsOptionalParams): Promise<Models.ListConfigurationSettingsResponse> {
    return this.client.listConfigurationSettings(options);
  }

  // TODO: Add more methods here, without exposing internal model types.
}
