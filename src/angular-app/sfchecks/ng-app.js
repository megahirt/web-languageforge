'use strict';

// Declare app level module which depends on filters, and services
angular.module('sfchecks', 
		[
		 'sfchecks.projects',
		 'sfchecks.project',
		 'sfchecks.questions',
		 'sfchecks.question',
		 'sfchecks.filters',
		 'sfchecks.services'
		])
	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when(
    		'/projects', 
    		{
    			templateUrl: '/angular-app/sfchecks/partials/projects.html', 
    			controller: 'ProjectsCtrl'
    		}
	    );
	    $routeProvider.when(
    		'/project/:projectName/:projectId', 
    		{
    			templateUrl: '/angular-app/sfchecks/partials/project.html', 
    			controller: 'ProjectCtrl'
    		}
    	);
	    $routeProvider.when(
	    		'/project/:projectName/:projectId/settings', 
	    		{
	    			templateUrl: '/angular-app/sfchecks/partials/project-settings.html', 
	    			controller: 'ProjectSettingsCtrl'
	    		}
	    	);
	    $routeProvider.when(
    		'/project/:projectName/:projectId/:textName/:textId', 
    		{
    			templateUrl: '/angular-app/sfchecks/partials/questions.html', 
    			controller: 'QuestionsCtrl'
    		}
    	);
	    $routeProvider.when(
	    		'/project/:projectName/:projectId/:textName/:textId/settings', 
	    		{
	    			templateUrl: '/angular-app/sfchecks/partials/questions-settings.html', 
	    			controller: 'QuestionsSettingsCtrl'
	    		}
	    	);
	    $routeProvider.when(
    		'/project/:projectName/:projectId/:textName/:textId/:questionName/:questionId',
    		{
    			templateUrl: '/angular-app/sfchecks/partials/question.html', 
    			controller: 'QuestionCtrl'
			}
		);
	    $routeProvider.otherwise({redirectTo: 'projects'});
	}])
	.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
		$scope.route = $route;
		$scope.location = $location;
		$scope.routeParams = $routeParams;
	}])
	.controller('BreadcrumbCtrl', ['$scope', '$rootScope', 'breadcrumbService', function($scope, $rootScope, breadcrumbService) {
		$rootScope.$on('$routeChangeSuccess', function(event, current) {
			$scope.breadcrumbs = breadcrumbService.read();
		});
	}])
	;
