document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("#main-content");
  const sidebar = document.querySelector("#sidebar");
  const bobDylanBio = {
    name: "Bob Dylan",
    bio: "Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer-songwriter, author, and visual artist. Widely regarded as one of the greatest songwriters of all time, Dylan has been a major figure in popular culture for more than 60 years. Much of his most celebrated work dates from the 1960s, when songs such as 'Blowin' in the Wind' and 'The Times They Are a-Changin'' became anthems for the civil rights and anti-war movements. His lyrics during this period incorporated a range of political, social, philosophical, and literary influences, defying pop-music conventions and appealing to the burgeoning counterculture."
};

  // Handle navigation click events
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const contentId = e.target.getAttribute("id").replace("-link", "");
      loadContent(contentId);
      updateSidebar(contentId); // Update sidebar based on main menu selection
    });
  });

  // Function to load content based on selection
  function loadContent(contentId) {
    // Clear previous content
    mainContent.innerHTML = "";

    if (contentId === 'biography') {
        displayBiography(bobDylanBio);
        return;
    }

    // Logic to fetch and display content based on 'contentId'
    // Placeholder: Replace with actual fetch request
    fetch(`api/${contentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (contentId === "discography") {
          displayDiscography(data.discography);
        } else if (contentId === 'links') {
            displayLinks(data.links);
        }  else {
          // ... handle other content types
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to display biography
function displayBiography(biography) {
    const bioContainer = document.createElement('div');
    bioContainer.className = 'bio-container';

    const name = document.createElement('h2');
    name.textContent = biography.name;
    bioContainer.appendChild(name);

    const bioText = document.createElement('p');
    bioText.textContent = biography.bio;
    bioContainer.appendChild(bioText);

    mainContent.appendChild(bioContainer);
}

  // Function to display links
function displayLinks(links) {
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    
    links.forEach(link => {
        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';

        const linkType = document.createElement('h3');
        linkType.textContent = link.type;
        linkContainer.appendChild(linkType);

        const linkDesc = document.createElement('p');
        linkDesc.textContent = link.description;
        linkContainer.appendChild(linkDesc);

        const linkUrl = document.createElement('a');
        linkUrl.href = link.url;
        linkUrl.textContent = 'View';
        linkUrl.target = '_blank'; // Open in new tab
        linkContainer.appendChild(linkUrl);

        linksContainer.appendChild(linkContainer);
    });

    mainContent.appendChild(linksContainer);
}

  // Function to display discography
  function displayDiscography(discography) {
    const discographyContainer = document.createElement("div");
    discographyContainer.className = "discography-container";

    discography.forEach((album) => {
      const albumContainer = document.createElement("div");
      albumContainer.className = "album-container";

      const albumTitle = document.createElement("h3");
      albumTitle.textContent = album.title;
      albumContainer.appendChild(albumTitle);

      const releaseYear = document.createElement("p");
      releaseYear.textContent = `Release Year: ${album.releaseYear}`;
      albumContainer.appendChild(releaseYear);

      const songList = document.createElement("ul");
      album.songs.forEach((song) => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} (${song.duration})`;
        songList.appendChild(songItem);
      });
      albumContainer.appendChild(songList);

      discographyContainer.appendChild(albumContainer);
    });

    mainContent.appendChild(discographyContainer);
  }
  // Function to update sidebar based on main menu selection
  function updateSidebar(contentId) {
    // Clear previous sidebar content
    sidebar.innerHTML = "";

    // Add sub-menu items or information related to the main content
    switch (contentId) {
      case "photos":
        // Example categories for photos (these can be dynamic if fetched from an API)
        const categories = ['London 2020', 'Paris 2021', 'Athens 2023'];
        const list = document.createElement('ul');
        list.classList.add("blank-list-style")
        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category;
            listItem.addEventListener('click', () => loadPhotosByCategory(category));
            list.appendChild(listItem);
        });

        sidebar.appendChild(list);
        break;
      // Add similar cases for other main menu items
    }
  }

  function loadPhotosByCategory(category) {
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.innerHTML = `<h2>${category} Photos</h2>`;
    
    // Fetch 5 random photos (simulating category-based fetching)
    for (let i = 0; i < 5; i++) {
        fetch('https://picsum.photos/200') // This API returns a random 200x200 image
            .then(response => {
                const img = document.createElement('img');
                img.src = response.url;
                img.alt = `${category} Photo ${i+1}`;
                img.style.margin = '10px';
                mainContent.appendChild(img);
            })
            .catch(error => console.error('Error fetching photo:', error));
    }
}

  // Load initial content (optional)
  loadContent("biography");
  updateSidebar('biography');
});
