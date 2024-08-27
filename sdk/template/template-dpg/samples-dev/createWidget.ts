// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the create a new widget and analyse it.
 *
 *
 * @summary Demonstrates how the create a new widget and analyse it.
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import { WidgetServiceClient } from "@azure/template-dpg";

// Load the .env file if it exists
dotenv.config();

const endpoint = process.env.WIDGET_SERVICE_ENDPOINT || "https://tsp-widgets.azurewebsites.net";

async function main() {
  const client = new WidgetServiceClient(endpoint);

  // Create a new widget
  const widget = await client.createWidget(1234, "blue");

  console.log(`Widget created with id: ${widget.id}`);

  // Analyse the widget
  let analysis = await client.analyzeWidget(widget.id);
  console.log(`Widget Analysis: ${analysis.summary}`);

  // Switching to color red
  await client.updateWidget(widget.id, { color: "red" });

  // Analyse again
  analysis = await client.analyzeWidget(widget.id);
  console.log(`Widget Analysis: ${analysis.summary}`);

  // Delete the widget
  await client.deleteWidget(widget.id);
}

main().catch(console.error);
