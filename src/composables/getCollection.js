import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { fStore } from "../firebase/config";



const getCollection = (collection, query) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = fStore.collection(collection).orderBy('createdAt',"desc");

    if(query){
        collectionRef = collectionRef.where(...query);
    }

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });
        documents.value = results;
        error.value = null;
    }, (err) => {
        console.log(err.message);
        error.value = 'Could not fetch data';
        documents.value = null;
    });
    // unsub method to prevent multiple onSnapshot events running at the same time
    // The below function is a combination of the Firebase recommended technique
    //  for unsubscribing to onSnapshot listeners and the Vue watchEffect method. 
    // This was learnt within the Vue 3 course detailed within the credits of the readme  
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { documents, error };
};

export default getCollection;