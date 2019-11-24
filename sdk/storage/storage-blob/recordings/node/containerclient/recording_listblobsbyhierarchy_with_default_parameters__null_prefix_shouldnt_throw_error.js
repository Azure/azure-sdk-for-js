let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157437901329105668","blockblob0/0":"blockblob0/0157437901349001178","blockblob1/1":"blockblob1/1157437901356906306","blockblob2/2":"blockblob2/2157437901363800911"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437901329105668')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:30:13 GMT',
  'ETag',
  '"0x8D76EDAC215506B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f00de0c1-801e-003b-71c3-a03afb000000',
  'x-ms-client-request-id',
  '37d3c082-9de9-47fa-85ee-9d3b8af493cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437901329105668/blockblob0%2F0157437901349001178')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:30:13 GMT',
  'ETag',
  '"0x8D76EDAC2255E58"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c489a01-f01e-006c-12c3-a094c8000000',
  'x-ms-client-request-id',
  '0b61bbe6-c083-472d-8e53-76538bdcbffd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437901329105668/blockblob1%2F1157437901356906306')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:30:13 GMT',
  'ETag',
  '"0x8D76EDAC23035B9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '891d4fa6-901e-0037-45c3-a0adf3000000',
  'x-ms-client-request-id',
  '970cb04c-770c-4040-874f-59c5ed18707e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437901329105668/blockblob2%2F2157437901363800911')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:30:13 GMT',
  'ETag',
  '"0x8D76EDAC23A2294"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '932da7ca-b01e-0030-29c3-a0c190000000',
  'x-ms-client-request-id',
  'e440873d-5f21-44d7-ba7d-c1a774988fc6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157437901329105668')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container157437901329105668\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f00de1cd-801e-003b-70c3-a03afb000000',
  'x-ms-client-request-id',
  'e0961356-621c-49db-b4c4-f5f0783fb3cc',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437901329105668/blockblob0%2F0157437901349001178')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '38b6e803-401e-0024-52c3-a089ff000000',
  'x-ms-client-request-id',
  'cd66f784-3a62-47a1-8fb2-1531f1845984',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437901329105668/blockblob1%2F1157437901356906306')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e42f1c4-201e-0022-4fc3-a0ba40000000',
  'x-ms-client-request-id',
  '7c3e3c97-bf55-4965-9f80-3a32985c3dcb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437901329105668/blockblob2%2F2157437901363800911')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5423ea3b-401e-008d-70c3-a0488d000000',
  'x-ms-client-request-id',
  '6d9f943d-de96-437b-b44e-9946004156a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437901329105668')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f00de26f-801e-003b-08c3-a03afb000000',
  'x-ms-client-request-id',
  'c1f83a73-52cc-40af-8458-e25f03a9cd30',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 21 Nov 2019 23:30:13 GMT'
]);
