let nock = require('nock');

module.exports.hash = "11a6ff0ecf737c7e35da6e47e426d822";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6b8e62e-f84c-443e-806c-2c64ce74f68b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8987',
  'x-ms-correlation-request-id',
  '33604c8f-2cac-40e0-a4c3-687a9c6b206e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085952Z:33604c8f-2cac-40e0-a4c3-687a9c6b206e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:51 GMT',
  'Content-Length',
  '0'
]);

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
  '587d074c-37ef-403a-8050-f03d71790800',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ah9y3ZCNRExNtT3g2rcc8JM; expires=Mon, 18-Oct-2021 08:59:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1Tqhg00fnJL0vwU9CRQZ5nHAv7LLLvy7xtQRMlotOld_o6Je94yAIjf0gnO4uBQgYQuxrJe9fsRO-4KvOxl-FRIs7yAejilSoDu3UcopksXybtigNwHMFLjav9AkEoMx6qfAVgAKfb6lvt7Z2_Ah7Rn-RQvmETnvWtGTOiW7n1kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:51 GMT',
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
  '5efc7de9-c93e-44e3-a672-bf929c890900',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqIJd6Lu3jtMrrY9ctDl2sM; expires=Mon, 18-Oct-2021 08:59:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrurnEkgep0VKblBke8-RJvts5tZJpr5hJMlzWkQygzLV5WXaQPQR0rHrdEavi6J7co-fOcgpwNHWPCN_o2dOyAtzn29yuFywcbpbRzvHNpxqT5l4N1Oug1tzlVLCn0A-su8sGlNyWi-gsxFHLbOVDGJPrWcDKAd-8wBUtLEaF1FsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4a124451-fbf7-4a2b-8882-c946687df7fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8986',
  'x-ms-correlation-request-id',
  'd1dd870e-7733-4c81-931d-a3811e5ccb55',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085952Z:d1dd870e-7733-4c81-931d-a3811e5ccb55',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=64aa2b5c-2dd6-4424-9b6b-67d6b3861eee&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '94efe042-aad7-4ddf-8c02-8a0cf1600900',
  'x-ms-ests-server',
  '2.1.12071.7 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiZJ-QVFFStHiE2iw2tEWVwWPr5BAQAAAIeh19gOAAAA; expires=Mon, 18-Oct-2021 08:59:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:52 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'faa26ccd-6ad5-4423-887b-b60ec15e4c7e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8985',
  'x-ms-correlation-request-id',
  'f0aa322a-d91a-40c1-ab11-69494a12a306',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085952Z:f0aa322a-d91a-40c1-ab11-69494a12a306',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8334bae8-213f-43a0-83ea-4ff62db4a948',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8984',
  'x-ms-correlation-request-id',
  '04ac0c05-1c55-4aed-baf4-04244afe7858',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085953Z:04ac0c05-1c55-4aed-baf4-04244afe7858',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDFfQWN0XzkyY2Y5MTcx?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ef42d790-a603-47bc-9a4a-46b3c826d796',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8983',
  'x-ms-correlation-request-id',
  '25b835ee-f5c2-49b7-b6be-542ccd1a1115',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085953Z:25b835ee-f5c2-49b7-b6be-542ccd1a1115',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service/myservicexxx1')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc6977efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde91dfdedddbb77bb1f8d3e5a668b9cb0e97edc5eaff0f10dd0d030bb683e7af48b7fc9e8a3b29a66180bbd769a356dfad56bfa3aa7efe983637e9e1c674f7f9fcfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d601f4fdbe292602e2fa8419bd51779fbf2a666d33aa74f67c7ed57ed94bedbd9d9d9dde6ffbdd9d979c4ffa34617d4e42abbfeaa260c97ebb2b49fbcca2f0876567adfacaaba0d3e98e5977909aabdec7eb3b0d34273e47dde4c17de5ff3aa6931d727d5f2bcb858d78439b1dd478fbef78bcd5cd320df5d139a68a9640eb862cc84db26d28e97794b0df3e5b49ae5b313cc244f03bd229dbdcdaf7f325b97ed1931ba7c32758d5e664d7355d5f6ab657e41f3485f9c94050d2200779e954d1ebc6dde9ae5e7e8e175533ea169c52c3c6aeb35b5253158b6457b2dd0a218bc6621a2f13d591784e492c6e27f4b13bc26cae0b55ff27d9a0af0def4ece5f16c46f2d78067f1157d518301f2c837d96c5680be59f95c85c27e7559d4ed3a2b5fe42dd1e06d301ba6c974ddb4d582a683665b64443e0f5f7d23b3f6a25a420c3dfc6dfb59d1649332ff9c3e2326b3c4a409fc49d214d421f5deb475562c5b88e1a2581203e9570283a45a47bfd2313a7aeae84f97b355451008d63227912090d282de6ddeae01186c4798125d97b38ce69db0cd56d994e6e8a347bbd4cccc98bc37fae807342403","e4ff015e4963142d050000"], [
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
  'ETag',
  '"AAAAAABAaDY="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe6535a8-037c-428c-beb1-ac0a5a10dac7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '78a48a33-1ead-4814-a483-d7c07e9f1a39',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085953Z:78a48a33-1ead-4814-a483-d7c07e9f1a39',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:52 GMT'
]);
