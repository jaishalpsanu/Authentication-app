// ...... email validation...........

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// .......username validatiuon.......

export function validateUsername(username) {
    return username.trim().length >= 3 &&
        username.trim().length <= 20;
}

//......full name validation...

export function validateFullname(fullname) {
    return fullname.trim().length >= 2;
}

//.......password validation........

export function validatePassword(password) {
    return password.trim().length >= 6;
}