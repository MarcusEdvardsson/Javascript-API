function createNode(element) {
   return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li'),
        img = createNode('img')
    img.src = author.picture.medium;
    append(li, img);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(JSON.stringify(error));
});   