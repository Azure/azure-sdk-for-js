let nock = require('nock');

module.exports.hash = "65cc82d96f05ba1e9b1cd10656750bd7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"CreateBinary_SASConnectionStringnode","RowKey":"first_SASConnectionStringnode","binary":"QmFy","binary@odata.type":"Edm.Binary","binaryMetadata":"QmFy","binaryMetadata@odata.type":"Edm.Binary"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-10-18T19%3A42%3A39.8159151Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='first_SASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edc5c464-a002-00b7-7b58-c48eba000000',
  'x-ms-client-request-id',
  'c1f90852-0b69-46ed-8830-3e2474001326',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='first_SASConnectionStringnode')",
  'Date',
  'Mon, 18 Oct 2021 19:42:38 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='CreateBinary_SASConnectionStringnode',RowKey='first_SASConnectionStringnode')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-10-18T19%3A42%3A39.8159151Z'\"","PartitionKey":"CreateBinary_SASConnectionStringnode","RowKey":"first_SASConnectionStringnode","Timestamp":"2021-10-18T19:42:39.8159151Z","binary@odata.type":"Edm.Binary","binary":"QmFy","binaryMetadata@odata.type":"Edm.Binary","binaryMetadata":"QmFy"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-18T19%3A42%3A39.8159151Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'edc5c47d-a002-00b7-1258-c48eba000000',
  'x-ms-client-request-id',
  '110fbefd-6e57-4c1c-88dc-a0081b9e2ca0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 Oct 2021 19:42:38 GMT'
]);
