GRUNT = ./node_modules/.bin/grunt
BOWER = ./node_modules/bower/bin/bower

build: clean bower grunt

bower:
	${BOWER} install

grunt:
	${GRUNT}

clean:
	rm -rf public/build/tmp

.PHONY: build bower grunt clean