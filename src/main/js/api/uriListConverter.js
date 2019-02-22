define(function() {
	'use strict';

	/* Convert a single or array of resources into "URI1\nURI2\nURI3..." */
	return {
		read: function(str /*, opts */) {
			return str.split('\n');
		},
		write: function(obj /*, opts */) {
			// If this is an Array, extract the self URI and then join using a newline
			let href = obj._links.self.href;
			if (obj instanceof Array) {
				href = obj.map(resource => resource._links.self.href).join('\n');
			}
			return href;
		}
	};
});