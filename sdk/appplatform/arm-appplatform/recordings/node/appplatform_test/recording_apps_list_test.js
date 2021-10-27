let nock = require('nock');

module.exports.hash = "f8d249d490a5433bffcb49e95366dda7";

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
  '61c00cc1-0521-455b-8e3d-bc160ca62300',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhkIIXlxjaZMh1sq-Mwlvr0; expires=Fri, 26-Nov-2021 02:04:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSQEUyJXuuCQ1yt8svUmQuQu0Qd4WySLk6oJo2DMiBYCzdiJq62B5ywA4ghoPAvQ6sJwfFo-l7_DnxDy5pV1EBBQH2J-OSzrfRGsull69zr1qHCim0Fa2LPI_ae28Jon5Ig70gE5GzhHiJOLXgNpZ5tP7hF1fk-Pf-uIzyXuTrG0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:04:00 GMT',
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
  'e7e3df85-db65-4e20-b515-394cb16b0900',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AoSFzoXkCORAnPBC7TkuTNY; expires=Fri, 26-Nov-2021 02:04:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtWRMp2v0efQ8YcRa5otSdLJahk8vTv9HCctVPoXjAAl6pNifV1hKrx1zgWhMVfmAvdTocj1D4dyZxDzFTtYbe24X2Rap4SAymHDDYjUTuu1sfcAIvNAR8d30A8CxGB59CVhaQn-CnV9LpReeZD4jEvubzpXsgVs6Ek6TD2GeZQYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:04:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a5c46667-4529-4e0b-8b30-b1e22ce24177&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '06d95b41-9b34-4c31-8318-ef9966d62300',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai8AZEAMcTNJlwTo0sJk-kMWPr5BAQAAAJGqCtkOAAAA; expires=Fri, 26-Nov-2021 02:04:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:04:01 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx/apps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d123fa6b3d298be9478fceb3b2c947f8f2b2688a6a592c2f5eb7594baf7cf47a3d9de6f92c9f7d34fae8fc17cd96f4d1e2bac9ebcb629abf7bf76e9cfd605de78b625a57fa61332e2a6a3b6fdb55f3e5b2bcb6d0a7754e20676f8a05e0eeedeced6eefee6cef3d78b3b3f768e7dea3fb0f7f8a5e6bf3c5aaaab3fafa69d1bc058a4df183fc6cf9f9938f1edd1f7db4a8d6cbf665d6ce09c0dd76b1fae89710d279dd144d9b2fdbfe2b3b9d575c5bbc992fb349999f2e676f2afcf3fcb5a24a5fb5d72b20f9058fab3a6fc7c7abd5cb326bcfab7a71f7f5aa2602ddcd56ab86302e6604ae68699ccb75598e3e2aab69d6120de9f53c6bdab5b4a1bfee36eb4933ad8b15be6dee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76e9d37d5ba9ee69fd7d57ad5dc5d5cff3461dfb47779a666349abb1b51f4678af1a54fe807fd45482d339e08fbc92ff9fe2f","f97f003ade40cd2a020000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  '7f8adf76-8c50-4117-b80d-5fbc9a2bfa97',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11995',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  'ee08e927-564c-41a7-bd6b-9ebc09f0ee0a',
  'x-rp-server-mvid',
  'c98d556d-0be2-4fd7-8a47-2c7368eb00a4',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  '7f8adf76-8c50-4117-b80d-5fbc9a2bfa97',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211027T020402Z:7f8adf76-8c50-4117-b80d-5fbc9a2bfa97',
  'Date',
  'Wed, 27 Oct 2021 02:04:01 GMT'
]);
