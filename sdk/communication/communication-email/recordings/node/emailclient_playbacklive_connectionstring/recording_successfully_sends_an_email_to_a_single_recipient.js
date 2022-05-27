let nock = require('nock');

module.exports.hash = "04544d2e73fa18a22340c4dc67283e09";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"},"recipients":{"to":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
  .query(true)
  .reply(202, "", [
  'Operation-Location',
  "someOperationLocation",
  'x-ms-request-id',
  "someRequestId",
  'Repeatability-Result',
  'accepted',
  'api-supported-versions',
  '2021-10-01-preview',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wBGEYgAAAAAdWOelRB62QI7yWpiOKBEjRE0yQUExMDkxMjA5MDA5AGNjOTI3NThkLTA1ZjctNGFkNi1hYTVlLTBmYTk3MThkODk4NQ==',
  'Date',
  'Tue, 17 May 2022 21:21:03 GMT',
  'Content-Length',
  '0'
]);
