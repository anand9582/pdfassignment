#!/bin/bash
set -e

# Ensure proper permissions
chmod +x node_modules/.bin/*

# Run the build
npm run build
