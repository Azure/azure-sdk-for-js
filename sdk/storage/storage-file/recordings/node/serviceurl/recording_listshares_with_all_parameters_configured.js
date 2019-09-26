let nock = require('nock');

module.exports.testInfo = {"share":"share156775324968100364"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775324968100364x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:49 GMT',
  'ETag',
  '"0x8D73297F34CBB7D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e42a51a7-801a-0024-2980-640123000000',
  'x-ms-client-request-id',
  'c7aacf55-21ff-410c-9762-65e65ebdc2f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775324968100364x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:50 GMT',
  'ETag',
  '"0x8D73297F38E504B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b795d156-101a-015b-7c80-6430b5000000',
  'x-ms-client-request-id',
  '405292b7-5545-4865-84b6-413fd31fdafd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156775324968100364</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156775324968100364x1</Name><Properties><Last-Modified>Fri, 06 Sep 2019 07:00:49 GMT</Last-Modified><Etag>\"0x8D73297F34CBB7D\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156775324968100364x2/01D56480D1194D84/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cce77b5c-401a-0124-6880-64ff2e000000',
  'x-ms-client-request-id',
  '3395569d-58e0-4fcd-920c-5f9dd3cd68b6',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156775324968100364</Prefix><Marker>/fakestorageaccount/share156775324968100364x2/01D56480D1194D84/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156775324968100364x2</Name><Properties><Last-Modified>Fri, 06 Sep 2019 07:00:50 GMT</Last-Modified><Etag>\"0x8D73297F38E504B\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd229612-401a-0004-5d80-647a84000000',
  'x-ms-client-request-id',
  '2e83dce1-6aef-4d99-b1ce-22fbf8e77580',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775324968100364x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f21bb815-501a-0128-7e80-646826000000',
  'x-ms-client-request-id',
  '6ff4d7d6-d6ad-4597-9ddb-86557f953622',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775324968100364x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '190fff83-e01a-014f-6680-6478da000000',
  'x-ms-client-request-id',
  '2487fb9b-20a6-4bb4-94f2-8bccd08a1832',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:51 GMT',
  'Connection',
  'close' ]);

