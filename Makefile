FILES=background.js icon.svg manifest.json

SayNoToTabs.zip: $(FILES)
	zip -r -FS SayNoToTabs.zip $(FILES)

clean:
	rm -f SayNoToTabs.zip
