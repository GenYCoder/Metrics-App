angular.module("dataStorage.service",[])
    .factory("dataStorage", function () {
        //helps reduce repeated calls on the server
        var data = window.hasOwnProperty || Object.prototype.hasOwnProperty;


        return {
            add: function (name, userData) {
                if (data.hasOwnProperty(name)) {
                    return;
                }
                
                data[name] = userData;
                
            },
            remove: function (name) {
                //checks if the property in that object is there and if it is remove it otherwise do nothing
                if (data.hasOwnProperty(name)) {
                    delete data[name];
                }
                return;
            },
            get: function (name) {
                if (data.hasOwnProperty(name)) {
                    return data[name];
                } 

                return;
            },
            isEmpty: function (obj) {
                if (obj == null) return true;


                if (obj.length > 0) return false;
                if (obj.length === 0) return true;


                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        return false;
                    }

                }

                return true;

            }
        };
    });