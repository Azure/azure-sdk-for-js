let nock = require('nock');

module.exports.hash = "450fc2d61e37bedba66c3e788c4ccf75";

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
  '9e24a756-81a8-4a6a-a680-5b5e5ea81a00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlZ-GvrOt2NAhewXde2Qnec; expires=Thu, 30-Jun-2022 03:48:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDg07sTmjmfIce2NX6Rth4H3YvteK3JCvGgYq87rMioqsrFcUy7xID2G9hZaEVtpkmQNCmuo5Dwb1A8T8S55ytdBObcYkH_nQmacQ-FqiBO_ajLUR7TO8HZWxXq-84EtSCDrfSOgBnXj-NvdDO6amoAKHVGUlEnOsUtd4IJHOnRsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:55 GMT',
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
  '8347f94c-67d6-49fe-87f8-43ac42870d00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiDwlSWHARxMo6SvTnrk_2U; expires=Thu, 30-Jun-2022 03:48:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLLcJQOWZz1wlmkSB39JXnjHjsD3LRjHpJG19coa8KgVQCaBBZINvkTEBxUo_OrJWxw9jRN5_39xDxZc-VqeSGrZpak_PDmkevevOefNfpOO7R2OGiC19y69wmKl2Ah4y5JCCPakgklt4tg_Nbz6faOCeKhKrC1uqOLVENNrqHyUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1c29639c-b393-4640-ad5d-b7fa353f2097&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6d7b0126-0475-4e07-bd58-4539c0061b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlsY_oFlXj9Hk6ViMn1PeOgX6p3SAQAAACeHJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:55 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6bd9d07e36c5574bab8a2e15557dcd5a3fdfbfb77bfc6ac00169000a5a3d8092de95bfca451822475beaae8cfaabe7e4d1f82148478d0a2ba5ae6f5478f96ebb21c7db46eb28bfcb592f145552fb2929ae4cb6c52e6343d6dbdce471f65b345b13c0d3fd326dfbe35bd47fed7cd7411694253823f5e06f3bec8db6c96b599c198e86ebffd9e650b9aa1f5bb67ef7e927895084c9d5d66e51a5f7cf44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e10030325bc34fa68dad4f4fbf708e294ba329f62705f543302207f1b667ddd940c981aba1179d4ea538a60e93bd4f269d1f05cd0a7c5ea49d6e43302f82a6fd6656b7aba2cea769d95672fcd07ed7cbd98acea62699bb4d5572ba233010cff3eb320cd37ae1383c18baa3da996e7c505e1093430b03722fcd46439cbea993f0fded0e28cf0ff9de1bdb2e2f611f8675a2d56eb70929bbcbecceb6759bde87f7246e2f4c351d8dce5397589c6c4e5f8a098e6ab325bd234d09808227d44c37b749e950d0978d1fcdef99264c4fc3da701d73f69ff2cb3a6a56112e3e7b337c522ffaa9dd258f676f6f6b677ee6fdfdb7db373efd1fec1a3fb07e3839d7b78a88f86e844eae6553ead089beba7f979469368a8ec94f8b45ab6f9b23dde2478f57ad952b71bdb5c122fbdaa683e8ecbd2aa2fc59f262d974985925912bbe4f597e7dfadeab744bd8f1eed8e3e9a097a4fabe97a41d8d087327d04f4594d8c7c456d8d22d1af56f355f793eb765e2d3b1f2e893d3a1fadaaabbc7e3dcfcbb2f345192a36526864b7ba7a4cdbd6f92f5a1317bca9b32911d28ed87cb9a8dafc693e595f5cdcf86d07300cdff38abfe9bcc7b2fb45b58408508b139a818baa66e5ac0da6f5574dfe45b6a4899f9dcd88903453272447d442a7429ad49d36674f0d88b2ba689e16753ea53ec8aafd207f5e2c0a2bd833b20f0561745ad78c4204c9d57a5216cd9cbe403fa284badfbccc9a8666d4be4332125a02b25fd413a90c6b89884d978414d1e9754baac66b984d0964fe7be5d7e6933929c112435cadfc8633e5ad575565c7431a51748bfcb96ef27b7b4f8a5638934c23f903f67d529aafabe9dbbc6d3a23cecaabecbaf992265069fcd364c53a938a8f4802887a9e3f107cd87981903fa9160b1a0a595b8b20fd8d697b59ac72e255e205a7fa542d1faf5625cc2381729817cbe3753b3f8667a1721b7cf186fc8ba5510df2cd744dfa6341c05e565569b8a40f20da2c02ce2890a7e089e8875d9628ab6cf624238d09e9321f92020693bc5a978ee7f377a42a098ca7344ab0acfd2b5bb7d5b7f3cc29a5f0e300582bd2fca59807f329541b5c07ffef9eaa735fbdac8b4b1afbcbaa6e9b938a0669be640198bec85b1ae8dbe3a9cf5cd30a8a507e5fad9bb9f99d7c5dd2dc05893c21e47d28f28b511303b15ed5af6854afafb2d5ebb20a5086cf5f7e71fdfa177511568e7a4df6884c949942d84af9fe9df434dce06d7efd9350ddaff2f3bcce97ae896950906c4fd7357d427e04c92e0b310d96bcaf62753c9b9131a4bf3e3a5e5e93b6cdf85bfc5996d5157d407e05a93840232b21da44be4bb3126667965b73ee7f9366425ef80924e467ffafc58178ff0b927f432c28ffbd1d3b47e2fe93d4bd299b8e82900f4f8ad59c6cd99a0cacf9a259af56c47ae429045fd3f8f4fbe9e20b7eb703f0bc5d3581d0aeeafcbbe4c4e4b3b325c57e34b301339faf973c0212fed7c45bc64eecd01848aadaf9c93c9fbe7d99b59695cfc9709c906ebec88fd7b3a2b563d46f155c439e09b402c3545b4712d9694dba183e057ca19faa961663a249b1582f4ee12f15d30eda84191bd0d70491389ae40f9f5bb208e549e7bfbb7e566656a0d00d24d9fc4d9aad2055bb6e084117a6c977a40b01d959140a6866e4f655d7105488cc47ce1b27be693a424adae79c621b91b8da8bf6e4ebe6ed9a20d014898f4f1f4c17883b8fcba6a241ad56c0444d509bd517796b348181005f9a894923a896406af81ba20466cc349896057d784cf8d1945cdb810b83ca9788cdec178a87fb466c15f9f0bf684dee05d077df9dbe9b966bf022f8c58e173831016c5062a0ceaa05c90cf12f79c462eb44e9907fecd4a8d8a6a791a684c6fdfbcff64ef7f7efdd3ffef4c1fec1b39d937bc7fb9f7efae9fd9dfb4fee7dfa606f7fffd3e387f4dfe9b3a74f4ff6769e3d3c387d767abaffe4fed3939307073b0f4e09fd20a7522c27c44db3334f99eced8c77771f8ee95ffa9e0297a6a0319c75da6176c3962486a413d471f2f8e5f7fd7d7f37f787b46b0c8b5043fc19cd96d0179da08fac3e3c5a047f9cd4b87b757555c329a274c5ba8de377707fbc777f7fbcfbe9a723f7d7deee8effd7debeffd7bda0e5fd7bf6affbe307f8dd8dd8d0e6cb1f5ee7fafbaeffc79edfeade43ef8ffbf7fd3f1c68fac36ff6e9aeff87dfec81ffcd833dfb078dffa1fb6a77bc7b7060ffba37de0d90b8e790d8a1e1fa40f602d489b0f62ffaee9efb6e975afa7fb86ff6c67b3b8e808496fb6a77bcefbea13f180dea43278ffc72f15f112bb0929d518470fd058538f535f4f34fac2b78f1f445b36e56f9724686a920b3a9520a0634f2fd2acf1ad8236a6bccc1e93bb299f8e52b523bcd09f9fad489bcb9c8debde84692f2cdbc22fbd1668b15b14f4f2080734976657971b63cafdc2b5dfd073521dfb5990b22882d5d2e80c09b640041d510d6934927af1d0924c9a317a0fe594393d15ddb1e6087289828c9db506d47da724d2a7f39bd561dfa02260f3a8774f40561d47c492eb0d56d02e622af88ace4664c987c163cf932704e4f97b35545191bf21e35ac722d86bdd4c9ba2867a44ba1aacd6762699e44be5914178215064878cba714b85c40da297af403d88fe047888f49bfd197cd887e9a4fe030743e23cc9b8ac1f89f7efbcd9b979d8fce5e92df1583f0b2ccda734a5ff0c730e7f885e84a6603669c864eda88fc5a3558663a8843106829815eaf27349b8eee1bdce18f5e5f13af2c8e49db5d2c09e02ff925","ff0f2029c27546180000"], [
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
  'ETag',
  '"1D874A14DFCCF00"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'eaebfcd7-a851-4476-bfa1-2cb4cee1ea47',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '498',
  'x-ms-correlation-request-id',
  '0bfded76-bbab-4fee-941a-a9a4f24ae991',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034903Z:0bfded76-bbab-4fee-941a-a9a4f24ae991',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:49:02 GMT'
]);
