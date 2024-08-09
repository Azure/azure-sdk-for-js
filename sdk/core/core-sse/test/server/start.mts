// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";
import { port, waitBetweenEventsInMS } from "./config.mts";
import { logger } from "./logger.mts";
import { sendEvents, sendHeaders } from "./responses.mts";

async function run() {
  const app = express();

  app.get("/events/:eventCount", async function (req, res) {
    logger.info(`Got /events/${req.params.eventCount}`);
    sendHeaders(res);
    const eventCount = parseInt(req.params.eventCount);
    await sendEvents(res, eventCount, waitBetweenEventsInMS);
    res.end();
  });

  app.get("/events/no-fin/:eventCount", async function (req, res) {
    logger.info(`Got /events/no-fin/${req.params.eventCount}`);
    sendHeaders(res);
    const eventCount = parseInt(req.params.eventCount);
    await sendEvents(res, eventCount, waitBetweenEventsInMS);
    res.socket?.destroy();
    //res.end();
  });

  app.get("/events/infinite", async function (_, res) {
    logger.info("Got /events/infinite");
    sendHeaders(res);
    await sendEvents(res, 0, waitBetweenEventsInMS);
  });

  app.get("/events/extra-newline/:eventCount", async function (req, res) {
    logger.info(`Got /events/extra-newline/${req.params.eventCount}`);
    sendHeaders(res);
    const eventCount = parseInt(req.params.eventCount);
    await sendEvents(res, eventCount, waitBetweenEventsInMS);
    res.end("\n");
  });

  app.get("/events/extra-newline/infinite", async function (req, res) {
    logger.info(`Got /events/extra-newline/infinite`);
    sendHeaders(res);
    await sendEvents(res, 0, waitBetweenEventsInMS);
    res.write("\n");
  });

  app.get("/events/extra-event/:eventCount", async function (req, res) {
    logger.info(`Got /events/extra-event/${req.params.eventCount}`);
    sendHeaders(res);
    const eventCount = parseInt(req.params.eventCount);
    await sendEvents(res, eventCount, waitBetweenEventsInMS);
    res.end(`data: truly done this time :)\n\n`);
  });

  app.get("/events/extra-event/infinite", async function (req, res) {
    logger.info(`Got /events/infinite/extra-event`);
    sendHeaders(res);
    await sendEvents(res, 0, waitBetweenEventsInMS);
    res.write(`data: truly done this time :)\n\n`);
  });

  app.listen(port);
  logger.info(`Listening on port ${port}`);
}

await run().catch((err) => logger.error(err));
