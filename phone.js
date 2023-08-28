const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    //console.log(data.data);
    phones= data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    //console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    //clear previous search result
    phoneContainer.textContent = '';
    const showAllPhone= document.getElementById('show-all');
    if(phones.length >12){
        showAllPhone.classList.remove('hidden');
    }
    else{
        showAllPhone.classList.add('hidden');
    }
    phones = phones.slice(0, 12);
    phones.forEach(phone => {
        //console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card shadow-xl p-4`;
        //3 set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Mobile" class="rounded-2xl border-2 border-purple-400"/></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        //4 append to parent
        phoneContainer.appendChild(phoneCard);
    })
}


//handle search
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;
    loadPhone(searchText);
    //console.log(searchText);
    //clear search field
    searchField.value = '';
    //display search result
    
}
//loadPhone();