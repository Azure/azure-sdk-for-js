let nock = require('nock');

module.exports.hash = "769c7b76f0ccbf6d624ecf24fb0d4543";

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
  '2ed2b765-f859-4906-9e34-7b9e7daf5504',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmSjUYE8oeFDiTp0r7nVslo; expires=Thu, 09-Sep-2021 20:26:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr75uLxh2GyrG7WRjEKg8tSqt5auKQIdKfLBUb2uMG3vvQ8U7LUw-Hg7pUzRyVOZp5lYYrFFh5CNQRmR7mjF8B4iTOyV_SMuCBYdG0zr4-PjhUCqUtPKF9zyWs6Sr5yqbDsNkVhMu8ptyFKnUSRrlbC36p7X0ChUN2PR7FCUQUYxQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Aug 2021 20:26:24 GMT',
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
  'ffdf1d3f-162f-4ad5-bdf2-0d33685dae00',
  'x-ms-ests-server',
  '2.1.11935.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApzbnmeBehNOvXDzjPUBTPE; expires=Thu, 09-Sep-2021 20:26:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfkuit9ka8GjaLrYB-T3MJX_aRFpeolat5NikseAgmCMkkjDMkSrUcm2CgVC9a-2k23vKOqaB4uIlmAnddgMg9H2KCZENNjBS3f8P_kqc8VDSvomHtE5h-ujqi8Lg7Et8zs4NKmR8Cmqq8QT4lPHh9wBGe0-e50PMMvxLTJu4gfwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Aug 2021 20:26:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=ea64357e-7d34-4e04-ad6a-26779330315e&client_secret=azure_client_secret")
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
  'b368498d-7b50-43c7-ba0d-a60e0a50ce00',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqKMeKMYSidAqZUmj5Abz4bKOuyWAQAAAPDXpNgOAAAA; expires=Thu, 09-Sep-2021 20:26:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 10 Aug 2021 20:26:25 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/livyApi/versions/2019-11-01-preview/sparkPools/testsparkpool/sessions')
  .reply(200, {"from":0,"total":20,"sessions":[{"id":9,"appId":"application_1628552050977_0007","appInfo":{"driverLogUrl":"http://d3bdd27a029942e8b116889ad2df853c003e1c44323:8042/node/containerlogs/container_1628552050977_0007_01_000001/trusted-service-user","sparkUiUrl":"http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0007/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0007/","\t user: trusted-service-user","21/08/09 23:56:25 INFO ShutdownHookManager: Shutdown hook called","21/08/09 23:56:25 INFO ShutdownHookManager: Deleting directory /tmp/spark-9b0c5aab-edc7-45ee-81bf-579ddf7743c9","21/08/09 23:56:25 INFO ShutdownHookManager: Deleting directory /tmp/spark-c998cf7d-9373-4042-badc-3b46fae5fc6f","21/08/09 23:56:25 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/09 23:56:25 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/09 23:56:25 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]},{"id":10,"appId":"application_1628552050977_0008","appInfo":{"driverLogUrl":"http://d3bdd27a029942e8b116889ad2df853c003db842456:8042/node/containerlogs/container_1628552050977_0008_01_000001/trusted-service-user","sparkUiUrl":"http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0008/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0008/","\t user: trusted-service-user","21/08/09 23:59:20 INFO ShutdownHookManager: Shutdown hook called","21/08/09 23:59:20 INFO ShutdownHookManager: Deleting directory /tmp/spark-b417ffae-5dc8-4e87-886d-5187e5537846","21/08/09 23:59:20 INFO ShutdownHookManager: Deleting directory /tmp/spark-74ff6670-9a2a-4ea4-bfaa-2dee5129cbd5","21/08/09 23:59:20 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/09 23:59:20 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/09 23:59:20 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]},{"id":17,"appId":"application_1628626490330_0001","appInfo":{"driverLogUrl":"http://fcb56c1652644ce788aaf828196d9cb400135519550:8042/node/containerlogs/container_1628626490330_0001_01_000001/trusted-service-user","sparkUiUrl":"http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0001/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0001/","\t user: trusted-service-user","21/08/10 20:15:18 INFO ShutdownHookManager: Shutdown hook called","21/08/10 20:15:18 INFO ShutdownHookManager: Deleting directory /tmp/spark-3a6db1d3-8268-4fd3-8571-abc0f9ed62ae","21/08/10 20:15:18 INFO ShutdownHookManager: Deleting directory /tmp/spark-a7f16008-fa48-4694-a5f3-9e37b8413b58","21/08/10 20:15:18 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/10 20:15:18 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/10 20:15:18 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]},{"id":18,"appId":"application_1628626490330_0002","appInfo":{"driverLogUrl":"http://fcb56c1652644ce788aaf828196d9cb400495c68195:8042/node/containerlogs/container_1628626490330_0002_01_000001/trusted-service-user","sparkUiUrl":"http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0002/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0002/","\t user: trusted-service-user","21/08/10 20:15:18 INFO ShutdownHookManager: Shutdown hook called","21/08/10 20:15:18 INFO ShutdownHookManager: Deleting directory /tmp/spark-81d42dd5-dfee-4207-987a-720e1d945c6d","21/08/10 20:15:18 INFO ShutdownHookManager: Deleting directory /tmp/spark-982afeba-acf8-4a35-b947-009adeb638dc","21/08/10 20:15:18 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/10 20:15:18 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/10 20:15:18 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]},{"id":19,"appId":"application_1628626490330_0003","appInfo":{"driverLogUrl":"http://fcb56c1652644ce788aaf828196d9cb4001ebe94562:8042/node/containerlogs/container_1628626490330_0003_01_000001/trusted-service-user","sparkUiUrl":"http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0003/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://fcb56c1652644ce788aaf828196d9cb400197b73200:8088/proxy/application_1628626490330_0003/","\t user: trusted-service-user","21/08/10 20:15:25 INFO ShutdownHookManager: Shutdown hook called","21/08/10 20:15:25 INFO ShutdownHookManager: Deleting directory /tmp/spark-a0d7e240-e9e1-4643-9903-3512e2803e54","21/08/10 20:15:25 INFO ShutdownHookManager: Deleting directory /tmp/spark-24f0f6cb-56e6-4b6f-97c1-f757f3837e00","21/08/10 20:15:25 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/10 20:15:25 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/10 20:15:25 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]},{"id":20,"appId":null,"appInfo":{"driverLogUrl":null,"sparkUiUrl":null,"isSessionTimedOut":"false"},"state":"starting","log":["stdout: ","\nstderr: ","\nYARN Diagnostics: "]},{"id":21,"appId":null,"appInfo":{"driverLogUrl":null,"sparkUiUrl":null,"isSessionTimedOut":"false"},"state":"starting","log":["stdout: ","\nstderr: ","\nYARN Diagnostics: "]},{"id":22,"appId":null,"appInfo":{"driverLogUrl":null,"sparkUiUrl":null,"isSessionTimedOut":"false"},"state":"starting","log":["stdout: ","\nstderr: ","\nYARN Diagnostics: "]},{"id":23,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":24,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":25,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":26,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":27,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":28,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":29,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":30,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":31,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":32,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":33,"appId":null,"appInfo":null,"state":"not_started","log":null},{"id":3,"appId":"application_1628552050977_0001","appInfo":{"driverLogUrl":"http://d3bdd27a029942e8b116889ad2df853c00376412812:8042/node/containerlogs/container_1628552050977_0001_01_000001/trusted-service-user","sparkUiUrl":"http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0001/","isSessionTimedOut":"true"},"state":"dead","log":["\t tracking URL: http://d3bdd27a029942e8b116889ad2df853c00376412812:8088/proxy/application_1628552050977_0001/","\t user: trusted-service-user","21/08/09 23:34:35 INFO ShutdownHookManager: Shutdown hook called","21/08/09 23:34:35 INFO ShutdownHookManager: Deleting directory /tmp/spark-613915bd-e857-4dce-896c-6853c88aa376","21/08/09 23:34:35 INFO ShutdownHookManager: Deleting directory /tmp/spark-550ee1ed-4f5b-4c6c-9765-b6ac0fe95193","21/08/09 23:34:35 INFO MetricsSystemImpl: Stopping azure-file-system metrics system...","21/08/09 23:34:35 INFO MetricsSystemImpl: azure-file-system metrics system stopped.","21/08/09 23:34:35 INFO MetricsSystemImpl: azure-file-system metrics system shutdown complete.","\nstderr: ","\nYARN Diagnostics: "]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-response-time-ms',
  '160',
  'x-ms-activity-id',
  'f9755f9d-bfb1-4e90-ab22-dcac80f617a8',
  'x-ms-client-request-id',
  '9b5a1a66-7632-49d2-8688-c5ed2db976bc',
  'x-ms-request-id',
  'd0c39e0c-9251-4436-8da2-b20d5961453a',
  'Date',
  'Tue, 10 Aug 2021 20:26:25 GMT'
]);
