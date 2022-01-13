<script>
    import { auth, db } from "../firebase";
    import Input from '../components/Input.svelte';
    import Button from "../components/Button.svelte";
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import {doc, collection, setDoc, addDoc } from "firebase/firestore";
    

    let username, password;    

    const handleClick = ()=>{
        createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user created");
        
        try {
            setDoc(doc(db, "users", user.email), {
                uid: user.uid,
                email: user.email
            });
            // console.log("Document written with ID: ", docRef.id);
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
    // window.location="http://localhost:3000/signin";
    }
</script>

<div class="flex justify-center">
    <div>
        <h1 class="text-4xl font-bold my-10 underline decoration-solid">Create Your account</h1>
        <div>
            <form on:submit|preventDefault>
                <Input label="Your email:" bind:value={username} type="email" required />
                <Input label="Your password:" bind:value={password} type="password" required />
                <Button on:click={handleClick}>Sign up!-></Button>

            </form>
            <p class="my-8 text-gray-500">Already have an account! 
                <a href="/signin" class="text-indigo-900 font-semibold hover:text-blue-900 hover:font-bold">Sign in now!</a>
            </p>
        </div>
    </div>
</div>

<style>
</style>