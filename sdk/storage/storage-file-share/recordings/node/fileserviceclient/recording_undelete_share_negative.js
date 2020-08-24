let nock = require("nock");

module.exports.hash = "1076afcbc9d5de2536c9edafcda6a150";

module.exports.testInfo = { uniqueName: { share: "share159825202315804875" }, newDate: {} };

nock("https://fakestorageaccount.file.core.windows.net:443", { encodedQueryParams: true })
  .put("/share159825202315804875")
  .query(true)
  .reply(
    404,
    '﻿<?xml version="1.0" encoding="utf-8"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:efb5e528-501a-0052-67e3-794b91000000\nTime:2020-08-24T06:53:43.1255003Z</Message></Error>',
    [
      "Content-Length",
      "217",
      "Content-Type",
      "application/xml",
      "Server",
      "Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0",
      "x-ms-request-id",
      "efb5e528-501a-0052-67e3-794b91000000",
      "x-ms-client-request-id",
      "7060a6de-79cf-42cd-97a7-6fa32320117b",
      "x-ms-version",
      "2019-12-12",
      "x-ms-error-code",
      "ShareNotFound",
      "Date",
      "Mon, 24 Aug 2020 06:53:43 GMT"
    ]
  );
