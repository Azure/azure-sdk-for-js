let nock = require('nock');

module.exports.hash = "13def522ee31a2a933aced2eb64bc576";

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
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SAgAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:21:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZFh2biWKa_hR3PJRxe4i0ZzGEYlq6uNsh6bcZ0jaC_7HdbX9edQOa_D0uUjz4Hkf3m2g75pVAB2EmU2eYiSZoHu6haoBSShyV9HqupzS6Qu5ZEGhk08seVSNTOigCEfvLwGDTmzI2gtAqm5o71ZiuHWrCkkU3gcHSRKjxOYSOdUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:21:22 GMT',
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
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SAgAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:21:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5xv2YlIMb6qak6_rdwhuPwhSVmdid63Jx2v_kYvqIMfLIsxZvHnccrAzvR6qFhZPqYnolxq1-mYxoSoVimuj1sVYOYGRHS5KAbyzf1ADaaN9Ja3hdJXS2h9PRiL5hpPPTPEg_Sv19utsShK3rQu4eWBHgvN2fBlUHOXwwJP2x9sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:21:22 GMT',
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
  '2.1.11829.4 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai4CmGiDYqFBkzYib2S8D45Wyo4SAwAAAPLdXdgOAAAA; expires=Sun, 18-Jul-2021 00:21:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 18 Jun 2021 00:21:23 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(false)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JiPY3Zb5lE2t26vmpmjeWg.0',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2021-03-07',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '4158ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0A+fLYAAAAACydDA8uiJVQYiE7m3xekh1WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ZKLaMUyuY0KZUpVj2zv13Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '523ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0COfLYAAAAAB8KK5dM0VQSK06p/YarAEIWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'te6jFTtOrUSX1lqRg94kTQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '381ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CufLYAAAAAAMaKQQweCCS6W0FHGd+cpTWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(false)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2021-06-18T00:37:29.0350364+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XazqDvo38EiPlqkDMIm3Qw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '958ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DefLYAAAAACDZB01DpePSJTKKhkfWUr9WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(false)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'w1LidCbBIEe8DA1KtS7fkw.0',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1979ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EOfLYAAAAAC0KsvJ24IqRaYBbIGTx2l4WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'qGEwExF6d0y22Kb9n943NA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '359ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EufLYAAAAABRNQfEAKO4QZUpGW7gWDG3WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'R7ivLMYLCUaKLLscqD11MA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '371ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FOfLYAAAAAD54212kGUMSaEMN0+HONDUWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'EgnYn0qFiEe+E5D7B61mSQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '655ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F+fLYAAAAADL3dUBay/iQqe/3cCr70LHWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'nU6REpF0d0SmJY+Opc5HUg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '510ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GefLYAAAAAAv+0IHTzu5RoNB3+KpZBInWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yZ9s2+VMWkyS0VI6UdPO/Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '348ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HOfLYAAAAACqDvbA1dJXS7YLQvAPpRLjWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'fHVYK0DtyEWfKO8tY6cw9w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '357ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0H+fLYAAAAADxerwaAX07SZ+15nqfg/ovWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'mZVm4vBuhECfphKcP53cuQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '375ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0IefLYAAAAAC4C3/bPoc+Sp3Va8kjwhKXWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-06-18T00:21:26.9614972+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'sHKJHFqolESbxGLrhqnvXQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '370ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0I+fLYAAAAAD2czWmh68rTqoOzsR9cyPmWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-06-18T00:21:53.2858909+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HMBJ2esxqE+QTh9vQEUt8g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1076ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KOfLYAAAAACvy0IWZqt4SYoA8YVoIF0nWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'md709tsx/Ee45ycnjaTkEQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2021-03-07',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1062ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KefLYAAAAACQHB2gVh5WQ7y4tLgEhhfUWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:02.0335928+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'qFfuVFE+aEmq7qhA+iRJ7w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '362ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KufLYAAAAAAEI3wjAyv9RZF1J1dJaFfDWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:02.0335928+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'wm8jfrd6iEmCPo1kv0CePg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '320ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LefLYAAAAABcNxUhAMWUTJxlV9uw76M6WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:02.0335928+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'eHby00jWok2D4GirTJ7kKw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '320ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0L+fLYAAAAABeOTZohEi5RqQH3U7qwOxjWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:02.0335928+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/MHnIXFiwEqw264KNGekNg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '319ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MufLYAAAAABtPWq39JkYSJj/HboSbZSpWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:10 GMT'
]);
