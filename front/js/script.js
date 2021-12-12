
displayItems();

// Fetching data of the articles from API 
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// Repartition of the data from API in the DOM 
async function displayItems() {
    var result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // Insertion of the element <a> 
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion of the <article>
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion of the <img>
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion of title <h3>
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion of the description <p>
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })


    // if the server not connected or find any erros the following message error will appear!
    .catch((error) => {
        
        let items = document.querySelector(".items");
        items.innerHTML = "Nous n'avons pas reussi a afficher nos nounours. Avez vous bien lance le serveur local (Port 3000) ? <br> Si le probleme persiste, Contactez-nous.";
        items.style.textAlign = "center";
        items.style.padding = "30vh 0";

    });
}