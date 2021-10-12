let nock = require('nock');

module.exports.hash = "8a047724350bbdbc46e921f4a1bb279e";

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
  '82610d5b-4d9e-4e8c-8c32-b0ad82eb2000',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aphh_HDE3TVLlAQh-8HyVlw; expires=Thu, 11-Nov-2021 02:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDkI9eT48Hkim5_5nuXbAJgrpu8-1JjKz9c4OPS0IYDBlg_ORREY7WyneCg2FZbHI7txealOui9my5Ztmej88O64xNTsDa3p9OEmx7iSwX9h3AtDiMPqB5wfpm0j8coSit8Ke7tEsaDNB_0-kVX88d1ARCX128kS59ZDnEqmrmi8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT',
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
  'ae46e822-90b4-4400-b2ee-cc98ec691f00',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Amjl3ebMbH9CmqXGNMclhCI; expires=Thu, 11-Nov-2021 02:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0eQYitRZUkZ-O1vYxZXNsrbEN1kn8EAg9NlIPgvFB6VIWClQar5eMDnzzPuc961NBgyCPrr0g8EVqdvLHPDllAaYZMkahjVMwT6FPMiKU59C1MNXOWrmoWJ-jD1OKyLYFX2af-ybaFUOIVtTcrVCYFl6DAhusOtXLiwf6Ip5M6wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d668c8b6-8ceb-4a4a-8da3-c7cd19d4af1e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'e2cc04a1-492d-474b-9ede-31cab28e3000',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArQOm6O1S_1BqzCPQAOGsJQWPr5BAQAAAJzs9tgOAAAA; expires=Thu, 11-Nov-2021 02:40:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 02:40:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/virtualmachinex', {"properties":{"networkProfile":{"networkInterfaces":[{"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Network/networkInterfaces/interfacex","properties":{"primary":true}}]}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8b2a8db75562eb2e9bc58e6ef3e1af1b7c50cdfdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faac56adde67715872f0487c6fcddc1a9bd5e31c637beafedcb6a9a0171bc93674dbb365fb4d945431f321de8cfec074d3e5d65d3b7f4d947cb6a4998cea4257db92ab3f6bcaa174ddeb6c5f2a219cfaba6fdfdf32575592d17f9b21d37797d594cf3b169f9fb57ab369f15cbdf9ffef8fdebaa6aa779dda2bf8fda7a9d7f04b8bf84a17f441dade8bb823076d85c2ece98f63be7d9bd6c4ad4bdf7e9a7bbdbfb9fce1e6e1fdc9b3dd89ee63bd9c307f7a7fbf7ce1d96f3ac9e5d6575feb2aece8b12545270f4dde5e275f1037cf4d1eb365bcea8e5efff74eff7bfdc634c0c2ed4ae69ab3abb88822816f4c5abfc3caff3e534f88abe5cad2765d1ccf39a3e7773f3dd6239abae9ad7441cfa46fbc0f351754e70d076b849f3768d067b3bbb9f6e3fcdda6c4a74ee34a1571a9d5ba23b3158f06dfe2e9bb63fe99aeceedf7b786fbcffe9fdddf1deeecec3dd7b3bbb3bf794008e04f462d53c2d1a30823fc2aa79a3aca728077d19415a5cffe4175533c3ebfed7d33a27fcbe641142b36775b538033dc356ccba1768f02acf66dfad8b366cb0c896f4ceac8f1d7da733773c9d56eb656b70b5b3fdfcd56b1f14bdf0c3956e90044d2d791c2e8ef28415be03ab7efe84b0dbdd7b60be728d3e9a113380041098ef994fd30e39ca3508bd63dfc2636789e416aac2a896df1f9deefdfebb9fdebfbfb3bf3f7df070f7607f3299660f760eb23c3bdfddd99ddebb7f70af43bfee9c9e2e56ed75b70df7c033faa25a069349df6e984efaf67d27945ef9b998d2af494b1f7337b7783a2cb0b3772ffcbaad9ee44f73d207f31cc33dcfca26770d7c580145952376bdefe9c34d1c71eff77f38d9dddb7bb03f7d387978b09fcfa60707f9c1eea793d9eebdecfefd7c6255af3c3fe208502dce11b7a0a58fb93f8b340a40f8fa1c617efdbefc626093468f99b9a98ca57ea19c0195e5c8fa51365b14cbafc8dc1bce0151d6f4b7d7e64a0cc449b53c2f2ed6b5f13f6c1fd484a908c3f4935f1c5f9061a3afe1185818d4245f6693323f5eb7d582204cbf5a91de6327a1db7095b5d3f96b754de87baf1ff3ed17d58c91b5d09e5c7fd961968fb2a6c99b06de8c69cd16ea697e9eadcbd69b1e4b5043497a999ca73a6707e77bdf779f6665595d9dbe6bf32586fa25f939d4377120350b06f1519dffa27551e79faf89983429429ad7c5c5322bb5ad34353d7eb4ccdbabaa7e4b6dcd049a8fcee0259c93b740bd7cef17b300fcacf3ff0be9fa6e0f85bb85f995fc574c3a91405cbd5f4c7f9147555f7ff408c3fb25bfe4fb766cd44c0840f349c24d3e00cd054f3f7dc0f34033f04b","fe1f7b7f5806c10b0000"], [
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
  'Microsoft.Compute/PutVM3Min;236,Microsoft.Compute/PutVM30Min;1196',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '6fcd71c0-b7e9-499a-845e-8ecab9b7f535',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1196',
  'x-ms-correlation-request-id',
  '8ea6cd97-0030-4850-aa78-24b7d3a341c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211012T024032Z:8ea6cd97-0030-4850-aa78-24b7d3a341c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Oct 2021 02:40:32 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/virtualmachinex')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8b2a8db75562eb2e9bc58e6ef3e1af1b7c50cdfdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faac56adde67715872f0487c6fcddc1a9bd5e31c637beafedcb6a9a0171bc93674dbb365fb4d945431f321de8cfec074d3e5d65d3b7f4d947cb6a4998cea4257db92ab3f6bcaa174ddeb6c5f2a219cfaba6fdfdf32575592d17f9b21d37797d594cf3b169f9fb57ab369f15cbdf9ffef8fdebaa6aa779dda2bf8fda7a9d7f04b8bf84a17f441dade8bb823076d85c2ece98f63be7d9bd6c4ad4bdf7e9a7bbdbfb9fce1e6e1fdc9b3dd89ee63bd9c307f7a7fbf7ce1d96f3ac9e5d6575feb2aece8b12545270f4dde5e275f1037cf4d1eb365bcea8e5efff74eff7bfdc634c0c2ed4ae69ab3abb88822816f4c5abfc3caff3e534f88abe5cad2765d1ccf39a3e7773f3dd6239abae9ad7441cfa46fbc0f351754e70d076b849f3768d067b3bbb9f6e3fcdda6c4a74ee34a1571a9d5ba23b3158f06dfe2e9bb63fe99aeceedf7b786fbcffe9fdddf1deeecec3dd7b3bbb3bf794008e04f462d53c2d1a30823fc2aa79a3aca728077d19415a5cffe4175533c3ebfed7d33a27fcbe641142b36775b538033dc356ccba1768f02acf66dfad8b366cb0c896f4ceac8f1d7da733773c9d56eb656b70b5b3fdfcd56b1f14bdf0c3956e90044d2d791c2e8ef28415be03ab7efe84b0dbdd7b60be728d3e9a113380041098ef994fd30e39ca3508bd63dfc2636789e416aac2a896df1f9deefdfebb9fdebfbfb3bf3f7df070f7607f3299660f760eb23c3bdfddd99ddebb7f70af43bfee9c9e2e56ed75b70df7c033faa25a069349df6e984efaf67d27945ef9b998d2af494b1f7337b7783a2cb0b3772ffcbaad9ee44f73d207f31cc33dcfca26770d7c580145952376bdefe9c34d1c71eff77f38d9dddb7bb03f7d387978b09fcfa60707f9c1eea793d9eebdecfefd7c6255af3c3fe208502dce11b7a0a58fb93f8b340a40f8fa1c617efdbefc626093468f99b9a98ca57ea19c0195e5c8fa51365b14cbafc8dc1bce0151d6f4b7d7e64a0cc449b53c2f2ed6b5f13f6c1fd484a908c3f4935f1c5f9061a3afe1185818d4245f6693323f5eb7d582204cbf5a91de6327a1db7095b5d3f96b754de87baf1ff3ed17d58c91b5d09e5c7fd961968fb2a6c99b06de8c69cd16ea697e9eadcbd69b1e4b5043497a999ca73a6707e77bdf779f6665595d9dbe6bf32586fa25f939d4377120350b06f1519dffa27551e79faf89983429429ad7c5c5322bb5ad34353d7eb4ccdbabaa7e4b6dcd049a8fcee0259c93b740bd7cef17b300fcacf3ff0be9fa6e0f85bb85f995fc574c3a91405cbd5f4c7f9147555f7ff408c3fb25bfe4fb766cd44c0840f349c24d3e00cdc5ebf5749ae7336270b4a229f825","ff0f6739ff26c20b0000"], [
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
  'Microsoft.Compute/LowCostGet3Min;3993,Microsoft.Compute/LowCostGet30Min;31993',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'd8c587db-ac19-49c2-abfb-a0c606a72f48',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11816',
  'x-ms-correlation-request-id',
  'e0b84a9a-9705-44a2-858d-0ecf1028a663',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211012T024033Z:e0b84a9a-9705-44a2-858d-0ecf1028a663',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Oct 2021 02:40:32 GMT'
]);
