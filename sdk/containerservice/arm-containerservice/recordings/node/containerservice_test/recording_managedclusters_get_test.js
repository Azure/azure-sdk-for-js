let nock = require('nock');

module.exports.hash = "7b438c529ee288da48a192b3e47abd89";

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
  '35c844ca-d564-432c-ba13-b3e95aaf0000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkWCNS9y_hBCvFRLPTSilwQ; expires=Sat, 08-Jan-2022 02:14:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjfXsIo2yuGRXGDl4w1kxnDfWWtuSL7RNRnt2jop4Wu6ArPSMPS386AJqk-15BbJKdGfyVlNdQsu1pvMEY9nugMRIIZ2KrOYN1fczc_sGoy3m_IDwJ1HIVS91GJoJUefXFokMa4Bx17mS42U3E9iDB74lfALuRNGZ4z8DdPAvINwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:43 GMT',
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
  '35c844ca-d564-432c-ba13-b3e95daf0000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsXAh4S0QLNGlM2y90ds-Uc; expires=Sat, 08-Jan-2022 02:14:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBO-R3_GKDf35_bgU1OG9MrqKndWLcuXZoWchE0pZQ2YtMsv7Aag2AeYkrzh1HjiUyOGWb7r-U4QnC_hro61jp-ImqgwdfAESb7IZqRGhtQ4d2VDwvZB1YsXONwuZO7xjtfeY6EtNB3oZ9tK1oDVSGnDPTjTnfQKzjaDaoOGOG0EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=55c0206a-b9ab-417f-ac34-233f109dcefe&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'dcd37a9a-d598-498a-ac0d-3772ec490000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai3W0cnP24dNobRR7tssoAAWPr5BAQAAAJJdQ9kOAAAA; expires=Sat, 08-Jan-2022 02:14:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 02:14:43 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerService/managedClusters/myreourcexyz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f15b38f1ea51fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936ad966c532af5fe7f56531cdef2eb2657691cf4eca35bd444d17d775ced0de5dffe0a311102bab69066c805e9e35edba91cf97d922c767fd37daeb157fb3a1db2fc26ee53d427895d76d9137f43688c21f5d160df55e2c2f5eb759cb705fafa7d33c9fe5337e8d1a55570459bfe5f7d28fa6d50c7f7df46abdc4bb1fe1d35f22cddfae2779bdcc89463f495d136cb4db1defed8c1f2ac0d9b27959e7e7c53b7c93bd6d7eba69666ff5bbf35f34e317ccc7db3bf7efe7938707e7e3f9743516028db31f2cde1e34e3a2d297b21facebfc6555b759f9ec279ebe88bfbfe2ef3782b9c897edcbaa2a5fd6d57951329dbe876f74d46e52083a379617e98b69b5a6bf1ea5bbe683cbc5ebe207dc9628b79c65f5ecf77ffa7aeff7bfdcb3af54cdd3a2798b569f3fa176bb7b07e1376fcc34cb5cdaf740df326ffd265fbeb6df2eb2772fab1930dfdddd311f1a8ef9c9a26ed759f945369d13b7bc9e6665fe3a6f853de8c1cb2766203bf6ed45b1b49f9acff2653629f3e3755b010a38e051dad6ebdc7c7f1bc642b33e6bd1a731e632ec455f57f5744e0258676d550fb018b55a2890d7d724020bfb71d518a23d2f96eb77dee7af7fafaff0f157131aeada7ebe2430670b9a00afa7e3dfebb5b4dade3dd8d9273ed89b1a019c6defedeced8e7777c73b9f5a1842ac67672f5fd3dbe759d9e4fcc52fc1bfdfe7461f3522b82feb62392d5699e1406a2f54f9685a16c46f67acc5ceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01134d48c66378a55aecf39ab418807c71f2fb1b5546bf381df3fb8b7008f28afaab27c727f48e9de08f48bcafaafa6d0f4bf379b9be2898546056fa50a041d965b32759992da734ed6fd76841b3cfe2116bd2854fb32ac2f0e5ba9d104bcece5e82d3f54b22127dc66c2a1fc8f0e9f3fcfc3c9fb6c5651ebe27b26da59b1a7eb89560fa9249d84cdda8f17821c4bbbb5a4fca627af6f2783623a84ddedccdee9f4fefdd7b48183cd89f6defefef9cd3847f7a6f7b6f7f6f379b65f9ee4e2e134e0f7315f115ff500a909ccd4e8a598dc1edee8cf7f6f7c73be39dbbbb86450dfb796df83faf05e96c352e672fbd26bb3bb641357d9bd74fea6276e1e03cd81bef3e40330f52a57360e4d09f70d346f1f526091d7a78f387223b01f69d37f8bf5efb62f52c5b1424507eebb39797fbda0cff0ae588dfde1d9380b355406ba3163fca54f5f599f4a3890c66bb29a893acde86f86d8bf7408d487a49019881e6ef56c4fe3470faa2a6df2aa3a9d0f376be58b5d7db9375f9767b069d8f4e68587e938b3a9be6e7eb729bec3c296a7625b69b7c8a969fee044d190f663c28b2edb6105bb67b3fe8b3adc84a6eaf97759ecdaeb7c96198d2f049e6d074ffbe69b9ccafb66992b61b90607bbd027ed935daeca8eaa0897edb0166c4f3a37ba689bc3eabae9602603b3ba7716c673396c3dd1d8bd94043fadd52c5f63bd0f63c2b4a7213d0f85e0c2e191b364e8e30d1eecd604cabbd78ab96f8eb07321bed9cc4785e953ca69db1a521355f6e174bc2ed322bf19d3f86b7c58a27acd9be2adaf936bcc472bb218ba753117051b775c3360f13c41c07bdcdac0dddc08c4d6f40f932c35aa7e649d6145301f9117989cc93cfea9c5fa5377f","c9ff03d11cb910480b0000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T021444Z:c928ec2e-a5a6-4de7-8fb2-48174f549c92',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11906',
  'x-ms-correlation-request-id',
  'c928ec2e-a5a6-4de7-8fb2-48174f549c92',
  'x-ms-request-id',
  'ab557ee5-f695-43f8-b757-5ba441c7272f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Thu, 09 Dec 2021 02:14:43 GMT'
]);
