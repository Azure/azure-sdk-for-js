let nock = require('nock');

module.exports.testInfo = {"share":"share156767534211703422","dir":"dir156767534251907053"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534211703422')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:22 GMT',
  'ETag',
  '"0x8D731E28EC4156F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '131aa411-301a-0098-28cb-63d7e2000000',
  'x-ms-client-request-id',
  '77dbeac5-a682-49b5-af8f-143e9d056cb7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534211703422/dir156767534251907053')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:22 GMT',
  'ETag',
  '"0x8D731E28F028437"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a43d27f8-801a-00ef-16cb-630276000000',
  'x-ms-client-request-id',
  '8cb0e986-c365-437a-888d-937342b455a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:22.7891255Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:22.7891255Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:22.7891255Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767534211703422')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be26e162-a01a-0041-2dcb-63af67000000',
  'x-ms-client-request-id',
  'c675db71-3e80-4c15-bc9f-7064102415c7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:22 GMT',
  'Connection',
  'close' ]);

