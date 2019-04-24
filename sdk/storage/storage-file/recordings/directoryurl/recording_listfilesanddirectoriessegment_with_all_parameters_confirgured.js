let nock = require('nock');

module.exports.testInfo = {"share":"share155613649039104001","dir":"dir155613649072602117","pre1556136491054":"pre1556136491054155613649105401942","pre1556136491054155613649105401942dir0":"pre1556136491054155613649105401942dir0155613649105406192","pre1556136491054155613649105401942dir1":"pre1556136491054155613649105401942dir1155613649139007461","pre1556136491054155613649105401942dir2":"pre1556136491054155613649105401942dir2155613649172701391","pre1556136491054155613649105401942file0":"pre1556136491054155613649105401942file0155613649206905556","pre1556136491054155613649105401942file1":"pre1556136491054155613649105401942file1155613649241203107","pre1556136491054155613649105401942file2":"pre1556136491054155613649105401942file2155613649274809014"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001')
  .query({"restype":"share"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:10 GMT',
  'ETag',
  '"0x8D6C8F093344330"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '648bd893-701a-009b-79d9-fa1060000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/dir155613649072602117')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:11 GMT',
  'ETag',
  '"0x8D6C8F093658F93"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7fbe3323-f01a-008a-7fd9-fa277b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942dir0155613649105406192')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:11 GMT',
  'ETag',
  '"0x8D6C8F0939904ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f105c7ab-001a-003e-7cd9-fa2b79000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:10 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942dir1155613649139007461')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:11 GMT',
  'ETag',
  '"0x8D6C8F093CC5330"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a709ebe-401a-007d-20d9-fa0190000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:11 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942dir2155613649172701391')
  .query({"restype":"directory"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'ETag',
  '"0x8D6C8F094008C02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f60ec0e-c01a-006c-2cd9-fa368b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:11 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942file0155613649206905556')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'ETag',
  '"0x8D6C8F094349DB8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40c64f0d-201a-0083-0fd9-fa3df5000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942file1155613649241203107')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'ETag',
  '"0x8D6C8F094683A25"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02f8d64b-501a-0087-3dd9-fac877000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share155613649039104001/pre1556136491054155613649105401942file2155613649274809014')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Apr 2019 20:08:13 GMT',
  'ETag',
  '"0x8D6C8F0949D0F52"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18a51245-c01a-004e-38d9-fa58bd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613649039104001/')
  .query({"prefix":"pre1556136491054155613649105401942","maxresults":"3","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155613649039104001\" DirectoryPath=\"\"><Prefix>pre1556136491054155613649105401942</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1556136491054155613649105401942dir0155613649105406192</Name><Properties /></Directory><Directory><Name>pre1556136491054155613649105401942dir1155613649139007461</Name><Properties /></Directory><Directory><Name>pre1556136491054155613649105401942dir2155613649172701391</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU1NjEzNjQ5MTA1NDE1NTYxMzY0OTEwNTQwMTk0MmZpbGUwMTU1NjEzNjQ5MjA2OTA1NTU2</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f45a3de7-801a-008e-41d9-fad2f9000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share155613649039104001/')
  .query({"prefix":"pre1556136491054155613649105401942","marker":"1%2176%21cHJlMTU1NjEzNjQ5MTA1NDE1NTYxMzY0OTEwNTQwMTk0MmZpbGUwMTU1NjEzNjQ5MjA2OTA1NTU2","maxresults":"6","restype":"directory","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.file.core.windows.net/\" ShareName=\"share155613649039104001\" DirectoryPath=\"\"><Prefix>pre1556136491054155613649105401942</Prefix><Marker>1!76!cHJlMTU1NjEzNjQ5MTA1NDE1NTYxMzY0OTEwNTQwMTk0MmZpbGUwMTU1NjEzNjQ5MjA2OTA1NTU2</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1556136491054155613649105401942file0155613649206905556</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1556136491054155613649105401942file1155613649241203107</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1556136491054155613649105401942file2155613649274809014</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc3f069d-b01a-0041-5bd9-fab54b000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 24 Apr 2019 20:08:12 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942file0155613649206905556')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e30cfdf-901a-0030-6ad9-fac772000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:13 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942file1155613649241203107')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '664f5bc9-e01a-0034-5fd9-fa32f0000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942file2155613649274809014')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb1bf627-d01a-0037-1cd9-fa31f7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942dir0155613649105406192')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d29a62c-501a-0062-65d9-fada80000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:14 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942dir1155613649139007461')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54cddbc2-e01a-0052-1ed9-fa80aa000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/pre1556136491054155613649105401942dir2155613649172701391')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf210ea-a01a-0055-21d9-fa762f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001/dir155613649072602117')
  .query({"restype":"directory"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e901cfc5-001a-0094-66d9-fafd96000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share155613649039104001')
  .query({"restype":"share"})
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b35f9a7-401a-0098-1ad9-fa1367000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 24 Apr 2019 20:08:15 GMT',
  'Connection',
  'close' ]);
