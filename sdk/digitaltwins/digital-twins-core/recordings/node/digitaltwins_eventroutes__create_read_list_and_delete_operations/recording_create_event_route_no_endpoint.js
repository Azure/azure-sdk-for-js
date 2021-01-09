let nock = require('nock');

module.exports.hash = "e215587782c0a781841dd884d19f9629";

module.exports.testInfo = {"uniqueName":{"create-event-route":"eventRoute160860004013506396","list-event-routes-enpoint":"endpoint160860004013503969"},"newDate":{}}

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
  'e699f014-c989-40be-b899-2ceabc95a700',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApElnBt-l1VNjutPKdXvkc2uaJ_6AQAAAOZAc9cOAAAA; expires=Thu, 21-Jan-2021 01:20:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 01:20:39 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/eventroutes/eventRoute160860004013506396', {"endpointName":"endpoint160860004013503969","filter":"$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'"})
  .query(true)
  .reply(400, {"error":{"code":"EventRouteEndpointInvalid","message":"The endpoint provided does not exist or is not active. Check that your endpoint is provisioned correctly. See event route documentation (http://aka.ms/ADTv2Routes)."}}, [
  'Content-Length',
  '223',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Tue, 22 Dec 2020 01:20:40 GMT'
]);
