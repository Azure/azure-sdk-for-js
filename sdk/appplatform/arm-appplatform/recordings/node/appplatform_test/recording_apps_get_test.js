let nock = require('nock');

module.exports.hash = "7bfb7ea332b8c00b4c96c259c5015c4f";

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
  'b738e70d-7c9e-4999-912d-10d35a378d00',
  'x-ms-ests-server',
  '2.1.12794.4 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnxaC_Q2axJKhP5TCg3bgrI; expires=Sun, 19-Jun-2022 02:09:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWunYHkeBa9_cmhK_4A2_pbeHxG6Xs2s1aLufLXin3guI1YlATwbihMhUCmAX0wbDmRSjeylQNK63-AQ0-iqhWWd0HMdNElG6SajtmBAArybtgW8nGUmBbJEvBFbpBDNH0wOwEwNQVzddKk5TtFzOvwoqFebA0xVsoFdDk-6AKckgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 May 2022 02:09:12 GMT',
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
  '70833697-662e-4bc5-9ad0-75641a174400',
  'x-ms-ests-server',
  '2.1.12794.4 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ao3YRtha0mVDt2JienRM1W4; expires=Sun, 19-Jun-2022 02:09:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0bRONXxjWUJD6K5leICNYLBBjUDcNuavjWjUJESa6I4SrozzzLtF_qtHwo09SriK3CoYtzZp0ED5d40OqclvoWRvjILtr_Mt7wwZPQRKK5GYfxQGowjBrr0X3nk6NHEr-3Zabt12s06PrSVBEWTc_nEfpfzckTq5K8x7BbjgmusgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 May 2022 02:09:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=78deeb4d-e8b9-4828-aaa6-d6e212c50c3d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8e47a8d2-d890-407e-a7cf-188b2aa34700',
  'x-ms-ests-server',
  '2.1.12794.4 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtnHeZ23DW9Jqsfd6aooFiLLj78gAQAAAEnvGNoOAAAA; expires=Sun, 19-Jun-2022 02:09:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 May 2022 02:09:13 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx/apps/myappxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef147d96c562d4faae57971217faf566531cddac27cbaaef98fd7797d594c736af24b461f35f2c7abfca268dafa1a1fd2a7abf5845efde8d179563639fd5957974543af16cb8bd76dd6d2bb1fbd5e4fa7793ecb671f8d3e3aff45b3257db4b85668efdebd1b673f58d7f9a298d6957ed88c8b8adacedb76d57cb92ca92b85dee68b555567f5f5d3a2794b087cd4143fc8cf969f3ff9e8d1fdd1478b6abd6c5f66ed9c3ab8db2e561f01bdbc6e08dd7cd9f65fd9e9bce2dae2cd7c994dcafc74397b53e19fe7af150bfaaabd5e615c5f30cad5793b3e5ead5e96597b5ed58bbbaf57358dfd2e91b4a13114330257b43484e5ba2c471f959590995ecfb3a65d4b1bfaeb6eb39e34d3ba58e1dbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f13f64d7b97276146a3b9bb11457f12185ffa847ed05f84d4325b608cde27cd35415f3ccdda0c649cd639cdeeec098deca37c27238cee118a9fee4eb7f767bb7bdb07e79f4eb709f507f7777676a7f7a71901b0afbc11fa114ac43a420efbed714bdfecedeced6defdcdfdedb79b3b3f768e7e0d1fec1f8defd07bb7b3b0f7e8a9a9644b92faa59715e001ab5bf2502e17b512cfc2637a3f24b","7ec9ff03b60f704a5a030000"], [
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
  'acfb398f-7b1c-471d-a057-f5612d4c4eb4',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11998',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  'fafba577-d747-459c-9fe7-e45d54991475',
  'x-rp-server-mvid',
  '5e115b18-fadf-4457-94d9-ae330a47aa6b',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  'acfb398f-7b1c-471d-a057-f5612d4c4eb4',
  'x-ms-routing-request-id',
  'KOREASOUTH:20220520T020914Z:acfb398f-7b1c-471d-a057-f5612d4c4eb4',
  'Date',
  'Fri, 20 May 2022 02:09:14 GMT'
]);
