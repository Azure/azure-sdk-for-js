let nock = require('nock');

module.exports.hash = "05ffdc1393c4997708ce30985a32a816";

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
  '80754d9a-f20b-4569-849c-1b7295a5e700',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjWls1vupJdIqB3zi75t6ss; expires=Fri, 12-Aug-2022 11:09:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8kpa6MkJv-lzIb1pWWskhAniS6wX4vW-qt3VzUST-3GbphCb5HvZ68AGgPv_9qkJ9NU_LIOL_oAghWjMLbILUwllw0ReAaBVHTs7tpdKQgGd3zWRUqmlVDyCqyfMc1L2nJNXrtX44pmAaW2OiaYRYS9zxgUXYps8KUKQ7sFyTA0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:38 GMT',
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
  'a6d40fe0-ba3e-4d75-aabb-3b307301a200',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoJQAFwBnfNHs9-oaw2OcFs; expires=Fri, 12-Aug-2022 11:09:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrP-zoqHSPxRZFLq4wd5FYneXqgyaahyP7wZvoGjDdEEzzQSvmaKjv8RYSDZ2GnLw8nibSN3tKIRPYLdEegw8JRzK0H3D8N_0O7CG0bLDzmo-E8hU40fvEuQm3s8TrGgD3SqZq_qThbl_Z9HPIIWRFNAq7PJ6Hg1IQtEtuloPqdKogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0ff08da3-78cd-428a-8324-8e925ee471d3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'c09b91c2-e6a1-4532-8759-299fd2fa5c00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Asz6q7W5oE1NnFF4z-0ymvHhHQjEAQAAAPKeYNoOAAAA; expires=Fri, 12-Aug-2022 11:09:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:38 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/copyright/bounding/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","generalCopyrights":["© 1992 - 2022 TomTom. All rights reserved. This material is proprietary and the subject of copyright protection, database right protection and other intellectual property rights owned by TomTom or its suppliers. The use of this material is subject to the terms of a license agreement. Any unauthorized copying or disclosure of this material will lead to criminal and civil liabilities.","Data Source © 2022 TomTom","based on"],"regions":[{"country":{"ISO3":"NLD","label":"Netherlands"},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis).","Contains data licensed under CC-BY 4.0. For more information visit:  * Kadaster Top10NL http://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/29d5310f-dd0d-45ba-abad-b4ffc6b8785f?tab=general  * Kadaster BGT http://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/2cb4769c-b56e-48fa-8685-c48f61b9a319?tab=general  * CBS Bestand Bodemgebruik http://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/2d3dd6d2-2d2b-4b5f-9e30-86e19ed77a56?tab=general","Contains data licensed under CC-BY 2.0. For more information visit:  * Municipality of Amsterdam Datasets Parkeergarages https://data.amsterdam.nl/index.html#?dte=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fcatalogus%2Fapi%2F3%2Faction%2Fpackage_show%3Fid%3Df06f5a77-04f6-432f-9fd9-ce9d740631aa&dtfs=T&mpb=topografie&mpz=9&mpv=52.3719:4.9012","Contains data licensed under CC-BY 3.0. For more information visit:  * Municipality of Amsterdam Multiple cat POI's https://data.amsterdam.nl/index.html#?dsd=dcatd&dsp=1&dsq=open%2520data&dsv=CATALOG&mpb=topografie&mpz=11&mpv=52.3731081:4.8932945","This product contains public transport stops data made available under 9292 Open Data framework as documented on March 2013. This is specified in their terms available here: http://9292opendata.org/sla","This product contains traffic incident information made available by NDW under open source data policy: https://www.ndw.nu/pagina/nl/103/datalevering/120/open_data/"]},{"country":{"ISO3":"ONL","label":""},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis)."]}]}, [
  'Cache-Control',
  'max-age=86400',
  'Content-Length',
  '7582',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"d6959e64c4fed1e434c1f802c0669fbe"',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 761286E7939441269CF387A9DCD86D20 Ref B: TPE30EDGE0713 Ref C: 2022-07-13T11:09:39Z',
  'Date',
  'Wed, 13 Jul 2022 11:09:38 GMT'
]);
