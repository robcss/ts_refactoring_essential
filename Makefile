.PHONY: trc

trc:
	git add .
	npm test && git commit -m "It works!" || git reset --hard
