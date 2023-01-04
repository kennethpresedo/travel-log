import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

export default function SignIn(){
    const [ user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWY ID Token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignout(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    };

useEffect(() => {
    /* global google */ 
    google.accounts.id.initialize({
        client_id: "825489729678-clrtqnd9di725uap7ncige9p5vifm09a.apps.googleusercontent.com",
        callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
    );
    google.accounts.id.prompt();
}, []);

return (
    <div className="App">
        <div id="signInDiv"></div>
        { Object.keys(user).length !== 0 &&
           <button onClick={(e) => handleSignout(e)}>Sign Out</button>
        }
    
        { user &&
        <div>
            <img src={user.picture} alt="profile"></img>
            <h3>{user.name}</h3>
        </div>
        }
    </div>
)}