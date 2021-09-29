let nock = require('nock');

module.exports.hash = "8b2fcfb892caf52eb423f4a836b1276e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '11e6b405-4117-4db5-bd64-4148f559b200',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjVcBDoy1XBAiqDdvA0S7MI; expires=Fri, 29-Oct-2021 01:09:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrLuf2nmt0hWTkUDcRC1KkEZoj5TJ3-L92K8BNQEDbYGxnlMFY80N06uadwMjOB1JGFcPueSarxq6Oj5kvjoKRzlxI95-xNC-X1ejEX5Tua2BK4NowR2TmkbboEAEzz4uJOYT7tS9u0u8-Z-2IwvqDyc0E00S-OsTyjiZuGrEV9ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:48 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'a10d771c-13cf-4bba-b92f-64a59cd2bc00',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjOMbeDC7dpPsXFJ4dPEoko; expires=Fri, 29-Oct-2021 01:09:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvudHSVcjjYUpsK5pCxWvQAgX-oqaK6Z8QQUDvD_pkq86rWiBoZ-FXALMsm3h654t-uMDQsuu3vLSUEdEnFi8VJn_mUx1ZgXLPqUa0p5VmnTGQAIPdWBAR7IDrVgN8_uzrYmIuw8CBKjdaTa3-XWsD21Ny4zYmlTHCCjSdVcoB5kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2180418c-df5f-4e3b-b11b-18b182c080b6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '1dab35f3-45d2-4073-82e1-741c2c25b400',
  'x-ms-ests-server',
  '2.1.12071.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmmgSD8O1mlOkDoMoVXH5W3KBMGnAQAAANyz5dgOAAAA; expires=Fri, 29-Oct-2021 01:09:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:48 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/$batch', {"requests":[{"id":"0","body":{"query":"print \"hello\", true, make_datetime(\"2000-01-02 03:04:05Z\"), toint(100), long(101), 102.1, dynamic({ \"hello\": \"world\" })\n      | project \n          stringcolumn=print_0, \n          boolcolumn=print_1,\n          datecolumn=print_2,\n          intcolumn=print_3,\n          longcolumn=print_4,\n          realcolumn=print_5,\n          dynamiccolumn=print_6\n      ","timespan":"PT5M"},"path":"/query","method":"POST","workspace":"workspace-id"}]})
  .reply(200, ["1f8b0800000000000003","6d92316fc3201085ffcbcda602db95134b1d3a76abaa4e0d1eb0b9b448c4b8809b5a96ff7b8fa495d2c403e878ef3b780266f01806d7070c50ef66301a6ae09041882a8ea4e59c67f0814aa3a7d50c8feff84b78fc1c3144d6b93ee27724550dc3937ee88c665fa2aef8b61458ee59859b3d2b795bb1b62a38139b62b32d74cbf36d054b06add313f5ce12a26a2d06997248e8d501a994f0eccd41f9e905c368a3844c42e7ec78e86fc010bde9dfcfe6898bd370e9483aed926f9db36b74d2af59ad22aeb1498f2641ff79d3c7359ce46bd2baf5cc49bf663daad5c449bf493c5169bad5d0678b3a1a92bd3b9eae7227e999ad75c4463f2239f4f49c71c178feca8b9a9735bf7f2357d08f105cd0c8ef0461b3947fad32ed4fd3d179ab53b148689aa559e8a8e507553d77046b020000"], [
  'Date',
  'Wed, 29 Sep 2021 01:09:49 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-bkh5p',
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
