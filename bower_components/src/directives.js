angular.module('ContactsApp')
	.value('FieldTypes', {
		text		: ['Text', 'Should be text'],
		email		: ['Email', 'Should be an email address'],
		number		: ['Number', 'Should be a number'],
		date		: ['Date', 'Should be a date'],
		datetime	: ['DateTime', 'Should be a datetime'],
		time		: ['Time', 'Should be a time'],
		month		: ['Month', 'Should be a month'],
		week		: ['Week', 'Should be a week'],
		url			: ['URL', 'Should be a URL'],
		tel			: ['Phone Number', 'Should be a phone number'],
		color		: ['Color', 'Should be a color']
	})
	
	// AngularJS directive block returning an object with a list of properties.
	.directive('formField', function($timeout, FieldTypes) { // $timeout - AngularJS SetTimeOut method for the ng-update attribute on input fields. 
		return {
			restrict		: 'EA', // restict this object to be used as an element or attribute.
			templateUrl		: 'views/form-fields.html',
			replace			: true, // HTML from form-fields.html will replace form-field element in new.html, otherwise the HTML will be placed within the form-field element in 					new.html.
			scope			: { // determines what attributes on the form-field element will be available in the directive.
									record		: '=', // changes made within this directive updates the controller - 2 way binding directive.
									field		: '@', // read only - 1 way binding directive.
									live		: '@', // read only - 1 way binding directive.
									required	: '@' // read only - 1 way binding directive.
							  },
							link function($scope, element, attr) { //allows for modifications to be made on this directive when it replaces the current form-field element in 																	new.html.
								$scope.types = FieldTypes;

								$scope.remove = function(field) {
									delete.$scope.record[field];
									$scope.blurUpdate();
								};
								// ng-blur update function for input field elements.
								$scope.blurUpdate = function() {
									if($scope.live !== 'false') {
										$scope.record.$update(function(updatedRecord) {
											$scope.record = updatedRecord;
										});
									}
								};
								// ng-update function for input field elements.
								var $timeout;
								$scope.update = function() {
									$timeout.cancel(saveTimeout); // Cancel the update after keyup action.
									saveTimeout = $timeout($scope.blurUpdate, 1000); // update the records after a 1 sec delay, saves to saveTimeout variable.
								};
							}
		};
	});