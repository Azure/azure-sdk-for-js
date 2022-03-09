let nock = require('nock');

module.exports.hash = "49ee0255ff279d99052929bd49bc21b8";

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
  '436a5d4f-8e50-4a03-a510-b63156466800',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtA-U6ETyI5Ll--jQBC5CtE; expires=Wed, 03-Nov-2021 18:24:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrG5PYxDj9hfDA4_bN1kKeFKEILLk6DKINph2_2vespbhoNz5w28yqJavDe7uDMNkhErJMH2ecoovWyPOfFHDc61K9BJL23D6mIZUmcA6En2O5DT9QFLxja1wkTLXgKeEQhT7iMIjFNJ99GJVPN-XLQ9yC_byX861lgxQ36LOi2TAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:24:26 GMT',
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
  'c9d9b4d8-53c5-4802-8f83-4639ce7a4b00',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=At_H_jqNszNLj8JqT8JFq9E; expires=Wed, 03-Nov-2021 18:24:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2DmDG7-t_PhKtu9KwF3p781f5Sk48XrztLO80Pm89KDi8v37jlP6FmpwQ6FJDvGTdzzttTltNPKl89Q98v52y4gmh_yyQG_bVGgcyZADQmCgiQneYRFGjILUBENRoQ1B5NMcCU6Kia2rM7hxZiP3repHsi63sSUlGw_riO-cb9IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:24:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=cc15f418-0e21-4ea0-bb9a-87a76b4e358e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'bb56a55a-220c-41b5-abec-c93d12094b00',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak5BMSz9WddDscM7G9eJGtKU1ubLAQAAANo97dgOAAAA; expires=Wed, 03-Nov-2021 18:24:27 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  '216',
  'apim-request-id',
  '0057d4f1-275b-4424-8c62-38d2526f4b89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:24:27 GMT'
]);
