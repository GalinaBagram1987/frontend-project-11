# Makefile

.PHONY:
	install #PHONY instal is a fact. not a name

install:
	npm ci # installing dependencies based on package.json
publish:
	npm publish --dry-run

.PHONY: lint

lint:
	npx eslint .
