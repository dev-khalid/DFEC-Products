IMAGE_NAME := khalidhossain/dfec-products
DOCKERFILE_PATH := .

.PHONY: all build push build-and-push

all: build

build:
	docker build -t $(IMAGE_NAME) $(DOCKERFILE_PATH)

push: 
	docker push $(IMAGE_NAME)

build-and-push: build push