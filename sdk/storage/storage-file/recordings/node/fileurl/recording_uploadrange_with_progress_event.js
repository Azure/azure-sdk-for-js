let nock = require('nock');

module.exports.testInfo = {"share":"share156044260304204381","dir":"dir156044261298306704","file":"file156044261333105060"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044260304204381')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:33 GMT',
  'ETag',
  '"0x8D6EFDFD44C1DBE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48214b19-501a-0072-7ec8-210baf000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044260304204381/dir156044261298306704')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:38 GMT',
  'ETag',
  '"0x8D6EFDFD6CE46D4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13283eda-301a-00ea-27c8-218590000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044260304204381/dir156044261298306704/file156044261333105060')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:38 GMT',
  'ETag',
  '"0x8D6EFDFD6F50F96"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac51d432-c01a-0099-59c8-21f553000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044260304204381/dir156044261298306704/file156044261333105060', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:39 GMT',
  'ETag',
  '"0x8D6EFDFD78B0192"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b181f156-001a-0084-0bc8-212cb9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044260304204381')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e22a7d11-c01a-0033-2ec8-2123bc000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:40 GMT',
  'Connection',
  'close' ]);

