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
  '41286527-b6ed-466d-bd5b-633ef28e4902',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuyEpQdgiZ9IkjaGgIYp9mI; expires=Sat, 04-Dec-2021 17:00:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq_tdOPt7sJCTpPs8NZMp8C2VqCxEjtHfY-uS72mtvkg8Hm86F3AAL4_GtYDgfctPg-_VDj8H8x4lK1yURNFXP6d7dauKPWd0vPCNheX1uRk580FKxlR6sbGKbspzGKfEMeNYMLQDu5UUH-B28zlPpQtxbcV0P0MlWrbNW1muj7cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
  'b1b1d483-946b-40aa-a368-fda89c8a2800',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiMt-AhbwSpMkF2mYomNRwQ; expires=Sat, 04-Dec-2021 17:00:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7omAp5h3N6oXKcY3ZWbi1OZBxM3FtgkrZJCA5b_s0xIhtuUAE7OuTA-jYUs4cHPpx7ySH0ed-FeFwtC-VGzakqyWA8yQmvZRMLC-VR5JFGVasMblWbf6SD6wN1B_m2jof4LsYQQQCXrrD-H29xaFPIvZm1AZgZNfHQFw0yBujCIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=18276143-1845-49ca-82c3-cd0152ace3d8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0a3ffbdc-14ce-4d99-9e3c-0ddf360f2a00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtIJeuOr67xNkWvMAiD9O-B4ycTJAQAAAKkIFtkOAAAA; expires=Sat, 04-Dec-2021 17:00:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/farmers/tst103node/boundaries/jhboundary103node', {"geometry":{"coordinates":[[[-6.6730517,43.5298824],[-6.676265,43.5262614],[-6.6757983,43.5260669],[-6.6760236,43.5254835],[-6.6768819,43.5245228],[-6.6760075,43.5243322],[-6.6753209,43.5252112],[-6.6744518,43.5247095],[-6.6730678,43.525114],[-6.6723222,43.5256702],[-6.6739959,43.5264753],[-6.6726387,43.5274282],[-6.6712493,43.5279261],[-6.6703159,43.5280428],[-6.6693288,43.5277394],[-6.6692644,43.52807],[-6.6694576,43.5282256],[-6.671319,43.5294274],[-6.6717964,43.5296024],[-6.6730303,43.5298824],[-6.6730517,43.5298824]]],"type":"Polygon"},"description":"Created by SDK"})
  .query(true)
  .reply(200, ["1f8b08000000000004036492416fdb300c85ff4aa1b31350a4444abeae97619702cb69410e6eac641eeab8b0bd4350f4bf8f866505436d40903f3d3dd1d4fb309766ecd3f8bd35b599a7d902dd863699ca5cd3d0a779bc9bfac3ccf7f7a4eb2fc3dbfd3adc74f13c0c63dbdd9a394da63e1e8f3bdeb310782b95a3bdc71802ba53b57246f62bd6992dd84b0c943930c72207245eb977817ce121d8b872e71143e10092fd1d11e2c63d2164bd476b0b77cedb907d0462f12760c9dcdb4799a89698cb6181624331fa6ccf4e3c6dc72253c85d1087a1e82dba987f57a2f661d303d9cd27806ec89c2361c8e58850dcdac6bad7b9b59e0052d4ce4b6e5a40f4bcb95bda7a161dca662256226793c8f0b82a027d57f3ffaef0cbd59e4e9f95e9a697b1eb9b252397e66d4a9569ce636aae9a15727be4a09225577f7ebf0e7f6fad0a1ff14a87e6aa4b7a1eb4412e3bd06707bc0ccb8ca1458b7c5e3e96bca9ed9cda671d0e5dbf641101adea778807cbb583dae22f15f643db5dbaaf4aab6277b05203d4e817659ba6f3d8bdcf9d06ba36dfd6039e5eef4f3f9f7f98cf7f000000ffff","03000e8d5f9518030000"], [
  'Date',
  'Thu, 04 Nov 2021 17:00:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HMCT638HHURG:00000001',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '5',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
