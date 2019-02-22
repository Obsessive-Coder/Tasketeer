define(function(require) {
	'use strict';

	const interceptor = require('rest/interceptor');

	return interceptor({
		request: function (request /*, config, meta */) {
			/* If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
			if(request.path.includes('{')) {
				request.path = request.path.split('{')[0];
			}
			return request;
		}
	});

});