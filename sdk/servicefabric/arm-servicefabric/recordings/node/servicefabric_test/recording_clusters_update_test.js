let nock = require('nock');

module.exports.hash = "ab1520a497a3b3ed81edf016f9e4c632";

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
  'bfd66bfb-5435-4e98-9043-de5d63bf0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjWgX7q4-R9BqmyPv96dfyI; expires=Fri, 03-Dec-2021 09:07:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXn7m-oJBADbt6qTXlWpBTUHI2xZImPRPNnCislxa8Ke2bzK_9LL2MBVMeAgnuGoIEg-BpObHNuPF4bmR6Va0i9TChR1D0Fc9ePjDZxZfrlo8FjIpR-8CeSzu0GBFWTx1KZl3tNsbR7y-pJxi_xQ3GWmGBHuKdlNuULh4upFKXZggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:04 GMT',
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
  '7ef8f4b1-3b1b-4ae6-9a5e-66f16f5c0500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvZGzzmyyrFDoSNSLj-2Y2M; expires=Fri, 03-Dec-2021 09:07:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYM_XULYNFeNkSeggYJijGFqVMHgPD_rYWqer7FFJR_vwJF79ZJXBQZyVRRw8jFIrex9MVbc1lQpBUuLNj8Gi0_oBzBhyIZALyadFqKYB6HN8INAPDucbu785X7doEIcgJqTqWDYtM6qOJwQLLC5ndASjfmZTAFoqO3FUgbHBF9sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9e269d3a-70bf-478a-b771-0d59df396533&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'bfd66bfb-5435-4e98-9043-de5d68bf0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Audz5BHAT2FIirlAIACh-A8WPr5BAQAAADhIFNkOAAAA; expires=Fri, 03-Dec-2021 09:07:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:04 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy', {"tags":{"a":"b"},"properties":{"eventStoreServiceEnabled":true,"nodeTypes":[{"name":"nt1vm","clientConnectionEndpointPort":19000,"httpGatewayEndpointPort":19007,"durabilityLevel":"Bronze","applicationPorts":{"startPort":20000,"endPort":30000},"ephemeralPorts":{"startPort":49000,"endPort":64000},"isPrimary":true,"vmInstanceCount":5},{"name":"testnt1","clientConnectionEndpointPort":0,"httpGatewayEndpointPort":0,"durabilityLevel":"Bronze","applicationPorts":{"startPort":1000,"endPort":2000},"ephemeralPorts":{"startPort":3000,"endPort":4000},"isPrimary":false,"vmInstanceCount":3}],"reliabilityLevel":"Bronze","upgradeMode":"Automatic"}})
  .query(true)
  .reply(202, {"type":"Microsoft.ServiceFabric/clusters","location":"eastus","id":"/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy","name":"myclusterxxxy","tags":{"a":"b"},"etag":"W/\"637715272173072205\"","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-11-03T09:06:56.0007813+00:00","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-11-03T09:07:06.6158446+00:00"},"properties":{"provisioningState":"Succeeded","clusterId":"7541a493-1763-42f9-84c1-c83cec321ed5","clusterCodeVersion":"8.2.1235.9590","clusterState":"WaitingForNodes","managementEndpoint":"http://myCluster.eastus.cloudapp.azure.com:19080","clusterEndpoint":"https://eastus.servicefabric.azure.com/runtime/clusters/7541a493-1763-42f9-84c1-c83cec321ed5","clientCertificateThumbprints":[],"clientCertificateCommonNames":[],"fabricSettings":[{"name":"UpgradeService","parameters":[{"name":"AppPollIntervalInSeconds","value":"60"}]}],"reliabilityLevel":"Bronze","nodeTypes":[{"name":"nt1vm","clientConnectionEndpointPort":19000,"httpGatewayEndpointPort":19007,"applicationPorts":{"startPort":20000,"endPort":30000},"ephemeralPorts":{"startPort":49000,"endPort":64000},"isPrimary":true,"durabilityLevel":"Bronze","vmInstanceCount":5,"isStateless":false},{"name":"testnt1","clientConnectionEndpointPort":0,"httpGatewayEndpointPort":0,"applicationPorts":{"startPort":1000,"endPort":2000},"ephemeralPorts":{"startPort":3000,"endPort":4000},"isPrimary":false,"durabilityLevel":"Bronze","vmInstanceCount":3,"isStateless":false}],"diagnosticsStorageAccountConfig":{"storageAccountName":"diag","primaryAccessKey":"","secondaryAccessKey":"","protectedAccountKeyName":"StorageAccountKey1","blobEndpoint":"https://diag.blob.core.windows.net/","queueEndpoint":"https://diag.queue.core.windows.net/","tableEndpoint":"https://diag.table.core.windows.net/","protectedAccountKeyName2":""},"upgradeMode":"Automatic","availableClusterVersions":[{"codeVersion":"8.2.1235.9590","supportExpiryUtc":"9999-12-31T23:59:59.9999999","environment":"Windows"}],"eventStoreServiceEnabled":true,"upgradeWave":"Wave0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '3084',
  'Content-Type',
  'application/json',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operationResults/c7e18182-6fc2-47cf-89a5-f41c9a82567a?api-version=2021-06-01',
  'Retry-After',
  '60',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operations/c7e18182-6fc2-47cf-89a5-f41c9a82567a?api-version=2021-06-01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-request-id',
  '4e647acb-d356-4d51-bdc1-3fcb0d7a0d34',
  'x-ms-correlation-request-id',
  '4e647acb-d356-4d51-bdc1-3fcb0d7a0d34',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T090707Z:4e647acb-d356-4d51-bdc1-3fcb0d7a0d34',
  'Date',
  'Wed, 03 Nov 2021 09:07:06 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operations/c7e18182-6fc2-47cf-89a5-f41c9a82567a')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947c5eca347e947779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb7757757559ccf2bab9fb4531adaba63a6fc7aff3fab298e6cfb2495d4cef96d534138079d6b4ebe66eb5ca6bfd64fa20df3dd83dd8dbfef47cbab7bdff607abe7df030bbbf7dbebf3b7d981decddfff441f6d188515c668b1c48bec72b4d9b517f78e9f57a3acdf3593e73dfd4ed9b4220eeedeced6eefee6eefdc7bb3f3f0d1ce83473b9f8e1fec3ddc79b87fffa7b47dbe9c6d6cbdbfff607ff7c0b4a6f14df3657b522d5665dee2addd9d9df1ce6f9c","fc92ff072ad8e7646e010000"], [
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
  '11995',
  'x-ms-request-id',
  'dab398f3-7942-4d5c-b577-6dd491a35734',
  'x-ms-correlation-request-id',
  'dab398f3-7942-4d5c-b577-6dd491a35734',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T090707Z:dab398f3-7942-4d5c-b577-6dd491a35734',
  'Date',
  'Wed, 03 Nov 2021 09:07:07 GMT'
]);
