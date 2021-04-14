import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const entryPoint = document.querySelector('div.cards')

function userData(userName){
  axios.get(`https://api.github.com/users/${userName}`)
    .then((res) => {
      let user = {
      image: res.data.avatar_url,
      name: res.data.name,
      username: res.data.login,
      location: res.data.location,
      githubLink: res.data.html_url,
      followers: res.data.followers,
      following: res.data.following,
      bio: res.data.bio,
    }
    gitCardMaker(user)
    entryPoint.appendChild(gitCardMaker(user))
    })
    .catch((err) => {
      console.log('ERROR: ', err)
    })
}

function gitCardMaker(gitData){
  let {
    image,
    name,
    username,
    location,
    githubLink,
    followers,
    following,
    bio
  } = gitData

  const card = document.createElement('div')
  const imgURL = document.createElement('img')
  const cardInfo = document.createElement('div')
  const nameH3 = document.createElement('h3')
  const userHandle = document.createElement('p')
  const userLocation = document.createElement('p')
  const userProfile = document.createElement('p')
  const profileLink = document.createElement('a')
  const userFollowers = document.createElement('p')
  const userFollowing = document.createElement('p')
  const userBio = document.createElement('p')

  card.classList.add('card')
  cardInfo.classList.add('card-info')
  nameH3.classList.add('name')
  userHandle.classList.add('username')
  

  card.appendChild(imgURL)
  card.appendChild(cardInfo)
  cardInfo.appendChild(nameH3)
  cardInfo.appendChild(userHandle)
  cardInfo.appendChild(userLocation)
  cardInfo.appendChild(userProfile)
  cardInfo.appendChild(profileLink)
  cardInfo.appendChild(userFollowers)
  cardInfo.appendChild(userFollowing)
  cardInfo.appendChild(userBio)

  imgURL.src = image
  nameH3.textContent = name
  userHandle.textContent = username
  userLocation.textContent = location
  profileLink.href = githubLink
  // profileLink.textContent = githubLink
  userFollowers.textContent = followers
  userFollowing.textContent = following
  userBio.textContent = bio

  return card
}
userData('deborah-w32')




function followerData(friendUserName) {
  friendUserName.forEach((person) => {
    axios
      .get(`https://api.github.com/users/${person}`)
      .then((response) => {
        let user = {
          image: response.data.avatar_url,
          name: response.data.name,
          username: response.data.login,
          location: response.data.location,
          githubLink: response.data.html_url,
          followers: response.data.followers,
          following: response.data.following,
          bio: response.data.bio,
        }
        gitCardMaker(user)
        entryPoint.appendChild(gitCardMaker(user))
      })
      .catch((error) => {
        console.log('FOLLOWERDATA ERROR: ', error)
      })
  })
}



function gitFollowers(userData){
  axios
  .get(`https://api.github.com/users/${userData}/followers`)
  .then((response) => {
    let arr = response.data
    let followerList = []
    arr.forEach((follower) => {
      followerList.push(follower.login)
    })
    followerData(followerList)
  })
  .catch((err) => {
    console.log('FOLLOWER ERROR: ', err)
  })
}

gitFollowers('deborah-w32')




/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
