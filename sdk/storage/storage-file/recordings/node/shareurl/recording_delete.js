let nock = require('nock');

module.exports.testInfo = {"share":"share156767545882300658"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767545882300658')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:19 GMT',
  'ETag',
  '"0x8D731E2D45321D5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a09c9e3d-f01a-0073-49cb-63af10000000',
  'x-ms-client-request-id',
  'de3d1e57-0da7-4456-ad1f-1c17ce886db2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767545882300658')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da8348c4-c01a-00fe-0dcb-6398c2000000',
  'x-ms-client-request-id',
  'c50dfc1e-dfd7-42d9-9b03-3d1a5ba7467e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:19 GMT',
  'Connection',
  'close' ]);

