let nock = require('nock');

module.exports.hash = "06a13e43078193cdea7909e7147548ce";

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
  '96a016c5-541f-49ed-980f-cd1acf640600',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmFD90DpU5RBl-NY_LvIGsU; expires=Wed, 19-Jan-2022 01:59:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrU1ovqH156wMKr5WQfIugw7V9rhdOKxWLG13sIAm8FBZ63EwQ-gfyb4jsdr0Wi1JD7lk46dbWvNBW9DOYNhab3rXKZVRHxbRm79rp68O89wG1fo5KPqUwIlaNjyEsxIS4THXHAi_bfK3q2G1eQ-LpVZOfarQ0wZyIFELymS4fSbIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 01:59:01 GMT',
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
  '8c13a6d3-61bd-4014-a8ce-d94fb6870600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiD2g8LEnQ1Ks5_Pm7x10cM; expires=Wed, 19-Jan-2022 01:59:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrX91mW9HZPNKG58vU8XAxbyshkMVsQ6AFlKKdj2_uWfH-rXv9y76K28RY8B2EnS7sy0WG5LabeMbxdNXQZgNVBDALbAU4AcKqIcZiIPaPySwusXewWHb_TEJLR7DaFhSMKOi9HqSBTZ9JHkfWSb4eQzmlfybtK6z07KYQazUcIfAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 01:59:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4bbdc358-8d76-4c5f-90f0-6c8f971fb04d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '96a016c5-541f-49ed-980f-cd1ad2640600',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArTUvopmaZ9AlM1wByZ8rtvLj78gAQAAAGTaUdkOAAAA; expires=Wed, 19-Jan-2022 01:59:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Dec 2021 01:59:01 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.NotificationHubs/namespaces/mynamespacexxx', {"location":"eastus"})
  .query(true)
  .reply(201, {"properties":{"provisioningState":"Unknown","enabled":false,"zoneRedundant":false},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.NotificationHubs/namespaces/mynamespacexxx","name":"mynamespacexxx","type":"Microsoft.NotificationHubs/namespaces"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '301',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.NotificationHubs/namespaces/mynamespacexxx?api-version=2017-04-01',
  'Retry-After',
  '0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'TrackingId',
  '29af7071-d77a-4771-abce-7b06bbe95cca',
  'x-ms-correlation-request-id',
  '4cb9f20c-a5aa-41d5-b1b6-4b5f06dbb240',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.NotificationHubs/namespaces/mynamespacexxx/operations/Q3JlYXRlTmFtZXNwYWNlLTkyZjk1ZDhmLTNjNjctNDEyNC05MWM3LThjZjA3Y2RiZjI0MS1teW5hbWVzcGFjZXh4eDtuaHByb2RibDIwMDEtMi1mYWJyaWM=?api-version=2017-04-01',
  'api-supported-versions',
  '2014-09-01, 2016-03-01, 2017-04-01, 2020-01-01-preview',
  'Server',
  'Kestrel',
  'x-ms-request-id',
  '4cb9f20c-a5aa-41d5-b1b6-4b5f06dbb240',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211220T015918Z:4cb9f20c-a5aa-41d5-b1b6-4b5f06dbb240',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Dec 2021 01:59:18 GMT'
]);
