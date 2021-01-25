let nock = require('nock');

module.exports.hash = "1f047fd3f190c075d7aa8abad6c5c7b0";

module.exports.testInfo = {"uniqueName":{"query-digitaltwin":"digitalTwin161015523577706215"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdigitaltwins.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1325',
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
  '0490bd0b-26c5-439b-95b1-77d433fb9400',
  'x-ms-ests-server',
  '2.1.11384.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ana2Lrrc9BZBktovedvTBLc; expires=Mon, 08-Feb-2021 01:20:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 09 Jan 2021 01:20:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTTestBuilding;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '214',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-01-09T01:20:35.2347767+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'query-charge',
  '5.58',
  'Date',
  'Sat, 09 Jan 2021 01:20:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin161015523577706215', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin161015523577706215","$etag":"W/\"8f2998d1-b033-4d25-8993-7aaa746cfd43\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-01-09T01:20:35.3270577Z"},"TemperatureUnit":{"lastUpdateTime":"2021-01-09T01:20:35.3270577Z"}}}, [
  'Content-Length',
  '340',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"8f2998d1-b033-4d25-8993-7aaa746cfd43"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[{"$dtId":"digitalTwin161015523577706215","$etag":"W/\"8f2998d1-b033-4d25-8993-7aaa746cfd43\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-01-09T01:20:35.3270577Z"},"TemperatureUnit":{"lastUpdateTime":"2021-01-09T01:20:35.3270577Z"}}}],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'query-charge',
  '5.66',
  'Date',
  'Sat, 09 Jan 2021 01:20:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin161015523577706215')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Date',
  'Sat, 09 Jan 2021 01:20:40 GMT'
]);
