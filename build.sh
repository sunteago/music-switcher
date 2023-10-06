#!/bin/bash

# Set the source and destination directories
src_dir="src"
firefox_dir="build/firefox"
chrome_dir="build/chrome"

# Delete previous build
rm -rf build

# Create destination directories if they don't exist
mkdir -p "$firefox_dir"
mkdir -p "$chrome_dir"

# Copy files to Firefox directory
cp -r "$src_dir"/* "$firefox_dir"

# Copy files to Chrome directory
cp -r "$src_dir"/* "$chrome_dir"

# Update manifest.json for Firefox
sed -i '/"service_worker": "background.js"/d' "$firefox_dir/manifest.json"

# Update manifest.json for Chrome
sed -i '/"scripts": \["background.js"\],/d' "$chrome_dir/manifest.json"

cd build
npx prettier --write "**/*.{js,jsx,ts,tsx,css,scss,json,md,html}"

echo "Files copied and manifests updated successfully!"
