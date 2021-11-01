let nock = require('nock');

module.exports.hash = "422740a0a80f301937284fd857ae8b29";

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
  '875d4206-a690-4280-8be9-393a09880300',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvfbAaJX4BVFucQ0TPdkG44; expires=Sun, 28-Nov-2021 07:22:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfs8zTqkaYYiQSk6VM8Pc025qKOed7av51agISqw7B2CLLwii42Ly-jgPegQlHqw7tia4rjhObHmuzL0107yePRH3A7n2JHu6rE4SfGOCPWWYaJ9P4EGtvt-0m-8QR4PFbeEMnxJY7CpwCmt_PZkrrwO8uJp4HCCTq1zlTVg-AUcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:42 GMT',
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
  'b66b370e-34a7-4ab9-9d6b-f277a0e50300',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AryRxmRnGsFFvCJMboKcPI4; expires=Sun, 28-Nov-2021 07:22:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbNaUd_S5F39I7Pgf-dAStYXiBw8XqDMNYGR8yjcQljPy-5RmPWHXQ1jMuV8FJNRBjnvejLipYyLQYYiJwiuHe74qCou0h_z7KqQdPJEyKAVyrg5gLsMAtbqw_23p0zFyzhu2r62bXUeulpGZqTNP2G0k9n85VJ2-Cez8VRuI8QwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=26b2895a-fc63-4b8a-94f5-aabd71e5887c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '98c8613f-8584-4512-b169-811c9af10300',
  'x-ms-ests-server',
  '2.1.12171.15 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhhkeItBdAFHvuRf0IDgiw4WPr5BAQAAAEKYDdkOAAAA; expires=Sun, 28-Nov-2021 07:22:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 07:22:42 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx', {"tags":{"mytag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef1478b6c995de4b3577953adeb69fe795dad5767b38f1e7d74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7f6a1347717d73fddb479d3ee7d34fa6895d5d9226ff39a7bcd97d9a4cc9f51bfd96275026cce8b69869ef06d7bbdca0983275555d29b9759b9a63fcfb3b2c97fc9485f7d51bd5c4fca627ab6baf18565d67e9eb5f95576fd225bd0e7b6f9ebb62e9617ee05b4dcbe90a61fd18bab3a27acf3d3e5b4be662a78efc6bb5a294eb7eae86a5b9a6f172bf456e7a560d8acb2698e5f3641984db87d4624beba9f5f4ef3ea6a4fa0fca27551e767cbf33a6bda7a3d6dd7ef350233836fb20b9e286dfce5e4a7f369eb9affe28fb2d58a70d729fb6896b5d9a42ea66f1b6ae3fed8ce9797455d2d17f9b2a556844ffed12fa15e9ab6aa89eb8ea7d36abd6c6f1eabb6ef8d563f5738afdfae6f02f5bacd96b3ac9efdfe9fbf7a0d0097cbbc3d9ecd68d4cdcb3a3f2fde6d7a797767bc7bef210f8064e8b26868ecd48260b6f8faf57a3acdf3593ea357b2753bafeae2074c1f22e4f72076c5725aacb292a5eb61f6603f3bfff47c7bb67bffdef6febdfd83ed870707d976bef7e983bd877b3b933c7f4870eaaacc9f125ecb0280f8cd83fc1ebd78ffc17676707ebebdbf7f6fba9d3db83fddde3bcf0fa6fb93e9e4d37bf73ffa25df1f7d34ad73426cf6e41a63aa0abc7bfee0d3f383bd4fef6f7f9a3dc8b7f7b3bd7312e2d9c1f6fd9dbd49fee9f9cefeec7c9f7af5e696bb3ccff61f64bbf776b6cf33ea687f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01a8b95ed1d4ff507bbcaaeab72c2ffcd6eebdfb9f1e3c7c7870fffedec3fdfd9d4f09b06df0555d528b6c36d9eeb61a7f3ace7e405242b82bdb8e892be85d25e053fae74d01befa686f676f777b77677befe19b9d078ff6761eedd1db0f771fecdfdffd29a0c343bedbacbf29c57997f96c464af3ee17c5b4ae9aeabc1d133e8ae75d3b3abc62ff78f78e905f668c71f763e5ed1ba051c3e6ed1ab3a86088c7596e30c8b29289a28faf08c7355ab7aa2e16d7f4db2e7dc332b3fbd12ff925","ff0f4e276eab70060000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  'westus:c5c9442a-ef66-44c6-bfac-3a9fede75020',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  '959ab665-72e5-4a03-9e04-cbb2a2f53b71',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211029T072256Z:959ab665-72e5-4a03-9e04-cbb2a2f53b71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 29 Oct 2021 07:22:55 GMT'
]);
