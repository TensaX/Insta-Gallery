<script>
    export let src = undefined;
    export let postName = undefined;
    export let caption = undefined;
</script>

<div class= "rounded overflow-hidden shadow-lg">
    <div class="w-full">
        <img src={src} alt= {postName} />
    </div>
    <div >
        <p class="text-gray-600 text-base">{caption}</p>
    </div>
</div>