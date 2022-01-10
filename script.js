const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById("searchBar");
let hpCharacters = []

// searchElement
searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = hpCharacters.filter(character => {
        return (
            character.name.toLowerCase().includes(searchString) || character.house.toLowerCase().includes(searchString)
        );

    });

    if (filteredCharacters == ""){
        charactersList.innerHTML = `<p style='color:#eee;font-weight:bold;'>Not Found!</p>`;

    } else {
        displayCharacters(filteredCharacters);
    }
    
    

});

const loadCharacters = async () => {
    try{
        const result = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await result.json();
        displayCharacters(hpCharacters)

    } catch (err) {
        console.error(err)
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
        return `
        <li class="character">
            <h2>${character.name}</h2>
            <p>House: ${character.house} <br> Is Alive : ${character.alive}</p>
            <img src="${character.image}"/>

        </li>
        `;
    }).join('');

    charactersList.innerHTML = htmlString;

    
    
};

loadCharacters();


