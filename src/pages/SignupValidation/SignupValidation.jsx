function SignupValidation(values) {
    let error = {}
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    if (values.name === "") {
        error.name = "Name is required"
    } else {
        error.name = ""
    } 
    if (values.email === "") {
        error.email = "Email is required"
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email is invalid"
    }

    if (values.password === "") {
        error.password = "Password is required"
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password is invalid"
    }
    else {
        error.password = ""
    }
    return error
    
}

export default SignupValidation