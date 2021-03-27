import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"
import { fStore } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)


const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true
    try{
        const res = await fAuth.createUserWithEmailAndPassword(email, password)
        if(!res){
            throw new Error('Could not complete the signup, please try again')
        }
        await res.user.updateProfile({ displayName })

        const currentUser = fAuth.currentUser
        const uid = currentUser.uid
        await fStore.doc(`/users/${uid}`).set({dark: false})
        
        error.value = null
        isPending.value = false
        
        return res
        

    } 
    catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
    
}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup
