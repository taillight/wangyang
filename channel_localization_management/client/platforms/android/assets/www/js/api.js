﻿
(function() {
	window.config = {
		baseUrl : "/jh-web/", // APP接口路径
		imageUrl : "/",
	};
    //serviceName
    window.Api = function(opt) {
        if (!opt) return;
        if (opt.serviceName) {
            this.serviceName = opt.serviceName;
        } else {
            throw ('Api error: 必须输入serviceName');
        }
    };
    window.Api.prototype = {
        exec: function(opt, cb) {
            this.getdata(opt, cb);
        },
        getdata: function(option, sc, shortTimeWaiting) {


            var self = this;
            $.am.debug.log(this.serviceName + ": " + JSON.stringify(option));

            var ajaxObj = $.ajax({
                type: "post",
                data: JSON.stringify(option),
                url: config.baseUrl + this.serviceName + "?ts=" + new Date().getTime(),
                timeout: 10 * 1000,
                dataType: "json",
                contentType: "application/json",
                success: function(ret) {
                    $.am.debug.log(self.serviceName + " scb: " + ret.code);
                    sc(ret);

                    var ts = new Date(ajaxObj.getResponseHeader("Date"));
                    if (ts) {
                        //amGloble.syncTime(ts.getTime());
                    }
                },
                error: function(ret) {
                    $.am.debug.log(self.serviceName + " fcb: " + ret.statusText);
                    // console.log(ret);
                    if (ret.statusText != "abort") {
                        sc({
                            result: -1,
                            message: "网络不给力,请检查网络环境！"
                        });
                    } else {
                        sc({
                            result: -2,
                            message: "用户取消"
                        });
                    }
                }
            });

            return ajaxObj;
        }
    };

    /*
     * ApiCacheable类,实例化一个service对象,通过调用这个对象的exec方法执行一个service
     * @Class
     * @public
     *
     * @param opt.serviceName   [string]    必需      undefined   service名称
     * @param opt.keys          [array]     必需      undefined   参数名
     * @param opt.memoryCache   [boolean]   可选      false       是否启用内存缓存
     * @param opt.isSuccess     [function]  必需      返回是否成功调用业务数据,参数为结果
     *
     * @return                  [ApiCacheable]
     */
    ApiCacheable = function(opt) {
        if (!opt) return;
        Api.call(this, opt);
        if (opt.keys && opt.isSuccess) {
            this.keys = opt.keys;
            this.isSuccess = opt.isSuccess;
        } else {
            throw ('ApiCacheable error: 参数有误,必须输入keys[array],isSuccess[function]');
        }
        this.memoryCache = opt.memoryCache;
        this.storeData = {};
    };
    ApiCacheable.prototype = new Api();
    /*
     * 获取作为cache使用的key,此key由servicename和参数组成(过滤掉keyFilter);
     * @function
     * @private
     * @param    opt    [object]     必需      调用service的时的option
     *
     * @return   key    [string]
     */
    ApiCacheable.prototype._key = function(opt) {
            var key = "RF" + "_" + this.serviceName;
            for (var i = 0; i < this.keys.length; i++) {
                key = key + "_" + opt[this.keys[i]];
            };
            return key;
        },
        /*
         * 读取本地存储中的数据
         * @function
         * @private
         * @param    opt    [string]     必需      接口参数
         *
         * @return   result [object]     service的本地数据
         */
        ApiCacheable.prototype._get = function(opt) {
            var key = typeof(opt) == "string" ? opt : this._key(opt);
            var temp = localStorage.getItem(key);
            if (!temp) {
                return;
            }
            try {
                temp = JSON.parse(temp);
            } catch (e) {
                $.am.debug.log("api.get JSON.parse error:" + key);
                temp = null;
            }
            return temp;
        },
        /*
         * 保存service数据到本地存储中
         * @function
         * @private
         * @param    opt    [object]     必需      接口参数
         * @param    data   [object]     必需      调用数据成功后得到的数据
         *
         * @return   result [object]     service的本地数据
         */
        ApiCacheable.prototype._save = function(opt, data) {
            localStorage.setItem(typeof(opt) == "string" ? opt : this._key(opt), JSON.stringify(data));
        },
        /*
         * 添加一个数据对象到缓存中
         * @function
         * @public
         * @param    option  [object]     必需     缓存数据的参数,需要以此参数生成key
         * @param    item    [function]   必需     要插入的数据对象
         * @param    noCache [boolean]    可选     目标路径,如:"responseData.data.storelist"
         *
         * @return
         * @description
         */
        ApiCacheable.prototype.addItemToCache = function(option, item, targetPath) {

        },
        /*
         * 执行service
         * @function
         * @public
         * @param    option  [object]     必需     调用service的时的option
         * @param    sc      [function]   必需     回调函数
         * @param    noCache [boolean]    可选     是否忽略缓存数据
         *
         * @return
         */
        ApiCacheable.prototype.exec = function(opt, cb, noCache) {
            var key = this._key(opt),
                _this = this;
            if (this.memoryCache && this.storeData[key]) {
                cb(_this.storeData[key], 2);
                //内存数据, 说明之前至少成功取到一次网络或者local数据
                return;
            }
            var loc = this._get(key);
            if (loc) {
                this.memoryCache && (_this.storeData[key] = loc);
                cb(loc, 1);
            }
            _this.getdata(opt, function(ret) {
                if (_this.isSuccess(ret)) {
                    _this._save(key, ret);
                    _this.memoryCache && (_this.storeData[key] = ret);
                }
                cb(ret);
            });
        };
})();
