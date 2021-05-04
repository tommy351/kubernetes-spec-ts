#!/bin/bash

set -euo pipefail

pnpm run clean
pnpm run build
pnpm recursive --filter '!@kubernetes-models/monorepo' run prepack
pnpx changeset publish
git push --follow-tags
