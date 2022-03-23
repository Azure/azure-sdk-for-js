let nock = require('nock');

module.exports.hash = "a177cac3c8e72d1b80e7e593dfef054c";

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
  'f480e226-70a1-4283-a533-9f5efc3d2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjSFsCFQyTZMko2LuRCzStQ; expires=Sun, 23-Jan-2022 02:19:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsAHK-jvbM7q1zBEQV0RolbhI0j-y5CGo1K-W6cecGuGJLGAR-LhBsQvY3JnWJDnh63DqbpYq-Fumm1dkyAhQ23HtC3ajWUHay37Bd40riiAdbThR5ZBNniqiKqCXx8JSSzGERg82DVmLvWuUqTGg6zaEK8kKcI6-b0Yg4FnJ2wEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:04 GMT',
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
  'ab800d36-9487-492e-b40d-f24b20cb2300',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Am_Zu54qVYxLp5yb12DmUKw; expires=Sun, 23-Jan-2022 02:19:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLiCMLWDznq2CJ60W-KJDV3yttVgbLalr-k1GIdnkR1aZEMxF-cn9l7jsQmotg9DqXOZo-7Pvvjo5sTmj0obZR28dOkxAORokKdqOVQrxM-ljpH1mUCIlF2xL4Wp0hUm4Poe-RXomBtijUDv8mjAbv0VzM2D3OLiT-G6sa9fL6yAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=699fb8ef-1232-4191-859e-1e3db9330e53&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '65eed48d-5688-4f85-96c3-e740c6cc1900',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlAvR3dz6lRMiPYIovofUlLLj78gAQAAABglV9kOAAAA; expires=Sun, 23-Jan-2022 02:19:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:04 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1325bd02f1f35f36c777b7a7ebe974d3ebd373d983ebc7f3fcbce1fec3e3c78989f679feeef4e1eee7c7afffec1ece1f9e4c147a38f8a19bd74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793b7e92b5d3f9dd09fe3d9e4eabf5b2c50b99fcfaeeddbbbbd3bc6e8bf3629a1188bbef3b84f67a85916feeceef81dec9dbec82def9eedddff7a39d77074f1f9e7c7a70ef6477e7ded34f0f4e7edf8fa8010d638557a8f5a35ffc513b5f2f26abba58b6c7e5455517ed7c416f03516aeabea4cfde036feae2b26888e2c5f2e2754b88d1ebafd7d3699ecff259ecfb3775b66c0accd19b82277b6f676f777b776f7b6fffcdcedea3dd878f76ee8d770ef6f70f76eeff140138afea4506a45e9ebfa33f57eb49594c9f666d461f7d7176f6a4fec1c9c9f14fee5d1c5f9d3d39be38fb896fffd4e7eddedb9de727cf9ffd5ebfcfef73f2ec5df99de5db37c7df7972f155fdf4e28b936fffc457c75f3cf97dde3d7b7afcfac9c58b9f7c72fcc59b93ddef5c4eeefdc4c54f7c77564e162fee7ff164fff77efae674ef8ba7a7575fbc39bef7c5d3e3ab2f9e55f86cbff3d9d5e94f9ffec417c7fb9f1fef7e757afcee8b6f4f160fdffed4effde26df6839327cb1f1cbf7872f1f617cddf169f3fbcda7972fc13a7cf8e8fbf7cf2d33f717c75f1fbbc3db9f87d4e8fd7bff7feeffdc577af5f1d4c7fe2d5c9f1c1ee9b9ffef69779fde2cb675faea8e1de97073f7d3afba9cb5f74f5aafceaf7b9f8a2cc4f7f9fbd2fcb97b34f9659f9eeaafc89879ffca2c98bb72f3e3fffe9e5fcec8b8be23bf74fbe287fef8bd9ab2f9edd3bfdf4e9f28be5db76f1ed679f3f7cbef3938b9ff8f4f945fb6032ffbd5f1d9c15edab6fe7bf4f79797dfff977caab4f9f4fcbfcfeef95357b3fbdff66fefbfcf4f39f98fcf4932f9ebefebd9fee7ffbf2a75ee4fb5ffd3ea75f9d1c5f9d1e1f672f9e7f71faf6ead5d5eff3f4275fed3c79727a7cf5b2a291ad7fe23bcf7fe2f7997dfbab83e39ffeeee9fcde939f7afbfb7c7afafbdc44eb8bf9f1e72ff6ae8e7fd1c593b7c5fcdb2fd72f5effa2dffbe9efbdf3c5f1dbcf9fbc6ebea4799d3df989e3a73ff1134feecf7efa65bef3f9a7d37b3f75f074fdead3d39f989ccd9f7cf16679b2f383dfe7e5bcb8f8459fbcdb7dfef9c1bd079fee9ed5072f8bd7d79f7c5abdbb3af9f697d9eff353d797f3fcbb3b2f9f5c2fdb93bbdf7d76f555b13a5f3e38f8e897fc92ef","ff92ff07e72c7f9184040000"], [
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
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11984',
  'x-ms-request-id',
  '8759c1d2-a351-448f-8a2e-56b9eedabe31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '0799542d-7a9d-4569-bb84-e5b0bc40bea9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021905Z:0799542d-7a9d-4569-bb84-e5b0bc40bea9',
  'Date',
  'Fri, 24 Dec 2021 02:19:05 GMT'
]);
