// define the callAPI function that takes a first name and last name as parameters
var getAllPosts = ()=> {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const USERID = localStorage.getItem("UserId");
    // make API call with parameters and use promises to get response
    fetch(YOUR_API_INVOKE_URL + "/posts", requestOptions)
    .then(response => response.text())
    .then(result => {
        // can put this alert back later if needed
        // alert(JSON.parse(result).body)
        const postTable = JSON.parse(JSON.parse(result).body)
        console.log(postTable)
        var lendList = document.getElementById('lendList')
        for (i = 0; i < postTable[0].length; i++){
            var listItem = document.createElement("LI")
            listItem.innerHTML = JSON.stringify(postTable[0][i])
            var titleLabel = document.createElement("label");
            titleLabel.innerHTML = "Title: ";
            var title = document.createElement("label");
            title.innerHTML = postTable[0][i].title;

            var descriptionLabel = document.createElement("label");
            descriptionLabel.innerHTML = "Description: ";
            var description = document.createElement("label");
            description.innerHTML = postTable[0][i].description;
            
            var emailLabel = document.createElement("label");
            emailLabel.innerHTML = "Email: ";
            var email = document.createElement("label");
            email.innerHTML = postTable[0][i].email;
            
            // lendList.appendChild(listItem) 
            lendList.appendChild(titleLabel)
            lendList.appendChild(title)
            lendList.appendChild(document.createElement("br"))
            lendList.appendChild(descriptionLabel)
            lendList.appendChild(description)
            lendList.appendChild(document.createElement("br"))
            lendList.appendChild(emailLabel)
            lendList.appendChild(email)
            

            if (USERID === postTable[0][i].userId){
                var button = document.createElement("button");
                button.innerHTML = "Delete"
                button.setAttribute("id", "deleteLendPostButton")
                button.setAttribute("value", postTable[0][i].ItemId);
                button.setAttribute("onclick", "deleteLendPost()")
                lendList.appendChild(document.createElement("br"))
                lendList.appendChild(button)   
            }

            lendList.appendChild(document.createElement("br"))     
            lendList.appendChild(document.createElement("br")) 
            
            
                 
        }
        var buyList = document.getElementById('buyList')
        for (i = 0; i < postTable[1].length; i++){
            var listItem = document.createElement("LI")
            listItem.innerHTML = JSON.stringify(postTable[1][i])

            var titleLabel = document.createElement("label");
            titleLabel.innerHTML = "Title: ";
            var title = document.createElement("label");
            title.innerHTML = postTable[1][i].title;

            var descriptionLabel = document.createElement("label");
            descriptionLabel.innerHTML = "Description: ";
            var description = document.createElement("label");
            description.innerHTML = postTable[1][i].description;
            
            var emailLabel = document.createElement("label");
            emailLabel.innerHTML = "Email: ";
            var email = document.createElement("label");
            email.innerHTML = postTable[1][i].email;
           
            // lendList.appendChild(listItem) 
            buyList.appendChild(titleLabel)
            buyList.appendChild(title)
            buyList.appendChild(document.createElement("br"))
            buyList.appendChild(descriptionLabel)
            buyList.appendChild(description)
            buyList.appendChild(document.createElement("br"))
            buyList.appendChild(emailLabel)
            buyList.appendChild(email)
            

            if (USERID == postTable[1][i].userId){
                var button = document.createElement("button");
                button.innerHTML = "Delete"
                button.setAttribute("id", "deleteLendPostButton")
                button.setAttribute("value", postTable[0][i].ItemId);
                button.setAttribute("onclick", "deleteLendPost()")
                buyList.appendChild(document.createElement("br"))
                buyList.appendChild(button)   
            }

            buyList.appendChild(document.createElement("br"))     
            buyList.appendChild(document.createElement("br")) 
                         
        }
    })
    .catch(error => alert(error));

}

function deleteLendPost() {
    var id = document.getElementById("deleteLendPostButton").value;
    
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "ItemId" : id,
        "lend": true,
        "buy": false
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // make API call with parameters and use promises to get response
    fetch(YOUR_API_INVOKE_URL + "/posts", requestOptions)
    .then(response => response.text())
    .then(result => {
        alert(JSON.parse(result).body)
        window.location.href = "/posts"
    })
    .catch(error => alert(error));

}

function deleteBuyPost() {
    var id = document.getElementById("deleteBuyPostButton").value;
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "ItemId" : id,
        "lend": false,
        "buy": true
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // make API call with parameters and use promises to get response
    fetch(YOUR_API_INVOKE_URL + "/posts", requestOptions)
    .then(response => response.text())
    .then(result => {
        alert(JSON.parse(result).body)
        window.location.href = "/posts"
    })
    .catch(error => alert(error));

}

function openModal() {
    const USERID = localStorage.getItem("UserId");
    if (USERID === null){
        alert("You haven't logged in yet. Please login")
        window.location.href = "/login"
    }
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("createPostButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
}

var addNewPost = (title,description,location_city,location_province,date_posted,price) => {
    // instantiate a headers object
    var myHeaders = new Headers();
    var buyOrLend = document.querySelector('input[name="buyOrLend"]:checked').value;
    console.log(buyOrLend);
    var buy, lend = false;
    if (buyOrLend === "buy"){
        buy = true;
        lend = false;
    }
    else if (buyOrLend ==="lend"){
        buy = false;
        lend = true;
    }
    
    // add content type header to object
    const USERID = localStorage.getItem("UserId");
    console.log("Price is :", price);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "title": title,
        "UserId": USERID,
        "description": description,
        "location_city": location_city,
        "location_province": location_province,
        "date_posted": date_posted,
        "lend" : lend,
        "buy": buy,
        "price": price
    });
    console.log(raw);
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch(YOUR_API_INVOKE_URL + "/posts", requestOptions)
    .then(response => response.text())
    .then(result => {
        alert(JSON.parse(result).body)
        window.location.href = "/posts"
    })
    .catch(error => alert(error));

}

function logout(){
    localStorage.removeItem("UserId")
    window.location.href = "/login"
}