// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenIssuanceStartRequest } from "@azure/functions-authentication-events";

export const request: TokenIssuanceStartRequest = {
  response: {
    oDataType: "microsoft.graph.onTokenIssuanceStartResponseData",
    actions: [],
    body: '{\r\n  "data": {\r\n    "@odata.type": "",\r\n    "actions": []\r\n  }\r\n}',
  },
  payload: {
    authenticationContext: {
      correlationId: "20000000-0000-0000-0000-000000000002",
      client: {
        ip: "127.0.0.1",
        locale: "en-us",
        market: "en-au",
      },
      authenticationProtocol: "OAUTH2.0",
      clientServicePrincipal: {
        id: "40000000-0000-0000-0000-000000000001",
        appId: "40000000-0000-0000-0000-000000000002",
        appDisplayName: "Test client app",
        displayName: "Test client application",
      },
      resourceServicePrincipal: {
        id: "40000000-0000-0000-0000-000000000003",
        appId: "40000000-0000-0000-0000-000000000004",
        appDisplayName: "Test resource app",
        displayName: "Test resource application",
      },
      user: {
        companyName: "My Test Company",
        country: "USA",
        displayName: "Dummy display name",
        givenName: "Example",
        id: "60000000-0000-0000-0000-000000000006",
        mail: "test@example.com",
        onPremisesSamAccountName: "testadmin",
        onPremisesSecurityIdentifier: "DummySID",
        // TODO: If this is nullable the type can be defined as string | null
        onPremiseUserPrincipalName: "",
        preferredDataLocation: "DummyDataLocation",
        preferredLanguage: "DummyLanguage",
        surname: "Test",
        userPrincipalName: "testadmin@example.com",
        userType: "UserTypeCloudManaged",
      },
    },
    tenantId: "30000000-0000-0000-0000-000000000003",
    authenticationEventListenerId: "10000000-0000-0000-0000-000000000001",
    customAuthenticationExtensionId: "10000000-0000-0000-0000-000000000002",
  },
  tokenClaims: undefined,
  source: "/tenants/{tenantId}/applications/{resourceAppId}",
  oDataType: "microsoft.graph.onTokenIssuanceStartCalloutData",
  type: "microsoft.graph.authenticationEvent.TokenIssuanceStart",
  requestStatus: "Successful",
  statusMessage: "Ready",
  queryParameters: {
    param1: "value1",
    param2: "value2",
  },
};
