# The sound.ws API

An integrated deployment of a suite of micro-services which together compose the API.

# Prerequisites

- Create a SAM deployment bucket
- Copy `cp .env.dist .env` and fill out the variables

# Deployment

```bash
make deploy
```

# Test

Run `make test` (after deployment)
