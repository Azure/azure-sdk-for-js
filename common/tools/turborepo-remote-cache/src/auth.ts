// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import express from "express";
import process from "node:process";

export function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send("Access token is missing or invalid.");
    return;
  }

  const allowedTokens = process.env.TURBO_TOKEN?.split(",") || [];
  if (allowedTokens.length === 0) {
    res.status(500).send("No tokens configured in the environment.");
    return;
  }
  if (!allowedTokens.includes(token)) {
    res.status(403).send("Invalid or unauthorized token.");
    return;
  }

  next();
}

export function authenticateTeamId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const team = req.query.teamId ?? req.query.team ?? req.query.slug;

  if (!team) {
    res.status(401).send("Missing team ID or slug.");
    return;
  }

  next();
}
