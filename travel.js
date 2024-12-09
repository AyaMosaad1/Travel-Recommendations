let data = {
    "countries": [
      {
        "id": 1,
        "name": "Australia",
        "cities": [
          {
            "name": "Sydney, Australia",
            "imageUrl": "assets/sydney.jpg",
            "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
          },
          {
            "name": "Melbourne, Australia",
            "imageUrl": "assets/melbourne.jpg",
            "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
          }
        ]
      },
      {
        "id": 2,
        "name": "Japan",
        "cities": [
          {
            "name": "Tokyo, Japan",
            "imageUrl": "assets/tokyo.jpg",
            "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
          },
          {
            "name": "Kyoto, Japan",
            "imageUrl": "assets/kyoto.jpg",
            "description": "Known for its historic temples, gardens, and traditional tea houses."
          }
        ]
      },
      {
        "id": 3,
        "name": "Brazil",
        "cities": [
          {
            "name": "Rio de Janeiro, Brazil",
            "imageUrl": "assets/rio.jpg",
            "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
          },
          {
            "name": "São Paulo, Brazil",
            "imageUrl": "assets/sao-paulo.jpg",
            "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
          }
        ]
      }
    ],
    "temples": [
      {
        "id": 1,
        "name": "Angkor Wat, Cambodia",
        "imageUrl": "assets/angkor-wat.jpg",
        "description": "A UNESCO World Heritage site and the largest religious monument in the world."
      },
      {
        "id": 2,
        "name": "Taj Mahal, India",
        "imageUrl": "assets/taj-mahal.jpg",
        "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
      }
    ],
    "beaches": [
      {
        "id": 1,
        "name": "Bora Bora, French Polynesia",
        "imageUrl": "assets/bora-bora.jpg",
        "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
      },
      {
        "id": 2,
        "name": "Copacabana Beach, Brazil",
        "imageUrl": "assets/copacabana.jpg",
        "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
      }
    ]
  };



function thankyou(){
    alert('Thank you for contacting us!')
}

document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('results').innerHTML = '';
});



fetch('travel.json')
    .then(response => {
        return response.json()
    })
    .then(jsonData => {
        data = jsonData;
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('btnSearch').addEventListener('click', function() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    console.log("🚀 ~ document.getElementById ~ input:", input)
    
    let results = [];

    if (!data) {
        console.error('Data not yet fetched');
        return;
    }

    if(input == "beach" || input == "beaches"){
        data.beaches.forEach(beach => {
            results.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        data.temples.forEach(temple => {
            results.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }
    displayResults(results);
    console.log("🚀 ~ document.getElementById ~ results:", results)
});


function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
            <a href=\"${result.imageUrl}\"><button>Visit</button></a>
        `;
        resultsDiv.appendChild(item);
    });
}