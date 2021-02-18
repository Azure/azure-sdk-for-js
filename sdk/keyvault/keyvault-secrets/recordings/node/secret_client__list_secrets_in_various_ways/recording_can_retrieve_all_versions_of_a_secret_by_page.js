let nock = require('nock');

module.exports.hash = "4778b9ee02a5ffc9b271d84a12890966";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ff09e439-b48f-4a7d-b064-cb3050431527',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:28 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '0c6435bd-42d0-4702-b991-60de358ae800',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aqv4IghlOCFFjTHdV6DF9XIA4qsDEAAAAMgVvtcOAAAA; expires=Thu, 18-Mar-2021 19:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:40:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE0","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE0","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/951df0f5c0be457ebd3740985af71ac1","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '27e30be7-bf84-4b00-81d7-09202e03e9ce',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:28 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE1","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE1","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/e61833fb039e46bbb799415c88d55516","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8b0abcec-d534-4cb9-a9ab-8125832d6f51',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE2","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE2","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ca828d88-1bfe-4d1e-80ff-1110147743e7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/versions')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/951df0f5c0be457ebd3740985af71ac1","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/e61833fb039e46bbb799415c88d55516","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'de1130b1-1c5d-423e-917e-ca706c431b6f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '915'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/951df0f5c0be457ebd3740985af71ac1')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE0","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/951df0f5c0be457ebd3740985af71ac1","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4d73a968-b25f-4a6a-9613-cfaf8b3955d0',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE2","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2d11d6e5-741d-480d-86e0-a0d05cf01fa7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/e61833fb039e46bbb799415c88d55516')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE1","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/e61833fb039e46bbb799415c88d55516","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4ae751bf-67bb-415d-b435-40c47808706d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-","deletedDate":1613504429,"scheduledPurgeDate":1614109229,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9e3db5f7-781c-42d0-b2df-b12881a629d5',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canretrieveallversionsofasecretbypage-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '76165de8-7394-4aab-a1bf-014049f1da85',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canretrieveallversionsofasecretbypage-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '71fba593-1c61-4d7e-a8e6-980d3b704bf3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canretrieveallversionsofasecretbypage-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a39f8d95-fbdf-4732-9b09-0cba318ea494',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canretrieveallversionsofasecretbypage-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'dd99f7a5-2abc-4cfb-bcaf-f87320c3eb1d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canretrieveallversionsofasecretbypage-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9759a6c0-e7ff-430a-a297-19a060ba3769',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-","deletedDate":1613504429,"scheduledPurgeDate":1614109229,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/c49097ec6d054bc58af1a3100e96b758","attributes":{"enabled":true,"created":1613504429,"updated":1613504429,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6585229b-3b03-41e1-91a4-53818e839e62',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:37 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/listSecretName-canretrieveallversionsofasecretbypage-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '50ef9af8-b035-437e-8a8c-592218a46d09',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:40:37 GMT'
]);
