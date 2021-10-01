let nock = require('nock');

module.exports.hash = "c4e1e13024a84cf0e63c50355621f26e";

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
  '287c3834-52aa-4874-b1fb-28657dc00800',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtVQmF6Z8l1Gnqt9cptlAIQ; expires=Sun, 24-Oct-2021 09:04:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryMmBB2sdCe6wyTc1m_MbULm7sv3Eo0ROE3hIBiXr4LrEz6YLj_ctAtY-4P3Alg20A8R-6iEcM_S8ft4BZIhfqup2eSX__fe7zUgucsstavckVIpwkiBZCWrtun1c7CUAQ6i0zwmxwBpUPR-T_M377OjQorD1Guto7t100LzgGkwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:21 GMT',
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
  '287c3834-52aa-4874-b1fb-286580c00800',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuSG92YRuSBGls_fs-z-XNQ; expires=Sun, 24-Oct-2021 09:04:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfAlm2sC_-j0If0OCki6z3bViaAFjXlhADLYk5xa0_VjKbJkW2moiFaSAw0_Bp_IXupvVr-6EGfSdTm72Q9cVpPOdnri0CSZtcw0JmKQVLYFlRbvO2bgze9duLKiyD1dvqS7241Q8C12wOi2n5aEXjKgyTiEceplWUStUotycP2AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a1235147-d77a-457c-bd96-bf03fdcb30f0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '287c3834-52aa-4874-b1fb-286582c00800',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aoue5BiqmS1MpyeyhTyymqEWPr5BAQAAAJaL39gOAAAA; expires=Sun, 24-Oct-2021 09:04:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:22 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedfafa7aefa3d147cb6c911332dd8fdbeb153ebe011a1a6617cd478f7ef12f197d5456d30c43a1d74eb3a64dbf7a4d5fe7f43d7d70cccf93272fee7ef5197d4ae8aef2ba2d72bcfad16a3d298b669ed7a78bac28a9f57955fd9ed36ad952cfe369b5c00ba6c90b41975ad0a7cbaa2dce0be9f575bea4f11b08d9aa585c2cdaed6555e7abf2faf7c4c7e3ab6239abae9aec07eb3a377041b7865e2f9617afdbac05ecd7ebe934cf67f98cbe6fb3fa226f5f465ad197d33aa7df67c7ed57ed943ed9dbd9dbddde79b8bdb7ff66e7e0d1decea37b9f8e0ff6f6eeef3dbcff53d4fa82da5e65d75fd5c06fdeb6abe6d1dd7036c68cd936e13e5ee6ad7be5557e417d67e58657b773a2f8bad9ded91dd7daba076d55d5ed46206369d17b71965fe62526ec257fbf09826dda03b2b0cc439cb409846bd883d14c179bdea4af7bafccaba6058b9f54cbf3e2625d33af10d77def171b16a7c97d77ad2d95bb42b05d90f9725a11779c808199fbe895e5ba2c471fbdcdaf7f325b97ed1989b77c32758d5e664d7355d5f6ab657e41ec4b5f9c94050d3600779e954d1ebc6dde9ae5e7e8e175533e216e267efce8515bafa92d49ffb22dda6b8116c5e035ab0e1adf937541482e692cfeb7c4d86ba20c5efb25df277681c84dcf5e1ecf66a4751a88eaf73ebabf37de3d38183f7838de7df0e023b4aa8b4b7a39680608a38fb2d9ac00b1b3f2b92a06fbd56551b7ebac7c91b74490b7c1d49826d375d3560b9a1be225a3279c32fa2e8d9d24f91833136aa6f1e7840dc9ccf8753e5dd7448f31c168ab695536e33765b3bb43c37f06ead2e0bf0978bbdf203c9ad47b1f8edf49b1223d49d8916529f3a779b3fbe9c107037d924ddf9282f590c5e03f1cd938dc0f276a1fee0711d703438a81b4dbb74901ed596864fc42967e23aae545b544579e90111f0b7fcf8a269b94b97660259eb4cc4fd2e491209054346d9d15cb16acbf289684997e2530a85315d195ca9e137af94291392673d650c71f9d2ed125cc9a4aede972b6aaa807ea6b994f217ed44c2194597b5ed50bdbe5474d7bb98791366fd7c0084a953e25adb19c65a4d56898d92a9b12f13f7ab44bcd8c3e32007f40b4b0d09b6b725b164fb3360328b5a34fa8ed47e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff007d995794d2c7ab150d583488fdf6984817b1caf7c707bbf7f61eeeedc22a9759d37e51cd687a008ddadf1281f0bd28167e939b51f925bf","e4ff01d43eaf38170a0000"], [
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
  '"AAAAAABBN/U="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e2685c8b-1ae5-4146-9c3c-7ca6538f24ff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5593',
  'x-ms-correlation-request-id',
  'cd913cb2-bf44-4168-bc5f-305a54a2cd16',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090423Z:cd913cb2-bf44-4168-bc5f-305a54a2cd16',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:22 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2","name":"myserviceyyy2","type":"Microsoft.ApiManagement/service","tags":{},"location":"East US","etag":"AAAAAABBN/Y=","properties":{"publisherEmail":"foo@contoso.com","publisherName":"foo","notificationSenderEmail":"apimgmt-noreply@mail.windowsazure.com","provisioningState":"Succeeded","targetProvisioningState":"Deleting","createdAtUtc":"2021-09-24T08:20:36.8225295Z","gatewayUrl":"https://myserviceyyy2.azure-api.net","gatewayRegionalUrl":"https://myserviceyyy2-eastus-01.regional.azure-api.net","portalUrl":"https://myserviceyyy2.portal.azure-api.net","developerPortalUrl":"https://myserviceyyy2.developer.azure-api.net","managementApiUrl":"https://myserviceyyy2.management.azure-api.net","scmUrl":"https://myserviceyyy2.scm.azure-api.net","hostnameConfigurations":[{"type":"Proxy","hostName":"myserviceyyy2.azure-api.net","encodedCertificate":null,"keyVaultId":null,"certificatePassword":null,"negotiateClientCertificate":false,"certificate":null,"defaultSslBinding":true,"identityClientId":null,"certificateSource":"BuiltIn","certificateStatus":null}],"publicIPAddresses":["52.188.79.177"],"privateIPAddresses":null,"additionalLocations":null,"virtualNetworkConfiguration":null,"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2":"False"},"virtualNetworkType":"None","certificates":null,"disableGateway":false,"apiVersionConstraint":{"minApiVersion":null},"publicIpAddressId":null,"publicNetworkAccess":"Enabled","privateEndpointConnections":null,"platformVersion":"stv2"},"sku":{"name":"Standard","capacity":1},"identity":null,"zones":null,"systemData":{"createdBy":"azure_client_id","createdByType":"Application","createdAt":"2021-09-24T08:20:35.8132921Z","lastModifiedBy":"azure_client_id","lastModifiedByType":"Application","lastModifiedAt":"2021-09-24T08:20:35.8132921Z"}}, [
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
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a4559024-6a15-4d1b-8fe1-9d04b9ea93d8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  'dc8b0139-c3b8-4ff4-96d4-47a049593522',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090424Z:dc8b0139-c3b8-4ff4-96d4-47a049593522',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:23 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fbe5ff7a-abcb-4ef4-afb5-c4067fc790fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5592',
  'x-ms-correlation-request-id',
  '29d24dc2-e31c-4526-bc7d-0cf2ae022693',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090424Z:29d24dc2-e31c-4526-bc7d-0cf2ae022693',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a13bdf9-f3c0-447c-8c66-5ca45b5a3f29',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5591',
  'x-ms-correlation-request-id',
  'b4aa8a53-c0aa-4357-aa34-72c0a1180a59',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090424Z:b4aa8a53-c0aa-4357-aa34-72c0a1180a59',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96b24195-a1e8-4bd0-a579-bd045ef9ba97',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5590',
  'x-ms-correlation-request-id',
  'dae9bfee-22db-4e78-834a-5014db377b2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090425Z:dae9bfee-22db-4e78-834a-5014db377b2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a498d63d-a44f-47e4-b2b8-f5b5ab01cbfa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5589',
  'x-ms-correlation-request-id',
  '915c44d2-ceb6-47bd-9f8e-b4970a5b47d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090425Z:915c44d2-ceb6-47bd-9f8e-b4970a5b47d3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '295ebde8-90c6-43bf-a31f-a360fbcf3852',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5588',
  'x-ms-correlation-request-id',
  '44d3806c-4f1a-4d78-ae40-7d2202a910ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090425Z:44d3806c-4f1a-4d78-ae40-7d2202a910ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2edebdcf-227a-4212-a5a0-f5cae0d25c33',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5587',
  'x-ms-correlation-request-id',
  '531bba7a-b34e-4c9e-a1af-52906ba3276b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090426Z:531bba7a-b34e-4c9e-a1af-52906ba3276b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd7ab5948-7ef3-4ab0-93aa-1d2458b1551d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5586',
  'x-ms-correlation-request-id',
  '9229c94b-9f3b-419c-bed7-ec7dbe7d2e10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090426Z:9229c94b-9f3b-419c-bed7-ec7dbe7d2e10',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '12454d47-f349-4d8b-897b-1e13252cf6b9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5585',
  'x-ms-correlation-request-id',
  '023255aa-d555-4828-8092-01069c0862eb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090427Z:023255aa-d555-4828-8092-01069c0862eb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '10e4ad1d-db65-489a-850e-92a45a3ffb54',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5584',
  'x-ms-correlation-request-id',
  'be61ed12-08cf-49d9-8728-3a415328bcb1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090427Z:be61ed12-08cf-49d9-8728-3a415328bcb1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a317965a-a854-4648-94e2-862503f2fb7e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5583',
  'x-ms-correlation-request-id',
  '55a940a2-d601-44f7-bf07-82a11a5b9c08',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090427Z:55a940a2-d601-44f7-bf07-82a11a5b9c08',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '425112bb-ebbd-4b6b-8604-3197a3cf0ad4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5582',
  'x-ms-correlation-request-id',
  '1c04ff46-843e-4e0f-a705-f0ba611a2695',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090428Z:1c04ff46-843e-4e0f-a705-f0ba611a2695',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1e4200d6-1596-45a3-adcb-d0c79c21d703',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5581',
  'x-ms-correlation-request-id',
  'b8693bb5-ff26-49fb-8939-24188b922b44',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090428Z:b8693bb5-ff26-49fb-8939-24188b922b44',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f9fe4435-d912-48e8-82bf-1cdf5c651970',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5580',
  'x-ms-correlation-request-id',
  'e8c52c73-e9f2-4576-838e-443d7f8769fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090429Z:e8c52c73-e9f2-4576-838e-443d7f8769fd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '70c28223-0034-4c10-9173-42c5e24f20ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5579',
  'x-ms-correlation-request-id',
  'fd43d66b-1c30-4cdc-bdef-28da3e7fd457',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090429Z:fd43d66b-1c30-4cdc-bdef-28da3e7fd457',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6e6936d-ae2f-45de-befd-af6ec0763164',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5578',
  'x-ms-correlation-request-id',
  '7fe8f916-e1c6-4a89-a8ad-549b78c5dda0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090429Z:7fe8f916-e1c6-4a89-a8ad-549b78c5dda0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c7c83416-08e1-4835-8068-db287103a31a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5577',
  'x-ms-correlation-request-id',
  'e4f3904d-3912-4b7e-af20-8885be5df6fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090430Z:e4f3904d-3912-4b7e-af20-8885be5df6fd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '87f92d9a-8c20-46af-9532-40f6c1172004',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5576',
  'x-ms-correlation-request-id',
  '63c0b82b-3402-4658-8e90-c420ec89e466',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090430Z:63c0b82b-3402-4658-8e90-c420ec89e466',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ba245bd0-e247-440d-aa0e-790d04b3484c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5575',
  'x-ms-correlation-request-id',
  '515a4f1a-f9bb-472f-b3c8-ed7bbf5b20a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090430Z:515a4f1a-f9bb-472f-b3c8-ed7bbf5b20a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e35bcd37-dbcb-4114-bfba-848bdc99aa0c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5574',
  'x-ms-correlation-request-id',
  '928b13fd-2eca-4e14-aab5-750d627aa1dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090431Z:928b13fd-2eca-4e14-aab5-750d627aa1dd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6fe36604-205e-4d5a-b02d-c85f53c31f41',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5573',
  'x-ms-correlation-request-id',
  '81b9a446-64b0-48fc-bc8d-4565daff482d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090431Z:81b9a446-64b0-48fc-bc8d-4565daff482d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7e0509be-2c49-4a54-9d65-28e9a062077a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5572',
  'x-ms-correlation-request-id',
  'db64e57f-367e-431a-94ec-3c3973a3df01',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090432Z:db64e57f-367e-431a-94ec-3c3973a3df01',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c7badaa1-edcd-45e0-9cc9-8515d6661cb9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5571',
  'x-ms-correlation-request-id',
  'b4bfc87c-98b1-4ec6-8779-b552f313563f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090432Z:b4bfc87c-98b1-4ec6-8779-b552f313563f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04270a1f-a937-4a98-974b-eef8dc64f41a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5570',
  'x-ms-correlation-request-id',
  'b01b9d0b-3471-4af3-9f1e-f4333ed02737',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090432Z:b01b9d0b-3471-4af3-9f1e-f4333ed02737',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ab3fa4cc-0a38-4aa5-b90f-e64ac58c6c6f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5569',
  'x-ms-correlation-request-id',
  'd4e0e3e2-05f8-4ff0-8181-1a17a7e4f089',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090433Z:d4e0e3e2-05f8-4ff0-8181-1a17a7e4f089',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '342157ff-4e2f-4f0a-8c04-ad82278a864b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5568',
  'x-ms-correlation-request-id',
  'f1989fae-f3f7-436c-a375-1b62c5858231',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090433Z:f1989fae-f3f7-436c-a375-1b62c5858231',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ae281f2-04c5-4252-8e27-a4998c7e1d63',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5567',
  'x-ms-correlation-request-id',
  'd342be99-098e-434e-a9ab-fb867db48f26',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090434Z:d342be99-098e-434e-a9ab-fb867db48f26',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6f688536-0200-4782-ab6f-21f716be1de7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5566',
  'x-ms-correlation-request-id',
  '36b3bcc5-d6b7-4da0-905c-a0acb91c3e88',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090434Z:36b3bcc5-d6b7-4da0-905c-a0acb91c3e88',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc6167c4-a876-4c95-9655-f1e62a01d0d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5565',
  'x-ms-correlation-request-id',
  'dedf6564-a3bf-4f87-a7a6-086c2aee0f3b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090434Z:dedf6564-a3bf-4f87-a7a6-086c2aee0f3b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '17ced1aa-0129-455a-b463-6a79709db02d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5564',
  'x-ms-correlation-request-id',
  '81ba31cf-6d89-4385-8a35-4603369fb5ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090435Z:81ba31cf-6d89-4385-8a35-4603369fb5ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4a1b5c9a-3761-4487-a45a-de86730aa174',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5563',
  'x-ms-correlation-request-id',
  'b11c2b28-14be-42c1-8511-497bbcf395db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090435Z:b11c2b28-14be-42c1-8511-497bbcf395db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9da7cee7-b6b3-4b54-9a8e-9e8e37a206dc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5562',
  'x-ms-correlation-request-id',
  '69d01159-3652-454e-afa8-8daba450db9b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090436Z:69d01159-3652-454e-afa8-8daba450db9b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b7fb6768-48d6-429e-9799-8282f352e2d9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5561',
  'x-ms-correlation-request-id',
  'f4e88451-87bd-47dd-96a0-b390b9f18d5a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090436Z:f4e88451-87bd-47dd-96a0-b390b9f18d5a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '236229ee-d09f-4eda-9875-ad012df963ee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5560',
  'x-ms-correlation-request-id',
  'de271763-9f7a-480b-b971-4dbff21d8cc3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090436Z:de271763-9f7a-480b-b971-4dbff21d8cc3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9e47726b-53c8-4352-8f2c-990efaaa6c62',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5559',
  'x-ms-correlation-request-id',
  '2cb761b4-80f6-4f73-bfa2-70d5c3707d86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090437Z:2cb761b4-80f6-4f73-bfa2-70d5c3707d86',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7c924cd3-6ee5-4713-b87e-a00ee1b781a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5558',
  'x-ms-correlation-request-id',
  '43ed9e90-9203-4db3-a01c-d1e3c7e82329',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090437Z:43ed9e90-9203-4db3-a01c-d1e3c7e82329',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63e003b6-0df1-42f1-b5ad-47c6359f35cf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5557',
  'x-ms-correlation-request-id',
  '58fe2a15-b91b-4408-bbde-629d9726280a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090438Z:58fe2a15-b91b-4408-bbde-629d9726280a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e6903a97-3359-4292-b731-9d445ccb0a12',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5556',
  'x-ms-correlation-request-id',
  'c470b82d-2b30-4de2-8d43-047759b42cf6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090438Z:c470b82d-2b30-4de2-8d43-047759b42cf6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '71c8c6cc-5c6a-4234-b9c8-62729d1c0b4c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5555',
  'x-ms-correlation-request-id',
  'c18badb6-5e0e-49d5-956e-e5043f22d53a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090438Z:c18badb6-5e0e-49d5-956e-e5043f22d53a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '28e2de74-193f-4f63-82fc-55b4f1138f21',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5554',
  'x-ms-correlation-request-id',
  '777984e1-3a9c-4772-b1db-6aee4f1aa699',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090439Z:777984e1-3a9c-4772-b1db-6aee4f1aa699',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b05b147d-5a07-4122-9d6b-4b7d265996da',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5553',
  'x-ms-correlation-request-id',
  '9c2dea24-7710-4932-ade7-7ae46ab134c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090439Z:9c2dea24-7710-4932-ade7-7ae46ab134c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6b6ff1ca-445d-4388-aa48-7f11c5609f86',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5552',
  'x-ms-correlation-request-id',
  'b81910df-ffd8-472c-820e-3385bb4367c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090440Z:b81910df-ffd8-472c-820e-3385bb4367c4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd23942a8-ec5a-4fc9-8fa3-d3ad746bc4a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5551',
  'x-ms-correlation-request-id',
  '7d6d8062-a7b8-4620-91f5-f3d98ecd1e56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090440Z:7d6d8062-a7b8-4620-91f5-f3d98ecd1e56',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dab1d979-e6bb-4dff-9710-92abd0e41b97',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5550',
  'x-ms-correlation-request-id',
  '841553f3-32a9-47bf-adda-bf61a2ac4dfa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090440Z:841553f3-32a9-47bf-adda-bf61a2ac4dfa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f36ceb7e-8abd-466a-9cc0-f2e5b762ba16',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5549',
  'x-ms-correlation-request-id',
  '91af010d-5d8d-4238-8f86-d4e57f6dc6a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090441Z:91af010d-5d8d-4238-8f86-d4e57f6dc6a1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '837cdbb8-c2e5-455f-80c1-ab7b78bdd8dc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5548',
  'x-ms-correlation-request-id',
  '62ff9b1c-bd2e-490d-b042-d3996d1159a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090441Z:62ff9b1c-bd2e-490d-b042-d3996d1159a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '57319bb8-e418-46f3-a44f-851b269f5800',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5547',
  'x-ms-correlation-request-id',
  'f97e5d71-b225-4ec0-b30b-dd6cc9952578',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090441Z:f97e5d71-b225-4ec0-b30b-dd6cc9952578',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b40dbe11-799f-430d-b242-0ca6bd27978a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5546',
  'x-ms-correlation-request-id',
  '08ddc833-e933-4c2e-9406-a3d19a55ca1f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090442Z:08ddc833-e933-4c2e-9406-a3d19a55ca1f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ce360ef3-955a-4950-aa61-dca742dea3bd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5545',
  'x-ms-correlation-request-id',
  '739daa5a-f1ad-433c-b798-35dbf1f933a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090442Z:739daa5a-f1ad-433c-b798-35dbf1f933a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd981a62f-de26-443e-9fa1-b1adf9d857a2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5544',
  'x-ms-correlation-request-id',
  '47160023-9e25-4a7c-9968-1ebda02d80e4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090443Z:47160023-9e25-4a7c-9968-1ebda02d80e4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '55128443-f72b-4065-af0e-dace884f4878',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5543',
  'x-ms-correlation-request-id',
  'cf50517f-7a2b-4b6c-9096-c725336fb832',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090443Z:cf50517f-7a2b-4b6c-9096-c725336fb832',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd28e0646-1e50-4450-af21-ac2e83f190ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5542',
  'x-ms-correlation-request-id',
  '0d7fb3d8-13d4-4187-92fb-f739da3d2f6e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090443Z:0d7fb3d8-13d4-4187-92fb-f739da3d2f6e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '050754d6-8d73-4909-8402-7e7194577ab9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5541',
  'x-ms-correlation-request-id',
  'ce806748-a83c-4112-8e96-fb54824af397',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090444Z:ce806748-a83c-4112-8e96-fb54824af397',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bca86911-1a6b-4dca-96fc-fc39fa80deda',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5540',
  'x-ms-correlation-request-id',
  '92ec94e9-6e64-4ae4-a655-14bb48dcd827',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090444Z:92ec94e9-6e64-4ae4-a655-14bb48dcd827',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd7a36dfc-4f8c-4ed9-8798-8d70913526fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5539',
  'x-ms-correlation-request-id',
  '8de97362-6dc8-4e6b-8882-55079158e9af',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090445Z:8de97362-6dc8-4e6b-8882-55079158e9af',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3bdd8e81-15db-4d26-a0b2-3f9cfa3c5ef7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5538',
  'x-ms-correlation-request-id',
  '516ec2cd-05f6-4b0a-a600-dea1d3a18f14',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090445Z:516ec2cd-05f6-4b0a-a600-dea1d3a18f14',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b501bc54-aabb-4e76-8d60-e5c854d0aa75',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5537',
  'x-ms-correlation-request-id',
  'd516f794-fcc4-44a5-ac46-651200d3d430',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090445Z:d516f794-fcc4-44a5-ac46-651200d3d430',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7682f2f5-b0dc-4fb2-870b-343806a6e5c8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5536',
  'x-ms-correlation-request-id',
  '5c387bb6-afca-4c67-aa8f-614ce6787bc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090446Z:5c387bb6-afca-4c67-aa8f-614ce6787bc1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b35c9afb-08dc-41cf-a8fc-e0956cc1eb6e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5535',
  'x-ms-correlation-request-id',
  '215b903a-cc73-4113-a1c0-874e98b11cc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090446Z:215b903a-cc73-4113-a1c0-874e98b11cc1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7dd8f5ba-2e18-4105-9dcc-a8661598fd81',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5534',
  'x-ms-correlation-request-id',
  '83ea0bf6-c16a-4f37-9c73-91c96bde81d2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090447Z:83ea0bf6-c16a-4f37-9c73-91c96bde81d2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '762b52f7-3252-4be4-84b5-efd60425f316',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5533',
  'x-ms-correlation-request-id',
  '87d6363f-582e-438f-9578-653a3fe29f3d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090447Z:87d6363f-582e-438f-9578-653a3fe29f3d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a26da3e3-a724-4cde-944a-48f7203a6b49',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5532',
  'x-ms-correlation-request-id',
  '66665f6e-cadf-4f08-b8ca-033264f9e566',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090447Z:66665f6e-cadf-4f08-b8ca-033264f9e566',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40611f58-c1da-461e-b1a0-e02993f2144d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5531',
  'x-ms-correlation-request-id',
  'a0550d48-4de2-4fdc-9726-90da62cee7f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090448Z:a0550d48-4de2-4fdc-9726-90da62cee7f6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a7c5b104-d027-4391-a0eb-9d5bec8e2bed',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5530',
  'x-ms-correlation-request-id',
  '4ee91cc7-7bdd-4df4-9593-5349aa178c25',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090448Z:4ee91cc7-7bdd-4df4-9593-5349aa178c25',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b353b92f-4da5-49cc-a679-6bd563c5b4a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5529',
  'x-ms-correlation-request-id',
  'c27ce13d-d16c-423e-920e-c3e283d902ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090449Z:c27ce13d-d16c-423e-920e-c3e283d902ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'db8b60e8-4532-4978-bff4-ec288d1362c1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5528',
  'x-ms-correlation-request-id',
  '9fc61d48-2143-430d-b713-632c6c127a57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090449Z:9fc61d48-2143-430d-b713-632c6c127a57',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6dee754b-9ac6-4643-9053-7a073063f0cd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5527',
  'x-ms-correlation-request-id',
  '0fbcf4c4-05e3-4379-9757-20804b1687ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090449Z:0fbcf4c4-05e3-4379-9757-20804b1687ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '119d2b08-fe02-49b9-81e7-0c59dfe6aabb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5526',
  'x-ms-correlation-request-id',
  'adfc5eda-5028-4da0-bd52-8a6d65a30051',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090450Z:adfc5eda-5028-4da0-bd52-8a6d65a30051',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df3dc573-2af7-47ff-825d-9206f510d248',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5525',
  'x-ms-correlation-request-id',
  '06e9b715-c1ab-46c2-8ad7-59d369a0676d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090450Z:06e9b715-c1ab-46c2-8ad7-59d369a0676d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e61bdd86-cd53-4c5c-a99f-2ae35985f38c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5524',
  'x-ms-correlation-request-id',
  '6e2be27b-52cb-452a-9682-103f61e7670d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090450Z:6e2be27b-52cb-452a-9682-103f61e7670d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '43ac2141-67e6-4f29-a284-9b44be3631e6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5523',
  'x-ms-correlation-request-id',
  '7febc762-0cc9-492c-b2c7-1bcc9804960d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090451Z:7febc762-0cc9-492c-b2c7-1bcc9804960d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c2e1918a-973e-4bf6-aeb0-a7d9a48cf45a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5522',
  'x-ms-correlation-request-id',
  '19fd7ffe-d7fa-4616-8282-7b0ae00ab744',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090451Z:19fd7ffe-d7fa-4616-8282-7b0ae00ab744',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1c31478f-00b0-481e-b769-ed6d56369d4f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5521',
  'x-ms-correlation-request-id',
  '750add89-4ec7-4356-8ca3-3396253f5daf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090452Z:750add89-4ec7-4356-8ca3-3396253f5daf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '811880c1-8244-4835-94c5-4db4d492941e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5520',
  'x-ms-correlation-request-id',
  '484f1910-470f-4679-bcaf-be389c099b0d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090452Z:484f1910-470f-4679-bcaf-be389c099b0d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a764e969-3c81-4995-b427-726aba3c21b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5519',
  'x-ms-correlation-request-id',
  '6ae35ae1-85f6-4a07-8579-95b526f8b061',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090452Z:6ae35ae1-85f6-4a07-8579-95b526f8b061',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7abf7172-0580-43d7-bf85-5373707ba656',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5518',
  'x-ms-correlation-request-id',
  '85bcf598-ac0b-4676-adbe-17045e48ece7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090453Z:85bcf598-ac0b-4676-adbe-17045e48ece7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cc69fbc0-b0f5-4987-8d88-d8a493a6f2a1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5517',
  'x-ms-correlation-request-id',
  '2841126f-d1e2-445f-a573-87c243b107b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090453Z:2841126f-d1e2-445f-a573-87c243b107b0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fb4a2028-2e9e-479f-8072-8d92bd451133',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5516',
  'x-ms-correlation-request-id',
  '237bdd43-0391-4045-a552-ef484e1c212c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090454Z:237bdd43-0391-4045-a552-ef484e1c212c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c1719a4c-ce71-4bd4-abce-afef48012160',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5515',
  'x-ms-correlation-request-id',
  '4d7254e0-ce24-4d0b-a5d0-079bf00f937a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090454Z:4d7254e0-ce24-4d0b-a5d0-079bf00f937a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4cd9512b-11ae-40c3-abdb-5bcc40d43433',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5514',
  'x-ms-correlation-request-id',
  '5d43ea3c-74ef-42ca-9428-a3fc143726e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090454Z:5d43ea3c-74ef-42ca-9428-a3fc143726e0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1875dea6-aba0-4abb-94ee-8ff83ff7624e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5513',
  'x-ms-correlation-request-id',
  'd37db3d1-4061-499f-b8ee-7ddc35822669',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090455Z:d37db3d1-4061-499f-b8ee-7ddc35822669',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '69f019ae-87b0-4f4f-ba8e-626a55c7cf5e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5512',
  'x-ms-correlation-request-id',
  '73ee7f28-d4a9-49ff-ad4d-38ea1a0c6e36',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090455Z:73ee7f28-d4a9-49ff-ad4d-38ea1a0c6e36',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0d3a6910-9d1f-4cf3-bfe0-7eadf19eeb4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5511',
  'x-ms-correlation-request-id',
  '59bd2b8d-2382-41c3-9f9f-34d31b4b2469',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090456Z:59bd2b8d-2382-41c3-9f9f-34d31b4b2469',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5f876971-fd63-40f6-bcf3-ed2da6ee7972',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5510',
  'x-ms-correlation-request-id',
  'dffd8e35-f1a0-467e-901c-3a119d0060f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090456Z:dffd8e35-f1a0-467e-901c-3a119d0060f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6023f8f-5ec3-4c8b-b6a6-4fdcde7ff5af',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5509',
  'x-ms-correlation-request-id',
  'd8b70cd2-82ae-42b5-aed4-bd6800930881',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090456Z:d8b70cd2-82ae-42b5-aed4-bd6800930881',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a69f40a9-ceef-4def-867b-7912bf939088',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5508',
  'x-ms-correlation-request-id',
  'f1295861-9955-4939-8dad-a2ab6950d21f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090457Z:f1295861-9955-4939-8dad-a2ab6950d21f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b9a02311-572f-4c79-94ed-02061e38e33e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5507',
  'x-ms-correlation-request-id',
  'b8e68b61-c8f6-4ded-9b4c-a7020f20c33a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090457Z:b8e68b61-c8f6-4ded-9b4c-a7020f20c33a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '813c2b9a-4ac9-4678-9525-1d0c30853461',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5506',
  'x-ms-correlation-request-id',
  '71fe9c64-03e3-45f6-9254-36aa2ea2b4e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090457Z:71fe9c64-03e3-45f6-9254-36aa2ea2b4e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9a02299a-0c53-4bdb-bab9-4053792b1ba5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5505',
  'x-ms-correlation-request-id',
  'c96635f4-c7aa-4146-b805-f74d01948638',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090458Z:c96635f4-c7aa-4146-b805-f74d01948638',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd82e55f8-5ed4-416e-a442-d64509328777',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5504',
  'x-ms-correlation-request-id',
  '1f377166-7b2d-4b15-953f-ca668e6fe262',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090458Z:1f377166-7b2d-4b15-953f-ca668e6fe262',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '57496127-bb7b-42be-950e-45867576f1b2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5503',
  'x-ms-correlation-request-id',
  'f82f09e1-4ab2-4ac5-9196-23b7f2b121d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090459Z:f82f09e1-4ab2-4ac5-9196-23b7f2b121d7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '769f5be1-f681-403b-9d53-563d0286c3f5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5502',
  'x-ms-correlation-request-id',
  '7794bf15-9e68-4d49-907d-e02730f88e95',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090459Z:7794bf15-9e68-4d49-907d-e02730f88e95',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4e1a81c9-b675-40f3-a455-04c833df6dd3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5501',
  'x-ms-correlation-request-id',
  '799eec98-3ce9-4b6c-a52e-f7b23574546c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090459Z:799eec98-3ce9-4b6c-a52e-f7b23574546c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '64b94c05-c6c4-4986-9f0c-79addb6c7efa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5500',
  'x-ms-correlation-request-id',
  '73d32ad5-94b9-4ea0-83e7-e402f5d08ed0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090500Z:73d32ad5-94b9-4ea0-83e7-e402f5d08ed0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2fddc10f-7d8a-41d3-b5ad-0b53b4febb14',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5499',
  'x-ms-correlation-request-id',
  '4dfac893-a5d5-461b-aec5-dd782599811a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090500Z:4dfac893-a5d5-461b-aec5-dd782599811a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3700e100-2b4d-4de9-ab05-01086c7c7130',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5498',
  'x-ms-correlation-request-id',
  '568d1fce-7881-4073-8c1b-d1e20bdf7b6d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090501Z:568d1fce-7881-4073-8c1b-d1e20bdf7b6d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a1bcfcf6-37fd-4c0d-a3ae-46ee85349154',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5497',
  'x-ms-correlation-request-id',
  '99cae11c-c73c-40e0-a6a3-756c61c76f98',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090501Z:99cae11c-c73c-40e0-a6a3-756c61c76f98',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0c9075fb-dd5a-4c0e-861e-9eb359df7ac2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5496',
  'x-ms-correlation-request-id',
  'ca745a74-b720-4d41-9455-5226d7c5c6a2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090502Z:ca745a74-b720-4d41-9455-5226d7c5c6a2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee74504b-5e40-4aaf-8301-36acdfb2cd6b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5495',
  'x-ms-correlation-request-id',
  '7f3e3b4d-d821-42bd-8ca4-c52befe2ad49',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090502Z:7f3e3b4d-d821-42bd-8ca4-c52befe2ad49',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1dd47123-e2ab-44be-acc7-d2e3c6f4447e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5494',
  'x-ms-correlation-request-id',
  '915b029a-561b-435a-84df-a7ddc85f06bb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090502Z:915b029a-561b-435a-84df-a7ddc85f06bb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b59fa3d7-238e-44a3-9ec1-7488def24da4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5493',
  'x-ms-correlation-request-id',
  '81b2784a-d3f0-4eb4-bfb2-04f0e944dcf5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090503Z:81b2784a-d3f0-4eb4-bfb2-04f0e944dcf5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c4fdbcef-7e12-4f7e-9c42-8b4db17b4179',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5492',
  'x-ms-correlation-request-id',
  '79ac6d29-b661-48c9-a098-d9b549cd682e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090503Z:79ac6d29-b661-48c9-a098-d9b549cd682e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9155c5c3-8c2a-4b8b-94aa-3331a443fcff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5491',
  'x-ms-correlation-request-id',
  'e86de595-b930-41d7-9f79-9b0d2ee586fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090504Z:e86de595-b930-41d7-9f79-9b0d2ee586fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7319940c-47cf-4165-846a-fe770cb419c2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5490',
  'x-ms-correlation-request-id',
  '06f9b1e6-305a-466a-bade-0487e5408a2e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090504Z:06f9b1e6-305a-466a-bade-0487e5408a2e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '13e2d170-e553-45a2-a764-bed69c7fe2d8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5489',
  'x-ms-correlation-request-id',
  '026c2aad-e54e-4b6a-9683-cbf1a539999e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090504Z:026c2aad-e54e-4b6a-9683-cbf1a539999e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5f538e78-2419-4151-b77c-962c36b05319',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5488',
  'x-ms-correlation-request-id',
  '2493abdb-5202-45c5-8b2a-e39f43a99f2b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090505Z:2493abdb-5202-45c5-8b2a-e39f43a99f2b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a90d9dd8-5ab3-4dd9-805e-214e7a169f31',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5487',
  'x-ms-correlation-request-id',
  '204bbe60-4fcd-437a-b00f-158f04f36a72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090505Z:204bbe60-4fcd-437a-b00f-158f04f36a72',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78aacd56-d0b1-4718-95b3-40c373e86c8d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5486',
  'x-ms-correlation-request-id',
  '7791f885-26f9-4a9a-9d9a-1182d68f0b70',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090505Z:7791f885-26f9-4a9a-9d9a-1182d68f0b70',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a47d5eb-a6a3-4c8d-bce7-e9b7c6f5fd46',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5485',
  'x-ms-correlation-request-id',
  'c7b806a4-b914-48bd-8c1f-c3fbd4198785',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090506Z:c7b806a4-b914-48bd-8c1f-c3fbd4198785',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a046ba64-44ba-4d21-a4bc-b67dc137e714',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5484',
  'x-ms-correlation-request-id',
  'c3dcba2d-46fc-472c-9752-38eda8704a90',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090506Z:c3dcba2d-46fc-472c-9752-38eda8704a90',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96fbf1fc-c346-478f-a83e-ba5b8dd56b9b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5483',
  'x-ms-correlation-request-id',
  '4d2f1a0c-d075-4ece-9803-c2c3435d5835',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090507Z:4d2f1a0c-d075-4ece-9803-c2c3435d5835',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '95d14914-58f2-4248-b95e-046ddf1f0ee4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5482',
  'x-ms-correlation-request-id',
  'a8c23e64-3190-4daf-94c8-ef067a1afe47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090507Z:a8c23e64-3190-4daf-94c8-ef067a1afe47',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1d43368f-61b9-425d-94d4-19883b9e7c0c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5481',
  'x-ms-correlation-request-id',
  'd157a9ca-26e8-4d13-a2ac-2cf7ee86cccc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090507Z:d157a9ca-26e8-4d13-a2ac-2cf7ee86cccc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3dcb16e1-3b66-4a05-8f77-0084e8970eb0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5480',
  'x-ms-correlation-request-id',
  'f364efcb-9011-4a45-98b4-994133a9ed37',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090508Z:f364efcb-9011-4a45-98b4-994133a9ed37',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e03c2dd-0787-4ae3-8726-0d8a04d9298a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5479',
  'x-ms-correlation-request-id',
  '2b45ae42-8474-480b-b6b0-4541ca0da44b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090508Z:2b45ae42-8474-480b-b6b0-4541ca0da44b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '48198bfe-6a1b-44d1-9121-2ba1d0a6e864',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5478',
  'x-ms-correlation-request-id',
  '7e98ab5b-5a09-48de-bef2-ac8149e6dda5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090509Z:7e98ab5b-5a09-48de-bef2-ac8149e6dda5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '39d892d1-e9d2-4cd3-aec4-01a9a5117784',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5477',
  'x-ms-correlation-request-id',
  'e2551427-e9ad-48e6-a125-741249c20215',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090509Z:e2551427-e9ad-48e6-a125-741249c20215',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e774912f-5531-4714-bb73-ce4113964a43',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5476',
  'x-ms-correlation-request-id',
  '8e42d64e-e40e-4395-a3ec-280534b839c6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090509Z:8e42d64e-e40e-4395-a3ec-280534b839c6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0294fe6c-4586-4272-be58-8fe980fba499',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5475',
  'x-ms-correlation-request-id',
  'b9e730c9-f8a4-4154-87e3-ee9a77865c1a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090510Z:b9e730c9-f8a4-4154-87e3-ee9a77865c1a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c435f28a-6a0f-4a52-94fb-2aa18b1f8d3a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5474',
  'x-ms-correlation-request-id',
  '23c56a28-74e9-4601-8ccd-6eae93970269',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090510Z:23c56a28-74e9-4601-8ccd-6eae93970269',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4428c794-98d7-4f8e-a371-e2e0e8a412e1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5473',
  'x-ms-correlation-request-id',
  '74d395d1-9a30-4562-b5c1-b2d0266cc657',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090511Z:74d395d1-9a30-4562-b5c1-b2d0266cc657',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b688680f-7dbc-4e9d-83ce-503f2f4575c9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5472',
  'x-ms-correlation-request-id',
  '3e1ef833-9090-4715-a03b-a74fc40010a4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090511Z:3e1ef833-9090-4715-a03b-a74fc40010a4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f54acad0-67db-4104-96e7-28a71529aca9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5471',
  'x-ms-correlation-request-id',
  '38552b2c-5708-40f0-baaf-5d2f436deeda',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090511Z:38552b2c-5708-40f0-baaf-5d2f436deeda',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e8d06c27-651c-4f2a-8d09-fde731591da3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5470',
  'x-ms-correlation-request-id',
  '229ac574-b875-4ba8-a5cb-9cf2279f4c74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090512Z:229ac574-b875-4ba8-a5cb-9cf2279f4c74',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e01de77e-f4ae-4814-9978-389bba0baa63',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5469',
  'x-ms-correlation-request-id',
  '1269ede6-e166-4126-8e45-a6699ae3fad1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090512Z:1269ede6-e166-4126-8e45-a6699ae3fad1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ec36770-2cf4-4716-b011-ce97f9b6bf86',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5468',
  'x-ms-correlation-request-id',
  '465d807f-ecb3-4846-9f4a-a3706a4ef86c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090512Z:465d807f-ecb3-4846-9f4a-a3706a4ef86c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c4bfa047-5196-4024-8706-3652c882f636',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5467',
  'x-ms-correlation-request-id',
  '67497f2e-3fc2-4efc-8816-ec93e9cf2346',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090513Z:67497f2e-3fc2-4efc-8816-ec93e9cf2346',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '64aa91e5-6f4d-409b-b3e0-1d8d803f13f9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5466',
  'x-ms-correlation-request-id',
  '81450912-0c9e-4e82-96eb-dea97985b9f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090513Z:81450912-0c9e-4e82-96eb-dea97985b9f8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eaf8c6e7-51a7-44cc-9747-25ce95b4601f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5465',
  'x-ms-correlation-request-id',
  '8f9e334e-7cd4-4e85-8297-17e8989a306e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090514Z:8f9e334e-7cd4-4e85-8297-17e8989a306e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'db7cbcd9-464c-4e18-9600-6c9d62dc7ab2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5464',
  'x-ms-correlation-request-id',
  '58734ca5-5560-4d3a-a02a-e98135a93435',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090514Z:58734ca5-5560-4d3a-a02a-e98135a93435',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '728f7868-4c0d-4105-b538-ce2d6d471691',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5463',
  'x-ms-correlation-request-id',
  '5f659fcc-6d76-4c13-9842-fcdc973da747',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090514Z:5f659fcc-6d76-4c13-9842-fcdc973da747',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b1d1729c-4d84-4fcc-bcbe-a8be0a8d7d02',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5462',
  'x-ms-correlation-request-id',
  '65bdd5f6-76c8-4e38-9683-3cfb36e6c8c1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090515Z:65bdd5f6-76c8-4e38-9683-3cfb36e6c8c1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c3e7a0b-2b88-4f74-b8b3-846cb82d29f5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5461',
  'x-ms-correlation-request-id',
  '7ee38df6-8f66-41a6-9be9-cc606867052d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090515Z:7ee38df6-8f66-41a6-9be9-cc606867052d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '522876d1-9c19-40df-bd40-5a721925a87f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5460',
  'x-ms-correlation-request-id',
  'e296341e-5664-4153-85f3-1951839883ec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090516Z:e296341e-5664-4153-85f3-1951839883ec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c94abef-c95f-4604-bc4c-ed6c0f13339e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5459',
  'x-ms-correlation-request-id',
  '2d332c18-17ab-4748-ad33-6b6d63750f6a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090516Z:2d332c18-17ab-4748-ad33-6b6d63750f6a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4e1be09f-e896-40c8-a95f-0839c93c903f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5458',
  'x-ms-correlation-request-id',
  'a89b1d61-1ae6-4636-9955-8f0b2804f833',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090516Z:a89b1d61-1ae6-4636-9955-8f0b2804f833',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1738be48-c498-4b5f-a83b-97ae69a0605d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5457',
  'x-ms-correlation-request-id',
  '13a51515-e019-45b7-be50-bd6473d00f29',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090517Z:13a51515-e019-45b7-be50-bd6473d00f29',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '493cb3b4-5ddd-45a5-bac6-d1eee0c831e3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5456',
  'x-ms-correlation-request-id',
  'c07ec5e0-62fb-4eda-a81f-91c6142d49a3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090517Z:c07ec5e0-62fb-4eda-a81f-91c6142d49a3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b4566041-1bad-4573-863c-426abb788824',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5455',
  'x-ms-correlation-request-id',
  'af93f2ce-eedd-4586-ac3a-0f0214e68851',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090518Z:af93f2ce-eedd-4586-ac3a-0f0214e68851',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '250757e5-150d-4f70-9e86-abd0032ebfd4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5454',
  'x-ms-correlation-request-id',
  '1b65c25b-6346-4b1c-b507-d21a4a1d05ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090518Z:1b65c25b-6346-4b1c-b507-d21a4a1d05ef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df36e783-00aa-43df-81c3-29955de399b9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5453',
  'x-ms-correlation-request-id',
  'eb817782-155c-4da7-9d96-48718f5c9133',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090518Z:eb817782-155c-4da7-9d96-48718f5c9133',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '341ca62e-e63f-43f8-ae2f-a96d3ac5b61e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5452',
  'x-ms-correlation-request-id',
  'd910fa95-9fe5-40f6-9430-8b209e1fbb02',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090519Z:d910fa95-9fe5-40f6-9430-8b209e1fbb02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bdd443ff-7a88-4b38-a5f1-9c5cd9f95531',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5451',
  'x-ms-correlation-request-id',
  'c5d40e39-259e-4a4f-869c-a71554519d14',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090519Z:c5d40e39-259e-4a4f-869c-a71554519d14',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7548dce6-f543-4439-88ef-6a69498b920f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5450',
  'x-ms-correlation-request-id',
  'b29973eb-9a77-4054-86c5-58f1ffb9c20e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090519Z:b29973eb-9a77-4054-86c5-58f1ffb9c20e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '119b326f-3cda-4a5c-816e-1e8a447d76de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5449',
  'x-ms-correlation-request-id',
  '6e17a93f-cf1b-499d-bf18-343bc42fe47e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090520Z:6e17a93f-cf1b-499d-bf18-343bc42fe47e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'be00108b-fffa-4f88-ab84-8c8c53e3eb37',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5448',
  'x-ms-correlation-request-id',
  '107a7a70-305a-4336-ad6e-6717ab92a824',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090520Z:107a7a70-305a-4336-ad6e-6717ab92a824',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f394936a-d10f-4eb2-83b5-34c5e5612aef',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5447',
  'x-ms-correlation-request-id',
  'f2b927e8-3fa8-442f-b9d0-0d41274032f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090521Z:f2b927e8-3fa8-442f-b9d0-0d41274032f4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3a87ab1b-a504-4729-9280-803fb545f2d4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5446',
  'x-ms-correlation-request-id',
  'd8da887d-b773-4ca8-b56c-bb2b81fcb61f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090521Z:d8da887d-b773-4ca8-b56c-bb2b81fcb61f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee7e0414-7d51-4da5-9160-8a78fb673251',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5445',
  'x-ms-correlation-request-id',
  '172ba329-e128-4ee9-acac-120bccd13d7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090522Z:172ba329-e128-4ee9-acac-120bccd13d7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd14a8d4c-3fbe-4d92-b9ee-26f964d3647b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5444',
  'x-ms-correlation-request-id',
  'c540a37d-2950-485a-82e5-962bd28accdf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090522Z:c540a37d-2950-485a-82e5-962bd28accdf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c1fe03da-e52b-4982-b06c-87612014a083',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5443',
  'x-ms-correlation-request-id',
  '8d606afd-c428-40f6-a766-41415e08449e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090522Z:8d606afd-c428-40f6-a766-41415e08449e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '71da8eaa-92e5-49aa-9d19-e6c8d3b1d6c2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5442',
  'x-ms-correlation-request-id',
  'f5f4fa42-b5a6-4a8b-bad0-a33de8c8216e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090523Z:f5f4fa42-b5a6-4a8b-bad0-a33de8c8216e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '98710e34-a897-4a6d-bb6e-24b1680892ed',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5441',
  'x-ms-correlation-request-id',
  'd52f89d2-b80f-48c9-a018-4a4ddca3e891',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090523Z:d52f89d2-b80f-48c9-a018-4a4ddca3e891',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7cbe7b96-2652-481d-821d-cdd1c57f0b0a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5440',
  'x-ms-correlation-request-id',
  '0d3ba8b9-7b6a-44fe-82f1-6c9ef82000e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090523Z:0d3ba8b9-7b6a-44fe-82f1-6c9ef82000e0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df6bc28d-8edf-4f5e-80e0-1e7c50e7e976',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5439',
  'x-ms-correlation-request-id',
  '1f6807d0-12fe-420f-bd70-4c61d7195ae7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090524Z:1f6807d0-12fe-420f-bd70-4c61d7195ae7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '86c24426-114d-40a3-8695-36ee4e973008',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5438',
  'x-ms-correlation-request-id',
  'da7f09eb-7150-4c3b-bbf2-f0170d303979',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090524Z:da7f09eb-7150-4c3b-bbf2-f0170d303979',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6410a004-7091-4abf-9ea9-46d72d8d90a1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5437',
  'x-ms-correlation-request-id',
  'fc5de306-0e00-450e-9173-536df9c43642',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090525Z:fc5de306-0e00-450e-9173-536df9c43642',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '15afe9bf-09c4-417e-8559-348d132f2f16',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5436',
  'x-ms-correlation-request-id',
  '0181f220-b516-4af4-b75e-ffb81ba8871d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090525Z:0181f220-b516-4af4-b75e-ffb81ba8871d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c995e2ba-bfb7-48f7-8585-955bd0111109',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5435',
  'x-ms-correlation-request-id',
  'c6aafb9a-84f7-49b6-96e6-ff331153df45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090525Z:c6aafb9a-84f7-49b6-96e6-ff331153df45',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b9d68ea-8ec7-4d70-8d41-f6683b335bff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5434',
  'x-ms-correlation-request-id',
  'e703d606-2fc1-4179-afc3-6357e8f196cc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090526Z:e703d606-2fc1-4179-afc3-6357e8f196cc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd1cd50ef-5d71-4dd1-96bc-6e91568c15cb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5433',
  'x-ms-correlation-request-id',
  'b0852961-9180-414d-93b5-26f29322ba6e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090526Z:b0852961-9180-414d-93b5-26f29322ba6e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '19187f9c-2c21-41c1-9e7c-bd6ec2b0bbff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5432',
  'x-ms-correlation-request-id',
  '3d8689a4-95e9-4b69-b619-0cebd6b586a6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090527Z:3d8689a4-95e9-4b69-b619-0cebd6b586a6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '287854ed-f8a6-4fed-8a59-a3b2ef3e78d6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5431',
  'x-ms-correlation-request-id',
  'c733f58e-bcbf-439a-84f3-f2bee37afb4f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090527Z:c733f58e-bcbf-439a-84f3-f2bee37afb4f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9666e046-ae01-4aa6-870b-1901aed01f26',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5430',
  'x-ms-correlation-request-id',
  '596d97f2-b738-4922-8d64-1f79e0d11193',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090527Z:596d97f2-b738-4922-8d64-1f79e0d11193',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd64b1454-4f0f-415f-8412-f950c4dec280',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5429',
  'x-ms-correlation-request-id',
  '1ec8222a-b925-4853-b58c-9b3980e8fb00',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090528Z:1ec8222a-b925-4853-b58c-9b3980e8fb00',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5d14a5a5-0889-4216-ae76-68185b5138ed',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5428',
  'x-ms-correlation-request-id',
  '83e68d80-5935-44c2-b4a7-192efedab5e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090528Z:83e68d80-5935-44c2-b4a7-192efedab5e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ac16e309-5018-4611-828e-1af6ba2bfa5d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5427',
  'x-ms-correlation-request-id',
  '68579d60-7b50-40ad-98a9-55a117b0bb45',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090529Z:68579d60-7b50-40ad-98a9-55a117b0bb45',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe0c6157-2494-4624-acb6-05236c39b7a1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5426',
  'x-ms-correlation-request-id',
  'ac8213ed-6315-480f-9e9e-56be13ea4eb7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090529Z:ac8213ed-6315-480f-9e9e-56be13ea4eb7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a5e7616e-5860-46d7-bc27-9dd6b6de0a26',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5425',
  'x-ms-correlation-request-id',
  '20556c9c-bdca-4788-b6e7-68e5a49a3f79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090529Z:20556c9c-bdca-4788-b6e7-68e5a49a3f79',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e9149ca-b534-403e-87c5-9d01f1147530',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5424',
  'x-ms-correlation-request-id',
  'e2e5c824-5baf-4a4d-a45f-da8d55190b8b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090530Z:e2e5c824-5baf-4a4d-a45f-da8d55190b8b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e9867559-d7a9-44a4-82ee-10b3b0d56834',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5423',
  'x-ms-correlation-request-id',
  'ff0ffced-5a3f-4be1-ae07-a9443d0f6d4b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090530Z:ff0ffced-5a3f-4be1-ae07-a9443d0f6d4b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '29562325-951f-4dfd-8e49-7ed73690f529',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5422',
  'x-ms-correlation-request-id',
  'c641466f-964d-4ace-8318-52796f9df7e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090530Z:c641466f-964d-4ace-8318-52796f9df7e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b83a3370-5892-4d55-b05b-3148fb486320',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5421',
  'x-ms-correlation-request-id',
  'eb669541-7ea4-4b51-8f13-4358292be6ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090531Z:eb669541-7ea4-4b51-8f13-4358292be6ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '508a2acd-831d-4201-8f90-5ecb5aac89c5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5420',
  'x-ms-correlation-request-id',
  'de93dd79-b596-456d-adfb-e8be06dc036a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090531Z:de93dd79-b596-456d-adfb-e8be06dc036a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9e71302b-65ad-4a43-92ba-6c73055643e2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5419',
  'x-ms-correlation-request-id',
  '5b1fc864-b986-4401-a80c-7989a78a55dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090532Z:5b1fc864-b986-4401-a80c-7989a78a55dd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5b8ce39d-ef52-476e-ac16-7d4a419038e4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5418',
  'x-ms-correlation-request-id',
  '12cafbe9-aeb0-41f9-8321-bc637953081f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090532Z:12cafbe9-aeb0-41f9-8321-bc637953081f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f5c71b03-a7a3-4f34-9d5a-8d4fefb0f077',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5417',
  'x-ms-correlation-request-id',
  '10d89360-9284-4505-90ab-e6effab9afe3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090532Z:10d89360-9284-4505-90ab-e6effab9afe3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dfddd114-9e04-4a96-9501-82b26a38fb38',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5416',
  'x-ms-correlation-request-id',
  'ef169f41-92c8-4ee6-adb1-78cd07b72eee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090533Z:ef169f41-92c8-4ee6-adb1-78cd07b72eee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '35228106-aa7d-4564-94e3-12b364967cd2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5415',
  'x-ms-correlation-request-id',
  'a452cf7a-210d-485e-a76d-5df0ec148215',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090533Z:a452cf7a-210d-485e-a76d-5df0ec148215',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a25594c7-8da8-4746-9f2c-9ebb23c8549c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5414',
  'x-ms-correlation-request-id',
  '270936cf-0271-4b83-93ac-695679b95aa2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090534Z:270936cf-0271-4b83-93ac-695679b95aa2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a18dfd4e-21ec-4b71-9b05-21bf30fe78f5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5413',
  'x-ms-correlation-request-id',
  '110a38f4-4c0c-4a5b-a7af-bec1b735e515',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090534Z:110a38f4-4c0c-4a5b-a7af-bec1b735e515',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a0f3fde3-93e7-4069-86c7-668a84e2d183',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5412',
  'x-ms-correlation-request-id',
  '2276a996-9d18-40de-b40d-32405b7698d5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090534Z:2276a996-9d18-40de-b40d-32405b7698d5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7278ec6d-787c-4497-8e25-9e26e9a1be8c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5411',
  'x-ms-correlation-request-id',
  'e7752e6c-3250-4621-b7e1-9ccd1be8b7b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090535Z:e7752e6c-3250-4621-b7e1-9ccd1be8b7b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eedb115a-527c-4235-8fdf-a571492373eb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5410',
  'x-ms-correlation-request-id',
  'a82e2ec6-b68a-418f-8540-50de0dfef015',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090535Z:a82e2ec6-b68a-418f-8540-50de0dfef015',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '28958e6b-ae82-43f8-844b-286cbbc8c04f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5409',
  'x-ms-correlation-request-id',
  '6dbbda48-5686-4c01-84e7-fdaf048bd5ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090536Z:6dbbda48-5686-4c01-84e7-fdaf048bd5ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c8d55ff6-210f-40a0-91fe-a9ca8f2872e6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5408',
  'x-ms-correlation-request-id',
  'f329520a-c0cf-419d-a66a-88bf6c85b6bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090536Z:f329520a-c0cf-419d-a66a-88bf6c85b6bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bb015fab-49eb-4825-847a-43f537a119f0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5407',
  'x-ms-correlation-request-id',
  '1edc297d-e574-461f-9bdf-c24f6e583234',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090536Z:1edc297d-e574-461f-9bdf-c24f6e583234',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7c6f8cbb-c46f-451f-92c1-fc4263c0826a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5406',
  'x-ms-correlation-request-id',
  'd4ea9259-a5f0-417f-b235-0eaf77c2d9e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090537Z:d4ea9259-a5f0-417f-b235-0eaf77c2d9e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '11e01b5a-bcbd-4448-ae92-7048346dd6d8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5405',
  'x-ms-correlation-request-id',
  '730c8d98-4395-41b8-a911-6395febacdce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090537Z:730c8d98-4395-41b8-a911-6395febacdce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '84ec45f8-d065-4428-b5a2-feaca321d4ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5404',
  'x-ms-correlation-request-id',
  '54c7bd69-412e-483b-966c-fc8da11a741a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090538Z:54c7bd69-412e-483b-966c-fc8da11a741a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ad92c499-5ca0-443d-b50f-a840d2a6d41a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5403',
  'x-ms-correlation-request-id',
  'e7020bdf-068e-41ca-909c-fbc6e0ccd9d6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090538Z:e7020bdf-068e-41ca-909c-fbc6e0ccd9d6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3a3f8b5c-7fc7-4ccb-ab9e-58420c73a8a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5402',
  'x-ms-correlation-request-id',
  'c9bb8214-8733-439a-89f9-1f73fa35e7a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090538Z:c9bb8214-8733-439a-89f9-1f73fa35e7a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '38115f35-d495-4b62-a034-54fe38123c6c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5401',
  'x-ms-correlation-request-id',
  'c0d82b55-619a-434a-ba85-657d4c4e2897',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090539Z:c0d82b55-619a-434a-ba85-657d4c4e2897',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '13b17312-1a1b-4548-be12-70bf206bbd04',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5400',
  'x-ms-correlation-request-id',
  'a66041b4-3939-4025-acd8-8065f1fe1f26',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090539Z:a66041b4-3939-4025-acd8-8065f1fe1f26',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '703a4a77-ea3a-4d01-8a75-deb18c1a4582',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5399',
  'x-ms-correlation-request-id',
  '4818cfdc-23dd-4052-8dc5-41290e8e6306',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090539Z:4818cfdc-23dd-4052-8dc5-41290e8e6306',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e2d9bbe2-149c-4979-9c11-22903eae3d3e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5398',
  'x-ms-correlation-request-id',
  'd04940ec-4857-4837-b99e-20e3c1b22ce2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090540Z:d04940ec-4857-4837-b99e-20e3c1b22ce2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '027c0ebd-6ffc-4f32-9cf9-8666a46fac75',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5397',
  'x-ms-correlation-request-id',
  '9875095c-9e1b-4ac1-9fb4-6ebd7006aeb6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090540Z:9875095c-9e1b-4ac1-9fb4-6ebd7006aeb6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fc20b349-ae69-4a5e-af61-e17231315942',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5396',
  'x-ms-correlation-request-id',
  '2f4138e7-08ee-4939-8c9c-97e3f00538a3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090541Z:2f4138e7-08ee-4939-8c9c-97e3f00538a3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e38080e2-32d1-4831-b9e7-3f325e50d338',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5395',
  'x-ms-correlation-request-id',
  '40aba694-4b52-4493-a929-aa290d127666',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090541Z:40aba694-4b52-4493-a929-aa290d127666',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1c4ce425-a7e2-4edb-b0a2-85c8c6d330c3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5394',
  'x-ms-correlation-request-id',
  '00be99d9-a927-4084-a25f-353b0ae39036',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090542Z:00be99d9-a927-4084-a25f-353b0ae39036',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '099db253-2702-4275-bcf8-3200c0047be9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5393',
  'x-ms-correlation-request-id',
  'd41f1d14-0cdd-4090-9276-fd4f1a350f2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090542Z:d41f1d14-0cdd-4090-9276-fd4f1a350f2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '76b26977-6401-49aa-85ee-f38244f2bd08',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5392',
  'x-ms-correlation-request-id',
  '400f5f13-e634-4504-9b0c-6e29955eedbb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090543Z:400f5f13-e634-4504-9b0c-6e29955eedbb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '352efc7f-dbb8-4eba-8061-d3d62c33b075',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5391',
  'x-ms-correlation-request-id',
  'f454a8a2-5ff2-45bc-a4b2-cfa385be71c9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090543Z:f454a8a2-5ff2-45bc-a4b2-cfa385be71c9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd30b3189-8b5d-4f5c-82f2-a03527850ee6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5390',
  'x-ms-correlation-request-id',
  '6546a027-f8b0-4513-b062-3d545843ac5f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090543Z:6546a027-f8b0-4513-b062-3d545843ac5f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6ceaebdb-3b79-4237-9974-563576c0ae3a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5389',
  'x-ms-correlation-request-id',
  'cbf06488-1cc7-40cc-a002-9a6ed19a2d42',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090544Z:cbf06488-1cc7-40cc-a002-9a6ed19a2d42',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78a9ffd7-562e-4d27-8ead-b9595dc40b8e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5388',
  'x-ms-correlation-request-id',
  '7bf7964c-128b-42a7-8472-997a78ef4da0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090544Z:7bf7964c-128b-42a7-8472-997a78ef4da0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd07d9f75-4c3b-4872-b64e-c93d4660ef92',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5387',
  'x-ms-correlation-request-id',
  'a1fd7709-59d5-49e5-948e-af97a7716c2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090544Z:a1fd7709-59d5-49e5-948e-af97a7716c2f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '068ac8a6-8432-4541-a9b3-24c31064096f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5386',
  'x-ms-correlation-request-id',
  'aaf374a4-9581-42f6-9b29-f1e955dc9e3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090545Z:aaf374a4-9581-42f6-9b29-f1e955dc9e3a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5273e6fe-0d42-4cfb-991f-a258e54c03ed',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5385',
  'x-ms-correlation-request-id',
  '0ca451af-976a-4da7-9635-8f9b0b951790',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090545Z:0ca451af-976a-4da7-9635-8f9b0b951790',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '020d1781-1cbc-405a-b588-a1a433845167',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5384',
  'x-ms-correlation-request-id',
  '3372c624-ca84-4e8c-97f2-0e5cc7463cc1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090546Z:3372c624-ca84-4e8c-97f2-0e5cc7463cc1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a3f7c0d0-b4be-4d21-a0f2-b041f4026935',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5383',
  'x-ms-correlation-request-id',
  'ff3da525-5b24-4c33-b31b-3e43549dc918',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090546Z:ff3da525-5b24-4c33-b31b-3e43549dc918',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3bbd6a95-8cd4-4f73-acfa-df0c00ebc0f1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5382',
  'x-ms-correlation-request-id',
  'f493db16-7399-4b2c-98db-a1b8398b9308',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090546Z:f493db16-7399-4b2c-98db-a1b8398b9308',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cdab28c3-efb1-4361-a036-780f97de4ef4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5381',
  'x-ms-correlation-request-id',
  'd5db0c38-8e57-4c52-8c03-15cc4755e9c7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090547Z:d5db0c38-8e57-4c52-8c03-15cc4755e9c7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '07b4d15a-9380-4fb9-b3a2-4fc0791abed7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5380',
  'x-ms-correlation-request-id',
  '9c63a7bf-0fdd-4399-a91f-49fdf0be1736',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090547Z:9c63a7bf-0fdd-4399-a91f-49fdf0be1736',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dc533007-801d-4397-be68-31317dd1424d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5379',
  'x-ms-correlation-request-id',
  '6a626cc9-a8e4-4e94-aab0-2aca9c85d995',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090548Z:6a626cc9-a8e4-4e94-aab0-2aca9c85d995',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ad2eb81-ce06-4483-b649-03275bc021fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5378',
  'x-ms-correlation-request-id',
  '9a8ca2ae-25a6-4ac9-bd00-1dc4990201ce',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090548Z:9a8ca2ae-25a6-4ac9-bd00-1dc4990201ce',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '236c567e-ddeb-4049-b80a-c916cba7a04a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5377',
  'x-ms-correlation-request-id',
  '5c100ffe-76d7-4ee7-8d77-78790fd1c91f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090548Z:5c100ffe-76d7-4ee7-8d77-78790fd1c91f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56dfff41-1fdf-48d0-9399-beb9a06d0a49',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5376',
  'x-ms-correlation-request-id',
  'e4eac2b5-d56a-4dc3-8ea9-3c4fa4f8b962',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090549Z:e4eac2b5-d56a-4dc3-8ea9-3c4fa4f8b962',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0f861864-7468-47c8-9005-2db3457ae91d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5375',
  'x-ms-correlation-request-id',
  '7499f866-fa8f-4d26-b38a-0ade63d708e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090549Z:7499f866-fa8f-4d26-b38a-0ade63d708e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04e5b298-4659-4982-9f6f-f7eaf4825932',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5374',
  'x-ms-correlation-request-id',
  '133d6739-8049-4148-81a0-3f34f7be8c20',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090549Z:133d6739-8049-4148-81a0-3f34f7be8c20',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e02cbdc-2b59-4247-b53b-f5806299f00d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5373',
  'x-ms-correlation-request-id',
  '35858e7a-a9df-46f9-aaec-f73c9b4fb711',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090550Z:35858e7a-a9df-46f9-aaec-f73c9b4fb711',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3c0b6cbd-ad51-44c9-829c-b9a3678205f4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5372',
  'x-ms-correlation-request-id',
  '8c375c9c-1f36-47f9-af8a-09076f285385',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090550Z:8c375c9c-1f36-47f9-af8a-09076f285385',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5404ba90-0b51-44d3-9723-e13af2f96e73',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5371',
  'x-ms-correlation-request-id',
  '5b17918f-2917-4816-a168-62c42c84fa48',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090551Z:5b17918f-2917-4816-a168-62c42c84fa48',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5f7504c8-ba6e-4863-b0ce-375740f37908',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5370',
  'x-ms-correlation-request-id',
  '7f819b73-19eb-47f7-9749-c003da19c05b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090551Z:7f819b73-19eb-47f7-9749-c003da19c05b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '99a3a555-e700-4113-a378-cf7ced22bb82',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5369',
  'x-ms-correlation-request-id',
  '11d4c260-61d4-40b6-9a0b-005aa06b4b2e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090551Z:11d4c260-61d4-40b6-9a0b-005aa06b4b2e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1f444dbe-461f-4e21-b948-751aedcd103e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5368',
  'x-ms-correlation-request-id',
  '0583945c-b593-470a-8acc-d512efcc4e71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090552Z:0583945c-b593-470a-8acc-d512efcc4e71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '581067de-b482-4d2e-a872-b3df49d1259f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5367',
  'x-ms-correlation-request-id',
  'e1ef4030-930c-4e27-a02f-e47dae342ca7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090552Z:e1ef4030-930c-4e27-a02f-e47dae342ca7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f6c989a9-6dc7-44cd-8ef9-9a95aa9ccce9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5366',
  'x-ms-correlation-request-id',
  '8b6a8eac-e7b9-4cd2-8189-6b6312b71da8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090553Z:8b6a8eac-e7b9-4cd2-8189-6b6312b71da8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2a6cca48-d97c-4936-82b6-bf652d1e8ed0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5365',
  'x-ms-correlation-request-id',
  '62b9f2e0-fe63-4c79-9647-3e74e9207ace',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090553Z:62b9f2e0-fe63-4c79-9647-3e74e9207ace',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7a85cf54-7c81-4f2d-9e48-832c76853753',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5364',
  'x-ms-correlation-request-id',
  '9e395c36-83e5-477d-9559-2cba67476f06',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090553Z:9e395c36-83e5-477d-9559-2cba67476f06',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '64b6593e-3366-4802-a0d3-6b5588416819',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5363',
  'x-ms-correlation-request-id',
  '2b941d48-722e-459c-ab73-b65402038084',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090554Z:2b941d48-722e-459c-ab73-b65402038084',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5b581aac-169e-473d-a499-d4f037ef0c80',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5362',
  'x-ms-correlation-request-id',
  'fa4ebc39-e67b-4dfa-94f7-159b4ff9cb13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090554Z:fa4ebc39-e67b-4dfa-94f7-159b4ff9cb13',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '997c7697-b4b0-4043-b181-8a359ea142ab',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5361',
  'x-ms-correlation-request-id',
  '4e2b2670-60d2-420f-9852-691f60511e5d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090555Z:4e2b2670-60d2-420f-9852-691f60511e5d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c9b4a27-12b0-426f-9e8e-7c030c7cea3c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5360',
  'x-ms-correlation-request-id',
  '89774175-3c23-46e0-811f-e92e9e993499',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090555Z:89774175-3c23-46e0-811f-e92e9e993499',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b168f6eb-6d67-4d66-a17d-8cfc3e80dddd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5359',
  'x-ms-correlation-request-id',
  '1fbfd76d-6eae-4215-843d-5a02f1187768',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090555Z:1fbfd76d-6eae-4215-843d-5a02f1187768',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd945736c-d2ee-4fab-b7e3-d59ddef6b072',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5358',
  'x-ms-correlation-request-id',
  '75fe239a-9e86-4434-87ed-f49f297a687d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090556Z:75fe239a-9e86-4434-87ed-f49f297a687d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b7a05e67-c6e3-40bf-920d-091d51e33ae1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5357',
  'x-ms-correlation-request-id',
  'e52e083c-7170-4cb9-9516-2d431d422fc5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090556Z:e52e083c-7170-4cb9-9516-2d431d422fc5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2e15acfe-5f77-4bff-9f3b-145a81f08d9a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5356',
  'x-ms-correlation-request-id',
  '5ab69771-9028-43f4-a6e9-841ddc95d717',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090556Z:5ab69771-9028-43f4-a6e9-841ddc95d717',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ed9096bc-dc9d-4df9-9de5-2adabbda124c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5355',
  'x-ms-correlation-request-id',
  '94877e69-6b3d-4a10-9262-92868415355e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090557Z:94877e69-6b3d-4a10-9262-92868415355e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '864252a1-82b7-4e70-9450-f763ae5768a4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5354',
  'x-ms-correlation-request-id',
  'df12cdab-44e5-4ace-9d2c-d4fa8a31c396',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090557Z:df12cdab-44e5-4ace-9d2c-d4fa8a31c396',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0d825cee-6c1d-4018-8644-328624f7c12a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5353',
  'x-ms-correlation-request-id',
  'cc75eeb1-0d63-4931-b0ef-b804bed74e59',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090558Z:cc75eeb1-0d63-4931-b0ef-b804bed74e59',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'af369e14-8659-4ba2-827d-7f2a55566bd1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5352',
  'x-ms-correlation-request-id',
  'ed7aae55-452e-4025-911a-66c8f35eb7bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090558Z:ed7aae55-452e-4025-911a-66c8f35eb7bc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee096928-a370-44e7-9bd5-88897ecad6dd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5351',
  'x-ms-correlation-request-id',
  '4c016387-a8ae-4f7a-933b-f73b7f27137e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090559Z:4c016387-a8ae-4f7a-933b-f73b7f27137e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1d1e6d98-b4d0-4404-bc61-2aaed32550c6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5350',
  'x-ms-correlation-request-id',
  '78011690-8578-4150-9d03-42460ea3a4f4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090559Z:78011690-8578-4150-9d03-42460ea3a4f4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2VmNjljYQ==')
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
  '8a69b68c-f11e-40fc-9fd2-0830d1c4025d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5349',
  'x-ms-correlation-request-id',
  'ae3eac49-ad3e-4c45-9361-ace56cf75857',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090559Z:ae3eac49-ad3e-4c45-9361-ace56cf75857',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2","name":"myserviceyyy2","type":"Microsoft.ApiManagement/deletedservices","location":"East US","properties":{"serviceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myserviceyyy2","scheduledPurgeDate":"2021-09-24T09:06:00.0209586Z","deletionDate":"2021-09-24T09:05:57.3632102Z"}}, [
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '13c7a3ca-a161-473d-95fb-987acc412cce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'd2ead8e7-7c67-4818-bd84-96cdba014018',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090600Z:d2ead8e7-7c67-4818-bd84-96cdba014018',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:05:59 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78acb74b-0cf7-4b91-abaf-2b774f41679f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5348',
  'x-ms-correlation-request-id',
  '1d263331-bee1-4299-b90e-59a5c2fbaacc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090600Z:1d263331-bee1-4299-b90e-59a5c2fbaacc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b70cd8d6-e377-4126-a7da-27cef6c51c44',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5347',
  'x-ms-correlation-request-id',
  'f5c1c5bb-9797-48c4-b718-91ba6aba134d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090600Z:f5c1c5bb-9797-48c4-b718-91ba6aba134d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e7a1c2d-247c-49e8-83f6-f21624c6c17e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5346',
  'x-ms-correlation-request-id',
  '1279ac45-e081-4844-a5e9-6040dc68b0bb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090601Z:1279ac45-e081-4844-a5e9-6040dc68b0bb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6b7dc40f-4300-49f2-829d-9ba5e7643f12',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5345',
  'x-ms-correlation-request-id',
  '10198099-f7bc-4816-9ffb-2bd6452957e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090601Z:10198099-f7bc-4816-9ffb-2bd6452957e6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5940f5c8-e4de-41ba-aa78-a357bc391299',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5344',
  'x-ms-correlation-request-id',
  '9cb3941e-f9ca-4433-9353-189ce3e7855f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090602Z:9cb3941e-f9ca-4433-9353-189ce3e7855f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3eb90fed-9e74-4094-8fe7-8abc5a780ae6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5343',
  'x-ms-correlation-request-id',
  '93e5dcf7-7837-47c9-a0f5-78dd5d5694a9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090602Z:93e5dcf7-7837-47c9-a0f5-78dd5d5694a9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eb1c6ea7-b769-4a74-a2ee-9f2f18c6019d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5342',
  'x-ms-correlation-request-id',
  '0cce2d8e-af34-4a8f-b78f-57471ca8467a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090602Z:0cce2d8e-af34-4a8f-b78f-57471ca8467a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '655899a4-b05c-4b79-a23c-287d7a6d9a6e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5341',
  'x-ms-correlation-request-id',
  'a930eb24-1f6b-4866-8f31-0964c6e2cf93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090603Z:a930eb24-1f6b-4866-8f31-0964c6e2cf93',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '282d1ae6-3d55-40c5-a637-9ae75153a3c9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5340',
  'x-ms-correlation-request-id',
  '1bf7f94c-b2aa-43f9-b0d5-689879182fe3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090603Z:1bf7f94c-b2aa-43f9-b0d5-689879182fe3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fc478689-bcba-463f-b69a-08d0ef6659cb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5339',
  'x-ms-correlation-request-id',
  '46859243-307a-4499-b225-fbd18aa736be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090603Z:46859243-307a-4499-b225-fbd18aa736be',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '14a0500a-452b-41cf-9a92-5c4a59c9fbd0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5338',
  'x-ms-correlation-request-id',
  '7227fb4f-be92-4caa-9f85-ee2a0a22425c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090604Z:7227fb4f-be92-4caa-9f85-ee2a0a22425c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f0ded683-8df7-4994-98c9-2df7a6965b94',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5337',
  'x-ms-correlation-request-id',
  '91fe38c1-137e-49b5-96bd-1aae270a108c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090604Z:91fe38c1-137e-49b5-96bd-1aae270a108c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '99ce331b-bc3f-4dfe-9aec-26ce55940cc8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5336',
  'x-ms-correlation-request-id',
  '0053b022-22d2-4931-9d34-a374e8b0cd02',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090605Z:0053b022-22d2-4931-9d34-a374e8b0cd02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '22fd64e9-028b-4d91-87d2-a39794119875',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5335',
  'x-ms-correlation-request-id',
  '3da1d254-0865-4e10-9997-302cd0cdc3e5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090605Z:3da1d254-0865-4e10-9997-302cd0cdc3e5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0373a2a5-dbea-4616-b36f-11320cb1579c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5334',
  'x-ms-correlation-request-id',
  'f0ac0af6-9996-4c0c-bf72-dd499038f196',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090605Z:f0ac0af6-9996-4c0c-bf72-dd499038f196',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '20ab7bbd-5211-40b9-b915-84f1b9813277',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5333',
  'x-ms-correlation-request-id',
  '931d6c42-2df9-433f-9a7e-ec4a31a4c734',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090606Z:931d6c42-2df9-433f-9a7e-ec4a31a4c734',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9421a0cf-e3eb-498f-a06c-be44892f8c14',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5332',
  'x-ms-correlation-request-id',
  '0a88b87a-4ecd-45ad-a7d9-98ef312dabc0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090606Z:0a88b87a-4ecd-45ad-a7d9-98ef312dabc0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '28a5f9de-b8a4-4d3c-92c2-82a9f994c0a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5331',
  'x-ms-correlation-request-id',
  '55364c68-3e7e-48d3-a2cd-573580a5b67a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090607Z:55364c68-3e7e-48d3-a2cd-573580a5b67a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b984f50-8b5c-4fbb-a5d7-79e1e4cbce7b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5330',
  'x-ms-correlation-request-id',
  'ca6e7df0-5795-48d7-b704-3bee1cfa59bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090607Z:ca6e7df0-5795-48d7-b704-3bee1cfa59bc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '17788e1b-9c19-42e9-9006-2b8fe4f3d32b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5329',
  'x-ms-correlation-request-id',
  'a5e167fb-e43a-4b2b-bf49-e163dcf4a5d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090607Z:a5e167fb-e43a-4b2b-bf49-e163dcf4a5d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2d4a7068-d7e4-4cc7-a312-71eb4297e46a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5328',
  'x-ms-correlation-request-id',
  '2797c4a7-ea71-42e9-b67f-892f42039089',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090608Z:2797c4a7-ea71-42e9-b67f-892f42039089',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0156ce21-5a88-4729-910f-ea2fdefd072a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5327',
  'x-ms-correlation-request-id',
  '4f5ab772-65ee-437a-bff5-ac5e03c672ea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090608Z:4f5ab772-65ee-437a-bff5-ac5e03c672ea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe98c702-221f-4e63-9986-91ee25cff560',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5326',
  'x-ms-correlation-request-id',
  'd57bbcc3-1865-4a05-ab13-979cca36a198',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090608Z:d57bbcc3-1865-4a05-ab13-979cca36a198',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c26da8a6-54d5-4bb7-8561-d1348dbec75f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5325',
  'x-ms-correlation-request-id',
  'a816004f-2a5a-44a6-88bd-eef11c212f86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090609Z:a816004f-2a5a-44a6-88bd-eef11c212f86',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f8c6b304-6992-42a2-a69b-855a7857f16f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5324',
  'x-ms-correlation-request-id',
  'aeb33c5f-fce8-4376-ae89-00e9d0a260a4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090609Z:aeb33c5f-fce8-4376-ae89-00e9d0a260a4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ec4d0402-9767-4ff7-83f7-312ed37f44d5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5323',
  'x-ms-correlation-request-id',
  '22a91d07-14a9-493a-b718-d17c3591488b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090610Z:22a91d07-14a9-493a-b718-d17c3591488b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '469dbbd6-7b21-400b-8467-d6607ab6f651',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5322',
  'x-ms-correlation-request-id',
  '64ee2e4e-258e-480e-a2ac-279d6af83667',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090610Z:64ee2e4e-258e-480e-a2ac-279d6af83667',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c60c974f-3d47-4948-9d24-7de6d595e8bc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5321',
  'x-ms-correlation-request-id',
  'a393f0e6-a0a0-4add-96c7-03c2b9c7565c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090610Z:a393f0e6-a0a0-4add-96c7-03c2b9c7565c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9debaf0e-b4eb-4f1c-aee5-1bf83b6de756',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5320',
  'x-ms-correlation-request-id',
  '731ce79a-ad3b-47bf-9a15-de999f68830c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090611Z:731ce79a-ad3b-47bf-9a15-de999f68830c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '00a5be65-1550-497e-9cfa-5fd8a6e1bc11',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5319',
  'x-ms-correlation-request-id',
  '472d1b7a-4859-4878-a3e8-0021697fd057',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090611Z:472d1b7a-4859-4878-a3e8-0021697fd057',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bece7fe0-a212-4a67-9ee6-dcdbe72f328d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5318',
  'x-ms-correlation-request-id',
  '676c025d-aad4-4323-a494-1236abaf8166',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090612Z:676c025d-aad4-4323-a494-1236abaf8166',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4725253a-c028-436a-b8ec-1fb45ef4e964',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5317',
  'x-ms-correlation-request-id',
  '2e4668db-9cc4-45c2-ae01-aa7b3e1c2583',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090612Z:2e4668db-9cc4-45c2-ae01-aa7b3e1c2583',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7d11ab96-b980-48dc-a04d-2670b25552c6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5316',
  'x-ms-correlation-request-id',
  '39584e83-8fb4-46ca-9221-599bdd509e4b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090612Z:39584e83-8fb4-46ca-9221-599bdd509e4b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '05356379-9dba-4087-abdb-79bf65001cc4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5315',
  'x-ms-correlation-request-id',
  '150c2b68-e10e-4d49-a38d-5d2199851f9e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090613Z:150c2b68-e10e-4d49-a38d-5d2199851f9e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c1784cce-3ee6-4782-b2d3-92b896005608',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5314',
  'x-ms-correlation-request-id',
  'b55d9d95-74cd-4b04-9e9d-393556c47482',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090613Z:b55d9d95-74cd-4b04-9e9d-393556c47482',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a8cb04c5-83a3-420d-81f5-a74f8f5eef5c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5313',
  'x-ms-correlation-request-id',
  '0f625e82-4a0e-4ae4-b1e1-cfdc5cfc784e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090613Z:0f625e82-4a0e-4ae4-b1e1-cfdc5cfc784e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0bdcbc52-c1b5-4305-a6e1-5140383ca21d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5312',
  'x-ms-correlation-request-id',
  '55c66147-d3fe-4976-b32b-6daff78c3920',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090614Z:55c66147-d3fe-4976-b32b-6daff78c3920',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '993e2397-b53f-4d6d-ac9c-a30d670ad087',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5311',
  'x-ms-correlation-request-id',
  '74043106-f512-4fca-aeba-1383973e215d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090614Z:74043106-f512-4fca-aeba-1383973e215d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '72c4f3bd-48ee-42b6-af5e-369df54e7606',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5310',
  'x-ms-correlation-request-id',
  '4d759b7f-e72a-4ee1-8391-b50771f93697',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090615Z:4d759b7f-e72a-4ee1-8391-b50771f93697',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b19da29b-8543-4f46-8ec9-a746e48a9541',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5309',
  'x-ms-correlation-request-id',
  '6c008e7b-5eee-47ea-9d6d-e343370b7db3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090615Z:6c008e7b-5eee-47ea-9d6d-e343370b7db3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '37f1d375-ca58-4898-b187-ccb717a135b5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5308',
  'x-ms-correlation-request-id',
  'afed2fe7-c18a-4871-98e5-6eba9a5efad3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090615Z:afed2fe7-c18a-4871-98e5-6eba9a5efad3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d722a4c-ada9-4177-bd47-cac9d95726e6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5307',
  'x-ms-correlation-request-id',
  '6735c160-6233-4c9c-89b9-5191b833dacd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090616Z:6735c160-6233-4c9c-89b9-5191b833dacd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c5d31772-d59b-4e58-8053-61cbc7b9e6a3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5306',
  'x-ms-correlation-request-id',
  '36d71fbb-4a26-46ed-a1da-d27f3cbf5389',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090616Z:36d71fbb-4a26-46ed-a1da-d27f3cbf5389',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1c83e41f-eeca-47b1-b844-a3688d205df6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5305',
  'x-ms-correlation-request-id',
  '382a1fc7-3948-43a6-b6f4-a24e4ed6a942',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090617Z:382a1fc7-3948-43a6-b6f4-a24e4ed6a942',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '83736413-0228-407c-90af-93220b2d0875',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5304',
  'x-ms-correlation-request-id',
  '76765414-9482-40f6-a523-7c9ccb830a64',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090617Z:76765414-9482-40f6-a523-7c9ccb830a64',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c90a6333-bd4f-4e5e-806e-8afe43ba827b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5303',
  'x-ms-correlation-request-id',
  '89efd94a-eb7a-4dfe-b5c3-d18a01d2b166',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090617Z:89efd94a-eb7a-4dfe-b5c3-d18a01d2b166',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '33f0945d-3501-40a6-b835-f9457c2760de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5302',
  'x-ms-correlation-request-id',
  '595a155a-ea79-4a36-98da-6a0a1b3e2b01',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090618Z:595a155a-ea79-4a36-98da-6a0a1b3e2b01',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '98a9d578-7583-4a90-9fad-4c4bd9868525',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5301',
  'x-ms-correlation-request-id',
  '9ad48446-cdde-4177-afa0-ee8993848bab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090618Z:9ad48446-cdde-4177-afa0-ee8993848bab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5eb5b04e-f130-4de3-a3cb-4519c47c8800',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5300',
  'x-ms-correlation-request-id',
  'b94568a4-eed2-4243-af1b-2f9a72fb5b39',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090619Z:b94568a4-eed2-4243-af1b-2f9a72fb5b39',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0e18c311-f85a-4f67-bf2f-3d02802488c8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5299',
  'x-ms-correlation-request-id',
  'c1ce83c6-ad0e-4b3a-92ee-0894406f0212',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090619Z:c1ce83c6-ad0e-4b3a-92ee-0894406f0212',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd24c280b-d6a4-4ba7-a1b1-528a8a83506e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5298',
  'x-ms-correlation-request-id',
  '8c8754e4-38f3-4bb7-8244-9ead6a53f879',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090619Z:8c8754e4-38f3-4bb7-8244-9ead6a53f879',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40ab811f-c2d9-4571-858b-b984723276ea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5297',
  'x-ms-correlation-request-id',
  'cb56db1c-2e83-4b89-98b9-7cb9b57bd6ae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090620Z:cb56db1c-2e83-4b89-98b9-7cb9b57bd6ae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e03eaa28-3684-4134-900a-17c202bb5820',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5296',
  'x-ms-correlation-request-id',
  'cdedaa14-9f25-4154-8839-97a1b7de9e4b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090620Z:cdedaa14-9f25-4154-8839-97a1b7de9e4b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '69fe4027-4642-4290-9dab-47ded5ab5a97',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5295',
  'x-ms-correlation-request-id',
  '4185c770-bc40-4ec1-9f5e-8522199c45dd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090621Z:4185c770-bc40-4ec1-9f5e-8522199c45dd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2f1352d0-4f08-4786-b5b9-a5e39d24303b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5294',
  'x-ms-correlation-request-id',
  '25d5ec48-e87a-44c7-b6a1-7f660339a689',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090621Z:25d5ec48-e87a-44c7-b6a1-7f660339a689',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6e8e2b30-60a8-4fd6-81f6-59042b8a8f82',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5293',
  'x-ms-correlation-request-id',
  '902a106e-d987-45f6-89ca-93b79084d2c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090621Z:902a106e-d987-45f6-89ca-93b79084d2c5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b339351d-a9d9-40ba-8194-96c309fe8169',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5292',
  'x-ms-correlation-request-id',
  'cf601300-5559-4da3-ab1a-e6598c6c7555',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090622Z:cf601300-5559-4da3-ab1a-e6598c6c7555',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '77e6e053-092c-4a08-81ad-63a6a9ea6729',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5291',
  'x-ms-correlation-request-id',
  'a9269729-7e88-4a7e-9ed8-d21cbad489ec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090622Z:a9269729-7e88-4a7e-9ed8-d21cbad489ec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5912e474-2c38-47db-8394-8a58614f1666',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5290',
  'x-ms-correlation-request-id',
  '1ae47a2d-e76b-492e-95df-9d9dcbb21d9d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090622Z:1ae47a2d-e76b-492e-95df-9d9dcbb21d9d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a79e86a4-e7ea-4b70-b060-74baf5d6fa3b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5289',
  'x-ms-correlation-request-id',
  'b2c3af47-4eb5-4dba-8ac1-db75175fb8d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090623Z:b2c3af47-4eb5-4dba-8ac1-db75175fb8d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '04d523b4-0f74-42d4-9fb7-ab2aa7c02ddf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5288',
  'x-ms-correlation-request-id',
  '5b407410-f876-4f77-96c6-e8567a413e5c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090623Z:5b407410-f876-4f77-96c6-e8567a413e5c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '450390bc-e6c3-468f-b628-894f666236a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5287',
  'x-ms-correlation-request-id',
  'dcbe763b-a927-423c-b580-f43cd3cbaeeb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090624Z:dcbe763b-a927-423c-b580-f43cd3cbaeeb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b4b3ec63-0b69-4174-988a-0cfe5f3ed16a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5286',
  'x-ms-correlation-request-id',
  'bc84201f-d493-4f65-9790-15191cb05802',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090624Z:bc84201f-d493-4f65-9790-15191cb05802',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6ed1550-37bc-4b05-bda5-96ea594f4ada',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5285',
  'x-ms-correlation-request-id',
  'ad6263e7-8c2f-46fc-96ee-034f65c6dfbf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090624Z:ad6263e7-8c2f-46fc-96ee-034f65c6dfbf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9489edb2-3928-4270-b146-b78056eb6efa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5284',
  'x-ms-correlation-request-id',
  '26d442b6-9239-4989-aeee-f055eb1a8ae7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090625Z:26d442b6-9239-4989-aeee-f055eb1a8ae7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '21543837-affb-43bf-aaa8-ac2847bc46a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5283',
  'x-ms-correlation-request-id',
  '3e7a7625-4e08-4990-beea-c2f814c9befd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090625Z:3e7a7625-4e08-4990-beea-c2f814c9befd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7fe7e23e-045a-4e7a-8ed5-99f7b6135c72',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5282',
  'x-ms-correlation-request-id',
  '328c46e0-21fe-4075-952a-508f92c67eb7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090626Z:328c46e0-21fe-4075-952a-508f92c67eb7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0394c8f9-b449-4774-8b77-bbd7d5096255',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5281',
  'x-ms-correlation-request-id',
  '50759b62-c0d1-432c-b270-33c51b82fbf1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090626Z:50759b62-c0d1-432c-b270-33c51b82fbf1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'feb7a2eb-19e8-4ed5-9cf1-dc72d4231167',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5280',
  'x-ms-correlation-request-id',
  'a61cc0f8-8102-4bd9-9c5f-2e0ec48a284c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090626Z:a61cc0f8-8102-4bd9-9c5f-2e0ec48a284c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '66fdff2a-5a7e-4211-86b1-953d9b334297',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5279',
  'x-ms-correlation-request-id',
  'ca761e75-a022-4873-8259-6a3f07fa8b5e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090627Z:ca761e75-a022-4873-8259-6a3f07fa8b5e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c9037c64-a49b-4e7f-b54f-d07171678782',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5278',
  'x-ms-correlation-request-id',
  '62094f7c-0e93-47a3-80f4-426d85b0484c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090627Z:62094f7c-0e93-47a3-80f4-426d85b0484c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e6d2e425-f81b-4197-b20b-a83ec771699e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5277',
  'x-ms-correlation-request-id',
  'ac3db146-c8f5-41f3-b6c0-4784e92bc6a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090627Z:ac3db146-c8f5-41f3-b6c0-4784e92bc6a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '10ad99a3-3dc5-46a1-bde8-c7b0ed0a8bc6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5276',
  'x-ms-correlation-request-id',
  '2b446b8c-9bae-450d-8c63-d80772f18805',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090628Z:2b446b8c-9bae-450d-8c63-d80772f18805',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '654b2121-23d7-4ace-b8cb-ab73e80296d1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5275',
  'x-ms-correlation-request-id',
  '96e8e741-eebf-44c6-a8de-c5a7821292ab',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090628Z:96e8e741-eebf-44c6-a8de-c5a7821292ab',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4fd2f859-ecc9-44a5-889e-5409a2267290',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5274',
  'x-ms-correlation-request-id',
  'd8ca3425-0c6a-4d80-9de1-fe8b07b07fd5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090629Z:d8ca3425-0c6a-4d80-9de1-fe8b07b07fd5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a4ea92ad-7727-4fa2-8568-0b08f1c672a0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5273',
  'x-ms-correlation-request-id',
  'b6858b8a-be52-49f4-9f45-904106406903',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090629Z:b6858b8a-be52-49f4-9f45-904106406903',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ad2012b5-08d6-45b5-9e38-a30df22f1486',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5272',
  'x-ms-correlation-request-id',
  'b5b946ba-5512-4463-92e4-3d280f640cac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090629Z:b5b946ba-5512-4463-92e4-3d280f640cac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '062b622a-004b-4ed9-ae80-5aa6b4793681',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5271',
  'x-ms-correlation-request-id',
  'e6ed97ff-3539-4001-8bde-988847f04f94',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090630Z:e6ed97ff-3539-4001-8bde-988847f04f94',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4f1c75da-f11f-4ecf-b879-708b08285c64',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5270',
  'x-ms-correlation-request-id',
  '36a4f98a-f173-4923-ae01-3a6e3edb5015',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090630Z:36a4f98a-f173-4923-ae01-3a6e3edb5015',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4293d8b2-9298-44ff-a0ca-3692916f1858',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5269',
  'x-ms-correlation-request-id',
  '22168e30-ba9b-4922-ac12-9c4d1e1cdfb1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090630Z:22168e30-ba9b-4922-ac12-9c4d1e1cdfb1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1c1f9b19-12ef-4bea-97ed-849701fa6ac3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5268',
  'x-ms-correlation-request-id',
  '4dc3af53-85ab-4cd3-98a7-a5c9dae58344',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090631Z:4dc3af53-85ab-4cd3-98a7-a5c9dae58344',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==?api-version=2021-04-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '745fca15-0324-4050-9ead-b718d7f1f302',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5267',
  'x-ms-correlation-request-id',
  '4548a64a-2027-4cbd-88a4-e870d6cafb9f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090631Z:4548a64a-2027-4cbd-88a4-e870d6cafb9f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myserviceyyy2/operationresults/ZWFzdHVzOm15c2VydmljZXl5eTJfVGVybV83Y2E4NTYxOQ==')
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
  '10ba2e17-d529-4557-bfab-ad4374e65cb3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5266',
  'x-ms-correlation-request-id',
  '229e501e-8e2e-4de7-9a5b-67a18babc173',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090632Z:229e501e-8e2e-4de7-9a5b-67a18babc173',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:31 GMT',
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
  '41c541f1-6dd6-4ada-b8d5-784f1ed9efe1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5265',
  'x-ms-correlation-request-id',
  'ac84000b-752b-45ee-8d8a-81c1c969027d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090632Z:ac84000b-752b-45ee-8d8a-81c1c969027d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:06:31 GMT'
]);
