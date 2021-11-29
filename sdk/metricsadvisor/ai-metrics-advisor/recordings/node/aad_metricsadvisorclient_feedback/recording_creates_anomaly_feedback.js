let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

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
  'f691aa22-4f89-4cff-b5ce-798fb4d10200',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoQEiqQ85T9LjmzwU56P3JA; expires=Sun, 12-Dec-2021 00:57:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1_jgoIkLKgSojMyPQhCmu7AhzADrWLlwGiL8ro8r6eN-n0kG9ZGR2rFRTKlg3GIjeOwusVdyiNK52nN7zyCR0sUtnydMPi4hL9LxAXxAqgXJ8jgbC480kKlB23kdSrjzZYZ6VWhhHOcRe7zjhFdLkUk_1qDzAkO7HGn4zUW4cJcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:34 GMT',
  'Connection',
  'close',
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
  '86a59bcc-0e6f-4656-9441-c590e0695500',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArJ73ibGswxDp3RRG92msa0; expires=Sun, 12-Dec-2021 00:57:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlG1UnaaTrdkoZSHkBc-g2BJtkl_K0m9uVtHktutuGrl9BS-f9aGoe_uOok8cv_V0pCHl2z2SItGskAorLKAZePVcx02mh5hqaQ_VT8xPdiY8A0CROiIdzeSvnmfUqd0IPKOktBCxGU_egTaJKqRxGpYc9gqlmsT4qQnk7xLzRR0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b0fb1afa-bf6f-416a-8dc8-bb653c01cc51&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '0730ccb1-626c-4c0b-b74f-ca6d62eb5a00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ahv4qhufxWNNsoSqDp7_zJA; expires=Sun, 12-Dec-2021 00:57:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 12 Nov 2021 00:57:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/565d50f5-eeab-4efb-b243-eedb739dcdce',
  'x-request-id',
  '3e036c61-3e33-4234-a719-46f8b256df70',
  'x-envoy-upstream-service-time',
  '591',
  'apim-request-id',
  '3e036c61-3e33-4234-a719-46f8b256df70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:57:36 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/565d50f5-eeab-4efb-b243-eedb739dcdce')
  .reply(200, {"feedbackId":"565d50f5-eeab-4efb-b243-eedb739dcdce","createdTime":"2021-11-12T00:57:36.837Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '408',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bead934e-da07-4d36-852f-9f9ff5ad2f93',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'bead934e-da07-4d36-852f-9f9ff5ad2f93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 12 Nov 2021 00:57:36 GMT',
  'Connection',
  'close'
]);
