// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to train a model on multivariate data and use this model to detect anomalies.
 */

const { AnomalyDetectorClient } = require("@azure/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

 
// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();
 
// You will need to set this environment variables in .env file or edit the following values
const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const data_source = "<Your own data source>";
 


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
 
 async function main() {
    
    // create client
    const client = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(apiKey));
 
    // Already available models
    const model_list = await client.listMultivariateModel();
    console.log("The latest 5 available models (if exist):");
    for(var i = 0 ; i < 5 ; i++) {
      let model_detail = (await model_list.next());
      if (model_detail.done == true) break
      console.log(model_detail.value);
    }

    // construct model request (notice that the start and end time are local time and may not align with your data source)
    const Modelrequest = {
      source: data_source,
      startTime: new Date(2021,0,1,0,0,0),
      endTime: new Date(2021,0,2,12,0,0),
      slidingWindow:200
    };    

    // get train result
    console.log("Training a new model...");
    const train_response = await client.trainMultivariateModel(Modelrequest);
    const model_id = train_response.location.split("/").pop();
    console.log("New model ID: " + model_id);

    // get model status
    let model_response = await client.getMultivariateModel(model_id);
    let model_status = model_response.modelInfo.status;

    while (model_status != 'READY'){
        await sleep(10000).then(() => {});
        model_response = await client.getMultivariateModel(model_id);
        model_status = model_response.modelInfo.status;
    }

    console.log("TRAINING FINISHED.");

    // get result
    console.log("Start detecting...");
    const detect_request = {
        source: data_source,
        startTime: new Date(2021,0,2,12,0,0),
        endTime: new Date(2021,0,3,0,0,0)
      };
    const result_header = await client.detectAnomaly(model_id, detect_request);
    const result_id = result_header.location?.split("/").pop() ?? "";
    let result = await client.getDetectionResult(result_id);
    let result_status = result.summary.status;

    while (result_status != 'READY'){
        await sleep(2000).then(() => {});
        result = await client.getDetectionResult(result_id);
        result_status = result.summary.status;
    }

    console.log("Result status: " + result_status);
    console.log("Result Id: " + result.resultId);

    // export the model
    const export_result = await client.exportModel(model_id);
    const model_path = "model.zip"
    const destination = fs.createWriteStream(model_path);
    export_result.readableStreamBody?.pipe(destination);
    console.log("New model has been exported to " + model_path + ".");
    
    // delete model
    let delete_result = client.deleteMultivariateModel(model_id);
    if ((await delete_result)._response.status == "204")
      console.log("New model has been deleted.");
    else 
      console.log("Failed to delete the new model.");
  }
 
 main().catch((err) => {
   console.error("The sample encountered an error:", err);
 });
 