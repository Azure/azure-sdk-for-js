let nock = require('nock');

module.exports.hash = "c93e9800b71f96d01ca5cd1dc509af37";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '688862cb-8d62-4d59-89df-92c738877800',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoQojAoaBEpPo_mb9ee1v20; expires=Sat, 13-Aug-2022 02:58:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOpUZte-ec-Ru6531hqUcuUMOIL6AXuvjOC0W-8uNLG2VyjyJWgTb8APimaounWvIk_ScRVraiz2QVCgjmj6Nm9soSMQMjyK1w4z70JM1YSNQYFMwDGbh6Q9XGJGnP2vZA_S7xTlEC_1G5B_tBmB5oRMp8NbSkLHnjAThiiwi5NIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '56d93251-2748-4d87-86cf-5837126a8100',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ath-s_tW6NdDsxe5EtnmRiI; expires=Sat, 13-Aug-2022 02:58:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2-mcTa09yBKSwAw_YyR3XXIieXyudeV4wuVfP9Xrqs7RQcnEBn3uWlrLp5yuXNsR4jdUBDB7FM0vOrXlILRw80IkfJT3Y5qfpCTZyNzj4-UbKlArxPZ778-7h9-okuGfwMMQWgU3cqB-RVqSza3pTkcjILKtZpO-VxrwXtFhh_IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=08eca6a5-8cbe-4827-b097-bda233d42689&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '35c3aa3f-80ec-4932-8af7-44e515d67e00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AsVHvoRvVbRGsTisFUNEOznhHQjEAQAAAGp9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a4abc75a-6271-4cef-914b-9ce9429ff28c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '7031c3b2-5555-47c9-82a2-276f71477400',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AieNbODX_i5Gr2XoWZO3ZxXhHQjEAQAAAGp9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '1319'
]);

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
  'd22fd26a-4c4a-4d89-b5cf-c5b2a0af3600',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aufrmx3e64ZKhzuNQu6fWGM; expires=Sat, 13-Aug-2022 02:58:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrX2g21q-YpzwLpbqMoLb41EzOVxTtr-hgJCLfQtJpUTqNieS1ol0-lnFNh1K7FYbBPq22_4Bi9WXfkGcNCl-I24JC4kFK-ZUVFUIHFnUnFuFuV6m-ge5eKzPqg_q9rlsGOMztFOFv6DkJBfx8Qdi9lYchKzHJ4AqSp8XKJttJcVIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '980'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"maxDetourTime value should be between 0 and 3600 inclusive"}}, [
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: A58A986654724186959C33DDA064BA4C Ref B: TYBEDGE0909 Ref C: 2022-07-14T02:58:51Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:51 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'c1d7cc7b-4cc5-42fd-8125-f1b4a7d98100',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ahkoa5t_xIpFrlboRszCt4M; expires=Sat, 13-Aug-2022 02:58:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzKa1ycAwwTYFUYlvYRVcRKR3J0Td7u_9hwVkF4U34lGm3mt9VnCv7tHyczeH6vRsOj4XFWDD1DFQnVFP6rVxycgfR4tWxe7rs7tiuGGzmwRCFW9MX2rYR9y-MLcvkjpHo_nQwu4vlf61afJbTAhrEL3ZSCaFGfbtOkXb0k30rkkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"query is missing or empty"}}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 3C9506DD5305472E9FC675D7A0EC9DC4 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:51Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ea3c6420-9265-4ca1-95e4-7106d230a889&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '99304b9e-5915-4b5e-90fa-0e3a7fb37d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqPcwV-W5qZDi9EpXUe7OyLhHQjEAQAAAGt9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:51 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(200, {"summary":{"query":"burger","queryType":"NON_NEAR","queryTime":190,"numResults":10,"offset":0,"totalResults":10,"fuzzyLevel":1},"results":[{"type":"POI","id":"840539003143944","score":2.8276119232,"dist":269.1682087059635,"query":"burger","info":"search:ta:840539003143944-US","poi":{"name":"Burgers","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"15701","streetName":"Northeast 39th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15701 Northeast 39th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64376,"lon":-122.1281},"viewport":{"topLeftPoint":{"lat":47.64491,"lon":-122.12981},"btmRightPoint":{"lat":47.64261,"lon":-122.12639}},"entryPoints":[{"type":"main","position":{"lat":47.64491,"lon":-122.1281}}],"detourTime":-324,"detourDistance":-18837},{"type":"POI","id":"840539003147851","score":2.7635474205,"dist":2577.017642893502,"query":"burger","info":"search:ta:840539003147851-US","poi":{"name":"Three B's Burgers","categorySet":[{"id":7315069}],"url":"www.3bsburgers.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"7990","streetName":"Leary Way Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-3840","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"7990 Leary Way Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.67464,"lon":-122.1222},"viewport":{"topLeftPoint":{"lat":47.67554,"lon":-122.12354},"btmRightPoint":{"lat":47.67374,"lon":-122.12086}},"entryPoints":[{"type":"main","position":{"lat":47.6747,"lon":-122.12246}}],"detourTime":-269,"detourDistance":-16586},{"type":"POI","id":"840539003094440","score":2.7635157108,"dist":2584.704932906075,"query":"burger","info":"search:ta:840539003094440-US","poi":{"name":"Burgers N Gyros","categorySet":[{"id":7315023}],"categories":["indian","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"indian"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-4435","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.67332,"lon":-122.11982},"viewport":{"topLeftPoint":{"lat":47.67422,"lon":-122.12116},"btmRightPoint":{"lat":47.67242,"lon":-122.11848}},"entryPoints":[{"type":"main","position":{"lat":47.67339,"lon":-122.11979}}],"detourTime":-163,"detourDistance":-16255},{"type":"POI","id":"840539003111665","score":2.7932035923,"dist":1954.6986877881363,"query":"burger","info":"search:ta:840539003111665-US","poi":{"name":"Burger Hut","phone":"+1 425-643-3985","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"14603","streetName":"Northeast 20th Street","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-3712","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"14603 Northeast 20th Street, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.62697,"lon":-122.14497},"viewport":{"topLeftPoint":{"lat":47.62787,"lon":-122.1463},"btmRightPoint":{"lat":47.62607,"lon":-122.14364}},"entryPoints":[{"type":"main","position":{"lat":47.62783,"lon":-122.14496}}],"detourTime":111,"detourDistance":-7743},{"type":"POI","id":"840539000289900","score":2.7962782383,"dist":1191.0238462297789,"query":"burger","info":"search:ta:840539000289900-US","poi":{"name":"Herfy's Burger","phone":"+1 425-641-2003","categorySet":[{"id":7315015}],"url":"www.yelp.com/biz/herfys-burgers-redmond-2","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"15167","streetName":"Northeast 24th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5544","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15167 Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63139,"lon":-122.13889},"viewport":{"topLeftPoint":{"lat":47.63229,"lon":-122.14022},"btmRightPoint":{"lat":47.63049,"lon":-122.13756}},"entryPoints":[{"type":"main","position":{"lat":47.63149,"lon":-122.1388}}],"detourTime":124,"detourDistance":-7284},{"type":"POI","id":"840539002288639","score":2.7890250683,"dist":2963.10210231557,"query":"burger","info":"search:ta:840539002288639-US","poi":{"name":"Burgermaster","phone":"+1 425-827-9566","categorySet":[{"id":7315069}],"url":"burgermaster.biz","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"10606","streetName":"Northup Way","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-1418","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"10606 Northup Way, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.64224,"lon":-122.19906},"viewport":{"topLeftPoint":{"lat":47.64314,"lon":-122.20039},"btmRightPoint":{"lat":47.64134,"lon":-122.19773}},"entryPoints":[{"type":"main","position":{"lat":47.64205,"lon":-122.19927}}],"detourTime":211,"detourDistance":1468},{"type":"POI","id":"840539000634040","score":2.7678313255,"dist":1519.0817019821163,"query":"burger","info":"search:ta:840539000634040-US","poi":{"name":"Wayback Burgers","phone":"+1 425-644-1300","brands":[{"name":"Wayback Burgers"}],"categorySet":[{"id":7315015}],"url":"www.waybackburgers.com","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"1645","streetName":"140th Avenue Northeast","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1645 140th Avenue Northeast, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.62626,"lon":-122.15487},"viewport":{"topLeftPoint":{"lat":47.62716,"lon":-122.1562},"btmRightPoint":{"lat":47.62536,"lon":-122.15354}},"entryPoints":[{"type":"minor","position":{"lat":47.62645,"lon":-122.15446}},{"type":"main","position":{"lat":47.62579,"lon":-122.15377}}],"detourTime":221,"detourDistance":-6586},{"type":"POI","id":"840531000465149","score":2.898733139,"dist":161.17565489389224,"query":"burger","info":"search:ta:840531000465149-US","poi":{"name":"BURGER KING","phone":"+1 425-453-5775","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2700","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"11723","streetName":"Northeast 8th Street","municipalitySubdivision":"Willburton","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-3003","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"11723 Northeast 8th Street, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.61683,"lon":-122.18338},"viewport":{"topLeftPoint":{"lat":47.61773,"lon":-122.18471},"btmRightPoint":{"lat":47.61593,"lon":-122.18205}},"entryPoints":[{"type":"main","position":{"lat":47.61723,"lon":-122.1834}}],"detourTime":241,"detourDistance":309},{"type":"POI","id":"840539003043271","score":2.7946410179,"dist":1600.029196161281,"query":"burger","info":"search:ta:840539003043271-US","poi":{"name":"Burger Brawler","phone":"+1 425-362-6071","categorySet":[{"id":9379006}],"categories":["cocktail bar","nightlife"],"classifications":[{"code":"NIGHTLIFE","names":[{"nameLocale":"en-US","name":"nightlife"},{"nameLocale":"en-US","name":"cocktail bar"}]}]},"address":{"streetNumber":"500","streetName":"Bellevue Way Northeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-5015","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"500 Bellevue Way Northeast, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.61464,"lon":-122.20125},"viewport":{"topLeftPoint":{"lat":47.61554,"lon":-122.20258},"btmRightPoint":{"lat":47.61374,"lon":-122.19992}},"entryPoints":[{"type":"main","position":{"lat":47.61463,"lon":-122.20158}}],"detourTime":317,"detourDistance":1147},{"type":"POI","id":"840539003122177","score":2.7946257591,"dist":1603.845158876708,"query":"burger","info":"search:ta:840539003122177-US","poi":{"name":"Burger Brawler","phone":"+1 425-362-6082","categorySet":[{"id":7315069}],"url":"www.lincolnsfh.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"440","streetName":"Bellevue Way Northeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-5015","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"440 Bellevue Way Northeast, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.61443,"lon":-122.20124},"viewport":{"topLeftPoint":{"lat":47.61533,"lon":-122.20257},"btmRightPoint":{"lat":47.61353,"lon":-122.19991}},"entryPoints":[{"type":"main","position":{"lat":47.61442,"lon":-122.20157}}],"detourTime":317,"detourDistance":1147}]}, [
  'Content-Length',
  '11287',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,X-HTTP-Method-Override',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 8FC9D2B2487B4E4A9314DD9B2506322D Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:51Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:50 GMT'
]);
