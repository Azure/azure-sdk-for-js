let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534368287903958"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534368287903958')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:05 GMT',
  'ETag',
  '"0x8D7779FF901982F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b538f7ab-201e-0018-1788-a9680b000000',
  'x-ms-client-request-id',
  '49cc14dd-0f34-4d97-9543-a7e9fab3492d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534368287903958')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b538f8c3-201e-0018-2088-a9680b000000',
  'x-ms-client-request-id',
  '492d3919-b626-4b55-8ade-a4d6bd60551a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:05 GMT' ]);
