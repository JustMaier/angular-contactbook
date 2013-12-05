angular.module('app')
.controller('mainCtrl', ['$scope','angularFire', function($scope, angularFire){
	//helper variables
	var Contact = function(){
		return {
			name: '',
			email: '',
			phone: ''
		};
	};

	//helper function

	//$scope variables
	$scope.contacts = [];
	$scope.selected = null;

	//$scope functions
	$scope.addContact = function(){
		var newContact = new Contact();
		newContact.new = true;
		$scope.contacts.push(newContact);
		$scope.selectContact(newContact);
		$scope.editContact(newContact);
	}
	$scope.selectContact = function(contact){
		$scope.selected = contact;
	}
	$scope.editContact = function(contact){
		if(contact.edit != null) delete contact.edit;
		contact.edit = angular.copy(contact);
	}
	$scope.saveContact = function(contact){
		var edited = angular.copy(contact.edit);
		delete contact.edit;
		var index = $scope.contacts.indexOf(contact);
		$scope.contacts.splice(index, 1, edited);
		$scope.selectContact($scope.contacts[index]);
		if(edited.new) delete edited.new;
	}
	$scope.cancelEditContact = function(contact){
		delete contact.edit;
		if(contact.new){
			$scope.deleteContact(contact);
		}
	}
	$scope.deleteContact = function(contact){
		var index = $scope.contacts.indexOf(contact);
		$scope.contacts.splice(index, 1);
		$scope.selected = null;
	}

	//Bind to firebase - replace with your firebase url...
	var firebase = new Firebase("https://justinm.firebaseio.com/contacts");
	angularFire(firebase, $scope, 'contacts');
}]);