let nock = require('nock');

module.exports.hash = "e40db4a771c5a86fc3580081e9b7cdc2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
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
  '2.1.13418.10 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AsrnDbQi3mRPlXVGyjfHfcE; expires=Thu, 08-Sep-2022 23:37:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7bbFRN44oVje32ibWHYinqReNeK2GuVCuZc0lNVd_wn8qRg0k-6p8lGWfe2jymUqAENCTxt_yUj90wUuwRhZq2xmOcnWbz3Ds9DFJT5e4aVYlW5U-TkTmW0xUMb8ewyp_L76nacftSMsF8rq-DHlO99Y2hZDqSXmnKfV5nBL8FogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:37:12 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":true})
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
  '2.1.13481.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkbZ_Noq-i9Mpq9mP_sPFvg; expires=Thu, 08-Sep-2022 23:37:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxbXepQaFOtY2BgKOHDxdjMAyf9vOB2zcF-ZAjGmI0NilBkOR4V8qM8WH3AvLmof4itYRsBgJ_zeg00BCYCXJnqdKUjn9t0-MWgKZWTZDv-K2cFi6_udB8A7SxdzeyHvZBb5rbfVi5139yvXVM6Xe9saU3OeMRFKOyUeIVdzL5sUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:37:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=sanitized&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '2.1.13481.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoBYez9ltYJKuuAiDPyE3kNWyo4SAQAAAKjmhNoOAAAA; expires=Thu, 08-Sep-2022 23:37:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:37:12 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'MS-CV',
  'Hhs7sa7yaUSWwlbUeUw9iA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '2127ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qe/yYgAAAACvUMQy53pYT4o0SUcMVbaeTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"operationType":"search","status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'yvLjEnDavEOKnoIL/jkmZA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '423ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0q+/yYgAAAADxS5OY/uE1T70OrEKNYWx6TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"operationType":"search","status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'zYTdg2vMv0aXjIWJZJbJkg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '418ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ru/yYgAAAACCPtohgujCT7klv/4gQ+/8TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-08-09T23:53:17.4033451+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Nc9PcgWWaEmgnlTn1Lp/3A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '1053ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sO/yYgAAAAC0xK9OP512QKCNKrvAdmQ6TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'MS-CV',
  'CvJ5Oj9NDEyS4q32z+DQOw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '2272ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0se/yYgAAAAB71h3VFNQZRrf0L7+pEi3vTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ARQSV3koj029mN81sKReLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '438ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tO/yYgAAAABBi71JZabzRbnqD2QTGRXGTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hhxHq5fv8kK6HYqi+C6J0Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '413ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tu/yYgAAAADvBBuL/WrgSpU5t8/33AFqTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'w95sEAACW0C6B7c2ds3Zeg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '427ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ue/yYgAAAABBYHOHsZFbSJslrf3ewoo2TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Qth2qRxop0qArYdbtY6BTw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '392ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0u+/yYgAAAABzMJbB6jfVQpuE0JVKqozbTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UnqIshAxAUaESEeGp5ZE9g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '454ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ve/yYgAAAAC+wcYjH5KyQbMbV150kSS2TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UZJk+ToD+0KKQ6JRIUUOdg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '388ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wO/yYgAAAACJwvr8a11nQ52MzKgU2Aj0TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5VjK/zdkr06dFg5/XOUBww.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '396ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wu/yYgAAAADr4gd8hDe0Sa+rRypaXAunTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:15.4260243+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'bJsCEmMW3EWN/sLckroj4A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '448ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xe/yYgAAAADGQ455j/yVTqQqCf+yCo15TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2022-08-09T23:37:39.2634503+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'LRTKk7asYUqWWAQD3wisYw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '5323ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xe/yYgAAAADuLCZIj43sToViGxPiPHFNTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'MS-CV',
  'K0VxMYn6aUWzLfubq13pFg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '1352ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0y+/yYgAAAAAb9zlyyhWGSZypxB/Gtw79TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MvJlRw4zwUeQ4NkM5nfzoQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '332ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zO/yYgAAAABOPyLHGITETovCaYR/iYQgTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'RmT4ufVHlUuniWh2RoGWEA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '351ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zu/yYgAAAAAbrEMqHZCzRJwWaSMxHX1cTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'mMIWAD9qFkWlMoH1ZUWTCg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '334ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00e/yYgAAAABPYpNg+bm7R5MeiD7AFvKHTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lEn0HH8ZoE+f3re1MD44Fw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '527ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00+/yYgAAAACRrWTWMHivRquv95VDM98nTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'KUx8vaeP7UOwrOX2mwWVhw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '377ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01u/yYgAAAAD8uyfTAlHxRb26q0rqW/CJTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:37:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'EH+nlSPM402xgEBzw6AC2w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '315ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02O/yYgAAAABT77oTrLd6R7+cC9bfkplQTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:38:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+eUjfeZUH0WkWf4TrckzAA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '330ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02u/yYgAAAABmq9lWvGxqQLpPCRSEVkrFTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:38:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-08-09T23:37:47.4964889+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Bz6UAIrSMEi8qtR5B7arjg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '310ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03e/yYgAAAAAV2fceLfpmT7boMBOaBmeDTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:38:05 GMT'
]);
