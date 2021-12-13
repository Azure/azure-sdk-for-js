let nock = require('nock');

module.exports.hash = "57052d8b6a6027078274bb8306249373";

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
  '1a38419d-bfc2-443e-bb1b-f20c14562100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApGk_6bAkPtPsW70X8m-GUQ; expires=Wed, 12-Jan-2022 05:36:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7GrltoeFIgp9Mec4Fn81R-2drT4-7JkiC1GM5lhubRwY2DUtTC5ILh9V2K_3U8AiVDE_KlRNSs7VYU838cahDnqy5LZ6I6wgp4kefz8QF_l6SZ4sBm6mCoqU-YuXY-hMssDwhDtDxrEyI97gQRKyxMEqxAKPri9Kt56pxtkVHpEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:03 GMT',
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
  '89baab6e-fe24-4d4d-94c1-3b2587682000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjrgAAoFT4pBorgykX9L3D4; expires=Wed, 12-Jan-2022 05:36:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryMwZAh_R-KWpsyH5sRI09ysSHAk1cLHpXfnKJ7Lm8GfHK49hXGqWOjmT6kFSKgyn0gKLAtk8yU8KC11vkJYsAl9Om9fs2X3PjE_i1EHw8kzPJib6Cey_n1QZ6hyLAtOasysd9ZkBHYe1zQMcOIvwn7DfXyreKXGfo3G8TWaiG4cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1c833450-c596-40bb-ad83-fe90c1b57dda&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9f30f205-82d0-49c8-908f-cc15fc642000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag9qefjyzSFDlVteRLPuD7cWPr5BAQAAAMPSSNkOAAAA; expires=Wed, 12-Jan-2022 05:36:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:04 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy', {"tags":{"a":"b"},"properties":{"eventStoreServiceEnabled":true,"nodeTypes":[{"name":"nt1vm","clientConnectionEndpointPort":19000,"httpGatewayEndpointPort":19007,"durabilityLevel":"Bronze","applicationPorts":{"startPort":20000,"endPort":30000},"ephemeralPorts":{"startPort":49000,"endPort":64000},"isPrimary":true,"vmInstanceCount":5},{"name":"testnt1","clientConnectionEndpointPort":0,"httpGatewayEndpointPort":0,"durabilityLevel":"Bronze","applicationPorts":{"startPort":1000,"endPort":2000},"ephemeralPorts":{"startPort":3000,"endPort":4000},"isPrimary":false,"vmInstanceCount":3}],"reliabilityLevel":"Bronze","upgradeMode":"Automatic"}})
  .query(true)
  .reply(202, {"type":"Microsoft.ServiceFabric/clusters","location":"eastus","id":"/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy","name":"myclusterxxxy","tags":{"a":"b"},"etag":"W/\"637749705587554020\"","systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-12-13T05:35:57.3787968+00:00","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-12-13T05:36:06.3594861+00:00"},"properties":{"provisioningState":"Succeeded","clusterId":"e7ecc3fa-c892-4e85-8cd8-de35306b8f99","clusterCodeVersion":"8.2.1235.9590","clusterState":"WaitingForNodes","managementEndpoint":"http://myCluster.eastus.cloudapp.azure.com:19080","clusterEndpoint":"https://eastus.servicefabric.azure.com/runtime/clusters/e7ecc3fa-c892-4e85-8cd8-de35306b8f99","clientCertificateThumbprints":[],"clientCertificateCommonNames":[],"fabricSettings":[{"name":"UpgradeService","parameters":[{"name":"AppPollIntervalInSeconds","value":"60"}]}],"reliabilityLevel":"Bronze","nodeTypes":[{"name":"nt1vm","clientConnectionEndpointPort":19000,"httpGatewayEndpointPort":19007,"applicationPorts":{"startPort":20000,"endPort":30000},"ephemeralPorts":{"startPort":49000,"endPort":64000},"isPrimary":true,"durabilityLevel":"Bronze","vmInstanceCount":5,"isStateless":false},{"name":"testnt1","clientConnectionEndpointPort":0,"httpGatewayEndpointPort":0,"applicationPorts":{"startPort":1000,"endPort":2000},"ephemeralPorts":{"startPort":3000,"endPort":4000},"isPrimary":false,"durabilityLevel":"Bronze","vmInstanceCount":3,"isStateless":false}],"diagnosticsStorageAccountConfig":{"storageAccountName":"diag","primaryAccessKey":"","secondaryAccessKey":"","protectedAccountKeyName":"StorageAccountKey1","blobEndpoint":"https://diag.blob.core.windows.net/","queueEndpoint":"https://diag.queue.core.windows.net/","tableEndpoint":"https://diag.table.core.windows.net/","protectedAccountKeyName2":""},"upgradeMode":"Automatic","availableClusterVersions":[{"codeVersion":"8.2.1235.9590","supportExpiryUtc":"9999-12-31T23:59:59.9999999","environment":"Windows"}],"eventStoreServiceEnabled":true,"upgradeWave":"Wave0"}}, [
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operationResults/cc85e4c1-d46f-4e4b-b7cd-9baf77d464bd?api-version=2021-06-01',
  'Retry-After',
  '60',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operations/cc85e4c1-d46f-4e4b-b7cd-9baf77d464bd?api-version=2021-06-01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-request-id',
  'dc74e365-3ad5-4d48-9d56-dd108f4234ae',
  'x-ms-correlation-request-id',
  'dc74e365-3ad5-4d48-9d56-dd108f4234ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T053606Z:dc74e365-3ad5-4d48-9d56-dd108f4234ae',
  'Date',
  'Mon, 13 Dec 2021 05:36:05 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ServiceFabric/locations/eastus/operations/cc85e4c1-d46f-4e4b-b7cd-9baf77d464bd')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947c5eca347e947779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb7757757559ccf2bab9fb4531adaba63a6fc7aff3fab298e6cfb2495d4cef96d534138079d6b4ebe66eb5ca6bfd643a3db89fef4f77b767fb9f9e6fefe7fb93ed0981de7e38c9ce1f3ca00ff727b38f468ce2325be440f23d5e69da8cfac34bafd7d3699ecf72ef9bba7d5308c4bd9dbdddedddbdeddd7b6f76ee3fbaf7e9a39d4fc7fb0ff677ef1decfd94b6cf97b38dad0f1e3ef874f79e694de39be6cbf6a45aaccabcc55bbb3b3be39ddf38f925","ff0fdca9cf556e010000"], [
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
  'f94c3bb2-036a-4daf-af36-47f77979a863',
  'x-ms-correlation-request-id',
  'f94c3bb2-036a-4daf-af36-47f77979a863',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T053607Z:f94c3bb2-036a-4daf-af36-47f77979a863',
  'Date',
  'Mon, 13 Dec 2021 05:36:06 GMT'
]);
