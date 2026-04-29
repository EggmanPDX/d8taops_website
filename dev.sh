#!/usr/bin/env bash
# Start D8:WEBSITE dev server
# Handles the colon-in-path issue and ensures deps are installed
set -e

PROJ_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$PROJ_DIR/node_modules" ] || [ ! -f "$PROJ_DIR/node_modules/.package-lock.json" ]; then
  echo "Installing dependencies..."
  npm --prefix "$PROJ_DIR" install
fi

echo "Starting D8:WEBSITE dev server..."
npm --prefix "$PROJ_DIR" run dev
