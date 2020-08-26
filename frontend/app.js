const app = new Vue({
    el: "#app",
    data: {
        loggedin: false,
        JWT: "",
        loginUN: "",
        loginPW: "",
        createUN: "",
        createPW: "",
        devURL: "http://localhost:3000",
        prodURL: null,
        cities: ["Tokyo", "New York City", "San Francisco", "Los Angeles", "Paris", "London","Sydney", "Buenos Aires", "Cape Town","Rome"],
        activities: []
    },

    methods: {
        //////////// LOGIN /////////////
        handleLogin: function(event){
            event.preventDefault()
            const URL = this.prodURL ? this.prodURL : this.devURL
            // console.log(URL) //if you click login and it gives you URL it works
            const user = {username: this.loginUN, password: this.loginPW}
            console.log(user) //if you type in username and password and see it in the console it works
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
                    console.log(data.error)
                    alert('Error logging in. Please try again.')
                } else {
                    this.user = data.user
                    this.token = data.token
                    this.loggedin = true
                    this.loginUN = "" //resets: clears out when you log in
                    this.loginPW = "" //resets: clears out when you log in
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
        },


        //////////// CREATE USER /////////////
        handleSignup: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {
                username: this.createUN,
                password: this.createPW
            }
            fetch(`${URL}/users`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.error){
                        alert('Sign up unsuccessful')
                    } else {
                        alert('Sign up successful')
                        this.createPW = ""
                        this.createUN = ""
                    }
                })
        },

        //////////// GETTING ACTIVITY INFO FROM DB /////////////
        // requires event bc we are waiting for an on click on the button
        handleActivities: async function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id
            console.log(id)
            console.log(URL)

            fetch(`${URL}/activities/q/${id}`, {
                method: "get",
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    // for(i = 0; i < data.data.length; i ++){
                    //    data.data[i].className = "fas fa-heart"
                    // } //made the hearts
                    this.activities = data.data 
                    console.log(data.data)
                    console.log(`${URL}/activities/q/${id}`)
                })
                console.log(this.activities.length);
                for(i = 0; i < this.activities.length; i ++){
                    const fav = await fetch(`${URL}/favorites/${this.activities[i].id}`, {
                        method: "get",
                        headers: {
                            Authorization: `bearer ${this.token}`
                        }
                    })
                    const booly = await fav.json() //omg i have to await this im literally on the floor
                    console.log(booly);
                    !!(booly) ? Vue.set(this.activities[i], "className", "fas fa-heart" ) : Vue.set(this.activities[i], "className", "far fa-heart" )
                     
                 }
        },

        toggleFav: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const actId = event.target.getAttribute("act_id")
            fetch(`${URL}/favorites/${actId}`, {
                method: "post",
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.activities.filter(a=>a.id == actId)[0].className = data.status ? "fas fa-heart" : "far fa-heart"
                })
            console.log()
        }
    }
})