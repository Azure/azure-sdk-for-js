// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { sdk, exporter } from "./bootstrap.mjs";
import express from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import scenario from "./scenario.cjs";
await scenario(express, BlobServiceClient, sdk, exporter);
