module.exports.validateRegisterInput=(
   username,email,password,confirmPassword 
)=>{
const errors={}; 
if (username.trim()===''){
    errors.username=('Le champs de Username est obligatoire')
}
if (email.trim()===''){
    errors.email=('Le champs de Email est obligatoire')
}else{
    const RegEx= /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!email.match(RegEx)){
        errors.email=('Votre adresse email est invalide!!')
    }

}
if (password===''){
    errors.password=('Le champs de Mot de passe est obligatoire')
}else if(password!==confirmPassword){
    errors.password=("Votre mot de passe n'est pas compatible")
}
if (confirmPassword===''){
    errors.confirmPassword=('Vous devez confirmer votre mot de passe')
}
return{
errors,
    valid:Object.keys(errors)<1
}
}
module.exports.validateLoginInput=(username,password)=>{
    const errors={};

    if (username.trim()===''){
        errors.username=('Le champs de Username est obligatoire')
    }

    if (password.trim()===''){
        errors.password=('Le champs de mot de passe est obligatoire')
    }
    return{
        errors,
            valid:Object.keys(errors)<1
        }

}