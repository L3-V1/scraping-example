new Vue({
    el:'#app',

    mounted(){
        this.loadParams();
        this.loadBook();
    },

    data: {
        API_URL:location.origin.concat('/api/book'),
        loading:false,
        book:'',
        params:{
            title:''
        }
    },

    methods: {
        loadParams(){
            const query = location.search;

            this.params.title = query.match(/title=(.*)$/)[1];
        },

        async loadBook(){
            this.loading = true;
            const resp = await fetch(`${this.API_URL}/${this.params.title}`);
            const data = await resp.json();

            if(data.message){
                alert(data.message);
                this.loading = false;
                return;
            }

            this.book = data;
            this.loading = false;
        }
    }
});