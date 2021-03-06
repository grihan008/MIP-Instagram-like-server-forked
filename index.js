        var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');


// cloudinary.config({ 
//         cloud_name: 'hgeqzeyd7', 
//         api_key: '194272657656171', 
//         api_secret: 'pI-CdWJ8gKfaKseHOoYpEAI8hBU' 
//     });
// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 3000));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '', // cloudinary folder where you want to store images, empty is root
  allowedFormats: ['jpg', 'png'],
});

var parser = multer({ storage: storage });

// Simple hello world route
app.get('/', function(req, res) {
    res.send("Hello world");
});

var users = [{
            id: 1,
            username: "user",
            password: "pass",
            fullName: "Donald Trump",
            profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg",
            postCount: 13,
            followers: 52,
            following: 2,
            follow: [],
            activity: [
                {
                    userId: 2,
                    username: "POTUS",
                    fullName: "President of United States",
                    profileImageSmall: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg",
                    type: "commented",
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    userId: 3,
                    username: "HillaryC",
                    fullName: "Hillary Clinton",
                    profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg",
                    type: "liked",
                    comment: "",
                    userRefs: [],
                    tags: []
                }
            ]
        },{
            id: 2,
            username: "dude",
            password: "1234",
            fullName: "Grihan",
            profileImageSmall: "https://agario-skins.org/images/skins/custom/jake.png?v0.10.16",
            postCount: 2,
            followers: 3,
            following: 5,
            follow: [1],
            activity: [
            ]
        }
    ];

var posts = [
        {
            id: 0,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
            },                                                 
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892, 
            caption: "Always winning #elections",
            tags: ['elections'],         
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },                    
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },                    
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []       
                },
            ]

        },{
            id: 1,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
            },                                                 
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892, 
            caption: "Always winning #elections",
            tags: ['elections'],         
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },                    
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },                    
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []       
                },
            ]

        },{
            id: 2,
            user: {
                id: 2,
                username: "dude",
                profileImageSmall: "https://agario-skins.org/images/skins/custom/jake.png?v0.10.16" 
            },                                                 
            image: "https://agario-skins.org/images/skins/custom/jake.png?v0.10.16",
            imageThumbnail: "https://agario-skins.org/images/skins/custom/jake.png?v0.10.16",
            likes: 3, 
            caption: "Yooooo",
            tags: ['elections'],         
            comments: [
            ]

        }
    ]

app.post('/login', function(req,res){
    console.log("test");
    console.log(req.body);
    var u = users.find(function(element){
         return (element.username === req.body.username) && (element.password === req.body.password);        
    });

    if(u !== undefined)
    {
        return res.json(u);
    }
    else
    {
        return res.sendStatus(401);
    }
});

app.post('/addUser', function(req,res){
    var length = users.push({
        id: users.length+1,
        username: req.body.username,
        password: req.body.password,
        fullName: "Dude",
        follow: [],
        profileImageSmall: "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
    });
    if (users[length-1].username==req.body.username){
        return res.json(res.json(users[length-1]));
    }
    else{
        return res.sendStatus(401);
    }
});

app.post('/addFollow', function(req,res){
    var user;
    users.forEach(function(item){
        if (item.id==req.body.id){
            item.follow.push(req.body.followid);
            res.sendStatus(200);
            return;
        }
    });
});

app.post('/addPost', function(req,res){
    var img;
    var name;
    users.forEach(function(item){
        if(item.id==req.body.id){
            name=item.username;
            img=item.profileImageSmall;
        }
    });
    posts.push({
        id: posts.length,
        user:{
            id: req.body.id,
            username: name,
            profileImageSmall: img
        },
        image: req.body.imageUri,
        imageThumbnail: req.body.imageUri,
            likes: 3, 
            caption: req.body.caption,
            tags: ['newpost'],         
            comments: [
            ]

    });
    res.sendStatus(200);
});

// app.post('/upload', function(req,res){
//     cloudinary.uploader.upload(req.file, function(result) { 
//       res.json(result);
//     });
// });
app.get('/upload', function(req, res) {
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Public ID: <input type="text" name="title"/></p>'
    + '<p>Image: <input type="file" name="image"/></p>'
    + '<p><input type="submit" value="Upload"/></p>'
    + '</form>');
});

app.post('/upload', parser.single('image'), function (req, res) {       
    console.log(req.file);
    res.json(req.file); // respond with json output of the cloudinary data
});

app.get('/users', function(req,res){
    res.json(users);
});

app.get('/posts/relevant/:id', function(req, res) {
    var show=[];
    var user;
    users.forEach(function(item){
        if (item.id==req.params.id){
            user=item;
        };
    });
    if (user.follow){
        user.follow.forEach(function(item){
            posts.forEach(function(post){
                if (post.user.id==item){
                    show.push(post);
                }
            })
        });
    }
    res.json(show);
});

app.get('/posts/:id', function(req, res) {
    var items=[];
    posts.forEach(function(item,i){
        if (item.user.id==req.params.id){
            items.push(item);
        }
    });
    res.json(items);
});

app.get('/post/:id', function(req, res) {
    var send;
    posts.forEach(function(item,i){
        if (item.id==req.params.id){
            send=item;
        }
    });
    res.json(send);
});

// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
