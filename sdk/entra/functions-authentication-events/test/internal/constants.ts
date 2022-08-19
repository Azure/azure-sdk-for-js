import { TokenClaim } from "@azure/functions-authentication-events";

export class RequestConstants {
  public static readonly statusMessage = "Ready";
  public static qsKey1 = "param1";
  public static qsKey2 = "param2";
  public static qsValue1 = "value1";
  public static qsValue2 = "value2";
  public static readonly source = "/tenants/{tenantId}/applications/{resourceAppId}";
  public static readonly oDataType = "microsoft.graph.onTokenIssuanceStartCalloutData";
  public static readonly type = "microsoft.graph.authenticationEvent.TokenIssuanceStart";
}

export class ResponseConstants {
  public static oDataType = "microsoft.graph.onTokenIssuanceStartResponseData";
  public static body =
    '{\r\n  "data": {\r\n    "@odata.type": "",\r\n    "actions": []\r\n  }\r\n}';
}

export class PayloadConstants {
  public static Base = class {
    public static readonly tenantId = "30000000-0000-0000-0000-000000000003";
    public static readonly authenticationEventListenerId = "10000000-0000-0000-0000-000000000001";
    public static readonly customAuthenticationExtensionId = "10000000-0000-0000-0000-000000000002";
  };

  public static Context = class {
    public static readonly correlationId = "20000000-0000-0000-0000-000000000002";
    public static Client = class {
      public static readonly ip = "127.0.0.1";
      public static readonly locale = "en-us";
      public static readonly market = "en-au";
    };

    public static AuthProtocol = "OAUTH2.0";

    public static ClientServicePrincipal = class {
      public static readonly id = "40000000-0000-0000-0000-000000000001";
      public static readonly appId = "40000000-0000-0000-0000-000000000002";
      public static readonly appDisplayName = "Test client app";
      public static readonly displayName = "Test client application";
    };

    public static ResourceServicePrincipal = class {
      public static readonly id = "40000000-0000-0000-0000-000000000003";
      public static readonly appId = "40000000-0000-0000-0000-000000000004";
      public static readonly appDisplayName = "Test resource app";
      public static readonly displayName = "Test resource application";
    };

    public static Roles = class {
      public static readonly id = "50000000-0000-0000-0000-000000000005";
      public static readonly value = "DummyRole";
    };

    public static User = class {
      public static readonly companyName = "My Test Company";
      public static readonly country = "USA";
      public static readonly displayName = "Dummy display name";
      public static readonly givenName = "Example";
      public static readonly id = "60000000-0000-0000-0000-000000000006";
      public static readonly mail = "test@example.com";
      public static readonly onPremisesSamAccountName = "testadmin";
      public static readonly onPremisesSecurityIdentifier = "DummySID";
      public static readonly preferredDataLocation = "DummyDataLocation";
      public static readonly preferredLanguage = "DummyLanguage";
      public static readonly surname = "Test";
      public static readonly userPrincipalName = "testadmin@example.com";
      public static readonly userType = "UserTypeCloudManaged";
    };
  };
}

export class ActionConstants {
  public static readonly Claims: TokenClaim[] = [
    { id: "claim1", value: "value1" },
    { id: "claim2", value: "value2" },
    { id: "claim3", value: "value3" },
    { id: "claim4", value: "value4" },
    { id: "claim5", value: "value5" },
  ];

  public static readonly Claims_as_string =
    '[{"actionType":"ProvideClaimsForToken","claims":[{"id":"claim1","value":"value1"},{"id":"claim2","value":"value2"},{"id":"claim3","value":"value3"},{"id":"claim4","value":"value4"},{"id":"claim5","value":"value5"}]}]';
}
