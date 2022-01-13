<script>
    import { firebaseApp, auth, db, storage } from "../firebase";
    import { doc, collection, getDocs } from "firebase/firestore";
    import { onAuthStateChanged } from "firebase/auth";
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators"

    let email, uid, user1, message="";
    export let user2;

    onAuthStateChanged(auth, (user) => {
    if (user) {
        user1=user;
		console.log(user1);
		email = user.email;
        uid = user.uid;
    } else {
        // User is signed out
        // ...
    }	
    });

    const handleBack=()=>{
        window.location="http://localhost:3000/dashboard";
    };

    // const querySnapshot = getDocs(collection(db,"users" ,email ,"chats"));
    // console.log(querySnapshot);
    // querySnapshot.then(function (result){
    //         // for-loop stores all the users
    //         for (let index = 0, count=0; index < result.docs.length; index++) {
    //                 chats[count] =result.docs[index]._document.data.value.mapValue.fields.message.stringValue; 
    //                 count++;
                
    //         }
    //     });

    const sendMessage=()=> {
        const docRef = addDoc(collection(db,"users" ,email ,"chats", user2), {
           uid: user1.uid,
           message: message,
           avatar: user1.photoURL,
           sentAt: +new Date() 
        });
    }
</script>

<div>
    <div class="flex justify-around mt-20">
        <h1 class="text-3xl ">Chat with {user2}</h1>
        <button class="text-xl border-2 border-gray-200 rounded-xl px-4 hover:bg-gray-400 hover:text-white" on:click={handleBack}>Back to Dashboard</button>
    </div>


</div>