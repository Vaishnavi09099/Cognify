import jwt from "jsonwebtoken";


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
}



export const register = (req,res)=>{
    res.send("User registered successfully");
};

export const login = (req,res)=>{
    res.send("user login successfull");
};

export const getProfile = (req,res)=>{
    res.send("We got the profile");
}

export const updateProfile = (req,res)=>{
    res.send("Profile updated carefully");
}
export const changePassword = (req,res)=>{
    res.send("Pass chnaged")
}
