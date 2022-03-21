let nock = require('nock');

module.exports.hash = "2ac6c5a8a6a96af32cea6c02a9ba7e4c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164865759524809642","file":"file164865759713900283"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164865759524809642')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 16:26:37 GMT',
  'ETag',
  '"0x8DA126A101BEB80"',
  'x-ms-request-id',
  '9eaa34af-601e-0002-1952-44e805000000',
  'x-ms-client-request-id',
  '4d8187e9-6c35-4b89-ab7d-394d941311d1',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:26:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164865759524809642')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9eaa34b3-601e-0002-1a52-44e805000000',
  'x-ms-client-request-id',
  '7057c566-ecbb-4a70-b7c5-2e4db3ac6954',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 16:26:37 GMT'
]);
