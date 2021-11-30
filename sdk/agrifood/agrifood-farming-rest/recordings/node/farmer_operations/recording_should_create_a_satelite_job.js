let nock = require('nock');

module.exports.hash = "ef90c96725e8c95905086af9bf6b09e1";

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
  '9e234753-6c5a-482d-ae7f-22f585373500',
  'x-ms-ests-server',
  '2.1.12171.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjzI5DIPRPNHvurap9W0bwY; expires=Sat, 04-Dec-2021 17:00:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH4GJxAZlBm0-N4C0GczFumm9vTCIzoR8GjBOsteQneoRM9M2UePAoDy_A9MyCztXYizuBxSYwbK4sQywqbTqxRg0CbEMp2XPTZllTlR8kuvZyNcJqOlG5_xzH2brFVgUX2EUFBdw7ud-Vj7TrbqbzF6OeqeraHOfHeGkOFll8l0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
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
  'd3251d70-200f-455f-96e5-a17a89251a00',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiGLCHnLe_1IiA_x0kueywk; expires=Sat, 04-Dec-2021 17:00:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrscFeqmb8uELOoFupCHO2IY_9QdkFxV803PGOqpDc3BFnwqOiiUSja-mhPgPKcFMVQ65BfwEgyyMugasZyJ1pu3uzMWjzhuJNsLsaccwvIWIKLQH2E-xXDWu9t3582p8aeFC7_7t_D0V6iIW-6DbcoIn_kRb_9J5uPc2B7j6bTWIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=61e2bf72-40c7-4192-a067-a36deb3121f5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '12888e90-b00b-4945-a1ac-e4eee3cf2b00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhlnvcpZz1tCjuI5PJvkwWp4ycTJAQAAAKkIFtkOAAAA; expires=Sat, 04-Dec-2021 17:00:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:26 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .put('/scenes/satellite/ingest-data/jhjob103node', {"farmerId":"tst103node","boundaryId":"jhboundary103node","startDateTime":"2020-02-01T08:00:00.000Z","endDateTime":"2020-03-02T08:00:00.000Z","data":{"imageNames":["LAI"]}})
  .query(true)
  .reply(202, {"farmerId":"tst103node","boundaryId":"jhboundary103node","startDateTime":"2020-02-01T08:00:00Z","endDateTime":"2020-03-02T08:00:00Z","provider":"Microsoft","source":"Sentinel_2_L2A","data":{"imageNames":["LAI"],"imageFormats":["TIF"],"imageResolutions":[10]},"id":"jhjob103node","status":"Waiting","message":"Created job 'jhjob103node' to fetch satellite data for boundary 'jhboundary103node' from startDate '02/01/2020' to endDate '03/02/2020' (both inclusive).","createdDateTime":"2021-11-04T17:00:26Z","lastActionDateTime":"2021-11-04T17:00:26Z","startTime":"2021-11-04T17:00:26Z"}, [
  'Date',
  'Thu, 04 Nov 2021 17:00:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '587',
  'Connection',
  'keep-alive',
  'location',
  'https://endpoint/scenes/satellite/ingest-data/jhjob103node?api-version=2021-03-31-preview',
  'x-ms-request-id',
  '0HMCT634G9F1L:00000001',
  'operation-location',
  'https://endpoint/scenes/satellite/ingest-data/jhjob103node?api-version=2021-03-31-preview',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/scenes/satellite/ingest-data/jhjob103node')
  .query(true)
  .reply(200, ["1f8b08000000000004038451c16ac24010fd95652f69c1e86e2c6dc94d5a04c1f6d0060a2d226b766256926cd99d0845fcf7ce46a3150f851c366fde7b33f366c70be56a7033cd538e1ea5183756031ff0956d1baddc4f57d994fdef99e051397c560899a981d48948442c9258c84c3ca642d0f7493ed0e82bd2987817a46f67b74683239b17933beb6d81a4f5b67579f07e87064d03d53259ce930955b442c5d31d37b55ac3abaac1f3f48bcf2733be181cc0a975b5c20ece66d313fc06de562d1adb84921443b1d89322acbf29377675b11fb644e21fca50f33575a5369efa11f6e48036d78c142cfa2b8c185a5600e625f3c4a82a83c0c2b4acb08ef529064dff3e768c58e16ccd4ea9b2482423214721d6cef41824e1e311950ef8cdca62c94c9357ad375bb81dd294f961b6cbd4652c652cee32f9104e93dc87d354cae3240f59fccfede63a5ffada6eff0b0000ffff","0300a5ef0ff44b020000"], [
  'Date',
  'Thu, 04 Nov 2021 17:00:26 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HMCT63CUIKQP:00000001',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '1',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
