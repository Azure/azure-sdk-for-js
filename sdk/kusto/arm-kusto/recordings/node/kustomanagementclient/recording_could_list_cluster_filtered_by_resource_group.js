let nock = require('nock');

module.exports.hash = "984b230badb3676309a9767faae21a3c";

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
  'fd19186e-7628-4427-a0dc-1df1d6301500',
  'x-ms-ests-server',
  '2.1.12381.20 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag_yHXNiTAxOjBMdxjcZ_o4; expires=Thu, 24-Feb-2022 05:30:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnNFsDLGdxn5SIgCzHivroJcBjDJoaWt841YL32XOPYazhqt0rMGKT-ZAfFkDw9hAUb4VGAIn7bgutNNNl2xDGMwFhbHcaSCCtRsBheMYCZTYXGOtzhy5TlH5bdGPK2mAAdX_g6xw5PpNYsz1RI2n0m4k0G_b5zNMo8jsPJac75sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:26 GMT',
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
  'e99836a8-afb1-46e0-a3d2-4cc525ec1400',
  'x-ms-ests-server',
  '2.1.12381.20 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtErUEE5R8ZAlUXDYrGf4js; expires=Thu, 24-Feb-2022 05:30:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrcn8DOojTNlSHbP7U5CPKDLXl4G73UztbkgRPHphORki3OFkyPtrfDG8OzMxX7Mjgwdfu-YzeUpseqpFxPKSfI_Ubp9NOgxe_uFRh32OOMVoMACoaGHNw5OGvSm1n0F9M3XdoYqMQbeNmTZdf_7u2NBHD60ERfRoXMpidxOb3MIogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5a270903-e9b0-439b-8071-44a96bbd9a07&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a89dcb42-9bcc-469a-98ee-28499e1c0e00',
  'x-ms-ests-server',
  '2.1.12381.20 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqCO29MOnfJKsTAuB9zJHZphwqemAQAAAPKBgdkOAAAA; expires=Thu, 24-Feb-2022 05:30:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:27 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/marytest/providers/Microsoft.Kusto/clusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6ee22abafdbbc69efaeeaeab298e57573f78b625a574d75de8e7faf75d356774f4afac15f5cebaf2fb245fe7b67f52f7ab59c7d34fa68497f113203dfb6d72bfe760028b5c8dbec825afcbe1fededeced6defec6eefdd7fb373efd1cedea37b7be3fb9f1edca3ff7eeaf7fd885a96d534c350a9f569d6b4e957afe9c3e6edfaa347bfd860f1bacd96b3ac9efdfecf0f9adfff728fbe6f8bbcf6bea04fa6d92a9b16edf5478ff67e097d9f5d3404807e2312acf29adae3ef8f9a366b01f1d57ab92c9617f41e7ff22acf1a60b05c97e5e8a3755d509379dbae9a4777ef2eaea7322c20f38e48502f67636adfae9bf15bfaa21a5f15cb5975d58c97794b0067599b9d2d2f88fc34a8af0250d4237dbcfdbe10db9a3ecc67a7eff895f24dbecc962d0de77bdf1f7d7459d4ed3a2b5fe4ed5555bf3da996e7c5c5ba5682ca702ae2a445f1837c76bc6eab669a954400f986004dcafc69d1bc3d5d4eeb6b6a87b7ceb3b2c9cd97afdb3acf1684b80cc97efb36bffec96c5db62f3df20ad0325b5eacb38b1ce82e1b8248df3826ff3e4d89407eb9ae2fe81379493e7a5aade9df282e17c5327f235cf793f78826d9749aaf8828c7eb59912fa7e81ee4204168eb62da7eb96e27d57a3953ba1c53eb869a7c446345476098ac2cabab7cf6ec17cd96cf0b8c0cefaf088162da7deb94b1f35e3a5bbda251e6ee3dc11f047edd56ab8f1ed19411dac47b97054840f4235665ce7bbd26a8f98ca011254836972d33ed2fa6c6c5725aacb2f20c5ae0d387b3d9793e39d89e663b24f6d9c3fbdb0fb34ff7b6efedececee3dfc34fff4dec387840f91987881df78408ae2e06072be7df0e9f92e298aec9c144536d9de9b919ad8d9dd9d4df61fe00d21e2eb6b62a9c571d314174be0f24b463f37ea67c12d3d79d8251cf19350897ea7f80f01a41603aae7fe2efd6fbcfb607f6fe7dedeff57544f97009bd4c46d14cffbc0231ea6763f523b3fafd4cede7436fb74efc1f6ce83fbf9f67ebe3fdb9e4c7767dbe7d9fdfb7b7bb303520239e14324265ee037fe7fa27630b9f849a844bf53fc8700528ba8dad987c7b37f6f7cefd37bf7f71edeeba99def524fe9e91adc4c5ffcbf59f5dc1b5fd10739a31a55175f43fddc0893f899beff910afaf9a5821e4c1eeeddbbb7bd37a57ff63fddb9b73df9f4fecef6fd6c7f6796dda3ff3f3c207c88c4c40bfcc6ff4f54d07dc2113f0995e8778aff10406a31a082ee3f78746f77bcb7776fffc14e3fe8faff8e0aba7f93baf81a2ae84698c4cff4fd8f54d0cf2715b4b793cd1eee7f3adbdedbcd1f921734cdb627f727d3edd9f4d3fbf71e7c3acd27f9a7840f91987881dff8ff890ac2a8f09350897ea7f80f01a416511574ffd1eeeea3bd9df1decefefec3dd9d1f8e0a8294ec523b667e448ef4f79ef97b0f0c4014b2e2f3cd68a84f6fd2265f4343dd0893d89dbeff9186faf9a4a1ee1fe4d3fd07f9743bdbbf4771dafd9c3443b647d2f6e07ce7d387d307e7e713b03c91987881dff8400df5fd5ff2ff00d93c0b54a9160000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-original-request-ids',
  'd5510887-b6e4-4db6-8ead-b3a534da7784',
  'x-ms-original-request-ids',
  '086fbd7a-b557-4310-986c-8bed072da8de',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '297',
  'x-ms-request-id',
  '6af9b866-ded0-4e86-8b85-cc1007424a8e',
  'x-ms-correlation-request-id',
  '6af9b866-ded0-4e86-8b85-cc1007424a8e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220125T053028Z:6af9b866-ded0-4e86-8b85-cc1007424a8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 25 Jan 2022 05:30:28 GMT',
  'Content-Length',
  '1291'
]);
