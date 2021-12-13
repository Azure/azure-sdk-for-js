let nock = require('nock');

module.exports.hash = "fa11008e2454bd54fb1d0d9c1317f4a9";

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
  '32f80083-0b31-4244-a179-32a9538b2100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvLM0YT-QXlFtRTAaH1HWtQ; expires=Wed, 12-Jan-2022 08:18:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1F-A3kumXgyC4i2rRFxn8MQWrhsTUB5D_NpIMmXi7dwAiFdycx_ZM12-GkdmAsFHiODOmhtwzvGk3cHmEc7t4SEtoFatc6PUthMNwj7pbwfW2IA-ZfqVQ52Kk95XjO9hwe7bLSNoV_8rn8RXWfVoY-RANBCrdDKnxp6Vi6ukO90gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:04 GMT',
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
  '515b7f7a-a6ec-4d9d-a61d-90fd7ac62200',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiDkwwzDJDpJkw4SGUjalVw; expires=Wed, 12-Jan-2022 08:18:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXWRK55oRBU2-mtoIR_T9J4tWNlc4zpgKpopZPbXXEk4ef-q74akT540sJa2qJaDzjH2HlMoUm803xWQp6G8iyuf0jwcU5kPeAICbG5V3MFLEENV5MzPvy7YPLkCcLZT7PsEoM2DKuvKtoWodkdwZSrwms9wCFTdm28kUKMtI3jIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a7c81155-d9c4-4b2c-ae8c-09366cd7200c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '32f80083-0b31-4244-a179-32a95a8b2100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlskF8Egi31Gli-fZ1jnvtQWPr5BAQAAALz4SNkOAAAA; expires=Wed, 12-Jan-2022 08:18:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:18:04 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Web/sites')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3efe693bb4d415f5333fc7c47cf47a38f96d98290f828f8acbd5ee1b3c8bbf4e5db620974b3d58afe28ab69067ce983d3ac69d3af5ed387d4fb2aafdb829a3ffac5d10e9a366bf1e1abf572592c2fe89379d5b42fa825bdf23dafed38fbc1baceaff2093e68c6cbbcfde8fba38fe8efd7ab6c0a0866c8dbe8feabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7db7b0fef8db355d1e9e28a86575d71578ff6efefdffd1ab302584002948e6227b4a46ff193460992d4f9aaa23fabfafa357d085210e2418bea6a99d71f3d5aaecb72f4d1bac92ef2d74ac61755bdc84a6a922fb34999d3f4b4f53a1f7d94cd16c5f234fc4c9b7cfbd6f41ef95f37d345a4094d09fe7819ccfb226fb359d6660663a2bbfd96785ed9826668fdeed9bb9f245e250253672a151f7df44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e1003334a0465dad4e637ea480051531ada17d50caf3f2f16f4c78cde37fcfaba291936b57683f208d6271601d477a8e5d3a2e1e9a04f8bd593acc96704f055deaccbd6747f59d4ed3a2bcf5e9a0fdaf97a3159d5c5d23669abaf56446a0218fe7d66419a6f5c27068317557b522dcf8b0bc2136860606f44fea9c97296d5337f2abca1c579e1ff3bc37b6525ee23b0d0b45aacd676a69fe633e60cbcd3e4f5655e3fcbea85e9c77d724682f5c351dddce5397589c6c4eff8a098e6ab325bd26c109a04913e228c1f9d676543a25e34bf77be2469317fcf69dcf54fda3fcbac6969b42402f9ec4db1c8bf6aa73496bd9dbdddedddbdeddd7b6f760e1eed3e78b47f6ffce93d02df10a548e7bccaa7152172fd343fcf681a0d9d9d269f56cb365fb6c79ba4af5e2f5bea71631b9a9a5ca60eda64494c91d75f9e7fb7aadf12713e7ab43bfa6826283cada6eb05f5481fcaec101b3eab895dafa8add118fad56abeea7e72ddceab65e7c3253141e7a3557595d7afe7795976be28430d469a8b0c54576169db3aff456b9ae4377536256259cd6cbe5c546dfe349fac2f2e6efcb6031816ee79c5df74de6309fda25a82d1a9c50951f9a2aa590b6b8369fd55937f912d69726767332224cdc609490bb5504e912675a7cdd95303a2ac2e9aa7459d4fa90f325f3fc8594f9a6f6764080ac2e8b4ae19850892abf5a42c9a397d817e44d574bf7999350dcda87d87442054f964a8a827520cd6e4102b2e0929a2d3eb96148ad7309b12c8fcf7caafcd277352752586b85af90d67ca5bafaaca8e87f49e6810f973dde4f7f69e14ad7026d94032fcf67d528dafabe9dbbc6d3a23cecaabecbaf992265069fcd364ae3a938a8f4802887a9ee10f3eecbc40c89f548b050d85ccaa4590fec6b4bd2c5639f12af102149c7ca5caf778b52aa1ed0894c3bc581eafdbf9315c0895cde08b37e4482c8df8cb37d335e98805017b5955a5e1923e8068b30838a3249e8227a21f7659a2acb2d9938c1422a4cb7c48fa154cf26a5d3a9ecfdf912624309ed228c1b2f6af6cdd56dfceb3b23b6bfa7100ac1569fe52b4bff9f492b4101c04ffef57844a7e5c76a1e2ab97757149637f59d56d7352d120cd972c00d317794b037d7b3cf5996b5a4111caefab753337bf93534bdab920912784bc0f457e316a6220d6abfa158deaf555b67a5d5601ca70eecb2fae5fffa22ec2ca51afc9dc90053253085328dfbf939e861bbccdaf7f12aafb557e9ed7f9d235310d0a92ede9baa64fc85b20d96521b68325093cfb7a0d886bbe20c931eda036f776ece8c443267e7d53361dd122885fc43e3f6f574dc0b5ab3aff2e19e97c76b6a428878616cce6f97ac98810f7bf26e21a45b943a8105bb5f393793e7dfb326bed5c9e93e63c21e574911faf67456b51d56f155c43e61762c13055d9134b765a9332825185adffa96a6931a6f1168bf5e214fe4031eda04d98b105794d10694a8901f1b925b4109094debbeb676566390add8095cddf24da05e99a754308ba8004df919f3e231fa6ba065b82413e721e2619d2a6c392246be7e4b20b7fd55e10235f376fd70481e643fc56fa60ba4038755c36158d60b542b7aa70dbacbec85bc3f70602fc43a61ca15b2d81d4f037346c4c8f69302d0bfaf098f023fa5fdb510a53c9970839ec178a87fb463433f9a5bf684dc614e8bbef4edf4dcb35180fcc61c70b9c9800d6d1365067d582f89c9895dc3bd1ec2262e4ec39a5219af869a429a171fffeb3bdd3fdfd7bf78f3f7db07ff06ce7e4def1fea79f7e7a7fe7fe937b9f3ed8dbdffff4f821fd77faece9d393bd9d670f0f4e9f9d9eee3fb9fff4e4e4c1c1ce8353423f481514cb09b1ceec6c753c9b91ab4a4890af39de7f38deddd91fdfff945a903bde14348ab34e4bcc6fb72dc91dc9b2ba0a1ecffcbebfefefe6fe90768d61136a883fa38900faa213cc909d830f87a086e3f5bb57575735dc008ac4d76d1cc3dd9dbdf1eea7e3dd87f747e6af83f1ee9eff87ffcdfd5def8f4ffd660feee10f7fc086385ffe90fa367fecfb7f7ceafd71f0d0fbe3a1ffcdee8e0f7b77c7ef76f79e0f7df75ef09df47cb03bfe74777c2f80f880dbe19bbdf1dede03fc61bf0afe3ad809fef2b1dfdb61f0f62f0669feda73a3793876d4783876d03119f60f22f4a78c2170daa1f7fd7776b95b7ff6c813158f0dde316bd519f9c4d75f90535f5f4321ffc4ba82df4a5f34eb66952f6788c94a1bd882018d8cbfcab3060688da1afd7ffa8e6c1d7ef98a544f7342de2d75226f2eb2772fbab1937c33afc860b4d96245fcd31308e05c9221595e9c2dcf2bf74a57074255c8776de6dc66e24b17dc127813dd12540dda3c9974f2da9140923c7a012680b53459d9b5ed018687dce7923c06d578a431d7a4f697d36bd5a32f60e3a077484f5f1046cd97e4f459fd26602ef28ac84aeec184c967c153fe01eed8e972b6aa281341fe920612b6c5645d9433529ad0c9e63331294f22df2c8a0be91aa320e4e453f2c72f20d31414f971d947f00ec475a2dfe8cb66443fcd2770033a9f117a4dc560fc4fbffde6cdcbce47672fc9298a41785966ed3945defc318c347e21e2917df0ccbeb54c86e6c406881fd43b7dbd9ed09439e26ef0f23e7a7d4d0cb138269d76b12480bf04199865feaea5c08532b6f23ed2e2f8ed97","fc3f11b022c02c170000"], [
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
  '"1D7EFF9E73F4EE0"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'cc87ff2f-4128-4d57-9756-dd1c44334051',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'c9aea048-6c72-41a0-8ffe-2acfd3645f69',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T081805Z:c9aea048-6c72-41a0-8ffe-2acfd3645f69',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:18:04 GMT'
]);
