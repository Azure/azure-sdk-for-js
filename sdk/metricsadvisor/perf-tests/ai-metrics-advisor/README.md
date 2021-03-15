### Guide

1. Build the ai-metrics-advisor perf tests package `rush build -t perf-ai-metrics-advisor`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a metrics advisor client account and populate the `.env` file with following variables:
   METRICS_ADVISOR_ENDPOINT
   METRICS_ADVISOR_SUBSCRIPTION_KEY
   METRICS_ADVISOR_API_KEY
   METRICS_ADVISOR_ALERT_CONFIG_ID
   METRICS_ADVISOR_ALERT_ID
   METRICS_ADVISOR_INCIDENT_ID
   METRICS_ADVISOR_DETECTION_CONFIG_ID
4. Run the tests as follows:
