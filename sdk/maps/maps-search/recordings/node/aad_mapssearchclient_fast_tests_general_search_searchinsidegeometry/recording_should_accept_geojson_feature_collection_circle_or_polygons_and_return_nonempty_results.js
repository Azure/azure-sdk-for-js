let nock = require('nock');

module.exports.hash = "890fff943b2c02a7308843a8bbaed901";

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
  'cdab1f9a-4383-4729-9bc6-06ff16a41200',
  'x-ms-ests-server',
  '2.1.12559.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aqg__bNKtIpEsUNOR8A6uCQ; expires=Sat, 09-Apr-2022 06:34:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8ER9ZAUb8wFEIlhO2Iw-e4zupSdLaIsiGvTF-S8xa0-m-sALWrRqtzln_Uy4EiPtx_CTBPEdm1bjXtElRMjG1s3Q92Aq_nADYnFpURSRMMOjkVzIIJY66GI3chU3gQkLC67Fe2gVGPOY8059WYhQCtDfss3chqxC4AEIRSfbs-cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT',
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
  '58e75afe-1542-4592-a277-505ac855d200',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiYQjaJsvsFJoShC53ncLfA; expires=Sat, 09-Apr-2022 06:34:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCFXfd3vhhbievG9J3GW0WkYFYSBb-AvbSnILWQo5Dzn-8bqJ0f5CD27PWgZYDxpdZlXiv31WaofuksAivR2snNVekr7MCx1-2tLzKOxEhgyorhR_U010PBuLKCNW4wNuX3oeitl4P5W5gSbQjzDicGSySEERDRROoj3Ue4xrmL4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:17 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fe1c510d-3f5d-4837-8d2c-5a2d79d7a9b3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'c0e29847-7d64-47a6-8004-514be829b700',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsU8w2vKxWBBlnex7HVQNu-r4fIWAQAAAOiSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:17 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-121.43576049804686,38.7524152343544],[-121.43301391601562,38.70660472542312],[-121.36434936523438,38.712059855877314],[-121.43576049804686,38.7524152343544]]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-121.43576049804686,38.7524152343544]},"properties":{"subType":"Circle","radius":5000}}]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":5,"numResults":3,"offset":0,"totalResults":3,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069009080627","score":2.1454691887,"info":"search:ta:840069009080627-US","poi":{"name":"Pizzeria Classico","phone":"+1 916-339-9244","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}]},{"type":"POI","id":"840069019394045","score":2.1454443932,"info":"search:ta:840069019394045-US","poi":{"name":"Round Table Pizza","phone":"+1 916-723-8665","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/ex12","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7909","streetName":"Walerga Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-5722","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"7909 Walerga Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71302,"lon":-121.36609},"viewport":{"topLeftPoint":{"lat":38.71421,"lon":-121.36762},"btmRightPoint":{"lat":38.71183,"lon":-121.36456}},"entryPoints":[{"type":"main","position":{"lat":38.71306,"lon":-121.36456}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTgyOTdkZDVjNWM5NzI4MzYzOGJkODI=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069002628285","score":2.145421505,"info":"search:ta:840069002628285-US","poi":{"name":"Mama Mia Pizza","phone":"+1 916-334-7200","categorySet":[{"id":7315036}],"url":"www.mamamiapizzaantelope.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NmQzODM5N2NkMTAzMWFkN2I4MDAyZjk=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '3470',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,X-HTTP-Method-Override',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 7616A8A12E4D44EFA988DEDC20E344EA Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:17Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:17 GMT'
]);
