"use strict";

const fs = require('fs');
const _db = {};
const _routes = ['all', 'get', 'post', 'put', 'patch', 'delete'];
const pattern = /\*([^*]|(\*+[^\*\/]))*\*/igm;

module.exports = (app, params) => {
	params = params || {};
	let path = params.path || __dirname + '/controllers';

	let jsFile = /\.js$/i;
	let innerPattern = /\@(.*?)\:(.*)/igm;

	fs.readdirSync(path).forEach(function(name)
	{
		if(jsFile.test(name))
		{
			let obj = require(path + '/' + name);

		    for(var key in obj)
		    {
		    	var results = obj[key].toString().match(pattern).toString();
		    	var matches = results.match(innerPattern);
		    	let _append = [];

		    	for(let i=0; i<matches.length; i++)
		    	{
		    		innerPattern = /\@(.*?)\:(.*)/igm;
		    		let item = innerPattern.exec(String(matches[i]));
		    		if(item != null && item.length > 2) 
		    		{	    	
		    			if( _routes.indexOf(item[1]) > -1 ) // route method
		    			{
		    				//    method    route				controller
		    				app[ item[1] ]( item[2] , _append , obj[key] );
		    				console.info(item[1] + ':', item[2] , _append.length);
		    			}else if(_db[ item[1] ] != null && typeof _db[ item[1] ] == 'function' )
		    			{
		    				//TODO: bind params item[2] to method
		    				_append.push( _db[ item[1] ] )
		    			}else  {
		    				// console.log('cannot found module');
		    			}
	      			}else  {
	      				// console.log('pattern wrong');
	      			}
      			}
      		
		    }
		}
	})
}


function register(key, value)
{
  _db[ key ] = value;
};

function registerBulk(items)
{
  items = items || {};
  for(let item in items)
  {
  	register(item, items[item]);
  };
};


module.exports.register = register;
