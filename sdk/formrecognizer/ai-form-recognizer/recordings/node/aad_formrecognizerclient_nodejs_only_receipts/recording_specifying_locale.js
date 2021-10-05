let nock = require('nock');

module.exports.hash = "6df42162217fd469b45135e4b1a1fc5c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'eab49a23-30f5-4ff8-8e85-c93a79982200',
  'x-ms-ests-server',
  '2.1.12071.28 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArO68p58Hz9Ei_CLthEPfHA; expires=Wed, 03-Nov-2021 18:20:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV1o1WD6HcQWREuXg4nVNpheLL3mrPe_Ew_ay82CuEw7FjLPmsKdL_qoAAkHOjayRCDqxDHve1iS8LnWOl0sr0VvBEFw85iDeIks35YTtMD6tsWaoqeo5nZD2Sos2MpKGCYvehibZYK3ZaEt5D4kg9ubeYeDXAReh9UhnbndUNlcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:31 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '3cb0ced2-555f-48a3-b1e4-319705e14d00',
  'x-ms-ests-server',
  '2.1.12071.28 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiEzgfSg0v1EmXEGSsiMCK8; expires=Wed, 03-Nov-2021 18:20:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrt3_UXtkVBDn3PRmVkxTfAiOE4h-fMicM8IxvEvyTCYkQhVC4x83bVpWN_sJfHC3_qfRz8aG7j8AH4aXk0LrGivrqikpVETl5W_dLBblIcaaEG_A3PkgGStQjTKqZ0KSG5WTXZ_vjjF4ic9YDAojDLCwzQrEX1V94_de1oALfsmsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:31 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e402a222-d03a-42f3-a887-bca56d491a77&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '511996ed-38c2-4eb7-9c95-23b8cf865000',
  'x-ms-ests-server',
  '2.1.12071.28 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq2DQsn5AsBDk1lnoPqkAumU1ubLAQAAAO887dgOAAAA; expires=Wed, 03-Nov-2021 18:20:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 04 Oct 2021 18:20:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels/prebuilt-receipt:analyze', {"urlSource":"https://storageaccount/testingdata/contoso-allinone.jpg?sastoken"})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/documentModels/prebuilt-receipt/analyzeResults/10e5625e-4ca4-40af-aa94-4d6cc4924f66?api-version=2021-09-30-preview',
  'x-envoy-upstream-service-time',
  '416',
  'apim-request-id',
  '10e5625e-4ca4-40af-aa94-4d6cc4924f66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-receipt/analyzeResults/10e5625e-4ca4-40af-aa94-4d6cc4924f66')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:20:32Z","lastUpdatedDateTime":"2021-10-04T18:20:32Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '3a4f2dfb-3bfc-4eba-b770-bc754da8067b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-receipt/analyzeResults/10e5625e-4ca4-40af-aa94-4d6cc4924f66')
  .query(true)
  .reply(200, {"status":"running","createdDateTime":"2021-10-04T18:20:32Z","lastUpdatedDateTime":"2021-10-04T18:20:32Z"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9f0fbb73-9be3-40e0-8e33-1eb129107376',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels/prebuilt-receipt/analyzeResults/10e5625e-4ca4-40af-aa94-4d6cc4924f66')
  .query(true)
  .reply(200, {"status":"succeeded","createdDateTime":"2021-10-04T18:20:32Z","lastUpdatedDateTime":"2021-10-04T18:20:35Z","analyzeResult":{"apiVersion":"2021-09-30-preview","modelId":"prebuilt-receipt","stringIndexType":"textElements","content":"Contoso\nContoso\n123 Main Street\nRedmond, WA 98052\n987-654-3210\n6/10/2019 13:59\nSales Associate: Paul\n-\n1 Cappuccino\n1 BACON & EGGS\n$2.20\nSunny-side-up\n$9.5\n-\nSub-Total\n$ 11.70\nTax\n1.17\nTip\nTotal\n$ 1.63\n$14,50","pages":[{"pageNumber":1,"angle":0.9597,"width":1688,"height":3000,"unit":"pixel","words":[{"content":"Contoso","boundingBox":[633,505,1067,460,1083,561,631,600],"confidence":0.993,"span":{"offset":0,"length":7}},{"content":"Contoso","boundingBox":[311,573,515,625,502,681,297,632],"confidence":0.681,"span":{"offset":8,"length":7}},{"content":"123","boundingBox":[303,677,377,695,366,759,292,740],"confidence":0.99,"span":{"offset":16,"length":3}},{"content":"Main","boundingBox":[389,698,517,727,506,792,378,762],"confidence":0.991,"span":{"offset":20,"length":4}},{"content":"Street","boundingBox":[529,730,694,768,683,829,518,794],"confidence":0.997,"span":{"offset":25,"length":6}},{"content":"Redmond,","boundingBox":[294,787,541,831,535,902,282,850],"confidence":0.943,"span":{"offset":32,"length":8}},{"content":"WA","boundingBox":[554,833,634,842,630,913,548,904],"confidence":0.998,"span":{"offset":41,"length":2}},{"content":"98052","boundingBox":[648,844,818,855,818,919,644,914],"confidence":0.99,"span":{"offset":44,"length":5}},{"content":"987-654-3210","boundingBox":[275,1006,648,1055,643,1120,268,1072],"confidence":0.989,"span":{"offset":50,"length":12}},{"content":"6/10/2019","boundingBox":[265,1227,511,1247,507,1329,259,1313],"confidence":0.99,"span":{"offset":63,"length":9}},{"content":"13:59","boundingBox":[527,1248,677,1262,673,1337,523,1330],"confidence":0.995,"span":{"offset":73,"length":5}},{"content":"Sales","boundingBox":[258,1351,409,1365,405,1427,253,1411],"confidence":0.995,"span":{"offset":79,"length":5}},{"content":"Associate:","boundingBox":[422,1366,704,1379,703,1443,418,1428],"confidence":0.853,"span":{"offset":85,"length":10}},{"content":"Paul","boundingBox":[716,1379,859,1380,860,1443,716,1443],"confidence":0.991,"span":{"offset":96,"length":4}},{"content":"-","boundingBox":[255,1499,263,1500,262,1514,253,1513],"confidence":0.483,"span":{"offset":101,"length":1}},{"content":"1","boundingBox":[243,1582,283,1585,276,1667,236,1662],"confidence":0.993,"span":{"offset":103,"length":1}},{"content":"Cappuccino","boundingBox":[300,1586,658,1605,653,1689,293,1670],"confidence":0.988,"span":{"offset":105,"length":10}},{"content":"1","boundingBox":[230,1839,275,1839,272,1916,227,1915],"confidence":0.996,"span":{"offset":116,"length":1}},{"content":"BACON","boundingBox":[295,1840,500,1842,499,1919,292,1917],"confidence":0.995,"span":{"offset":118,"length":5}},{"content":"&","boundingBox":[515,1842,560,1843,559,1919,514,1919],"confidence":0.98,"span":{"offset":124,"length":1}},{"content":"EGGS","boundingBox":[575,1843,736,1844,736,1917,575,1919],"confidence":0.991,"span":{"offset":126,"length":4}},{"content":"$2.20","boundingBox":[1108,1583,1264,1574,1269,1649,1112,1659],"confidence":0.995,"span":{"offset":131,"length":5}},{"content":"Sunny-side-up","boundingBox":[345,1979,748,1978,747,2060,345,2054],"confidence":0.993,"span":{"offset":137,"length":13}},{"content":"$9.5","boundingBox":[1135,1954,1266,1954,1266,2036,1135,2035],"confidence":0.982,"span":{"offset":151,"length":4}},{"content":"-","boundingBox":[224,2145,233,2145,232,2159,224,2159],"confidence":0.939,"span":{"offset":156,"length":1}},{"content":"Sub-Total","boundingBox":[438,2236,765,2225,768,2317,440,2325],"confidence":0.993,"span":{"offset":158,"length":9}},{"content":"$","boundingBox":[1108,2221,1121,2221,1120,2315,1108,2314],"confidence":0.002,"span":{"offset":168,"length":1}},{"content":"11.70","boundingBox":[1139,2221,1302,2222,1302,2316,1139,2315],"confidence":0.983,"span":{"offset":170,"length":5}},{"content":"Tax","boundingBox":[438,2367,560,2364,563,2456,440,2459],"confidence":0.994,"span":{"offset":176,"length":3}},{"content":"1.17","boundingBox":[1181,2354,1311,2355,1311,2453,1180,2452],"confidence":0.995,"span":{"offset":180,"length":4}},{"content":"Tip","boundingBox":[432,2500,544,2497,547,2603,434,2606],"confidence":0.992,"span":{"offset":185,"length":3}},{"content":"Total","boundingBox":[433,2656,602,2648,606,2736,436,2744],"confidence":0.993,"span":{"offset":189,"length":5}},{"content":"$","boundingBox":[1011,2476,1048,2477,1046,2593,1010,2592],"confidence":0.956,"span":{"offset":195,"length":1}},{"content":"1.63","boundingBox":[1071,2477,1285,2481,1284,2597,1069,2593],"confidence":0.032,"span":{"offset":197,"length":4}},{"content":"$14,50","boundingBox":[1024,2621,1377,2639,1371,2760,1018,2742],"confidence":0.654,"span":{"offset":202,"length":6}}],"lines":[{"content":"Contoso","boundingBox":[630,504,1092,456,1103,565,631,600],"spans":[{"offset":0,"length":7}]},{"content":"Contoso","boundingBox":[310,573,516,624,503,681,297,631],"spans":[{"offset":8,"length":7}]},{"content":"123 Main Street","boundingBox":[303,677,697,769,684,829,291,740],"spans":[{"offset":16,"length":15}]},{"content":"Redmond, WA 98052","boundingBox":[291,786,819,856,815,919,282,867],"spans":[{"offset":32,"length":17}]},{"content":"987-654-3210","boundingBox":[275,1005,651,1055,645,1120,268,1071],"spans":[{"offset":50,"length":12}]},{"content":"6/10/2019 13:59","boundingBox":[264,1227,681,1258,675,1337,259,1311],"spans":[{"offset":63,"length":15}]},{"content":"Sales Associate: Paul","boundingBox":[256,1351,861,1380,859,1443,253,1421],"spans":[{"offset":79,"length":21}]},{"content":"-","boundingBox":[255,1499,281,1502,279,1516,253,1513],"spans":[{"offset":101,"length":1}]},{"content":"1 Cappuccino","boundingBox":[240,1582,660,1604,654,1689,236,1671],"spans":[{"offset":103,"length":12}]},{"content":"1 BACON & EGGS","boundingBox":[226,1838,738,1841,737,1919,226,1917],"spans":[{"offset":116,"length":14}]},{"content":"$2.20","boundingBox":[1108,1583,1267,1574,1272,1648,1114,1659],"spans":[{"offset":131,"length":5}]},{"content":"Sunny-side-up","boundingBox":[344,1977,748,1978,748,2060,344,2058],"spans":[{"offset":137,"length":13}]},{"content":"$9.5","boundingBox":[1135,1954,1267,1954,1268,2036,1135,2034],"spans":[{"offset":151,"length":4}]},{"content":"-","boundingBox":[224,2145,248,2146,248,2160,224,2159],"spans":[{"offset":156,"length":1}]},{"content":"Sub-Total","boundingBox":[438,2234,768,2225,771,2315,440,2325],"spans":[{"offset":158,"length":9}]},{"content":"$ 11.70","boundingBox":[1108,2221,1305,2223,1304,2316,1109,2315],"spans":[{"offset":168,"length":7}]},{"content":"Tax","boundingBox":[438,2369,563,2364,564,2456,442,2458],"spans":[{"offset":176,"length":3}]},{"content":"1.17","boundingBox":[1174,2354,1316,2355,1317,2453,1175,2452],"spans":[{"offset":180,"length":4}]},{"content":"Tip","boundingBox":[432,2500,549,2497,551,2602,434,2606],"spans":[{"offset":185,"length":3}]},{"content":"Total","boundingBox":[433,2657,608,2648,611,2736,436,2743],"spans":[{"offset":189,"length":5}]},{"content":"$ 1.63","boundingBox":[1011,2476,1311,2481,1307,2597,1010,2592],"spans":[{"offset":195,"length":6}]},{"content":"$14,50","boundingBox":[1025,2621,1383,2639,1382,2762,1018,2743],"spans":[{"offset":202,"length":6}]}],"spans":[{"offset":0,"length":208}]}],"styles":[{"isHandwritten":true,"confidence":0.9,"spans":[{"offset":195,"length":6}]},{"isHandwritten":true,"confidence":0.95,"spans":[{"offset":202,"length":6}]}],"documents":[{"docType":"prebuilt:receipt","boundingRegions":[{"pageNumber":1,"boundingBox":[0,0,1688,0,1688,3000,0,3000]}],"fields":{"Items":{"type":"array","valueArray":[{"type":"object","valueObject":{"Name":{"type":"string","valueString":"Cappuccino","content":"Cappuccino","boundingRegions":[{"pageNumber":1,"boundingBox":[300,1586,658,1605,653,1689,293,1670]}],"confidence":0.978,"spans":[{"offset":105,"length":10}]},"Quantity":{"type":"number","valueNumber":1,"content":"1","boundingRegions":[{"pageNumber":1,"boundingBox":[243,1582,283,1585,276,1667,236,1662]}],"confidence":0.976,"spans":[{"offset":103,"length":1}]},"TotalPrice":{"type":"number","valueNumber":2.2,"content":"$2.20","boundingRegions":[{"pageNumber":1,"boundingBox":[1108,1583,1264,1574,1269,1649,1112,1659]}],"confidence":0.987,"spans":[{"offset":131,"length":5}]}}},{"type":"object","valueObject":{"Name":{"type":"string","valueString":"BACON & EGGS","content":"BACON & EGGS","boundingRegions":[{"pageNumber":1,"boundingBox":[293,1840,737,1844,736,1921,292,1917]}],"confidence":0.974,"spans":[{"offset":118,"length":12}]},"Quantity":{"type":"number","valueNumber":1,"content":"1","boundingRegions":[{"pageNumber":1,"boundingBox":[230,1839,275,1839,272,1916,227,1915]}],"confidence":0.982,"spans":[{"offset":116,"length":1}]},"TotalPrice":{"type":"number","valueNumber":9.5,"content":"$9.5","boundingRegions":[{"pageNumber":1,"boundingBox":[1135,1954,1266,1954,1266,2036,1135,2035]}],"confidence":0.987,"spans":[{"offset":151,"length":4}]}}}]},"Locale":{"type":"string","valueString":"en-IN","confidence":1},"MerchantAddress":{"type":"string","valueString":"123 Main Street Redmond, WA 98052","content":"123 Main Street Redmond, WA 98052","boundingRegions":[{"pageNumber":1,"boundingBox":[303,677,845,797,808,966,266,846]}],"confidence":0.974,"spans":[{"offset":16,"length":33}]},"MerchantName":{"type":"string","valueString":"Contoso","content":"Contoso","boundingRegions":[{"pageNumber":1,"boundingBox":[311,573,515,625,502,681,297,632]}],"confidence":0.979,"spans":[{"offset":8,"length":7}]},"MerchantPhoneNumber":{"type":"phoneNumber","valuePhoneNumber":"+919876543210","content":"987-654-3210","boundingRegions":[{"pageNumber":1,"boundingBox":[275,1006,648,1055,643,1120,268,1072]}],"confidence":0.989,"spans":[{"offset":50,"length":12}]},"ReceiptType":{"type":"string","valueString":"Itemized","confidence":0.96},"Subtotal":{"type":"number","valueNumber":11.7,"content":"$ 11.70","boundingRegions":[{"pageNumber":1,"boundingBox":[1108,2214,1306,2222,1302,2322,1104,2314]}],"confidence":0.942,"spans":[{"offset":168,"length":7}]},"Tax":{"type":"number","valueNumber":1.17,"content":"1.17","boundingRegions":[{"pageNumber":1,"boundingBox":[1181,2354,1311,2355,1311,2453,1180,2452]}],"confidence":0.988,"spans":[{"offset":180,"length":4}]},"Tip":{"type":"number","valueNumber":1.63,"content":"1.63","boundingRegions":[{"pageNumber":1,"boundingBox":[1071,2477,1285,2481,1284,2597,1069,2593]}],"confidence":0.977,"spans":[{"offset":197,"length":4}]},"Total":{"type":"number","valueNumber":14.5,"content":"$14,50","boundingRegions":[{"pageNumber":1,"boundingBox":[1024,2621,1377,2639,1371,2760,1018,2742]}],"confidence":0.978,"spans":[{"offset":202,"length":6}]},"TransactionDate":{"type":"date","valueDate":"2019-10-06","content":"6/10/2019","boundingRegions":[{"pageNumber":1,"boundingBox":[265,1227,511,1247,507,1329,259,1313]}],"confidence":0.99,"spans":[{"offset":63,"length":9}]},"TransactionTime":{"type":"time","valueTime":"13:59:00","content":"13:59","boundingRegions":[{"pageNumber":1,"boundingBox":[527,1248,677,1262,673,1337,523,1330]}],"confidence":0.988,"spans":[{"offset":73,"length":5}]}},"confidence":1,"spans":[{"offset":0,"length":208}]}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'd4b1e68d-b22d-4b4c-89ff-de1574aec758',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:20:37 GMT'
]);
