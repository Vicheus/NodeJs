#!/usr/bin/env bash
set -ex
docker build -t gcr.io/bidder-test-216816/angular -f ./Dockerfile ./
docker push gcr.io/bidder-test-216816/angular
