# The Stemplayer-JS Backend API

A nested stack of certain serverless microservices to provide the stemplayer with

- [Audio conversion of Audio Files into HLS format](https://github.com/sound-ws/hls-service)
- [Automatic generation of waveforms](https://github.com/sound-ws/audio-waveform-service)
- [Mixing together of various stem audio files in order to create a high quality downloadable audio file.](https://github.com/sound-ws/audio-mix-service)

## Usage

You can either deploy from by checking out this repository and following the steps below; but absolutely the easiest way is to deploy it directly from the [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/) into your own AWS account.

## Prerequisites

- Make sure you have installed [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Create a SAM deployment bucket
- Copy `cp .env.dist .env` and fill out the required variables

## Installation

Run `npm install`

Or `yarn install`

## Deployment

Run `make deploy`

## Test

Run `make test`

## Destroy

To destroy the stack and remove all resources run `make destroy`.

## Production

Make sure that the values for `CORS_ALLOWED_ORIGINS` and `ALLOWED_AUDIO_ORIGINS` (in .env) are set to non wildcard values
