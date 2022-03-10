let nock = require('nock');

module.exports.hash = "3e451624eb3e97c85ab33cdea77e7da9";

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
  'f1d2e822-2078-4131-844e-fa1994415400',
  'x-ms-ests-server',
  '2.1.12559.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgBvB79ib3xPjyZqhWKxUPI; expires=Sat, 09-Apr-2022 06:34:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrqdU2MKgZnNfc4Atp1Rkw-OlZ_Otg814WnVY1wR9gG4DsOZ4N7vMF4ODR714q4zoKs-3l4EiyxZvWbdf0GuwIo8a0f5ygfBdlhOz8_cHG3k-zY_2lIbbrIlYOv-PjORRjZjueLFc9TTZkqdQOXrrta_UzgFK5p0kAUz4W3clgMgAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:18 GMT',
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
  'dddef7d9-db3d-4baf-b41d-2b877d0fd500',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AugVJoy0R-VFkvOPems0KCw; expires=Sat, 09-Apr-2022 06:34:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEWqs8eTnHHuOt9yRR7qVDynPyZs5-x_OXESAqXZJH7eFGV9bHaGr09IuJoqrQTPrzqZ5ohFghdWyblqPu8kD1cJpJ3q8xfGVlTo-Y3s2DnrYnYzZSgLLleLBZwRv_tLIS82HuQ3ydByaDWaXAboT25guv9aFjkhP7USbWApyw30gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5a556444-9b03-4e5b-85aa-4f2db0d079f5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'aba11f9b-d714-4b06-8456-42478aadd000',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ahkp-dOXMhVFt43-G1BJdwA; expires=Sat, 09-Apr-2022 06:34:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:19 GMT',
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
  'https://atlas.microsoft.com/search/fuzzy/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 16D80E9EA15C45E0B95EF32DEFDA02A0 Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:19Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:19 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/fuzzy/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":6,"numResults":10,"offset":0,"totalResults":19729,"fuzzyLevel":1},"results":[{"type":"POI","id":"250009007860031","score":2.1454398632,"info":"search:ta:250009007860031-FR","poi":{"name":"L'Olympe","phone":"+33 3 83 22 98 11","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"81","streetName":"Rue Raymond Poincaré","municipality":"Bouxières-aux-Dames","countrySecondarySubdivision":"Meurthe-et-Moselle","countrySubdivision":"Grand-Est","postalCode":"54136","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"81 Rue Raymond Poincaré, 54136 Bouxières-aux-Dames","localName":"Bouxières-aux-Dames"},"position":{"lat":48.75661,"lon":6.15534},"viewport":{"topLeftPoint":{"lat":48.75751,"lon":6.15398},"btmRightPoint":{"lat":48.75571,"lon":6.1567}},"entryPoints":[{"type":"main","position":{"lat":48.75664,"lon":6.15544}}]},{"type":"POI","id":"250009007858215","score":2.1454398632,"info":"search:ta:250009007858215-FR","poi":{"name":"Cinecittà","phone":"+33 3 88 92 02 07","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"9","streetName":"Rue du Marteau","municipality":"Sélestat","countrySecondarySubdivision":"Bas-Rhin","countrySubdivision":"Grand-Est","postalCode":"67600","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"9 Rue du Marteau, 67600 Sélestat","localName":"Sélestat"},"position":{"lat":48.25883,"lon":7.45525},"viewport":{"topLeftPoint":{"lat":48.25973,"lon":7.4539},"btmRightPoint":{"lat":48.25793,"lon":7.4566}},"entryPoints":[{"type":"main","position":{"lat":48.25875,"lon":7.45526}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZmI1NDM3ZWU0YjAxN2U2YTNjMzVlNmE=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009036791618","score":2.1454398632,"info":"search:ta:250009036791618-FR","poi":{"name":"Le Bernanos","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"1","streetName":"Rue des Ducs de Bar","municipality":"Bar-le-Duc","countrySecondarySubdivision":"Meuse","countrySubdivision":"Great East","postalCode":"55000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"1 Rue des Ducs de Bar, 55000 Bar-le-Duc","localName":"Bar-le-Duc"},"position":{"lat":48.76903,"lon":5.1584},"viewport":{"topLeftPoint":{"lat":48.76993,"lon":5.15704},"btmRightPoint":{"lat":48.76813,"lon":5.15976}},"entryPoints":[{"type":"main","position":{"lat":48.76903,"lon":5.15843}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YzIzM2RlYzlhNjdhNTkzMGVhYmRkODc=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009007874522","score":2.1454398632,"info":"search:ta:250009007874522-FR","poi":{"name":"Pizza Mama Guilia","phone":"+33 6 34 46 17 97","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"36","streetName":"Route d'Avricourt","municipality":"Foulcrey","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57830","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"36 Route d'Avricourt, 57830 Foulcrey","localName":"Foulcrey"},"position":{"lat":48.64012,"lon":6.84804},"viewport":{"topLeftPoint":{"lat":48.64102,"lon":6.84668},"btmRightPoint":{"lat":48.63922,"lon":6.8494}},"entryPoints":[{"type":"main","position":{"lat":48.64012,"lon":6.84804}}]},{"type":"POI","id":"250009007840305","score":2.1454398632,"info":"search:ta:250009007840305-FR","poi":{"name":"Pizza Fredy","phone":"+33 3 82 53 84 97","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7","streetName":"Rue de Thionville","municipality":"Kœnigsmacker","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57970","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"7 Rue de Thionville, 57970 Kœnigsmacker","localName":"Kœnigsmacker"},"position":{"lat":49.39552,"lon":6.27906},"viewport":{"topLeftPoint":{"lat":49.39642,"lon":6.27768},"btmRightPoint":{"lat":49.39462,"lon":6.28044}},"entryPoints":[{"type":"main","position":{"lat":49.39563,"lon":6.27891}}]},{"type":"POI","id":"250009008115964","score":2.1454398632,"info":"search:ta:250009008115964-FR","poi":{"name":"Pizz-3","phone":"+33 3 25 75 07 50","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"5","streetName":"Route d'Auxerre","municipality":"Saint-André-les-Vergers","countrySecondarySubdivision":"Aube","countrySubdivision":"Grand-Est","postalCode":"10120","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Route d'Auxerre, 10120 Saint-André-les-Vergers","localName":"Saint-André-les-Vergers"},"position":{"lat":48.27819,"lon":4.06602},"viewport":{"topLeftPoint":{"lat":48.27909,"lon":4.06467},"btmRightPoint":{"lat":48.27729,"lon":4.06737}},"entryPoints":[{"type":"main","position":{"lat":48.27823,"lon":4.06598}}]},{"type":"POI","id":"250009002632510","score":2.1454398632,"info":"search:ta:250009002632510-FR","poi":{"name":"Pizza Hut","phone":"+33 825 03 00 30","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"url":"www.pizzahut.fr","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Verdun","municipality":"Troyes","countrySecondarySubdivision":"Aube","countrySubdivision":"Grand-Est","postalCode":"10000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Verdun, 10000 Troyes","localName":"Troyes"},"position":{"lat":48.2816,"lon":4.07337},"viewport":{"topLeftPoint":{"lat":48.2825,"lon":4.07202},"btmRightPoint":{"lat":48.2807,"lon":4.07472}},"entryPoints":[{"type":"main","position":{"lat":48.2816,"lon":4.07332}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTRhYTM3MTE4YTgzY2RhMzdkZWIwOWU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009036815374","score":2.1454398632,"info":"search:ta:250009036815374-FR","poi":{"name":"Pizza et Saveurs-Pizzeria","phone":"+33 3 87 03 54 76","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"5","streetName":"Rue du Maréchal Foch","municipality":"Sarrebourg","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57400","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Rue du Maréchal Foch, 57400 Sarrebourg","localName":"Sarrebourg"},"position":{"lat":48.73522,"lon":7.05654},"viewport":{"topLeftPoint":{"lat":48.73612,"lon":7.05518},"btmRightPoint":{"lat":48.73432,"lon":7.0579}},"entryPoints":[{"type":"main","position":{"lat":48.73519,"lon":7.05648}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NTFkN2EzYzQ5OGU5ZTIyOWU1YzQzOGE=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009013316358","score":2.1454398632,"info":"search:ta:250009013316358-FR","poi":{"name":"Melypas","phone":"+33 3 83 22 64 02","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"77","streetName":"Rue Pascal","municipality":"Ludres","countrySecondarySubdivision":"Meurthe-et-Moselle","countrySubdivision":"Grand-Est","postalCode":"54710","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"77 Rue Pascal, 54710 Ludres","localName":"Ludres"},"position":{"lat":48.61893,"lon":6.17859},"viewport":{"topLeftPoint":{"lat":48.61983,"lon":6.17723},"btmRightPoint":{"lat":48.61803,"lon":6.17995}},"entryPoints":[{"type":"main","position":{"lat":48.61891,"lon":6.17865}}]},{"type":"POI","id":"250009013013838","score":2.1454398632,"info":"search:ta:250009013013838-FR","poi":{"name":"Restoland","phone":"+33 3 29 08 41 41","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Verdun","municipality":"Vittel","countrySecondarySubdivision":"Vosges","countrySubdivision":"Grand-Est","postalCode":"88800","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Verdun, 88800 Vittel","localName":"Vittel"},"position":{"lat":48.20123,"lon":5.94625},"viewport":{"topLeftPoint":{"lat":48.20213,"lon":5.9449},"btmRightPoint":{"lat":48.20033,"lon":5.9476}},"entryPoints":[{"type":"main","position":{"lat":48.20124,"lon":5.94619}}]}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [
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
  'Ref A: CDC0CBE70B7241FE892B6B3146BA8D95 Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:19Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:19 GMT'
]);
