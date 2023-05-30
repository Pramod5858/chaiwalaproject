const jwt = require("jsonwebtoken")
const JWT_SECRET = "Knowledgeisthebestsolution";

  function verifyToken(req, res, next) {
    try {
      //console.log("You have reached transferget");
      let token = req.headers["authorization"] || req.body.token || req.query.token;
  //console.log("token details is here "+token);
      if (!token) {
        res.status(401).json({message:"Token not match or token is missing"});
      } else {
        token = token.split(" ")[1];
  
        //console.log("you reached here "+token);
        let decode = jwt.verify(token, JWT_SECRET)
        //console.log("token, JWT_SECRET");
        console.log(decode);
        req.user = decode; 
        
        next();
        
      }
    } catch (error) {
      console.error(error.message);
      res.send(error);
    }
  }

  module.exports = verifyToken
