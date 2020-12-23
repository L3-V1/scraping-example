new Vue({
    el:'#app',

    mounted() {
        this.loadBooks();
    },

    data: {
        API_URL:location.href.concat('api/books/page'),
        loading:false,
        page:1,
        books:[]
    },

    methods: {
        async loadBooks(){
            this.loading = true;
            const resp = await fetch(`${this.API_URL}/${this.page}`);
            const data = await resp.json();

            if(data.message){
                alert(data.message);
                this.loading = false;
                return;
            }

            this.books = data;
            this.loading = false;
        },

        loadBook(alias){
            const new_url = location.href.concat(`book.html?title=${alias}`);

            window.location.href = new_url;
        },

        nextPage(){
            this.page++;
            this.loadBooks();
        },

        previousPage(){
            this.page--;
            this.loadBooks();
        }
    }
});