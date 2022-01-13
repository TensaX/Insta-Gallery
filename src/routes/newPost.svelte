<script>
	import { firebaseApp, auth, db, storage } from "../firebase";
	import { ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";
	import { onAuthStateChanged } from "firebase/auth"; 
    import { doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore";

	// const storageRef = ref(storage);
	// const docRefId = storageRef.docs[0].id;
	// console.log(docRefId);
	let uid, file, email, record, url ;
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

	const handleUpload =(e)=>{
		 file = e.target.files[0];
		 console.log(file.name);
		 // Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':

        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		url = downloadURL;
      console.log('File available at', downloadURL);
    });
  }
);
	};

	const handleSubmit =()=>{
		try {
            const docRef = addDoc(collection(db, "users",  email ,"/posts"), {
				file: file.name,
				caption: record,
				url: url
			});
			alert("Successfully uploaded a post!");
        } 
        catch (e) {
            console.error("Error adding document: ", e);
        }
	};

	const returnBack=()=>{
		window.location="http://localhost:3000/dashboard";
	};
</script>

<div>
	<div class= "grid grid-cols-1">
		<p class="mx-auto content-center mt-16 text-4xl font-bold underline decoration-solid">Create a New Post!</p>
		<div class="flex justify-evenly">
			<div class="mt-10">
				<form class="flex items-center space-x-6">
					<div class="shrink-0">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img class="h-16 w-16 object-cover rounded-full" src="src\images\avatar.jpg" alt="Current profile photo" />
					</div>
					<label class="block">
						<span class="sr-only">Choose profile photo</span>
						<input type="file" accept=".jpg, .jpeg, .png" class="block w-full text-sm text-gray-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-violet-50 file:text-violet-700
						hover:file:bg-violet-100
						" on:change={handleUpload} />
					</label>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label>Enter your caption:</label>
					<input class="ml-4" bind:value = {record} type="text" placeholder="Caption" />
				</form>
			</div>
		</div>
		
	</div>
	<div class="flex justify-center mt-10">
		<button type="submit" class="bg-slate-600 py-2 px-8 rounded" on:click={handleSubmit}> Submit </button>
	</div>
	<div class="flex justify-center mt-10">
		<button class="bg-slate-600 py-2 px-8 rounded" on:click={returnBack}> Back to Dashboard </button>
	</div>
</div>
<style>
</style>