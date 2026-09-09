---
name: figma-ticket
description: Implements a GitHub ticket (with or without an attached Figma design). Fetches the issue, drafts a short plan, creates a branch, asks whether to visually verify with Playwright, and implements. Use when the user asks to "work on ticket X", "implement issue Y", or pastes a GitHub issue link.
---

# Figma Ticket

Expected arg: `<issue-url-or-number>`. Examples: `https://github.com/owner/repo/issues/1`, or just `1` if already in the repo.

## 1. Resolve the argument

- If the argument is a GitHub issues URL, extract owner, repo, and number (support a trailing `#issue-...` fragment).
- If it's just a number, resolve the current repo with `gh repo view --json nameWithOwner`.
- If no argument is given, ask the user for the link or number. Do not guess or assume a ticket.

## 2. Fetch the ticket

```
gh issue view {number} --repo {owner}/{repo} --json title,body,labels,comments,number
```

## 3. Fetch the design (if applicable)

- If the issue body contains a figma.com link, extract the `fileKey` and `nodeId` from the URL.
- Load the `figma-design-to-code` guidance (skill or MCP resource `skill://figma/figma-design-to-code/SKILL.md`) before calling any Figma tool.
- Call `get_design_context` with that fileKey/nodeId.
- If there's no Figma link in the issue, skip this step entirely.

## 4. Short plan (show to the user, do NOT write code yet)

Max 6 lines, covering:
- File(s) to create or modify.
- Component structure / layout.
- Responsive / styling decisions.
- New dependencies, if any (default: none).

Do not move to step 5 until the user approves or adjusts the plan.

## 5. Create a branch

- Check for uncommitted changes (`git status`). If there are changes unrelated to this task, flag them before continuing.
- Branch name: `feature/{number}-{title-slug}` (slug: lowercase, spaces and special characters replaced with `-`). E.g. `feature/1-login-page`.
- `git checkout -b feature/{number}-{slug}`

## 6. Decision point (AskUserQuestion, once)

Ask: "Should I visually verify with Playwright + screenshots before finishing, or go fast with just lint/tests?"

Options:
- **Fast demo mode (default/recommended)** — lint + the project's test suite only.
- **Full visual verification** — additionally spins up the dev server, runs Playwright, and takes screenshots.

## 7. Implement

Follow the approved plan. Reuse existing components, tokens, and conventions already present in the project instead of creating new equivalents.

## 8. Verify

- Always: run lint and the project's test suite (detect the command from `package.json`).
- Only if "full visual verification" was chosen in step 6:
  1. Start the dev server in the background and wait for the port to respond (poll, don't use a long `sleep`).
  2. With Playwright (`npx playwright screenshot ...` or an equivalent script), capture desktop (1280x800) and mobile (390x844) views of the implemented route.
  3. Show the screenshots and compare them against the Figma screenshot from step 3.
  4. Kill the dev server process when done (free the port).

## 9. Wrap-up

2-3 line summary: what was implemented, on which branch, and what's left (if anything). Do not commit or open a PR unless the user explicitly asks.
