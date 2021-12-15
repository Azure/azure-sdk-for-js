let nock = require('nock');

module.exports.hash = "ec7f3fdb02d11a27248023d0744d991d";

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
  '4babd1e2-3f69-4056-80cc-eab609970200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqX6PowJBy9Ag4lFPSRKcbU; expires=Thu, 16-Dec-2021 06:18:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcCevjjVnvyWkqZOI785RmBD0rO1OeAGfgAoh0iIxp06PEfZJPdw60ZApxthVAp8DawIk0BNVYRafENbyk7di2el__jBLW_c22C1ydiFm-jQO2u2sgjjE6W43GaP9dUtdxYadQX5wiB2gKSjFBQaKnUygTZm6P_utl_NanIEdmTsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:04 GMT',
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
  'b45387bf-3eb9-49bf-a095-f2e0318a0200',
  'x-ms-ests-server',
  '2.1.12249.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmND_-b_dk1Jl9UQ1j2JJgA; expires=Thu, 16-Dec-2021 06:18:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJY-H815CgNv6ZWVtisyaLU7d6LcxsddBvxNr94Zg0NLSohIT0TzkvIlcSNgh4zi6Z4vNx2KXjvzZQiVk0JfsnCffnCXJrvu8YjzQuYOmACCafIpZTIsOa3M2d1295JChdvp38hroYhwH-oPRxRA6KPA2gBTak-jpFAlsrqImZyAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0f8851d7-6f98-4c92-aadc-64afb96518fc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '703dbeae-7c9e-4c41-85ca-e451f0f80200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnkuFOzsh-tHjKFrG-9iqQsWPr5BAQAAABxEJdkOAAAA; expires=Thu, 16-Dec-2021 06:18:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 06:18:05 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy', {"properties":{"category":"Cost","amount":100,"timeGrain":"Monthly","timePeriod":{"startDate":"2021-11-01T00:00:00.000Z","endDate":"2021-12-01T00:00:00.000Z"},"filter":{"and":[{"dimensions":{"name":"ResourceId","operator":"In","values":["/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/myvmxxx"]}},{"tags":{"name":"category","operator":"In","values":["Dev","Prod"]}}]},"notifications":{"Actual_GreaterThan_80_Percent":{"enabled":true,"operator":"GreaterThan","threshold":80,"contactEmails":["johndoe@contoso.com","janesmith@contoso.com"],"contactRoles":["Contributor","Reader"],"thresholdType":"Actual"}}}})
  .query(true)
  .reply(201, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy","name":"mybudgetxxxy","type":"Microsoft.Consumption/budgets","eTag":"\"1d7dab1b8b91015\"","properties":{"timePeriod":{"startDate":"2021-11-01T00:00:00Z","endDate":"2021-12-01T00:00:00Z"},"timeGrain":"Monthly","amount":100,"currentSpend":null,"category":"Cost","notifications":{"actual_GreaterThan_80_Percent":{"enabled":true,"operator":"GreaterThan","threshold":80,"contactEmails":["johndoe@contoso.com","janesmith@contoso.com"],"contactRoles":["Contributor","Reader"],"contactGroups":[],"thresholdType":"Actual"}},"filter":{"and":[{"dimensions":{"name":"ResourceId","operator":"In","values":["/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/myvmxxx"]}},{"tags":{"name":"category","operator":"In","values":["Dev","Prod"]}}]}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '939',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Consumption/budgets/mybudgetxxxy?api-version=2021-10-01',
  'session-id',
  'c57dcae8-c6bb-4bfe-83c6-fa9ead99327e',
  'x-ms-request-id',
  '482dca82-f94f-4c4b-88ce-848e02ece52d',
  'x-ms-correlation-request-id',
  'c14cc6a4-b584-4225-8d56-eef3419ac62b',
  'x-ms-client-request-id',
  'fb1185cc-a9aa-4980-9c74-c931ca21e672',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T061807Z:c14cc6a4-b584-4225-8d56-eef3419ac62b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 06:18:06 GMT'
]);
