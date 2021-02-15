const API_KEY = ""; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const url =  "https://api.jsonbin.io/v3/b/601890cadde2a87f921c401f"

// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  const response = fetch(url + "/latest");
  return response.then((firstResponse) => { 
  return firstResponse.json();
  }).then((secondResponse) => {
   return secondResponse.record["my-todo"];
  })
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(data) {
 const dataObject = {
   "my-todo" :data
 };
  const init = {
    method :"PUT" ,
    headers : {
      "Content-Type": "application/json"
    },
    body : JSON.stringify(dataObject)
  };
  const request = new Request(url, init);

  return fetch(request).then((response) => {
    
   return response.ok;
  });
}