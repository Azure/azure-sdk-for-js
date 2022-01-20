let nock = require('nock');

module.exports.hash = "b6fc337034a48bdfeaa78fa54b440a48";

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
  '2ae9bd2b-fb8c-4b2a-8267-2711f5df5600',
  'x-ms-ests-server',
  '2.1.12261.22 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al8rv2FE2hpMgTBgA8RMNZc; expires=Sat, 19-Feb-2022 00:58:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnedFcHzfQr_WXm5mmGe44m1fDIITHWt-WiYlM1D4J1p1GRywyX2wO0nfGl2kIm75RrOAcrV5HKeyJPHBaBZuTHE5rSIkcRBtazAga2CxD61EUsHC22qTuqoIPic8e7eA_SVp9iW2aR-afp7fwIyuc5azbLNQeaoM1Y6IJP6NT-kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:33 GMT',
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
  'bb794924-4e85-4f2f-a13d-8be88f6ce000',
  'x-ms-ests-server',
  '2.1.12261.22 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArvUkl01pSJDmv0xr5QljQU; expires=Sat, 19-Feb-2022 00:58:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4QVqoy50qoslW0Zx7n3kHpBvTm8kQ0xQsfqrJJLYXWjDiXyC_hgZh2JOvzQ692kecLpGztJBuvc6p-czjrPTCE-PqtwAYmlj5ZOrtktdfBV3YSg478P7QBSYLl2UpeHvgs1CkP4sG7AASaQ6AcbeLJgMYqjOCeFNlr8VcRy31z8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:34 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=67a6cdb3-7f23-42c1-9628-54cb8303cec8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'bb3deba7-764d-484f-b423-1e5d3e524d00',
  'x-ms-ests-server',
  '2.1.12261.22 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtaBLmei4C1LklkV9dLmWXc; expires=Sat, 19-Feb-2022 00:58:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 20 Jan 2022 00:58:34 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/data/query', {"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-12-05T00:00:00.000Z","series":[{"region":"Delhi","category":"Handmade"},{"region":"Cairo","category":"Home & Garden"}]})
  .reply(200, {"value":[{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Handmade","region":"Delhi"}},"timestampList":["2021-08-05T00:00:00Z","2021-08-06T00:00:00Z","2021-08-07T00:00:00Z","2021-08-08T00:00:00Z","2021-08-09T00:00:00Z","2021-08-10T00:00:00Z","2021-08-11T00:00:00Z","2021-08-12T00:00:00Z","2021-08-13T00:00:00Z","2021-08-14T00:00:00Z","2021-08-15T00:00:00Z","2021-08-16T00:00:00Z","2021-08-17T00:00:00Z","2021-08-18T00:00:00Z","2021-08-19T00:00:00Z","2021-08-20T00:00:00Z","2021-08-21T00:00:00Z","2021-08-22T00:00:00Z","2021-08-23T00:00:00Z","2021-08-24T00:00:00Z","2021-08-25T00:00:00Z","2021-08-26T00:00:00Z","2021-08-27T00:00:00Z","2021-08-28T00:00:00Z","2021-08-29T00:00:00Z","2021-08-30T00:00:00Z","2021-08-31T00:00:00Z","2021-09-01T00:00:00Z","2021-09-02T00:00:00Z","2021-09-03T00:00:00Z","2021-09-04T00:00:00Z","2021-09-05T00:00:00Z","2021-09-06T00:00:00Z","2021-09-07T00:00:00Z","2021-09-08T00:00:00Z","2021-09-09T00:00:00Z","2021-09-10T00:00:00Z","2021-09-11T00:00:00Z","2021-09-12T00:00:00Z","2021-09-14T00:00:00Z","2021-09-15T00:00:00Z","2021-09-16T00:00:00Z","2021-09-19T00:00:00Z","2021-09-20T00:00:00Z","2021-09-21T00:00:00Z","2021-09-22T00:00:00Z","2021-09-23T00:00:00Z","2021-09-24T00:00:00Z","2021-09-25T00:00:00Z","2021-09-26T00:00:00Z","2021-09-27T00:00:00Z","2021-09-28T00:00:00Z","2021-09-29T00:00:00Z","2021-09-30T00:00:00Z","2021-10-01T00:00:00Z","2021-10-02T00:00:00Z","2021-10-03T00:00:00Z","2021-10-04T00:00:00Z","2021-10-05T00:00:00Z","2021-10-06T00:00:00Z","2021-10-07T00:00:00Z","2021-10-08T00:00:00Z","2021-10-09T00:00:00Z","2021-10-10T00:00:00Z","2021-10-11T00:00:00Z","2021-10-12T00:00:00Z","2021-10-13T00:00:00Z","2021-10-14T00:00:00Z","2021-10-15T00:00:00Z","2021-10-16T00:00:00Z","2021-10-17T00:00:00Z","2021-10-18T00:00:00Z","2021-10-19T00:00:00Z","2021-10-20T00:00:00Z","2021-10-21T00:00:00Z","2021-10-22T00:00:00Z","2021-10-23T00:00:00Z","2021-10-24T00:00:00Z","2021-10-25T00:00:00Z","2021-10-26T00:00:00Z","2021-10-27T00:00:00Z","2021-10-28T00:00:00Z","2021-10-29T00:00:00Z","2021-10-30T00:00:00Z","2021-10-31T00:00:00Z","2021-11-01T00:00:00Z","2021-11-02T00:00:00Z","2021-11-03T00:00:00Z","2021-11-04T00:00:00Z","2021-11-05T00:00:00Z","2021-11-06T00:00:00Z","2021-11-07T00:00:00Z","2021-11-08T00:00:00Z","2021-11-09T00:00:00Z","2021-11-10T00:00:00Z","2021-11-11T00:00:00Z","2021-11-12T00:00:00Z","2021-11-13T00:00:00Z","2021-11-14T00:00:00Z","2021-11-15T00:00:00Z","2021-11-16T00:00:00Z","2021-11-18T00:00:00Z","2021-11-19T00:00:00Z","2021-11-20T00:00:00Z","2021-11-21T00:00:00Z","2021-11-22T00:00:00Z","2021-11-23T00:00:00Z","2021-11-24T00:00:00Z","2021-11-25T00:00:00Z","2021-11-26T00:00:00Z","2021-11-27T00:00:00Z","2021-11-28T00:00:00Z","2021-11-29T00:00:00Z","2021-11-30T00:00:00Z","2021-12-01T00:00:00Z","2021-12-02T00:00:00Z","2021-12-03T00:00:00Z","2021-12-04T00:00:00Z"],"valueList":[459545,414403,354572.8,387233,469817.6,459650.6,447956,474810.6,459115.6,397607.8,429022.4,499379.8,492416.4,514459.2,467188.6,480571.8,399395.8,427462,487330.8,535930.2,488107.8,514313.4,476014.4,387363.4,395853.8,427890,485441.2,521631.2,517050.6,493736,414592.8,444527.4,544983.4,564547.4,566280,584022.8,545745.8,448306,482502.8,614035.2,625525,612672.2,471577,653680.6,672008.6,649361.2,639418.4,585613.6,392077.2,469832.6,627465.4,670567.6,638765.8,646400.8,591698.8,393672.8,461016.4,671330,663083.8,652174,652647.2,602663.2,405481.2,460825.6,648188.4,639784.2,629455,622654.2,575832.6,376714.8,423373.6,595968.4,591052.6,585573.4,591703.2,535243.2,385288.2,391302.2,527925.6,543222.8,545699.2,513455.6,1006212.8,403239.4,429867,635928.8,640843.2,1274260,1279589.2,581859.4,810264,430847.2,640411.2,656720.2,641353.8,652333.6,1169442,399647.6,448445.2,639739,655803.2,641492.2,580191,397389,441194.2,650173.2,652582.2,638368.4,629735.6,542810,366458.4,401052.8,604658.4,620263.8,610838.6,620053.2,571736.8,364574.4]},{"id":{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"category":"Home & Garden","region":"Cairo"}},"timestampList":["2021-08-05T00:00:00Z","2021-08-06T00:00:00Z","2021-08-07T00:00:00Z","2021-08-08T00:00:00Z","2021-08-09T00:00:00Z","2021-08-10T00:00:00Z","2021-08-11T00:00:00Z","2021-08-12T00:00:00Z","2021-08-13T00:00:00Z","2021-08-14T00:00:00Z","2021-08-15T00:00:00Z","2021-08-16T00:00:00Z","2021-08-17T00:00:00Z","2021-08-18T00:00:00Z","2021-08-19T00:00:00Z","2021-08-20T00:00:00Z","2021-08-21T00:00:00Z","2021-08-22T00:00:00Z","2021-08-23T00:00:00Z","2021-08-24T00:00:00Z","2021-08-25T00:00:00Z","2021-08-26T00:00:00Z","2021-08-27T00:00:00Z","2021-08-28T00:00:00Z","2021-08-29T00:00:00Z","2021-08-30T00:00:00Z","2021-08-31T00:00:00Z","2021-09-01T00:00:00Z","2021-09-02T00:00:00Z","2021-09-03T00:00:00Z","2021-09-04T00:00:00Z","2021-09-05T00:00:00Z","2021-09-06T00:00:00Z","2021-09-07T00:00:00Z","2021-09-08T00:00:00Z","2021-09-09T00:00:00Z","2021-09-10T00:00:00Z","2021-09-11T00:00:00Z","2021-09-12T00:00:00Z","2021-09-14T00:00:00Z","2021-09-15T00:00:00Z","2021-09-16T00:00:00Z","2021-09-19T00:00:00Z","2021-09-20T00:00:00Z","2021-09-21T00:00:00Z","2021-09-22T00:00:00Z","2021-09-23T00:00:00Z","2021-09-24T00:00:00Z","2021-09-25T00:00:00Z","2021-09-26T00:00:00Z","2021-09-27T00:00:00Z","2021-09-28T00:00:00Z","2021-09-29T00:00:00Z","2021-09-30T00:00:00Z","2021-10-01T00:00:00Z","2021-10-02T00:00:00Z","2021-10-03T00:00:00Z","2021-10-04T00:00:00Z","2021-10-05T00:00:00Z","2021-10-06T00:00:00Z","2021-10-07T00:00:00Z","2021-10-08T00:00:00Z","2021-10-09T00:00:00Z","2021-10-10T00:00:00Z","2021-10-11T00:00:00Z","2021-10-12T00:00:00Z","2021-10-13T00:00:00Z","2021-10-14T00:00:00Z","2021-10-15T00:00:00Z","2021-10-16T00:00:00Z","2021-10-17T00:00:00Z","2021-10-18T00:00:00Z","2021-10-19T00:00:00Z","2021-10-20T00:00:00Z","2021-10-21T00:00:00Z","2021-10-22T00:00:00Z","2021-10-23T00:00:00Z","2021-10-24T00:00:00Z","2021-10-25T00:00:00Z","2021-10-26T00:00:00Z","2021-10-27T00:00:00Z","2021-10-28T00:00:00Z","2021-10-29T00:00:00Z","2021-10-30T00:00:00Z","2021-10-31T00:00:00Z","2021-11-01T00:00:00Z","2021-11-02T00:00:00Z","2021-11-03T00:00:00Z","2021-11-04T00:00:00Z","2021-11-05T00:00:00Z","2021-11-06T00:00:00Z","2021-11-07T00:00:00Z","2021-11-08T00:00:00Z","2021-11-09T00:00:00Z","2021-11-10T00:00:00Z","2021-11-11T00:00:00Z","2021-11-12T00:00:00Z","2021-11-13T00:00:00Z","2021-11-14T00:00:00Z","2021-11-15T00:00:00Z","2021-11-16T00:00:00Z","2021-11-18T00:00:00Z","2021-11-19T00:00:00Z","2021-11-20T00:00:00Z","2021-11-21T00:00:00Z","2021-11-22T00:00:00Z","2021-11-23T00:00:00Z","2021-11-24T00:00:00Z","2021-11-25T00:00:00Z","2021-11-26T00:00:00Z","2021-11-27T00:00:00Z","2021-11-28T00:00:00Z","2021-11-29T00:00:00Z","2021-11-30T00:00:00Z","2021-12-01T00:00:00Z","2021-12-02T00:00:00Z","2021-12-03T00:00:00Z","2021-12-04T00:00:00Z"],"valueList":[4741.4,4060.2,2324,2783.8,4648,4862.6,4685.2,4578.6,3682,2327.8,2983,4783.2,4997.6,5108,4773.2,3915.6,2638.4,3182,5056,5200.2,5022.4,5359.6,4518.2,2684.8,3235.6,4845.2,4821,5200,5068,4024.4,2574.6,3123.8,5015,5052.2,5224.8,5048.4,4451,2633.4,3242.4,5567.4,5252,5385.2,2635,4988.8,4828.2,4742.4,4489.2,4087.8,2167.8,2952.2,7365.2,4661.2,4688.6,4565.4,3915.4,2559.6,2895,4465.8,4686.2,4485.8,4804,3984.2,2098.6,2648.8,4562.8,4653.8,4627.8,4835.4,3939,2197.4,2731,4969.2,5061.8,4879,4644.4,4375.6,2391.2,2542.8,4523.4,5040.8,5109.2,4763.6,8418.4,2461.4,3102.4,5740.4,5203.4,10531.6,10064.8,4424,4696.8,3163,5134.6,10485.6,5465.4,5148.6,9038.8,2531,2779.8,5146.8,5121.6,5008,4390,2483.8,3335.2,5795.4,5561.2,5730.4,4412.2,4227.4,2674.4,3420.6,5947.8,5839.4,5694,5544.2,5030.2,2915.4]}]}, [
  'Content-Length',
  '7627',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '687722d8-bf38-4354-8d2a-b32fff6e8296',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  '687722d8-bf38-4354-8d2a-b32fff6e8296',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:34 GMT'
]);
