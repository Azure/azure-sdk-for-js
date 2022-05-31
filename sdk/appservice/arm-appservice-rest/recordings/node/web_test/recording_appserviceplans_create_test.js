let nock = require('nock');

module.exports.hash = "8e276a58d19450c915752db19990e994";

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
  '8347f94c-67d6-49fe-87f8-43acfb850d00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmC1ZRdWrBxHpTFK0wrTdlE; expires=Thu, 30-Jun-2022 03:48:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraTvV_wNJLlsVJzmVX-In1KxYZAcv5eQWEfNVv1P0PDBd4WrtYHkSSp5-mabz7moIu6Z1N0P5rlJf43GPEcU1FPvf8-0YuM9nlr0mK7TYkm6EBzdPLGwriBIdcZFU-r0uNd0R6pcQYqrRtQisdT1Vj8SQxWKmD_BX5HgthWiHbL4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:11 GMT',
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
  'fb5a535c-34a8-46f1-8d9b-3f1ee7631c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aq9QJCrilx1JjDxOCbDwQe8; expires=Thu, 30-Jun-2022 03:48:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxKJfqshYyFBXgVz_O--Zw7pQSalTl8WRwDGn8GtILD9VU0HzEvQvjNB9iGBUTEsJBp3VbydQIrXfQWAhH_2ONuvuPlJBCG_e3kZp5OP9g2ftSyGEM9BhcXVlmF4NEc6PqTmjIPabIKjzyTjlQT7AN2peMvYHzXcKTU5qINrsrwQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a902490e-2c3b-444c-9071-853923c58b24&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'fb5a535c-34a8-46f1-8d9b-3f1ee8631c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhsL_51UdEZPjtEt1X1mYpEX6p3SAQAAAPuGJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:11 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx', {"location":"eastus","sku":{"name":"S1","tier":"STANDARD","capacity":1},"properties":{"perSiteScaling":false,"isXenon":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36797d99d7e759bd40e36cb5c207c5345f95d9f2ddbb771f8d3e5a668b9c90897fd95eaff0e5204c6af2b6586230f436fd5156d30ca3a10ff2ac69d76840a8adf2ba2df2e6a347bff82379f919bd7c46afeded3fdc3bb80187e6ed1a2f6a9bd7bbf41101abf17b9b2d67593da34f9ae207f6dbf36c5194d7f88bfe9866ab6c5ab4f4e7ee2f197d7455d56ff3fab5347e9a9f67ebb2a546ee6320b5633e7843ddbce06e97ebb22434d78b495e7f79fe5dfe9686b34bf0d7759d2f5bf9081002c0bd6f15be7efe2202b06933d0edd147aff26c764d30aef2c96b1a03009be9de3ecd9af6abd7f44dc3dfd05b1e2b51c3dbf012bd95cd16c5f275d1e6fe28e755d316cb8bd3e5655157cb05a139fccdcbba3a2f4afbea227b572cd68bdeb068c4984fe9e5a39f2cea769d954ff35941dc92cf5ed257069957eb655b2cf22e4ed36ab15ab7f917d58c3e22faea9bf456432de56369799157aff20ba102a8947e052e200604c8d7d3aca4017cf4e83c2b9b7cf4515e528b628a8ff3d365362909a4f94ec7722a4d64282715a1c7b36458015065807de260ae05a9a279bdaae84505ddd01fa7ef5645cdb2f286c66b1a9ed779fee5f9795ec7bf6eb30bea4c7e0fe42e500bf4a96114f98a24ca1b58d1fcdef912f4d1bfe724e3f54fda3f173396cc8faeb2ab669b6477b63d29d7dbf7761efcfe2cac04b1cdea8b5c795a2942e3f73ff5389d205c160d8d836843f2dad2583e7abd9e4ef37c46380977130dd15ac695bf2b9890af81b52a0a37e8f58426ca52b8c37e3fa896f9ab7cb626a500a4784024f4df9c02f925","ff0f235cf756ba050000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  '"1D874A14876D3D5"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '394233ff-c76a-4d07-b6b9-a2a2f96f64df',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '788d9ff7-f1a6-438c-9b23-f4adc5364bcd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034827Z:788d9ff7-f1a6-438c-9b23-f4adc5364bcd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:48:27 GMT'
]);
