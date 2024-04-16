const loginValidation = (data) => {
    if (!data.email) {
       return  'Email is required' 
    }
     if (!data.password) {
         return  'Password is required' 
 
     }
     return { error: null }
 
 }
 
 const registerValidation = (data) => {
     if (!data.firstname) {
         return { error: 'Name is required' }
     }
     if (!data.lastname) {
         return { error: 'Name is required' }
     }
     if (!data.email) {
         return { error: 'Email is required' }
     }
     if (!data.password) {
         return { error: 'Password is required' }
 
     }
     return { error: null }
 
 }
 
 module.exports = { registerValidation, loginValidation }