# Project Overview - Travel App FRONTEND

## Project Schedule

APPLIES TO BACKEND AND FRONTEND 

|  Day | Deliverable | Status
|---|---| ---|
|Day 1 - Sunday| Project Description | Complete
|Day 1 - Sunday| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 1 - Sunday| Deploy Heroku | Complete
|Day 1 - Sunday| User Model | Complete
|Day 2 - Monday| Remaining Models | Complete
|Day 2 - Monday| Login Frontend | Complete
|Day 3 - Tuesday| CRUD | Incomplete
|Day 4 - Wednesday| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 5 - Thursday| Complete MVP & Bug Fixes | Incomplete
|Day 6- Friday| Final Touches and Present | Incomplete

## Project Description

Our project will be focused on creating a travel app, where users can save their upcoming travel destinations. 


## Time/Priority Matrix 

[Time Priority Matrix](https://res.cloudinary.com/stephaniev/image/upload/v1598241331/P3_-_Time_Priority_Matrix_x3jsgr.png)

## Wireframes 
- Desktop [Wireframes](https://res.cloudinary.com/techhire/image/upload/v1598211291/Vacation_-_Social_Platform_Desktop_uduwbw.png) 
- Mobile [Wireframes](https://res.cloudinary.com/techhire/image/upload/v1598211300/Vacation_-_Social_Platform_Mobile_nzu6p3.png) 

#### MVP

- Frontend Login Dashboard (HTML/CSS)
- CRUD (HTML/CSS)
- Comments (HTML/CSS)
- User Profile(HTML/CSS)
- Deploy on Netlify


#### PostMVP 

- Countries as a part of our models
- Have a map on the main dashboard (try to make it look pretty)


#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Frontend Login Dashboard | H | 4hr | -hr | -hr|
| Create User Profile Frontend | H | 2hr | 7hr | -hr|
| Create Comments Frontend | H | 2hr | 2hr | -hr|
| Delete comments Frontend | H | 2hr | 2hr | -hr|
| Show comments comments Frontend | H | 2hr | 2hr | -hr|
| Delete favorite Frontend| H | 2hr | .5hr | -hr|
| Activities Modal| H | 2hr | Ask Ebony | -hr|
| Debugging Frontend | H | 5hr | 6hr | -hr|
| Total | H | 18hrs| -hrs | -hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Map on dashboard Frontend| L | 3hr | -hr | -hr|
| Update if user visited location Button| L | 2hr | 7hr | -hr|
| --| M | 4hr | -hr | -hr|
| -- | H | 4hr | -hr | -hr|
| Total | H | 5hrs| -hrs | -hrs |

## Additional Libraries
- [Bootstrap](https://getbootstrap.com/) 
 

## Code Snippet

Narissa - update function to edit if you visited an activity
```
editVisited: function(event){
            ...
            const id = event.target.id
            const test = this.favoriteActivities.find(x => x.id == `${id}`) // x stands for each object in the arrays. give us the object where the id is equal to for example 55
            let target = event.target.previousElementSibling //Looks in the event in the console. then you can get the value of elements surrounding the button

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
        }
        },

```

## Issues and Resolutions

Narissa - update function
Issue: Couldn't figure out how to update only one date per activity. Once you clicked submit to update 1 date, it would go and update all the dates for all your favorite activites

Resolution: Using:
- `const id = event.target.id`
- `const test = this.favoriteActivities.find(x => x.id == ${id})`. 
Since favoriteActivities is an array of objects, we used `.find` to query for the object's id and finding where it is equal to the variable called `id` (the id of the target). This query is stored a variable called `test` and is used later so that some functions will only run if this condition is true.
