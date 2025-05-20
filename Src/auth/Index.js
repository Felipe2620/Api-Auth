const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../middlewares/error");

const secret = config.jwt.secret;

function assignToken(data) {
    return jwt.sign(data, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}
const checkToken = {
    confirmToken: function (req, id, type) {
        const decode = decodeHeader(req);
        console.log(decode);
        if (type === 0) {
            if (decode.dataValues.id != id && decode.Roleid != '') {
                throw new Error("You are not authorized to access this resource");
            }
        }
    },
};

function getToken(authorization) {
    if (!authorization) {
        throw new Error("No authorization header provided");
    }if(authorization.IndexOf('Bearer') === -1){
        throw new Error("Invalid format");
    }
    let token = authorization.replace("Bearer ","");
    return token;
};