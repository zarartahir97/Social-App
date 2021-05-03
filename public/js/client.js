function fetchPosts() {
    fetch('/posts', {
        method: 'GET',
    })
    .then(result => result.json())
    .then(res => {
        let posts = document.getElementById("posts");
        posts.innerHTML = "";
        console.log(res.result);
        res.result.forEach(element => {
            let title = document.createElement('h4');
            title.innerHTML = "Title:   " + element.title;
            let author = document.createElement('p');
            author.innerHTML = "Author: " + element.name;
            let description = document.createElement('p');
            description.innerHTML = element.description;
            posts.appendChild(title).appendChild(author).append(description);
        });
    })
    .catch((err) => console.log(err));
}

window.onload = function() {
    fetchPosts();
};

const socket = io();

socket.on("postsUpdated", res => {
    fetchPosts();
})