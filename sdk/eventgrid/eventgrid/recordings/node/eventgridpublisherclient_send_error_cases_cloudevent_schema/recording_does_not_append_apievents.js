let nock = require('nock');

module.exports.hash = "ab3d52b8504c506fd982c28c8a107548";

module.exports.testInfo = {"uniqueName":{"cloudSingleEventId":"cloudSingleEventId161541017724505112"},"newDate":{"cloudSingleEventDate":"2021-03-10T21:02:57.245Z"}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/', [{"id":"cloudSingleEventId161541017724505112","source":"/earth/unitedstates/washington/kirkland/finnhill","data":{"hello":"world"},"type":"Azure.Sdk.TestEvent1","time":"2021-03-10T21:02:57.245Z","specversion":"1.0","datacontenttype":"application/json","traceparent":"00-2-5-00"}])
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report 'f88d9de5-ff62-46d4-8484-8f14028eb884:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket.","details":[{"code":"ResourceNotFound","message":"No HTTP resource was found that matches the request URI 'https://endpoint/?api-version=2018-01-01'. Report 'f88d9de5-ff62-46d4-8484-8f14028eb884:3/10/2021 9:02:56 PM (UTC)' to our forums for assistance or raise a support ticket."}]}}, [
  'Content-Length',
  '713',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'f88d9de5-ff62-46d4-8484-8f14028eb884',
  'Date',
  'Wed, 10 Mar 2021 21:02:56 GMT'
]);
