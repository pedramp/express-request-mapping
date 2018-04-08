# express-request-mapping

A Node.js module for express.js that handle routing parameters by comments inside of controllers.


### Usage
	
#### Installation
```
$ npm install express-simple-cdn
```

#### Use
```js
var express = require('express');
var app = express();

require('requestmapping')(app);


// controllers
exports.dashboard = function(req, res) {
    /**
     * @get:/dashboard/home
     */
    
    res.json({message:'Hello World...'});
}

```

#### Settings
`path` - controllers directory. sample: `path:__dirname+'/controllers'` .
`register` - list of pre-router modules to register. sample: `register:{module_name: function(req,req, next){...}}`



### Try it
```
$ node test
```



### Todo
* implement pre routing params
* improve custom modules handlers
* improve regex
* documentations



### License
MIT
