// == Modal Global Variables
const $modal = $('.modal');
const $span = $('.close')
// 

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
        activities: [],
        token: '',
        activities: [],
        onAccount: false,
        favoriteActivities: []
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
        handleActivities: function(event){
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
                    this.activities = data.data
                    console.log(data.data, "this is my data")
                    console.log(`${URL}/activities/q/${id}`)
                })
        },

        //////////// TAKES USER TO THE ACCOUNT PG /////////////
        goToAccount: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            console.log(URL)
            this.onAccount = true
            // $("my-account-button").text("Dashboard") testing toggling the text on the botton

            // fetch(`${URL}/favorites`, {
            //     method: "get",
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         this.favoriteActivities = data.data
            //         console.log(data.data)
            //         console.log(`${URL}/favorites`)
            //     })
        }
    }
})

// ==NAV BAR ONLY==

let firstDiv = $(".navbar").append('<div class ="brand-title"><img class="logo" src="https://res.cloudinary.com/techhire/image/upload/v1598408188/travel-logo_bmeebn.png"></div>')
let firstAttr = $(".navbar").append('<a href ="#" class="toggle-button"><span class="bar"></span> <span class="bar"></span> <span class="bar"></span> </a>')
let secondDiv = $(".navbar").append('<div class="navbar-links"><ul><li><a class="aaa" href="#pageCoverPhoto">Learn More</a></li><li><a class="aaa" href="#products">Help</a></li><li><a class="aaa" href="#contact">About</a></li></ul></div>')

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})
// ==NAV BAR ONLY end ==


// == Functions that look into Vue container ==
const handleActivities = function(event){
    const URL = app._data.prodURL ? app._data.prodURL : app._data.devURL
    const id = event.target.id
    console.log(id)
    console.log(URL)
    console.log(app._data.token)

    fetch(`${URL}/activities/q/${id}`, {
        method: "get",
        headers: {
            Authorization: `bearer ${app._data.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            app._data.activities = data.data
            return fillModal(data.data, id)
        })
}

const fillModal = async (data, id) =>{
    const URL = app._data.prodURL ? app._data.prodURL : app._data.devURL
    $('.modal-body').empty()
    $modal.css('display', 'flex')
    $('.modal-footer').text(id)
    let count = 0
    for(i = 0; i < data.length; i++){
        const activity = data[i]
        console.log(activity)
        const $event = $('<p>').text(`${activity.name} located at ${activity.address}`)
        const className = await getFav(activity.id, URL)
        const $heart = $('<i>').addClass(className).attr('act_id',activity.id).on('click',toggleClass)
        $('.modal-body').append($event).append($heart)
    }
    // data.forEach((activity) =>{

    // })
   
};

const toggleClass = async(event) =>{
    const URL = app._data.prodURL ? app._data.prodURL : app._data.devURL
    const id = event.target.getAttribute("act_id")
    const resp = await fetch(`${URL}/favorites/${id}`, {
        method: "post",
        headers: {
            Authorization: `bearer ${app._data.token}`
        }
    })

    const toggle = await resp.json()

    event.target.className = toggle.status ? "fas fa-heart" : "far fa-heart" 

}

//gets class name for a favorite icon
const getFav = async (id, url) =>{
    const urlstring = `${url}/favorites/${id}`
    const fav = await fetch(urlstring, {
        method: "get",
        headers: {
            Authorization: `bearer ${app.token}`
        }
    })
    console.log(urlstring);
    const booly = await fav.json()

    console.log(booly);
    return booly ? "fas fa-heart" : "far fa-heart" 
}

$span.on('click', () =>{
    $modal.css('display', 'none')
});

window.addEventListener('click', (event) => {
    console.log('click')   
    // matching the event target and jquery exactly
    if (event.target == $modal[0]) {
            $modal.css('display', "none")
    }
})
