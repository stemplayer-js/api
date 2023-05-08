.PHONY: deploy destroy

# https://stackoverflow.com/questions/2826029/passing-additional-variables-from-command-line-to-make
# https://github.com/babel/babel/blob/master/Makefile
# CFLAGS=-g
# export CFLAGS
export

-include .env
export $(shell sed 's/=.*//' .env)

deploy:
	@echo "Deploying SAM application"
	sam deploy --region $(AWS_REGION) --stack-name $(STACK_NAME) --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --s3-bucket $(SAM_DEPLOYMENT_BUCKET) --parameter-overrides \
		LogLevel=$(LOG_LEVEL) \
		StageName=$(STAGE) \
		SwsSecret=$(SWS_SECRET) \
		'CloudfrontPrivateKey=$(CLOUDFRONT_PRIVATE_KEY)' \
		CloudfrontKeypairId=$(CLOUDFRONT_KEYPAIR_ID) \
		StorageBucketName=$(STORAGE_BUCKET_NAME) \
		AllowedAudioOrigins=$(ALLOWED_AUDIO_ORIGINS) \
		CORSAllowedOrigins=$(CORS_ALLOWED_ORIGINS)

destroy:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(AWS_REGION)

get-token:
	@./scripts/generate-token.js
