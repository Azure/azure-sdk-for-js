let nock = require('nock');

module.exports.hash = "caf1342e0ed8a276a14cccf266d9c347";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'dc9edd29-3980-4db1-83a3-e681ba000300',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ah2-pMpF5OhJuJCj1ko1OxA; expires=Thu, 16-Dec-2021 08:40:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtRS2IFxyfu7ll9dy6DKaPScd-N9rzR1apFd9ECGT9og7yUdPLR3_WDen3lhxqlKAzOMDfX2uhHNTjod3kOw4dTIUOBMdVT2kYVLLLixnI3T8Hv_iZXb_6LjQ3I1CkeRNk5LaN3hxQhFNL3goL7-KLCwblEB5GzoUb9bGh319ZXkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:12 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '5bbba508-99e8-4683-b2bf-ca9c7b860300',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgdImOsaFaNLm5XGw9xo83U; expires=Thu, 16-Dec-2021 08:40:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruIc8JM2PdHRIabMZiirop9NCBy1j8Xe4kjr9--g0qmeUKBJ-8aJnI44SE2lcZjD8sRWc6Bl_AQoSNCDhHTQv0X5OfQHnS5vwgTGZ9s5JIRctUAL0l6If7SFsUdoVKmtN02khVCDJ3JFwykcrd9MyhRWKoao69Xt4RJwNAc9zOhEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=58272685-c569-4a39-ba18-9ceab7f931f9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'dc9edd29-3980-4db1-83a3-e681be000300',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvKu3wRqioROsFuZ62P7c0YWPr5BAQAAAGxlJdkOAAAA; expires=Thu, 16-Dec-2021 08:40:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 08:40:12 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d123feebb2688a6a592c2f5eb7594b6d3e7abd9e4ef37c96cf3e1a7d942f67abaa58b6f4f1bc6d57cda3bb7717d7b36a9115cb77efde8df3ac69d7cdf6ee38bfcc97ed455dccc6d90fd6753e5ee6eddd6c55dce5cf1b02542c57ebf6f5749e2f3282758a8f3fa7e6fac9e8a345ded6c5f455de54eb7a9a9fcda8d1f98387070f677b0fb71fccf6ee6fefe7f71f6e1f7c7a7f7ffbc1bdf37b0707f7a60f76f71fd09babf5a42ca62ff2f6aaaadf1e13ea0d8deca3d36536296908bf64f451594db39686489f0abef4529b5d50ab5f8c9fbbf4399367573edf337fefe1e50298dc6dd693665a172b8069ee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76ead43f9bcaed6ab86a8f6d34d9b37ed5da6f82caf9bbb5f14d3ba6aaaf3766cc97157488be6f21b1199b05a660b4c4cf8617bbdc2871ba07cf44bbeff4b","fe1f9f57a538fb010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '912df750-3f1a-47be-a737-93a37d6494c1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'x-ms-correlation-request-id',
  'eaae3ff9-b2e6-4083-95bd-6f3eae29f298',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T084014Z:eaae3ff9-b2e6-4083-95bd-6f3eae29f298',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 08:40:13 GMT'
]);
