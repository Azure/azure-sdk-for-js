let nock = require('nock');

module.exports.hash = "0bc4f15d2e4dca6ef3360659f801809a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '0f5485f8-526c-4f38-b6a9-f063c1320800',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjqWzs9vx0ROioPGjf0tzwc; expires=Tue, 26-Oct-2021 01:02:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevro2PguNbtpzwvOAWugAVgtMnh6m_0XIR87ujjIM7hPuUTnqAPjBgn7KK_u-kgfj0fRHQNZM5bDDEgLBvUNd5YZdqya2p4k1Q1ep1mxd5gTQn58HUifjMFJNa9TR2DI-O6QTyuSjiISzR0Uj-GjABfEyqpU2EyyjMwJxv_YBB83uIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:52 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/azure_tenant_id/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '92bfbd7a-8635-4e82-81bf-0d96dacd1d00',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkfjpIl2d51PplIld6BWzBA; expires=Tue, 26-Oct-2021 01:02:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUwydcchTKUHvNiW-OjiEoT1JdUX6kGv85VSu1yyBQ5OvzLHWfp7vPhopv1DQebrTyFi6zIj3cgJNaYAwnJkknrlgiD05vn8EtB2zKKNTAhapBkbwZNM2Phuv5DcXg6QQMwZBhUU2ksH517YTaygb2v6Lg6ngh-n5T6mZf7z4ZBsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1f2cc160-3a91-4178-8a82-bc0d02321d4c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'f36c0617-e7d4-4e94-a042-cd03b7c41f00',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AivcYGxaYXVFjDDXZOg8Ky_KBMGnAQAAALy94dgOAAAA; expires=Tue, 26-Oct-2021 01:02:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 26 Sep 2021 01:02:53 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/%3Cworkspace-id%3E/query', {"query":"datatable (s: string, i: long) [ \"a\", 1, \"b\", 2, \"c\", 3 ] | render columnchart with (title=\"the chart title\", xtitle=\"the x axis title\")","timespan":"P1D"})
  .reply(200, ["1f8b08000000000000035590414fc3300c85ff4ae5732ec0ad37b43313306e550f5e67360b379912071aaafe779a7664db29f9de7b719e3c82e25e2840dd8c60b127a8e1d5738f3ebd5388a260a073127b7b1709b3ace9bc5cd5b33dc2648ac957535cb65a03defde4010d209887d634b007f398cf0ecc53db2e11b207f2508ff0cd21a2f02f2a3b3b4f590b7427f4b98eb24a9ead27aa16ad5a1503d875b18f823adb9f28810c70788be4d3ce79a54351bfd8ce60a38801a1235d2990e7bc8d95d20be7ffb7b8850c3814189e072eb161b3142cf871d370a8704e968ae9f65ddafc6ff6c2bbb3b016ba8c5909adeb51ee5f4cd31ff59afed7bf010000"], [
  'Date',
  'Sun, 26 Sep 2021 01:02:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-4kbg8',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'Retry-After,Age,WWW-Authenticate,x-resource-identities,x-ms-status-location',
  'Vary',
  'Accept-Encoding',
  'Content-Encoding',
  'gzip'
]);
