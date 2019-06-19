let nock = require('nock');

module.exports.testInfo = {"share":"share156093646491601607","dir":"dir156093646525604514"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093646491601607')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:24:43 GMT',
  'ETag',
  '"0x8D6F497F6932439"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16b2318e-c01a-00b2-6980-26c5ec000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:24:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093646491601607/dir156093646525604514')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:24:43 GMT',
  'ETag',
  '"0x8D6F497F6C71A86"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4663d787-d01a-0084-3480-2668be000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:24:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093646491601607/dir156093646525604514')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e823980f-701a-00e4-1880-262d9c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:24:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093646491601607')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c01000a0-201a-00f7-4380-26187d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:24:44 GMT',
  'Connection',
  'close' ]);

