const app = new Vue({
    el: "#app",
    data: {
        loggedin: false,
        JWT: "",
        createUN: "",
        createPW: "", 
        devURL: "http://localhost:3000",
        prodURL: null
    },

    methods: {
        handleLogin: function(event){
            event.preventDefault()
            const URL = this.prodURL ? this.prodURL : this.devURL
            //console.log(URL) //if you click login and it gives you URL it works
            const user = {username: this.createUN, password: this.createPW}
            //console.log(user) //if you type in username and password and see it in the console it works 
            fetch(`${URL}/login`, {
                method: "post", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data) //this displays token in console when logging in
                /*AS OF 5AM, this is where I got up to, it's fetching the data but not displaying token in the console like expected 
                ERROR MESSAGE 
                
                UPDATE: 5:09AM I GOT THE TOKEN TO WORK after adding event parameter and event.preventDefault() in handleLogin()
                */

                this.user = data.user
                this.token = data.token
                this.loggedin = true 
                this.createUN = "" //resets: clears out when you log in
                this.createPW = "" //resets: clears out when you log in 
            })
            
        },
        handleLogout: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.loggedin = false 
            this.user = null
            this.token = null
            //undoes everything once logged out 
        }

    }
})