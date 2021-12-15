let nock = require('nock');

module.exports.hash = "865fbcebf160d865dd577c11b7c20a2d";

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
  '311b60c9-0dff-4e90-abb2-2728db860200',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmMH5cMBn_hEgjqR9S81HzM; expires=Sat, 08-Jan-2022 06:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWyTmJ0S12mUsH8iF9K8qDBa12DW7CyLkGD6NUIusCcLgQ94d5jrv1xFzz181lsNO_aeGwZMIR7H7lelEuDYG8JkgJvODG5JwDbQ0jMPsMjJkGEhGnNuaW6wsRo_giNwyNomg8VGoAjpn-Ibjro3wXunTWyFoddGBXydLRH63XqQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 06:35:57 GMT',
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
  'e64f853d-c3ea-4b39-a1b7-d973f2780300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsZbAW_l12VKoPrVFkG8SYs; expires=Sat, 08-Jan-2022 06:35:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmafdWCoeviMXHPLk3YxjSV1azkQp71nc_2GSeB-BtuMjXsT_fSkXQzepMMI-PtMGJihKf9ojZCxFJm4IkMxaQMYhO0TnATVzA_eXSSzJCS1tdNEjaX3GM6CQ7rC478qEWMqa0Pv8JTkOnyemEE4iMAvxHaG9Z5-Mb2CznAVU7iIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 06:35:58 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=24f5ca21-914b-45ce-90ca-87749c8398aa&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '26d71743-73ca-49e7-9274-7b103e7c0200',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkLo34Kgi0hGuC4JLG7tfpUWPr5BAQAAAM2aQ9kOAAAA; expires=Sat, 08-Jan-2022 06:35:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 06:35:58 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventHub/namespaces/mynamespacexxx/eventhubs/myeventhubxxx', {"properties":{"messageRetentionInDays":4,"partitionCount":4,"status":"Active","captureDescription":{"enabled":true,"encoding":"Avro","intervalInSeconds":120,"sizeLimitInBytes":10485763,"destination":{"name":"EventHubArchive.AzureBlockBlob","properties":{"storageAccountResourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/mystorageaccountxxx","blobContainer":"container","archiveNameFormat":"{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}"}}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f2ff365fbedf5e4ee325be4cd2a9be678c1fef1eeddbbbb399acc090dfac2fc4e9f7f34fa08cd08c7eec7edf50a1f473a79412f30dce6aef9aca117ca6a9a617cf4d269d6b4e957afe943c27695d76d91371f3dfac51fd17b4d7691bfca5b7a8d9a9e2d9f66d7f4cd3e35cca8153e3ba9d6cb963f6adaac5dd3b71f1d4fdbe2322768d33acfda7c764cdf7fb4b7b3b7bbbdbbb7bdf3f0cdcea78fee7dfa686767bcbffb53d46abd9a6d6c75b08f56b6c3b319f5f1bd8f76e8b35dfaff1efdffde47dfa7ceb255bbaef3a7b99d390c215f669332a7496deb753ea23fa7d5ac585e5057c7977545efce68928aa552e2171bea1a421dd7d3398d657cfc0302fd8448f696fe99d06b21a19ab6aa8950c7d329a8f14a59e18cbafd59e7a5d7d2f5dd1005bca49f64f28970c984b03fa9966d562cf39ab09bdadf471f653256b0cbb3aa5e64988f5f8cbf98797ec9dd5f6c8842bfbe74b3417ffd3e7956d38f2f08d89c7e1293d0bfdfa621d08f2f8ae5bac5dbaf73ea6cf64b3efa25bf64f451b16cf3fa322bcf96f2291171776f8758a8f841febc5814edd9f2c9350d993eded93fb8ffe0d37bbfe497fc","92ff07b03c56239d030000"], [
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
  'x-ms-request-id',
  '7c02ee87-449a-4811-914f-df138bfadafd_M2CH3_M2CH3',
  'Server-SB',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'a37b8641-c0ad-401d-b4bc-5d9daec4a1ad',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T063601Z:a37b8641-c0ad-401d-b4bc-5d9daec4a1ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 06:36:01 GMT'
]);
