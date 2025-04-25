# Makefile

.PHONY:
	install #PHONY instal is a fact. not a name

develop:
	npx webpack serve --mode development # Запускает сервер разработки
install:
	npm install # installing dependencies based on package.json
build:
	NODE_ENV=production npx webpack
start:
	npm start
publish:
	npm publish --dry-run
test:
	npm test

.PHONY: lint

lint:
	npx eslint .
lean:
	rm -rf dist # Очищает директорию сборки (настроить под ваши нужды)
