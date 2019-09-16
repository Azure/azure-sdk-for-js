let nock = require('nock');

module.exports.testInfo = {"container":"container156816855646301549","blob":"blob156816855688009810"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816855646301549')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:36 GMT',
  'ETag',
  '"0x8D7365EE979D1F9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86b70b71-c01e-0049-0747-68559c000000',
  'x-ms-client-request-id',
  'ae886d11-a687-488e-8b30-1a695ec8954b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816855646301549')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a457f18f-f01e-0041-1047-684eef000000',
  'x-ms-client-request-id',
  '1dc6983b-2648-45b5-b2a1-e9e8977c42ef',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:36 GMT' ]);

