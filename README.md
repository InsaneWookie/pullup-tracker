## How to develop locally

### If node installed

Install local web server  
`npm install http-server -g`

Start server  
`http-server -p 8080 -c-1`

### If Docker installed 
`docker run --rm --name some-nginx -p 8080:80 -v $(pwd):/usr/share/nginx/html:ro nginx`


### Webpack live reload
`npm install`  
`npm run watch`


### Then Visit  
`http://localhost:8080/index.html`



