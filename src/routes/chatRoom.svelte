<script>
    import { firebaseApp, auth, db, storage } from "../firebase";
    import { doc, collection, getDocs } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth"; 

    const users= [];
    let user2, email, uid, comp;

    onAuthStateChanged(auth, (user) => {
    if (user) {
		console.log(user);
		email = user.email;
        uid = user.uid;
    } else {
        // User is signed out
        // ...
    }	
    });

    const handleChat=(e)=>{
        user2= e;
        // window.location="http://localhost:3000/chat";
        comp=true;
    };

    const handleClick=(e)=>{
        const querySnapshot = getDocs(collection(db, "users"));
        querySnapshot.then(function (result){
            // for-loop stores all the users
            for (let index = 0, count=0; index < result.docs.length; index++) {
                if( e!=result.docs[index]._document.data.value.mapValue.fields.email.stringValue){
                    users[count] =result.docs[index]._document.data.value.mapValue.fields.email.stringValue; 
                    count++;
                }
            }
        });
    }

</script>
<div>
    <div class="flex justify-center m-8">
        <p class="font-bold text-3xl underline cursor-pointer" on:click={handleClick(email)}>Choose a user to message </p>
    </div>
    <div>
        {#each users as user, i}
            <div class="flex justify-between h-10 pt-4 pb-8 border border-gray-400 bg-gray-200 hover:bg-gray-300 cursor-pointer" on:click={handleChat(user)}>
                <p class="pl-4"><span>{i+1} : </span> {user} </p>
            </div>
        {/each}
    </div>


{#if comp}
	{#await import('./chat.svelte') then c}
		<svelte:component this={c.default} user2={user2}/>
	{/await}
{/if}

</div>