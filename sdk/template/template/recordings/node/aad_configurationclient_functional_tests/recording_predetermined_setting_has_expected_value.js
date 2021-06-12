let nock = require('nock');

module.exports.hash = "e7d6668da35093a452f5002fa39a025e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '845a560c-0b9c-49d2-80ae-e340a4c94b00',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AutiBPS6JVVCpofnUQgfzVc; expires=Mon, 12-Jul-2021 01:19:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrvi5TwiN4QdJp0ujsGOfBhzxMz4QaHZQ-mtToKSpwzjybc-stn7o0IHxkNeJwUd7_Guwv3innx97QW7FIJcjy8zHlA10osbJWt0SyeMlDf78UCLcIKpihko6uJLhGzQ7Or6ExsYleCSGVGQTbw6aGI0K3Fs_7xpfvBq2xX5J-Y4kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 12 Jun 2021 01:19:08 GMT'
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
  'c9999fc3-33f9-49b4-9e84-14255d983200',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AutiBPS6JVVCpofnUQgfzVc; expires=Mon, 12-Jul-2021 01:19:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFiqNdeTS5aiOzXwUNGmnm0fn2eTxkjLQaMNlxF830nQJDLocchrHdh_MsPjxKM-WZ9okxK9vwEtfvAw3EtjRZSDBfqX8cbd4unT6MpziRYpvQFYPMM7B2eWhFz6iWcfQxb9sMSVkFwU-lE7pY7ucQU1mQh8o4_ZpxLJouVU1lXMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 12 Jun 2021 01:19:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'f863ac92-c341-46e1-9805-0ecb58593100',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AutiBPS6JVVCpofnUQgfzVeWH-CrAQAAAI0CVtgOAAAA; expires=Mon, 12-Jul-2021 01:19:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 12 Jun 2021 01:19:09 GMT',
  'Content-Length',
  '1335'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/test-key')
  .query(true)
  .reply(200, {"etag":"FQ2XSpKRpSv2FAbNvw2sdY9Hq2G","key":"test-key","label":null,"content_type":"text/plain","value":"test-value","tags":{},"locked":false,"last_modified":"2021-02-16T18:26:35+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Sat, 12 Jun 2021 01:19:09 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Last-Modified',
  'Tue, 16 Feb 2021 18:26:35 GMT',
  'ETag',
  '"FQ2XSpKRpSv2FAbNvw2sdY9Hq2G"',
  'Sync-Token',
  'zAJw6V16=MDoxNyM5MjU2Nzc3;sn=9256777',
  'x-ms-request-id',
  '49e0f773-7842-42cd-8eb0-4162bd20eb33',
  'x-ms-correlation-request-id',
  '49e0f773-7842-42cd-8eb0-4162bd20eb33',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
