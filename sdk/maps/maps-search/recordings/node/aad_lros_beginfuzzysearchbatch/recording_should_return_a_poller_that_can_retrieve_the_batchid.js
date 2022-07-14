let nock = require('nock');

module.exports.hash = "9fe686b2310f88fec395ff0002a5443a";

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
  '5c85e58d-38bc-4132-813a-6c9a38043300',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvFl-LX-t2NNhE56YfgMPQg; expires=Sat, 13-Aug-2022 02:58:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroFsu8jkPBB6NAKS8QlValBQPG_yEa5DKHfvCNstb3p9Kf7sRpfAap6RdJrpZAeObwjofcRSQyjcQLxY1tCi70chtRhl39D6Xy1-Na3bT59DdkBDGJx8dGe-E3SdeCh8B7LzbKzBOaOCadl5krThPTQPi4iGH6MwC8ekmpesTKmMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:55 GMT',
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
  'd404e423-a8f6-43ac-bb66-a80ffca0b600',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqyQUHCHvGNPrUfWPiC2JKA; expires=Sat, 13-Aug-2022 02:58:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr76ypmtpV3IQE5EtI0uiBJdNN6qvqnfC4Xcwl3xCWLH8s3JKhdcMV94ibeTbofz77-iAZ0cso1Y1VyMRFIurCsnDtXcI_TDSf_BVRKrQbgUvIy1Se51YHaA3hi9TJs20LlJxYI3Vp5rG5CwfgieGIf08GPQ21oYWjfc24FeQSPzEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4a1c9d8d-df0d-4ca1-b428-eb8da7e104e9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7aa4b5f4-39b1-4b79-b07a-920998df8400',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aq46a9sW4g5CkYDAs7yP41PhHQjEAQAAAG99YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:55 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/fuzzy/batch/json', {"batchItems":[{"query":"?query=pizza&countrySet=fr"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/fuzzy/batch/405d5a24-ed46-4fd4-bc65-3eb2bc7d7475?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: FE78295768D64B9296D131D04E1D90E8 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:56Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:55 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/fuzzy/batch/405d5a24-ed46-4fd4-bc65-3eb2bc7d7475')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":9,"numResults":10,"offset":0,"totalResults":19877,"fuzzyLevel":1},"results":[{"type":"POI","id":"250009000667354","score":2.1454398632,"info":"search:ta:250009000667354-FR","poi":{"name":"Biker's Pizza","phone":"+33 2 98 80 45 45","categorySet":[{"id":7315036}],"url":"www.pizzabikers.fr","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"10","streetName":"Rue de l'Harteloire","municipality":"Brest","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29200","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"10 Rue de l'Harteloire, 29200 Brest","localName":"Brest"},"position":{"lat":48.39311,"lon":-4.49177},"viewport":{"topLeftPoint":{"lat":48.39401,"lon":-4.49312},"btmRightPoint":{"lat":48.39221,"lon":-4.49042}},"entryPoints":[{"type":"main","position":{"lat":48.39318,"lon":-4.49169}}]},{"type":"POI","id":"250009009291599","score":2.1454398632,"info":"search:ta:250009009291599-FR","poi":{"name":"Le Kiosque à Pizzas Lesneven","phone":"+33 2 98 46 03 71","brands":[{"name":"Le Kiosque à Pizzas"}],"categorySet":[{"id":7315036}],"url":"www.le-kiosque-a-pizzas.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"14","streetName":"Boulevard des Frères Lumière","municipality":"Lesneven","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29260","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"14 Boulevard des Frères Lumière, 29260 Lesneven","localName":"Lesneven"},"position":{"lat":48.57324,"lon":-4.31676},"viewport":{"topLeftPoint":{"lat":48.57414,"lon":-4.31812},"btmRightPoint":{"lat":48.57234,"lon":-4.3154}},"entryPoints":[{"type":"main","position":{"lat":48.57329,"lon":-4.31643}}]},{"type":"POI","id":"250001002603465","score":2.1454398632,"info":"search:ta:250001002603465-FR","poi":{"name":"Pizz'N Co","phone":"+33 2 98 44 02 19","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"44","streetName":"Rue Traverse","municipality":"Brest","countrySecondarySubdivision":"Finistere","countrySubdivision":"Brittany","postalCode":"29200","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"44 Rue Traverse, 29200 Brest","localName":"Brest"},"position":{"lat":48.38668,"lon":-4.49241},"viewport":{"topLeftPoint":{"lat":48.38758,"lon":-4.49376},"btmRightPoint":{"lat":48.38578,"lon":-4.49106}},"entryPoints":[{"type":"main","position":{"lat":48.38675,"lon":-4.49232}}]},{"type":"POI","id":"250009008018315","score":2.1454398632,"info":"search:ta:250009008018315-FR","poi":{"name":"Baïla Pizza Vitré","phone":"+33 2 23 55 81 98","brands":[{"name":"Baïla Pizza"}],"categorySet":[{"id":7315036}],"url":"www.bailapizza.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"8","streetName":"Rue de la Briqueterie","municipality":"Vitré","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35500","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"8 Rue de la Briqueterie, 35500 Vitré","localName":"Vitré"},"position":{"lat":48.10945,"lon":-1.21037},"viewport":{"topLeftPoint":{"lat":48.11035,"lon":-1.21172},"btmRightPoint":{"lat":48.10855,"lon":-1.20902}},"entryPoints":[{"type":"main","position":{"lat":48.10936,"lon":-1.21039}}]},{"type":"POI","id":"250009012987669","score":2.1454398632,"info":"search:ta:250009012987669-FR","poi":{"name":"Royal Pizz","phone":"+33 2 98 02 04 45","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"33","streetName":"Rue Joseph Lusven","municipality":"Ploudalmézeau","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29830","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"33 Rue Joseph Lusven, 29830 Ploudalmézeau","localName":"Ploudalmézeau"},"position":{"lat":48.54323,"lon":-4.66659},"viewport":{"topLeftPoint":{"lat":48.54413,"lon":-4.66795},"btmRightPoint":{"lat":48.54233,"lon":-4.66523}},"entryPoints":[{"type":"main","position":{"lat":48.54314,"lon":-4.66664}}]},{"type":"POI","id":"250009004875219","score":2.1454398632,"info":"search:ta:250009004875219-FR","poi":{"name":"La Cortessia","phone":"+33 2 99 60 59 67","categorySet":[{"id":7315036}],"url":"www.la-cortessia.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"15","streetName":"Place Saint-Malo","municipality":"Bréal-sous-Montfort","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35310","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"15 Place Saint-Malo, 35310 Bréal-sous-Montfort","localName":"Bréal-sous-Montfort"},"position":{"lat":48.04869,"lon":-1.86855},"viewport":{"topLeftPoint":{"lat":48.04959,"lon":-1.8699},"btmRightPoint":{"lat":48.04779,"lon":-1.8672}},"entryPoints":[{"type":"main","position":{"lat":48.04861,"lon":-1.86849}}]},{"type":"POI","id":"250009006261474","score":2.1454398632,"info":"search:ta:250009006261474-FR","poi":{"name":"L'Origan","phone":"+33 2 99 14 60 27","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Avenue du Chêne Vert","municipality":"Le Rheu","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35650","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Avenue du Chêne Vert, 35650 Le Rheu","localName":"Le Rheu"},"position":{"lat":48.09717,"lon":-1.77588},"viewport":{"topLeftPoint":{"lat":48.09871,"lon":-1.77819},"btmRightPoint":{"lat":48.09563,"lon":-1.77357}},"entryPoints":[{"type":"main","position":{"lat":48.0972,"lon":-1.77819}}]},{"type":"POI","id":"250009011156434","score":2.1454398632,"info":"search:ta:250009011156434-FR","poi":{"name":"Pizza Rhuys","phone":"+33 2 97 60 38 53","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Govéan","municipality":"Sarzeau","countrySecondarySubdivision":"Morbihan","countrySubdivision":"Bretagne","postalCode":"56370","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Govéan, 56370 Sarzeau","localName":"Sarzeau"},"position":{"lat":47.5207,"lon":-2.78442},"viewport":{"topLeftPoint":{"lat":47.5216,"lon":-2.78575},"btmRightPoint":{"lat":47.5198,"lon":-2.78309}},"entryPoints":[{"type":"main","position":{"lat":47.52074,"lon":-2.78454}}]},{"type":"POI","id":"250009004709576","score":2.1454398632,"info":"search:ta:250009004709576-FR","poi":{"name":"La Source","phone":"+33 2 99 89 92 43","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7","streetName":"Rue Ernest Lamort","municipality":"Cancale","countrySecondarySubdivision":"Ille-et-Vilaine","countrySubdivision":"Bretagne","postalCode":"35260","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"7 Rue Ernest Lamort, 35260 Cancale","localName":"Cancale"},"position":{"lat":48.66832,"lon":-1.86232},"viewport":{"topLeftPoint":{"lat":48.66922,"lon":-1.86368},"btmRightPoint":{"lat":48.66742,"lon":-1.86096}},"entryPoints":[{"type":"main","position":{"lat":48.66822,"lon":-1.86232}}]},{"type":"POI","id":"250009011805436","score":2.1454398632,"info":"search:ta:250009011805436-FR","poi":{"name":"ABRN Pizza","phone":"+33 2 98 97 54 86","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4","streetName":"Rue Adigard","municipality":"Concarneau","countrySecondarySubdivision":"Finistère","countrySubdivision":"Bretagne","postalCode":"29900","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"4 Rue Adigard, 29900 Concarneau","localName":"Concarneau"},"position":{"lat":47.87594,"lon":-3.91625},"viewport":{"topLeftPoint":{"lat":47.87684,"lon":-3.91759},"btmRightPoint":{"lat":47.87504,"lon":-3.91491}},"entryPoints":[{"type":"main","position":{"lat":47.87588,"lon":-3.91635}}]}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [
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
  'Ref A: 63086AAF4EB644409E9195FDE542EF51 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:56Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:55 GMT'
]);
