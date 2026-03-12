---
name: azure-sdk-skills
description: >
  Registry of package-specific agent skills in the azure-sdk-for-js monorepo.
  Use this skill when working on an SDK package to find specialized skills
  for regeneration, migration, or other package-specific workflows.
---

# Azure SDK Package Skills

This repo contains package-specific skills that live alongside the packages they
support. When working on one of the packages below, load the relevant skill by
reading its `SKILL.md` at the listed path.

## Available skills

| Package                   | Skill            | Description                                                                                                              | Path                                                                   |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `@azure/search-documents` | search-documents | Domain knowledge for the search-documents SDK — architecture, pagination, data flow, type mappings, and common pitfalls. | `sdk/search/search-documents/.agents/skills/search-documents/SKILL.md` |
