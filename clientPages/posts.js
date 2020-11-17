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
            lendList.appendChild(listItem)            
        }
        var buyList = document.getElementById('buyList')
        for (i = 0; i < postTable[1].length; i++){
            var listItem = document.createElement("LI")
            listItem.innerHTML = JSON.stringify(postTable[0][i])
            buyList.appendChild(listItem)            
        }
    })
    .catch(error => alert(error));

}