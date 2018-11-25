#!/usr/bin/env bash
set -ex
docker build -t express-generator -f ./Dockerfile ./
