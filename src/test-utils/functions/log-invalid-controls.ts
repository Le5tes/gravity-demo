
/**
 * @description log which controls are invalid in a formgroup to the console
 * @param form
 * @return
 */
export function logInvalidControls(form) {
    Object.keys(form.controls)
        .filter(control => form.controls[control].invalid)
        .forEach(control => console.log(control));
}
