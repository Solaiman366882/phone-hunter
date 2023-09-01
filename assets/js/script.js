const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    // console.log('data');
    const phoneCardContainer = document.getElementById('phone-container');
    phoneCardContainer.textContent = '';
    const showAllContainer =document.getElementById('show-all-container');
    if(phones.length >12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden')
    }
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-base-100 shadow-xl border border-sky-200 p-6';
        phoneCard.innerHTML = `
            <figure class="px-7 pt-7  bg-banner-bg">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center pb-0">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="card-title">$999</h2>
                <div class="card-actions">
                <button class="btn hover:bg-sky-700 bg-btn-bg text-white" onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()">Show Details</button>
                </div>
            </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

// handle search 
const handleSearch = (isShowAll) => {
    toggleLoading(true)
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText,isShowAll);
    console.log(searchText);
}

const toggleLoading = (isLoading) => {
    if(isLoading){
        document.getElementById('loading-container').classList.remove('hidden');
    }else{
        document.getElementById('loading-container').classList.add('hidden');
    }
    console.log('loading');
}


const handleShowAll = () => {
    handleSearch(true)
}

const handleShowDetails = async (id) => {
    console.log('show-all-details',id);
    const res = await  fetch(` https://openapi.programming-hero.com/api/phone/${id}`) ;
    const data = await res.json();
    const phone = data.data
    showDetails(phone)
}

const showDetails = (phone) => {

    show_details_modal.showModal()
    console.log(phone);
    const container = document.getElementById('show-details-container');
    container.innerHTML = `
        <div class="text-center"><img src="${phone.image}" class="mx-auto" alt=""></div>
        <h3 class="text-right">${phone.brand}</h3>
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <h3 class="font-bold ">Storage:<span class="font-normal">${phone.mainFeatures.storage}</span></h3>
        <h3 class="font-bold">Display size:<span class="font-normal">${phone.mainFeatures?.displaySize}</span></h3>
        <h3 class="font-bold">Chip Set:<span class="font-normal">${phone.mainFeatures?.chipSet}</span></h3>
        <h3 class="font-bold">Memory:<span class="font-normal">${phone.mainFeatures?.memory}</span></h3>
        <h3 class="font-bold">Memory:<span class="font-normal">${phone.mainFeatures?.sensors}</span></h3>
        <h3 class="font-bold">Slug:<span class="font-normal">${phone.slug}</span></h3>
        <h3 class="font-bold">Release Date:<span class="font-normal">${phone.releaseDate}</span></h3>
        <h3 class="font-bold">GPS:<span class="font-normal">${phone.others.GPS}</span></h3>


    `;
}

loadPhone()