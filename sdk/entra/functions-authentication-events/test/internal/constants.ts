// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const RequestConstants = {
  statusMessage: "Ready",
  qsKey1: "param1",
  qsKey2: "param2",
  qsValue1: "value1",
  qsValue2: "value2",
  source: "/tenants/{tenantId}/applications/{resourceAppId}",
  oDataType: "microsoft.graph.onTokenIssuanceStartCalloutData",
  type: "microsoft.graph.authenticationEvent.TokenIssuanceStart",
};

export const ResponseConstants = {
  oDataType: "microsoft.graph.onTokenIssuanceStartResponseData",
  body: '{\r\n  "data": {\r\n    "@odata.type": "",\r\n    "actions": []\r\n  }\r\n}',
};

export const PayloadConstants = {
  Base: {
    tenantId: "30000000-0000-0000-0000-000000000003",
    authenticationEventListenerId: "10000000-0000-0000-0000-000000000001",
    customAuthenticationExtensionId: "10000000-0000-0000-0000-000000000002",
  },
  Context: {
    correlationId: "20000000-0000-0000-0000-000000000002",
    Client: {
      ip: "127.0.0.1",
      locale: "en-us",
      market: "en-au",
    },
    AuthProtocol: "OAUTH2.0",
    ClientServicePrincipal: {
      id: "40000000-0000-0000-0000-000000000001",
      appId: "40000000-0000-0000-0000-000000000002",
      appDisplayName: "Test client app",
      displayName: "Test client application",
    },
    ResourceServicePrincipal: {
      id: "40000000-0000-0000-0000-000000000003",
      appId: "40000000-0000-0000-0000-000000000004",
      appDisplayName: "Test resource app",
      displayName: "Test resource application",
    },
    Roles: {
      id: "50000000-0000-0000-0000-000000000005",
      value: "DummyRole",
    },
    User: {
      companyName: "My Test Company",
      country: "USA",
      displayName: "Dummy display name",
      givenName: "Example",
      id: "60000000-0000-0000-0000-000000000006",
      mail: "test@example.com",
      onPremisesSamAccountName: "testadmin",
      onPremisesSecurityIdentifier: "DummySID",
      preferredDataLocation: "DummyDataLocation",
      preferredLanguage: "DummyLanguage",
      surname: "Test",
      userPrincipalName: "testadmin@example.com",
      userType: "UserTypeCloudManaged",
    },
  },
};

export const ActionConstants = {
  Claims: {
    claim1: "value1",
    claim2: "value2",
    claim3: "value3",
    claim4: "value4",
    claim5: "value5",
  },
  Claims_as_string:
    '[{"actionType":"microsoft.graph.ProvideClaimsForToken","claims":{"claim1":"value1","claim2":"value2","claim3":"value3","claim4":"value4","claim5":"value5"}}]',
};
