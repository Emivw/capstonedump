const RolePermission = require('../models/rolepermission').RolePermission;
const Permission = require('../models/permission').Permission;

class Helper {
    function_constructor() {
        this.checkPermission = Permission
    }

    checkPermission(roleId, permName) {
        return new Promise(
            (resolve, reject) => {
                Permission.findOne({
                    where: {
                        perm_name: permName
                    }
                }).then((perm) => {
                    RolePermission.findOne({
                        where: {
                            role_id: roleId,
                            perm_id: perm.id
                        }
                    }).then((rolePermission) => {
                        // console.log(rolePermission);
                        if (rolePermission) {
                            resolve(rolePermission);
                        } else {
                            reject({ message: 'Forbidden' });
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch(() => {
                    reject({ message: 'Forbidden' });
                });
            }
        );
    }
}

module.exports = Helper;