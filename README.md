# CodeAtlas

CodeAtlas is a Node.js and TypeScript CLI for generating project atlases, explaining topics, and guiding onboarding flows.

## Install

```bash
npm install
npm install -g .
```

After a global install, the `codeatlas` command is available on your PATH.

## Usage

```bash
codeatlas --help
codeatlas generate --format md
codeatlas generate --no-ai --focus architecture
codeatlas explain "request flow"
codeatlas onboard
codeatlas ask "Where is authentication handled?"
```

## Commands

- `codeatlas generate` creates an atlas stub and ensures `docs/atlas/` exists in the current working directory.
- `codeatlas explain <topic>` opens an explanation workflow for a specific topic.
- `codeatlas onboard` starts an onboarding flow.
- `codeatlas ask "<question>"` captures a question for later processing.

## Flags

`generate` supports:

- `--help`
- `--version`
- `--no-ai`
- `--focus <topic>`
- `--format <md|html>`

## Development

```bash
npm run build
npm run lint
npm test
npm run dev
```
