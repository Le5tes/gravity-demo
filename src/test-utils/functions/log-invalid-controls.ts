
export function logInvalidControls(form) {
    Object.keys(form.controls)
        .filter(control => form.controls[control].invalid)
        .forEach(control => console.log(control));
}
