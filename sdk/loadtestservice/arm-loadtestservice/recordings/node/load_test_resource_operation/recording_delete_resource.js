let nock = require('nock');

module.exports.hash = "b35862e4e4249ff77e87b0f66f48897a";

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
  '250271ff-6200-4580-b92a-fbeefc5c2a02',
  'x-ms-ests-server',
  '2.1.13672.7 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgJlRzjhbyVDiDp7kxPzhRI; expires=Fri, 21-Oct-2022 18:06:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrsa-QEggqBMXFP5JCjQsfVjHKTPvAJHpkRvcGvdNvUC5SOF5aCUO6nQcIjfHAp4f9CMsiq2KjPSt6r1YB73JEUK8aIqyo_ieIaRZDEqTg6kkro2hPfV5JmSGEuzVCWukPfDDf2a476iVDKJfpmcpoGvrJnu39VgXKQ-76IA6cYUcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:48 GMT',
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
  'bb5c6033-70f5-42f5-ba14-825bd983f400',
  'x-ms-ests-server',
  '2.1.13672.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlUpklb2UuhJivjJmi0K7w8; expires=Fri, 21-Oct-2022 18:06:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdSCSt8bkHYPyMPhKzHZINm9EDzDEgseIrOezNjvnun66ZMyo66LytyNEfIrA2ntjDwJvGOrbZWYu20ibBzdZipTPFS48DokiHK2Qs64KUqon4f0X70Geqw_1PEyXaZHK08O1afZ2-uajAj_YsBmimCZx_HLQMhen6THDkYMw4jcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=66bb6074-f8e8-490d-a668-89204078967a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '414f66dd-afda-42aa-a740-883c53dcb201',
  'x-ms-ests-server',
  '2.1.13672.7 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkmLekuW7VFBm7rKwn9CFxScMqfgAQAAALhJvdoOAAAA; expires=Fri, 21-Oct-2022 18:06:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:48 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/rg-sdktests/providers/Microsoft.LoadTestService/loadTests/sdk-malt-js-resource')
  .query(true)
  .reply(202, null, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '4',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"f201aea9-0000-0800-0000-632b52bb0000"',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.LoadTestService/locations/WESTUS2/operationStatuses/f9170a17-5c67-42ae-9bcc-7e9dcd3b0770*FDA12ACE1897FB376E457461CF62C90E8E9486D4EE8C52C552598458A15E9AA0?api-version=2021-12-01-preview',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-providerhub-traffic',
  'True',
  'mise-correlation-id',
  '226b06a4-8c28-4416-9f29-b4327eececcf',
  'x-ms-correlation-request-id',
  '236043cf-9860-49e7-aa96-c59dadc6e4ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.LoadTestService/locations/WESTUS2/operationStatuses/f9170a17-5c67-42ae-9bcc-7e9dcd3b0770*FDA12ACE1897FB376E457461CF62C90E8E9486D4EE8C52C552598458A15E9AA0?api-version=2021-12-01-preview',
  'x-ms-request-id',
  'f9170a17-5c67-42ae-9bcc-7e9dcd3b0770',
  'x-ms-routing-request-id',
  'SOUTHINDIA:20220921T180651Z:236043cf-9860-49e7-aa96-c59dadc6e4ec',
  'Date',
  'Wed, 21 Sep 2022 18:06:50 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.LoadTestService/locations/WESTUS2/operationStatuses/f9170a17-5c67-42ae-9bcc-7e9dcd3b0770*FDA12ACE1897FB376E457461CF62C90E8E9486D4EE8C52C552598458A15E9AA0')
  .query(true)
  .reply(202, {"id":"/subscriptions/azure_subscription_id/providers/Microsoft.LoadTestService/locations/WESTUS2/operationStatuses/f9170a17-5c67-42ae-9bcc-7e9dcd3b0770*FDA12ACE1897FB376E457461CF62C90E8E9486D4EE8C52C552598458A15E9AA0","name":"f9170a17-5c67-42ae-9bcc-7e9dcd3b0770*FDA12ACE1897FB376E457461CF62C90E8E9486D4EE8C52C552598458A15E9AA0","resourceId":"/subscriptions/azure_subscription_id/resourceGroups/rg-sdktests/providers/Microsoft.LoadTestService/loadTests/sdk-malt-js-resource","status":"Deleting","startTime":"2022-09-21T18:06:51.5238771Z"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '569',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"090199c9-0000-0800-0000-632b52bb0000"',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-request-id',
  'b707492a-b4f4-4845-993d-58c5a775ac7c',
  'x-ms-correlation-request-id',
  '6350bb3f-ec6d-4a38-af57-134180b93793',
  'x-ms-routing-request-id',
  'SOUTHINDIA:20220921T180651Z:6350bb3f-ec6d-4a38-af57-134180b93793',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 21 Sep 2022 18:06:50 GMT'
]);
