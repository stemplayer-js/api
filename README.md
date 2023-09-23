# The Stemplayer-JS Backend API

A nested stack of certain serverless microservices to provide the stemplayer with

- [Audio conversion of Audio Files into HLS format](https://github.com/sound-ws/hls-service)
- [Automatic generation of waveforms](https://github.com/sound-ws/audio-waveform-service)
- [Mixing together of various stem audio files in order to create a high quality downloadable audio file.](https://github.com/sound-ws/audio-mix-service)

# Prerequisites

- Create a SAM deployment bucket
- Copy `cp .env.dist .env` and fill out the variables

# Deployment

```bash
make deploy
```

# Test

Run `make test` (after deployment)
