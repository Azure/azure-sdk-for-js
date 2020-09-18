let nock = require("nock");

module.exports.hash = "7700ce3484ab31a95818e5c9e442cd13";

module.exports.testInfo = { uniqueName: {}, newDate: {} };

nock("https://fakestorageaccount.table.core.windows.net:443", { encodedQueryParams: true })
  .get("/list()")
  .query(true)
  .reply(
    200,
    {
      "odata.metadata": "https://fakestorageaccount.table.core.windows.net/$metadata#list",
      value: [
        {
          "odata.etag": "W/\"datetime'2020-08-21T15%3A26%3A38.9424197Z'\"",
          PartitionKey: "LIST_1",
          RowKey: "binary1",
          Timestamp: "2020-08-21T15:26:38.9424197Z",
          "foo@odata.type": "Edm.Binary",
          foo: "QmFy"
        }
      ]
    },
    [
      "Cache-Control",
      "no-cache",
      "Transfer-Encoding",
      "chunked",
      "Content-Type",
      "application/json;odata=minimalmetadata;streaming=true;charset=utf-8",
      "Server",
      "Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "08ac11c5-5002-0120-64a8-7d7e4d000000",
      "x-ms-client-request-id",
      "8cb05409-fb48-4e2e-bc35-47115474563a",
      "x-ms-version",
      "2019-02-02",
      "X-Content-Type-Options",
      "nosniff",
      "Access-Control-Expose-Headers",
      "x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding",
      "Access-Control-Allow-Origin",
      "*",
      "Date",
      "Sat, 29 Aug 2020 02:04:46 GMT"
    ]
  );
