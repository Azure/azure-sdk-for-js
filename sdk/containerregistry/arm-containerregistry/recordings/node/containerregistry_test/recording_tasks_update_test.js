let nock = require('nock');

module.exports.hash = "3350695b960808ced00c9618c68ef9a1";

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
  'f3edfea5-2534-40e9-bc13-f4ee74294000',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Agm2dFzOy_JJrsEk37KueSQ; expires=Thu, 27-Jan-2022 03:04:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrT8_5Wne5rTCRzqp4mZjH27g4jKIZqe2ucRvYLJhGuirBg1Q8djmBFuLKg-bg-102JxtyOec8bgSqO_eeCrOWBpOV9USYFlVUKiIgZaCOCa6JD2EFeJkGVln55xAJGeFGWGH94_OT-_H2TCqeKO6X97Eb6dn-xQDft6OQDt0mq6ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:38 GMT',
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
  'a48eb6cf-a8fd-4b93-a329-7ac969734100',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgbDVRjNvxBAh1mScRyo1Ao; expires=Thu, 27-Jan-2022 03:04:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7sEy2U-agpeuLRS_2FX5cFoHMSnyQG5uNFDTbmIGfeAdLVNa4RCnAhe3FIKv8J2XQ8lsj9YQ0I7Dxdeor7E0VMb-eDaBL-DrhZtKhW8QPn8vc7LSjsUJSz4uWZfUCP5rBjl6BbxELmhzBfYxviDMsmQcDmoODCkhMeXmo-5Y1UcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=96b1055c-82bf-4e5b-915c-09ca055026b0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8efa0660-ddf1-4551-9d50-4957ff1a4000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=An9BjGe8jstHjKZC_hAzMBjLj78gAQAAAMZ1XNkOAAAA; expires=Thu, 27-Jan-2022 03:04:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:39 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/tasks/mytaskxxx', {"tags":{"testkey":"value"},"properties":{"status":"Enabled","platform":{"os":"Linux","architecture":"amd64"},"agentConfiguration":{"cpu":2},"step":{"type":"Docker","contextPath":"https://github.com/SteveLasker/node-helloworld","imageNames":["testtask:v1"],"isPushEnabled":true,"noCache":false,"dockerFilePath":"DockerFile"},"trigger":{"baseImageTrigger":{"baseImageTriggerType":"Runtime","updateTriggerPayloadType":"Default","status":"Enabled","name":"myBaseImageTrigger"}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147edf52affe8d1475f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147973b7cd9ab7cd47a38f5675b5caeb963efae8d12fc65f97455354cb6279f1bacd5a007cbd9e4ef37c96cfa8f5b4ceb396be7e2a5fededeced6eefee6def1dbcd9b9f76867ffd1bdfdf1a7079feedf7bb8fbc9cecea39d1d7aa521306b02fed1e9329b940c655566ed79552fd06385af9e17cbf53bfa22aba7f3a2cda7edba06f86c31fb74ffa35f429f5fe4cb9686735e5cac6b4600af4e57eb8f1eedd1d76db1c8ab75fbd1a37b9feeeca0c77c85ef95204fabe9dbbc26e8c582e0bcc81618eaf73e6af3a605111e5dee7ef47dfab279b96ee606c7476dbdce471f2dab936c3a2720e759d9d0df3306f5ac28f397593bb7b0f101c19f12bdf377ad7e356fdb55f3e8eedd8ba29daf27e369b5b8fbbacd2ff3e7d4675edf5d56b37c7b9e97657555d5e50ca3a489b9b8204c09f549d6e46740f7cdf0676f6478afd64b8c9ffa5faf66342dfaedcbecbaacb299367a9a9f67ebb2a54691e9581249e883c5f5934e0f1ffd925f426815448e8fee36eb4933ad8b1588dfdc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fe699a99a6bdcb4c36cbebe6ee2d797571ad7f5cbf7bf7eefa5a78973ec54ffac41f82fba8cd2e6898c405d4e5dbfc9abebdccca750e4297d55499e8a33c6b400ea2cb3521b720becef012f3793e7b82d7f29d8c06748f46f8e9ee747b7f46fc7e70fee9749b46fee0fececeeef4fe342300f61525f9f16a5516da8ffdf69898342235f7c607bb3bbb07bbfb566a4ac2eb8b6a569c1700492fdd128bf0bd282a7e93383efb3be3ddbdfb7bf7ee7daaf8fc925f","f2ff00a08b06275f040000"], [
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
  'x-ms-correlation-request-id',
  '073eb047-f6db-4b71-98c4-166ce333814c',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-request-id',
  'bbb76108-37a3-477e-8a6a-194d01c66bdc',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx/1.15.10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211228T030441Z:073eb047-f6db-4b71-98c4-166ce333814c',
  'Date',
  'Tue, 28 Dec 2021 03:04:40 GMT'
]);
