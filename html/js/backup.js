function BackupCtrl($scope, $http)
{
    var server = "http://bakdigest";

    var loadBackups = function() {
        $http({
            url: server + "/backup"
        }).success(function (data, status, headers, config) {
            $scope.backups = data;
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
