let nock = require('nock');

module.exports.hash = "f2f91e9e3b2fcec2abbab05cb21095d4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/common/discovery/instance')
  .query(false)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SBQAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:23:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_1pRKxNV8YpsgN_gjLRik7OSdyFMAGcTkmP-ou0-WPQLAiU0V2MplmTvl7KfmsCyPaAiPI5br4t4KqMZqOn3jut0IkaZhI_5B-tt7zVPm0yqBlZkZ5WV4IF-b9NvbDxinQYPNlmDVdCAppzLxR8TwzNaYFIlwAFdyYvrSypr9EQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:23:30 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":false,"frontchannel_logout_supported":false,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/SomeTenantId/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SBQAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:23:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrqo9WzJjCME_W5z7o26UhyWLa2WOdMVwWHM6_fLytS8Z0pzkceYbtdOALVEFA1Ghx-QIJPfqqvkWpk79s7kZkYYhUM6-VB4mavi06urGNtfMa-r6P422qyoEl2xT_0qXsIevlXIlohs8g7zFh9JVTov46psSEtPZvF2xKEcitpZ0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:23:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=sanitized&client_secret=SomeClientSecret")
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SBgAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:23:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:23:31 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(false)
  .reply(202, {"capabilitiesUpdateId":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Operation-Location,Location,operation-id,capabilities-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'IMy8DNgFT0Cxj4IxX3clAg.0',
  'Operation-Location',
  '/phoneNumbers/operations/capabilities_sanitized?api-version=2021-03-07',
  'operation-id',
  'capabilities_sanitized',
  'capabilities-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2001ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0g+fLYAAAAACWCpvgPY/3SqFd4pEi7V90WVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:33.3298728+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'bM23Mj5NkUqTnepH/2yPmQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '396ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hefLYAAAAADY5lQqZkHhQr+igwdUMSGvWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:33.3298728+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'BmpA0xYc20eHIvHY8MEttg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '306ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iOfLYAAAAABR5rxFlBiEQp1xaV0Ndy56WVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:33.3298728+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'RUqneQ5svEKd07WCPvg/MA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '298ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iufLYAAAAAAn8CQPYcRnQriG+fdZXE9WWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:33.3298728+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'QNoif8kf+k+/UY7xyo0Zpg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '312ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jOfLYAAAAACrzhpiZWtBT4BdHeu+2DTEWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/capabilities_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/phoneNumbers/+14155550100?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:33.3298728+00:00","id":"capabilities_sanitized","operationType":"updatePhoneNumberCapabilities","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/phoneNumbers/+14155550100?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'UpGtO9DR10yMsXIX7ASg/Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '307ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0j+fLYAAAAACi8jep3+7qTKU6gSCkOgIBWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/+14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WmOXEN+EOUOFXaVlfXz7bQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1501ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kefLYAAAAACdKipUfem1SqzqO8+J3FFhWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:46 GMT'
]);
