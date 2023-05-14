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
		'CloudfrontPrivateKey=$(CLOUDFRONT_PRIVATE_KEY)' \
		CloudfrontKeypairId=$(CLOUDFRONT_KEYPAIR_ID) \
		StorageBucketName=$(STORAGE_BUCKET_NAME) \
		AllowedAudioOrigins=$(ALLOWED_AUDIO_ORIGINS) \
		CORSAllowedOrigins=$(CORS_ALLOWED_ORIGINS)

	$(MAKE dump-stack)
	$(MAKE show-warning)

	$(call show_api_key_warning)

destroy:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(AWS_REGION)

get-token:
	@./scripts/generate-token.js

dump-stack:
	@echo "Dumping stack"
	@aws cloudformation describe-stacks --stack-name $(STACK_NAME) --region $(AWS_REGION) > .stack-output.json

test:
	$(call show_api_key_warning)
	npx jest tests/

define show_api_key_warning
	@echo "\033[0;33mNote that the API is configured to require an API key. This needs to be configured manually. If this is not needed, disable the relevant resources in template.yaml\033[0m"
endef

