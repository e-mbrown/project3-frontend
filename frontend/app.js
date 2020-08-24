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
        //////////// LOGIN /////////////
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
                if (data.error) {
                    alert('Error logging in. Please try again.')
                } else {
                    this.user = data.user
                    this.token = data.token
                    this.loggedin = true
                    this.createUN = "" //resets: clears out when you log in
                    this.createPW = "" //resets: clears out when you log in
                }
            })
            
        },

        //////////// LOG OUT /////////////
        handleLogout: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.loggedin = false 
            this.user = null
            this.token = null
            //undo everything once logged out 
        }

    }
})