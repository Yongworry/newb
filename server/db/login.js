const LoginModel = require('../models/login');


class LoginDB {
    static _inst_;
    static getInst = () => {
        if ( !LoginDB._inst_ ) LoginDB._inst_ = new LoginDB();
        return LoginDB._inst_;
    }

    constructor() {console.log("LoginDB Init Completed")};



    login = async( code ) => {
        try {
            console.log(code);
            const OLoginFilter = { code: code };
            const res = await LoginModel.findOne(OLoginFilter);
            if (res == null) {
                console.log("login failed");
                return { success: false };
            }   else {
                console.log("login success!");
                return {success: true, data: res};
            }
        }   catch(e) {
            console.log(`login Error: ${e}`);
            return false;
        }
    }
}


module.exports = LoginDB;
