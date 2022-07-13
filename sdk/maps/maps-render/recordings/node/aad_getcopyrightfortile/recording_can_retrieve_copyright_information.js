let nock = require('nock');

module.exports.hash = "d4e73c8564839e6a4bec761c7936d0d5";

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
  '1e5aacf9-d3a8-40a3-bd88-20a804384600',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ap8JwuWPjaVHtT5N31nuTEE; expires=Fri, 12-Aug-2022 11:09:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtyV8Huj9h4TMH837tlB9hm_2hypqJmdMtdMmiJHWVejfLJq6dZ9BVLNMGIScc2gLrvsnn4FuJrdWXhWQpkSkXp7-M3bjxEFhLqXSfyZgY3OOoGFw4s15mUSdfldXmuhbjrhp7A4ZRK8k3cIqwoluYTUMV1147vv1VowdEuLTUAMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:35 GMT',
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
  '53b6235c-c529-4a7e-ae94-ffcf7d418a00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Agz35Ll_4xpKq0psrCvc4j0; expires=Fri, 12-Aug-2022 11:09:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevro6MMjrGR97fltvm17wUzvdJOKO_PCQeKUjcqF9L-Apr-o4IpCAvZ1LlzL_dIfBO3yH8ddedOwDAST1FYamQEvi0Rff8PQ6Yb5WoLpAd0iazaxRM3vJ-GS4Ts0doiPd7VpLqFDonhU_-NnNwtcwM_iTLTGrGG1wxse_WDgzgml0AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=69950e0e-9033-4186-9b03-9438cecbee18&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '897f5f86-1af6-4edd-a23f-9fc659efa300',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgldXKq0B6dMqM_8i-M80DrhHQjEAQAAAPCeYNoOAAAA; expires=Fri, 12-Aug-2022 11:09:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jul 2022 11:09:36 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/map/copyright/tile/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","generalCopyrights":["© 1992 - 2022 TomTom. All rights reserved. This material is proprietary and the subject of copyright protection, database right protection and other intellectual property rights owned by TomTom or its suppliers. The use of this material is subject to the terms of a license agreement. Any unauthorized copying or disclosure of this material will lead to criminal and civil liabilities.","Data Source © 2022 TomTom","based on"],"regions":[{"country":{"ISO3":"CAN","label":"Canada"},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis).","© 1992 – 2021 TomTom. All rights reserved. This material is proprietary and the subject of copyright protection and other intellectual property rights owned or licensed to TomTom. The product includes information copied with permission from Canadian authorities, including © Canada Post Corporation. All rights reserved. The use of this material is subject to the terms of a License Agreement. You will be held liable for any unauthorized copying or disclosure of this material.","The following copyright notice applies to the use of Post- FSA layer and 6-digit layer:  © 1992 – 2021 TomTom. All rights reserved. This material is proprietary and the subject of copyright protection and other intellectual property rights owned or licensed to TomTom. The product includes information copied with permission from Canadian authorities, including © Canada Post Corporation, All rights reserved. The use of this material is subject to the terms of a License Agreement. You will be held liable for any unauthorized copying or disclosure of this material.  The following copyright notice applies to the use of Points of Interest:  © 1992 – 2021 TomTom. All rights reserved. Portions of the POI database contained in Points of Interest North America have been provided by Neustar Localeze  The following copyright notice applies to the use of Telecommunications:  © 2021 Pitney Bowes Software Inc. All rights reserved. This product contains information and/or data of iconectiv, licensed to be included herein. Copyright © 2021 iconectiv. All rights reserved.  The following copyright notice applies to the use of Logistics:  © 1992 – 2021 TomTom. Truck Attribute Data © 2004 - 2021 ProMiles Software Development Corporation. All rights reserved. This material is proprietary and the subject of copyright protection and other intellectual property rights owned or licensed to TomTom.","The 6-digit alpha/numeric Canadian Postal Codes contained in any Licensed Product cannot be used for bulk mailing of items through the Canadian postal system. Furthermore, the 6-digit alpha/numeric Canadian Postal Codes must be wholly contained in the Authorized Application and shall not be extractable. Canadian Postal Codes cannot be displayed or used for postal code look-up on the Internet, nor can they be extracted or exported from any application to be utilized in the creation of any other data set or application. Notwithstanding the above, an End User may optionally correct or derive Canadian Postal Codes using the Authorized Application, but only as part of the address information for locations (e.g.: of delivery points and depots) that have been set up in the Authorized Application, and optionally extract data for fleet management purposes.","This product contains information adapted from Statistics Canada: Boundary Files, 2016 Census; Road Network File, 2018; and Census Population and Dwelling Count Highlight Tables, 2016 Census. This does not constitute an endorsement by Statistics Canada of this product.","Contains information licensed under Open Government Licence – Canada.","Contains data made available by GeoNames licensed under CC-BY 4.0. For more information visit http://www.geonames.org/.","Contains information provided by TransLink (South Coast British Columbia Transportation Authority) under the modified open GTFS Data Terms of Use Agreement. For specifics: https://developer.translink.ca/ServicesGtfs/GtfsData","Contains information licensed under Open Government Licence:  * Vancouver  * City of Victoria  * British Columbia  * City of Surrey  * Kamloops  * Nanaimo  * City of Westminster  * City of Prince George  * Burnaby  * City of Kelowna  * Maple Ridge  * North Vancouver"]},{"country":{"ISO3":"OCP","label":""},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis)."]},{"country":{"ISO3":"OUP","label":""},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis)."]},{"country":{"ISO3":"USA","label":"United States"},"copyrights":["You agree to include as soon as practically possible, but no later than the first new release of the Authorized Application following Your receipt of any 3D Landmarks, any copyright notices related to the display of such landmarks on every Authorized Application and in the “about box” of the Authorized Application.  Notwithstanding the aforementioned, TomTom has the right to decide, at its sole discretion, to remove specific 3D Landmarks in subsequent releases of the Licensed Products. In such case, You will remove those 3D Landmarks from the Authorized Application as soon as practically possible, but not later than the first new release of the Authorized Application following Your receipt of the Update to the Licensed Product. TomTom shall not be held responsible for any possible damages, costs or expenses incurred by You related to such removal of a 3D Landmark by TomTom from the Licensed Product or failure to remove a 3D Landmark by You from the Authorized Application.","TomTom hereby grants to You a non-exclusive, non-transferable license to use the Software Licensed Products for the sole and limited purpose of assisting You in viewing, analyzing and sectioning the Licensed Products. In no event shall You use the Software Licensed Products to view, analyze, section or in any way manipulate spatial map data that is not provided by TomTom. You shall not derive or attempt to derive the source code of all or any portion of the Licensed Products by reverse engineering, disassembly, decompilation, translation or any other means. You shall affix the following copyright notice on any copy of the GDF Viewer, or any portion of the Licensed Products: “Software ©2011-2020 TomTom North America, Inc. All rights reserved.","Neither the Data nor the Licensed Products such as Speed Profiles or TomTom Traffic or any derivatives thereof shall be used for the purpose of enforcement of traffic laws including but not limited to the selection of potential locations for the installation of speed cameras, speed traps or other speed tracking devices. With regards to Speed Profiles, You acknowledge and agrees that the actual speeds may not reflect the legally imposed speed limits.","You specifically agree that it shall not: (i) store the data for more than twenty-four (24) hours on Your servers; (ii) broadcast or make Live Services Licensed Products available except to authorized End Users; and (iii) use the feed or information received via the feed for historical data purposes (including but not limited to collection or analysis).","The following copyright notice applies to the use of Post- FSA layer and 6-digit layer:  © 1992 – 2021 TomTom. All rights reserved. This material is proprietary and the subject of copyright protection and other intellectual property rights owned or licensed to TomTom. The product includes information copied with permission from Canadian authorities, including © Canada Post Corporation, All rights reserved. The use of this material is subject to the terms of a License Agreement. You will be held liable for any unauthorized copying or disclosure of this material.  The following copyright notice applies to the use of Points of Interest:  © 1992 – 2021 TomTom. All rights reserved. Portions of the POI database contained in Points of Interest North America have been provided by Neustar Localeze  The following copyright notice applies to the use of Telecommunications:  © 2021 Pitney Bowes Software Inc. All rights reserved. This product contains information and/or data of iconectiv, licensed to be included herein. Copyright © 2021 iconectiv. All rights reserved.  The following copyright notice applies to the use of Logistics:  © 1992 – 2021 TomTom. Truck Attribute Data © 2004 - 2021 ProMiles Software Development Corporation. All rights reserved. This material is proprietary and the subject of copyright protection and other intellectual property rights owned or licensed to TomTom.","© United States Postal Service 2021","You shall not use the Municipal Boundary layer of the Administrative Areas product to create or derive applications which are used by third parties for the purpose of tariff, tax jurisdiction, or tax rate determination for a particular address or range of addresses.","This product is built on basis on the following elevation data: SRTM, GTOPO, NED data available from the US Geological Survey: https://lta.cr.usgs.gov/products_overview","This product is built on basis on the following elevation data: 2-minute Gridded Global Relief Data (ETOPO2v2) available from U.S. Department of Commerce, National Oceanic and Atmospheric Administration, National Geophysical Data Center: http://www.ngdc.noaa.gov/mgg/fliers/06mgg01.html","Contains data made available by City of Everett, WA with the following disclaimer:","\"The data made available here has been modified for use from its original source, which is the City of Everett. Neither the City of Everett nor the Information Technology Department makes any claims as to the completeness, timeliness, accuracy or content of any data contained in this application; makes any representation of any kind, including, but not limited to, warranty of the accuracy or fitness for a particular use; nor are any such warranties to be implied or inferred with respect to the information or data furnished herein. The data is subject to change as modifications and updates are complete. It is understood that the information contained in the web feed is being used at one's own risk.\" For specifics, please reference: https://data.everettwa.gov/"]}]}, [
  'Cache-Control',
  'max-age=86400',
  'Content-Length',
  '18516',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"9de0508ecdba66c786311c93a8d63f16"',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: D95D2FB6FAEE405E932A7043C6752462 Ref B: TPE30EDGE0713 Ref C: 2022-07-13T11:09:36Z',
  'Date',
  'Wed, 13 Jul 2022 11:09:35 GMT'
]);
