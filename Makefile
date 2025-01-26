IMAGE_NAME := khalidhossain/dfec-products
DOCKERFILE_PATH := .

.PHONY: all build

all: build

build:
	docker build -t $(IMAGE_NAME) $(DOCKERFILE_PATH)