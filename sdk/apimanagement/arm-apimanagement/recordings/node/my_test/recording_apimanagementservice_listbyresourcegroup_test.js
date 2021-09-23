let nock = require('nock');

module.exports.hash = "4a28eb0edf6e4232ea4411a67ce75816";

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
  '353b6130-4d9f-4d55-92f1-42fb3bac0e00',
  'x-ms-ests-server',
  '2.1.12071.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ahhiy8PAE7xAu7jj-TusjQg; expires=Sat, 23-Oct-2021 04:32:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2nejjU75qZiRX4yYPutpjocQ6NonK1j_AxWcSuDzTibrLj-Nnwy2eIVFr3uYq_IHrfW2lNpWyORhH0gc56bP9GsCzSlpwc2auDtgnOSA4IZ8O2lThhnmoCiuca7CcOkrHbdHUFgcwhnz2jSwHw_2HNs8PDiuVPrvAw3RoqA_TEcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:45 GMT',
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
  '353b6130-4d9f-4d55-92f1-42fb3cac0e00',
  'x-ms-ests-server',
  '2.1.12071.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ai6h0QZ1jwZHi3e2-jtr5Is; expires=Sat, 23-Oct-2021 04:32:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrODTKQJ38gfebXd7B6_zeUcGSgIdxywN4E5OBNKE8FeAVPOOvWYC4xVIZRB8nncn6T8G65QqH8zjluC0DeS0kmiMzVD03iTx-8xfpHDsPQhrZW3-LNdHQ_UPtQcuurzNTmIqkeouQC0H9SwU1gCtr4j9tiehpAZMxLj293oJw7fQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1141d04d-4ab1-4879-b4f8-0783b6416cee&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '4c755469-8605-4079-a514-d61c6f360f00',
  'x-ms-ests-server',
  '2.1.12071.10 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ahj3fH2Xm3hPlFfy20iMRN4WPr5BAQAAAG363dgOAAAA; expires=Sat, 23-Oct-2021 04:32:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 23 Sep 2021 04:32:46 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a457f7bf7eeddde47a38f96d98270faa8fb717bbdc2c7374043c3eca2f9e8d12ffe25a38fca6a9a6128f4da69d6b4e957afe9eb9cbea70f8ef979f2e4f3575f7c469f12baabbc6e8b1caf7eb45a4fcaa299e7f5e9222b4a6a7d5e55bfe7b45ab6d4f3785a2df08269f242d0a516f4e9b26a8bf3427a7d9d2f69fc0642b62a16178b767b59d5f9aabcfe3df1f1f8aa58ceaaab26fbc1bace0d5cd0ada1d78be5c5eb366b01fbf57a3acdf3593ea3efdbacbec8db979156f4e5b4cee9f7d971fb553ba54ff676f676b7771e6eefdd7bb373efd1fefea3fbfbe387070f0e76ee3df8296a7d416dafb2ebaf6ae0376fdb55f3e86e381b63c66c9b701f2ff3d6bdf22abfa0beb372c3abdb39517cdd6cefec8e6b6ddd83b6aaea762390b1b4e8bd38cb2ff31213f692bfdf04c136ed015958e6214eda04c235ecc168a68b4d6fd2d7bd57e655d382c54faae57971b1ae995788eb480895c56972df5d6b4be5ae106c1764be9c56c41d276060e63e7a65b92ecbd1476ff3eb9fccd6657b46e22d9f4c5da39759d35c55b5fd6a995f10fbd217276541830dc09d676593076f9bb766f9397a78dd944f889b891f3f7ad4d66b6a4bd2bf6c8bf65aa0453178cdaa83c6f7645d10924b1a8bff2d31f69a2883d77ec9f7895d2072d3b397c7b319699d06a2fabd8ff677c60f3e1def3eb837debd77ff23b4aa8b4b7a39680608a38fb2d9ac00b1b3f2b92a06fbd56551b7ebac7c91b74490b7c1d49826d375d3560b9a1be225a3279c32fa2e8d9d24f91833136aa6f1e7840dc9ccf8753e5dd7448f31c168ab695536e33765b3bb43c37f06ead2e0bf0978bbdf203c9ad47b1f8edf49b1223d49d8916529f3a779b3fbe9c107037d924ddf9282f590c5e03f1cd938dc0f276a1fee0711d703438a81b4dbb74901ed596864fc42967e23aae545b544579e90111f0b7fcf8a269b94b97660259eb4cc4fd2e491209054346d9d15cb16acbf289684997e2530a85315d195ca9e137a95cad3e56c55110482b5cca7102fed9fde6ddeae0118ba913025e15fce32524e846db6caa644c38f1eed5233a356e4bdd1473fa0215920ffaf716476096f1d49f763d5f2374043c3f773645e1efc7c7164761eed7f3afef4deeec3879fdece91d9ed994c7de5664766f79b7064763fd891d9fd704766f76b3b32bb3f3b8e4c7f567e3e3b32f7f7c67b7bfbe3837be3fb0f7ee4c77c1326d7c1a339fdfaa6d6c2fb911f1385fb41c4f5c0905e20e5f6233f86807cff","97fc3f5d7510f89c110000"], [
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
  '1baa889c-6e01-4490-9922-bb85880655e9',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4907',
  'x-ms-correlation-request-id',
  'f69bbe11-30dc-46be-ae1e-e53b5680a164',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210923T043247Z:f69bbe11-30dc-46be-ae1e-e53b5680a164',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 23 Sep 2021 04:32:46 GMT'
]);
