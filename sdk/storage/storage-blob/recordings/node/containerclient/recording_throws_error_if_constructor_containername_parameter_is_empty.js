let nock = require('nock');

module.exports.testInfo = {"container":"container156816845431806809"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816845431806809')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:54 GMT',
  'ETag',
  '"0x8D7365EAC964926"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '407192f7-d01e-0056-4047-688e8c000000',
  'x-ms-client-request-id',
  'e90b4684-cb9d-4b6c-920c-8120b2ff2a41',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816845431806809')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6528ed3-a01e-0034-4947-68c954000000',
  'x-ms-client-request-id',
  'c2d4eab7-c584-433c-9f5c-bf4b0c4b4cb2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:54 GMT' ]);

