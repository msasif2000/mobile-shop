const loadPhone = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    //console.log(data.data);
    phones= data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    //clear previous search result
    phoneContainer.textContent = '';
    const showAllPhone= document.getElementById('show-all');
    if(phones.length >12 && !isShowAll){
        showAllPhone.classList.remove('hidden');
    }
    else{
        showAllPhone.classList.add('hidden');
    }
    //console.log('is show all', isShowAll);
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        //console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card shadow-xl p-4 bg-white`;
        //3 set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Mobile"/></figure>
        <div class="card-body">
          <h2 class="font-bold text-xl text-center">${phone.phone_name}</h2>
          <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit</p>
          <p class="text-center font-bold text-xl">$999</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        //4 append to parent
        phoneContainer.appendChild(phoneCard);
    })

    //hide loading spinner
    toggleLoadingSpinner(false);
}


//handle search
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;
    loadPhone(searchText , isShowAll);
    //console.log(searchText);
    //clear search field
    //searchField.value = '';
    //display search result
    
}

const toggleLoadingSpinner =(isLoading)=>{
    const spinner = document.getElementById('loading');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}
//handle show detail
const handleShowDetail= async (id) => {
    //console.log(id);
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log(data);
    const phone= data.data;
    showPhoneDetail(phone);
}


const showPhoneDetail = (phone) => {
   // console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="bg-sky-200 rounded-xl">
    <img class="h-[300px] mx-auto p-4 rounded-2xl" src="${phone.image}" alt="Mobile"/>
    </div>
    <p class="font-bold">${phone.name}</p>
    <p><span class="font-bold">Storage: </span> ${phone.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size: </span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chipset: </span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory: </span> ${phone.mainFeatures.memory}</p>
    <p><span class="font-bold">Slug: </span> ${phone.slug}</p>
    <p><span class="font-bold">Release Date: </span> ${phone.releaseDate}</p>
    <p><span class="font-bold">Brand: </span> ${phone.brand}</p>
    <p><span class="font-bold">GPS: </span> ${phone.others?.GPS || 'No GPS Available'}</p>
    `;
    show_details_modal.showModal();
}
//handle show all
const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();