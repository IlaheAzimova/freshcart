const categories = document.getElementById('categories')
const products = document.getElementById('products')
const search = document.getElementById('search')
let data = []
fetch('https://69b3fd3ce224ec066bddc026.mockapi.io/f142/category')
    .then(res => res.json())
    .then(cat => {
        cat.map(c => {
            categories.innerHTML += `
             <div onclick="filterdata('${c.name}')" class="card-dt  border border-[#ecf0ef] w-[80%] mx-auto p-5 shadow-lg rounded-xl hover:border-[green] hover:scale-110 duration-300">
                    <img src="${c.image}" alt="">
                    <span class="text-[gray] text-[14px] text-center ">${c.name}</span>
                </div>`
        })
    })

fetch('https://69b3fd3ce224ec066bddc026.mockapi.io/f142/product')
    .then(res => res.json())
    .then(resdata => {
        data = resdata
        showdata(data)

    })

function showdata(data) {
    products.innerHTML = data.map(p =>
        `      <div class="border border-[#ecf0ef] shadow-lg rounded-2xl hover:border-[green] hover:scale-105 duration-300"">
                    <img src="${p.image}" alt="" class="mx-auto">
                    <div class="p-3 text-center">
                        <span class="text-[gray] text-[14px] text-center ">${p.category}</span>
                        <h3 class="text-black text-[18px] font-[600]">${p.title}</h3>
                        <span class="text-black font-[600] text-[16px]">${p.price} $</span>

                    </div>

                </div>`

    ).join('')
}

function filterdata(category) {

    const result = (category === 'all') ? data : data.filter(p => p.category === category)
    showdata(result)
}

search.addEventListener('input', (e) => {
    searchdata(e.target.value)

})

function searchdata(search) {
    const words = search.toLowerCase();
    const searchfilter = data.filter(p => p.title.toLowerCase().includes(words))
    showdata(searchfilter)


}