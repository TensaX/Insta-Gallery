<script>
    import { firebaseApp, auth, db, storage } from "../firebase";
    import { doc, collection, getDocs } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth"; 
    import Card from "../components/Post.svelte"
    
    let count =0;
    let email, uid;
    const posts = [];
    let postStore ;

    onAuthStateChanged(auth, (user) => {
    if (user) {
		console.log(user);
		email = user.email;
        uid = user.uid;
		console.log(uid);
    } else {
        // User is signed out
        // ...
    }
    });
    
    const handleView =()=>{
        const querySnapshot = getDocs(collection(db, "users/", email, "/posts"));
        console.log(querySnapshot);
        querySnapshot.then(function (result){
            // for-loop stores all the posts in the posts array as a object{caption, text, imageUrl}
            for (let index = 0; index < result.docs.length; index++) {
                posts[index] =result.docs[index]._document.data.value.mapValue.fields; 
            }
            console.log(posts);
        });
    };

    const returnBack=()=>{
		window.location="http://localhost:3000/dashboard";
	};
  
</script>



<div>
    <div class="flex justify-center font-bold text-4xl mt-8 mb-4">
        <p>Your images</p>
    </div>
    <div class="flex justify-center">
        <button class="bg-gray-400 px-8 py-2 text-center font-bold" on:click={handleView}>View</button>
        <button class="bg-gray-400 px-8 py-2 text-center font-bold ml-4" on:click={returnBack}>Back to Dashboard</button>    
    </div>
    <div class = "grid grid-cols-3 gap-4 mt-12">
        {#each posts as post}
            <Card src={post.url.stringValue} postName= {post.file.stringValue} caption= {post.caption.stringValue} />
            
        {/each}
        
    </div>
</div>
<style></style>