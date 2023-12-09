// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { ImageAnalysisClient } = require('@azure/imageanalysis');
const createClient = require('@azure/imageanalysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'] || '<cognitive services endpoint>';
const key = process.env['VISION_KEY'] || '<cognitive services key>';
const credential = new AzureKeyCredential(key);

const client = createClient(endpoint, credential);
