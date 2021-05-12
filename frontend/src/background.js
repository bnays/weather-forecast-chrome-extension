console.log("background");
// const CLIENT_ID = encodeURIComponent('217553597804-dv1me50atolsjls157chb09hqgbogv3b.apps.googleusercontent.com');
// const RESPONSE_TYPE = encodeURIComponent('id_token');
// const REDIRECT_URI = encodeURIComponent('https://omggpnelkmokdhnmafpknjkpcfbipdml.chromiumapp.org')
// const SCOPE = encodeURIComponent('openid');
// const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
// const PROMPT = encodeURIComponent('consent');

// let user_signed_in = false;

// function is_user_signed_in() {
//     return user_signed_in;
// }

// function create_auth_endpoint() {
//     let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

//     let openId_endpoint_url =
//         `https://accounts.google.com/o/oauth2/v2/auth
// ?client_id=${CLIENT_ID}
// &response_type=${RESPONSE_TYPE}
// &redirect_uri=${REDIRECT_URI}
// &scope=${SCOPE}
// &state=${STATE}
// &nonce=${nonce}
// &prompt=${PROMPT}`;

//     console.log(openId_endpoint_url);
//     return openId_endpoint_url;
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'login') {
//         if (user_signed_in) {
//             console.log("User is already signed in.");
//         } else {
//             chrome.identity.launchWebAuthFlow({
//                 'url': create_auth_endpoint(),
//                 'interactive': true
//             }, function (redirect_url) {
//                 if (chrome.runtime.lastError) {
//                     // problem signing in
//                 } else {
//                     console.log(redirect_url, "hello");
//                 }
//             });

//             return true;
//         }
//     } else if (request.message === 'logout') {
//         user_signed_in = false;
//         chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
//             sendResponse('success');
//         });

//         return true;
//     } else if (request.message === 'isUserSignedIn') {
//         sendResponse(is_user_signed_in());
//     }
// });