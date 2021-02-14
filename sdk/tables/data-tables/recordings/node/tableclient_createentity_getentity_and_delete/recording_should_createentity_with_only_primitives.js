let nock = require('nock');

module.exports.hash = "851ea767b4c43058cdfd54b047f09e9b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P2_node","RowKey":"R1","testField":"testEntity"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A37.280006Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P2_node',RowKey='R1')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6919eea-a002-0044-3f8b-977595000000',
  'x-ms-client-request-id',
  'ca2fa62c-60b2-4220-9f76-a5cef5888c90',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P2_node',RowKey='R1')",
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode(PartitionKey=%27P2_node%27,RowKey=%27R1%27)')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2020-10-01T00%3A38%3A37.280006Z'\"","PartitionKey":"P2_node","RowKey":"R1","Timestamp":"2020-10-01T00:38:37.280006Z","testField":"testEntity"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2020-10-01T00%3A38%3A37.280006Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6919eef-a002-0044-428b-977595000000',
  'x-ms-client-request-id',
  '5b2af2b9-0700-40f9-9fed-c13bb0a3a836',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestnode(PartitionKey=%27P2_node%27,RowKey=%27R1%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6919ef5-a002-0044-488b-977595000000',
  'x-ms-client-request-id',
  'd9ce70c3-3f49-4c64-961c-84e2bfbdae43',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 01 Oct 2020 00:38:37 GMT'
]);
