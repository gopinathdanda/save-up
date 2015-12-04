(function() {
	var app = angular.module('budget', []);
	
	// Control tabbing through sections
	app.controller('PageController', function(){
		this.tab = 1;
		
		this.selectTab = function(setTab){
			this.tab = setTab;
		}
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		}
	});
	
	// List all the incomes and expenses
	app.controller('ListExpenses', ['$http', function($http){
		var list = this;
		var incomeTotal = 0;
		list.expenses = [];
		list.incomes = [];
		list.incomeTotal = incomeTotal;
		
		
		$http.get('json/expenses.json').success(function(data){
			list.expenses = data;
		});
		
		$http.get('json/incomes.json').success(function(data){
			list.incomes = data;
			for(var i=0;i<data.length;i++){
				incomeTotal+=data[i].amount;
			}
			list.incomeTotal = incomeTotal;
		});
		
	}]);
	
	// Show expense percentage - need to make it general
	app.directive('expensePercentage',['$http', function($http){
		return {
			restrict: 'E',
			templateUrl: "js/directives/expense-percentage.html",
			controller: function(){
				var list = this;
				var expenseTotal = 0;
				list.expenseTotal = expenseTotal;
				list.expensePercentage = expenseTotal/1000*100;
				list.some = 10;
				
				$http.get('json/expenses.json').success(function(data){
					for(var i=0;i<data.length;i++){
						expenseTotal+=data[i].amount;
					}
					list.expenseTotal = expenseTotal;
					list.expensePercentage = expenseTotal/1000*100;
					//console.log(list.expenseTotal);
				});
			},
			controllerAs: "expenseCtrl"
		};
	}]);
	
	// General form directive
	app.directive('addItem', ['$http', function($http){
		return {
			restrict: 'E',
			templateUrl: "js/add-item-form.html",
			controller: function($attrs){
				if($attrs.formType=="expense"){
					this.showType = true;
					this.labelType = "Expense"; 
				}else if($attrs.formType=="income"){
					this.showType = false;
					this.labelType = "Income";
				}
				
				this.addItem = function(){
					console.log(this.item);
				}
				
				
			},
			controllerAs: "addItemCtrl"
		}
	}]);
	
	// How to make a custom directive - tutorial
	/*
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
	});*/
})();