let nock = require('nock');

module.exports.hash = "0f023e8fd2db989667ea186c1d8fd436";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164865851843107204","file":"file164865852003504000"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164865851843107204')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 16:42:00 GMT',
  'ETag',
  '"0x8DA126C3638C956"',
  'x-ms-request-id',
  '67d96136-a01e-0005-2e55-44f0c9000000',
  'x-ms-client-request-id',
  '99618758-1346-427f-9ce8-43326541798b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:42:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164865851843107204')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '67d9613d-a01e-0005-3055-44f0c9000000',
  'x-ms-client-request-id',
  'f470120a-c1bb-4b76-98e7-3f41e67b8b1e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:42:00 GMT'
]);
