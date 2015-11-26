(function() {
	var app = angular.module('budget', []);
	app.controller('ExpenseController', ['$http', function($http){
		var budget = this;
		budget.products = [];
		
		$http.get('json/expenses.json').success(function(data){
			budget.products = data;
		});
	}]);
	app.controller('PanelController', function(){
		this.tab = 1;
		
		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		}
	});
	
	app.directive('reviewForm', function(){
		return {
			restrict: 'E',
			templateUrl: "js/review-form.html",
			controller: function() {
				this.rev = {};
		
				this.addReview = function(item){
					this.rev.createdOn = Date.now();
					item.reviews.push(this.rev);
					this.rev = {};
				}
			},
			controllerAs: "reviewCtrl"
		};
	});
})();