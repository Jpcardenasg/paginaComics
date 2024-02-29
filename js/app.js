const marvelSection = document.getElementById( 'marvel' );
const dcSection = document.getElementById( 'dc' );
const allSection = document.getElementById( 'all' );
const modal = document.getElementById( 'modal' );
const modalContent = document.querySelector( '.modal-content' );
const characterInfo = document.createElement( 'div' );
characterInfo.classList = 'character-info';

let marvelData;
let dcData;


async function loadData( url ) {
    try {

        const response = await fetch( url );
        const data = await response.json();
        return data;

    } catch ( error ) {

        console.error( 'Error loading the data', error );

    }
}

function createCards( characters, section ) {
    const container = document.createElement( 'div' );
    container.classList.add( 'cards-container' );

    characters.forEach( character => {
        const card = document.createElement( 'div' );
        card.classList.add( 'card' );


        const image = document.createElement( 'div' );
        image.classList.add( 'image' );

        const img = document.createElement( 'img' );
        img.src = character.picture;
        img.alt = character.name;
        image.appendChild( img );

        const info = document.createElement( 'div' );
        info.classList.add( 'info' );

        const name = document.createElement( 'h2' );
        name.textContent = character.name;

        const viewButton = document.createElement( 'button' );
        viewButton.classList.add( 'view' );
        viewButton.textContent = 'Ver';

        card.appendChild( image );
        info.appendChild( name );
        info.appendChild( viewButton );
        card.appendChild( info );

        container.appendChild( card );


        viewButton.addEventListener( 'click', () => {
            modal.style.display = 'block';
            modalContent.innerHTML = '';
            characterInfo.innerHTML = '';

            const cloneImage = image.cloneNode( true );
            modalContent.appendChild( cloneImage );
            modalContent.appendChild( characterInfo );

            const cloneName = name.cloneNode( true );
            characterInfo.appendChild( cloneName );

            const description = document.createElement( 'p' );
            description.textContent = character.description;
            characterInfo.appendChild( description );

            const backButton = document.createElement( 'button' );
            backButton.textContent = 'Regresar';
            backButton.classList.add( 'close-btn' );
            backButton.addEventListener( 'click', cerrarModal );
            characterInfo.appendChild( backButton );

        } );

    } );

    section.appendChild( container );
}

( async function () {
    marvelData = await loadData( 'data/marvel.json' );
    dcData = await loadData( 'data/dc.json' );
    createCards( marvelData, marvelSection );
    createCards( dcData, dcSection );

    // if ( marvelData && dcData ) {
    //     const allCharacters = marvelData.concat( dcData );
    //     createCards( allCharacters );
    // }


} )();

const inputSearch = document.getElementById( 'inputSearch' );
inputSearch.addEventListener( 'input', buscar );

function buscar() {
    let searchUpperCase = inputSearch.value.toUpperCase();

    const filteredMarvelData = marvelData.filter( character => character.name.toUpperCase().includes( searchUpperCase ) );
    const filteredDCData = dcData.filter( character => character.name.toUpperCase().includes( searchUpperCase ) );

    marvelSection.innerHTML = '';
    dcSection.innerHTML = '';

    createCards( filteredMarvelData, marvelSection );
    createCards( filteredDCData, dcSection );
}


function cerrarModal() {
    modal.style.display = "none";
}

function selectSection( event ) {
    const selectedSection = event.target.dataset.item;

    const sections = document.querySelectorAll( '.section' );
    sections.forEach( section => {
        if ( section.id === selectedSection ) {
            section.classList.remove( 'hidden' );
        } else {
            section.classList.add( 'hidden' );
        }
    } );
}


