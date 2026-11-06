// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { sdk, exporter } = require("./bootstrap.cjs");
const express = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
const scenario = require("./scenario.cjs");
scenario(express, BlobServiceClient, sdk, exporter).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
