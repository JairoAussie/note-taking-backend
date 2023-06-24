const { verifyToken } = require("../services/auth_service");


const validateRequest = (request, response, next) => {
    console.log(request.headers)
    try{
        if(request.headers.authorization){
            const token = request.headers.authorization.split(" ")[1];
            if (!token){
                throw new Error ("A token is required for authentication")
            }
            const decoded = verifyToken(token)
            // add to the request the decoded token, so we can access to it (find a user)
            request.user = decoded
            return next();
        } else{
            throw new Error ("Not authenticated for this action")
        }
        
    } catch (error) {
        next(error)
    }
    
}

module.exports = validateRequest