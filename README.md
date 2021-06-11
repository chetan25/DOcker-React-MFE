# Multi Container with MFE

- Front-End
   - Shell
   - Home
   - flagger
- Server


### Tech 
- React
- Nginx
- Webpack
- Node
- Express


#### Workflow
- We create a nginx server that hides our APi and Client server.
- Tell Nginx that there is an 'upstream server' at client:3000 and api:5000.
 `client` is the same name as we have in decker compose file, same for `api`.
- We expose port 80 from nginx and map it to 4050.
- If anyone visits root we redirect to Client and if, user reuqest '/api' we redirect to Api server  


#### Routing MFE
- Browser History - look at the path portion of the url(everything after domain), to figure out what path user is visiting. eg 'http://app.com/test/home' ==> user is visiting '/test/home'
- Hash History - Look at everything after '#', in the URL to figure out the current path.
- Memory History/ Abstract History - Keep track of the current path in the memory(code). Does not uses the address in address bar. 
- Initial value of memory history in react router is always '/' .
- Links's used inside an App that uses Memory/Browser history are scoped to the router used.

##### Example 
- We have Shell using the Browser Router and the Home using the memory router.
- Scenario 1
    - If user clicks a link governed by the Shell(Browser History) we need to communicate the change down to Home(Memory History).
    - Home's Memory history should update it's current path and render the content.
- Scenario 2
    - If user clicks a link governed by Home(Memory history), we need to communicate the change up.
    - Shell's Browser history should update the current path. 