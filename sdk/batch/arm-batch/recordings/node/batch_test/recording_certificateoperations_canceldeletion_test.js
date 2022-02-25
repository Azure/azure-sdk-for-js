let nock = require('nock');

module.exports.hash = "4af27329d42c330c0f0060c70779382f";

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
  '7777f699-653d-4eb0-b230-12e5d6b51900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhzQoPAtu2BFntfnHnePxDw; expires=Sun, 23-Jan-2022 02:19:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr65jpCS0K6FR-C6FFo3qCxDcm4zHmtOPGZaHKesJwywuIo0vWhC4SjkWGBvc7bITkxNx-9qg2WjOQHFyKuaLx-HZ_KDGzZTS7Z3WeRP3gC4vMOdEPfEyJ_xbY3XlPu7wOMV-rw0CdQQFSBiCIOKwi7EFpj8oeYHxFHpDvt3WhKLsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:06 GMT',
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
  'f480e226-70a1-4283-a533-9f5e093e2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aml_TU2k9gtDkX1u-bqOi8k; expires=Sun, 23-Jan-2022 02:19:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRJAcr6ldAchkidKPbTTXiXCRTQZqW1U7wslYgs0XWGJ06t5_tS0I-QArtv8KbeaguIbvGHKbmTHfWIFUhpbXQb-NqI2FZUIGo3tEfvwqUTinRNqA8BXb-x1GOKa__c388fJnjhMTD0OQ9cojDG259n6IW8I8iGCZzvbPcUP-wCIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:06 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9eb6f560-5b99-4f2f-aaa3-2be41ff8b181&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c7025f87-5230-4b1b-a3d3-5a8e30eb2600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am9hIg5eapdLoe3wlVjV5prLj78gAQAAABolV9kOAAAA; expires=Sun, 23-Jan-2022 02:19:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:06 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .post('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7/cancelDelete')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a3669eed6e4fcfcff7b2c9a7f7a607d387f7ef67d9f983dd87070ff3f3ecd3fdddc9c39d4fefdf3f983d3c9f3cf868f45131a397ee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc74fb2763abf3bc1bfc7d369b55eb67821935fdfbd7b77779ad76d715e4c330271f77d87d05eaf30f2cdddf93dd03b799b5dd03bdfbdfbfb7eb4f3eee0e9c3934f0fee9deceedc7bfae9c1c9effb1135a061acf00ab57ef48b3f6ae7ebc5645517cbf6b8bca8eaa29d2fe86d204a4ddd97f4d97be04d5d5c160d51bc585ebc6e09317afdf57a3acdf3593e8b7dffa6ce964d81397a53f064efedeced6eefee6defedbfd9d97bb4fbf0d1cebdf1cec1fefec1cefd9f2200e755bdc880d4cbf377f4e76a3d298be9d3accde8a32fcece9ed43f383939fec9bd8be3abb327c717673ff1ed9ffabcdd7bbbf3fce4f9b3dfebf7f97d4e9ebd2bbfb37cfbe6f83b4f2ebeaa9f5e7c71f2ed9ff8eaf88b27bfcfbb674f8f5f3fb978f1934f8ebf7873b2fb9dcbc9bd9fb8f889efcecac9e2c5fd2f9eecffde4fdf9cee7df1f4f4ea8b37c7f7be787a7cf5c5b30a9fed773ebb3afde9d39ff8e278fff3e3ddaf4e8fdf7df1edc9e2e1db9ffabd5fbccd7e70f264f983e3174f2edefea2f9dbe2f387573b4f8e7fe2f4d9f1f1974f7efa278eaf2e7e9fb72717bfcfe9f1faf7deffbdbff8eef5ab83e94fbc3a393ed87df3d3dffe32af5f7cf9eccb1535dcfbf2e0a74f673f75f98bae5e955ffd3e175f94f9e9efb3f765f972f6c9322bdf5d953ff1f0935f3479f1f6c5e7e73fbd9c9f7d71517ce7fec917e5ef7d317bf5c5b37ba79f3e5d7eb17cdb2ebefdecf387cf777e72f1139f3ebf681f4ce6bff7ab83b3a27df5edfcf7292fafef3fff4e79f5e9f36999dfffbdb266efa7f7dfcc7f9f9f7efe13939f7ef2c5d3d7bff7d3fd6f5ffed48b7cffabdfe7f4ab93e3abd3e3e3ecc5f32f4edf5ebdbafa7d9efee4ab9d274f4e8faf5e5634b2f54f7ce7f94ffc3eb36f7f7570fcd3df3d9ddf7bf2536f7f9f4f4f7f9f9b687d313ffefcc5ded5f12fba78f2b6987ffbe5fac5eb5ff47b3ffdbd77be387efbf993d7cd9734afb3273f71fcf4277ee2c9fdd94fbfcc773eff747aefa70e9eae5f7d7afa1393b3f9932fde2c4f767ef0fbbc9c1717bfe89377bbcf3f3fb8f7e0d3ddb3fae065f1fafa934fab775727dffe32fb7d7eeafa729e7f77e7e593eb657b72f7bbcfaebe2a56e7cb07071ffd92","5ff2ff006205775678040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Last-Modified',
  'Fri, 24 Dec 2021 02:19:03 GMT',
  'ETag',
  'W/"0x8D9C683C103D68C"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-request-id',
  '5b336bd7-bb26-4290-89af-a457e1cdbc9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'b85f3246-fc48-4eb0-bd16-2cf3b1af19ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021907Z:b85f3246-fc48-4eb0-bd16-2cf3b1af19ff',
  'Date',
  'Fri, 24 Dec 2021 02:19:07 GMT'
]);
