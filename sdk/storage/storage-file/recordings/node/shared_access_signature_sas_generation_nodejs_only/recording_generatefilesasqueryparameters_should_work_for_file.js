let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-13T16:23:04.467Z","share":"share156044298446703223","dir":"dir156044298657506834","file":"file156044298681504275"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298446703223')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:51 GMT',
  'ETag',
  '"0x8D6EFE0B52FECF1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'db1cf8db-801a-00d1-1dc9-21c7ce000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:22:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298446703223/dir156044298657506834')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:51 GMT',
  'ETag',
  '"0x8D6EFE0B56D3295"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d176684-601a-0058-7bc9-217eea000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:22:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298446703223/dir156044298657506834/file156044298681504275')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:51 GMT',
  'ETag',
  '"0x8D6EFE0B59337E4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64e99dbf-e01a-006b-20c9-2127c7000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:22:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156044298446703223/dir156044298657506834/file156044298681504275')
  .query(true)
  .reply(403, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f6b95517-101a-007e-02c9-21e55e000000',
  'x-ms-error-code',
  'AuthenticationFailed',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:22:51 GMT',
  'Connection',
  'close' ]);

