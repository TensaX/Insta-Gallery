<script>
    import { firebaseApp, auth } from "../firebase";
    import { signOut, onAuthStateChanged } from "firebase/auth"; 
        // import { user } from "./signin.svelte";
    // console.log(auth.currentUser);
    let photo;
    let email;

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        email = user.email;
        photo = user.photoURL;
        console.log(photo);
        console.log(user.displayName);
        // ...
    } else {
        // User is signed out
        // ...
    }
    });
        // const user = auth.currentUser;
        // console.log(user);
        // if (user !== null) {
        // const name = user.displayName;
        // const email = user.email;
        // const photo = user.photoURL;
        // const uid = user.uid;
        // }

    const handleNewpost=()=>{
        window.location="http://localhost:3000/newPost";
    };

    const allPosts=()=>{
        window.location="http://localhost:3000/myPosts";
    };

    const handleLogout=()=>{
        signOut(auth).then(() => {
            alert("Successfully signed out!");
            window.location="http://localhost:3000/signin";
        }).catch((error) => {
            console.log(error);
        });

    };

    const handleMessaging=()=>{
        window.location="http://localhost:3000/chatRoom";
    };

</script>

<div class="my-6 bg-gray-500 ">
    <div class=" flex items-center justify-center pt-8">
        <p class="text-center text-2xl">
            <span class="text-3xl mb-8">Welcome</span><br/> 
            <strong>{email}</strong> to your dashboard!!!
        </p>
    </div>
    <div class="flex items-center justify-center mt-10 mb-10 text-2xl underline">
        <p>What do you want to do today!</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 justify-items-center py-20">
        <div class="custom w-40 h-40 mx-4 rounded bg-white hover:bg-gray-200 border-black-200 shadow-md overflow-hidden relative text-center py-16" on:click={handleNewpost}>Add a Post</div>
        <div class="custom w-40 h-40 mx-4 rounded bg-white hover:bg-gray-200 border-black-200 shadow-md overflow-hidden relative text-center py-16" on:click={handleMessaging}>messaging</div>
        <div class="custom w-40 h-40 mx-4 rounded bg-white hover:bg-gray-200 border-black-200 shadow-md overflow-hidden relative text-center py-16" on:click={allPosts}> View all my posts</div>
    </div>
    <div class="flex justify-center">
        <button class="bg-red-100 hover:bg-red-300 w-28 h-8 rounded mb-8" on:click={handleLogout}>Logout</button>    
    </div>

</div>

<style>
    .custom{
        cursor: pointer;
    }
</style>