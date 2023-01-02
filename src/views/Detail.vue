<template>
    <div>
        <h1>detail {{info.title||""}}</h1>
    </div>
</template>
<script>
import fetch from "@/utils/fetch";
export default {
    data(){
        return {
            info: {}
        }
    },
    mounted() {
        console.info("id", this.$route.params);
        this.get();
    },
    methods: {
        async get(){
            let id = this.$route.params.id;
            let res = await fetch("http://localhost:80/api/articles/"+id).then(res=>res.data);
            console.info("res", res.data);
            Object.assign(this.info, res.data);
        }
    }
}
</script>