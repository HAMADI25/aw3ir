function getQueryParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    
    return {
        name: params.get('name'),
        firstname: params.get('firstname'),
        birthday: params.get('birthday'),
        address: params.get('address'),
        email: params.get('email')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const data = getQueryParams();

    document.getElementById('name').textContent = data.name;
    document.getElementById('firstname').textContent = data.firstname;
    document.getElementById('birthday').textContent = data.birthday;

    
    const addressElement = document.getElementById('address');
    addressElement.textContent = data.address;
    addressElement.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;

    
    const emailElement = document.getElementById('email');
    emailElement.textContent = data.email;
    emailElement.href = `mailto:${data.email}`;
});
