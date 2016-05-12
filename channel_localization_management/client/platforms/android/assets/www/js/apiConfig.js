
(function() {
    var self = amGloble.api = {

        login: new Api({
            serviceName: "/user/login"
        }),
        queryUserInfo: new Api({
            serviceName: "/hairdressing/user/queryUserInfo"
        }),
		general_getMetaData : new ApiCacheable({
			serviceName : "/hairdressing/general/getMetaData",
			keys : ["tenantId", "userName"],
			memoryCache : true,
			isSuccess : function(ret) {
				if (ret && ret.result == 0 && ret.responseData && ret.responseData.result == 0 && ret.responseData.content) {
					return true;
				}
			}
		}),
        messageList: new Api({
            serviceName: "/reeli-svr/employee/message/list"
        }),
        queryUnreadNumber: new Api({
            serviceName: "/reeli-svr/employee/message/queryUnreadNumber"
        }),
        registerDevice: new Api({
            serviceName: "/reeli-svr/employee/message/registerDevice"
        }),
        deviceStatus: new Api({
            serviceName: "/reeli-svr/employee/message/deviceStatus"
        }),
        unregisterDevice: new Api({
            serviceName: "/reeli-svr/employee/message/unregisterDevice"
        }),
        general_getMetaData: new ApiCacheable({
            serviceName: "/mgmt/mobile/metadata",
            keys: ["tenantId", "userName"],
            memoryCache: true,
            isSuccess: function(ret) {
                if (ret && ret.result == 0 && ret.responseData && ret.responseData.result == 0 && ret.responseData.content) {
                    return true;
                }
            }
        }),
        queryShrinkagelevel: new Api({
            serviceName: "/mgmt/mobile/shrinkagelevel/query"
        }),
        setShrinkagelevel: new Api({
            serviceName: "/mgmt/mobile/shrinkagelevel/set"
        })
    };
})();
