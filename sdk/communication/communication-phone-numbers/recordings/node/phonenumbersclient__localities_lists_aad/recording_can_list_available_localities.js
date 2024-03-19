let nock = require('nock');

module.exports.hash = "3769e1b3639f7ded195b2a6c4943ea43";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/common/discovery/instance')
  .query(false)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - NCUS ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AsHp4hPZsOtMihE7AKDWXtg; expires=Sat, 07-Jan-2023 16:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcDYAJSjTS_56lZ9sDDz9oGZvBDh0o0ORAyFqCwQ0q9N3bF323UZebRIY1bvj1qxJSaxWxTIhOu6M1lxySsFRb2ukv3eS8ZAvjf2kyubxiXUagmaE0wgJZ6alt2FXNvDpotW-xXxyG2SwyLYi_DwJyK7woK6vtHA5hy27kUXBsH7y7T_1PBFn_5GwzN7VkW79g2NYE2dOVhgp10cfiTBflqIclqRnOsqqS0pTUGn_G18gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:51 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":false,"frontchannel_logout_supported":false,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/SomeTenantId/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - EUS ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Al4bhRDZAqlMrmqFBo9AyrM; expires=Sat, 07-Jan-2023 16:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfi2ylQn-nS11XK-LD_qO90Tys0-JzGTHgBxukjlnD09f31l0Kl5z8Fuo8V88JLTVfA6cFxH8pd77t6jGcrxppkc_D0B24bfmIjRFb5y4F0DVlPiDb8Q04kukwv8c4IuxLAuUZaLB3WRNnKuiGymhiDjdZa9zxmy2oL7G81FegHJSLHoZb8RsBF4k-Hi_QlOcynHFxAKUu1GZODEoVAKCN_6ZLQQzPK7IuxYB5pdnTc8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=sanitized&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ap6Vtfq0xiZImT0HdymUwhVWyo4SAQAAAKwBJNsOAAAA; expires=Sat, 07-Jan-2023 16:02:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:52 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/localities')
  .query(false)
  .reply(200, {"phoneNumberLocalities":[{"localizedName":"Anchorage","administrativeDivision":{"localizedName":"AK","abbreviatedName":"AK"}},{"localizedName":"Huntsville","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Mobile","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Montgomery","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Fort Smith","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Jonesboro","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Little Rock","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Phoenix","administrativeDivision":{"localizedName":"AZ","abbreviatedName":"AZ"}},{"localizedName":"Anaheim","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Burbank","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Concord","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Fresno","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Los Angeles","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Riverside","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Sacramento","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Salinas","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Diego","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Francisco","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Jose","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Barbara","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Clarita","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Rosa","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Stockton","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Truckee","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Washington DC","administrativeDivision":{"localizedName":"CL","abbreviatedName":"CL"}},{"localizedName":"Grand Junction","administrativeDivision":{"localizedName":"CO","abbreviatedName":"CO"}},{"localizedName":"Pueblo","administrativeDivision":{"localizedName":"CO","abbreviatedName":"CO"}},{"localizedName":"Bridgeport","administrativeDivision":{"localizedName":"CT","abbreviatedName":"CT"}},{"localizedName":"Hartford","administrativeDivision":{"localizedName":"CT","abbreviatedName":"CT"}},{"localizedName":"Wilmington","administrativeDivision":{"localizedName":"DE","abbreviatedName":"DE"}},{"localizedName":"Cape Coral","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Daytona Beach","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Fort Lauderdale","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Gainesville","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Jacksonville","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Lakeland","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Miami","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Orlando","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Sarasota","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"St. Petersburg","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Tampa","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"West Palm Beach","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Albany","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Atlanta","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Augusta","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Macon","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Savannah","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Honolulu","administrativeDivision":{"localizedName":"HI","abbreviatedName":"HI"}},{"localizedName":"Cedar Rapids","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Davenport","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Mason City","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Sioux City","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Boise","administrativeDivision":{"localizedName":"ID","abbreviatedName":"ID"}},{"localizedName":"Alton","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Aurora","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Champaign","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Chicago","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Cicero","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Rock Island","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Rockford","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Waukegan","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Evansville","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Fort Wayne","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Gary","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Indianapolis","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"South Bend","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Dodge City","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Kansas City","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Topeka","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Wichita","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Ashland","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Lexington","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Louisville","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Owensboro","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Baton Rouge","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Lafayette","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"New Orleans","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Shreveport","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Boston","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Chicopee","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Lynn","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Worcester","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Baltimore","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Bethesda","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Silver Spring","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Portland","administrativeDivision":{"localizedName":"ME","abbreviatedName":"ME"}},{"localizedName":"Ann Arbor","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Detroit","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Flint","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Grand Rapids","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Grant","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Lansing","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Pontiac","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Saginaw","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Sault Ste Marie","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Troy","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Alexandria","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Duluth","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Mankato","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Minneapolis","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}}],"nextLink":"/availablePhoneNumbers/countries/US/localities?skip=100&maxPageSize=100&api-version=2024-01-31-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'N8g0lMbPhkWi+gPt6jDzWQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2022-12-01',
  'X-Processing-Time',
  '697ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rAqSYwAAAAAB1r+HOTarQoLhu2uk1fQUTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/localities')
  .query(false)
  .reply(200, {"phoneNumberLocalities":[{"localizedName":"St. Paul","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Kansas City","administrativeDivision":{"localizedName":"MO","abbreviatedName":"MO"}},{"localizedName":"Marshall","administrativeDivision":{"localizedName":"MO","abbreviatedName":"MO"}},{"localizedName":"Springfield","administrativeDivision":{"localizedName":"MO","abbreviatedName":"MO"}},{"localizedName":"St. Charles","administrativeDivision":{"localizedName":"MO","abbreviatedName":"MO"}},{"localizedName":"Biloxi","administrativeDivision":{"localizedName":"MS","abbreviatedName":"MS"}},{"localizedName":"Jackson","administrativeDivision":{"localizedName":"MS","abbreviatedName":"MS"}},{"localizedName":"Starkville","administrativeDivision":{"localizedName":"MS","abbreviatedName":"MS"}},{"localizedName":"Billings","administrativeDivision":{"localizedName":"MT","abbreviatedName":"MT"}},{"localizedName":"Asheville","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Charlotte","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Fayetteville","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Greensboro","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Raleigh","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Rocky Mount","administrativeDivision":{"localizedName":"NC","abbreviatedName":"NC"}},{"localizedName":"Fargo","administrativeDivision":{"localizedName":"ND","abbreviatedName":"ND"}},{"localizedName":"Kearney","administrativeDivision":{"localizedName":"NE","abbreviatedName":"NE"}},{"localizedName":"Omaha","administrativeDivision":{"localizedName":"NE","abbreviatedName":"NE"}},{"localizedName":"All locations","administrativeDivision":{"localizedName":"NG","abbreviatedName":"NG"}},{"localizedName":"Manchester","administrativeDivision":{"localizedName":"NH","abbreviatedName":"NH"}},{"localizedName":"Atlantic City","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Camden","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Edison","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Elizabeth","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Jersey City","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Newark","administrativeDivision":{"localizedName":"NJ","abbreviatedName":"NJ"}},{"localizedName":"Albuquerque","administrativeDivision":{"localizedName":"NM","abbreviatedName":"NM"}},{"localizedName":"Las Cruces","administrativeDivision":{"localizedName":"NM","abbreviatedName":"NM"}},{"localizedName":"Las Vegas","administrativeDivision":{"localizedName":"NV","abbreviatedName":"NV"}},{"localizedName":"Reno","administrativeDivision":{"localizedName":"NV","abbreviatedName":"NV"}},{"localizedName":"Albany","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Brentwood","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Elmira","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Kingston","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"New York City","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Niagara Falls","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Rochester","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Syracuse","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Yonkers","administrativeDivision":{"localizedName":"NY","abbreviatedName":"NY"}},{"localizedName":"Akron","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Cincinnati","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Cleveland","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Columbus","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Dayton","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Toledo","administrativeDivision":{"localizedName":"OH","abbreviatedName":"OH"}},{"localizedName":"Lawton","administrativeDivision":{"localizedName":"OK","abbreviatedName":"OK"}},{"localizedName":"Oklahoma City","administrativeDivision":{"localizedName":"OK","abbreviatedName":"OK"}},{"localizedName":"Tulsa","administrativeDivision":{"localizedName":"OK","abbreviatedName":"OK"}},{"localizedName":"Portland","administrativeDivision":{"localizedName":"OR","abbreviatedName":"OR"}},{"localizedName":"New Castle","administrativeDivision":{"localizedName":"PA","abbreviatedName":"PA"}},{"localizedName":"Pittsburgh","administrativeDivision":{"localizedName":"PA","abbreviatedName":"PA"}},{"localizedName":"Weatherly","administrativeDivision":{"localizedName":"PA","abbreviatedName":"PA"}},{"localizedName":"Providence","administrativeDivision":{"localizedName":"RI","abbreviatedName":"RI"}},{"localizedName":"Charleston","administrativeDivision":{"localizedName":"SC","abbreviatedName":"SC"}},{"localizedName":"Columbia","administrativeDivision":{"localizedName":"SC","abbreviatedName":"SC"}},{"localizedName":"Sioux Falls","administrativeDivision":{"localizedName":"SD","abbreviatedName":"SD"}},{"localizedName":"Chattanooga","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Clarksville","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Jackson","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Knoxville","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Memphis","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Nashville","administrativeDivision":{"localizedName":"TN","abbreviatedName":"TN"}},{"localizedName":"Austin","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Bryan","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Corpus Christi","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Denton","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"El Paso","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Fort Worth","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Galveston","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Houston","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Huntsville","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Laredo","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Lubbock","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Medina","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Odessa","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"San Antonio","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Tyler","administrativeDivision":{"localizedName":"TX","abbreviatedName":"TX"}},{"localizedName":"Arlington","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Danville","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Lynchburg","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Richmond","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Roanoke","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Virginia Beach","administrativeDivision":{"localizedName":"VA","abbreviatedName":"VA"}},{"localizedName":"Brattleboro","administrativeDivision":{"localizedName":"VT","abbreviatedName":"VT"}},{"localizedName":"Montpelier","administrativeDivision":{"localizedName":"VT","abbreviatedName":"VT"}},{"localizedName":"Eau Claire","administrativeDivision":{"localizedName":"WI","abbreviatedName":"WI"}},{"localizedName":"Green Bay","administrativeDivision":{"localizedName":"WI","abbreviatedName":"WI"}},{"localizedName":"Kenosha","administrativeDivision":{"localizedName":"WI","abbreviatedName":"WI"}},{"localizedName":"Milwaukee","administrativeDivision":{"localizedName":"WI","abbreviatedName":"WI"}},{"localizedName":"Charleston","administrativeDivision":{"localizedName":"WV","abbreviatedName":"WV"}},{"localizedName":"Laramie","administrativeDivision":{"localizedName":"WY","abbreviatedName":"WY"}}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8xczHZ9qQEK38z2Qrf066Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2022-12-01',
  'X-Processing-Time',
  '711ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rQqSYwAAAADwJzjBjUazRpP+dL6WhQuDTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:53 GMT'
]);
