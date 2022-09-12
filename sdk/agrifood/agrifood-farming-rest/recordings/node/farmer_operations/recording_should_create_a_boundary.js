let nock = require('nock');

module.exports.hash = "4890ffd8acc8dcbe145ca1f8a90c6011";

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
  'cdaf6c33-6ca9-4ea0-b02f-3f0247431d00',
  'x-ms-ests-server',
  '2.1.13672.7 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtIwVTi4JaBLvQTZr7N8IB8; expires=Wed, 12-Oct-2022 21:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUNU0G5rGhoFAEeRNFhEYnn9I0xYkQTyPUgHyG7LQV3Nb0KsnDaChd0cdpUSSGOdsiR7E6dYeLYnCIThyNj7m8RbJuU3_NP_fNjzJbgOyt-sPxiLB1KRW53-xiPmjGRkZq67lWBUvKIHxOJ0BxaJD268wUJMcM-WFiR8k18jIts8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Sep 2022 21:07:45 GMT',
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
  '09bae718-75f6-41b7-a698-047d40bf1400',
  'x-ms-ests-server',
  '2.1.13672.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AttYLhLs00xFss2-KVT_I48; expires=Wed, 12-Oct-2022 21:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9ueczumUTntW2gB--Nn7-M62UbHnv72uZytH4LZNJlIlgkyYwQdTLfWAdbbBoFOMk7AasUwZV2Ramiu5lO76bf4kTQkuQzDMM_AtOjfG5mYPaNLUpQ60dIWPpiYB8GV9-H3bH9pSaw7hJ94AqvBlnT67JfnVpsvxSBH4G6RNHmcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Sep 2022 21:07:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.13.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f7dc65a5-851d-4a0b-8662-53645a678ece&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'ccd55916-ec1f-4d49-9770-dbe2bd761800',
  'x-ms-ests-server',
  '2.1.13672.7 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Auujb5CQjVlJoWvshLFWBGkU3PbiAQAAAKKWsdoOAAAA; expires=Wed, 12-Oct-2022 21:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Sep 2022 21:07:46 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/tst103node/boundaries/jhboundary103node', {"geometry":{"coordinates":[[[-6.6730517,43.5298824],[-6.676265,43.5262614],[-6.6757983,43.5260669],[-6.6760236,43.5254835],[-6.6768819,43.5245228],[-6.6760075,43.5243322],[-6.6753209,43.5252112],[-6.6744518,43.5247095],[-6.6730678,43.525114],[-6.6723222,43.5256702],[-6.6739959,43.5264753],[-6.6726387,43.5274282],[-6.6712493,43.5279261],[-6.6703159,43.5280428],[-6.6693288,43.5277394],[-6.6692644,43.52807],[-6.6694576,43.5282256],[-6.671319,43.5294274],[-6.6717964,43.5296024],[-6.6730303,43.5298824],[-6.6730517,43.5298824]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(200, ["1f8b08000000000004037c52c16ae33010fd95a2b31d4633d28ce46b7b597a296c4e1b72706239f552c7c5760fa1f4df57c6b2c252a80d62787ef3347ef33ed5250c7d98c79baa3ed57c7b0faa522fc3dbed325c55a1cec33036ddb59ec3a4aac3e150f28e85c06a290ced2c7ae7d01c8b156764bbc2b1d219b6e21d251c987da60312afb8358e6cc69dd37ec58d4574190790a46f881037dc1242e25bd43ae3c658ed928e80cffa042c09b7fa3e2646494ce3b0409621ef6d92672396b66b91c92517c4a0cb7c8dc6a7df151f7dd8f8407ad371101b12ce9ed0a57144c86fb671ec35669dc78164b6b1924c73889637754d9b67dea06c22a2c57312f10cf75511c47715ff6f85df567b3c7e15aaadc73e8cbf9a188d799a35d07568424c4737bd8c5d5f2fd969ebb72914aa3e8fa1bec40c91d921bb48599afebe9e868f6b1389f7deb0af2ff113c4c79c48caa528819763a99874eb5b5a6a58721865e7d03cc563dff54b4611104bf0a5c63dea0aa842fa1389fdd0746df713532ac30bb309d379ecdee72e06bd528feb050fa7dbc3efa767f5f50f0000ffff","0300c678fea718030000"], [
  'Date',
  'Mon, 12 Sep 2022 21:07:46 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'mise-correlation-id',
  '2a86f136-bb42-4bbd-a76f-7f575221a01a',
  'api-supported-versions',
  '2021-07-31-preview',
  'api-deprecated-versions',
  '2021-03-31-preview',
  'x-ms-throttle-information',
  '50',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
