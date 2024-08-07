const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const port = 3000
app.get("/", (req, res) => {
    res.send("This is just the base page try the endpoints (/login or /profile)");
})
/*
now open the postman and make the method as post and in the url part just use the url localhost:3000/login 
and 
then click on the send button and in the result's body page copy the token code 
and
do not close this tab and in the new tab maek the method post and in the url part just use the url localhost:3000/profile
and 
then in the headers tab type authorization in the key tab and in the value tab use the keyword Bearer and paste the token copied from the previous tab
and 
then click on send make sure that secret code is same in both of the cases i.e in login(jwt sign) and in profile (jwt verify)... 
*/
app.post("/login", (req, res) => {
    const user = {
        user: "VSC",
        password: "IamVsc"
    }
    jwt.sign({ user }, "Secret bro idhi Nen cheppa", (err, token) => {
        res.status(200).json({ token });
    })
});

function verifyToken(req, res, next) {
    token = req.headers.authorization.split(' ')[1];
    req.token = token;
    next();
}

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, "Secret bro idhi Nen cheppa", (err,token) => {
        if (!err)
            res.status(200).json({ message: "profile Acessed" });
        else
            res.status(300).send("Wrong Key, Invalid Authentication tried");
    })
});

app.listen(port, () => console.log(`Server is listening at port ${port}`));