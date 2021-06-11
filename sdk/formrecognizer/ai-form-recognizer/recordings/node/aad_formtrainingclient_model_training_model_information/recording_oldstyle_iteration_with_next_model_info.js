let nock = require('nock');

module.exports.hash = "0b380ec49ea2252e1bfbaa30e93be775";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '1110f3be-c77b-4a88-bd3c-67fba943f900',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDAAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 18:04:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlVQYGxixXifFPnxqxRm6RuCmnNr7dx2W5wfOCn0jV9aLFSojKSao_9JQBh1bPmiqu2Bbqlw6bYBpedQ5lAheGPsBQJTzOT_GXTQvYBQnnmPYKIh0QoOofjsz1CJfJw8PxaPePP6Lyi1allMg87BE_avFYPvve2ZmFUVmsTHqBoYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:04:17 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '3907f0b7-1f77-49e8-8043-397b99002300',
  'x-ms-ests-server',
  '2.1.11774.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLDAAAAO0xP9gOAAAA; expires=Thu, 24-Jun-2021 18:04:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevryt5BlBETr_Yh6KEJKtuEOP1uTG4sTPiu4f1GqdPLzh-nDc3XvCnuVJhkyvYqTaL8QSQtx_MEGKw_b5JER-w0JqKCmOfGHZk8yARwM6Y0GCha1VD9wdcn5eZXjXYiKGld3v8T-8o5YByGEhYrDxop6eMU6DRg4tkqA6j6OQvd8TkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:04:17 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=390e3271-8d75-480a-9f3d-29696a793a70&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  '18d28e0b-2a6d-4aa6-9df5-46ed48751b00',
  'x-ms-ests-server',
  '2.1.11774.11 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApkDqNpQ57tNkXRRzlIgAuCU1ubLCAAAABkzP9gOAAAA; expires=Thu, 24-Jun-2021 18:04:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 18:04:17 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"0109efb9-3b31-48a8-90ed-4dbea7a7f9d8","status":"invalid","createdDateTime":"2021-05-11T06:31:55Z","lastUpdatedDateTime":"2021-05-11T06:31:56Z"},{"modelId":"01300337-2d75-47a9-ba9d-e4809632ac9f","modelName":"copyModelName162033528572506527","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-06T21:08:05Z","lastUpdatedDateTime":"2021-05-06T21:08:08Z"},{"modelId":"01351ced-b4c1-4ea7-9ac7-daf4f9a267d3","status":"invalid","createdDateTime":"2021-05-11T06:29:40Z","lastUpdatedDateTime":"2021-05-11T06:29:42Z"},{"modelId":"027cae79-768f-4ecd-8376-cfdcfe86b6dc","status":"invalid","createdDateTime":"2021-03-03T22:17:25Z","lastUpdatedDateTime":"2021-03-03T22:17:25Z"},{"modelId":"0349ec84-1570-43cf-be3c-ce753fdfb98f","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T17:56:47Z","lastUpdatedDateTime":"2020-11-20T17:56:50Z"},{"modelId":"03608263-829e-41b3-a080-f471c165809b","status":"ready","createdDateTime":"2020-04-02T01:35:33Z","lastUpdatedDateTime":"2020-04-02T01:37:36Z"},{"modelId":"03ff3ad0-68a4-4d72-ba48-c6b81569132c","modelName":"composedmodel","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-03-18T15:06:17Z","lastUpdatedDateTime":"2021-03-18T15:06:17Z"},{"modelId":"046720f8-2956-4b31-9153-915048e815e5","modelName":"model1","status":"invalid","createdDateTime":"2021-02-19T19:06:57Z","lastUpdatedDateTime":"2021-02-19T19:06:58Z"},{"modelId":"04c3c696-7d1a-4592-b368-3e53b5acc188","status":"ready","createdDateTime":"2021-03-18T21:44:23Z","lastUpdatedDateTime":"2021-03-18T21:44:41Z"},{"modelId":"05cfe98b-5315-4de8-bbf0-cbc97aa05857","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-02-19T19:05:57Z","lastUpdatedDateTime":"2021-02-19T19:06:00Z"},{"modelId":"05d8dd77-177c-4f27-ab8e-53d5f6856d4c","modelName":"labeled","status":"invalid","createdDateTime":"2021-02-25T15:54:54Z","lastUpdatedDateTime":"2021-02-25T15:54:57Z"},{"modelId":"061eeae6-ba66-44ac-a888-64cda7bfb08f","status":"ready","createdDateTime":"2021-03-18T15:58:58Z","lastUpdatedDateTime":"2021-03-18T15:59:17Z"},{"modelId":"06250af1-6a8f-4f6d-8432-4964338e0033","modelName":"mymodel","status":"ready","createdDateTime":"2020-11-19T18:08:35Z","lastUpdatedDateTime":"2020-11-19T18:08:51Z"},{"modelId":"06361f72-8e11-4081-a5a1-03face152fdd","modelName":"my composed model","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2021-03-18T14:32:17Z","lastUpdatedDateTime":"2021-03-18T14:32:17Z"},{"modelId":"06829eaa-56f7-42c2-8c48-0060e58a7c47","status":"ready","createdDateTime":"2020-04-02T17:48:45Z","lastUpdatedDateTime":"2020-04-02T17:50:46Z"},{"modelId":"0798709f-d73a-48d1-8210-e782e2303d03","modelName":"mymodel","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-18T15:01:35Z","lastUpdatedDateTime":"2021-03-18T15:01:37Z"},{"modelId":"079b719d-f8d2-4359-900f-2d9d308c03d9","status":"ready","createdDateTime":"2021-03-18T15:55:03Z","lastUpdatedDateTime":"2021-03-18T15:55:20Z"},{"modelId":"07a9d365-0629-4b5c-b913-6dd3e1f2e617","status":"invalid","createdDateTime":"2020-04-09T18:19:12Z","lastUpdatedDateTime":"2020-04-09T18:19:12Z"},{"modelId":"07f8e603-6ce9-45e6-aa42-97d9c4124941","modelName":"labeled","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-07T02:30:00Z","lastUpdatedDateTime":"2021-05-07T02:30:03Z"},{"modelId":"088fe0a3-a863-41da-bbad-82ed7fc71333","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-05-06T21:07:49Z","lastUpdatedDateTime":"2021-05-06T21:07:52Z"},{"modelId":"08b57613-d96e-4a3f-8742-43efd0e1bbb1","status":"invalid","createdDateTime":"2021-05-11T06:45:13Z","lastUpdatedDateTime":"2021-05-11T06:45:14Z"},{"modelId":"08d21ef4-e9c4-425b-a22e-e5070ecd04b8","status":"ready","createdDateTime":"2020-04-20T19:50:17Z","lastUpdatedDateTime":"2020-04-20T19:50:24Z"},{"modelId":"09a6923d-425d-49f6-a967-6cb78a718b10","status":"ready","createdDateTime":"2020-04-02T19:06:24Z","lastUpdatedDateTime":"2020-04-02T19:08:26Z"},{"modelId":"09c07702-a7c9-42e6-ab85-83078f96c812","status":"ready","createdDateTime":"2021-03-18T15:12:34Z","lastUpdatedDateTime":"2021-03-18T15:12:56Z"},{"modelId":"09ce0242-cf46-4232-91a5-bb36651214b8","modelName":"my labeled model","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2021-03-18T16:00:02Z","lastUpdatedDateTime":"2021-03-18T16:00:05Z"},{"modelId":"0a0558cf-e143-4988-b0c2-64f3f92f830b","status":"invalid","createdDateTime":"2021-05-11T05:23:52Z","lastUpdatedDateTime":"2021-05-11T05:23:53Z"},{"modelId":"0a0a321b-5a0a-40c7-8178-88d478aa8bc8","status":"ready","createdDateTime":"2020-03-12T22:35:52Z","lastUpdatedDateTime":"2020-03-12T22:36:04Z"},{"modelId":"0a362931-f4bb-4b2b-b39e-38ea3fcc97bd","status":"ready","createdDateTime":"2021-05-11T05:21:52Z","lastUpdatedDateTime":"2021-05-11T05:22:16Z"},{"modelId":"0a9f53c0-6a42-43a9-aec1-8f897d23a2e0","modelName":"secondcomposedmodel","attributes":{"isComposed":true},"status":"ready","createdDateTime":"2020-08-11T19:36:47Z","lastUpdatedDateTime":"2020-08-11T19:36:47Z"},{"modelId":"0af45f1a-2639-4cce-aaa8-d522088af823","status":"invalid","createdDateTime":"2021-03-03T22:51:37Z","lastUpdatedDateTime":"2021-03-03T22:51:37Z"}],"nextLink":"https://endpoint/formrecognizer/v2.1/custom/models?nextLink=2!204!MDAwMTA4IXN1YnNjcmlwdGlvbnMvYzUwM2I4ODFkNmM2NGY1OGFmYjM3MmMxOTI0YmMyMzQvbW9kZWxzLzBhZjQ1ZjFhLTI2MzktNGNjZS1hYWE4LWQ1MjIwODhhZjgyMy91c2VMYWJlbEZpbGUuanNvbiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"}, [
  'Content-Length',
  '5632',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  '438d1b8e-a5a4-4716-9a61-1eefd3c7ec02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 25 May 2021 18:04:18 GMT'
]);
