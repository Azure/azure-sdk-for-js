let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534996459708806"},"newDate":{"now":"2019-12-03T05:12:44.596Z","tmr":"2019-12-03T05:12:44.596Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534996459708806')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 05:06:47 GMT',
  'ETag',
  '"0x8D777AE991A33F0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2324d592-901e-0089-0e97-a9fcba000000',
  'x-ms-client-request-id',
  'e45a92cb-ce85-4fef-a7bd-edf7392acd5c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:46 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534996459708806')
  .query(true)
  .reply(200, {"paths":[]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '726f546b-901f-0028-5197-a93221000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '982f00db-e899-4144-b6a9-47b17abfbc79',
  'Date',
  'Tue, 03 Dec 2019 05:06:48 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534996459708806')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2324d8f9-901e-0089-3597-a9fcba000000',
  'x-ms-client-request-id',
  'ec06a8c7-d7f2-4756-92e5-e68fdb466280',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 05:06:48 GMT' ]);
