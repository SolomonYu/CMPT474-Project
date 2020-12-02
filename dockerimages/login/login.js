// define the callAPI function that takes a first name and last name as parameters
var callAPI = (userId,password)=> {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"UserId": userId,"password": password});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch(YOUR_API_INVOKE_URL + "/login", requestOptions)
    .then(response => {
        console.log(response.status)
        if (response.status == 200){
            document.getElementById('loginStatus').innerHTML = "Login Successful. Moving to Posts Screen."
            alert("Login Successful. Moving to Posts Screen.")
            localStorage.setItem("UserId", userId)
            window.location.href = "/posts"
        }
        else{
            document.getElementById('loginStatus').innerHTML = "Login Failed."
        }
        
    })
    .catch(error => alert(error));
}