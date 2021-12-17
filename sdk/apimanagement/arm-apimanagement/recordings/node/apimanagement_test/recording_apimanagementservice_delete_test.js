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
  '60',
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
  '60',
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
  '60',
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
  '60',
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
  '60',
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
