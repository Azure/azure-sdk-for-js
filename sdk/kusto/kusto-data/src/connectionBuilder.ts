// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeResponse } from "@azure/msal-common";
import { KeyOfType } from "./typeUtils";

interface MappingType {
  mappedTo: string;
  validNames: string[];
  isSecret?: boolean;
  isBool?: boolean;
}

type KcsbMappedKeys = KeyOfType<KustoConnectionStringBuilder, string | boolean | undefined>;

// This type gurantess that we don't have properties in KeywordMapping that don't exist in KustoConnectionStringBuilder
type KeywordMappingRecordType = Partial<Record<KcsbMappedKeys, MappingType>>;

const KeywordMapping: KeywordMappingRecordType = Object.freeze<Readonly<KeywordMappingRecordType>>({
  dataSource: {
    mappedTo: "Data Source",
    validNames: ["data source", "addr", "address", "network address", "server"],
  },
  aadFederatedSecurity: {
    mappedTo: "AAD Federated Security",
    validNames: ["aad federated security", "federated security", "federated", "fed", "aadfed"],
    isBool: true,
  },
  initialCatalog: {
    mappedTo: "Initial Catalog",
    validNames: ["initial catalog", "database"],
  },
  aadUserId: {
    mappedTo: "AAD User ID",
    validNames: ["aad user id"],
  },
  password: {
    mappedTo: "Password",
    validNames: ["password", "pwd"],
    isSecret: true,
  },
  applicationClientId: {
    mappedTo: "Application Client Id",
    validNames: ["application client id", "appclientid"],
  },
  applicationKey: {
    mappedTo: "Application Key",
    validNames: ["application key", "appkey"],
    isSecret: true,
  },
  applicationCertificatePrivateKey: {
    mappedTo: "Application Certificate PrivateKey",
    validNames: ["Application Certificate PrivateKey"],
    isSecret: true,
  },
  applicationCertificateThumbprint: {
    mappedTo: "Application Certificate Thumbprint",
    validNames: ["application certificate thumbprint", "AppCert"],
  },
  applicationCertificateX5c: {
    mappedTo: "Application Certificate x5c",
    validNames: [
      "application certificate x5c",
      "Application Certificate Send Public Certificate",
      "Application Certificate SendX5c",
      "SendX5c",
    ],
  },
  authorityId: {
    mappedTo: "Authority Id",
    validNames: ["authority id", "authorityid", "authority", "tenantid", "tenant", "tid"],
  },
});

const getPropName = (key: string): [string, MappingType] => {
  const _key = key.trim().toLowerCase();

  for (const keyword of Object.keys(KeywordMapping)) {
    const k = KeywordMapping[keyword as KcsbMappedKeys];
    if (!k) {
      continue;
    }
    if (k.validNames.map((n) => n.trim().toLowerCase()).indexOf(_key) >= 0) {
      return [keyword, k];
    }
  }
  throw new Error("Failed to get prop: " + key);
};

export class KustoConnectionStringBuilder {
  static readonly DefaultDatabaseName = "NetDefaultDB";
  static readonly SecretReplacement = "****";
  // eslint-disable-next-line no-console
  static defaultDeviceCallback: (response: DeviceCodeResponse) => void = (response) =>
    console.log(response.message);

  dataSource?: string;
  aadFederatedSecurity?: boolean;
  initialCatalog?: string;
  aadUserId?: string;
  password?: string;
  applicationClientId?: string;
  msiClientId?: string;
  applicationKey?: string;
  applicationCertificatePrivateKey?: string;
  applicationCertificateThumbprint?: string;
  applicationCertificateX5c?: string;
  authorityId: string = "organizations";
  deviceCodeCallback?: (response: DeviceCodeResponse) => void;
  tokenProvider?: () => Promise<string>;
  loginHint?: string;
  timeoutMs?: number;
  accessToken?: string;
  useDeviceCodeAuth?: boolean;
  useUserPromptAuth?: boolean;
  useAzLoginAuth?: boolean;
  useManagedIdentityAuth?: boolean;

  constructor(connectionString: string) {
    if (connectionString.trim().length === 0) throw new Error("Missing connection string");

    if (connectionString.endsWith("/") || connectionString.endsWith("\\")) {
      connectionString = connectionString.slice(0, -1);
    }

    if (!!connectionString && connectionString.split(";")[0].indexOf("=") === -1) {
      connectionString = "Data Source=" + connectionString;
    }

    const params = connectionString.split(";");
    for (const item of params) {
      const kvp = item.split("=");
      const [mappingTypeName, mappingType] = getPropName(kvp[0]);
      if (mappingType.isBool) {
        this[mappingTypeName as KeyOfType<KustoConnectionStringBuilder, boolean | undefined>] =
          kvp[1].trim().toLowerCase() === "true";
      } else {
        this[mappingTypeName as KeyOfType<KustoConnectionStringBuilder, string | undefined>] =
          kvp[1]?.trim();
      }
    }

    if (!this.initialCatalog) {
      this.initialCatalog = KustoConnectionStringBuilder.DefaultDatabaseName;
    }
  }

  toString(removeSecrets: boolean = true): string {
    return Object.entries(KeywordMapping)
      .map(([key, mappingType]) => {
        const value = this[key as KcsbMappedKeys];
        if (!mappingType || value === undefined) {
          return "";
        }
        if (mappingType.isSecret && removeSecrets) {
          return `${mappingType.mappedTo}=${KustoConnectionStringBuilder.SecretReplacement}`;
        }

        return `${mappingType.mappedTo}=${value.toString()}`;
      })
      .filter((x) => x !== "")
      .join(";");
  }

  static fromExisting(other: KustoConnectionStringBuilder): KustoConnectionStringBuilder {
    return Object.assign({}, other);
  }

  static withAadUserPasswordAuthentication(
    connectionString: string,
    userId: string,
    password: string,
    authorityId?: string
  ) {
    if (userId.trim().length === 0) throw new Error("Invalid user");
    if (password.trim().length === 0) throw new Error("Invalid password");

    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;
    kcsb.aadUserId = userId;
    kcsb.password = password;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }

    return kcsb;
  }

  static withAadApplicationKeyAuthentication(
    connectionString: string,
    aadAppId: string,
    appKey: string,
    authorityId?: string
  ) {
    if (aadAppId.trim().length === 0) throw new Error("Invalid app id");
    if (appKey.trim().length === 0) throw new Error("Invalid app key");

    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;
    kcsb.applicationClientId = aadAppId;
    kcsb.applicationKey = appKey;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }

    return kcsb;
  }

  static withAadApplicationCertificateAuthentication(
    connectionString: string,
    aadAppId: string,
    applicationCertificatePrivateKey: string,
    applicationCertificateThumbprint: string,
    authorityId?: string,
    applicationCertificateX5c?: string
  ) {
    if (aadAppId.trim().length === 0) throw new Error("Invalid app id");
    if (applicationCertificatePrivateKey.trim().length === 0)
      throw new Error("Invalid certificate");
    if (applicationCertificateThumbprint.trim().length === 0) throw new Error("Invalid thumbprint");

    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;
    kcsb.applicationClientId = aadAppId;
    kcsb.applicationCertificatePrivateKey = applicationCertificatePrivateKey;
    kcsb.applicationCertificateThumbprint = applicationCertificateThumbprint;
    kcsb.applicationCertificateX5c = applicationCertificateX5c;

    if (authorityId) {
      kcsb.authorityId = authorityId;
    }

    return kcsb;
  }

  static withAadDeviceAuthentication(
    connectionString: string,
    authorityId?: string,
    deviceCodeCallback: (
      response: DeviceCodeResponse
    ) => void = KustoConnectionStringBuilder.defaultDeviceCallback
  ) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }
    kcsb.deviceCodeCallback = deviceCodeCallback;
    kcsb.useDeviceCodeAuth = true;

    return kcsb;
  }

  /**
   * @deprecated - use `withSystemManagedIdentity` or `withUserManagedIdentity` instead
   */
  static withAadManagedIdentities(
    connectionString: string,
    msiClientId?: string,
    authorityId?: string,
    timeoutMs?: number
  ) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }
    kcsb.msiClientId = msiClientId;
    kcsb.timeoutMs = timeoutMs;
    kcsb.useManagedIdentityAuth = true;

    return kcsb;
  }

  static withSystemManagedIdentity(
    connectionString: string,
    authorityId?: string,
    timeoutMs?: number
  ) {
    return this.withAadManagedIdentities(connectionString, undefined, authorityId, timeoutMs);
  }

  static withUserManagedIdentity(
    connectionString: string,
    msiClientId: string,
    authorityId?: string,
    timeoutMs?: number
  ) {
    return this.withAadManagedIdentities(connectionString, msiClientId, authorityId, timeoutMs);
  }

  static withAzLoginIdentity(connectionString: string, authorityId?: string, timeoutMs?: number) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;

    kcsb.useAzLoginAuth = true;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }
    kcsb.timeoutMs = timeoutMs;

    return kcsb;
  }

  static withAccessToken(connectionString: string, accessToken: string) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;

    kcsb.accessToken = accessToken;

    return kcsb;
  }

  static withTokenProvider(connectionString: string, tokenProvider: () => Promise<string>) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;

    kcsb.tokenProvider = tokenProvider;

    return kcsb;
  }

  static withUserPrompt(
    connectionString: string,
    authorityId?: string,
    clientId?: string,
    timeoutMs?: number,
    loginHint?: string
  ) {
    const kcsb = new KustoConnectionStringBuilder(connectionString);
    kcsb.aadFederatedSecurity = true;

    kcsb.useUserPromptAuth = true;
    if (authorityId) {
      kcsb.authorityId = authorityId;
    }
    kcsb.loginHint = loginHint;
    kcsb.applicationClientId = clientId;
    kcsb.timeoutMs = timeoutMs;

    return kcsb;
  }
}

export default KustoConnectionStringBuilder;
