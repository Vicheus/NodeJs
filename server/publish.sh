#!/usr/bin/env bash
set -ex
docker build -t gcr.io/bidder-test-216816/node-server -f ./Dockerfile ./
docker push gcr.io/bidder-test-216816/node-server
