const bcrypt = require('bcrypt')
const user = require('../model')

const signupfunc = async function (req,res) 
{
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await user.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 8);
        data.password = hashedPassword;
        try {
        const userdata = await user.create(data);
        res.render('index')
        }
        catch(error){
            res.send(error)
        }
    }
}


const loginfunc = async function (req,res)
{
        const check = await user.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.render("index");
        }
}

module.exports= { signupfunc, loginfunc }