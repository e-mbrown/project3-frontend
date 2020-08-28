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
        onAccount: false,
        favoriteActivities: [],
        clicked: false,
        commentActivity: "",
        visited: true
    },

    methods: {
        //////////// LOGIN /////////////
        handleLogin: function(event){
            event.preventDefault()
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.loginUN, password: this.loginPW}
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
                    this.loginUN = "" //resets: clears out when you log in
                    this.loginPW = "" //resets: clears out when you log in
                    window.sessionStorage.setItem('login', JSON.stringify(data)) //storing the data response in session storage
                    this.mapLoader(this.loggedin)
                }
            })
        },

        //////////// LOG OUT /////////////
        handleLogout: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL
            this.loggedin = false
            this.user = null
            this.token = null
            this.mapLoader(this.loggedin)
        },
        
        /////////// MapLoad /////////////////
        mapLoader: function(bool) {
            if (bool == true) {
                mapLoad(true)
            }else {
                mapLoad(false)
            }
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

        ///////// ADDING AND UNADDING FAVORITES ////////////
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
        },

        //////////// TAKES USER TO THE ACCOUNT PG /////////////
        ////// When the user is taken to their account page, they will automatically see a list of all their favorites
        goToAccount: function(event) {
            const URL = this.prodURL ? this.prodURL : this.devURL
            if (!this.clicked) {
                $("#acct-btn").text("My Account")
                this.onAccount = false
            } else {
                $("#acct-btn").text("Dashboard")
                this.onAccount = true
            }
            this.clicked = !this.clicked

            fetch(`${URL}/favorites/`, {
                method: "get",
                headers: {
                    Authorization: `bearer ${this.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.favoriteActivities = data
                    this.favoriteActivities = []

                    for (let i = 0; i < data.length; i++) {
                        const activityName = `${data[i].activity.name} located at ${data[i].activity.address}`
                        const id = data[i].favorite.id
                        const actid =  data[i].activity.id
                        this.favoriteActivities.push({activity:activityName, id: id, actid:actid, dateVisited: "Not Yet"})
                        console.log(this.favoriteActivities)
                    }
                })
        },

        setComment: function(event) {
            this.commentActivity = event.target.getAttribute("act_id")
            console.log(this.commentActivity);
        },

        ///////////// UPDATE IF VISITED A SPOT ////////////
        editVisited: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id
            const test =this.favoriteActivities.find(x => x.id == `${id}`)
            let target = event.target.previousElementSibling //Looks in the event in the console. then you can get the value of elements surrounding the button
            // if (id === target)
            if (target.value == ""){
                test.dateVisited = "Not Yet"
                this.visited = false
            } else {
                test.dateVisited = target.value
                this.visited = true
            }

            const updateVisit = {
                visited: this.visited
            }
            const res = fetch(`${URL}/favorites/${id}`,{
                method: "put",
                headers: {
                    Authorization: `bearer ${this.token}`,
                    "Content-Type": "application/json"
                    
                },
                body: JSON.stringify(updateVisit)
            })
                .then((response) => {
                    // this.goToAccount()
                    console.log(response)
                    console.log(updateVisit)
                }
            )
        }
        },
    //////// LIFESTYLE OBJECT - checks to see if there is already login information from previous sessions ///////
        created: function() {
            const getLogin = JSON.parse(window.sessionStorage.getItem('login'))
            if (getLogin) {
                this.user = getLogin.user
                this.token = getLogin.token
                this.loggedin = true
        }
    }

})

//////////////////////////// END VUE INSTANCE /////////////////////////////////////////////////

// ==NAV BAR ONLY==

// let firstDiv = $(".navbar").append('<div class ="brand-title"><img class="logo" src="https://res.cloudinary.com/techhire/image/upload/v1598408188/travel-logo_bmeebn.png"></div>')
// let firstAttr = $(".navbar").append('<a href ="#" class="toggle-button"><span class="bar"></span> <span class="bar"></span> <span class="bar"></span> </a>')
// let secondDiv = $(".navbar").append('<div class="navbar-links"><ul><li><a class="aaa" href="#pageCoverPhoto">Learn More</a></li><li><a class="aaa" href="#products">Help</a></li><li><a class="aaa" href="#contact">About</a></li></ul></div>')

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})
// ==NAV BAR ONLY end ==


// == Functions that look into Vue container ==
const handleActivities = async function(event){
    const URL = app._data.prodURL ? app._data.prodURL : app._data.devURL
    const id = event.target.id

    const f = await fetch(`${URL}/activities/q/${id}`, {
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
    $modal.find('.comment').hide()
    $('.modal-footer').text(id)
    let count = 0
    for(i = 0; i < data.length; i++){
        const activity = data[i]
        const $event = $('<p>').text(`${activity.name} located at ${activity.address}`)
        const className = await getFav(activity.id, URL)
        const $heart = $('<i>').addClass(className).attr('act_id',activity.id).on('click',toggleClass)
        $('.modal-body').append($event).append($heart)
    }
};

const commentModal = async (event) =>{
    const URL = app._data.prodURL ? app._data.prodURL : app._data.devURL
    $('.modal-body').empty()
    $modal.css('display', 'flex')
    $modal.find('.globe').hide()
    $('.modal-footer').text(event.target.parentElement.firstChild.textContent)

    const comments = await fetch(`${URL}/activities/comments/${event.target.getAttribute("act_id")}`, {
        method: "get",
        headers: {
            Authorization: `bearer ${app._data.token}`
        }
    })

    const theJson = await comments.json()

    theJson.forEach(res =>{
        const $comment = $('<p>').text(res.comment.message)
        $('.modal-body').append($comment)
        if (res.can_delete){
            const $trash = $('<i class="fas fa-trash-alt"></i>').attr('comm_id',res.comment.id).css('color','red')
            // .on('click',toggleClass) the on click for trash should delete the comment
            $('.modal-body').append($trash)
        }
    })

    console.log(theJson);

    // const toggle = await resp.json()

}

// $('.fa-comment-dots').on('click', commentModal)

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
    const booly = await fav.json()

    return booly ? "fas fa-heart" : "far fa-heart"
}

$span.on('click', () =>{
    $modal.css('display', 'none')
});

window.addEventListener('click', (event) => {
    // matching the event target and jquery exactly
    if (event.target == $modal[0]) {
            $modal.css('display', "none")
    }
})