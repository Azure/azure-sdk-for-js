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
  'd4b93b1a-11d2-4e10-9d20-9c5d01591d00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjiAL35jQ7VNpmdlMS2I8cI; expires=Thu, 31-Mar-2022 06:23:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxZ2SDuhqUanGmoJbbFC6ziidP11KpJz60nApzXEYghOIDVf7Rw94ZlqUhVwYc5foKIPHaSgOEjFkL1CSJTgSMGmsQaaMA6rfOZbSC8r9j5NsrHuCXjK6oJPZ0aVkn6xF-GbYp6mNaYqp_ghvEq7ha68BT9J8cPXa4aNDPfBApzwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:55 GMT',
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
  '0204ff98-cfb5-4141-a3a3-b5e1b7381e00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Av-ziweQlzpIh2zyoH_ADiA; expires=Thu, 31-Mar-2022 06:23:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjGy3M1Xoh3GbmmHNIv4wl1GcV0b92Qo_Djx3FM_TGeeXBxUoqaSmh_bthpJmvwnLI7hfXJPnhADBvU9n-QJvZssj5V6JkGVQQ9JuopVCHbZOWHZJkYZayoy-zNjX7VjNX6hY8Jh-Q69WOeS6rYACZiYq4S6Gs2ULz7UzO8TevakgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2f1d7373-c351-4ae6-b7b2-b2df6bddcf80&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '0204ff98-cfb5-4141-a3a3-b5e1b9381e00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgSnUaOWyplFvrFaUlwQZzrLj78gAQAAAPuyr9kOAAAA; expires=Thu, 31-Mar-2022 06:23:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:55 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx/apps/myappxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef147d96c562d4faae57971217faf566531cddac27cbaaef98fd7797d594c736af24b461f35f2c7abfca268dafa1a1fd2a7abf5845efde8d179563639fd5957974543af16cb8bd76dd6d2bb1fbd5e4fa7793ecb671f8d3e3aff45b3257db4b85668efdebd1b673f58d7f9a298d6957ed88c8b8adacedb76d57cb92ca92b85dee68b555567f5f5d3a2794b087cd4143fc8cf969f3ff9e8d1fdd1478b6abd6c5f66ed9c3ab8db2e561f01bdbc6e08dd7cd9f65fd9e9bce2dae2cd7c994dcafc74397b53e19fe7af150bfaaabd5e615c5f30cad5793b3e5ead5e96597b5ed58bbbaf57358dfd2e91b4a13114330257b43484e5ba2c471f959590995ecfb3a65d4b1bfaeb6eb39e34d3ba58e1dbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f13f64d7b97276146a3b9bb11457f12185ffa847ed05f84d4325b608cde27cd35415f3ccdda0c649cd639cdeeec098deca37c27238cee118a9fee4eb7f767bb7bdb07e79f4eb709f507f7777676a7f7a71901b0afbc11fa114ac43a420efbed714bdfecedeced6defdcdbded97db3f3e9a3bd7b8feedd1bdf7fb87fffd37b0f7e8a9a9644b92faa59715e001ab5bf2502e17b512cfc2637a3f24b7e","c9ff03568967545a030000"], [
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
  'ea4b6d6d-c1f3-404e-b044-25592c96b3da',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11999',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  '445edd20-c98f-458b-acad-d87b0359d060',
  'x-rp-server-mvid',
  'ebc692a4-c2cd-44f5-bba2-1b5e5f04cb14',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  'ea4b6d6d-c1f3-404e-b044-25592c96b3da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220301T062356Z:ea4b6d6d-c1f3-404e-b044-25592c96b3da',
  'Date',
  'Tue, 01 Mar 2022 06:23:56 GMT'
]);
