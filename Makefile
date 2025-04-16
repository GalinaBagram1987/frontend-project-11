# Makefile

.PHONY:
	install #PHONY instal is a fact. not a name

develop:
	npx webpack serve
install:
	npm ci # installing dependencies based on package.json
build:
	NODE_ENV=production npx webpack
publish:
	npm publish --dry-run
test:
	npm test

.PHONY: lint

lint:
	npx eslint .
