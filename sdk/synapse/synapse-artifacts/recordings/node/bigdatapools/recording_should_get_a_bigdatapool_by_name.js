let nock = require('nock');

module.exports.hash = "224e437908007396c645e45dd9a5f2bb";

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
  '420cf881-d596-4f00-940d-cb7ed6467f00',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:39:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-w6vJoiYBbzdB6xLy4OIGhkJs-W4djGNAqCuDJUwteDQLcfzZFe_zW1_beZFWwAb6WVZTdwJ14NxiC179DaH56i-hlWLv7Osfk400qHqJAP5AUPYlnmDjyhj8f4ssaOgP6unCD6GtJoJLkI9g134va6WQQASdscfalkoQ3EGOWogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:52 GMT',
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
  '6f333939-cabf-4c50-acb0-3232c42e2500',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:39:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNzbDGQPAX2wenVvUGmepdF6IQ4RXa80TSbxfmrpdcgArxrtPVFR9ocEwvBhtEnRU7dbaVf7HbwwQNAlD9vXtcuF3nqwDJJ65D0RZtlV10M3J_WYQyxFATpaX6BLkDzapUhQCs5HNamJF4jxQ1w6cEWpd0XKEy69Kh4bKjQqo0aMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=8d69af6e-5077-4d24-b024-5360d906ac9c&client_secret=azure_client_secret")
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
  '1391a666-56bd-4c26-8f37-26c07e0c2400',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:39:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:52 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/bigDataPools/testsparkpool')
  .query(true)
  .reply(200, {"properties":{"creationDate":"2020-11-18T19:10:21.6Z","sparkVersion":"2.4","nodeCount":10,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2021-05-18T11:44:57.77Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/testsparkpool","name":"testsparkpool","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}}, [
  'Content-Length',
  '756',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0c95fcff-5eb0-4790-aa03-a9d859c45da3',
  'Date',
  'Fri, 11 Jun 2021 18:39:53 GMT',
  'Connection',
  'close'
]);
