# Dolly The Page

> Command-line tool to clone my homepage. :ram:

To simplify the process for some of my friends, who cloned my homepage, I created this small tool. Like cloning sheeps, define a name and run the process.


## What's the purpose?

You need a simple homepage for your domain? You want it fast and responsive? You do not want to waste a lot of time writing it yourself? No problem - just run `dolly-the-page`, answer the questions and upload the generated `html`-file.

What you get is the following: A colorful and nice looking homepage:

    // TOOD: ADD SCREENSHOTS HERE


## What do I have to do?

Install the tool via `npm` (globally to access it from everywhere):

    npm install -g dolly-the-page

To run the interactive mode, just run the command:

    dolly-the-page

Currently only `ionicons` are supported. When you get ask for the icon name, use the full name as they are defined on their [homepage](https://ionicons.com/).

You can also define a config-file in the `yml`-format:

    dolly-the-page -c config.yml

The config-file should look something like the following:

```yaml
name:             Christian Ost
outputFile:       index.html
backgroundColor:  #FFD54F
fontColor:        #212121
favicon:          favicon.ico
links:
  - name:         Christian Ost
    url:          https://www.christianost.de
    icon:         ion-heart
```