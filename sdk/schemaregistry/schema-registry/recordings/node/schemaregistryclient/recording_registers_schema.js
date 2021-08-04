let nock = require('nock');

module.exports.hash = "83d14d09facb4c1689550f278d0781ac";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'a63b4300-826c-4c6d-b4d0-c9822ee69e01',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ajvri9ls-AhPhBvdXfBA0VXmLYaiAQAAAP4OnNgOAAAA; expires=Fri, 03-Sep-2021 04:30:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrbe_0370i-YpCV715jf3x_JofpZk8l6h2XI4vnId317i5z-8aKJ5SP1KRwv4lNBfcynf0ni2iDOgaFINXdwMxAG14fMP1TWz2Euy8fulIBLDiHzcFNbXj8NhfT9oU_BF8v0FN9dwy01DnoqMf7JHOoXRAuhQbMP3kf6ZE2HeI_tYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 04:30:55 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/azuretenantid/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'c971b130-8b87-46e5-b4fa-d7f117b02501',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ajvri9ls-AhPhBvdXfBA0VXmLYaiAQAAAP4OnNgOAAAA; expires=Fri, 03-Sep-2021 04:30:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrl7SsiooJR_hXj15FY0-n0U5AB9gPX-Gbt3xraC7BrPtJlcH1f27mMKuCZmasRQvYdUTom_IQENm1u7XyAvRZBAaMP1q80X9r1clSGNzuXxQtOZASOFg-IVI9KZ3qs2VBJhMP_MrqOCOqlCk5KWgKJvX2KsJeXhrtVqaZNTidIRkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 04:30:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=9cd36aa7-3304-4ae7-8233-19d82c74255d&client_secret=azure_client_secret")
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
  'aebcaac3-c543-45a6-b472-76cb9bc00301',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajvri9ls-AhPhBvdXfBA0VXmLYaiAgAAAP4OnNgOAAAA; expires=Fri, 03-Sep-2021 04:30:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 04:30:55 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/$schemagroups/group-1/schemas/azsdk_js_test', {"type":"record","name":"User","namespace":"com.azure.schemaregistry.samples","fields":[{"name":"name","type":"string"},{"name":"favoriteNumber","type":"int"}]})
  .query(true)
  .reply(200, {"id":"9f5e37429ed34806bc442f39fdfce97e"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test/versions/1?api-version=2020-09-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Schema-Id',
  '9f5e37429ed34806bc442f39fdfce97e',
  'Schema-Id-Location',
  'https://endpoint:443/$schemagroups/getschemabyid/9f5e37429ed34806bc442f39fdfce97e?api-version=2020-09-01-preview',
  'Serialization-Type',
  'Avro',
  'Schema-Version',
  '1',
  'Schema-Versions-Location',
  'https://endpoint:443/$schemagroups/group-1/schemas/azsdk_js_test/versions?api-version=2020-09-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Wed, 04 Aug 2021 04:30:56 GMT'
]);
