let nock = require('nock');

module.exports.hash = "fcae71fe9c0a2f3a3343d2cefa28466e";

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
  '8b07acae-1cf9-4d56-8538-d1dd00594e00',
  'x-ms-ests-server',
  '2.1.12071.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AowcZctkwE1Kg2HQ6u10E1M; expires=Wed, 03-Nov-2021 18:24:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSF9xz4b2o5xnhj1QggXbgQbew5Db0SIGBKRJWlMwFZnRLgfZFrj-wg6T0YlwD_wleYqeOsKrOArCReB9d6EfmX3VL8shqgT1E8ZubtkiX1NtpRQ05dw7Pt242FBDDhlxEOiDrQ8Jn2-0bo8oirD4JMwqoettouJ6b2bdSGMUCT4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:24:27 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '4285420d-4c63-4f6f-92cf-601a6a553d00',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkyN_3YmAmdDrMJ0XrLmaag; expires=Wed, 03-Nov-2021 18:24:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroQW8gGE0KLVJgljctgXBHRidrUwF8ppRtGX9a5iIO_pC9nCNWCFqVmnnERpE9U8IDjeQhEbFhsT8mqmnbYC-DnwfpkelZlAN4kZPNcAhOaK3Me9G2Jla_FqPLpEioewfkqv0tJxpuDEptK7QPpxY2W86DZkwQXYyvcNmna1L6DUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:24:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7d82804d-554d-43d9-9de9-d80467ad3c6c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '07c9bf16-69ed-4f7c-9348-397697ce5300',
  'x-ms-ests-server',
  '2.1.12071.28 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=As3wk9obUopLpnfo_y5qTek; expires=Wed, 03-Nov-2021 18:24:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:24:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels')
  .query(true)
  .reply(200, {"value":[{"modelId":"prebuilt-idDocument","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from US driver licenses and international passports."},{"modelId":"prebuilt-layout","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract text, selection marks, tables, and other layout information."},{"modelId":"prebuilt-invoice","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English invoices, including customer, vendor, invoice ID, due date, total, and more."},{"modelId":"prebuilt-document","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract text, selection marks, tables, entities, and general key-value pairs."},{"modelId":"prebuilt-receipt","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English receipts, including merchant name, transaction date, transaction total, and more."},{"modelId":"prebuilt-businessCard","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English business cards, including personal contact info, company name, job title, and more."},{"modelId":"copyTarget163337131337006713","createdDateTime":"2021-10-04T18:15:09Z"},{"modelId":"composedModelName163337183914902643","createdDateTime":"2021-10-04T18:23:59Z"},{"modelId":"modelName163337185322503533","createdDateTime":"2021-10-04T18:24:15Z"},{"modelId":"azsdkJavaScript037058","createdDateTime":"2021-10-04T18:10:39Z"},{"modelId":"input2163337183083602943","createdDateTime":"2021-10-04T18:23:54Z"},{"modelId":"copySource163337130657801160","createdDateTime":"2021-10-04T18:15:09Z"},{"modelId":"customFormModelName163337115963302920","createdDateTime":"2021-10-04T18:12:42Z"},{"modelId":"input1163337125098407403","createdDateTime":"2021-10-04T18:14:13Z"},{"modelId":"composedModelName163337130609209319","createdDateTime":"2021-10-04T18:15:06Z"},{"modelId":"input2163337125098509178","createdDateTime":"2021-10-04T18:14:13Z"},{"modelId":"input1163337183083404470","createdDateTime":"2021-10-04T18:23:53Z"},{"modelId":"copySource163337125885001523","createdDateTime":"2021-10-04T18:14:21Z"},{"modelId":"customFormModelName163337173870804431","createdDateTime":"2021-10-04T18:22:21Z"},{"modelId":"copySource163337183967902573","createdDateTime":"2021-10-04T18:24:02Z"},{"modelId":"customFormModelName163337159276803720","createdDateTime":"2021-10-04T18:19:55Z"},{"modelId":"copyTarget163337184656409458","createdDateTime":"2021-10-04T18:24:02Z"},{"modelId":"copyTarget163337126577104571","createdDateTime":"2021-10-04T18:14:21Z"},{"modelId":"input2163337129909206437","createdDateTime":"2021-10-04T18:15:01Z"},{"modelId":"composedModelName163337125806502764","createdDateTime":"2021-10-04T18:14:18Z"},{"modelId":"input1163337129908806200","createdDateTime":"2021-10-04T18:15:01Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'ffccbdb1-c266-4a6d-89ec-46ea142f38a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:27 GMT'
]);
