// load the remote url to be used in the module federation
fetch('http://localhost:5000/getURL')
.then(res => {
    console.log( res, 'res');
   return res.json();
})
.then(data => {
    console.log(data, 'data');
   // window.homeurl = "//localhost:3001";
    window.homeurl = data.url;
    import('./bootstrap');
})
.catch(err => {
    console.log('failed loading')
})