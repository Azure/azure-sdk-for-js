let nock = require('nock');

module.exports.hash = "809721e56b039a6054e22394dc07ba02";

module.exports.testInfo = {"uniqueName":{"get-event-route-not-existing":"eventRoute161015524310909955"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdigitaltwins.azure.net%2F.default")
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
  'ea5f5dfe-46b4-4f38-8b65-3de5b0109100',
  'x-ms-ests-server',
  '2.1.11384.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aol72gcZxWdAhE_kPPdio_CuaJ_6AQAAAOn7itcOAAAA; expires=Mon, 08-Feb-2021 01:20:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 09 Jan 2021 01:20:41 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/eventroutes/eventRoute161015524310909955')
  .query(true)
  .reply(404, {"error":{"code":"EventRouteNotFound","message":"There is no route available that matches the provided input. Check for all valid event routes by calling EventRoute_List. See Swagger example (http://aka.ms/RouteSwSmpl)."}}, [
  'Content-Length',
  '222',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:42 GMT'
]);
