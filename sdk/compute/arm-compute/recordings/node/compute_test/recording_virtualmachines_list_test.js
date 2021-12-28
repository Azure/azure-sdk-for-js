let nock = require('nock');

module.exports.hash = "1bd53c422a517e7443264fd8c8ab8f20";

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
  '7f6f33c0-2e74-490e-8f6c-dc6525c84300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnZUbpfdkvtNpVmJeo0fdJo; expires=Thu, 30-Dec-2021 06:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCjEGAionITFma76V0YSs9Y_5xQ_sP3sd9BmZGxzUrC2GkJ2jYGep7iC4s8cRLkmQV_vWI5_C_aHvfY2DRnRE_duKobbRKPbs1RBg3bOtaG5fU2gfjQ8fYs-D6Byr9dCJdO6gZLPDry0nuoeyQTwsqZHtPtoA5nmPCkYJVbHrBGkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:48 GMT',
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
  '2aa0e74a-1391-4187-b36e-afa958b64000',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuG940WhMrdGp4pqJ6ZpwBM; expires=Thu, 30-Dec-2021 06:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9_fvjmxUaXy0WG3rZgwwNFQDAu8QkG_szND5sbJexKBWT2dRH0brPAFMam26EW6n8NeksDBGOPADirUnJvlBWRvG1DNUaQ8CIwkgqG9gO3ym-SFLqO0IEJ4GVie-Uzq4qsUQPFJI9rEjqW47s7tXqCOYOgaGkTmdDt9VQr95ZCQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c85beb77-321a-47f5-ac2b-0ad6ce0d20e7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '072cda1b-922b-40cc-b9fc-db3c66f24200',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnR3PdR03s5FuAkGL8wzkCgWPr5BAQAAAOe-N9kOAAAA; expires=Thu, 30-Dec-2021 06:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:48 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a365b6c0e71f5d1675bbceca45369d17cbfcdd4723dba298e1fbbbcd7ad24ceb62d516d5b2b9fb70effce1fdd9c1f9f6bde9a70fb6f777f7f6b71fee4e1f6c1f4ccf771e4c6793f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd34d9b37eddd555d5d16b3bc6eee7e514cebaaa9cedbf149b558addbfcaee2f185e0d198bf2378b5d72bc6fc4618de3b6535cd3000bc97674dbbf6bf6cb38b86beb0b4a18fb21f34f974954ddfd2e71f2dab25613e736f50835599b5e755bd68f2b62d9617cd785e35edef9f2f09856ab9c897edb8c9ebcb629a8f4dcbdfbf5ab5f9ac58fefef4c7ef5f57553bcdeb16fd7ed4d6344506f62fb1bd7c449daea84d412309b1bb5c9cf1dccc66d9bdd9defdd9f6fe01fec9761f6c4ff6b2d9f6c39d9d493edb393ff834fb34c07a9ed5b3abacce5fd6d57951828a1e58fafe72f1baf8013efee8759b2d67d4faf77fbaf7fb5fee59ec7cfca87dd35675763108ae58d097aff2f3bcce97d3ded7d460b59e944533cf6bfacecde7778be5acba6a5e1301e91baf3f3c1f55e7040fed37376bdeaed1686f67f7d3eda7599b4d694e22cde8d546f982e68998b4d7227f974ddb9f74cd76f7ef3dbc37de7fb8737fbcb74bcfbd9ddd9d7b1e8142121180aa795a3460a4eee8abe68db2b20ea5d7b711d2c5f54f7e51353380e93699d639e1fd258b279a3eababc519e8de6fc962718146aff26cf6ddba68fb8d16d992de9dc531a6ef75c68fa7d36abd6c0dfe965b9ebf7add05492ffd703509c884a69664213ee1ec1076b3bccc7d0a3ecd895be6dd617c0450908ecf9f50a3ddbd07fed721cc8f66c46fa020e45615af79fa142dd7e875278080c74e3ea9146835a3097f7f20b2f7fb3f9c66939d59beb3339dcdf67767f941b69b1fecdebb777ebe3bbb9f7dfaa08b3f01ecb2cae962d55ec7da714fcc282faa658f47a8c50d5c422dbe0e9fd06b3f179cf235e9dbc53ee4013cb7e42c34a42e1d6fedecddeb3769ab27b9bc9f8346e759d9e461a32e02bd695156dbedb4a32f36b1dabddfffc1cefdddfbd9e43e11e1defe6c27cf260fa77bf7ef9d7ffae9deee83f3596062e4f911abdd9ed56e41df2ef6dd99a6d1fc9059cdfff3fbee0f1f31326f437ec1548852bf50b683ae0e51fd289b2d8ae557e44319d60485d7f477a7dd9558ce936a795e5cac6be3e405fd51339e1a58f09ffce2f8823c016a02af2b8045cdf2653629f3e3755b2d08d2f4ab156972f6be628d57593b9dbf56ff8fda74fa342dbea8663c000bf5c9f597118efc286b9abc69e03a9a37d88c3fcdcfb375d976782098009fea04883cd73a67cff27bdf0fbfc9cab2ba3a7dd7e64b90e24b722e091f627b6ada1be04775fe8bd6459d7fbe26c2d3440af95e1717cbacd4f6aeb98fc147cbbcbdaaeab7f48e997cf3d1195cb07372c5a8c7effd6296c09f75017c215ddfeda170b730bf52700106217288affd8be92f725debeb8f1e6198bfe4977c3f181f351562d0bc939621278ae6eaf57a3acdf319098c69a953c43f48447e","c9ff03923899d2900d0000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/HighCostGet3Min;139,Microsoft.Compute/HighCostGet30Min;699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6749d09b-56b2-4579-9264-495a698d5e5d',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11796',
  'x-ms-correlation-request-id',
  '3ef49e71-b57c-426d-b29e-febda0341cc3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T064249Z:3ef49e71-b57c-426d-b29e-febda0341cc3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 06:42:48 GMT'
]);
