import { AbstractControl } from '@angular/forms'

export function passwordMatchValidation( password : string, confirm_password : string ){


    return function(form : AbstractControl){
        const pass = form.get('password')?.value
        const confirm_password = form.get('confirm_password')?.value

        if(pass === confirm_password){
            return null
        }
            return { passwordMisMatch : true }
    }
}