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


#### Workflow -(commented out for now)
- We create a nginx server that hides our APi and Client server.
- Tell Nginx that there is an 'upstream server' at client:3000 and api:5000.
 `client` is the same name as we have in decker compose file, same for `api`.
- We expose port 80 from nginx and map it to 4050.
- If anyone visits root we redirect to Client and if, user reuqest '/api' we redirect to Api server.
  

#### Current workflow(without docker and nginx)
- Shell - to run the shell - navigate to shell directory and run `npm start` this will fire up a dev server at localhost:3000. This is the Container App that loads the remote Apps.
- Home - to run the home, navigate to the home directory and run  - `npm start` this will fire up a dev server at localhost:3001.This is the remote App, that is loaded in Container.
- Server -(express server) - Navigate to the server directory and run `npm start`. This start a express server , which returns the dynamic path `//localhost:3001` to load Remote Home App.
- Note the path `//localhost:3001`, we specify a relative path, and not a complete path with as `http://localhost:3001`


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


### Dynamically loading the Remote at runtime
- With Webpack MFE we can load the remote statically or dynamically at runtime
  
#### Statically loading remote in Container
- We can either  specify the remote url at the config or load it in the html and only specify the remote name.
- By specifying the remote type in the config, we can decide how to load the remote url.
  - Example if we have - `library: { type: "var", name: "container" }, ` type as "var" we can use the HTML to add the remote scripts.
```js
new ModuleFederationPlugin({
    name: 'container',
    // The default is remoteType: "script" which requires global@URL
    library: { type: "var", name: "container" }, 
    filename: 'remoteEntry.js',
    remotes: {
        'home': 'home',
    },
    exposes: {},
    shared: packageJson.dependencies // optional way to list all dependencies as shared
}),

 // index.html
 <script src="http://localhost:3001/remoteEntry.js" />
```
  - But if we don't specify the type, the default type is `script` which means we need to specify the remote url in the config as 
   `'home': 'home@http://localhost:3001/remoteEntry.js'`
```js
new ModuleFederationPlugin({
    name: 'container',
    // The default is remoteType: "script" which requires global@URL
    filename: 'remoteEntry.js',
    remotes: {
        'home': 'home@http://localhost:3001/remoteEntry.js'
    },
    exposes: {},
    shared: packageJson.dependencies // optional way to list all dependencies as shared
}),
```   

#### Dynamically loading remotes in Container
- In some cases we would need to load the remote dynamically at runtime.
- For that we would use a plugin called `ExternalTemplateRemotesPlugin` that will substitute our value at runtime.
- For this we would specify the remote as:
   `home: 'home@[window.homeurl]/remoteEntry.js'`.
- The `window.homeurl` would be replaced by our value at runtime by the `ExternalTemplateRemotesPlugin` plugin.

```js
 new ModuleFederationPlugin({
    name: 'container',
    filename: 'remoteEntry.js',
    remotes: {
        home: 'home@[window.homeurl]/remoteEntry.js'
    },
    exposes: { },
    shared: packageJson.dependencies // optional way to list all dependencies as shared
}),
new ExternalTemplateRemotesPlugin(),
```
- Now in order to set the value, we need to load the value and set it before we load the main index file of the container.
- So in the root index file that loads the bootstrap file, we call the express api to load the remote url and then load the bootstrap file.
  
```js
  fetch('http://localhost:5000/getURL')
.then(res => {
    console.log( res, 'res');
   return res.json();
})
.then(data => {
    console.log(data, 'data');
    window.homeurl = data.url;
    import('./bootstrap');
})
.catch(err => {
    console.log('failed loading')
})```

