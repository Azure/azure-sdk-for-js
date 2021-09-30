let nock = require('nock');

module.exports.hash = "76d3c84f4192afc527b26762d8d31d78";

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
  'aee2f65e-a3f8-4c92-b384-e43208d01400',
  'x-ms-ests-server',
  '2.1.12071.16 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar_gxrxM0ltGnUgT3rtyChs; expires=Thu, 28-Oct-2021 08:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfpuBUPCUgAVYv3T0GQcQkyDTxZmY50GuqAzA8j-83smyXC_H94UtyVk_m2MmBk9EME8fjKiEYUg7Y-QNosWA-mXErJhzIanpB8rHwJMooc3MvRYHm0LLUEmPbW0L19K40Gm_3hJ0N_k-dhwQ1Ab_EblgNuDqB82Nie7jxpq_dXwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 08:07:26 GMT',
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
  'ba098c41-5e24-43b7-aaf4-4a4667f81300',
  'x-ms-ests-server',
  '2.1.12071.16 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnRFmVGHmZROmtXSTreJ_Rc; expires=Thu, 28-Oct-2021 08:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrS_d6rE3aoBC2on8YG-dJ-5jZKvakBZ8bIa6p3hp-VvFPtIPjRnwFZjz3FeOJcvk7haP3vodoFpBMgzu5unlx8H-bwYbr27wKyE5RuNP3bcy97pkLZrGJz2GA8EubEY6OVy5kHGlILhf_OSFn2pD3db1EPZx8tUGbtCc_7OCm1y0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 08:07:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ab2a3914-c3d6-47fe-a387-8d00900ec019&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'ba098c41-5e24-43b7-aaf4-4a4668f81300',
  'x-ms-ests-server',
  '2.1.12071.16 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmH0icYVK3VHhsQWZ5dqQ3UWPr5BAQAAAD_E5NgOAAAA; expires=Thu, 28-Oct-2021 08:07:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 08:07:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx', {"location":"eastus","properties":{}})
  .query(true)
  .reply(201, {"properties":{"provisioningState":"Creating","endpoint":null},"location":"eastus","tags":null,"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx","name":"mydomainxxx","type":"Microsoft.EventGrid/domains"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '286',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Azure-AsyncOperation',
  'https://management.azure.com:443/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/5F68A341-209F-483D-BF18-F682809DDE41?api-version=2021-06-01-preview',
  'x-ms-request-id',
  'ecb9b76e-a08c-463d-a765-ecb7528cc8b0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '5f7308d5-7c54-4e5d-bea0-dc4643eee28f',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T080732Z:5f7308d5-7c54-4e5d-bea0-dc4643eee28f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Sep 2021 08:07:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/5F68A341-209F-483D-BF18-F682809DDE41')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04589e35edbab95badf25a3e79dd66f8e0feb34f0f8eefedef6eefed3c7cb6bd7f70efe9f69367bb07dbf4f1dec1cec3a74f4ff7777f8f6c556c5f521ff4de677b3b7bbbdb3b9f6eefec6eafeafcb2c8af3e1a7db4cc16390deefef9a70799023b07b0d9f6e49c80d1c700369be5fbbbd4bae1aea9fdd9f2655d5dd479d37cf4","4bfe1f71743eb620010000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '88adb5dc-2938-452b-9d05-db204ec5aeea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11991',
  'x-ms-correlation-request-id',
  '139a0cf2-d24a-412d-8174-b797ffb83ee2',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T080732Z:139a0cf2-d24a-412d-8174-b797ffb83ee2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Sep 2021 08:07:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.EventGrid/locations/eastus/operationsStatus/5F68A341-209F-483D-BF18-F682809DDE41')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fcddb76d53cba7b77912db38b7c912fdb71f683759d8fa7d5e26eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff7eeaaae2e8b595e3777bf28a675d554e7edf8f492c07e5e17b3bb6535cd04589e35edbab95badf25a3e79dd66f8e0feb34f0f8eefedef6eefed3c7cb6bd7f70efe9f69367bb07dbf4f1dec1cec3a74f4ff7777f8f6c556c5f521ff4de677b3b7bbbdb3b9f6eefec6eafeafcb2c8af3e1a7db4cc16390deefef9a70799023b07b0d9f6e49c80d1c700369be5fbbbd4bae1aea9fdebf5749ae7b37cf6d12f","f97f00741e8c241f010000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8b782dd8-cc3f-4ba4-92c4-c49567cbf020',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11990',
  'x-ms-correlation-request-id',
  '8d041095-937d-40bc-b39e-935e7abaed5c',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T080734Z:8d041095-937d-40bc-b39e-935e7abaed5c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Sep 2021 08:07:34 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventGrid/domains/mydomainxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478ff8afcba229aa65b1bc78dd666dfed1a38f5eafa7d33c9fe5b38f461fe5cbd9aa2a962d7d3c6fdb55f3e8eeddc5f5ac5a64c5f2ddbb77e33c6bda75b3bd3bce2ff3657b5117b371f683759d8f97797b375b1577f9f3860015cbd5ba7d3d9de78b8c609de2e3cfa9b97e32fa6891b775317d9537d5ba9ee667336a94efeced4eb3fce1f6247b906defef7cfa70fb6096e7dbe7d3fb0ff7eedd7ff8e07c32a13757eb49594c5fe4ed5555bf3d26d41b1ad947a7cb6c52d2107ec9e8a3e6ed1a435d660b8cee49d614537c5c56d3aca591d367320c82d56617f4f2725d96843170b8dbac27cdb42e5668d9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd5a07f1795dad570dd1eba79b366fdabb4ceb595e3777bf28a675d554e7edd812e2ae1015cde537222f21a448871fb6d72b7cb801ca47","bfe4ff01615a0cfde9010000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1ac44f4f-1315-41fc-9780-fb806b5c724d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '2b7bdacf-bf6b-4d0f-a43b-8fcc103e2b54',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T080737Z:2b7bdacf-bf6b-4d0f-a43b-8fcc103e2b54',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Sep 2021 08:07:36 GMT'
]);
