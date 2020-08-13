import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
/*
{
  "login": "deborah-w32",
  "id": 63062118,
  "node_id": "MDQ6VXNlcjYzMDYyMTE4",
  "avatar_url": "https://avatars2.githubusercontent.com/u/63062118?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/deborah-w32",
  "html_url": "https://github.com/deborah-w32",
  "followers_url": "https://api.github.com/users/deborah-w32/followers",
  "following_url": "https://api.github.com/users/deborah-w32/following{/other_user}",
  "gists_url": "https://api.github.com/users/deborah-w32/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/deborah-w32/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/deborah-w32/subscriptions",
  "organizations_url": "https://api.github.com/users/deborah-w32/orgs",
  "repos_url": "https://api.github.com/users/deborah-w32/repos",
  "events_url": "https://api.github.com/users/deborah-w32/events{/privacy}",
  "received_events_url": "https://api.github.com/users/deborah-w32/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Deborah",
  "company": null,
  "blog": "",
  "location": "Covington, Ga",
  "email": null,
  "hireable": null,
  "bio": "I am a student at @LambdaSchool, studying Full Stack Web Development.",
  "twitter_username": "WebDevFloof",
  "public_repos": 32,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2020-04-02T15:32:07Z",
  "updated_at": "2020-07-09T19:50:26Z"
}
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

// const followersArray = [
//   'tetondan',
//   'dustinmyers',
//   'justsml',
//   'luishrd',
//   'bigknell',
// ];

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

const entrypoint = document.querySelector('.cards')
function userInfo(username){
  axios.get(`https://api.github.com/users/${username}`)
    .then( (res) => {
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
      githubCardMaker(user)
      entrypoint.appendChild(githubCardMaker(user))
    })
  .catch( (error) => {
    console.log('Retribution!', error)
  });
}


function githubCardMaker(gitData){
  let {
    image,
    name,
    username,
    location,
    githubLink,
    followers,
    following,
    bio,
  } = gitData

  const card = document.createElement('div')
  const imgURL = document.createElement('img')
  const cardInfo = document.createElement('div')
  const userNameH3 = document.createElement('h3')
  const userName = document.createElement('p')
  const userLocation = document.createElement('p');
  const userProfile = document.createElement('p')
  const profileURL = document.createElement('a');
  const userFollowers = document.createElement('p')
  const userFollowing = document.createElement('p')
  const userBio = document.createElement('p')
  
  card.classList.add('card');
  imgURL.src = image;
  cardInfo.classList.add('card-info');
  userNameH3.classList.add('name');
  userName.classList.add('username');
  profileURL.href = username;

  card.appendChild(imgURL)
  card.appendChild(cardInfo)
  cardInfo.appendChild(userNameH3)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(userLocation)
  cardInfo.appendChild(userProfile)
  cardInfo.appendChild(profileURL)
  cardInfo.appendChild(userFollowers)
  cardInfo.appendChild(userFollowing)
  cardInfo.appendChild(userBio)

  userNameH3.textContent = name;
  userName.textContent = username;
  userLocation.textContent = location;
  profileURL.textContent = githubLink;
  userFollowers.textContent = followers;
  userFollowing.textContent = following;
  userBio.textContent = bio;

  return card
}

userInfo('deborah-w32')
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

function followerUserInfo(usernames) {
  usernames.forEach((person) => {
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
        githubCardMaker(user)
        entrypoint.appendChild(githubCardMaker(user))
      })
      .catch((error) => {
        console.log(error)
      })
  })
}


function getFollowers(username) {
  axios
    .get(`https://api.github.com/users/${username}/followers`)
    .then((response) => {
      let array = response.data
      let followersList = []
      array.forEach((follower) => {
        followersList.push(follower.login)
      });
      followerUserInfo(followersList)
    })
    .catch((error) => {
      console.log(error)
    })
}

getFollowers('deborah-w32')