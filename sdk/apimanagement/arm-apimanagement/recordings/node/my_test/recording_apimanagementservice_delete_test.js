let nock = require('nock');

module.exports.hash = "81f1d181da064a63c376850d3b6cbc8f";

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
  '3549617a-6b6c-4ee7-bff0-5ddc78030000',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsKvr8-BINFEsdHItVhwEKM; expires=Sat, 23-Oct-2021 04:32:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrInUFO5aF4BF1YCFQN5ogWLXtrcZzXmXTcE2YZrdC-etZxoPz0dKWGbTQV4GOqyVIXB2QvPQNxF5oPnPjTMH75oHTMTIlnTvVz282zhokTgn_XM4aAE0AV1GRKyGy9SBKwZAu1m5U3w-fjfU93C0JYJn5XH_28KGbmlw7HdIIPe8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:48 GMT',
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
  '1f67b240-fa2e-4567-a131-a66456940000',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=An0jIRdh_xpOp37M-hc3lo4; expires=Sat, 23-Oct-2021 04:32:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrscMyOn8-7o93slbeZk--wDGRGR2zsdQI1MkaOlJYoKSkXErqeO0X-2TQRkSmYdgywyH53cxmseYQkgQPB_dqLixDPqU3AHBa7pqQFJQCneSc9tMHVcbSfjhzEAI4FGry87G3giYEwMFazDZhqoOAHpt4IGwZghvyznSry5dAjXsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c86b1df5-9497-4961-9a2f-d9cd4fb1c9b0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '6e945927-d6d4-48cc-b0d5-cf6edd150f00',
  'x-ms-ests-server',
  '2.1.12071.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiEQvyJHt3hNixJbqT3iIhQWPr5BAQAAAHH63dgOAAAA; expires=Sat, 23-Oct-2021 04:32:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:49 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedddbb777b1f8d3e5a668b9c90e97edc5eaff0f10dd0d030bb683e7af48b7fc9e8a3b29a66180abd769a356dfad56bfa3aa7efe983637e9e3cf9fcd5179fd1a784ee2aafdb22c7ab1fadd693b268e6797dbac88a925a9f57d5ef39ad962df53c9e560bbc609abc1074a9057dbaacdae2bc905e5fe74b1abf8190ad8ac5c5a2dd5e5675be2aaf7f4f7c3cbe2a96b3eaaac97eb0ae730317746be8f56279f1bacd5ac07ebd9e4ef37c96cfe8fb36ab2ff2f665a4157d39ad73fa7d76dc7ed54ee993bd9dbddded9d87db7bf7deecdc7bb4bfffe8fefef8e1c183839d7b0f7e8a5a5f50dbabecfaab1af8cddb76d53cba1bcec69831db26dcc7cbbc75afbcca2fa8efacdcf0ea764e145f37db3bbbe35a5bf7a0adaabadd08642c2d7a2fcef2cbbcc484bde4ef3741b04d7b4016967988933681700d7b309ae962d39bf475ef9579d5b460f1936a795e5cac6be615e2baeffd62c3e234b9efaeb5a5725708b60b325f4e2be28e133030731fbdb25c97e5e8a3b7f9f54f66ebb23d23f1964fa6aed1cbac69aeaada7eb5cc2f887de98b93b2a0c106e0ceb3b2c983b7cd5bb3fc1c3dbc6eca27c4cdc48f1f3d6aeb35b525e95fb6457b2dd0a218bc66d541e37bb22e08c9258dc5ff96187b4d94c16bbfe4fbc42e10b9e9d9cbe3d98cb44e0351fdde47fb3be3079f8e771fdc1befdebbff115ad5c525bd1c340384d147d96c5680d859f95c1583fdeab2a8db7556bec85b22c8db606a4c93e9ba69ab05cd0df192d1134e197d97c64e927c8c990935d3f873c2866466fc3a9fae6ba2c79860b4d5b42a9bf19bb2d9dda1e13f037569f0df04bcdd6f101e4deabd0fc7efa458919e24ecc8b294f9d3bcd9fdf4e083813ec9a66f49c17ac862f01f8e6c1cee8713b50ff78388eb8121c540daeddba480f62c34327e214bbf11d5f2a25aa22b4fc8888f85bf6745934dca5c3bb0124f5ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a98ae84a65cf09bd4ae5e972b6aa0802c15ae6538897f64fef366fd7000cdd489892f02f67192927c2365b6553a2e1478f76a999512bf2dee8a31fd090","0c90ff0710415befc8080000"], [
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
  '"AAAAAABBGRM="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e911a749-bd96-4a93-83a4-86a1af6e5fce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4905',
  'x-ms-correlation-request-id',
  '279025cc-402e-4e7b-87f4-050e308e7b9f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043249Z:279025cc-402e-4e7b-87f4-050e308e7b9f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2","name":"myservicexxx2","type":"Microsoft.ApiManagement/service","tags":{},"location":"East US","etag":"AAAAAABBGRQ=","properties":{"publisherEmail":"foo@contoso.com","publisherName":"foo","notificationSenderEmail":"apimgmt-noreply@mail.windowsazure.com","provisioningState":"Succeeded","targetProvisioningState":"Deleting","createdAtUtc":"2021-09-23T03:44:54.9878037Z","gatewayUrl":"https://myservicexxx2.azure-api.net","gatewayRegionalUrl":"https://myservicexxx2-eastus-01.regional.azure-api.net","portalUrl":"https://myservicexxx2.portal.azure-api.net","developerPortalUrl":"https://myservicexxx2.developer.azure-api.net","managementApiUrl":"https://myservicexxx2.management.azure-api.net","scmUrl":"https://myservicexxx2.scm.azure-api.net","hostnameConfigurations":[{"type":"Proxy","hostName":"myservicexxx2.azure-api.net","encodedCertificate":null,"keyVaultId":null,"certificatePassword":null,"negotiateClientCertificate":false,"certificate":null,"defaultSslBinding":true,"identityClientId":null,"certificateSource":"BuiltIn","certificateStatus":null}],"publicIPAddresses":["40.76.173.135"],"privateIPAddresses":null,"additionalLocations":null,"virtualNetworkConfiguration":null,"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2":"False"},"virtualNetworkType":"None","certificates":null,"disableGateway":false,"apiVersionConstraint":{"minApiVersion":null},"publicIpAddressId":null,"privateEndpointConnections":null},"sku":{"name":"Standard","capacity":1},"identity":null,"zones":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'abf88548-4089-421c-82b2-a752907e514e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  '9d8adb33-169f-4cce-a093-be261516328b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043251Z:9d8adb33-169f-4cce-a093-be261516328b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:51 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '149aee2e-6bf9-4165-8eb9-44aa36bb5ade',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4904',
  'x-ms-correlation-request-id',
  '0a8993da-307a-4e39-82ec-7e25c9a343e8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043251Z:0a8993da-307a-4e39-82ec-7e25c9a343e8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c512a89c-6700-4ee2-8688-3f6b92782276',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4903',
  'x-ms-correlation-request-id',
  'fada66b1-12f6-40f6-b245-94bd26a2029c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043252Z:fada66b1-12f6-40f6-b245-94bd26a2029c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '833f7f82-de1f-491d-a8a0-6d805b6c6234',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4902',
  'x-ms-correlation-request-id',
  '024494bc-3076-4020-9af5-ba846dff0c2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043252Z:024494bc-3076-4020-9af5-ba846dff0c2f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '89786617-aa9e-4929-86db-ed5e00d2f5fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4901',
  'x-ms-correlation-request-id',
  'a499d09e-fae9-4893-9e25-32bd83723c4a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043253Z:a499d09e-fae9-4893-9e25-32bd83723c4a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b431e705-3e36-4360-adde-9660245e5c6b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4900',
  'x-ms-correlation-request-id',
  '16ef48f9-bfcd-4fe9-be75-2b0ece8ee2bb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043253Z:16ef48f9-bfcd-4fe9-be75-2b0ece8ee2bb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '913038bf-dff1-4b7b-b405-e68c245a5f8a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4899',
  'x-ms-correlation-request-id',
  '6cbd4b03-bad4-4f7d-a2ad-b7744c7fa960',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043253Z:6cbd4b03-bad4-4f7d-a2ad-b7744c7fa960',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '358c3c50-2f73-47f9-bd09-c653cd59b50d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4898',
  'x-ms-correlation-request-id',
  '39c1e816-99db-4565-890c-66217184d4b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043254Z:39c1e816-99db-4565-890c-66217184d4b1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '256369f6-9627-4460-944a-899c7868d9f8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4897',
  'x-ms-correlation-request-id',
  '4afa6c61-bca5-4e7b-8373-4c24120684b3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043254Z:4afa6c61-bca5-4e7b-8373-4c24120684b3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b9c97f36-5062-4c93-925b-8541354d8d99',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4896',
  'x-ms-correlation-request-id',
  '52c09bc1-3700-49e2-8cdd-4eee2f59ed89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043255Z:52c09bc1-3700-49e2-8cdd-4eee2f59ed89',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3d9fac22-bd54-4709-81ff-2ef373bf9cc7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4895',
  'x-ms-correlation-request-id',
  'fad5490e-d7b8-4cb1-acea-9ac2fa8dbea9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043255Z:fad5490e-d7b8-4cb1-acea-9ac2fa8dbea9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '951ae699-3cf8-47eb-a701-dea34b51d5c7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4894',
  'x-ms-correlation-request-id',
  '623b1525-1e0f-4740-a1fa-e1d2db70d388',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043255Z:623b1525-1e0f-4740-a1fa-e1d2db70d388',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6f0da371-f801-4474-b112-488e3ae39a73',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4893',
  'x-ms-correlation-request-id',
  'd2b47a69-cdd7-4258-9fdf-52c23c121c29',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043256Z:d2b47a69-cdd7-4258-9fdf-52c23c121c29',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4ea82764-6ca4-4075-9cb9-5377689406c7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4892',
  'x-ms-correlation-request-id',
  '7638bfc7-8d95-4b83-bab1-6d036070efaf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043256Z:7638bfc7-8d95-4b83-bab1-6d036070efaf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d41f2bd-5f84-4b48-a4db-f876f96f7afc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4891',
  'x-ms-correlation-request-id',
  '6e2064a5-f5a7-42d0-b036-6aa97756adf1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043257Z:6e2064a5-f5a7-42d0-b036-6aa97756adf1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a63f2993-908d-46ff-8f8b-6d57a0b9098e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4890',
  'x-ms-correlation-request-id',
  'b37175d1-6732-4d5a-8ade-31f02b799718',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043257Z:b37175d1-6732-4d5a-8ade-31f02b799718',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a0e00f10-78e4-44bd-97e9-6f06dde94a2e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4889',
  'x-ms-correlation-request-id',
  'f45d4d41-3d2b-406c-8ba0-868ca29f9d48',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043257Z:f45d4d41-3d2b-406c-8ba0-868ca29f9d48',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '276219eb-2372-4931-b3fd-1a92c65ba06a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4888',
  'x-ms-correlation-request-id',
  '1b3a953a-d8d5-4717-b732-e3d8773a85b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043258Z:1b3a953a-d8d5-4717-b732-e3d8773a85b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04355ebf-78a1-4574-b3df-65b543ec599a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4887',
  'x-ms-correlation-request-id',
  'e9326b38-5414-40b9-ba47-41ff5e87aeef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043258Z:e9326b38-5414-40b9-ba47-41ff5e87aeef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '31cb70c2-7515-45ee-841a-a0589787e66e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4886',
  'x-ms-correlation-request-id',
  '375befb3-0545-49e2-9e36-73ddff1b7522',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043258Z:375befb3-0545-49e2-9e36-73ddff1b7522',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4b61169-91b0-4395-98e3-d27a644d9c02',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4885',
  'x-ms-correlation-request-id',
  'ad0e9e7a-a055-427f-822b-ecd1d8e0004a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043259Z:ad0e9e7a-a055-427f-822b-ecd1d8e0004a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c767dbfb-4670-44fe-a061-d17008a459d5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4884',
  'x-ms-correlation-request-id',
  'd0e85442-883a-4648-ac1f-4862e6568ce9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043259Z:d0e85442-883a-4648-ac1f-4862e6568ce9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3a226493-5c58-4c5a-9fbb-e9dccca9c4de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4883',
  'x-ms-correlation-request-id',
  '377ca02d-fce3-494a-85ff-ffd457bb300a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043300Z:377ca02d-fce3-494a-85ff-ffd457bb300a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8eab6c49-517a-4038-be3b-8b33a20e82f7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4882',
  'x-ms-correlation-request-id',
  'fe0c84de-742e-4f49-986c-0453b9847639',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043300Z:fe0c84de-742e-4f49-986c-0453b9847639',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5dae5de9-48c2-4fff-8179-eb7c11c05d9c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4881',
  'x-ms-correlation-request-id',
  'b5079993-9153-43e2-9170-ef486be2e6e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043300Z:b5079993-9153-43e2-9170-ef486be2e6e1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a2433c77-cfb5-4ef2-875e-5e1c53a64c93',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4880',
  'x-ms-correlation-request-id',
  'de49bb40-535b-454f-a624-5bdb74d8d4d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043301Z:de49bb40-535b-454f-a624-5bdb74d8d4d7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '913ce94c-3122-45b5-be86-cd963d9c60af',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4879',
  'x-ms-correlation-request-id',
  '9bf73f17-0bb0-4d02-941a-61287ef6b792',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043301Z:9bf73f17-0bb0-4d02-941a-61287ef6b792',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '15ef2b71-0974-4256-9674-bbc7261f5b6b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4878',
  'x-ms-correlation-request-id',
  'c746c8fa-34af-4a37-9be0-4bd99a479240',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043302Z:c746c8fa-34af-4a37-9be0-4bd99a479240',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a8045351-2900-4549-abc7-1b94d9ff0e70',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4877',
  'x-ms-correlation-request-id',
  '9c7a0c53-e571-49d9-b30f-df1ca4381a6b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043302Z:9c7a0c53-e571-49d9-b30f-df1ca4381a6b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b37218db-d4e6-4799-ad6d-43f588a02def',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4876',
  'x-ms-correlation-request-id',
  '4473b406-8f29-4433-aa9f-2f885da2a9ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043302Z:4473b406-8f29-4433-aa9f-2f885da2a9ef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3015b8d1-3bd6-4e22-b137-4011288b1bee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4875',
  'x-ms-correlation-request-id',
  'c186f573-01ff-4839-825f-6e429be2a788',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043303Z:c186f573-01ff-4839-825f-6e429be2a788',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '047ae38c-450f-4766-80d4-c1e0db6d2fe2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4874',
  'x-ms-correlation-request-id',
  '7c2570ec-acdf-42d5-a153-40ef3b1019c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043303Z:7c2570ec-acdf-42d5-a153-40ef3b1019c6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2a9dd6fd-1890-49c0-b490-1ab27109ac66',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4873',
  'x-ms-correlation-request-id',
  '1527150c-1eab-49f1-81c8-539870357f68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043304Z:1527150c-1eab-49f1-81c8-539870357f68',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c374cb69-30f7-4b88-a34a-9c39fae765ba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4872',
  'x-ms-correlation-request-id',
  'cbe9b621-b94f-45df-857a-948762cd3534',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043304Z:cbe9b621-b94f-45df-857a-948762cd3534',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ad8c3be-f220-475e-991d-24647da26df3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4871',
  'x-ms-correlation-request-id',
  '448da8f1-dff5-46ff-8e0e-fc93fabb70e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043304Z:448da8f1-dff5-46ff-8e0e-fc93fabb70e0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee146be1-c6b9-4fbd-bc70-613a2f2cef1d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4870',
  'x-ms-correlation-request-id',
  'f60e07d6-5d09-44db-af0a-f225d6bdd9b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043305Z:f60e07d6-5d09-44db-af0a-f225d6bdd9b7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5882a7d8-aba8-4197-be67-f8c03bded2df',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4869',
  'x-ms-correlation-request-id',
  '1f77e597-f66f-4042-a0c0-a35aea21fdc5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043305Z:1f77e597-f66f-4042-a0c0-a35aea21fdc5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d67d324-89ac-4acf-985b-b1ce908defd2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4868',
  'x-ms-correlation-request-id',
  'f5ad2e3b-5971-4d16-8b5d-02b5536c9126',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043305Z:f5ad2e3b-5971-4d16-8b5d-02b5536c9126',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7effddb0-fee7-4478-8ca4-fbb507d515a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4867',
  'x-ms-correlation-request-id',
  '4e54abda-45a8-48d6-8667-4fab473509aa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043306Z:4e54abda-45a8-48d6-8667-4fab473509aa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9a9a6813-ac3a-48cb-9aa9-42c88294c2c4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4866',
  'x-ms-correlation-request-id',
  '92597442-c320-4a52-9768-f63fca579d4d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043306Z:92597442-c320-4a52-9768-f63fca579d4d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5c5df894-7afd-419f-b25d-f839cc9e9278',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4865',
  'x-ms-correlation-request-id',
  '06f461e6-cd97-4cae-a10a-cda4e08eaf91',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043307Z:06f461e6-cd97-4cae-a10a-cda4e08eaf91',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ece03188-c28b-4ec6-8cf7-bc8d7872af3d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4864',
  'x-ms-correlation-request-id',
  'f64989a9-ddb1-41cf-b5ff-b49845644eff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043307Z:f64989a9-ddb1-41cf-b5ff-b49845644eff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7b3556cc-600b-47e3-b0dc-ed2200a01f17',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4863',
  'x-ms-correlation-request-id',
  '6d301e2e-9143-44e9-aec9-b1f9e401c78c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043307Z:6d301e2e-9143-44e9-aec9-b1f9e401c78c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '53f8e094-56a5-4478-bac9-f8dc4cfc24bf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4862',
  'x-ms-correlation-request-id',
  'eee4038c-9775-49d6-afeb-59eaa3a108fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043308Z:eee4038c-9775-49d6-afeb-59eaa3a108fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e314a5f2-b157-49e2-a2a2-aedd4253ec78',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4861',
  'x-ms-correlation-request-id',
  'db1e12ac-1d9b-496e-aab9-d465a0f42997',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043308Z:db1e12ac-1d9b-496e-aab9-d465a0f42997',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6c5011d-9254-40ff-b360-adb7cfca3546',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4860',
  'x-ms-correlation-request-id',
  '861560d2-6087-4fe8-b914-c7de0d418130',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043309Z:861560d2-6087-4fe8-b914-c7de0d418130',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3c5c320c-bfdf-4855-9fb8-11ef1ebb0a6e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4859',
  'x-ms-correlation-request-id',
  'cba5c24e-fe46-4e58-81e5-89042d2863ec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043309Z:cba5c24e-fe46-4e58-81e5-89042d2863ec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1772b269-54be-45cd-9399-557569bc8cd7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4858',
  'x-ms-correlation-request-id',
  '4f85d0ac-06e0-401f-8274-86f935d04625',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043309Z:4f85d0ac-06e0-401f-8274-86f935d04625',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '716473af-3655-4a89-ab5b-fafbcf5dd151',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4857',
  'x-ms-correlation-request-id',
  'abad9a95-d31b-4692-8eda-7c8e7e300f67',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043310Z:abad9a95-d31b-4692-8eda-7c8e7e300f67',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd098ef1c-b2f4-4c96-a1c2-5e36075d12e3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4856',
  'x-ms-correlation-request-id',
  '7e19f821-ed0b-463a-a6ee-e969ef71fc8f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043310Z:7e19f821-ed0b-463a-a6ee-e969ef71fc8f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96a4a9a6-123a-49b7-8b04-e5a924c09698',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4855',
  'x-ms-correlation-request-id',
  '33be7d32-e176-471f-a778-5f12a2b54ea9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043310Z:33be7d32-e176-471f-a778-5f12a2b54ea9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '12807d55-892c-414a-8209-6e846d179a88',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4854',
  'x-ms-correlation-request-id',
  'f421480c-6c1e-4227-9aa5-76f82d6646b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043311Z:f421480c-6c1e-4227-9aa5-76f82d6646b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2634bda3-22fb-4bb0-a8cc-378f90dc2681',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4853',
  'x-ms-correlation-request-id',
  '13d9a241-e98f-4d7f-8dd0-80fd0fb300d1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043311Z:13d9a241-e98f-4d7f-8dd0-80fd0fb300d1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4f720ffe-72ab-4069-990f-7c1aca2b170f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4852',
  'x-ms-correlation-request-id',
  '8dac0814-57eb-4191-9d50-e88fa2292008',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043312Z:8dac0814-57eb-4191-9d50-e88fa2292008',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '440e6c44-31ff-4ce3-9a0a-33965f5c0838',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4851',
  'x-ms-correlation-request-id',
  'c70c1291-1c74-42ab-b8ea-ad7cc79f93c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043312Z:c70c1291-1c74-42ab-b8ea-ad7cc79f93c0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7b53c0e0-cfd7-46d4-b37b-b56b2d16d7ab',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4850',
  'x-ms-correlation-request-id',
  '11e6dec1-c754-4764-b4b5-bf55a5ba5a39',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043312Z:11e6dec1-c754-4764-b4b5-bf55a5ba5a39',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1551eea6-3cc5-418a-9db1-f449060b0097',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4849',
  'x-ms-correlation-request-id',
  '640b2dfb-232e-413a-9d4c-7504799d092c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043313Z:640b2dfb-232e-413a-9d4c-7504799d092c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b291a825-74f7-4127-b761-3cce6cbb6de0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4848',
  'x-ms-correlation-request-id',
  'a0b1a67d-2d5f-4f36-8322-89df2c06dee8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043313Z:a0b1a67d-2d5f-4f36-8322-89df2c06dee8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe454905-e018-4dc3-a8a9-1746e71e6dc4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4847',
  'x-ms-correlation-request-id',
  '56d54f68-7619-4f8c-bf90-f864eac9ee6a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043314Z:56d54f68-7619-4f8c-bf90-f864eac9ee6a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ac1143f6-65c3-4368-b8a3-72fa5194d197',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4846',
  'x-ms-correlation-request-id',
  'f20e243b-4379-460b-a630-c7993ee7999b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043314Z:f20e243b-4379-460b-a630-c7993ee7999b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9c7e8a04-a596-47fe-80b7-941aed158de1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4845',
  'x-ms-correlation-request-id',
  '76ac8eeb-49e7-4470-a494-3b61d575b5a9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043314Z:76ac8eeb-49e7-4470-a494-3b61d575b5a9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '91d51790-c9af-462c-8dd4-7396870f63e0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4844',
  'x-ms-correlation-request-id',
  '5fa9ef96-0673-4913-b197-ededdc2cbbd0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043315Z:5fa9ef96-0673-4913-b197-ededdc2cbbd0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '621052bc-00e4-4284-9057-d33c308a89b1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4843',
  'x-ms-correlation-request-id',
  '174a89d9-8963-45a7-9dc7-bd36529683f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043315Z:174a89d9-8963-45a7-9dc7-bd36529683f4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'abfe2fb9-5085-4df7-9cc0-75e53e45241b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4842',
  'x-ms-correlation-request-id',
  '920872f3-343f-4b4a-bd88-a92fe9dd3894',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043316Z:920872f3-343f-4b4a-bd88-a92fe9dd3894',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3842affe-e957-4ea8-b355-af1962266cdb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4841',
  'x-ms-correlation-request-id',
  '25bc65c0-31c9-4c3c-b2fd-9da6066c1724',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043316Z:25bc65c0-31c9-4c3c-b2fd-9da6066c1724',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c5b88c11-ca42-4ab7-8200-003d2efda5dd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4840',
  'x-ms-correlation-request-id',
  '9a7c944c-31e3-4ad1-9155-9a47078c8b71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043316Z:9a7c944c-31e3-4ad1-9155-9a47078c8b71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'aa1510c9-4121-44f7-9afd-fd9c05b1f271',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4839',
  'x-ms-correlation-request-id',
  '3bc23b6d-c692-4634-8ab8-6a228175372b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043317Z:3bc23b6d-c692-4634-8ab8-6a228175372b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fc849856-88c9-4351-999c-85257fa448e9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4838',
  'x-ms-correlation-request-id',
  '04eb2f01-eba7-4747-a71c-80359a91d3f0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043317Z:04eb2f01-eba7-4747-a71c-80359a91d3f0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fefb1085-1753-488c-95b5-7353e38b7f57',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4837',
  'x-ms-correlation-request-id',
  '15dba48a-d98e-4df0-a597-e37762113d6f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043317Z:15dba48a-d98e-4df0-a597-e37762113d6f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a5b8c521-6e5f-464d-96af-567279163936',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4836',
  'x-ms-correlation-request-id',
  '5ea8c3fe-3b0f-4028-8065-3679e4e12df5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043318Z:5ea8c3fe-3b0f-4028-8065-3679e4e12df5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b38759bb-2019-462f-a422-bf8f673027fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4835',
  'x-ms-correlation-request-id',
  'cc2268b5-ad90-43eb-affa-25091a12217c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043318Z:cc2268b5-ad90-43eb-affa-25091a12217c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a13c3bdd-10e0-4a59-97d8-ce0431d59830',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4834',
  'x-ms-correlation-request-id',
  '69c4969c-91f0-4061-9923-bd2235276180',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043319Z:69c4969c-91f0-4061-9923-bd2235276180',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1152a376-6acf-4b8f-8b61-97f36c9a15d4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4833',
  'x-ms-correlation-request-id',
  'f2695281-d99d-4661-a2b1-8123a3082a6d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043319Z:f2695281-d99d-4661-a2b1-8123a3082a6d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '902cca09-4245-434b-8d86-9df6073ca19b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4832',
  'x-ms-correlation-request-id',
  '83eb19ed-83af-46af-87f7-8d7a3335b0cf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043319Z:83eb19ed-83af-46af-87f7-8d7a3335b0cf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3160a2b3-b4b7-4a77-86ce-c7c82804bb0e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4831',
  'x-ms-correlation-request-id',
  'd0199310-c901-4b9c-869e-dcf678bb5a38',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043320Z:d0199310-c901-4b9c-869e-dcf678bb5a38',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd605513-4791-4151-a477-b8172118eb44',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4830',
  'x-ms-correlation-request-id',
  '0da2c0e5-a153-45cd-9bb2-95682c64876b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043320Z:0da2c0e5-a153-45cd-9bb2-95682c64876b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd85182b-79ff-4ab6-9a18-c2d3441f8196',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4829',
  'x-ms-correlation-request-id',
  '7a29b9cb-7932-4495-b14d-9c4b0f81f4e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043321Z:7a29b9cb-7932-4495-b14d-9c4b0f81f4e4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '44d3028c-8426-4d48-a765-ce6efa4a09b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4828',
  'x-ms-correlation-request-id',
  '5abbf27b-b7fd-4252-99e3-4cb92164c019',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043321Z:5abbf27b-b7fd-4252-99e3-4cb92164c019',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f8784bc3-7b18-4f65-b308-39c37c4938af',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4827',
  'x-ms-correlation-request-id',
  '78b302ad-3182-42a3-adf2-3cd76409135a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043321Z:78b302ad-3182-42a3-adf2-3cd76409135a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6ee44f7-a284-4fa0-ae10-12fd009426fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4826',
  'x-ms-correlation-request-id',
  'bc9a3da9-110a-4292-964b-ce8bc3a4bd7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043322Z:bc9a3da9-110a-4292-964b-ce8bc3a4bd7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6ea2b1b1-4580-431f-94ea-c923d5a98ec3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4825',
  'x-ms-correlation-request-id',
  '9ba31b4d-0f82-487c-8ff3-2243985ed592',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043322Z:9ba31b4d-0f82-487c-8ff3-2243985ed592',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56415823-9f07-4574-a259-83e91a49d33a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4824',
  'x-ms-correlation-request-id',
  'b4b5e426-aa83-474c-b3b4-ff4253d0c6ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043322Z:b4b5e426-aa83-474c-b3b4-ff4253d0c6ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4f6c9035-89c1-4862-9989-c602409dba26',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4823',
  'x-ms-correlation-request-id',
  '78bed16e-398b-42b7-929d-fc96663c3bed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043323Z:78bed16e-398b-42b7-929d-fc96663c3bed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '588f56be-3278-4dd6-921c-ed3acd515541',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4822',
  'x-ms-correlation-request-id',
  'f9cd0138-0709-4d9b-a859-569867df7041',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043323Z:f9cd0138-0709-4d9b-a859-569867df7041',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7f45561b-ac24-4063-8e90-03412430203c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4821',
  'x-ms-correlation-request-id',
  '6094e3f3-e5e2-41b7-8e14-4fbe9a2bc5e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043324Z:6094e3f3-e5e2-41b7-8e14-4fbe9a2bc5e2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e4b79878-14e7-4b1f-b6ad-6270001e9d61',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4820',
  'x-ms-correlation-request-id',
  '003550e1-455c-48f5-bcc0-adb7764449d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043324Z:003550e1-455c-48f5-bcc0-adb7764449d3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '175dad1f-cc33-4717-9d34-af9eeb54324e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4819',
  'x-ms-correlation-request-id',
  'd90e1ec0-88fb-4625-a504-83456ee49fa5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043324Z:d90e1ec0-88fb-4625-a504-83456ee49fa5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8fa7fd59-74e6-4944-8eff-cbf9c3ec0ca8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4818',
  'x-ms-correlation-request-id',
  '5185a8ce-0876-411c-9aac-b6209ac45298',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043325Z:5185a8ce-0876-411c-9aac-b6209ac45298',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f31c0093-9af7-468d-ab5f-9692ecb83649',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4817',
  'x-ms-correlation-request-id',
  '21fd974d-9711-4fdb-b33e-710b325b152f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043325Z:21fd974d-9711-4fdb-b33e-710b325b152f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b21ad570-818c-43c4-8185-3fd13884a1d2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4816',
  'x-ms-correlation-request-id',
  '72220f15-2eb9-4288-a485-808528c9fd45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043326Z:72220f15-2eb9-4288-a485-808528c9fd45',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '766ec0a9-e1c0-4c18-8e2d-cf832d911856',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4815',
  'x-ms-correlation-request-id',
  'd3f1ba01-7288-47fc-9231-e9330b4d5294',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043326Z:d3f1ba01-7288-47fc-9231-e9330b4d5294',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cfa28021-fac8-4e36-bd6b-0b405b624776',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4814',
  'x-ms-correlation-request-id',
  '80e708e8-f1e9-4030-a9a0-efb419f7b0cf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043326Z:80e708e8-f1e9-4030-a9a0-efb419f7b0cf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9e43073b-7df6-4a48-9fd4-e097a4416211',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4813',
  'x-ms-correlation-request-id',
  'c594f6fc-3bb2-40c4-8f0d-76ec7b4c9323',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043327Z:c594f6fc-3bb2-40c4-8f0d-76ec7b4c9323',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '03da248f-7b0d-4543-8aa2-0b0d4e2e1ee5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4812',
  'x-ms-correlation-request-id',
  '41ca18f3-fc94-4781-bc3f-cb8017359e51',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043327Z:41ca18f3-fc94-4781-bc3f-cb8017359e51',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fc2b8afb-fd49-4635-8638-b2571ac28af9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4811',
  'x-ms-correlation-request-id',
  'fff2c1ce-f9e8-4d34-8a05-3817522bd974',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043328Z:fff2c1ce-f9e8-4d34-8a05-3817522bd974',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '29d19154-73ce-4988-a7a2-321ef67bdbe7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4810',
  'x-ms-correlation-request-id',
  'f89e7ed8-f355-403e-9469-a4f766babc78',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043328Z:f89e7ed8-f355-403e-9469-a4f766babc78',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dcf8e61f-f471-4af7-960b-cbe0dbc4a870',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4809',
  'x-ms-correlation-request-id',
  '6cbbb604-17f6-4dea-b76b-41d76a884c28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043328Z:6cbbb604-17f6-4dea-b76b-41d76a884c28',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5134ef11-e462-4815-b555-bf4cc4717916',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4808',
  'x-ms-correlation-request-id',
  '0e5974eb-1824-4014-8717-a148b71680c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043329Z:0e5974eb-1824-4014-8717-a148b71680c6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5aac3648-498e-413a-9404-71a7425f18a2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4807',
  'x-ms-correlation-request-id',
  '9eba5c2b-f405-4d8a-b466-5ca6aadd2295',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043329Z:9eba5c2b-f405-4d8a-b466-5ca6aadd2295',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a87870b0-616d-433b-8c9a-95ba60ff43c4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4806',
  'x-ms-correlation-request-id',
  '4410b1d7-99c9-45f9-a0a6-c8b3e284a86b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043330Z:4410b1d7-99c9-45f9-a0a6-c8b3e284a86b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8bec675d-97c7-40dc-a3ec-331f935983f2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4805',
  'x-ms-correlation-request-id',
  '999cfa42-5919-4ebe-bd04-cb2da68ebf12',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043330Z:999cfa42-5919-4ebe-bd04-cb2da68ebf12',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b251edb-ee32-4e73-bb13-d2946a40f638',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4804',
  'x-ms-correlation-request-id',
  'c658071d-d918-4ec8-9c9f-5c32b4f0e56d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043330Z:c658071d-d918-4ec8-9c9f-5c32b4f0e56d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e3a4e6a-3b49-43cb-9b6d-7b82d76aa7f0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4803',
  'x-ms-correlation-request-id',
  '3149ac96-e747-4bba-95b7-9efe1b77569e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043331Z:3149ac96-e747-4bba-95b7-9efe1b77569e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f2508225-2b5a-483b-915f-a3494052abbc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4802',
  'x-ms-correlation-request-id',
  '8c604d59-6d87-4fc9-8042-1a9bc058d4ca',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043331Z:8c604d59-6d87-4fc9-8042-1a9bc058d4ca',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e48ac0f-8cda-4ade-9030-49c7f8988fa7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4801',
  'x-ms-correlation-request-id',
  '7c633dfd-721f-4185-9942-80b93570aea3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043332Z:7c633dfd-721f-4185-9942-80b93570aea3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f6cb5f25-384e-45c5-a302-01d869285a78',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4800',
  'x-ms-correlation-request-id',
  '72234395-26ce-46a7-8b33-34210d94d41c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043332Z:72234395-26ce-46a7-8b33-34210d94d41c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ed50ec4-936c-4e04-ac2e-ff99d91f7b7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4799',
  'x-ms-correlation-request-id',
  '31273716-8f91-4bf3-bb9e-a3cf89a99364',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043332Z:31273716-8f91-4bf3-bb9e-a3cf89a99364',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0545a6e9-ce6f-4dac-a358-01873757d994',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4798',
  'x-ms-correlation-request-id',
  '70aab0e9-1d86-45ee-b4d8-cb7797ab9f92',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043333Z:70aab0e9-1d86-45ee-b4d8-cb7797ab9f92',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6a2adf4-80d2-48aa-b66e-2915cd77dba5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4797',
  'x-ms-correlation-request-id',
  'bfbc0982-1634-41a8-b5c0-c36842df42bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043333Z:bfbc0982-1634-41a8-b5c0-c36842df42bd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a740b5bf-7ea6-4af5-b75d-4a6fb683ddaf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4796',
  'x-ms-correlation-request-id',
  '4f259215-fb9e-4474-846d-b9f2e75859dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043333Z:4f259215-fb9e-4474-846d-b9f2e75859dc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56dc4a5f-4080-4076-b360-636833b4a872',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4795',
  'x-ms-correlation-request-id',
  '6dfe0462-f67b-4a2e-80c6-8d2a4e0a226d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043334Z:6dfe0462-f67b-4a2e-80c6-8d2a4e0a226d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6251967-c3f1-49cb-b6c2-9e44ba3d6ea1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4794',
  'x-ms-correlation-request-id',
  '6c5aadf0-bcdf-499c-afdc-ec9af783cd1b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043334Z:6c5aadf0-bcdf-499c-afdc-ec9af783cd1b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4bc5519-5b0b-40fc-bb41-7675cada0e87',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4793',
  'x-ms-correlation-request-id',
  '1a98c473-c7e6-4838-a603-06c48ac31283',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043335Z:1a98c473-c7e6-4838-a603-06c48ac31283',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd7c526b8-6456-4f23-b285-5c9ada2d2245',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4792',
  'x-ms-correlation-request-id',
  'b50d93fb-fa34-4124-a792-804c6f0f6037',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043335Z:b50d93fb-fa34-4124-a792-804c6f0f6037',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f41b4ce6-3f56-42eb-9772-881bf34d8dad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4791',
  'x-ms-correlation-request-id',
  '289a1740-f579-4b5a-898b-f68a1a62e3fa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043335Z:289a1740-f579-4b5a-898b-f68a1a62e3fa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd1aa3788-4c8d-484b-8ca3-e23984342a1c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4790',
  'x-ms-correlation-request-id',
  'f651a26d-2a5d-45a9-b613-721cf2daf9fb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043336Z:f651a26d-2a5d-45a9-b613-721cf2daf9fb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bcaabf3a-35c8-4a67-80b9-f58e26a6eafc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4789',
  'x-ms-correlation-request-id',
  'e242f55a-535a-493a-8f67-b65afea4b4cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043336Z:e242f55a-535a-493a-8f67-b65afea4b4cc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3f5a3e9b-88d5-4d40-9e65-b5f3dbd26550',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4788',
  'x-ms-correlation-request-id',
  'de0ffb41-3864-405b-b4c5-cf6ffe7b09f7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043337Z:de0ffb41-3864-405b-b4c5-cf6ffe7b09f7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e0a12cb1-d3f7-45e3-83a7-5c5ffd83894d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4787',
  'x-ms-correlation-request-id',
  '69326f07-6311-4685-a43d-1d490b7a2038',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043337Z:69326f07-6311-4685-a43d-1d490b7a2038',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '98755eaf-5c14-48e4-bed7-fd95c04d658a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4786',
  'x-ms-correlation-request-id',
  '3b659bbd-8af9-48d4-91d8-527fa8ae7e6c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043337Z:3b659bbd-8af9-48d4-91d8-527fa8ae7e6c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3de73fdd-93e1-45e3-900d-896af1275e3c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4785',
  'x-ms-correlation-request-id',
  '01a2df6f-aaf1-488f-b432-00d65756b888',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043338Z:01a2df6f-aaf1-488f-b432-00d65756b888',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ceb93d42-e941-4f45-8e65-4ee39299cb79',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4784',
  'x-ms-correlation-request-id',
  '38c6d403-5e3f-42c2-ada4-904c16517a51',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043338Z:38c6d403-5e3f-42c2-ada4-904c16517a51',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cfee21e2-a871-461b-9f07-0e1b2dfc3546',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4783',
  'x-ms-correlation-request-id',
  'cf9444e0-1abe-4959-a521-4d4f909d0d11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043339Z:cf9444e0-1abe-4959-a521-4d4f909d0d11',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97908e89-ceff-47ae-b07a-a5e904bb71a7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4782',
  'x-ms-correlation-request-id',
  'c4ec5c46-3787-4910-8d10-7c4eecc4b56f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043339Z:c4ec5c46-3787-4910-8d10-7c4eecc4b56f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a85cc0b-d317-4283-a31a-d8256442e0c1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4781',
  'x-ms-correlation-request-id',
  'a1416022-53de-4ddb-a25e-02ac0d7618a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043339Z:a1416022-53de-4ddb-a25e-02ac0d7618a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ea51f95f-4292-449f-bced-b5cd27222494',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4780',
  'x-ms-correlation-request-id',
  '037809a9-6072-408d-b513-2f7f1232ad60',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043340Z:037809a9-6072-408d-b513-2f7f1232ad60',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a6f21b5f-913f-409d-9db5-c2d0bdcffeac',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4779',
  'x-ms-correlation-request-id',
  'b5f40f8d-ca00-453e-b678-9384b4a06cf6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043340Z:b5f40f8d-ca00-453e-b678-9384b4a06cf6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '17c4d593-6136-4825-a879-5ea883060c5e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4778',
  'x-ms-correlation-request-id',
  '92797501-aa20-40d9-a10c-f1e76ab6a6ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043341Z:92797501-aa20-40d9-a10c-f1e76ab6a6ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f447f9a5-3e99-4fac-965b-6ce70662fd5d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4777',
  'x-ms-correlation-request-id',
  '6957f331-26b0-4a36-aa83-f6208a846e23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043341Z:6957f331-26b0-4a36-aa83-f6208a846e23',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd722020a-0a42-4a7c-a07f-aff635d51735',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4776',
  'x-ms-correlation-request-id',
  'ce5fc8e5-8481-4aa9-860d-5cb8e74b8725',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043342Z:ce5fc8e5-8481-4aa9-860d-5cb8e74b8725',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a67bc1ba-64f4-4391-9811-fa1adedd78df',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4775',
  'x-ms-correlation-request-id',
  '87a25b7e-9cf5-40c8-a195-07de61b90b83',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043342Z:87a25b7e-9cf5-40c8-a195-07de61b90b83',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc677c0b-2fa2-4791-a7c8-c10b2fae65a4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4774',
  'x-ms-correlation-request-id',
  '48198361-b155-4d96-b988-4adc209d51cf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043342Z:48198361-b155-4d96-b988-4adc209d51cf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '86e404b9-3c24-4478-8b7b-3dceaaf43d83',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4773',
  'x-ms-correlation-request-id',
  'd7217a96-d653-405f-b25f-f0568ed88518',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043343Z:d7217a96-d653-405f-b25f-f0568ed88518',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3d779b1b-51c6-43de-b9df-92338bb5fff9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4772',
  'x-ms-correlation-request-id',
  '2711d8bc-879a-4197-9fa9-685c5eca7a12',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043343Z:2711d8bc-879a-4197-9fa9-685c5eca7a12',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '86a830cc-1682-46b8-9b33-b3a1c490618d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4771',
  'x-ms-correlation-request-id',
  '9c17439d-dd41-43f6-9c24-54d858c10e39',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043343Z:9c17439d-dd41-43f6-9c24-54d858c10e39',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '09ac2c70-35b4-40cb-a177-38d4e0362773',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4770',
  'x-ms-correlation-request-id',
  'd6c929a2-9936-4299-92f6-a89290a360c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043344Z:d6c929a2-9936-4299-92f6-a89290a360c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c1ba016b-817e-488f-801d-b0bec8091209',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4769',
  'x-ms-correlation-request-id',
  'a0b5d3e0-9193-4080-bd54-0424cc9dcf22',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043344Z:a0b5d3e0-9193-4080-bd54-0424cc9dcf22',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a8c63746-fcf4-40b9-8738-165eafc1aec5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4768',
  'x-ms-correlation-request-id',
  '0540f9fe-ac55-4e17-9e72-7cbab3b58896',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043345Z:0540f9fe-ac55-4e17-9e72-7cbab3b58896',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1306a7bb-2066-4a3c-9cf7-d0ecc985b415',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4767',
  'x-ms-correlation-request-id',
  '2c94839e-03c8-4b01-aaf8-ba243761a002',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043345Z:2c94839e-03c8-4b01-aaf8-ba243761a002',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '69b74acf-cc41-4108-894b-ed457582cf7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4766',
  'x-ms-correlation-request-id',
  '562f4041-40db-43f7-b50f-9770fb5642b4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043345Z:562f4041-40db-43f7-b50f-9770fb5642b4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2814a9eb-21ec-4187-988f-6a7441d71c59',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4765',
  'x-ms-correlation-request-id',
  'c338e7db-5169-47ce-8733-36f088731b55',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043346Z:c338e7db-5169-47ce-8733-36f088731b55',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b325b53-a18d-4d13-a607-047ecb520f00',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4764',
  'x-ms-correlation-request-id',
  '92f95416-0496-4891-92c4-c5f5996503ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043346Z:92f95416-0496-4891-92c4-c5f5996503ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '65c8521c-5d70-4124-95e1-2b80d75388c4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4763',
  'x-ms-correlation-request-id',
  '663dd110-7646-4f50-ab17-a3e80be7a43d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043347Z:663dd110-7646-4f50-ab17-a3e80be7a43d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ebe4f804-890a-4643-9531-9bea53b79781',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4762',
  'x-ms-correlation-request-id',
  '25a2e9b1-3ea3-41ec-b773-19f96936b314',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043347Z:25a2e9b1-3ea3-41ec-b773-19f96936b314',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '88db5166-7864-4747-847e-727f784cb925',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4761',
  'x-ms-correlation-request-id',
  'dc5063b0-285e-4976-8358-17492fdcafea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043347Z:dc5063b0-285e-4976-8358-17492fdcafea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '849733af-6eff-40d8-b845-639e2512262d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4760',
  'x-ms-correlation-request-id',
  'a6cbffb0-4eb4-4b7d-8732-a4170e263b93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043348Z:a6cbffb0-4eb4-4b7d-8732-a4170e263b93',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '89d07ba7-3dc5-4d46-ab49-e4b703ab41fd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4759',
  'x-ms-correlation-request-id',
  '11ba19f3-5068-4e70-82ce-e284c93d3077',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043348Z:11ba19f3-5068-4e70-82ce-e284c93d3077',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7e15bb0d-3fb5-4f83-bfeb-532fd1edb75c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4758',
  'x-ms-correlation-request-id',
  '46550dc9-ebb8-4ab7-b874-51783c10c931',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043348Z:46550dc9-ebb8-4ab7-b874-51783c10c931',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '162a5578-d0de-4c21-9268-9a2e1e914d93',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4757',
  'x-ms-correlation-request-id',
  'f2818984-95d4-472a-b0e5-f84db235c795',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043349Z:f2818984-95d4-472a-b0e5-f84db235c795',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '35149b8a-0206-4586-a819-8a5c5ad7e47a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4756',
  'x-ms-correlation-request-id',
  '4445066e-75cb-4d91-8422-7dd9561ae477',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043349Z:4445066e-75cb-4d91-8422-7dd9561ae477',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '67910841-ed4f-44df-be8c-5c6a68163f43',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4755',
  'x-ms-correlation-request-id',
  'bd1f6b48-4368-435b-a1ef-45519dc02c71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043350Z:bd1f6b48-4368-435b-a1ef-45519dc02c71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df649ebf-bcab-4343-ba7c-54c3b3952d86',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4754',
  'x-ms-correlation-request-id',
  '33a34f69-4105-4293-9047-7c71ab4cd369',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043350Z:33a34f69-4105-4293-9047-7c71ab4cd369',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bee4250f-b6a6-4d9b-ade7-ae4cbad47920',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4753',
  'x-ms-correlation-request-id',
  '11566495-e743-47b2-8edf-e2447c9a432b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043350Z:11566495-e743-47b2-8edf-e2447c9a432b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9d8e1ee6-37ef-41f0-9cc1-0cbb573c654c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4752',
  'x-ms-correlation-request-id',
  '00d1da5d-4580-4752-b2ba-b8db6cbba8ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043351Z:00d1da5d-4580-4752-b2ba-b8db6cbba8ea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f74fc40b-cde1-44d7-8a1e-48fb85d7277c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4751',
  'x-ms-correlation-request-id',
  '9c623b7f-c29f-4c75-b9bc-ee8c8b62c7d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043351Z:9c623b7f-c29f-4c75-b9bc-ee8c8b62c7d4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b85dd320-11d4-474f-ba4d-5d8617b57ee2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4750',
  'x-ms-correlation-request-id',
  'df1602d5-204d-4744-951b-abbaa678284b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043352Z:df1602d5-204d-4744-951b-abbaa678284b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '269c9369-9c1c-4fe8-8a4a-dbb2c7b1959d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4749',
  'x-ms-correlation-request-id',
  '5791e8c9-8bea-465d-b0c2-28fd78d77ff7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043352Z:5791e8c9-8bea-465d-b0c2-28fd78d77ff7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f2f41d37-8095-4bc5-bd4a-285f80ecde80',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4748',
  'x-ms-correlation-request-id',
  '7d8cd4ee-73a5-4798-b758-be6545965d54',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043352Z:7d8cd4ee-73a5-4798-b758-be6545965d54',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb0f0046-b7c8-4b98-aae8-34e0ade08200',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4747',
  'x-ms-correlation-request-id',
  '043d9ae2-49f6-4d7c-9fd3-f56e9dca7a4e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043353Z:043d9ae2-49f6-4d7c-9fd3-f56e9dca7a4e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9d4afa11-580e-44cd-a6fe-af45174d5a6c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4746',
  'x-ms-correlation-request-id',
  '06abbce3-f0c1-4511-89cc-b6d92717d06e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043353Z:06abbce3-f0c1-4511-89cc-b6d92717d06e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0130a03a-af7a-44be-b5b7-d94f464cf346',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4745',
  'x-ms-correlation-request-id',
  'a30051fd-4689-49a1-b2ae-6a6d88b33caf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043353Z:a30051fd-4689-49a1-b2ae-6a6d88b33caf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '42c2baed-0a62-4fc4-9c1d-56288e9724f6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4744',
  'x-ms-correlation-request-id',
  'c17135dd-ad9b-4334-8e85-df05b9d3d1a7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043354Z:c17135dd-ad9b-4334-8e85-df05b9d3d1a7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c164947d-ef28-4a9e-8ea1-41057de0f911',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4743',
  'x-ms-correlation-request-id',
  '0d5dc40a-5482-40c3-86b6-38ad81caf3dc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043354Z:0d5dc40a-5482-40c3-86b6-38ad81caf3dc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3173f270-b3f0-43a2-83db-e603b6f73c65',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4742',
  'x-ms-correlation-request-id',
  '6871d7e3-5915-46ea-aded-8e5878b00a15',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043355Z:6871d7e3-5915-46ea-aded-8e5878b00a15',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8011dc32-153e-432b-b5fd-372b4bf6f3b1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4741',
  'x-ms-correlation-request-id',
  '62c80767-b433-4967-be74-a563fe9a1ae7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043355Z:62c80767-b433-4967-be74-a563fe9a1ae7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fdbeae4f-29e6-4f86-8d5c-165ce74b5fee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4740',
  'x-ms-correlation-request-id',
  'e81f1e25-a324-41f8-932e-23d2c7e81c41',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043355Z:e81f1e25-a324-41f8-932e-23d2c7e81c41',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '032f02f6-f85a-451d-8d98-05f87f276f0a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4739',
  'x-ms-correlation-request-id',
  'c1cf1b34-8fe0-43ba-90f9-b69ecf4016d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043356Z:c1cf1b34-8fe0-43ba-90f9-b69ecf4016d3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '58289ea6-306d-46d1-bde4-fc7d4edf7dac',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4738',
  'x-ms-correlation-request-id',
  'd958eb30-b118-48f8-ba3a-d36b2308443c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043356Z:d958eb30-b118-48f8-ba3a-d36b2308443c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d68a3ff-6ad9-42cd-9683-edf261a8d92d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4737',
  'x-ms-correlation-request-id',
  '649003bb-d253-4574-877a-164d3d8cec53',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043357Z:649003bb-d253-4574-877a-164d3d8cec53',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4d6760d2-42cc-4f85-9bb3-12a4841589cc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4736',
  'x-ms-correlation-request-id',
  '4d603945-4c46-4f20-a604-ba41e85fb432',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043357Z:4d603945-4c46-4f20-a604-ba41e85fb432',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0f0945de-f077-4727-9790-9945902f3c7f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4735',
  'x-ms-correlation-request-id',
  'fb327222-8416-41f5-978f-75efce58c369',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043357Z:fb327222-8416-41f5-978f-75efce58c369',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e1e0df94-e7df-4e34-88cd-5c28f4781f32',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4734',
  'x-ms-correlation-request-id',
  '44a95e73-f765-4520-87e1-3c239153ad33',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043358Z:44a95e73-f765-4520-87e1-3c239153ad33',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '45f4a65b-1de5-482b-ad1d-cc661d40b336',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4733',
  'x-ms-correlation-request-id',
  'a4badc4d-0978-47fe-9bfa-16dbb1f115d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043358Z:a4badc4d-0978-47fe-9bfa-16dbb1f115d4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd2fc4604-ee85-426d-ac92-8185b3067bd4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4732',
  'x-ms-correlation-request-id',
  '2704b869-39fd-4a26-8b95-914890e1e468',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043358Z:2704b869-39fd-4a26-8b95-914890e1e468',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'be3b77b9-712a-4943-ada9-b6f7e558f29e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4731',
  'x-ms-correlation-request-id',
  '73f0975f-fbab-4a60-9e77-db79cd3c4651',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043359Z:73f0975f-fbab-4a60-9e77-db79cd3c4651',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a78bb813-2ff6-4b39-98eb-2ed784337168',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4730',
  'x-ms-correlation-request-id',
  'e97f10ea-b4ea-47ad-89da-707cc9543fc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043359Z:e97f10ea-b4ea-47ad-89da-707cc9543fc1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dded63b8-dfee-4674-ad68-32c9383b2fba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4729',
  'x-ms-correlation-request-id',
  '13e41451-debf-4cb3-91f5-4680d8bc355a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043400Z:13e41451-debf-4cb3-91f5-4680d8bc355a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3cbb722d-e374-448a-a227-38612e97257e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4728',
  'x-ms-correlation-request-id',
  'f33ed219-7cbc-4070-904a-58e401712511',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043400Z:f33ed219-7cbc-4070-904a-58e401712511',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:33:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9f6ba86f-c49d-4f1a-9b32-2d5ed1973305',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4727',
  'x-ms-correlation-request-id',
  '930a728c-0a79-46d8-8bf4-4fecae080dc7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043400Z:930a728c-0a79-46d8-8bf4-4fecae080dc7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb49855e-0996-4a97-b717-d4979f969abe',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4726',
  'x-ms-correlation-request-id',
  'bc99839e-b66c-4829-9aed-245ad26d41b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043401Z:bc99839e-b66c-4829-9aed-245ad26d41b2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ffb3fab-9bcd-4bda-8def-a4f2d256f813',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4725',
  'x-ms-correlation-request-id',
  'd09a6dab-30e0-4a73-b714-c12b731377aa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043401Z:d09a6dab-30e0-4a73-b714-c12b731377aa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ad253ed-e2b9-4aab-8db3-5c153f644271',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4724',
  'x-ms-correlation-request-id',
  'e13a21fb-c9bc-467a-9578-b36b601906fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043402Z:e13a21fb-c9bc-467a-9578-b36b601906fd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e52b9d39-bbf8-4471-9924-c9498ad80ea5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4723',
  'x-ms-correlation-request-id',
  '7b6f2b1d-edc9-49ac-a2be-a78592251008',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043402Z:7b6f2b1d-edc9-49ac-a2be-a78592251008',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1b818d14-f6ba-4fbd-8ce7-91d3740948b5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4722',
  'x-ms-correlation-request-id',
  '6f23f19e-d3c7-4552-892b-51aea5382c30',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043402Z:6f23f19e-d3c7-4552-892b-51aea5382c30',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '36cf6ab6-d559-4e9e-bde2-1e95762a33f7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4721',
  'x-ms-correlation-request-id',
  '0e756076-a751-4334-a231-f87b2a4dde11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043403Z:0e756076-a751-4334-a231-f87b2a4dde11',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cd9454b0-bb81-4402-a4e6-679ad7db447e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4720',
  'x-ms-correlation-request-id',
  '944b712c-0cc1-441b-8d36-65666859b018',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043403Z:944b712c-0cc1-441b-8d36-65666859b018',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '469233e0-7adf-4813-933d-06601ccd7ac6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4719',
  'x-ms-correlation-request-id',
  '57a7919a-fc45-40b6-9339-518825fb52e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043404Z:57a7919a-fc45-40b6-9339-518825fb52e2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '54f15b54-38fd-482d-a1a5-8bcd07a73d8e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4718',
  'x-ms-correlation-request-id',
  '1db45cd7-6bd1-47e8-bf43-350580d6227a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043404Z:1db45cd7-6bd1-47e8-bf43-350580d6227a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '925f0fc5-21e6-4fb3-9864-e6f7becfde10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4717',
  'x-ms-correlation-request-id',
  'c6c1bd82-302e-4857-84ea-0edebb765435',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043404Z:c6c1bd82-302e-4857-84ea-0edebb765435',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ea5b52a-02b3-46ed-9644-7787c506ceba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4716',
  'x-ms-correlation-request-id',
  '54e86c1a-9c9f-42c6-9dd9-d78d72ddf5c8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043405Z:54e86c1a-9c9f-42c6-9dd9-d78d72ddf5c8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '51613811-83bb-4d47-943c-23a20ae0df5c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4715',
  'x-ms-correlation-request-id',
  '53871c1e-0a6f-4a01-b1c2-1eefa894f15a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043405Z:53871c1e-0a6f-4a01-b1c2-1eefa894f15a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3c3191bb-de90-4b2c-b166-e4124ad3efd8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4714',
  'x-ms-correlation-request-id',
  '4db09dac-22ea-4bb1-9da8-7f5ee04ee146',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043406Z:4db09dac-22ea-4bb1-9da8-7f5ee04ee146',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c4c3b46f-b349-48dd-b04a-6b3b991bb8ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4713',
  'x-ms-correlation-request-id',
  '8d2f14f1-6920-4158-9d57-9fadf1aa1a15',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043406Z:8d2f14f1-6920-4158-9d57-9fadf1aa1a15',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '93f1d66d-4d4d-4f4f-a1ed-f994f4cd29f9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4712',
  'x-ms-correlation-request-id',
  'bd023018-2219-4436-99dd-d14c098fdf19',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043406Z:bd023018-2219-4436-99dd-d14c098fdf19',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6f397371-4ccd-4e9e-9439-cc0f975b7284',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4711',
  'x-ms-correlation-request-id',
  '8472f2e2-1264-4cc8-a8d6-14cf495789ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043407Z:8472f2e2-1264-4cc8-a8d6-14cf495789ed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f88dc297-cf32-4544-a2cd-c8abd9d7feee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4710',
  'x-ms-correlation-request-id',
  'fa3a1141-f71a-442a-807a-4a6be3aab93e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043407Z:fa3a1141-f71a-442a-807a-4a6be3aab93e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '31456266-7728-4ed6-b8b5-19f93f06b5a9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4709',
  'x-ms-correlation-request-id',
  'a474b9d9-d58a-4ef9-87ae-1adc81dd4ba5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043408Z:a474b9d9-d58a-4ef9-87ae-1adc81dd4ba5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9f735c14-38d9-4e34-a3b3-be48e27c8789',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4708',
  'x-ms-correlation-request-id',
  'd4662166-9f30-4b20-84e3-06ae100b3248',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043408Z:d4662166-9f30-4b20-84e3-06ae100b3248',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '79deca78-5293-41b4-a489-e75e62bf4998',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4707',
  'x-ms-correlation-request-id',
  '4948c8d2-cf8d-4383-97bf-12cc774c4c5a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043408Z:4948c8d2-cf8d-4383-97bf-12cc774c4c5a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a419a10e-df42-4286-b466-5288f7a27bc9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4706',
  'x-ms-correlation-request-id',
  '649bf391-648a-4feb-b6e8-3a6a327c968b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043409Z:649bf391-648a-4feb-b6e8-3a6a327c968b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cc42cd76-935b-4c58-aff9-13899ec9b098',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4705',
  'x-ms-correlation-request-id',
  '73eb5b90-3c4b-4161-8fbe-a12840d24666',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043409Z:73eb5b90-3c4b-4161-8fbe-a12840d24666',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c75ebc82-060e-48e3-a714-bde5036d3d0d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4704',
  'x-ms-correlation-request-id',
  'b8feb03c-ed8e-4301-84e0-7b8273109249',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043409Z:b8feb03c-ed8e-4301-84e0-7b8273109249',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7a56ef33-298a-433f-a7de-08842bd558db',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4703',
  'x-ms-correlation-request-id',
  'f9c0edbe-0e3e-4a3c-a58d-d227f849f302',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043410Z:f9c0edbe-0e3e-4a3c-a58d-d227f849f302',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '82003541-f6bc-4a10-bc14-ff5770166445',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4702',
  'x-ms-correlation-request-id',
  'beefb793-c431-4c4b-bae7-c84b04b9e5c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043410Z:beefb793-c431-4c4b-bae7-c84b04b9e5c4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a928e625-2b7f-4ddc-ba86-be286b45a2c2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4701',
  'x-ms-correlation-request-id',
  'c3e0bbb0-10f5-4b73-8ec8-1dbdd5c6fd87',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043411Z:c3e0bbb0-10f5-4b73-8ec8-1dbdd5c6fd87',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bbfaf405-7d1f-480d-97e5-f01eab6c65dd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4700',
  'x-ms-correlation-request-id',
  '3867d3e8-6249-4370-974d-76fe386c48ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043411Z:3867d3e8-6249-4370-974d-76fe386c48ba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04c0fc89-144a-4717-b31e-246f0f9ae933',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4699',
  'x-ms-correlation-request-id',
  '5b7f11d5-dd4b-47f3-a641-4e91337336e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043412Z:5b7f11d5-dd4b-47f3-a641-4e91337336e6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '392dd695-91e6-48ba-9003-ad4d0e22a5ac',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4698',
  'x-ms-correlation-request-id',
  '53d7ad5d-71fd-431c-9194-00f259416b21',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043412Z:53d7ad5d-71fd-431c-9194-00f259416b21',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ea1bd6f-edbb-4757-8d78-f90462fa23ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4697',
  'x-ms-correlation-request-id',
  'a0c8fb07-30c9-406e-b4a8-fe2b60dd7baa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043412Z:a0c8fb07-30c9-406e-b4a8-fe2b60dd7baa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '18c6fb6f-f094-4afe-9daa-6c4ce5121cb9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4696',
  'x-ms-correlation-request-id',
  '5c53a08c-3d6d-439b-b566-9cc22c2e093a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043413Z:5c53a08c-3d6d-439b-b566-9cc22c2e093a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a7fd2332-da37-47a1-91bf-1eb804c6a848',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4695',
  'x-ms-correlation-request-id',
  '6fb27a34-4018-4d56-bf10-64c9dead9058',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043414Z:6fb27a34-4018-4d56-bf10-64c9dead9058',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1ab77c53-2507-420e-94b1-43c1242af927',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4694',
  'x-ms-correlation-request-id',
  '919a5500-df68-4d2d-9509-71ed8c2e1f96',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043415Z:919a5500-df68-4d2d-9509-71ed8c2e1f96',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '098a3026-ee05-463b-8a9b-a18398d5f0b5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4693',
  'x-ms-correlation-request-id',
  'ea6765ad-dfc1-4dc8-a5a6-ab17b2aeedf3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043415Z:ea6765ad-dfc1-4dc8-a5a6-ab17b2aeedf3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f0acbf3f-bbeb-4713-9b55-5e0eb1e651cf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4692',
  'x-ms-correlation-request-id',
  'e8423b1c-2f13-4748-9fae-baa02b5d2612',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043416Z:e8423b1c-2f13-4748-9fae-baa02b5d2612',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '449da33b-6df5-41f7-b89e-3ea14648206c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4691',
  'x-ms-correlation-request-id',
  '7da54efe-af0d-499f-a2cb-2acfb481b512',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043416Z:7da54efe-af0d-499f-a2cb-2acfb481b512',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9c53ca04-38e9-47d3-a84f-c15526881731',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4690',
  'x-ms-correlation-request-id',
  'cd60dad0-c56e-4d74-9382-79ba170bf6bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043417Z:cd60dad0-c56e-4d74-9382-79ba170bf6bc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '162fcaab-534f-41ad-b8f0-653a5a62ddb3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4689',
  'x-ms-correlation-request-id',
  '86e26937-f574-45fd-a304-276e7e3a6d49',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043417Z:86e26937-f574-45fd-a304-276e7e3a6d49',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c828351e-395a-405f-9a75-bc827a07156a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4688',
  'x-ms-correlation-request-id',
  '437c0ee0-3e46-4e1a-b71f-0f168d0f17cb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043417Z:437c0ee0-3e46-4e1a-b71f-0f168d0f17cb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '92dd6e0d-6dac-46fd-8116-45894c4ad5c0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4687',
  'x-ms-correlation-request-id',
  'cc4866a7-746a-4529-bdb5-53638d4f5bf6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043418Z:cc4866a7-746a-4529-bdb5-53638d4f5bf6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f48e0f57-e7ca-4422-955b-bb0ca2a6f48e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4686',
  'x-ms-correlation-request-id',
  '5725f6d3-70d4-4e98-bd8a-f1ea76cc4093',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043418Z:5725f6d3-70d4-4e98-bd8a-f1ea76cc4093',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '68a18fb5-a887-481c-85b4-b09bc27bac40',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4685',
  'x-ms-correlation-request-id',
  '65fbe74a-ae4b-4327-8d4e-c308081ae58f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043419Z:65fbe74a-ae4b-4327-8d4e-c308081ae58f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9d951b16-e8ad-47ec-bb13-21c9e3a64cb9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4684',
  'x-ms-correlation-request-id',
  'ba60c2d1-d312-421b-9e77-5a024585f53b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043419Z:ba60c2d1-d312-421b-9e77-5a024585f53b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '52c52d8d-0ab9-4e28-8cae-5be770a9ca4c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4683',
  'x-ms-correlation-request-id',
  '528c9d71-4eac-42e8-8305-7705ac4199c8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043419Z:528c9d71-4eac-42e8-8305-7705ac4199c8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a668e3ac-5321-4f5e-9ddf-027c0053d3c6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4682',
  'x-ms-correlation-request-id',
  '24781fe3-1f39-4fee-8cea-ee38aacca60c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043420Z:24781fe3-1f39-4fee-8cea-ee38aacca60c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '84d84ae8-1db1-40f4-b4db-49c4e100a65c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4681',
  'x-ms-correlation-request-id',
  'f33d5e79-c8f6-40af-85c9-11cbb6cf5a58',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043420Z:f33d5e79-c8f6-40af-85c9-11cbb6cf5a58',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV83YjRkYzE0')
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
  '68634bda-a986-4145-895a-b24d3dc039cb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4680',
  'x-ms-correlation-request-id',
  'f4d23577-7565-427f-a9da-cc383067c5a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043420Z:f4d23577-7565-427f-a9da-cc383067c5a1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2","name":"myservicexxx2","type":"Microsoft.ApiManagement/deletedservices","location":"East US","properties":{"serviceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx2","scheduledPurgeDate":"2021-09-23T04:34:21.2408191Z","deletionDate":"2021-09-23T04:34:19.5106008Z"}}, [
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd9cacf7f-ec14-4218-9c91-8f7892450757',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'c057ebb6-cd8c-4dab-8b3e-4c4a3f075e2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043421Z:c057ebb6-cd8c-4dab-8b3e-4c4a3f075e2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:21 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a5df0f63-6f11-4cf3-a9c4-960b97911465',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4679',
  'x-ms-correlation-request-id',
  'e234758d-0ae3-4c0f-bfa2-1c6b20817b45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043421Z:e234758d-0ae3-4c0f-bfa2-1c6b20817b45',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c978dea9-b006-4ebe-9fdb-873c5a45af24',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4678',
  'x-ms-correlation-request-id',
  '8aa69a73-a3bd-4e63-81f4-167e69692506',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043422Z:8aa69a73-a3bd-4e63-81f4-167e69692506',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd5e65d4f-8c1f-4f48-b6ed-3fa02c6ba76c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4677',
  'x-ms-correlation-request-id',
  '63ab594a-9a11-451a-a12d-0127b83a2ce1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043422Z:63ab594a-9a11-451a-a12d-0127b83a2ce1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b48cdb70-6a45-49a1-9174-0cc8a02ef0d1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4676',
  'x-ms-correlation-request-id',
  '5a77d0f7-ad6e-45c5-abff-d8fa73c2af7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043423Z:5a77d0f7-ad6e-45c5-abff-d8fa73c2af7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '45fcb8a8-8e85-4217-8409-2cca041c4959',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4675',
  'x-ms-correlation-request-id',
  '20fa6bf4-ad0f-41c8-98b9-1f44e8c34c38',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043423Z:20fa6bf4-ad0f-41c8-98b9-1f44e8c34c38',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3b5988f1-cf35-4f20-89b6-73f5d634864c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4674',
  'x-ms-correlation-request-id',
  '31c7449a-a613-4ac4-b72f-eebd37c98e76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043423Z:31c7449a-a613-4ac4-b72f-eebd37c98e76',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e180f9ae-6f90-48c6-9ac3-d33becd5de28',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4673',
  'x-ms-correlation-request-id',
  '7b0927d0-617c-4e43-a9e2-11cf171adc9e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043424Z:7b0927d0-617c-4e43-a9e2-11cf171adc9e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '94ff0894-61f6-48d7-812d-478a2465f66c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4672',
  'x-ms-correlation-request-id',
  '1251f269-cba4-4d39-97ed-ac10b609436d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043424Z:1251f269-cba4-4d39-97ed-ac10b609436d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ff752b6-d626-43d3-8b1d-5af8d3e9bc16',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4671',
  'x-ms-correlation-request-id',
  '393d47d3-9c3d-45b6-a5ea-8bb0c3a97447',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043424Z:393d47d3-9c3d-45b6-a5ea-8bb0c3a97447',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bef55a31-271c-43df-b86a-7b1911362235',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4670',
  'x-ms-correlation-request-id',
  '59005b89-f057-4901-8f25-26dc85cc144c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043425Z:59005b89-f057-4901-8f25-26dc85cc144c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '347e3f91-0440-42ed-809f-85e4e2ee14bf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4669',
  'x-ms-correlation-request-id',
  '4d637e4f-3097-4fbd-a4fc-707f6e87a9fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043425Z:4d637e4f-3097-4fbd-a4fc-707f6e87a9fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f06d634d-0d92-4169-a592-18870500b1a8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4668',
  'x-ms-correlation-request-id',
  '8a5ddfa6-9bb2-4468-839a-bee833aec86f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043426Z:8a5ddfa6-9bb2-4468-839a-bee833aec86f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f1b055aa-a27c-4c1a-9760-871cf224fab4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4667',
  'x-ms-correlation-request-id',
  'cda3b488-1201-4ec0-acf1-0df61f74b964',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043426Z:cda3b488-1201-4ec0-acf1-0df61f74b964',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bdc21f5a-73cc-41a7-9795-cec259927af9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4666',
  'x-ms-correlation-request-id',
  'b3f33825-eec8-4d36-8b34-16d82257d4cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043426Z:b3f33825-eec8-4d36-8b34-16d82257d4cd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fa1dabf5-661d-4870-96bf-7d5f482d465f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4665',
  'x-ms-correlation-request-id',
  '53d9f4b2-4326-4ff6-a10c-f93621b10984',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043427Z:53d9f4b2-4326-4ff6-a10c-f93621b10984',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ed662919-2d5a-4e4c-a693-ae48d945ee23',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4664',
  'x-ms-correlation-request-id',
  '7859dbcf-a996-4835-9e0e-de245acae8be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043427Z:7859dbcf-a996-4835-9e0e-de245acae8be',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b4f60a3-9694-4398-bdda-2ab0f7d7d96b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4663',
  'x-ms-correlation-request-id',
  '0c53adca-799a-478e-ac9c-6928fb9980eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043428Z:0c53adca-799a-478e-ac9c-6928fb9980eb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '43df0a89-ac96-48c3-bd28-11bef1c402df',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4662',
  'x-ms-correlation-request-id',
  '0f3bd8c8-8016-4df5-a93c-f39c1608e909',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043428Z:0f3bd8c8-8016-4df5-a93c-f39c1608e909',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2de5ea57-1197-4fd2-923f-972b74b4204a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4661',
  'x-ms-correlation-request-id',
  '490a4cc1-7a46-443a-89b2-4eceb18c9f83',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043428Z:490a4cc1-7a46-443a-89b2-4eceb18c9f83',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0ce0c97b-e6e7-4162-99f2-e18653d9be9b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4660',
  'x-ms-correlation-request-id',
  '3a0477ed-d0b7-4cfc-87ab-b7370c1aca37',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043429Z:3a0477ed-d0b7-4cfc-87ab-b7370c1aca37',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4a293b27-36dc-43eb-8bcb-53804dff52a5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4659',
  'x-ms-correlation-request-id',
  '9860dee1-2787-45e3-aff3-47885e21a855',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043429Z:9860dee1-2787-45e3-aff3-47885e21a855',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '095a3a05-47c8-4f2e-8712-4d6de49c86b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4658',
  'x-ms-correlation-request-id',
  '64cdf638-744e-4618-a5fb-d0203a2dd1d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043429Z:64cdf638-744e-4618-a5fb-d0203a2dd1d7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4d36d043-6ff9-45fb-93bc-3cf4523eba0a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4657',
  'x-ms-correlation-request-id',
  '96de92f6-a846-49c3-8caa-4f81c599834c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043430Z:96de92f6-a846-49c3-8caa-4f81c599834c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '74593e3e-47fb-40f4-be56-04a22313304d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4656',
  'x-ms-correlation-request-id',
  '42282c7c-0e28-46f5-891a-0598527ca62b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043430Z:42282c7c-0e28-46f5-891a-0598527ca62b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '85afed2c-f58b-4b18-99d8-8bb667e94a24',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4655',
  'x-ms-correlation-request-id',
  '66a31365-f395-45c6-add2-5ba7b344f538',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043431Z:66a31365-f395-45c6-add2-5ba7b344f538',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dc2b0968-7edf-4025-94ff-a07a4fb8fa1f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4654',
  'x-ms-correlation-request-id',
  '553e07d2-6835-4d8d-bdd6-84a39687e3fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043431Z:553e07d2-6835-4d8d-bdd6-84a39687e3fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0a2d3ab9-2727-402a-86a3-d8c96e672a45',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4653',
  'x-ms-correlation-request-id',
  '3ac13dc5-06c8-4ff0-8fd6-18e92e97dbd7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043431Z:3ac13dc5-06c8-4ff0-8fd6-18e92e97dbd7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0fb5e694-ecdf-44f1-a249-ce3625a63b55',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4652',
  'x-ms-correlation-request-id',
  '325d671c-d3fb-481e-a5b0-7344fce02fcc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043432Z:325d671c-d3fb-481e-a5b0-7344fce02fcc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd819118b-b653-4485-8aee-89d7ed616e27',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4651',
  'x-ms-correlation-request-id',
  'e0056da1-e9ff-477f-a39a-cda48196ef79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043432Z:e0056da1-e9ff-477f-a39a-cda48196ef79',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5dfb444b-c494-485d-a297-4a93c4379d4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4650',
  'x-ms-correlation-request-id',
  '645aa1b3-56d9-4d0a-9123-0caeda9ab726',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043433Z:645aa1b3-56d9-4d0a-9123-0caeda9ab726',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5bb1eff0-521c-4f0f-acd5-f6203e0bb278',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4649',
  'x-ms-correlation-request-id',
  'a8aff920-e21c-44ec-99ec-77d98cfb71a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043433Z:a8aff920-e21c-44ec-99ec-77d98cfb71a6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cce58fb3-35cf-466a-81b9-90b4df285bb4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4648',
  'x-ms-correlation-request-id',
  'fed399ec-f7e4-479f-8936-7dc2d5e07de3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043433Z:fed399ec-f7e4-479f-8936-7dc2d5e07de3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f768a3ab-13b2-48c2-b924-ba50578a4569',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4647',
  'x-ms-correlation-request-id',
  '56a554b5-272b-4550-b568-405ef8434567',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043434Z:56a554b5-272b-4550-b568-405ef8434567',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '06532029-3214-4c93-b9cd-324a83f029f9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4646',
  'x-ms-correlation-request-id',
  '95f602be-ee1a-4ebc-93d3-356731e55c18',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043434Z:95f602be-ee1a-4ebc-93d3-356731e55c18',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9ab019cf-bd24-4df9-b836-e519a675c67a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4645',
  'x-ms-correlation-request-id',
  '2c8cdbd9-4b41-48d5-b8b8-94a63dc56788',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043434Z:2c8cdbd9-4b41-48d5-b8b8-94a63dc56788',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c04e0179-0762-43ff-af6c-238ff22799d8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4644',
  'x-ms-correlation-request-id',
  'dc6e035e-abfd-488c-89d5-ac12ba32ba7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043435Z:dc6e035e-abfd-488c-89d5-ac12ba32ba7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '612848d4-0f76-46a7-a7b9-4630bd5f9f16',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4643',
  'x-ms-correlation-request-id',
  '48b0a9b7-b1eb-4f25-ba3a-aa7e1fef2769',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043435Z:48b0a9b7-b1eb-4f25-ba3a-aa7e1fef2769',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '76b96c8e-9cca-453e-8b39-4a8b90371ad6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4642',
  'x-ms-correlation-request-id',
  'db36ac2d-1f31-4279-827e-833e923c954d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043436Z:db36ac2d-1f31-4279-827e-833e923c954d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c75a71f4-b207-47a5-b7de-07a16ff48c10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4641',
  'x-ms-correlation-request-id',
  '3dd8e71f-daa5-47c1-9532-6cac59a7ad74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043436Z:3dd8e71f-daa5-47c1-9532-6cac59a7ad74',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ed2351c-986b-43f1-8c15-28d2d5eec55e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4640',
  'x-ms-correlation-request-id',
  'f0edf94b-78d0-47cc-bc89-faa2c7f79ac8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043436Z:f0edf94b-78d0-47cc-bc89-faa2c7f79ac8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a90658bb-3c31-4506-8202-34907792b15e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4639',
  'x-ms-correlation-request-id',
  '008c6903-64e8-43bb-b754-878737ff7316',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043437Z:008c6903-64e8-43bb-b754-878737ff7316',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4807cfac-2e90-44e0-b21b-0eade927bf1b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4638',
  'x-ms-correlation-request-id',
  'b33446a9-6fd4-4ab4-a89f-b2bd32f0dad2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043437Z:b33446a9-6fd4-4ab4-a89f-b2bd32f0dad2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3fa4a150-6cd0-4025-af5f-28237183028c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4637',
  'x-ms-correlation-request-id',
  '8bf3a2be-049b-45fc-bab9-4b31f17740ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043438Z:8bf3a2be-049b-45fc-bab9-4b31f17740ab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0bafdfab-8a54-47d3-abf9-e1be34379b28',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4636',
  'x-ms-correlation-request-id',
  '8678588d-c069-4227-9357-266797790daa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043438Z:8678588d-c069-4227-9357-266797790daa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4de29986-2686-48ea-adf3-7fc18d9d1edf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4635',
  'x-ms-correlation-request-id',
  'c9b25f54-1e2c-45d7-ae18-505e58b9028c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043438Z:c9b25f54-1e2c-45d7-ae18-505e58b9028c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78b1b37a-9bb4-4afc-b897-cb903ca97094',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4634',
  'x-ms-correlation-request-id',
  'c198e763-0a66-4ecc-b290-59a92dbd29a9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043439Z:c198e763-0a66-4ecc-b290-59a92dbd29a9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f4976c89-85f0-4fea-829c-31ab5463eaee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4633',
  'x-ms-correlation-request-id',
  'ded18b5a-aff4-4f73-8969-a2fd62810ba4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043439Z:ded18b5a-aff4-4f73-8969-a2fd62810ba4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '83a86479-4e20-4c47-b39d-5c861af1f863',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4632',
  'x-ms-correlation-request-id',
  'b9da2551-70ef-469a-9246-b7913e13a661',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043440Z:b9da2551-70ef-469a-9246-b7913e13a661',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0445dc0a-9e3e-4eef-b544-005cc9280fa3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4631',
  'x-ms-correlation-request-id',
  '669eb855-2670-4285-ab16-c03f6f94ab71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043440Z:669eb855-2670-4285-ab16-c03f6f94ab71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '369604c3-58e3-4548-84a4-b03d7a02f305',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4630',
  'x-ms-correlation-request-id',
  'cf30b266-f2eb-41d6-b481-6a26132a2ec1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043440Z:cf30b266-f2eb-41d6-b481-6a26132a2ec1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '37341cc7-4f7f-45aa-9bed-f3c03b04f42d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4629',
  'x-ms-correlation-request-id',
  '886f8a8a-bf42-453a-a644-b35b2aae0ea1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043441Z:886f8a8a-bf42-453a-a644-b35b2aae0ea1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9a41e453-36d3-4ccc-b7be-d3f75902d5bb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4628',
  'x-ms-correlation-request-id',
  '3698b764-1d3f-4b33-b2af-946e5eb212fa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043441Z:3698b764-1d3f-4b33-b2af-946e5eb212fa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '524e82c3-7267-44ee-8daa-55ce3407ce0b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4627',
  'x-ms-correlation-request-id',
  'd7662839-db6e-4c64-8254-947560d0a717',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043442Z:d7662839-db6e-4c64-8254-947560d0a717',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '97e7d61c-2998-4347-a32b-bf1f07feaa64',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4626',
  'x-ms-correlation-request-id',
  'e35b968b-94b6-4748-918f-7a7ef6e29319',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043442Z:e35b968b-94b6-4748-918f-7a7ef6e29319',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0e75066c-bcc6-48d5-8ab5-51ae270f6586',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4625',
  'x-ms-correlation-request-id',
  'e81359ed-f02d-4bfa-883d-b7ccc9f972ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043442Z:e81359ed-f02d-4bfa-883d-b7ccc9f972ed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7466a0bb-c8dc-443e-87a8-f5c6a1e0b09e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4624',
  'x-ms-correlation-request-id',
  '84f7b045-4bb5-4ade-9002-e6ca8b2c9d62',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043443Z:84f7b045-4bb5-4ade-9002-e6ca8b2c9d62',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '47b55cb5-3fa9-4637-a2a1-45ec103a84a9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4623',
  'x-ms-correlation-request-id',
  'c08549d6-bdd9-435b-98ee-a2fb07725fc0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043443Z:c08549d6-bdd9-435b-98ee-a2fb07725fc0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3f5e8867-0ae8-4dde-abb2-3e67a017e31c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4622',
  'x-ms-correlation-request-id',
  '03efdb3c-bfb3-4cf1-9750-1493e06726d2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043444Z:03efdb3c-bfb3-4cf1-9750-1493e06726d2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '99e94ec5-623f-4382-9683-dfb17ebb7b4d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4621',
  'x-ms-correlation-request-id',
  'e4a5b3ee-e5c2-4d8f-b7f4-41396a433c61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043444Z:e4a5b3ee-e5c2-4d8f-b7f4-41396a433c61',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a1571431-1091-4dba-92a1-f0abd98c2f76',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4620',
  'x-ms-correlation-request-id',
  '89b2cde0-fd5c-40cc-b2ed-7616bca3f4ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043444Z:89b2cde0-fd5c-40cc-b2ed-7616bca3f4ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '26673776-b1a7-45cb-8b3c-73cecc5c5ed5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4619',
  'x-ms-correlation-request-id',
  'c602f5de-8400-4e90-9575-62f32505f873',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043445Z:c602f5de-8400-4e90-9575-62f32505f873',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a01e0260-8598-4398-b753-a2a34b073900',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4618',
  'x-ms-correlation-request-id',
  '60b659ab-fdae-4324-94de-6a00636f1592',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043445Z:60b659ab-fdae-4324-94de-6a00636f1592',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4e7c723d-c89e-47d7-b790-8538df4e0867',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4617',
  'x-ms-correlation-request-id',
  '3aa3dd43-832d-44cf-a844-8be0f6bd3521',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043445Z:3aa3dd43-832d-44cf-a844-8be0f6bd3521',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b52b965b-8053-4e2f-8a98-d60b6d0e4168',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4616',
  'x-ms-correlation-request-id',
  '24f63aa8-72c9-445f-bdc5-3a54acb15c7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043446Z:24f63aa8-72c9-445f-bdc5-3a54acb15c7e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1c57715e-dead-446c-9afa-21b19635f3be',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4615',
  'x-ms-correlation-request-id',
  'ccffd352-5f90-438b-89ee-bd25f2f933bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043446Z:ccffd352-5f90-438b-89ee-bd25f2f933bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f9b7a522-f3be-4739-81af-04186f660e50',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4614',
  'x-ms-correlation-request-id',
  '0758ee88-299a-43bf-ac5b-4b55035c6184',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043447Z:0758ee88-299a-43bf-ac5b-4b55035c6184',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx2/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDJfVGVybV9iMDQ0MDY0Ng==')
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
  '21a58247-16ee-452c-b105-21a4fb5e1dbf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4613',
  'x-ms-correlation-request-id',
  'f00e07d1-4c6e-46c5-891b-9a3787022b4a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043447Z:f00e07d1-4c6e-46c5-891b-9a3787022b4a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:34:47 GMT',
  'Content-Length',
  '0'
]);
