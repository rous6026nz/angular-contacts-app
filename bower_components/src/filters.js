angular.module('ContactsApp')
	.filter('labelCase', function() {
		return function(input) {
			input = input.replace(/([A-Z])/g, ' $1'); // Get the capital leter and prepend a space.
			return input[0].toUpperCase() // Get the first letter and convert to uppercase.
			+ input.slice(1); // Concatinate every letter except the first letter.
		};
	})
	
	.filter('camelCase', function() {
		return function(input) {
			return input.toLowerCase().replace(/ (\w)/g, function(match, letter) {
				return letter.toUpperCase();
			})
		}
	})
	
	.filter('keyFilter', function() {
		return function(obj, query) {
			var result = {};
			angular.forEach(obj, function(val, key) {
				if(key !==query) {
					result[key] = val;
				}
			});
			return result;
		}
	});