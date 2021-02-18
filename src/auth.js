
// Set the authentication token
export const setToken = (token, stay_connected=false) => {
    if (stay_connected) {
        localStorage.setItem("access-token", token.access);
        localStorage.setItem("refresh-token", token.refresh);
    }

    sessionStorage.setItem("access-token", token.access);
    sessionStorage.setItem("refresh-token", token.refresh);
}

// Store token and redirect to index page
export const logIn = (token, stay_connected=false) => {
    setToken(token, stay_connected);
    window.location = "/";
}

// Check if user is logged in and return the token if exists
export const isLoggedIn = () => {
    const token = localStorage.getItem("access-token");
    if  (token !== null) {
        return token;
    }

    return sessionStorage.getItem("access-token");
}

// Delete the token from the sessionStorage
export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
}

// Remove the token and redirect to login page
export const logOut = () => {
    removeToken();
    window.location = "/login/";
}

// Create header for request
export const requestConfig = () => {
    return { headers: { Authorization: `Bearer ${ isLoggedIn() }` }};
}

// TODO Create refresh request function

// Build backend path
export const backendPath = (path="/") => {
    let proto = "https";
    let address = "danimz.pythonanywhere.com";
    let port = "80";

    // return proto + "://" + address + ":" + port + path;
    return proto + "://" + address + path;
}

export const setCaseData = (c=null) => {
    localStorage.setItem("caseData", JSON.stringify(c));
}
  
export const caseData = () => {
    return JSON.parse(localStorage.getItem("caseData"));
}
  