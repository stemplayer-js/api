.PHONY: all

export

-include .env
export $(shell sed 's/=.*//' .env)

deploy:
	@echo "Deploying SAM application"
	sam deploy --region $(AWS_REGION) --stack-name $(STACK_NAME) --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --s3-bucket $(SAM_DEPLOYMENT_BUCKET) --parameter-overrides \
		LogLevel=$(LOG_LEVEL) \
		StageName=$(STAGE) \
		SwsSecret=$(SWS_SECRET) \
		StorageBucketName=$(STORAGE_BUCKET_NAME) \
		AllowedAudioOrigins=$(ALLOWED_AUDIO_ORIGINS) \
		CORSAllowedOrigins=$(CORS_ALLOWED_ORIGINS) \
		ExistingBucket=$(EXISTING_BUCKET)

	$(MAKE) dump-stack
	@echo "\033[0;33mTo test the deployment run npm test\033[0m"

destroy:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(AWS_REGION)

get-token:
	@./scripts/generate-token.js

dump-stack:
	@echo "Dumping stack"
	@aws cloudformation describe-stacks --stack-name $(STACK_NAME) --region $(AWS_REGION) > .stack-output.json

test:
	npx jest tests/

