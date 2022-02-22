let nock = require('nock');

module.exports.hash = "624e3114e23922434b268a3b625602c3";

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
  'cd84e4ec-cb6a-4421-b819-2ebdb73f1800',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ap2hYbf3N6JHpbjW3RBQ-qQ; expires=Thu, 24-Mar-2022 10:21:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-RKlnMDrXN-xYm9vrTqzsx4Mp3C4L7QxRfOpFXdspCmlr9TWHQCdEdppHhAEoMbBvfa09c9ei0b5tQw1tf_YgMD81I1K1Yeqwow44UikFRPUZVkV9eATFvThb1x24VMe7EZ1jb_R2kt2Tm3K0doja-69IzJiNFVnYAxsxq_PS1IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:48 GMT',
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
  '0fe1ac84-8559-4eb5-ad46-170448bb9300',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Al-CH4HEntpAvswmeYQzDic; expires=Thu, 24-Mar-2022 10:21:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYu9Jb7eXT7mes2OS-wV_MF19WiHQxDr8b3ngNtBhYDvxyL0Quag-C6mDHkv454qD4PePjKB1OCv0QURKlIFZgd3Bb5ngy6A9xTJiVx7wy77-MnXqfLOcp8KKD6WmydbrAOy49MqQdO0ZGORegiI1i8tgDDJZzCjxQEI84BtDs-MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=616c209c-209f-4f57-a705-4e63dff1a2c7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7856a4cd-bd07-4654-9e4c-3d84fcc86401',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArpKXZbs7qtIrHaCTKM1leSr4fIWAQAAADywptkOAAAA; expires=Thu, 24-Mar-2022 10:21:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:48 GMT',
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
  'Ref A: D3499573F6FA4B0D98E57234F2B8E7B7 Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:49Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:48 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/fuzzy/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":48,"numResults":10,"offset":0,"totalResults":19729,"fuzzyLevel":1},"results":[{"type":"POI","id":"250009008095740","score":2.1454398632,"info":"search:ta:250009008095740-FR","poi":{"name":"Presto Pizza","phone":"+33 3 89 39 20 34","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"32","streetName":"Rue du Général de Gaulle","municipalitySubdivision":"Masevaux","municipality":"Masevaux-Niederbruck","countrySecondarySubdivision":"Haut-Rhin","countrySubdivision":"Grand-Est","postalCode":"68290","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"32 Rue du Général de Gaulle, 68290 Masevaux-Niederbruck","localName":"Masevaux-Niederbruck"},"position":{"lat":47.77435,"lon":6.99796},"viewport":{"topLeftPoint":{"lat":47.77525,"lon":6.99662},"btmRightPoint":{"lat":47.77345,"lon":6.9993}},"entryPoints":[{"type":"main","position":{"lat":47.7742,"lon":6.9979}}]},{"type":"POI","id":"250009007951780","score":2.1454398632,"info":"search:ta:250009007951780-FR","poi":{"name":"Le Bocaccio","phone":"+33 3 88 37 11 51","categorySet":[{"id":7315036}],"url":"www.leboccaccio.fr","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Rue Finkwiller","municipality":"Strasbourg","countrySecondarySubdivision":"Lower Rhine","countrySubdivision":"Great East","postalCode":"67000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue Finkwiller, 67000 Strasbourg","localName":"Strasbourg"},"position":{"lat":48.57919,"lon":7.7421},"viewport":{"topLeftPoint":{"lat":48.58009,"lon":7.74074},"btmRightPoint":{"lat":48.57829,"lon":7.74346}},"entryPoints":[{"type":"main","position":{"lat":48.57892,"lon":7.74196}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YzA5NTQ5YWZmYjhjOWI2MGJiYjY5NjE=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009007987034","score":2.1454398632,"info":"search:ta:250009007987034-FR","poi":{"name":"Kiosques à Pizzas","phone":"+33 3 26 09 33 55","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"456","streetName":"Avenue de Laon","municipalitySubdivision":"La Neuvillette","municipality":"Reims","countrySecondarySubdivision":"Marne","countrySubdivision":"Grand-Est","postalCode":"51100","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"456 Avenue de Laon, 51100 Reims","localName":"Reims"},"position":{"lat":49.28021,"lon":4.01364},"viewport":{"topLeftPoint":{"lat":49.28111,"lon":4.01226},"btmRightPoint":{"lat":49.27931,"lon":4.01502}},"entryPoints":[{"type":"main","position":{"lat":49.28018,"lon":4.01356}}]},{"type":"POI","id":"250009008106795","score":2.1454398632,"info":"search:ta:250009008106795-FR","poi":{"name":"Pizzeria Le Napoli","phone":"+33 3 87 07 81 77","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"124","streetName":"Rue Principale","municipality":"Berthelming","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57930","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"124 Rue Principale, 57930 Berthelming","localName":"Berthelming"},"position":{"lat":48.8186,"lon":7.0088},"viewport":{"topLeftPoint":{"lat":48.8195,"lon":7.00743},"btmRightPoint":{"lat":48.8177,"lon":7.01017}},"entryPoints":[{"type":"main","position":{"lat":48.81857,"lon":7.00884}}]},{"type":"POI","id":"250009008007538","score":2.1454398632,"info":"search:ta:250009008007538-FR","poi":{"name":"Mac and Pizz","phone":"+33 3 29 53 30 35","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"182","streetName":"Rue Ernest Charlier","municipality":"Sainte-Marguerite","countrySecondarySubdivision":"Vosges","countrySubdivision":"Grand-Est","postalCode":"88100","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"182 Rue Ernest Charlier, 88100 Sainte-Marguerite","localName":"Sainte-Marguerite"},"position":{"lat":48.27283,"lon":6.96934},"viewport":{"topLeftPoint":{"lat":48.27373,"lon":6.96799},"btmRightPoint":{"lat":48.27193,"lon":6.97069}},"entryPoints":[{"type":"main","position":{"lat":48.27335,"lon":6.96841}}]},{"type":"POI","id":"250009004304147","score":2.1454398632,"info":"search:ta:250009004304147-FR","poi":{"name":"Pizzeria San Remo","phone":"+33 3 29 56 69 79","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Rue Ernest Charlier","municipality":"Sainte-Marguerite","countrySecondarySubdivision":"Vosges","countrySubdivision":"Grand-Est","postalCode":"88100","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue Ernest Charlier, 88100 Sainte-Marguerite","localName":"Sainte-Marguerite"},"position":{"lat":48.27438,"lon":6.96622},"viewport":{"topLeftPoint":{"lat":48.27528,"lon":6.96487},"btmRightPoint":{"lat":48.27348,"lon":6.96757}},"entryPoints":[{"type":"main","position":{"lat":48.27438,"lon":6.96622}}]},{"type":"POI","id":"250009041045222","score":2.1454398632,"info":"search:ta:250009041045222-FR","poi":{"name":"La Boite a pizza","phone":"+33 3 87 36 20 20","categorySet":[{"id":7315036}],"url":"www.laboiteapizza.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"219B","streetName":"Avenue de Strasbourg","municipality":"Metz","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57070","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"219B Avenue de Strasbourg, 57070 Metz","localName":"Metz"},"position":{"lat":49.10363,"lon":6.21186},"viewport":{"topLeftPoint":{"lat":49.10453,"lon":6.21049},"btmRightPoint":{"lat":49.10273,"lon":6.21323}},"entryPoints":[{"type":"main","position":{"lat":49.10361,"lon":6.2118}}]},{"type":"POI","id":"250001002017870","score":2.1454398632,"info":"search:ta:250001002017870-FR","poi":{"name":"Star Pizza","phone":"+33 3 87 02 53 44","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"36","streetName":"Rue Victor Hugo","municipality":"Hundling","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57990","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"36 Rue Victor Hugo, 57990 Hundling","localName":"Hundling"},"position":{"lat":49.10705,"lon":6.97822},"viewport":{"topLeftPoint":{"lat":49.10795,"lon":6.97685},"btmRightPoint":{"lat":49.10615,"lon":6.97959}},"entryPoints":[{"type":"main","position":{"lat":49.10691,"lon":6.97749}}]},{"type":"POI","id":"250009041031285","score":2.1454398632,"info":"search:ta:250009041031285-FR","poi":{"name":"La Petite 500","phone":"+33 3 87 13 06 62","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"147","streetName":"Rue Nationale","municipality":"Stiring-Wendel","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57350","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"147 Rue Nationale, 57350 Stiring-Wendel","localName":"Stiring-Wendel"},"position":{"lat":49.20331,"lon":6.95094},"viewport":{"topLeftPoint":{"lat":49.20421,"lon":6.94956},"btmRightPoint":{"lat":49.20241,"lon":6.95232}},"entryPoints":[{"type":"main","position":{"lat":49.20336,"lon":6.95163}}]},{"type":"POI","id":"250009003052620","score":2.1454398632,"info":"search:ta:250009003052620-FR","poi":{"name":"Délice de la Laiterie","phone":"+33 3 88 32 77 70","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"25","streetName":"Rue de Molsheim","municipality":"Strasbourg","countrySecondarySubdivision":"Lower Rhine","countrySubdivision":"Great East","postalCode":"67000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"25 Rue de Molsheim, 67000 Strasbourg","localName":"Strasbourg"},"position":{"lat":48.57589,"lon":7.73164},"viewport":{"topLeftPoint":{"lat":48.57679,"lon":7.73028},"btmRightPoint":{"lat":48.57499,"lon":7.733}},"entryPoints":[{"type":"main","position":{"lat":48.57599,"lon":7.73144}}]}]}}],"summary":{"successfulRequests":1,"totalRequests":1}}, [
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
  'Ref A: 68036B06665847DA89FF595D3F4F9075 Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:49Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:48 GMT'
]);
