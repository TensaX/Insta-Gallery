<script>
    import { auth, db } from "../firebase";
    import Input from '../components/Input.svelte';
    import Button from "../components/Button.svelte";
    import { signInWithEmailAndPassword } from "firebase/auth";
    
    import { collection, doc, getDoc } from "firebase/firestore"

    export let user = undefined;
    let username, password; 
    console.log(auth);   

    const handleClick = ()=>{
        signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        // Signed in 
        console.log(auth);
        user = auth.currentUser;
        console.log(user);
        console.log(user.email);
        window.location="http://localhost:3000/dashboard";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
    }
    
    
</script>

<div class="flex justify-center">
    <div>
        <h1 class="text-4xl font-bold my-10 underline decoration-solid">SignIn Your account</h1>
        <div>
            <form on:submit|preventDefault>
                <Input label="Your email:" bind:value={username} type="email" required />
                <Input label="Your password:" bind:value={password} type="password" required />
                <Button on:click={handleClick}>Sign In!-></Button>

            </form>
            <p class="my-8 text-gray-500">Don't have an account yet! 
                <a href="/signup" class="text-indigo-900 font-semibold hover:text-blue-900 hover:font-bold">Register </a>
            </p>
        </div>
    </div>
</div>

<style>
</style>