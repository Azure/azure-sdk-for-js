let nock = require('nock');

module.exports.hash = "57249747666738457e74defda292e96a";

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
  'ef95b87f-35f3-4a2a-9314-677dab0d8c00',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AssPApz8FJdPuwTnV8PLyxA; expires=Thu, 29-Jul-2021 00:02:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrdgg_r5erxQ-cPfYk0nRpWcwycq2oStyBdcYbBk7p6rpiinABvOnZaMNUfZMeEMuZWdaTxS5SqUvRiIs5U4WyEmbRVzUQV3dKlbR-46GnPxsZVWWyX2v4lKA-5WMxOvMgDQyGcy0grrE6Y2Pt0QpNSVrOeests1mYIcsfiD3Xi2sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Jun 2021 00:02:14 GMT',
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
  '5bf7ee08-4237-472f-b5d3-80f2c2390901',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AssPApz8FJdPuwTnV8PLyxA; expires=Thu, 29-Jul-2021 00:02:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDWrMAXt1VSG1GB4CNd5JchS-b3eIyKevSupCa8OWvulxMC1qg5QaE9MeUFxiyjBWMTGQNVwGilFJJ1L354vajzjSV75oUanex9nEE5gJ1rmpqKLjpBcRl0Oq-jF-AWOIAUBLJNIPmuRmQ_Inh1uEjSYxy8cXKQexnpb63FmPnaUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Jun 2021 00:02:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=ce7bd34e-0000-0000-0000-000000000000&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=2eaa6f26-01fd-452a-8de4-d65b0794f302&client_secret=clientsecret")
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
  'c694b77a-b61d-4bb5-bf7e-846945191501',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AssPApz8FJdPuwTnV8PLyxAH9ySAAQAAAAdabNgOAAAA; expires=Thu, 29-Jul-2021 00:02:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Jun 2021 00:02:14 GMT',
  'Content-Length',
  '1722'
]);

nock('https://westus.quantum.azure.com:443', {"encodedQueryParams":true})
  .get('/v1.0/subscriptions/677fc922-91d0-4bf6-0000-4274d319a0fa/resourceGroups/resourcegroup/providers/Microsoft.Quantum/workspaces/workspace/providerStatus')
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d1475f14d3ba6aaaf3f6a3d147d3755de7cbf6f8322bca6c5294457b4d2df4cf32a7166d565fe46de35e5f98d7c74db15897599bcfb2e532cfca6279313e5f5d64f4d2cd60b3cbbcce2ef29f58e7ebfc4db120f476461f356dd6ae9b97f4f9478f96ebb2fc25a35bf4b9bdcaea6c91b7797d5ee7f9cf3e06e8ae2cf3b2cd17abbcee23305dad09fa0fb1ff9ff51e6fa4f90f1f819ff52edb6cb2fe218f125dfeac77f28b16d39ff53e56d50ad35554cb1fde7c35eb49d356d379d6b4c574512ddb7c9ad565f50df7fbfd5ff2fdd147cbfc5dfbbc58bed5cf","fe1ff040bc0d60050000"], [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Server',
  'Microsoft-IIS/10.0',
  'Request-Context',
  'appId=cid-v1:4d6ac272-7369-45c6-9036-63d733c8519f',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-request-id',
  '4db9cfa7cf37c742',
  'X-Powered-By',
  'ASP.NET',
  'Set-Cookie',
  'ARRAffinity=a80c7c3a42bc29f88c9055a7e2789984b224746994993027ab866c65455cca24;Path=/;HttpOnly;Secure;Domain=westus.quantum.azure.com',
  'Set-Cookie',
  'ARRAffinitySameSite=a80c7c3a42bc29f88c9055a7e2789984b224746994993027ab866c65455cca24;Path=/;HttpOnly;SameSite=None;Secure;Domain=westus.quantum.azure.com',
  'Date',
  'Tue, 29 Jun 2021 00:02:16 GMT',
  'Connection',
  'close'
]);
