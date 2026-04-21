const categories = document.getElementById('categories')
const products = document.getElementById('products')
const search = document.getElementById('search')
const searchcontainer = document.getElementById('searchcontainer')
const searchresult = document.getElementById('searchresult')
let data = []

async function getData() {
    const response = await fetch('https://69b3fd3ce224ec066bddc026.mockapi.io/f142/category')
    const data = await response.json();
    setTimeout(() => {
        data.map(item => {
            categories.innerHTML += `
             <div onclick="filterdata('${item.name}')" class="card-dt  border border-[#ecf0ef] w-[80%] mx-auto p-5 shadow-lg rounded-xl hover:border-[green] hover:scale-110 duration-300">
                    <img src="${item.image}" alt="">
                    <span class="text-[gray] text-[14px] text-center ">${item.name}</span>
                </div>`
        })
    })
}
getData()

// fetch('https://69b3fd3ce224ec066bddc026.mockapi.io/f142/category')
//     .then(res => res.json())
//     .then(cat => {
//         cat.map(c => {
//             categories.innerHTML += `
//              <div onclick="filterdata('${c.name}')" class="card-dt  border border-[#ecf0ef] w-[80%] mx-auto p-5 shadow-lg rounded-xl hover:border-[green] hover:scale-110 duration-300">
//                     <img src="${c.image}" alt="">
//                     <span class="text-[gray] text-[14px] text-center ">${c.name}</span>
//                 </div>`
//         })
//     })


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
    e.target.value == 0 ? searchcontainer.style.display = 'none' : searchcontainer.style.display = 'block'

})

function searchdata(search) {
    const words = search.toLowerCase();
    const searchfilter = data.filter(p => p.title.toLowerCase().startsWith(words))
    searchAlldata(searchfilter)

}

function searchAlldata(data) {

    searchresult.innerHTML = data.map(p => `
        <div class=" shadow-lg rounded-2xl hover:scale-105 duration-300"">

                  <div class="flex gap-6 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
                      <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                          <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                              <img src='${p.image}' class="w-full h-full object-contain" />
                          </div>
                          <div class="flex flex-col gap-4">
                              <div>
                                  <h3 class="text-sm sm:text-base font-semibold text-slate-900">${p.title}</h3>
                                  <p class="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">Category: <span class=" rounded-sm ">${p.category}</span></p>
                              </div>
                              <div class="mt-auto">
                                  <h3 class="text-sm font-semibold text-slate-900">${p.price} $</h3>
                              </div>
                          </div>
                      </div>
                   
                </div>

        `).join('')
}
function createslug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

}

function getdata() {
    fetch('https://69b3fd3ce224ec066bddc026.mockapi.io/f142/product')
        .then(res => res.json())
        .then(resdata => {
            products.innerHTML = resdata.map(p => {
                const slug = createslug(p.title)
                return `
                 <div class="border border-[#ecf0ef] shadow-lg rounded-2xl hover:border-[green] hover:scale-105 duration-300"">
                   <img src="${p.image}" alt="" class="mx-auto">
                     <div class="flex flex-col p-3 text-center">
                     <span class="text-[gray] text-[14px] text-center ">${p.category}</span>
                       <h3 class="text-black text-[18px] font-[600]">${p.title}</h3>
                        <span class="text-black font-[600] text-[16px]">${p.price} $</span>
                        <a href="detail.htm?s=${createslug(p.title)}" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Daha etrafli</a>

                   </div>

                </div>`

            }).join('')
        })
}

getdata()      