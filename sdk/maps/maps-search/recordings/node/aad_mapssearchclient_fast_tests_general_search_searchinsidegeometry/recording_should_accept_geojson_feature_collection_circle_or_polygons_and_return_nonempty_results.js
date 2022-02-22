let nock = require('nock');

module.exports.hash = "aa6043a3ed4f482113f3ea61ecf49894";

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
  '29f4aacc-9130-4113-8cc5-d5e28c641700',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhpnozKwkpJAsMLERcrE-GQ; expires=Thu, 24-Mar-2022 10:21:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMjSw685CutatArifnik7RybzCDlcWxnpJxz_y7AzprDGIkif6vFUKAkvhqEvI5q77Ke1CAxISCSIKpdYNiqBAcHYpxSeJgWU9AL4T-SKpg3rsrODgJ06PmnXfasUu27sLF7X8Hg2ltWziZyUOtFR9AG-kHM50ek4tVTiW7Ur3_UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:46 GMT',
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
  '9d5bd505-7f94-4b12-91c9-0132f0376501',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlnSMDncX8dPrmIQ5mmaI3k; expires=Thu, 24-Mar-2022 10:21:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrleoX1HywK0vjlINGGeesEJB2RmGpE49uHKahMg-3sSMAGOwFxf-vsJjXUjeX2vvIXF3vVR534fLR8LaMmgY2ZekBci5TC6TUJ4Y8u7MG4K5kKzaY4LxQJ3e1f8uMnqKWkN48F38YfYbqYaWUFm5RwNKtrD9nF433MQ1QYqs0n6QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=74b7b298-ebe7-4cf8-8b6d-87b3ecfd936e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2f8e8d6d-1acf-4f35-9e65-03c91687c500',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqCS5uvOIrJFr6R81iuEgymr4fIWAQAAADuwptkOAAAA; expires=Thu, 24-Mar-2022 10:21:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:46 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-121.43576049804686,38.7524152343544],[-121.43301391601562,38.70660472542312],[-121.36434936523438,38.712059855877314],[-121.43576049804686,38.7524152343544]]]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-121.43576049804686,38.7524152343544]},"properties":{"subType":"Circle","radius":5000}}]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":43,"numResults":3,"offset":0,"totalResults":3,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069019394045","score":2.1455082893,"info":"search:ta:840069019394045-US","poi":{"name":"Round Table Pizza","phone":"+1 916-723-8665","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/ex12","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"7909","streetName":"Walerga Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-5722","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"7909 Walerga Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71302,"lon":-121.36609},"viewport":{"topLeftPoint":{"lat":38.71421,"lon":-121.36762},"btmRightPoint":{"lat":38.71183,"lon":-121.36456}},"entryPoints":[{"type":"main","position":{"lat":38.71306,"lon":-121.36456}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTgyOTdkZDVjNWM5NzI4MzYzOGJkODI=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069009080627","score":2.1454348564,"info":"search:ta:840069009080627-US","poi":{"name":"Pizzeria Classico","phone":"+1 916-339-9244","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}]},{"type":"POI","id":"840069002628285","score":2.1454257965,"info":"search:ta:840069002628285-US","poi":{"name":"Mama Mia Pizza","phone":"+1 916-334-7200","categorySet":[{"id":7315036}],"url":"www.mamamiapizzaantelope.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3535","streetName":"Elverta Road","municipality":"Antelope","countrySecondarySubdivision":"Sacramento","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"95843","extendedPostalCode":"95843-4721","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3535 Elverta Road, Antelope, CA 95843","localName":"Antelope"},"position":{"lat":38.71883,"lon":-121.38094},"viewport":{"topLeftPoint":{"lat":38.71973,"lon":-121.38209},"btmRightPoint":{"lat":38.71793,"lon":-121.37979}},"entryPoints":[{"type":"main","position":{"lat":38.71848,"lon":-121.38091}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NmQzODM5N2NkMTAzMWFkN2I4MDAyZjk=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '3472',
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
  'Ref A: 45D2DD1C09D9403DBBBEAC166B2BFD1F Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:47Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:47 GMT'
]);
