uninstall: clean
	cd ux && rm -rf package-lock.json node_modules

install:
	cd ux && npm install

reinstall: uninstall install

serve:
	cd ux && npm run start

build: clean
	cd ux && npm run build

clean:
	cd ux && rm -rf build

test:
	cd ux && npm run test
