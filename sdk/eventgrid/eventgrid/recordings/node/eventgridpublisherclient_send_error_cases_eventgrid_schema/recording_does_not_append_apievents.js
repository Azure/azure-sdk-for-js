let nock = require('nock');

module.exports.hash = "c6b9b45d543c9136db9d346191d64b9a";

module.exports.testInfo = {"uniqueName":{"singleEventId":"singleEventId161541017702305469"},"newDate":{"singleEventDate":"2021-03-10T21:02:57.023Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/', [{"id":"singleEventId161541017702305469","subject":"Single 1","data":{"hello":"world"},"eventType":"Azure.Sdk.TestEvent1","eventTime":"2021-03-10T21:02:57.023Z","dataVersion":"1.0"}])
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report '182eb1fd-286a-4624-99cd-ea1d538f6e6e:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket.","details":[{"code":"ResourceNotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report '182eb1fd-286a-4624-99cd-ea1d538f6e6e:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket."}]}}, [
  'Content-Length',
  '721',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '182eb1fd-286a-4624-99cd-ea1d538f6e6e',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);
