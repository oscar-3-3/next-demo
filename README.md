A sandbox repo used to demo and exercise Claude Code's PR workflow on a real Next.js app: custom skills, automated PR review, and comment resolution, wired together through GitHub Actions.

## Repo layout

```
.
├── my-app/            # The Next.js application (see my-app/README.md for app-level docs)
├── .claude/
│   └── skills/         # Project-scoped Claude Code skills (slash commands)
├── .github/
│   └── workflows/       # CI: lint/test/build, automated Claude PR review, GitHub Pages deploy
└── .mcp.json            # MCP server configuration for this project
```

The Next.js app itself lives entirely under `my-app/` — all `npm` commands (`dev`, `lint`, `test`, `build`) are run from that directory. See [`my-app/README.md`](my-app/README.md) for how to run it and what pages it has.

## Claude Code skills

Defined in `.claude/skills/`, available as slash commands:

| Skill | Command | What it does |
| --- | --- | --- |
| Commit | `/commit` | Stages the relevant files and creates a git commit with a message focused on *why*, matching this repo's commit style. Checks for accidentally-staged secrets first. |
| Create PR | `/create-pr` | Opens a GitHub pull request for the current branch against `main` via `gh`, pushing the branch if needed and writing the title/body from the branch's commit history and diff. |
| Resolve PR comments | `/resolve-pr-comments [pr-number]` | Fetches unresolved review threads on a PR (including Claude's own automated review comments), fixes the underlying code, verifies with lint/typecheck, pushes the fix, and resolves each addressed thread on GitHub. |
| Figma ticket | `/figma-ticket <issue>` | Implements a GitHub issue end-to-end: fetches the ticket (and its Figma design, if linked), drafts a short plan, creates a feature branch, implements it, and optionally verifies visually with Playwright. |

## CI/CD and automated PR review

Two GitHub Actions workflows live in `.github/workflows/`:

- **`build-pr.yml`** — runs on every pull request that touches `my-app/`:
  1. Installs dependencies, then runs `lint`, `test`, and `build` to validate the change.
  2. If that succeeds, runs **Claude Code Review** (`anthropics/claude-code-action`), which reviews the diff for bugs, security issues (XSS, unsafe data handling, etc.), performance, and type-safety problems. It skips minor nitpicks and avoids repeating feedback already posted on the PR, posting findings as top-level and inline GitHub PR comments.
  3. Sends a Slack notification if the build fails, and a separate Slack notification summarizing new review feedback whenever Claude posts any.
- **`deploy.yml`** — builds and deploys the app to GitHub Pages on pushes to `main`.

The loop this repo is set up for: open a PR → CI builds/tests it → Claude reviews it and leaves comments → run `/resolve-pr-comments` to fix and resolve that feedback → CI re-validates the fix.
