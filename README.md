# Blooket-API

## Version: 1.0.1 Beta

### Summary

To use the Blooket API, download the source code from the latest release for the latest stable version. You can also use `git clone github.com/redyetidev/Blooket-API.git`

For a live demo, use [this link]("https://redyetidev.github.io/Blooket-API/")

### Pre Setup

##### Disable local file restrictions

Once you have the source code, you need to disable "Local File restrictions." The reason for this is that the code uses ReactJS. With React, the script is not "text/javascript", but instead "text/jsx". The different between normal JS and JSX is that JSX allows us to write HTML in javascript, which is what React needs to run.

Example:
```js
    var html = (<div></div>)
    ReactDOM.render(html,document.getElementById("root"))
```

### Use the API
To use the API, open the JavaScript file in any compiler, and run
```js
    var blook = new Blooket()
    blook.getgame()
```

## Next Steps

The next steps in to creating of this API is to make a NodeJS package.
