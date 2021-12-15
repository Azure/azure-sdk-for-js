let nock = require('nock');

module.exports.hash = "fef91e62404b7764874ff5c95e4d0e72";

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
  'b44fc6d0-9744-4056-b74a-8e6fae260500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj-LO3YGxQxBr6wZMbDgU2M; expires=Fri, 03-Dec-2021 09:07:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYINLNqJRtbiHNGndoLdeGhQQInqbtsVvkp2cGFtJmo6RFFK64xLP7nwfn3nOLzeuvI9f5QSQmXyLgIVGe5HpiAgZndaU3jm1bDBgYh23_9y4JYog2A1nsKAUSq7GgNuMCE6v5cYGJJUJRe-_Y1KqeEsv73bACVaMtUahHA9ncCogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:03 GMT',
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
  '342d5fbc-e9cb-4f96-b790-c971633f0500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlSrNFjfzatAqPqYsSL94cg; expires=Fri, 03-Dec-2021 09:07:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6w4Izpn8gFvfmEZuSTR9oWJecZtx7CeDS_WmCV7q3N7LJTCK2gViI48w45r3ukX_xguMt7WHPdr3-rDmyJDwq9cEH7GlL7DU_eqPEN0T6831ruoolwr4_JQ9akjkNilCNix0oWie1NMjkrtDe1Ay9NZ2F9dxWyIjZ3S9Cc0OjEUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=358b58d0-b002-4eab-9e14-a72f8a053fbb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'bc54afdf-f9cd-4ed5-8134-ddfd9e700600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgLl7UisC85FvzFX_6WjilAWPr5BAQAAADdIFNkOAAAA; expires=Fri, 03-Dec-2021 09:07:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:03 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy/applicationTypes')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a3f67a85cf3ffaa298d655539db7e3d7797d594cf367d9a42ea677a7e5ba69f3bab99bad566531cddaa25abea1779a8f46164659c9e78093674dbbf6bf2c66f8f86eb39e34d3ba58a15d73f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534bfa8abf5aab9bbb8fe69c2a469efaeeaeab29801a71b915e5cebafefdebdbbee0d81bef63e0225d0ccc37d992d983837b5cbdbec02edbe7bf7f7fde8d37b0f1eecdedf7bb0b7fbf0c1a73bf7f6f7777fdf8fbca6cd35a1b3789ab519bd60a781be98d679d6e6b327d7f4f947e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ffc001f5dfc6c000e1d8211c6b78dca2d1decedeeef6eeeef6cebd373b0f1fed7cfae8fec3f1a7f7761e3c3cd8fd6467e7d1ce4ef06a4953fb45352bce0b7484f7df1bcd10c44db8faad6f8bb079fd9758401f11bfacf2ba2d88674392d317974543bd16cb8bd72d9185beffe8f57a3acdf3593e73a0e417fef1fddf38f9","25ff0fedd74ea752030000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-request-id',
  '673ee724-85f3-4c74-8d53-10706fa37e56',
  'x-ms-correlation-request-id',
  '673ee724-85f3-4c74-8d53-10706fa37e56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T090704Z:673ee724-85f3-4c74-8d53-10706fa37e56',
  'Date',
  'Wed, 03 Nov 2021 09:07:04 GMT'
]);
