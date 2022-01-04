let nock = require('nock');

module.exports.hash = "658a4c20c494c6f06a57a6e6ae8aa860";

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
  '59116ad3-9ebb-4758-b576-daba7d8d2100',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar6xVruQhP1Mq5IXWo2yWc4; expires=Wed, 12-Jan-2022 04:04:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfif9lMjUU1NxoIl6NJXzyKiMiF9jInf8lZBlWO6qGAaUEEfQD75VlMAB6VrLdk2D9aL64zthqcKa3LiayS8gsv3L1h4Oe0d0MK5DouMC46U8_Ut6rGcDwET3tI2csH_5uaoEtqrTnbOc2MKp80LTnYytH49TULShsQllwTb6id4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:43 GMT',
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
  'a342d017-372f-49fe-b224-962c2b4f2000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjQKaQTivmRHvNBKrbxoTUA; expires=Wed, 12-Jan-2022 04:04:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrL6taMEFH_W-e3g56bZWmWpKwlDgaCwhsop6BUfoCk1dtNULIpanF2U74IruzIPw3MkWTefU8-ZO_U9MzdLSS7AwTBSxRKgecNdLL-WmVaMeYfRWFwEUEiZmnccHTfg7_urhDeCPiLszrZO--lkDKyqeXn73lZXWMO32aQ9rnKbAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=607a9fcf-edf8-472c-95c5-79e5a1d7ed64&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a342d017-372f-49fe-b224-962c2c4f2000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtA5NsTnh3pMs8lDOTSgn2cWPr5BAQAAAFu9SNkOAAAA; expires=Wed, 12-Jan-2022 04:04:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 04:04:43 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93efacafabcfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6eedef6eebd373bf71eeddd7fb4b7373eb8b7b7fff0debd9fa2d617d4f62abbfeaa067ef3b65d358fee86b33166ccb609f7f1326fdd2baff20bea3b2b37bcba9d13c5d7cdf6ceeeb8d6d63d68abaa6e3702194b8bde8bb3fc322f31612ff9fb4d106cd31e9085651ee2a44d205cc31e8c66bad8f4267ddd7b655e352d58fca45a9e1717eb9a7985b8ee7bbfd8b0384deebb6b6da9dc1582ed82cc97d38ab8e3040cccdc47af2cd76539fae86d7efd93d9ba6ccf48bce593a96bf4326b9aabaab65f2df30b625ffae2a42c68b001b8f3ac6cf2e06df3d62c3f470faf9bf2097133f1e3478fda7a4d6d49fa976dd15e0bb42806af5975d0f89eac0b42724963f1bf25c65e1365f0da2ff93eb10b446e7af6f2783623add34054bf473c4e2c3ddebdb73bdebb77f0115ad5c525bd1c340384d147d96c5680d859f95c1583fdeab2a8db7556bec85b22c8db606a4c93e9ba69ab05cd0df192d1134e197d97c64e927c8c990935d3f873c2866466fc3a9fae6ba2c79860b4d5b42a9bf19bb2d9dda1e13f037569f0df04bcdd6f101e4deabd0fc7efa458919e24ecc8b294f9d3bcd9fdf4e083813ec9a66f49c17ac862f01f8e6c1cee8713b50ff78388eb8121c540daeddba480f62c34327e214bbf11d5f2a25aa22b4fc8888f85bf6745934dca5c3bb0124f5ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a98ae84a65cf09bd7ca1c81c93396ba8e38f4e97e812664da5f674395b55d403f5b5cca7103f6aa610caac3dafea85edf2a3a6bddcc3489bb76b6004a54a9f92d658ce32d26a34cc6c954d89f81f3ddaa566461f19803f205a58e8cd35b92d8ba7599b0194dad127d4f6a3f36cff41b67b6f67fb3cbb3fddde9f4d76b61f4ea7f7b727d34fefefdc9f1eec3fd87f80becc2b4ae9e3d58a062c1ac47e7b4ca4238dd5b7ca3bbb0ff77677d82a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff014e8e54a5170a0000"], [
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
  '"AAAAAABJuyo="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c444461e-a297-40b1-9dd8-86646f6707e9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6185',
  'x-ms-correlation-request-id',
  'e02b5cce-c613-4a4b-8fb6-f6434a3b0426',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040444Z:e02b5cce-c613-4a4b-8fb6-f6434a3b0426',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:44 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2","name":"myserviceyyy2","type":"Microsoft.ApiManagement/service","tags":{},"location":"East US","etag":"AAAAAABJuys=","properties":{"publisherEmail":"foo@contoso.com","publisherName":"foo","notificationSenderEmail":"apimgmt-noreply@mail.windowsazure.com","provisioningState":"Succeeded","targetProvisioningState":"Deleting","createdAtUtc":"2021-12-13T03:25:22.8324933Z","gatewayUrl":"https://myserviceyyy2.azure-api.net","gatewayRegionalUrl":"https://myserviceyyy2-eastus-01.regional.azure-api.net","portalUrl":"https://myserviceyyy2.portal.azure-api.net","developerPortalUrl":"https://myserviceyyy2.developer.azure-api.net","managementApiUrl":"https://myserviceyyy2.management.azure-api.net","scmUrl":"https://myserviceyyy2.scm.azure-api.net","hostnameConfigurations":[{"type":"Proxy","hostName":"myserviceyyy2.azure-api.net","encodedCertificate":null,"keyVaultId":null,"certificatePassword":null,"negotiateClientCertificate":false,"certificate":null,"defaultSslBinding":true,"identityClientId":null,"certificateSource":"BuiltIn","certificateStatus":null}],"publicIPAddresses":["20.83.131.238"],"privateIPAddresses":null,"additionalLocations":null,"virtualNetworkConfiguration":null,"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2":"False"},"virtualNetworkType":"None","certificates":null,"disableGateway":false,"apiVersionConstraint":{"minApiVersion":null},"publicIpAddressId":null,"publicNetworkAccess":"Enabled","privateEndpointConnections":null,"platformVersion":"stv2"},"sku":{"name":"Standard","capacity":1},"identity":null,"zones":null,"systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-12-13T03:25:22.0192103Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-12-13T03:25:22.0192103Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2591',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '19279b0e-b9d3-475b-ae85-f0632a078f96',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  'eb58dbf2-caf4-4c0b-a581-1cee7ccb1358',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040447Z:eb58dbf2-caf4-4c0b-a581-1cee7ccb1358',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b20b57a2-5514-44d5-b028-7683a76a55ea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6184',
  'x-ms-correlation-request-id',
  '55fb09d4-10e0-4007-ac51-0f0b6892f9dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040448Z:55fb09d4-10e0-4007-ac51-0f0b6892f9dc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6727d342-7357-4f51-91e2-a786d7288f27',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6183',
  'x-ms-correlation-request-id',
  'f9afd071-772a-45d3-9377-7fec8d1bb789',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040448Z:f9afd071-772a-45d3-9377-7fec8d1bb789',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3cd6b811-02cb-44a3-af86-4da282a1524c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6182',
  'x-ms-correlation-request-id',
  '9e3f2071-efc2-4d81-aa54-0b22e5cd1775',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040449Z:9e3f2071-efc2-4d81-aa54-0b22e5cd1775',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ee4e62e-b9e7-4714-a592-4d7d96be8d34',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6181',
  'x-ms-correlation-request-id',
  'ff9c40ef-e834-4091-a347-3fb3ac917236',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040449Z:ff9c40ef-e834-4091-a347-3fb3ac917236',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ca5471f-8a45-4a09-9906-b8bd5c04f6db',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6180',
  'x-ms-correlation-request-id',
  'eb9dc829-62f8-44ba-b6aa-ace264df12eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040449Z:eb9dc829-62f8-44ba-b6aa-ace264df12eb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ad7a5a3a-a9f8-417b-ad26-fe551706ca39',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6179',
  'x-ms-correlation-request-id',
  '0126d013-38eb-4bb6-a199-2468abcd3f36',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040450Z:0126d013-38eb-4bb6-a199-2468abcd3f36',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0970a2f6-9f68-44ad-8206-ae7a676cbf5e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6178',
  'x-ms-correlation-request-id',
  'ef223bc0-4c9f-417e-b591-c61845ec77b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040450Z:ef223bc0-4c9f-417e-b591-c61845ec77b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '24e5b1d5-96af-4e57-a7e3-4bae782a6952',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6177',
  'x-ms-correlation-request-id',
  '4b04e8af-7b02-4f79-8db6-92eec06fbb67',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040451Z:4b04e8af-7b02-4f79-8db6-92eec06fbb67',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1835bb4e-1ee5-40e6-87da-8f62175ee8be',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6176',
  'x-ms-correlation-request-id',
  '4fea0e83-ce7b-426b-8d21-7b88082947c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040451Z:4fea0e83-ce7b-426b-8d21-7b88082947c0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5bd1c63c-a0c7-4e88-b9c7-19f69427a5ee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6175',
  'x-ms-correlation-request-id',
  '0c5bdf82-c069-4d5a-a5b3-8493e9a0f89f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040451Z:0c5bdf82-c069-4d5a-a5b3-8493e9a0f89f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c7a7881d-d3cd-4757-852b-948c2e139f24',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6174',
  'x-ms-correlation-request-id',
  '4d9ce191-9d8b-4594-bbce-904d8c60da95',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040452Z:4d9ce191-9d8b-4594-bbce-904d8c60da95',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3718d4ad-5a17-47fc-9236-33a7d668d6ce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6173',
  'x-ms-correlation-request-id',
  'b54635e6-b5db-4a3e-9ce0-09a32f2336ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040452Z:b54635e6-b5db-4a3e-9ce0-09a32f2336ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4869b768-59c4-44a5-bac8-ae8f3072ee1f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6172',
  'x-ms-correlation-request-id',
  '329f09c8-d387-4114-8ba9-c3750643a3d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040452Z:329f09c8-d387-4114-8ba9-c3750643a3d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fef8dc61-e1ef-410e-8662-695648c177b7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6171',
  'x-ms-correlation-request-id',
  '5e428da3-5805-49df-b2ce-2b03041faf28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040453Z:5e428da3-5805-49df-b2ce-2b03041faf28',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56c0087a-a2fc-4dc7-8a48-a728a9ed9393',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6170',
  'x-ms-correlation-request-id',
  '6f81ee03-3b28-44ea-b932-1bb5ea532a2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040453Z:6f81ee03-3b28-44ea-b932-1bb5ea532a2f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c85d14d8-705b-43bc-b7dd-194ad341d529',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6169',
  'x-ms-correlation-request-id',
  'b5fe9e3b-0fb5-469a-92b7-5a3ba5eb081b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040454Z:b5fe9e3b-0fb5-469a-92b7-5a3ba5eb081b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '147b7d12-dde7-482d-97a1-eaa73b632ad1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6168',
  'x-ms-correlation-request-id',
  'cc310188-b19d-4473-9231-32ddde0e9ebb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040454Z:cc310188-b19d-4473-9231-32ddde0e9ebb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '00eb0d79-dc30-41e8-8928-7481bfedd8f6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6167',
  'x-ms-correlation-request-id',
  'e6aa7f2c-cc04-4fe3-a721-d1438216d4b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040454Z:e6aa7f2c-cc04-4fe3-a721-d1438216d4b1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ab80355c-dfff-49cf-9f70-02aad6b3500a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6166',
  'x-ms-correlation-request-id',
  '03e00c83-40fe-4158-b6ce-a9304b0bcae9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040455Z:03e00c83-40fe-4158-b6ce-a9304b0bcae9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e3686c75-1506-40c8-9dba-af67e998c2a8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6165',
  'x-ms-correlation-request-id',
  'ce8e833a-501a-4124-afcf-d19b77bf23f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040455Z:ce8e833a-501a-4124-afcf-d19b77bf23f8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a39a8e43-7221-4bd4-a8e3-419a17d144d4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6164',
  'x-ms-correlation-request-id',
  '583a87fa-b40c-42be-b836-b9d8179eb794',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040456Z:583a87fa-b40c-42be-b836-b9d8179eb794',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '773c03bc-863c-43ae-ba1d-f5c704ece5d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6163',
  'x-ms-correlation-request-id',
  '69f55902-c360-4a14-8168-e11fd6c38d7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040456Z:69f55902-c360-4a14-8168-e11fd6c38d7e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7b1ecdc1-b102-4459-91dc-3db74fbbc463',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6162',
  'x-ms-correlation-request-id',
  '13576380-de1c-475b-b185-14ea3a99aae7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040456Z:13576380-de1c-475b-b185-14ea3a99aae7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96af7a49-7249-468c-8448-8871da7333c8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6161',
  'x-ms-correlation-request-id',
  '4487151d-28a1-48d9-adbe-4c2f21df2776',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040457Z:4487151d-28a1-48d9-adbe-4c2f21df2776',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b7e09f6-e5d5-4a7b-b5dc-7afa50f936e0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6160',
  'x-ms-correlation-request-id',
  '61785725-707f-4b71-b7c2-a46091cefb43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040457Z:61785725-707f-4b71-b7c2-a46091cefb43',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '188939e9-b6ca-4019-b624-dce8cafaa17d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6159',
  'x-ms-correlation-request-id',
  '98747c75-7ff7-4275-8db5-4f8055479f4d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040458Z:98747c75-7ff7-4275-8db5-4f8055479f4d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ae1e241e-6964-4b58-9b03-2c497c4a98da',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6158',
  'x-ms-correlation-request-id',
  'cc558c13-f2b1-4c94-b379-2f34bc0773e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040458Z:cc558c13-f2b1-4c94-b379-2f34bc0773e6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '08041c11-09b5-4338-a46a-50d86d887f3b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6157',
  'x-ms-correlation-request-id',
  'cd06b619-78ac-4c85-826a-08f954ffe162',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040458Z:cd06b619-78ac-4c85-826a-08f954ffe162',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ae92cd1a-f73d-4f81-85d9-870b5acd5e27',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6156',
  'x-ms-correlation-request-id',
  'f26b32b1-17c7-4f88-a9cf-112da73d1976',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040459Z:f26b32b1-17c7-4f88-a9cf-112da73d1976',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2bab42b0-4e4c-4d48-9521-f4d2819098eb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6155',
  'x-ms-correlation-request-id',
  'c5683166-b194-4a96-a190-ec1f15b98be1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040459Z:c5683166-b194-4a96-a190-ec1f15b98be1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '75ea1143-bc09-4518-8c7d-3b932526fc3c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6154',
  'x-ms-correlation-request-id',
  'eb7728ef-e56c-4e3a-8180-b3e3ed1b50a4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040500Z:eb7728ef-e56c-4e3a-8180-b3e3ed1b50a4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3b3bb3b5-5f6d-47fb-a2f8-267233390598',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6153',
  'x-ms-correlation-request-id',
  '37331863-d25d-4d28-9ec6-c1c378b7921c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040500Z:37331863-d25d-4d28-9ec6-c1c378b7921c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '86d4f796-b5a4-47c4-bfa2-b51e671e6732',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6152',
  'x-ms-correlation-request-id',
  'b798bb3d-7441-4da1-b2aa-3eb134cde607',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040500Z:b798bb3d-7441-4da1-b2aa-3eb134cde607',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '037343e3-2d17-4f6a-8ffa-3634cf01f13a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6151',
  'x-ms-correlation-request-id',
  '6bc46548-5450-494c-84ea-9a46651fe3ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040501Z:6bc46548-5450-494c-84ea-9a46651fe3ea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b88d8ff8-6387-4eab-9562-9faf1077577c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6150',
  'x-ms-correlation-request-id',
  'da450df9-f609-459f-934c-6ef13511269c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040501Z:da450df9-f609-459f-934c-6ef13511269c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3e412197-de2a-422f-a993-e11fc5496844',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6149',
  'x-ms-correlation-request-id',
  'f5da2ab6-759c-40e0-9d7c-a85b3b070099',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040502Z:f5da2ab6-759c-40e0-9d7c-a85b3b070099',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2b8d424e-93d9-4cc4-bbef-60f7d54bdc40',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6148',
  'x-ms-correlation-request-id',
  '8894b842-8292-4ee0-8426-c12b1ba17eda',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040502Z:8894b842-8292-4ee0-8426-c12b1ba17eda',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '581361fc-c445-49ee-8dbf-80d5b98a499f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6147',
  'x-ms-correlation-request-id',
  '209380c5-5de9-4347-a8fc-abf3312a2b71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040502Z:209380c5-5de9-4347-a8fc-abf3312a2b71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '60e1e923-891d-4f4d-97fc-e2ad43a43c58',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6146',
  'x-ms-correlation-request-id',
  'd1157859-3876-402d-984c-0a01c88d581d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040503Z:d1157859-3876-402d-984c-0a01c88d581d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '65c1e593-0db1-43c0-83bb-f54cc0acd2d4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6145',
  'x-ms-correlation-request-id',
  'babdc2dc-4d75-4c49-b421-c4082df3c644',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040503Z:babdc2dc-4d75-4c49-b421-c4082df3c644',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd43c9c3-170e-4d96-9b73-1dc2ba7dec6a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6144',
  'x-ms-correlation-request-id',
  '9448f93a-8d6c-4291-b99d-58503bb350a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040504Z:9448f93a-8d6c-4291-b99d-58503bb350a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '647c4fd4-807a-4f24-9a6c-03db3beabf7f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6143',
  'x-ms-correlation-request-id',
  '44fcf17f-3065-4b3b-bc86-30d4714d5dd0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040504Z:44fcf17f-3065-4b3b-bc86-30d4714d5dd0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '664c937a-9000-41a4-9b38-10439053f3de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6142',
  'x-ms-correlation-request-id',
  '2c01639f-a376-46d6-9e99-96ef29602543',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040504Z:2c01639f-a376-46d6-9e99-96ef29602543',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b57a634a-679f-4566-bd51-50c35e747ffe',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6141',
  'x-ms-correlation-request-id',
  '75eda67b-a074-4a63-af47-b43b5c82a5cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040505Z:75eda67b-a074-4a63-af47-b43b5c82a5cc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df379c86-6f7c-4416-abc8-59d173caf448',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6140',
  'x-ms-correlation-request-id',
  '68834e58-fb55-412b-adb1-35070a9885cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040505Z:68834e58-fb55-412b-adb1-35070a9885cc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e7106e10-732b-46d5-99a8-cf4f2490f566',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6139',
  'x-ms-correlation-request-id',
  '5b626870-b70e-4858-aa1d-f0381d130eaa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040506Z:5b626870-b70e-4858-aa1d-f0381d130eaa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e8354ca2-6b2c-450f-9160-af5dadb5a942',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6138',
  'x-ms-correlation-request-id',
  '08613172-86ab-4cc5-9196-6248547a1064',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040506Z:08613172-86ab-4cc5-9196-6248547a1064',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd4bc49d6-341f-47ca-97a8-9c6685e10d64',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6137',
  'x-ms-correlation-request-id',
  '09f1a50a-1a33-44ef-84d6-5807ec49ba2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040506Z:09f1a50a-1a33-44ef-84d6-5807ec49ba2f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '774320e2-5c07-4ea2-b055-4800d4ce09da',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6136',
  'x-ms-correlation-request-id',
  '25cb7115-34aa-4195-be3f-79c356405803',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040507Z:25cb7115-34aa-4195-be3f-79c356405803',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '224ba493-7733-4dc9-96d8-25f9dba8829b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6135',
  'x-ms-correlation-request-id',
  'df5f82ab-1e8c-4d1f-ac05-0a882da54499',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040507Z:df5f82ab-1e8c-4d1f-ac05-0a882da54499',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '37115495-17b7-400d-ba5f-1c6fc17d78d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6134',
  'x-ms-correlation-request-id',
  'cc78dacc-9d19-4461-8110-ba6c28cacaf1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040507Z:cc78dacc-9d19-4461-8110-ba6c28cacaf1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe592382-74c8-4148-9c66-0d1d9091ca15',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6133',
  'x-ms-correlation-request-id',
  'd6a9e546-a652-4d8f-b790-ee7ee5ef5252',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040508Z:d6a9e546-a652-4d8f-b790-ee7ee5ef5252',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3f22125a-a93f-48f1-832c-5b3d29d512c0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6132',
  'x-ms-correlation-request-id',
  'fe2ae1b6-0e19-40d0-aa4b-e6879a17fdac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040508Z:fe2ae1b6-0e19-40d0-aa4b-e6879a17fdac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '64240747-958f-49ea-a9a1-3085b85e935a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6131',
  'x-ms-correlation-request-id',
  '7995ef03-7f6d-4e74-90b4-fe915c772be6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040509Z:7995ef03-7f6d-4e74-90b4-fe915c772be6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0486ad39-a932-46c0-8d88-303baea5ea25',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6130',
  'x-ms-correlation-request-id',
  'b30ed5dd-dfb8-4b17-84cc-124db2b4eaee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040509Z:b30ed5dd-dfb8-4b17-84cc-124db2b4eaee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c88be162-f074-4692-bc0b-a6bd1b63ca1c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6129',
  'x-ms-correlation-request-id',
  'c2e73422-4b7e-43e3-8874-856e85e0b1c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040509Z:c2e73422-4b7e-43e3-8874-856e85e0b1c0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '610a9e5b-e08d-46fe-8a90-a37d79ad227b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6128',
  'x-ms-correlation-request-id',
  '8870280f-5fa7-4146-971a-538f8fe8d8b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040510Z:8870280f-5fa7-4146-971a-538f8fe8d8b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a279e9a5-b350-4b35-88af-41ad6f7ccc73',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6127',
  'x-ms-correlation-request-id',
  '12096ca5-9a3a-4476-bd42-e31af223b2e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040510Z:12096ca5-9a3a-4476-bd42-e31af223b2e4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a1cbd9c-0872-4ed5-be26-8755bb9831e3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6126',
  'x-ms-correlation-request-id',
  '2c91ea6e-8d10-45b9-9a28-34e5e209d557',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040511Z:2c91ea6e-8d10-45b9-9a28-34e5e209d557',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '16f42f2c-fb32-4932-bc9e-696933fc5c21',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6125',
  'x-ms-correlation-request-id',
  '0bc5b45a-91df-47bb-a236-629781e71b0b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040511Z:0bc5b45a-91df-47bb-a236-629781e71b0b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c79e081a-ba3f-4bac-bc12-51401513ee5c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6124',
  'x-ms-correlation-request-id',
  '6247d21b-4c5b-44e6-8a13-21134818075f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040511Z:6247d21b-4c5b-44e6-8a13-21134818075f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1ed7d9ab-02e7-4dbe-997c-af4f5d34896b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6123',
  'x-ms-correlation-request-id',
  '484d1fff-8815-4cda-8d02-68fb63eb307d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040512Z:484d1fff-8815-4cda-8d02-68fb63eb307d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3e784418-2160-4ae0-8223-3f7053a1b8fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6122',
  'x-ms-correlation-request-id',
  '53d345ed-4a9e-4e3c-8b49-304cb37a979a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040512Z:53d345ed-4a9e-4e3c-8b49-304cb37a979a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a27daf80-6c51-4978-8b55-e934b5f99782',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6121',
  'x-ms-correlation-request-id',
  'dd24329b-2db0-4ef3-9dc6-fc53cac4fc1a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040513Z:dd24329b-2db0-4ef3-9dc6-fc53cac4fc1a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c58c1ddd-1582-459e-9d74-03e97bde6120',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6120',
  'x-ms-correlation-request-id',
  '01fe17f6-4646-4713-b148-8aea02be4ed3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040513Z:01fe17f6-4646-4713-b148-8aea02be4ed3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a90f4ae7-a938-4332-93f6-399129c97fd1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6119',
  'x-ms-correlation-request-id',
  '2144ab99-52a6-4328-8f89-1cee5756456d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040513Z:2144ab99-52a6-4328-8f89-1cee5756456d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e6ba6009-3d7d-4cbe-bce9-cacec6a5657b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6118',
  'x-ms-correlation-request-id',
  'b8f61f52-0292-4b62-8b7f-fa6a5701534a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040514Z:b8f61f52-0292-4b62-8b7f-fa6a5701534a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4e958296-a154-4f63-b9c8-5e543692896b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6117',
  'x-ms-correlation-request-id',
  'eacef6a3-23a4-4044-ac8f-2470645a287c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040514Z:eacef6a3-23a4-4044-ac8f-2470645a287c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '57df1860-215e-4fc7-8160-ca5c6fffd723',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6116',
  'x-ms-correlation-request-id',
  '202fe4c8-e130-42b4-8a2f-15a8938fdeba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040515Z:202fe4c8-e130-42b4-8a2f-15a8938fdeba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ec1fe9cc-7737-44df-b9f6-7b83e52159ab',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6115',
  'x-ms-correlation-request-id',
  'ffa93c70-ae96-471b-b561-044b7410e5e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040515Z:ffa93c70-ae96-471b-b561-044b7410e5e1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '158f70da-2f5d-4261-819a-ee2536f1fa60',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6114',
  'x-ms-correlation-request-id',
  '5357d353-ab68-43ef-bc51-edac9d538f62',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040515Z:5357d353-ab68-43ef-bc51-edac9d538f62',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '535edb7c-6160-4812-8deb-a75e38792947',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6113',
  'x-ms-correlation-request-id',
  'db4b080f-de4a-48fa-929e-d9f968f61af0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040516Z:db4b080f-de4a-48fa-929e-d9f968f61af0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '69b6d6e1-37f5-4afc-a896-83485129265f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6112',
  'x-ms-correlation-request-id',
  '00f80e77-da0c-4ed7-8a11-e14c6d9e6e21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040516Z:00f80e77-da0c-4ed7-8a11-e14c6d9e6e21',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96af6b3f-7335-45f3-adce-dddb5de48d7f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6111',
  'x-ms-correlation-request-id',
  '26ffc8c3-3a56-44f3-b7f3-9bad5715d6ec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040517Z:26ffc8c3-3a56-44f3-b7f3-9bad5715d6ec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '71b52b41-6e93-4e7f-8f5f-634d35f7cdff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6110',
  'x-ms-correlation-request-id',
  '8bfd3b5d-2eb3-4c86-b4e5-02c8a0dc98bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040517Z:8bfd3b5d-2eb3-4c86-b4e5-02c8a0dc98bd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63058c43-ab52-43ed-915f-af7a2ef28643',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6109',
  'x-ms-correlation-request-id',
  'cd9ad042-899a-407f-9721-6cc43fd382b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040517Z:cd9ad042-899a-407f-9721-6cc43fd382b1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '00cc20ea-c0f7-404c-8ef3-04026d36317d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6108',
  'x-ms-correlation-request-id',
  '0e0e5c05-6dec-422b-9d00-e093130802f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040518Z:0e0e5c05-6dec-422b-9d00-e093130802f8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97db474d-42a4-4e67-8f56-d37e89e40a74',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6107',
  'x-ms-correlation-request-id',
  'd2b075d8-94c2-475b-a8b2-95580ee63108',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040518Z:d2b075d8-94c2-475b-a8b2-95580ee63108',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '12afb4b1-7070-4b26-9e20-26aeed91ff5c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6106',
  'x-ms-correlation-request-id',
  'cf94fb5e-b411-43da-8191-b4c82cd5c5b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040518Z:cf94fb5e-b411-43da-8191-b4c82cd5c5b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6269bd11-14ff-4c90-8421-4f75605190a5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6105',
  'x-ms-correlation-request-id',
  'a76f17e7-f409-44fd-a0ac-858fae806792',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040519Z:a76f17e7-f409-44fd-a0ac-858fae806792',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7325698f-4ca7-4b46-bdd2-db4e64986f8e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6104',
  'x-ms-correlation-request-id',
  'c4bddd0e-f894-41a7-9d12-d0bad574f1e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040519Z:c4bddd0e-f894-41a7-9d12-d0bad574f1e8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f3838c12-817a-4c05-ba95-592f279c78e1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6103',
  'x-ms-correlation-request-id',
  '038a994d-9430-44fa-b377-62219096136a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040520Z:038a994d-9430-44fa-b377-62219096136a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bf9298a3-2d51-41c1-a0b5-7d3f4bb248b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6102',
  'x-ms-correlation-request-id',
  '1ecf3672-502f-498c-9d39-eb8661c276ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040520Z:1ecf3672-502f-498c-9d39-eb8661c276ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2d9d7f94-21d4-449c-8c72-381558832f2e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6101',
  'x-ms-correlation-request-id',
  '6797e2f7-94a4-44b2-bad7-1015c10f1e42',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040520Z:6797e2f7-94a4-44b2-bad7-1015c10f1e42',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '084fd99f-0a9a-41f3-9bab-5307db372217',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6100',
  'x-ms-correlation-request-id',
  '6ac3ac3e-d400-4b35-a204-20520b83acd4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040521Z:6ac3ac3e-d400-4b35-a204-20520b83acd4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f3933c46-c05e-4d17-9887-f9ef861677e2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6099',
  'x-ms-correlation-request-id',
  'fe997c74-5a9c-432f-a5b5-c5036f4adf79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040521Z:fe997c74-5a9c-432f-a5b5-c5036f4adf79',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '29455a25-cd40-46c6-a8b5-a38aa5b9c7a4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6098',
  'x-ms-correlation-request-id',
  '7393fc87-b8ec-4885-afd0-06bea7532b82',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040522Z:7393fc87-b8ec-4885-afd0-06bea7532b82',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '06e83ad0-ed60-41c6-a47e-fa670d300b69',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6097',
  'x-ms-correlation-request-id',
  '3658051f-f5a9-42bd-a853-1b62bbfd9eae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040522Z:3658051f-f5a9-42bd-a853-1b62bbfd9eae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '26ac98f1-5b34-4414-859f-1ce4ce81ee83',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6096',
  'x-ms-correlation-request-id',
  '04cde063-4608-435d-8313-85433f9f1139',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040522Z:04cde063-4608-435d-8313-85433f9f1139',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eedeff8c-9618-4f2b-8952-b1ab0cfedc60',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6095',
  'x-ms-correlation-request-id',
  '43e7fc89-0a15-43d9-af16-8c5601324887',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040523Z:43e7fc89-0a15-43d9-af16-8c5601324887',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2ffff9b3-ac86-4287-9d4d-be36aa31837f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6094',
  'x-ms-correlation-request-id',
  '1e7a5711-d214-41fa-951f-2bc0bd6f5f39',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040523Z:1e7a5711-d214-41fa-951f-2bc0bd6f5f39',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '72c563c9-b393-4c5c-8f16-7fa92e78c11e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6093',
  'x-ms-correlation-request-id',
  '0c0b82fc-30b6-48a6-9986-cc00032793b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040524Z:0c0b82fc-30b6-48a6-9986-cc00032793b2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7bdcc39c-f055-492a-854e-005302247896',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6092',
  'x-ms-correlation-request-id',
  'a1a2ccbd-6bd1-4213-aa39-8ada0b87ba23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040524Z:a1a2ccbd-6bd1-4213-aa39-8ada0b87ba23',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97b7aab8-3688-4751-8d04-385343735d2c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6091',
  'x-ms-correlation-request-id',
  '00546f30-fde3-472e-b574-0dec8a685590',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040524Z:00546f30-fde3-472e-b574-0dec8a685590',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8feabaa8-06e8-4583-9d1d-e15368c7e9e2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6090',
  'x-ms-correlation-request-id',
  'fe9b3270-2882-49ca-90d1-62666f9bf78a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040525Z:fe9b3270-2882-49ca-90d1-62666f9bf78a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e02f4330-c780-4b1c-83b0-d189d266ec79',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6089',
  'x-ms-correlation-request-id',
  'e5b2270e-460e-47d7-bf33-6333800e2d81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040525Z:e5b2270e-460e-47d7-bf33-6333800e2d81',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '09016f36-b97f-40e2-88d2-5221a48a213c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6088',
  'x-ms-correlation-request-id',
  'c1d1fafc-2a21-4762-ac40-61a5324c31db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040526Z:c1d1fafc-2a21-4762-ac40-61a5324c31db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7ba9aee7-5076-4496-ba12-92b6064314d5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6087',
  'x-ms-correlation-request-id',
  'd7428e08-2509-4ebb-b798-fed395a950c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040526Z:d7428e08-2509-4ebb-b798-fed395a950c6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '80033788-edf1-498b-bb20-411f63f1137a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6086',
  'x-ms-correlation-request-id',
  '5c622d73-52a1-4913-b16a-5f38edea191b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040526Z:5c622d73-52a1-4913-b16a-5f38edea191b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e45ce7bb-bb22-44d4-a48d-a40d333f2f1a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6085',
  'x-ms-correlation-request-id',
  '4ba617e9-4f4b-46d7-9f6d-018d1491d47a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040527Z:4ba617e9-4f4b-46d7-9f6d-018d1491d47a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6f188661-e24d-463c-9737-759e752baef2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6084',
  'x-ms-correlation-request-id',
  'da0f4f51-e253-4a50-9039-8ee26fd79ef5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040527Z:da0f4f51-e253-4a50-9039-8ee26fd79ef5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'edf0fba5-c961-4519-a479-b84235399d99',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6083',
  'x-ms-correlation-request-id',
  '95ae71a3-f660-4c12-ba8c-91e3cf6a56cb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040528Z:95ae71a3-f660-4c12-ba8c-91e3cf6a56cb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc250c20-1591-4853-90c6-eb24466f6109',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6082',
  'x-ms-correlation-request-id',
  '62f224b5-fbd4-4faa-8a22-d6d92294731c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040528Z:62f224b5-fbd4-4faa-8a22-d6d92294731c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ca03eb2-a5a0-42ea-99df-a57c7a6a0fa8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6081',
  'x-ms-correlation-request-id',
  'e04a921f-b891-407a-a120-30dfaafb9383',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040528Z:e04a921f-b891-407a-a120-30dfaafb9383',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ca3b64c1-0457-4f6c-a07c-e50cedbe51e5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6080',
  'x-ms-correlation-request-id',
  '45537e22-2a17-496f-9936-84b690c47aee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040529Z:45537e22-2a17-496f-9936-84b690c47aee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9cbb942b-4662-4131-bcde-654bde873c22',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6079',
  'x-ms-correlation-request-id',
  '7aec9284-f176-4777-8b3f-918129c4c533',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040529Z:7aec9284-f176-4777-8b3f-918129c4c533',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '23caf118-0b79-4528-bda9-8f526f6a20a1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6078',
  'x-ms-correlation-request-id',
  '3d35981f-a329-458f-8a6f-268865eb60bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040530Z:3d35981f-a329-458f-8a6f-268865eb60bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd3c85df4-99a1-454e-94dd-2d456baa2c6e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6077',
  'x-ms-correlation-request-id',
  'ff6be6ca-99f9-4a36-9bfb-f5942022363a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040530Z:ff6be6ca-99f9-4a36-9bfb-f5942022363a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fa229b4b-332a-4adf-9a18-5f4341c83616',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6076',
  'x-ms-correlation-request-id',
  'bb0b5254-98d7-40ae-a26e-f0b36da9042a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040530Z:bb0b5254-98d7-40ae-a26e-f0b36da9042a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd61bcae4-aabd-4e76-9253-d0073f1cab02',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6075',
  'x-ms-correlation-request-id',
  '5570ffb4-3660-4ee2-92ab-2395a74cea92',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040531Z:5570ffb4-3660-4ee2-92ab-2395a74cea92',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ec811dd3-d6cf-4f5c-88f0-016bbfa41b73',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6074',
  'x-ms-correlation-request-id',
  '4f01de9c-3335-4f52-ab08-49bd31aa2fb4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040531Z:4f01de9c-3335-4f52-ab08-49bd31aa2fb4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eaf0bb7c-ba9f-4f05-9f34-e6572cca0293',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6073',
  'x-ms-correlation-request-id',
  '4138f87d-c91d-4ca6-a683-251e6b2e85d2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040532Z:4138f87d-c91d-4ca6-a683-251e6b2e85d2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '009df708-3919-41aa-97bb-818d02cf7bae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6072',
  'x-ms-correlation-request-id',
  'c6d590a3-702f-45d8-be16-d7095021de95',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040532Z:c6d590a3-702f-45d8-be16-d7095021de95',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97ef53b9-08d5-4ee9-a171-743b9dff337b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6071',
  'x-ms-correlation-request-id',
  '31669f98-6752-4025-bdb7-b2b275b095d1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040532Z:31669f98-6752-4025-bdb7-b2b275b095d1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b904e4ed-23ce-41aa-ae55-29d2bedd3c8f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6070',
  'x-ms-correlation-request-id',
  'd1bde174-7219-49ce-b129-ee912565020a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040533Z:d1bde174-7219-49ce-b129-ee912565020a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e6eca7d-322d-408c-b142-26d66bb17188',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6069',
  'x-ms-correlation-request-id',
  'd276cc72-cede-431a-9293-9926d3570118',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040533Z:d276cc72-cede-431a-9293-9926d3570118',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bff81f65-439e-4571-8f6b-4edbf0ebd17e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6068',
  'x-ms-correlation-request-id',
  '16900ddf-f992-4a28-b4b5-2a363ef39c76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040534Z:16900ddf-f992-4a28-b4b5-2a363ef39c76',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e7647052-59b0-4346-8d5b-1a6894d5d31a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6067',
  'x-ms-correlation-request-id',
  'cd9e2da8-436a-4765-923c-e16c8a04affa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040534Z:cd9e2da8-436a-4765-923c-e16c8a04affa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5195cee3-ebaa-40f5-8939-6d68ba9d8600',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6066',
  'x-ms-correlation-request-id',
  '8f5d49d4-a18f-49da-bfce-991aed143dc7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040534Z:8f5d49d4-a18f-49da-bfce-991aed143dc7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1f1eab17-e663-4234-83ea-597fd7d77fde',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6065',
  'x-ms-correlation-request-id',
  'bba308b3-5dfb-4e8c-9eed-d747e5cf3efd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040535Z:bba308b3-5dfb-4e8c-9eed-d747e5cf3efd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c3dd6ceb-54d7-4ede-8085-e7b50ad80e9c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6064',
  'x-ms-correlation-request-id',
  'abebc531-4081-406f-8462-592900b2631c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040535Z:abebc531-4081-406f-8462-592900b2631c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4409b43e-f65a-4a0d-abf4-f16de6709ebf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6063',
  'x-ms-correlation-request-id',
  'b53344bc-8e1b-4186-8c35-dd340894d42c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040536Z:b53344bc-8e1b-4186-8c35-dd340894d42c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a2f26e5d-0e56-425e-9e1b-83abb1d88c9f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6062',
  'x-ms-correlation-request-id',
  '1603b5c1-72c4-4eeb-9caa-cce3cb04b880',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040536Z:1603b5c1-72c4-4eeb-9caa-cce3cb04b880',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a976189e-9de9-498b-b169-e8ddb7eccd4d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6061',
  'x-ms-correlation-request-id',
  '14effc87-da4e-4cf8-bb4e-c197390e9fcc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040536Z:14effc87-da4e-4cf8-bb4e-c197390e9fcc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd9101ee0-686d-4085-92f3-035f4a6fa73b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6060',
  'x-ms-correlation-request-id',
  '5e421b47-2d9a-4116-9f28-4fc0b91f3ab6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040537Z:5e421b47-2d9a-4116-9f28-4fc0b91f3ab6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '985d9f81-0c77-4ea6-ba50-cc295e3d40fc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6059',
  'x-ms-correlation-request-id',
  '74d36803-9f3e-43d8-a851-b18a51e764bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040537Z:74d36803-9f3e-43d8-a851-b18a51e764bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '502f8ee2-d446-4ed4-89e7-18635f240670',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6058',
  'x-ms-correlation-request-id',
  '0d3a1eb0-f618-4d35-adbd-79f4e0fe5bf0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040537Z:0d3a1eb0-f618-4d35-adbd-79f4e0fe5bf0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e45865f2-fc7c-490e-9247-49791c7145b6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6057',
  'x-ms-correlation-request-id',
  'd4df5129-f508-4bea-836e-be40ab76328d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040538Z:d4df5129-f508-4bea-836e-be40ab76328d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd56df91e-1e9e-44da-a061-fc9422a82ce6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6056',
  'x-ms-correlation-request-id',
  '8aee1680-50f6-471a-b1eb-0239dedd200e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040538Z:8aee1680-50f6-471a-b1eb-0239dedd200e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4847ec8-fc56-46a2-b550-8322efa69b6d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6055',
  'x-ms-correlation-request-id',
  '8b75bc4a-fb0d-4bb6-bffa-4ae37c758440',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040539Z:8b75bc4a-fb0d-4bb6-bffa-4ae37c758440',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e5f72a62-35cd-472a-826f-fd4dfa488da9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6054',
  'x-ms-correlation-request-id',
  '3beb7973-ffb9-4f4f-98a4-d4d70aeacd9c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040539Z:3beb7973-ffb9-4f4f-98a4-d4d70aeacd9c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '30f77833-6971-45ce-a21d-e70079a01e21',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6053',
  'x-ms-correlation-request-id',
  'c9b2be90-08e9-4879-b574-9628e63effb5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040539Z:c9b2be90-08e9-4879-b574-9628e63effb5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5da4b3a9-1248-4965-852e-c06488d2f290',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6052',
  'x-ms-correlation-request-id',
  'c172e5f7-91c2-49e3-b8b3-b2d2bd3f2758',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040540Z:c172e5f7-91c2-49e3-b8b3-b2d2bd3f2758',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ab4804b5-01af-47ad-bcab-f90be2c8fec1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6051',
  'x-ms-correlation-request-id',
  'a285d941-ef3c-4b93-a91b-e8a09833b597',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040540Z:a285d941-ef3c-4b93-a91b-e8a09833b597',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f059d522-f70a-4ef4-9b42-7bac0f38378a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6050',
  'x-ms-correlation-request-id',
  'bb804ec3-9987-4163-a49d-f2027a235611',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040541Z:bb804ec3-9987-4163-a49d-f2027a235611',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '02ead912-aeb8-4545-8588-7eaac52cc2aa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6049',
  'x-ms-correlation-request-id',
  'cbf77b87-c783-41df-9388-77c55b8b175a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040541Z:cbf77b87-c783-41df-9388-77c55b8b175a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc5102c5-8be8-48a2-9084-959eb4fbf278',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6048',
  'x-ms-correlation-request-id',
  '2b0d45ad-043e-4b3b-8035-5f4085250093',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040541Z:2b0d45ad-043e-4b3b-8035-5f4085250093',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f3ef0263-e605-410b-ad1a-39c4487b5a88',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6047',
  'x-ms-correlation-request-id',
  '97253f6b-efa8-464e-b5b6-82865857e3c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040542Z:97253f6b-efa8-464e-b5b6-82865857e3c4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '42118dee-6271-4995-8f9b-6fb51acc38fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6046',
  'x-ms-correlation-request-id',
  'fecbb5ea-0c55-46ca-8e23-09ecaf7657d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040542Z:fecbb5ea-0c55-46ca-8e23-09ecaf7657d5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2409e2e4-54fd-4997-bc27-090672944d70',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6045',
  'x-ms-correlation-request-id',
  '354da25c-224a-4b00-a2c2-9cdd6663763b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040543Z:354da25c-224a-4b00-a2c2-9cdd6663763b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1053be33-8f02-4069-8aea-1d368bfb99ec',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6044',
  'x-ms-correlation-request-id',
  'e39cfe8e-02e7-47e4-80c8-81f75f818a89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040543Z:e39cfe8e-02e7-47e4-80c8-81f75f818a89',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a1790e6b-b1f4-4cea-bdef-1ecdc7ba4f1b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6043',
  'x-ms-correlation-request-id',
  '866aa023-b7c5-4fea-96c9-345c2cf02cbb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040544Z:866aa023-b7c5-4fea-96c9-345c2cf02cbb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1a281240-b395-4fe0-bb4a-4f182e8dc257',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6042',
  'x-ms-correlation-request-id',
  'e998a65a-dbb1-43f4-82f4-ae9872aa15cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040544Z:e998a65a-dbb1-43f4-82f4-ae9872aa15cd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6494f84-15ee-45a9-9d37-9986f2c52e23',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6041',
  'x-ms-correlation-request-id',
  '50faa030-5f75-4d77-a595-0ad93fa4a24f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040545Z:50faa030-5f75-4d77-a595-0ad93fa4a24f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc982a0f-a7c7-4cf5-a0e2-d7c6fb18e744',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6040',
  'x-ms-correlation-request-id',
  '2dbb78c2-05d6-4899-886a-cfc20a6f0361',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040545Z:2dbb78c2-05d6-4899-886a-cfc20a6f0361',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0090eb7c-03ac-4122-8c54-a4ac0f73379a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6039',
  'x-ms-correlation-request-id',
  '10ef27bb-ac31-427a-aeb8-bfb879873a48',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040545Z:10ef27bb-ac31-427a-aeb8-bfb879873a48',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '357dcbdc-1393-41a4-a18c-4b5defd6a5ff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6038',
  'x-ms-correlation-request-id',
  'a886e893-015f-42b3-8187-7036ccbee936',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040546Z:a886e893-015f-42b3-8187-7036ccbee936',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2a35629a-e105-422d-a002-8f4e8030c0ba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6037',
  'x-ms-correlation-request-id',
  '0dd96c86-cc75-4c20-a2be-f4de7aa55711',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040546Z:0dd96c86-cc75-4c20-a2be-f4de7aa55711',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a6bcf567-5f4e-409a-9a0e-12c37d230550',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6036',
  'x-ms-correlation-request-id',
  'cecbf70c-d150-4126-89c2-d35c3ba1461c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040547Z:cecbf70c-d150-4126-89c2-d35c3ba1461c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'aa0cde97-b426-49a2-8efa-5b1fbb4599ff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6035',
  'x-ms-correlation-request-id',
  '04a6ddf9-59b0-43a0-89e8-477d4489b8a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040547Z:04a6ddf9-59b0-43a0-89e8-477d4489b8a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df805c69-aae4-4e29-8323-110642bd4d6f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6034',
  'x-ms-correlation-request-id',
  'd6f028ce-4aa8-4fe4-bf9a-296db1a8298e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040547Z:d6f028ce-4aa8-4fe4-bf9a-296db1a8298e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78c4e90c-da33-4176-be77-9ef62d830b94',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6033',
  'x-ms-correlation-request-id',
  '555749b7-35c9-4027-873d-0e7d2737c380',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040548Z:555749b7-35c9-4027-873d-0e7d2737c380',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '20df8b71-b540-424c-8889-15a8cbdd846e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6032',
  'x-ms-correlation-request-id',
  '73f60cb5-3841-42dd-95d6-91f478ade92c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040548Z:73f60cb5-3841-42dd-95d6-91f478ade92c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9104e8bc-8af4-4bf6-8b2a-a09f535bb8ff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6031',
  'x-ms-correlation-request-id',
  'a51d150f-4282-41a4-a363-6949eef245e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040548Z:a51d150f-4282-41a4-a363-6949eef245e4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '24462dd3-8355-4372-b18d-f862113a2ad5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6030',
  'x-ms-correlation-request-id',
  '65d98441-2ac6-4845-ac9b-4d50ead3ece3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040549Z:65d98441-2ac6-4845-ac9b-4d50ead3ece3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '85079f91-bdc3-4cdc-998c-b8fa5a26ad7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6029',
  'x-ms-correlation-request-id',
  'e025ad0e-ceca-42f6-bfd5-6308eb2c5112',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040549Z:e025ad0e-ceca-42f6-bfd5-6308eb2c5112',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f3bcddb3-0992-4e58-8be3-ddca3822d950',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6028',
  'x-ms-correlation-request-id',
  '30072977-4c76-4a66-84a0-637969eef699',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040550Z:30072977-4c76-4a66-84a0-637969eef699',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a16667fb-5a1d-4024-b565-799e61fb8032',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6027',
  'x-ms-correlation-request-id',
  '6392770f-697e-45a2-93d7-90424409deed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040550Z:6392770f-697e-45a2-93d7-90424409deed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9571bee4-6880-4997-99b1-860b83640bba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6026',
  'x-ms-correlation-request-id',
  '752c73ab-b9c2-41c7-8e9e-521005ee45bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040550Z:752c73ab-b9c2-41c7-8e9e-521005ee45bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ccbf76b-98ef-4dac-bcf3-71fc35b8c6e3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6025',
  'x-ms-correlation-request-id',
  '7a030b79-f47d-414e-9ffb-63041ed5ac7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040551Z:7a030b79-f47d-414e-9ffb-63041ed5ac7e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c2224645-0a45-44cf-af9b-1ad23aebdbd5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6024',
  'x-ms-correlation-request-id',
  '3a439cea-f4ed-4977-bb4e-72eedc245c31',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040551Z:3a439cea-f4ed-4977-bb4e-72eedc245c31',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0a7c5ccb-93b4-470d-af01-4116268b135a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6023',
  'x-ms-correlation-request-id',
  '6339a1d9-9776-42d4-a675-98432df2c20d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040552Z:6339a1d9-9776-42d4-a675-98432df2c20d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '68d647c7-ca6f-4060-9239-4bf0211a614a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6022',
  'x-ms-correlation-request-id',
  '3c9c7b07-1026-4857-80b6-3d046301cb52',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040552Z:3c9c7b07-1026-4857-80b6-3d046301cb52',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e5df664-6283-42ca-879b-293674a0ef44',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6021',
  'x-ms-correlation-request-id',
  '2e4a39a1-0df8-4a7f-95b1-43fd4310bcd4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040552Z:2e4a39a1-0df8-4a7f-95b1-43fd4310bcd4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0a30fabe-ba24-4742-89b7-f143001dba8b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6020',
  'x-ms-correlation-request-id',
  'b86e0a0e-0607-4e8b-b14e-0b94556682cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040553Z:b86e0a0e-0607-4e8b-b14e-0b94556682cd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'edd5b603-86a4-4640-827d-b195923330de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6019',
  'x-ms-correlation-request-id',
  'a754424c-d14b-4999-9f71-eb0ff003b394',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040553Z:a754424c-d14b-4999-9f71-eb0ff003b394',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb82b1c5-6afe-43ec-82bd-c6b2bd3b488d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6018',
  'x-ms-correlation-request-id',
  'bb8a92e2-1277-4434-9fa0-f997ad753ee3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040554Z:bb8a92e2-1277-4434-9fa0-f997ad753ee3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '206e5ea0-67aa-4138-b98e-7fe6e72cad4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6017',
  'x-ms-correlation-request-id',
  '20487b07-cf98-4e6e-a43f-0bdc0b41a1b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040554Z:20487b07-cf98-4e6e-a43f-0bdc0b41a1b0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '84cecbfc-7d93-4934-92ff-4d30c031cfdd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6016',
  'x-ms-correlation-request-id',
  'a7997f70-887c-4146-bc3e-2c331918253e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040554Z:a7997f70-887c-4146-bc3e-2c331918253e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6adbd7b5-30ba-49e4-acb6-8d3783953ae6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6015',
  'x-ms-correlation-request-id',
  '72d9c2e9-9131-497d-9c72-43b82dc09f8f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040555Z:72d9c2e9-9131-497d-9c72-43b82dc09f8f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0dd357dd-e0fd-4ac1-983f-2f0244863a3e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6014',
  'x-ms-correlation-request-id',
  '5c1bd29f-7511-4668-b327-19b01a942eea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040555Z:5c1bd29f-7511-4668-b327-19b01a942eea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1aff2a35-05ec-4a97-861d-fdbdb7134952',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6013',
  'x-ms-correlation-request-id',
  'de377458-e080-4c59-9cf5-39ecc01810ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040555Z:de377458-e080-4c59-9cf5-39ecc01810ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1277f12c-e76b-447c-842e-231c635ba7ea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6012',
  'x-ms-correlation-request-id',
  '1f4c982a-8ab2-4419-b0b6-b7a242208cd1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040556Z:1f4c982a-8ab2-4419-b0b6-b7a242208cd1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '93958812-cb16-412a-a2bf-e30916f1aa29',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6011',
  'x-ms-correlation-request-id',
  'abe42278-ce78-45b1-ae9e-37f5ef76b534',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040556Z:abe42278-ce78-45b1-ae9e-37f5ef76b534',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e1845672-fd75-4cf7-a6f8-9f1bb952aa57',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6010',
  'x-ms-correlation-request-id',
  '48ba53a9-b5f9-4eb4-84ac-bdf3e6c65bc4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040557Z:48ba53a9-b5f9-4eb4-84ac-bdf3e6c65bc4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '59b61223-cb9b-4451-a4e5-ae52e96a91e4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6009',
  'x-ms-correlation-request-id',
  'f91881e6-7654-4b86-a441-eef00cd544b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040557Z:f91881e6-7654-4b86-a441-eef00cd544b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '37de9188-6bf8-431a-b895-a1a027a620ec',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6008',
  'x-ms-correlation-request-id',
  'd48d8da2-b544-4cb8-b25c-71ed4a895214',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040557Z:d48d8da2-b544-4cb8-b25c-71ed4a895214',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2c65b175-f08e-4a1c-ac99-a2a2ee3335d5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6007',
  'x-ms-correlation-request-id',
  '2bb9d113-c33f-4612-8f42-25745bb10952',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040558Z:2bb9d113-c33f-4612-8f42-25745bb10952',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a51d5584-da68-44fb-a687-68e7feca9282',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6006',
  'x-ms-correlation-request-id',
  '2786468a-223a-45b7-9f0d-1806666eb2c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040558Z:2786468a-223a-45b7-9f0d-1806666eb2c3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '28a8ec64-964e-4319-b849-eb75a58b6a6f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6005',
  'x-ms-correlation-request-id',
  'ffe89397-570d-4352-8852-0615edb96123',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040559Z:ffe89397-570d-4352-8852-0615edb96123',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bf78feef-7351-4ef1-b902-4d12d1a11f6b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6004',
  'x-ms-correlation-request-id',
  '6f4bc703-9ade-40ab-bd9c-11fa8c2d854b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040559Z:6f4bc703-9ade-40ab-bd9c-11fa8c2d854b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b0e3f9e8-7a88-4030-bffd-2b96512d86a9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6003',
  'x-ms-correlation-request-id',
  '9763755f-aaec-4320-8f3f-fff5b56a25ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040559Z:9763755f-aaec-4320-8f3f-fff5b56a25ab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ddaed617-7bc8-4a26-92fc-70682c017707',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6002',
  'x-ms-correlation-request-id',
  '50eabd98-e3ed-4c07-8d15-7cb7fcfadc9a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040600Z:50eabd98-e3ed-4c07-8d15-7cb7fcfadc9a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ee0aded-f9e3-4496-a702-dd8cbb1e2ac2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6001',
  'x-ms-correlation-request-id',
  '11be9113-77aa-4521-bf21-f64783c5f4c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040600Z:11be9113-77aa-4521-bf21-f64783c5f4c0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:05:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '82409385-0cdc-4da8-b70f-650345992bca',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '6000',
  'x-ms-correlation-request-id',
  '7086a638-3ba5-4ed7-9bb7-a944f4ce2f47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040601Z:7086a638-3ba5-4ed7-9bb7-a944f4ce2f47',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b577d974-4bee-4eba-bc29-f0c319a3811b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5999',
  'x-ms-correlation-request-id',
  '4eb7aa24-36d4-4804-9cfc-a7e0d1721562',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040601Z:4eb7aa24-36d4-4804-9cfc-a7e0d1721562',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '07c19235-bc4b-40dd-9be0-53ff34c8887d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5998',
  'x-ms-correlation-request-id',
  '50e6038a-90e1-4575-b83f-8a851923a5a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040601Z:50e6038a-90e1-4575-b83f-8a851923a5a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '65ae0642-6136-4dce-ae4f-2b9220f96d2f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5997',
  'x-ms-correlation-request-id',
  '50a7ae85-fea9-48db-aa22-f8bc8d73b455',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040602Z:50a7ae85-fea9-48db-aa22-f8bc8d73b455',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '77dba217-cf71-4a11-82ac-a3fda86191a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5996',
  'x-ms-correlation-request-id',
  '3ec8cf7b-613a-45cc-8ffa-0d05f5f61cc5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040602Z:3ec8cf7b-613a-45cc-8ffa-0d05f5f61cc5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd8f53918-9a89-4a3f-b3af-59797e418b1e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5995',
  'x-ms-correlation-request-id',
  '81eb671a-9fe7-4b21-855d-8422279fba21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040603Z:81eb671a-9fe7-4b21-855d-8422279fba21',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bb93121c-17b6-4046-a38e-ea6d9cc65ffc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5994',
  'x-ms-correlation-request-id',
  'e1cab245-0885-4ca1-833a-c83e982c6f3f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040603Z:e1cab245-0885-4ca1-833a-c83e982c6f3f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a9027216-f278-4861-9450-8c1ff3027bb5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5993',
  'x-ms-correlation-request-id',
  '3ec76ef9-00a7-4a2f-b637-89bc98735c76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040603Z:3ec76ef9-00a7-4a2f-b637-89bc98735c76',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '489e3b82-b7b9-4a85-8f6a-6c5bb7e1816c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5992',
  'x-ms-correlation-request-id',
  'dd969c44-b623-4005-9649-0bf713c7c592',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040604Z:dd969c44-b623-4005-9649-0bf713c7c592',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'aeca449f-2b3a-460d-8b0d-82d1786451d1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5991',
  'x-ms-correlation-request-id',
  'cd377ac3-b0a0-487b-b861-6f66692cff29',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040604Z:cd377ac3-b0a0-487b-b861-6f66692cff29',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cf24b760-c365-4721-9b25-9489797a0256',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5990',
  'x-ms-correlation-request-id',
  '49f41b07-9f53-414d-8b69-dbeb5da81014',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040604Z:49f41b07-9f53-414d-8b69-dbeb5da81014',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40c72524-94c0-4089-97c7-841d455d7678',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5989',
  'x-ms-correlation-request-id',
  'c1ff9f9f-7a2a-4603-9567-67128e1fe36b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040605Z:c1ff9f9f-7a2a-4603-9567-67128e1fe36b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6df5d305-bad1-4fa3-911e-730fdf1e4283',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5988',
  'x-ms-correlation-request-id',
  'c5637412-c39f-408b-9d56-d1c4e09fe346',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040605Z:c5637412-c39f-408b-9d56-d1c4e09fe346',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '042e1f20-091d-45fd-95f0-96e4205455d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5987',
  'x-ms-correlation-request-id',
  'd577c9d2-f89f-47a3-95a5-0ed16012d208',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040606Z:d577c9d2-f89f-47a3-95a5-0ed16012d208',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1b490062-d919-49a3-967c-cab2e09a4d57',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5986',
  'x-ms-correlation-request-id',
  '1690e975-02bd-4fe9-a3bb-29077f8930b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040606Z:1690e975-02bd-4fe9-a3bb-29077f8930b7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fbdf5ff6-c347-4027-b9f7-befb33e63d7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5985',
  'x-ms-correlation-request-id',
  '0b011780-0b58-4f72-b401-ee8073bb06ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040606Z:0b011780-0b58-4f72-b401-ee8073bb06ea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0ea4ffb6-5bfb-4f37-9796-03b0509b72e9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5984',
  'x-ms-correlation-request-id',
  '43edfb56-a213-4f0c-a8c4-b2b2df164f82',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040607Z:43edfb56-a213-4f0c-a8c4-b2b2df164f82',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ce7f3609-7234-40b3-a190-c16e88819934',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5983',
  'x-ms-correlation-request-id',
  '2cbe9917-8d70-438f-8d33-579b7b5221ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040607Z:2cbe9917-8d70-438f-8d33-579b7b5221ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4af469ea-ec43-42ff-8592-055fd661f9b7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5982',
  'x-ms-correlation-request-id',
  '919717dd-f7e1-4c5c-97f6-11c25381f3bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040608Z:919717dd-f7e1-4c5c-97f6-11c25381f3bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4f723e85-576d-4573-9708-40a1cc12fef7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5981',
  'x-ms-correlation-request-id',
  'cd821816-7329-4248-bb11-1a3fdf71c411',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040608Z:cd821816-7329-4248-bb11-1a3fdf71c411',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7caf0422-f485-44dd-8594-c7480f985b43',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5980',
  'x-ms-correlation-request-id',
  '8f11ca7d-0570-4279-9b02-73172fc02ca6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040608Z:8f11ca7d-0570-4279-9b02-73172fc02ca6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb1746ff-e977-4300-aee3-a236d8fe68fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5979',
  'x-ms-correlation-request-id',
  'e4c72421-b41b-4819-ae06-9b83d8bfbc98',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040609Z:e4c72421-b41b-4819-ae06-9b83d8bfbc98',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5b435122-f6d9-4a82-a23b-14701f7e9d96',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5978',
  'x-ms-correlation-request-id',
  '75d36776-1837-4832-8143-e6fbd5fee5db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040609Z:75d36776-1837-4832-8143-e6fbd5fee5db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6918a972-8b46-4126-a79a-816c262873fd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5977',
  'x-ms-correlation-request-id',
  '54d01ed4-1f44-4974-b219-3cfc84e5322e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040610Z:54d01ed4-1f44-4974-b219-3cfc84e5322e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7faa2cc2-c2e0-4ef9-97d3-1dab5e044482',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5976',
  'x-ms-correlation-request-id',
  '52dbc05f-6f75-424e-8efd-9a018dd299ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040610Z:52dbc05f-6f75-424e-8efd-9a018dd299ab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6edd3b4c-43cc-4dbc-85e5-114a8d0b660c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5975',
  'x-ms-correlation-request-id',
  '3112b10d-6c28-4a98-9a9e-3243a4ccc250',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040610Z:3112b10d-6c28-4a98-9a9e-3243a4ccc250',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dcfaf0a8-5cd4-40f5-8a37-c0e35e6dfb4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5974',
  'x-ms-correlation-request-id',
  '09acf604-850f-424e-acde-f42d5ac79d32',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040611Z:09acf604-850f-424e-acde-f42d5ac79d32',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd73bb725-5c7c-44ed-88a4-e8024bd4a180',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5973',
  'x-ms-correlation-request-id',
  '2c340cfc-f621-41d3-99e2-0dfbe28fa9ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040611Z:2c340cfc-f621-41d3-99e2-0dfbe28fa9ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ec91f14-2e34-4bb4-8913-0b8209c5cb71',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5972',
  'x-ms-correlation-request-id',
  '1bfaa6fe-9ebf-494b-a54f-2472229285b8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040612Z:1bfaa6fe-9ebf-494b-a54f-2472229285b8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2a60fa7a-812d-4f66-b82d-c1649e24551d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5971',
  'x-ms-correlation-request-id',
  '4393ad59-c1c8-4437-b317-26f7efa417f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040612Z:4393ad59-c1c8-4437-b317-26f7efa417f8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5fa4e9cc-b76c-4374-940c-7083946c4e22',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5970',
  'x-ms-correlation-request-id',
  '67391b05-d3e7-4c33-bb36-b8502fa6de70',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040612Z:67391b05-d3e7-4c33-bb36-b8502fa6de70',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c1bbede4-9812-428a-ba6b-d5c41e50d97d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5969',
  'x-ms-correlation-request-id',
  '81535880-2ba2-47e6-85e7-f460022fa7db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040613Z:81535880-2ba2-47e6-85e7-f460022fa7db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dcab9582-4e64-42c5-836b-9d5d3432b41b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5968',
  'x-ms-correlation-request-id',
  'c42c1bb5-168f-4424-bcdc-4221fc57f17f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040613Z:c42c1bb5-168f-4424-bcdc-4221fc57f17f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '132df0b1-7618-44d1-a8bd-bb6788983eb5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5967',
  'x-ms-correlation-request-id',
  'b9358b45-7ed7-4a5f-b808-af47faa11082',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040613Z:b9358b45-7ed7-4a5f-b808-af47faa11082',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fead0f4c-584c-4562-959b-05c604e8029a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5966',
  'x-ms-correlation-request-id',
  '5bfbe766-f8d2-4f01-9664-c82a5d933048',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040614Z:5bfbe766-f8d2-4f01-9664-c82a5d933048',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '30a4f344-6a46-4dd2-be7b-7d9adaecf739',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5965',
  'x-ms-correlation-request-id',
  'e3d8e709-7740-4f2a-9e30-29dab1180288',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040614Z:e3d8e709-7740-4f2a-9e30-29dab1180288',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '77a65a52-7172-4fde-8aed-df71b740dddb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5964',
  'x-ms-correlation-request-id',
  '88133572-a1d4-44d5-8024-463904b30c30',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040615Z:88133572-a1d4-44d5-8024-463904b30c30',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c4ff2b3-3016-4a2d-aadf-61133ca09c19',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5963',
  'x-ms-correlation-request-id',
  'c563e793-3a43-41eb-8d22-091e35790f76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040615Z:c563e793-3a43-41eb-8d22-091e35790f76',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd9c74808-fd79-4366-bfeb-af54824000f0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5962',
  'x-ms-correlation-request-id',
  '9806b42b-8707-440d-9cd1-e4bfb1ec19bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040615Z:9806b42b-8707-440d-9cd1-e4bfb1ec19bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '972e5eae-8849-491a-b0b9-412713e91cfd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5961',
  'x-ms-correlation-request-id',
  'fe813f6f-2393-42cc-9c7e-904505c7dd77',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040616Z:fe813f6f-2393-42cc-9c7e-904505c7dd77',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '912cd136-08fb-4aa3-984f-e9956ac12c2f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5960',
  'x-ms-correlation-request-id',
  '0f76439f-7c3c-4eb9-8eb6-bcea34dbb8d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040616Z:0f76439f-7c3c-4eb9-8eb6-bcea34dbb8d8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3b33ec06-f1bf-4782-b80d-83d741b44849',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5959',
  'x-ms-correlation-request-id',
  '34d80d29-d74f-4188-9b03-4fb9f8f6b232',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040617Z:34d80d29-d74f-4188-9b03-4fb9f8f6b232',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7018a5a0-8fda-4198-877f-0fc5fc27cfb4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5958',
  'x-ms-correlation-request-id',
  '4d4c829f-1dc1-443a-b9a4-56569742c05f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040617Z:4d4c829f-1dc1-443a-b9a4-56569742c05f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0e706d1f-873f-4f54-a0d9-f8b10c8031dd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5957',
  'x-ms-correlation-request-id',
  '14ff9ff2-2c8a-44f9-92b3-c6681b97aac7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040617Z:14ff9ff2-2c8a-44f9-92b3-c6681b97aac7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6ca357cd-78dc-4113-9f51-060919a3fca5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5956',
  'x-ms-correlation-request-id',
  'd1d75fa2-3ddd-4ffa-a578-c773f5e95723',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040618Z:d1d75fa2-3ddd-4ffa-a578-c773f5e95723',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0044c6a4-5ac2-4b01-88eb-fa4459f2099f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5955',
  'x-ms-correlation-request-id',
  'a0e33e70-0841-4f3f-878d-3f0dd1f699eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040618Z:a0e33e70-0841-4f3f-878d-3f0dd1f699eb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a84c36d-a73c-48a4-8802-570c600c511e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5954',
  'x-ms-correlation-request-id',
  'd2a03bba-2d4f-454e-a0ac-024ef11f49dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040619Z:d2a03bba-2d4f-454e-a0ac-024ef11f49dc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '55ae3ca2-575a-4942-ad63-14060543634b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5953',
  'x-ms-correlation-request-id',
  '3b47b450-3483-405a-855a-44c1d7df591a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040619Z:3b47b450-3483-405a-855a-44c1d7df591a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV80Y2ZiMmFjYQ==')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '98b2b46d-ea69-438e-8381-7f3b3994fcaf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5952',
  'x-ms-correlation-request-id',
  'c7584872-6c2b-4cdb-83c2-55f89b27f230',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040619Z:c7584872-6c2b-4cdb-83c2-55f89b27f230',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2","name":"myserviceyyy2","type":"Microsoft.ApiManagement/deletedservices","location":"East US","properties":{"serviceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2","scheduledPurgeDate":"2021-12-13T04:06:20.1276211Z","deletionDate":"2021-12-13T04:06:18.6631394Z"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '493',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '91f1ab0d-1e8c-4ffe-a35a-44d2ee71605c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'e038ee7d-4185-4638-a918-a77bee08310a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040620Z:e038ee7d-4185-4638-a918-a77bee08310a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:20 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '34feeb6c-978e-4514-9553-507478b02997',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5951',
  'x-ms-correlation-request-id',
  '9aad4d50-2bbb-4bb4-b7fc-e22e68bbc190',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040620Z:9aad4d50-2bbb-4bb4-b7fc-e22e68bbc190',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '44088305-f88b-4fc7-ae0a-4839f4e8fd6f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5950',
  'x-ms-correlation-request-id',
  '91b108d1-93a8-4688-ac18-a8e944bbd763',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040621Z:91b108d1-93a8-4688-ac18-a8e944bbd763',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1195b46a-daa8-4d72-b8fc-e030289e7f05',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5949',
  'x-ms-correlation-request-id',
  '08fa6b68-3803-43c0-b0a8-b2a11cf68b97',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040621Z:08fa6b68-3803-43c0-b0a8-b2a11cf68b97',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '67ac6377-cf31-4d35-af89-6704e2e3ea0a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5948',
  'x-ms-correlation-request-id',
  'f6f78df9-df1f-4f4f-ac85-b2ad7bc0cfdf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040621Z:f6f78df9-df1f-4f4f-ac85-b2ad7bc0cfdf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '966904a3-6026-42a6-a8ea-de60dfd1148a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5947',
  'x-ms-correlation-request-id',
  '9774711b-1c05-427f-9612-8b947d3c3fa0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040622Z:9774711b-1c05-427f-9612-8b947d3c3fa0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04495d9e-5825-4c9d-96e2-2fb773d05b28',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5946',
  'x-ms-correlation-request-id',
  '274bd3c4-9842-49e8-9193-7647bb5ff25a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040622Z:274bd3c4-9842-49e8-9193-7647bb5ff25a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e5a88d91-be30-4212-a71b-a82705ec0592',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5945',
  'x-ms-correlation-request-id',
  '54d55980-8d73-49de-ba35-c73fe64e9064',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040623Z:54d55980-8d73-49de-ba35-c73fe64e9064',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '88038e28-d76f-4530-85a8-6f2a91bb9370',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5944',
  'x-ms-correlation-request-id',
  '36a853e6-5305-4cbf-bd29-72a87c51bd96',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040623Z:36a853e6-5305-4cbf-bd29-72a87c51bd96',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ca68ff6-4a25-474a-9c68-fbb36a771b93',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5943',
  'x-ms-correlation-request-id',
  'af679956-55b4-429f-a4ea-fad54ce3198c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040623Z:af679956-55b4-429f-a4ea-fad54ce3198c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0d1570b4-834f-49fa-a7b4-d2c1ca7853dd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5942',
  'x-ms-correlation-request-id',
  '0b5b6717-d5fe-4220-861a-c6b3d7eeeef3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040624Z:0b5b6717-d5fe-4220-861a-c6b3d7eeeef3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '45a3056a-a11c-4d6d-a0ec-d76030baeb79',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5941',
  'x-ms-correlation-request-id',
  'ba998156-5bad-431e-814f-9444908b64c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040624Z:ba998156-5bad-431e-814f-9444908b64c3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eaaf026e-a984-4a09-9920-0dd97f0cfc0d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5940',
  'x-ms-correlation-request-id',
  'bd67206d-7b02-4628-8165-5fd6b85dcc07',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040624Z:bd67206d-7b02-4628-8165-5fd6b85dcc07',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8bfbd501-78a7-4a0b-ba4d-993b2fdafef4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5939',
  'x-ms-correlation-request-id',
  '6a721bf0-fc59-4bbf-a1b2-c58b07737a46',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040625Z:6a721bf0-fc59-4bbf-a1b2-c58b07737a46',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e8a40da2-faab-43fa-bac8-50f73f1bcfe4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5938',
  'x-ms-correlation-request-id',
  '7cff9ab2-4f53-4006-9af4-ec794efc633b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040625Z:7cff9ab2-4f53-4006-9af4-ec794efc633b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a15eccb3-349f-47ff-86b7-778c4bb8e703',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5937',
  'x-ms-correlation-request-id',
  '47504c97-6ab8-48e7-9b5f-dec0aacb832d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040626Z:47504c97-6ab8-48e7-9b5f-dec0aacb832d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '77ab4bfc-a7eb-4f12-9cac-cd825d4f49c0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5936',
  'x-ms-correlation-request-id',
  '96b7b28d-9b09-4411-b08b-d7dd17d9a335',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040626Z:96b7b28d-9b09-4411-b08b-d7dd17d9a335',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b38d1323-ef11-4086-bff6-97fa63fc3819',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5935',
  'x-ms-correlation-request-id',
  '8233968e-390a-4b10-81ed-eaf6d6230ae7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040626Z:8233968e-390a-4b10-81ed-eaf6d6230ae7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd58d966-c554-4fd5-b837-89791ad13689',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5934',
  'x-ms-correlation-request-id',
  'af22894c-1010-4074-8b27-dec36ca3a4e9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040627Z:af22894c-1010-4074-8b27-dec36ca3a4e9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '41c3a938-d702-4184-8205-e100a78401c9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5933',
  'x-ms-correlation-request-id',
  '77216fb9-e764-42bd-ae07-f43f8c95ea42',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040627Z:77216fb9-e764-42bd-ae07-f43f8c95ea42',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3aae27cc-999b-4aea-b21d-0743ac38aa6c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5932',
  'x-ms-correlation-request-id',
  '0376b25b-8701-4d7a-9b44-5e1cd6196d2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040628Z:0376b25b-8701-4d7a-9b44-5e1cd6196d2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c34c332e-3644-403f-aaaa-6e5ba065e7b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5931',
  'x-ms-correlation-request-id',
  'd4457418-fea0-4480-b440-ee22dff16089',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040628Z:d4457418-fea0-4480-b440-ee22dff16089',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '252c0633-8616-4ff0-9ca7-2d7b0fdad205',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5930',
  'x-ms-correlation-request-id',
  '1a080dec-ac52-4878-bed8-8937ce7afc0d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040628Z:1a080dec-ac52-4878-bed8-8937ce7afc0d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '68e9583b-3f40-46a3-b2d9-50c55d695225',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5929',
  'x-ms-correlation-request-id',
  'b05c29aa-a25e-40a7-a903-e14ca7d7121e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040629Z:b05c29aa-a25e-40a7-a903-e14ca7d7121e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e352ba1-1ef6-45e6-81c0-dd30992b66cf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5928',
  'x-ms-correlation-request-id',
  '8e51ceb1-c888-4ce8-a20e-a35985832df7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040629Z:8e51ceb1-c888-4ce8-a20e-a35985832df7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '256a27e9-6a79-4c4e-a1e9-253770174701',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5927',
  'x-ms-correlation-request-id',
  'ff113759-7f35-44c5-ae36-6979e5d753ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040630Z:ff113759-7f35-44c5-ae36-6979e5d753ba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4e3dca7-b8ea-4342-9d9c-f80ecefabcfe',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5926',
  'x-ms-correlation-request-id',
  '92e485f1-d397-4e7e-9fbd-781e509ea5f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040630Z:92e485f1-d397-4e7e-9fbd-781e509ea5f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '287fec33-05a1-4347-9722-f0ca10085ba6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5925',
  'x-ms-correlation-request-id',
  'b1dbe19e-2fa7-4e3f-b0f0-44a835064a25',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040630Z:b1dbe19e-2fa7-4e3f-b0f0-44a835064a25',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9c8d0065-50bb-441b-877f-ed2c10269903',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5924',
  'x-ms-correlation-request-id',
  '3166bd30-5e4d-41b9-87ee-e5d68bd71cdd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040631Z:3166bd30-5e4d-41b9-87ee-e5d68bd71cdd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '65e57d5f-d8b9-41f5-97f0-62d96a53af65',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5923',
  'x-ms-correlation-request-id',
  'af30d0cb-ea45-459f-a7cc-ec43b6b7b668',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040631Z:af30d0cb-ea45-459f-a7cc-ec43b6b7b668',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97944f9d-08a1-4ce1-a9f7-e800b9bca9d0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5922',
  'x-ms-correlation-request-id',
  'edfc7310-507b-414a-b84e-242601e88d09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040631Z:edfc7310-507b-414a-b84e-242601e88d09',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4738ee6-f346-4b45-ad63-4b02efd496ac',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5921',
  'x-ms-correlation-request-id',
  '7873d80c-30e5-4962-9274-b8312fd62f8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040632Z:7873d80c-30e5-4962-9274-b8312fd62f8e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0f1e1bc8-dfdc-47ba-98ab-083194d38747',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5920',
  'x-ms-correlation-request-id',
  'baf94b33-9133-4809-81b9-6dc7a634cf3e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040632Z:baf94b33-9133-4809-81b9-6dc7a634cf3e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b0af0a9-d312-4281-9898-3300cd1241e0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5919',
  'x-ms-correlation-request-id',
  'a2fb8a58-308a-432f-bc20-ac4ddeaa33a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040633Z:a2fb8a58-308a-432f-bc20-ac4ddeaa33a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1241c271-5f38-4af0-a6cd-4f7c34047c08',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5918',
  'x-ms-correlation-request-id',
  '36fa3bef-25c7-4a43-9592-5fde6cbd286c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040633Z:36fa3bef-25c7-4a43-9592-5fde6cbd286c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5bccc534-deb3-4444-aff0-e1be8dd27cff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5917',
  'x-ms-correlation-request-id',
  'ac034f2b-d68c-48f6-9630-dc36af7d8509',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040633Z:ac034f2b-d68c-48f6-9630-dc36af7d8509',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '13d7f6fd-f903-49bb-bc66-ad1878a65125',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5916',
  'x-ms-correlation-request-id',
  '1da338b9-1101-44cb-84c1-c69834a70035',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040634Z:1da338b9-1101-44cb-84c1-c69834a70035',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cbde3808-0f86-4846-be31-f84e4cb4b785',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5915',
  'x-ms-correlation-request-id',
  '68d76ede-4399-4e7c-b8bf-c1fbe9dd27b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040634Z:68d76ede-4399-4e7c-b8bf-c1fbe9dd27b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e83d1c52-1d6c-432f-9bd4-9997015a9056',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5914',
  'x-ms-correlation-request-id',
  '62a5e744-8978-4bda-981f-503b5d84d084',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040635Z:62a5e744-8978-4bda-981f-503b5d84d084',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6708622b-a09d-4521-8628-16eec87b9560',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5913',
  'x-ms-correlation-request-id',
  'd792c5b7-91a6-42b2-8cbf-8f12c2d7092c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040635Z:d792c5b7-91a6-42b2-8cbf-8f12c2d7092c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8478e52c-f6a6-4bd6-ac86-f402ad8f36f6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5912',
  'x-ms-correlation-request-id',
  '28186838-a7b0-474b-b9f4-aa0e7f6b2d01',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040635Z:28186838-a7b0-474b-b9f4-aa0e7f6b2d01',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3750854b-d6c6-4dd8-861e-8e620790512c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5911',
  'x-ms-correlation-request-id',
  'ba7526c8-3dbd-43b2-aba7-37b5a918f956',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040636Z:ba7526c8-3dbd-43b2-aba7-37b5a918f956',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '931aff46-ef79-46bb-9800-25c149db352a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5910',
  'x-ms-correlation-request-id',
  '6ebffbd3-d95d-46c6-a2cb-27474be09ddd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040636Z:6ebffbd3-d95d-46c6-a2cb-27474be09ddd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eef97773-9b58-4507-b899-e2d567eb3af1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5909',
  'x-ms-correlation-request-id',
  'b255c28f-ea5b-411d-b3ca-e8989cf275f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040636Z:b255c28f-ea5b-411d-b3ca-e8989cf275f1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '219be908-1af6-4f54-9e3a-f47e0896ed92',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5908',
  'x-ms-correlation-request-id',
  '17a81698-09a2-429f-b27f-4658c3071cdb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040637Z:17a81698-09a2-429f-b27f-4658c3071cdb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dcd8e6ea-ae17-44e2-bf91-22805186bd1f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5907',
  'x-ms-correlation-request-id',
  '55a79fb9-cba2-4af2-8443-e286b9f7c1ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040637Z:55a79fb9-cba2-4af2-8443-e286b9f7c1ee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '44a1620c-98f2-480e-b76a-be8087261394',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5906',
  'x-ms-correlation-request-id',
  '81233d97-deea-4037-901f-7d075acd7f8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040638Z:81233d97-deea-4037-901f-7d075acd7f8e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '67aa754c-0116-4d0a-ae6e-ffbfa0f763ab',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5905',
  'x-ms-correlation-request-id',
  'e93f0888-caac-4bc7-a460-63ad25a6a3f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040638Z:e93f0888-caac-4bc7-a460-63ad25a6a3f4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a3f1c685-a028-4ced-9917-eb8c68d93de4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5904',
  'x-ms-correlation-request-id',
  '10b5100a-0807-4ad1-a53d-33b5f6c6b15a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040638Z:10b5100a-0807-4ad1-a53d-33b5f6c6b15a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a702a5a4-032c-40e5-8ae4-df82371e505f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5903',
  'x-ms-correlation-request-id',
  '407787da-6036-4ace-8989-ba12b4905683',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040639Z:407787da-6036-4ace-8989-ba12b4905683',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5d2b8409-3aae-40ff-a25e-2e7f4e6a238f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5902',
  'x-ms-correlation-request-id',
  '66ac6b4d-d439-4a1d-bf3a-8cac172da8fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040639Z:66ac6b4d-d439-4a1d-bf3a-8cac172da8fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e25da305-b047-4844-9400-035d7c33c66b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5901',
  'x-ms-correlation-request-id',
  '73be84ea-8990-4d95-a58f-487c086f47ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040639Z:73be84ea-8990-4d95-a58f-487c086f47ae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a4c14a2c-5f1f-48a1-9473-7e306c803961',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5900',
  'x-ms-correlation-request-id',
  'ab5f40f3-f3cf-4224-b09f-8bb9f0921e23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040640Z:ab5f40f3-f3cf-4224-b09f-8bb9f0921e23',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f7b439fe-ae75-4178-8007-f5cbb88a48a8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5899',
  'x-ms-correlation-request-id',
  'e6dfa981-10d0-4a94-a6b5-82b74a7cdf95',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040640Z:e6dfa981-10d0-4a94-a6b5-82b74a7cdf95',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a72b4115-9db9-415f-b59e-7c2194d33b6c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5898',
  'x-ms-correlation-request-id',
  '4abb420c-97ee-4f68-8e3c-39f67e6ab1a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040641Z:4abb420c-97ee-4f68-8e3c-39f67e6ab1a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5082fc5f-fc7a-4704-8dd2-e6ebee529173',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5897',
  'x-ms-correlation-request-id',
  '4e3765bc-5f0b-4304-b3a3-4f33a682cfdf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040641Z:4e3765bc-5f0b-4304-b3a3-4f33a682cfdf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f5ac7908-3e1e-4830-857e-489d5bc64cdc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5896',
  'x-ms-correlation-request-id',
  '37ae35ff-8045-4c81-ada1-94b792aa0820',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040642Z:37ae35ff-8045-4c81-ada1-94b792aa0820',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd610dca0-532c-42f3-be2a-1c80415dfbfa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5895',
  'x-ms-correlation-request-id',
  '6c9090d2-e681-4675-aa3c-fdddfb0e4478',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040642Z:6c9090d2-e681-4675-aa3c-fdddfb0e4478',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '283e2b80-05f9-4d1c-aee4-2f5446833db6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5894',
  'x-ms-correlation-request-id',
  '11482632-7093-45c2-af26-ac4305616d1a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040642Z:11482632-7093-45c2-af26-ac4305616d1a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '081e8353-f06d-457f-bd6e-e2b60b147466',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5893',
  'x-ms-correlation-request-id',
  'fc1899b7-403f-4beb-ba68-7582cf1fbbd1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040643Z:fc1899b7-403f-4beb-ba68-7582cf1fbbd1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==?api-version=2021-08-01',
  'Retry-After',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9abbdce4-3d01-4156-bc6b-caf86f0f09ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5892',
  'x-ms-correlation-request-id',
  '1d914e95-2d05-4151-9517-d2c6d66ce9c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040643Z:1d914e95-2d05-4151-9517-d2c6d66ce9c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV9iYjZiZTRmNg==')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '969a51cb-203d-4851-b991-32fc5783b90b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5891',
  'x-ms-correlation-request-id',
  'a6ae9e73-a3c3-4937-9375-e5a1dbc2f29c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040643Z:a6ae9e73-a3c3-4937-9375-e5a1dbc2f29c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
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
  '88a9274a-05f8-4180-949f-592e554b4827',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5890',
  'x-ms-correlation-request-id',
  '6606dd6e-3fd5-4431-9146-daccf72bfe0b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T040644Z:6606dd6e-3fd5-4431-9146-daccf72bfe0b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 04:06:44 GMT'
]);
