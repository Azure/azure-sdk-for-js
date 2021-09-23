let nock = require('nock');

module.exports.hash = "1a8b1c549dba973fbb3896e16eade546";

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
  '775473a0-43fe-485f-afc2-38e43fa00900',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Av-VmDg6QMJLqyULFpCqvQo; expires=Mon, 18-Oct-2021 08:59:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQK0xhS6SLAzx5C6mc6IV7wVe4ZsArgHTmEh4xG_HQHrPomTM_M8vBvcNMs0tq_tJdF_NsGrlZwPEsrVVvCM6gE95q41OpIA_pEa8z44Ej3eqiqVMgymAQTTZ38EwCY4pson3zNf-xJh530tnuzBNSiDPYKUqBDyMjZ1C7inUXPIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:54 GMT',
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
  '775473a0-43fe-485f-afc2-38e440a00900',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiI6wVq9iv5LnBs1sxhzBH8; expires=Mon, 18-Oct-2021 08:59:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpmUzLFXXAKeiH-9zaeDDv-h4ozFT7rBqTF_AGrgjmccCkEK-4YxRmBXzxh8b_daY68vEPKguCy-DRaBkmWP678YXsyvRWvirXFqEde6VAzhVK39RBrfGkaHwFzMd1-p9POwLD5KpYCQGVdBbHZAAgXm5XQYKEu2P8VebBjpZm4ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:54 GMT',
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
  'd6797efd-4d53-4fde-bec1-0b21b63b1070',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '5c7db4cd-8f4f-4172-96b9-fef9a0e188ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085954Z:5c7db4cd-8f4f-4172-96b9-fef9a0e188ad',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c802cb24-a236-45ed-b724-f00763d15dfa&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '959f3a1f-50a2-4919-ada4-7b8963220900',
  'x-ms-ests-server',
  '2.1.12071.7 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aj1Rh13miNJOhuE3gobh8L8WPr5BAQAAAImh19gOAAAA; expires=Mon, 18-Oct-2021 08:59:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 08:59:54 GMT',
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
  'a16fc161-11d1-4f02-9bfd-7ea753f6d892',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '8981',
  'x-ms-correlation-request-id',
  '8c736538-4b18-4dc7-8552-07d3ffe596e1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085954Z:8c736538-4b18-4dc7-8552-07d3ffe596e1',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest1/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdaddbbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a477f7bf7eeddee47a38f96d98290faa8fb717bbdc2c7374043c3eca2f9e8d12ffe25a38fca6a9a612cf4da69d6b4e957afe9eb9cbea70f8ef979729c3dfd7d3ea34f09dd555eb7458e573f5aad2765d1ccf3fa74911525b53eafaadf735a2d5bea793cad1678c1347921e8520bfa7459b5c57921bdbece97347e03215b158b8b45bbbdacea7c555eff9ef8787c552c67d55593fd605de7062ee8d6d0ebc5f2e2759bb5807d3c6d8b4b82b9bca0066d565fe4edcb9b9a4deb9c3e9d1db75fb553fa6e676767779bfff76667e711ff8f1a5d5093abecfaab9a305caecbd27ef22abf20d859e97db3aaea36f860965fe625a8f6b2fbcdc24e0bcd91f779335d787fcdaba6c55c9f54cbf3e2625d13e6c476cc8e3ad734c877d784265a2a9903ae1833e1b689b4e365de52c37c39ad66f9ec0433c9d340af48676ff3eb9fccd6657b468c2e9f4c5da39759d35c55b5fd6a995fd03cd2172765418308c09d676593076f9bb766f9397a78dd944f685a310b8fda7a4d6d490c966dd15e0bb42806af5988687c4fd60521b9a4b1f8dfd204af893278ed977c9fa602bc373d7b793c9b91fc35e0597c455fd460803cf24d369b15a06f563e57a1b05f5d1675bbceca17794b34781bcc8669325d376db5a0e9a0d9161991cfc357dfc8acbda89610430f7fdb7e5634d9a4cc3fa7cf88c92c3169027f9234057548bd376d9d15cb1662b82896c440fa95c020a9d6d1af748c8e9e3afad3e56c55110482b5cc492408a4b4a0779bb76b0006db11a644d7e52ca379276cb35536a539fae8d12e35333326ef8d3efa010dc900f9fe","2ff97f007c19943939050000"], [
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
  '1bc61c75-9f20-4e8d-98fb-1d76b0f673a1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-correlation-request-id',
  'b48a0d61-6121-443a-ad40-8c13db46d36a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T085954Z:b48a0d61-6121-443a-ad40-8c13db46d36a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 08:59:53 GMT'
]);
