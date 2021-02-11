let nock = require('nock');

module.exports.hash = "81bd7707719db4a36620d4c4828ea53c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240285408825","file":"file158368240287908019"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240285408825')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:42 GMT',
  'ETag',
  '"0x8D7C377E64E0417"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2e3d-601e-0014-6c60-f586fa000000',
  'x-ms-client-request-id',
  '68f94fa7-4277-4543-87b5-fdda83f9d015',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:42 GMT'
]);
