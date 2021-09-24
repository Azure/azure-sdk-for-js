let nock = require('nock');

module.exports.hash = "ca10b212da5b0d5cf4f0c9d5619a1ecf";

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
  '511c7ce6-7148-43e3-a56f-8b9787410800',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqncyUrxSElCqiimajJiNj4; expires=Sun, 24-Oct-2021 06:50:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7LIThtYDrZG_CsCTmf15ceIxtBBnX115YGzK-uE6SFPVSlhrFQOaRIMKve4vdE-MdMZE4Kv0ASXyBUtLXhkImn2NwljAN8el2paLzZIVA-VQB2JdWrbSLGGsJoZDyHJIrD9fmmiNUyczTEXAF_WWJMRWsLQsReFmIW4L1oGI2QsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:29 GMT',
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
  '9ba6f45d-c4e8-4eef-b292-a7c2c7090900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnhLH_dRUP1KpXJDl8G0bcI; expires=Sun, 24-Oct-2021 06:50:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEonYOTPrgL146v8PHK-_1yPrVWoWEAVtphD0AGHnQSiTGHznZRFT2F411Q6gP7ncxgIriWp6gCxt7vKdUUxSj1hm4o3emYjVU1D4IhFG09sHlZpbTBcAWdXKYrNM1ZHIjX76EDuK14G9ZqnzlmtsIJ2cCoVsVxxoZREgqgzKBZUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=82a645b2-3aab-4bd0-9f12-17f9048be3d5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1351',
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
  '9ba6f45d-c4e8-4eef-b292-a7c2c8090900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Arm7UMedvTVPlOxluaSN5rUWPr5BAQAAADZs39gOAAAA; expires=Sun, 24-Oct-2021 06:50:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedddbb77f73f1a7db4cc163921d3fdb8bd5ee1e31ba0a16176d17cf4e817ff92d1476535cd30147aed346bdaf4abd7f4754edfd307c7fc3c79f2a2f889cfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6cec3edbdfd373b9f3edad97f746f6f7cefd3dd7b3bfb3f458d2fa8e95576fd550df4e66dbb6a1edd0d2763cc886d13eae365deba575ee517d475566e78753b2782af9bed9ddd71adad7bd05655dd6e04329616bd1767f9655e62be5ef2f79b20d8a63d200bcb3bc4489b40b8863d18cd74b1e94dfabaf7cabc6a5a70f849b53c2f2ed635b30a31ddf77eb1e1709adb77d7da52992b04db05992fa71531c709f897998f5e59aecb72f4d1dbfcfa27b375d99e9174cb2753d7e865d63457556dbf5ae617c4bdf4c54959d0600370e759d9e4c1dbe6ad597e8e1e5e37e513626662c78f1eb5f59ada92f02fdba2bd1668510c5eb3e6a0f13d591784e492c6e27f4b7cbd26cae0b55ff27d621748dcf4ece5f16c464aa781a47e8f587c7cb04f4c3ddebb7fef2334aa8b4b7a37680500a38fb2d9ac00adb3f2b9aa05fbd56551b7ebac7c91b7448fb7c1cc9826d375d3560b9a1a6225a3259c2afa2e0d9de4f8181313eaa5f1e7840d89ccf8753e5dd7448e31c168ab695536e33765b3bb43a37f06e2d2d8bf0978bbdf203c9ad37b1f8edf49b1222d49d8915d29f3a779b3fbe9c107037d924ddf927af590c5e03f1cd938dc0f276a1fee0711d703437a8194dbb749ffec596864fa42967e239ae545b544579e8c111f0b7fcf8a269b94b97660059e94cc4fd2e491209054346d9d15cb16acbf289684997e2530a85395d095ca9e937995cad3e56c55110482b5cca7102fed9fde6ddeae0118aa913025d95fce32d24d846db6caa644c38f1eed5233a355e4bdd1473fa02119","20ff0fb1a2b8d8c6080000"], [
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
  '"AAAAAABBNiQ="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9863fd3a-00ea-4922-840b-f71347564c3e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4758',
  'x-ms-correlation-request-id',
  '44a611f4-3b31-420b-8381-3664fb6d368c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065031Z:44a611f4-3b31-420b-8381-3664fb6d368c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:30 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5","name":"myservicexxx5","type":"Microsoft.ApiManagement/service","tags":{},"location":"East US","etag":"AAAAAABBNic=","properties":{"publisherEmail":"foo@contoso.com","publisherName":"foo","notificationSenderEmail":"apimgmt-noreply@mail.windowsazure.com","provisioningState":"Succeeded","targetProvisioningState":"Deleting","createdAtUtc":"2021-09-24T06:04:32.361304Z","gatewayUrl":"https://myservicexxx5.azure-api.net","gatewayRegionalUrl":"https://myservicexxx5-eastus-01.regional.azure-api.net","portalUrl":"https://myservicexxx5.portal.azure-api.net","developerPortalUrl":"https://myservicexxx5.developer.azure-api.net","managementApiUrl":"https://myservicexxx5.management.azure-api.net","scmUrl":"https://myservicexxx5.scm.azure-api.net","hostnameConfigurations":[{"type":"Proxy","hostName":"myservicexxx5.azure-api.net","encodedCertificate":null,"keyVaultId":null,"certificatePassword":null,"negotiateClientCertificate":false,"certificate":null,"defaultSslBinding":true,"identityClientId":null,"certificateSource":"BuiltIn","certificateStatus":null}],"publicIPAddresses":["20.84.36.253"],"privateIPAddresses":null,"additionalLocations":null,"virtualNetworkConfiguration":null,"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Ciphers.TripleDes168":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls10":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Tls11":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Backend.Protocols.Ssl30":"False","Microsoft.WindowsAzure.ApiManagement.Gateway.Protocols.Server.Http2":"False"},"virtualNetworkType":"None","certificates":null,"disableGateway":false,"apiVersionConstraint":{"minApiVersion":null},"publicIpAddressId":null,"privateEndpointConnections":null},"sku":{"name":"Standard","capacity":1},"identity":null,"zones":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2254',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '24b2f2ec-d24f-4549-a44e-955928d75a32',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  '67c0b15a-03e4-4973-bbd9-3107995f482b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065033Z:67c0b15a-03e4-4973-bbd9-3107995f482b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0064b462-5be0-41b6-a926-4d35ba86da1f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4757',
  'x-ms-correlation-request-id',
  'a1aeb1f6-4bf7-4bb5-b011-3293c6124990',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065033Z:a1aeb1f6-4bf7-4bb5-b011-3293c6124990',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0fb24504-6603-473a-a7bf-467dc9fd83ce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4756',
  'x-ms-correlation-request-id',
  '3eeb2531-e180-43e8-8f38-1a6dab99fe00',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065034Z:3eeb2531-e180-43e8-8f38-1a6dab99fe00',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b429cefc-6d96-4fc3-8476-2b05d6806ecc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4755',
  'x-ms-correlation-request-id',
  '1a3962fe-f893-4a89-97bf-3fcd44df7e5b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065034Z:1a3962fe-f893-4a89-97bf-3fcd44df7e5b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6fb16263-09e0-4757-a228-ab9307548209',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4754',
  'x-ms-correlation-request-id',
  '1c496934-bc2b-4cba-b4f6-b355a8e2b0e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065034Z:1c496934-bc2b-4cba-b4f6-b355a8e2b0e2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c072938e-5f53-44b7-9c2a-94320b2c8773',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4753',
  'x-ms-correlation-request-id',
  'c5584d7e-9052-4960-9418-68ffffd9f09b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065035Z:c5584d7e-9052-4960-9418-68ffffd9f09b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'db00491d-109a-449c-b426-da3605494a16',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4752',
  'x-ms-correlation-request-id',
  '339aee55-15c9-40e7-9262-c42e2ba643ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065035Z:339aee55-15c9-40e7-9262-c42e2ba643ef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3dde5f5d-3f7e-4ac6-a3b4-2c7d3020772a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4751',
  'x-ms-correlation-request-id',
  'e09d0a84-abfb-4e8a-a81b-2394d2a3779b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065036Z:e09d0a84-abfb-4e8a-a81b-2394d2a3779b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7835a481-6313-4905-bf1a-bc181a95499f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4750',
  'x-ms-correlation-request-id',
  '4a8f6bad-7dd5-4071-a73f-b1c4e2169a6c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065036Z:4a8f6bad-7dd5-4071-a73f-b1c4e2169a6c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '67d3682e-617a-4cce-bb65-bf3bd136b3e4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4749',
  'x-ms-correlation-request-id',
  '195e5f65-7616-490b-a4d3-1e5bfaad73bc',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065036Z:195e5f65-7616-490b-a4d3-1e5bfaad73bc',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '469eff22-6190-4a2c-b6d9-125a216e7594',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4748',
  'x-ms-correlation-request-id',
  'ac4937bf-cadd-406e-8549-a3dc0c1a0978',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065037Z:ac4937bf-cadd-406e-8549-a3dc0c1a0978',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '35628ca0-26a6-4eba-99bc-55e92b8105ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4747',
  'x-ms-correlation-request-id',
  '81fd9e2c-c010-49d6-a3b3-5991386c24da',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065037Z:81fd9e2c-c010-49d6-a3b3-5991386c24da',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3f4ead1d-20a0-482a-9bae-2b1b1a2d5409',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4746',
  'x-ms-correlation-request-id',
  'ecfadf87-32d1-4458-bc38-379e47899614',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065038Z:ecfadf87-32d1-4458-bc38-379e47899614',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c87aee63-a5e2-45f4-8d54-f980a2eb3660',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4745',
  'x-ms-correlation-request-id',
  '0563a923-1f87-4326-b28c-a8baed8f4e17',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065038Z:0563a923-1f87-4326-b28c-a8baed8f4e17',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63373cf9-dca8-4026-84ce-8d2f003a99d3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4744',
  'x-ms-correlation-request-id',
  '2efe5ae7-50ca-4674-b871-1e8233af838a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065038Z:2efe5ae7-50ca-4674-b871-1e8233af838a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '454557a3-7d26-4a60-a30b-020b7a6800fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4743',
  'x-ms-correlation-request-id',
  '0cc230ab-f320-42b9-bc14-964b0d552ff0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065039Z:0cc230ab-f320-42b9-bc14-964b0d552ff0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '228a14ea-7c15-46df-bbe1-60da77eb1335',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4742',
  'x-ms-correlation-request-id',
  'e3ee9bca-fe0f-4ecc-8294-ee0f3d175206',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065039Z:e3ee9bca-fe0f-4ecc-8294-ee0f3d175206',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '509b1443-e715-45ed-aae6-6197df57cd60',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4741',
  'x-ms-correlation-request-id',
  '72f00104-f356-4a4c-a2d6-733d5488a61e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065040Z:72f00104-f356-4a4c-a2d6-733d5488a61e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1306f9f0-25c8-46a7-a357-fd60d00342ce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4740',
  'x-ms-correlation-request-id',
  '9683aa88-c494-4d80-b8a5-5a7ef35cc34a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065040Z:9683aa88-c494-4d80-b8a5-5a7ef35cc34a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '18ec5c07-fb19-4830-aae2-8ef4ebdba389',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4739',
  'x-ms-correlation-request-id',
  '7491223f-0336-478b-bbb9-48a40fcfb94e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065040Z:7491223f-0336-478b-bbb9-48a40fcfb94e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '820fb7c5-8389-4339-8658-57e3d9e15847',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4738',
  'x-ms-correlation-request-id',
  'de514d26-7665-4492-9702-b4bd95a36fec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065041Z:de514d26-7665-4492-9702-b4bd95a36fec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9279b735-f649-4bb5-a07d-ee98d524b0f6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4737',
  'x-ms-correlation-request-id',
  'cc6e8d6c-e4db-4711-aa3d-bc220e1bf5c5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065041Z:cc6e8d6c-e4db-4711-aa3d-bc220e1bf5c5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '868a3be4-cf82-4e70-b247-0c55dcbfdc1e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4736',
  'x-ms-correlation-request-id',
  'd900faa5-f5fc-4624-8cc2-281bc1c1a4b0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065041Z:d900faa5-f5fc-4624-8cc2-281bc1c1a4b0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd676bb64-819c-49b2-b27d-681ad6c9a0d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4735',
  'x-ms-correlation-request-id',
  '3350869b-24fa-410b-95bc-54358a3c990c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065042Z:3350869b-24fa-410b-95bc-54358a3c990c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7f9dcbec-3b8d-42e3-8e7e-1a825e064a3e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4734',
  'x-ms-correlation-request-id',
  '50cd1e4c-c083-4ba8-948c-305b5c8a8045',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065042Z:50cd1e4c-c083-4ba8-948c-305b5c8a8045',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '881c0a66-d2f7-4312-bd08-2f9ba9a005d6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4733',
  'x-ms-correlation-request-id',
  'b12f8d0f-7723-4248-b29d-278e2b8fc1bf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065043Z:b12f8d0f-7723-4248-b29d-278e2b8fc1bf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '377a6176-ca1a-4384-af5a-b213674d98cc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4732',
  'x-ms-correlation-request-id',
  '5ab724ff-de19-4dec-bbd9-47073cb1f5c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065043Z:5ab724ff-de19-4dec-bbd9-47073cb1f5c3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ab8f6023-eacd-4a60-9492-54ec46f3f821',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4731',
  'x-ms-correlation-request-id',
  'c267eed7-b0f6-4c88-b989-2b6a7311e0c9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065043Z:c267eed7-b0f6-4c88-b989-2b6a7311e0c9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4f4da7f0-df81-4717-87e0-82cb7dc9ed81',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4730',
  'x-ms-correlation-request-id',
  '876a656e-bbb2-4ae4-8cd7-9e330f3c3375',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065044Z:876a656e-bbb2-4ae4-8cd7-9e330f3c3375',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fd9f28b6-b5f0-4b5d-a2b0-c22f720d699b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4729',
  'x-ms-correlation-request-id',
  '0b55a0c3-c0d4-4b1f-a215-f88bc8093e86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065044Z:0b55a0c3-c0d4-4b1f-a215-f88bc8093e86',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a5ac7eb2-6af4-47de-ae2e-ee40419d7cb6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4728',
  'x-ms-correlation-request-id',
  'f35565f5-da10-491d-a882-8a01774fb00b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065045Z:f35565f5-da10-491d-a882-8a01774fb00b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '744f5b92-0957-439a-a8f9-4361e7b83f99',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4727',
  'x-ms-correlation-request-id',
  '6cac0098-2980-4241-91fc-9dbf56f09f7e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065045Z:6cac0098-2980-4241-91fc-9dbf56f09f7e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd4166106-f5e0-4c79-bafb-21f82bb47642',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4726',
  'x-ms-correlation-request-id',
  'ba42bfea-d151-4a58-ae42-7b9157f9e339',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065045Z:ba42bfea-d151-4a58-ae42-7b9157f9e339',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0d96340e-08bb-46cd-ac49-e225a0af9117',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4725',
  'x-ms-correlation-request-id',
  '20c8c6e9-3679-4dc0-a08c-6da2d910b0ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065046Z:20c8c6e9-3679-4dc0-a08c-6da2d910b0ef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '075b65b3-6cd5-4af6-8693-5dfa71b7b487',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4724',
  'x-ms-correlation-request-id',
  '4b5c9b9d-459a-4972-a796-e237cb073639',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065046Z:4b5c9b9d-459a-4972-a796-e237cb073639',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0095e9ea-1eef-478a-9ca3-1715e140e1e7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4723',
  'x-ms-correlation-request-id',
  '846245c3-2771-4ba3-a20c-7344417cd21a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065046Z:846245c3-2771-4ba3-a20c-7344417cd21a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2584f4ea-d99f-4f50-aaa6-2bd248530228',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4722',
  'x-ms-correlation-request-id',
  '19edb705-26ca-42a7-bbc3-aa79fa907311',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065047Z:19edb705-26ca-42a7-bbc3-aa79fa907311',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5409b09f-7e6c-4574-a91b-445c37a6b997',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4721',
  'x-ms-correlation-request-id',
  '58f0ef3a-4206-4ba7-9639-11173d98b08e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065047Z:58f0ef3a-4206-4ba7-9639-11173d98b08e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '85077198-a4f7-4db8-ade8-5dddc2f810a8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4720',
  'x-ms-correlation-request-id',
  'af061dc7-1e20-432f-87ed-aec79e840804',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065048Z:af061dc7-1e20-432f-87ed-aec79e840804',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f1ca661d-7791-43be-a206-7bb49bbd85c2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4719',
  'x-ms-correlation-request-id',
  'dbbd560f-c2b5-4589-8a68-f241c5b9fe66',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065048Z:dbbd560f-c2b5-4589-8a68-f241c5b9fe66',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f7cfc9bb-0620-4b5b-bfef-66b7aa4ad6a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4718',
  'x-ms-correlation-request-id',
  '9c8816e8-ef87-4120-a900-4a46766df98a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065049Z:9c8816e8-ef87-4120-a900-4a46766df98a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a34c117a-5a9d-477a-a8ec-bf4af88b4071',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4717',
  'x-ms-correlation-request-id',
  '4b067b8f-48af-4083-9aef-78444f018c47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065049Z:4b067b8f-48af-4083-9aef-78444f018c47',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8ead1f81-abde-4e16-8efa-b9281126ecea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4716',
  'x-ms-correlation-request-id',
  '545d28f9-6ede-4b66-b664-f61303a57a72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065049Z:545d28f9-6ede-4b66-b664-f61303a57a72',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '10d635c5-2d31-419c-a848-c064c76df356',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4715',
  'x-ms-correlation-request-id',
  '727e2190-114d-41c2-a490-4f53947a4cd4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065050Z:727e2190-114d-41c2-a490-4f53947a4cd4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'baecf498-1b44-483a-b10f-4ab1b2678a3f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4714',
  'x-ms-correlation-request-id',
  'bf737342-53b3-4db4-a134-9ea5519d870b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065050Z:bf737342-53b3-4db4-a134-9ea5519d870b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d0e1026-d7d1-484b-8788-c13d32114e7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4713',
  'x-ms-correlation-request-id',
  '4c0767ba-2758-4255-ae73-6c390bd7f370',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065051Z:4c0767ba-2758-4255-ae73-6c390bd7f370',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '43e9e073-d335-4ba8-ae08-a51318687997',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4712',
  'x-ms-correlation-request-id',
  'b91e77a0-941f-4773-9911-1592fd607319',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065051Z:b91e77a0-941f-4773-9911-1592fd607319',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '29b9f5eb-2d6b-48b3-80f5-7e70634b9072',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4711',
  'x-ms-correlation-request-id',
  'f1ec8e41-06ec-4529-8bef-b2c907de29f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065051Z:f1ec8e41-06ec-4529-8bef-b2c907de29f6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '66da2d30-0d19-4f7a-a57b-1049ec20f412',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4710',
  'x-ms-correlation-request-id',
  'ed737f05-f5aa-47a2-9ef7-ece9e27f441b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065052Z:ed737f05-f5aa-47a2-9ef7-ece9e27f441b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4117f51e-700b-4b22-828e-3514c8d1e6e2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4709',
  'x-ms-correlation-request-id',
  'bdf8c1a4-1865-4414-8987-8259d885144e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065052Z:bdf8c1a4-1865-4414-8987-8259d885144e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '44cc79db-5d79-4dfe-93d2-460e85d2c50f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4708',
  'x-ms-correlation-request-id',
  '1986fa4b-4ead-4b09-9063-faff606a3dd7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065052Z:1986fa4b-4ead-4b09-9063-faff606a3dd7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '732d6b5b-1c06-4339-bdee-1453fdbe0a12',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4707',
  'x-ms-correlation-request-id',
  '181d6aac-8ad1-4474-bf34-3dbf96814778',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065053Z:181d6aac-8ad1-4474-bf34-3dbf96814778',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5c8f11ac-627e-4534-937a-4fad407b93d7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4706',
  'x-ms-correlation-request-id',
  '1319cc09-ce5e-4fcc-96c3-c65a792ec1d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065053Z:1319cc09-ce5e-4fcc-96c3-c65a792ec1d4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b517f73-a968-4145-83fc-f1f9a8f68df1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4705',
  'x-ms-correlation-request-id',
  '99719320-a368-4079-b082-a0f43d8829e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065054Z:99719320-a368-4079-b082-a0f43d8829e2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd98b49b5-2702-49cf-8840-b1e94a505989',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4704',
  'x-ms-correlation-request-id',
  'c476db25-3d92-4937-83cb-72903c22cc78',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065054Z:c476db25-3d92-4937-83cb-72903c22cc78',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '23cb08a1-c818-444a-bd6b-197b63201b65',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4703',
  'x-ms-correlation-request-id',
  '1fc66f8d-13cb-4659-86cc-582071718b0c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065054Z:1fc66f8d-13cb-4659-86cc-582071718b0c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b67e1c0-c960-44ca-9179-d9608321a39c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4702',
  'x-ms-correlation-request-id',
  'be50ff4f-4722-46ec-b8aa-1e29d978f6ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065055Z:be50ff4f-4722-46ec-b8aa-1e29d978f6ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '183e468c-54bc-4874-929f-3e1e31d418b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4701',
  'x-ms-correlation-request-id',
  '93991a46-8664-44d3-82a0-3723bb566e24',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065055Z:93991a46-8664-44d3-82a0-3723bb566e24',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a2429a47-ea4f-4f59-9107-a5c11452a839',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4700',
  'x-ms-correlation-request-id',
  '8abb047b-06bb-4e4c-b276-d84fe2511b2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065055Z:8abb047b-06bb-4e4c-b276-d84fe2511b2a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0424cc42-94e2-47c0-bf57-10bd7a8d8ad7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4699',
  'x-ms-correlation-request-id',
  '59c90bb9-017f-4f38-b6e7-e2677aa7eca3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065056Z:59c90bb9-017f-4f38-b6e7-e2677aa7eca3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'caec0263-322d-4df1-bc6d-4e954e88dde8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4698',
  'x-ms-correlation-request-id',
  'b8370a59-6139-4eec-81ae-153d35fa22ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065056Z:b8370a59-6139-4eec-81ae-153d35fa22ed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '54f04759-af1c-439f-a72c-40f4456b140f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4697',
  'x-ms-correlation-request-id',
  '5702993a-89c8-4818-8e96-aaed5b44dd93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065057Z:5702993a-89c8-4818-8e96-aaed5b44dd93',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e1163fa9-0222-46d5-b31b-094aa4520a5b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4696',
  'x-ms-correlation-request-id',
  '20f36339-e25e-4ac9-8aea-1303f41099e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065057Z:20f36339-e25e-4ac9-8aea-1303f41099e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63a97c91-9f5b-446b-8074-de3387bffc84',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4695',
  'x-ms-correlation-request-id',
  '3019216d-2e7a-4918-8784-b1a0ad7bedd4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065057Z:3019216d-2e7a-4918-8784-b1a0ad7bedd4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '81ca50b1-9727-4a06-ab0c-d7b645913c48',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4694',
  'x-ms-correlation-request-id',
  '23f18f41-d1ab-4471-bcd9-a82f67523b72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065058Z:23f18f41-d1ab-4471-bcd9-a82f67523b72',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6b637e49-fdee-489b-98d8-8b138dd5eb24',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4693',
  'x-ms-correlation-request-id',
  '5ec80142-a80e-4999-815b-d4d75ddd0179',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065058Z:5ec80142-a80e-4999-815b-d4d75ddd0179',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '70d4351b-ac17-4cf6-b3bb-68e48f750436',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4692',
  'x-ms-correlation-request-id',
  '07a35dee-9dcc-4191-9f93-02f879c0e2b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065059Z:07a35dee-9dcc-4191-9f93-02f879c0e2b2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3373a35f-d3e9-4ec8-aea5-744411ead893',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4691',
  'x-ms-correlation-request-id',
  '21b149f6-738b-4a6a-900d-ca8d1c9165d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065059Z:21b149f6-738b-4a6a-900d-ca8d1c9165d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '14cb34f5-2906-4569-93cf-d0a52f82ad60',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4690',
  'x-ms-correlation-request-id',
  'cc4360fc-ee80-4d06-a2b5-65883b368451',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065059Z:cc4360fc-ee80-4d06-a2b5-65883b368451',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '019fecc4-5883-4602-93e2-d63e1d0b7d7a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4689',
  'x-ms-correlation-request-id',
  '61362619-749d-4f7e-a0a4-84223b0a6764',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065100Z:61362619-749d-4f7e-a0a4-84223b0a6764',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2ca519a5-28ed-45ca-9b59-9cfc52ec6660',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4688',
  'x-ms-correlation-request-id',
  '653094ce-8be6-4518-a8fd-3a57ddcc70f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065100Z:653094ce-8be6-4518-a8fd-3a57ddcc70f1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1cfb2b8e-6dde-42a7-b1ee-3170494ed871',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4687',
  'x-ms-correlation-request-id',
  '25890dcc-b902-4319-8690-4ef29897a12c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065101Z:25890dcc-b902-4319-8690-4ef29897a12c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9c1338a9-7926-473c-b543-4b83ef224803',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4686',
  'x-ms-correlation-request-id',
  '3d9205a2-a9d7-4108-8ecb-84abdb8bf3a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065101Z:3d9205a2-a9d7-4108-8ecb-84abdb8bf3a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '93b4fc6c-99b4-40fa-a2aa-de92d4df0615',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4685',
  'x-ms-correlation-request-id',
  'f4daf5b7-9791-4d98-bb74-b3232a07ad47',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065101Z:f4daf5b7-9791-4d98-bb74-b3232a07ad47',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9817d7a2-a27e-4ba4-9437-b5b748ba0b97',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4684',
  'x-ms-correlation-request-id',
  '91741016-96f4-47a7-8525-fbe1cecf0ad6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065102Z:91741016-96f4-47a7-8525-fbe1cecf0ad6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a3188aac-f13d-4bd0-931c-18b186350e2d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4683',
  'x-ms-correlation-request-id',
  'ae97743a-609a-4446-b0c0-fbf1069de660',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065102Z:ae97743a-609a-4446-b0c0-fbf1069de660',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '23f897b5-b4e7-4ff1-8963-016b7a1829c7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4682',
  'x-ms-correlation-request-id',
  '7425ba33-5e24-4fa6-87a7-69c8c6833dea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065102Z:7425ba33-5e24-4fa6-87a7-69c8c6833dea',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ad78ab1-d236-4c14-9bcf-5a15e8f04baf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4681',
  'x-ms-correlation-request-id',
  'abb8d043-9f09-4bb5-bca3-34b014583f13',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065103Z:abb8d043-9f09-4bb5-bca3-34b014583f13',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd271028b-94a3-487d-ad7b-62e33fe5bff2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4680',
  'x-ms-correlation-request-id',
  '08b85458-5f5c-4811-855b-da6fa8da6f75',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065103Z:08b85458-5f5c-4811-855b-da6fa8da6f75',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '779cf33a-7ad8-411d-b229-828a2f686960',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4679',
  'x-ms-correlation-request-id',
  '5b6baada-c0f6-4972-a2da-11cf05516146',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065104Z:5b6baada-c0f6-4972-a2da-11cf05516146',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8bc4c46c-7d02-4188-83ee-dd35598374df',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4678',
  'x-ms-correlation-request-id',
  '8587f092-b16b-4159-b1dc-00fec3ad0a8d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065104Z:8587f092-b16b-4159-b1dc-00fec3ad0a8d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '650eb30a-13a0-41ea-9d68-bbb91dd61d1e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4677',
  'x-ms-correlation-request-id',
  'bd3db51b-28fe-4632-8aab-844798fa40a8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065104Z:bd3db51b-28fe-4632-8aab-844798fa40a8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9b8f3555-64b1-4957-889b-f1760b98a41c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4676',
  'x-ms-correlation-request-id',
  'fb62dc66-bd73-4e7a-94a9-9cdcfb1a09ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065105Z:fb62dc66-bd73-4e7a-94a9-9cdcfb1a09ee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '609a5418-f208-4fe4-9cc1-8169337262de',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4675',
  'x-ms-correlation-request-id',
  '67d0bfaa-9187-4203-9d9a-271789b3b39d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065105Z:67d0bfaa-9187-4203-9d9a-271789b3b39d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '22990dea-8dc6-4568-bb56-97a35006e4af',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4674',
  'x-ms-correlation-request-id',
  '249f70d0-18c1-4e82-b18d-5d448c4e6447',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065106Z:249f70d0-18c1-4e82-b18d-5d448c4e6447',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '808a8281-1553-4018-85b9-f26d046169c8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4673',
  'x-ms-correlation-request-id',
  '1ef7246a-6f66-4253-8da6-9d980593ea3f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065106Z:1ef7246a-6f66-4253-8da6-9d980593ea3f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'de77fc57-b3a1-46fe-aa92-633f8a2eb75d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4672',
  'x-ms-correlation-request-id',
  'ea293003-06de-40f8-b518-8ac0c696ffb8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065106Z:ea293003-06de-40f8-b518-8ac0c696ffb8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40d163e1-0979-4420-8013-4d043833d81f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4671',
  'x-ms-correlation-request-id',
  'f79206d8-86dd-4b84-a86b-4de4566c5a28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065107Z:f79206d8-86dd-4b84-a86b-4de4566c5a28',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e4ecfba4-4286-4268-9a05-ad2cd4ede720',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4670',
  'x-ms-correlation-request-id',
  '48425f31-28e0-44d0-8c61-e4d4aacdb41b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065107Z:48425f31-28e0-44d0-8c61-e4d4aacdb41b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '977516ec-89ec-47aa-aedb-348267f80958',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4669',
  'x-ms-correlation-request-id',
  '194c1a12-fd3a-4199-ad43-7473477027ca',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065108Z:194c1a12-fd3a-4199-ad43-7473477027ca',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '38da307d-8c9c-4996-8cf0-bf2d47ce78eb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4668',
  'x-ms-correlation-request-id',
  '4c157c26-40b6-4334-9b74-b91c4410f1ff',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065108Z:4c157c26-40b6-4334-9b74-b91c4410f1ff',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '27f29b34-ca72-4705-8c27-c704b1f191b6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4667',
  'x-ms-correlation-request-id',
  '25acad87-ab30-4380-8cf7-506631fcd134',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065108Z:25acad87-ab30-4380-8cf7-506631fcd134',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56d1106c-b2c2-43a2-9756-3d11a01f7596',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4666',
  'x-ms-correlation-request-id',
  '979e3387-bd79-43a0-bfe5-8c3d207521b4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065109Z:979e3387-bd79-43a0-bfe5-8c3d207521b4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '09711a61-8671-4bbe-94bd-ba7f5849f918',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4665',
  'x-ms-correlation-request-id',
  '9a1cae47-fda6-42bc-814b-9956ba3e46b4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065109Z:9a1cae47-fda6-42bc-814b-9956ba3e46b4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e418e540-1641-4e4c-b561-9c1d04e81995',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4664',
  'x-ms-correlation-request-id',
  'a25bf0a3-dc9a-4fe5-afb3-d98e4a21922e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065109Z:a25bf0a3-dc9a-4fe5-afb3-d98e4a21922e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ba0e55cf-df2b-48c8-b1ea-2286e28c6c9e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4663',
  'x-ms-correlation-request-id',
  '6405c3d1-1ef2-4438-b810-756292d98cd5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065110Z:6405c3d1-1ef2-4438-b810-756292d98cd5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f518e51f-adb8-4bcd-af6a-64895f18e57c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4662',
  'x-ms-correlation-request-id',
  '381f0e03-fcf3-4730-b81f-58021fd04655',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065110Z:381f0e03-fcf3-4730-b81f-58021fd04655',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4a3ca9cd-9b56-4931-b830-3b34397f5bcd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4661',
  'x-ms-correlation-request-id',
  'aff1c852-d765-4893-be49-32a4e31213be',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065111Z:aff1c852-d765-4893-be49-32a4e31213be',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8cdcdda8-cd27-44fa-a8aa-1d3e25b83a83',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4660',
  'x-ms-correlation-request-id',
  '3890b4de-5fe9-4cdc-b305-75d7f20c4547',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065111Z:3890b4de-5fe9-4cdc-b305-75d7f20c4547',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3272ea89-1a77-4f0b-8098-dd75ae2264ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4659',
  'x-ms-correlation-request-id',
  '8fe2ebfa-c4f1-4087-b42b-a8a83c6f81ba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065111Z:8fe2ebfa-c4f1-4087-b42b-a8a83c6f81ba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '27c24c4e-77ef-49a3-be5d-20556e4214b6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4658',
  'x-ms-correlation-request-id',
  'cfeb90e6-a7b1-457e-a31e-b11047572d93',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065112Z:cfeb90e6-a7b1-457e-a31e-b11047572d93',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3ed12b63-6998-40d0-80e5-6936e25fa4f1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4657',
  'x-ms-correlation-request-id',
  '5b8c09fb-1845-4217-b4d1-42354fedbb71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065112Z:5b8c09fb-1845-4217-b4d1-42354fedbb71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3154dc9a-4844-48d3-84c2-bf43e4b52ed7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4656',
  'x-ms-correlation-request-id',
  'bbac3ad0-e238-466c-a9c8-20ba69905616',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065113Z:bbac3ad0-e238-466c-a9c8-20ba69905616',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7029b81d-e750-41c1-8359-44b449d9780a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4655',
  'x-ms-correlation-request-id',
  '5520ec16-3373-400b-8b28-d0d32d136cd9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065113Z:5520ec16-3373-400b-8b28-d0d32d136cd9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f0d2a431-bd7d-4002-a512-a379272cd0fa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4654',
  'x-ms-correlation-request-id',
  '936172ef-a03b-438a-9b6f-5f3248a28da8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065113Z:936172ef-a03b-438a-9b6f-5f3248a28da8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9e97976e-207e-40d1-8a54-b8f444b328d6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4653',
  'x-ms-correlation-request-id',
  '91de1e26-3aad-41fa-992c-4d08c690e6de',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065114Z:91de1e26-3aad-41fa-992c-4d08c690e6de',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ea828257-707d-46dc-822c-01d1f3dc3078',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4652',
  'x-ms-correlation-request-id',
  'aa93a07b-df60-4a58-9d7f-a3dac04189e3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065114Z:aa93a07b-df60-4a58-9d7f-a3dac04189e3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b3a2321-60d5-4022-9467-88932cd7a921',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4651',
  'x-ms-correlation-request-id',
  'ec805600-7f87-4770-bf6b-494a8bad1be0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065115Z:ec805600-7f87-4770-bf6b-494a8bad1be0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4ae73e4c-da0b-413a-acfa-cdbfce1f2db0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4650',
  'x-ms-correlation-request-id',
  '5edaa0e9-ee90-4609-9fcc-5a77244cfce9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065115Z:5edaa0e9-ee90-4609-9fcc-5a77244cfce9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '26eba992-b7ec-4ebf-9f09-4a16971967c0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4649',
  'x-ms-correlation-request-id',
  '7e0d904e-7aa6-4e1a-b716-bbe4113eea64',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065116Z:7e0d904e-7aa6-4e1a-b716-bbe4113eea64',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9c9dda18-f036-4afa-a22a-3666123dd3c4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4648',
  'x-ms-correlation-request-id',
  '3a09784b-9065-49a3-a900-dcecf5c383ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065116Z:3a09784b-9065-49a3-a900-dcecf5c383ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '375fa428-026b-43a7-a617-4cf08bb1ba25',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4647',
  'x-ms-correlation-request-id',
  '16964779-0abe-462f-91ed-b1c844931835',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065116Z:16964779-0abe-462f-91ed-b1c844931835',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '192251c9-1678-4b2a-a910-4fadceb7b2bd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4646',
  'x-ms-correlation-request-id',
  'e6080eec-ff17-466f-a799-a5b66f1b7ac3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065117Z:e6080eec-ff17-466f-a799-a5b66f1b7ac3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cafff949-bfce-4d0d-b131-74d49cbddf4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4645',
  'x-ms-correlation-request-id',
  '91f64796-d183-4bf9-b7ba-c669cdaf243a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065117Z:91f64796-d183-4bf9-b7ba-c669cdaf243a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8a445689-013c-4b22-8b4b-81ee9ea44da3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4644',
  'x-ms-correlation-request-id',
  '4ac8cba4-2326-4fd4-8c8b-5a264a1bb12e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065117Z:4ac8cba4-2326-4fd4-8c8b-5a264a1bb12e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '594c09a6-4d72-43b2-968a-a666971dd210',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4643',
  'x-ms-correlation-request-id',
  '8e67bc70-09d9-4392-8a0e-6e00b8f8d6a5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065119Z:8e67bc70-09d9-4392-8a0e-6e00b8f8d6a5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '00fa2a07-c61b-416c-a8fe-c008955193c9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4642',
  'x-ms-correlation-request-id',
  '16f3e9e3-9f7f-4b21-9107-ab438df259c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065119Z:16f3e9e3-9f7f-4b21-9107-ab438df259c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f7c58d26-0ae9-4237-8a6d-f44ff680def8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4641',
  'x-ms-correlation-request-id',
  'd8aee2e8-0379-49d8-9afe-df2e7183c250',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065119Z:d8aee2e8-0379-49d8-9afe-df2e7183c250',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f42594c6-73f0-4a55-92dc-d5dd52ad7015',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4640',
  'x-ms-correlation-request-id',
  '09bbfcc3-dfa2-4cb7-b74c-b1bbab277a53',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065120Z:09bbfcc3-dfa2-4cb7-b74c-b1bbab277a53',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd77d2c19-8a84-4929-8120-a0efdfb324fd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4639',
  'x-ms-correlation-request-id',
  'eff30f7a-44f7-4a8c-b2e8-5aed12f84bd3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065120Z:eff30f7a-44f7-4a8c-b2e8-5aed12f84bd3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63db8ff6-31a0-44f2-b387-5b70a0c23c89',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4638',
  'x-ms-correlation-request-id',
  '126955a6-a4ca-4f9e-ae7f-bc27dc28a27c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065120Z:126955a6-a4ca-4f9e-ae7f-bc27dc28a27c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'da2cb5a0-3d06-4743-98cf-3264ff50b6c1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4637',
  'x-ms-correlation-request-id',
  'dde052f8-79f8-45cc-9a55-d69edc7b5012',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065121Z:dde052f8-79f8-45cc-9a55-d69edc7b5012',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b48b8d06-26bf-4597-90d7-5dfab52a31d1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4636',
  'x-ms-correlation-request-id',
  '0507ab1c-b5a4-4b5f-8ab7-1cca2520330e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065121Z:0507ab1c-b5a4-4b5f-8ab7-1cca2520330e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8043256b-b006-408c-90ef-a9044560a0ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4635',
  'x-ms-correlation-request-id',
  '73e1cd45-80f8-44a1-b5bf-a7a22837888a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065122Z:73e1cd45-80f8-44a1-b5bf-a7a22837888a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c68ddc75-9258-4e58-a072-3bd53c863dcf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4634',
  'x-ms-correlation-request-id',
  'a173c9bf-8376-4159-9102-5f69ddbd5ad8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065122Z:a173c9bf-8376-4159-9102-5f69ddbd5ad8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3c59fc0b-2697-49d8-bd67-2621d4240144',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4633',
  'x-ms-correlation-request-id',
  '5abef5e8-687c-456a-bd4e-4d086b1e92f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065123Z:5abef5e8-687c-456a-bd4e-4d086b1e92f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '93a51077-605e-46da-9ccf-14a2edaaa702',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4632',
  'x-ms-correlation-request-id',
  '2abb6758-13e3-45c5-98f4-13caa226a576',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065123Z:2abb6758-13e3-45c5-98f4-13caa226a576',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9bd8ce30-d549-414e-9381-249c8d1a7595',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4631',
  'x-ms-correlation-request-id',
  'fa75ce16-a4cb-4fcd-9a0b-bb2efc1dd7b8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065123Z:fa75ce16-a4cb-4fcd-9a0b-bb2efc1dd7b8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b54adaba-c420-4d3d-89d5-90743dbdf9aa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4630',
  'x-ms-correlation-request-id',
  'dbea6022-2645-4253-83d9-2d97d088d2e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065124Z:dbea6022-2645-4253-83d9-2d97d088d2e1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee1503e2-37e3-48ed-a95f-ce77599a7b36',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4629',
  'x-ms-correlation-request-id',
  '67ee3647-c3e3-4b1d-bb4e-aa049fa1f91b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065124Z:67ee3647-c3e3-4b1d-bb4e-aa049fa1f91b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd5b476b1-a7de-4cea-b2ff-259caab6d41f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4628',
  'x-ms-correlation-request-id',
  '497883ea-cd24-46ed-aef0-df0147cfd3f1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065124Z:497883ea-cd24-46ed-aef0-df0147cfd3f1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '415a50df-24a6-407c-b198-39ceaa4c10bd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4627',
  'x-ms-correlation-request-id',
  'f76593a5-38f5-44a1-a29f-912ae61fe083',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065125Z:f76593a5-38f5-44a1-a29f-912ae61fe083',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56315423-2f63-4b16-a516-39b35ed390bd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4626',
  'x-ms-correlation-request-id',
  'a1f99502-8a85-4e44-aa29-3b68aed932ef',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065125Z:a1f99502-8a85-4e44-aa29-3b68aed932ef',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '39d56436-b203-4199-875c-c0fc3b4191a4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4625',
  'x-ms-correlation-request-id',
  'e39ab80b-42ad-44d8-b7c4-7ed0f0b91506',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065126Z:e39ab80b-42ad-44d8-b7c4-7ed0f0b91506',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f70ba8a3-81d5-4c65-8324-474892c272c8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4624',
  'x-ms-correlation-request-id',
  'e9da4318-4bb1-407b-8cc9-6130c483fe41',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065126Z:e9da4318-4bb1-407b-8cc9-6130c483fe41',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '386f20bd-1acd-4178-b8b3-c16973b1f718',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4623',
  'x-ms-correlation-request-id',
  'bbf1315d-94e0-425f-a6ae-466e3d305a7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065126Z:bbf1315d-94e0-425f-a6ae-466e3d305a7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0b58a451-a2e2-4d0a-95f0-b8ab3319aced',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4622',
  'x-ms-correlation-request-id',
  'fb78c309-d4c5-4341-b9f4-3de2c10f7a23',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065127Z:fb78c309-d4c5-4341-b9f4-3de2c10f7a23',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ffae4ab6-88ba-4b35-a2c2-08782c6490f2',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4621',
  'x-ms-correlation-request-id',
  'b031f246-252a-4a96-944e-07116414f797',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065127Z:b031f246-252a-4a96-944e-07116414f797',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '841a895e-a3b1-4b3d-bd46-be76d6fec879',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4620',
  'x-ms-correlation-request-id',
  '0751f82f-082e-482e-adb5-e24a6152b0b6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065128Z:0751f82f-082e-482e-adb5-e24a6152b0b6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f0c473d4-2afd-4d9d-9e0c-f1285085c1b3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4619',
  'x-ms-correlation-request-id',
  '19193daf-cab7-411e-907d-ae95939c2097',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065128Z:19193daf-cab7-411e-907d-ae95939c2097',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7175541f-4dab-4d15-aa0e-d2efe3d44911',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4618',
  'x-ms-correlation-request-id',
  'addf67bf-66ac-4dee-bcd6-d5de56507238',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065128Z:addf67bf-66ac-4dee-bcd6-d5de56507238',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '861b25e9-9afc-4e35-b1ce-541b7716cacf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4617',
  'x-ms-correlation-request-id',
  'ab6bfb5c-5e02-4f90-9a33-6167fa447717',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065129Z:ab6bfb5c-5e02-4f90-9a33-6167fa447717',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '74f46cac-f87c-48ff-ae8d-e82cd2f06507',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4616',
  'x-ms-correlation-request-id',
  'f926a58d-a9a5-4893-b672-d5c0323bbcbb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065129Z:f926a58d-a9a5-4893-b672-d5c0323bbcbb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b45b149d-14e5-4b69-ab0e-c8fa09d3fb58',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4615',
  'x-ms-correlation-request-id',
  'fc2fad81-936c-427f-87ba-4ab155d5a05d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065130Z:fc2fad81-936c-427f-87ba-4ab155d5a05d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c505c582-7105-4313-b60e-7aac7d187527',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4614',
  'x-ms-correlation-request-id',
  '71d40702-96d8-441c-8fee-d44ed7d3830f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065130Z:71d40702-96d8-441c-8fee-d44ed7d3830f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '02236938-fe60-43f5-8a43-8ea3cd475c36',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4613',
  'x-ms-correlation-request-id',
  'd3d1c45d-e92c-4a4a-aa87-d12c96944809',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065130Z:d3d1c45d-e92c-4a4a-aa87-d12c96944809',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '44048ca3-d3ba-41ab-868b-74a3b3814f6f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4612',
  'x-ms-correlation-request-id',
  '65b06abb-1f84-436e-8b02-32d4f93b6861',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065131Z:65b06abb-1f84-436e-8b02-32d4f93b6861',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4ce75871-13db-492f-8686-8aae617a7820',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4611',
  'x-ms-correlation-request-id',
  '3c90366b-624f-4d55-ae3e-5525532ed733',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065131Z:3c90366b-624f-4d55-ae3e-5525532ed733',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eaa28a30-4db0-4129-884c-2a119a5164c9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4610',
  'x-ms-correlation-request-id',
  '5033e440-a179-4ab1-bd2e-f15c41e4ff31',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065132Z:5033e440-a179-4ab1-bd2e-f15c41e4ff31',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'aa63fb40-cf41-40d6-a3f1-a81066d74ea0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4609',
  'x-ms-correlation-request-id',
  'c2ff2dde-cd63-43b7-951d-74dec62dc5f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065132Z:c2ff2dde-cd63-43b7-951d-74dec62dc5f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df58424c-50ba-4b81-bdcf-a57c80bb3a68',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4608',
  'x-ms-correlation-request-id',
  '5758a9d4-36c6-437d-bd6f-c58ff718579a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065132Z:5758a9d4-36c6-437d-bd6f-c58ff718579a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '48ccba87-56a6-4d38-b946-0f83f399b029',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4607',
  'x-ms-correlation-request-id',
  '8b18e678-84b5-486d-8a1a-428552089ed6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065133Z:8b18e678-84b5-486d-8a1a-428552089ed6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee71fcd9-db82-4ba2-b002-372ba58ceee0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4606',
  'x-ms-correlation-request-id',
  '6710e843-987b-4f92-b20c-270e0858facf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065133Z:6710e843-987b-4f92-b20c-270e0858facf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4522b198-e2e0-4f68-ac4c-8394e1691a32',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4605',
  'x-ms-correlation-request-id',
  'eb0a92ca-8961-4232-94cb-4b0232cccf84',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065134Z:eb0a92ca-8961-4232-94cb-4b0232cccf84',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4acb3773-5f0a-44e7-8a30-5861068870e9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4604',
  'x-ms-correlation-request-id',
  '551acf9b-fae2-4cd3-8932-5e8b88b40d8f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065134Z:551acf9b-fae2-4cd3-8932-5e8b88b40d8f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c843223b-ddb6-481c-9ebf-2c3dec487f3c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4603',
  'x-ms-correlation-request-id',
  '8da3aadd-c104-4db8-b127-51adb442ac6c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065134Z:8da3aadd-c104-4db8-b127-51adb442ac6c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd9e51869-8974-4ee8-8962-43b7a8adb64c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4602',
  'x-ms-correlation-request-id',
  '471db9d2-544b-4b01-baaa-540f0f1fbe40',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065135Z:471db9d2-544b-4b01-baaa-540f0f1fbe40',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '430cf0e2-ea35-4ec5-8570-9acc9c87624c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4601',
  'x-ms-correlation-request-id',
  'fbe8bd49-bedd-430e-936b-fb6075e2aed3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065135Z:fbe8bd49-bedd-430e-936b-fb6075e2aed3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a35e770b-03a0-4589-9c80-3c8346e221ba',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4600',
  'x-ms-correlation-request-id',
  '7e9a0c73-c2a5-49ca-b7e6-2abb8d27e335',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065135Z:7e9a0c73-c2a5-49ca-b7e6-2abb8d27e335',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a458aa7e-7027-489e-a4fa-55ce55b505c1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4599',
  'x-ms-correlation-request-id',
  'f13c300f-cdf3-4ef6-bf3f-c634bf1b3aae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065136Z:f13c300f-cdf3-4ef6-bf3f-c634bf1b3aae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '16858945-9ff2-4753-ae66-4130292b1747',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4598',
  'x-ms-correlation-request-id',
  '0122a4b7-3aca-4a9c-94a6-10398df53b78',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065136Z:0122a4b7-3aca-4a9c-94a6-10398df53b78',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '14cbad2a-ee72-4df7-a26a-df3547772932',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4597',
  'x-ms-correlation-request-id',
  '7c456022-8343-41a7-ae93-ea22216f795e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065137Z:7c456022-8343-41a7-ae93-ea22216f795e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3a6142e9-8a9c-4149-a8e4-817ae04d1bbf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4596',
  'x-ms-correlation-request-id',
  'e59a2cab-a8be-4371-a02e-62c0022704d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065137Z:e59a2cab-a8be-4371-a02e-62c0022704d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f3e726b1-70eb-44bd-808a-4038ea83470d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4595',
  'x-ms-correlation-request-id',
  '9bfdfaae-652f-4ba7-9ea1-8f0ba9a72c1d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065138Z:9bfdfaae-652f-4ba7-9ea1-8f0ba9a72c1d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '35b8c35b-6b12-4f0a-a801-3c5481a1fe76',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4594',
  'x-ms-correlation-request-id',
  'cb9a9d41-e9f1-4bdd-b19d-2be0185b4883',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065138Z:cb9a9d41-e9f1-4bdd-b19d-2be0185b4883',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4b70c071-eb9a-4206-9034-4054dfaacec5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4593',
  'x-ms-correlation-request-id',
  'c9a6c081-124c-4fff-bfde-cd8df4df05b9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065139Z:c9a6c081-124c-4fff-bfde-cd8df4df05b9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e9f30fcd-7f9b-4571-8917-1af679047323',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4592',
  'x-ms-correlation-request-id',
  '40ea4a45-cdaf-484c-abba-a1c84721758d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065139Z:40ea4a45-cdaf-484c-abba-a1c84721758d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3272127e-7b8c-4fcb-867a-fbbd543d6fbc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4591',
  'x-ms-correlation-request-id',
  'c12d718c-19ec-4629-ad1f-10e0cb3ee0ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065139Z:c12d718c-19ec-4629-ad1f-10e0cb3ee0ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f9b66b85-1a78-467f-b67c-6c2a8e6856bf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4590',
  'x-ms-correlation-request-id',
  '0d10638e-39bf-48c8-934c-5640176231aa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065140Z:0d10638e-39bf-48c8-934c-5640176231aa',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '85825b3e-5cf6-4f72-94f9-4f2f5d5f5fb7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4589',
  'x-ms-correlation-request-id',
  '32c9b12b-6935-40f5-a9fe-b77e9b69fe4d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065140Z:32c9b12b-6935-40f5-a9fe-b77e9b69fe4d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '57a6629b-adaa-4827-9d79-7372a7aa1f6e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4588',
  'x-ms-correlation-request-id',
  '46720c50-86a1-4bc4-b859-fa6e31d80e68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065141Z:46720c50-86a1-4bc4-b859-fa6e31d80e68',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6c9a6e2d-9922-4269-97ca-99cd2adf69ae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4587',
  'x-ms-correlation-request-id',
  'ca91fab5-5e26-4b94-8deb-b60dfe884131',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065141Z:ca91fab5-5e26-4b94-8deb-b60dfe884131',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5ee53144-7773-4938-adb9-9e6da8aae7ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4586',
  'x-ms-correlation-request-id',
  'fbc08814-e02b-46f4-ba14-667804297556',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065141Z:fbc08814-e02b-46f4-ba14-667804297556',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '89402a9f-949b-4a89-a4ae-6aed3959aa4a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4585',
  'x-ms-correlation-request-id',
  '517395e4-5d8e-400d-8445-86fa184299a9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065142Z:517395e4-5d8e-400d-8445-86fa184299a9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '81fbb612-6235-4c3d-8970-cf97e7735fae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4584',
  'x-ms-correlation-request-id',
  'e47a0564-8b9e-4de0-a99a-e948aa96ce61',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065142Z:e47a0564-8b9e-4de0-a99a-e948aa96ce61',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9d5e55df-7945-431a-bd2a-e14bd4331444',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4583',
  'x-ms-correlation-request-id',
  'b13f6589-9b2e-4cf2-8ed2-cb983008983f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065142Z:b13f6589-9b2e-4cf2-8ed2-cb983008983f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'edfed5d0-df3e-4abc-8cd8-7c502a667a4c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4582',
  'x-ms-correlation-request-id',
  '3a13264c-7474-4b94-b57f-bdc707aed27b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065143Z:3a13264c-7474-4b94-b57f-bdc707aed27b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '443868ee-d9a4-4d30-a405-d81ce79764cc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4581',
  'x-ms-correlation-request-id',
  'b232ecfe-f56a-413c-a2f7-cc7cfa8b6394',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065143Z:b232ecfe-f56a-413c-a2f7-cc7cfa8b6394',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0a831606-4acc-4551-8d9e-5e5d25020eed',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4580',
  'x-ms-correlation-request-id',
  '109a86ac-36be-4c67-8d58-950cf27b809e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065144Z:109a86ac-36be-4c67-8d58-950cf27b809e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e88d536f-4c8d-410e-9281-edb828513c39',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4579',
  'x-ms-correlation-request-id',
  'c07c34b5-4762-47ed-b5f4-2ff380480eb1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065144Z:c07c34b5-4762-47ed-b5f4-2ff380480eb1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a411ca02-8ef8-4e30-addd-e29861d8ca29',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4578',
  'x-ms-correlation-request-id',
  '213f6e73-3998-4c3d-b600-0569366bc3c4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065144Z:213f6e73-3998-4c3d-b600-0569366bc3c4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '483caf08-a68b-427b-8bbf-e1e9f8b304ad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4577',
  'x-ms-correlation-request-id',
  'da6ab566-db55-4db1-a7bf-5abe76b83960',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065145Z:da6ab566-db55-4db1-a7bf-5abe76b83960',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f466d96a-4551-4fd3-8f4c-d21db157169c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4576',
  'x-ms-correlation-request-id',
  '730e27d4-da7c-494c-af46-f6a04b2234e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065145Z:730e27d4-da7c-494c-af46-f6a04b2234e1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bf5e3fa8-fac6-48fb-91dd-b1f8727beee6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4575',
  'x-ms-correlation-request-id',
  'ba35006c-c4c1-42cf-802e-e7c26d6d9210',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065146Z:ba35006c-c4c1-42cf-802e-e7c26d6d9210',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '88d17516-513d-4ffc-a5bb-5f00ceb3e257',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4574',
  'x-ms-correlation-request-id',
  '85eeab96-d8e7-4607-b9d5-863cece7a559',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065146Z:85eeab96-d8e7-4607-b9d5-863cece7a559',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'df8701be-f02b-41ed-b26f-c703a1c20b80',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4573',
  'x-ms-correlation-request-id',
  '00d401b4-d79c-46a7-a7c1-1c510e76e5d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065146Z:00d401b4-d79c-46a7-a7c1-1c510e76e5d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6d23d3e4-cafc-4a33-8b0b-cb6e441f3dfa',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4572',
  'x-ms-correlation-request-id',
  '06b7d568-a10e-4ef1-8b14-c0992641ec24',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065147Z:06b7d568-a10e-4ef1-8b14-c0992641ec24',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f0ba29b0-1928-4e2d-ad29-b907ba100b28',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4571',
  'x-ms-correlation-request-id',
  'b72533e9-1264-4952-b91d-402e73e0e544',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065147Z:b72533e9-1264-4952-b91d-402e73e0e544',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '53c0382b-cd3f-421b-86ff-a3fe1ace113f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4570',
  'x-ms-correlation-request-id',
  'cffa10fa-1fcc-4285-bdba-8b5f4727b6a7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065148Z:cffa10fa-1fcc-4285-bdba-8b5f4727b6a7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '40ef721b-de70-4f23-9734-dcc774d22c30',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4569',
  'x-ms-correlation-request-id',
  'a15280df-d984-4b44-b6f0-219ac6368e72',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065148Z:a15280df-d984-4b44-b6f0-219ac6368e72',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee924c84-3444-4e9b-92fb-10301901aac6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4568',
  'x-ms-correlation-request-id',
  '777f3c0b-a36a-455f-95fd-96745f08adba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065148Z:777f3c0b-a36a-455f-95fd-96745f08adba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f38ac9dc-be23-4416-a12c-1edfac46361c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4567',
  'x-ms-correlation-request-id',
  '680ecdd2-ba7e-4c6c-bf5d-89b19d5976c8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065149Z:680ecdd2-ba7e-4c6c-bf5d-89b19d5976c8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c352208e-639a-4990-a7e5-1f63c2a76b87',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4566',
  'x-ms-correlation-request-id',
  '67382e0d-0f14-4d39-a378-dbeff50e31c1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065149Z:67382e0d-0f14-4d39-a378-dbeff50e31c1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd43f23dc-7042-4ee0-aaee-ea7d4776f4a6',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4565',
  'x-ms-correlation-request-id',
  'ce5633ee-aae9-45c9-831d-08cf67cc8b78',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065150Z:ce5633ee-aae9-45c9-831d-08cf67cc8b78',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5da2456e-680e-41fa-b41b-3f954d684d8d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4564',
  'x-ms-correlation-request-id',
  '9533dbb6-3bfc-4946-b3e8-2265cdb1135a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065150Z:9533dbb6-3bfc-4946-b3e8-2265cdb1135a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '72ec3423-7eb5-45d6-977e-ad5fc31d5210',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4563',
  'x-ms-correlation-request-id',
  '7b75f411-b8f4-4ab0-9984-3439c07e6717',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065150Z:7b75f411-b8f4-4ab0-9984-3439c07e6717',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8982430c-4cb1-486a-b60a-ab1a31e98562',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4562',
  'x-ms-correlation-request-id',
  '09245c42-9ca6-48e7-adee-540b3064143b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065151Z:09245c42-9ca6-48e7-adee-540b3064143b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e2480ff4-f97a-4b2a-a429-1b9207617653',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4561',
  'x-ms-correlation-request-id',
  '2e4b168f-27c9-4cdb-a9b3-a52097962811',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065151Z:2e4b168f-27c9-4cdb-a9b3-a52097962811',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '63528c8c-dde3-45aa-9677-abfaa6851304',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4560',
  'x-ms-correlation-request-id',
  'fb2d2927-e385-4d50-abd0-df9911705abf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065152Z:fb2d2927-e385-4d50-abd0-df9911705abf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b9342679-cc9f-41cc-a23a-6133f8de1c44',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4559',
  'x-ms-correlation-request-id',
  '89d3f9be-52c4-4315-a23a-8141e239c6b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065152Z:89d3f9be-52c4-4315-a23a-8141e239c6b7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd2183e93-98c7-4a7d-9c94-1ec21dc4165e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4558',
  'x-ms-correlation-request-id',
  'cd9acdf6-2e8f-437b-972e-2d1d756b3774',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065153Z:cd9acdf6-2e8f-437b-972e-2d1d756b3774',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b7a52185-b833-41a5-9638-ad7e734b5b10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4557',
  'x-ms-correlation-request-id',
  '821625c5-5d5b-4d7b-8c0b-5e21cda5ae81',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065153Z:821625c5-5d5b-4d7b-8c0b-5e21cda5ae81',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96af735f-924e-4ce8-a8c5-35f2aeacb2b7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4556',
  'x-ms-correlation-request-id',
  '3959cad1-4879-4b90-8805-e5a007728422',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065153Z:3959cad1-4879-4b90-8805-e5a007728422',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '1d3b8301-8ff5-4169-bfaa-500e71818236',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4555',
  'x-ms-correlation-request-id',
  'e223b227-e450-4b05-9101-093891816947',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065154Z:e223b227-e450-4b05-9101-093891816947',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2d5f7d60-31f9-44c9-9668-7d4516c47eb8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4554',
  'x-ms-correlation-request-id',
  '32a77d49-b0d4-49b9-bf82-335b47d74ec8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065154Z:32a77d49-b0d4-49b9-bf82-335b47d74ec8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd4dd58e6-caf9-4672-be3f-1a36d893aefb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4553',
  'x-ms-correlation-request-id',
  '98f403fb-4d1f-49d0-8d75-f8ae6fcf3ca9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065155Z:98f403fb-4d1f-49d0-8d75-f8ae6fcf3ca9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '72ef8a2c-dc83-4ca6-9993-8533b9bdaeec',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4552',
  'x-ms-correlation-request-id',
  'c5ce6222-667b-4755-a363-0788a63e841a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065155Z:c5ce6222-667b-4755-a363-0788a63e841a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b8108ca7-30fd-44e3-a8a2-b6a42b62ad0d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4551',
  'x-ms-correlation-request-id',
  'd0bcfeac-253f-427e-a76d-e760d94bbb3d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065155Z:d0bcfeac-253f-427e-a76d-e760d94bbb3d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'adad94de-ae0e-4c06-a145-0a82aad9270b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4550',
  'x-ms-correlation-request-id',
  'c86bb181-122b-4e89-9f7b-af019d433c65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065156Z:c86bb181-122b-4e89-9f7b-af019d433c65',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6de6b713-4ed9-4455-8944-7fed6af4bbce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4549',
  'x-ms-correlation-request-id',
  'e0b2ee10-e169-416f-b4f5-4496ceb1ec86',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065156Z:e0b2ee10-e169-416f-b4f5-4496ceb1ec86',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6101e4b-c148-450d-a931-220998f9fb5f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4548',
  'x-ms-correlation-request-id',
  'd49bfcf8-718b-481d-adb7-8ed611fa9d89',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065157Z:d49bfcf8-718b-481d-adb7-8ed611fa9d89',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '18381003-f223-4aec-bd60-200d9f23fec4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4547',
  'x-ms-correlation-request-id',
  'aa5b881f-f444-4ce7-abbd-b2cd4328c345',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065157Z:aa5b881f-f444-4ce7-abbd-b2cd4328c345',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8f3bf70c-ceba-48b6-b065-3bd58fa74995',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4546',
  'x-ms-correlation-request-id',
  '9fb6733f-50f2-49e4-bff6-c2852a1aab62',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065157Z:9fb6733f-50f2-49e4-bff6-c2852a1aab62',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b109b635-3d7b-4805-8540-974d52919244',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4545',
  'x-ms-correlation-request-id',
  '3c997d77-2cb0-4d95-b124-212ae7f86121',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065158Z:3c997d77-2cb0-4d95-b124-212ae7f86121',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '335c7564-9b58-4bdb-9d6f-3aa7440edc76',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4544',
  'x-ms-correlation-request-id',
  '6935be77-7fbb-4166-968c-738b87430b71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065158Z:6935be77-7fbb-4166-968c-738b87430b71',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '861b13a0-e992-4349-b9e6-1d803a6879c3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4543',
  'x-ms-correlation-request-id',
  '0509d629-1811-45bc-ad84-66881868dd98',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065158Z:0509d629-1811-45bc-ad84-66881868dd98',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4238a5fe-82c6-4cc9-b966-291f44e4055e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4542',
  'x-ms-correlation-request-id',
  '0a14d7c6-90ae-405e-987e-9ec04cf1c1c3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065159Z:0a14d7c6-90ae-405e-987e-9ec04cf1c1c3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'bc627eab-a860-470d-91d0-ff5c870b8779',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4541',
  'x-ms-correlation-request-id',
  '7dcc8c24-9ddb-4e0a-9b00-57c53959585f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065159Z:7dcc8c24-9ddb-4e0a-9b00-57c53959585f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ce419ce8-cbda-4a2e-9170-51dd7388327d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4540',
  'x-ms-correlation-request-id',
  'ddb407a9-06ff-4a94-a742-bfbaa997d2ed',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065200Z:ddb407a9-06ff-4a94-a742-bfbaa997d2ed',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:51:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f545da35-0f64-402d-9b83-ccad96322454',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4539',
  'x-ms-correlation-request-id',
  'd0c70e10-62b3-41cd-8a16-8bb2d84f024d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065200Z:d0c70e10-62b3-41cd-8a16-8bb2d84f024d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '89ab22fb-1c56-4297-933c-3565d3676742',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4538',
  'x-ms-correlation-request-id',
  'ace6c565-1862-4500-9f67-16288a4c7413',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065200Z:ace6c565-1862-4500-9f67-16288a4c7413',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '904d5a71-58d1-426d-8eff-5c938a63397c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4537',
  'x-ms-correlation-request-id',
  '3cab1bfe-92ec-4227-b62a-2b85a2fe9105',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065201Z:3cab1bfe-92ec-4227-b62a-2b85a2fe9105',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '016fbca7-b80b-4a9f-8dde-45aa81a91bc9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4536',
  'x-ms-correlation-request-id',
  '3dd1dfe2-a693-4472-bfb3-507524ff5f76',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065201Z:3dd1dfe2-a693-4472-bfb3-507524ff5f76',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '477e8c59-ffac-4e25-8406-c50126209064',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4535',
  'x-ms-correlation-request-id',
  '13e67146-8f7e-4da7-a016-3310fbb54c11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065202Z:13e67146-8f7e-4da7-a016-3310fbb54c11',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5a07e17c-9805-4b7b-a686-399ae65ad28a',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4534',
  'x-ms-correlation-request-id',
  'b9130fa1-3d00-493b-8fe4-279eea816dd6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065202Z:b9130fa1-3d00-493b-8fe4-279eea816dd6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '18e6ffc9-92f4-4fd7-925c-4e25ab3846fb',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4533',
  'x-ms-correlation-request-id',
  'd7666c6e-712a-4d93-9665-51442cb6655d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065202Z:d7666c6e-712a-4d93-9665-51442cb6655d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7a61329b-6f95-459c-b933-d6137b0ab1ee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4532',
  'x-ms-correlation-request-id',
  'dbaa4149-5f17-4c75-908a-057091cb66a7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065203Z:dbaa4149-5f17-4c75-908a-057091cb66a7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV9mZjVmMThhMA==')
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
  '7bd3ad1b-0bbe-4915-b79a-e9388abfe430',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4531',
  'x-ms-correlation-request-id',
  '53a1586c-a926-4c4a-829b-9d96c0c9a8a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065203Z:53a1586c-a926-4c4a-829b-9d96c0c9a8a1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5","name":"myservicexxx5","type":"Microsoft.ApiManagement/deletedservices","location":"East US","properties":{"serviceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5","scheduledPurgeDate":"2021-09-24T06:52:03.9419668Z","deletionDate":"2021-09-24T06:52:02.3924999Z"}}, [
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
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '72527dd6-61bb-4a1a-939e-93ffd0efbc26',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  'eab9ada4-a14e-4587-a337-651017ec43b5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065204Z:eab9ada4-a14e-4587-a337-651017ec43b5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:03 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ed59c86b-1755-417b-a0e4-6f0c61497e55',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4530',
  'x-ms-correlation-request-id',
  '86519e72-0e6a-4b98-b3ad-26e251ed9f7c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065204Z:86519e72-0e6a-4b98-b3ad-26e251ed9f7c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '35d24d28-58ea-4f16-b8b8-23032d39fc09',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4529',
  'x-ms-correlation-request-id',
  '1f929b19-bd05-4737-8435-bda64eef04d3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065204Z:1f929b19-bd05-4737-8435-bda64eef04d3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fe5eb078-3319-46fc-a7c6-23305451692e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4528',
  'x-ms-correlation-request-id',
  'a68cc60f-2fe7-4051-b2ab-f8b7a9f2cf51',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065205Z:a68cc60f-2fe7-4051-b2ab-f8b7a9f2cf51',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd025d7a6-284d-4825-8873-b3c311ff2be0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4527',
  'x-ms-correlation-request-id',
  '020673b8-2ddf-4f3e-a3f6-611a80ce46f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065205Z:020673b8-2ddf-4f3e-a3f6-611a80ce46f9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'dd9528d5-c534-4ba6-b917-016686b0c594',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4526',
  'x-ms-correlation-request-id',
  'b0555a2a-bf6e-41a2-a13e-4fcf2200408c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065206Z:b0555a2a-bf6e-41a2-a13e-4fcf2200408c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'aa4f9605-cf6d-4be9-9f6d-81b956710239',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4525',
  'x-ms-correlation-request-id',
  'a09e2990-d825-45d6-88f0-0a3dbee75042',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065206Z:a09e2990-d825-45d6-88f0-0a3dbee75042',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c77fa155-e034-4f23-a313-34d3f72e804c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4524',
  'x-ms-correlation-request-id',
  '446a2733-7c58-46af-ae93-8ac2d4e26165',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065206Z:446a2733-7c58-46af-ae93-8ac2d4e26165',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c67964a3-6bf5-4b93-9651-947bbdb25e3d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4523',
  'x-ms-correlation-request-id',
  '6c36ffb2-80bb-42c2-a6f7-168515fd4f65',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065207Z:6c36ffb2-80bb-42c2-a6f7-168515fd4f65',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '126ae4da-79ce-4014-87f2-51e811ad1183',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4522',
  'x-ms-correlation-request-id',
  'db052241-f32f-458e-bf5e-92d37e8f2565',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065207Z:db052241-f32f-458e-bf5e-92d37e8f2565',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '69ccadf7-35b5-492b-b8bd-427e2ba2cec8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4521',
  'x-ms-correlation-request-id',
  'c2f6b67c-418c-4d95-a62f-32011c1d5132',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065207Z:c2f6b67c-418c-4d95-a62f-32011c1d5132',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3787e5ac-dfc8-40de-81ed-0a86d8d981da',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4520',
  'x-ms-correlation-request-id',
  'e58f4511-09f3-49f8-af4b-54f69d042c06',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065208Z:e58f4511-09f3-49f8-af4b-54f69d042c06',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6bbdd6a1-a5f8-48b9-a0d2-7ac2b03add58',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4519',
  'x-ms-correlation-request-id',
  '800b6211-b83d-48ff-a666-204e0334920e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065208Z:800b6211-b83d-48ff-a666-204e0334920e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '89c2bbb5-f1c2-4a60-93ae-ae3105037873',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4518',
  'x-ms-correlation-request-id',
  '84281f48-06c5-4ec0-b716-c75a3cc5776b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065209Z:84281f48-06c5-4ec0-b716-c75a3cc5776b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eddbdd1a-4cd2-46b4-b602-e338a52490b9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4517',
  'x-ms-correlation-request-id',
  '0a0cfe33-9f60-4cb6-a702-fabde2f8387c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065209Z:0a0cfe33-9f60-4cb6-a702-fabde2f8387c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e976f992-b8e0-4db9-a015-875c1a40764b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4516',
  'x-ms-correlation-request-id',
  '6a9a6ab4-c23b-4a6e-aaa1-ea5370892fe4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065209Z:6a9a6ab4-c23b-4a6e-aaa1-ea5370892fe4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2d023ba9-98c7-4b4b-8322-fa8a663bf9a5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4515',
  'x-ms-correlation-request-id',
  'eccfc1c4-a450-45ea-9158-6f958ae98647',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065210Z:eccfc1c4-a450-45ea-9158-6f958ae98647',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e233d79d-0bb6-4033-a8ad-6ff370c52df0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4514',
  'x-ms-correlation-request-id',
  'cb09007f-3a5a-4d56-a709-25fe44eb5c25',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065210Z:cb09007f-3a5a-4d56-a709-25fe44eb5c25',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '82b6aa0c-784c-48d3-aa2d-206e8e6da181',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4513',
  'x-ms-correlation-request-id',
  '9ab90fd6-8063-4dd0-94e9-7c44368e95bd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065210Z:9ab90fd6-8063-4dd0-94e9-7c44368e95bd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9a907aff-2569-4cec-9483-fb1bbd2f3f9b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4512',
  'x-ms-correlation-request-id',
  'b970d2f3-6e44-4c87-b4d4-14d2306b8b84',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065211Z:b970d2f3-6e44-4c87-b4d4-14d2306b8b84',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2b3dfbad-e525-4a71-9cc9-03594b81375d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4511',
  'x-ms-correlation-request-id',
  'dab2fafe-fe3f-4634-990c-d02845bd5520',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065211Z:dab2fafe-fe3f-4634-990c-d02845bd5520',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '74562934-0936-43e3-9816-6ec94fdc67c7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4510',
  'x-ms-correlation-request-id',
  '0adbd84f-9a75-4592-b801-8c38ed66d80c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065212Z:0adbd84f-9a75-4592-b801-8c38ed66d80c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '78a1031c-be26-4311-a2be-ac7978181e21',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4509',
  'x-ms-correlation-request-id',
  'e0a0b734-be20-4e6a-a623-f569d127bc3c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065212Z:e0a0b734-be20-4e6a-a623-f569d127bc3c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '304db277-4eb2-485f-9458-f88e0a133993',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4508',
  'x-ms-correlation-request-id',
  '1dcf5fbe-abcb-4891-ab61-0362b61ca8ee',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065212Z:1dcf5fbe-abcb-4891-ab61-0362b61ca8ee',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd6b7da20-dd52-4675-adf4-f4d0c96cd747',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4507',
  'x-ms-correlation-request-id',
  'b7e4a99f-2533-4181-a6f0-a06da6237289',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065213Z:b7e4a99f-2533-4181-a6f0-a06da6237289',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0be5270f-0bc2-471e-84c1-b76bf5c416c4',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4506',
  'x-ms-correlation-request-id',
  'f3f56bf2-5c36-490c-b330-980146b29b56',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065213Z:f3f56bf2-5c36-490c-b330-980146b29b56',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5e964924-aa0f-4d30-89c4-e391466bb664',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4505',
  'x-ms-correlation-request-id',
  '07e7eceb-8891-406c-aecf-57ed6aebe55c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065213Z:07e7eceb-8891-406c-aecf-57ed6aebe55c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '18eadd2a-5932-46b4-937d-a0688cdaf3d3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4504',
  'x-ms-correlation-request-id',
  '40edcafc-978e-4428-bb61-49d1aaf0e929',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065214Z:40edcafc-978e-4428-bb61-49d1aaf0e929',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a21ba2f1-b202-4d8a-949e-07c5ab605cc9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4503',
  'x-ms-correlation-request-id',
  '3784e469-859e-4c4c-a4e7-13e5aed4a548',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065214Z:3784e469-859e-4c4c-a4e7-13e5aed4a548',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a4545c73-d5c9-4fe8-82e8-c1bb3ad1ab8d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4502',
  'x-ms-correlation-request-id',
  '4348818d-0d22-4186-a660-913f413c6e9f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065215Z:4348818d-0d22-4186-a660-913f413c6e9f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '972144ef-2c4e-4853-abdd-07c7c858ca41',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4501',
  'x-ms-correlation-request-id',
  '1880e277-c460-44da-ad95-fafc6ae067a0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065215Z:1880e277-c460-44da-ad95-fafc6ae067a0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '52a54bba-7ad3-4398-a43a-62bb79ff1121',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4500',
  'x-ms-correlation-request-id',
  '0514e07a-37e9-4c61-85b9-66ef2fbc05b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065215Z:0514e07a-37e9-4c61-85b9-66ef2fbc05b2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '463dfa4b-46c1-4036-9da0-75cbbf59a01c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4499',
  'x-ms-correlation-request-id',
  'b7503667-b3c8-4e7f-a31e-6d9401c84e10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065216Z:b7503667-b3c8-4e7f-a31e-6d9401c84e10',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0f33ea27-771a-4967-8ece-cb640409415c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4498',
  'x-ms-correlation-request-id',
  'f492fd52-db11-4298-8186-855698d3ce27',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065216Z:f492fd52-db11-4298-8186-855698d3ce27',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '3020eabe-6283-42b6-8d02-c591c9ea3b47',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4497',
  'x-ms-correlation-request-id',
  '3e411639-a51f-4c40-b992-d6688294ac6a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065216Z:3e411639-a51f-4c40-b992-d6688294ac6a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'fcd83b38-77b1-41f5-827a-496675ad0903',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4496',
  'x-ms-correlation-request-id',
  '6cc5147c-9c95-4f4c-b130-ef218dd346f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065217Z:6cc5147c-9c95-4f4c-b130-ef218dd346f6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '523ff314-54bf-400c-b614-13830a33013d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4495',
  'x-ms-correlation-request-id',
  '4e4196d7-8724-4a92-acfc-dc76d85c6bcf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065217Z:4e4196d7-8724-4a92-acfc-dc76d85c6bcf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '75329d64-19eb-43e5-a573-f730368d6100',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4494',
  'x-ms-correlation-request-id',
  'b7465abc-50ab-48b7-93fe-cee4fd69f115',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065218Z:b7465abc-50ab-48b7-93fe-cee4fd69f115',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ccbe05b8-e021-42f7-beeb-4b0a10cab514',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4493',
  'x-ms-correlation-request-id',
  '4e18543b-8662-461b-bd83-fc9cd348225b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065218Z:4e18543b-8662-461b-bd83-fc9cd348225b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '81b24017-bb59-417a-b239-61f424cf4b4d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4492',
  'x-ms-correlation-request-id',
  '6a15603c-9c1e-410d-9920-aacaf01f39d0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065218Z:6a15603c-9c1e-410d-9920-aacaf01f39d0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0a73142d-bca1-4b10-aecf-53cf536ffe24',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4491',
  'x-ms-correlation-request-id',
  'e49cd325-8b55-4de5-bec4-a906927fcdfb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065219Z:e49cd325-8b55-4de5-bec4-a906927fcdfb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e23479e-7367-4da5-80f3-60d6e63ff202',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4490',
  'x-ms-correlation-request-id',
  'dd630fda-bb3c-42b4-a34f-8f692cabaed0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065219Z:dd630fda-bb3c-42b4-a34f-8f692cabaed0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f50fae30-6008-479c-945c-95ce55417451',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4489',
  'x-ms-correlation-request-id',
  '511d48b7-dac0-40fe-9d14-42ad11ae30f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065220Z:511d48b7-dac0-40fe-9d14-42ad11ae30f6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f485c8dc-40cd-4833-9802-1de8a49962ee',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4488',
  'x-ms-correlation-request-id',
  '63d8d279-d0b3-4160-ba07-b01e444ae8f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065220Z:63d8d279-d0b3-4160-ba07-b01e444ae8f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2dcd7824-9a2c-48a6-ab61-79b9d99ce139',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4487',
  'x-ms-correlation-request-id',
  '4646195a-ca4b-4b50-81eb-f40032849d4e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065220Z:4646195a-ca4b-4b50-81eb-f40032849d4e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'abf1d6fe-4b15-463a-a033-71f2daefe3fc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4486',
  'x-ms-correlation-request-id',
  '52058c4a-82dc-4784-bd2e-39e22356dce6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065221Z:52058c4a-82dc-4784-bd2e-39e22356dce6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'c6f4915c-6830-4b01-b9df-c233fb0719fd',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4485',
  'x-ms-correlation-request-id',
  '17ffe929-a4e1-40e8-870b-eb8688dc073e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065221Z:17ffe929-a4e1-40e8-870b-eb8688dc073e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2c4655a4-1370-4011-9fe4-e93971df2da1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4484',
  'x-ms-correlation-request-id',
  'd84e6b88-08de-4a00-b188-aaab95a9176f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065221Z:d84e6b88-08de-4a00-b188-aaab95a9176f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4285daf4-f6f6-4864-8f73-785b20b55a0f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4483',
  'x-ms-correlation-request-id',
  '946d08fc-44aa-4d92-bc39-4b416e3bcee1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065222Z:946d08fc-44aa-4d92-bc39-4b416e3bcee1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'ee5ff04a-a370-447c-9052-68862a7d7b1e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4482',
  'x-ms-correlation-request-id',
  'd366124b-83a9-4d0a-863e-10db4b02342f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065222Z:d366124b-83a9-4d0a-863e-10db4b02342f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '2e3c2891-6874-4ac7-8482-7573c6944dbf',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4481',
  'x-ms-correlation-request-id',
  '0bf338db-c496-4ed3-b8f6-d61c2c58de79',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065223Z:0bf338db-c496-4ed3-b8f6-d61c2c58de79',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '079eabb9-dfaa-47c6-9500-235428e06c4b',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4480',
  'x-ms-correlation-request-id',
  '682093c5-89a0-47a2-b7ee-338e9eb13902',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065223Z:682093c5-89a0-47a2-b7ee-338e9eb13902',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a9fe4a54-320d-4830-98e0-4c9d6828236d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4479',
  'x-ms-correlation-request-id',
  '7b0ddbf0-4e48-4efc-be7e-d8e02ac8c7fd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065223Z:7b0ddbf0-4e48-4efc-be7e-d8e02ac8c7fd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '4d30dd02-f34d-48db-a374-10e236d10c61',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4478',
  'x-ms-correlation-request-id',
  '39ca8bf7-a6b7-42a7-b41b-09191ea7fb28',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065224Z:39ca8bf7-a6b7-42a7-b41b-09191ea7fb28',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e920035-bfa0-45e1-a0dd-b86e9d250f7c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4477',
  'x-ms-correlation-request-id',
  '6cd9dd44-e8e9-4ef1-810d-6ee79988b316',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065224Z:6cd9dd44-e8e9-4ef1-810d-6ee79988b316',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '215951f7-fc99-4206-a676-3c49a32bf88f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4476',
  'x-ms-correlation-request-id',
  'df461201-5c14-45b7-97cb-0eacac1d02b2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065224Z:df461201-5c14-45b7-97cb-0eacac1d02b2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd3db3676-7d22-455b-affa-de7e4cc5ebad',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4475',
  'x-ms-correlation-request-id',
  '039d1dc4-0d13-47f6-8cc6-18617df1eeec',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065225Z:039d1dc4-0d13-47f6-8cc6-18617df1eeec',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '234b2ef6-1c4b-48c9-9cf0-6760555f88a3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4474',
  'x-ms-correlation-request-id',
  '1c84ce2e-6a03-4d9d-a437-d5d8e81b2abf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065225Z:1c84ce2e-6a03-4d9d-a437-d5d8e81b2abf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '74f88030-e540-4139-b1c5-2362becd31a7',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4473',
  'x-ms-correlation-request-id',
  '5751b6a9-5a03-49de-b18e-73fad815476a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065226Z:5751b6a9-5a03-49de-b18e-73fad815476a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '36af90fd-21ad-46fb-92bc-31608c1868fe',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4472',
  'x-ms-correlation-request-id',
  'e47ac2e1-377c-4751-bdb1-dffd13355ac6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065226Z:e47ac2e1-377c-4751-bdb1-dffd13355ac6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '9e8e55fc-ad16-47a5-9ef4-769bb086accc',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4471',
  'x-ms-correlation-request-id',
  '7d7f01b9-5524-4935-ac53-1f0f0e5f0de4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065226Z:7d7f01b9-5524-4935-ac53-1f0f0e5f0de4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '48fe133d-40ff-4a85-9c69-bd8d31191550',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4470',
  'x-ms-correlation-request-id',
  '0d726c76-2ec5-4165-a994-876bb12da3db',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065227Z:0d726c76-2ec5-4165-a994-876bb12da3db',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '7c7abed3-6a19-4acc-8cab-7e3851a34db1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4469',
  'x-ms-correlation-request-id',
  'e660632a-326c-4013-b2b9-b36b9e690731',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065227Z:e660632a-326c-4013-b2b9-b36b9e690731',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '24b6ed79-c7ff-45dd-9135-d571fa66da8f',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4468',
  'x-ms-correlation-request-id',
  '7e7eaa88-817b-431b-9d21-8857902c74e2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065228Z:7e7eaa88-817b-431b-9d21-8857902c74e2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==?api-version=2021-01-01-preview',
  'Retry-After',
  '60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd79a5090-d594-4138-bcef-0bb2f7487266',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4467',
  'x-ms-correlation-request-id',
  '60bab2d6-e96b-4fcd-a140-79edb596c8cd',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065228Z:60bab2d6-e96b-4fcd-a140-79edb596c8cd',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.ApiManagement/locations/eastus/deletedservices/myservicexxx5/operationresults/ZWFzdHVzOm15c2VydmljZXh4eDVfVGVybV81NGQyZDJhZQ==')
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
  '9f921955-aaac-4d4c-80fe-b5707aebc168',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4466',
  'x-ms-correlation-request-id',
  'b66b7dfa-6415-467c-916b-09e738b3fdc4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065228Z:b66b7dfa-6415-467c-916b-09e738b3fdc4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a457f7bf7eeddfe47a38f96d98270faa8fb717bbdc2c7374043c3eca2f9e8d12ffe25a38fca6a9a6128f4da69d6b4e957afe9eb9cbea70f8ef979f2e4c5fcec33fa94d05de5755be478f5a3d57a5216cd3caf4f17595152ebf3aafa3da7d5b2a59ec7d36a81174c9317822eb5a04f97555b9c17d2ebeb7c49e33710b255b1b858b4dbcbaace57e5f5ef898fc757c572565d35d90fd6756ee0826e0dbd5e2c2f5eb7590bd8afd7d3699ecff2197ddf66f545debe8cb4a22fa7754ebfcf8edbafda297db2b7b3b7bbbdf3707b6fffcdcefd47f7ef3ddabd3fbebfbfb7ff70e7c14f51eb0b6a7b955d7f5503bf79dbae9a4777c3d9183366db84fb7899b7ee9557f905f59d951b5eddce89e2eb667b67775c6beb1eb45555b71b818ca545efc5597e999798b097fcfd2608b6690fc8c2320f71d22610ae610f46335d6c7a93beeebd32af9a162c7e522dcf8b8b75cdbc425c4742a82c4e93fbee5a5b2a778560bb20f3e5b422ee38010333f7d12bcb75598e3e7a9b5fff64b62edb33126ff964ea1abdcc9ae6aaaaed57cbfc82d897be38290b1a6c00ee3c2b9b3c78dbbc35cbcfd1c3eba67c42dc4cfcf8d1a3b65e535b92fe655bb4d7022d8ac16b561d34be27eb82905cd258fc6f89b1d74419bcf64bbe4fec02919b9ebd3c9ecd48eb3410d5ef118f8f0ff6c7f7ee8f77ef7dfa111ad5c525bd1bb40280d147d96c5680d659f95cf582fdeab2a8db7556bec85ba2c7db60664c93e9ba69ab054d0db19251134e177d97864e827c8c890915d3f873c2864466fc3a9fae6b22c79860b4d5b42a9bf19bb2d9dda1d13f037169ecdf04bcdd6f101ecde9bd0fc7efa458919a24ecc8b094f9d3bcd9fdf4e083813ec9a66f49bf7ac862f01f8e6c1cee8713b50ff78388eb8121bd40caeddba47ff62c34b27d214bbf11cdf2a25aa22b4fc6888f85bf6745934dca5c3bb0024f4ae62769f24810482a9ab6ce8a650bd65f144bc24cbf1218d4a94ae84a65cfc9bc4ae5e972b6aa0802c15ae6538897f64fef366fd7000cd5489892ec2f6719e926c2365b6553a2e1478f76a999d12af2dee8a31fd0900c90ef","ff92ff075912a39ad3080000"], [
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
  '03bbb45b-72fb-460a-b0b4-6c97fd7e4fea',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4465',
  'x-ms-correlation-request-id',
  '3033bd23-6ee3-4b9a-8791-59cb386d7d9d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065229Z:3033bd23-6ee3-4b9a-8791-59cb386d7d9d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:52:28 GMT'
]);
