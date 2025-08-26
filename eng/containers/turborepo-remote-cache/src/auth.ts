// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FastifyRequest, FastifyReply } from "fastify";
import process from "node:process";

// Token authentication as a Fastify plugin
export async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    reply.status(401).send("Access token is missing or invalid.");
    return;
  }

  const allowedTokens = process.env.TURBO_TOKEN?.split(",") || [];
  if (allowedTokens.length === 0) {
    reply.status(500).send("No tokens configured in the environment.");
    return;
  }
  if (!allowedTokens.includes(token)) {
    reply.status(403).send("Invalid or unauthorized token.");
    return;
  }
}

// Team ID authentication as a Fastify plugin
export async function authenticateTeamId(request: FastifyRequest, reply: FastifyReply) {
  const { teamId, team, slug } = request.query as Record<string, string | undefined>;
  if (!teamId && !team && !slug) {
    reply.status(401).send("Missing team ID or slug.");
    return;
  }
}
