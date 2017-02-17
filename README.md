# Dolly The Page

> Command-line tool to clone my homepage.

To simplify the process for some of my friends, who cloned my homepage, I created this small tool. Like cloning sheeps, define a name and run the process.


## What's the purpose?

You need a simple homepage to use your domain? You want it fast and responsive? You do not want to waste a lot of time writing it yourself? No problem - just run `dolly-the-page`, answer the questions and upload the generated `html`-file.

What you get is the following: A colorful and nice looking homepage:

SCREENSHOTS HERE

## What do I have to do?

Install the tool via `npm` (globally to access it from everywhere):

    npm install -g dolly-the-page

To run the interactive mode, just run the command:

    dolly-the-page

Currently only `ionicons` are supported. When you ask for the icon name, use the full name as it is defined on their [homepage](...).

You can also define a config-file in the `yml`-format, if you need some time defining all the content:

    dolly-the-page -c config.yml

The config-file should look something like the following:

```yml
name: Christian Ost
backgroundColor: #whatever
fontColor: #whatever
outputFile: index.html
links:
  title:
  url:
  icon:
```