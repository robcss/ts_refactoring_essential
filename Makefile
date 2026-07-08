.PHONY: trc legacy

trc:
	git add .
	npm test && git commit -m "It works!" || git reset --hard

legacy:
	cd legacy_code/src && bash test.sh
