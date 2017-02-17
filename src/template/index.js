const createStyle = ({ fontColor, backgroundColor }) => {
  return `*{margin:0;padding:0;box-sizing:border-box;}html, body{font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",sans-serif;color:${fontColor};font-size:1em;}h1{font-family:Baskerville,"Baskerville Old Face","Goudy Old Style",Garamond,"Times New Roman",serif;font-weight:300;font-size:3em;}a{color:${fontColor};cursor:pointer;text-decoration:none;border-bottom:1px solid ${backgroundColor};margin:0.5em;}a:link{border-bottom:1px solid ${backgroundColor};}a:visited{border-bottom:1px solid ${backgroundColor};}a:focus{border-bottom:1px solid ${fontColor};}a:hover{border-bottom:1px solid ${fontColor};}a:active{border-bottom:1px solid ${fontColor};}a svg{height:1em;cursor:pointer;}main{min-height:100vh;min-width:100%;background-color:${backgroundColor};display:flex;flex-direction:column;justify-content:center;align-items:center;}header{width:100%;margin-bottom:1em;text-align:center;}nav{width:100%;display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap;}`;
};

const createHead = params => {
  return `<head><meta name="viewport" content="initial-scale=1"><meta charset="utf-8"><meta name="author" content="${params.name}"><title>${params.name}</title><style>${createStyle(
    params
  )}</style><link rel="icon" type="image/x-icon" href="${params.icon}" />
<!--
  * base layout by Christian Ost (www.christianost.de)
  * this website is created with dolly-the-page (www.christianost.de/dolly-the-page)
--></head>`;
};
const createBody = ({ name }) => {
  return `<body><main><header><h1>${name}</h1></header></main></body>`;
};

module.exports = params => {
  // TODO validate input
  // TODO escape input
  console.log('\nCreating the homepage...');
  return `<!DOCTYPE html><html>${createHead(params)}${createBody(params)}</html>`;
};
