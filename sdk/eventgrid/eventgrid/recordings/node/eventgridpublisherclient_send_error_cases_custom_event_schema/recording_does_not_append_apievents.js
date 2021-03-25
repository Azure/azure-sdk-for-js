let nock = require('nock');

module.exports.hash = "417a7c3cde8ba75f90e11351cc731edc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/', [{"ver":"1.0","typ":"Azure.Sdk.TestEvent1","sub":"Single","payload":{"hello":"world"}}])
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report 'a8b24b1b-b824-4644-837c-b652e90a927e:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket.","details":[{"code":"ResourceNotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report 'a8b24b1b-b824-4644-837c-b652e90a927e:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket."}]}}, [
  'Content-Length',
  '721',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'a8b24b1b-b824-4644-837c-b652e90a927e',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);
