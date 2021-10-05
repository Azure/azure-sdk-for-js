let nock = require('nock');

module.exports.hash = "40459afcf596f53026872b296e2d98f8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'a0425497-5a69-4cb3-8e73-de1d700d0400',
  'x-ms-ests-server',
  '2.1.12071.23 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqGUTv6Wpn9NujfnawRWQEv__1r8AQAAAMG05tgOAAAA; expires=Fri, 29-Oct-2021 19:25:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 19:25:53 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/policyStore/metadataPolicies')
  .query(true)
  .reply(200, {"values":[{"name":"policy_newpurviewllc","id":"a4362b7c-071a-4e95-a68d-1d7ced1d3a43","version":4,"properties":{"description":"","decisionRules":[{"kind":"decisionrule","effect":"Permit","dnfCondition":[[{"attributeName":"resource.purview.collection","attributeValueIncludes":"newpurviewllc"},{"fromRule":"permission:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:newpurviewllc"}]]}],"attributeRules":[{"kind":"attributerule","id":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc","name":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c","f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_collection-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_purview-reader:newpurviewllc","name":"purviewmetadatarole_builtin_purview-reader:newpurviewllc","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c","f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_purview-reader","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_purview-reader"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_data-curator:newpurviewllc","name":"purviewmetadatarole_builtin_data-curator:newpurviewllc","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c","f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_data-curator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_data-curator"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_data-source-administrator:newpurviewllc","name":"purviewmetadatarole_builtin_data-source-administrator:newpurviewllc","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c","f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_data-source-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_data-source-administrator"}]]},{"kind":"attributerule","id":"permission:newpurviewllc","name":"permission:newpurviewllc","dnfCondition":[[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc"}],[{"fromRule":"purviewmetadatarole_builtin_purview-reader:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_purview-reader:newpurviewllc"}],[{"fromRule":"purviewmetadatarole_builtin_data-curator:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_data-curator:newpurviewllc"}],[{"fromRule":"purviewmetadatarole_builtin_data-source-administrator:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_data-source-administrator:newpurviewllc"}]]}],"collection":{"type":"CollectionReference","referenceName":"newpurviewllc"}}},{"name":"policy_la7eio","id":"88ce2dc3-3573-4c9a-8111-14fc9bc548b4","version":1,"properties":{"description":"","decisionRules":[{"kind":"decisionrule","effect":"Permit","dnfCondition":[[{"attributeName":"resource.purview.collection","attributeValueIncludes":"la7eio"},{"fromRule":"permission:la7eio","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:la7eio"}]]}],"attributeRules":[{"kind":"attributerule","id":"purviewmetadatarole_builtin_collection-administrator:la7eio","name":"purviewmetadatarole_builtin_collection-administrator:la7eio","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_collection-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator"}],[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:newpurviewllc"}]]},{"kind":"attributerule","id":"permission:la7eio","name":"permission:la7eio","dnfCondition":[[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:la7eio","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:la7eio"}],[{"fromRule":"permission:newpurviewllc","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:newpurviewllc"}]]}],"collection":{"type":"CollectionReference","referenceName":"la7eio"},"parentCollectionName":"newpurviewllc"}}]}, [
  'Date',
  'Wed, 29 Sep 2021 19:25:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '5197',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '6028adba-9533-4d8b-91fc-5a9631ab76b1',
  'api-supported-versions',
  '2021-07-01'
]);
