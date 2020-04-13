const User=require('../../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {SECRET_KEY}=require('../../config');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/Validators');

const generateToken=(user)=>{
    return jwt.sign(
        {
        id:user.id,
        email:user.email,
        username:user.username,
        
    },
    
    SECRET_KEY,
    {expiresIn:'2h'})
}
module.exports={
    Mutation:{
       async login(_,{username,password}){
            const{valid,errors}= validateLoginInput(username,password)
            if(!valid){
                throw new UserInputError('Verifier votre mote de passe ou bien username',{errors}) 
            }
            const user= await User.findOne({username})
            if(!user){
                errors.general='Votre utilisateur est introuvable'
                throw new UserInputError('Votre utilisateur est introuvable',{errors})
            }
            const match=await bcrypt.compare(password,user.password)
            if(!match){
                errors.general='Verfier votre mot de passe'
                throw new UserInputError('Verfier votre mot de passe',{errors})
            }
            const token =generateToken(user)
            return {
                ...user._doc,
                id:user._id,
                token,
                createdAt:user.createdAt
            }
        },
        register:async(_,{registerInput:
            {
                username,
                password,
                confirmPassword,
                email,createdAt}
        })=>
      {
          const {valid,errors}=await validateRegisterInput(username,email,password,confirmPassword)
          if(!valid){
              throw new UserInputError('Errors',{errors})
          }
          const Email=await User.findOne({email})
          if(Email){
              throw new UserInputError('Cet email est utilisé',{
                  errors:{
                      email:'Cet Email est utilisé'
                  }
              })
          }
          const  user = await User.findOne({username});
          if(user){
              throw new UserInputError('Cet Username est utilisé',{
                  errors:{
                      username:'Ce username est utilisé'
                  }
              })
          }
      
            password=await bcrypt.hash(password,12)

            const newUser= new User({
                email,
                username,
                password,
             confirmPassword,
             createdAt:new Date().toISOString()
                
            });
       
            const response =await newUser.save();
            console.log(response)
           const token=generateToken(response)
            
return {
    ...response._doc,
    id:response._id,
    token,
    createdAt:response.createdAt
}
        }
    }
}