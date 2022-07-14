let nock = require('nock');

module.exports.hash = "2bc1929aff87c9d33a13d04cc8b876bd";

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
  '36504aab-5297-4d77-b0d5-d77f92be3a00',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtyQdMw5lEtNq0BAWx_Ot80; expires=Sat, 13-Aug-2022 02:58:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKwuCm60MvMrMER_i_VlL0cYyvD14j7EoMDxysufIrR7nNWyi42iZuvQicV_R4sXhNu2HagJR1sVOviU6NIGksTb4qsZFbrsdAVUbqAWWruuFVg_IlyBPxLZDzEL6VKUTvFnV-ju6W-WdwThR3WC1uBrV0CjWoRtNdRv-quq8AMsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'e8620f73-a153-4347-9847-d6d0904bca00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoWCGMo2uw9Nu8py71fV3QA; expires=Sat, 13-Aug-2022 02:58:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevro5XgUN_Ut45YC2EYkA-cc1A5b3rRL4oLSktyuul9D1FG5tqWDSil_Qdgyv22sxYcfiYxWQpAYrOKel0_AfMhSQ83f7m2NDHEdjw77h7Z-OkdqKDMRhBZItBhnfoxgDp-pqef31U37vCdnUhVoC8E1YY6gHKeJ1Z5fjpvn1P2AaQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'be854673-7504-499e-8369-6c735094ba00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiAXcH0aUmdGjVFf4ejE9zk; expires=Sat, 13-Aug-2022 02:58:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrL-x0Me5HVWpBsPzv3chCrfVHsCotBzlZT4m8eAKYjM292w0OsYMQzYtPREiwKefGqmsesC1ubdV3UFk0Rs_MzsUbEyYPVPpdG8AkGgQAgJf-8VFjPvNEiwEOXRwLMj40ZaS06UYlVoThEHx1t31EvbhyOT6DFRZ5W04Pc567yhUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=556ba5c2-3d8f-4d54-adae-d961cb1c9063&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '79827af4-c4fa-4f3f-acf6-8aa12ced7d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Amjg1D1a3DJDgWCXilXCl1jhHQjEAQAAAG59YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a67ee350-8b59-4dc3-ae1d-63a5b83e2fbd&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'ea4bab5b-2ff6-4e51-b1ee-2abf309c8800',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgMhwx_xAHxEghJ3TuM1ODs; expires=Sat, 13-Aug-2022 02:58:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/fuzzy/batch/json', {"batchItems":[]})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"Number of queries must be between 1 and 10000 inclusive."}}, [
  'Content-Length',
  '104',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 088C1358C3424D43904AA422AE149C0D Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:55Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/fuzzy/batch/json', {"batchItems":[{"query":"?query=pizza&countrySet=fr"},{"query":"?query=pizza&lat=25&lon=121"},{"query":"?query=pizza&lat=25&lon=121&countrySet=tw"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/fuzzy/batch/e22cae2e-ecf6-4cda-adf8-b5daad31155f?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 96F9E97AAEAC4910A7A1F3D603371680 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:55Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/fuzzy/batch/e22cae2e-ecf6-4cda-adf8-b5daad31155f')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":6,"numResults":10,"offset":0,"totalResults":19877,"fuzzyLevel":1},"results":[{"type":"POI","id":"250009000667354","score":2.1454398632,"info":"search:ta:250009000667354-FR","poi":{"name":"Biker's Pizza","phone":"+33 2 98 80 45 45","categorySet":[{"id":7315036}],"url":"www.pizzabikers.fr","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"10","streetName":"Rue de l'Harteloire","municipality":"Brest","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29200","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"10 Rue de l'Harteloire, 29200 Brest","localName":"Brest"},"position":{"lat":48.39311,"lon":-4.49177},"viewport":{"topLeftPoint":{"lat":48.39401,"lon":-4.49312},"btmRightPoint":{"lat":48.39221,"lon":-4.49042}},"entryPoints":[{"type":"main","position":{"lat":48.39318,"lon":-4.49169}}]},{"type":"POI","id":"250009009291599","score":2.1454398632,"info":"search:ta:250009009291599-FR","poi":{"name":"Le Kiosque à Pizzas Lesneven","phone":"+33 2 98 46 03 71","brands":[{"name":"Le Kiosque à Pizzas"}],"categorySet":[{"id":7315036}],"url":"www.le-kiosque-a-pizzas.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"14","streetName":"Boulevard des Frères Lumière","municipality":"Lesneven","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29260","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"14 Boulevard des Frères Lumière, 29260 Lesneven","localName":"Lesneven"},"position":{"lat":48.57324,"lon":-4.31676},"viewport":{"topLeftPoint":{"lat":48.57414,"lon":-4.31812},"btmRightPoint":{"lat":48.57234,"lon":-4.3154}},"entryPoints":[{"type":"main","position":{"lat":48.57329,"lon":-4.31643}}]},{"type":"POI","id":"250001002603465","score":2.1454398632,"info":"search:ta:250001002603465-FR","poi":{"name":"Pizz'N Co","phone":"+33 2 98 44 02 19","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"44","streetName":"Rue Traverse","municipality":"Brest","countrySecondarySubdivision":"Finistere","countrySubdivision":"Brittany","postalCode":"29200","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"44 Rue Traverse, 29200 Brest","localName":"Brest"},"position":{"lat":48.38668,"lon":-4.49241},"viewport":{"topLeftPoint":{"lat":48.38758,"lon":-4.49376},"btmRightPoint":{"lat":48.38578,"lon":-4.49106}},"entryPoints":[{"type":"main","position":{"lat":48.38675,"lon":-4.49232}}]},{"type":"POI","id":"250009008018315","score":2.1454398632,"info":"search:ta:250009008018315-FR","poi":{"name":"Baïla Pizza Vitré","phone":"+33 2 23 55 81 98","brands":[{"name":"Baïla Pizza"}],"categorySet":[{"id":7315036}],"url":"www.bailapizza.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"8","streetName":"Rue de la Briqueterie","municipality":"Vitré","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35500","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"8 Rue de la Briqueterie, 35500 Vitré","localName":"Vitré"},"position":{"lat":48.10945,"lon":-1.21037},"viewport":{"topLeftPoint":{"lat":48.11035,"lon":-1.21172},"btmRightPoint":{"lat":48.10855,"lon":-1.20902}},"entryPoints":[{"type":"main","position":{"lat":48.10936,"lon":-1.21039}}]},{"type":"POI","id":"250009012987669","score":2.1454398632,"info":"search:ta:250009012987669-FR","poi":{"name":"Royal Pizz","phone":"+33 2 98 02 04 45","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"33","streetName":"Rue Joseph Lusven","municipality":"Ploudalmézeau","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29830","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"33 Rue Joseph Lusven, 29830 Ploudalmézeau","localName":"Ploudalmézeau"},"position":{"lat":48.54323,"lon":-4.66659},"viewport":{"topLeftPoint":{"lat":48.54413,"lon":-4.66795},"btmRightPoint":{"lat":48.54233,"lon":-4.66523}},"entryPoints":[{"type":"main","position":{"lat":48.54314,"lon":-4.66664}}]},{"type":"POI","id":"250009004875219","score":2.1454398632,"info":"search:ta:250009004875219-FR","poi":{"name":"La Cortessia","phone":"+33 2 99 60 59 67","categorySet":[{"id":7315036}],"url":"www.la-cortessia.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"15","streetName":"Place Saint-Malo","municipality":"Bréal-sous-Montfort","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35310","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"15 Place Saint-Malo, 35310 Bréal-sous-Montfort","localName":"Bréal-sous-Montfort"},"position":{"lat":48.04869,"lon":-1.86855},"viewport":{"topLeftPoint":{"lat":48.04959,"lon":-1.8699},"btmRightPoint":{"lat":48.04779,"lon":-1.8672}},"entryPoints":[{"type":"main","position":{"lat":48.04861,"lon":-1.86849}}]},{"type":"POI","id":"250009006261474","score":2.1454398632,"info":"search:ta:250009006261474-FR","poi":{"name":"L'Origan","phone":"+33 2 99 14 60 27","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Avenue du Chêne Vert","municipality":"Le Rheu","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35650","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Avenue du Chêne Vert, 35650 Le Rheu","localName":"Le Rheu"},"position":{"lat":48.09717,"lon":-1.77588},"viewport":{"topLeftPoint":{"lat":48.09871,"lon":-1.77819},"btmRightPoint":{"lat":48.09563,"lon":-1.77357}},"entryPoints":[{"type":"main","position":{"lat":48.0972,"lon":-1.77819}}]},{"type":"POI","id":"250009011156434","score":2.1454398632,"info":"search:ta:250009011156434-FR","poi":{"name":"Pizza Rhuys","phone":"+33 2 97 60 38 53","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Govéan","municipality":"Sarzeau","countrySecondarySubdivision":"Morbihan","countrySubdivision":"Bretagne","postalCode":"56370","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Govéan, 56370 Sarzeau","localName":"Sarzeau"},"position":{"lat":47.5207,"lon":-2.78442},"viewport":{"topLeftPoint":{"lat":47.5216,"lon":-2.78575},"btmRightPoint":{"lat":47.5198,"lon":-2.78309}},"entryPoints":[{"type":"main","position":{"lat":47.52074,"lon":-2.78454}}]},{"type":"POI","id":"250009004709576","score":2.1454398632,"info":"search:ta:250009004709576-FR","poi":{"name":"La Source","phone":"+33 2 99 89 92 43","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7","streetName":"Rue Ernest Lamort","municipality":"Cancale","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35260","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"7 Rue Ernest Lamort, 35260 Cancale","localName":"Cancale"},"position":{"lat":48.66832,"lon":-1.86232},"viewport":{"topLeftPoint":{"lat":48.66922,"lon":-1.86368},"btmRightPoint":{"lat":48.66742,"lon":-1.86096}},"entryPoints":[{"type":"main","position":{"lat":48.66822,"lon":-1.86232}}]},{"type":"POI","id":"250009011805436","score":2.1454398632,"info":"search:ta:250009011805436-FR","poi":{"name":"ABRN Pizza","phone":"+33 2 98 97 54 86","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4","streetName":"Rue Adigard","municipality":"Concarneau","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29900","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"4 Rue Adigard, 29900 Concarneau","localName":"Concarneau"},"position":{"lat":47.87594,"lon":-3.91625},"viewport":{"topLeftPoint":{"lat":47.87684,"lon":-3.91759},"btmRightPoint":{"lat":47.87504,"lon":-3.91491}},"entryPoints":[{"type":"main","position":{"lat":47.87588,"lon":-3.91635}}]}]}},{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":133,"numResults":10,"offset":0,"totalResults":377585,"fuzzyLevel":1,"geoBias":{"lat":25,"lon":121}},"results":[{"type":"POI","id":"158009002150213","score":2.5349826813,"dist":11334.911817378865,"info":"search:ta:158009002150213-TW","poi":{"name":"Pizza Hut Hsinchu Hukou Store","phone":"+886 3 590 6000","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"79","streetName":"Chenggong Road","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30344","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"79, Chenggong Road, Hukou Township, Hsinchu County 30344","localName":"Hukou Township"},"position":{"lat":24.90622,"lon":121.04407},"viewport":{"topLeftPoint":{"lat":24.90712,"lon":121.04308},"btmRightPoint":{"lat":24.90532,"lon":121.04506}},"entryPoints":[{"type":"main","position":{"lat":24.90617,"lon":121.04415}}]},{"type":"POI","id":"158009002168123","score":2.5341627598,"dist":11457.765315943818,"info":"search:ta:158009002168123-TW","poi":{"name":"Pizza Hut Taoyuan Xinwu Store","phone":"+886 3 497 0856","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"166","streetName":"Zhongshan Road","municipalitySubdivision":"Xinwu District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"327","extendedPostalCode":"32748","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"166, Zhongshan Road, Xinwu District, Taoyuan City 32748","localName":"Xinwu District"},"position":{"lat":24.97186,"lon":121.10936},"viewport":{"topLeftPoint":{"lat":24.97276,"lon":121.10837},"btmRightPoint":{"lat":24.97096,"lon":121.11035}},"entryPoints":[{"type":"main","position":{"lat":24.97178,"lon":121.1093}}]},{"type":"POI","id":"158009002154753","score":2.5293753147,"dist":12155.128902623723,"info":"search:ta:158009002154753-TW","poi":{"name":"Domino's Pizza Hukou Zhongzheng Restaurant","phone":"+886 3 590 5000","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"219","streetName":"Zhongzheng Road Section 1","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30342","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"219, Zhongzheng Road Section 1, Hukou Township, Hsinchu County 30342","localName":"Hukou Township"},"position":{"lat":24.89952,"lon":121.04748},"viewport":{"topLeftPoint":{"lat":24.90042,"lon":121.04649},"btmRightPoint":{"lat":24.89862,"lon":121.04847}},"entryPoints":[{"type":"main","position":{"lat":24.89949,"lon":121.04738}}]},{"type":"POI","id":"158009002155612","score":2.5136375427,"dist":14260.600898438535,"info":"search:ta:158009002155612-TW","poi":{"name":"Pizza Hut Taoyuan Guanyin Store","phone":"+886 3 498 2118","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"907","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","extendedPostalCode":"32848","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"907, Zhongshan Road Section 2, Guanyin District, Taoyuan City 32848","localName":"Guanyin District"},"position":{"lat":25.0099,"lon":121.14109},"viewport":{"topLeftPoint":{"lat":25.0108,"lon":121.1401},"btmRightPoint":{"lat":25.009,"lon":121.14208}},"entryPoints":[{"type":"main","position":{"lat":25.00982,"lon":121.14104}}]},{"type":"POI","id":"158009002165414","score":2.5127086639,"dist":14377.7749022998,"info":"search:ta:158009002165414-TW","poi":{"name":"Domino's Pizza Guanyin Xinpo Store","phone":"+886 3 498 5822","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"967","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"967, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00911,"lon":121.14232},"viewport":{"topLeftPoint":{"lat":25.01001,"lon":121.14133},"btmRightPoint":{"lat":25.00821,"lon":121.14331}},"entryPoints":[{"type":"main","position":{"lat":25.00902,"lon":121.14225}}]},{"type":"POI","id":"158009001318102","score":2.5112905502,"dist":14555.434957206897,"info":"search:ta:158009001318102-TW","poi":{"name":"拿坡里新豐店","phone":"+886 3 559 0588","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"189-1","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"189-1, 新興路, 新豐鄉, 新竹縣 304","localName":"新豐鄉"},"position":{"lat":24.86917,"lon":120.99528},"viewport":{"topLeftPoint":{"lat":24.87007,"lon":120.99429},"btmRightPoint":{"lat":24.86827,"lon":120.99627}},"entryPoints":[{"type":"main","position":{"lat":24.86907,"lon":120.99537}}]},{"type":"POI","id":"158009002152801","score":2.5109858513,"dist":14593.43338675432,"info":"search:ta:158009002152801-TW","poi":{"name":"Pizza Hut Hsinchu Xinfeng Store","phone":"+886 3 559 9111","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"171","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"171, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86885,"lon":120.99459},"viewport":{"topLeftPoint":{"lat":24.86975,"lon":120.9936},"btmRightPoint":{"lat":24.86795,"lon":120.99558}},"entryPoints":[{"type":"main","position":{"lat":24.86864,"lon":120.99483}}]},{"type":"POI","id":"158009001725073","score":2.5108249187,"dist":14613.472220701267,"info":"search:ta:158009001725073-TW","poi":{"name":"比薩家族50元比薩 新竹新豐店","phone":"+886 3 559 9095","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"171","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"171, 新興路, 新豐鄉, 新竹縣 30444","localName":"新豐鄉"},"position":{"lat":24.86867,"lon":120.99458},"viewport":{"topLeftPoint":{"lat":24.86957,"lon":120.99359},"btmRightPoint":{"lat":24.86777,"lon":120.99557}},"entryPoints":[{"type":"main","position":{"lat":24.86854,"lon":120.9947}}]},{"type":"POI","id":"158009002166980","score":2.5100557804,"dist":14708.95915754533,"info":"search:ta:158009002166980-TW","poi":{"name":"Domino's Pizza Xinfeng Xinxing Restaurant","phone":"+886 3 557 6611","brands":[{"name":"Domino's Pizza"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"146-15","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"146-15, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86782,"lon":120.99431},"viewport":{"topLeftPoint":{"lat":24.86872,"lon":120.99332},"btmRightPoint":{"lat":24.86692,"lon":120.9953}},"entryPoints":[{"type":"main","position":{"lat":24.86797,"lon":120.99415}}]},{"type":"POI","id":"158009001316049","score":2.4848582745,"dist":17649.691992150107,"info":"search:ta:158009001316049-TW","poi":{"name":"拿坡里楊梅店","phone":"+886 3 475 0200","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"184","streetName":"Dacheng Road","municipalitySubdivision":"Yangmei District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"326","extendedPostalCode":"32643","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"184, Dacheng Road, Yangmei District, Taoyuan City 32643","localName":"Yangmei District"},"position":{"lat":24.91224,"lon":121.14588},"viewport":{"topLeftPoint":{"lat":24.91314,"lon":121.14489},"btmRightPoint":{"lat":24.91134,"lon":121.14687}},"entryPoints":[{"type":"main","position":{"lat":24.91224,"lon":121.14578}}]}]}},{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":53,"numResults":10,"offset":0,"totalResults":1031,"fuzzyLevel":1,"geoBias":{"lat":25,"lon":121}},"results":[{"type":"POI","id":"158009002150213","score":2.5349826813,"dist":11334.911817378865,"info":"search:ta:158009002150213-TW","poi":{"name":"Pizza Hut Hsinchu Hukou Store","phone":"+886 3 590 6000","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"79","streetName":"Chenggong Road","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30344","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"79, Chenggong Road, Hukou Township, Hsinchu County 30344","localName":"Hukou Township"},"position":{"lat":24.90622,"lon":121.04407},"viewport":{"topLeftPoint":{"lat":24.90712,"lon":121.04308},"btmRightPoint":{"lat":24.90532,"lon":121.04506}},"entryPoints":[{"type":"main","position":{"lat":24.90617,"lon":121.04415}}]},{"type":"POI","id":"158009002168123","score":2.5341627598,"dist":11457.765315943818,"info":"search:ta:158009002168123-TW","poi":{"name":"Pizza Hut Taoyuan Xinwu Store","phone":"+886 3 497 0856","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"166","streetName":"Zhongshan Road","municipalitySubdivision":"Xinwu District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"327","extendedPostalCode":"32748","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"166, Zhongshan Road, Xinwu District, Taoyuan City 32748","localName":"Xinwu District"},"position":{"lat":24.97186,"lon":121.10936},"viewport":{"topLeftPoint":{"lat":24.97276,"lon":121.10837},"btmRightPoint":{"lat":24.97096,"lon":121.11035}},"entryPoints":[{"type":"main","position":{"lat":24.97178,"lon":121.1093}}]},{"type":"POI","id":"158009002154753","score":2.5293753147,"dist":12155.128902623723,"info":"search:ta:158009002154753-TW","poi":{"name":"Domino's Pizza Hukou Zhongzheng Restaurant","phone":"+886 3 590 5000","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"219","streetName":"Zhongzheng Road Section 1","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30342","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"219, Zhongzheng Road Section 1, Hukou Township, Hsinchu County 30342","localName":"Hukou Township"},"position":{"lat":24.89952,"lon":121.04748},"viewport":{"topLeftPoint":{"lat":24.90042,"lon":121.04649},"btmRightPoint":{"lat":24.89862,"lon":121.04847}},"entryPoints":[{"type":"main","position":{"lat":24.89949,"lon":121.04738}}]},{"type":"POI","id":"158009002155612","score":2.5136375427,"dist":14260.600898438535,"info":"search:ta:158009002155612-TW","poi":{"name":"Pizza Hut Taoyuan Guanyin Store","phone":"+886 3 498 2118","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"907","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","extendedPostalCode":"32848","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"907, Zhongshan Road Section 2, Guanyin District, Taoyuan City 32848","localName":"Guanyin District"},"position":{"lat":25.0099,"lon":121.14109},"viewport":{"topLeftPoint":{"lat":25.0108,"lon":121.1401},"btmRightPoint":{"lat":25.009,"lon":121.14208}},"entryPoints":[{"type":"main","position":{"lat":25.00982,"lon":121.14104}}]},{"type":"POI","id":"158009002165414","score":2.5127086639,"dist":14377.7749022998,"info":"search:ta:158009002165414-TW","poi":{"name":"Domino's Pizza Guanyin Xinpo Store","phone":"+886 3 498 5822","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"967","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"967, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00911,"lon":121.14232},"viewport":{"topLeftPoint":{"lat":25.01001,"lon":121.14133},"btmRightPoint":{"lat":25.00821,"lon":121.14331}},"entryPoints":[{"type":"main","position":{"lat":25.00902,"lon":121.14225}}]},{"type":"POI","id":"158009001318102","score":2.5112905502,"dist":14555.434957206897,"info":"search:ta:158009001318102-TW","poi":{"name":"拿坡里新豐店","phone":"+886 3 559 0588","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"189-1","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"189-1, 新興路, 新豐鄉, 新竹縣 304","localName":"新豐鄉"},"position":{"lat":24.86917,"lon":120.99528},"viewport":{"topLeftPoint":{"lat":24.87007,"lon":120.99429},"btmRightPoint":{"lat":24.86827,"lon":120.99627}},"entryPoints":[{"type":"main","position":{"lat":24.86907,"lon":120.99537}}]},{"type":"POI","id":"158009002152801","score":2.5109858513,"dist":14593.43338675432,"info":"search:ta:158009002152801-TW","poi":{"name":"Pizza Hut Hsinchu Xinfeng Store","phone":"+886 3 559 9111","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"171","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"171, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86885,"lon":120.99459},"viewport":{"topLeftPoint":{"lat":24.86975,"lon":120.9936},"btmRightPoint":{"lat":24.86795,"lon":120.99558}},"entryPoints":[{"type":"main","position":{"lat":24.86864,"lon":120.99483}}]},{"type":"POI","id":"158009001725073","score":2.5108249187,"dist":14613.472220701267,"info":"search:ta:158009001725073-TW","poi":{"name":"比薩家族50元比薩 新竹新豐店","phone":"+886 3 559 9095","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"171","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"171, 新興路, 新豐鄉, 新竹縣 30444","localName":"新豐鄉"},"position":{"lat":24.86867,"lon":120.99458},"viewport":{"topLeftPoint":{"lat":24.86957,"lon":120.99359},"btmRightPoint":{"lat":24.86777,"lon":120.99557}},"entryPoints":[{"type":"main","position":{"lat":24.86854,"lon":120.9947}}]},{"type":"POI","id":"158009002166980","score":2.5100557804,"dist":14708.95915754533,"info":"search:ta:158009002166980-TW","poi":{"name":"Domino's Pizza Xinfeng Xinxing Restaurant","phone":"+886 3 557 6611","brands":[{"name":"Domino's Pizza"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"146-15","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"146-15, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86782,"lon":120.99431},"viewport":{"topLeftPoint":{"lat":24.86872,"lon":120.99332},"btmRightPoint":{"lat":24.86692,"lon":120.9953}},"entryPoints":[{"type":"main","position":{"lat":24.86797,"lon":120.99415}}]},{"type":"POI","id":"158009001316049","score":2.4848582745,"dist":17649.691992150107,"info":"search:ta:158009001316049-TW","poi":{"name":"拿坡里楊梅店","phone":"+886 3 475 0200","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"184","streetName":"Dacheng Road","municipalitySubdivision":"Yangmei District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"326","extendedPostalCode":"32643","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"184, Dacheng Road, Yangmei District, Taoyuan City 32643","localName":"Yangmei District"},"position":{"lat":24.91224,"lon":121.14588},"viewport":{"topLeftPoint":{"lat":24.91314,"lon":121.14489},"btmRightPoint":{"lat":24.91134,"lon":121.14687}},"entryPoints":[{"type":"main","position":{"lat":24.91224,"lon":121.14578}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: DC68B76A99644B7E8AA010AC34C25EFD Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:55Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:54 GMT'
]);
