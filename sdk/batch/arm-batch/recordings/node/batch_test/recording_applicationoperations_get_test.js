let nock = require('nock');

module.exports.hash = "48f192586084b13ff7683d6225834ab8";

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
  '9c336831-c143-4a99-9043-6bef0c956f00',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmtSGl6FU9dMoq9Z6H693ck; expires=Sun, 19-Dec-2021 07:07:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrttIqN5BciRHkS9FfZFqNmmNKykI5tX9ORs-A92VKbxRKu2qRTtYy8vQ1S1PwkoJh3hrb7ZgfVbKZg99ZS4SlkQDHCMRA2rJ13etbamp5iELM4ujdrf5RZS6Nd_kJV8SgOkPCFdmAtUmrR-vJKGZv66U0MdYBrLAy1ACPDpxqV84gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:30 GMT',
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
  'f4ed96f2-9537-472a-b9ab-348fb94f4500',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Atqwiynt6udAr-lRQODGEWk; expires=Sun, 19-Dec-2021 07:07:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEPHQpdqgJHWlRnDVC86-8N0NJCZlRMxRG4pbZ-9HhlSrmmdo2sTiJrkh_u2h8FhWwYWL73CuomHNVMfc-fyNNwyMVSF8G1iahvy6yFoPfYPBv61looNnM-RAHaa7fXoJdEieWOENiELgHB57Thdd7ZyOHFjKqk59zA_nehSfhzMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=218f236f-7b45-4168-b860-b504f8d14db5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '906e4ea3-a767-46f3-ad6e-942a12293400',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtYCnaFRqXNGsWwesY8Fl2IWPr5BAQAAADJEKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:30 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/applications/myapplicationxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf376fc246ba7f3bb13fc7b3c9d56eb65dbdccd56abb298666d512d9b8f461f15337ae36eb39e34d3ba58f1a7771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cdddcd782cae33f9f5ddbb770152f8c6fd49df1296cb6c819145bec9dbec82bef9eedddff7a39d77074f1f1e3fd97bb2bff3e4fecebd7bcf7edf8fa801e1b3caebb6c89b8f1efde28fb2b2acaebe5acd32c2f5a347e759d9e4bfe4","97fc3f16c438683a010000"], [
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
  'Last-Modified',
  'Fri, 19 Nov 2021 07:07:30 GMT',
  'ETag',
  'W/"0x8D9AB2B40B5033F"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11983',
  'x-ms-request-id',
  '5e39f8fc-8306-42c5-9500-ef3fc9011be4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '66e3a4ac-d515-4736-a7b2-d48f0f9ae675',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070731Z:66e3a4ac-d515-4736-a7b2-d48f0f9ae675',
  'Date',
  'Fri, 19 Nov 2021 07:07:30 GMT'
]);
