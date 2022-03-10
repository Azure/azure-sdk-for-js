let nock = require('nock');

module.exports.hash = "05425ef1c3b3c112a5ca015e138b7206";

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
  '527b8367-bc82-4d8a-9d28-f7bf43656a00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkaBm3JmpTRAglBY4-1lPF4; expires=Sat, 09-Apr-2022 06:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8V6Q5F128u6dY-UVoKG4C0a23x70SHJQ55DvTNBqRTM3fISXTNnQc2k37ZSogyqs6Ot2v8Cpdzu1JxTbKOZFv69CLKsOHvbHQziFe_J0F3tiD1NvoRBz_ZD-sRPMrKRfvR1NCnnPIwzvm6PMHWoq1AlTrnhbEJVmkCNaK2bnTxkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:12 GMT',
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
  '73a3b9a0-a8df-4d33-b493-752ce9199200',
  'x-ms-ests-server',
  '2.1.12529.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqwZ2BySIEFOottFrsj9DHE; expires=Sat, 09-Apr-2022 06:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcmysWGSF4_4eg5WQyAw6UaCHpOwRx9hYth51b4RoLPIsDWMsR6b2HvXcSFjom356ccUikdbOLDBo0KmM3s_ppWNe1lYLYsVNpU6QI7SOsT2qBny-0fPzTGsI1FdBlPwGvdI9RDMmt_GOisJY_QwDeoD_xqQj0C4T4jSVlBny29ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT',
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
  'dddef7d9-db3d-4baf-b41d-2b87390ed500',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvakIQBx3bJEtmVa951XEno; expires=Sat, 09-Apr-2022 06:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzDpbytT3h8-2T5wt0ASAdFXgJhQSkeFjsp1GF4RgsTZdPt7FnYKxToYWNr1sOEa6nsAB7q7LfTj10KIpl6gg4TXBrYtMgQiiRtILryz2cQVXD3UBhP4oS0kW728lpf4TupchKyo_O0I0LJDESrzUCHQqEciPI0kWBBkWShhim2wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2b9b3477-e968-4f1b-9267-b50fc13daa5d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '16e1b4e1-2b70-4247-bf37-52b7f0a4ca00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmCW16hNOshDlROf0mSHVTmr4fIWAQAAAOSSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=77dacb65-1a1a-4977-8871-5df923bd7dd1&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '744ff8bb-fb07-4485-a38e-fdc4bad3be00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ao4_N9k9_rRGtgxQ-fArkq-r4fIWAQAAAOSSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"query is missing or empty"}}, [
  'Content-Length',
  '73',
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
  'Ref A: 51C8B91B65DA47699EE1D322103F3C96 Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:13Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(200, {"summary":{"query":"burger","queryType":"NON_NEAR","queryTime":192,"numResults":10,"offset":0,"totalResults":10,"fuzzyLevel":1},"results":[{"type":"POI","id":"840539001131385","score":2.7889442444,"dist":2982.2653055700466,"query":"burger","info":"search:ta:840539001131385-US","poi":{"name":"Herfy's Burgers","phone":"+1 425-882-8668","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"8460","streetName":"164th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-1503","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"8460 164th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.67823,"lon":-122.12124},"viewport":{"topLeftPoint":{"lat":47.67913,"lon":-122.12258},"btmRightPoint":{"lat":47.67733,"lon":-122.1199}},"entryPoints":[{"type":"main","position":{"lat":47.67824,"lon":-122.12159}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjBjOWEwNGY5NjRhNTIwZjczZjIzZTM=","sourceName":"Foursquare"}]},"detourTime":-301,"detourDistance":-15161},{"type":"POI","id":"840539003143944","score":2.8276119232,"dist":269.1682087059635,"query":"burger","info":"search:ta:840539003143944-US","poi":{"name":"Burgers","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"15701","streetName":"Northeast 39th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5391","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15701 Northeast 39th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64376,"lon":-122.1281},"viewport":{"topLeftPoint":{"lat":47.64491,"lon":-122.12981},"btmRightPoint":{"lat":47.64261,"lon":-122.12639}},"entryPoints":[{"type":"main","position":{"lat":47.64491,"lon":-122.1281}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OWE1YmZlZDc1YTZlYTdmYTAxM2EyZmY=","sourceName":"Foursquare"}]},"detourTime":-298,"detourDistance":-20050},{"type":"POI","id":"840539000983176","score":2.7718887329,"dist":482.496255757968,"query":"burger","info":"search:ta:840539000983176-US","poi":{"name":"Gulliver's Burgers & Subs","phone":"+1 425-562-5115","categorySet":[{"id":7315015}],"categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"3080","streetName":"148th Avenue Southeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-6410","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3080 148th Avenue Southeast, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.58202,"lon":-122.14049},"viewport":{"topLeftPoint":{"lat":47.58319,"lon":-122.14222},"btmRightPoint":{"lat":47.58085,"lon":-122.13876}},"entryPoints":[{"type":"main","position":{"lat":47.58104,"lon":-122.14143}}],"detourTime":-194,"detourDistance":-13374},{"type":"POI","id":"840539003094440","score":2.7635133266,"dist":2585.32410333918,"query":"burger","info":"search:ta:840539003094440-US","poi":{"name":"Burgers N Gyros","categorySet":[{"id":7315023}],"categories":["indian","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"indian"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-4435","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.67332,"lon":-122.11981},"viewport":{"topLeftPoint":{"lat":47.67422,"lon":-122.12115},"btmRightPoint":{"lat":47.67242,"lon":-122.11847}},"entryPoints":[{"type":"main","position":{"lat":47.67339,"lon":-122.11979}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OTc1NjU3ZjI4NmZkYTM3YjllOWRjZDM=","sourceName":"Foursquare"}]},"detourTime":-189,"detourDistance":-15755},{"type":"POI","id":"840539000289900","score":2.7963263988,"dist":1178.917994126377,"query":"burger","info":"search:ta:840539000289900-US","poi":{"name":"Herfy's Burger","phone":"+1 425-641-2003","categorySet":[{"id":7315015}],"url":"www.yelp.com/biz/herfys-burgers-redmond-2","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"15167","streetName":"Northeast 24th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5544","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15167 Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63149,"lon":-122.1388},"viewport":{"topLeftPoint":{"lat":47.63239,"lon":-122.14013},"btmRightPoint":{"lat":47.63059,"lon":-122.13747}},"entryPoints":[{"type":"main","position":{"lat":47.63149,"lon":-122.1388}}],"detourTime":7,"detourDistance":-6784},{"type":"POI","id":"840539000634040","score":2.7678313255,"dist":1519.0817019821163,"query":"burger","info":"search:ta:840539000634040-US","poi":{"name":"Wayback Burgers","phone":"+1 425-644-1300","brands":[{"name":"Wayback Burgers"}],"categorySet":[{"id":7315015}],"url":"www.waybackburgers.com","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"1645","streetName":"140th Avenue Northeast","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1645 140th Avenue Northeast, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.62626,"lon":-122.15487},"viewport":{"topLeftPoint":{"lat":47.62716,"lon":-122.1562},"btmRightPoint":{"lat":47.62536,"lon":-122.15354}},"entryPoints":[{"type":"minor","position":{"lat":47.62645,"lon":-122.15446}},{"type":"main","position":{"lat":47.62579,"lon":-122.15377}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NDVlODdlOTQ5OGUzNmVlNTQ4MDhlODY=","sourceName":"Foursquare"}]},"detourTime":185,"detourDistance":-6089},{"type":"POI","id":"840539002313210","score":2.8714032173,"dist":6356.878096760807,"query":"burger","info":"search:ta:840539002313210-US","poi":{"name":"BURGER KING","phone":"+1 425-392-5011","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2318","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"1705","streetName":"Northwest Gilman Boulevard","municipalitySubdivision":"Newport","municipality":"Issaquah","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98027","extendedPostalCode":"98027-5314","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1705 Northwest Gilman Boulevard, Issaquah, WA 98027","localName":"Issaquah"},"position":{"lat":47.54539,"lon":-122.06367},"viewport":{"topLeftPoint":{"lat":47.54629,"lon":-122.065},"btmRightPoint":{"lat":47.54449,"lon":-122.06234}},"entryPoints":[{"type":"main","position":{"lat":47.54571,"lon":-122.06365}},{"type":"minor","position":{"lat":47.54547,"lon":-122.06367}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjE5N2UyY2Y5NjRhNTIwNTJkZTIzZTM=","sourceName":"Foursquare"}]},"detourTime":187,"detourDistance":6857},{"type":"POI","id":"840531000465149","score":2.898733139,"dist":161.17565489389224,"query":"burger","info":"search:ta:840531000465149-US","poi":{"name":"BURGER KING","phone":"+1 425-453-5775","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2700","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"11723","streetName":"Northeast 8th Street","municipalitySubdivision":"Willburton","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-3003","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"11723 Northeast 8th Street, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.61683,"lon":-122.18338},"viewport":{"topLeftPoint":{"lat":47.61773,"lon":-122.18471},"btmRightPoint":{"lat":47.61593,"lon":-122.18205}},"entryPoints":[{"type":"main","position":{"lat":47.61723,"lon":-122.1834}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjM2NzQyMmY5NjRhNTIwY2UzNTI1ZTM=","sourceName":"Foursquare"}]},"detourTime":198,"detourDistance":309},{"type":"POI","id":"840539002288639","score":2.7890250683,"dist":2963.10210231557,"query":"burger","info":"search:ta:840539002288639-US","poi":{"name":"Burgermaster","phone":"+1 425-827-9566","categorySet":[{"id":7315069}],"url":"burgermaster.biz","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"10606","streetName":"Northup Way","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-1418","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"10606 Northup Way, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.64224,"lon":-122.19906},"viewport":{"topLeftPoint":{"lat":47.64314,"lon":-122.20039},"btmRightPoint":{"lat":47.64134,"lon":-122.19773}},"entryPoints":[{"type":"main","position":{"lat":47.64205,"lon":-122.19927}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0NjRhM2MxMmY5NjRhNTIwYWQ0NjFmZTM=","sourceName":"Foursquare"}]},"detourTime":212,"detourDistance":1473},{"type":"POI","id":"840539002366655","score":2.7806251049,"dist":4895.0590447372215,"query":"burger","info":"search:ta:840539002366655-US","poi":{"name":"Burger Addict","phone":"+1 425-305-5572","categorySet":[{"id":7315069}],"url":"www.burgeraddict.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"hamburgers"}]}]},"address":{"streetNumber":"12016","streetName":"Northeast 85th Street","municipalitySubdivision":"North Rose Hill","municipality":"Kirkland","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98033","extendedPostalCode":"98033-8039","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"12016 Northeast 85th Street, Kirkland, WA 98033","localName":"Kirkland"},"position":{"lat":47.68023,"lon":-122.17996},"viewport":{"topLeftPoint":{"lat":47.68116,"lon":-122.18134},"btmRightPoint":{"lat":47.6793,"lon":-122.17858}},"entryPoints":[{"type":"main","position":{"lat":47.67931,"lon":-122.18013}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YjkxZTM1YmM1MzA5MzAwMzk2NzhlNDA=","sourceName":"Foursquare"}]},"detourTime":392,"detourDistance":3097}]}, [
  'Content-Length',
  '12459',
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
  'Ref A: 55F3CF1DAD0D40A9809463C4A8AAF580 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:34:13Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:13 GMT'
]);
