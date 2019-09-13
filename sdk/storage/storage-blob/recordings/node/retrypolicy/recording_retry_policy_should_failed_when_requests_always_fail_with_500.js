let nock = require('nock');

module.exports.testInfo = {"container":"container156776205476503645"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776205476503645')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:35 GMT',
  'ETag',
  '"0x8D732AC738B93BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5daeba4-c01e-0068-6b95-649113000000',
  'x-ms-client-request-id',
  'd80e4e5b-4f2e-4407-a9d5-e6d8a8b61435',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776205476503645')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73abb597-101e-0129-3b95-6437fa000000',
  'x-ms-client-request-id',
  'cbb19e23-2142-45b0-af10-7a9d1c198260',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:39 GMT',
  'Connection',
  'close' ]);

