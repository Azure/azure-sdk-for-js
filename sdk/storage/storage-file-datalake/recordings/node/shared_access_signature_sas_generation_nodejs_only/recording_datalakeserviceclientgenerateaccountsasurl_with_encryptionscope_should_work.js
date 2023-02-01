let nock = require('nock');

module.exports.hash = "0f62f08f5e4c17d0987866476dbbec71";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415119003067"},"newDate":{"tmr":"2022-08-02T01:35:51.189Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415119003067')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'ETag',
  '"0x8DA742755A95848"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9cd-601e-0034-3210-a6cac9000000',
  'x-ms-client-request-id',
  '935f4eec-d3d8-489a-b3e2-3f0b1cdb5951',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415119003067')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9d3-601e-0034-3710-a6cac9000000',
  'x-ms-client-request-id',
  'cae12c88-5aa5-48b5-92d5-0039dbac19d7',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);
