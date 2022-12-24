export const isEmpty = (inputValue) =>{
    return inputValue.length === 0;
}
export const isLength = (input, value) => {
    return input >= value
}
export const Empty = (name, signupValues, signupError, setSignupError) =>{
    if(isEmpty(name)){
        if(isEmpty(signupValues.username)){
            setSignupError({...signupError, username:"This field cannot be empty please"})
        }
        if(isEmpty(signupValues.email)){
            setSignupError({...signupError, email:"This field cannot be empty please"})
        }
        if(isEmpty(signupValues.pwd)){
            setSignupError({...signupError, pwd:"This field cannot be empty please"})
        }
        return
    }
}
export const CheckLength = (signupValues, signupError, setSignupError) => {
        if(!isLength(signupValues.username.length, 8)){
            setSignupError({...signupError, username:"Minimum of 8 Characters"})
        }
        if(!isLength(signupValues.pwd.length, 6)){
            setSignupError({...signupError, pwd:"Minimum of 6 Characters"})
        }
        return
}

export const isEmail = (email) => {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}