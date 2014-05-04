angular.module('BakDigestWebUIApp', ['ui.bootstrap']);

function BackupsController($scope, $http, $rootScope)
{
    var server = "http://bakdigest";

    var loadBackups = function() {
        $http({
            url: server + "/backup"
        }).success(function (data, status, headers, config) {
            $rootScope.backups = data;
        }).error(function (data, status, headers, config) {
            $scope.status = status;
        });
    };

    loadBackups();

    $scope.save = function()
    {
        $http({
            url: server + "/backup",
            method: "POST",
            data: {
                name: $scope.name,
                frequency: $scope.frequency
            }
        }).success(function()
        {
            loadBackups();
        }).error(function()
        {
            alert("error");
        });
    };

    $scope.remove = function(id)
    {
        if(!confirm("¿Do you really want to delete this backup?"))
        {
            return;
        }

        $http({
            url: server + "/backup/" + id,
            method: "DELETE"
        }).success(function()
        {
            loadBackups();
        }).error(function()
        {
            alert("error");
        });
    };
}

function DigestsController($scope, $http, $rootScope)
{
    var server = "http://bakdigest";

    $scope.selection = [];

    var loadDigests = function()
    {
        $http({
            url: server + "/digest"
        }).success(function(data)
        {
            $scope.digests = data;
        }).error(function(data, status)
        {
            $scope.status = status;
        });
    };

    $scope.toggleSelection = function(value)
    {
        var index = $scope.selection.indexOf(value);
        if(index > -1)
        {
            $scope.selection.splice(index, 1);
        }
        else
        {
            $scope.selection.push(value);
        }
    };

    $scope.save = function()
    {
        $http({
            url: server + "/digest",
            method: "POST",
            data: {
                email: $scope.email,
                periodicity: $scope.periodicity,
                start_date: $scope.start_date,
                backup_ids: $scope.selection
            }
        }).success(function()
        {
            loadDigests();
        }).error(function()
        {
            alert("error");
        });
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.remove = function(id)
    {
        if(!confirm("¿Do you really want to delete this digest?"))
        {
            return;
        }

        $http({
            url: server + "/digest/" + id,
            method: "DELETE"
        }).success(function()
        {
            loadDigests();
        }).error(function()
        {
            alert("error");
        });
    };

    loadDigests();
}
